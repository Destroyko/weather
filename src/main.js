import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'
// import Geonames from 'geonames.js';

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import * as VueGoogleMaps from "vue2-google-maps"

const options = { name: '_' };
// Vue.use(Geonames);
Vue.use(VueLodash, options);
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC8z6MribxwC44fk_suJ5uP-jrxH23ot6g",
        libraries: "places",// necessary for places input
    }
});
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    data: {
        user: '',
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(position => {
            this.user = {
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude)
            }
        });

    }
}).$mount('#app')
