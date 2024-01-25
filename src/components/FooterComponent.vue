<script setup lang="ts">
import { logo, line_mobile, line2, LINE, IG } from "@/data/ImagePaths";
const { VITE_COMPANY_NAME } = import.meta.env; 
</script>

<template>
    <img :src="line_mobile" :alt="VITE_COMPANY_NAME" class="line-img d-lg-none">
    <img :src="line2" :alt="VITE_COMPANY_NAME" class="line-img d-none d-lg-block">
    <div class="container-lg pt-12 pb-12 pb-lg-14 text-white d-grid gap-12">
        <div class="row row-cols-1 row-cols-lg-2 justify-content-between d-grid d-lg-flex gap-8 gap-lg-0">
            <div class="col d-grid gap-8">
                <img :src="logo" :alt="VITE_COMPANY_NAME" class="logo">
                <div class="d-flex align-items-center gap-4">
                    <a href="#">
                        <img :src="LINE" alt="LINE" class="community-img">
                    </a>
                    <a href="#">
                        <img :src="IG" alt="IG" class="community-img">
                    </a>
                </div>
            </div>
            <div class="col d-flex justify-content-end gap-10">
                <ul class="d-grid gap-4 gap-lg-8 list-unstyled mb-0">
                    <li>
                        <ul class="d-grid d-lg-flex align-items-center gap-4 gap-lg-12 list-unstyled mb-0">
                            <li class="d-grid gap-2">
                                <strong class="d-block text-title">TEL</strong>
                                <a href="tel:+886-7-1234567" class="link-neutral-0 text-decoration-none fw-normal">+886-7-1234567</a>
                            </li>
                            <li class="d-grid gap-2">
                                <strong class="d-block text-title">MAIL</strong>
                                <a href="mailto:elh@hexschool.com" class="link-neutral-0 text-decoration-none fw-normal">elh@hexschool.com</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="d-grid d-lg-flex align-items-center gap-4 gap-lg-12 list-unstyled mb-0">
                            <li class="d-grid gap-2">
                                <strong class="d-block text-title">FAX</strong>
                                <span>+886-7-1234567</span>
                            </li>
                            <li class="d-grid gap-2">
                                <strong class="d-block text-title">WEB</strong>
                                <a href="www.elhhexschool.com.tw" class="link-neutral-0 text-decoration-none fw-normal">www.elhhexschool.com.tw</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-lg-2 d-grid d-lg-flex gap-4 gap-lg-0">
            <div class="col">806023 台灣高雄市新興區六角路123號</div>
            <div class="col text-lg-end">© 享樂酒店 2023 All Rights Reserved.</div>
        </div>
    </div>
</template>

<style lang="scss">
img.line-img {
    object-fit: fill;
    height: 84px;

    @include media-breakpoint-up(lg) {
        height: 188px;
    }
}

img.logo {
    width: auto;
    height: 72px;
}

img.community-img {
    width: 40px;
    height: 40px;
}
</style>