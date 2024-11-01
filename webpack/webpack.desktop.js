// webpack/webpack.desktop.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: {
        'desk': './src/index-desktop.ts'  // Point d'entrée pour la version Desktop
    },
    output: {
        filename: 'desk.js',               // Nom du fichier de sortie
    },
    mode: 'production', // Utiliser 'production' pour des optimisations spécifiques
});
