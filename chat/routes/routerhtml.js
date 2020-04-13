const fs = require('fs')

function render( page ) {
    return new Promise(( resolve, reject ) => {
        let viewUrl = `./static/view/${page}`
        fs.readFile(viewUrl, {encoding:'utf8'}, ( err, data ) => {
            if ( err ) {

                reject( err )
            } else {
                resolve( data )
            }
        })
    })
}
/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route( url ) {

    let view = '/'
    switch ( url ) {
        case '/':
            view = 'index.html'
            break
        case '/index':
            view = 'index.html'
            break
        case '/register':
            view = 'register.html'
            break
        case '/404':
            view = '404.html'
            break
        default:
            break
    }
    let html = await render( view )
    return html

}

module.exports = route;
