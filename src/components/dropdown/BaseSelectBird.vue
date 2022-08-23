<template>
  <div>
    <label v-if="label" class="text-[10px] text-neutral-600">{{ label }}</label>
    <select
      :class="[
        errors && touched
          ? '!border-error-500 bg-error-100 text-error-400 placeholder-error-400 focus:ring-2 focus:ring-error-200'
          : '!border-neutral-500 text-black  placeholder-neutral-500 focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200'
      ]"
      class="outline-none w-full rounded-lg border-[1px] px-4 text-sm font-normal leading-[17px] focus:text-black focus:placeholder-transparent disabled:!border-neutral-100 disabled:bg-neutral-100 disabled:placeholder-neutral-500 h-[33px]"
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value)
        }
      }"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :value="option.id"
        :key="option.id"
        :selected="option.id === modelValue.id"
      >
        {{ option.birdCode }} {{ option.birdName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelectBird',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number, Object],
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: false
    }
  }
}
</script>
