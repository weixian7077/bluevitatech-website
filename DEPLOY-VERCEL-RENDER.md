# Vercel + Render 详细部署指南

## 准备工作

### 1. 创建GitHub仓库

1. 访问 https://github.com 并创建新仓库
2. 仓库名称：`bluevitatech`
3. 设置为 Public 或 Private（都可以）

### 2. 推送代码到GitHub

在项目目录中执行：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/bluevitatech.git

# 推送到main分支
git branch -M main
git push -u origin main
```

---

## 第一步：部署后端到Render

### 1.1 注册Render账号
访问 https://render.com 注册账号（可以用GitHub登录）

### 1.2 创建Web Service

1. 登录后点击 **"New +"** → **"Web Service"**
2. 连接GitHub账户（如果还没连接）
3. 选择 `bluevitatech` 仓库

### 1.3 配置Render服务

填写以下配置：

| 配置项 | 值 |
|--------|-----|
| **Name** | `bluevitatech-api` |
| **Region** | 选择离你最近的地区（如 Singapore） |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run server:dev` |
| **Instance Type** | `Free` |

### 1.4 添加环境变量

在 "Environment" 部分添加：

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |

### 1.5 部署

点击 **"Create Web Service"** 按钮开始部署

等待部署完成（约2-5分钟），您会获得一个URL，类似：
`https://bluevitatech-api.onrender.com`

**记下这个URL，稍后会用到！**

---

## 第二步：部署前端到Vercel

### 2.1 注册Vercel账号
访问 https://vercel.com 注册账号（可以用GitHub登录）

### 2.2 创建新项目

1. 点击 **"New Project"**
2. 选择 `bluevitatech` 仓库
3. 点击 **"Import"**

### 2.3 配置项目

**项目配置：**
- **Project Name**: `bluevitatech`
- **Framework Preset**: `Vite`
- **Root Directory**: 留空
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

**环境变量：**
点击 **"Environment Variables"** 展开，添加：

| Name | Value |
|------|-------|
| `VITE_API_BASE` | `https://bluevitatech-api.onrender.com` |

（替换为您Render后端的实际URL）

### 2.4 部署

点击 **"Deploy"** 按钮开始部署

等待部署完成（约1-2分钟），您会获得一个URL，类似：
`https://bluevitatech.vercel.app`

---

## 第三步：配置Namecheap域名

### 3.1 登录Namecheap

1. 访问 https://www.namecheap.com
2. 登录您的账号
3. 进入 **"Domain List"**
4. 找到 `bluevitatech.com`，点击 **"管理"**

### 3.2 配置DNS

点击 **"Advanced DNS"** 标签页

删除所有现有记录，然后添加以下记录：

**记录1：**
- **类型**：`CNAME Record`
- **主机记录**：`www`
- **记录值**：`cname.vercel-dns.com`
- **TTL**：`自动`

**记录2：**
- **类型**：`A Record`
- **主机记录**：`@`
- **记录值**：`76.76.21.21`
- **TTL**：`自动`

保存设置。

### 3.3 等待DNS生效

DNS修改通常需要5分钟到24小时生效。

---

## 第四步：在Vercel中配置自定义域名

### 4.1 添加域名

1. 在Vercel项目中，进入 **"Settings"** → **"Domains"**
2. 在 "Enter Domain" 输入框中输入：
   `bluevitatech.com`
3. 点击 **"Add"**

### 4.2 配置www域名

再添加一个：
`www.bluevitatech.com`

### 4.3 验证域名

Vercel会自动检查DNS配置，当显示为绿色 ✓ 时表示配置成功。

### 4.4 设置主域名

点击 `bluevitatech.com` 旁边的 **"..."** → **"Set as Primary"**

---

## 第五步：测试访问

等待所有配置生效后，访问：

- `https://bluevitatech.com`
- `https://www.bluevitatech.com`

恭喜！您的网站已经成功发布到公网！

---

## 常见问题

### Q: Render后端启动很慢？
A: Render免费版在没有访问时会休眠，首次访问需要30-60秒启动，之后就正常了。

### Q: 如何更新网站？
A: 只需将代码推送到GitHub的main分支，Vercel和Render会自动重新部署。

### Q: 如何配置HTTPS？
A: Vercel和Render会自动提供免费的SSL证书，无需手动配置。

### Q: 想要更好的性能？
A: 可以升级到付费方案，或使用Cloudflare CDN加速。

---

## 需要帮助？

如果在部署过程中遇到任何问题，请告诉我！
