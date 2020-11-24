import axios from 'axios'

function trim(obj) {
  var reg = /^\s+|\s+$/g
  for (var i in obj) {
    if (typeof obj[i] === 'string') {
      obj[i] = obj[i].replace(reg, '')
    }
  }
}

export function ajax(param) {
  // 加载中
  // 配置
  const { cancelKey, loadingKey, ...axiosConfig } = param
  this[loadingKey] = true
  axiosConfig.method = axiosConfig.method.toUpperCase()

  // 清除参数前后空格
  if (typeof param.data === 'object') {
    trim(param.data)
  }
  if (typeof param.params === 'object') {
    trim(param.params)
  }

  axiosConfig.cancelToken = new axios.CancelToken((c) => {
    this[cancelKey] = c
  })
  // 发送请求
  return axios(axiosConfig).then((response) => {
    this[loadingKey] = false
    return Promise.resolve(response.data)
  }).catch((error) => {
    this[loadingKey] = false
    const response = error.response
    // 请求没有发出去
    if (!response) {
      this.$message.error('请求错误')
      return
    }
    console.log(response)

    response.stop = () => {}
    // 401 没有权限
    if (response.status === 401) {
      this.$message.error('没有权限')
      return Promise.reject(response)
    }
    // 404 访问路径错误
    if (response.status === 404) {
      this.$message.error('请求不存在')
      return Promise.reject(response)
    }

    const timer = setTimeout(() => {
      this.$message.error('接口里返回的错误信息')
    })
    response.stop = () => {
      clearTimeout(timer)
    }
    return Promise.reject(response)
    // 错误提示在这里统一提示了，各个error方法里就不要写了不然重复 response.status != '403'
  })
}
