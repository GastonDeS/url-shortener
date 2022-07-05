import express, { Application } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { UserRoutes } from "./routes/user.routes";
import { UrlRoutes } from "./routes/url.routes";
import ErrorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import RedisService from "./services/redis.service";
import { AuthRoutes } from "./routes/auth.routes";
import UserService from "./services/user.service";
import UserAuthService from "./services/auth.service";

class App {
    public app: Application;
    private setBasicConfig: boolean;

    constructor(setBasicConfig = true) {
        this.app = express();
        this.setBasicConfig = setBasicConfig;

        this.setConfig();
        this.setStorageConfig();

        this.initServices();

        this.routes();
        this.initializeErrorHandling();
    }

    private initServices() {
        UserService.getInstance();
    }

    private setConfig() {

        if (this.setBasicConfig) {
            this.app.use(express.json({ limit: '50mb' }));
            this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
            this.app.use(cors());
        }

        this.app.set('trust proxy', 1);
        this.app.disable('x-powered-by');
    }

    private initializeErrorHandling() {
        this.app.use(ErrorHandlerMiddleware);
    }

    private setStorageConfig() {
        if (process.env.DB_URL) {
            try {
                mongoose
                    .connect(process.env.DB_URL)
                    .then(() => console.log(`Mongo connected.`))
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }

        if (process.env.REDIS_URL && process.env.REDIS_PORT) {
            RedisService.getInstance(
                process.env.REDIS_URL,
                parseInt(process.env.REDIS_PORT, 10),
                process.env.REDIS_PASSWORD,
            );        
        }
    }

    private routes(): void {

        this.app.use('/v1/users/', new UserRoutes().router);
        this.app.use('/v1/urls/', new UrlRoutes().router);
        this.app.use('/v1/auth/', new AuthRoutes().router);

    }
}

export default new App().app;