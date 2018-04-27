let map = require('../ros/Map')
let fs = require('fs')
let { callshSync } = require('../util/call_sh')
let mappath = '/home/ubuntu/testmap'

module.exports = {
    'GET /v1/map/data': async ctx => {
        let data = map.data
        if (data == '') throw Error('地图还没加载完成')
        ctx.body = data.data
    },
    'GET /v1/map/info': async ctx => {
        let data = map.data
        if (data == '') throw Error('地图还没加载完成')
        ctx.body = data.info
    },
    'GET /v1/map': async ctx => {
        let data = map.data
        if (data == '') throw Error('地图还没加载完成')
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
            rep = rep.filter(filename => {
                let rep = await fs.statSync(filename)
                if (!rep.isFile()) {
                    return false
                }
                if (!filename.endsWith('.pgm')) {
                    return false
                }
                return true
            })
            ctx.body = rep
        } catch (e) {
            throw e
        }
    },
    // 切换地图
    'POST /v1/maps':async ctx =>{
        let { name } = ctx.request.body
        // try{
        //     let rep = await fs.readdirSync(mappath)
        //     let filename = rep.find(filename=>{
        //         return filename == `${name}.yml`
        //     })
        //     if(!filename){
        //         throw Error('地图不存在')
        //     }
        //     let testfile = rep.find(filename=>{
        //         return filename == 'test.yml'
        //     })
        //     if(testfile){

        //     }
        // }catch(e){

        // }
    }
}
