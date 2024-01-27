<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string, number } from "zod";
import { ref, watch } from "vue";
import { formSchema } from "@/data/FormSchema";
import LoadingStore from "@/stores/LoadingStore";
import { UserInfoBasic } from "@/interfaces/User";
import AddressSelect from "@/components/forms/AddressSelect.vue";
import BirthdaySelect from "@/components/forms/BirthdaySelect.vue";

const { showLoading, hideLoading } = LoadingStore();

// 從父元件傳入表單資料
interface UserInfoFromProps {
    formDate: UserInfoBasic,
    from: "register" | "editMyinfo",
}

const isAgree = ref<boolean>(false);
const props = defineProps<UserInfoFromProps>();
const { formDate } = props;

const { errors, values, meta, validate, setValues } = useForm({
    initialValues: formDate,
    validationSchema: toTypedSchema(object({
        name: string()
        .min(1, `請輸入${formSchema.nameSchema.label}`)
        .max(formSchema.nameSchema.maxlength as number, `${formSchema.nameSchema.label}限 ${formSchema.nameSchema.maxlength} 個字元`)
        .regex(/^[\u4e00-\u9fa5]*$|^[\sA-Za-z]*$/, `${formSchema.nameSchema.label}須為中文或英文，且不包含數字或特殊字元，若為英文可包含空白`),
        phone: string()
        .min(1, `請輸入${formSchema.phoneSchema.label}`)
        .regex(/^09\d{8}$/, `${formSchema.phoneSchema.label}須為 09 開頭的 10 碼數字`),
        birthday: string()
        .min(1, `請輸入${formSchema.birthdaySchema_year.label}`),
        address: (object({
            zipcode: number()
            .min(1, `請輸入${formSchema.addressSchema_zipcode.label}`),
            detail: string()
            .min(1, `請輸入${formSchema.addressSchema_detail.label}`)
        }))
    })),
});

const { value: name } = useField("name");
const { value: phone } = useField("phone");
const { value: birthday } = useField("birthday");
const { value: zipcode } = useField("address.zipcode");
const { value: detail } = useField("address.detail");
hideLoading();

// 發送表單資料至父元件
type DefineEmits = { handleSubmit: [values: UserInfoFromProps["formDate"]] };
const emits = defineEmits<DefineEmits>();
function sendDataToParent() {
    showLoading();
    emits("handleSubmit", values as UserInfoFromProps["formDate"]);
}

// 監聽父元件更新的值
watch(
    () => props.formDate,
    async (newVal: UserInfoFromProps["formDate"]) => {
        if(newVal) { 
            await validate();
            if(props.from !== "register") { setValues(newVal)}
        }
    },
    { 
        immediate: true,
        deep: true 
    }
);
</script>

<template>
    <Form @submit="sendDataToParent">
        <div class="d-grid gap-8">
            <div class="d-grid gap-4" :class="{ 'gap-lg-6': props.from === 'editMyinfo' }">
                <div class="d-grid gap-2">
                    <label :for="formSchema.nameSchema.name" class="form-label" :class="{ 'text-white': from === 'register' }">{{ formSchema.nameSchema.label }}</label>
                    <Field v-model.trim="name" :id="formSchema.nameSchema.name" :name="formSchema.nameSchema.name" class="form-control" :placeholder="formSchema.nameSchema.placeholder" :as="formSchema.nameSchema.as" :type="formSchema.nameSchema.type" :class="{ 'is-invalid': errors.name }" :maxlength="formSchema.nameSchema.maxlength"
                    />
                    <span class="invalid-feedback">{{ errors.name }}</span>
                </div>
                <div class="d-grid gap-2">
                    <label :for="formSchema.phoneSchema.name" class="form-label" :class="{ 'text-white': from === 'register' }">{{ formSchema.phoneSchema.label }}</label>
                    <Field v-model.trim="phone" :id="formSchema.phoneSchema.name" :name="formSchema.phoneSchema.name" class="form-control" :placeholder="formSchema.phoneSchema.placeholder" :as="formSchema.phoneSchema.as" :type="formSchema.phoneSchema.type"
                    :class="{ 'is-invalid': errors.phone }" :maxlength="formSchema.phoneSchema.maxlength"
                    />
                    <span class="invalid-feedback">{{ errors.phone }}</span>
                </div>
                <div class="d-grid gap-2">
                    <BirthdaySelect :model-value="(birthday as string)" @update:model-value="(values: string) => (birthday = values)" />
                </div>
                <div class="d-grid gap-2">
                    <AddressSelect :model-value="(zipcode as number)" @update:model-value="(values: number) => (zipcode = values)" />
                </div>
            </div>
        </div>
            <div class="d-grid gap-4 mt-4" :class="{ 'gap-lg-6': props.from === 'editMyinfo' }">
                <div class="d-grid gap-2">
                    <Field v-model.trim="detail" :name="formSchema.addressSchema_detail.name" class="form-control" :placeholder="formSchema.addressSchema_detail.placeholder" :as="formSchema.addressSchema_detail.as" :type="formSchema.addressSchema_detail.type"
                    :class="{ 'is-invalid': errors['address.detail'] }"
                    />
                    <span class="invalid-feedback">{{ errors["address.detail"] }}</span>
                </div>
                <div class="form-check" v-if="from === 'register'">
                    <input class="form-check-input" type="checkbox" v-model="isAgree" id="isAgree">
                    <label class="form-check-label text-white" for="isAgree">我已閱讀並同意本網站個資使用規範</label>
                </div>
            </div>
            <!-- submit 按鈕 -->
            <section class="mt-6 mt-lg-8" :class="props.from === 'register' ? 'mt-8' : 'mt-6 mt-lg-8'">
                <slot :disabled="!meta.valid || !isAgree" name="registerBtn"></slot>
                <slot :disabled="!meta.valid"></slot>
            </section>
    </Form>
</template>

<style lang="scss"></style>