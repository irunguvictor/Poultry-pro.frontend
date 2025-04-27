import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores';


import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8000'; 
axios.defaults.withCredentials = true; 


const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app');
