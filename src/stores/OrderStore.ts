import { defineStore } from "pinia";
import { ref } from "vue";
import { bacsRequest } from "@/plugins/AxiosBase";
import { OrderDetail } from "@/interfaces/Order";

export default defineStore("verifyStore", () => {
    const myOrders = ref<OrderDetail[]>([]);
    /**
     * 取得自己的訂單列表(不包含取消訂單)
     */
    function getMyOrders(): Promise<OrderDetail[]> {
        return bacsRequest
            .get(`orders`)
            .then(({ result }: any) => {
                myOrders.value = (result as OrderDetail[]).filter(item => item.status === 0);
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
            .then(result => Promise.resolve(true))
            .catch(err => Promise.reject(false));
    }

    return {
        myOrders,
        getMyOrders,
        cancelOrder
    }
});