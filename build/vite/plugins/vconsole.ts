/**
 * @name ConfigVConsole
 * @description 控制台，方便移动端调试
 */

import { viteVConsole } from "vite-plugin-vconsole";
import path from "path";

export const ConfigVConsole = () => {
  return viteVConsole({
    entry: [path.resolve("src/main.ts")], // 入口文件
    localEnabled: true,
    enabled: true,
    config: {
      // vconsole 配置项
      maxLogNumber: 1000,
      theme: "light",
    },
  });
};
