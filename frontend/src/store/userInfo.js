import { defineStore } from 'pinia'

//store for user login
export const userLoginState = defineStore({
  id: 'userLoginState',
  //store logged in state
  state: () => {
    if (localStorage.getItem("isLoggedIn") && localStorage.getItem("editor")) {
      return {
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
        editor: JSON.parse(localStorage.getItem("editor")),
      }
    }
    else {
    return {
      isLoggedIn: false,
      editor: false, //if false, user = viewer
    }}
  }
});