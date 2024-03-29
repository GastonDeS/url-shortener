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
        const name = req.body.name;
        const shortUrl = req.body.shortUrl;
        const labels = req.body.labels;

        try {
            const link = await this.urlService.addUrl(userId, name, shortUrl, url, labels);
            return res.status(201).send({link});
        } catch (error) {
            const err: GenericException = error as any;
            if (err.message) next(error)
            next(new GenericException(ERRORS.CONFLICT.URL));
        }
    }

    modifyUrl: RequestHandler = async (req, res, next) => {
        const userId = req.user.id;
        const shortUrl = req.body.shortUrl;
        const name = req.body.name;
        const urlId = req.params.urlId;
        const labels = req.body.labels;

        try {
            const link = await this.urlService.modifyUrl(userId, urlId, name, shortUrl, labels);
            return res.status(201).send({link});
        } catch (error) {
            if (error instanceof GenericException) next(error)
            next(new GenericException(ERRORS.CONFLICT.URL));
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

    renewUrl: RequestHandler = async (req, res, next) => {
        const userId = req.user.id;
        const shortUrl = req.params.shortUrl;

        try {
            if (!shortUrl || !userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

            await this.urlService.renewUrl(shortUrl, userId);
            return res.status(202).send();
        } catch (error) {
            next(error);
        }
    }
}