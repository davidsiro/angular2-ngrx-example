const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const _root = path.resolve(__dirname, '.');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    devtool: 'cheap-module-eval-source-map', //cheap-module-eval-source-map

    output: {
        path: root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    entry: {
        'polyfills': root('src', 'polyfills'),
        'vendor': root('src', 'vendor'),
        'app': root('src', 'main')
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.scss']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                include: root('src', 'app'),
                loaders: 'to-string-loader!css-loader!sass-loader?sourceMap'
            },
            {
                test: /\.scss$/,
                exclude: root('src', 'app'),
                loaders: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ['css-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /bootstrap-sass(\\|\/)assets(\\|\/)javascripts(\\|\/)/,
                loader: 'imports?jQuery=jquery'
            },
        ]
    },

    plugins: [
        // see https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './src'
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // CommonsChunkPlugin cannot be in webpack.commmon.js, doesn't work with Karma
        // https://github.com/webpack-contrib/karma-webpack/issues/24
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('dev')
            }
        }),
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};
