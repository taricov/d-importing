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
import { Tcredentials, TinvoiceSettings } from "../../@types/types.ts";
import { convertDate } from "../../utils/untils";
import { APIrequest } from "../../api";
import { credentials } from "../../api/common";
import { useI18n } from "vue-i18n";
const allProducts = ref({});
const allClients = ref({});
const allBranches = ref({});
const paymentsGateWays = ref(["cash", "cheque", "bank", "paytabs", "cash_on_delivery"]);

const invoiceStats = ref({});
const stepActive = ref(0);
defineProps(["headers", "tableRows"]);
const extractedHeaders = ref<String[]>([]);
const data = ref<any[]>([]);
// const mappedCols = ref<String[]>([]);

const Summarycalc = (idx:number) =>{
  return data.value.reduce((acc, curr)=>acc+Object.values(curr)[idx],0)
}
const extractData = (val: any[]) => {
  data.value = val;
  if (data.value.length > 0) {
    console.log(data.value)
    invoiceStats.value = {
      count: data.value.length, 
      paidCount: data.value.filter((d) =>Object.values(d)[6] !== null && Object.values(d)[6] !== 0).length,
      beforeTax: Summarycalc(5)-(Summarycalc(5)*0.15),
        afterTax: Summarycalc(5),
        paid: Summarycalc(6),
        tax: Summarycalc(5)*0.15,
      },
      console.log(invoiceStats.value);
      // data.value.map((d) => {
//       const eachInv = Object.values(d)[0];
//       console.log(typeof eachInv);
//     });
    stepActive.value = 1;
  }
};



// GET All Clients:
const GETallClients = async (credentials: Tcredentials) => {
  const res = await fetch(
    `https://${credentials.subdomain}.daftra.com/api2/clients?limit=2000`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: credentials.apikey,
      },
    }
  );
  const clients = await res.json();
  const clientsArr = clients.data.map((client:any) => ({
    [client.Client.client_number]: client.Client.id,
  }));

  allClients.value = Object.entries(clientsArr).reduce(
    (p, [k, v]) => ({ ...p, [Object.keys(v)[0]]: Object.values(v)[0] }),
    {}
  );
};
// GET All Products:
const GETallProducts = async(credentials: Tcredentials) => {
  const res = await fetch(
    `https://${credentials.subdomain}.daftra.com/api2/products?limit=2000`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: credentials.apikey,
      },
    }
  );
  const products = await res.json();
  const productsArr = products.data.map((prod) => ({
    [prod.Product.product_code]: prod.Product.id,
  }));
  allProducts.value = Object.entries(productsArr).reduce(
    (p, [k, v]) => ({ ...p, [Object.keys(v)[0]]: Object.values(v)[0] }),
    {}
  );

}
// GET All Branches:
const GETallBranches = async(credentials: Tcredentials) => {
  const res = await fetch(
    `https://${credentials.subdomain}.daftra.com/api2/branches?limit=100`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: credentials.apikey,
      },
    }
  );
  const branches = await res.json();
  const branchesArr = branches.data.map((bran) => ({
    [bran.Branch.code]: bran.Branch.id,
  }));
  allBranches.value = Object.entries(branchesArr).reduce(
    (p, [k, v]) => ({ ...p, [Object.keys(v)[0]]: Object.values(v)[0] }),
    {}
  );

}

onBeforeMount(async() => {
  // const branches = await APIrequest(creds=credentials, key="/branches")
  // console.log(branches)
  // GETallClients(credentials);
  // GETallBranches(credentials);
  // GETallProducts(credentials);
  // console.log(allClients.value, allProducts.value, allBranches.value);
});

const onImport = async () => {
  let count = 0;
  for (let invoice of data.value) {
    const inv = Object.values(invoice);
    console.log(typeof inv[0], inv);
    const invoiceDate = convertDate(inv[0]);
    count++;

    const d: any = {
      Invoice: {
        draft: 1,
        "client_id": allClients[inv[1]],
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
          // "item": allProducts[inv[7]] || inv[7],
          description: inv[8],
          unit_price: inv[9] / 1.15,
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
          date: inv[12],
          treasury_id: inv[13],
        },
      ],
    };
    console.log(count, d);
  }
  // const res = await APIrequest({ ...credentials }, "POST", "v1", "/invoices", data.value);
  // const res = await APIrequest(,method= "POST", d= data.value)
  // console.log(res);
};

// const generateInvoiceStats = () =>{
//   const count = data.value.length || 0
//   const beforeTax = data.value.reduce((acc, curr)=>acc+curr.total, 0) || 0
//   const tax = data.value.reduce((acc, curr)=>acc+curr.total, 0) || 0
//   const afterTax = data.value.reduce((acc, curr)=>acc+curr.total, 0) || 0
//   invoiceStats.value = {beforeTax, tax, afterTax, count}
// }

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

const activeName = ref<String[]>(["settings", "upload", "import"]);
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
  return _.capitalize(t(translation));
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
        <el-button type="success" @click="goToImport"
          ><el-icon class="form-icon"><Check size="18" /></el-icon>
          <span class="form-icon-label">{{
            tt("invoices.preview.good")
          }}</span></el-button
        >
        <v-table :data="data" />
      </el-collapse-item>
      <el-collapse-item :title="tt('invoices.accordion.four')" name="import">
        <div>sf</div>
        <div style="text-align: center">
          <el-button
            style="margin: 20px auto 0; width: 50%"
            @click="onImport"
            type="success"
            >{{ tt("invoices.import.import") }}</el-button
          >
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

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
</style>
