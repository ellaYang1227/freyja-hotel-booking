import LoadingStore from "@/stores/LoadingStore";
import Swal from "sweetalert2/dist/sweetalert2.js";
type SwalStype = "toast" | "popup";
type SwalIcon = "success" | "error" | "warning" | "info" | "question";

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
    //timer: 3000,
    timerProgressBar: true,
    reverseButtons: true
});

export const swalToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: "bottom-end",
    timer: 1500,
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
export function setSwalFire(stype: SwalStype, icon: SwalIcon, title: string, text: string, isHTML: boolean = false, isCloseTimer: boolean = false) {
    hideLoading();
    const currentSwal = stype === "toast" ? swalToast : swalPopup;
    const options: any = {
        icon,
        title,
        text: isHTML ? null : text,
        html: isHTML ? text : null
    };

    if (isCloseTimer) {
        options.timer = null;
    }

    return currentSwal.fire(options);
}