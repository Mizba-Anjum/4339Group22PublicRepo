<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { userLoginState } from "@/store/userInfo";

export default {
  name: 'App',
  data() {
    return {
      // Changed orgName from Dataplatform to org name
      orgName: ''
    }
  },
  setup() {
    const user = userLoginState();
    return {user};
  },
  methods: {
    logout() {
      this.user.isLoggedIn = false;
      this.user.editor = false;
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      console.log(res);
      this.orgName = res.data.name
    })
  }
}
</script>

<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li v-if="!user.isLoggedIn">
              <router-link to="/userlogin">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >login</span
                >
                User Login
              </router-link>
            </li>
            <li v-if="user.isLoggedIn" v-on:click="logout()">
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >logout</span
                >
                Logout
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="user.editor && user.isLoggedIn">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="user.editor && user.isLoggedIn">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>

            <!-- Added Create Service page -->
            <li v-if="user.editor && user.isLoggedIn">
              <router-link to="/addservice">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >add_circle_outline</span
                >
                Add Service
              </router-link>
            </li>

            <li v-if="user.isLoggedIn">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="user.isLoggedIn">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>

            <!-- Installed Language Features to see code in color. List of Services for viewers -->
            <li v-if="user.isLoggedIn">
              <router-link to="/servicelist">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >format_list_bulleted</span
                >
                List of Services
              </router-link>
            </li>

          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
