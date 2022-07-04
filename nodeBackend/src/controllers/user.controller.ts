import { RequestHandler } from 'express';
import UserService from '../services/user.service';

export class UserController {
    private userService: UserService;


    constructor() {
        this.userService = UserService.getInstance();
    }

    createUser : RequestHandler = async (req, res, next) => {
        try {
            const user = await this.userService.createUser(req.body.email, req.body.password);
            return res.status(201).send({user});
        } catch (error) {
            next(error);
        }
    }
}