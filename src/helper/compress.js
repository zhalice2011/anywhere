
// 压缩文件
const {createGzip, createDeflate} = require('zlib')

module.exports = (rs, req, res) => {
  //1.获取浏览器支持的几种压缩方式
  const acceptEncoding = req.headers['accept-encoding'] || ''
  console.log("acceptEncoding",acceptEncoding)
  
  console.log(acceptEncoding.match(/\b(gzip|deflate)\b/))
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) { //如果浏览器不支持或者不是我的服务器只支持的这两种(gzip|deflate)
    console.log("如果浏览器不支持")
    return rs //原样返回 不进行处理
  } else if (acceptEncoding.match(/\bgzip\b/)) { //如果浏览器支持gzip就优先使用这种方式 因为这种比较快
    console.log("设置成gzip")
    res.setHeader('Content-Ecoding', 'gzip') // 告诉浏览器用什么方法解压
    return rs.pipe(createGzip());
  } else if (acceptEncoding.match(/\bdeflate\b/)) { //如果浏览器支持gzip就优先使用这种方式 因为这种比较快
    console.log("设置成deflate")
    res.setHeader('Content-Ecoding', 'deflate') // 告诉浏览器用什么方法解压
    return rs.pipe(createDeflate());
  }

  //2.
}
