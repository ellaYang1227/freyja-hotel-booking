<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { watch } from "vue";
import { formSchema } from "@/data/FormSchema";
import LoadingStore from "@/stores/LoadingStore";
import AuthStore from "@/stores/AuthStore";
import { RegisterStep1Form, Email, ChangePasswordForm } from "@/interfaces/UserForm";
const { userInfo } = AuthStore();
const { showLoading, hideLoading } = LoadingStore();
const { emailSchema, passwordSchema, oldPasswordSchema, newPasswordSchema, confirmPasswordSchema, FormSchema } = formSchema;

// 從父元件傳入表單資料
interface EmailAndPwdFormProps {
    from: "register" | "changePassword",
    formDate: RegisterStep1Form | ChangePasswordForm,
    registeredEmail?: Email
}

const props = defineProps<EmailAndPwdFormProps>();
const { formDate } = props;
const { errors, values, meta, validate } = useForm({
    initialValues: formDate,
    validationSchema: getValidationSchema()
});

const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: oldPassword } = useField("oldPassword");
const { value: newPassword } = useField("newPassword");
const { value: confirmPassword } = useField("confirmPassword");
hideLoading();

// 監聽父元件更新的值
watch(
    () => props.registeredEmail,
    async (newVal: EmailAndPwdFormProps["registeredEmail"]) => {
        if (newVal) { await validate() }
    }, {
    deep: true
});

// 取得 ValidationSchema 資料
function getValidationSchema() {
    const password: any = (schema: typeof FormSchema) => {
        return string()
            .min(1, `請輸入${schema.label}`)
            .regex(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/, `${schema.label}須為 8 碼以上英數混合`)
    };

    const currentPasswordLabel = (props.from === "changePassword"  ? newPasswordSchema : passwordSchema).label;
    let baseSchema: { [name:string]:any } = {
        confirmPassword: string()
            .min(1, `請再輸入一次${currentPasswordLabel}`)
    };

    const addSchema: { [name: string]: any } = {};
    if(props.from === "changePassword") {
        addSchema.oldPassword = string()
            .min(1, `請輸入${oldPasswordSchema.label}`);
        addSchema.newPassword = password(newPasswordSchema);
    }else {
        addSchema.email = string()
            .email(`${emailSchema.label}格式錯誤`)
            .min(1, `請輸入${emailSchema.label}`);
        addSchema.password = password(passwordSchema);
    }

    baseSchema = { ...baseSchema, ...addSchema };
    return toTypedSchema(object(baseSchema)
        .refine(form => form.password === form.confirmPassword || form.newPassword === form.confirmPassword, {
            message: `與${currentPasswordLabel}不符`,
            path: ["confirmPassword"],
        })
        .refine(form => props.from === "changePassword" || form.email !== props.registeredEmail, {
            message: `此${emailSchema.label}已被註冊`,
            path: ["email"],
        }));
}

// 發送表單資料至父元件
type DefineEmits = { handleSubmit: [newValues: any] };
const emits = defineEmits<DefineEmits>();
function sendDataToParent() :void {
    showLoading();
    const newValues = Object.keys(props.formDate).reduce((accumulator: any, currentKey: string) => {
        accumulator[currentKey] = values[currentKey];
        return accumulator;
    }, {});

    emits("handleSubmit", newValues);
}
</script>

<template>
    <Form @submit="sendDataToParent">
        <section class="d-grid" :class="props.from === 'changePassword' ? 'gap-6 gap-lg-8' : 'gap-8'">
            <div class="d-grid gap-4" :class="{ 'gap-lg-6': props.from === 'changePassword' }">
                <div class="d-grid gap-2">
                    <label :for="emailSchema.name" class="form-label" :class="{ 'text-white': props.from === 'register' }">{{ emailSchema.label }}</label>
                    <input :type="emailSchema.type" readonly class="form-control-plaintext" :id="emailSchema.name"  :value="userInfo?.email" v-if="props.from === 'changePassword'">
                    <template v-else>
                        <Field v-model.trim="email" :id="emailSchema.name" :name="emailSchema.name" class="form-control" :placeholder="emailSchema.placeholder" :as="emailSchema.as" :type="emailSchema.type" :class="{ 'is-invalid': errors.email }"
                        />
                        <span class="invalid-feedback">{{ errors.email }}</span>
                    </template>
                </div>
                <template v-if="props.from === 'changePassword'">
                    <div class="d-grid gap-2">
                        <label :for="oldPasswordSchema.name" class="form-label">{{ oldPasswordSchema.label }}</label>
                        <Field v-model.trim="oldPassword" :id="oldPasswordSchema.name" :name="oldPasswordSchema.name" class="form-control" :placeholder="oldPasswordSchema.placeholder" :as="oldPasswordSchema.as" :type="oldPasswordSchema.type"
                        :class="{ 'is-invalid': errors.oldPassword }"
                        />
                        <span class="invalid-feedback">{{ errors.oldPassword }}</span>
                    </div>
                        <div class="d-grid gap-2">
                            <label :for="newPasswordSchema.name" class="form-label">{{ newPasswordSchema.label }}</label>
                            <Field v-model.trim="newPassword" :id="newPasswordSchema.name" :name="newPasswordSchema.name" class="form-control" :placeholder="newPasswordSchema.placeholder" :as="newPasswordSchema.as" :type="newPasswordSchema.type"
                            :class="{ 'is-invalid': errors.newPassword }"
                            />
                            <span class="invalid-feedback">{{ errors.newPassword }}</span>
                        </div>
                </template>
                <template v-else>
                    <div class="d-grid gap-2">
                        <label :for="passwordSchema.name" class="form-label text-white">{{ passwordSchema.label }}</label>
                        <Field v-model.trim="password" :id="passwordSchema.name" :name="passwordSchema.name" class="form-control" :placeholder="passwordSchema.placeholder" :as="passwordSchema.as" :type="passwordSchema.type"
                        :class="{ 'is-invalid': errors.password }"
                        />
                        <span class="invalid-feedback">{{ errors.password }}</span>
                    </div>
                </template>
                <div class="d-grid gap-2">
                    <label :for="confirmPasswordSchema.name" class="form-label" :class="{ 'text-white': props.from === 'register' }">{{ confirmPasswordSchema.label }}</label>
                    <Field v-model.trim="confirmPassword" :id="confirmPasswordSchema.name" :name="confirmPasswordSchema.name" class="form-control" :placeholder="passwordSchema.placeholder" :as="passwordSchema.as" :type="passwordSchema.type"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                    />
                    <span class="invalid-feedback">{{ errors.confirmPassword }}</span>
                </div>
            </div>
            <!-- submit 按鈕 -->
            <section>
                <slot :disabled="!meta.valid"></slot>
            </section>
        </section>
    </Form>
</template>

<style lang="scss"></style>