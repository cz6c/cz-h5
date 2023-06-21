import { ProxyOptions } from "vite";
type ProxyTargetList = Record<string, ProxyOptions>;

export const proxy: ProxyTargetList = {
  "/api": {
    target: "https://baidu.com",
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, ""),
  },
};
