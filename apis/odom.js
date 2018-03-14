let odom = require("../ros/Odom")

module.exports = {
    "GET /v1/odom": async ctx => {
        ctx.body = odom.data
    }
}
