

const fs = require('fs')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)  // 改造异步函数
const readdir = promisify(fs.readdir)  // 改造异步函数
const path = require('path')
const config = require('../config/defaultConfig')

const tplPath = path.join(__dirname, '../template/dir.tpl')
// readFileSync是同步的方法  因为下面要用到这个source  
const source = fs.readFileSync(tplPath)  // 读取出来的source是一个BUFFER
// 生成tpl  Handlebars.compile接受的是一个字符串
const template = Handlebars.compile(source.toString())

module.exports = async function(req, res, filepath) {
  try {
    // stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。
    const stats = await stat(filepath)
    if (stats.isFile()) { // 如果是文件
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain')  // 设置通过文本的形式返回内容
      //1.第一种返回给客户端的方法(一般不采用).因为是要全部读取才会返回
      // fs.readFile(filepath, (err, data) => {
      //   res.end(data.toString())
      // })
      //2.第二种读取文件的方法(采用流的形式,读取一点返回一点 )
      fs.createReadStream(filepath).pipe(res); //把这个文件读出来 通过流的形式返回给客户端
    } else if (stats.isDirectory()) { // 如果是一个文件夹
      //获取该文件夹的列表
      const files = await readdir(filepath)
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html')  // 设置通过文本的形式返回内容
      const dir = path.relative(config.root, filepath)
      const data = {
        files,        
        dir:dir ? `/${dir}` : '',
        tittle: path.basename(filepath),
      }
      console.log("返回给前端的数据 data=",data)
      res.end(template(data))

    }
  } catch(err) {
    if (err) { // 文件不存在
      console.log("err",err)
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain')
      res.end(`${filepath} is not a directory or file`)
      return
    }
  }
}
