##vue_news

> 使用技术:
* Vue2.0
* axios+promise 网络请求封装
* VueRouter
* mint-UI
* API接口数据：[TP5_splider项目](https://github.com/ecitlm/TP5_Splider)


浏览地址：
[演示](http://code.it919.cn/dist)

![二维码体验](https://dn-coding-net-production-pp.qbox.me/8175c051-daa0-4148-8842-c235c2a398de.png)


### Build Setup 安装部署运行
-----------------------------------------------------
```

# serve with hot reload at localhost:800
npm run dev

###
npm run build

```

### 网络请求封装
>这里封装了两个网络请求方法  fetchPost，fetchGet以及请求配置，通过请求

config,js
```javascript
import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;
   axios.defaults.baseURL = 'https://api.xxx.com/api';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    alert("错误的传参")
    return Promise.reject(error);
});

/**
 *
 * POST 请求方式
 * @param {string} url     请求URL
 * @param {object} params  请求参数
 * @returns
 */

export default {
    //fetchPost  请求方式
    fetchPost: function(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },


    //GET 请求方式
    fetchGet: function(url, params) {
        console.log(params)
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: params
                })
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                });
        })

    }
}

```
>api.js 为所有接口封装,如下面的相关接口

```javascript
import fetch from './config'
export default {
    /**
     * 新闻轮播图
     * @param {object} params
     * @returns
     */
    banner(params) {
        return fetch.fetchPost('News/banner', params);
    },
    /**
     * 文章分类列表
     * @param {object} params {page：分页，type:文章类型}
     * @returns
     */
    new_list(params) {
        return fetch.fetchGet('News/new_list', params)
    }
    }
```

> 使用请求接口数据

```javascript
 // 获取首页新闻列表
    [types.FECTH_INDEX_NEWS]({commit}) {
        var data={
            page:20,
            type:0
        }
        api.new_list(data)
            .then(res => {
                commit(types.TOGGLE_INDEX_NEWS, res.data)
            }).catch(err => console.log(err))
    }
```
### UI界面
 ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/index1.jpg) ![图片](https://dn-coding-net-production-pp.qbox.me/a271b902-089f-4a1b-8879-357a113b66e5.png)

 ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/master/UI/%25E7%2594%25B5%25E5%25BD%25B11-%25E7%2583%25AD%25E6%2592%25AD%25E5%2588%2597%25E8%25A1%25A8.jpg) ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/%25E7%2594%25B5%25E5%25BD%25B12-%25E8%25AF%25A6%25E6%2583%2585.jpg)


 ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/music1-%E5%88%86%E7%B1%BB.jpg) ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/music2-%E5%88%86%E7%B1%BB%E6%AD%8C%E5%8D%95.jpg) ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/music3-音乐播放.jpg)

 ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/photo1-%E5%88%86%E7%B1%BB.jpg) ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/%E8%A7%86%E9%A2%911.jpg)

 ![图片](https://coding.net/u/ecit/p/vue_news/git/raw/898b4a541e6433d131baa5aff72abee62236ed35/UI/%E7%AC%91%E8%AF%9D%E6%AE%B5%E5%AD%90.jpg )


