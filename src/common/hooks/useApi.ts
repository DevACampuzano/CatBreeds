import { useState } from "react";
import { AxiosError } from "axios";
import { back } from "../api";
// import { useUserStore } from "../../stores";
import {
  IErrors,
  IHeaderPropsAPI,
  ILoadApiProps,
  IRequestProp,
} from "../interfaces/useApi.interface";

export const useApi = () => {
  const [loadingApi, setLoading] = useState<string[]>([]);
  // const { localToken, logOut } = useUserStore((state) => ({
  //   localToken: state.token,
  //   logOut: state.logOut,
  // }));

  const loadApi = async <R extends object>({
    type = "GET",
    endpoint,
    // token,
    body,
    instance = "api_back",
    abortController = new AbortController(),
  }: ILoadApiProps): Promise<R> => {
    setLoading([...loadingApi, `${type}__${endpoint}`]);

    try {
      const headers: IHeaderPropsAPI = {
        "access-token": undefined,
        "Content-Type": undefined,
        "Accept-Language": "es",
      };

      // if (token && localToken) {
      //   if (localToken.length === 0) {
      //     throw new Error("No has iniciado sesión.");
      //   }
      //   headers["access-token"] = localToken;
      // }

      const config: IRequestProp = {
        method: type,
        url: endpoint,
        headers: headers,
        signal: abortController.signal,
      };

      if (body) {
        config.data = body;
      }

      let response;
      switch (instance) {
        case "api_back":
        default:
          response = await back<R>(config).then((res) => res.data);
          break;
      }

      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      return response;
    } catch (error) {
      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      if (error instanceof AxiosError) {
        if (error.response?.data?.msg) {
          switch (error.response.data.msg) {
            case "INVALID_TOKEN":
              // logOut();
              throw new Error("Sesión expirada vuelva iniciar sesion.");
            case "NOT-PROVIDED-TOKEN":
              throw new Error("Se requiere un token.");
            case "NOT-PROVIDED-IP":
              throw new Error("No se reconoció el origen de la petición.");
            default:
              throw new Error(error.response.data.msg);
          }
        } else if (error.response?.data.errors) {
          const listMsg: string[] = error.response?.data.errors.map(
            ({ msg }: IErrors) => msg
          );
          throw new Error(listMsg.join(", "));
        } else {
          throw new Error(
            "Error de conexión, actualiza la página e intente nuevamente."
          );
        }
      } else {
        throw new Error(
          "Error de conexión, actualiza la página e intente nuevamente."
        );
      }
    }
  };

  return {
    loadApi,
    loadingApi,
    // loggedApi: Boolean(localToken),
  };
};
