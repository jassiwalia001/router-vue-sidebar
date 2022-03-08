import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/payslips',
  }, {
    path: "/timesheet",
    name: "timesheet",
    component: () => import("../components/timesheet"),
  },
  {
    path: "/my-information",
    name: "my-information",
    component: () => import("../components/my-information"),
  },
  {
    path: "/payslips",
    name: "payslips",
    component: () => import("../components/payslips"),
  },
  {
    path: "/leaves",
    name: "leaves",
    component: () => import("../components/leaves"),
  },
  {
    path: "/orgchart",
    name: "orgchart",
    component: () => import("../components/orgchart"),
  },
  {
    path: "/my-team",
    name: "my-team",
    component: () => import("../components/my-team"),
  },
  {
    path: "/docs",
    name: "docs",
    component: () => import("../components/docs"),
  }];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
