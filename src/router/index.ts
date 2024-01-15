import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/router/routes";
import { beforeEach } from "@/router/routerGuard";

// 始终滚动到顶部
// const scrollBehavior = (to, from, savedPosition) => {
//     const { hash } = to;
//     if (hash === "#messaget") {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve({ top: window.innerWidth >= 992 ? 1000 : 2000 });
//             }, 100);
//         });
//     }

//     return { top: 0 };
// };

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    linkActiveClass: "active",
    //scrollBehavior
});

router.beforeEach(beforeEach);

export default router;