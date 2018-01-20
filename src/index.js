const yargs = require('yargs')  // 获取命令行参数的工具

const Server = require('./app') // 引入app
// 定义可以输入的参数名
const argv = yargs
  .usage('anywhere [options]')
  .option('p',{
    alias: 'port',
    describe: '端口号',
    default: 9527
  })
  .option('h',{
    alias: 'hostname',
    describe: 'host',
    default: '127.0.0.1'
  })
  .option('d',{
    alias: 'root',
    describe: 'root path',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help() // 会自动生成帮助信息
  .argv;

// 将用户传入的参数名 传入的app中  生成calss实例
const server = new Server(argv);

server.start() // 调用start方法  启动程序
