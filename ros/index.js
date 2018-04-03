let ROSLIB = require('roslib')

class ROS {
    constructor(url) {
        this.url = url || 'ws://localhost:9090'
        this.connect()
    }

    bindEvent() {
        this.ros.on('connection', () => {
            console.log(`已连接到 ROS`)
            console.log(`等待5秒后开始订阅topic(为避免ros还未初始化完成)`)
            setTimeout(() => {
                console.log(`开始订阅topic`)
                global.ros = this.ros
                global.event.emit(global.events.ROS_CONNECTED, this.ros)
            }, 20000)
        })

        this.ros.on('error', err => {})

        this.ros.on('close', () => {
            console.log(`与 ROS 的连接已断开，重新连接中...`)
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
        }, 1000)
    }
}

module.exports = new ROS('ws://192.168.3.166:9090')
