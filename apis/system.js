var call_sh = require('child_process')

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
    try {
        let rep = await call_sh.execFileSync(file, [...para])
        rep = rep.toString()
        rep = JSON.parse(rep)
        return rep
    } catch (e) {
        console.log(e.toString())
        throw e
    }
}
