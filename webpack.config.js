const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        entry: [path.resolve(__dirname, 'src/index.js'), path.resolve(__dirname, 'src/scss/index.scss')],
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                presets: ['react', 'es2015']
                }
            },{
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/scss'),
                ],
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader', 'import-glob-loader']),
            },
            {
                test: /\.(ico|jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
            },
            {
                test: /\.(woff|ttf|otf|eot\?#.+|svg#.+)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
            },
            {
                test: /\.(html|txt)$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        hot: true,
        port: 3000,
        inline: true,
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new ExtractTextPlugin({
            filename: "index.css",
        })
    ]
};