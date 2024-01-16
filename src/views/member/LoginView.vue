<script setup lang="ts">
import { Form, Field, useForm } from "vee-validate";
import { object, string } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from "vue";
import { formSchema } from "@/data/FormSchema";
import { LoginForm } from "@/interfaces/UserForm";
import InputTextComponent from "@/components/forms/InputTextComponent.vue";

const { emailSchema, passwordSchema } = formSchema;
// const loginForm = ref<null | Order>(null);

// const { errors, values, handleSubmit, meta, defineField } = useForm({
//     validationSchema: toTypedSchema(object({
//         email: string()
//         .email(`請輸入${emailSchema.label}`)
//         .min(1, `請輸入${emailSchema.label}`)
//         .default("something@email.com"),
//         password: string()
//         .min(1, `請輸入${passwordSchema.label}`)
//         .default("")
//     })),
// });

// const [email, emailAttrs] = defineField("email");
// const [password, passwordAttrs] = defineField("password");
// const props = defineProps({
//     email: String,
//     password: String
// });

// const { value, errorMessage } = useField(() => props.name);
// https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/

// handleSubmit(values => {
//     alert(JSON.stringify(values, null, 2));
// });

function onSubmit() {
    console.log('onSubmit')
}
</script>

<template>
    <!-- <div class="text-white">errors：{{ errors }}</div>
    <div class="text-white">values：{{ values }}</div>
    <div class="text-white">meta：{{ meta }}</div> -->
    <Form @submit="onSubmit">
        <div class="d-grid gap-8">
            <div class="d-grid gap-4">
                <div class="d-grid gap-2">
                        <label :for="emailSchema.name" class="form-label text-white">{{ emailSchema.label }}-222</label>
                        <InputTextComponent :name="emailSchema.name" schema="emailSchema" />
                    </div>
                <!-- <div class="d-grid gap-2">
                    <label :for="emailSchema.name" class="form-label text-white">{{ emailSchema.label }}</label>
                    <Field v-model.trim="email" :id="emailSchema.name" :name="emailSchema.name" class="form-control" :placeholder="emailSchema.placeholder" :as="emailSchema.as" :type="emailSchema.type" v-bind="emailAttrs" :class="{ 'is-invalid': errors.email }"
                    />
                    <span class="invalid-feedback">{{ errors.email }}</span>
                </div>
                <div class="d-grid gap-2">
                    <label :for="passwordSchema.name" class="form-label text-white">{{ passwordSchema.label }}</label>
                    <Field v-model.trim="password" :id="passwordSchema.name" :name="passwordSchema.name" class="form-control" :placeholder="passwordSchema.placeholder" :as="passwordSchema.as" :type="passwordSchema.type" v-bind="passwordAttrs"
                    :class="{ 'is-invalid': errors.password }"
                    />
                    <span class="invalid-feedback">{{ errors.password }}</span>
                </div> -->
            </div>
            <!-- <button class="btn btn-primary" :disabled="!meta.touched || !meta.valid">會員登入</button> -->
            <div class="text-white d-flex gap-2">
                沒有會員嗎？
                <RouterLink class="text-link" to="/register">前往註冊</RouterLink>
            </div>
        </div>
    </Form>
</template>

<style lang="scss">
</style>