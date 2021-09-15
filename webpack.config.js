const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const devMode = process.env.NODE_ENV || "development";

module.exports = {
  entry: "./main.ts",
  output: {
    filename: "main.min.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  mode: devMode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.json$/,
        use: "json-loader",
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: { name: "[path][name].[ext]?[hash]", limit: 10000 },
          },
        ],
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[path][name].[ext]?[hash]" },
          },
        ],
      },
    ],
  },
  devServer: {
    static: [path.resolve(__dirname, "dist")],
    open: true,
    compress: true,
    port: 3000,
    // watch: true,
    hot: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./views/index.html",
      minify: process.env.APPENV === "production" ? true : false,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".txt", ".json"],
  },
};
