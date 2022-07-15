import Result from "../models/Result";
import UserModel from "../models/UserModel";
import axios from "axios";

export class AuthService {

  public async login(email: string, password: string): Promise<Result<UserModel>> {
    try {
      const response = await axios.get<UserModel>("/v1/auth/login", {
        params : {
          email: email,
          password: password
        }
      });
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}