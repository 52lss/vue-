//修改webpack的默认设置
//默认入口 src/index.js
//默认出口 dist/main.js

//通过commonjs规范导出一个配置项
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //webpack 自定义配置
  //mode:'production'生产  速度慢 精细  'development':开发  快
  //mode 默认为production
  mode: 'production',
  //相对路劲
  entry: './src/main.js', //默认 src/index.js
  //output.path:输出的目录  path为绝对路径
  //__dirname代表当前文件所在的绝对路径
  //output.filename: 输出的文件名字
  output: {
    path: path.join(__dirname, 'bundle'), //bundle 自己命名
    filename: 'bundle.js',
    clean: true, //先清除path目录 然后再重新打包
  },
  //plugins:[] 配置所有webpack的插件  是用于提高整个webpack边边角角的能力
  //loader 是用来提高webpack的打包能力的
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  devServer: {
    open: true, //自动打开浏览器运行项目
    //默认接口号
    port: 8888, //0-65535
  },
  //模块解析规则
  module: {
    //用于配置loader
    rules: [
      //对应的一种文件的类型
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      //1.less=load :识别less文件，调用less
      {
        test: /\.less$/, // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash:10][ext]',
        },
      },
      // {//处理图片
      //     test: /\.(png|jpg|gif|jpeg)$/i,
      //    // type:'asset/resource', //他会把图片单独打出来  type指定资源类型
      //     type:'asset/inline',  //以base64的形式打包进js

      //     // use: [
      //     //     {
      //       //base64字符串  就是dataURL
      //     //       loader: 'url-loader', // 匹配文件, 尝试转base64字符串打包到js中
      //     //       // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
      //     //       options: {
      //     //         limit: 8 * 1024,
      //     //       },
      //     //     },
      //     //   ],
      //       generator:{
      //         filename: 'images/[name].[hash:6][ext]'
      //         //[name]图片原名
      //         //[hash:6] 6位随机生成的字符串
      //         //[text] 原始后缀
      //       }
      // },
      {
        //处理图片
        test: /\.(png|jpg|gif|jpeg)$/i,

        //  type:'asset/inline',  //以base64的形式打包进js

        type: 'asset', //以8kb为界限， 大于8kb打包生成图片   小于8kb  会打包成base64
        generator: {
          filename: 'images/[name]-[hash:6][ext]',
        },
        parser: {
          //base64打包的时候的选中调教
          dataUrlCondition: {
            //maxSize 单位是字节
            maxSize: 25 * 1024,
          },
        },
      },
      //babel 语法降级
      // 1.下载yarn add @babel/core   包名为core
      //2.module.rules {test:/\.js$/,use:['babel-loader']}

      //3.新建babel.config.js  module.exports { presets:['@babel/prsset-env']}
      {
        test: /\.js$/,
        //use: ['babel-loader'],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
          }
      }
      },
      //
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/path/to/",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
}
//npx 脚本命令
//npx webpack 打包  如果不配置  "build": "webpack",
//首先到node_modules 找webpack 命令 ,使用webpack打包
//如果没有webpack  他会下载webpack并打包 打包完之后 再 删除
