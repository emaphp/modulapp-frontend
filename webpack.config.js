var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: [
        "font-awesome-webpack!./font-awesome.config",
        "./app/main.js",
    ],
	resolve: {
		alias: {
			"marionette": "backbone.marionette"
		}
	},
    output: {
		path: path.join(__dirname, "dist"),
		publicPath: "dist/",
		filename: "[name].js",
		chunkFilename: "[chunkhash].js"
    },
    node: {
        fs: "empty"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ],

        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html/, loader: "underscore-template-loader" },
            { test: /\.hbs/, loader: "handlebars-template-loader" },
            { test: /\.woff\d?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.gif$/, loader: "file-loader" }
        ]
    },
    plugins: [
		new webpack.ProvidePlugin({
			// Automatically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery: "jquery",
			$: "jquery"
		})
	],
    jshint: {
        emitErrors: false,
        failOnHint: false
    }
};
