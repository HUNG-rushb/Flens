// import htmlPlugin from 'html-webpack-plugin';
// import container from 'webpack';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const webpackConfig = {
  mode: 'development',
  devServer: { port: 6000 },
  plugins: [
    // new container.ModuleFederationPlugin({
    new ModuleFederationPlugin({
      name: 'container',
      remotes: { socialApp: 'socialApp@http://localhost:6001/remoteEntry.js' },
    }),
    new HtmlWebPackPlugin({ template: './public/index.html' }),
  ],
};

// export default webpackConfig;
module.exports = webpackConfig;
