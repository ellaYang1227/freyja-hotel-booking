import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import AuthStore from "@/stores/AuthStore";
const { VITE_COMPANY_NAME } = import.meta.env;

export const beforeEach = (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    const { meta, path } = to;
    const { isGuestGuard, isAuthGuard } = meta;
    let { title } = meta;

    if (title && path.includes("/user")) {
        title = `會員專區 - ${title}`;
    }

    document.title = `${title}｜${VITE_COMPANY_NAME}`;
    const { getStorageSpecifyData } = AuthStore();
    const userInfo = getStorageSpecifyData("user");

    if (!isGuestGuard && !isAuthGuard) {
        next();
    } else {
        // 賓客守衛
        if (isGuestGuard) {
            if (!userInfo) {
                next();
            } else {
                next("/user/edit");
            }
        }

        // 授權守衛
        if (isAuthGuard) {
            if (userInfo) {
                next();
            } else {
                next({ path: "/login", query: { returnUrl: to.path } });
            }
        }
    }
}