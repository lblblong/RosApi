let ROSLIB = require("roslib")

class Odom {
    constructor() {
        this.data = null

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
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
