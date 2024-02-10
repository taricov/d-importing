<script setup>
defineProps(["type"]);
</script>
<template>
  <el-popover :width="400" placement="top">
    <template #reference>
      <super class="hint">
        <el-icon :size="12"><InfoFilled v-if="type==='info'" /><QuestionFilled v-if="type==='why'" /></el-icon>
      </super>
    </template>
    <template #default>
      <p style="margin: 0; font-size: 0.9em">
      <slot name="main">
      </slot>
      <slot name="extended">
      </slot>
      </p>
    </template>
  </el-popover>
</template>
<style></style>
