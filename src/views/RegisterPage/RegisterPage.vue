<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[118px]">
      <div>
        <img
          src="../../assets/logoBiRDER.png"
          class="max-h-[106px] lg:max-h-[331px] mb-4"
        />
      </div>

      <FormWrapper label="Register">
        <Form @submit="register" :validation-schema="schema">
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <TextField
                name="fullname"
                label="Full Name"
                type="text"
                placeholder="Plese enter your full name"
                required
              />
            </div>
            <div>
              <AreaField
                name="address"
                label="Address"
                type="text"
                placeholder="Plese enter your address"
                required
              />
            </div>
            <div>
              <TextField
                name="phone"
                label="Phone number"
                type="text"
                placeholder="Plese enter phone number"
                required
              />
            </div>
            <div>
              <TextField
                name="username"
                label="Username"
                type="text"
                placeholder="Plese enter username"
                required
              />
            </div>
            <div>
              <TextField
                name="email"
                label="E-mail"
                type="text"
                placeholder="Plese enter email"
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
            <div>
              <TextField
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                placeholder="Plese enter your password"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]">
            <SecondaryButton @click="cancel">Cancel</SecondaryButton>
            <BaseButton type="submit" @click="register">Register</BaseButton>
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
import AreaField from '@/components/textfield/AreaField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import AuthService from '@/services/AuthService.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'RegisterPage',
  components: {
    AppLayout,
    FormWrapper,
    TextField,
    AreaField,
    BaseButton,
    SecondaryButton,
    Form
  },
  data() {
    const schema = yup.object().shape({
      fullname: yup.string().required('fullname is required!'),
      address: yup.string().required('address is required!'),
      phone: yup
        .string()
        .required('phone number is required!')
        .matches(/^[0-9]+$/, 'please use number')
        .min(10, 'phone number should have 10 digit')
        .max(10, 'phone number should have 10 digit'),
      username: yup.string().required('username is required!'),
      email: yup
        .string()
        .email('please use as e-mail form')
        .required('Email is required!'),
      password: yup.string().required('password is required!'),
      confirmpassword: yup
        .string()
        .required('please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    })
    return {
      ROUTE_PATH,
      schema
    }
  },
  methods: {
    register(registerinfo) {
      AuthService.registeruser(registerinfo)
        .then(() => {
          this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
        })
        .catch(() => {
          console.log('could not register')
        })
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    }
  }
}
</script>
