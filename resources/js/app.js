import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import store from './store'

//Main pages
import App from './views/app.vue';

axios.defaults.baseURL = 'http://localhost/api'

const app = new Vue({
    el: '#app',
    components: { App },
    store
});

