import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/router/routes";
import { beforeEach } from "@/router/routerGuard";

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    linkActiveClass: "active"
});

router.beforeEach(beforeEach);

export default router;