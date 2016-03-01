var path = require('path');
    module.exports = {
        entry: './js/index.js',
        output: {
            path: __dirname,
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: path.join(__dirname, 'js'),
                    loader: 'babel',
                    exclude: /node_modules/,
                    include: __dirname
                }
            ]
        }
    };
