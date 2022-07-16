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
        return this.prettyUser(await userModel.create({username, email, password, type}));
    }

    updatePlan = async (userId: string) => {
        await userModel.findOneAndUpdate({_id: userId}, {role: USER_TYPE.PREMIUM});
        return true;
    }

    prettyUser = (user: IUser): IPrettyUser => {
        return {
            userId: user._id,
            email: user.email,
            type: user.type,
            username: user.username
        } as IPrettyUser;
    }

    getUserByEmail = async (email: string) => {
        return await userModel.findOne({email: email});
    }

    getUserById = async (userId: string) => {
        return await userModel.findOne({_id: userId});
    }
}

export default UserService;