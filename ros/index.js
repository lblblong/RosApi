let ROSLIB = require('roslib')
let { ip } = require('../config')

class ROS {
    constructor() {
        this.url = `ws://${ip}:9090`
        console.log(this.url)
        this.connect()
    }

    bindEvent() {
        this.ros.on('connection', () => {
            console.log(`已连接到 ROS，等待5秒后开始订阅topic`)
            setTimeout(() => {
                console.log(`开始订阅topic`)
                global.ros = this.ros
                global.event.emit(global.events.ROS_CONNECTED, this.ros)
            }, 5000)
        })

        this.ros.on('error', err => {})

        this.ros.on('close', () => {
            console.log(`与 ROS 的连接已断开，重新连接中...`)
            // 重置自动充电状态
            global.charge = false
            delete global.ros
            global.event.emit(global.events.ROS_DISCONNECTED, this.ros)
            this.connect()
        })
    }

    connect() {
        this.ros = new ROSLIB.Ros()
        this.bindEvent()
        setTimeout(() => {
            this.ros.connect(this.url)
        }, 5000)
    }
}

module.exports = new ROS()
