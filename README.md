## .env 内容
注意: pull代码后需要手动创建 .env 文件, 其中的密钥需要自己在腾讯云控制台中创建, 格式如下

```txt
ENV_ID = xxx
SECRET_ID = xxx
SECRET_KEY = xxx
```

## [dotenv](https://www.npmjs.com/package/dotenv)
读取 .env 文件中的变量到 process.env
```sh
node-dev -r dotenv/config index.js
```
-r 先运行 dotenv/config

## [nanoid](https://www.npmjs.com/package/nanoid)
A tiny, secure, URL-friendly, unique string ID generator for JavaScript

```js
import { nanoid } from 'nanoid'
model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
```

## 云函数
触发器格式示例
```js
'use strict';
exports.main = async (event, context) => {
    console.log("Hello World")
    console.log(event)
    console.log(event["non-exist"])
    console.log(context)
    return event
};

```

CLI工具编辑和管理云函数, [参考](https://cloud.tencent.com/document/product/876/41539)

## REST CLIENT 插件
[参考](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

配合`.http`或`.rest`为拓展名的文件, 方便 vscode 中做接口测试