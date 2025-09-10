## 工具说明

本工具用于辅助生成百度统计插件在 file 和 chrome-extension 等协议环境下【如：electron、chrome extension】能正常上报统计信息的本地插件文件。

## 项目说明

本项目在 <https://github.com/krapnikkk/baidutongji-generator> 的思路下，使用 NextJs + HeroUI 重构了页面，更现代化、精致一些，并将项目放在自己服务器上，避免 github 被墙导致的页面加载速度慢的问题。

## 在线地址

[点击打开](https://baidutongji.gotab.cn)

## 使用说明

将下载到的 hm.js 文件通过 script 标签的形式引入插件即可使用

```
<script type="text/javascript" src="hm.js"></script>
```

在 chrome-extension 中需要在 manifest.json 中添加以下配置

```
"content_security_policy": "script-src 'self' 'unsafe-eval' https://hmcdn.baidu.com; object-src 'self'"
```
