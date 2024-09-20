const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
    entry: [path.join(CURRENT_WORKING_DIR, 'src/index.tsx')],
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.html', '.ts', '.tsx'],
        // alias: {
        //     app: 'app'
        // }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: 'dest' },
                // other patterns
            ],
            options: {
                concurrency: 100,
                // other options
            },
        })
    ]
};