import { Server } from "miragejs/server";
import createPaginationResponse from "../common/createPaginationResponse";

export default function person(server: Server, apiPrefix: string) {
  server.get(`${apiPrefix}/persons`, (schema) => {
    return createPaginationResponse(schema.db.Persons);
  });
}
