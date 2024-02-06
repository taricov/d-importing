<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  discountTotal: false,
  discountItem: false,
  mulipleItems: false,
  allowPaid: true,
  taxMode: false,
  strictCheck: false,
  customFields: false,
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <el-form :model="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Multiple Items">
          <el-switch v-model="form.mulipleItems" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Total Discount">
          <el-switch v-model="form.discountTotal" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Item Discount">
          <el-switch v-model="form.discountItem" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Include Payments">
          <el-switch v-model="form.allowPaid" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Custom Fields">
          <el-switch disabled v-model="form.customFields" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Tax Mode">
          <el-switch v-model="form.taxMode" />
          <div class="sub">({{ form.taxMode ? "Inclusive" : "Exclusive" }})</div>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <el-form-item label="Strictly Checking">
          <el-checkbox v-model="form.strictCheck" />
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-form-item label="Strictly Checking">
          <el-checkbox v-model="form.strictCheck"/>
        </el-form-item>
  </el-form>
</template>

<style>
.el-form-item__label {
    width: 30%;
    justify-content: start !important;
}
.el-form-item__label:last-child {
  background-color: red;
}

.el-form-item {
  margin-bottom: 0 !important;
}
/* .el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
} */

/* .grid-content {
  border-radius: 4px;
  min-height: 36px;
} */
.sub {
  font-size: 9px;
  margin: 0 3px -10px;
  font-style: italic;
}
</style>
