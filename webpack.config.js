const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

function getTemplateContent({ htmlWebpackPlugin }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>SpaceX Launches</title>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <style>
        .fade {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      </style>
      ${htmlWebpackPlugin.tags.headTags}
    </head>
    <body>
      <div id="root"></div>
      ${htmlWebpackPlugin.tags.bodyTags}
    </body>
  </html>
  `;
}

const basePlugins = [
  new HtmlWebpackPlugin({
    templateContent: getTemplateContent,
  }),
];

const devPlugins = [new webpack.HotModuleReplacementPlugin()];

const profilerPlugins = [
  new BundleAnalyzerPlugin({
    analyzerPort: 8004,
  }),
];

function getPlugins() {
  if (process.env.NODE_ENV !== "production") {
    return [...basePlugins, ...devPlugins];
  }
  if (process.env.ANALYZE_BUNDLE) {
    return [...basePlugins, ...profilerPlugins];
  }
  return basePlugins;
}

module.exports = {
  entry: "./index.js",
  devtool: process.env.NODE_ENV !== "production" && "cheap-module-source-map",
  optimization: {
    concatenateModules: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  plugins: getPlugins(),
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
