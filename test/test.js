let ROSLIB = require('roslib')

let url = 'ws://192.168.3.166:9090'
let ros = new ROSLIB.Ros()
ros.connect(url)
ros.on('close', () => {
    console.log('连接断开')
})

ros.on('error', err => {
    console.log('连接失败')
    console.error(err)
})

// 机器人位置
let topic_pose = '/robot_pose'
// 雷达信息
let topic_scan = '/scan'
// 导航路径
let topic_path = '/move_base/NavfnROS/plan'
// 导航状态
let topic_nav_status = '/move_base/status'

ros.on('connection', () => {
    subscribe(topic_pose)
    subscribe(topic_scan)
    subscribe(topic_path)
    subscribe(topic_nav_status)
})

function subscribe(name) {
    let topic = new ROSLIB.Topic({
        ros,
        name
    })

    topic.subscribe(msg => {
        console.log(msg)
    })
}
