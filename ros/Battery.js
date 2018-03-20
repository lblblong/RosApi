let ROSLIB = require('roslib')

class Battery {
  constructor() {
    this.data = ''

    global.event.on(global.events.ROS_CONNECTED, () => {
      this.initDate()
    })

    global.event.on(global.events.ROS_DISCONNECTED, () => {
      this.data = ''
    })
  }

  initDate() {
    let topic = new ROSLIB.Topic({
      ros: global.ros,
      name: '/battery',
      messageType: 'Int32MultiArray'
    })

    topic.subscribe(msg => {
      let rep = msg.data
      this.data = {
        status: rep[0],
        // 取 mAh 电量需要除以 360
        capacity: rep[1] / 360,
        soc: rep[2] / 360
      }
    })
  }
}

module.exports = new Battery()
