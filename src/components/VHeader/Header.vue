<script setup lang="ts">
import { ref, reactive } from "vue";
import _ from "lodash";
import { useI18n } from "vue-i18n";
import type { FormInstance } from 'element-plus'
import { GetSiteInfo } from "../../utils/daftar-api"
import { useStorage } from '@vueuse/core'

const isRegistered = ref(JSON.parse(localStorage.getItem('credentials') || "{}"))
const errors = ref({isBlank: false, blank: "The subdomain and API key fields can NOT be empty.", isNotOk: false, notOk: "Either the Subdomain or the API Key is invalid. Please, double check your credentials."})
const { t } = useI18n();

const tt = (translation: string) => {
  return _.capitalize(t(translation));
};
const formRef = ref<FormInstance>()


// Nav Bar

// document.querySelector('.menu-toggle')?.addEventListener("click", function(){
//   const that = this ;
//    if(document.querySelector(".nav")?.classList.contains("mobile-nav")){document.querySelector(".nav")?.classList.add("mobile-nav");
//    document.querySelector(that)?.classList.add("is-active");
//   }else{
//     document.querySelector(".nav")?.classList.add("mobile-nav");
//    document.querySelector(that)?.classList.add("is-active");
//   }
// });



const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const siteInfo = ref<any>()
const form = reactive({
  subdomain: isRegistered.value.subdomain,
  apikey: isRegistered.value.apikey,
})


const resetForm = (formEl: FormInstance | undefined) => {
  errors.value = {...errors.value, isBlank: false, isNotOk: false}
  if (!formEl) return
  formEl.resetFields()
  localStorage.clear()
  isRegistered.value = {}
  form.subdomain = ""
  form.apikey = ""
}
const GETconnect = async() => {
  errors.value = {...errors.value, isBlank: false, isNotOk: false}
  localStorage.clear()
  if(form.subdomain === undefined || form.apikey === undefined){
    errors.value = {...errors.value, isBlank: true}
    console.log(form)
  return
}
const res = await GetSiteInfo(form.subdomain, form.apikey)
if(!res.ok){
  errors.value = {...errors.value, isNotOk: true}
return
}
const info = await res.json()
console.log(res)
  siteInfo.value = info.data.Site
  useStorage("credentials", { "subdomain": form.subdomain, "apikey": form.apikey, "name": siteInfo.value.first_name + " " + siteInfo.value.last_name })

  if(res.ok){
    isRegistered.value.subdomain = form.subdomain
    isRegistered.value.apikey = form.apikey
    isRegistered.value.name = siteInfo.value.first_name + " " + siteInfo.value.last_name
    dialogFormVisible.value = false
    return;
  }
}
</script>

<template>

<div class="page-wrapper">
 <div class="nav-wrapper">
  <div class="grad-bar"></div>
  <nav class="navbar">
      <router-link to="/" class="logo">
        <div>
        <svg  width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.65 139.81"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="bar1" d="M94.85,5.15,0,139.81,52.44,0H64.19Q83.17,0,94.85,5.15Z"/><polygon class="bar2" points="52.44 0 0 139.81 0 0 52.44 0"/><path class="bar3" d="M128.65,69.43q0,22.41-5.1,34.76a57.54,57.54,0,0,1-14.16,20.7A46.32,46.32,0,0,1,89.93,136a100.26,100.26,0,0,1-25.74,3.81H0L126.83,49.42A106.53,106.53,0,0,1,128.65,69.43Z"/><path class="cls-4" d="M126.83,49.42,0,139.81,94.85,5.15a50,50,0,0,1,19.31,14.78,61.41,61.41,0,0,1,11.06,22.42C125.85,44.67,126.38,47,126.83,49.42Z"/></g></g></svg>
        </div>
      
      <div >Hi, {{ !!isRegistered.subdomain ? isRegistered.name : "" }}</div> 
      </router-link>
    <div class="menu-toggle" id="mobile-menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <ul class="nav no-search">
      <li class="nav-item import-page">
      <router-link to="/import">{{ tt('header.import') }}</router-link>
      </li>
      <li class="nav-item">
        <el-button plain @click="dialogFormVisible = true">
    {{ !!isRegistered.subdomain && !!isRegistered.apikey ? "Connected" : "Connnect" }}
  </el-button>
      </li>
      <li class="nav-item">
      <router-link to="/how-to-use">{{ tt('header.how') }}</router-link>
      
      </li>
      <li class="nav-item">
      <router-link to="/appearance" style="">{{ tt('header.appearance') }}</router-link>
      
      </li>
      <li class="nav-item">
      <router-link to="/about">{{ tt('header.about') }}</router-link>
      
      </li>
    </ul>
  </nav>
  </div>
</div>


<el-dialog v-model="dialogFormVisible" title="Connect Your Daftra Account" width="500">
    <el-form :model="form" ref="formRef">
      <el-form-item label="Subdomain" :label-width="formLabelWidth">
        <el-input :disabled="!!isRegistered.subdomain" v-model="form.subdomain" autocomplete="off" />
      </el-form-item>
      <el-form-item label="API Key" :label-width="formLabelWidth">
        <el-input :disabled="!!isRegistered.apikey" v-model="form.apikey" autocomplete="off" />
      </el-form-item>
      <div class="error">
      {{ errors.isBlank ? errors.blank : "" }}
      {{ errors.isNotOk ? errors.notOk : ""}}
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger"  @click="resetForm(formRef)">Reset</el-button>
        <el-button type="primary" @click="GETconnect">
          Connect Now
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.error{
  color: #f11c1c;
    margin-top: 9px;
    font-size: 13px;

}
.bar1{fill:#32ace1;}.bar2{fill:#73c6eb;}.bar3{fill:#135aa5;}.cls-4{fill:#1685c8;}
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
  z-index: 10;
}

.nav-wrapper {
  width: 100%;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  /* background-color: #fff; */
  /* border-bottom: .1px solid; */

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

.navbar svg {
  justify-self: start;
  margin-inline: 20px;
}

.navbar ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5,1fr);
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
.nav-item button {
  font-size: 0.85rem;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.3s ease-out;
  background: transparent;
  border: none
}
.nav-item.import-page a {
  color: #fff;
}
.nav-item.import-page a:hover {
  color: #ffffffa3;
}

.import-page{
  background-color: #23A6D5 ;
  padding:2px 8px;
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

.el-form-item{
  margin: 2px 0;
}

.logo{
  text-decoration: none;
  font-size: 13px; 
  display: flex;
  justify-content: start;
align-items:center;
}
</style>