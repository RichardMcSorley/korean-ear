const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const webpack = require("webpack");



const NODE_ENV = (process.env.NODE_ENV = process.env.NODE_ENV || "development");

if (NODE_ENV === "test") {
  //TODO: creat these .env files for poduction / test enviroments
  require("dotenv").config({ path: ".env.test" });
} else if (NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}
else if (NODE_ENV === "production") {
 require("dotenv").config({ path: ".env.production" });
}

module.exports = env => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("build/styles.css");
  return {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "www"),
      filename: "build/bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },

        //FONTS
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=/assets/fonts/[name].[ext]'
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'resolve-url-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },

      ]
    },
    plugins: [
      CSSExtract,
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        //DO NOT COPY FONTS THIS WAY! We are loading them above :)
        //IMAGES
         { from: 'src/assets/images', to: 'assets/images' },
         { from: 'src/assets/audio', to: 'assets/audio' },
        //index.html
         { from: 'src/index.html', to: 'index.html' },
        //OTHER
     ])
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "/www"),
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only'
    }
  };
};
