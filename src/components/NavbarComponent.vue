<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";

import AuthStore from "@/stores/AuthStore";
import { logo } from "@/data/ImagePaths";
import * as bootstrap from "bootstrap";
import Offcanvas from "bootstrap/js/dist/offcanvas";
const { VITE_COMPANY_NAME } = import.meta.env;
const authStore = AuthStore();
const { logout } = authStore;

// 取得 routeName
const route = useRoute();
const routeName = ref<undefined | string>(undefined);
watch<any, any>(
    () => route.name,
    (newVal: string | undefined): void => {
        routeName.value = newVal;
    }
);

// 取得 offcanvas Navbar Element
const offcanvasNavbarEl = ref<HTMLDivElement>();
const offcanvasNavbar = ref<Offcanvas>();
onMounted(() => {
    if(offcanvasNavbarEl.value) {
        offcanvasNavbar.value = new bootstrap.Offcanvas(offcanvasNavbarEl.value);
    }
});

// 切換 Offcanvas Navbar
function toggleOffcanvasNavbar(method: "show" | "hide") :void {
    if(!offcanvasNavbar.value) { return }

    switch(method) {
        case "show":
            offcanvasNavbar.value.show();
            break;
        case "hide":
            offcanvasNavbar.value.hide();
            break;
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-neutral-bg">
        <div class="container-fluid py-4 py-lg-6 px-xl-12">
            <RouterLink class="navbar-brand" to="/user/edit">
                <img :src="logo" :alt="VITE_COMPANY_NAME" />
            </RouterLink>
            <button class="navbar-toggler border-0" type="button" @click="toggleOffcanvasNavbar('show')">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div ref="offcanvasNavbarEl" class="offcanvas offcanvas-start" tabindex="-1" :class="{'d-lg-none': routeName === 'login' || routeName === 'register'}">
                <div class="offcanvas-body d-flex align-items-center">
                    <button class="btn-close btn-close-white d-lg-none" type="button" @click="toggleOffcanvasNavbar('hide')"></button>
                    <div class="collapse navbar-collapse show">
                        <ul class="navbar-nav ms-auto align-items-lg-center gap-4 text-center">
                            <li class="nav-item">
                                <RouterLink class="nav-link" to="/rooms" @click="toggleOffcanvasNavbar('hide')">客房旅宿</RouterLink>
                            </li>
                            <li class="nav-item d-lg-none">
                                <RouterLink class="nav-link" :to="authStore.userInfo ? '/user/edit' : '/login'" @click="toggleOffcanvasNavbar('hide')">{{ authStore.userInfo ? "我的帳戶" : "會員登入" }}</RouterLink>
                            </li>
                            <li class="nav-item d-none d-lg-block dropdown">
                                <RouterLink class="nav-link" to="/login'" v-if="!authStore.userInfo">會員登入</RouterLink>
                                <template v-else>
                                    <a class="nav-link dropdown-toggle flex-row" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <font-awesome-icon icon="fa-regular fa-circle-user" class="me-2 icon-size" />
                                        {{ authStore.userInfo.name }}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="userDropdown">
                                        <li>
                                            <RouterLink class="dropdown-item" to="/user/edit">我的帳戶</RouterLink>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" @click="logout">登出</a>
                                        </li>
                                    </ul>
                                </template>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="btn btn-primary d-block d-lg-inline-block" to="/rooms" @click="toggleOffcanvasNavbar('hide')">立即訂房</RouterLink>
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
    }

    .btn-close {
        position: absolute;
        top: $offcanvas-padding-y;
        right: $offcanvas-padding-y;
    }
}
</style>