export default [
    {
        path: "/",
        component: () => import("@/views/member/MemberLayoutView.vue"),
        meta: { isGuestGuard: true },
        children: [{
            path: "",
            redirect: "/login"
        }, {
            path: "login",
            name: "login",
            component: () => import("@/views/member/LoginView.vue"),
            meta: { title: "登入" }
        }, {
            path: "register",
            name: "register",
            component: () => import("@/views/member/RegisterView.vue"),
            meta: { title: "註冊" }
        }, {
            // 重新導向
            path: "/:pathMatch(.*)*",
            redirect: "/login"
        }]
    },
    {
        path: "/user",
        component: () => import("@/views/user/UserLayoutView.vue"),
        meta: { isAuthGuard: true },
        children: [{
            path: "edit",
            name: "userEdit",
            component: () => import("@/views/user/EditView.vue"),
            meta: { title: "修改個人資料" }
        },
        {
            path: "orders",
            name: "userOrders",
            component: () => import("@/views/user/OrdersView.vue"),
            meta: { title: "訂單列表" }
        }, {
            // 重新導向
            path: "/:pathMatch(.*)*",
            redirect: "/user/edit"
        }]
    },
    {
        path: "/guideline",
        name: "guideline",
        component: () => import("@/views/guidelineView.vue"),
        meta: { title: "Guideline" }
    },
    {
        // 重新導向
        path: "/:pathMatch(.*)*",
        redirect: "/user/edit"
    }
];