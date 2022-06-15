<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Account Setting">
        <Form @submit="updateuser" :validation-schema="userinfo">
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <TextField
                class="invisible absolute"
                name="status"
                label="Full Name"
                type="text"
                :message="isadmin"
                :disabled="edit"
                required
              />
            </div>
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

const NetworkError = (
  <div>
    <h1>Login Failed!</h1>
    <span>The system cannot connect to database</span>
  </div>
)
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
      status: yup.string(),
      fullName: yup
        .string()
        .when('status', {
          is: 'true',
          then: yup.string().nullable(true)
        })
        .when('status', {
          is: 'false',
          then: yup
            .string()
            .min(4, 'The length shall be between 4-50')
            .max(50, 'The length shall be between 4-50')
            .required('Fullname is required!')
            .nullable(true)
        }),
      address: yup
        .string()
        .when('status', {
          is: 'true',
          then: yup.string().nullable(true)
        })
        .when('status', {
          is: 'false',
          then: yup
            .string()
            .min(2, 'The length shall be between 2-255')
            .max(255, 'The length shall be between 2-255')
            .required('Address is required!')
            .nullable(true)
        }),
      phoneNumber: yup
        .string()
        .when('status', {
          is: 'true',
          then: yup.string().nullable(true)
        })
        .when('status', {
          is: 'false',
          then: yup
            .string()
            .required('phone number is required!')
            .matches(/^[0-9+-]+$/, 'please use number')
            .max(12, 'The length shall be less than 12')
            .nullable(true)
        }),
      username: yup.string().when('status', {
        is: 'false',
        then: yup
          .string()
          .min(2, 'The length shall be between 2-10')
          .max(10, 'The length shall be between 2-10')
          .required('The Username is required!')
          .nullable(true)
      }),
      email: yup
        .string()
        .when('status', {
          is: 'true',
          then: yup.string().nullable(true)
        })
        .when('status', {
          is: 'false',
          then: yup
            .string()
            .email('please use as e-mail form')
            .required('The Email is required!')
            .nullable(true)
        })
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
      isadmin: AuthService.hasRoles('ROLE_ADMIN'),
      user: store.getters.information,
      temp: store.getters.currentUser
    }
  },
  methods: {
    updateuser(userinfo) {
      DatabaseService.updateUser(this.user.id, userinfo)
        .then(() => {
          if (this.user.id == this.temp.id) {
            if (this.user.username != userinfo.username) {
              console.log(this.user.username + userinfo.username)
              toast.success('Update Success! Please Login again')
              AuthService.logout()
              this.$router.push(`${ROUTE_PATH.LOGIN_PAGE}`)
            } else {
              toast.success('Update Success!')
              this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
            }
          } else {
            toast.success('Update Success!')
            this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
          }
        })
        .catch((error) => {
          toast.error(error)
          console.log(error)
        })
    },
    updatepassword(passwordinfo) {
      DatabaseService.updateUserPassword(this.user.id, this.user, passwordinfo)
        .then(() => {
          if (this.user.id == this.temp.id) {
            toast.success('Update Password Success! Please Login again')
            AuthService.logout()
            this.$router.push(`${ROUTE_PATH.LOGIN_PAGE}`)
          } else {
            toast.success('Update Success!')
            this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
          }
        })
        .catch((error) => {
          if (error.message == 'Network Error') {
            toast.error(NetworkError)
          }
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
      this.$swal({
        icon: 'warning',
        title: 'Deleted User!',
        text: 'Are you sure to deleted this user?',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('deleted')
          DatabaseService.deleteUser(this.user.id)
            .then(() => {
              if (this.user.id == this.temp.id) {
                toast.success('Delete Success! Please Login again')
                AuthService.logout()
                this.$router.push(`${ROUTE_PATH.LOGIN_PAGE}`)
              } else {
                toast.success('Delete Success!')
                this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
              }
            })
            .catch((error) => {
              toast.error('Deleted Falis!')
              console.log(error)
            })
        }
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
