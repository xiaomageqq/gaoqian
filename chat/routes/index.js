const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello Koa Interfaces';
});

router.get("/user", async  (xtx) => {
    ctx.body = {
        "name":"gaoqian",
        "psd":"123456"
    }
})
module.exports = router


