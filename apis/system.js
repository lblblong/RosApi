var call_sh = require('child_process')

module.exports = {
    'GET /v1/system/mapping': async ctx => {
        callsh('/home/ubuntu/zhrobot-ChangeService.sh', ['mapping'])
    },
    'GET /v1/system/navigation': async ctx => {
        callsh('/home/ubuntu/zhrobot-ChangeService.sh', ['navigation'])
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
