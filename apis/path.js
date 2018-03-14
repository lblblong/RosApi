let path = require("../ros/Path")

module.exports = {
    "GET /v1/path": async ctx => {
        ctx.body = path.data.poses
    }
}
