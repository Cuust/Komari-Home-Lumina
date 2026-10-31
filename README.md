# Komari Home Plus · 定制版

基于 [Komari-Home-Plus](https://github.com/123nhh/Komari-Home-Plus) v1.2.1 的二开版本，遵循上游 MIT License。
本仓库是个人定制的发布版，不代表上游官方版本。

## 定制内容（相对上游 v1.2.1）

### 功能修复

1. **丢包率不显示** —— `buildPingModel` 补充 `loss` 字段（最近 1 小时丢包比例）
2. **剩余流量不变** —— 配额已用量改读实时 `traffic_in` / `traffic_out`，不再读节点静态字段
3. **连接指示灯闪红** —— RPC 超时 8s → 15s，连续 3 次失败才判红，失败后自动重连，后台标签页不计数
4. **卡片重复国旗** —— 副标题只保留 `group`，不再拼接 `region`
5. **资产概览卡卡在"计算中"** —— 汇率接口改为 `https://open.er-api.com/v6/latest/USD`

### 新增能力

6. **访客 IP 徽标** —— `dist/komarihome/visitor-v10.js`：底部居中黑色胶囊，蓝色地球图标 + IP | 国家，滚动渐隐、停止 0.8 秒后渐显；上报 `public:recordVisitorEvent`（page_view / node_open，需服务端 `visitor_audit_enabled=true`）

7. **节点瞬断防闪烁** —— RPC 层 `_kh` 缓存每个节点最近一次有效状态：15 秒内的瞬时离线沿用上一帧，不再触发整卡变暗；超过 15 秒仍按真实离线显示。用于解决 Agent 经反向代理重连时，整批节点卡片瞬间变暗再闪回的问题

### 界面调整

8. 首页隐藏页脚
9. 首页「流量监测」去除胶囊进度条，只保留标题与数值，并在其上下加隔断线与相邻区块分隔
10. 健康区（延迟率 / 丢包率）行高收紧至 20px，手机 18px
11. 详情页「总流量」进度条改为 2px 细线

## 上游与致谢

- [Komari](https://github.com/komari-monitor/komari) —— MIT
- [Komari-Home](https://github.com/mogumc/Komari-Home) —— MIT，by MoGuQAQ
- [Komari-Home-Plus](https://github.com/123nhh/Komari-Home-Plus) —— MIT，本项目直接上游
- [Komari-Theme-LuminaPlus](https://github.com/shanyang242/Komari-Theme-LuminaPlus) —— MIT
- [komari-theme-Lumina](https://github.com/stqfdyr/komari-theme-Lumina) —— 未声明许可，仅作设计参考

## 安装

```bash
# 方式一：Komari 后台「主题 - 上传主题」直接导入 Release 里的 zip
# 方式二：手动部署
unzip komarihomeplus-*.zip -d /tmp/theme
systemctl stop komari
rm -rf /opt/komari/data/theme/komarihomeplus
cp -a /tmp/theme/komarihomeplus/. /opt/komari/data/theme/komarihomeplus/
systemctl start komari
```

主题设置（网址导航图标、访客审计开关等）保存在 `komari.db` 的
`theme_configurations` / `configs` 表中，不在本仓库内。

## 目录说明

- `dist/` —— 主题构建产物（含上述全部改动，`index.html` 引用 `assets/index-DVhWVUeY-3isp-v36.js`）
- `komari-theme.json` —— 主题清单
- `preview.png` —— 预览图
- `LICENSE` —— MIT

## 说明

- 上游升级会覆盖 `dist/`；升级后需重新套用补丁，或直接用本仓库覆盖（会回退主题版本）
- 本仓库不含数据库、私钥、API Token 等任何凭据

## License

[MIT](LICENSE)
