<template>
   <footer class="footer w-full flex justify-center py-2">
      <div class="flex">
         <a href="/privacy">{{$t('footer.Privacy')}}</a>
         <a href="/terms-and-conditions" class="ml-4">{{$t('footer.Terms and Conditions')}}</a>
      </div>
   </footer>
</template>

<script>
export default {
name: "TheSiteFooter"
}
</script>

<style scoped lang="less">
.footer {
   a {
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
      &:hover {
         color: #333333;
         text-decoration: underline;
      }
   }
}
</style>
