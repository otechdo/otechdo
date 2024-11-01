// webpack/webpack.common.js
const path = require('path');

module.exports = {
    entry: {}, // Sera défini par les configurations spécifiques (web/desktop)
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',            // Utilisation de ts-loader pour la compilation TS
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // Permet d'importer sans spécifier l'extension
    },
    output: {
        filename: '[name].js',              // Nom dynamique (défini dans chaque config)
        path: path.resolve(__dirname, '../dist'),
    },
};
