const Router = require('koa-router');
const serverRouter = new Router();
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const path = require('path')
const {query} = require('../server/async-db')


const app = new Koa()
app.use(bodyParser())



let listUser = require('../server/user/list')

serverRouter.get("/user", async  (ctx) => {
    let list = []
    let sql = "SELECT * FROM user ORDER BY ordr DESC";
    let datalist = await query(sql);
    ctx.body = {
        status:200,
        list:datalist
    }
})



//注册新用户
serverRouter.post("/regster",async (ctx,next) => {
    var postData = ctx.request.body;
    let sql="INSERT INTO user (user,psd) VALUES('"+String(postData.user)+"','"+String(postData.psd)+"')"
    query(sql,(err,resault)=>{
        if(err){
            console.log('失败',err)
            ctx.response.body = {
                code:200,
                msg:'注册失败'
            }
            return;
        }
    })
    ctx.body = {
        status:200,
        msg:'注册成功'
    }
})

//登录
serverRouter.post("/login",async (ctx,next) => {
    var postData = ctx.request.body;
    let list = []
    listUser.then((data)=>{
        list = data;
        list.forEach((item)=>{
            if(item.user == postData.user){
                ctx.body = {
                    status:200,
                    info:item
                }
                return;
            }
        })
    }).catch(()=>{

    })
    ctx.body = {
        status:200,
        info:{
            msg:'登录失败'
        }
    }
})

//置顶
serverRouter.post("/placeroof",async (ctx,next) => {
    var postData = ctx.request.body;
    let sql="UPDATE  user SET ordr=1 WHERE id="+postData.id;
    query(sql,(err,resault)=>{
        if(err){
            ctx.response.body = {
                code:200,
                msg:'置顶失败'
            }
            return;
        }
    })
    ctx.body = {
        status:200,
        info:{
            msg:'置顶成功'
        }
    }
})

//取消置顶
serverRouter.post("/cancelroof",async (ctx,next) => {
    var postData = ctx.request.body;
    let sql="UPDATE  user SET ordr = 0 WHERE id="+postData.id;
    query(sql,(err,resault)=>{
        if(err){
            ctx.response.body = {
                code:200,
                msg:'置顶失败'
            }
            return;
        }
    })
    ctx.body = {
        status:200,
        info:{
            msg:'置顶成功'
        }
    }
})
//查找用户
serverRouter.post("/search_user", async  (ctx) => {
    let res = {};
    var postData = ctx.request.body;
    //let sql = "SELECT user FROM user WHERE user like"+postData.sear;
    let sql = `SELECT * FROM user WHERE user like '%${postData.sear}%'`;

    res = await query(sql);
    ctx.body = {
        status:200,
        data:{
            code:10000,
            res:res?res:'暂无'
        },
    }
})

//添加好友
serverRouter.post("/invitation", async  (ctx) => {
    let res = {};
    var postData = ctx.request.body;
    let sql = `INSERT INTO friend (user1,user2,name1,name2,status,type1,type2) VALUES('${postData.user1}','${postData.user2}','${postData.name1}','${postData.name2}','${postData.status}','${postData.type1}','${postData.type2}') `;
    res = await query(sql);
    ctx.body = {
        status:200,
        data:{
            code:10000,
            res:res
        },
    }
})

//好友列表
serverRouter.post("/friend/list",async (ctx,next) => {
    var postData = ctx.request.body;
    let list = []
    let sql = "SELECT * FROM friend WHERE user1="+postData.id+" or user2="+postData.id;
    let datalist = await query(sql);
    let friendList = [];
    datalist.forEach(item=>{
        if( item.user1 == postData.id && item.status ){
            friendList.push({
                friend_name:item.name2,
                frined_id:item.user2,
            })
        }else if( item.user2 == postData.id && item.status ){
            friendList.push({
                friend_name:item.name1,
                frined_id:item.user1,
            })
        }
    })
    ctx.body = {
        status:200,
        list:friendList
    }
})


//所有好友
serverRouter.post("/my_all_friend", async  (ctx) => {
    let res = {};
    var postData = ctx.request.body;
    let sql;
    if(postData.status != ''){
        sql = `SELECT *  FROM friend WHERE (user1 ='${postData.id}' || user2 ='${postData.id}') and status = '${postData.status}' `;
    }else{
        sql = `SELECT *  FROM friend WHERE (user1 ='${postData.id}' || user2 ='${postData.id}')`;
    }
    res = await query(sql);
    ctx.body = {
        status:200,
        data:{
            code:10000,
            res:res
        },
    }
})

//上传文件
serverRouter.post('/upload',async(ctx)=>{
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = {
        status:200,
        data:{
            code:10000,
            res:{
                url:`${ctx.origin}/uploads/${basename}`
            }
        },
    }
})
//发动态
serverRouter.post('/dynamic',async(ctx)=>{
    var postData = ctx.request.body;
    console.log('postData',postData)
    postData.fileList = String(postData.fileList)
    var data = (new Date()).getTime()

    let sql = `INSERT INTO find (user_id,create_time,message,position,picArr) values('${postData.userId}','${data}','${postData.message}','鑫苑','${postData.fileList}') `
    console.log('sql',sql)

    await query(sql);
    ctx.body = {
        status:200,
        data:{
            code:10000,
            res:'111111'
        },
    }
})
//获取动态列表
//发动态
serverRouter.post('/findlist',async(ctx)=>{
    let res = []
    var postData = ctx.request.body;
    let sql = `SELECT * FROM find WHERE user_id = '${postData.userId}' `
    res = await query(sql);
    ctx.body = {
        status:200,
        data:{
            code:10000,
            res:res
        },
    }
})


module.exports = serverRouter


