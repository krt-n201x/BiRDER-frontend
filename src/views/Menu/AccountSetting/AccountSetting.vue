<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[118px]">
      <FormWrapper label="Account Setting">
        <Form @submit="updateuser" :validation-schema="userinfo">
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <TextField
                name="fullname"
                label="Full Name"
                type="text"
                placeholder="Plese enter your full name"
                :message="user.fullname"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <AreaField
                name="address"
                label="Address"
                type="text"
                placeholder="Plese enter your address"
                :message="user.address"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <TextField
                name="phone"
                label="Phone number"
                type="text"
                placeholder="Plese enter phone number"
                :message="user.phone"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <TextField
                name="username"
                label="Username"
                type="text"
                placeholder="Plese enter username"
                :message="user.username"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <TextField
                name="email"
                label="E-mail"
                type="text"
                placeholder="Plese enter email"
                :message="user.email"
                :disabled="edit"
                required
              />
            </div>
          </div>
          <div
            class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]"
            v-if="!edit"
          >
            <SecondaryButton @click="editchange">Cancel</SecondaryButton>
            <BaseButton type="submit">Save</BaseButton>
          </div>
          <div class="grid grid-cols-1 gap-2 mt-[22px]" v-if="!edit">
            <DeleteButton @click="DeleteAccount">Delete Account</DeleteButton>
          </div>
          <div
            class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
            v-if="edit"
          >
            <BaseButton @click="editchange">Edit</BaseButton>
          </div>
        </Form>
      </FormWrapper>
    </div>
    <div class="grid justify-items-center mt-[16px] lg:mt-[24px]">
      <FormWrapper label="Change Password">
        <div
          class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
          v-if="!editpassword"
        >
          <BaseButton @click="showeditpassword" type="submit">Edit</BaseButton>
        </div>
        <Form
          @submit="updatepassword"
          :validation-schema="passwordinfo"
          v-if="editpassword"
        >
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <TextField
                name="oldpassword"
                label="Old password"
                type="password"
                placeholder="Plese enter your old-password"
                required
              />
            </div>
            <div>
              <TextField
                name="newpassword"
                label="New password"
                type="password"
                placeholder="Plese enter your new-password"
                required
              />
            </div>
            <div>
              <TextField
                name="confirmnewpassword"
                label="Confirm new password"
                type="password"
                placeholder="Plese confirm your new-password"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]">
            <SecondaryButton @click="showeditpassword">Cancel</SecondaryButton>
            <BaseButton type="submit">Save</BaseButton>
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
import DeleteButton from '@/components/button/DeleteButton.vue'
import ROUTE_PATH from '@/constants/router.js'
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
    DeleteButton,
    Form
  },
  data() {
    const userinfo = yup.object().shape({
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
        .required('Email is required!')
    })
    const passwordinfo = yup.object().shape({
      oldpassword: yup.string().required('old-password is required!'),
      newpassword: yup.string().required('new-password is required!'),
      confirmnewpassword: yup
        .string()
        .required('please confirm your new-password')
        .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
    })
    return {
      edit: true,
      editpassword: false,
      ROUTE_PATH,
      userinfo,
      passwordinfo,
      user: {
        fullname: 'test',
        address: 'test',
        phone: '1234567890',
        username: 'test',
        email: 'test@test.com'
      }
    }
  },
  created() {
    // InspectorService.getInspectorFromGraphQL(1)
    //   .then((response) => {
    //     this.inspector = response.data.data.getInspectorById
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  },
  methods: {
    updateuser(userinfo) {
      console.log(userinfo)
    },
    updatepassword(passwordinfo) {
      console.log(passwordinfo)
    },
    showeditpassword() {
      this.editpassword = !this.editpassword
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.EMPLOYEE_MANAGEMENT}`)
    },
    editchange() {
      this.edit = !this.edit
    }
  }
}
</script>
