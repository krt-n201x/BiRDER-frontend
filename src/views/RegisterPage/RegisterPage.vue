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
                placeholder="ex: 0801234566, +6601234566, 080-1234566"
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
            <BaseButton type="submit">Register</BaseButton>
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
import { useToast } from 'vue-toastification'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Login Failed!</h1>
    <span>The system cannot connect to database</span>
  </div>
)
const status500 = (
  <div>
    <h1>Login Failed!</h1>
    <span>The username is already used</span>
  </div>
)
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
      fullname: yup
        .string()
        .min(4, 'The length shall be between 4-50')
        .max(50, 'The length shall be between 4-50')
        .required('Fullname is required!'),
      address: yup
        .string()
        .min(2, 'The length shall be between 2-255')
        .max(255, 'The length shall be between 2-255')
        .required('Address is required!'),
      phone: yup
        .string()
        .required('phone number is required!')
        .matches(/^[0-9+-]+$/, 'please use number')
        .max(12, 'The length shall be less than 12'),
      username: yup
        .string()
        .min(2, 'The length shall be between 2-10')
        .max(10, 'The length shall be between 2-10')
        .required('The Username is required!'),
      email: yup
        .string()
        .email('please use as e-mail form')
        .required('The Email is required!'),
      password: yup.string().required('The Password is required!'),
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
          toast.success('Register Success!')
          this.$router.push(`${ROUTE_PATH.LOGIN_PAGE}`)
        })
        .catch((error) => {
          if (error.message == 'Network Error') {
            toast.error(NetworkError)
          }
          if (error.response.status == '500') {
            toast.error(status500)
          }
          console.log(error)
        })
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    }
  }
}
</script>
