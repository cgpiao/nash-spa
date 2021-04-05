<template>
   <div class="billing-page w-full h-full flex">
      <div class="flex-1 flex flex-col bg-white ml-8 mr-2 p-4">
         <div>
            <div class="text-xl text-gray-600 font-bold ">
               Current Plan
            </div>
            <div class="">
               <div>
                  Free Storage: 1GB
               </div>
            </div>
         </div>
         <div class="mt-2">
            <div class="text-xl text-gray-600 font-bold ">
               Number of items pinned
            </div>
            <div class="">
               11
            </div>
         </div>
         <div class="mt-2">
            <div class="text-xl text-gray-600 font-bold ">
               Total size of pinned items (including replications)
            </div>
            <div class="">
               605.2 KB
            </div>
         </div>
         <div class="mt-8">

            <a-button type="primary">
               Change Plan
            </a-button>
         </div>
      </div>
   </div>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js";

export default {
   name: "Billing",
   data() {
      return {
         stripe: null,
         weChatCodeUrl: null
      }
   },
   async mounted() {
      this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
   },
   methods: {
      handleTabChange(key) {
         switch (key) {
            case "1":
               break;
            case "2":
               break;
         }
      }
   }
}
</script>

<style scoped>

</style>
