let scan = require("../ros/Scan")

module.exports = {
    "GET /v1/scan": async ctx => {
        ctx.body = scan.data
    }
}
