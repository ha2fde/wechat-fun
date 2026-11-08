# 🎲 玩点有趣的 · V0.1

为微信公众号菜单准备的轻量入口。首页点骰子，在浏览器内随机抽取一件小事。可分享首页，也可复制当前结果的直链；结果页能直接打开并回首页。页面无需登录，应用未接入分析脚本、数据库或用户标识。

## 本地运行与验收

使用 Node.js 24 与 npm。

```sh
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # 输出到 out/
npm test           # 在 build 后执行
```

## 扩展玩法

在 `lib/games/` 新增实现 `Game` 的玩法模块，在 `registry.ts` 注册。首页只抽取 `enabled: true` 的玩法，至少保留一个启用。抽取时先均匀选择玩法，再均匀选择该玩法内的结果。首页路径永久使用 `/`，结果使用 `/r/<game>/<result>/`。发布后保留已分享的玩法和结果 ID；可用 `enabled: false` 停止抽取，原有结果页仍会构建并可访问。

## Vercel Production

1. 在 GitHub 新建独立的 `wechat-fun` 仓库，将本项目提交到 `main`。在 Vercel 导入该仓库，创建同名独立项目，使用 Next.js preset 和默认构建配置。个人非商业用途可选 Hobby，具体适用范围以 Vercel 条款为准。
2. 在新项目的 **Settings → Domains** 优先尝试绑定 `wechat-fun.vercel.app`。如果不可分配，选择一个长期使用的可用域名。将 `SITE_URL` 设为最终 Production 地址，并重新部署；也可使用 Vercel 自动提供的 `VERCEL_PROJECT_PRODUCTION_URL`。这样预览页复制的链接仍指向 Production。
3. 关注入口配置见 `.env.example`。可选填 `WECHAT_ACCOUNT_NAME` 与 `WECHAT_FOLLOW_URL`（公众号官方 HTTPS 入口或已发布文章），重新部署后显示。两者均为公开配置，链接为空时入口隐藏。
4. 匿名访问 Production 首页，确认返回 200。用手机微信打开，点骰子、复制结果、在新会话打开结果链接，确认显示同一条内容。遇到剪贴板权限限制，页面会显示可长按复制的链接。确认未知结果返回 404，并检查关注链接（若配置）。通过后把固定首页地址填入公众号菜单 `🎲 玩点有趣的`，再从实际菜单点击复验。
