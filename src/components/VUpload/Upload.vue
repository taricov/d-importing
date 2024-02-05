<script setup lang="ts">
import { ref } from "vue"
import { read, utils, writeFile } from 'xlsx';
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'


const fileList = ref<UploadUserFile[]>([])

const onUploadingFile: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList.value = [...fileList.value, uploadFile]
  uploadFiles.map(async f=>{
    const raw = await f.raw?.arrayBuffer();
    const parsed = await read(raw);
    const sheet = parsed.Sheets[parsed.SheetNames[0]]
    const json = await utils.sheet_to_json(sheet)
    console.log(json)


  })
}

</script>

<template>
  <el-upload
  v-model:file-list="fileList"
  @change="onUploadingFile"
  action="#"
    class="upload-input"
    method="#"
    drag
    multiple
    accept=".xlsx, .xls, .csv"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        Upload only .xlsx/.csv files
      </div>
    </template>
  </el-upload>
</template>