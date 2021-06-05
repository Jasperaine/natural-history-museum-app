import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/space",
    alias: "/",
    name: "space",
    component: () => import("../views/Space.vue")
  },
  {
    path: "/dinosaurs",
    name: "dinosaurs",
    component: () => import("../views/Dinosaurs.vue"),
    props: true
  },
  {
    path: "/wildlife",
    name: "wildlife",
    component: () => import("../views/Wildlife.vue"),
    props: true
  },
  {
    path: "/oceans",
    name: "oceans",
    component: () => import("../views/Oceans.vue"),
    props: true
  },
  // in production I would have this redirect to a 404 not found page
  {
    path: "*",
    redirect: "space"
  }
];

const router = new VueRouter({
  routes
});

export default router;
