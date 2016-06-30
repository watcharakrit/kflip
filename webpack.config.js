var path = require('path');



module.exports = {
  entry: {
    app: './src/app.js',
    html: './src/index.html'
  },
  output: {
    path: './dist/',
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: '/',
    historyApiFallback: true
  },
  plugins: [
    (function() {
      var webpack = require('webpack')
      return new webpack.DefinePlugin({
        _ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      })
    })()
  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: path.join(__dirname, 'loaders') + '/riot.js' }
    ],
    loaders: [
      { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      { test: /\.sass$/, loaders: ['style', 'css', 'postcss', 'sass?config=sassloader'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass?config=scssloader'] },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json', },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015']} },
      { test: /\.jpe?g|\.png|\.svg$/, loader: 'url-loader?limit=10000' },
      { test: /\.woff/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)/, loader: "file-loader" }
    ]
  },
  sassloader: {
    indentedSyntax: true
  },
  scssloader: {
    indentedSyntax: false,
    includePaths: [path.resolve(__dirname, "./src")]
  },
  postcss: function () {
    return [require('autoprefixer')]
  },
  resolve: {
    alias:{
          "scripts" : path.resolve( __dirname, 'src/scripts'),
          "styles" : path.resolve( __dirname, 'src/styles'),
          "img" : path.resolve( __dirname, 'src/img')
        },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.scss']
  }
}