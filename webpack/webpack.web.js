// webpack/webpack.web.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: {
        'core': './src/web-core.ts'  // Point d'entrée pour la version Web
    },
    mode: 'production', // Utiliser 'production' pour une optimisation maximale
});