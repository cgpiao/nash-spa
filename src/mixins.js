import moment from "moment";
import Modal from "ant-design-vue/lib/modal";

export const AppMixin = {
   data() {
      return {

      }
   },
   methods: {
      confirm(message, cb, params) {
         Modal.confirm({
            content: message,
            onOk() {
               cb(params);
            }
         })
      },
      toLocalDate(yyyymmdd, includeDayOfWeek) {
         yyyymmdd = '' + yyyymmdd
         let year = yyyymmdd.substr(0, 4)
         let month = yyyymmdd.substr(4, 2)
         let date = yyyymmdd.substr(6, 2)
         let dateObj = moment(`${year}-${month}-${date}`)
         // let today = +moment().format('YYYYMMDD')
         if (includeDayOfWeek) {
            if (navigator.language.includes("zh")) {
               const dow = dateObj.day();
               return dateObj.format("YYYY-D-M") + ', ' + this.getDayOfWeek(dow)
            } else {
               return dateObj.format("ddd, MMM DD, YYYY")
            }
         } else {
            if (navigator.language.includes("zh")) {
               return dateObj.format("YYYY-D-M")
            } else {
               return dateObj.format("MMM DD, YYYY")
            }
         }
      },
      getDayOfWeek(dow) {
         switch (dow) {
            case 1:
               return this.$t('dow.Sunday')
            case 2:
               return this.$t('dow.Monday')
            case 3:
               return this.$t('dow.Tuesday')
            case 4:
               return this.$t('dow.Wednesday')
            case 5:
               return this.$t('dow.Thursday')
            case 6:
               return this.$t('dow.Friday')
            case 7:
               return this.$t('dow.Saturday')
         }
      }
   }
}
