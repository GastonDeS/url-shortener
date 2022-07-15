import { FIFTEEN_DAYS } from "../constants/general.constant";
import urlModel, { IUrl } from "../models/url.model";
import RedisService from "./redis.service";
import {Md5} from "md5-typescript";
import GenericException from "../exceptions/generic.exception";
import { ERRORS } from "../constants/error.constant";
import UserService from "./user.service";
import { USER_TYPE } from "../models/user.model";
import ClickService from "./click.service";


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

    addUrl = async (userId: string, shortUrl: string | undefined, url: string, labels: string[]) => {
        if (!shortUrl) {
            shortUrl = this.genShortUrl(url, userId);
        }
        const user = await this.userService.getUserById(userId);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER_NOT_FOUND);

        const link = await urlModel.create({userId, shortUrl, url, labels});
        if (user.type === USER_TYPE.PREMIUM) {
            await this.redisService.setToRedis(shortUrl, url);
        } else {
            await this.redisService.setExpireKeyToRedis(shortUrl, url, FIFTEEN_DAYS);
        }
        return link;
    }

    getUrlFullData = async (shortUrl: string) => {
        return await this.clickService.getHistogram(shortUrl);
    }

    getUrlsFromUserId = async (userId: string) => {
        return await urlModel.find({userId: userId});
    }

    getUrlFromShort = async (shortUrl: string, redis = true) => {
        let url: string;
        if (redis) {
            url = await this.redisService.getFromRedis(shortUrl);
            if (!url) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
        } else {
            const link = await urlModel.findOne({shortUrl});
            if (!link) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
            url = link.url; 
        }
        this.clickService.createClick(shortUrl);
        return url;
    }

    renewUrl = async (shortUrl: string) => {
        const link = await urlModel.findOne({shortUrl});
        if (!link) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
        await this.redisService.setExpireKeyToRedis(shortUrl, link.url, FIFTEEN_DAYS);
        return link;
    }

    private genShortUrl = (url: string, userId: string) => {
        return Md5.init(url+userId);
    }


}

export default UrlService;