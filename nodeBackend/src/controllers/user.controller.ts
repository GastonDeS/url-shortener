import { RequestHandler } from 'express';
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
        try {
            const user = await this.userService.createUser(req.body.email, req.body.password);
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
}