import {createWebHistory, createRouter} from "vue-router";
import Home from "@/components/static/Home";
import About from "@/components/static/About";
import Login from "@/components/static/Login";
import Register from "@/components/static/Register";
import Files from "@/components/static/Files";
import Upload from "@/components/static/Upload";
import {LS_TOKEN} from "@/constants";

const routes = [
   {path: '/', component: Home, name: 'home'},
   {path: '/about', component: About, name: 'about'},
   {path: '/login', component: Login, name: 'login'},
   {path: '/signup', component: Register, name: 'register'},
   {path: '/explorer', component: Files, name: 'explorer'},
   {path: '/upload', component: Upload, name: 'upload'},
]

let prefix = process.env.VUE_APP_API_PREFIX || ''
const router = createRouter({
   history: createWebHistory(prefix),
   routes,
});

router.beforeEach((to, from, next) => {
   let isAuthenticated = localStorage.getItem(LS_TOKEN)
   let guestPages = ['login', 'home', 'about', 'register']
   if (!guestPages.includes(to.name ) && to.name !== 'login' && !isAuthenticated) next({name: 'login'})
   next()
});

export default router
