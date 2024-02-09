<template>
  <div style="">
    <div class="logo-container">
        <svg  width="150" style="padding:20px " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.65 139.81"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="bar1" d="M94.85,5.15,0,139.81,52.44,0H64.19Q83.17,0,94.85,5.15Z"/><polygon class="bar2" points="52.44 0 0 139.81 0 0 52.44 0"/><path class="bar3" d="M128.65,69.43q0,22.41-5.1,34.76a57.54,57.54,0,0,1-14.16,20.7A46.32,46.32,0,0,1,89.93,136a100.26,100.26,0,0,1-25.74,3.81H0L126.83,49.42A106.53,106.53,0,0,1,128.65,69.43Z"/><path class="cls-4" d="M126.83,49.42,0,139.81,94.85,5.15a50,50,0,0,1,19.31,14.78,61.41,61.41,0,0,1,11.06,22.42C125.85,44.67,126.38,47,126.83,49.42Z"/></g></g></svg>
          <div class="logo-title">
          D-Import
          </div>
          <p class="main-line">Bulk import all your data into <b>Daftra</b> ERP in matter of seconds </p>

        <section class="desc-line">
  <p>We are a fairly small, flexible design studio that designs for print and web. We work flexibly with clients to fulfil their design needs. Whether you need to create a brand from scratch, including marketing materials and a beautiful and functional website or whether you are looking for a design refresh we are confident you will be pleased with the results.</p>
  <p>What this app does:</p>
<ul>
  <li>Import Invoices/Clients/..etc in bulk.</li>
  <li>Tune different settings to fit needs.</li>
  <li>Validate your files and check on them before import.</li>
  <li>Map your column to Daftra's invoice field.</li>
  <li>Use your template or build yours.</li>
  <li>View all data</li>
  </ul>
</section>
        </div>
        <div>
        </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.main-line{
  margin-top: 1rem; 
font-size: 1.175rem;
line-height: 1.75rem; 
}
.desc-line{
   padding: 0 100px;
}
.bar1{fill:#32ace1;}.bar2{fill:#73c6eb;}.bar3{fill:#135aa5;}.cls-4{fill:#1685c8;}
.logo-container{
  display: flex; 
flex-direction: column; 
align-items: center; 
height: 90vh;
border-radius: 0.25rem; 
background: linear-gradient(transparent, #73c6eb 30%, transparent);

}
.logo-title{
  font-weight: 700; 
text-transform: capitalize; 
font-size: 100px;
color: #1685c8;
 
}
</style>