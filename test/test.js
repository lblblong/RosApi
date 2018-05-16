;(async () => {
    let fs = require('fs')
    let rep = await fs.readdirSync('../')
    rep = rep.filter(filename => {
        return filename.endsWith('.js')
    })
    // rep = rep.filter(async filename => {
    //     let rep = await fs.statSync(filename)
    //     if (!rep.isFile()) {
    //         return false
    //     }
    //     if (!filename.endsWith('.js')) {
    //         return false
    //     }
    //     return true
    // })
    console.log(rep)
})()
