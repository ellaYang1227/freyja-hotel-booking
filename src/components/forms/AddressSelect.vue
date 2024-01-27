<script setup lang="ts">
import { useRoute } from "vue-router";
import { Field } from "vee-validate";
import { computed, watch, ref } from "vue";
import { ZipcodeOption, zipcodeOptions } from "@/data/ZipcodeOptions";
import { formSchema } from "@/data/FormSchema";

const route = useRoute();

interface Props {
    modelValue: ZipcodeOption["zipcode"]
}

const props = defineProps<Props>();
// 設定縣市、區碼
const county = ref<ZipcodeOption["county"]>();
const zipcode = ref<ZipcodeOption["zipcode"]>();

// 監聽 modelValue 更新 重設 county
watch(
    () => props.modelValue,
    (modelValue: ZipcodeOption["zipcode"]) => {
        modelValue = modelValue || 800;
        county.value = zipcodeOptions.find(option => option.zipcode === modelValue)?.county || "";
        zipcode.value = modelValue;
    }, {
        immediate: true
    }
);

// 取得縣市選項
const countyOptions = computed<ZipcodeOption[]>(() => {
    const set = new Set();
    return zipcodeOptions.filter(option => set.has(option.county) ? false : set.add(option.county));
});

// 取得縣市下的城市選項
const cityOptions = computed<ZipcodeOption[]>(() => zipcodeOptions.filter(option => option.county === county.value));

// 監聽 縣市下的城市選項 更新
watch(
    () => cityOptions.value,
    (newVal: ZipcodeOption[]) => {
        if (newVal) { 
            zipcode.value = newVal[0].zipcode;
        }
    }, {
        immediate: true
    }
);

const emits = defineEmits<{ "update:model-value": [value: Props["modelValue"]] }>();

// 監聽 縣市下的城市選項 更新
watch<any, any>(
    () => zipcode.value,
    (newVal: ZipcodeOption["zipcode"]) => {
        if (newVal) { 
            emits("update:model-value", newVal);
        }
    }, {
        immediate: true
    }
);
</script>

<template>
    <div class="row gx-2 align-items-end">
        <section class="col d-grid gap-2">
            <label for="county" class="form-label" :class="{ 'text-white': route.name === 'register' }">{{ formSchema.addressSchema_zipcode.label }}</label>
            <Field v-model="county" id="county" name="county" class="form-select" :as="formSchema.addressSchema_zipcode.as" >
                <option v-for="option in countyOptions" :key="option.county" :value="option.county">{{ option.county }}</option>
            </Field>
        </section>
        <section class="col">
            <Field v-model="zipcode" :name="formSchema.addressSchema_zipcode.name" class="form-select" :as="formSchema.addressSchema_zipcode.as">
            <option v-for="option in cityOptions" :key="option.zipcode" :value="option.zipcode">{{ option.city }}</option>
            </Field>
        </section>
    </div>
</template>

<style lang="scss"></style>