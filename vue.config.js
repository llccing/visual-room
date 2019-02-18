const githubPath = 'https://github.com/llccing/visual-room/blob/gh-pages/';
// 使用域名之后的地址
const hostPath = 'http://gh.llccing.cn/visual-room/'

const BASE_URL = process.env.NODE_ENV === 'production' ? hostPath : '/'

module.exports = {
  baseUrl: BASE_URL,
  productionSourceMap: false,
  outputDir:'docs'
}
