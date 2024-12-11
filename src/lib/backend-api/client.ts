
import { axiosInstance } from "../axios";
import { ApiEndpoint } from "./api-end-point";

export interface BackendApiParams {
    endpoint: ApiEndpoint;
    data?: Record<string, unknown>;
    params?: any;
  }
  

export const backendApi = async <T>({
    endpoint,
    data,
    params,
  }: BackendApiParams) => {
    const { url, method } = endpoint;

    const res = (await axiosInstance({
      url,
      method,
      data,
      params,
    })) as { data: any };
  
    return res.data;
  };
  