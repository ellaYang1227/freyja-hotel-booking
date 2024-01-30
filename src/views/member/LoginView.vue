<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ForgotModal from "@/components/modals/ForgotModal.vue";
import { formSchema } from "@/data/FormSchema";
import { LoginForm } from "@/interfaces/UserForm";
import AuthStore from "@/stores/AuthStore";
import LoadingStore from "@/stores/LoadingStore";
import UserStore from "@/stores/UserStore";

const { getStorageSpecifyData, setStorageSpecifyData, removeStorageSpecifyData } = AuthStore();
const { showLoading, hideLoading } = LoadingStore();
const { login } = UserStore();
const { emailSchema, passwordSchema } = formSchema;
const checkedRememberEmail = ref<boolean>(false);
checkedRememberEmail.value = getStorageSpecifyData('email') ? true : false;

const { errors, values, meta } = useForm({
    initialValues: {
        email: getStorageSpecifyData('email') || "",
        password: "",
    },
    validationSchema: toTypedSchema(object({
        email: string()
        .email(`${emailSchema.label}格式錯誤`)
        .min(1, `請輸入${emailSchema.label}`),
        password: string()
        .min(1, `請輸入${passwordSchema.label}`)
    })),
});

const { value: email } = useField('email');
const { value: password } = useField('password');
hideLoading();

const router = useRouter();
const route = useRoute();
async function onSubmit(): Promise<void> {
    showLoading();
    if(checkedRememberEmail.value) {
        setStorageSpecifyData('email', values.email as string);
    } else {
        removeStorageSpecifyData('email');
    }

    const success = await login(values as LoginForm);
    if(success) {
        const { returnUrl } = route.query;
        router.push(returnUrl ? returnUrl as string : "user/edit");
    }
}
</script>

<template>
    <div class="d-grid gap-8 main-pt">
        <div class="d-grid gap-2">
            <span class="text-title text-primary">享樂酒店，誠摯歡迎</span>
            <h1 class="text-white">立即開始旅程</h1>
        </div>
        <Form @submit="onSubmit">
            <div class="d-grid gap-8">
                <div class="d-grid gap-4">
                    <div class="d-grid gap-2">
                        <label :for="emailSchema.name" class="form-label text-white">{{ emailSchema.label }}</label>
                        <Field v-model.trim="email" :id="emailSchema.name" :name="emailSchema.name" class="form-control" :placeholder="emailSchema.placeholder" :as="emailSchema.as" :type="emailSchema.type" :class="{ 'is-invalid': errors.email }"
                        />
                        <span class="invalid-feedback">{{ errors.email }}</span>
                    </div>
                    <div class="d-grid gap-2">
                        <label :for="passwordSchema.name" class="form-label text-white">{{ passwordSchema.label }}</label>
                        <Field v-model.trim="password" :id="passwordSchema.name" :name="passwordSchema.name" class="form-control" :placeholder="passwordSchema.placeholder" :as="passwordSchema.as" :type="passwordSchema.type"
                        :class="{ 'is-invalid': errors.password }"
                        />
                        <span class="invalid-feedback">{{ errors.password }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="checkedRememberEmail" id="rememberEmail">
                            <label class="form-check-label text-white" for="rememberEmail">記住帳號</label>
                        </div>
                        <ForgotModal />
                    </div>
                </div>
                <button class="btn btn-primary" :disabled="!meta.valid">會員登入</button>
                <div class="text-white d-flex gap-2">
                    沒有會員嗎？
                    <RouterLink class="text-link" to="/register">前往註冊</RouterLink>
                </div>
            </div>
        </Form>
    </div>
</template>

<style lang="scss">
.main-pt {
    padding-top: 5.75rem;

    @include media-breakpoint-up(lg) {
        padding-top: 10rem;
    }
}
</style>