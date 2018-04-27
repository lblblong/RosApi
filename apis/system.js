let { callshSync } = require('../util/call_sh')
let logger = require('../log')

module.exports = {
    'GET /v1/system/mapping': async ctx => {
        try {
            let rep = await callshSync(
                '/home/ubuntu/zhrobot/zhrobot-ChangeService.sh',
                ['mapping']
            )
            ctx.body = rep
        } catch (e) {
            throw Error('切换到建图模式失败')
        }
    },
    'GET /v1/system/navigation': async ctx => {
        try {
            let rep = await callshSync(
                '/home/ubuntu/zhrobot/zhrobot-ChangeService.sh',
                ['navigation']
            )
            ctx.body = rep
        } catch (e) {
            throw Error('切换到导航模式失败')
        }
    }
}
