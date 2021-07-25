## .env 内容
注意: pull代码后需要手动创建 .env 文件, 其中的密钥需要自己在腾讯云控制台中创建, 格式如下

```txt
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