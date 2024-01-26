import axios from "axios";
// import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { setSwalFire } from "@/plugins/Sweetalert2";
import router from "@/router/index";
const { VITE_API_ROOT } = import.meta.env;
import AuthStore from "@/stores/AuthStore";
import LoadingStore from "@/stores/LoadingStore";
const { hideLoading } = LoadingStore();
const { getToken, logout } = AuthStore();

const baseConfig: AxiosRequestConfig = {
    baseURL: VITE_API_ROOT,
    //timeout: 60000
}

// 創建 axios 實例
const bacsRequest = axios.create(baseConfig);

// 請求攔截
bacsRequest.interceptors.request.use(
    (config) => {
        if (getToken()) {
            config.headers!.Authorization = getToken();
        }

        return config;
    },
    (error: AxiosError) => {
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
    (response: AxiosResponse) => {
        return Promise.resolve(response.data);
    },
    (error: any) => {
        //console.dir(error);
        hideLoading();
        const { name } = router.currentRoute.value;
        const { status, data } = error.response;
        const { message } = data;

        let title = "系統錯誤";
        let errorMsg = "";
        let isRedirectLogin = false;
        let isBackPage = false;

        switch (status) {
            case 401:
                title = "驗證失敗";
                errorMsg = "您的身分驗證失敗，請重新登入";
                isRedirectLogin = true;
                break;
            case 403:
                title = "驗證失敗";
                errorMsg = message;
                isRedirectLogin = true;
                break;
            case 400:
            case 404:
                errorMsg = name === "login" || name === "userEdit" ? message : "找不到該筆資料";
                isBackPage = name === "login" || name === "userEdit" ? false : true;
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

        //console.error(status);
        return Promise.reject({
            success: false,
            ...data
        });
    }
);

export { bacsRequest };