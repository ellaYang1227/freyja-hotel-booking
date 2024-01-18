import { defineStore } from "pinia";
import router from "@/router/index";
import { bacsRequest } from "@/plugins/AxiosBase";
import { LoginForm } from "@/interfaces/UserForm";
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
                console.log(result, token)
                changeCookie("add", token, result);
                //router.push(returnUrl);
                return Promise.resolve(true);
            })
            .catch(err => Promise.reject(false));
    }

    return {
        login,
    }
});