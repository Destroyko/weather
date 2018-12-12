import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import * as VueGoogleMaps from "vue2-google-maps"

const options = { name: '_' };

Vue.use(VueLodash, options);
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC8z6MribxwC44fk_suJ5uP-jrxH23ot6g",
        libraries: "places",// necessary for places input
        disableDefaultUI: true
    }
});
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    mounted() {}
}).$mount('#app')
