// 文件日志
var log = require('./log')
let { environment } = require('./config')

process.on('uncaughtException', err => {
    if (environment == 'dev') {
        console.error(err)
        return
    }
    console.log('捕获到无法处理的异常，已记录')
    log.error(err)
    // process.exit(0)
})

require('./event')
require('./ros')

var Koa = require('koa')
// 命令行 - 请求日志
var logger = require('koa-logger')
var cors = require('kcors')
var formatOutput = require('./middleware/format-output')
var rosStatus = require('./middleware/ros-status')
router = require('./middleware/router')('../apis')

var app = new Koa()

app.on('error', (err, ctx) => {
    log.error(err.message)
})

app.use(formatOutput())
app.use(cors())
app.use(rosStatus())
app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8080)

console.log(`服务已启动在 8080 端口`)
