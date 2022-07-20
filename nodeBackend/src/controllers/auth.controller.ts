import { RequestHandler } from "express";
import { ERRORS } from "../constants/error.constant";
import GenericException from "../exceptions/generic.exception";
import UserAuthService from "../services/auth.service";


export class AuthController {
    private authService: UserAuthService;

    constructor() {
        this.authService = UserAuthService.getInstance();
    }

    public login: RequestHandler = async (req, res, next) => {
        const email: string = req.userBasic.email;
        const password: string = req.userBasic.password;

        try {
            if (!password || !email ) {
                throw next(new GenericException(ERRORS.BAD_REQUEST.PARAMS));
            }

            const login = await this.authService.login(email.toLowerCase(), password);

            return res.status(200).send(login);
        } catch (err) {
            next(err);
        }
    }
}