<template>
    <input :type="type" class="base-input" :placeholder="placeholder" v-model="model" @input="onInput" />
</template>

<script setup lang="ts">

const model = defineModel<string>('value')
defineProps<{
    type: string
    placeholder: string
    onInput: (event: Event) => void
}>()
</script>

<style scoped>
.base-input {
    width: 100%;
    padding: 16px 24px;
    border-radius: var(--border-radius);
    border: 1px solid var(--input-border-color);
}
</style>