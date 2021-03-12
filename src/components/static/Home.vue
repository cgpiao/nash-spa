<template>
   <div class="flex flex-col w-full justify-center">
      <div class="flex flex-col mt-36 mb-44">
         <div class="title flex w-full justify-center">
            Sophisticated Pin Service Built On IPFS
         </div>
         <div class="description flex justify-center w-full">
            <div class="w-1/2 flex-col items-center">
               <div class="text-center">NashCache seriously takes its role as ecosystem of Crust to</div>
               <div class="text-center">provide decentralized Metadata management service with easy</div>
               <div class="text-center">IPFS API and toolkit.</div>
            </div>
         </div>
         <div class="buttons w-full flex justify-center">
            <a-button type="primary" shape="round" class="px-6 ">
               <span>Learn more about NashCache</span>
               <span class="ml-8">></span>
            </a-button>
         </div>
         <div class="mt-12 w-full flex justify-center" rel="nofollow">
            <a href="http://en.wikipedia.org/wiki/InterPlanetary_File_System" target="_blank" class=" ">
               What is the Interplanetary File System?
            </a>
         </div>
      </div>
      <div class="content__bottom flex flex-col">
         <div class="item-list flex justify-between flex-grow px-14">
            <div class="item">
               <IconUploadFileWhite/>
               <div class="item__text1">
                  Easy API
               </div>
               <div class="item__text2">
                  Our developer-friendly, documented API endpoints allow you to pin anything you want to IPFS.
               </div>
            </div>
            <div class="item ml-4">
               <IconUploadFileWhite/>
               <div class="item__text1">
                  Deep Visibility
               </div>
               <div class="item__text2">
                  Enjoy full visibility into what you are pinning with our pin explorer and metadata indexing.
               </div>
            </div>
            <div class="item ml-4">
               <IconUploadFileWhite/>
               <div class="item__text1">
                  Data Resiliency
               </div>
               <div class="item__text2">
                  We make sure your content stays pinned on IPFS so you don't have to.
               </div>
            </div>
            <div class="item ml-4">
               <IconUploadFileWhite/>
               <div class="item__text1">
                  Blockchain
               </div>
               <div class="item__text2">
                  Create combination of blockchain like Crust with IPFS for immutable off-chain data storage
               </div>
            </div>
         </div>
         <TheSiteFooter class="footer"/>
      </div>
   </div>
</template>

<script>
import IconUploadFileWhite from '../../assets/images/ic_upload_file_white.svg';
import TheSiteFooter from "@/components/shared/TheSiteFooter";

export default {
   name: "Home",
   components: {TheSiteFooter, IconUploadFileWhite}
}
</script>

<style scoped lang="less">
.title {
   font-family: Montserrat-Bold, Montserrat-Regular;
   color: #111111;
   font-size: 2.5rem;
}

.description {
   font-family: Montserrat-Medium, Montserrat-Regular;
   font-weight: 500;
   color: #333333;
   margin-top: 30px;
   font-size: 1.1rem;
}

.buttons {
   margin-top: 40px;
}
.content__bottom {
   background: #E7E9EF;
   padding-top: 200px;
   .footer {
      padding-top: 200px;
   }
}
.item {
   flex: 1;
   &__text1 {
      font-family: Montserrat-Bold, Montserrat-Regular;
      color: #1E1E1E;
      margin-top: 1.5px;
      font-size: 2.0rem;
   }

   &__text2 {
      font-family: Montserrat-Medium, Montserrat-Regular;
      font-weight: 500;
      color: #1E1E1E;
      margin-top: 1rem;
      font-size: 1rem;
   }
   svg {
      width: 60px;
      height: 60px;
   }
}
</style>
