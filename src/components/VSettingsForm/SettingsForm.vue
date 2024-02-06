<script lang="ts" setup>
import { reactive, ref } from "vue";
const emits = defineEmits(["formData"])
const downloadedTemplate = ref<Boolean>(false)
// do not use same name with ref
const formVals = reactive({
  discountTotal: false,
  discountItem: false,
  mulipleItems: false,
  allowPaid: true,
  taxMode: false,
  strictCheck: false,
  customFields: false,
});

const onSubmit = () => {
    emits("formData", formVals)
};
const downloadTemplate = () => {
    console.log("dwonloading...")
    setTimeout(()=>{
        downloadedTemplate.value = true
    },1500)
};
</script>

<template>
  <el-form :model="formVals">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Multiple Items">
          <el-switch v-model="formVals.mulipleItems" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Total Discount">
          <el-switch v-model="formVals.discountTotal" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Item Discount">
          <el-switch v-model="formVals.discountItem" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Include Payments">
          <el-switch v-model="formVals.allowPaid" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Custom Fields">
          <el-switch disabled v-model="formVals.customFields" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Tax Mode">
          <el-switch v-model="formVals.taxMode" />
          <div class="sub">({{ formVals.taxMode ? "Inclusive" : "Exclusive" }})</div>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <el-form-item label="Strictly Checking">
          <el-checkbox v-model="formVals.strictCheck" />
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-form-item label="Strictly Checking">
          <el-checkbox v-model="formVals.strictCheck"/>
        </el-form-item>
        <el-form-item>
        <el-button :loading="downloadedTemplate" type="primary" @click="downloadTemplate"><el-icon class="form-icon" v-if="!downloadedTemplate"><Download /></el-icon><span class="form-icon-label">Download Template</span></el-button>
        <el-button :disabled="!downloadedTemplate" type="success" @click="onSubmit"><el-icon class="form-icon"><Check size="18"/></el-icon> <span class="form-icon-label">Next Step</span></el-button>
        </el-form-item>
  </el-form>
</template>

<style>
.form-icon-label{
    margin-inline: 3px;
}
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
