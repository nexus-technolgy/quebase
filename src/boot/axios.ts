import { R } from "@nexustech/fingerprint/dist/types";
import Axios, { AxiosInstance } from "axios";
import { boot } from "quasar/wrappers";

import { auth, logger } from "@/boot";
import { IRestApi, RestApi } from "@/services";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: IRestApi;
  }
}

const axiosConfig: R<string | undefined> = {
  api: undefined,
  host: undefined,
};
const axiosEnv = import.meta.env;

for (const key in axiosEnv) {
  if (key.startsWith("VITE_AXIOS")) axiosConfig[key.replace("VITE_AXIOS_", "")] = axiosEnv[key];
}

// The API base URL, including version path if applicable
const baseUrl = axiosConfig.api;

// The hosting base URL from where assets can be programatically requested
const baseURL = axiosConfig.host;

const axios = Axios.create({ baseURL });
const api = new RestApi({ auth, baseUrl, logger });

export default boot(({ app }) => {
  // Options API use only
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, axios };
