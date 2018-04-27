let battery = require('../ros/Battery')

module.exports = {
    'GET /v1/battery': async ctx => {
        let data = battery.data
        if (data == null) throw Error('电池数据暂未初始化')
        ctx.body = battery.data
    }
}
