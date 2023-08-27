const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    target: 'node',
    entry: ['@babel/polyfill', './src/server.js'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      clean: true,
    },
    externals: [webpackNodeExternals()],
    module: {
      rules: [
        {
          test: /\.(js)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['last 2 versions'],
                    },
                    modules: process.browser ? false : 'commonjs',
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    devtool: isProduction ? false : 'source-map',
    plugins: [
      new ESLintPlugin({
        extensions: ['.ts', '.js'],
      }),
      // new Dotenv(),
      // new webpack.DefinePlugin({
      //   'process.env': JSON.stringify(dotenv.config().parsed),
      // }),
    ],
  };

  return {
    ...config,
  };
};
