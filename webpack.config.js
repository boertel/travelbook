var path = require('path');
var src = path.join(__dirname, 'src')

module.exports = {
    context: src,
    entry: './js/index.js',
    output: {
        path: '.',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(src, 'js'),
                loader: 'babel',
                exclude: /node_modules/,
                include: src
            }
        ]
    }
};
