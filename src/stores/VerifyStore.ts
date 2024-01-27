import { defineStore } from "pinia";
import { bacsRequest } from "@/plugins/AxiosBase";
import { Email } from "@/interfaces/UserForm";
import { setSwalFire } from "@/plugins/Sweetalert2";

export default defineStore("VerifyStore", () => {
    /**
     * 驗證信箱是否註冊過
     * 
     * @param email 信箱
     */
    function verifyEmail(email: Email): Promise<boolean> {
        return bacsRequest
            .post(`verify/email`, { email })
            .then(({ result }: any) => Promise.resolve(result.isEmailExists))
            .catch(_err => Promise.reject(false));
    }

    /**
     * 產生信箱驗證碼
     * 
     * @param email 信箱
     */
    function generateEmailCode(email: Email): Promise<boolean> {
        return bacsRequest
            .post(`verify/generateEmailCode`, { email })
            .then(_result => {
                setSwalFire("toast", "success", "驗證碼寄送成功", "請至您的 Email 收取您的驗證碼");
                return Promise.resolve(true);
            })
            .catch(_err => Promise.reject(false));
    }

    return {
        verifyEmail,
        generateEmailCode
    }
});