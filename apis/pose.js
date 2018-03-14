var pose = require("../ros/Pose")

module.exports = {
    "GET /v1/pose": async ctx => {
        ctx.body = pose.data
    },
    "POST /v1/pose": async ctx => {
        let query = ctx.query
        let { x, y, z, w } = query
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
