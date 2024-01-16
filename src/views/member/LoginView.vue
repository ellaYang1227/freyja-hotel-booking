<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { ref } from "vue";
import { formSchema } from "@/data/FormSchema";
import { LoginForm } from "@/interfaces/UserForm";

const { emailSchema, passwordSchema } = formSchema;
const formValues = ref<LoginForm>({
    email: "",
    password: ""
});
const checkedRememberEmail = ref<boolean>(false);

const { errors, values, meta } = useForm({
    validationSchema: toTypedSchema(object({
        email: string()
        .email(`${emailSchema.label}格式錯誤`)
        .min(1, `請輸入${emailSchema.label}`),
        password: string()
        .min(1, `請輸入${passwordSchema.label}`)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/, `${passwordSchema.label}為必填，至少 8 碼以上英數混合`)
    })),
});

const { value: email } = useField('email');
const { value: password } = useField('password');

function onSubmit() {
    console.log(values, checkedRememberEmail.value)
}
</script>

<template>
    <Form @submit="onSubmit" :initial-values="formValues">
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
                    <button type="button" class="btn btn-link">忘記密碼？</button>
                </div>
            </div>
            <button class="btn btn-primary" :disabled="!meta.valid">會員登入</button>
            <div class="text-white d-flex gap-2">
                沒有會員嗎？
                <RouterLink class="text-link" to="/register">前往註冊</RouterLink>
            </div>
        </div>
    </Form>
</template>

<style lang="scss">
</style>