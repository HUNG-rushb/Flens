import htmlPlugin from 'html-webpack-plugin';

const webpackConfig = {
  mode: 'development',
  devServer: { port: 3031 },
  plugins: [new htmlPlugin({ template: './public/index.html' })],
};

export default webpackConfig;
