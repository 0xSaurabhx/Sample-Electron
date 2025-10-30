const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src/renderer/src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    publicPath: isDev ? '/' : './',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/renderer/public/index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/renderer'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};

// This file configures webpack to bundle the renderer process code. It includes:
// - Entry point: src/renderer/src/index.tsx
// - Output: dist/renderer/bundle.js
// - Loaders for TypeScript/TSX, CSS, and assets
// - Development server configuration for hot reloading
