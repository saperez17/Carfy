const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: ['babel-polyfill',path.resolve(__dirname, 'carfy/frontend/src/index.js')],
    // entry: {main: '/home/toruitas/Documents/GitHub/LollipopAI/django_backend/lollipopAI/frontend/src/index.js'},
    output: {
        // where compiled files go
        path: path.resolve(__dirname, "carfy/frontend/static/frontend/public/"),

        // 127.0.0.1/static/frontend/public/ where files are served from
        publicPath: "/static/frontend/public/",
        filename: 'main.js',  // the same one we import in index.html
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                // regex test for js and jsx files
                test: /\.(js|jsx|mjs)?$/,
                // don't look in any node_modules/ or bower_components/ folders
                exclude:  /(node_modules|bower_components)/,
                // for matching files, use the babel-loader
                use: {
                    loader: "babel-loader",
                    options: {presets: ["@babel/env", "@babel/preset-react"]}
                },
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //       'style-loader',
            //     // MiniCssExtractPlugin.loader, // instead of style-loader
            //       'css-loader'
            //     ]
            // }
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: true
                    }
                  }
                ],
                include: /\.module\.css$/
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
                exclude: /\.module\.css$/
              }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
      ],
    devServer: {
        writeToDisk: true,
    },
    mode: 'development',
};