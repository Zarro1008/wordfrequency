# Superpowers 安裝說明

## 已完成的安裝

✅ Superpowers 已克隆到：`~/.claude/skills/superpowers/`

## Superpowers 概述

Superpowers 是一個完整的軟體開發工作流程框架，為 AI 編碼代理提供結構化的軟體建構流程。

### 版本信息
- **版本**: 4.1.1
- **作者**: Jesse Vincent (jesse@fsck.com)
- **授權**: MIT License
- **倉庫**: https://github.com/obra/superpowers

## 包含的 Skills（共 14 個）

### 測試相關
1. **test-driven-development** - RED-GREEN-REFACTOR 循環，包含測試反模式參考

### 調試相關
2. **systematic-debugging** - 4 階段根本原因分析流程
3. **verification-before-completion** - 確保問題真正解決

### 協作流程
4. **brainstorming** - 蘇格拉底式設計精煉
5. **writing-plans** - 詳細實現計劃
6. **executing-plans** - 批次執行與檢查點
7. **dispatching-parallel-agents** - 並發子代理工作流
8. **requesting-code-review** - 代碼審查前檢查清單
9. **receiving-code-review** - 回應反饋
10. **using-git-worktrees** - 並行開發分支
11. **finishing-a-development-branch** - 合併/PR 決策工作流
12. **subagent-driven-development** - 快速迭代與兩階段審查

### 元技能
13. **writing-skills** - 創建新 skills 的最佳實踐
14. **using-superpowers** - Skills 系統介紹

## 包含的命令

- `/superpowers:brainstorm` - 互動式設計精煉
- `/superpowers:write-plan` - 創建實現計劃
- `/superpowers:execute-plan` - 批次執行計劃

## 包含的 Hooks

- **SessionStart Hook** - 在會話啟動時自動執行設置

## 核心工作流程

### 1. 設計階段（Brainstorming）
- 在編寫任何代碼之前啟動
- 通過提問精煉粗略想法
- 探索替代方案
- 分段展示設計以供驗證
- 保存設計文檔

### 2. 使用 Git Worktrees
- 設計批准後啟動
- 在新分支上創建隔離工作區
- 運行項目設置
- 驗證乾淨的測試基線

### 3. 編寫計劃（Writing Plans）
- 將工作分解為小任務（每個 2-5 分鐘）
- 每個任務包含確切的文件路徑、完整代碼、驗證步驟

### 4. 子代理驅動開發
- 為每個任務調度新的子代理
- 兩階段審查：規範符合性，然後代碼質量
- 或批次執行並設置人工檢查點

### 5. 測試驅動開發（TDD）
- 實現期間強制執行
- RED-GREEN-REFACTOR 循環：
  1. 編寫失敗測試
  2. 觀察測試失敗
  3. 編寫最小代碼
  4. 觀察測試通過
  5. 提交
- 刪除在測試之前編寫的代碼

### 6. 代碼審查
- 任務之間啟動
- 根據計劃審查
- 按嚴重程度報告問題
- 關鍵問題阻止進度

### 7. 完成開發分支
- 任務完成時啟動
- 驗證測試
- 提供選項（合併/PR/保留/丟棄）
- 清理 worktree

## 設計哲學

- **測試驅動開發** - 始終先寫測試
- **系統化優於臨時** - 流程優於猜測
- **降低複雜性** - 簡單性作為主要目標
- **證據優於聲明** - 在宣布成功之前驗證

## 目前的安裝狀態

### 方式 1：已完成（手動克隆）
✅ 倉庫已克隆到 `~/.claude/skills/superpowers/`
✅ 包含所有 14 個 skills
✅ 包含自定義命令和 hooks
✅ 可以手動調用 skills（如 `superpowers:brainstorming`）

### 方式 2：推薦安裝（Plugin Marketplace）

如果想要完整的 plugin 集成（自動命令和 hooks），可以使用官方 marketplace：

```bash
# 註冊 marketplace
/plugin marketplace add obra/superpowers-marketplace

# 安裝 plugin
/plugin install superpowers@superpowers-marketplace

# 更新 plugin
/plugin update superpowers
```

### 驗證安裝

檢查命令是否出現：
```bash
/help
```

應該看到：
```
/superpowers:brainstorm - Interactive design refinement
/superpowers:write-plan - Create implementation plan
/superpowers:execute-plan - Execute plan in batches
```

## 使用方法

### 手動調用 Skill

由於已克隆到 skills 目錄，可以直接引用 skills：

```
請使用 superpowers:brainstorming skill 幫我設計這個功能
```

或

```
請遵循 superpowers:test-driven-development skill 的方法
```

### 使用斜杠命令（需要完整 plugin 安裝）

```bash
/superpowers:brainstorm
/superpowers:write-plan
/superpowers:execute-plan
```

## 各 Skill 的觸發時機

根據 README，agent 會在以下情況自動檢查相關 skills：

- **brainstorming**: 創建功能、構建組件、添加功能或修改行為之前
- **test-driven-development**: 實現期間
- **writing-plans**: 設計批准後
- **subagent-driven-development**: 有計劃時
- **requesting-code-review**: 任務之間
- **finishing-a-development-branch**: 任務完成時

## 目錄結構

```
~/.claude/skills/superpowers/
├── .claude-plugin/
│   ├── plugin.json          # Plugin 元數據
│   └── marketplace.json     # Marketplace 配置
├── skills/                  # 14 個 skills
│   ├── brainstorming/
│   ├── dispatching-parallel-agents/
│   ├── executing-plans/
│   ├── finishing-a-development-branch/
│   ├── receiving-code-review/
│   ├── requesting-code-review/
│   ├── subagent-driven-development/
│   ├── systematic-debugging/
│   ├── test-driven-development/
│   ├── using-git-worktrees/
│   ├── using-superpowers/
│   ├── verification-before-completion/
│   ├── writing-plans/
│   └── writing-skills/
├── commands/                # 斜杠命令
│   ├── brainstorm.md
│   ├── execute-plan.md
│   └── write-plan.md
├── hooks/                   # Session hooks
│   ├── hooks.json
│   ├── run-hook.cmd
│   └── session-start.sh
├── agents/                  # Agent 配置
├── lib/                     # 共享庫
├── tests/                   # 測試
└── docs/                    # 文檔

```

## 相關資源

- **GitHub**: https://github.com/obra/superpowers
- **Marketplace**: https://github.com/obra/superpowers-marketplace
- **Blog**: https://blog.fsck.com/2025/10/09/superpowers/
- **Issues**: https://github.com/obra/superpowers/issues
- **贊助**: https://github.com/sponsors/obra

## 後續步驟

1. ✅ **已完成**: Superpowers 已克隆並可用
2. **可選**: 使用 plugin marketplace 安裝以獲得完整集成
3. **開始使用**: 在項目中引用 superpowers skills
4. **探索**: 閱讀各個 skill 的 SKILL.md 文件

---

**安裝日期**: 2026-02-03
**安裝位置**: `~/.claude/skills/superpowers/`
**安裝方式**: Git 克隆
