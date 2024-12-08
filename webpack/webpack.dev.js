const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common');
const { all } = require('axios');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    mode: 'development',
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [require('autoprefixer')]

                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: path.join(CURRENT_WORKING_DIR, 'public/index.html'),
            inject: true
        })
    ],
    devServer: {
        port: 80,
        // open: true,
        // inline: true,
        compress: true,
        host: '0.0.0.0',
        hot: true,
        // disableHostCheck: true,
        historyApiFallback: true,
        allowedHosts: 'all',
    },
    devtool: 'eval-source-map',

};


module.exports = merge.merge(common, config);