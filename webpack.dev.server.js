var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var urls = require('./src/common/api.js')

const config = {
	entry: "./main.js",
	output:{
		path : __dirname,
		filename : "dist/bundle.js"
	},
	module:{
		loaders: [
			{	
				test : /\.js$/,
				loader:"babel-loader",
				exclude:/node_modules/,
				query:{
					presets: [ "es2015","react"],
					plugins: ['react-html-attrs']
				}
			},
			{
				test :  /\.css$/,
				loader: "style-loader!css-loader"
			},{
				test : /\.(png|jpg|gif|ttf)$/,
				loader: "file-loader"
			}
		]
	},
	resolve: {
		alias: {
			'jsLib': path.resolve(__dirname, './src')
		},
		extensions: ['.json', '.js']
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	]
}

const proxyOptions = {}

for (let key in urls) {
	proxyOptions[urls[key]] = {
		target: 'https://mainsite-restapi.ele.me',
		secure: false,
		changeOrigin: true
	}
}

const port = 9999

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, './src'),
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
  proxy: proxyOptions // 开启自动接口代理模式
}).listen(port, '0.0.0.0', function (error) {
  if (error) {
    console.log(error)
  }

  console.log('Listening at localhost:' + port)
})