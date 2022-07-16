import axios from "axios";
import { axiosService } from ".";
import { methods } from "../assets/constants";
import Result from "../models/Result";

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
      const response = await axiosService.axiosWrapper(methods.POST, USER_BASE_URL, config, formData);
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}