<template>
   <div class="w-full px-12">
      <div class="title flex justify-center">
         PIN EXPLORER
      </div>
      <div class="filter-panel flex justify-between">
         <div class="filter flex flex-col">
            <div class="label">Name Contains</div>
            <a-input v-model:value="condition.name" class="mt-2" style="width: 260px"/>
         </div>
         <div class="filter flex flex-col">
            <div class="label">Pin Status</div>
            <a-select v-model:value="condition.status" class="mt-2" style="width: 260px">
               <a-select-option value="">All</a-select-option>
               <a-select-option v-for="item in statuses" :value="item" :key="item">{{item}}</a-select-option>
            </a-select>
         </div>
         <div class="filter flex flex-col">
            <div class="label">Pin Date Range</div>
            <div class="flex mt-2">
               <a-date-picker v-model:value="condition.startDate" placeholder="Start Date" value-format="YYYY-MM-DD" style="width: 130px"/>
               <a-date-picker v-model:value="condition.endDate" placeholder="End Date" value-format="YYYY-MM-DD" style="width: 130px"/>
            </div>
         </div>
         <div class="filter flex flex-col">
            <div class="label">Unpin Date Range</div>
            <div class="flex mt-2">
               <a-date-picker v-model:value="condition.unpinStartDate" placeholder="Start Date" value-format="YYYY-MM-DD" style="width: 130px"/>
               <a-date-picker v-model:value="condition.unpinEndDate" placeholder="End Date" value-format="YYYY-MM-DD" style="width: 130px"/>
            </div>
         </div>
      </div>
      <div class="flex w-full justify-center mt-14">
         <a-button type="primary" shape="round" @click="handleConditionChange">Update Filter</a-button>
      </div>
      <div class="flex mt-14">
         <div class="text-lg">
            Total Pins: {{attachments.length}}
         </div>
         <div class="ml-4 text-lg">
            Total Size: {{formatSize(totalSize)}}
         </div>
      </div>
      <a-table :columns="columns" :data-source="attachments"
               class="border mt-4 mb-12"
               :rowKey="(record)=>record.uuid"
               :pagination="false"
               :rowClassName="(_, index)=>index%2===1 ? 'bg-gray-100': ''">
         <template v-slot:seq="{ index }">
            {{ index + 1 }}
         </template>
         <template v-slot:hash="{ record }">
            <a :href="`https://ipfs.io/ipfs/${record.cid}`" target="_blank">{{record.cid}}</a>
         </template>
         <template v-slot:size="{ record }">
            {{ formatSize(record.file_size) }}
         </template>
         <template v-slot:pin_date="{ record }">
            {{ record.pinned_date }}
         </template>
         <template v-slot:unpin_date="{ record }">
            {{ record.unpinned_date }}
         </template>
         <template v-slot:action="{ record }">
            <a-button type="danger" v-if="record.pinned_date" @click="confirm($t('explorer.msg11'), handleUnpin, record)">Unpin</a-button>
         </template>
      </a-table>
   </div>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import agent from "@/agent";
import {PIN_STATUS_PINNED, PIN_STATUS_UNPINNED} from "@/constants";
import commonUtil from "@/utils/commonUtil";
import {AppMixin} from "@/mixins";
import Message from "ant-design-vue/lib/message";

export default {
   name: "Files",
   mixins: [AppMixin],
   setup() {
      let attachments = ref([])
      let condition = reactive({
         name: null,
         status: '',
         startDate: null,
         endDate: null,
         unpinStartDate: null,
         unpinEndDate: null,
      })
      let statuses = ref([
         PIN_STATUS_PINNED, PIN_STATUS_UNPINNED
      ])

      let getRecords = () => {
         let queries = {}
         if (condition.name) {
            queries.name = condition.name
         }
         if (condition.status) {
            queries.status = condition.status
         }
         if (condition.startDate) {
            queries.start_date = condition.startDate
         }
         if (condition.endDate) {
            queries.end_date = condition.endDate
         }
         if (condition.unpinStartDate) {
            queries.unpin_start_date = condition.unpinStartDate
         }
         if (condition.unpinEndDate) {
            queries.unpin_end_date = condition.unpinEndDate
         }
         agent.attachments.index(queries).then(resp => {
            attachments.value = resp.data
         })
      }

      onMounted(getRecords)

      let totalSize = computed(() => {
         return attachments.value.reduce((carry, current) => carry + current.file_size, 0)
      })
      return {
         condition,
         attachments,
         statuses,
         getRecords,
         totalSize
      }
   },
   data() {
      return {
         columns: [
            {title: 'Name', dataIndex: 'original_name',},
            {title: 'IPFS Hash', slots: {customRender: 'hash'}, width: '430px'},
            {title: 'Size', slots: {customRender: 'size'}, width: '120px',},
            {title: 'Date Pinned', slots: {customRender: 'pin_date'},},
            {title: 'Date Unpinned', slots: {customRender: 'unpin_date'},},
            {title: '', slots: {customRender: 'action'}, width: '100px'},
         ]
      }
   },
   methods: {
      handleConditionChange() {
         this.getRecords()
      },
      formatSize(size) {
         return commonUtil.humanFileSize(size)
      },
      handleUnpin(record) {
         agent.hashes.unpin(record.uuid).then(() => {
            Message.success(
                  'Unpin Successful',
                  3,
            );
            this.getRecords()
         })
      }
   }
}
</script>

<style scoped lang="less">
.title {
   font-size: 50px;
   font-family: Montserrat-Bold, Montserrat;
   font-weight: bold;
   color: #333333;
   line-height: 61px;
}

.filter-panel {
   margin-top: 100px;

   .label {
      font-size: 20px;
      font-family: Montserrat-Bold, Montserrat;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
   }
}
</style>
