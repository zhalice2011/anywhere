
// 用于自动打开网页
const {exec} = require('child_process') // 调用系统的内部命令

module.exports = url => {
  console.log("process.platform",process.platform)
  console.log("url",url)
  
  switch (process.platform) {
    case 'darwin': // mac
      exec(`open ${url}`)
      break
    case 'win32': // windows
      exec(`start ${url}`)
      break
  }
}
