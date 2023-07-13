const runtime = import.meta.env.NODE_ENV ?? "development";
export default {
  appName: "KG Financial News",
  apiPrefix: window.location.origin + "/api",
  locale: "en",
  authenticatedEntryPath: "/dashboard",
  unAuthenticatedEntryPath: "/",
  enableMock: true,
  runtime,
};
