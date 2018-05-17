let ROSLIB = require('roslib')
let pose = require('./Pose')
let map = require('./Map')
let navState = require('./NavStatus')

class Battery {
    constructor() {
        this.data = null
        this.timer = null

        global.event.on(global.events.ROS_CONNECTED, () => {
            this.initDate()
        })
    }

    initDate() {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            if (this.data == null) {
                topic.unsubscribe()
                this.initDate()
            }
        }, 5000)

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
            // this.verfBattery(rep)
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
        pose.startNavPose({ x: 0.7, y: 0, z: 0, w: 1 })
        // 最近的一次导航状态
        let lastStatus = 3
        navState.addLisener('charge', status => {
            if (status == 3) {
                let xE = Math.abs(0.7 - pose.data.position.x)
                let yE = Math.abs(0 - pose.data.position.y)
                if (xE <= 0.2 && yE <= 0.2) {
                    // 已导航到充电位置，开始充电
                    this.charge(1)
                    navState.removeLisener('charge')
                } else {
                    // 丢弃本次状态
                }
                // } else if (
                //     // 前往充电中收到其他导航
                //     status == 0
                // ) {
                //     // 如果上个状态为 1 ，则认为是前往充电过程中，收到了其他导航
                //     if (lastStatus == 1) {
                //         // 未导航到充电位置
                //         global.charge = false
                //         navState.removeLisener('charge')
                //     }
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
            lastStatus = status
        })
    }

    // 设置自动充电阀值
    setChargeRatio(ratio) {
        global.ratio = ratio
    }

    // 取消自动充电
    cancelCharge() {
        pose.cancelNav()
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
