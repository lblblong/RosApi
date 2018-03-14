module.exports = () => {
    return async (ctx, next) => {
        try {
            let gtx = ctx
            await next()
            if (ctx.type != "image/png") {
                let body = ctx.body || {}
                ctx.body = {
                    code: 0,
                    message: "success.",
                    data: body
                }
            }
        } catch (err) {
            ctx.status = err.status || 200
            let message = err.message || "error."
            ctx.body = {
                code: -1,
                message,
                data: {}
            }
        }
    }
}
