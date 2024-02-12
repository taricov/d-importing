
<script lang="ts" setup>
import { ref, watch } from "vue"
import _ from "lodash";
import { useI18n } from "vue-i18n";
const { t } = useI18n();


const tt = (translation: string) => {
  return _.capitalize(t(translation));
};

const props = defineProps(["data"])

  const headers = ref<string[]>([])

// const objectSpanMethod = ({
//   row,
//   column,
//   rowIndex,
//   columnIndex,
// }) => {
//   if (columnIndex === 0) {
//     // row[key]
//     if (rowIndex % 2 === 0) {
//       return {
//         rowspan: 2,
//         colspan: 1,
//       }
//     } else {
//       return {
//         rowspan: 0,
//         colspan: 0,
//       }
//     }
//   }
// } 

watch(() => props.data, (data, _) => { 
  headers.value = Object.keys(data[0])
  console.log(headers.value, props.data)
})

</script>
<template>
     <div class="no-preview" v-if="data.length < 2">{{ tt('invoices.preview.noprev') }}</div>
  <div v-if="data.length > 2">
  <div style="display:flex;justify-content:flex-end">
  <sub>({{ data.length }} {{ tt('invoices.preview.rows') }})</sub>
  </div>
    <!-- :span-method="objectSpanMethod" -->
    <el-table height="500" :data="data" 
      style="width: 100%; margin-top: 20px"
      border
    >
    <template v-for="(h, i) in headers" :key="h">
      <el-table-column :prop="h" :label="h" width="180" :class="[i === 2 ? 'primary-col-indictor' : '']" />
    </template>
  </el-table>
  </div>
</template>
<style>
.primary-col-indictor{
  color: red;
  background: blue
}
.no-preview{
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  /* color: rgba(0, 0, 0, 0.4) */

}
</style>

