import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores'


// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// Import individual Vuetify components
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create Vuetify instance with components and directives
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify) // Make sure Vuetify is registered
  .mount('#app');
