<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
// @ts-ignore
import _ from 'lodash'
const value = ref<String>("")
const emits = defineEmits(['selectedMapping'])
const props = defineProps(['fields', 'selected'])
const options = ref(props.fields)
const selected= reactive(props.selected)
function updateValue(e: string){
  emits('selectedMapping', e)
}

watch(selected, () => {
  // console.log(options.value)
}, {deep: true})
</script>
<template>
  <!-- <div v-if="false"> {{ idx+1 }}: </div> -->

  <el-select
    v-model="value"
    @change="updateValue"
    clearable
    placeholder="Select"
    style="width: 240px"
  >
  <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
    <el-option
      v-for="item in group.options"
    :disabled="selected.includes(item.key)"
      :key="item.key"
      :label="_.capitalize(item.key).split('_').join(' ')"
      :value="item.key"
    />
    </el-option-group>
  </el-select>
</template>
