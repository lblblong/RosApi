var pose = require('../ros/Pose')

module.exports = {
    'GET /v1/pose': async ctx => {
        let data = pose.data
        if (data == null) throw Error('位置数据暂未初始化')
        ctx.body = pose.data
    },
    'POST /v1/pose': async ctx => {
        let { x, y, z, w } = ctx.request.body
        pose.startNavPose({
            x,
            y,
            z,
            w
        })
    },
    'DELETE /v1/pose': async ctx => {
        pose.cancelNav()
    }
}
