import { defineStore } from "pinia";
import router from "@/router/index";
import { bacsRequest } from "@/plugins/AxiosBase";
import { setSwalFire } from "@/plugins/Sweetalert2";
import { LoginForm, RegisterForm, ChangePasswordForm, EditMyInfoForm, ForgotForm } from "@/interfaces/UserForm";
import AuthStore from "@/stores/AuthStore";
const { changeCookie, setStorageSpecifyData } = AuthStore();

export default defineStore("UserStore", () => {
    /**
     * 登入
     * 
     * @param body 登入資料
     */
    function login(body: LoginForm): Promise<boolean> {
        return bacsRequest
            .post(`user/login`, { ...body })
            .then(({ result, token }: any) => {
                changeCookie("add", token, result);
                return Promise.resolve(true);
            })
            .catch(_err => Promise.reject(false));
    }

    /**
     * 註冊
     * 
     * @param body 註冊資料
     */
    function signup(body: RegisterForm): Promise<boolean> {
        return bacsRequest
            .post(`user/signup`, { ...body })
            .then(({ result, token }: any) => {
                changeCookie("add", token, result);
                router.push("/user/edit");
                return Promise.resolve(true);
            })
            .catch(_err => Promise.reject(false));
    }

    /**
     * 修改密碼
     * 
     * @param body 修改密碼資料
     */
    function changePassword(body: ChangePasswordForm): Promise<boolean> {
        return bacsRequest
            .put(`user`, { ...body })
            .then(_result => {
                setSwalFire("popup", "success", "修改密碼成功", "下次登入需使用新密碼");
                return Promise.resolve(true);
            })
            .catch(_err => Promise.reject(false));
    }

    /**
     * 修改會員資料
     * 
     * @param body 會員資料
     */
    function editMyinfo(body: EditMyInfoForm): Promise<boolean> {
        return bacsRequest
            .put(`user`, { ...body })
            .then(({ result }: any) => {
                setStorageSpecifyData("user", result)
                setSwalFire("toast", "success", "修改成功", "修改基本資料成功");
                return Promise.resolve(true);
            })
            .catch(_err => Promise.reject(false));
    }

    /**
     * 忘記密碼
     * 
     * @param body 修改密碼資料
     */
    function forgot(body: ForgotForm): Promise<boolean> {
        return bacsRequest
            .post(`user/forgot`, { ...body })
            .then(_result => {
                setSwalFire("toast", "success", "密碼重設成功", "請用新密碼登入");
                return Promise.resolve(true);
            })
            .catch(_err => Promise.reject(false));
    }

    return {
        login,
        signup,
        changePassword,
        editMyinfo,
        forgot
    }
});