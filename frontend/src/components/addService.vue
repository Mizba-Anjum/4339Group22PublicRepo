<!-- Referred from intakeForm.vue and eventForm.vue -->
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios';
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  setup() {
    return {v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      services: [],
      service: {
        title: '',
        status: 'Active'
      },
    }
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found in validation, proceed with form submission
      if (isFormCorrect) {
        axios
        .post(`${apiURL}/services`, this.service)
        .then(() => {
          alert('Service has been added.')
          this.$router.push({ name: 'servicelist' })
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>
<!-- form to create a new service -->
<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Create New Service
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
          <!-- form field to fill out required service title -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Title</span>
              <span style="color: #ff0000">*</span>
              <input
                v-model="service.title"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <!-- form field to select the service status -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Status</span>
              <select v-model="service.status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="Active" selected>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
        </div>
        <div></div>
        <!-- submit button -->
        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Add New Service
          </button>
        </div>
      </form>
    </div>
  </main>
</template>