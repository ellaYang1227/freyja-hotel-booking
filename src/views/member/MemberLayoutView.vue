<script setup lang="ts">
</script>

<template>
    <div class="row row-cols-1 row-cols-lg-2 g-0 min-height-inherit">
        <div class="col align-self-stretch d-none d-lg-block left-bg-img"></div>
        <div class="col bg-img-line">
            <div class="px-5 px-lg-0 flex-fill">
                <div class="row justify-content-center align-items-center g-0 pb-lg-5">
                    <div class="col-sm-auto">
                        <div class="form-width">
                            <RouterView />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.left-bg-img {
    background: url("@/assets/images/register.png") no-repeat;
    background-size: cover;
    background-position: center;
}
.form-width {
    @include media-breakpoint-up(sm) {
        width: 335px;
    }
    
    @include media-breakpoint-up(lg) {
        width: 416px;
    }
}

.bg-img-line {
    background: url("@/assets/images/line3.png") no-repeat;
    background-size: 100%;
    background-position-y: 32px;

    @include media-breakpoint-up(lg) {
        background-position-y: 72px;
    }
}
</style>