import { defineStore } from "pinia";
import router from "@/router/index.js";
import { bacsRequest } from "@/plugins/AxiosBase";
import { LoginForm } from "@/interfaces/UserForm";


export default defineStore("userStore", () => {
    /**
     * 登入
     * 
     * @param body 登入資料
     */
    function login(body: LoginForm): Promise<any> {
        return bacsRequest
            .post(`user/login`, { body })
            .then(res => {
                changeCookie("add", accessToken, user);
                router.push(returnUrl);
                return Promise.resolve(true);
            })
            .catch(err => {
                console.log(err)
                return Promise.reject(false);
            });
    }

    return {
        login,
    }
});