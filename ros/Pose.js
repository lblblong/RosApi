let ROSLIB = require("roslib")

class Pose {
    constructor() {
        this.data = ""

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })

        global.event.on(global.events.ROS_DISCONNECTED, () => {
            this.data = ""
        })
    }

    initDate() {
        let tfClient = new ROSLIB.TFClient({
            ros: global.ros,
            fixedFrame: "map",
            angularThres: 0.01,
            transThres: 0.01
        })

        tfClient.subscribe("base_footprint", tf => {
            let pose = {
                position: tf.translation,
                orientation: tf.rotation
            }
            this.data = pose
        })
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
            name: "/move_base_simple/goal",
            messageType: "geometry_msgs/PoseStamped"
        })

        topic.publish({
            header: {
                frame_id: "map",
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
            name: "/move_base/cancel"
        })

        // 空id默认停止当前导航
        topic.publish({})
    }
}

module.exports = new Pose()
