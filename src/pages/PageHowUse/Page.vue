<script setup lang="ts">
import _ from "lodash";


// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
// const tt = (translation: string) => {
//   return _.capitalize(t(translation));
// };

const invoiceCols = [
  {
    colName: "paid",
    instructions:"Paid",
    posibbleVals: ["cash", "bank", "cheque"]

  },
  {
    colName: "Payment Date",
    instructions:"lofdsfm lekfmdslkfm mflkfjoiw j[a]",
    posibbleVals: ""

  }
  ]

</script>
<template>
  <el-descriptions
    :title="'Invoice Importing Guidance:'"
    direction="vertical"
    :column="4"
    border
  >
  <template v-for="item in invoiceCols">
    <el-descriptions-item :label="'Column Name'">{{ item.colName }}</el-descriptions-item>
    <el-descriptions-item :label="'Instructions'">{{ item.instructions }}</el-descriptions-item>
    <el-descriptions-item :label="'Possible Values'" :span="2" >
      <el-tag size="small" style="margin:0 .8px" v-for="tag in item.posibbleVals">{{ tag }}</el-tag>
      <p v-if="!item.posibbleVals.length">No Values</p>
    </el-descriptions-item>
  </template>
  </el-descriptions>

</template>


<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
