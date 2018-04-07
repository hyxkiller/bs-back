const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const apiRouter = require('./routes/api')

// 设置静态路径
app.use(express.static(path.join(__dirname)))
//配置body解析器
app.use(bodyParser.json());    //获得ajax数据
app.use(bodyParser.urlencoded({extended: false}));   //获得表单数据

app.use(cookieSession({
    name: 'session',
    secret: 'hyx',   //secret:用来注册session id 到cookie中，相当与一个密钥。
    maxAge: 60 * 60 * 24 * 2
}))

//使用路由
app.use('/',apiRouter);

//监听端口号
app.listen(process.env.PORT || '5000')