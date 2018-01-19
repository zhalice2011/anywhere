// 专门用来处理range请求

module.exports = (totalSize, req, res) => {
  // 1.在req中获取请求的范围 range
  const range = req.headers['range']
  console.log("range",range)
  if (!range) {
    return {code: 200}
  }
  const sizes = range.match(/bytes=(\d*)-(\d*)/)  //match返回一个数组
  console.log("sizes",sizes)
  const end = sizes[2] || totalSize - 1
  const start = sizes[1] || totalSize - end

  if (start > end || start <0 || end > totalSize) { //无法处理
    return {code: 200} 
  }
  // 下面的表示可以进行处理的
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length', `${end - start}`)
  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end),
  }
  
}
