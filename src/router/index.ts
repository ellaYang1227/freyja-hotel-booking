import { createRouter, createWebHashHistory } from "vue-router";
import AuthStore from "@/stores/AuthStore";
import routes from "@/router/routes";
const { VITE_COMPANY_NAME } = import.meta.env;

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

router.beforeEach((to, from, next) => {
    let { title } = to.meta;
    const { path } = to;

    if (title) {
        if (path.indexOf("/admin") > -1) {
            title = `後台管理 - ${title}`;
        } else if (path.indexOf("/member") > -1) {
            title = `會員專區 - ${title}`;
        }

        title = `${title} - `;
    }

    document.title = `${title ? title : ""}${path.indexOf("/activity") === -1 ? VITE_COMPANY_NAME : ""}`;

    // const { getStorageUser } = AuthStore();
    // getStorageUser();
    next();
});

export default router;