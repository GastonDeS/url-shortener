import { FIFTEEN_DAYS } from "../constants/general.constant";
import urlModel from "../models/url.model";
import RedisService from "./redis.service";
import {Md5} from "md5-typescript";
import GenericException from "../exceptions/generic.exception";
import { ERRORS } from "../constants/error.constant";


export default class UrlService {
    private static instance: UrlService;
    private redisService: RedisService;

    constructor() {
        this.redisService = RedisService.getInstance();
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
        const link = await urlModel.create({userId, shortUrl, url, labels});
        await this.redisService.setExpireKeyToRedis(shortUrl, url, FIFTEEN_DAYS);
        return link;
    }

    getUrlFromShort = async (shortUrl: string) => {
        const link = await urlModel.findOne({shortUrl});
        if (!link) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
        return link.url;
        // const url = await this.redisService.getFromRedis(shortUrl);
        // if (!url) throw new GenericException(ERRORS.NOT_FOUND.GENERAL);
        // return url;
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