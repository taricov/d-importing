<script lang="ts" setup>
import _ from "lodash";
// import { tt } from "../../utils/untils"
import VUpload from "../../components/VUpload/Upload.vue";
import VSelect from "../../components/VSelect/Select.vue";
import VSummary from "../../components/VSummary/Summary.vue";
import VTable from "../../components/VTable/Table.vue";
import VSettingsForm from "../../components/VSettingsForm/SettingsForm.vue";
import { TinvoiceSettings } from "../../@types/types.ts";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const invoiceStats = ref({});
const stepActive = ref(0);
defineProps(["headers", "tableRows"]);

const extractedHeaders = ref<String[]>([]);
const data = ref<any[]>([]);
const mappedCols = ref<String[]>([]);
const extractData = (val) =>{ 
  data.value = val;
  console.log(data.value)

}

const generateInvoiceStats = () =>{
  const count = data.value.length || 0
  const beforeTax = data.value.reduce((acc, curr)=>acc+curr.total, 0) || 0 
  const tax = data.value.reduce((acc, curr)=>acc+curr.total, 0) || 0
  const afterTax = data.value.reduce((acc, curr)=>acc+curr.total, 0) || 0
  invoiceStats.value = {beforeTax, tax, afterTax, count}
}

const extractHeaders = (val) => {
  extractedHeaders.value = val;
  if (extractedHeaders.value.length > 0) {
    stepActive.value = 1;
  }
};
const next = () => {
  if (stepActive.value++ >= 2) {
    return;
  }
};
const previous = () => {
  if (stepActive.value-- <= 0) {
    stepActive.value = 0;
    return;
  }
};
const ready = () => {
  stepActive.value = 3;
  activeName.value = ["preview"];
};
import { Check, Close } from "@element-plus/icons-vue";

const { t, locale } = useI18n();

const activeName = ref<String[]>(["settings", "upload", "import"]);
const invoiceSettings = ref<TinvoiceSettings>({});
const updateMapping = (val) => {

mappedCols.value[val[0]] =  extractedHeaders.value[val[1]]
console.log(mappedCols.value)

}

const tt = (translation) => {
  return _.capitalize(t(translation));
};
</script>

<template>
  <div class="collapse">
    <el-collapse v-model="activeName">
      <el-collapse-item name="settings" :title="tt('invoices.accordion.one')">
        <v-settings-form />
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.two')" name="upload">
        <div>
          <el-steps :active="stepActive" finish-status="success">
            <el-step
              :title="tt('invoices.steps.one')"
              :description="tt('invoices.steps.one_desc')"
            />
            <el-step
              :title="tt('invoices.steps.two')"
              :description="tt('invoices.steps.two_desc')"
            />
            <el-step :title="tt('invoices.steps.three')" />
          </el-steps>
          <!-- Step-based rendered componented -->
          <transition name="el-fade-in">
            <v-upload @headers="extractHeaders" @tableRows="extractData" v-show="stepActive == 0" />
          </transition>
          <transition name="el-fade-in">
          <div>
            <el-row :gutter="10" v-show="stepActive == 1" v-for="(col, i) in extractedHeaders" :key="col">
              <el-col :span="12" style="text-align:center"> {{  col }} </el-col>
              <el-col :span="12" style="text-align:center">
                <v-select @modelValue="updateMapping" :idx="i" />
              </el-col>
            </el-row>
            <!-- <el-table v-show="stepActive == 1"  :data="extractedHeaders" border style="width: 100%">
              <el-table-column label="Original"  />
              <el-table-column label="Mapped" >
              </el-table-column>
            <v-select />
            </el-table> -->
          </div>
          </transition>
          <transition name="el-fade-in">
            <v-summary v-show="stepActive == 2" :invoiceStats="invoiceStats" />
</transition>


          <div>
            <el-button
              :disabled="stepActive === 0"
              style="margin-top: 12px"
              @click="previous"
              >{{ tt("invoices.steps.prev") }}</el-button
            >

            <el-button
              :disabled="stepActive >= 2"
              style="margin-top: 12px"
              @click="next"
              >{{ tt("invoices.steps.next") }}</el-button
            >

            <el-button :disabled="stepActive < 2" style="margin-top: 12px" @click="ready"
              >{{ tt("invoices.steps.fini") }} <el-icon><Arrow /></el-icon
            ></el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.three')" name="preview">
      <v-table  :data="data" :headers="headers"/>
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.four')" name="import">
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
