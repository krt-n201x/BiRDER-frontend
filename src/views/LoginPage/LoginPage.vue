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
                name="username"
                label="Username"
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
import AuthService from '@/services/AuthService.js'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Login Failed!</h1>
    <span>The system cannot connect to database</span>
  </div>
)
const Userinvalid = (
  <div>
    <h1>Login Failed!</h1>
    <span>The username or the password is not correct</span>
  </div>
)
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
      username: yup
        .string()
        .min(2, 'The length shall be between 2-10')
        .max(10, 'The length shall be between 2-10')
        .required('The username is required'),
      password: yup
        .string()
        .matches(
          /^[aA-zZ0-9]+$/,
          'The password must be numerical, symbol or alphabet a-z or A-Z'
        )
        .min(4, 'The length shall be between 2-14')
        .max(15, 'The length shall be between 2-15')
        .required('The password is required')
    })
    return {
      ROUTE_PATH,
      message: '',
      schema
    }
  },
  methods: {
    login(logininfo) {
      AuthService.login(logininfo)
        .then(() => {
          toast.success('Login Success!')
          this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
        })
        .catch((error) => {
          if (error.message == 'Network Error') {
            toast.error(NetworkError)
          }
          if (error.response.status == '401') {
            toast.error(Userinvalid)
          }
          console.log(error)
        })
    },
    register() {
      this.$router.push(`${ROUTE_PATH.REGISTER_PAGE}`)
    }
  }
}
</script>
