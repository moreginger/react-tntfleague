var path = require('path');

module.exports = {
	entry: getEntrySources(['babel-polyfill', './src/Tntfleague.js']),
	output: {
		publicPath: 'http://localhost:8080/',
		filename: 'build/bundle.js'
	},
	devtool: 'eval',
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'source-map'
		}],
		loaders: [{
			test: /\.scss$/,
			include: /src/,
			loaders: [
				'style',
				'css',
				'autoprefixer?browsers=last 3 versions',
				'sass?outputStyle=expanded'
			]
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'url?limit=8192',
				'img'
			]
		}, {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loaders: [
				'react-hot',
				'babel?presets[]=es2015&presets[]=react'
			]
		}]
	}
};

function getEntrySources(sources) {
	if (process.env.NODE_ENV !== 'production') {
		sources.push('webpack-dev-server/client?http://localhost:8080');
		sources.push('webpack/hot/only-dev-server');
	}

	return sources;
}

function getOutput() {
	const output = {
		filename: 'build/bundle.js'
	};
	if (process.env.NODE_ENV === 'production') {
		output.publicPath = 'http://localhost:8080/';
	}
	else {
		output.publicPath = 'static';
		output.path = path.join(__dirname, 'static');
	}

	return output;
}
