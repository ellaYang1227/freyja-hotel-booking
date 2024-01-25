<script setup lang="ts">
import { hero, user1 } from "@/data/ImagePaths";
import AuthStore from "@/stores/AuthStore";
const authStore = AuthStore();
</script>

<template>
    <div class="banner">
        <img :src="hero" :alt="authStore.userInfo?.name" class="position-absolute" />
        <div class="container-lg d-grid d-lg-flex align-items-center gap-4 gap-lg-6 position-absolute">
            <img :src="user1" :alt="authStore.userInfo?.name" class="img-avatar" />
            <h1 class="text-white">Hello，{{ authStore.userInfo?.name }}</h1>
        </div>
    </div>
    <div class="container-lg pb-8 pb-lg-14">
        <div class="py-8 py-lg-12">
            <nav class="nav customize-tabs">
                <RouterLink class="nav-link" to="/user/edit">個人資料</RouterLink>
                <RouterLink class="nav-link" to="/user/orders">我的訂單</RouterLink>
            </nav>
        </div>
        <RouterView />
    </div>
</template>

<style lang="scss">
.banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 206px;

    @include media-breakpoint-up(lg) {
        height: 384px;
    }

    // 頭像
    img.img-avatar {
        width: 72px;
        height: 72px;

        @include media-breakpoint-up(lg) {
            width: 144px;
            height: 144px;
        }
    }
}

.customize-tabs {
    .nav-link {
        display: flex;
        flex-direction: column;
        align-items: center;

        &.active,
        &:hover {
            color: $primary;

            &::after {
                margin-top: 0.5rem;
                content: "";
                height: 4px;
                width: 32px;
                border-radius: 0.625rem;
                background-color: $primary;
            }
        }
    }
}
</style>