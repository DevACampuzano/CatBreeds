import { AxiosRequestConfig, Method } from "axios";

type IHeaderPropsAPI = {
  "access-token": string | undefined;
  "Content-Type": string | undefined;
  "Accept-Language": string | undefined;
};

interface IRequestProp extends AxiosRequestConfig {
  headers: IHeaderPropsAPI;
  method: Method;
}

interface ILoadApiProps {
  endpoint: string;
  token?: boolean;
  type: Method;
  instance?: "api_back";
  body?: unknown;
  abortController?: AbortController;
}

interface IErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
