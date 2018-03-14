var move = require("../ros/Move")

module.exports = {
    "POST /v1/cmd/move": async ctx => {
        let query = ctx.query
        let { action } = query
        try {
            move.move(action)
        } catch (err) {
            throw Error(err.message)
        }
    }
}
