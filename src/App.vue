<script setup lang="ts">
import { ref } from "vue"
//@ts-ignore
import _ from "lodash"
//@ts-ignore
import ViewInvoice from "./views/ViewInvoice/View.vue"
import VHeader from "./components/VHeader/Header.vue"
import {useI18n} from 'vue-i18n' 

const {t} = useI18n();

const tt = (translation:any) => {
    return _.capitalize(t(translation))
    
    }

// defineProps(["msg", "loc", "dir"])
// const msg = ref<String>("")
const loc = ref<String>("")
const dir = ref<String>("")
// const mode = ref<String>("")
const onChangeLanguage = (newLang:string) => {
  loc.value = newLang
  dir.value = loc.value === "ar" ? "rtl" : "ltr"
}
// const onSendingMessage = (newMsg:string) => {
//   msg.value = newMsg
// }
// const onChangeMode = (newMode:string) => {
//   mode.value = newMode
// }
</script>
<template>
      <!-- <el-config-provider :message="msg" :locale="loc" > -->
  <v-header @current-language="onChangeLanguage" />
  <el-tabs type="border-card">
    <el-tab-pane :label="tt('tabs.one')">
    <view-invoice />
    </el-tab-pane>
    <el-tab-pane :label="tt('tabs.two')" disabled>Confirm</el-tab-pane>
    <el-tab-pane :label="tt('tabs.three')">Role</el-tab-pane>
    <el-tab-pane :label="tt('tabs.four')">Task</el-tab-pane>
  </el-tabs>
<!-- </el-config-provider> -->
</template>


<style>
.rtl, .rtl *{
  direction: rtl;
  text-align: right;
}
.rtl .el-step__description{
  padding-right: 0 !important;
}
.rtl span.el-switch__label--right{
  margin-left: 0 !important;
  margin-right: 4px !important;
}
.el-tabs__nav-scroll{
  display: flex !important;
}
</style>