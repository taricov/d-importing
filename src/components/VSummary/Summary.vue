<script lang="ts" setup>
import _ from "lodash";
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const tt = (translation: string) => {
  return _.capitalize(t(translation));
};
defineProps(["invoiceStats"])

</script>

<template>
  <el-row>
    <el-col :span="6">
      <el-statistic :value="invoiceStats.paidCount">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            {{ tt('invoices.stats.count') }}
         <!-- <el-icon style="margin-left: 4px" ><DocumentCopy /></el-icon> -->
          </div>
          <div class="tip">({{ tt('invoices.stats.paidCount') }})</div>
        </template>
        <template #suffix>/{{ invoiceStats.count || 0 }}</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic :title="tt('invoices.stats.b4tax')" :value="invoiceStats.beforeTax" />
    </el-col>
    <el-col :span="6">
      <el-statistic :title="tt('invoices.stats.tax')" :value="invoiceStats.tax">
        <template #suffix>
          <!-- <el-icon style="vertical-align: -0.125em">
        <Money /></el-icon> -->
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic :title="tt('invoices.stats.aftertax')" :value="invoiceStats.afterTax" />
    </el-col>
  </el-row>
</template>



<style scoped>
.el-col {
  text-align: center;
}
.tip{
  font-size: 10px;
  line-height: .4

}
</style>
