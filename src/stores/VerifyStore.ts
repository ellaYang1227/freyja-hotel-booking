import { defineStore } from "pinia";
import { bacsRequest } from "@/plugins/AxiosBase";
import { LoginForm } from "@/interfaces/UserForm";
import { UserInfo } from "@/interfaces/User";
import { Email } from "@/interfaces/UserForm";

export default defineStore("verifyStore", () => {
    /**
     * 驗證信箱是否註冊過
     * 
     * @param email 信箱
     */
    function verifyEmail(email: Email): Promise<boolean> {
        return bacsRequest
            .post(`verify/email`, { email })
            .then(({ result }: any) => {
                console.log(result)
                return Promise.resolve(result.isEmailExists);
            })
            .catch(err => Promise.reject(false));
    }

    /**
     * 產生信箱驗證碼
     * 
     * @param email 信箱
     */
    function generateEmailCode(email: Email): Promise<boolean> {
        return bacsRequest
            .post(`verify/generateEmailCode`, { email })
            .then(({ status }: any) => {
                console.log(status)
                return Promise.resolve(true);
            })
            .catch(err => Promise.reject(false));
    }

    return {
        verifyEmail,
        generateEmailCode
    }
});