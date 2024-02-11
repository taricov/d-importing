<script setup lang="ts">
import { ref, watch } from "vue";
import _ from "lodash";
import { read, utils } from "xlsx";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const tt = (translation: string) => {
  return _.capitalize(t(translation));
};

const emits = defineEmits();
const props = defineProps(["isCleared"]);
const fileList = ref<UploadUserFile[]>([]);
const headers = ref<String[]>([]);

const onUploadingFile: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  fileList.value = [...fileList.value, uploadFile];
  uploadFiles.map(async (f) => {
    const raw = await f.raw?.arrayBuffer();
    const parsed = await read(raw);
    const sheet = parsed.Sheets[parsed.SheetNames[0]];
    const json = await utils.sheet_to_json(sheet, { defval: "" });
    json.forEach(function (v: any) {
      delete v.__EMPTY;
    });

    headers.value = Object.entries(json[0]!).map(([k, _]) => k);
    //  data.value = json.slice(1, json.length)
    emits("headers", headers.value);
    emits("tableRows", json);
  });
};
watch(()=>props.isCleared, (n, o) => {
  if (props.isCleared) {
    console.log("isCleared", props.isCleared, n, o);
    fileList.value = [];
  }
});
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    @change="onUploadingFile"
    action="#"
    :limit="1"
    class="upload-input"
    method="#"
    drag
    multiple
    accept=".xlsx, .xls, .csv"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      {{ tt("invoices.upload.txt1") }} <em>{{ tt("invoices.upload.txt2") }}</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        <div>
          {{ tt("invoices.upload.tip") }}
        </div>
        <div style="line-height: 0.4">
          <em style="font-size: 10px; color: var(--el-color-info)"
            >(Only 1 file is Allowed, new file will override the old file)</em
          >
        </div>
      </div>
    </template>
  </el-upload>
</template>
