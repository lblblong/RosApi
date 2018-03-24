let ROSLIB = require('roslib')

/** 导航结束 */
const END_OF_THE_NAVIGATION = 0
/** 导航中 */
const IN_THE_NAVIGATION = 1
/** 请求的导航位置无法到达或者是无效的，请求被拒绝 */
const INVALID_NAVIGATION = 2
/** 导航异常终止 */
const NAVIGATION_ACCIDENT_TERMINATION = 3

class NavStatus {
    constructor() {
        this.data = END_OF_THE_NAVIGATION

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })

        global.event.on(global.events.ROS_DISCONNECTED, () => {
            this.data = END_OF_THE_NAVIGATION
        })
    }

    initDate() {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/move_base/status',
            messageType: 'actionlib_msgs/GoalStatusArray'
        })

        topic.subscribe(msg => {
            var statusList = msg.status_list
            if (statusList.length == 0 || !statusList.pop().status) {
                return
            }
            var status = statusList.pop().status
            if (status == 2 || status == 3 || status == 8) {
                this.data = END_OF_THE_NAVIGATION
            } else if (status == 1) {
                this.data = IN_THE_NAVIGATION
            } else if (status == 5) {
                this.data = INVALID_NAVIGATION
            } else if (status == 4) {
                this.data = NAVIGATION_ACCIDENT_TERMINATION
            }
        })
    }
}

module.exports = new NavStatus()
