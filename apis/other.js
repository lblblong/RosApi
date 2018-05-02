var move = require("../ros/Move")

module.exports = {
    "POST /v1/cmd/move": async ctx => {
        // 判断是否是在去充电的过程中
        if (global.charge == true) {
            throw Error('正在前往充电中，请不要操作ROS')
        }
        let { action } = ctx.request.body
        try {
            move.move(action)
        } catch (err) {
            throw Error(err.message)
        }
    }
}
