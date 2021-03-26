<template>
   <div class="flex justify-between py-4">
      <router-link to="/">
         <img src="../../assets/images/logo.png" height="36" />
      </router-link>
      <div>
         <a-button type="primary" :ghost="true" @click="()=>$router.push('/login')">{{ $t("auth.Login") }}</a-button>
         <a-button type="primary" class="ml-4" @click="()=>$router.push('/signup')">{{ $t("auth.Sign Up") }}</a-button>
      </div>
   </div>
</template>

<script>
export default {
name: "TheSiteMenu"
}
</script>

<style scoped>

</style>
