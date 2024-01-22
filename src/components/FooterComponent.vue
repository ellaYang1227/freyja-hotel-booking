<script setup lang="ts">
import { logo, LINE, IG } from "@/data/ImagePaths";
const { VITE_COMPANY_NAME } = import.meta.env; 
</script>

<template>
    <div class="container-lg pt-12 pb-12 pb-md-14 text-white d-grid gap-12">
        <div class="row row-cols-1 row-cols-md-2 justify-content-between d-grid d-md-flex gap-8 gap-md-0">
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
                <ul class="d-grid gap-4 gap-md-8 list-unstyled mb-0">
                    <li>
                        <ul class="d-grid d-md-flex align-items-center gap-4 gap-md-12 list-unstyled mb-0">
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
                        <ul class="d-grid d-md-flex align-items-center gap-4 gap-md-12 list-unstyled mb-0">
                            <li class="d-grid gap-2">
                                <strong class="d-block text-title">FAX</strong>
                                <span>+886-7-1234567</span>
                            </li>
                            <li class="d-grid gap-2">
                                <strong class="d-block text-title">MAIL</strong>
                                <a href="www.elhhexschool.com.tw" class="link-neutral-0 text-decoration-none fw-normal">www.elhhexschool.com.tw</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 d-grid d-md-flex gap-4 gap-md-0">
            <div class="col">806023 台灣高雄市新興區六角路123號</div>
            <div class="col text-md-end">© 享樂酒店 2023 All Rights Reserved.</div>
        </div>
    </div>
</template>

<style lang="scss">
img.logo {
    width: auto;
    height: 72px;
}

img.community-img {
    width: 40px;
    height: 40px;
}
</style>