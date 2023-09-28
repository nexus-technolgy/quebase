import { Logger } from "@nexustech/logger";
import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $logger: Logger;
  }
}

let logLimit = 4;
if (process.env.DEV) logLimit = 5;
if (process.env.PROD) logLimit = 3;
const logger = new Logger({ logLimit });
if (process.env.VITE_LOG_LIMIT) logger.setLevel(process.env.VITE_LOG_LIMIT);

export default boot(({ app }) => {
  // Options API use only
  app.config.globalProperties.$logger = logger;
});

export { logger };
