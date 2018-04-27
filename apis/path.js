let path = require('../ros/Path')

module.exports = {
    'GET /v1/path': async ctx => {
        let data = path.data
        if (data == null) throw Error('导航路径数据暂未初始化')
        ctx.body = data.poses
    }
}
