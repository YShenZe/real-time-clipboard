# 实时共享剪切板应用

一个基于WebSocket的实时协作编辑工具，支持多用户同步文本内容和查看在线用户状态。

目前项目处于娱乐化阶段，之后会引入第三方编辑器以更好支持多人协作创作

**注意把index.html里面得地址替换为你自己的WS服务器地址！**

## 功能特性

- 📝 实时文本同步（支持延迟优化）
- 👥 在线用户列表展示（随机用户名生成）
- 🔔 用户加入/离开通知
- 📢 系统广播消息区
- 🔄 断线自动重连机制
- 📊 实时字数统计与同步状态提示
- 🎨 响应式布局设计

## 技术栈

**后端**
- Node.js
- WebSocket (ws 库)
- UUID 生成

**前端**
- Vanilla JavaScript
- CSS3 动画
- 现代浏览器API

## 快速开始

### 前置要求
- Node.js v14+
- npm/yarn

### 安装步骤
1. 克隆仓库
```bash
git clone https://github.com/YShenZe/real-time-clipboard.git
cd real-time-clipboard
```

2. 安装依赖
```bash
npm install ws uuid
```

3. 启动服务器
```bash
node server.js
```

4. 访问应用
```
http://localhost:3000
```

## 使用说明

1. 打开浏览器访问应用
2. 自动生成随机用户名加入房间
3. 在编辑区域输入内容（自动同步给所有用户）
4. 查看右侧用户列表实时状态
5. 通过广播消息区查看系统通知

## 配置参数

| 参数          | 默认值 | 说明                     |
|---------------|--------|--------------------------|
| 服务器端口    | 3000   | 修改server.js底部端口号 |
| 同步延迟      | 50ms   | 修改syncDelay变量       |
| 最大重试次数  | 5      | 修改maxReconnectAttempts|

## 许可证

基于MIT协议开源