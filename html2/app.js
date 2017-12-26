/**
 * Created by qiaolele on 2017/7/26.  服务器地址
 */
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.listen(8080);
//中间件U
app.use(bodyParser());//解析请求
app.use(express.static('./'));//设置加载静态资源的目录

//
app.get('/',(req,res)=>{
    res.sendFile('05vue-resource.html',{root:'./'})
})

app.get('/get',(req,res) => {
    console.log(req.query)
    res.send("我是通过get请求得到的数据")
})

app.post('/post',(req,res) => {
    console.log(req.body);
    res.send(req.body)
})