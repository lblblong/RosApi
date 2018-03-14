let ROSLIB = require("roslib")

class Move {
    move(action) {
        action = parseInt(action)
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: "/cmd_vel_mux/input/switch",
            messageType: "geometry_msgs/Twist"
        })

        let x = 0
        let y = 0
        let z = 0
        let speed = 0
        // let speed = 2.0
        let throttle = 1.0
        let scale = 1.0

        speed = throttle * scale

        switch (action) {
            case 1:
                x = 0.5 * speed
                break
            case 2:
                x = -0.5 * speed
                break
            case 3:
                z = 1 * speed
                break
            case 4:
                z = -1 * speed
                break
            default:
                throw Error("没有这个指令")
                break
        }

        let twist = new ROSLIB.Message({
            angular: {
                x: 0,
                y: 0,
                z: z
            },
            linear: {
                x: x,
                y: y,
                z: z
            }
        })

        topic.publish(twist)
    }
}

module.exports = new Move()
