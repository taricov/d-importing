<script lang="ts" setup>
import { reactive, ref } from "vue";
import _ from "lodash";
import { useI18n } from "vue-i18n";
import VPopover from "../VPopover/Popover.vue";
const { t, locale } = useI18n();

const tt = (translation: string) => {
  return _.capitalize(t(translation));
};

const enPaymentConditions = [{condition: 'Payment Amount = Invoice Total',status: 'Fully Paid'},{condition: 'Payment Amount > Invoice Total',status: 'Partially Paid'},{condition: 'Payment Amount = 0',status: 'Not Paid'}]
const arPaymentConditions = [{condition: 'المبلغ المدفوع = إجمالي الفاتورة',status: 'مدفوعة كليًا'},{condition: 'المبلغ المدفوع < إجمالي الفاتورة',status: 'مدفوعة جزئيًا'},{condition: 'المبلغ المدفوع = 0',status: 'غير مدفوعة'}]
const paymentConditions = ref(locale.value === "en" ? enPaymentConditions : arPaymentConditions)


const emits = defineEmits(["formData", "nextPhase"]);
const downloadedTemplate = ref<Boolean>(false);
const downloading = ref<Boolean>(false);
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
  emits("formData", formVals);
  emits("nextPhase", downloadTemplate);
};
const downloadTemplate = () => {
  console.log("dwonloading...");
  downloading.value = true;
  downloadedTemplate.value = true;
  setTimeout(() => {
    downloading.value = false;
  }, 1500);
};
</script>

<template>
  <el-form :model="formVals">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="tt('invoices.settings.mult')">
          <template #label>
            {{ tt("invoices.settings.mult") }}
            <v-popover type="info">
              <template #main>
                {{ tt("invoices.tips.pay1") }}
              </template>
              <template #extended>
                {{ tt("invoices.tips.mult") }}
              </template>
            </v-popover>
          </template>
          <el-switch disabled v-model="formVals.mulipleItems" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="tt('invoices.settings.totDis')">
          <el-switch v-model="formVals.discountTotal" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="tt('invoices.settings.itmDis')">
          <el-switch v-model="formVals.discountItem" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="tt('invoices.settings.pay')">
          <template #label>
            {{ tt("invoices.settings.pay") }}
            <v-popover type="info">
              <template #main>
                {{ tt("invoices.tips.pay1") }}
              </template>
              <template #extended>
                <el-table style="width: 100%;font-size:small"  :data="paymentConditions" border>
                  <el-table-column  prop="condition" :label="locale === 'en' ? 'Condition' : 'في حالة'" width="220" />
                  <el-table-column  prop="status" :label="locale === 'en' ? 'Status':'حالة الفاتورة'" />
                </el-table>
              </template>
            </v-popover>
          </template>
          <el-switch v-model="formVals.allowPaid" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="tt('invoices.settings.custom')">
          <template #label>
            {{ tt("invoices.settings.custom") }}
            <v-popover type="why">
              <template #main>
                {{ tt("invoices.tips.custom") }}
              </template>
            </v-popover>
          </template>
          <el-switch disabled v-model="formVals.customFields" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="tt('invoices.settings.tax')">
          <el-switch v-model="formVals.taxMode" />
          <div class="sub">
            ({{
              formVals.taxMode ? tt("invoices.settings.inc") : tt("invoices.settings.ex")
            }})
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <el-form-item :label="tt('invoices.settings.mult')Strictly Checking">
          <el-checkbox v-model="formVals.strictCheck" />
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-form-item :label="tt('invoices.settings.strict')">
      <el-checkbox v-model="formVals.strictCheck" />
    </el-form-item>
    <el-form-item>
      <div>
        <el-tooltip :content="tt('invoices.settings.download')" placement="top-start">
          <el-button :loading="downloading" type="primary" @click="downloadTemplate"
            ><a style="color: #fff" href="../../../public/assets/template.xlsx" download
              ><el-icon v-if="!downloading" class="form-icon"><Download /></el-icon></a
          ></el-button>
        </el-tooltip>

        <el-button style="margin-inline: 3px" type="success" @click="onSubmit"
          ><el-icon class="form-icon"><Check size="18" /></el-icon>
          <span class="form-icon-label">{{
            t("invoices.settings.next")
          }}</span></el-button
        >
        <el-button type="primary"
          ><span class="form-icon-label" @click="onSubmit">{{
            tt("invoices.settings.skip")
          }}</span></el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<style>
.form-icon-label {
  margin-inline: 3px;
}
.el-form-item__label {
  line-height: 13px !important;
  align-items: center;
  width: 30%;
  justify-content: start !important;
}
.el-form-item__label:last-child {
  background-color: red;
}

.el-form-item {
  margin-bottom: 0 !important;
}
.sub {
  font-size: 9px;
  margin: 0 3px -10px;
  font-style: italic;
}
.hint {
  margin-bottom: 10px;
}
.el-table__cell{
  padding: 3px 0 !important;
}
</style>
