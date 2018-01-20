const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config//defaultConfig')

const route = require('./helper/route')  // 引用改造的异步函数 暴露出
const openUrl = require('./helper/openUrl')

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);  // 把命令行传入的参数 和 默认的参数合并 放到this里面去

  }

  // 定义start方法作为启动参数
  start() {
    const server = http.createServer((req, res) => {
      const url = req.url
      const filepath = path.join(this.conf.root, req.url)
      route(req, res, filepath, this.conf) // 把这个参数传给他
      console.log("filepath",filepath)
    })
    
    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.log(`Server started at ${chalk.green(addr)}`)
      // 打开url
      openUrl(addr)
    })
  }
}

module.exports = Server
