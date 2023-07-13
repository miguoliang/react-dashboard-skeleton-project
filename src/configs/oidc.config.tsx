import { Log, UserManager, WebStorageStateStore } from "oidc-client-ts";

const OIDC_USER_POOL_ID = "us-east-1_kgw6hXTLB";
const OIDC_AUTHORITY = `https://cognito-idp.us-east-1.amazonaws.com/${OIDC_USER_POOL_ID}`;
const OIDC_CLIENT_ID = "4nqspnc5v104m6gkaq43u0jkbc";
const OIDC_CLIENT_SECRET =
  "181hk3tqpcrtear6vinfad9p3v7ostt58sepbkcbliiou4smvbtm";
const OIDC_REDIRECT_URI = window.location.origin;
const OIDC_HOST =
  "https://financial-news-knowledge-graph-project.auth.us-east-1.amazoncognito.com";

export const USER_SCOPE: string = "openid";

export const SCOPES = "openid email aws.cognito.signin.user.admin";
// Create cognito sign-up & sign-out url
const query = new URLSearchParams();
query.append("client_id", OIDC_CLIENT_ID);
query.append("response_type", "code");
query.append("scope", SCOPES);
query.append("redirect_uri", OIDC_REDIRECT_URI);
export const SIGN_UP_URL = `${OIDC_HOST}/signup?${query.toString()}`;
export const SIGN_OUT_URL = SIGN_UP_URL.replace("signup", "logout");

// Set oidc-client-ts log level
Log.setLogger(console);
Log.setLevel(Log.DEBUG);

export const userManager = new UserManager({
  authority: OIDC_AUTHORITY,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URI,
  // ...
  revokeTokenTypes: ["refresh_token"],
  automaticSilentRenew: false,
  client_secret: OIDC_CLIENT_SECRET,
  scope: SCOPES,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});
