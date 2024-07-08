<script setup>
import './css/adlogin.css';
import { ref } from 'vue';
import axios from 'axios';
 const logindata=ref({
    username:'',
    password:''
 })

const sendlogindata=async()=>
{
    const response=await axios.post("http://localhost:3000/login-admin",logindata.value);

    if(response.data.success==true)
    {
        window.location.href='/the-admin-panel';
    }
    else
    {
        window.location.href="/adlogin";
    }
}

</script>


<template>
    <section class="adminlogcontainer">
    <form @submit.prevent="sendlogindata" class="formcontainer_login">
        <h1>ADMIN</h1>

        <input type="text" v-model="logindata.username" placeholder="Username">
        <input type="text" v-model="logindata.password" placeholder="Password"> 
        <button type="submit">Login</button> 
    </form>
    </section>
</template>