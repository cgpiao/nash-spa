<template>
   <a-modal v-model:visible="visible" @ok="handleAddPayment" :width="580">
      <div id="card-element" class="mt-4"></div>
      <div id="card-errors" role="alert" class="text-red-600 mt-2"></div>
   </a-modal>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js';

export default {
   name: "PaymentModal",
   data() {
      return {
         visible: false,
         submitDisabled: false,
         card: null,
         stripe: null,
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
      this.card.mount("#card-element");
      this.card.on('change', ({error}) => {
         let displayError = document.getElementById('card-errors');
         this.submitDisabled = error
         if (error) {
            displayError.textContent = error.message;
         } else {
            displayError.textContent = '';
         }
      });
   },
   methods: {
      handleAddPayment() {
         let form = document.getElementById('payment-form');
         this.stripe.confirmCardPayment(form.dataset.secret, {
            payment_method: {
               card: this.card,
               billing_details: {
                  name: 'Jenny Rosen'
               }
            }
         }).then(function (result) {
            if (result.error) {
               console.log(result.error.message);
            } else {
               // if (result.paymentIntent.status === 'succeeded') {
               // }
            }
         });
      }
   }
}
</script>

<style scoped>

</style>
