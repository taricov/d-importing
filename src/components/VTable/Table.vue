
<script lang="ts" setup>
import { ref, watch } from "vue"
import type { TableColumnCtx } from 'element-plus'
const props = defineProps(["data"])
interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
    rowIndex: number
    columnIndex: number
  }
  
  const headers = ref<string[]>([])
  // const data = ref<[]>()
const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2]
    } else if (columnIndex === 1) {
      return [0, 0]
    }
  }
}

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
} 

watch(() => props.data, (data, oldData) => { 
  console.log(data)
  headers.value = Object.keys(data[0])
})

</script>
<template>
  <div>
  <div style="display:flex;justify-content:flex-end">
  <sub>({{ data.length }} rows)</sub>
  </div>
    <el-table height="500" :data="data" 
    :span-method="objectSpanMethod"
      style="width: 100%; margin-top: 20px"
      border
    >
    <template v-for="h in headers" :key="h">
      <el-table-column :prop="h" :label="h" width="180" />
    </template>

  </el-table>
  </div>
</template>
