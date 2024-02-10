<script lang="ts" setup>
// import { ref } from 'vue'
// import { useTransition } from '@vueuse/core'
// import { ChatLineRound, Male } from '@element-plus/icons-vue'
defineProps(["invoiceStats"])

</script>

<template>
  <el-row>
    <el-col :span="6">
      <el-statistic :value="invoiceStats.paidCount">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Invoices Count
         <!-- <el-icon style="margin-left: 4px" ><DocumentCopy /></el-icon> -->
          </div>
          <div class="tip">(paid/total)</div>
        </template>
        <template #suffix>/{{ invoiceStats.count || 0 }}</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Before Tax" :value="invoiceStats.beforeTax" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Tax" :value="invoiceStats.tax">
        <template #suffix>
          <!-- <el-icon style="vertical-align: -0.125em">
        <Money /></el-icon> -->
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total After Tax" :value="invoiceStats.afterTax" />
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
