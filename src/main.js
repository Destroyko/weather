import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC8z6MribxwC44fk_suJ5uP-jrxH23ot6g",
        libraries: "places" // necessary for places input
    }
});
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    methods: {
        someMethod(){
            alert('parent');
        }

    }
}).$mount('#app')
