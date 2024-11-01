// webpack/webpack.web.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: {
        'web': './src/index-web.ts'  // Point d'entrée pour la version Web
    },
    output: {
        filename: 'web.js',          // Nom du fichier de sortie
    },
    mode: 'production', // Utiliser 'production' pour une optimisation maximale
});
