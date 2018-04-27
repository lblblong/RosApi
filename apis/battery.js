let battery = require('../ros/Battery')

module.exports = {
    'GET /v1/battery': async ctx => {
        if( battery.data){

        }
        ctx.body = battery.data
    }
}
