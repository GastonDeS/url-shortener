import Result from "../models/Result";
import UserModel from "../models/UserModel";
import axios from "axios";
import { User } from "../UserContext";

const getBasicToken = (email: string, password: string): string =>{
  const credentials = email + ":" + password;
  return btoa(credentials);
}

export class AuthService {

  public async login(email: string, password: string): Promise<Result<User>> {
    try {
      let config = {
        headers:  {'x-basic-auth' : getBasicToken(email, password)}
      }
      const response = await axios.get<User>('http://localhost:8080/v1/auth/login', config);
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}