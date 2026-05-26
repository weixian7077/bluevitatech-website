# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制源代码
COPY . .

# 构建前端
RUN npm run build

# 生产阶段
FROM node:18-alpine AS production

WORKDIR /app

# 复制构建产物和后端代码
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/api ./api

# 仅安装生产依赖
RUN npm ci --only=production

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "run", "server:dev"]
