var webpack = require('webpack');
module.exports = {
    context: __dirname+'/src',
    entry: "./test.js",
    output: {
        path: __dirname,
        filename: 'test.bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
