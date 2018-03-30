let battery = require('../ros/Battery')

module.exports = {
    'GET /v1/battery': async ctx => {
        ctx.body = battery.data
    }
}
