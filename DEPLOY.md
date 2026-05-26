# 网站部署指南

## 目录
1. [Namecheap域名配置](#1-namecheap域名配置)
2. [选择云服务器](#2-选择云服务器)
3. [使用Docker部署](#3-使用docker部署)
4. [使用Vercel部署前端](#4-使用vercel部署前端)
5. [使用免费云服务部署](#5-使用免费云服务部署)

---

## 1. Namecheap域名配置

### 步骤1：获取服务器IP地址
首先您需要一个云服务器的公网IP地址。

### 步骤2：配置DNS解析
1. 登录 [Namecheap](https://www.namecheap.com)
2. 进入 "Domain List"，找到您的域名
3. 点击 "Manage"
4. 找到 "Nameservers" 或 "Advanced DNS" 区域
5. 添加以下DNS记录：

```
类型    主机记录    记录值                TTL
A       @          您的服务器IP地址       自动
A       www        您的服务器IP地址       自动
```

### 步骤3：等待DNS生效
DNS修改通常需要几分钟到24小时生效。

---

## 2. 选择云服务器

### 推荐的云服务商
- **阿里云** - 中国访问快
- **腾讯云** - 性价比高
- **DigitalOcean** - 简单易用（$5/月起）
- **Vultr** - 全球节点多
- **AWS EC2** - 功能强大
- **GCP Compute Engine** - 企业级

### 服务器配置建议
- 操作系统：Ubuntu 20.04/22.04 LTS
- CPU：至少1核
- 内存：至少2GB
- 硬盘：至少20GB

---

## 3. 使用Docker部署

### 前置准备
```bash
# 在服务器上安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo apt install docker-compose -y
```

### 部署步骤

1. **上传代码到服务器**
   ```bash
   # 使用SCP或Git克隆
   scp -r 源医1.0 user@your-server:/home/user/
   # 或
   git clone <your-repo-url>
   ```

2. **配置环境变量**
   ```bash
   cd 源医1.0
   cp .env.example .env
   nano .env
   # 修改配置
   DOMAIN=yourdomain.com
   VITE_API_BASE=https://yourdomain.com/api
   ```

3. **修改nginx.conf中的域名**
   ```bash
   nano nginx.conf
   # 将 yourdomain.com 替换为实际域名
   ```

4. **构建并启动**
   ```bash
   docker-compose up -d --build
   ```

5. **查看日志**
   ```bash
   docker-compose logs -f
   ```

6. **配置SSL证书（推荐）**
   ```bash
   # 使用Let's Encrypt免费证书
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 4. 使用Vercel部署前端（最简单）

### 优势
- 完全免费
- 全球CDN加速
- 自动HTTPS
- 一键部署

### 部署步骤

1. **注册Vercel账号**
   https://vercel.com/signup

2. **上传代码到GitHub**

3. **在Vercel中导入项目**
   - 点击 "New Project"
   - 选择您的GitHub仓库
   - 配置构建命令和输出目录

4. **配置环境变量**
   在Vercel项目设置中添加：
   ```
   VITE_API_BASE=https://your-backend-api.com
   ```

5. **配置域名**
   在Vercel项目设置中添加自定义域名：
   - Settings -> Domains
   - 添加 `yourdomain.com` 和 `www.yourdomain.com`
   - 按照提示配置DNS

6. **部署后端API**
   可以使用以下服务部署后端：
   - Render (https://render.com)
   - Railway (https://railway.app)
   - Fly.io (https://fly.io)

---

## 5. 使用免费云服务部署

### 方案A：Vercel + Render（完全免费）

**前端部署：**
- Vercel（免费）

**后端部署：**
- Render（免费额度）

### 方案B：Netlify + Railway

**前端部署：**
- Netlify（免费）

**后端部署：**
- Railway（免费额度）

---

## 快速部署命令（基于Ubuntu）

```bash
# 1. 更新系统
sudo apt update && sudo apt upgrade -y

# 2. 安装Node.js和npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. 安装Nginx
sudo apt install nginx -y

# 4. 克隆项目
cd /var/www
sudo git clone <your-repo-url>
cd 源医1.0

# 5. 安装依赖和构建
npm ci
npm run build

# 6. 配置Nginx
sudo cp nginx.conf /etc/nginx/sites-available/yourdomain
sudo ln -s /etc/nginx/sites-available/yourdomain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 7. 使用PM2管理后端
npm install -g pm2
pm2 start api/server.js --name 源医1.0
pm2 startup
pm2 save

# 8. 安装SSL证书
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 需要帮助？

如果需要具体的部署指导，请告诉我您想使用哪种部署方案，我可以提供更详细的步骤！
