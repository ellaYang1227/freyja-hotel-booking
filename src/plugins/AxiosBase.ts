import axios from "axios";
import { setSwalFire } from "@/plugins/Sweetalert2";
import router from "@/router/index.js";
import AuthStore from "@/stores/AuthStore.js";
import LoadingStore from "@/stores/LoadingStore.js";
const { hideLoading } = LoadingStore();
const { getToken, logout } = AuthStore();

// 創建 axios 實例
const bacsRequest = axios.create({
    baseURL: "https://freyja-typescript.onrender.com/api/v1/"
});

// 請求攔截
bacsRequest.interceptors.request.use(
    request => {
        request.headers["Authorization"] = `Bearer ${getToken()}`;
        return request;
    },
    error => {
        //console.dir(error);
        setSwalFire("popup", "error", "系統錯誤", error.request);
        return Promise.reject({
            success: false,
            ...error.request
        });
    }
);

// 攔截 API response 的回傳
bacsRequest.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    error => {
        //console.dir(error);
        hideLoading();
        const { name } = router.currentRoute.value;
        const { status, data } = error.response;
        const { message } = data;
        console.log(name, message)

        if (status !== 400) {
            let title = "系統錯誤";
            let errorMsg = "";
            let isRedirectLogin = false;
            let isBackPage = false;

            switch (status) {
                case 404:
                    errorMsg = name === "login" ? message : "找不到該筆資料";
                    isBackPage = true;
                    break;
                case 401:
                    title = "驗證失敗";
                    errorMsg = "您的身分驗證失敗，請重新登入";
                    isRedirectLogin = true;
                    break;
                default:
                    errorMsg = "發生不明錯誤，請重新操作";
            }

            setSwalFire("popup", "error", title, errorMsg).then(() => {
                if (isRedirectLogin) {
                    logout();
                } else if (isBackPage) {
                    router.go(-1);
                }
            });
        }

        //console.error(status);
        return Promise.reject({
            success: false,
            ...data
        });
    }
);

export { bacsRequest };