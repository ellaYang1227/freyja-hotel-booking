import { defineStore } from "pinia";
import router from "@/router/index";
import { ref } from "vue";
import { UserInfo } from "@/interfaces/User";
type StorageDataKey = "user" | "email";

export default defineStore("AuthStore", () => {
    const userInfo = ref<null | UserInfo>(null);

    /**
     * 將指定資料儲存在 localStorage
     *
     * @param key 為存放在 localStorage 的名稱
     * @param data 要存放在 localStorage 的未加密資料
     */
    function setStorageSpecifyData(key: StorageDataKey, data: string | UserInfo): void {
        const encryptData = handleCrypt("encrypt", key, data);
        localStorage.setItem(key, encryptData);
        if (key === "user") { userInfo.value = data as UserInfo }
    }

    /**
     * 取得存放在 localStorage 的指定資料
     * 
     * @param key 為存放在 localStorage 的名稱
     */
    function getStorageSpecifyData(key: StorageDataKey) {
        const encryptData = localStorage.getItem(key);
        const decryptData = encryptData ? handleCrypt("decrypt", "user", encryptData) : null;

        if (key === "user") {
            userInfo.value = decryptData;

            if (!userInfo.value) {
                changeCookie("remove");
            }
        }

        return decryptData;
    }

    /**
     * 清除存放在 localStorage 的指定資料
     * 
     * @param key 
     */
    function removeStorageSpecifyData(key: StorageDataKey): void {
        localStorage.removeItem(key);
    }
    /**
     * 登出
     */
    function logout(): void {
        changeCookie("remove");
        router.push({
            path: "/login",
            query: { returnUrl: location.hash.replace("#", "") }
        });
    }

    /**
     * 取得 Token
     */
    function getToken(): string {
        return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    }

    /**
     * 改變 Token
     *
     * @param method 新增(add)、清除(remove)
     * @param token 原始加密資料
     * @param user 要存放在 localStorage 的未加密 user 資料
     */
    function changeCookie(method: "remove" | "add", token?: string, user?: UserInfo): void {
        let cookie = `token=${token};`;

        if (method === "remove") {
            cookie += "max-age=0";
            removeStorageSpecifyData("user");
            userInfo.value = null;
        } else if (method === "add") {
            const { exp } = handleCrypt("decrypt", "token", token);
            cookie += `${new Date(exp)}`;
            if (user) { setStorageSpecifyData("user", user) }
        }

        document.cookie = cookie;
    }

    /**
     * 加解密處理
     *
     * @param type 處理類型：加密(encrypt)、解密(decrypt)
     * @param decryptData 資料內容，如是 token 需傳入 "token"
     * @param data 要處理的資料
     */
    function handleCrypt(type: "encrypt" | "decrypt", decryptData: "token" | StorageDataKey, data: any) {
        if (type === "encrypt") {
            // 加密
            if (decryptData !== "token") {
                // encodeURIComponent()：unicode(中文)轉 base64(避免報錯)
                data = window.btoa(encodeURIComponent(JSON.stringify(data)));
            }

            return data;
        } else if (type === "decrypt") {
            // 解密
            if (decryptData === "token") {
                data = window.atob(data.split(".")[1]);
            } else {
                // encodeURIComponent()：base64 轉 unicode(中文)
                data = decodeURIComponent(window.atob(data));
            }

            return JSON.parse(data);
        }
    }

    return {
        userInfo,
        setStorageSpecifyData,
        getStorageSpecifyData,
        removeStorageSpecifyData,
        logout,
        getToken,
        changeCookie
    };
});