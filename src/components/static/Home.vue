<template>
   <div class="flex flex-col w-full justify-center">
      <div class="flex flex-col lg:mt-36 lg:mb-44 mt-16 mb-20">
         <div class="title flex w-full justify-center text-3xl lg:text-4xl text-center">
            Sophisticated Pin Service Built On IPFS
         </div>
         <div class="description flex justify-center w-full mt-4 lg:mb-8 mt-6 lg:mt-10 text-lg lg:text-xl">
            <div class="lg:w-1/2 w-5/6 flex-col items-center">
               <div class="text-center">Crato seriously takes its role as ecosystem of Crust to</div>
               <div class="text-center">Provide decentralized Meta data management service with easy</div>
               <div class="text-center">IPFS API and toolkit.</div>
            </div>
         </div>
         <div class="buttons w-full flex justify-center mt-8 lg:mt-10">
            <a-button type="primary" shape="round" class="px-6 ">
               <span>Learn more about Crato</span>
               <span class="ml-8">></span>
            </a-button>
         </div>
         <div class="mt-12 w-full flex justify-center" rel="nofollow">
            <a href="http://en.wikipedia.org/wiki/InterPlanetary_File_System" target="_blank" class=" ">
               What is the Interplanetary File System?
            </a>
         </div>
      </div>
      <div class="content__bottom flex flex-col lg:pt-48 pt-20">
         <div class="item-list flex flex-col lg:flex-row justify-between flex-grow lg:px-14 px-4">
            <div class="item w-full lg:flex-1 flex flex-row lg:flex-col">
               <img src="../../assets/images/ic_home1.png"/>
               <div class=" lg:ml-0 ml-2">
                  <div class="item__text1 lg:text-3xl text-xl lg:mt-2">
                     Easy API
                  </div>
                  <div class="item__text2 mt-1 lg:mt-3">
                     Our developer-friendly, documented API endpoints allow you to pin anything you want to IPFS.
                  </div>
               </div>

            </div>
            <div class="item mt-8 lg:mt-0 lg:ml-8 w-full lg:flex-1 flex flex-row lg:flex-col">
               <img src="../../assets/images/ic_home2.png"/>
               <div class="lg:ml-0 ml-2">
                  <div class="item__text1 lg:text-3xl text-xl lg:mt-2 font-bold">
                     Deep Visibility
                  </div>
                  <div class="item__text2 mt-1 lg:mt-3">
                     Enjoy full visibility into what you are pinning with our pin explorer and metadata indexing.
                  </div>
               </div>
            </div>
            <div class="item mt-8 lg:mt-0 lg:ml-8 w-full lg:flex-1 flex flex-row lg:flex-col">
               <img src="../../assets/images/ic_home3.png"/>
               <div class=" lg:ml-0 ml-2">
                  <div class="item__text1 lg:text-3xl text-xl lg:mt-2">
                     Data Resiliency
                  </div>
                  <div class="item__text2 mt-1 lg:mt-3">
                     We make sure your content stays pinned on IPFS so you don't have to.
                  </div>
               </div>
            </div>
            <div class="item mt-8 lg:mt-0 lg:ml-8 w-full lg:flex-1 flex flex-row lg:flex-col">
               <img src="../../assets/images/ic_home4.png"/>
               <div class=" lg:ml-0 ml-2">
                  <div class="item__text1 lg:text-3xl text-xl lg:mt-2">
                     Blockchain
                  </div>
                  <div class="item__text2 mt-1 lg:mt-3">
                     Create combination of blockchain like Crust with IPFS for immutable off-chain data storage
                  </div>
               </div>
            </div>
         </div>
         <TheSiteFooter class="footer lg:pt-48 pt-20"/>
      </div>
   </div>
</template>

<script>
import TheSiteFooter from "@/components/shared/TheSiteFooter";

export default {
   name: "Home",
   components: {TheSiteFooter}
}
</script>

<style scoped lang="less">
.title {
   font-family: Montserrat-Bold, Montserrat-Regular;
   color: #111111;
}

.description {
   font-family: Montserrat-Medium, Montserrat-Regular;
   font-weight: 500;
   color: #333333;
}

.content__bottom {
   background: #E7E9EF;

   .footer {
   }
}

.item {
   &__text1 {
      font-family: Montserrat-Bold, Montserrat-Regular;
      color: #1E1E1E;
   }

   &__text2 {
      font-family: Montserrat-Medium, Montserrat-Regular;
      font-weight: 500;
      color: #1E1E1E;
   }

   img {
      width: 48px;
      height: 48px;
   }
}
</style>
