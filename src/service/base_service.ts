import axios from "axios";

// const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const enum MethodsService {
  GET,
  POST,
  DELETE,
  PUT,
}

export class ServiceCaller {
  response: any;

  async call(
    url: string,
    method: MethodsService,
    requestBody: any,
    headers: any = {
      "Content-Type": "application/json",
    }
  ) {
    switch (method) {
      case MethodsService.GET:
        await axiosInstance
          .get(url, { headers: headers })
          .then((res) => {
            this.response = res;
          })
          .catch((err) => {
            this.response = err;
          });
        break;
      case MethodsService.POST:
        await axiosInstance
          .post(url, requestBody, { headers: headers })
          .then((res) => {
            this.response = res;
          })
          .catch((err) => {
            this.response = err;
          });
        break;
      case MethodsService.DELETE:
        await axiosInstance
          .delete(url, { headers: headers })
          .then((res) => {
            this.response = res;
          })
          .catch((err) => {
            this.response = err;
          });
        break;
      case MethodsService.PUT:
        await axiosInstance
          .put(url, requestBody, { headers: headers })
          .then((res) => {
            this.response = res;
          })
          .catch((err) => {
            this.response = err;
          });
        break;
    }
  }
}

export default axiosInstance;
