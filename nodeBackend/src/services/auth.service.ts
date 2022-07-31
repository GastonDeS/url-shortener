import { ERRORS } from "../constants/error.constant";
import GenericException from "../exceptions/generic.exception";
import UserService from "./user.service";
import * as jwt from 'jsonwebtoken';
import Crypto from "crypto";
import Bluebird from "bluebird";
import { pbkdf2, PBKDF2_HASH, validatePassword } from "../helpers/crypto.helper";


class UserAuthService {
    private static instance: UserAuthService;
    private userService: UserService;
    private jwtKey: string;
    private accessTokenExpireTime: string;

    private constructor() {
        this.accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE_TIME ?? '';
        this.jwtKey = process.env.JWT_KEY ?? '';
        this.userService = UserService.getInstance();
    }

    static getInstance = () : UserAuthService=> {
        if (!UserAuthService.instance) {
            UserAuthService.instance = new UserAuthService();
        }
        return UserAuthService.instance;
    };

    login = async (email: string, password: string) => {
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);

        if (!validatePassword(password, user.password!)) throw new GenericException(ERRORS.NOT_FOUND.USER);

        const accessToken = this.signAccessToken(user._id.toString(), user.email);
        const prettyUser = this.userService.prettyUser(user);
        return {user: prettyUser, accessToken};
    }

    verifyToken = (token: string) : string | jwt.JwtPayload=> {

        try{
            const pubKey = this.jwtKey;
            return jwt.verify(token, pubKey);
        } catch(err){
            const error = err as any;
            if(error.name == 'TokenExpiredError') {
                throw {status: 401, message: "Expired token."};
            } else {
                throw {status: 400, message: "Invalid token."};
            }
        }
    }

    private signAccessToken = (userId: string, email: string) : string => {
        return this.jwtSign(userId, email, this.accessTokenExpireTime);
    }

    private jwtSign = (userId: string, email: string, expiryTime: string) => {
        const payload = {id: userId, email: email};
        const key = this.jwtKey;
        return jwt.sign(payload, key, {issuer: 'byPS', expiresIn: expiryTime });
    }

}

export default UserAuthService;