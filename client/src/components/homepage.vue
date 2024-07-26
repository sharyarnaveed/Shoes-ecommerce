<script setup>
import "./hero.css"
import navbar from "./subcomponents/navbar.vue";
defineProps({
    shoe:String
})

</script>


<template>
  <main>
    <navbar logo="./src/assets/puma.png"  />
    <section class='container'>
        
        <div class="parts">
           <div class="slogan">
           <h1>YOUR FEET DESERVE <br /> THE BEST</h1>
           </div>
   <div class="description">
     <p>YOUR FEET DESERVE THE BEST AND WE’RE HERE TO <br /> HELP YOU WITH OUR SHOES.YOUR FEET DESERVE <br /> THE BEST AND WE’RE HERE TO HELP YOU WITH OUR <br /> SHOES.</p>
   </div>
   
   <div class="two_buttons">
     <router-link to="/productdata"  class='shop_button'>Shop Now</router-link>
     <button class='category_button'>Category</button>
   </div>
   
   
        </div>
        <div class="parts">
           <img src="/src/assets/shoes.png" alt="" />
        </div>
       </section>
      </main>
</template>