<script setup lang="ts">
import { logo } from "@/data/ImagePaths";
const { VITE_COMPANY_NAME } = import.meta.env; 
// import { ref } from 'vue'

// defineProps<{ msg: string }>()

// const count = ref(0)
</script>

<template>
  FooterComponent
</template>

<style lang="scss">
.navbar-brand {
  img {
    width: 100%;
    height: 40px;

    @include media-breakpoint-up(lg) {
      height: 72px;
    }
  }
}
</style>