let EventEmitter = require('events').EventEmitter
global.event = new EventEmitter()
global.events = {
    // ROS 已连接
    ROS_CONNECTED: 'connected',
    // ROS 连接断开
    ROS_DISCONNECTED: 'disconnected',
    // 地图初始化完成
    ROS_MAP_INITD: 'mapinitd'
}
// 前往充电状态：true-正在前往充电，false-没有前往充电中
global.charge = false
// 自动充电阀值
global.ratio = 30
