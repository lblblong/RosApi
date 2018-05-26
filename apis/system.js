let { callshSync } = require('../util/call_sh')
let logger = require('../log')

// 切换服务脚本
let change_service = '/home/ubuntu/zhrobot/zhrobot-ChangeService.sh'

module.exports = {
    'GET /v1/system/mapping': async ctx => {
        try {
            let rep = await callshSync(change_service, ['mapping'])
            ctx.body = rep
        } catch (e) {
            throw Error('切换到建图模式失败')
        }
    },
    'GET /v1/system/navigation': async ctx => {
        try {
            let rep = await callshSync(change_service, ['navigation'])
            ctx.body = rep
        } catch (e) {
            throw Error('切换到导航模式失败')
        }
    }
}
