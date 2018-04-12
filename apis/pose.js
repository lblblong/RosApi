var pose = require("../ros/Pose")

module.exports = {
    "GET /v1/pose": async ctx => {
        ctx.body = pose.data
    },
    "POST /v1/pose": async ctx => {
        let { x, y, z, w } = ctx.request.body
        pose.startNavPose({
            x,
            y,
            z,
            w
        })
    },
    "DELETE /v1/pose": async ctx => {
        pose.cancelNav()
    }
}
