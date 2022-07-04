import { Router } from 'express';
import { urlencoded } from 'body-parser';
import cors from 'cors';
import { UserController } from '../controllers/user.controller';

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

    }
}
