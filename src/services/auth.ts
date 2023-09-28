import {
  ActionCodeSettings,
  getRedirectResult,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithRedirect,
  User,
  UserCredential,
} from "firebase/auth";
import { Notify } from "quasar";

import { auth, i18n, logger } from "@/boot";
import { feedbackWrapper } from "@/helpers";
import { Language, NotifyError } from "@/models";
import { navTo } from "@/router";
import { localStore } from "@/services";

onAuthStateChanged(auth, (user) => {
  if (user && !localStore.has("uid")) {
    // user logged in
    logger.debug("Firebase Auth", { user });
    localStore.set("uid", user.uid);
    Notify.create({
      message: i18n.t(Language.loginSuccess),
      position: "top-right",
      type: "positive",
      timeout: 1000,
    });

    // navigate to where the user intended before being redirected to login
    const targetPath = localStore.get<string>("targetPath", "/home");
    navTo(targetPath == "/" || targetPath == "" ? "/home" : targetPath);
  }

  if (!user && localStore.has("uid")) {
    // user logged out
    localStore.remove("uid");
    localStore.remove("targetPath");
    Notify.create({
      message: i18n.t(Language.logoutSuccess),
      position: "top-right",
      type: "positive",
      icon: "logout",
      timeout: 1000,
    });
  }
});

const actionCodeSettings: ActionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost/",
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: "com.example.ios",
  // },
  // android: {
  //   packageName: "com.example.android",
  //   installApp: true,
  //   minimumVersion: "12",
  // },
  // dynamicLinkDomain: "http://localhost:9000",
};

export const loginWithEmail = async (email?: string): Promise<void> => {
  logger.debug("login with Email (Magic Link)", { email });
  if (!email) throw new NotifyError({ message: i18n.t(Language.magicLinkEmailIsMissing) });
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save the email locally so there is no need to ask the user for it again on this device
    logger.debug("Magic Link: sent to", email);
    localStore.set("email", email);
    Notify.create({
      message: i18n.t(Language.magicLinkSent, { email }),
      position: "top-right",
      type: "positive",
      timeout: 1500,
    });
  } catch (error) {
    logger.error("Magic Link:", error);
    if (error instanceof Error)
      throw new NotifyError({
        message: i18n.t(Language.magicLinkSendFailed, { error: error.message }),
        position: "top-right",
        type: "negative",
      });
  }
};

const loginWithLink = async (email: string) => {
  const uri = window.location.href.replace(/:\d+\/?/, "/"); // get rid of any port number
  if (isSignInWithEmailLink(auth, uri)) {
    if (!email) throw new NotifyError({ message: i18n.t(Language.magicLinkEmailIsMissing), type: "negative" });
    return await signInWithEmailLink(auth, email, uri);
  } else {
    throw new NotifyError({ message: i18n.t(Language.magicLinkCallbackError), position: "top-right", type: "negative" });
  }
};

export const verifyLinkCode = async (email: string): Promise<void> => {
  const result = await feedbackWrapper<string, UserCredential>(loginWithLink, email);
  logger.debug("Magic Link: success", { result });
  localStore.remove("email");
  // You can access the new user via result.user
  // Additional user info profile not available via:
  // result.additionalUserInfo.profile == null
  // You can check if the user is new or existing:
  // result.additionalUserInfo.isNewUser
  return;
};

export const loginWithGoogle = (email?: string) => {
  logger.debug("login with Google", email);
  const provider = new GoogleAuthProvider();
  if (email) provider.setCustomParameters({ login_hint: email });
  return signInWithRedirect(auth, provider);
};

export const verifyRedirectResult = async (): Promise<boolean> => {
  try {
    const result = await getRedirectResult(auth);
    // result is null if no provider login is pending
    logger.debug("Auth Redirect", { result });
  } catch (error) {
    logger.error(error);
    return false;
  }
  return true;
};

export const logout = async () => {
  logger.debug("logout");
  navTo("/", 1000);
  // the onAuthStateChange listener will notify UI and remove storage
  return await auth.signOut();
};

export const getCurrentUser = async (): Promise<User> => {
  const emptyUser = { displayName: "Anonymous", email: "anonymous@example.com" } as User;
  return new Promise<User>((resolve, reject) => {
    if (localStore.has("uid")) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user ?? emptyUser);
      }, reject);
    } else resolve(emptyUser);
  });
};
