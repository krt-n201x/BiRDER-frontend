<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[118px]">
      <div>
        <img
          src="../../assets/logoBiRDER.png"
          class="max-h-[106px] lg:max-h-[331px] mb-4"
        />
      </div>

      <FormWrapper label="Login">
        <Form @submit="login" :validation-schema="schema">
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <TextField
                name="email"
                label="E-mail"
                type="text"
                placeholder="Plese enter your e-mail"
                required
              />
            </div>
            <div>
              <TextField
                name="password"
                label="Password"
                type="password"
                placeholder="Plese enter your password"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]">
            <SecondaryButton @click="register">Register</SecondaryButton>
            <BaseButton type="submit" @click="showMessage">Login</BaseButton>
          </div>
        </Form>
      </FormWrapper>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import TextField from '@/components/textfield/BaseField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'LoginPage',
  components: {
    AppLayout,
    FormWrapper,
    TextField,
    BaseButton,
    SecondaryButton,
    Form
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required('Email is required!'),
      password: yup.string().required('Password is required!')
    })
    return {
      ROUTE_PATH,
      schema
    }
  },
  methods: {
    login(logininfo) {
      return console.log(logininfo)
    },
    register() {
      this.$router.push(`${ROUTE_PATH.REGISTER_PAGE}`)
    }
  }
}
</script>
