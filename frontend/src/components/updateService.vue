<!-- Referred from updateClient.vue and updateEvent.vue -->
<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  props: ['id'],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      events: [],
      services: [],
      service: {
        title: '',
        status: {
          oneOf: ['Active', 'Inactive']
        }
      }
    }
  },
// Added created() based on eventDetails.vue to call events that the services are associated with
  created() {
    axios.get(`${apiURL}/services/id/${this.$route.params.id}`).then((res) => {
      this.service = res.data
      this.service.title.forEach((e) => {
        axios.get(`${apiURL}/events/id/${e}`).then((res) => {
          this.events.push(res.data)
        })
      })
    })
  },
// Edited methods for service update
  methods: {
    handleServiceUpdate() {
      axios.put(`${apiURL}/services/update/${this.$route.params.id}`, this.service).then(() => {
        alert('Update has been saved.')
        this.$router.back()
      })
    },
    serviceDelete() {
      axios.delete(`${apiURL}/services/${this.$route.params.id}`).then(() => {
        alert('Service has been deleted.')
        this.$router.push({ name: 'servicelist' })
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      services: [],
      service: {
        title: { required },
	      service: { required }
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
        Update Service <!-- copied pasted from addService.vue -->
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit service from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service</h2>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Title</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.title"
              />
              <span class="text-black" v-if="v$.service.title.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.title.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Status</span>
              <select v-model="service.status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
        </div>

        <!-- grid container from updateClient.vue -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleServiceUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="serviceDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>

      </form>
    </div>
  </main>
</template>
