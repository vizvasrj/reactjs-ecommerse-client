const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    mode: 'production',
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: '[name].[contenthash].js',
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
                            name: '[name].[contenthash].[ext]'
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
                            name: '[name].[contenthash].[ext]'
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
            inject: true,
            minify: {
                // removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }

            }),
            // new OptimizeCssAssetsPlugin({
            //     assetNameRegExp: /\.css$/g,
            //     cssProcessor: require('cssnano'),
            //     cssProcessorPluginOptions: {
            //         preset: ['default', { discardComments: { removeAll: true } }]
            //     },
            //     canPrint: true
            // })
        ],
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },
};

module.exports = merge.merge(common, config);