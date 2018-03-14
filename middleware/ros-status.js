module.exports = () => {
    return async (ctx, next) => {
        let ros = global.ros
        if (!ros) {
            throw Error("正在连接 ROS，此时接口不可操作")
        }
        await next()
    }
}
