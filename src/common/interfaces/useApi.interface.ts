import { AxiosRequestConfig, Method } from "axios";

export type IHeaderPropsAPI = {
  "access-token": string | undefined;
  "Content-Type": string | undefined;
  "Accept-Language": string | undefined;
};

export interface IRequestProp extends AxiosRequestConfig {
  headers: IHeaderPropsAPI;
  method: Method;
}

export interface ILoadApiProps {
  endpoint: string;
  token?: boolean;
  type: Method;
  instance?: "api_back";
  body?: unknown;
  abortController?: AbortController;
}

export interface IErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
