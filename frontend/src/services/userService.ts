import axios from "axios";
import Result from "../models/Result";
import UserModel from "../models/UserModel";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const USER_BASE_URL = 'http://localhost:8080/v1/users/';

export class UserService {

  public async register(formData: FormData): Promise<Result<any>> {
    try {
      let config = {
        headers:  {'Content-Type' : 'application/json'}
      }
      const response = await axios.post<any>(USER_BASE_URL, formData, config);
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}