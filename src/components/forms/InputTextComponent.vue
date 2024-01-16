<script setup lang="ts">
import { useField } from 'vee-validate';
import { formSchema } from "@/data/FormSchema";

interface InputTextProps {
  name: string,
  schema: string,
}

const props = defineProps<InputTextProps>();

const { value, errorMessage } = useField(() => props.name);
console.log(props.name)
</script>

<template>
  errorMessage {{ errorMessage }}
  <input v-model="value" />
  <!-- <input v-model.trim="value" :id="formSchema[schema].name" :name="formSchema[schema].name" class="form-control" :placeholder="formSchema[schema].placeholder" :as="formSchema[schema].as" :type="formSchema[schema].type" :class="{ 'is-invalid': errorMessage }"
  /> -->
  <span class="invalid-feedback">{{ errorMessage }}</span>
</template>

<style lang="scss"></style>