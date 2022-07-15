import { AuthService } from "./authService";
import { AxiosService } from "./axiosService";
import { UserService } from "./userService";

const authService = new AuthService();
const userService = new UserService();
const axiosService = new AxiosService();

export {
  authService,
  userService,
  axiosService
};