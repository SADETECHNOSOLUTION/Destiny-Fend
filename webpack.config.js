const path = require('path');

module.exports = {
  // Other configuration settings...

  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/")
    }
  },

  // Add devServer configuration if you are using Webpack Dev Server
  devServer: {
    setupMiddlewares: function(middlewares, devServer) {
      // Example: Add a custom middleware
      middlewares.unshift((req, res, next) => {
        console.log('Custom middleware before');
        next();
      });

      // You can also add more middlewares or modify them here as needed

      return middlewares;
    },
    // You can add other devServer options here like:
    port: 3000, // Specify the port to run the dev server on
    hot: true,   // Enable hot module replacement
    open: true,  // Automatically open the browser
  },

  // Other configuration settings...
};
