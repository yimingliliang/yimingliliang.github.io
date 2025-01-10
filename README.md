# AI 导航站点

一个使用 Cursor AI 辅助开发的现代化 AI 工具导航网站。本项目由 Cursor AI 负责开发、测试和数据抓取，展示了 AI 辅助开发的强大能力。

## 特性

- 🚀 快速响应的现代化界面
- 🔍 实时搜索功能
- 📱 响应式设计，支持移动端
- 🔒 数据加密存储
- 🤖 300+ 精选 AI 工具
- 📊 SEO 优化
- 📈 访问统计分析

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式解决方案**: Emotion (CSS-in-JS)
- **路由**: React Router DOM
- **数据加密**: CryptoJS
- **分析工具**: Vercel Analytics
- **代码规范**: ESLint
- **开发工具**: Cursor AI

## 项目亮点

1. **数据安全**
   - 使用 AES 加密算法保护数据
   - 环境变量配置加密密钥
   - 构建时自动加密数据

2. **SEO 优化**
   - 完整的 Meta 标签
   - 结构化数据支持
   - 自动生成 Sitemap
   - 移动端优化

3. **性能优化**
   - 图片懒加载
   - 组件按需加载
   - 资源预加载
   - 构建优化

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
nav-site/
├── public/                # 静态资源
├── src/
│   ├── components/       # React 组件
│   ├── data/            # 数据文件
│   ├── utils/           # 工具函数
│   ├── types/           # TypeScript 类型定义
│   └── App.tsx          # 应用入口
├── scripts/             # 构建脚本
└── package.json         # 项目配置
```

## Cursor AI 的贡献

本项目完全由 Cursor AI 辅助开发，包括：

- 代码编写和重构
- 组件设计和实现
- 数据结构设计
- 性能优化建议
- 自动化测试
- SEO 优化
- 数据抓取和整理

## 部署

项目使用 GitHub Pages 部署，每次推送到 main 分支时自动部署。

## 许可证

MIT License

## 致谢

- [Cursor AI](https://cursor.sh/) - AI 辅助开发工具
- [Vercel](https://vercel.com/) - 分析工具提供商
- 所有贡献者和用户
