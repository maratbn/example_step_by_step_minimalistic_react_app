//  This file 'webpack.config.js' is part of an example for building a minimalistic React front-end
//  app step by step with Webpack 3 as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/06/17/minimalistic-react-webapp-webpack-3/


const path = require('path');

module.exports = {
    entry: [path.join(__dirname, 'webpack_in', 'entry.js'),
            path.join(__dirname, 'webpack_in', 'entry.jsx')],
    module: {
        loaders: [{
            loader:   'babel-loader',
            test:     /\.jsx$/
          }]
      },
    output: {
        path:      path.join(__dirname, 'webpack_out'),
        filename:  'minimalistic_react.js'
      }
  };
