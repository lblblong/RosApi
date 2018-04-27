let scan = require('../ros/Scan')

module.exports = {
    'GET /v1/scan': async ctx => {
        let data = scan.data
        if (data == null) throw Error('雷达数据暂未初始化')
        ctx.body = data
    }
}
