<template>
   <div class="w-full flex justify-center">
      <div class="" style="width: 650px; margin-top: 100px;">
         <div class="w-full flex justify-center">
            <img src="../../assets/images/logo.png"/>
         </div>
         <div class="buttons w-full flex justify-between" style="margin-top: 55px">
            <div :class="getButtonClass(1) + ' flex lg:px-4 mx-2 lg:mx-0'" @click="()=>handleTabChange(1)">
               <div class="flex">
                  <IconUploadFileWhite v-if="currentTab === 1" class="file"/>
                  <IconUploadFileBlack v-else class="file"/>
                  <div class="text">Upload File</div>
               </div>
            </div>
            <div :class="getButtonClass(2) + ' hidden lg:flex lg:px-4'" @click="()=>handleTabChange(2)">
               <div class="flex">
                  <IconUploadFolderWhite v-if="currentTab === 2" class="folder"/>
                  <IconUploadFolderBlack v-else class="folder"/>
                  <div class="text">Upload Directory</div>
               </div>
            </div>
            <div :class="getButtonClass(3) + ' flex lg:px-4 mx-2 lg:mx-0'" @click="()=>handleTabChange(3)">
               <div class="flex">
                  <IconPinWhite v-if="currentTab === 3" class="pin"/>
                  <IconPinBlack v-else class="pin"/>
                  <div class="text">Pin By Hash</div>
               </div>
            </div>
         </div>
         <div class="upload-form">
            <div class="relative pl-3 file-select h-10 bg-white hidden lg:flex flex-col justify-center border border-gray-300 border-solid rounded-lg text-gray-900 "
                 v-if="currentTab === 1">
               <input type="file" style="display: none" id="selectFile" @change="handleFileChange"
                      :accept="acceptFiles"/>
               <label class="cursor-pointer"
                      for="selectFile">{{ files.length > 0 ? files[0].name : 'Select File…' }}</label>
               <IconAdd class="absolute right-2 add"/>
            </div>
            <div class="relative pl-3 file-select h-10 flex lg:hidden flex-col items-center justify-center rounded-lg text-gray-900"
                 v-if="currentTab === 1">
               <div class="text-xl">do not allow upload on mobile devices</div>
            </div>
            <div class="relative pl-3 file-select h-10 bg-white flex flex-col justify-center border border-gray-300 border-solid rounded-lg text-gray-900"
                 v-if="currentTab === 2">
               <input type="file" style="display: none" id="selectFolder" webkitdirectory mozdirectory
                      @change="handleFolderChange"/>
               <label class="cursor-pointer"
                      for="selectFolder">{{ files.length > 0 ? files[0].name : 'Select Directory…' }}</label>
               <IconAdd class="absolute right-2 add"/>
            </div>
            <div class="relative p-2 file-select h-10 bg-white flex flex-col justify-center border border-gray-300 border-solid rounded-lg text-gray-900"
                 v-if="currentTab === 3">
               <input type="text" placeholder="hash" v-model="hash"/>
               <IconAdd class="absolute right-2 add"/>
            </div>
            <div class="mt-7 p-2 file-select h-10 bg-white flex-col justify-center border border-gray-300 border-solid rounded-lg text-gray-900 hidden lg:flex">
               <input type="text" placeholder="Custom Name For Pin" class="" v-model="customFileName"
                      v-if="currentTab === 1"/>
               <input type="text" placeholder="Custom Name For Pin" v-model="customFolderName" v-if="currentTab === 2"/>
               <input type="text" placeholder="Custom Name For Pin" v-model="customHashName" v-if="currentTab === 3"/>
            </div>
            <div class="mt-14 flex justify-center">
               <a-button type="primary" v-if="currentTab === 3" class="px-12" shape="round" @click="handlePin"
                         :disabled="pinDisabled">Pin
               </a-button>
               <a-button type="primary" v-else class="px-12 hidden lg:inline-block" shape="round" @click="handleSubmit"
                         :disabled="submitDisabled">Upload
               </a-button>
            </div>
         </div>
         <div class="mt-12 flex flex-col">
            <div class="text-2xl mt-4" v-if="status >= STATUS_UPLOADING && currentTab < 3">Uploading...</div>
            <div class="text-2xl mt-4" v-if="status >= STATUS_PINNING && status < STATUS_ERROR">Pinning...</div>
            <div class="text-2xl mt-4" v-if="status >= STATUS_PINNED && status < STATUS_ERROR">Pinned...</div>
            <div class="text-2xl mt-4" v-if="status === STATUS_ERROR">{{ errorMessage }}</div>
         </div>
      </div>
   </div>
</template>

<script type="application/javascript">
import Message from "ant-design-vue/lib/message";
import IconUploadFileBlack from '../../assets/images/ic_upload_file_black.svg';
import IconUploadFileWhite from '../../assets/images/ic_upload_file_white.svg';
import IconUploadFolderBlack from '../../assets/images/ic_upload_folder_black.svg';
import IconUploadFolderWhite from '../../assets/images/ic_upload_folder_white.svg';
import IconPinBlack from '../../assets/images/ic_pin_black.svg';
import IconPinWhite from '../../assets/images/ic_pin_white.svg';
import IconAdd from '../../assets/images/ic_add.svg';
import {ATTACHMENT_CREATE} from "@/store/actions";
import {encode} from "js-base64";
import agent from "@/agent";
import {TEMP_ERROR, TEMP_PINNED} from "@/constants";
import Modal from "ant-design-vue/lib/modal";


export default {
   name: "Upload",
   components: {
      IconUploadFileBlack, IconUploadFileWhite,
      IconUploadFolderBlack, IconUploadFolderWhite,
      IconPinBlack, IconPinWhite, IconAdd
   },
   computed: {
      submitDisabled() {
         return this.files.length === 0
      },
      pinDisabled() {
         return !this.hash
      },
   },
   setup() {
      const showAttachment = id => {
         return agent.attachments.show(id)
      }
      return {
         showAttachment
      }
   },
   mounted() {
      this.status = this.STATUS_IDLE
   },
   data() {
      return {
         currentTab: 1,
         customFileName: null,
         customFolderName: null,
         customHashName: null,
         errorMessage: '',
         hash: null,
         files: [],
         status: null,
         STATUS_IDLE: 0,
         STATUS_UPLOADING: 1,
         STATUS_PINNING: 2,
         STATUS_PINNED: 3,
         STATUS_ERROR: 9,
         acceptFiles: [
            'image/*', 'text/plain',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/pdf',
            'application/json'
         ].join(',')
      }
   },
   methods: {
      handleTabChange(newTab) {
         this.currentTab = newTab
         this.files = []
         this.status = this.STATUS_IDLE
      },
      handleSelectFile() {
         document.getElementById('selectFile').click()
      },
      handleFileChange(e) {
         // 8977920
         if (this.currentTab === 1 && e.target.files[0].size > 5 * 1024 * 1024) {
            Modal.warning({
               title: 'Warning',
               content: 'File must be less than 5MB',
            });
            return
         }
         this.files = e.target.files
      },
      handleFolderChange(e) {
         this.files = e.target.files
      },
      handlePin() {
         agent.hashes.pinByHash(this.hash, {'custom_name': this.customHashName}).then(resp => {
            this.customHashName = ''
            this.hash = ''
            const uuid = resp.data
            this.status = this.STATUS_PINNING
            let interval = setInterval(() => {
               this.showAttachment(uuid).then(resp => {
                  if (resp.data.value === TEMP_PINNED) {
                     this.status = this.STATUS_PINNED
                     clearInterval(interval)
                  } else if (resp.data.value === TEMP_ERROR) {
                     this.status = this.STATUS_ERROR
                     this.errorMessage = resp.data.note
                     clearInterval(interval)
                  }
               })
            }, 1500)
         }).catch(() => {
            Message.error(
                  'Hash not exist',
                  3,
            );
         })
      },
      handleSubmit() {
         let formData = new FormData()
         for (let file of this.files) {
            switch (this.currentTab) {
               case 1:
                  formData.append('file_' + encode(file.name), file);
                  break;
               case 2:
                  formData.append('file_' + encode(file.webkitRelativePath), file)
                  break;
            }
         }

         switch (this.currentTab) {
            case 1:
               formData.append('custom_name', this.customFileName);
               break;
            case 2:
               formData.append('custom_name', this.customFolderName);
               break;
         }
         this.status = this.STATUS_UPLOADING
         this.$store.dispatch(ATTACHMENT_CREATE, formData).then(resp => {
            this.status = this.STATUS_PINNING
            this.customFileName = ''
            this.customFolderName = ''
            this.files = []
            switch (this.currentTab) {
               case 1:
                  document.getElementById('selectFile').value = ''
                  break;
               case 2:
                  document.getElementById('selectFolder').value = ''
                  break;
            }

            Message.success(
                  'Upload Successful',
                  3,
            );
            const uuid = resp.data
            let interval = setInterval(() => {
               this.showAttachment(uuid).then(resp => {
                  if (resp.data) {
                     this.status = this.STATUS_PINNED
                     clearInterval(interval)
                  }
               })
            }, 1500)
         }).catch(error => {
            this.status = this.STATUS_ERROR
            this.errorMessage = error.response.data.message
         })
      },
      getButtonClass(tab) {
         let cls = ['flex-1', 'items-center', 'justify-center', 'btn']
         if (this.currentTab === tab) {
            cls.push('active')
         }
         return cls.join(' ')
      }
   }
}
</script>

<style scoped lang="less">
svg {
   width: 20px;
   height: 20px;

   &.pin {
      width: 15px;
      height: 15px;
      margin-top: 2px;
   }

   &.add {
      width: 24px;
      height: 24px;
   }
}

.upload-form {
   margin-top: 24px;
   background-color: #FBFBFB;
   padding: 45px 60px;
}

.btn {
   background: #F7FAFF;
   border-radius: 5px;
   border: 1px solid #D7D8DA;
   height: 40px;
   color: #111111;
   cursor: pointer;

   &.active {
      background: #0D52F1;
      color: white;
   }

   .text {
      margin-left: 5px;
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      line-height: 22px;
   }
}

input {
   outline: 0;
   border-width: 0px;
   padding: 0.5rem;
}
</style>
