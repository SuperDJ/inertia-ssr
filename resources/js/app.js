import Vue from 'vue';

import vuetify from './vuetify';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { ZiggyVue } from 'ziggy';
import { Ziggy } from './ziggy';

if(process.env.NODE_ENV === 'production')
{
    Vue.use(ZiggyVue, Ziggy);
} else {
    Vue.use(ZiggyVue);
}

createInertiaApp({
    title: title => title ? `${title} | Inertia` : 'Laden... | Inertia',
    resolve: name => import(`@/Pages/${name}`),
    setup({ el, App, props, plugin }) {
        Vue.use(plugin);

        new Vue({
            vuetify,
            render: h => h(App, props),
        }).$mount(el)
    },
});
