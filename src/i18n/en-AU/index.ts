import { Language } from "@/models";

export default {
  [Language.loginSuccess]: "Successfully signed in",
  [Language.logoutSuccess]: "Successfully signed out",
  [Language.magicLinkCallbackError]: "There was a problem with the callback url parameters",
  [Language.magicLinkEmailIsMissing]: "Email address is missing or incomplete",
  [Language.magicLinkSendFailed]: "Magic link failed to send; {error}",
  [Language.magicLinkSent]: "Magic link sent to {email}",
};
