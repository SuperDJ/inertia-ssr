const mix = require( 'laravel-mix' );
const path = require( 'path' );
const VuetifyLoaderPlugin = require( 'vuetify-loader/lib/plugin' );

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js( 'resources/js/app.js', 'public/js' )
    .vue({version: 2, options: {optimizeSSR: false}});

mix.disableNotifications();

mix.webpackConfig( {
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve( 'resources/js' ),
            ziggy: path.resolve('vendor/tightenco/ziggy/dist/vue'),
        },
    },
} );

mix.extend('vuetify', new class {
    webpackConfig (config) {
        config.plugins.push(new VuetifyLoaderPlugin())
    }
});

mix.vuetify();

mix.options({
    terser: {
        extractComments: false,
    },
});

if( mix.inProduction() ) {
    mix.version();
}
