module.exports = () => {
    return async (ctx, next) => {
        let ros = global.ros
        if (!ros) {
            let err = Error('接口服务正在与 ROS 建立连接，此时接口不可操作')
            err.status = 404
            throw err
        }
        await next()
    }
}
