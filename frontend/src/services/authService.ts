import Result from "../models/Result";
import { User } from "../UserContext";
import { axiosService } from ".";
import { methods } from "../assets/constants";

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
      const response = await axiosService.axiosWrapper<User>(methods.GET, 'http://localhost:8080/v1/auth/login', config, {});
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}