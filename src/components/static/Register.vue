<template>
   <div class="w-full flex flex-col items-center">
      <div class="w-full">
      </div>
      <div class="flex flex-col w-full lg:w-96 px-4 lg:px-0">
         <div class="text-2xl font-semibold lg:font-normal lg:text-4xl mt-40 lg:mt-36">{{ $t("auth.Register") }}</div>
         <input v-model="form.models.username" :placeholder="$t('auth.placeholder.Username')" class="mt-4"/>
         <div class="mt-4 relative">
            <input  ref="password" type="password" v-model="form.models.password" :placeholder="$t('auth.placeholder.Password')"
                   class="w-full"/>
            <IconVisible v-if="passwordVisible" class="absolute right-0 cursor-pointer" @click="togglePasswordVisibility"/>
            <IconInvisible v-else class="absolute right-0 cursor-pointer" @click="togglePasswordVisibility"/>
         </div>

         <div class="mt-4 text-red-600 h-4 w-full flex justify-center">
            {{ form.message }}
         </div>
         <div class="mt-12 lg:mt-24">
            <a-button type="primary" block shape="round" html-type="submit" @click="register">{{
                  $t("action.Submit")
               }}
            </a-button>
         </div>
      </div>
   </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useI18n} from 'vue-i18n';
import agent from "@/agent";
import {M_SESSION_SET} from "@/store/mutations";
import IconVisible from '../../assets/images/ic_password_visible.svg';
import IconInvisible from '../../assets/images/ic_password_invisible.svg';
import {ACCOUNT_SHOW} from "@/store/actions";
// import agent from "@/agent";

export default {
   name: "Register",
   components: {IconVisible, IconInvisible},
   setup() {
      const {t} = useI18n()
      const formRef = ref()
      const passwordVisible = ref(false)
      const form = reactive({
         message: '',
         models: {
            username: null,
            password: null
         },
         rules: {
            username: [
               {required: true, message: t('auth.message.msg01'), trigger: 'submit'},
               {min: 5, message: t('auth.message.msg02'), trigger: 'submit'},
            ],
            password: [
               {required: true, message: t('auth.message.msg11'), trigger: 'submit'},
               {min: 6, message: t('auth.message.msg12'), trigger: 'submit'},
            ],
         }
      })
      return {
         formRef,
         passwordVisible,
         labelCol: {span: 4},
         wrapperCol: {span: 20},
         form
      }
   },
   methods: {
      togglePasswordVisibility() {
         this.passwordVisible = !this.passwordVisible;
         if (this.passwordVisible) {
            this.$refs.password.type = 'text';
         } else {
            this.$refs.password.type = 'password';
         }
      },
      register() {
         if (this.form.models.username === null || this.form.models.username === '') {
            this.form.message = this.$t('auth.message.msg01')
            return
         }
         if (this.form.models.password === null || this.form.models.password === '') {
            this.form.message = this.$t('auth.message.msg11')
            return
         }
         if (this.form.models.username.length < 5) {
            this.form.message = this.$t('auth.message.msg02')
            return
         }
         if (this.form.models.password.length < 5) {
            this.form.message = this.$t('auth.message.msg12')
            return
         }
         this.form.message = ''
         let params = {
            username: this.form.models.username,
            password: this.form.models.password,
         }
         agent.accounts.create(params).then(resp => {
            let data = {username: this.form.models.username, token: resp.data}
            this.$store.commit(M_SESSION_SET, data)
            this.$router.replace({name: 'explorer'})
            this.$store.dispatch(ACCOUNT_SHOW)
         }).catch(error => {
            this.form.message = error.response.data.message
         })
      }
   }
}
</script>

<style scoped lang="less">
input {
   outline: 0;
   border-width: 0 0 1px;
   border-color: #D7D8DA;
   padding: 0.5rem;
}
svg {
   width: 40px;
   height: 40px;
   fill: #fff;
}
</style>
