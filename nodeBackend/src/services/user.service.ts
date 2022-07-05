import userModel, { USER_TYPE } from "../models/user.model";

class UserService {
    private static instance: UserService;


    static getInstance = () => {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    };

    createUser = async (email: string, password: string, type: USER_TYPE = USER_TYPE.PERSON) => {
        return await userModel.create({email, password, type});
    }

    updatePlan = async (userId: string) => {
        await userModel.findOneAndUpdate({_id: userId}, {role: USER_TYPE.PREMIUM});
        return true;
    }

    getUserByEmail = async (email: string) => {
        return await userModel.findOne({email: email});
    }

    getUserById = async (userId: string) => {
        return await userModel.findOne({_id: userId});
    }
}

export default UserService;