let ROSLIB = require('roslib')
let pose = require('./Pose')
let map = require('./Map')
let navState = require('./NavStatus')

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
            this.verfBattery(rep)
        })
    }

    // 检查电量
    verfBattery(rep) {
        if (rep[0] == 1) {
            // 修改状态：已经开始充电了
            global.charge = false
        } else {
            let ratio = soc / capacity * 100
            ratio = parseInt(ratio)
            // 电量小于阀值立刻前往充电
            if (ratio < global.ratio) {
                try {
                    this.startCharge()
                } catch (e) {}
            }
        }
    }

    // 开始自动充电
    startCharge() {
        // 判断是否是在去充电的过程中
        if (global.charge == true) {
            throw Error('正在前往充电中')
        }
        // 开始充电，状态变更
        global.charge = true
        // 超时时间为 3 分钟
        setTimeout(() => {
            if (global.charge == true) {
                global.charge = false
            }
        }, 1000 * 60 * 3)
        pose.startNavPose({ x: 0.1, y: 0, z: 0, w: 1 })
        navState.addLisener('charge', status => {
            if (status == 3) {
                // 已导航到充电位置，开始充电
                this.charge(1)
                navState.removeLisener('charge')
            } else if (
                // 收到取消请求，已取消
                status == 2 ||
                // 导航意外终止
                status == 4 ||
                // 请求位置无效
                status == 5 ||
                // 导航前收到取消，已成功取消
                status == 8 ||
                // 命令传递中丢失
                status == 9
            ) {
                // 未导航到充电位置
                global.charge = false
                navState.removeLisener('charge')
            }
        })
    }

    // 设置自动充电阀值
    setChargeRatio(ratio) {
        global.ratio = ratio
    }

    // 取消自动充电
    cancelCharge() {
        this.charge(0)
        global.charge = false
    }

    charge(data) {
        let topic = new ROSLIB.Topic({
            ros: global.ros,
            name: '/enable_docking'
        })
        let twist = new ROSLIB.Message({
            data
        })
        topic.publish(twist)
    }
}

module.exports = new Battery()
