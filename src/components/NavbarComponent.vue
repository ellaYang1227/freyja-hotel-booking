<script setup lang="ts">
import { logo } from "@/data/imagePaths";
const { VITE_COMPANY_NAME } = import.meta.env; 
// import { ref } from 'vue'

// defineProps<{ msg: string }>()

// const count = ref(0)
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/user/edit">
            <img :src="logo" :alt="VITE_COMPANY_NAME" />
        </RouterLink>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar">
            <div class="offcanvas-body d-flex align-items-center">
                <div class="collapse navbar-collapse show">
                    <ul class="navbar-nav ms-auto align-items-md-center gap-4">
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
    .container-fluid {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;

        @include media-breakpoint-up(xl) {
            padding: 1.5rem 5rem;
        }
    }
    
    .navbar-brand {
        img {
            width: 100%;
            height: 40px;

            @include media-breakpoint-up(lg) {
                height: 72px;
            }
        }
    }

    // .navbar-toggler {
    //     color: $white;

    // }

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
}
</style>
