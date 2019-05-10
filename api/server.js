import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import glob from 'glob';


const app = express();
const port = process.env.PORT || 15000;//16020;


global.dirname = __dirname;
global.localhost = process.env.LOCALHOST || 'http://127.0.0.1';
global.port = process.env.DOWNLOAD_PORT || 15000;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/../client'));


//======= 跨域请求处理 ========
app.use(cors());
//======= 路由匹配 ========
const routers = glob.sync('./routers/**/*.js', { cwd: __dirname });
routers.forEach(r => {
    const router = require(r);
    router.prefix && app.use(router.prefix, router);
})
//======= 服务启动以及端口匹配 ======
app.listen(port, () => {
    console.log('magic happen on ', port)
});

exports = module.exports = app;
