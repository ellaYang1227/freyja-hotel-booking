import { defineStore } from "pinia";
import { ref } from "vue";

type Stype = 'btn';

export default defineStore("LoadingStore", () => {
    const isLoading = ref<boolean>(true);
    const isLoadingBtn = ref<boolean>(false);
    const progressValue = ref<number>(10);

    /**
     * 顯示 Loading
     *
     * @param stype Loading 類型，如果是按鈕類型，需傳入 "btn"
     */
    function showLoading(stype?: Stype): void {
        isLoadingBtn.value = true;

        if (stype !== "btn") {
            isLoading.value = true;
            document.body.classList.add("overflow-hidden");
        }
    }

    /**
     * 隱藏 Loading
     *
     * @param stype Loading 類型，如果是按鈕類型，需傳入 "btn"
     */
    function hideLoading(stype?: Stype): void {
        progressValue.value = 100;
        isLoadingBtn.value = false;

        setTimeout(() => {
            if (stype !== "btn") {
                isLoading.value = false;
                document.body.classList.remove("overflow-hidden");
            }

            //clearInterval(this.intervalProgress);
            progressValue.value = 10;
        }, 0);
    }

    return {
        isLoading,
        isLoadingBtn,
        showLoading,
        hideLoading
    };
});