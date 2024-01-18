<script setup lang="ts">
import EmailAndPwdForm from '@/components/forms/EmailAndPwdForm.vue';

</script>

<template>
    <div>111</div>
    <section class="d-grid gap-4">
        <EmailAndPwdForm />
        <div class="text-white d-flex gap-2">
            已經有會員了嗎？
            <RouterLink class="text-link" to="/login">立即登入</RouterLink>
        </div>
    </section>
    
</template>

<style lang="scss">
</style>