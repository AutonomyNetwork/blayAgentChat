"use client";
import axios from "axios";
import { onLogout } from "./utils";
import { BACKEND_HOST_URL } from "./Constants"

export const APP_BASE_URL = `https://${BACKEND_HOST_URL}/`

const endpoint: any = axios.create({
  baseURL: APP_BASE_URL,
});

endpoint.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

endpoint.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: any) {
    // const originalRequest = error.config;
    // console.log(error.response);

    // Retry the request if it was unauthorized (401 status code)
    if (error.response && error.response.status === 401) {
      onLogout();
    }

    // For other errors, reject the Promise
    return Promise.reject(error);
  }
);

export default endpoint;
