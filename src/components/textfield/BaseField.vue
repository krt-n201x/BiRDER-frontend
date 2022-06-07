<template>
  <div class="mt-4">
    <p class="text-[10px] text-neutral-600">{{ label }}</p>
    <Field
      :name="name"
      :value="message"
      class="outline-none h-[33px] w-full rounded-lg border-[1px] px-4 text-sm font-normal leading-[17px] focus:text-black focus:placeholder-transparent disabled:!border-neutral-100 disabled:bg-neutral-100 disabled:!placeholder-neutral-500"
      :class="[
        errors && touched
          ? '!border-error-500 bg-error-100 text-error-400 placeholder-error-400 focus:ring-2 focus:ring-error-200'
          : '!border-neutral-500 text-black  placeholder-neutral-500 focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200'
      ]"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <ErrorMessage
      :name="name"
      class="bg-error-300 px-4 mt-1 text-white rounded-md flex justify-self-start text-sm font-normal leading-[17px]"
    />
  </div>
</template>
<script>
import { Field, ErrorMessage } from 'vee-validate'

export default {
  name: 'BaseField',
  components: { Field, ErrorMessage },
  props: {
    name: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'text',
      validator: (prop) => ['text', 'search', 'password', 'file'].includes(prop)
    }
  }
}
</script>
