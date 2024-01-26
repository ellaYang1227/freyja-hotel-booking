<script setup lang="ts">
import { Form, Field, useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { ref, onMounted } from 'vue';
import * as bootstrap from "bootstrap";
import Modal from "bootstrap/js/dist/modal";
import UserStore from "@/stores/UserStore";
import VerifyStore from "@/stores/VerifyStore";
import LoadingStore from "@/stores/LoadingStore";
import { formSchema } from "@/data/FormSchema";

const { forgot } = UserStore();
const loadingStore = LoadingStore();
const { showLoading, hideLoading } = loadingStore;
const { emailSchema, codeSchema ,newPasswordSchema } = formSchema;
const verifyStore = VerifyStore();
const currentStep = ref<number>(1);
const registeredEmail = ref<string>()

const step1Form = useForm({
    initialValues: {
        email: "",
    },
    validationSchema: toTypedSchema(object({
        email: string()
            .email(`${emailSchema.label}格式錯誤`)
            .min(1, `請輸入${emailSchema.label}`)
    })
    .refine(form => !registeredEmail.value || form.email !== registeredEmail.value, {
            message: `此${emailSchema.label}註冊尚未註冊`,
            path: ["email"],
        })
    ),
});

const { value: email } = useField('email');

// 下一步(驗證信相)
async function nextStep() : Promise<void> {
    const { email } = step1Form.values;
    if (!email) { return }
    showLoading("btn");
    const isEmailExists = await verifyStore.verifyEmail(email);
    if (!isEmailExists) { 
        registeredEmail.value = email; 
        await step1Form.validate();
    } else {
        await generateEmailCode();
    }

    hideLoading("btn");
}

// 重發驗證信
async function generateEmailCode() {
    const { email } = step1Form.values;
    if (!email) { return }
    const success = await verifyStore.generateEmailCode(email);
    setTimeout(() => { if (success) { currentStep.value += 1 } }, 0);
}

const step2Form = useForm({
    initialValues: {
        code: "",
        newPassword: "",
    },
    validationSchema: toTypedSchema(object({
        code: string()
            .min(1, `請輸入${codeSchema.label}`),
        newPassword: string()
            .min(1, `請輸入${newPasswordSchema.label}`)
            .regex(/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/, `${newPasswordSchema.label}須為 8 碼以上英數混合`)
    })),
});

const { value: code } = useField('code');
const { value: newPassword } = useField('newPassword');

// 送出忘記密碼
async function sendForgot(): Promise<void> {
    showLoading("btn");
    const { email } = step1Form.values;
    const { code, newPassword } = step2Form.values;
    if (!email || !code || !newPassword) { return }
    await forgot({ code, newPassword, email });
    toggleForgotModal("hide");
}

// 取得 Modal Element
const forgotModalEl = ref<HTMLDivElement>();
const forgotModal = ref<Modal>();
onMounted(() => {
    if (forgotModalEl.value) {
        forgotModal.value = new bootstrap.Modal(forgotModalEl.value, { backdrop: "static", keyboard: false });
    }
});

// 切換 Modal
function toggleForgotModal(method: "show" | "hide"): void {
    currentStep.value = 1;
    step1Form.resetForm();

    if (!forgotModal.value) { return }

    switch (method) {
        case "show":
            forgotModal.value.show();
            break;
        case "hide":
            forgotModal.value.hide();
            break;
    }
}

// 提供給父元件調用
defineExpose({
    toggleForgotModal
});
</script>

<template>
    <button type="button" class="btn btn-link" @click="toggleForgotModal('show')">忘記密碼？</button>
    <div class="modal fade" tabindex="-1" ref="forgotModalEl" aria-hidden="true" aria-labelledby="forgotModalElLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">忘記密碼</h5>
            </div>
            <div class="modal-body">
                <section v-if="currentStep === 1">
                    <Form @submit="nextStep" id="step1-form">
                        <fieldset :disabled="loadingStore.isLoadingBtn">
                            <div class="d-grid gap-8">
                                <div class="d-grid gap-4">
                                    <div class="d-grid gap-2">
                                        <label :for="emailSchema.name" class="form-label">{{ emailSchema.label }}</label>
                                        <Field v-model.trim="email" :id="emailSchema.name" :name="emailSchema.name" class="form-control" :placeholder="emailSchema.placeholder" :as="emailSchema.as" :type="emailSchema.type" :class="{ 'is-invalid': step1Form.errors.value.email }"
                                        />
                                        <span class="invalid-feedback">{{ step1Form.errors.value.email }}</span>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </Form>
                </section>
                <section v-else>
                    <Form @submit="sendForgot" id="step2-form">
                            <fieldset :disabled="loadingStore.isLoadingBtn">
                                <div class="d-grid gap-8">
                                    <div class="d-grid gap-4">
                                        <div class="d-grid gap-2">
                                            <label :for="emailSchema.name" class="form-label">{{ emailSchema.label }}</label>
                                            <input readonly :name="emailSchema.name" class="form-control-plaintext" :type="emailSchema.type" :value="step1Form.values.email"/>
                                            <span class="invalid-feedback">{{ step1Form.errors.value.email }}</span>
                                        </div>
                                        <div class="d-grid gap-2">
                                            <label :for="codeSchema.name" class="form-label">{{ codeSchema.label }}</label>
                                            <div class="d-flex align-items-center gap-2">
                                                <Field v-model.trim="code" :id="codeSchema.name" :name="codeSchema.name" class="form-control" :placeholder="codeSchema.placeholder" :as="codeSchema.as" :type="codeSchema.type" :class="{ 'is-invalid': step2Form.errors.value.code }"
                                                />
                                                <button type="button" class="btn btn-link flex-shrink-0" :disabled="loadingStore.isLoadingBtn" @click="generateEmailCode">重發驗證信</button>
                                            </div>
                                            <span class="invalid-feedback">{{ step2Form.errors.value.code }}</span>
                                        </div>
                                        <div class="d-grid gap-2">
                                            <label :for="newPasswordSchema.name" class="form-label">{{ newPasswordSchema.label }}</label>
                                            <Field v-model.trim="newPassword" :id="newPasswordSchema.name" :name="newPasswordSchema.name" class="form-control" :placeholder="newPasswordSchema.placeholder" :as="newPasswordSchema.as" :type="newPasswordSchema.type" :class="{ 'is-invalid': step2Form.errors.value.newPassword }"
                                            />
                                            <span class="invalid-feedback">{{ step2Form.errors.value.newPassword }}</span>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </Form>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary" @click="toggleForgotModal('hide')" :disabled="loadingStore.isLoadingBtn">關閉</button>
                <button type="submit" class="btn btn-primary" :form="currentStep === 1 ? 'step1-form' : 'step2-form'" :disabled="currentStep === 1 && !step1Form.meta.value.valid || currentStep === 2 && !step2Form.meta.value.valid || loadingStore.isLoadingBtn">
                    <template v-if="loadingStore.isLoadingBtn">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Loading...</span>
                    </template>
                    <template v-else>{{ currentStep === 1 ? '下一步' : '送出' }}</template>
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>