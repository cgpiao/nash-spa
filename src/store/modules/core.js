import {M_ACCOUNT_SET, M_PLAN_UPDATE, M_SESSION_SET} from "@/store/mutations";
import {LS_TOKEN, LS_USERNAME} from "@/constants";
import {ACCOUNT_SHOW} from "@/store/actions";
import agent from "@/agent";
import commonUtil from "@/utils/commonUtil";
import * as moment from "moment";

const state = () => {
   return {
      account: null,
      username: localStorage.getItem(LS_USERNAME),
   }
}

const getters = {
   totalCapacity: state => {
      if (!state.account || !state.account.plan) {
         return 1
      }
      return 1 + state.account.plan.storage
   },
   totalCapcityString: (state, getters) => {
      if (!state.account) {
         return 0
      }
      let gb = 1024 * 1024 * 1024
      return commonUtil.humanFileSize(getters.totalCapacity * gb)
   },
   currentAmount: state => {
      if (!state.account) {
         return 0
      }
      return state.account.file_amount
   },
   currentAmountString: (state, getters) => {
      if (!state.account) {
         return 0
      }
      // let gb = 1024 * 1024 * 1024
      return commonUtil.humanFileSize(getters.currentAmount)
   },
}

const mutations = {
   [M_ACCOUNT_SET](state, account) {
      state.account = account
   },
   [M_PLAN_UPDATE](state, {storage, months}) {
      if (state.account.plan) {
         const plan = {
            storage,
            stop_seconds: Math.floor(moment.unix(state.account.plan.stop_seconds).add(months, 'months').unix())
         }
         state.account = Object.assign({}, state.account, {plan})
      } else {
         state.account.plan = {
            storage,
            stop_seconds: moment().add(months, 'months').unix()
         }
      }

   },
   [M_SESSION_SET](state, {username, token}) {
      state.username = username
      localStorage.setItem(LS_TOKEN, token)
      localStorage.setItem(LS_USERNAME, username)
   }

}

const actions = {
   [ACCOUNT_SHOW]({commit}) {
      return new Promise(resolve => {
         agent.accounts.show().then(resp => {
            commit(M_ACCOUNT_SET, resp.data)
            resolve(resp.data)
         })
      })

   }
}

export default {
   state,
   getters,
   actions,
   mutations
}
