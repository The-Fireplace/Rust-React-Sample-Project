'use strict';

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDevelopmentEnvironment = process.env.NODE_ENV !== 'production';

let config = {
    entry: './src/bootstrap.tsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    isDevelopmentEnvironment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                include: path.resolve(__dirname, 'src'),
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                include: path.resolve(__dirname, 'src'),
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [],
};

if (isDevelopmentEnvironment) {
    config.devtool = 'eval-source-map';
    config.module.rules.push({
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'source-map-loader'
    });
    config.plugins.push(new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx']
    }));
} else {
    config.plugins.push(new MiniCssExtractPlugin({
        filename: "[contenthash].css",
    }));
}

module.exports = config;