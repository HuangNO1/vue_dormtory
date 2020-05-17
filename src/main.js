import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer,
    /* {
  options: global default options,
  events: global videojs events
} */
)

import Storage from 'vue-web-storage';
Vue.use(Storage);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')