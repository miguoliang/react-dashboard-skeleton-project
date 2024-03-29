import { createServer } from "miragejs";
import appConfig from "configs/app.config";

import { personFakeApi } from "./api";
import { Persons } from "./seed";

const { apiPrefix } = appConfig;

export default function mockServer({ environment = "development" }) {
  const server = createServer({
    environment,
    routes() {
      this.urlPrefix = window.location.origin;
      this.namespace = apiPrefix;
      this.passthrough((request) => request.url.startsWith("https://"));
      this.passthrough((request) =>
        request.url.startsWith(
          new URL(import.meta.env.VITE_OIDC_AUTHORITY).origin,
        ),
      );
      personFakeApi(this, apiPrefix);
    },
  });
  server.db.loadData({
    Persons,
  });
  return server;
}
