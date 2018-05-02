let ROSLIB = require('roslib')
class NavStatus {
    constructor() {
        // 导航状态默认值
        this.data = { status: 3 }
        this.liseners = new Map()

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })

        global.event.on(global.events.ROS_DISCONNECTED, () => {
            // 连接断开恢复导航状态默认值
            this.data = { status: 3 }
        })
    }

    initDate() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/move_base/status'
        })

        topic.subscribe(msg => {
            var statusList = msg.status_list
            if (statusList.length == 0) {
                return
            }
            var status = statusList.pop().status
            this.data = { status }
            for (let lisener of this.liseners.values()) {
                lisener(status)
            }
        })
    }

    addLisener(key, lisener) {
        this.liseners.set(key, lisener)
    }

    removeLisener(key) {
        this.liseners.delete(key)
    }
}

module.exports = new NavStatus()
