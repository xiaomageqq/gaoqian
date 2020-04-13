import Vue from "vue";
import axios from "axios";
import { Message } from "element-ui";

// 默认配置
axios.defaults.timeout = 60000;
axios.defaults.responseType = "json";
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

// 请求拦截
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.token = sessionStorage.getItem("token");
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 相应拦截
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

Vue.prototype.$post = function(url, data) {
  let _this = this;
  let promise = new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        console.log("成功-post", response.data.status);
        console.log("response.data", response.data);
        if (response.data.status == 200) {
          resolve(response.data);
        }
      })
      .catch(error => {
        Message.error("发生错误...");
      });
  });
  return promise;
};

Vue.prototype.$get = function(url, data) {
  let _this = this;
  let promise = new Promise((resolve, reject) => {
    axios
      .get(url, data)
      .then(response => {
        console.log("成功-get", response);
        resolve(response);
        if (response.status == 200) {
          let data = response.data;
          if (!checkOk(data)) {
            Message.error(data.info);
            return;
          }
          resolve(data.data);
        }
      })
      .catch(error => {
        Message.error("发生错误...");
      });
  });
  return promise;
};

let checkOk = function(resp) {
  if (resp.code == "10000" || resp.code == "20001" || resp.code == "53001") {
    return true;
  }
  return false;
};

let checkLogin = function(resp) {
  if (resp.code == "401") {
    return true;
  }
  return false;
};
