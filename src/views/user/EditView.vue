<script setup lang="ts">
import { ref } from "vue";
import AuthStore from "@/stores/AuthStore";
import UserStore from "@/stores/UserStore";
import LoadingStore from "@/stores/LoadingStore";
import EmailAndPwdForm from "@/components/forms/EmailAndPwdForm.vue";
import UserInfoFrom from "@/components/forms/UserInfoFrom.vue";
import { ChangePasswordForm, EditMyInfoForm } from "@/interfaces/UserForm";

const { userInfo } = AuthStore();
const { changePassword } = UserStore();
const { hideLoading } = LoadingStore();

interface IsEditStatus {
    changePwd: boolean,
    editMyinfo: boolean
}

const userId = userInfo?._id || "";

// 表單狀態
const isEditStatus = ref<IsEditStatus>({ 
    changePwd: false,
    editMyinfo: false
})

// 切換編輯狀態
function changeEditStatus<K extends keyof IsEditStatus>(property: K) {
    isEditStatus.value[property] = !isEditStatus.value[property];
}

// 修改密碼
const changePwdFormDate = ref<ChangePasswordForm>({
    userId,
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
});

async function changePwd(values: ChangePasswordForm): Promise<void> {
    console.log(values)
    delete values.confirmPassword;
    const success = await changePassword(values);
    console.log(success)
    if(success) { changeEditStatus("changePwd") }
    hideLoading();
}

// 修改個人資料
console.log(userInfo)
const editMyInfoFormDate = ref<EditMyInfoForm>({
    userId,
    name: "台灣某個角落2",
    phone: "台灣某個角落2",
    birthday: "台灣某個角落2",
    "address": {
        "zipcode": 802,
        "detail": "台灣某個角落2"
    }
});

async function editMyinfo(values: EditMyInfoForm): Promise<void> {
    console.log(values)
    // delete values.confirmPassword;
    // const success = await changePassword(values);
    // console.log(success)
    // if (success) { changeEditStatus("changePwd") }
    // hideLoading();
}
</script>

<template>
    <div class="row gap-8 g-0">
        <div class="col-lg-5">
            <div class="card rounded-3 border-0">
                <div class="card-body p-6 p-lg-8 d-grid gap-6 gap-lg-8">
                    <h5 class="card-title mb-0">修改{{ isEditStatus.changePwd ? "帳號資料" : "密碼" }}</h5>
                    <EmailAndPwdForm from="changePassword" :formDate="changePwdFormDate" @handleSubmit="changePwd" v-slot="slotProps" v-if="isEditStatus.changePwd">
                        <button class="btn btn-primary" :disabled="slotProps.disabled">儲存設定</button>
                    </EmailAndPwdForm>
                    <ul v-else class="d-grid gap-4 gap-lg-6 list-unstyled mb-0">
                        <li class="d-grid gap-2">
                            <span class="d-block">電子信箱</span>
                            <strong class="text-title text-neutral">{{ userInfo?.email }}</strong>
                        </li>
                        <li class="d-flex gap-4">
                            <section class="d-grid gap-2 flex-grow-1">
                                <span class="d-block">密碼</span>
                                <strong class="text-title text-neutral d-flex gap-2 py-2">
                                    <font-awesome-icon icon="fa-solid fa-circle" fixed-width v-for="num in 10" :key="num" size="sm" style="font-size: 0.5rem" />
                                </strong>
                            </section>
                            <button class="btn btn-link" @click="changeEditStatus('changePwd')">重設</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg">
            <div class="card rounded-3 border-0">
                <div class="card-body p-6 p-lg-8">
                    <h5 class="card-title mb-0">基本資料</h5>
                    <UserInfoFrom :formDate="editMyInfoFormDate" @handleSubmit="editMyinfo" >
                        <template #registerBtn=slotProps>
                            <button class="btn btn-primary" :disabled="slotProps.disabled">完成註冊</button>
                        </template>
                    </UserInfoFrom>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>