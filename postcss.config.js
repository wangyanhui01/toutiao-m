// postcss.config.js
module.exports = {
    plugins: {
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },  //vue-cli内部已经配置了一遍  不需要再次配置
      'postcss-pxtorem': {
        // rootValue: 37.5,
        rootValue ({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        // 可以是固定数值，也可以是一个动态函数
        propList: ['*'],
      },
    },
  };
  