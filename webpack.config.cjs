// import htmlPlugin from 'html-webpack-plugin';
// import ModuleFederationPlugin from 'webpack';
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: { port: 6001 },
  plugins: [
    new ModuleFederationPlugin({
      name: 'socialApp',
      filename: 'remoteEntry.js',
      exposes: {
        // './SocialAppIndex': './src/index',
        './SocialAppIndex': './src/test',
      },
    }),
    new HtmlWebPackPlugin({ template: './public/test.html' }),
  ],
};

// https://dev.to/bitovi/how-to-build-a-micro-frontend-with-webpacks-module-federation-plugin-n41
