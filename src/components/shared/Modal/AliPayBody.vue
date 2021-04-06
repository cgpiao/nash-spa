<template>
   <div>

   </div>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js";

export default {
   name: "AliPayBody",
   data() {
      return {
         stripe: null,
      }
   },
   async mounted() {
      this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
      this.$emit('init-ali-event', {stripe: this.stripe})
   }
}
</script>

<style scoped>

</style>
