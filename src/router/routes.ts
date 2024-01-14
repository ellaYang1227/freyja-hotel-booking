export default [
    {
        path: "/guideline",
        component: () => import("@/views/guidelineView.vue"),
        meta: { title: "Guideline" }
    },
    {
        // 重新導向
        path: "/:pathMatch(.*)*",
        redirect: "/index"
    }
];