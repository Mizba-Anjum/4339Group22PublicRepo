<!-- Referred from eventDetails.vue -->
<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { userLoginState } from "@/store/userInfo";
export default {
  setup() {
    const user = userLoginState();
    return {user};
  },
  data() {
    return {
      events: [],
      services: [],
      searchBy: "",
      service: {
        title: '',
        status: ''
      }
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Service Title') {
        endpoint = `services/search/?title=${this.service.title}&searchBy=title`
      }
      else if (this.searchBy === 'Service Status') {
        endpoint = `services/search/?status=${this.service.status}&searchBy=status`;
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.services = res.data
      })
    },
    // abstracted method to get services
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
      })
      window.scrollTo(0, 0)
    },
    // Resets fields
    clearSearch() {
      this.searchBy = ''
      this.service.title = '',
      this.service.status = 'Active'
      this.getServices()
    },
    editService(serviceID) {
      if (this.user.editor) {
        this.$router.push({ name: 'updateservice', params: { id: serviceID } })
      }
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
    </div>

    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By</h2>
        <!-- Display Services search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Title" selected>Service Title</option>
            <option value="Service Status">Service Status</option>
          </select>
        </div>
        <!-- Displays service title search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Title'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="service.title"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service title"
            />
          </label>
        </div>
        <!-- Displays service status search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Status'">
          <select
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="service.status"
            >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Service
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Title</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service._id)"
              v-for="service in services"
              :key="service._id"
              class="cursor-pointer"
            >
              <td class="p-2 text-left">{{ service.title }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>