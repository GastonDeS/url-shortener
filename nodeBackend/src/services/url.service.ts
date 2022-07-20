import { BASIC_PLAN_URL_TIME, HISTOGRAM_INTERVALS } from "../constants/general.constant";
import urlModel, { IUrl } from "../models/url.model";
import RedisService from "./redis.service";
import { Md5 } from "md5-typescript";
import GenericException from "../exceptions/generic.exception";
import { ERRORS } from "../constants/error.constant";
import UserService from "./user.service";
import { USER_TYPE } from "../models/user.model";
import ClickService from "./click.service";
import { isDate } from "moment";


class UrlService {
    private static instance: UrlService;
    private redisService: RedisService;
    private userService: UserService;
    private clickService: ClickService;

    constructor() {
        this.redisService = RedisService.getInstance();
        this.userService = UserService.getInstance();
        this.clickService = ClickService.getInstance();
    }

    static getInstance = () => {
        if (!UrlService.instance) {
            UrlService.instance = new UrlService();
        }
        return UrlService.instance;
    };

    // reduce userUrl
    addUrl = async (userId: string, name: string, shortUrl: string | undefined, url: string, labels: string[]) => {
        if (!shortUrl) {
            shortUrl = this.genShortUrl(url, userId);
        }
        const user = await this.userService.getUserById(userId);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);
        if (user.type === USER_TYPE.BASIC && user.urlUsed > 5) throw new GenericException(ERRORS.CONFLICT.URL_LIMIT);

        const link = await urlModel.create({ userId, name, shortUrl, url, labels });
        if (user.type === USER_TYPE.PREMIUM) {
            await this.redisService.setToRedis(shortUrl, url);
        } else {
            await this.redisService.setExpireKeyToRedis(shortUrl, url, BASIC_PLAN_URL_TIME);
        }
        await this.userService.useUrl(userId);
        const prettyLink: any = link;
        prettyLink.updatedAt = undefined;
        prettyLink.__v = undefined;
        return link;
    }

    modifyUrl = async (userId: string, urlId: string, name: string, shortUrl: string, labels: string[]) => {
        const oldUrl = await urlModel.findOneAndUpdate({ userId, _id: urlId }, { name, shortUrl, labels });
        if (!oldUrl) throw new GenericException(ERRORS.NOT_FOUND.URL);
        const user = await this.userService.getUserById(userId);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);
        if (userId.toString() !== oldUrl.userId.toString()) throw new GenericException(ERRORS.FORBIDDEN.UNAUTHORIZED);
        if (user.type === USER_TYPE.BASIC && user.urlUsed > 5) throw new GenericException(ERRORS.CONFLICT.URL_LIMIT);

        if (oldUrl.shortUrl !== shortUrl && user !== null) {
            await this.redisService.delFromRedis(oldUrl!.shortUrl);
            if (user!.type === USER_TYPE.PREMIUM) {
                await this.redisService.setToRedis(shortUrl, oldUrl.url);
            } else {
                await this.redisService.setExpireKeyToRedis(shortUrl, oldUrl.url, BASIC_PLAN_URL_TIME);
            }
        }
        await this.userService.useUrl(userId);
        return await urlModel.findOne({ _id: urlId }, '_id userId name url shortUrl labels clicks');
    }

    getUrlFullData = async (shortUrl: string, interval: HISTOGRAM_INTERVALS) => {
        return await this.clickService.getHistogram(shortUrl, interval);
    }

    getUrlsFromUserId = async (userId: string, after: Date | undefined, tags: string[] | undefined) => {
        if(tags) {
            return await urlModel.find({ userId: userId, labels: { $all: tags } }, '_id userId name url shortUrl labels creationTime clicks');
        }
        if (after !== null && isDate(after)) {
            return await urlModel.find({ userId: userId, creationTime: { $gt: after } }, '_id userId name url shortUrl labels creationTime clicks');
        }
        return await urlModel.find({ userId: userId }, '_id userId name url shortUrl labels creationTime clicks');
    }

    getUrlFromShort = async (shortUrl: string, redis = true) => {
        let url: string;
        if (redis) {
            url = await this.redisService.getFromRedis(shortUrl);
            if (!url) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
        } else {
            const link = await urlModel.findOne({ shortUrl });
            if (!link) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
            url = link.url;
        }
        this.clickService.createClick(shortUrl);
        await urlModel.findOneAndUpdate({ shortUrl }, {
            $inc: {
                clicks: 1
            }
        })
        return url;
    }

    renewUrl = async (shortUrl: string, userId: string) => {
        const link = await urlModel.findOne({ shortUrl });
        if (!link) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
        if (link.userId.toString() !== userId.toString()) throw new GenericException(ERRORS.FORBIDDEN.UNAUTHORIZED);
        const user = await this.userService.getUserById(link.userId);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);
        if (user.type === USER_TYPE.BASIC && user.urlUsed > 5) throw new GenericException(ERRORS.CONFLICT.URL_LIMIT);
        if (user.type === USER_TYPE.PREMIUM) {
            await this.redisService.setToRedis(shortUrl, link.url);
        } else {
            await urlModel.findOneAndUpdate({ shortUrl }, { lastRenew: Date.now });
            await this.redisService.setExpireKeyToRedis(shortUrl, link.url, BASIC_PLAN_URL_TIME);
            await this.userService.useUrl(link.userId);
        }
        return link;
    }

    private genShortUrl = (url: string, userId: string) => {
        return Md5.init(url + userId);
    }


}

export default UrlService;