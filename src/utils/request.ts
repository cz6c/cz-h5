import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import router from "/@/router/index";
import { getToken, removeToken } from "/@/utils/auth";

// 封装axios
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false, // 设置跨域cookie上传
  timeout: 10000, // 请求超时
});

// request 拦截器 ==> 对请求参数做处理
service.interceptors.request.use(
  config => {
    config.headers["ctoken"] = config.headers["ctoken"] || getToken();
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);
// response 拦截器 ==> 对响应做处理
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 当请求不为200时，报错
    if (res.code !== 200) {
      if (res.code === -401 || res.code === -403) {
        removeToken();
        router.push(`/login?redirect=${(router.currentRoute as any).fullPath}`);
        return;
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  },
);
export default service;

// 封装 get post 方法
interface Response<T> {
  code: number; // 接口数据状态码,不是接口状态码
  message: string; // 接口消息
  data: T;
}
export const createGet = <P extends Record<string, any>, R>(url: string) => {
  return (params?: P, config: AxiosRequestConfig = {}): Promise<Response<R>> => {
    return service.request({
      method: "get",
      url,
      params,
      ...config,
    });
  };
};
export const createPost = <P extends Record<string, any>, R>(url: string) => {
  return (data?: P, config: AxiosRequestConfig = {}): Promise<Response<R>> => {
    return service.request({
      method: "post",
      url,
      data,
      ...config,
    });
  };
};
