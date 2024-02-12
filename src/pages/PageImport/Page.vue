<script lang="ts" setup>
// import { ref } from "vue";
//@ts-ignore
import _ from "lodash";
//@ts-ignore
import ViewInvoice from "../../views/ViewInvoice/View.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const tt = (translation: any) => {
  return _.capitalize(t(translation));
};

// defineProps(["msg", "loc", "dir"])
// const msg = ref<String>("")
// const loc = ref<String>("");
// const dir = ref<String>("");
// const mode = ref<String>("")
// const onChangeLanguage = (newLang: string) => {
//   loc.value = newLang;
//   dir.value = loc.value === "ar" ? "rtl" : "ltr";
// };
</script>

<template>
<el-tabs type="border-card">
    <el-tab-pane :label="tt('tabs.one')">
      <view-invoice />
    </el-tab-pane>
    <el-tab-pane :label="tt('tabs.two')" disabled>
      <template #label>
      <el-badge value="Next" class="item" type="primary" style="">
      {{ tt('tabs.two') }}
        <!-- <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>Route</span>
        </span> -->
      </el-badge>
      </template>
    </el-tab-pane>
    <el-tab-pane :label="tt('tabs.three')" disabled></el-tab-pane>
    <el-tab-pane :label="tt('tabs.four')" disabled></el-tab-pane>
  </el-tabs>
</template>
<style>

</style>