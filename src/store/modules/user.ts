import { login } from "/@/api/public";
import { LoginParams } from "/@/api/public/index.d";
import { defineStore } from "pinia";
import { getToken, setToken } from "/@/utils/auth";

interface StoreUser {
  token: string;
}

const token = getToken() ?? "";

export const useUserStore = defineStore({
  id: "app-user",
  state: (): StoreUser => ({
    token: token!,
  }),
  actions: {
    login(data: LoginParams) {
      return new Promise(resolve => {
        login(data).then(res => {
          const { data } = res;
          setToken(data);
          resolve(data);
        });
      });
    },
  },
});
