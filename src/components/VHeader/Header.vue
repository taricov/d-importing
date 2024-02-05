<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import _ from "lodash";
const emit = defineEmits(["currentMode", "currentLanguage"]);
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// DarkMode:
const isDark = ref<Boolean>(false);
const currentMode = ref<String>("light");
const toggleDark = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  currentMode.value = isDark.value ? "dark" : "light";
  // emit("currentMode", currentMode.value);
};

//Language:
const isEnglish = ref<Boolean>(true);
// const locale = ref<String>("en");
const language = ref<String>("en");
const toggleLang = () => {
  isEnglish.value = !isEnglish.value;
  language.value = isEnglish.value ? "en" : "عربي";
  locale.value = isEnglish.value ? "en" : "ar";
  emit("currentLanguage", locale.value);

  document.querySelector("body")!.classList.toggle("rtl");
  if (!isEnglish.value) {
    document.querySelector("body")!.setAttribute("dir", "rtl");
  } else {
    document.querySelector("body")!.removeAttribute("dir");
  }
};
</script>

<template>
  <!-- Lang. switcher -->
  <el-button mb-2 @click="toggleLang">{{ _.capitalize(language) }}</el-button>
  <!-- Dark switcher -->
  <el-button mb-2 @click="toggleDark">
    {{ _.capitalize(currentMode) }}
    &nbsp;<el-icon><Sunny v-if="!isDark" /> <Moon v-if="isDark" /></el-icon>
  </el-button>

  <v-dark-mode />
  <v-language-button />
</template>
