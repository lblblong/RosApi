let odom = require('../ros/Odom')

module.exports = {
    'GET /v1/odom': async ctx => {
        let data = odom.data
        if (data == null) throw Error('速度数据暂未初始化')
        ctx.body = odom.data
    }
}
