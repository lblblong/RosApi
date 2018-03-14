let ROSLIB = require("roslib")

class Odom {
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
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: "/odom",
            messageType: "nav_msgs/Odometry"
        })

        topic.subscribe(msg => {
            this.data = msg.twist.twist
        })
    }
}

module.exports = new Odom()
