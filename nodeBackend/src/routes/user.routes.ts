import { Router } from 'express';
import { urlencoded } from 'body-parser';
import cors from 'cors';
import { UserController } from '../controllers/user.controller';
import userAuthMiddleware from '../middlewares/userAuth.middleware';

export class UserRoutes {
    
    public router: Router = Router();
    public controller: UserController = new UserController();

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

        this.router.post('/', this.controller.createUser);
        this.router.post('/:userId', userAuthMiddleware, this.controller.updatePlan);
        this.router.get('/:userId/links/', userAuthMiddleware, this.controller.getUrlsFromUser);
    }
}
