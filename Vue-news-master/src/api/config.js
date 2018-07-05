
import axios from 'axios'
import { API_DOMAIN } from './api.config'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://api.it919.cn/index.php/api';

//POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    alert('错误的传参')
    return Promise.reject(error)
  }
)

/**
 *
 * POST 请求方式
 * @param {string} url     请求URL
 * @param {object} params  请求参数
 * @returns
 */

export default {
  //fetchPost  请求方式
  fetchPost: function(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(
          response => {
            resolve(response.data)
          },
          err => {
            reject(err)
          }
        )
        .catch(error => {
          reject(error)
        })
    })
  },

  //GET 请求方式
  fetchGet: function(url, params = {}) {
    console.log(params)
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(
          response => {
            resolve(response.data)
          },
          err => {
            reject(err)
          }
        )
        .catch(error => {
          reject(error)
        })
    })
  }
}

global.bird = 'https://bird.ioliu.cn/v1/?url='

//外网测试环境 api代理
const Proxy = 'https://bird.ioliu.cn/v1/?url='
