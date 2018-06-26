//  This file 'webpack.config.js' is part of an example for building a minimalistic React front-end
//  app step by step with Webpack 4 as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/06/25/minimalistic-react-webapp-webpack-4/


const path = require('path');

module.exports = {
    entry: [path.join(__dirname, 'webpack_in', 'entry.js')],
    output: {
        path:      path.join(__dirname, 'webpack_out'),
        filename:  'minimalistic_react.js'
      },
    mode: 'development'
  };
