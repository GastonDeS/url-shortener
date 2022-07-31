import { ERRORS } from "../constants/error.constant";
import GenericException from "../exceptions/generic.exception";
import { hashPassword } from "../helpers/crypto.helper";
import { IPrettyUser } from "../interfaces/pretty.interface";
import userModel, { IUser, USER_TYPE } from "../models/user.model";

class UserService {
    private static instance: UserService;


    static getInstance = () => {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    };

    createUser = async (
        username: string,
        email: string, 
        password: string, 
        type: USER_TYPE = USER_TYPE.BASIC
    ) => {
        const passwordHash = await hashPassword(password);
        return this.prettyUser(await userModel.create({username, email, password: passwordHash, type}));
    }

    updatePlan = async (userId: string) => {
        return await userModel.findOneAndUpdate({_id: userId}, {type: USER_TYPE.PREMIUM}, {new: true});
    }

    prettyUser = (user: IUser): IPrettyUser => {
        return {
            userId: user._id,
            email: user.email,
            type: user.type,
            username: user.username,
            urlUsed: user.urlUsed
        } as IPrettyUser;
    }

    useUrl = async (userId: string) => {
        await userModel.findOneAndUpdate({_id: userId}, {$inc: {
            urlUsed: 1
        }});
    }

    getUserByEmail = async (email: string) => {
        return await userModel.findOne({email: email});
    }

    getPrettyUser = async (userId: string) => {
        const user: IUser | null = await this.getUserById(userId);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);
        return this.prettyUser(user);
    }

    getUserById = async (userId: string) => {
        return await userModel.findOne({_id: userId});
    }
}

export default UserService;