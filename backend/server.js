const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db', 'data.json');

app
.get('/', (req, res) => {
  res
.send("✅ 断舍离助理后端服务正在运行！请使用前端页面进行操作");
});

app.use(cors());
app.use(express.json());

// 初始化数据库文件
function initDB() {
  if (!fs.existsSync(path.join(__dirname, 'db'))) {
    fs.mkdirSync(path.join(__dirname, 'db'));
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: {} }, null, 2), 'utf8');
  }
}

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

initDB();

// 注册
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ ok: false, msg: '账号密码不能为空' });
  }
  const db = readDB();
  if (db.users[username]) {
    return res.json({ ok: false, msg: '账号已存在' });
  }
  db.users[username] = {
    password,
    items: [],
    wish: []
  };
  writeDB(db);
  res.json({ ok: true, msg: '注册成功' });
});

// 登录
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users[username];
  if (!user || user.password !== password) {
    return res.json({ ok: false, msg: '账号或密码错误' });
  }
  res.json({ ok: true, username });
});

// 获取用户全部数据
app.get('/api/data/:username', (req, res) => {
  const { username } = req.params;
  const db = readDB();
  const user = db.users[username];
  if (!user) return res.json({ ok: false });
  res.json({ ok: true, data: { items: user.items, wish: user.wish } });
});

// 保存用户全部数据
app.post('/api/data/:username', (req, res) => {
  const { username } = req.params;
  const { items, wish } = req.body;
  const db = readDB();
  if (!db.users[username]) return res.json({ ok: false });
  db.users[username].items = items;
  db.users[username].wish = wish;
  writeDB(db);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`后端服务启动：http://localhost:${PORT}`);
});