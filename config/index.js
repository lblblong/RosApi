const environment = process.argv.splice(2)[0]

const ip = environment == 'dev' ? '192.168.3.166' : '127.0.0.1'
// const ip = '192.168.3.166'

module.exports = {
    ip,
    environment
}
