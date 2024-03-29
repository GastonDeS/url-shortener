import { RequestHandler } from 'express';
import { ERRORS } from '../constants/error.constant';
import { HISTOGRAM_INTERVALS } from '../constants/general.constant';
import GenericException from '../exceptions/generic.exception';
import { getStartOfDate } from '../helpers/date.helper';
import { USER_TYPE } from '../models/user.model';
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

            const user = await this.userService.createUser(username, email, password);
            return res.status(201).send({user});
        } catch (error) {
            next(error);
        }
    }

    getUserById: RequestHandler = async (req, res, next) => {
        const userId: string = req.user.id;

        try {
            if (!userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

            const user = await this.userService.getPrettyUser(userId);
            return res.status(200).send({user});
        } catch (err) {
            next(err);
        }
    }

    updatePlan: RequestHandler = async (req, res, next) => {
        const userId = req.user.id;

        try {
            const user = await this.userService.updatePlan(userId);
            if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);
            return res.status(200).send({role: user.type});
        } catch (error) {
            next(new GenericException(ERRORS.NOT_FOUND.USER));
        }
    }

    getUrlsFromUser: RequestHandler = async (req, res, next) => {
        const userId = req.user.id;
        const after: Date = new Date(req.query.after as string);
        let labels: string | undefined = req.query.labels as string;

        const startDate = getStartOfDate(after);
        try {
            if (!userId && userId !== req.params.userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

            const urls = await this.urlService.getUrlsFromUserId(userId, startDate, labels?.split(','));
            return res.send(urls);
        } catch (error) {
            next(error);
        }
    }

    getFullUrlData: RequestHandler = async (req, res, next) => {
        const shortUrl = req.params.shortUrl;
        const userId = req.user.id;
        let interval: HISTOGRAM_INTERVALS = req.query.interval as HISTOGRAM_INTERVALS;

        try {
            if (!interval || interval !== HISTOGRAM_INTERVALS.DAY) interval = HISTOGRAM_INTERVALS.MONTH;
            if (!shortUrl || !userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

            const urls = await this.urlService.getUrlFullData(shortUrl, interval);
            return res.send(urls);
        } catch (error) {
            next(error);
        }
    }
}