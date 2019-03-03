const   webpack = require('webpack'),
        path = require('path'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        CleanWebpackPlugin = require('clean-webpack-plugin');
    
module.exports = {
    entry: {
        app: path.resolve(__dirname,'./src/assets/js/app.js'),
        // engine: path.resolve(__dirname,'./src/assets/js/engine.js'),
        // resources: path.resolve(__dirname,'./src/assets/js/resources.js'),
        // about: path.resolve(__dirname,'./src/assets/js/about.js'),
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/front.[name].[hash].js',
        // publicPath: 'dist'
    },
    module:{
        rules: [
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                },
                exclude: /node_modules/
            },
            // {
            //     test: /\.(jpe?g|png|gif)$/i,
            //     loader: 'url-loader',
            //     options: {
            //       // Images larger than 10 KB won’t be inlined
            //       limit: 10 * 1024,
            //       name: '[name].[ext]',
            //       // publicPath: 'dist/img',
            //       outputPath: 'img/'
            //     },
            //     exclude: /node_modules|tile\.png|tile-wide\.png|^(fa-*.*\d?\.svg)$/i
            // },
            {
                test:/\.(gif|png|jpe?g|svg)$/i,
                use:[
                        {
                            loader: 'file-loader',
                            options: {
                              // Images larger than 10 KB won’t be inlined
                            //   limit: 6 * 1024,
                            //   fallback: 'file-loader',
                              name: '[name].[ext]',
                              // publicPath: 'dist/img',
                              outputPath: 'img/'
                            },
                        },
                        // {
                        //     loader: 'svg-url-loader',
                        //     options: {
                        //         // Images larger than 10 KB won’t be inlined
                        //         limit: 10 * 1024,
                        //         // Remove quotes around the encoded URL – they’re rarely useful
                        //         noquotes: true,
                        //         iesafe: true, //This option falls back to the file-loader if the file contains a style-element and the encoded size is above 4kB no matter the limit specified.IE (including IE11) stops parsing style-elements in SVG data-URIs longer than 4kB
                        //         stripdeclarations: true, //tell the loader to strip out any XML declaration, e.g. <?xml version="1.0" encoding="UTF-8"?> at the beginning of imported SVGs. Internet Explorer (tested in Edge 14) cannot handle XML declarations in CSS data URLs (content: url("data:image/svg...")).
                        //         name: '[name].[ext]',
                        //         // publicPath: 'dist/img',
                        //         outputPath: 'img/'
                        //     }
                        // },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                // Specify enforce: 'pre' to apply the loader
                                // before url-loader/svg-url-loader
                                // and not duplicate it in rules with them
                                enforce: 'pre',
                                bypassOnDebug: process.env.NODE_ENV == 'development' ? true : false, // no processing is done when webpack 'debug' mode is used and the loader acts as a regular file-loader
                                disable: process.env.NODE_ENV == 'development' ? true : false, // Same functionality as bypassOnDebug option, but doesn't depend on webpack debug mode, which was deprecated in 2.x. use this option if you're running webpack@2.x or newer.
                                mozjpeg: {
                                  progressive: true,
                                  quality: 65
                                },
                                //optipng.enabled: false will disable optipng
                                optipng: {
                                  enabled: true,
                                //   optimizationLevel:7
                                },
                                pngquant: {
                                  quality: '65-90',
                                  speed: 4
                                },
                                gifsicle: {
                                  interlaced: true,
                                  optimizationLevel: 3
                                },
                                svgo: {
                                    plugins:[
                                        {removeViewBox: false},
                                        {convertStyleToAttrs: false},
                                        // {removeUselessStrokeAndFill: false},
                                        {minifyStyles: false},
                                        // {removeUselessDefs: false},
                                        {inlineStyles: false}
                                    ]
                                },
                                // the webp option will enable WEBP
                                webp: {
                                  quality: 75
                                }
                            }
                        }
                    ],
                exclude: [
                    /node_modules|^.*(android|apple|favicon|safari|tile).*$|^(fa-*.*\d?\.svg)$/i,
                    path.resolve(__dirname, './src/assets/scss/fonts')
                ]
            },
            {
                test: /(\.(ico|txt|xml|htaccess|webmanifest)?$|^.*(android|apple|favicon|safari|tile).*$)/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'dist/',
                        // outputPath: 'dist/'
                    },
                }],
                exclude: /node_modules/i
            }
            // {
            //     test:/\.html$/i,
            //     use:{
            //         loader:'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             publicPath: 'dist/',
            //         }
            //     },
            //     exclude: path.resolve(__dirname,'src/index.html')
            // },
            // {
            //     test: /\.html$/i,
            //     use: [ 
            //         'file-loader?name=[name].[ext]',
            //         'extract-loader',
            //         {
            //             loader:'html-loader',
            //             options: {
            //                 minimize: true,
            //                 conservativeCollapse:false,
            //             }
            //         } 
            //     ],
            //     exclude: path.resolve(__dirname,'src/index.html')
            // }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$':'jquery',
            'jQuery':'jquery',
            'window.jQuery':'jquery'
        }),
        new CleanWebpackPlugin('dist',{}),
        new HtmlWebpackPlugin({
            title: 'Effective JavaScript: Frogger',
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace:true,
                // conservativeCollapse:true,
                collapseInlineTagWhitespace:true,
                // preserveLineBreaks:true,
                caseSensitive:true,
            },
            hash: true,
            // favicon: path.resolve(__dirname,'./src/assets/img/icon.png'),
            meta: {
                description: 'Arcade Game',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                keywords: 'Arcade, Frogger, Game',
                author: 'Ahmed Salah',
                'application-name': 'Arcade Game', //Name of web app (only should be used if the website is used as an app)
                'theme-color': '#f3eaea', //Theme Color for Chrome, Firefox OS and Opera
                robots: 'index,follow', //All search engine crawling and indexing
            },
            chunks: ['app'/*,'engine','resources'*/],
            // excludeChunks: ['contact'],
        }),
        // new HtmlWebpackPlugin({
        //     title: 'About page',
        //     filename: 'about.html',
        //     template: './src/about.html',
        //     minify: {
        //         collapseWhitespace:true,
        //         // conservativeCollapse:true,
        //         collapseInlineTagWhitespace:true,
        //         // preserveLineBreaks:true,
        //         caseSensitive:true,
        //     },
        //     hash: true,
        //     // favicon: path.resolve(__dirname,'./src/assets/img/icon.png'),
        //     meta: {
        //          description: 'Memory Card Game',
        //          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        //          keywords: 'Memory, Card, Game',
        //          author: 'Ahmed Salah',
        //          'application-name': 'Memory Game', //Name of web app (only should be used if the website is used as an app)
        //         'theme-color': '#4285f4', //Theme Color for Chrome, Firefox OS and Opera
        //         robots: 'index,follow', //All search engine crawling and indexing
        //     },
        //     chunks: ['about']
        // }),
        new HtmlWebpackPlugin({
            title: '404 page',
            filename: '404.html',
            template: './src/404.html',
            minify: {
                collapseWhitespace:true,
                // conservativeCollapse:true,
                collapseInlineTagWhitespace:true,
                // preserveLineBreaks:true,
                caseSensitive:true,
            },
            hash: true,
            // favicon: path.resolve(__dirname,'./src/assets/img/icon.png'),
            meta: {
                description: 'Arcade Game',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                keywords: 'Arcade, Frogger, Game',
                author: 'Ahmed Salah',
                'application-name': 'Arcade Game', //Name of web app (only should be used if the website is used as an app)
                'theme-color': '#4285f4', //Theme Color for Chrome, Firefox OS and Opera
                robots: 'index,follow', //All search engine crawling and indexing
            },
            chunks: ['']
        }),

    ],
};