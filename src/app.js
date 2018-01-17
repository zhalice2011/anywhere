const http = require('http')
const chalk = require('chalk')
const path = require('path')
const config = require('./config//defaultConfig')

const route = require('./helper/route')  // 引用改造的异步函数 暴露出


const server = http.createServer((req, res) => {
  const url = req.url
  const filepath = path.join(config.root, req.url)
  route(req, res, filepath)
  console.log("filepath",filepath)
})

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`
  console.log(`Server started at ${chalk.green(addr)}`)
  
})
