import Vue from "vue";
import VueRouter from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import { routerData } from './../router/config'
Vue.use(VueRouter);



const routes = [
    {
        path: "/",
        name: "home",
        component: BasicLayout,
        children:routerData
    },
];



const router = new VueRouter({
    // mode: "history",
    // base: process.env.BASE_URL,
    routes
});

export default router;
