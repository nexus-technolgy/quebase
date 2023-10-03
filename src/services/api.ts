import { Logger } from "@nexustech/logger";
import axios, { type AxiosInstance, type AxiosRequestConfig, AxiosResponse } from "axios";
import { Auth } from "firebase/auth";

import { logger as defaultLogger } from "@/boot";
import { redact } from "@/helpers";
import { mockRequestInterceptor, mockResponseErrorInterceptor } from "@/mocks";

import { localStore } from "./local-store";

type RestApiParams = {
  auth: Auth;
  baseUrl?: string;
  logger?: Logger;
};

export interface IRestApi {
  /**
   * Make an API call on the configured RESTful service, using the default client token acquirer if an auth service is provided
   * @param input { string | AxiosRequestConfig } GET a url path, or use a full Axios Request object
   */
  call<T = unknown>(input: string | AxiosRequestConfig): Promise<{ status: number; data: T }>;
}

/**
 * Common API class to extend a REST API consumer service.
 *
 * Handles token aquisition and provides a common Axios `call` function with built-in logging, mocking and error handling
 */
export class RestApi implements IRestApi {
  private axios: AxiosInstance;
  readonly auth: Auth;
  readonly logger: Logger | Console;

  constructor({ auth, baseUrl, logger }: RestApiParams) {
    this.logger = logger ?? defaultLogger;
    this.auth = auth;
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
    });

    this.axios.interceptors.request.use(async (request) => {
      const config = { ...request };

      if (!config.headers.get("Authorization") && this.auth) {
        const jwt = await this.auth.currentUser?.getIdToken();
        config.headers.set("Authorization", `Bearer ${jwt}`);
      }

      // Firebase requires sid as a header (not a cookie)
      config.headers.set("sid", `sid=${localStore.get<string>("sid")}`);

      // Axios already does this; the next line is purely for logging
      const url = config.url?.startsWith("http") ? config.url : `${config.baseURL}${config.url}`;
      this.logger.debug(`axios: ${config.method?.toUpperCase()} ${url}`);
      if (config.headers) this.logger.debug("axios:", config.headers);
      if (config.data) this.logger.debug("axios:", { data: redact(config.data) });

      return mockRequestInterceptor(config);
    }, undefined);

    this.axios.interceptors.response.use(
      (value: AxiosResponse) => Promise.resolve(value),
      mockResponseErrorInterceptor
    );
  }

  call = async <T = unknown>(input: string | AxiosRequestConfig) => {
    const { ...config } = typeof input == "string" ? ({ url: input } as AxiosRequestConfig) : input;
    if (!config.method && !config.data) config.method = "get"; // default method for string only URL call
    if (!config.method && config.data) config.method = "post"; // default method for call with data payload

    try {
      const now = Date.now();
      const { status, statusText, data } = await this.axios<T>(config);

      this.logger.info(
        `axios::success ${config.method?.toUpperCase()} ${config.url} (${Date.now() - now}ms)`
      );
      this.logger.debug({ status, statusText, data: redact(data) });

      return { status, data };
    } catch (err: unknown) {
      return Promise.reject(err);
    }
  };
}
