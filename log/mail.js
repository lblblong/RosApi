var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secure: false,
    secureConnection: false,
    port: 25,
    auth: {
        user: 'lblblong@163.com',
        pass: 'qwert123'
    }
})

var mailOptions = {
    from: '"lblblong" <lblblong@163.com>',
    to: 'lblblong@163.com',
    subject: `异常反馈 - ${new Date()}`,
    html: `香喷喷的异常反馈来了~`,
    attachments: [
        {
            filename: 'log.txt',
            path: './log/log.txt'
        }
    ]
}

transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log('异常反馈失败')
        console.log(err)
        return
    }
    console.log('异常已反馈到 lblblong@163.com')
})
