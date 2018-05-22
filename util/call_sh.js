var call_sh = require('child_process')
let logger = require('../log')

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

module.exports = {
    callshSync
}
