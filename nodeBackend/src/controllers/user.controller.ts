import { RequestHandler } from 'express';
import { ERRORS } from '../constants/error.constant';
import GenericException from '../exceptions/generic.exception';
import UrlService from '../services/url.service';
import UserService from '../services/user.service';

export class UserController {
    private userService: UserService;
    private urlService: UrlService;


    constructor() {
        this.userService = UserService.getInstance();
        this.urlService = UrlService.getInstance();
    }

    createUser : RequestHandler = async (req, res, next) => {
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;

        try {
            if (!username || !email || !password) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

            const user = await this.userService.createUser(req.body.username, req.body.email, req.body.password);
            return res.status(201).send({user});
        } catch (error) {
            next(error);
        }
    }

    updatePlan: RequestHandler = async (req, res, next) => {
        const userId = req.user.id;

        try {
            await this.userService.updatePlan(userId);
            return res.status(200).send({role: 1});
        } catch (error) {
            next(error);
        }
    }

    getUrlsFromUser: RequestHandler = async (req, res, next) => {
        const userId = req.user.id;

        try {
            const urls = await this.urlService.getUrlsFromUserId(userId);
            return res.send(urls);
        } catch (error) {
            next(error);
        }
    }

    getFullUrlData: RequestHandler = async (req, res, next) => {
        const shortUrl = req.params.shortUrl;

        try {
            const urls = await this.urlService.getUrlFullData(shortUrl);
            return res.send(urls);
        } catch (error) {
            next(error);
        }
    }
}