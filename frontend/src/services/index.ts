import { AuthService } from "./authService";
import { AxiosService } from "./axiosService";
import { LinkService } from "./linkService";
import { UserService } from "./userService";

const authService = new AuthService();
const userService = new UserService();
const axiosService = new AxiosService();
const linkService = new LinkService();

export {
  authService,
  userService,
  axiosService,
  linkService
};