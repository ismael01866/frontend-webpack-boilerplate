const webpack   = require('webpack');

const { merge } = require('webpack-merge');

const common    = require('./webpack.common.js');
const settings  = require('./webpack.settings.js');

const configureDevServer = () => {
  return {
    host: settings.devServerConfig.host(),
    port: settings.devServerConfig.port(),
    hot : true,
    open: true,
    watchFiles: {
      paths: ['src/**/*', 'views/**/*', 'public/**/*'],
      options: {
        usePolling: true
      }
    },
    headers: {
      'Access-Control-Allow-Origin' : '*'
    }
  };
};

const configureImageLoader = () => {
  return {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  };
};

module.exports = merge(
  common.config, {
    mode     : 'development',
    devtool  : 'eval-cheap-source-map',
    devServer: configureDevServer(),
    module: {
      rules: [
        common.configureBabelLoader(),
        common.configureHTMLLoader(),
        common.configureSCSSLoader(),
        configureImageLoader()
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
);
