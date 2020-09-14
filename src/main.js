import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Component from 'vue-property-decorator';
Vue.config.productionTip = false;
new Vue({
    router,
    // @ts-ignore
    vuetify,
    Component,
    render: h => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map