require('dotenv').config();

const configureWhitelistPatterns = () => /someClass|anotherClass/;

const config = {
  entries: {
    index: 'index.js'
  },

  urls: {
    publicPath: () => process.env.PUBLIC_PATH
  },

  paths: {
    src: {
      js          : './../src/js/',
      scss        : './../src/scss/',
      node_modules: './../node_modules'
    },
    dist: {
      base : './../dist',
      clean: ['**/*']
    },
    templates: './../views',
    public: './../public/'
  },

  stats: {
    preset: 'minimal'
  },

  devServerConfig: {
    host  : () => process.env.DEVSERVER_HOST,
    port  : () => process.env.DEVSERVER_PORT
  },

  purgeCssConfig: {
    paths: ['./../src/**/*.js', './../views/**/*.html'],
    whitelistPatterns: configureWhitelistPatterns()
  }

};

module.exports = config;
