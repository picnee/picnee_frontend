
import { axiosInstance } from "../axios";
import { ApiEndpoint } from "./api-end-point";

export interface BackendApiParams {
    endpoint: ApiEndpoint;
    data?: Record<string, unknown>;
    params?: any;
    accessToken?: string;
  }
  

export const backendApi = async <T>({
    endpoint,
    data,
    params,
    accessToken,
  }: BackendApiParams) => {
    const { url, method, authorization } = endpoint;

    const res = (await axiosInstance({
      url,
      method,
      data,
      params,
    })) as { data: any };
  
    return res.data;
  };
  