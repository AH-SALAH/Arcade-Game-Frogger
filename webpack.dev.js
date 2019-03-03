const   webpack = require('webpack'),
        path = require('path'),
        merge = require('webpack-merge'),
        common = require('./webpack.common.js'),
        BrowserSyncPlugin = require('browser-sync-webpack-plugin');
    
module.exports = merge(common, {
    mode: 'development',
    watch: true,
    devtool: '#inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        // hotOnly: true,
        stats: 'minimal',
        open: true,
        inline: true,
        watchContentBase: true,
        // port: 9000,
    },
    module:{
        rules: [
            {
                test:/\.s?[ac]ss$/,
                use:[
                    'style-loader',
                    'css-loader',
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
                        // publicPath: 'fonts/',
                        outputPath: 'css/fonts/'
                    }
                }],
                exclude: [/node_modules|^.*(android|apple|favicon|safari|tile).*$/i,path.resolve(__dirname, './src/assets/img')]
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin(
            // BrowserSync options
            {
              // browse to http://localhost:3000/ during development
              host: 'localhost',
              port: 3000,
              // comment the server option if you want a proxy
              server: { baseDir: ['dist'] },
              files: [{
                match: [
                    '**/*.html'
                ],
                fn: function(event, file) {
                    if (event === "change") {
                        const bs = require('browser-sync').get('bs-webpack-plugin');
                        bs.reload();
                    }
                }
            }], // serve static files
              // proxy the Webpack Dev Server endpoint
              // (which should be serving on http://localhost:3100/)
              // through BrowserSync
            //   proxy: 'http://localhost:8080/',
            // Don't show any notifications in the browser.
                // notify: false
            },
            // plugin options
            {
              // prevent BrowserSync from reloading the page
              // and let Webpack Dev Server take care of this
              reload: false
            }
        ),
    ],
});