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
    <section className='container'>
        
        <div className="parts">
           <div className="slogan">
           <h1>YOUR FEET DESERVE <br /> THE BEST</h1>
           </div>
   <div className="description">
     <p>YOUR FEET DESERVE THE BEST AND WE’RE HERE TO <br /> HELP YOU WITH OUR SHOES.YOUR FEET DESERVE <br /> THE BEST AND WE’RE HERE TO HELP YOU WITH OUR <br /> SHOES.</p>
   </div>
   
   <div className="two_buttons">
     <button className='shop_button'>Shop Now</button>
     <button className='category_button'>Category</button>
   </div>
   
   
        </div>
        <div className="parts">
           <img src="/src/assets/shoes.png" alt="" />
        </div>
       </section>
      </main>
</template>