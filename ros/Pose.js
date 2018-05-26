let ROSLIB = require('roslib')

class Pose {
    constructor() {
        this.data = null
        this.timer = null
        this.liseners = new Map()

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })
    }

    initDate() {
        // 可能会出现订阅请求丢失的问题，如果五秒后data依然为空，重新订阅
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if (this.data == null) {
                console.log('位置订阅可能丢失，重新订阅')
                topic.unsubscribe('base_footprint')
                this.initDate()
            }
        }, 5000)

        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/robot_pose'
        })

        topic.subscribe(msg => {
            this.data = msg
            for (let lisener of this.liseners.values()) {
                lisener(pose)
            }
        })
    }

    addLisener(key, lisener) {
        this.liseners.set(key, lisener)
    }

    /** 导航到指定位置 */
    startNavPose(pose) {
        let { x, y, z, w } = pose
        x = parseFloat(x)
        y = parseFloat(y)
        z = parseFloat(z)
        w = parseFloat(w)
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/move_base_simple/goal',
            messageType: 'geometry_msgs/PoseStamped'
        })

        topic.publish({
            header: {
                frame_id: 'map',
                stamp: {
                    secs: Date.parse(new Date()) / 1000
                }
            },
            pose: {
                orientation: {
                    x: 0,
                    y: 0,
                    z,
                    w
                },
                position: {
                    x,
                    y,
                    z: 0
                }
            }
        })
    }

    /** 取消导航 */
    cancelNav() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/move_base/cancel'
        })

        // 空id默认停止当前导航
        topic.publish({})
    }
}

module.exports = new Pose()
