import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import { logger } from "@/boot";
import { localStore } from "@/services";

import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
});
router.beforeEach(async (to, from, next) => {
  const auth = to.meta.requiresAuth;
  if (auth && !localStore.has("uid")) {
    localStore.set("targetPath", to.fullPath);
    next("/");
  } else {
    next();
  }
});
export default router;

export const navTo = (target: string, delay = 0) => {
  const from = router.currentRoute.value?.fullPath;
  logger.debug("Navigate To", target, { from, delay });
  if (from == target || from == `/${target}`) {
    logger.warn(`Location is already ${from}`);
    return;
  }
  localStore.set("targetPath", target);
  setTimeout(() => {
    router.push(target);
  }, delay);
};
