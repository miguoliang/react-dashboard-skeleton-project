import wildCardSearch from "utils/wildCardSearch";
import sortBy from "utils/sortBy";
import paginate from "utils/paginate";
import { Server } from "miragejs/server";

export default function salesFakeApi(server: Server, apiPrefix: string) {
  server.post(`${apiPrefix}/sales/dashboard`, (schema) => {
    return schema.db.salesDashboardData[0];
  });

  server.post(`${apiPrefix}/sales/products`, (schema, { requestBody }) => {
    const body = JSON.parse(requestBody);
    const { pageIndex, pageSize, sort, query } = body;
    const { order, key } = sort;
    const products = schema.db.productsData;
    let data = products.filter((elm) => typeof elm !== "function");
    let total = products.length;

    if ((key === "category" || key === "name") && order) {
      data.sort(sortBy(key, order === "desc", (a: string) => a.toUpperCase()));
    } else {
      data.sort(sortBy(key, order === "desc", parseInt));
    }

    if (query) {
      data = wildCardSearch(data, query);
      total = data.length;
    }

    data = paginate(data, pageSize, pageIndex);

    return {
      data: data,
      total: total,
    };
  });

  server.del(
    `${apiPrefix}/sales/products/delete`,
    (schema, { requestBody }) => {
      const { id } = JSON.parse(requestBody);
      schema.db.productsData.remove({ id });
      return true;
    }
  );

  server.get(`${apiPrefix}/sales/product`, (schema, { queryParams }) => {
    const id = queryParams.id;
    return schema.db.productsData.find(id);
  });

  server.put(
    `${apiPrefix}/sales/products/update`,
    (schema, { requestBody }) => {
      const data = JSON.parse(requestBody);
      const { id } = data;
      schema.db.productsData.update({ id }, data);
      return true;
    }
  );

  server.post(
    `${apiPrefix}/sales/products/create`,
    (schema, { requestBody }) => {
      const data = JSON.parse(requestBody);
      schema.db.productsData.insert(data);
      return true;
    }
  );

  server.get(`${apiPrefix}/sales/orders`, (schema, { queryParams }) => {
    const { pageIndex, pageSize, sort, query } = queryParams;
    const { order, key } = JSON.parse(sort);
    const orders = schema.db.ordersData;
    let data = orders.filter((elm) => typeof elm !== "function");
    let total = orders.length;

    if (key) {
      if (
        (key === "date" || key === "status" || key === "paymentMethod") &&
        order
      ) {
        data.sort(sortBy(key, order === "desc", parseInt));
      } else {
        data.sort(
          sortBy(key, order === "desc", (a: string) => a.toUpperCase())
        );
      }
    }

    if (query) {
      data = wildCardSearch(data, query);
      total = data.length;
    }

    data = paginate(data, +pageSize, +pageIndex);

    return {
      data: data,
      total: total,
    };
  });

  server.del(`${apiPrefix}/sales/orders/delete`, (schema, { requestBody }) => {
    const { id } = JSON.parse(requestBody);
    id.forEach((elm: string) => {
      schema.db.ordersData.remove({ id: elm });
    });
    return true;
  });

  server.get(`${apiPrefix}/sales/orders-details`, (schema, { queryParams }) => {
    const { id } = queryParams;
    const orderDetail = schema.db.orderDetailsData;
    orderDetail[0].id = id;
    return orderDetail[0];
  });
}
