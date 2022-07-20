import axios from "axios";
import { axiosService } from ".";
import { methods } from "../assets/constants";
import Result from "../models/Result";

type EditLinkData = {
  userId: number;
  shortUrl: string;
  name: string;
  urlId: string;
  labels: string[];
};

const LINK_BASE_URL = 'http://localhost:8080/v1/urls/';

export class LinkService {

  public async editLink(editLinkData: EditLinkData): Promise<Result<any>> {
    try {
      const response = await axiosService.authAxiosWrapper(methods.POST, LINK_BASE_URL + editLinkData.urlId.toString(), {}, editLinkData);
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}