import { createApp } from 'vue';
import { createPinia } from "pinia";

import "bootstrap";
import App from './App.vue';
import router from "./router/index";

/* axios */
import axios from "axios";
import VueAxios from "vue-axios";

/* @fortawesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* 將圖標添加到庫中 */
library.add(fas, fab, far);

/* vee-validate */
import { defineRule, configure } from "vee-validate";
import * as AllRules from '@vee-validate/rules';
import { localize } from "@vee-validate/i18n";
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

/* VeeValidate 定義規則 */
Object.keys(AllRules).forEach(rule => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defineRule(rule, (AllRules as Record<string, any>)[rule]);
});

/* 加入多國語系 */
// 讀取外部的資源
localize({ zh_TW });

// 啟動區域設置(多國語系)
configure({
    generateMessage: localize("zh_TW"),
    validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
});

/*  VueLoading */
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

/*  VueSweetalert2 */
import VueSweetalert2 from 'vue-sweetalert2';

import './assets/main.scss';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("VueLoading", VueLoading);
app.mount('#app');
