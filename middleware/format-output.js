let logger = require('../log')
module.exports = () => {
    return async (ctx, next) => {
        try {
            await next()
            if (ctx.type != 'image/png') {
                let body = ctx.body || {}
                ctx.body = {
                    code: 0,
                    message: 'success.',
                    data: body
                }
            }
        } catch (err) {
            ctx.status = 200
            let message = err.message || 'error.'
            let code = err.status || -1
            if (code != 404) {
                logger.error(err.message)
            }
            ctx.body = {
                code,
                message,
                data: {}
            }
        }
    }
}
