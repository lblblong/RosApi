let ROSLIB = require('roslib')
var fs = require('fs')
let PNGImage = require('pngjs-image')

class Map {
    constructor() {
        this.data = null

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })
    }

    initDate() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/map',
            messageType: 'nav_msgs/OccupancyGrid'
        })

        // 奇怪的 bug ：
        // 如果不延迟地图的订阅，会收不到位置信息
        setTimeout(() => {
            topic.subscribe(rep => {
                console.log(`收到地图`)
                this.data = rep
                this.drawPng2(rep)
            })
        }, 900)
    }

    drawPng(rep) {
        let info = rep.info
        let mapData = rep.data
        let width = info.width
        let height = info.height
        var image = PNGImage.createImage(width, height)

        let x, y, d
        for (let i = 0; i < mapData.length; i++) {
            x = parseInt(i % width)
            y = parseInt(i / width)
            d = parseInt(mapData[i])
            let pix = 127
            if (d == 100) {
                pix = 0
            } else if (d == 0) {
                pix = 255
            }
            image.setPixel(x, y, {
                red: pix,
                green: pix,
                blue: pix,
                alpha: 255
            })
        }

        image.writeImage('./map.png', function (err) {
            if (err) console.log(err)
            console.log(`地图已保存为图片`)
        })
    }

    drawPng2(rep) {
        let info = rep.info
        let mapData = rep.data
        let width = info.width
        let height = info.height
        var image = PNGImage.createImage(width, height)

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                let mapI = col + ((height - row - 1) * width)
                let data = mapData[mapI]
                let val;
                if (data === 100) {
                    val = 0;
                } else if (data === 0) {
                    val = 255;
                } else {
                    val = 127;
                }
                image.setPixel(col, row, {
                    red: val,
                    green: val,
                    blue: val,
                    alpha: 255
                })
            }
        }

        image.writeImage('./map.png', function (err) {
            if (err) console.log(err)
            console.log(`地图已保存为图片`)
        })
    }
}

module.exports = new Map()
