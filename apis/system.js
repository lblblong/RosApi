var call_sh = require('child_process')
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

function callsh(file, para) {
    call_sh.execFile(file, [...para], function(error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error)
        }
    })
}

async function callshSync(file, para) {
    // 匹配第一个以 “{” 开头，“}” 结尾的字符串
    let re = /\{[^\}]+\}/
    try {
        let rep = await call_sh.execFileSync(file, [...para])
        rep = rep.toString()
        rep = rep.match(re)[0]
        rep = JSON.parse(rep)
        return rep
    } catch (e) {
        logger.error(e.message)
        throw e
    }
}
