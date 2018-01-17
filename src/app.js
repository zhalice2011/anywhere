const http = require('http')
const chalk = require('chalk')
const path = require('path')
const config = require('./config//defaultConfig')
const fs = require('fs')

const server = http.createServer((req,res) => {
  const url = req.url
  const filepath = path.join(config.root, req.url)
  console.log("filepath",filepath)
  fs.stat(filepath, (err,stats) => {
    if (err) { // 文件不存在
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain')
      res.end(`${filepath} is not a directory or file`)
      return
    }
    if (ststs.isFile()) { // 如果是文件
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')  // 设置通过文本的形式返回内容
      res.end('filepath',filepath)
    }
  })
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  res.end('filepath',filepath)
})

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`
  console.log(`Server started at ${chalk.green(addr)}`)
  
})
