import { AxiosResponse } from "axios";
import BaseService from "./BaseService";

const ApiService = {
  fetchData<T>(param: any) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      BaseService<T>(param)
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  },
};

export default ApiService;
