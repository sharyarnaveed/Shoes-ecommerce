<script setup>
import { ref,onMounted } from 'vue';
import './itemdetail.css';
import axios from 'axios';
import Navbar from './subcomponents/navbar.vue';
const props=defineProps({
    id:String,
  
})

const items=ref({});
const quanitity=ref(0)
const fetchdetail=async(id)=>
{
    try {
        const response= await fetch(`http://localhost:3000/productdetail/${id}`);
        const data=await response.json();
        items.value=data;

console.log(items.value);

    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchdetail(props.id)
})

</script>

<template>
<main>
    <Navbar logo="../src/assets/puma.png"/>
<section v-for="item in items" :key="item.product_id" class="itemdetailpage">
    <div class="itemimage">
     <img :src="`http://localhost:3000/${item.product_image}`" alt="Product Image">
    </div>
    <div class="itemdetails">
        <h1>{{item.product_name}}</h1>

        <h3>Price: {{item.price}} PKR</h3>
<h4>{{item.product_description}}</h4>
<!-- quantity counter -->
<label class="thequantitylaebl" for="">Quantity 
    <div class="quantity">
    <button @click="quanitity++" >+</button>
    <input v-model="quanitity" type="number" name="" id="" min="1" max="10" value
    ="1">
    <button @click="quanitity--">-</button>
</div>
</label>



<div class="review_checkout">
    <button>Read Review</button>
    <button>Check Out</button>
</div>
    </div>
</section>
</main>

   
</template>

<style scoped>
.itemdetailpage
{
    /* border: 2px solid purple; */
    width: 100%;
    height: 80%;
    display: flex;
    font-family: 'Inter';
    /* justify-content: center;
    ali */
}
.itemimage
{
    width: 50%;
    /* border: 2px solid green; */
}
.itemimage img
{
    width: 100%;
    height: 100%;
}
.itemdetails
{
    border-left: 2px solid rgba(0, 0, 0, 0.466);
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    /* justify-content: center; */
    /* align-items: center; */
}
.itemdetails h1{
    margin: 10px 10px;
    font-size:30px;
    font-weight: 500;
}
.itemdetails h3{
    font-size: 23px;
    margin: 10px 10px;
    font-weight: 400;
}
.itemdetails h4{
    font-size: 20px;
    font-weight: 300;
    margin: 10px 10px;
}
</style>