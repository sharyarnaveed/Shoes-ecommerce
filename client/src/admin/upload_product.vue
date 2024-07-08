<template>
  <main>

  <section class="admin_container">
    <sidepanel/>

    <section class="formcontainer">
      
    <h1>Add Product</h1>
    
    <form @submit.prevent="saveProduct">
      <input type="text" v-model="theproduct_data.name" placeholder="Title">
      <input type="text" v-model="theproduct_data.description" placeholder="Description">
      <input type="number" v-model="theproduct_data.price" placeholder="Price"> 
      <input type="file" @change="onFileChange" accept="image/*">
      <button type="submit">Submit</button>
    </form>
  </section>
  </section>


  </main>
 
</template>

<script setup>
import sidepanel from './components/sidepanel.vue';
import './css/addproduct.css';
import { ref } from 'vue';
import axios from 'axios';
const theproduct_data=ref({
  name:'',
  description: '',
  price: 0,
  file:null
})
const onFileChange=(e)=>{
  theproduct_data.value.file=e.target.files[0];
  }

const saveProduct=()=>{
  const formData=new FormData();
  formData.append('name',theproduct_data.value.name);
  formData.append('description',theproduct_data.value.description);
  formData.append('price',theproduct_data.value.price);
  formData.append('image',theproduct_data.value.file);
  axios.post('http://localhost:3000/save_data',formData)
  .then((res)=>{
    console.log(res);
    })
    .catch((err)=>{
      console.log(err);
      })
      }
      </script>




