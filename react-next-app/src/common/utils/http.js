import axios from 'axios';
import "@babel/polyfill";
axios.defaults.withCredentials=true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.timeout = 30000;

let requestInterceptor = axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/json'
        };
        let url = config.url;
        // get参数编码
        if (config.method === 'get' && config.params) {
            url += '?'
            let keys = Object.keys(config.params)
            for (let key of keys) {
                if(typeof(config.params[key]) === 'object'){
                    url += `${key}=${encodeURIComponent(JSON.stringify(config.params[key]))}&`
                }else{
                    url += `${key}=${encodeURIComponent(typeof(config.params[key]) == "undefined"?"":config.params[key])}&`
                }
            }
            url = url.substring(0, url.length - 1)
            config.params = {}
        }
        config.url = url;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

let responseInterceptor = axios.interceptors.response.use(response => {
        return response;
    }, error => {
        return Promise.reject(error);
    });

let http = {
    urlPri : process.env.VUE_APP_API_ROOT?process.env.VUE_APP_API_ROOT:"",
    model: process.env.NODE_ENV,
    requestInterceptor: requestInterceptor,
    responseInterceptor: responseInterceptor,
    put: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.put(http.urlPri + url, JSON.stringify(data))
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                });
        });
    },
    post: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(http.urlPri + url, data instanceof FormData?data:JSON.stringify(data))
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                });
        });
    },
    postUrl: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, JSON.stringify(data))
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                });
        });
    },
    get: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(http.urlPri + url, { params: data })
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                });
        });
    },
    delete: function (url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(http.urlPri + url, { params: data })
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        });
    }
};

export default http;
