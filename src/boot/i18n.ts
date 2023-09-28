import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";

import messages from "@/i18n";

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-AU' as the master schema for the resource
export type MessageSchema = (typeof messages)["en-AU"];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module "vue-i18n" {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

const instance = createI18n({
  locale: "en-AU",
  fallbackLocale: "en-AU",
  legacy: false,
  messages,
});

let i18n: typeof instance.global;

export default boot(({ app }) => {
  // Set i18n instance on app for composition API
  app.use(instance);

  // Export an instance of the global for use in services
  i18n = instance.global;
});

export { i18n };
