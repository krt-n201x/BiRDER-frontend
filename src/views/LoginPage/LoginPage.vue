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
const loginfail = (
  <div>
    <h1>Login Failed!</h1>
    <span>Your email or password may incorrect</span>
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
      username: yup.string().required('Username is required!'),
      password: yup.string().required('Password is required!')
    })
    return {
      ROUTE_PATH,
      message: '',
      schema
    }
  },
  methods: {
    login(logininfo) {
      console.log(logininfo)
      AuthService.login(logininfo)
        .then(() => {
          toast.success('Login Success!')
          this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
        })
        .catch(() => {
          toast.error(loginfail)
          console.log('could not login')
        })
    },
    register() {
      this.$router.push(`${ROUTE_PATH.REGISTER_PAGE}`)
    }
  }
}
</script>
