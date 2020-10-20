// _mock.js
// 对应的rurl会被中间件拦截，并返回mock数据
// ANY localhost:9999/
// Mock.mock('/', {
//     data: [1,2,3],
//     msg: "hello mock",
//     "code|1-4": 1,
// })

Mock.mock('/', 'get',{
    status:200,
    message:'success',
    "data|10":[{
        "id":'@increment(1)',
        "name":'@cword(2,5)',
        "price":'@natural(100,999)',
        'img': '@image()',
    }]
})
Mock.mock('/aaa', 'get',{
    status:200,
    message:'success',
    "data|100":[{
        "id":'@increment(1)',
        "name":'@cword(2,5)',
        "price":'@natural(100,999)',
        'img': '@image()',
    }]
})
 
// 可以mock指定的请求方法
// POST localhost:9999/test
Mock.mock('/test', 'POST', {
    data: [],
    msg: "hello mock",
    "code|1-4": 1,
})
 
// 扩展rtype，支持jsonp形式，使用param传入对应的回调名
// GET JSONP localhost:9999/test
Mock.mock('/test', {
    type: 'jsonp',
    param: 'callbackName'
},{
    code: 0,
    msg: 'hello from mock jsonp',
    data: {
        "id|1000-9999": 1,
    }
})
 
// 默认回调名称 callback
Mock.mock("/test2", "jsonp", {
    code: 0,
    msg: "hello from mock jsonp2",
    data: {
        "id|1000-9999": 1,
    }
});
