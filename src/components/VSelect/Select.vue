<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import _ from 'lodash'
import fields from "../../data/fields"
const value = ref<String>("")
const emit = defineEmits(['modelValue'])
const options = ref(fields)
defineProps(["idx"])
function updateValue(e, idx){
  emit('modelValue', [e, idx])
  options.value.splice(idx, 1)
  console.log(options.value)
}
</script>
<template>
 {{ idx+1 }}: 
  <el-select
    v-model:modelValue="value"
    @change="updateValue($event, idx)"
    clearable
    placeholder="Select"
    style="width: 240px"
  >
    <el-option
      v-for="item in options"
      :key="item.key"
      :label="_.capitalize(item.key).split('_').join(' ')"
      :value="item.key"
    />
  </el-select>
</template>
