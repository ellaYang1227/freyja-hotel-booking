<script setup lang="ts">
import { register } from "@/data/ImagePaths";
const { VITE_COMPANY_NAME } = import.meta.env;
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const title = computed<string>(() => {
    console.log(route.name)
    return `立即${route.name === 'login' ? '開始旅程' : '註冊'}`;
});
</script>

<template>
    <div class="row row-cols-2 g-0">
        <div class="col">
            <img :src="register" :alt="VITE_COMPANY_NAME" />
        </div>
        <div class="col bg-img-line pt-14">
            <div class="row justify-content-center align-items-center g-0">
                <div class="col-5">
                    <div class="d-grid gap-8">
                        <div class="d-grid gap-2">
                            <span class="text-title text-primary">享樂酒店，誠摯歡迎</span>
                            <h1 class="text-white">{{ title }}</h1>
                        </div>
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.bg-img-line {
    background: url("@/assets/images/line3.png") no-repeat;
    background-size: 100%;
    background-position-y: 72px;
}
</style>