var winston = require('winston')

// 日志格式输出
const myFormat = winston.format.printf(info => {
    let log = {
        日期: new Date(),
        message: info.message
    }
    return `${JSON.stringify(log)}`
})

// 日志输出到文件
const logger = winston.createLogger({
    format: winston.format.combine(myFormat),
    transports: [
        new winston.transports.File({
            filename: './log/log.txt',
            level: 'error'
        })
    ]
})

// 发送日志
require('./mail')

module.exports = logger
