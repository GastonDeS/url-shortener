import axios from 'axios';
import { methods } from '../assets/constants';

export class AxiosService {

  public authAxiosWrapper<T>(action: number, path: string, config: any, data: any = {}) {
    let newConfig = { ...config };
    newConfig.headers = { ...config.headers };
    const token = localStorage.getItem('token');
    if (token) newConfig.headers['x-access-token'] = token;
    if (action === methods.POST) newConfig.headers['Content-Type'] = 'application/json'
    return this.axiosWrapper(action, path, newConfig, data);
  }

  public axiosWrapper<T>(action: number, path: string, config: any, data: any = {}) {
    switch (action) {
      case methods.GET:
        return axios.get<T>(path, config);
      case methods.POST:
        return axios.post<T>(path, data, config);
      case methods.PUT:
        return axios.put<T>(path, data, config);
      case methods.DELETE:
        return axios.delete<T>(path, config);
      default:
        break;
    }
    throw Error("Method not allowed");
  }
}