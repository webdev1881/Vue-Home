module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/Vue-Home/dist'
  : '/',
  css: {
    sourceMap: true,
    modules: true
  }
}