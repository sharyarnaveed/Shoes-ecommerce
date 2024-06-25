<script setup>
import "./navbar.css"
import {defineProps} from 'vue';
defineProps({
logo:String,
})

</script>

<template>


    <nav className='navbar'>
    <div className="logo">
    <img :src=logo alt="" />
    </div>
    <ul>
        <router-link to="/"><li>Home</li></router-link> 
        <router-link to="/Shop-now"><li>Shop Now</li></router-link>
        <router-link to="/about-us"><li>About Us</li></router-link>
        <router-link to="/contact-us"><li>Contact</li></router-link>
    </ul>

    <div className="login_button">
        <router-link to="/login" ><div className="the_button">Login</div></router-link>
    </div>
</nav>



</template>


