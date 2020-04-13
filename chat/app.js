const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
var http = require('http').Server(app);
var ws = require('socket.io');
const route = require('./routes/routerhtml')
const serverRouter = require('./routes/serverRouter')
const koaBody = require('koa-body')
const path = require('path')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')


/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
const {register} = require('./server/user/register')



/*var connection = mysql.createConnection({
    host     : '192.168.191.128',
    user     : 'gq',
    password : '888',
    database : 'test'
});

connection.connect();

//添加一条数据
var addSql = "INSERT INTO user VALUES (2,'g','jl')"
connection.query(addSql,function(err,resault){
    if(err){
        console.log('添加失败')
    }
    console.log('添加成功')
})

//查看数据表
var  sql = 'SELECT * FROM user';
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});*/
const WebSocket = require('ws');
const wst = new WebSocket.Server({port:9000});
wst.on('connection',ws=>{
    console.log('ws connect')
})
// var socketClient = io('ws:localhost:9000/')
// socketClient.on('init', (data) => {
 
//     console.log(data); //这是后端推送过来的数据

//     this.setState({
//         news: data
//     });
// });


// socketClient.emit();
// socketClient.on('news',function(){
//     console.log('链接成功')
// });
// socketClient.on('send',function(){
//     console.log('send')
// });
//链接ws
// var ws = new WebSocket('ws:localhost:9000/')
// ws.open = function(){
//     console.log('ws打开成功')
// }
// ws.onmessage = function(e){
//     console.log('e.data',e.data)

// }




// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.use(koaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
        // 上传目录
        uploadDir: path.join(__dirname, 'public/uploads'),
        // 保留文件扩展名
        keepExtensions: true,
    }
}));
app.use(koaStatic(path.join(__dirname, 'public')))

/*app.use(
    async (ctx ,next) => {

        next()
    }
)*/

app.use(serverRouter.routes())
app.use(serverRouter.allowedMethods());
app.use(bodyParser ())
app.use( async ( ctx ,next) => {
    if(ctx.url==='/register' && ctx.method==='POST'){
        let postData = await parsePostData( ctx )
        ctx.body = postData
    }else{
        // ctx.response.type = 'text/html';
        let url = ctx.request.url
        // console.log("-------------->", url)
        if (url == "/favicon.ico" || url === "/nodeJs/fileAction/29gzFile.js"){
            return
        }
        let html = await route( url )
        ctx.body = html
        await next();
    }
})



// 设置端口号
const port = process.env.PORT || 5000;

// 监听端口号
app.listen("5000", () => {
    console.log(`server started on ${port}`)
})


