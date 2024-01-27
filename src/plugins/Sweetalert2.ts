import LoadingStore from "@/stores/LoadingStore";
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2/dist/sweetalert2.js";
type SwalStype = "toast" | "popup";

const { hideLoading } = LoadingStore();

export const swalPopup = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-primary"
    },
    buttonsStyling: false,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "關閉",
    timer: 3000,
    timerProgressBar: true,
    reverseButtons: true
});

export const swalToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: "bottom-end",
    timer: 3000,
    timerProgressBar: true
});


/**
 * 設定 Swal
 *
 * @param stype Swal 樣式；toast(吐司)或(popup)彈跳視窗
 * @param icon Swal icon 狀態；success、error、warning、info、question
 * @param title 標題
 * @param text 內文
 * @param isHTML 是否 text 為 HTML 格式，預設 "false"
 * @param isCloseTimer 是否關閉計時器，預設 "false"
 */
export function setSwalFire(stype: SwalStype, icon: SweetAlertIcon, title: string, text: string, isHTML: boolean = false, isCloseTimer: boolean = false) {
    hideLoading();
    const currentSwal = stype === "toast" ? swalToast : swalPopup;
    const options: SweetAlertOptions = {
        icon,
        title,
        text: isHTML ? undefined : text,
        html: isHTML ? text : undefined
    };

    if (isCloseTimer) {
        options.timer = undefined;
    }

    return currentSwal.fire(options);
}