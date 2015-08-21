var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './app/main.tsx',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'scripts.js'
    },
    module: {
        loaders: [
            {
               test: /\.ts(x?)$/,
               loader: 'babel?optional[]=runtime&stage=0!ts-loader',
               exclude: /(node_modules|bower_components)/
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?includePaths[]='+ path.resolve(__dirname, "./node_modules"))
            },
            {
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              loader: 'url-loader?limit=10000'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};
