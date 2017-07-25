var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './example.jsx'),
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          'presets': ['es2015', 'react']
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  }
}
