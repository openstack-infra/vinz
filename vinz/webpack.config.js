var path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ManifestRevisionPlugin = require("manifest-revision-webpack-plugin")

var root = "./assets"

module.exports = {
    entry: {
        app_js: [
            root + "/scripts/app.js"
        ],
        main_css: [
            root + "/styles/main.scss"
        ]
    },
    output: {
        path: "./vinz/public",
        publicPath: "https://localhost:1234/assets/",
        filename: "[name].js",
        chunkFilename: "[id].[chunkhash].chunk"
    },
    resolve: {
        extensions: ["", ".js", ".scss"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:
                  {
                    presets:['es2015', 'react']
                  }
            },
            {
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract("style-loader", "css!sass")
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new ManifestRevisionPlugin(path.join("vinz", "manifest.json"), {
            rootAssetPath: root,
            ignorePaths: ["/styles", "/scripts"]
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.NoErrorsPlugin()
    ]
}
