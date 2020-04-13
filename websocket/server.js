const websocket = require('ws')

const wss = new websocket.Server({port:'9000'},()=>{
    console.log('ws服务已起动')
})

var online = "";//在线人数
var user = {}//存储链接用户
wss.on('connection',(ws,req)=>{
    online = wss._server._connections;
    console.log('online',online)
    //ws.send('当前在线'+online+'人');
    let i=req.url;
    console.log('请求地址',i)
    let m = i.match(/(?<=\?)[^:]+?(?=:|$)/);//提取我是谁，这部分代码只会执行一次
    if(m){
        user[m]= ws;//
    }
    let u = i.match(/(?<=:).+?$/);//提取发给谁
    ws.on('message',function(message){
        //收到消息
        if(u){
            //检查需要发送给的人
            if(user[u]){
                if(user[u].readyState===1){
                    user[u].send(message);
                    //ws.send('发送成功')
                }else{
                    ws.send('用户不在线')
                }
            }else{
                //找不到发送的人
                ws.send('未找到对应的人')
            }
        }else{
            //全部发送
            wss.clients.forEach(client=>{
                if(client !=ws && client.readyState===websocket.OPEN){
                    client.send(message)
                    ws.send('发送成功')
                }
            })
        }
    })
})