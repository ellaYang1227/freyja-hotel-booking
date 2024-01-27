<script setup lang="ts">
import { useRoute } from "vue-router";
import { Field } from "vee-validate";
import { computed, ref, watch } from "vue";
import { formSchema } from "@/data/FormSchema";
import { UserInfoBasic } from "@/interfaces/User";
import { dateTransform } from "@/handle-formats/HandleDate";

const route = useRoute();

interface Props {
    modelValue: UserInfoBasic["birthday"]
}
const props = defineProps<Props>();
const today = new Date();
const thisYear = today.getFullYear();
const year = ref<number | null>(null);
const month = ref<number | null>(null);
const day = ref<number | null>(null);

// 監聽 modelValue 更新 重設 year、month、day
watch(
  () => props.modelValue,
  (newVal: UserInfoBasic["birthday"]) => {
    newVal = newVal ? dateTransform(newVal) : "1990/8/15";
    newVal.split("/").forEach((item:string, index:number) => {
        switch(index) {
            case 0: 
            year.value = +item;
            break;
            case 1: 
            month.value = +item;
            break;
            case 2: 
            day.value = +item;
            break;
        }
    });
  }, {
    immediate: true
  }
);

// 取得年選項(18 歲 ~ 100 歲)
const yearOptions = ref<number[]>([]);
(():void => {
    const minYear = thisYear - 100;
    const maxYear = thisYear - 18;
    for(let i = minYear; i <= maxYear; i++) {
        yearOptions.value.push(i);
    }
})();

// 取得日選項
const dayOptions = computed<number[]>(() => {
    // 創建一個當前年月的 Date 對象，設定為當前月份的最後一天
    const currentLastDay = new Date(year.value as number, month.value as number, 0);
    const maxDay = currentLastDay.getDate();
    const options: number[] = [];
    for(let i = 1; i <= maxDay; i++) {
        options.push(i);
    }

    return options;
});

// 重設已選擇 月份、日期
function resetSelected(select: "year" | "month") :void {
    if (select === "year") { month.value = 1 }
    day.value = 1;
}

// 發送 model-value 值至父元件
const emits = defineEmits<{ "update:model-value": [value: Props["modelValue"]] }>();
watch(
    () => [year.value, month.value, day.value],
    () => {
        emits("update:model-value", `${year.value}/${month.value}/${day.value}`);
    }, {
        immediate: true
    }
);
</script>

<template>
    <div class="row gx-2 align-items-end">
        <section class="col d-grid gap-2">
            <label :for="formSchema.birthdaySchema_year.name" class="form-label" :class="{ 'text-white': route.name === 'register' }">{{ formSchema.birthdaySchema_year.label }}</label>
            <Field v-model="year" :id="formSchema.birthdaySchema_year.name" :name="formSchema.birthdaySchema_year.name" class="form-select" :as="formSchema.birthdaySchema_year.as" @change="resetSelected('year')">
                <option v-for="option in yearOptions" :key="option" :value="option">{{ option }} 年</option>
            </Field>
        </section>
        <section class="col">
            <Field v-model="month" :name="formSchema.birthdaySchema_month.name" class="form-select" :as="formSchema.birthdaySchema_month.as" @change="resetSelected('month')"
            >
                <option v-for="option in 12" :key="option" :value="option">{{ option }} 月</option>
            </Field>
        </section>
        <section class="col">
            <Field v-model="day" :name="formSchema.birthdaySchema_day.name" class="form-select" :as="formSchema.birthdaySchema_day.as"
            >
                <option v-for="option in dayOptions" :key="option" :value="option">{{ option }} 日</option>
            </Field>
        </section>
    </div>
</template>

<style lang="scss"></style>