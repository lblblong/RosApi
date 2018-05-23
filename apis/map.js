let map = require('../ros/Map')
let fs = require('fs')
let { callshSync } = require('../util/call_sh')
let mappath = '/home/ubuntu/testmap'

module.exports = {
    'GET /v1/map/data': async ctx => {
        let data = map.data
        if (data == null) throw Error('地图还没加载完成')
        ctx.body = data.data
    },
    'GET /v1/map/info': async ctx => {
        let data = map.data
        if (data == null) throw Error('地图还没加载完成')
        ctx.body = data.info
    },
    'GET /v1/map': async ctx => {
        let data = map.data
        if (data == null) throw Error('地图还没加载完成')
        ctx.body = {
            info: data.info,
            data: data.data
        }
    },
    'GET /v1/map/png': async ctx => {
        ctx.type = 'image/png'
        try {
            let content = await fs.readFileSync('./map.png')
            ctx.body = content
        } catch (e) {
            throw Error('获取地图图片失败')
        }
    },
    // 保存当前正在建的图
    'POST /v1/maps/save': async ctx => {
        let { name } = ctx.request.body
        try {
            let rep = await callshSync('/home/ubuntu/zhrobot/save_map.sh', [
                name
            ])
            ctx.body = rep
        } catch (e) {
            throw Error('地图保存失败')
        }
    },
    // 获取所有地图名字
    'GET /v1/maps': async ctx => {
        try {
            let rep = await fs.readdirSync(mappath)
            let pgm = rep
                .filter(filename => {
                    return filename.endsWith('.pgm')
                })
                .map(filename => {
                    return filename.slice(0, filename.length - 4)
                })
            let yaml = rep
                .filter(filename => {
                    return filename.endsWith('.yaml')
                })
                .map(filename => {
                    return filename.slice(0, filename.length - 5)
                })
            pgm = pgm.filter(filename => {
                return (
                    yaml.find(yamlname => {
                        return yamlname == filename
                    }) != undefined
                )
            })
            ctx.body = pgm
        } catch (e) {
            throw e
        }
    },
    // 切换地图
    'POST /v1/maps': async ctx => {
        let { name } = ctx.request.body
        try {
            let rep = await callshSync('/home/ubuntu/zhrobot/change_map.sh', [
                name
            ])
            ctx.body = rep
        } catch (e) {
            throw Error('地图切换失败')
        }
    }
}
