const   merge = require('webpack-merge'),
        common = require('./webpack.common.js'),
        path = require('path'),
        MiniCssExtractPlugin = require("mini-css-extract-plugin");
    
module.exports = merge(common, {
    mode: 'production',
    // devtool: '#source-map',
    module:{
        rules: [
            {
                test:/\.s?[ac]ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'postcss-loader',
                    'sass-loader',
                  ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(?=\?[A-Za-z0-9])?$|\.svg$/i, //(\?v=\d+\.\d+\.\d+)?
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        // publicPath: 'dist',
                        outputPath: 'css/fonts/'
                    }
                }],
                exclude: [/node_modules|^.*(android|apple|favicon|safari|tile).*$/i,path.resolve(__dirname, './src/assets/img')]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/front.[name].[contenthash].css',
        chunkFilename: 'css/front.[id].[contenthash].css',
        }),
    ],
});