import { USER_TYPE } from "../models/user.model";

export interface IPrettyUser {
    userId: string,
    username: string,
    email: string,
    type: USER_TYPE
}