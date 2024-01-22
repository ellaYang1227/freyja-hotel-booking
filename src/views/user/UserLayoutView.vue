<script setup lang="ts">
import LoadingStore from '@/stores/LoadingStore';
const { hideLoading } = LoadingStore();
hideLoading();
</script>

<template>
    <div class="d-grid">
        <div>1111</div>
        <RouterView />
    </div>
</template>

<style lang="scss"></style>