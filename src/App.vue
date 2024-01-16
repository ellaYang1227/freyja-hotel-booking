<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch, onMounted, computed  } from "vue";

import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

// 取得 routeName
const route = useRoute();
const routeName = ref<undefined | string>(undefined);
watch<any, any>(
    () => route.name,
    (newVal: string | undefined): void => {
        routeName.value = newVal;
        if(routeName.value === 'guideline') { navbarHeight.value = 0 }
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

// 取得 navbarHeight
const navbarRef = ref<InstanceType<typeof NavbarComponent> | null>(null);
const navbarHeight = ref<number>(0);
onMounted(():void => {
    navbarHeight.value = navbarRef.value?.$el.offsetHeight;
})

</script>
<template>
    <section class="bg-neutral-bg d-flex flex-column justify-content-between min-vh-100">
        <NavbarComponent v-if="!isHideNavbar" ref="navbarRef"/>
        <section class="flex-grow-1" :style="{ marginTop: `${navbarHeight}px` }">
            <RouterView />
        </section>
        <FooterComponent v-if="!isHideFooter"/>
    </section>
</template>
<style lang="scss"></style>
