const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports={
    //entry:打包的入口文件，一个字符串或者一个对象 __dirname是项目的根目录
    entry:path.resolve(__dirname,'src/main.js'),
    //output:配置打包的结果，一个对象
        //path：定义输出文件路径，一个字符串
        //fileName：定义输出文件名，一个字符串
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'bundle.js'
    },
    //module:定义对模块的处理逻辑，一个对象
    module:{
        // loaders：定义一系列的加载器，一个数组
        // [
        //     {
        //         test:正则表达式，用于匹配到的文件
        //         loader/loaders被rules替换了，rules属性，它有两个子属性.test和.use
        //         include:字符串或者数组，指包含的文件夹
        //         exclude：字符串或者数组，指排除的文件夹
        //      }
        // ]
        rules:[
            {//编译js文件
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/
            }
            ,{//编译css文件
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
            ,{//编译vue文件
                test:/\.vue$/,
                use:'vue-loader'
            }
        ]
    },
    //plugins:定义插件，一个数组
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"src/index.html")
        })
    ]
}