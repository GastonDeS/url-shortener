import { Router } from 'express';
import { urlencoded } from 'body-parser';
import cors from 'cors';
import { AuthController } from '../controllers/auth.controller';
import userBasicAuthMiddleware from '../middlewares/user.basic.middleware';

export class AuthRoutes {
    
    public router: Router = Router();
    public controller: AuthController = new AuthController();

    constructor() {
        this.init();
    }

    public init() : void {

        this.router.use(
            urlencoded({
                extended: true,
            }),
        );
        this.router.use(cors());

        this.router.get('/login', userBasicAuthMiddleware, this.controller.login);
    }
}
        