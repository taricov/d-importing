<script lang="ts" setup>
import enFields from "../../data/en-fields";
import arFields from "../../data/ar-fields";
import VSelect from "../VSelect/Select.vue";
import { ref, reactive } from "vue";
import _ from "lodash";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const tt = (translation: string) => {
  return t(translation);
};
const emits = defineEmits(["formData"]);
const props = defineProps(["headers"]);
// const downloadedTemplate = ref<Boolean>(false)
const primaryCol = ref<Number>();
let options = reactive<any>(locale.value === "en" ? enFields : arFields);
const formVals = ref<string[]>([]);
// const onSubmit = () => {
//   emits("formData", formVals);
//   console.log("from mapping...", formVals.value, formVals.value[2]);
// };

const onSelect = (val: string, i: number) => {
  formVals.value[i] = val
}

</script>

<template>
  <el-form :model="formVals">
    <el-row :gutter="10" style="margin-bottom: 10px; justify-content: space-between">
      <el-col :span="6" style="text-align: flex-start; line-height: 10px;">
        {{  tt('invoices.mapping.primaryCol') }} <br/><sub>
        ({{ tt('invoices.mapping.primaryTip') }})</sub>
      </el-col>
      <el-col :span="6" style="text-align: flex-end">{{ tt('invoices.mapping.mappedCol') }}</el-col>
    </el-row>
    <el-row
      v-for="(col, i) in props.headers"
      :key="col"
      :gutter="10"
      style="margin-bottom: 2px; justify-content: space-between"
    >
      <el-col :span="6" style="text-align: flex-start">
        <el-form-item>
          <el-radio-group v-model="primaryCol">
            <el-radio :label="i" border> {{ col }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6" style="text-align: flex-end">
        <v-select :selected="formVals"  :fields="options" @selectedMapping="onSelect($event, i)" />
      </el-col>
    </el-row>

    <!-- 
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
    </el-row> -->
    <!-- <el-row>
      <el-col :span="24">
        <el-form-item label="Strictly Checking">
          <el-checkbox v-model="formVals.strictCheck" />
        </el-form-item>
      </el-col>
    </el-row> -->
    <!-- <el-form-item label="Strictly Checking">
          <el-checkbox v-model="formVals.strictCheck"/>
        </el-form-item>
        <el-form-item>
        <el-button :loading="downloadedTemplate" type="primary" @click="downloadTemplate"><el-icon class="form-icon" v-if="!downloadedTemplate"><Download /></el-icon><span class="form-icon-label">Download Template</span></el-button>
        </el-form-item> -->
    <!-- <el-button type="success" @click="onSubmit"
      ><el-icon class="form-icon"><Check size="18" /></el-icon>
      <span class="form-icon-label">test</span></el-button
    > -->
  </el-form>
</template>

<style>
.el-radio__label{
  padding-inline: 8px ;
}
</style>
