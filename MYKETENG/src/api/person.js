import axios from './index';

//=>验证是否登录
export function checkLogin() {
    return axios.get('/personal/login');
}


// 退出登陆
export function exitLogin () {
    return axios.get('/personal/out')
}

// 获取APi 个人信息
export function queryInfo () {
    return axios.get('/personal/info')
}

// 登陆
export function login (payload) {
    return axios.post('/personal/login',payload)
}

// 注册
export function registered (payload) {
    return axios.post('/personal/register',payload)
}