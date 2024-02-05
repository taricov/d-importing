<script lang="ts" setup>
import _ from "lodash"
// import { tt } from "../../utils/untils"
import { TinvoiceSettings } from "../../@types/types.ts";
import { ref } from "vue";
import {useI18n} from 'vue-i18n' 
const active = ref(0);
const next = () => {
  if (active.value++ >= 2){
    active.value = 2
    return;
  };
};
const previous = () => {
  if (active.value-- <= 0){
    active.value = 0
    return
  };
};
const finish = () => {
    active.value = 3
    activeName.value = ["import"]
  };
import { Check, Close } from '@element-plus/icons-vue'

const {t, locale} = useI18n();

const activeName = ref<String[]>(["settings", "upload", "import"]);
const v = ref<Boolean>(false)
// const invoiceSettings = ref<TinvoiceSettings>({
//   paid:
// });


const tt = (translation) => {
return _.capitalize(t(translation))

}
</script>

<template>
  <div class="collapse">
    <el-collapse v-model="activeName">
      <el-collapse-item name="settings" :title="tt('invoices.accordion.one')">
        <el-switch v-model="v" active-text="Inline Tax" />

      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.two')" name="upload">
        <div>
          <el-steps :active="active" finish-status="success">
            <el-step :title="tt('invoices.steps.one')" :description="tt('invoices.steps.one_desc')"/>
            <el-step :title="tt('invoices.steps.two')" :description="tt('invoices.steps.two_desc')"/>
            <el-step :title="tt('invoices.steps.three')" :description="tt('invoices.steps.three_desc')"/>
          </el-steps>

          <el-button v-if="active < 2" style="margin-top: 12px" @click="next">{{ tt('invoices.steps.next') }}</el-button>
          <el-button style="margin-top: 12px" @click="previous">{{t('invoices.steps.prev')}}</el-button>
          <el-button v-if="active >= 2" style="margin-top: 12px" @click="finish">{{ tt('invoices.steps.fini') }} <el-icon><Arrow /></el-icon></el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.three')" name="import">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the users can
          quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps the users
          to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
