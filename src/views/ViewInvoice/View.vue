<script lang="ts" setup>
import { ref } from "vue";
const active = ref(0);
const next = () => {
  if (active.value++ > 2) active.value = 0;
};


const activeName = ref("1");

</script>

<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="Settings" name="1">
       
      </el-collapse-item>
      <el-collapse-item title="Import" name="2">
        <div>
          <el-steps :active="active" finish-status="success">
            <el-step title="Step 1" />
            <el-step title="Step 2" />
            <el-step title="Step 3" />
          </el-steps>

          <el-button style="margin-top: 12px" @click="next">Next step</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the users can
          quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps the users
          to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
