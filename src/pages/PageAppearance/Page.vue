<script lang="ts" setup>
import { ref } from "vue";
// @ts-ignore
import _ from "lodash";
const emit = defineEmits(["currentMode", "currentLanguage"]);
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();


const tt = (translation: string) => {
  return _.capitalize(t(translation));
};

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
    <el-row>
        <el-col style="text-align:center !important;" :span="24">
  <!-- Lang. switcher -->
  <el-switch
  name="lang"
    @change="toggleLang"
    :value="isEnglish"
    class="mx-2"
    style="margin-inline:10px !important"
    :active-text="tt('pageAppearance.en')"
    :inactive-text="tt('pageAppearance.ar')"
  />
  <!-- <el-button mb-2 @click="toggleLang">{{ _.capitalize(language) }}</el-button> -->
</el-col>
    </el-row>
    <el-row>
        <el-col style="text-align:center !important;" :span="24">
  <!-- Dark switcher -->
  <el-switch
    @change="toggleDark"
    :value="isDark"
    class="m-2"
    :active-text="tt('pageAppearance.dark')"
    :inactive-text="tt('pageAppearance.light')"
  >
  <template #inactive-action>
    <el-icon><Sunny /></el-icon>
  </template>
  <template #active-action>
    <el-icon><Moon /></el-icon>
  </template>
  </el-switch>
  <!-- <el-button mb-2 @click="toggleDark">
    {{ _.capitalize(currentMode) }}
    &nbsp;<el-icon><Sunny v-if="!isDark" /> <Moon v-if="isDark" /></el-icon>
  </el-button> -->
</el-col>
    </el-row>

</template>
<style>

</style>