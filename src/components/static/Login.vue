<template>
   <div class="w-full flex flex-col items-center">
      <div class="w-full">
      </div>
      <div class="flex flex-col w-full lg:w-96 px-4 lg:px-0">
         <div class="text-2xl font-semibold lg:font-normal lg:text-4xl mt-40 lg:mt-36">{{ $t("auth.Login") }}</div>
         <input v-model="form.models.username" :placeholder="$t('auth.placeholder.Username')" class="mt-4"/>
         <input type="password" v-model="form.models.password" :placeholder="$t('auth.placeholder.Password')"
                class="mt-4"/>
         <div class="mt-4 text-red-600 h-4 w-full flex justify-center">
            {{ form.message }}
         </div>
         <div class="mt-12 lg:mt-24">
            <a-button type="primary" block shape="round" html-type="submit" @click="login">{{
                  $t("action.Submit")
               }}
            </a-button>
         </div>
      </div>
   </div>
</template>

<script>
import {reactive, ref} from "vue";
import agent from "@/agent";
import {M_SESSION_SET} from "@/store/mutations";

export default {
   name: "Home",
   setup() {
      const formRef = ref()
      const form = reactive({
         message: '',
         models: {
            username: '',
            password: ''
         },
      })
      return {
         formRef,
         labelCol: {span: 4},
         wrapperCol: {span: 14},
         form
      }
   },
   methods: {
      login() {
         this.form.message = ''
         let params = {
            username: this.form.models.username,
            password: this.form.models.password,
         }
         agent.auth.login(params).then(resp => {
            this.$store.commit(M_SESSION_SET, {username: this.form.models.username, token: resp.data})
            this.$router.replace({name: 'explorer'})
         }).catch(error => {
            this.form.message = error.response.data.message
         })
      }
   }
}
</script>

<style scoped>
input {
   outline: 0;
   border-width: 0 0 1px;
   border-color: #D7D8DA;
   padding: 0.5rem;
}
</style>
