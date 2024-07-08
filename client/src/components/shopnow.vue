<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from './subcomponents/navbar.vue'; // Adjust path as per your file structure
import './shopnow.css';

const items = ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/productdata');
        items.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(fetchData);

const detail=async(id)=>
{
   const  encode= encodeURIComponent(id)
   console.log(encode);
try {

    const response=await axios.get(`http://localhost:3000/productdetail?id=${encode}`);
    console.log(response.data);
    
} catch (error) {
    console.log(error);
}
}


</script>



<template>
    <main>
        <Navbar logo="./src/assets/puma.png" /> <!-- Adjust props as needed -->
        <section class="productsection">
            <div v-for="item in items" :key="item.product_id" class="card_section" @click="detail(item.product_id)">
                <div class="img">
                    <img :src="`http://localhost:3000/${item.product_image}`" alt="product">
                </div>
                <div class="productdata">
                    <h3>{{ item.product_name }}</h3>
                    <h4>Rs. {{ item.price }}</h4>
                </div>
            </div>
        </section>
    </main>
</template>

