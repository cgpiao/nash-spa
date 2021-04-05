<template>
   <div class="w-full flex flex-col lg:px-12 lg:py-4 px-3 py-2">
      <div class="plan py-2">
         <div class="bg-blue-300 py-2 px-4">
            Current Plan
         </div>
         <div class="flex flex-col mt-2" v-if="$store.state.core.account && $store.state.core.account.plan">
            <div class="flex">
                  <span class="w-24">
                     Storage
                  </span>
               <span class="">
                     {{ $store.getters.currentAmountString }}
                  </span>
            </div>
            <div class="flex">
                  <span class="w-24">
                     Due Date
                  </span>
               <span class="">
                     {{ stopDate }}
                  </span>
            </div>
         </div>
         <div class="flex flex-col mt-2" v-else>
            No Plan
         </div>

      </div>
      <div class="bg-blue-300 py-2 px-4 mt-4">
         Order
      </div>
      <div class="flex">
         <a-form ref="formRef" :model="models" :rules="rules" :wrapper-col="wrapperCol" class="" style="width: 500px">
            <a-form-item label="Storage" name="storage">
               <a-input-number v-model:value="models.storage"/>
               GB
            </a-form-item>
            <a-form-item label="Renew" name="months">
               <a-input-number v-model:value="models.months"/>
               Month
            </a-form-item>
         </a-form>
         <div class="flex flex-col h-full">
            <div class="mt-2">
               <span>1GB / Month: </span>
               <span class="text-red-600">${{ unitPrice / 100 }}</span>
            </div>
            <div class="flex-1"></div>
            <div class="mt-2 text-lg">
               <span class="font-bold">Amount: </span>
               <span class="text-red-600">${{ isNaN(amount) ? 0 : amount }}</span>
            </div>
         </div>
      </div>
      <div class="flex flex-col mt-4">
         <div class="bg-blue-300 py-2 px-4">
            Payments
         </div>
         <div class="flex pt-4">
            <div class="flex flex-col justify-center p-4 cursor-pointer rounded hover:bg-gray-50">
               <img src="../../assets/images/ic_payment_card.png" class="w-40" @click="showCardModal"/>
               <div class="text-center">Pay by Credit Card</div>
            </div>
         </div>
      </div>
      <a-modal v-model:visible="cardVisible" @ok="submit" :width="580" title="Pay by Credit Card">
         <div v-if="models.storage + 1 < $store.getters.totalCapacity">
            <div>You are trying to downgrade storage from <span class="text-red-600">{{$store.getters.totalCapacity - 1}}GB</span> to <span class="text-red-600">{{models.storage}}GB</span></div>
            <div>You cannot undo this operation.</div>
         </div>
         <div v-else>
            <div class="flex">
               <div class="w-20">Difference</div>
               <div>{{ deltaAmount }}</div>
            </div>
            <div class="flex">
               <div class="w-20">Renew</div>
               <div>{{ renewAmount }}</div>
            </div>
            <div class="flex">
               <div class="w-20">Total</div>
               <div>{{ amount }}</div>
            </div>
         </div>
         <div class="mt-4 text-xl font-semibold">Card Info</div>
         <CardBody @init-card-event="handleCardInit" :stripe="stripe"/>
      </a-modal>
   </div>
</template>

<script>
import CardBody from "@/components/shared/Modal/CardBody";
import agent from "@/agent";
import stringUtil from "@/utils/stringUtil";
import {ACCOUNT_SHOW} from "@/store/actions";
import {onMounted, ref} from "vue";
import * as moment from "moment";
import {M_PLAN_UPDATE} from "@/store/mutations";
import Message from "ant-design-vue/lib/message";

export default {
   name: "Order",
   components: {CardBody},
   setup() {
      let orders = ref([])
      let getOrders = async () => {
         let resp = await agent.orders.index()
         orders.value = resp.data
      }

      onMounted(getOrders)
      return {
         orders
      }
   },
   computed: {
      canChangePlan() {
         let account = this.$store.state.core.account
         if (!account)
            return false
         if (!account.plan)
            return false
         return true
      },
      stopDate() {
         return moment.unix(Math.floor(this.$store.state.core.account.plan.stop_seconds)).format("MMM DD, YYYY")
      },
      deltaAmount() {
         if (!this.$store.state.core.account || !this.$store.state.core.account.plan)
            return 0
         let currentStorage = this.$store.state.core.account.plan.storage
         let now = (new Date()).getTime()
         let stopSeconds = this.$store.state.core.account.plan.stop_seconds
         let deltaDays = Math.floor((stopSeconds - (now / 1000)) / (60 * 60 * 24))
         return ((this.unitPrice / 30) * deltaDays * (this.models.storage - currentStorage)) / 100
      },
      renewAmount() {
         return (this.unitPrice * this.models.months * this.models.storage) / 100
      },
      amount() {
         return (this.renewAmount + this.deltaAmount)
      }
   },
   data() {
      return {
         unitPrice: 15,
         bodyKey: (new Date()).getTime() + stringUtil.random(5),
         models: {
            storage: 10,
            months: 12,
         },
         rules: {
            storage: [
               {
                  validator: (rule, value) => {
                     if (value === null) {
                        return Promise.reject('must not empty')
                     }
                     if (value < 1 || typeof value > 1000)
                        return Promise.reject('value should be 1 to 1000')
                     return Promise.resolve()
                  }, trigger: 'submit'
               },
            ],
            months: [
               {
                  validator: (rule, value) => {
                     if (value === null) {
                        return Promise.reject('must not empty')
                     }
                     if (value < 0 || typeof value > 36)
                        return Promise.reject('value should be 0 to 36')
                     return Promise.resolve()
                  }, trigger: 'submit'
               },
            ],
         },
         labelCol: {span: 3},
         wrapperCol: {span: 8},
         cardVisible: false,
         reduceConfirmationVisible: false,
         stripe: null,
         card: null,
         session: null
      }
   },
   async mounted() {
      this.bodyKey = (new Date()).getTime() + stringUtil.random(5)
      this.$store.dispatch(ACCOUNT_SHOW).then(account => {
         if (account.plan) {
            this.models.storage = account.plan.storage
         }
      })
   },
   methods: {
      submit() {
         this.stripe.confirmCardPayment(this.session, {
            payment_method: {
               card: this.card,
               billing_details: {
                  name: this.$store.state.core.username
               }
            }
         }).then((result) => {
            if (result.error) {
               alert(result.error.message)
            } else {
               if (result.paymentIntent.status === 'succeeded') {
                  this.cardVisible = false
                  const payload = {
                     months: this.models.months,
                     storage: this.models.storage
                  }
                  this.$store.commit(M_PLAN_UPDATE, payload)
                  Message.success(
                        'Charge Successful',
                        3,
                  );
               }
            }
         })
      },
      async showCardModal() {
         this.$refs.formRef.validate().then(() => {
            this.cardVisible = true
            let data = {
               storage: this.models.storage,
               months: this.models.months,
            }
            agent.intents.create(data).then(({data}) => {
               this.session = data
            })

         })

      },
      handleCardInit({stripe, card}) {
         this.card = card
         this.stripe = stripe
      }
   },

}
</script>

<style scoped>

</style>
