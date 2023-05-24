import {
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_HOST,
  OIDC_REDIRECT_URI,
} from "../constants/oidc.constant";
import { AuthProviderProps } from "react-oidc-context";

export const SIGN_UP_URL = `${OIDC_HOST}/signup?client_id=${OIDC_CLIENT_ID}&response_type=code&scope=openid+email&redirect_uri=${encodeURIComponent(
  OIDC_REDIRECT_URI,
)}`;

export const oidcConfig: AuthProviderProps = {
  authority: OIDC_AUTHORITY,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URI,
  // ...
  revokeTokenTypes: ["refresh_token"],
  automaticSilentRenew: false,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  client_secret: OIDC_CLIENT_SECRET,
};
