<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import _ from 'lodash'
import fields from "../../data/fields"

const value = ref('')
const options = ref(fields)
</script>
<template>
  <el-select
    v-model="value"
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
