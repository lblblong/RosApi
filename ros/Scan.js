let ROSLIB = require('roslib')

class Scan {
    constructor() {
        this.data = null

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })
    }

    initDate() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/scan',
            messageType: 'sensor_msgs/LaserScan'
        })

        topic.subscribe(msg => {
            this.data = msg
        })
    }
}

module.exports = new Scan()
