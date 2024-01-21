<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch, computed  } from "vue";

import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import LoadingStore from "@/stores/LoadingStore";
const loadingStore = LoadingStore();

// 取得 routeName
const route = useRoute();
const routeName = ref<undefined | string>(undefined);
watch<any, any>(
    () => route.name,
    (newVal: string | undefined): void => {
        routeName.value = newVal;
    }
);

// Navbar 是否隱藏
const isHideNavbar = computed<boolean>(() => {
    return routeName.value === 'guideline';
});

// Footer 是否隱藏
const isHideFooter = computed<boolean>(() => {
    return routeName.value === 'guideline' || routeName.value === 'login' || routeName.value === 'register';
});

</script>
<template>
    <VueLoading v-model:active="loadingStore.isLoading" color="#BF9D7D" :height="100" :width="100" />
    <section class="bg-neutral-bg d-flex flex-column justify-content-between min-vh-100">
        <NavbarComponent v-if="!isHideNavbar" />
        <section class="flex-grow-1" :class="{'main-height': routeName === 'login' || routeName === 'register', 'main-margin-top': routeName !== 'guideline'}">
            <RouterView />
        </section>
        <FooterComponent v-if="!isHideFooter"/>
    </section>
</template>
<style lang="scss">
.main-height {
    min-height: calc(100vh - $custom-navbar-height);

    @include media-breakpoint-up(lg) {
        min-height: calc(100vh - $custom-navbar-height-lg);
    }
}

.main-margin-top {
    margin-top: $custom-navbar-height;

    @include media-breakpoint-up(lg) {
        margin-top: $custom-navbar-height-lg;
    }

}
</style>
