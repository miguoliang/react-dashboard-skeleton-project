import wildCardSearch from "utils/wildCardSearch";
import { SearchQuery } from "../data/commonData";
import { Server } from "miragejs/server";

export default function commonFakeApi(server: Server, apiPrefix: string) {
  server.get(
    `${apiPrefix}/notification/list`,
    (schema) => schema.db.notificationListData,
  );

  server.get(`${apiPrefix}/notification/count`, ({ db }) => {
    const unreadNotification = db.notificationListData.where({
      isRead: false,
    });
    return { count: unreadNotification.length };
  });

  server.post(`${apiPrefix}/search/query`, (schema, { requestBody }) => {
    const body = JSON.parse(requestBody);
    const { query } = body;
    const searchData = schema.db.searchQueryPoolData.filter(
      (elm: SearchQuery) => typeof elm !== "function",
    );
    const result = wildCardSearch(searchData, query, "title");
    const categories: string[] = [];

    result.forEach((elm) => {
      if (!categories.includes(elm.categoryTitle)) {
        categories.push(elm.categoryTitle);
      }
    });

    const data = categories.map((category) => {
      return {
        title: category,
        data: result.filter((elm) => elm.categoryTitle === category),
      };
    });
    return data;
  });
}
