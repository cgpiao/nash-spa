<template>
   <header class="py-4 px-12">
      <div class="flex">
         <div style="flex: 1">
            <router-link to="/">
               <img src="../../assets/images/ic_logo.png" height="36"/>
            </router-link>
         </div>
         <div class="flex" style="flex: 5">
            <div class="flex-1">

            </div>
            <div class="flex items-center" v-if="$store.state.core.username">
               <router-link class="text-xl"  :to="{name: 'explorer'}">Explorer</router-link>
               <router-link class="text-xl ml-4"  :to="{name: 'upload'}">Upload</router-link>
               <a-button type="danger" class="ml-4" @click="()=>confirm($t('auth.message.msg31'), logout)">{{
                     $t("auth.Logout")
                  }}
               </a-button>
            </div>
            <div class="flex items-center" v-else>
               <router-link class="text-gray-800"  :to="{name: 'explorer'}">Docs</router-link>
               <a-button type="primary" class="ml-10" :ghost="true" shape="round" @click="()=>$router.push('/login')">{{
                     $t("auth.Login")
                  }}
               </a-button>
               <a-button type="primary" class="ml-4" shape="round" @click="()=>$router.push('/signup')">{{
                     $t("auth.Register")
                  }}
               </a-button>
            </div>

         </div>
      </div>

      <div>

      </div>
   </header>
</template>

<script>
import agent from "@/agent";
import {AppMixin} from "@/mixins";

export default {
   name: "TheSiteHeader",
   mixins: [AppMixin],
   data: function () {
      return {
      }
   },
   mounted() {
   },
   methods: {
      logout() {
         agent.auth.logout().then(() => {
            localStorage.clear()
            window.location = '/login'
         })
      }
   }
}
</script>

<style scoped>

</style>
