let ROSLIB = require('roslib')

class Battery {
    constructor() {
        this.data = null

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })
    }

    initDate() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/battery'
        })

        topic.subscribe(msg => {
            let rep = msg.data
            // 如果取毫安时电量，需要除以360
            this.data = {
                status: rep[0],
                capacity: rep[1],
                soc: rep[2]
            }
        })
    }
}

module.exports = new Battery()
