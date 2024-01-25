<script setup lang="ts">
import { ref, computed } from "vue";
import AuthStore from "@/stores/AuthStore";
import UserStore from "@/stores/UserStore";
import LoadingStore from "@/stores/LoadingStore";
import EmailAndPwdForm from "@/components/forms/EmailAndPwdForm.vue";
import UserInfoFrom from "@/components/forms/UserInfoFrom.vue";
import { ChangePasswordForm } from "@/interfaces/UserForm";
import { UserInfoBasic } from "@/interfaces/User";
import { zipcodeOptions } from "@/data/ZipcodeOptions";
import { zhTwDateTransform } from "@/handle-formats/HandleDate";

const { userInfo } = AuthStore();
const { changePassword, editMyinfo } = UserStore();
const { hideLoading } = LoadingStore();

interface IsEditStatus {
    changePwd: boolean,
    editMyinfo: boolean
}

const userId = userInfo?._id || "";
hideLoading();

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
    delete values.confirmPassword;
    const success = await changePassword(values);
    if(success) { changeEditStatus("changePwd") }
    hideLoading();
}

// 修改個人資料
const editMyInfoFormDate = ref<UserInfoBasic>({
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
    birthday: userInfo?.birthday || "",
    address: {
        zipcode: userInfo?.address.zipcode || 800,
        detail: userInfo?.address.detail || ""
    }
});

// 取得完整地址
const fullAddress = computed<string>(() => {
    const find = zipcodeOptions.find(option => option.zipcode === editMyInfoFormDate.value.address.zipcode);
    return `${find?.county}${find?.city}${editMyInfoFormDate.value.address.detail}`;
});

async function sendEditMyinfo(values: UserInfoBasic): Promise<void> {
    const result = await editMyinfo({...values, userId });
    if (result) { 
        editMyInfoFormDate.value = JSON.parse(JSON.stringify(values));
        changeEditStatus("editMyinfo"); 
    }
    hideLoading();
}
</script>

<template>
    <div class="row gap-6 gap-lg-8 g-0">
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
                <div class="card-body p-6 p-lg-8 d-grid gap-6 gap-lg-8">
                    <h5 class="card-title mb-0">基本資料</h5>
                    <UserInfoFrom from="editMyinfo" v-if="isEditStatus.editMyinfo" :formDate="editMyInfoFormDate" @handleSubmit="sendEditMyinfo" v-slot="slotProps">
                        <button class="btn btn-primary" :disabled="slotProps.disabled">儲存設定</button>
                    </UserInfoFrom>
                    <template v-else>
                        <ul class="d-grid gap-4 gap-lg-6 list-unstyled mb-0">
                            <li class="d-grid gap-2">
                                <span class="d-block">姓名</span>
                                <strong class="text-title text-neutral">{{ editMyInfoFormDate.name }}</strong>
                            </li>
                            <li class="d-grid gap-2">
                                <span class="d-block">手機號碼</span>
                                <strong class="text-title text-neutral">{{ editMyInfoFormDate.phone }}</strong>
                            </li>
                            <li class="d-grid gap-2">
                                <span class="d-block">生日</span>
                                <strong class="text-title text-neutral" v-if="userInfo">{{ zhTwDateTransform(editMyInfoFormDate.birthday, "年月日") }}</strong>
                            </li>
                            <li class="d-grid gap-2">
                                <span class="d-block">地址</span>
                                <strong class="text-title text-neutral">{{ fullAddress }}</strong>
                            </li>
                        </ul>
                        <section>
                            <button type="button" class="btn btn-outline-primary" @click="changeEditStatus('editMyinfo')">編輯</button>
                        </section>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>