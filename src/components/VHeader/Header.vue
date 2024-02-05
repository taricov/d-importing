<script setup lang="ts">
import { computed, ref } from "vue";
import _ from "lodash";
import ar from "element-plus/dist/locale/ar.mjs";
import en from "element-plus/dist/locale/en.mjs";
const emit = defineEmits(["currentMode", "currentLanguage"])

// DarkMode:
const isDark = ref<Boolean>(false);
const currentMode = ref<String>("light");
const toggleDark = () =>{
  isDark.value = !isDark.value
  currentMode.value = isDark.value === false ? 'light' : 'dark'
  if(currentMode.value === "dark"){
    document.documentElement.classList.add("dark")
  }else{
    document.documentElement.classList.remove("dark")
    
  }
  emit("currentMode", currentMode.value);
  }

//Language:
const language = ref("en");
const locale = computed(() => (language.value === "ar" ? ar : en));
const toggleLang = () => {
  language.value = language.value === "ar" ? "en" : "ar";
  emit("currentLanguage", language.value);

};
</script>

<template>
  <!-- Lang. switcher -->
  <el-button mb-2 @click="toggleLang">{{ _.capitalize(language) }}</el-button>
  <!-- Dark switcher -->
  <el-button mb-2 @click="toggleDark">
  {{ _.capitalize(currentMode) }}
  &nbsp;<el-icon><Sunny  v-if="!isDark"/> <Moon v-if="isDark"/></el-icon>
    </el-button
  >

  <v-dark-mode />
  <v-language-button />
</template>
