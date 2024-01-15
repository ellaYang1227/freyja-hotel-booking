<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch, onMounted  } from "vue";

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

// 取得 navbarHeight
const navbarRef = ref<InstanceType<typeof NavbarComponent> | null>(null);
const navbarHeight = ref<number>(0);
onMounted(():void => {
    navbarHeight.value = navbarRef.value?.$el.offsetHeight;
})

</script>
<template>
    <section class="bg-neutral-bg d-flex flex-column justify-content-between min-vh-100">
        <NavbarComponent v-if="routeName !== 'guideline'" ref="navbarRef"/>
        <section class="flex-grow-1" :style="{ marginTop: `${navbarHeight}px` }">
            <RouterView />
        </section>
        <FooterComponent v-if="routeName !== 'guideline'"/>
    </section>
</template>
<style lang="scss"></style>
