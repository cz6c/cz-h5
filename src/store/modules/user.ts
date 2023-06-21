import { loginPassword } from "/@/api";
import { defineStore } from "pinia";

const { VITE_TOKEN_KEY } = import.meta.env;
const token = localStorage.getItem(VITE_TOKEN_KEY as string) ?? "";

interface StoreUser {
  token: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): StoreUser => ({
    token: token,
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : "";
    },
    login() {
      return new Promise(resolve => {
        const { execute } = loginPassword();
        execute().then(res => {
          this.setInfo(res);
          // localStorage.setItem(VITE_TOKEN_KEY as string, res.token);
          resolve(res);
        });
      });
    },
  },
  persist: {
    key: "token",
    storage: localStorage,
    paths: ["token"],
  },
});
// export const useUserStore = defineStore('app-user', () => {
//   const Token = ref(token);
//   const info = ref<Record<any, any>>({});
//   const setInfo = (info: any) => {
//     info.value = info ? info : '';
//   };
//   const getUserInfo = () => {
//     return info || {};
//   };
//   const login = () => {
//     return new Promise((resolve) => {
//       const { data } = loginPassword();
//       watch(data, () => {
//         setInfo(data.value);
//         // useCookies().set(VITE_TOKEN_KEY as string, data.value.token);
//         resolve(data.value);
//       });
//     });
//   };
//   return {
//     Token,
//     info,
//     setInfo,
//     login,
//     getUserInfo,
//   };
// });
