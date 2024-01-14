import { defineStore } from "pinia";
import router from "@/router/index.js";

export default defineStore("AuthStore", {
    state: () => ({
        user: null
    }),
    getters: {},
    actions: {
        /**
         * 取得存放在 localStorage 的 User 資料
         *
         */
        getStorageUser() {
            const encryptUser = localStorage.getItem("user");
            //this.user = encryptUser ? this.handleCrypt("decrypt", "user", encryptUser) : null;
            if (!this.user) {
                this.changeCookie("remove");
            }

            return this.user;
        },
        /**
         * 登出
         *
         */
        logout() {
            this.changeCookie("remove");
            router.push({
                path: "/login",
                query: { returnUrl: location.hash.replace("#", "") }
            });
        },
        /**
         * 取得 Token
         *
         */
        getToken() {
            return document.cookie.replace(/(?:(?:^|.*;\s*)access-token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        },
        /**
         * 改變 Token
         *
         * @param method String 新增(add)、清除(remove)
         * @param token String 原始加密資料
         * @param user String 要存放在 localStorage 的未加密 user 資料
         */
        changeCookie(method: string, token?: string, user?: null) {
            let cookie = `access-token=${token};`;

            if (method === "remove") {
                cookie += "max-age=0";
                localStorage.removeItem("user");
                this.user = null;
            } else if (method === "add") {
                //const { exp } = this.handleCrypt("decrypt", "token", token);
                //cookie += `${new Date(exp)}`;
                //this.setStorageUser(user);
            }

            document.cookie = cookie;
        },
        /**
         * 將 user 資料儲存在 localStorage
         *
         * @param user String 要存放在 localStorage 的未加密 user 資料
         */
        // setStorageUser(user) {
        //     const encryptUser = this.handleCrypt("encrypt", "user", user);
        //     localStorage.setItem("user", encryptUser);
        //     this.user = user;
        // },
        /**
         * 加解密處理
         *
         * @param type String 處理類型：加密(encrypt)、解密(decrypt)
         * @param decryptData String 資料內容，如是 token 需傳入 "token"
         * @param data String | Object 要處理的資料
         */
        // handleCrypt(type, decryptData, data) {
        //     if (type === "encrypt") {
        //         // 加密
        //         if (decryptData !== "token") {
        //             // encodeURIComponent()：unicode(中文)轉 base64(避免報錯)
        //             data = window.btoa(encodeURIComponent(JSON.stringify(data)));
        //         }

        //         return data;
        //     } else if (type === "decrypt") {
        //         // 解密
        //         if (decryptData === "token") {
        //             data = window.atob(data.split(".")[1]);
        //         } else {
        //             // encodeURIComponent()：base64 轉 unicode(中文)
        //             data = decodeURIComponent(window.atob(data));
        //         }

        //         return JSON.parse(data);
        //     }
        // }
    }
});