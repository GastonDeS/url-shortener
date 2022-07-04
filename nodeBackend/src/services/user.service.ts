import userModel, { USER_TYPE } from "../models/user.model";

export default class UserService {
    private static instance: UserService;


    static getInstance = () => {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    };

    createUser = async (email: string, password: string, type: USER_TYPE = USER_TYPE.PERSON) => {
        await userModel.create({email, password, type});
    }
}