import {M_SESSION_SET} from "@/store/mutations";
import {LS_TOKEN, LS_USERNAME} from "@/constants";

const state = () => {
   return {
      username: localStorage.getItem(LS_USERNAME),
   }
}

const getters = {
}

const mutations = {
   [M_SESSION_SET](state, {username, token}) {
      state.username = username
      localStorage.setItem(LS_TOKEN, token)
      localStorage.setItem(LS_USERNAME, username)
   }

}

const actions = {

}

export default {
   state,
   getters,
   actions,
   mutations
}
