<script lang="ts" setup>
import _ from "lodash";
// import { ElNotification } from 'element-plus'
import { ref, onBeforeMount } from "vue";
// const alertConfirm = ref<Boolean>(true)
import VUpload from "../../components/VUpload/Upload.vue";
// import VSelect from "../../components/VSelect/Select.vue";
import VSummary from "../../components/VSummary/Summary.vue";
import VTable from "../../components/VTable/Table.vue";
import VSettingsForm from "../../components/VSettingsForm/SettingsForm.vue";
import VColumnMapping from "../../components/VColumnMapping/ColumnMapping.vue";
//@ts-ignore
import { Tcredentials, TinvoiceSettings } from "../../@types/types.ts";
import { convertDate, Summarycalc } from "../../utils/untils";
import { APIrequest } from "../../api";
import { credentials } from "../../api/common";
import { useI18n } from "vue-i18n";
const allProducts = ref<{[key: string]: any}>({});
const allClients = ref<{[key: string]: any}>({});
const allBranches = ref({});
const allTaxes = ref({});
const importing = ref<Boolean>(false);
const importingComplete = ref<Boolean>(false);
const successImport = ref<Boolean>(false);
const completedInvoices = ref<Number>(0);

const downloading = ref<Boolean>(false);
const isCleared = ref<Boolean>(false);
const invoiceStats = ref({});
const stepActive = ref(0);
defineProps(["headers", "tableRows"]);
const extractedHeaders = ref<String[]>([]);
const data = ref<any[]>([]);
// const mappedCols = ref<String[]>([]);

const extractData = (val: any[]) => {
  data.value = val;
  if (data.value.length > 0) {
    console.log(data.value);
    (invoiceStats.value = {
      count: data.value.length,
      paidCount: data.value.filter(
        (d) => Object.values(d)[11] !== "" && Object.values(d)[11] !== 0
      ).length,
      beforeTax: Summarycalc(data.value, 9) - Summarycalc(data.value, 9) * 0.15,
      afterTax: Summarycalc(data.value, 9),
      paid: Summarycalc(data.value, 11),
      tax: Summarycalc(data.value, 9) * 0.15,
    }),
      (stepActive.value = 1);
  }
};

const thisIs = ref(null);
const createdInvoices = ref<Number[]>([]);

onBeforeMount(async () => {
  Promise.all(
    ["/clients", "/products", "/branches", "/taxes"].map(async (req) => {
      const res = await APIrequest(credentials, "GET", "v1", req, null);
      return await res.json();
    })
  )
    .then((data) => {
      allTaxes.value = data[3].data.map((d: any) => ({
        [d.Tax.id]: {
          id: d.Tax.id,
          name: d.Tax.name,
          included: d.Tax.included,
          value: d.Tax.value,
        },
      }));

      const branchesArr = data[2].data.map((d: any) => ({
        [d.Branch.code]: d.Branch.id,
      }));
      allBranches.value = Object.entries(branchesArr).reduce(
        (p, [_, v]) => ({ ...p, [Object.keys(v as any)[0]]: Object.values(v as any)[0] }),
        {}
      );

      const productsArr = data[1].data.map((d: any) => ({
        [d.Product.product_code]: d.Product.id,
      }));
      allProducts.value = Object.entries(productsArr).reduce(
        (p, [_, v]) => ({ ...p, [Object.keys(v as any)[0]]: Object.values(v as any)[0] }),
        {}
      );

      const clientsArr = data[0].data.map((d: any) => ({
        [d.Client.client_number]: d.Client.id,
      }));
      allClients.value = Object.entries(clientsArr).reduce(
        (p, [_, v]) => ({ ...p, [Object.keys(v as any)[0]]: Object.values(v as any)[0] }),
        {}
      );
    })
    .then(() =>
      console.log(allClients.value, allProducts.value, allBranches.value, allTaxes.value)
    );

  // console.log(branches)
  // GETallClients(credentials);
  // GETallBranches(credentials);
  // GETallProducts(credentials);
  // console.log(allClients.value, allProducts.value, allBranches.value);
});

const onDownloadInvoices = async() => {
  downloading.value = true;
  console.log(downloading.value, "b4")
  for(let i=0;i < createdInvoices.value.length;i++){ 
            const url = `https://taricov.daftra.com/owner/invoices/view/${createdInvoices.value[i]}.pdf`
            window.open(url);
          }
  downloading.value = false;
  console.log(downloading.value, "after")
};
const onReset = () => {
  data.value = [{}];
  importingComplete.value = false;
  activeName.value = ["settings"];
  completedInvoices.value = 0;
  stepActive.value = 0;
  isCleared.value = true;
  setTimeout(() => {
    isCleared.value = false;
  }, 1000);
};
const onImport = async () => {
  importing.value = true;
  console.log(thisIs, thisIs.value);

  for (let invoice of data.value) {
    const inv:{[key: string]: any} = Object.values(invoice);
    const invoiceDate = convertDate(inv[0]);
    const paymentDate = convertDate(inv[12]);
    completedInvoices.value = +completedInvoices.value + 1;
    const d: any = {
      Invoice: {
        draft: 1,
        client_id: allClients.value[inv[1]] || 41,
        business_name: inv[2],
        address1: inv[3],
        phone1: inv[5],
        bn1: inv[4],
        client_email: "cutsomer@email.com",
        branch_id: inv[14],
        notes: inv[15],
        date: invoiceDate,
      },
      InvoiceItem: [
        {
          item: allProducts.value[inv[7]] || inv[7],
          description: inv[8],
          unit_price: inv[9] as number / 1.15,
          quantity: 1,
          tax1: 1,
          product_id: inv[6],
          discount: inv[10],
          discount_type: "2",
          Product: {
            id: inv[6],
          },
        },
      ],
      Payment: [
        {
          payment_method: "cash",
          amount: inv[11],
          date: paymentDate,
          treasury_id: inv[13],
        },
      ],
    };
    console.log(completedInvoices.value, d);
    const res = await APIrequest(credentials, "POST", "v1", "/invoices", d);
    const result = await res.json();
    console.log(result);
    createdInvoices.value = [...createdInvoices.value, result.id];
    console.log(createdInvoices.value);
    if (completedInvoices.value === data.value.length) {
      importing.value = false;
      successImport.value = true;
      importingComplete.value = true;
      setTimeout(() => (successImport.value = false), 2000);
    }
    // const newLink = `<a href="https://exapem.daftra.com/owner/invoices/view/${createdInvoices.value.slice(
    //   -1
    // )}.pdf"></a>`;
    // document.querySelector(".inv-links")?.insertAdjacentHTML("beforeend", newLink);
  }
};
const extractHeaders = (val: any) => {
  extractedHeaders.value = val;
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
const goToImport = () => {
  activeName.value = ["import"];
};
const goToUpload = (clicked: boolean) => {
  console.log("clicked,", clicked);
  if (clicked) activeName.value = ["upload"];
};

// import { Check, Close } from "@element-plus/icons-vue";

const { t } = useI18n();

const activeName = ref<String[]>(["settings"]);
const invoiceSettings = ref<TinvoiceSettings>({});
const columnMapping = ref<TinvoiceSettings>({});
// const updateMapping = (val) => {

// mappedCols.value[val[0]] =  extractedHeaders.value[val[1]]
// console.log(mappedCols.value)

// }

const receiveInvoiceSettings = (val: { [key: string]: string }) =>
  (invoiceSettings.value = val);
const receiveColumnMapping = (val: any[]) => (columnMapping.value = val);

const tt = (translation: string) => {
  return _.upperFirst(t(translation));
};

//Notifications:

// const notifySuccess = (type:string='Success',msg:string) => {
//   ElNotification({
//     title: _.capitalize(type),
//     message: msg,
//     type,
//     position: 'bottom-left',
//   })
// }
</script>

<template>
  <div class="inv-links" v-show="false"></div>
  <div v-if="false" ref="thisIs"></div>
  <div class="collapse">
    <el-collapse v-model="activeName">
      <el-collapse-item name="settings" :title="tt('invoices.accordion.one')">
        <v-settings-form @next-phase="goToUpload" @form-data="receiveInvoiceSettings" />
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
            <v-upload
              :isCleared="isCleared"
              @headers="extractHeaders"
              @tableRows="extractData"
              v-show="stepActive == 0"
            />
          </transition>
          <transition name="el-fade-in">
            <div v-show="stepActive == 1" style="ma rgin-inline:auto;width:60%">
              <v-column-mapping
                @formData="receiveColumnMapping"
                :headers="extractedHeaders"
              />

              <!-- <el-row :gutter="10" style="margin-bottom:10px;justify-content: space-between;" >
              <el-col :span="6" style="text-align:flex-start">
              Select Primary Column (Only one allowed)
               </el-col>
              <el-col :span="6" style="text-align:flex-end">
                Select Mapped Column
              </el-col>
            </el-row>
            <el-row v-for="(col, i) in extractedHeaders" :key="col" :gutter="10" style="margin-bottom:2px;justify-content: space-between;">
              <el-col :span="6" style="text-align:flex-start">
                <el-radio-group v-model="primaryCol">
      <el-radio :label="i" border> {{ col }}</el-radio>
      </el-radio-group>
               </el-col>
              <el-col :span="6" style="text-align:flex-end">
                <v-select @modelValue="updateMapping" :idx="i" />
              </el-col>
            </el-row> -->
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
              ><span style="margin-inline: 2px">{{ tt("invoices.steps.fini") }}</span>
              <el-icon size="12"><ArrowRightBold /></el-icon
            ></el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.three')" name="preview">
        <el-button v-if="data.length > 2" type="success" @click="goToImport"
          ><el-icon class="form-icon"><Check size="18" /></el-icon>
          <span class="form-icon-label">{{
            tt("invoices.preview.good")
          }}</span></el-button
        >

        <!-- <div class="no-preview" v-if="!extractedHeaders.length">Preview Will be available once you upload your file.</div> -->
        <v-table :data="data" />
        <!-- <div  v-if="data.length > 2">
        </div> -->
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.four')" name="import">
        <el-row>
          <el-col align="center">
            <p class="import-quest" v-if="!importingComplete">
              {{ tt('invoices.import.importQuest') }}
            </p>
            <div style="display: flex; justify-content: center">
              <br />
              <el-button
                :disabled="data.length < 2"
                v-if="!importingComplete"
                :loading="importing"
                style="margin: 20px auto 0; width: 50%"
                @click="onImport"
                type="success">
                {{ tt("invoices.import.import") }}
                </el-button>
              <el-button
                v-if="importingComplete"
                style=""
                :disabled="!createdInvoices.length"
                :loading="downloading"
                @click="onDownloadInvoices"
                type="primary"
              >
                <el-icon style="padding-inline: 3px">
                  <Download /> </el-icon
                >{{ tt("invoices.import.download") }}</el-button
              >
              <el-button
                v-if="importingComplete"
                style=""
                @click="onReset"
                type="danger"
                >{{ tt("invoices.import.reset") }}</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col align="center" v-if="importing">
            <el-statistic
              style="color: var(--el-color-success)"
              :value="completedInvoices"
            >
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  {{ tt('invoices.import.importing') }}
                </div>
              </template>
              <template #suffix>/{{ data.length }}</template>
            </el-statistic>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
  <Teleport to="body" v-if="successImport">
    <div class="check-mark">
      <div style="padding: 20px 10% 40px;background:rgba(255,255,255,.9);border-radius:4px">
      <div>
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
      </div>
      <div style="color: var(--el-color-success)" class="import-quest">{{ tt('invoices.import.successMsg') }}</div>
    </div>
    </div>
  </Teleport>
  <!-- Alert Confirm -->
  <!-- <el-dialog
    v-model="alertConfirm"
    title="Confirm"
    width="500"
    align-center
  >
    <span>This is the last checking before sending the invoices to Daftra ERP .. All set?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="alertConfirm = false">Cancel</el-button>
        <el-button type="primary" @click="alertConfirm = false">
          Send Invoices
        </el-button>
      </div>
    </template>
  </el-dialog> -->
</template>
<style>
/* .el-collapse-item[name='import'] > div > .el-collapse-item__content{
  
  display:flex;
  justify-content:center;
} */
.import-quest {
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0 0;
  text-align: center;
  /* color: rgba(0, 0, 0, 0.7); */
}
.check-mark {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-steps {
  padding: 0 0 20px;
}
.el-tabs__content {
  padding: 0px !important;
}
.el-collapse-item__header {
  background-color: #1685c8;
  color: #fff;
  border-radius: 3px;
  padding: 0 15px;
}
.el-collapse-item__content {
  padding: 15px;
  background-color: #9ec3d930;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
</style>
