const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin') // 清楚html插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html-webpack插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css提取出来
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

const PurifyCSS = require('purifycss-webpack') // 做tree-shaking
const glob = require('glob-all') // 帮助purityCss进行路径处理


module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: './', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 代码打包后的文件名
    chunkFilename: '[name].js' // 代码拆分后的文件名
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              outputPath: 'images/',
              limit: 20000 //把小于 20kb 的文件转成 Base64 的格式
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/, // 针对 .css 后缀的文件设置 loader
        use: [
          {
           loader: MiniCssExtractPlugin.loader
          }, 
          'css-loader', // 顺序不能错，非常关键。
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader' // 使用 sass-loader 将 scss 转为 css
        ]
      }
    ]
  },
  optimization: {
      splitChunks: {
          chunks:'all',
          cacheGroups: {
            lodash: {
              name: 'chunk-lodash', // 单独将 lodash 拆包
              priority: 10, // 优先级要大于 commons 不然会被打包进 commons
              test: /[\\/]node_modules[\\/]lodash[\\/]/
            },
            commons: {
              name: 'commons',
              minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
              minChunks: 1, // 最小公用次数
              priority: 5, // 优先级
              reuseExistingChunk: true // 公共模块必开启
            }
          }
      }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '测试',
      minify: {
        removeComment: true,
        // collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS 处理器，默认为 cssnano
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
      canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    }),
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    })
  ],
}