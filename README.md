<div align="center">

<img src="dist/komarihome/favicon.ico" width="96" alt="Komari Home Plus" />

# Komari Home Plus · 自用定制版

**在 Komari 探针上跑的模块化监控主题**

> 基于 [Komari-Home-Plus](https://github.com/123nhh/Komari-Home-Plus) 的个人定制版本，遵循上游 MIT License。本仓库为个人自用发布版，不代表上游官方版本。

[![Komari](https://img.shields.io/badge/Komari-%3E%3D%201.3.0-blue)](https://github.com/komari-monitor/komari)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883)](https://vuejs.org)
[![License](https://img.shields.io/badge/License-MIT-orange)](https://opensource.org/licenses/MIT)

</div>

---

## ⚠️ 关于本仓库

**本仓库只包含构建产物（`dist/`），不包含源码。**

这是目前实际部署运行的版本，方便分发、安装与版本留档。上游 [123nhh/Komari-Home-Plus](https://github.com/123nhh/Komari-Home-Plus) 提供完整源码，如需二次开发请以它为基线。

本版相对上游做了大量卡片结构与样式改动，类名体系已与上游不同，**无法直接套用上游的源码补丁**。

## ✨ 功能一览

### 首页

- **个人信息** — 头像、昵称、简介、所在地、社交链接
- **一言 & 时钟** — 随机一言 + 实时时钟，可独立开关
- **RSS 订阅** — 解析 RSS/Atom，最多展示 4 条
- **自定义 HTML** — 任意 HTML 片段直接渲染
- **快速链接** — 首页底部图标网格，响应式 2~5 列
- **网址导航** — 独立页面，分类卡片展示

### 探针页

- **多视图切换** — 大卡 / 小卡 / 迷你卡 / 列表，localStorage 持久化
- **明暗主题** — 浅色 / 跟随系统 / 深色三档切换
- **首页总览** — 在线节点、实时带宽、累计流量、资产概览
- **服务器卡片** — 国旗徽章、OS 图标、CPU/内存/磁盘/负载指标条、上下行趋势曲线、剩余流量配额、延迟 + 丢包率 12 桶历史胶囊
- **排序** — 默认 / 名称 / 实时网速 / 累计流量 / 价格，升降序
- **资产概览** — 按实时汇率折算剩余预付价值与月均成本

### 掉线显示与外观（v42）

- **不再整页误判离线** — WebSocket 抖动时连接指示灯变红，但卡片保持上一次有效状态，不再 13 张同时变暗 1–2 秒
- **离线判定 10 秒** — 服务端 30 秒无上报才判离线，叠加 10 秒保持后，机器关机约 40–53 秒才变暗；真离线仍会变暗，恢复后立即回亮
- **变亮即时** — 变暗方向保留 1 秒延迟（吞掉抖动），变亮方向 0.3 秒淡入，指示灯变绿与页面变亮同步
- **快照清洗** — `snap-fix.js` 在启动前删除本地快照中的历史离线值，避免首屏回放
- **深浅色分隔线** — 全部分隔线使用 `var(--k-border-subtle)`，浅色主题下不再隐形；CPU 指标上方新增一条分隔线（上 9px / 下 10px）

### 实例详情页

- **信息面板** — 系统 / 资源 / 网络三组信息，流量配额进度条，上/下一台切换
- **负载图表** — CPU / 内存 / 磁盘 / 网络 / 连接数 / 进程六张曲线，时间档位 10 分钟 ~ 7 天
- **Ping 图表** — 多任务线路折线图，任务 chips 显示延迟/丢包
- **硬件信息** — 处理器、系统、虚拟化、显卡等静态信息

## 📦 安装

> 需要 Komari >= 1.3.0

**方式一 — 直接上传 dist**

```bash
git clone https://github.com/Cuust/Komari-Home-Lumina.git
cd Komari-Home-Lumina
# 把 dist/ 打成 zip
zip -r komarihomeplus.zip dist komari-theme.json preview.png
```

进入 Komari 后台 → **主题管理** → 上传主题包 → 启用。

**方式二 — 手动放置**

把本仓库内容（`dist/`、`komari-theme.json`、`preview.png`）整体复制到：

```
<Komari 数据目录>/theme/komarihomeplus/
```

然后在后台主题管理中启用 **Komari Home Plus**。

## ⚙️ 配置

主题全部配置项在 `komari-theme.json` 中声明，安装后通过 Komari 后台的**主题设置面板**编辑，无需改代码。

| 配置项 | 类型 | 说明 |
|:---|:---:|:---|
| 头像链接 | 文本 | 头像图片 URL |
| 显示名称 | 文本 | 首页昵称 |
| 个人简介 | 文本 | 简短签名 |
| 所在地 | 文本 | 如：中国 · 上海 |
| 社交链接 | JSON | `name` / `icon` / `url` |
| 首页快速链接 | JSON | `name` / `icon` / `url` |
| 网址导航 | JSON | `name` / `icon` / `desc` / `url` |
| RSS 订阅 | 开关 + URL | RSS/Atom 订阅源 |
| 自定义 HTML | 富文本 | 任意 HTML 片段 |
| 背景图片 | 文本 | 全屏背景图 URL |
| 一言 / 时钟 | 开关 | 独立控制显示 |
| 资产概览忽略节点 | 文本 | 不参与价值统计的服务器 |

## 📁 目录结构

```
.
├── dist/
│   ├── index.html                              # 入口
│   ├── assets/
│   │   ├── index-DVhWVUeY-3isp-v42.js          # 主 bundle
│   │   ├── index-D_ZS1HD8-p6.css               # 样式
│   │   ├── bootstrap-icons-BeopsB42.woff       # 图标字体
│   │   └── bootstrap-icons-mSm7cUeB.woff2
│   └── komarihome/
│       ├── visitor-v10.js                      # 访客徽标脚本
│       ├── snap-fix.js                         # 启动前清洗本地状态快照
│       └── favicon.ico
├── komari-theme.json                           # 主题清单
└── preview.png                                 # 预览图
```

## 📄 许可

[MIT License](https://opensource.org/licenses/MIT)

上游版权归 [123nhh](https://github.com/123nhh) 所有。主题由 [shanyang242/Komari-Theme-LuminaPlus](https://github.com/shanyang242/Komari-Theme-LuminaPlus) 与 [mogumc/Komari-Home](https://github.com/mogumc/Komari-Home) 的思想启发构建。
