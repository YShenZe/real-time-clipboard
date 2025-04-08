const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// 生成唯一ID
class User {
    constructor(conn, name) {
        this.id = uuidv4();
        this.name = name;
        this.conn = conn;
    }
}

// 服务器状态
class ServerState {
    constructor() {
        this.content = '';
        this.users = new Map();
    }

    broadcast(type, data, excludeId = null) {
        const msg = JSON.stringify({ type, data });
        for (const [id, user] of this.users) {
            if (user.conn.readyState === WebSocket.OPEN && id !== excludeId) {
                user.conn.send(msg);
            }
        }
    }

    sendTo(conn, type, data) {
        conn.send(JSON.stringify({ type, data }));
    }

    get userList() {
        return Array.from(this.users.values()).map(user => ({
            id: user.id,
            name: user.name
        }));
    }
}

// 创建服务器
const server = http.createServer((req, res) => {
    fs.readFile('index.html', (err, data) => {
        res.writeHead(err ? 500 : 200);
        res.end(err ? 'Error' : data);
    });
});

const wss = new WebSocket.Server({ server });
const state = new ServerState();

wss.on('connection', (ws) => {
    let user = null;

    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        
        switch (msg.type) {
            case 'join':
                user = new User(ws, msg.data.name);
                state.users.set(user.id, user);
                
                // 发送初始化数据
                state.sendTo(ws, 'content', { content: state.content });
                state.sendTo(ws, 'userlist', { users: state.userList });
                
                // 广播用户加入通知
                state.broadcast('notification', {
                    message: `${user.name} 加入了房间`
                }, user.id);
                state.broadcast('userlist', { users: state.userList });
                break;

            case 'contentUpdate':
                state.content = msg.data.content;
                state.broadcast('content', { 
                    content: msg.data.content 
                }, user?.id);
                break;
        }
    });

    ws.on('close', () => {
        if (user) {
            state.users.delete(user.id);
            state.broadcast('notification', {
                message: `${user.name} 离开了房间`
            });
            state.broadcast('userlist', { users: state.userList });
        }
    });
});

// 启动服务器
server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});