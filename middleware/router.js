const fs = require('fs')
var koaBody = require('koa-body')

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4)
            router.get(path, mapping[url])
            console.log(`register URL mapping: GET ${path}`)
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5)
            router.post(
                path,
                koaBody({
                    multipart: true,
                    formidable: { maxFieldsSize: 1000 * 1024 * 1024 }
                }),
                mapping[url]
            )
            console.log(`register URL mapping: POST ${path}`)
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4)
            router.put(path, mapping[url])
            console.log(`register URL mapping: PUT ${path}`)
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7)
            router.del(path, mapping[url])
            console.log(`register URL mapping: DELETE ${path}`)
        }
    }
}

function addApis(router, dir) {
    fs
        .readdirSync(__dirname + '/' + dir)
        .filter(f => {
            return f.endsWith('.js')
        })
        .forEach(f => {
            let mapping = require(__dirname + '/' + dir + '/' + f)
            addMapping(router, mapping)
        })
}

module.exports = function(dir) {
    let apisDir = dir || 'apis',
        Router = require('koa-router')
    let router = new Router()
    addApis(router, apisDir)
    return router
}
