<script setup lang="ts">
import { ref } from "vue"
import ViewInvoice from "./views/ViewInvoice/View.vue"
import VHeader from "./components/VHeader/Header.vue"

// defineProps(["msg", "loc", "dir"])
const msg = ref<String>("")
const loc = ref<String>("")
const dir = ref<String>("")
const mode = ref<String>("")
const onChangeLanguage = (newLang:string) => {
  loc.value = newLang
  dir.value = loc.value === "ar" ? "rtl" : "ltr"
}
const onSendingMessage = (newMsg:string) => {
  msg.value = newMsg
}
const onChangeMode = (newMode:string) => {
  mode.value = newMode
}
</script>
<template>
      <el-config-provider :message="msg" :locale="loc" >
  <v-header @current-language="onChangeLanguage" @current-mode="onChangeMode"  />
  <el-tabs type="border-card">
    <el-tab-pane label="User">
    <view-invoice />
    </el-tab-pane>
    <el-tab-pane label="Config">Confirm</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
</el-config-provider>
</template>


