let map = require("../ros/Map")
let fs = require("fs")

module.exports = {
    "GET /v1/map/data": async ctx => {
        let data = map.data
        if (data == "") throw Error("地图还没加载完成")
        ctx.body = data.data
    },
    "GET /v1/map/info": async ctx => {
        let data = map.data
        if (data == "") throw Error("地图还没加载完成")
        ctx.body = data.info
    },
    "GET /v1/map": async ctx => {
        let data = map.data
        if (data == "") throw Error("地图还没加载完成")
        ctx.body = {
            info: data.info,
            data: data.data
        }
    },
    "GET /v1/map/png": async ctx => {
        ctx.type = "image/png"
        try {
            let content = await fs.readFileSync("./map.png")
            ctx.body = content
        } catch (e) {
            throw Error("获取地图图片失败")
        }
    }
}
