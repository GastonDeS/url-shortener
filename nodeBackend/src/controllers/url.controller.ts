import { RequestHandler } from 'express';
import { ERRORS } from '../constants/error.constant';
import GenericException from '../exceptions/generic.exception';
import urlService from '../services/url.service';

export class UrlController {
    private urlService: urlService;


    constructor() {
        this.urlService = urlService.getInstance();
    }

    createurl : RequestHandler = async (req, res, next) => {
        const userId = req.user.id;
        const url = req.body.url;
        const shortUrl = req.body.shortUrl;
        const labels = req.body.labels;

        try {
            const link = await this.urlService.addUrl(userId, shortUrl,url, labels);
            return res.status(201).send({link});
        } catch (error) {
            next(error);
        }
    }

    getUrlFromShort: RequestHandler = async (req, res, next) => {
        const shortUrl = req.params.shortUrl;

        try {
            if (!shortUrl) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);
            const init = Date.now();
            const url = await this.urlService.getUrlFromShort(shortUrl, false);
            console.log(`time: ${Date.now() - init}`);
            return res.redirect(url);
        } catch (error) {
            next(error);
        }
    }
}