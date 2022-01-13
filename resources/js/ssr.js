import Vue from 'vue';

import vuetify from './vuetify';
import { createRenderer } from 'vue-server-renderer';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { ZiggyVue } from 'ziggy';
import { Ziggy } from './ziggy';
import createServer from '@inertiajs/server';

if(process.env.NODE_ENV === 'production')
{
    Vue.use(ZiggyVue, Ziggy);
} else {
    Vue.use(ZiggyVue);
}

createServer(page => createInertiaApp({
    page,
    render: createRenderer().renderToString,
    title: title => title ? `${title} | Inertia` : 'Laden... | Inertia',
    resolve: name => require(`@/Pages/${name}`),
    setup({ App, props, plugin }) {
        Vue.use(plugin);

        return new Vue({
            vuetify,
            render: h => h(App, props),
        });
    },
}))
