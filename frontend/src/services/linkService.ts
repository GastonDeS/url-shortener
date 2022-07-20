import axios from "axios";
import { axiosService } from ".";
import { methods } from "../assets/constants";
import Result from "../models/Result";

type EditLinkData = {
  shortUrl: string;
  name: string;
  labels: string[];
};

const LINK_BASE_URL = '/v1/urls/';

export class LinkService {

  public async editLink(editLinkData: EditLinkData, linkId: string): Promise<Result<any>> {
    try {
      const response = await axiosService.authAxiosWrapper(methods.POST, LINK_BASE_URL + linkId, {}, editLinkData);
      return Result.handleResult(response);
    } catch (error: any) {
      return Result.failure(error.response.status);
    }
  }

}