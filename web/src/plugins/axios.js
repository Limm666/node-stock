import Vue from 'vue'

// Lib imports
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:15000'
axios.defaults.timeout = 2000
Vue.prototype.$http = axios
