let EventEmitter = require("events").EventEmitter
global.event = new EventEmitter()
global.events = {
    // ROS 已连接
    ROS_CONNECTED: "connected",
    // ROS 连接断开
    ROS_DISCONNECTED: "disconnected",
    // 地图初始化完成
    ROS_MAP_INITD: "mapinitd"
}
