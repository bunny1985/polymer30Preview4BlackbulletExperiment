module.exports = [
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader'
      }
    },
    {
      test: /\.css$/,
      use: 'raw-loader'
    },
    {
      test: /\.js$/,
      use: 'babel-loader'
    },
    
    {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
  ];