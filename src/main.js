import { createApp } from 'vue'
import router from "@/router";
import { createI18n } from 'vue-i18n';
import 'ant-design-vue/dist/antd.less';
import Site from "@/components/Site";
import messages from './messages'
import './index.css'
import {store} from "@/store";
import Button from 'ant-design-vue/lib/button';
import Select from 'ant-design-vue/lib/select';
import Input from 'ant-design-vue/lib/input';
import DatePicker from 'ant-design-vue/lib/date-picker';
import Table from "ant-design-vue/lib/table";
import Message from "ant-design-vue/lib/message";
import Modal from "ant-design-vue/lib/modal/Modal";


const i18n = createI18n({
   locale: 'cn',
   fallbackLocale: 'en',
   messages,
})


// console.log('routes', routes, siteRoutes)
createApp(Site)
   .use(Button)
   .use(Input)
   .use(Modal)
   .use(Table)
   .use(DatePicker)
   .use(Select)
   .use(Message)
   .use(store)
   .use(router)
   .use(i18n)
   .mount('#root')
