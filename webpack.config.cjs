// import htmlPlugin from 'html-webpack-plugin';
// import ModuleFederationPlugin from 'webpack';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const webpackConfig = {
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

// export default webpackConfig;
module.exports = webpackConfig;

// https://dev.to/bitovi/how-to-build-a-micro-frontend-with-webpacks-module-federation-plugin-n41
