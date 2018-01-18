// 本文件用于返回对应的Content-Type

const path = require('path')  // 读取文件的扩展名也是使用path模块

const mimeTypes = {
  'txt': 'text/plain',
  'css': 'text/css',
  'git': 'image/gif',
  'html': 'text/html',
  'aac'	:	'audio/aac',
  'abw'	:	'application/x-abiword',
  'arc'	:	'application/octet-stream',
  'avi'	:	'video/x-msvideo',
  'azw'  :	'application/vnd.amazon.ebook',
  'bin'	:	'application/octet-stream',
  'bz'	:	'application/x-bzip',
  'bz2'	:	'application/x-bzip2',
  'csh' :	'application/x-csh',
  'css'	:	'text/css',
  'csv'	:	'text/csv',
  'doc'	:	'application/msword',
  'docx' :	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'gif'	:	'image/gif',
  'htm' :	'text/html',
  'html'	:	'text/html',
  'jar' :	'application/java-archive',
  'jpeg' : 'image/jpeg',
  'jpg'	: 'image/jpeg',
  'js'	:	'application/javascript',
  'json'	:'application/json',
  'png'	:	'image/png',
  'pdf' :	'application/pdf',
  'xhtml'	:	'application/xhtml+xml',
  'xls' :	'application/vnd.ms-excel',
  'xlsx' :	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xml'	:	'application/xml',
  'xul'	:	'application/vnd.mozilla.xul+xml',
  'zip'	:	'application/zip',
  '7z' :	'application/x-7z-compressed',
}


// 传入一个文件名字  就告诉你contentTypt对应的是什么
module.exports = (filePath) => {
  console.log("传入的filePath",filePath)
  let extname = path.extname(filePath) // 如果是jquery.min.js  返回的就是min.js
    .split('.')  // 分隔成数组
    .pop()  // 取最后一个值
    .toLowerCase()
  console.log("extname",extname)
  // 如果没有扩展名
  if(!extname) {
    extname = filePath
  }
  console.log("mimeTypes[extname] || mimeTypes['txt']",mimeTypes[extname] || mimeTypes['txt'])
  return mimeTypes[extname] || mimeTypes['txt']
}
