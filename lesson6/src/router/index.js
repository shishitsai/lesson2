import { createRouter, createWebHashHistory } from "vue-router";
//import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/productstore",
        name: "前台產品列表",
        component: () => import("../views/ProductStore.vue"),
      },
      {
        path: "/cart",
        name: "購物車",
        component: () => import("../views/Cart.vue"),
      },
      {
        path: "/login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "/admin",
        component: () => import("../views/Dashboard.vue"),
        children: [
          {
            path: "products",
            component: () => import("../views/Dashboard/Products.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
