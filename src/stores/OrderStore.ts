import { defineStore } from "pinia";
import { ref } from "vue";
import { bacsRequest } from "@/plugins/AxiosBase";
import { OrderDetail } from "@/interfaces/Order";
import { setSwalFire } from "@/plugins/Sweetalert2";

export default defineStore("verifyStore", () => {
    const myOrders = ref<OrderDetail[]>([]);
    /**
     * 取得自己的訂單列表
     */
    function getMyOrders(): Promise<OrderDetail[]> {
        return bacsRequest
            .get(`orders`)
            .then(({ result }: any) => {
                myOrders.value = result as OrderDetail[];
                return Promise.resolve(myOrders.value);
            })
            .catch(err => Promise.reject(false));
    }

    /**
     * 取消訂單
     * @param orderId 訂單 id
     */
    function cancelOrder(orderId: OrderDetail['_id']): Promise<boolean> {
        return bacsRequest
            .delete(`orders/${orderId}`)
            .then(({ status }: any) => {
                return getMyOrders();
            })
            .then(result => {
                setSwalFire("toast", "success", "取消訂單成功", "您的訂單已取消");
                return Promise.resolve(true);
            })
            .catch(err => Promise.reject(false));
    }

    return {
        myOrders,
        getMyOrders,
        cancelOrder
    }
});