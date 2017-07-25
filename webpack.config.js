const webpack = require("webpack")

module.exports = {

  entry: "./src/index.jsx",

  output: {
    library: "Map",
    libraryTarget: "umd"
  },

  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          "presets": ["es2015", "react"]
        }
      }
    ]
  },

  node: {
    Buffer: false
  },

}
