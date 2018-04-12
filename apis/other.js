var move = require("../ros/Move")

module.exports = {
    "POST /v1/cmd/move": async ctx => {
        let { action } = ctx.request.body
        try {
            move.move(action)
        } catch (err) {
            throw Error(err.message)
        }
    }
}
