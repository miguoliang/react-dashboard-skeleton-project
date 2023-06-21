import { create } from "zustand";
import { Log, User, UserManager, WebStorageStateStore } from "oidc-client-ts";
import {
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_HOST,
  OIDC_REDIRECT_URI,
} from "constants/oidc.constant";

// Create cognito sign-up & sign-out url
const query = new URLSearchParams();
query.append("client_id", OIDC_CLIENT_ID);
query.append("response_type", "code");
query.append("scope", "openid email");
query.append("redirect_uri", OIDC_REDIRECT_URI);
export const SIGN_UP_URL = `${OIDC_HOST}/signup?${query.toString()}`;
export const SIGN_OUT_URL = SIGN_UP_URL.replace("signup", "logout");

// Set oidc-client-ts log level
Log.setLogger(console);
Log.setLevel(Log.DEBUG);

interface UseAuth {
  isAuthenticated: boolean;
  user?: User;
  userManager: UserManager;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user?: User) => void;
  signOut: () => void;
}

const userManager = new UserManager({
  authority: OIDC_AUTHORITY,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URI,
  // ...
  revokeTokenTypes: ["refresh_token"],
  automaticSilentRenew: false,
  client_secret: OIDC_CLIENT_SECRET,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export const useAuth = create<UseAuth>((set) => ({
  isAuthenticated: false,
  userManager,
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUser: (user?: User) => set({ user }),
  signOut: () => {
    window.location.replace(SIGN_OUT_URL);
  },
}));
