/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./public/favicon.ico",
});

module.exports = {
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$|scss/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [htmlPlugin],
};
