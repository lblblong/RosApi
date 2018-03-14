let ROSLIB = require("roslib")

class Path {
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
            name: "/move_base/NavfnROS/plan",
            messageType: "nav_msgs/Path"
        })

        topic.subscribe(msg => {
            if (msg.header.frame_id == "map") {
                this.data = msg
            }
        })
    }
}

module.exports = new Path()
