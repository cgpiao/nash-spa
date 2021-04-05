<template>
   <header class=" header lg:px-12 lg:py-4 px-3 py-2">
      <div class="flex items-center">
         <div class="logo flex-shrink">
            <router-link to="/">
               <img src="../../assets/images/logo.png"/>
            </router-link>
         </div>
         <div class="hidden lg:flex" style="flex: 5">
            <div class="flex-1 flex items-center">
               <div class="flex flex-col w-48 ml-8">
                  <a-progress :percent="storagePercent" :show-info="false" />
                  <div>
                     {{$store.getters.currentAmountString}} of {{$store.getters.totalCapacity}} GB used
                  </div>
               </div>
               <a-button class="ml-4" @click="()=>$router.replace({name: 'order'})">Charge</a-button>
            </div>
            <div class="flex items-center" v-if="$store.state.core.username">
               <router-link class="text-xl" :to="{name: 'explorer'}">Explorer</router-link>
               <router-link class="text-xl ml-4" :to="{name: 'upload'}">Upload</router-link>
               <router-link class="text-xl ml-4" :to="{name: 'order'}">Order</router-link>
               <a-button type="danger" class="ml-4" @click="()=>confirm($t('auth.message.msg31'), logout)">{{
                     $t("auth.Logout")
                  }}
               </a-button>
            </div>
            <div class="flex items-center" v-else>
               <router-link class="text-gray-800" :to="{name: 'explorer'}">Docs</router-link>
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
         <a-popover placement="bottom" class="lg:hidden" v-model:visible="popOverVisible">
            <template #content>
               <div class="flex flex-col">
                  <a-button type="link" @click="()=>$router.replace({name: 'explorer'})">explorer</a-button>
                  <a-button class="lg:text-xl mt-4 lg:mt-0 lg:ml-4" type="link"
                            @click="()=>$router.replace({name: 'upload'})">Upload
                  </a-button>
                  <a-button class="lg:text-xl mt-4 lg:mt-0 lg:ml-4" type="link"
                            @click="()=>$router.replace({name: 'order'})">Order
                  </a-button>
                  <a-button class="lg:text-xl mt-4 lg:mt-0 lg:ml-4" type="link" ghost @click="confirmLogout">
                     <span class="text-red-600">{{ $t("auth.Logout") }}</span>
                  </a-button>
               </div>
            </template>
            <UnorderedListOutlined
                  @click="()=>popOverVisible=true"
                  :class="'btn-toggle bg-white p-2 active:bg-gray-200 ' + ($store.state.core.username ? 'inline-block' : 'hidden')"
                  style="font-size: 1.5rem"/>
         </a-popover>
         <a-button type="primary"
                   :class="'ml-10 lg:hidden ' + ($store.state.core.username ? 'hidden' : 'inline-block') "
                   :ghost="true" shape="round" @click="()=>$router.push('/login')">{{
               $t("auth.Login")
            }}
         </a-button>
         <a-button type="primary" :class="'ml-2 lg:hidden ' + ($store.state.core.username ? 'hidden' : 'inline-block') "
                   shape="round" @click="()=>$router.push('/signup')">{{
               $t("auth.Register")
            }}
         </a-button>
      </div>
   </header>
</template>

<script>
import agent from "@/agent";
import {AppMixin} from "@/mixins";
import {UnorderedListOutlined} from '@ant-design/icons-vue';
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

export default {
   name: "TheSiteHeader",
   mixins: [AppMixin],
   components: {UnorderedListOutlined},
   setup() {
      const route = useRoute()
      let popOverVisible = ref(false)
      watch(
            () => route.name,
            () => {
               popOverVisible.value = false
            }
      )
      return {
         popOverVisible
      }
   },
   computed: {
      storagePercent() {
         let current = this.$store.getters.currentAmount*100
         let total = this.$store.getters.totalCapacity * 1024 * 1024 * 1024
         console.log('percent', current, total)
         return current/total
      }
   },
   data: function () {
      return {}
   },
   mounted() {
   },
   methods: {
      logout() {
         agent.auth.logout().then(() => {
            localStorage.clear()
            window.location = '/login'
         })
      },
      confirmLogout() {
         this.popOverVisible = false
         this.confirm(this.$t('auth.message.msg31'), this.logout)
      }
   }
}
</script>

<style scoped lang="less">
.header {
   .logo {
      img {
         height: 52px;
      }
   }

   .menus__pc {
   }

   .btn-toggle {
   }
}

@media only screen and (max-width: 768px) {
   .header {
      .logo {
         img {
            height: 40px;
         }
      }

   }
}
</style>
