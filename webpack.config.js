module.exports = {
  entry: ["./src/client/index.js"],
  output: {
    filename: "./bundle.js",
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3000,
    contentBase: "./public",
    open: true,
  },
}
