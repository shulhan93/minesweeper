const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, 'src'), // от какой папки отталкиваться вебпаку
  mode: 'development',
  entry: {
    main: './index.js',
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name].[contenthash][ext]',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: (module, chunks, cacheGroupKey) => {
        return 'vendor';
      },
    },
  },

  devServer: {
    port: 9000,
    static: './src',
    hot: isDev,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ESLintPlugin(),
  ],

  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'group-css-media-queries-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          'group-css-media-queries-loader',
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: isDev
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
      },

      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[name].[contenthash][ext]',
        },
      },
    ],
  },
};
