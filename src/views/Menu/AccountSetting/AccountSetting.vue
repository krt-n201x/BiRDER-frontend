<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[118px]">
      <FormWrapper label="Account Setting">
        <Form @submit="updateuser" :validation-schema="userinfo">
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <TextField
                name="fullName"
                label="Full Name"
                type="text"
                :message="user.fullName"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <AreaField
                name="address"
                label="Address"
                type="text"
                :message="user.address"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <TextField
                name="phoneNumber"
                label="Phone number"
                type="text"
                :message="user.phoneNumber"
                :disabled="edit"
                required
              />
            </div>
            <div>
              <TextField
                name="username"
                label="Username"
                type="text"
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
            <SecondaryButton @click="cancelChange">Cancel</SecondaryButton>
            <BaseButton type="submit">Save</BaseButton>
          </div>
          <div class="grid grid-cols-1 gap-2 mt-[22px]" v-if="!edit">
            <DeleteButton @click="DeleteAccount">Delete Account</DeleteButton>
          </div>
          <div v-if="isAdmin || isOwner">
            <div
              class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
              v-if="edit"
            >
              <BaseButton @click="editchange">Edit</BaseButton>
            </div>
          </div>
        </Form>
      </FormWrapper>
    </div>
    <div v-if="isAdmin || isOwner">
      <div class="grid justify-items-center mt-[16px] lg:mt-[24px]">
        <FormWrapper label="Change Password">
          <div
            class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
            v-if="!editpassword"
          >
            <BaseButton @click="showeditpassword" type="submit"
              >Edit</BaseButton
            >
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
              <SecondaryButton @click="showeditpassword"
                >Cancel</SecondaryButton
              >
              <BaseButton type="submit">Save</BaseButton>
            </div>
          </Form>
        </FormWrapper>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import store from '@/store/index.js'
import AppLayout from '@/layout/AppLayout.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import TextField from '@/components/textfield/BaseField.vue'
import AreaField from '@/components/textfield/AreaField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import DeleteButton from '@/components/button/DeleteButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import AuthService from '@/services/AuthService.js'
import DatabaseService from '@/services/DatabaseService.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
  name: 'AccountSetting',
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
      fullName: yup.string().required('fullname is required!'),
      address: yup.string().required('address is required!'),
      phoneNumber: yup
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
      user: store.getters.information,
      temp: store.getters.currentUser
    }
  },
  methods: {
    updateuser(userinfo) {
      DatabaseService.updateUser(this.user.id, userinfo)
        .then(() => {
          if (this.user.id == this.temp.id) {
            if (this.user.username != this.userinfo.username) {
              toast.success('Update Success! Please Login again')
              AuthService.logout()
              this.$router.push(`${ROUTE_PATH.LOGIN_PAGE}`)
            }
          } else {
            toast.success('Update Success!')
            this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
          }
        })
        .catch((error) => {
          toast.error('Update Falis!')
          console.log(error)
        })
    },
    updatepassword(passwordinfo) {
      DatabaseService.updateUserPassword(this.user.id, this.user, passwordinfo)
        .then(() => {
          toast.success('Update Success!')
          this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
        })
        .catch((error) => {
          toast.error('Update Falis!')
          console.log(error)
        })
    },
    showeditpassword() {
      this.editpassword = !this.editpassword
    },
    cancelChange() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    },
    editchange() {
      this.edit = !this.edit
    },
    DeleteAccount() {
      DatabaseService.deleteUser(this.user.id)
        .then(() => {
          this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
