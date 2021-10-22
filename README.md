# HTML + WebPack 5 = Boilerplate

## Table of Contents

1. [Requirements](#1-requirements)
1. [Quick Start](#2-quick-start)
1. [Environment Configuration](#3-environment-configuration)
1. [Adding Google Fonts](#4-adding-google-fonts)
1. [Adding Responsive Images](#5-adding-responsive-images)
1. [Image Credits](#6-image-credits)

## 1. Requirements

The boilerplate needs [Node.js](https://nodejs.org/en/) to be installed on your system.
It was tested with version 16 and newer.

## 2. Quick Start

1. Clone the repository into a new folder for your new project.

   ```bash
   git clone git@github.com:ismael01866/html-webpack-boilerplate.git new-project
   ```

2. Install dependencies

   ```bash
   npm install
   ```

5. Run webpack

   ```bash
   npm run dev
   ```

   The dev command will start webpack and webpack-dev-server and tell it to watch for changes in HTML, JS and SCSS files.

   If you want to compile all assets for production usage, run the following command.

   ```bash
   npm run build
   ```

   This command tells webpack to run in production mode and compiles all of the assets in a minified version, ready to be delivered as production assets.

## 3. Environment Configuration

If you use sensitive information in your code, like API keys or encryption tokens, you should store thosea
in an `.env` file that is ignored by git.

The `.env.default` file should contain all the variables that your application needs, but without the real data and
should contain either empty variables or default values that can be used by everyone. The variables will get replaced
during asset compilation so that only those variables are added, that are referenced in your code.
