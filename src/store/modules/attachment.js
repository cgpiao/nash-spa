import {ATTACHMENT_CREATE} from "@/store/actions";
import agent from "@/agent";

const state = () => {
   return {
   }
}

const getters = {
}

const mutations = {

}

const actions = {
   [ATTACHMENT_CREATE](context, data) {
      return agent.attachments.create(data)
   }
}

export default {
   state,
   getters,
   actions,
   mutations
}
