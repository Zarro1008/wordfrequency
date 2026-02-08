# 已安装的 Claude Code Skills

本文档记录已安装的 Claude Code skills。

## 全局 Skills (用户级别)

这些 skills 安装在 `/root/.claude/skills/`，适用于所有项目。

### 1. notebooklm (v0.3.2)
- **来源**: https://github.com/teng-lin/notebooklm-py
- **描述**: Google NotebookLM 的完整 Python API，支持创建笔记本、添加源、生成各类内容（播客、视频、测验等）
- **安装方式**: `pip install "notebooklm-py[browser]"` + `notebooklm skill install`
- **主要功能**:
  - 笔记本管理（创建、列表、重命名、删除）
  - 添加多种源（URL、YouTube、PDF、文档、音视频）
  - 与内容对话
  - 生成播客、视频、幻灯片、测验、闪卡、报告等
  - 多格式下载（MP3、MP4、PDF、PNG、CSV、JSON、Markdown）
- **使用方式**: `/notebooklm` 或自然语言（如："创建一个关于量子计算的播客"）
- **注意**: 需要先运行 `notebooklm login` 进行 Google OAuth 认证

### 2. find-skills
- **来源**: https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md
- **描述**: 帮助发现和安装 agent skills，当用户询问"如何做 X"或"寻找某个 skill"时激活
- **安装方式**: 手动下载 SKILL.md 到 `/root/.claude/skills/find-skills/`
- **主要功能**:
  - 搜索可用的 skills：`npx skills find [query]`
  - 安装 skills：`npx skills add <package>`
  - 浏览 skills：https://skills.sh/
- **使用方式**: 询问"如何做某事"或"找一个能做某事的 skill"
- **Skills CLI 版本**: 1.2.3

### 3. pptx
- **来源**: Claude Code 内置（项目级别）
- **位置**: `.claude/skills/pptx/`
- **描述**: PowerPoint 简报的创建、编辑和分析
- **主要功能**:
  - 使用 HTML 创建新的演示文稿
  - 使用模板创建演示文稿
  - 编辑现有演示文稿（OOXML）
  - 生成缩略图
- **安装时间**: 2025-01-21

## 项目级别 Skills

项目级别的 skills 安装在项目的 `.claude/skills/` 目录（已添加到 .gitignore）。

目前没有项目级别的 skills。

## 安装新 Skills

### 使用 notebooklm skill install
```bash
notebooklm skill install
```

### 使用 npx skills
```bash
# 搜索 skills
npx skills find [query]

# 安装 skill
npx skills add <owner/repo@skill> -g -y

# 列出已安装的 skills
npx skills list -g
```

### 手动安装
1. 创建目录：`mkdir -p /root/.claude/skills/<skill-name>/`
2. 下载 SKILL.md 到该目录
3. 重启 Claude Code 或重新加载 skills

## 更新日志

- **2025-01-30**: 安装 notebooklm skill (v0.3.2)
- **2025-01-30**: 安装 find-skills skill
- **2025-01-21**: 安装 pptx skill
