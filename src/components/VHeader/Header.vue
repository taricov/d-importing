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



// Nav Bar
document.querySelector("#search-icon")?.addEventListener("click", function() {
  if(document.querySelector(".nav")?.classList.contains("search")){

    document.querySelector(".nav")?.classList.add("search");
    document.querySelector(".nav")?.classList.add("search");
    document.querySelector(".nav")?.classList.add("no-search");
    document.querySelector(".search-input")?.classList.add("search-active");
  }else{
    document.querySelector(".nav")?.classList.remove("search");
    document.querySelector(".nav")?.classList.remove("search");
    document.querySelector(".nav")?.classList.remove("no-search");
    document.querySelector(".search-input")?.classList.remove("search-active");

  }
});

document.querySelector('.menu-toggle')?.addEventListener("click", function(){
  const that: any = this;
   if(document.querySelector(".nav")?.classList.contains("mobile-nav")){document.querySelector(".nav")?.classList.add("mobile-nav");
   document.querySelector(that)?.classList.add("is-active");
  }else{
    document.querySelector(".nav")?.classList.add("mobile-nav");
   document.querySelector(that)?.classList.add("is-active");
  }
});

</script>

<template>

<div class="page-wrapper">
 <div class="nav-wrapper">
  <div class="grad-bar"></div>
  <nav class="navbar">
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png" alt="Company Logo">
    <div class="menu-toggle" id="mobile-menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <ul class="nav no-search">
      <li class="nav-item import-page">
      <!-- <a href="#">Import Now</a> -->
      <router-link to="/">Import Now</router-link>
      </li>
      <li class="nav-item">
      <!-- <a href="#">How To Use</a> -->
      <router-link to="/how-to-use">How To Use</router-link>
      
      </li>
      <li class="nav-item">
      <!-- <a href="#">Appearance</a> -->
      <router-link to="/appearance">Appearance</router-link>
      
      </li>
      <li class="nav-item">
      <!-- <a href="#">About This</a> -->
      <router-link to="/about">About</router-link>
      
      </li>
      <!-- <i class="fas fa-search" id="search-icon"></i>
      <input class="search-input" type="text" placeholder="Search.."> -->
    </ul>
  </nav>
  </div>
</div>
  <!-- <div>
    <el-link href="https://element-plus.org" target="_blank">default</el-link>
    <el-link type="primary">primary</el-link>
    <el-link type="success">success</el-link>
    <el-link type="warning">warning</el-link>
    <el-link type="danger">danger</el-link>
    <el-link type="info">info</el-link>
  </div> -->
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

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', 'Arial', sans-serif;
}

/* HEADINGS */

h1, p {
  color: #fff;
  text-align: center;
  line-height: 1.4;
}

h1 {
  font-size: 2.2rem;
}

h2 {
  color: #000;
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 10px;
}

/* BASIC SETUP */

.page-wrapper {
  width: 100%;
  height: auto;
}

.nav-wrapper {
  width: 100%;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  /* background-color: #fff; */
  border-bottom: .5px solid;

}

.grad-bar {
  width: 100%;
  height: 5px;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  background-size: 400% 400%;
  	-webkit-animation: gradbar 15s ease infinite;
	-moz-animation: gradbar 15s ease infinite;
	animation: gradbar 15s ease infinite;
}

/* NAVIGATION */

.navbar {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  height: 50px;
  overflow: hidden;
}

.navbar img {
  height: 16px;
  width: auto;
  justify-self: start;
  margin-left: 20px;
}

.navbar ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  justify-self: end;
  gap: 20px; 
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item a {
  /* color: #000; */
  font-size: 0.85rem;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.3s ease-out;
}
.nav-item.import-page a {
  color: #fff;
}
.nav-item.import-page a:hover {
  color: #ffffffa3;
}

.import-page{
  background-color: #23A6D5 ;
  padding:2px 4px;
  border-radius: 3px;
  /* margin-bottom: 2px; */
}
/* .rtl nav > ul > li > a{
  color: #3498db;
}
.rtl .nav-item > a:hover{
  color: #ffffffa3;
} */

.nav-item a:hover {
  color: #3498db;
}

/* SECTIONS */

.headline {
  width: 100%;
  height: 50vh;
  min-height: 350px;
  background: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1435224668334-0f82ec57b605?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.features {
  width: 100%;
  height: auto;
  background-color: #f1f1f1;
  display: flex;
  padding: 50px 20px;
  justify-content: space-around;
}

.feature-container {
  flex-basis: 30%;
  margin-top: 10px;
}

.feature-container p {
  color: #000;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 15px;
}

.feature-container img {
  width: 100%;
  margin-bottom: 15px;
}


/* MOBILE MENU & ANIMATION */

.menu-toggle .bar{
  width: 25px;
  height: 3px;
  background-color: #3f3f3f;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.menu-toggle {
  justify-self: end;
  margin-right: 25px;
  display: none;
}

.menu-toggle:hover{
  cursor: pointer;
}

#mobile-menu.is-active .bar:nth-child(2){
  opacity: 0;
}

#mobile-menu.is-active .bar:nth-child(1){
  -webkit-transform: translateY(8px) rotate(45deg);
  -ms-transform: translateY(8px) rotate(45deg);
  -o-transform: translateY(8px) rotate(45deg);
  transform: translateY(8px) rotate(45deg);
}

#mobile-menu.is-active .bar:nth-child(3){
  -webkit-transform: translateY(-8px) rotate(-45deg);
  -ms-transform: translateY(-8px) rotate(-45deg);
  -o-transform: translateY(-8px) rotate(-45deg);
  transform: translateY(-8px) rotate(-45deg);
}

/* KEYFRAME ANIMATIONS */

@-webkit-keyframes gradbar {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@-moz-keyframes gradbar {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@keyframes gradbar {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

/* Media Queries */

  /* Mobile Devices - Phones/Tablets */

@media only screen and (max-width: 720px) { 
  .features {
    flex-direction: column;
    padding: 50px;
  }
  
  /* MOBILE HEADINGS */
  
  h1 {
    font-size: 1.9rem;
  }
  
  h2 {
    font-size: 1rem;
  }
  
  p {
    font-size: 0.8rem;
  }
  
  /* MOBILE NAVIGATION */
     
  .navbar ul {
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: start;
    top: 55px;
    background-color: #fff;
    width: 100%;
    height: calc(100vh - 55px);
    transform: translate(-101%);
    text-align: center;
    overflow: hidden;
  }
  
  .navbar li {
    padding: 15px;
  }
  
  .navbar li:first-child {
    margin-top: 50px;
  }
  
  .navbar li a {
    font-size: 1rem;
  }
   
  .menu-toggle, .bar {
    display: block;
    cursor: pointer;
  }
  
  .mobile-nav {
  transform: translate(0%)!important;
}
  
  /* SECTIONS */
  
  .headline {
    height: 20vh;
  }
    
  .feature-container p {
    margin-bottom: 25px;
  }
  
  .feature-container {
    margin-top: 20px;
  }
  
  .feature-container:nth-child(2) {
    order: -1;
  }
  
  /* SEARCH DISABLED ON MOBILE */
  
  #search-icon {
    display: none;
  }
  
  .search-input {
  display: none;
 }
  
}
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
