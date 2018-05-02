var pose = require('../ros/Pose')

module.exports = {
    'GET /v1/pose': async ctx => {
        let data = pose.data
        if (data == null) throw Error('位置数据暂未初始化')
        ctx.body = data
    },
    'POST /v1/pose': async ctx => {
        // 判断是否是在去充电的过程中
        if (global.charge == true) {
            throw Error('正在前往充电中，请不要操作ROS')
        }
        let { x, y, z, w } = ctx.request.body
        pose.startNavPose({
            x,
            y,
            z,
            w
        })
    },
    'DELETE /v1/pose': async ctx => {
        // 判断是否是在去充电的过程中
        if (global.charge == true) {
            throw Error('正在前往充电中，请不要操作ROS')
        }
        pose.cancelNav()
    }
}
