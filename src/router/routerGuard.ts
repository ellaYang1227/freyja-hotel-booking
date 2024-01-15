import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import AuthStore from "@/stores/AuthStore";
const { VITE_COMPANY_NAME } = import.meta.env;

export const beforeEach = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    console.log(to)
    const { meta, path } = to;
    const { isGuestGuard, isAuthGuard } = meta;
    let { title } = meta;

    if (title && path.includes("/user")) {
        title = `會員專區 - ${title}`;
    }

    document.title = `${title}｜${VITE_COMPANY_NAME}`;

    // const { getStorageUser } = AuthStore();
    // getStorageUser();
    next();
}