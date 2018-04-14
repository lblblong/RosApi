let navStatus = require('../ros/NavStatus')

module.exports = {
    'GET /v1/navStatus': async ctx => {
        ctx.body = navStatus.data
    }
}
