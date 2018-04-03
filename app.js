require('./event')
require('./ros')
// 文件日志
var log = require('./log')
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
