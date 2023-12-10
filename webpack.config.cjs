// https://dev.to/bitovi/how-to-build-a-micro-frontend-with-webpacks-module-federation-plugin-n41
// https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
// https://stackoverflow.com/questions/50824024/urierror-failed-to-decode-param-public-url-favicon-ico
// https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e
// https://www.ryadel.com/en/firefox-this-address-is-restricted-override-fix-port/

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HashOutput = require('webpack-plugin-hash-output');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
// const deps = require('./package.json').dependencies;
const packageJson = require('./package.json');
// const Dotenv = require('dotenv-webpack');

module.exports = {
  // mode: 'development',
  // uniqueName: 'images-social',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    // },
    // https://stackoverflow.com/questions/70178726/webpack-manifest-json-not-found
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'public'),
      },
    ],
    open: true,
    port: 6100,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'flens',
      filename: 'remoteEntry.js',
      remotes: {
        // chat: 'chat@http://localhost:6120/remoteEntry.js',
        chat: 'chat@https://develop.d1tavnpfnfnpjs.amplifyapp.com/remoteEntry.js',
      },
      shared: {
        // ...packageJson.dependencies,
        ...packageJson.peerDependencies,

        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
        // 'styled-components': {
        //   singleton: true,
        //   requiredVersion: packageJson.dependencies['styled-components'],
        // },
      },
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      template: './public/index.html',
      // filename: 'index.html',
      manifest: './public/manifest.json',
    }),
    // new Dotenv(),
    // new HashOutput(),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],

                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
              ],
            },
          },
        ],
        resolve: { extensions: ['.js', '.jsx'] },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'],
        // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //   },

  //   // runtimeChunk: false,
  //   // minimize: true,
  //   // // moduleIds: true,
  //   // // chunkIds: true,

  //   // removeAvailableModules: true,
  //   // flagIncludedChunks: true,
  //   // // occurrenceOrder: false,
  //   // usedExports: true,
  //   // concatenateModules: true,
  //   // sideEffects: false,
  // },

  // resolve: {
  //   alias: {
  //     'styled-components': path.resolve('./node_modules', 'styled-components'),
  //   },
  // },
};
