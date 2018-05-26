let ROSLIB = require('roslib')

class Path {
    constructor() {
        this.data = null

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })
    }

    initDate() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/move_base/TebLocalPlannerROS/global_plan',
            messageType: 'nav_msgs/Path'
        })

        topic.subscribe(msg => {
            if (msg.header.frame_id == 'map') {
                this.data = msg
            }
        })
    }
}

module.exports = new Path()
