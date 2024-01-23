import { defineStore } from "pinia";
import router from "@/router/index";
import { bacsRequest } from "@/plugins/AxiosBase";
import { setSwalFire } from "@/plugins/Sweetalert2";
import { LoginForm, RegisterForm, ChangePasswordForm } from "@/interfaces/UserForm";
import { UserInfo } from "@/interfaces/User";
import AuthStore from "@/stores/AuthStore";
const { changeCookie } = AuthStore();

export default defineStore("userStore", () => {
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
            .catch(err => Promise.reject(false));
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
            .catch(err => Promise.reject(false));
    }

    /**
     * 修改密碼
     * 
     * @param body 註冊資料
     */
    function changePassword(body: ChangePasswordForm): Promise<boolean> {
        return bacsRequest
            .put(`user`, { ...body })
            .then(({ status }) => {
                //if()
                setSwalFire("popup", "success", "修改密碼成功", "下次登入需使用新密碼");
                return Promise.resolve(true);
            })
            .catch(err => Promise.reject(false));
    }

    return {
        login,
        signup,
        changePassword
    }
});