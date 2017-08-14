module.exports = function() {
  return {
    entry: {
      example: "./example.jsx",
      world: "./example_world.jsx",
      us_students: "./example_us_students.jsx"
    },
    output: {
      path: __dirname + "/static",
      filename: "[name].bundle.js"
    },
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
    }
  }
};
