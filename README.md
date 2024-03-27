## 下载 & 安装

该 Javascript 库 / 模块可以用于前端也可以用于后端 Nodejs 中。

1. 直接下载idcard.js，然后使用 `<script>`标签引入，可以得到全局函数 `idcard`.
2. 使用 npm 进行包管理，具体为：

    > **npm install idcard-tool**

然后使用 `require` 引入模块

```js
var idcard = require("idcard-tool");

// 居民身份证
console.log(idcard('11010519491231002X'));
```

#### 返回
```js
    {
        "type":"居民身份证",
        "country":"中国",
        "sign":"北京市朝阳区",
        "birthday":"1949-12-31",
        "sex":"女",
        "isValid":false
    }
```

```js
var idcard = require("idcard-tool");

// 外国人永久居留身份证
console.log(idcard('932682198501010017'));
```

#### 返回
```js
    {
        "type":"外国人永久居留身份证",
        "country":"沙特阿拉伯",
        "sign":"江苏省",
        "birthday":"1985-01-01",
        "sex":"男",
        "isValid":true
    }
```
