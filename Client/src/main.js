import Vue from "vue"
import App from "./App.vue"
import Router from "vue-router"
import Editor from "./components/Editor.vue"
import MailDetails from "./components/MailDetails.vue"
import Empty from "./components/Empty.vue"

Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name:'home',
            component: Empty,
        },
        {
            path: "/mail/:id",
            name: "mail",
            component: MailDetails,
            props: true
        },
        {
            path: "/editor",
            name: "editor",
            component: Editor,
        }
    ]
})

new Vue({
    render: h => h(App),
    router
}).$mount("#app")
