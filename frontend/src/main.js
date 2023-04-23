import { createApp, markRaw, watch } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

//pinia state management library
import { createPinia } from 'pinia'
const pinia = createPinia();
// allow pinia to use router
pinia.use(({ store }) => {
    store.$router = markRaw(router)
  });
//watch pinia and update localstore
watch(
  pinia.state,
  (state) => {
    localStorage.setItem("isLoggedIn", JSON.stringify(state.userLoginState.isLoggedIn));
    localStorage.setItem("editor", JSON.stringify(state.userLoginState.editor));
  },
  { deep: true }
  );

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
