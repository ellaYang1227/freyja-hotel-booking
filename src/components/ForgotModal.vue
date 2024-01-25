<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as bootstrap from "bootstrap";
import Modal from "bootstrap/js/dist/modal";

const currentStep = ref<number>(1);

// 下一步(驗證信相)
async function nextStep() : Promise<void> {
    currentStep.value += 1;
    console.log('nextStep')
}

// 送出忘記密碼
async function sendForgot(): Promise<void> {
    console.log('sendForgot')
}

// 取得 Modal Element
const forgotModalEl = ref<HTMLDivElement>();
const forgotModal = ref<Modal>();
onMounted(() => {
    if (forgotModalEl.value) {
        forgotModal.value = new bootstrap.Modal(forgotModalEl.value, { backdrop: false, keyboard: false });
    }
});

// 切換 Modal
function toggleForgotModal(method: "show" | "hide"): void {
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
    <div class="modal" tabindex="-1" ref="forgotModalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">忘記密碼</h5>
          </div>
          <div class="modal-body">
            <section v-if="currentStep === 1">步驟一</section>
            <section v-else>步驟二</section>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="toggleForgotModal('hide')">關閉</button>
            <button type="button" class="btn btn-primary" @click="currentStep === 1 ? nextStep : sendForgot">{{ currentStep === 1 ? '下一步' : '送出' }}</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss"></style>