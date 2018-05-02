let battery = require('../ros/Battery')

module.exports = {
    'GET /v1/battery': async ctx => {
        let data = battery.data
        if (data == null) throw Error('电池数据暂未初始化')
        ctx.body = data
    },
    // 去充电
    'GET /v1/charge': async ctx => {
        battery.startCharge()
    },
    // 取消自动充电
    'DELETE /v1/charge': async ctx => {
        battery.cancelCharge()
    },
    // 设置自动充电阀值
    'POST /v1/charge/ratio': async ctx => {
        let { ratio } = ctx.request.body
        try {
            ratio = parseInt(ratio)
        } catch (e) {
            throw Error('自动充电阀值必须是数字')
        }
        if (ratio < 0 || ratio > 100) {
            throw Error('自动充电阀值必须是 0 ~ 100 的数值')
        }
        battery.setChargeRatio(ratio)
    }
}
