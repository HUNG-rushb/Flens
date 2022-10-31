const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: { port: 3030 },
  plugins: [new htmlPlugin({ template: './public/index.html' })],
};
