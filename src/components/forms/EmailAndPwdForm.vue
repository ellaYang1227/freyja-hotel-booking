<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { ref } from "vue";
import { formSchema } from "@/data/FormSchema";
import LoadingStore from "@/stores/LoadingStore";
const { showLoading, hideLoading } = LoadingStore();
const { emailSchema, passwordSchema, confirmPasswordSchema } = formSchema;


// const props = defineProps<any>();

const { errors, values, meta } = useForm({
    initialValues: {
        email: "",
        password: "",
    },
    validationSchema: toTypedSchema(object({
        email: string()
        .email(`${emailSchema.label}格式錯誤`)
        .min(1, `請輸入${emailSchema.label}`),
        password: string()
        .min(1, `請輸入${passwordSchema.label}`)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/, `${passwordSchema.label}為必填，至少 8 碼以上英數混合`),
        confirmPassword: string()
        .min(1, `請再輸入一次${passwordSchema.label}`)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: `與${passwordSchema.label}不符`,
      path: ["confirmPassword"],
    })
    // .refine((data) => data.email !== props.isEmailExistsEmail, {
    //   message: "此信箱已被註冊",
    //   path: ["email"],
    // })
    ),
});

const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');
hideLoading();

async function onSubmit() {
    showLoading();
    console.log(values)
}
</script>

<template>
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
                <div class="d-grid gap-2">
                    <label :for="confirmPasswordSchema.name" class="form-label text-white">{{ confirmPasswordSchema.label }}</label>
                    <Field v-model.trim="confirmPassword" :id="confirmPasswordSchema.name" :name="confirmPasswordSchema.name" class="form-control" :placeholder="passwordSchema.placeholder" :as="passwordSchema.as" :type="passwordSchema.type"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                    />
                    <span class="invalid-feedback">{{ errors.confirmPassword }}</span>
                </div>
            </div>
            <button class="btn btn-primary" :disabled="!meta.valid">下一步</button>
        </div>
    </Form>
</template>

<style lang="scss"></style>