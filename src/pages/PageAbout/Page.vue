<script setup lang="ts">
import _ from "lodash";


// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
// const tt = (translation: string) => {
//   return _.capitalize(t(translation));
// };

</script>
<template>
  <el-descriptions
    title="Vertical list with border"
    direction="vertical"
    :column="4"
    border
  >
    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>

</template>


<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
