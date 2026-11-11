# 断舍离助理
面向个人物品管理的简易 Web 应用，无专业数据库，使用 JSON 文件持久化存储。

## 功能清单
-
 用户注册、登录，多用户数据隔离
-
 添加待整理物品，对物品标记状态（保留/舍弃/待定）
-
 种草清单管理：添加、删除种草物品
-
 文件存储方案，无需 MySQL、SSMS 等重型数据库

## 开发环境
-
 VS Code
-
 Node.js
-
 HTML + JavaScript（前端）
-
 Node.js + Express（后端）
-
 数据存储：JSON 文件


 ## 📂 项目结构
duansheli-system/
├── backend/
│ ├── server.js # 后端服务入口
│ ├── package.json # 依赖配置
│ └── db/
│ └── data.json # 用户、物品数据文件
├── frontend/
│ └── index.html # 前端页面
├── .gitignore
└── README.md

##  运行步骤
1. 将项目文件夹保存到本地
2. 打开终端，进入 backend 目录
```bash
cd backend
3. 安装依赖
npm install
4. 启动后端服务
node server.js
5. 使用浏览器打开 frontend/index.html，即可使用系统
