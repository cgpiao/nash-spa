<template>
   <div>
      <div id="card-element" ref="cardElement" class="mt-4"></div>
      <div id="card-errors" ref="cardError" role="alert" class="text-red-600 mt-2"></div>
   </div>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js";
export default {
   name: "CardBody",
   data() {
      return {
         stripe: null,
         card: null
      }
   },
   async mounted() {
      this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
      let elements = this.stripe.elements();
      let style = {
         base: {
            color: "#32325d",
         }
      };

      this.card = elements.create("card", {style: style, hidePostalCode: true});
      this.card.mount(this.$refs.cardElement);
      this.card.on('change', ({error}) => {
         let displayError = document.getElementById('card-errors');
         this.submitDisabled = error
         if (error) {
            displayError.textContent = error.message;
         } else {
            displayError.textContent = '';
         }
      });
      this.$emit('init-card-event', {stripe: this.stripe, card: this.card})
   }
}
</script>

<style scoped>

</style>
