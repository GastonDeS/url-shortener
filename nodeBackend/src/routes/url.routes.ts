import { Router } from 'express';
import { urlencoded } from 'body-parser';
import cors from 'cors';
import { UrlController } from '../controllers/url.controller';
import userAuthMiddleware from '../middlewares/userAuth.middleware';

export class UrlRoutes {
    
    public router: Router = Router();
    public controller: UrlController = new UrlController();

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

        this.router.post('/', userAuthMiddleware, this.controller.createurl);
        this.router.post('/:urlId', userAuthMiddleware, this.controller.modifyUrl);
        this.router.get('/:shortUrl', this.controller.getUrlFromShort);

    }
}
