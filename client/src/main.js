import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter,createWebHistory} from 'vue-router';
import homepage from './components/homepage.vue';
import about from './components/about.vue';
import Contact from './components/contact.vue';
import Upload_product from './admin/upload_product.vue';
// import Upload_product from '../view/admin/upload_product.vue';
// import Adlogin from '../view/admin/adlogin.vue';
import Adlogin from './admin/adlogin.vue';
import Shopnow from './components/shopnow.vue';
import Itemdetail from './components/itemdetail.vue';

const routes=[

    {
        path:'/',
        component:homepage

    },
    {
        path: '/about-us',
        component:about
    },
    {
        path: '/contact',
        component:Contact
    },
    {
        path:'/the-admin-panel',
        component:Upload_product
    }
    ,
    {
        path:'/adlogin',
        component:Adlogin
    },
    {
        path:'/productdata',
        component:Shopnow
    },{
        path:'/productdata/:id',
        component:Itemdetail,
        name:'itemdetail',
        props:true
    }
];

const router =createRouter({
    history:createWebHistory(),
    routes
})


const app=createApp(App)
app.use(router)
app.mount('#app')
