<script setup lang="ts">
import { register } from "@/data/imagePaths";
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
    <div class="row row-cols-1 row-cols-lg-2 g-0 h-100">
        <div class="col h-100 d-none d-lg-block">
            <img :src="register" :alt="VITE_COMPANY_NAME" />
        </div>
        <div class="col bg-img-line main-right-pt">
            <div class="px-5 px-lg-0 flex-fill">
                <div class="row justify-content-center align-items-center g-0">
                    <div class="col-sm-auto">
                        <div class="form-width d-grid gap-8">
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
    </div>
</template>

<style lang="scss">
.main-right-pt {
    padding-top: 5.75rem;

    @media (max-width: 375px) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0;
    }

    @include media-breakpoint-up(lg) {
        padding-top: 10rem;
    }

    .form-width {
        @include media-breakpoint-up(sm) {
            width: 335px;
        }
        
        @include media-breakpoint-up(lg) {
            width: 416px;
        }
    }
}

.bg-img-line {
    background: url("@/assets/images/line3.png") no-repeat;
    background-size: 100%;
    background-position-y: 32px;

    @include media-breakpoint-up(lg) {
        background-position-y: 72px;
    }
}
</style>