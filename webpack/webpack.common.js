const path                   = require('path');
const settings               = require('./webpack.settings.js');

const DotenvWebpack          = require('dotenv-webpack');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const CopyWebpackPlugin      = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const configureEntries = () => {
  const entries = {};

  for (const [key, value] of Object.entries(settings.entries)){
    entries[key] = path.resolve(__dirname, settings.paths.src.js + value);
  }

  return entries;
};

const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader'
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
    type: 'asset',
    generator: {
      filename: 'assets/[hash][ext][query]'
    }
  };
};

const configureHTMLLoader = () => {
  return {
    test  : /\.html$/,
    loader: 'html-loader'
  };
};

const configureSCSSLoader = () => {
  return {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  };
};

const configureResolveModules = () => {
  const modules = [];

  for (const [key, value] of Object.entries(settings.paths.src)){
    modules.push(path.join(__dirname, value));
  }

  return modules;
};

const config = {
  name : 'main',
  entry: configureEntries(),
  output: {
    filename  : '[name].[fullhash].js',
    path      : path.resolve(__dirname, settings.paths.dist.base),
    publicPath: settings.urls.publicPath() + '/'
  },
  resolve: {
    extensions: ['.scss', '.js'],
    modules: configureResolveModules()
  },
  plugins: [
    new CleanWebpackPlugin({
      dry                         : false,
      verbose                     : true,
      cleanOnceBeforeBuildPatterns: settings.paths.dist.clean
    }),

    new DotenvWebpack({
      path: '.env'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon : path.resolve(__dirname, settings.paths.public, 'favicon.ico'),
      template: path.resolve(__dirname, settings.paths.templates, 'index.html')
    })

    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: '', to: '' }
    //   ]
    // })
  ]
};

module.exports = {
  config,
  configureFontLoader,
  configureImageLoader,
  configureBabelLoader,
  configureHTMLLoader,
  configureSCSSLoader
};
