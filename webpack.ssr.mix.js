const mix = require( 'laravel-mix' );
const path = require( 'path' );
const VuetifyLoaderPlugin = require( 'vuetify-loader/lib/plugin' );
const webpackNodeExternals = require('webpack-node-externals');

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

mix.js( 'resources/js/ssr.js', 'public/js' )
    .vue({
        version: 2,
        options: { optimizeSSR: true },
        useVueStyleLoader: true, // Set to true or it will use style-loader which doesn't support SSR
    });

mix.disableNotifications();

mix.webpackConfig( {
    output: {
        chunkFilename: 'js/ssr_[name].js?id=[chunkhash]',
        globalObject: 'this'
    },

    target: 'node',
    externalsPresets: { node: true }, // Needed for Webpack 5 https://www.npmjs.com/package/webpack-node-externals
    externals: [webpackNodeExternals({
        modulesFromFile: {
            fileName: 'package.json',
            includeInBundle: 'dependencies',
            excludeFromBundle: 'devDependencies',
        }
    })],

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
    manifest: false,
    terser: {
        extractComments: false,
    },
});

if( mix.inProduction() ) {
    mix.version();
}
