<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import OrderDetailCard from "@/components/order/OrderDetailCard.vue";
import { OrderDetail } from "@/interfaces/Order";
import OrderStore from "@/stores/OrderStore";
import LoadingStore from "@/stores/LoadingStore";
import { newDateTransform } from "@/handle-formats/HandleDate";

const orderStore = OrderStore();
const { showLoading, hideLoading } = LoadingStore();
// 所有即將發生訂單
const futureOrders = ref<OrderDetail[]>([]);
// 歷史訂單
const historyOrders = ref<OrderDetail[]>([]);
const currentFutureOrdersIndex = ref<number>(0);
const isShowAll = ref<boolean>(false);

// 取得自己的訂單列表
onMounted(async (): Promise<void> => {
    showLoading();
    await orderStore.getMyOrders();
});

watch(
    () => orderStore.myOrders,
    (newMyOrders: OrderDetail[]): void => {
        futureOrders.value = [];
        historyOrders.value = [];

        const currentTimeStamp = new Date().getTime();
        newMyOrders.forEach(order => {
            const { checkInDate, status } = order;
            // checkInDate 為每天 08:00 點開始 故計算 15:00 退房為 15 - 8
            const checkInDateTimeStamp = newDateTransform(checkInDate).getTime() + (15 - 8) * 60 * 60 * 1000;
            if (checkInDateTimeStamp >= currentTimeStamp && status === 0) {
                futureOrders.value.push(order);
                futureOrders.value.sort((a: OrderDetail, b: OrderDetail) => a.checkInDate > b.checkInDate ? 1 : -1);
            } else {
                historyOrders.value.push(order);
                historyOrders.value.sort((a: OrderDetail, b: OrderDetail) => a.checkInDate > b.checkInDate ? -1 : 1);
            }
        });

        hideLoading();
    }, {
        deep: true
    }
);

// 取消訂單
async function cancelOrder() :Promise<void> {
    showLoading();
    const { _id } = futureOrders.value[currentFutureOrdersIndex.value];
    const success = await orderStore.cancelOrder(_id);
    if(success) {
        currentFutureOrdersIndex.value--;
        if(0 > currentFutureOrdersIndex.value) { currentFutureOrdersIndex.value = 0 }
    }
}
</script>

<template>
    <div class="row gap-6 gap-lg-8 g-0">
        <div class="col-lg">
            <OrderDetailCard :orderDetails="[futureOrders[currentFutureOrdersIndex]]">
                <div class="row align-items-center gx-4 mt-6 mt-lg-8" v-if="futureOrders.length">
                    <div class="col-6 col-sm order-sm-1">
                        <button type="button" class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#cancelOrderModal">取消預訂</button>
                    </div>
                    <div class="col-6 col-sm order-sm-2">
                        <RouterLink class="btn btn-primary w-100 disabled" to="#">查看詳情</RouterLink>
                    </div>
                    <div class="col-6 col-sm-auto mt-4 mt-sm-0 text-center text-sm-start order-sm-0">
                        <button :disabled="currentFutureOrdersIndex === 0" type="button" class="btn btn-link " @click="() => currentFutureOrdersIndex--">
                            <font-awesome-icon icon="fa-solid fa-angle-left" size="lg" fixed-width /><span class="d-sm-none ms-1">上一筆</span>
                        </button>
                    </div>
                    <div class="col-6 col-sm-auto mt-4 mt-sm-0 text-center text-sm-start order-4">
                        <button :disabled="currentFutureOrdersIndex >= futureOrders.length - 1" type="button" class="btn btn-link" @click="() => currentFutureOrdersIndex++">
                            <span class="d-sm-none me-1">下一筆</span>
                            <font-awesome-icon icon="fa-solid fa-angle-right" size="lg" fixed-width />
                        </button>
                    </div>
                </div>
            </OrderDetailCard>
        </div>
        <div class="col-lg-5">
            <OrderDetailCard :orderDetails="historyOrders" :isHistory="true" :isShowAll="isShowAll">
                <button type="button" class="btn btn-outline-primary w-100" v-if="historyOrders.length" @click="() => isShowAll = !isShowAll">
                    查看更多<font-awesome-icon :icon="isShowAll ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" class="ms-1" />
                </button>
            </OrderDetailCard>
        </div>
    </div>

    <!-- 取消 Modal -->
    <div class="modal fade" id="cancelOrderModal" tabindex="-1" aria-labelledby="cancelOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header d-lg-none">
                    <span class="text-subtitle text-neutral">取消預訂</span>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <button type="button" class="btn-close d-none d-lg-block" data-bs-dismiss="modal" aria-label="Close"></button>
                <h6 class="text-center text-neutral-80">確定要取消此房型的預訂嗎？</h6>
            </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary flex-fill" data-bs-dismiss="modal">關閉視窗</button>
                <button type="button" class="btn btn-primary flex-fill
                " data-bs-dismiss="modal" @click="cancelOrder">確定取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#cancelOrderModal {
    @include media-breakpoint-down(lg) {
        .modal-dialog {
            max-width: 100vw;
            margin: 0;
            align-items: end;
            min-height: 100vh;

            .modal-content,
            .modal-footer {
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            }

            .modal-body > h6 {
                font-size: 0.875rem !important;
            }
        }
    }

    .modal-body {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;

        @include media-breakpoint-up(lg) {
            padding-top: 6.25rem;
            padding-bottom: 6.25rem;

            .btn-close {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                width: 0.375rem;
                height: 0.375rem;
                padding: 0.25rem;
            }
        }
    }
}
</style>