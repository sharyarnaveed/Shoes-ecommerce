<script setup>
import './contact.css';
import navbar from './subcomponents/navbar.vue';
import axios from 'axios';
import { ref } from 'vue';
const formmdata=ref({
    subject:"",
        email:"",
        message:"",
       
});

const  sucessmessage=ref('');
const sendemail =async()=>
{
    try {
        const responce=await axios.post("http://localhost:3000/sendmail",formmdata.value);
    
    console.log("Response from server:", responce.data);
    sucessmessage.value = responce.data.message;
    formmdata.value={
        subject:"",
        email:"",
        message:""
    }    


} catch (error) {
     console.log(error);   
    }
    

}

</script>

<template>

    <main>
        <navbar logo="./src/assets/puma.png"/>
<section class="contact_container">
    <div v-if="sucessmessage" class="mail_responce">
        <h2>{{ sucessmessage }}</h2>
    </div>
    <div class="conimage">
     <img src="/src/assets/contact.jpg" alt="">
    </div>
    <div class="contactform">
<h1>Contact</h1>
    <form @submit.prevent="sendemail" class="conform">
    <input type="text" v-model="formmdata.subject" name="" placeholder="Subject" id="">
    <input type="text" name="" v-model="formmdata.email" placeholder="Your Email" id="">
    <textarea name="" placeholder="Write Message " id="" v-model="formmdata.message" cols="43" rows="12"></textarea>
    <button type="submit">Submit</button>
    </form>
</div>
</section>
        </main>
        </template>