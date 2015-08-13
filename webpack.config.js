module.exports = {
  entry: "./src/IncrementalDom.js",
  output: {
    filename: "./src/Native/VirtualDom.js"
  },
  module:{
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
}
