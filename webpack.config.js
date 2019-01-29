const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const dev = Boolean(process.env.WEBPACK_SERVE);

const resolve = (dir) => {
    return path.join(__dirname, dir);
}

    ; (function init() {

        const logger = console.log;

        logger("output输出的path路径为", resolve('dist'));

        logger("copy路径从", resolve('node_modules/jquery/dist/'), "到", resolve('dist/assets/'));

    })();

let plugins = [
    new CopyWebpackPlugin([
        {
            from: resolve('node_modules/jquery/dist/'),
            to: resolve('dist/assets/'),
            toType: "dir"
        }
    ]),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunksSortMode: 'none'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        assets: [
            'assets/jquery.min.js'
        ],
        append: false
    })
];

module.exports = {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    entry: ['./src/loadBar/loadBar.js', './src/loadBar/loadBar.css'],
    output: {
        path: resolve('dist'),
        filename: 'loadBar.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    plugins
}

if (dev) {
    module.exports.serve = {
        port: 8080,
        add: app => { }
    }
}
