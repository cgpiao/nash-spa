<template>
   <div class="flex flex-col h-full flex-1 relative" style="margin:0 auto">
      <TheSiteHeader/>
      <div class="flex flex-col w-full flex-1">
         <router-view/>
      </div>
      <TheSiteFooter :class="footerClass"/>
   </div>
</template>

<script>
import TheSiteHeader from "@/components/shared/TheSiteHeader";
import TheSiteFooter from "@/components/shared/TheSiteFooter";
import {ACCOUNT_SHOW} from "@/store/actions";
export default {
name: "Site",
   components: {TheSiteFooter, TheSiteHeader},
   computed: {
      footerClass() {
         let cls = {}
         if (this.$route.name === 'home') {
            cls.hidden = true
         }
         return cls
      }
   },
   mounted() {
      this.$store.dispatch(ACCOUNT_SHOW)
   }
}
</script>

<style scoped>

</style>
