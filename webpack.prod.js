const common = require('./webpack.common');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin()
    ]
  }
});