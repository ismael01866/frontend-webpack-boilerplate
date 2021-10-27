const glob                 = require('glob-all');
const path                 = require('path');

const { merge }            = require('webpack-merge');

const common               = require('./webpack.common.js');
const settings             = require('./webpack.settings.js');

const TerserPlugin         = require('terser-webpack-plugin');
const PurgecssPlugin       = require('purgecss-webpack-plugin');
const CompressionPlugin    = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const zopfli               = require('@gfx/zopfli');

const configureCompression = () => {
  return {
    filename            : 'static/gz/[path][base].gz',
    test                : /\.(js|css|html|svg)$/,
    threshold           : 10240,
    minRatio            : 0.8,
    deleteOriginalAssets: false,
    compressionOptions: {
      numiterations: 15, level: 9
    },
    algorithm(input, compressionOptions, callback){
      return zopfli.gzip(input, compressionOptions, callback);
    }
  };
};

const configureFontLoader = () => {
  return {
    test: /\.(svg|eot|woff|woff2|ttf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]'
    }
  };
};

const configureImageLoader = () => {
  return {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'static/[hash][ext][query]'
    },
    use: [
      {
        loader: 'file-loader',
        options: {
          plugins: [
            require('imagemin-gifsicle')({
              interlaced: true
            }),
            require('imagemin-mozjpeg')({
              progressive: true,
              arithmetic: false
            }),
            require('imagemin-optipng')({
              optimizationLevel: 5
            }),
            require('imagemin-svgo')({
              plugins: [
                { convertPathData: false }
              ]
            })
          ]
        }
      }
    ]
  };
};

const configureSCSSLoader = () => {
  return {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: false
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false
        }
      }
    ]
  };
};

const configureMiniCssExtract = () => {
  return {
    filename: '[name].[chunkhash].css'
  };
};

const configurePurgeCss = () => {
  const paths = [];

  for (const [key, value] of Object.entries(settings.purgeCssConfig.paths)){
    paths.push(path.join(__dirname, value));
  }

  return {
    paths            : glob.sync(paths, { nodir: true }),
    whitelistPatterns: settings.purgeCssConfig.whitelistPatterns
  };
};

const configureOptimization = () => {
  return {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: false,
            pure_funcs  : ['console.log']
          }
        }
      })
    ]
  };
};

module.exports = merge(
  common.config, {
    mode: 'production',
    optimization: configureOptimization(),
    module: {
      rules: [
        common.configureBabelLoader(),
        common.configureHTMLLoader(),
        configureFontLoader(),
        configureSCSSLoader(),
        configureImageLoader()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(
        configureMiniCssExtract()
      ),
      new PurgecssPlugin(
        configurePurgeCss()
      ),
      new CompressionPlugin(
        configureCompression()
      )
    ]
  }
);
