export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "Home",
    path: "/home",
    component: () => import("/@/views/home/index.vue"),
    meta: {
      title: "tabbar.home",
      keepAlive: true,
    },
  },
  {
    name: "List",
    path: "/list",
    component: () => import("/@/views/list/index.vue"),
    meta: {
      title: "tabbar.list",
      keepAlive: true,
    },
  },
  {
    name: "Member",
    path: "/member",
    component: () => import("/@/views/member/index.vue"),
    meta: {
      title: "tabbar.member",
      keepAlive: true,
    },
  },
  {
    name: "ListDetails",
    path: "/details",
    component: () => import("/@/views/list/details/index.vue"),
    meta: {
      title: "list.details",
      isBack: true,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("/@/views/login/index.vue"),
    meta: {
      title: "login",
      isBack: true,
      keepAlive: true,
    },
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    redirect: "/home",
  },
];

export default routes;
