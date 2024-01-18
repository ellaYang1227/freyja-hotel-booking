<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch  } from "vue";

import { logo } from "@/data/imagePaths";
const { VITE_COMPANY_NAME } = import.meta.env;

// 取得 routeName
const route = useRoute();
const routeName = ref<undefined | string>(undefined);
watch<any, any>(
    () => route.name,
    (newVal: string | undefined): void => {
        routeName.value = newVal;
    }
);
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-neutral-bg">
    <div class="container-fluid py-4 py-lg-6 px-xl-12">
        <RouterLink class="navbar-brand" to="/user/edit">
            <img :src="logo" :alt="VITE_COMPANY_NAME" />
        </RouterLink>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" :class="{'d-lg-none': routeName === 'login' || routeName === 'register'}">
            <div class="offcanvas-body d-flex align-items-center">
                <button class="btn-close d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"></button>
                <div class="collapse navbar-collapse show">
                    <ul class="navbar-nav ms-auto align-items-lg-center gap-4 text-center">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/rooms">客房旅宿</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/login">會員登入</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="btn btn-primary d-block d-lg-inline-block" to="/rooms">立即訂房</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
    .navbar-brand {
        img {
            width: 100%;
            height: 40px;

            @include media-breakpoint-up(lg) {
                height: 72px;
            }
        }
    }

    .nav-link {
        color: $white !important;

        &:hover,
        &.active  {
            color: $primary !important;
        }

        &.active  {
            cursor: default;
        }
    }

    .btn-close {
        position: absolute;
        top: $offcanvas-padding-y;
        right: $offcanvas-padding-y;
    }
}
</style>
@/data/ImagePaths