<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { watch } from "vue";
import { formSchema } from "@/data/FormSchema";
import LoadingStore from "@/stores/LoadingStore";
import { RegisterStep1Form, Email } from "@/interfaces/UserForm";
const { showLoading, hideLoading } = LoadingStore();
const { emailSchema, passwordSchema, confirmPasswordSchema } = formSchema;


// 從父元件傳入表單資料
interface EmailAndPwdFormProps {
    formDate: RegisterStep1Form,
    registeredEmail?: Email
}

const props = defineProps<EmailAndPwdFormProps>();
const { formDate } = props;

const { errors, values, meta, validate } = useForm({
    initialValues: formDate,
    validationSchema: toTypedSchema(object({
        email: string()
        .email(`${emailSchema.label}格式錯誤`)
        .min(1, `請輸入${emailSchema.label}`),
        password: string()
        .min(1, `請輸入${passwordSchema.label}`)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/, `${passwordSchema.label}須為 8 碼以上英數混合`),
        confirmPassword: string()
        .min(1, `請再輸入一次${passwordSchema.label}`)
    })
    .refine(form => form.password === form.confirmPassword, {
        message: `與${passwordSchema.label}不符`,
        path: ["confirmPassword"],
    })
    .refine(form => form.email !== props.registeredEmail, {
        message: `此${emailSchema.label}已被註冊`,
        path: ["email"],
    })),
});

const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirmPassword } = useField("confirmPassword");
hideLoading();

// 發送表單資料至父元件
type DefineEmits = { handleSubmit: [values: EmailAndPwdFormProps["formDate"]] };
const emits = defineEmits<DefineEmits>();
function sendDataToParent() {
    showLoading();
    emits("handleSubmit", values as EmailAndPwdFormProps["formDate"]);
}

// 監聽父元件更新的值
watch<any, any>(
    () => props.registeredEmail,
    async (newVal: EmailAndPwdFormProps["registeredEmail"]) => {
        if(newVal) { await validate() }
    }, { 
        deep: true 
    }
);
</script>

<template>
    <Form @submit="sendDataToParent">
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
            <!-- submit 按鈕 -->
            <slot :disabled="!meta.valid"></slot>
        </div>
    </Form>
</template>

<style lang="scss"></style>