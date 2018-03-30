let navStatus = require("../ros/NavStatus")

module.exports = {
    "GET /v1/navStatus": async ctx => {
        var data = navStatus.data
        ctx.body = navStatus.data
    }
}
