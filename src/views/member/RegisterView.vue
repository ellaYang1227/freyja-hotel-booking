<script setup lang="ts">
import { ref } from "vue";
import VerifyStore from "@/stores/VerifyStore";
import LoadingStore from "@/stores/LoadingStore";
import UserStore from "@/stores/UserStore";
import EmailAndPwdForm from "@/components/forms/EmailAndPwdForm.vue";
import UserInfoFrom from "@/components/forms/UserInfoFrom.vue";
import { RegisterStep1Form } from "@/interfaces/UserForm";
import { UserInfoBasic } from "@/interfaces/User";

const { hideLoading } = LoadingStore();
type Step = 1 | 2;
const steps = ref<string[]>(["輸入信箱及密碼", "填寫基本資料"]);
const currentStep = ref<Step>(1);

const step1FormDate = ref<RegisterStep1Form>({
    email: "",
    password: "",
    confirmPassword: ""
});

const step2FormDate = ref<UserInfoBasic>({
    name: "",
    phone: "",
    birthday: "",
    address: {
        zipcode: 0,
        detail: ""
    }
});

const registeredEmail = ref<string>("");
const { verifyEmail } = VerifyStore();
async function nextStep(values: RegisterStep1Form): Promise<void> {
    step1FormDate.value = values;
    const { email } = step1FormDate.value;
    const isEmailExists = await verifyEmail(email);

    if (isEmailExists) {
        registeredEmail.value = email;
    } else {
        currentStep.value++; 
    }

    hideLoading();
}

const { signup } = UserStore();
async function handleSubmit(values: UserInfoBasic): Promise<void> {
    step2FormDate.value = values;
    const newStep1FormDate :any = { ...step1FormDate.value };
    delete newStep1FormDate.confirmPassword;
    await signup({ 
        ...newStep1FormDate, 
        ...step2FormDate.value
    });
}
</script>

<template>
    <div class="d-grid gap-8" :class="currentStep === 2 ? 'step2-pt' : 'step1-pt'">
        <div class="d-grid gap-4">
            <div class="d-grid gap-2">
                <span class="text-title text-primary" :class="{ 'd-lg-none': currentStep === 2 }">享樂酒店，誠摯歡迎</span>
                <h1 class="text-white">立即註冊</h1>
            </div>
            <div class="d-flex align-items-center gap-1 py-4">
                <template v-for="(step, index) in steps" :key="step">
                    <div class="step" :class="{ 'step-active': currentStep >= (index + 1) }">
                        <strong class="step-number">
                            <font-awesome-icon icon="fa-solid fa-check" v-if="currentStep > (index + 1)" />
                            <template v-else>{{ index + 1 }}</template>
                        </strong>
                        <strong class="step-title">{{ step }}</strong>
                    </div>
                    <div class="step-line" v-if="index % 2 === 0"></div>
                </template>
            </div>
        </div>
        <section class="d-grid gap-4">
            <div v-show="currentStep === 1" >
                <EmailAndPwdForm from="register" :formDate="step1FormDate" :registeredEmail="registeredEmail" @handleSubmit="nextStep" v-slot="slotProps">
                    <button class="btn btn-primary w-100" :disabled="slotProps.disabled">下一步</button>
                </EmailAndPwdForm>
            </div>
            <div v-show="currentStep === 2" >
                <UserInfoFrom from="register" :formDate="step2FormDate" @handleSubmit="handleSubmit" >
                    <template #registerBtn=slotProps>
                        <button class="btn btn-primary w-100" :disabled="slotProps.disabled">完成註冊</button>
                    </template>
                </UserInfoFrom>
            </div>
            <div class="text-white d-flex gap-2">
                已經有會員了嗎？
                <RouterLink class="text-link" to="/login">立即登入</RouterLink>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.step1-pt {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    @include media-breakpoint-up(lg) {
        padding-top: 5.25rem;
    }
}

.step2-pt {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;

    @include media-breakpoint-up(lg) {
        padding-top: 0.25rem;
        padding-bottom: 5.75rem;
    }
}
// 步驟
.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    .step-number {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $neutral-60;
    }

    .step-title,
    .step-number {
        color: $neutral-60;
    }

    // 作用中
    &.step-active {
        .step-number {
            border-color: $primary;
            background-color: $primary;
        }

        .step-title,
        .step-number {
            color: $white;
        }
    }
}

.step-line {
    flex-grow: 1;
    min-width: 133px;
    height: 2px;
    border-radius: 0.625rem;
    background-color: $neutral-60;

    @include media-breakpoint-up(lg) {
        min-width: 188px;
    }
}
</style>