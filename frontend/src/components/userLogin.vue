<script>
import useVuelidate from '@vuelidate/core'
import { required, alpha} from '@vuelidate/validators'
import { userLoginState } from "@/store/userInfo";
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: false
    }
  },
  setup() {
    const user = userLoginState();
    return {v$: useVuelidate({ $autoDirty: true }), user};
  },
  methods:{
    async login() {
      this.v$.$validate().then((valid) => {
        if (valid) {
          axios.get(`${apiURL}/user/${this.username}/${this.password}`).then((res) => {
            if (res.data) {
              this.user.isLoggedIn = true; //logged in
              if (res.data == "editor") {
                this.user.editor = true; //editor role
              }
              else {
                this.user.editor = false; //viewer role
              };
              this.$router.push("/"); //redirect
            }
            else {
              this.loginError = true;
            }
          })
        }
        else {
          this.loginError = true;
        }
      })
    }
  },
  validations() {
    return {
      username: { required, alpha },
      password: { required, alpha },
    }
  }
}
</script>
<template>
  <header>
    <!-- user login header -->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
            User Login
    </h1>
  </header>
    <main class="w-100">
      <!-- main content div -->
        <div class="px-10 py-20" style="width:50%; margin-left: 25%;">
          <form @submit.prevent="login">
          <!-- input 1 -->
          <label class="block">
              <span class="text-gray-700">Username</span>
              <span style="color: #ff0000">*</span>
            <input
                type="text"
                class="mb-6 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="username"
              />
          </label>
          <!-- input 2 -->
          <label class="block">
              <span class="text-gray-700">Password</span>
              <span style="color: #ff0000">*</span>
            <input
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="password"
              />
          </label>
          <!--login error message-->
          <div v-if="loginError" style="color: #ff0000">Incorrect Login.</div>
          <!-- submit button -->
          <div class="mt-10">
            <button class="bg-red-700 text-white rounded" type="submit">
              Login
            </button>
          </div>
        </form>
        </div>
    </main>
</template>