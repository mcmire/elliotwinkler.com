// Stolen from:
// <https://github.com/grassdog/middleman-webpack>

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const bourbon = require("bourbon");

const sassFunctions = require("./config/colors/sass-functions.js");

const PUBLIC_PATH = "assets";
const JAVASCRIPTS_PATH = "javascripts";
const STYLESHEETS_PATH = "stylesheets";
const IMAGES_PATH = "images";
const FONTS_PATH = "fonts";

const TMP_DIR = path.resolve(__dirname, ".tmp");
const CONTEXT_DIR = path.resolve(__dirname, "assets");

function shouldOutputSourceMap() {
  return process.env.NODE_ENV === "development";
}

function determineDevtool() {
  if (process.env.NODE_ENV === "development") {
    // The external source map options, such as this one, works in Firefox --
    // the inline source map options don't work
    return "cheap-module-source-map";
  } else {
    return false;
  }
}

function determinePlugins() {
  const plugins = [
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: path.join(PUBLIC_PATH, STYLESHEETS_PATH, "[name].bundle.css"),
    }),
  ];

  return plugins;
}

function determineMinimizer() {
  if (process.env.NODE_ENV === "production") {
    return [
      new TerserPlugin({
        //sourceMap: shouldOutputSourceMap(),   // this is automatic (?)
        terserOptions: { mangle: false },
      }),
      new CssMinimizerPlugin(),
    ];
  } else {
    return [];
  }
}

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    sourceMap: shouldOutputSourceMap(),
    postcssOptions: {
      plugins: [require("autoprefixer")],
    },
  },
};

const config = {
  mode: process.env.NODE_ENV || "development",
  devtool: determineDevtool(),
  context: CONTEXT_DIR,
  entry: { all: "./" + path.join(JAVASCRIPTS_PATH, "all.js") },
  resolve: {
    alias: {
      blog: path.resolve(__dirname, "../personal-content--writings/blog"),
    },
    modules: [
      path.resolve(CONTEXT_DIR, JAVASCRIPTS_PATH),
      path.resolve(CONTEXT_DIR, STYLESHEETS_PATH),
      path.resolve(CONTEXT_DIR, IMAGES_PATH),
      "node_modules",
    ],
    extensions: [".js", ".css", ".scss", ".woff", ".woff2"],
  },
  output: {
    path: path.resolve(TMP_DIR, "dist"),
    publicPath: "/",
    filename: path.join(PUBLIC_PATH, JAVASCRIPTS_PATH, "[name].bundle.js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: shouldOutputSourceMap(),
            },
          },
          postcssLoader,
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: shouldOutputSourceMap(),
            },
          },
          postcssLoader,
          {
            loader: "sass-loader",
            options: {
              sourceMap: shouldOutputSourceMap(),
              sassOptions: {
                includePaths: bourbon.includePaths,
                functions: sassFunctions,
              },
            },
          },
        ],
      },
      /*
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/images/",
          outputPath: path.join(PUBLIC_PATH, IMAGES_PATH, "/"),
        },
      },
      */
    ],
  },
  plugins: determinePlugins(),
  optimization: {
    minimizer: determineMinimizer(),
  },
};

module.exports = config;
