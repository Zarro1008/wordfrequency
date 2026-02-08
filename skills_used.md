# 已安裝的 Skills 清單

> 本文件記錄所有已安裝的 Skills，包含功能說明與使用方式。
> 每次安裝新的 Skills 時，此文件會自動更新。
>
> 最後更新日期：2026-02-08

---

## 內建 Skills

### keybindings-help

- **用途：** 自訂鍵盤快捷鍵
- **說明：** 當使用者需要自訂鍵盤快捷鍵、重新綁定按鍵、新增組合鍵、或修改 `~/.claude/keybindings.json` 時使用。
- **使用方式：** 直接描述需求，例如「重新綁定 ctrl+s」、「新增組合快捷鍵」、「修改提交鍵」等。

### session-start-hook

- **用途：** 建立 Claude Code on the web 的啟動 Hook
- **說明：** 當使用者需要為 Claude Code on the web 建立 SessionStart hook，以確保專案在 web session 中能正常執行測試與 linter。
- **使用方式：** 直接描述需求，例如「幫我設定啟動 hook」。

---

## Superpowers Plugin Skills

> 來源：[obra/superpowers](https://github.com/obra/superpowers)
> 安裝路徑：`~/.claude/plugins/superpowers/`

---

### 1. brainstorming（腦力激盪）

- **觸發條件：** 任何創意工作之前 — 建立功能、建構元件、新增功能、修改行為。
- **說明：** 引導協作式設計討論，將模糊的想法轉化為完整的設計與規格。會檢查專案狀態、逐一提問（偏好選擇題）、提出 2-3 種方案與權衡分析，以 200-300 字段落遞進式驗證設計。
- **使用方式：** `Skill tool → superpowers:brainstorming` 或 `/brainstorm`
- **流程：**
  1. 理解想法：檢查專案狀態、逐一提問
  2. 探索方案：提出 2-3 種方案與權衡
  3. 呈現設計：分段驗證
  4. 產出設計文件至 `docs/plans/YYYY-MM-DD-<topic>-design.md`
  5. 使用 `using-git-worktrees` 建立隔離工作區，再用 `writing-plans` 撰寫計畫
- **核心原則：** 嚴格遵守 YAGNI — 移除不必要的功能

---

### 2. dispatching-parallel-agents（派遣平行代理）

- **觸發條件：** 面對 2 個以上可獨立處理、無共享狀態或順序依賴的任務時使用。
- **說明：** 透過為每個獨立問題領域派遣一個代理來實現平行問題解決。當存在多個不相關的失敗（不同測試檔、不同子系統、不同 bug），每個調查都會作為獨立的並行代理任務派遣。
- **使用方式：** `Skill tool → superpowers:dispatching-parallel-agents`
- **適用場景：**
  - 3 個以上測試檔因不同根因失敗
  - 多個獨立子系統故障
  - 無共享狀態的問題
- **不適用場景：**
  - 失敗之間有關聯
  - 需要完整系統狀態
  - 代理之間會互相干擾

---

### 3. executing-plans（執行計畫）

- **觸發條件：** 擁有已撰寫的實作計畫，需要在獨立 session 中分批執行並設有檢查點。
- **說明：** 載入實作計畫、批判性審查後，以批次方式執行任務（預設每批 3 個任務），批次之間提交檢查點報告供架構師審查。
- **使用方式：** `Skill tool → superpowers:executing-plans` 或 `/execute-plan`
- **流程：**
  1. 載入並審查計畫，開始前提出疑慮
  2. 執行批次（預設前 3 個任務），嚴格依照步驟
  3. 報告已實作內容、顯示驗證輸出、等待回饋
  4. 套用回饋、執行下一批、重複
  5. 使用 `finishing-a-development-branch` 完成

---

### 4. finishing-a-development-branch（完成開發分支）

- **觸發條件：** 實作完成、所有測試通過，需要決定如何整合工作。
- **說明：** 引導開發結束的工作流程：驗證測試通過、確定基礎分支，然後呈現 4 個選項：本地合併、推送並建立 PR、保留分支、或捨棄。
- **使用方式：** `Skill tool → superpowers:finishing-a-development-branch`
- **選項：**
  1. 本地合併至主分支
  2. 推送並建立 Pull Request
  3. 保留分支不動
  4. 捨棄分支（需輸入 "discard" 確認）
- **注意：** 測試未通過時不得繼續

---

### 5. receiving-code-review（接收 Code Review）

- **觸發條件：** 收到 code review 回饋時，在實作建議之前使用，特別是回饋不清楚或技術上有疑問時。
- **說明：** 定義如何以技術評估而非情緒表演的方式處理 code review 回饋。強調在實作前對照程式碼庫驗證建議，不清楚的項目先釐清再開始。
- **使用方式：** `Skill tool → superpowers:receiving-code-review`
- **回應模式：** 閱讀 → 理解 → 驗證 → 評估 → 回應 → 實作
- **禁止用語：** 「你說得完全對！」、「好觀點！」等表演性認同
- **實作順序：** 先釐清不明項目 → 阻擋性問題 → 簡單修正 → 複雜修正

---

### 6. requesting-code-review（請求 Code Review）

- **觸發條件：** 完成任務、實作主要功能、合併前進行驗證。
- **說明：** 提供結構化流程來派遣 code-reviewer 子代理以在問題擴散前發現問題。取得 git SHA、填寫審查模板、依回饋分類（Critical/Important/Minor）處理。
- **使用方式：** `Skill tool → superpowers:requesting-code-review`
- **強制審查時機：** subagent-driven-development 每個任務後、主要功能完成後、合併至主分支前
- **回饋處理：**
  - **Critical：** 立即修復
  - **Important：** 繼續前修復
  - **Minor：** 記錄備用

---

### 7. subagent-driven-development（子代理驅動開發）

- **觸發條件：** 在目前 session 中執行含有獨立任務的實作計畫。
- **說明：** 透過為每個任務派遣獨立子代理來執行實作計畫，每個任務完成後進行兩階段審查：先規格合規審查，再程式碼品質審查。
- **使用方式：** `Skill tool → superpowers:subagent-driven-development`
- **流程：**
  1. 讀取計畫 → 提取所有任務 → 建立 TodoWrite
  2. 每個任務：派遣實作子代理 → 規格審查 → 品質審查 → 標記完成
  3. 最終審查 → 完成分支
- **兩階段審查：** 規格合規（程式碼是否符合規格？）→ 程式碼品質（程式碼是否良好？）

---

### 8. systematic-debugging（系統性除錯）

- **觸發條件：** 遇到任何 bug、測試失敗或非預期行為時，在提出修復前使用。
- **說明：** 強制執行嚴謹的四階段除錯方法論。鐵律：「沒有根因調查就不准修復。」如果 3 次以上修復嘗試失敗，必須質疑架構。
- **使用方式：** `Skill tool → superpowers:systematic-debugging`
- **四階段：**
  1. **根因調查：** 仔細閱讀錯誤訊息、穩定重現、檢查近期變更
  2. **模式分析：** 找到可運作的範例、與參考比較
  3. **假設與測試：** 形成單一假設、最小化測試
  4. **實作：** 建立失敗測試、實作單一修復、驗證
- **效益：** 系統性方法 15-30 分鐘 vs 隨機嘗試 2-3 小時；首次修復成功率 95% vs 40%

---

### 9. test-driven-development（測試驅動開發）

- **觸發條件：** 實作任何功能或 bug 修復時，在撰寫實作程式碼之前使用。
- **說明：** 強制執行嚴格的 RED-GREEN-REFACTOR 循環。鐵律：「沒有失敗的測試就不准寫產品程式碼。」如果在測試前寫了程式碼，必須完全刪除。
- **使用方式：** `Skill tool → superpowers:test-driven-development`
- **循環：**
  1. **RED：** 撰寫一個最小的失敗測試
  2. **驗證 RED：** 執行測試，確認因預期原因失敗
  3. **GREEN：** 撰寫最簡單的程式碼使測試通過
  4. **驗證 GREEN：** 執行測試，確認通過且無其他測試中斷
  5. **REFACTOR：** 移除重複、改善命名、提取輔助函式 — 保持測試綠燈

---

### 10. using-git-worktrees（使用 Git Worktrees）

- **觸發條件：** 開始需要與目前工作區隔離的功能開發，或執行實作計畫之前。
- **說明：** 以系統性的目錄選擇流程建立隔離的 git worktree 工作區。驗證 worktree 目錄已被 gitignore、自動偵測專案並執行設定、驗證測試基線。
- **使用方式：** `Skill tool → superpowers:using-git-worktrees`
- **目錄優先順序：** `.worktrees/`（首選）→ `worktrees/` → CLAUDE.md 設定 → 詢問使用者
- **自動偵測設定：**
  - `package.json` → `npm install`
  - `Cargo.toml` → `cargo build`
  - `requirements.txt` → `pip install`
  - `go.mod` → `go mod download`

---

### 11. using-superpowers（使用 Superpowers）

- **觸發條件：** 任何對話開始時 — 建立如何發現和使用 skills 的規則。
- **說明：** 管理所有其他 skills 發現與調用的 meta-skill。要求在任何回應或行動之前，即使只有 1% 的可能性適用，也必須透過 Skill tool 調用相關 skill。
- **使用方式：** `Skill tool → superpowers:using-superpowers`（由 SessionStart hook 自動載入）
- **規則：** 在任何回應或行動之前調用相關 skills
- **Skill 優先順序：**
  1. 流程 skills 優先（brainstorming、debugging）
  2. 實作 skills 其次

---

### 12. verification-before-completion（完成前驗證）

- **觸發條件：** 即將宣稱工作完成、已修復或通過時，在提交或建立 PR 之前使用。
- **說明：** 透過要求在任何成功斷言之前提供新鮮的驗證證據來防止錯誤的完成宣稱。鐵律：「沒有新鮮的驗證證據就不准宣稱完成。」
- **使用方式：** `Skill tool → superpowers:verification-before-completion`
- **閘門流程：**
  1. **識別：** 什麼指令能證明此宣稱？
  2. **執行：** 新鮮、完整地執行
  3. **閱讀：** 完整輸出、退出碼、失敗計數
  4. **驗證：** 輸出是否確認宣稱？
  5. **然後才能** 做出宣稱

---

### 13. writing-plans（撰寫計畫）

- **觸發條件：** 擁有規格或需求的多步驟任務，在碰觸程式碼之前使用。
- **說明：** 建立全面的實作計畫，包含細緻的任務步驟，假設實作工程師對程式碼庫零認知。每個步驟為一個動作（2-5 分鐘），包含確切檔案路徑、完整程式碼、預期輸出的確切指令。
- **使用方式：** `Skill tool → superpowers:writing-plans` 或 `/write-plan`
- **計畫結構：**
  - 標頭：功能名稱、目標、架構、技術棧
  - 任務結構：檔案清單 → 撰寫失敗測試 → 驗證失敗 → 撰寫最小實作 → 驗證通過 → 提交
- **產出路徑：** `docs/plans/YYYY-MM-DD-<feature-name>.md`

---

### 14. writing-skills（撰寫 Skills）

- **觸發條件：** 建立新 skills、編輯既有 skills、或在部署前驗證 skills 是否有效。
- **說明：** 將 TDD 方法論應用於 skill/流程文件的建立。Skills 必須在部署前以子代理壓力場景測試：無 skill 執行基線（RED）、撰寫針對特定失敗的最小 skill（GREEN）、封堵測試中發現的漏洞（REFACTOR）。
- **使用方式：** `Skill tool → superpowers:writing-skills`
- **鐵律：** 「沒有失敗的測試就不准建立 Skill」
- **SKILL.md 結構：** 前置資料（name + description）、概述、使用時機、核心模式、快速參考、實作、常見錯誤

---

## Slash Commands（斜線指令）

| 指令 | 對應 Skill | 說明 |
|------|-----------|------|
| `/brainstorm` | `superpowers:brainstorming` | 在任何創意工作前進行腦力激盪 |
| `/write-plan` | `superpowers:writing-plans` | 建立含細緻任務的詳細實作計畫 |
| `/execute-plan` | `superpowers:executing-plans` | 分批執行計畫並設有審查檢查點 |

---

## Skill 依賴關係圖

```
brainstorming
  └─→ using-git-worktrees + writing-plans

writing-plans
  └─→ subagent-driven-development 或 executing-plans

subagent-driven-development
  ├─→ using-git-worktrees
  ├─→ writing-plans
  ├─→ requesting-code-review
  ├─→ finishing-a-development-branch
  └─→ 子代理使用 test-driven-development

executing-plans
  ├─→ using-git-worktrees
  ├─→ writing-plans
  └─→ finishing-a-development-branch

systematic-debugging
  ├─→ test-driven-development
  └─→ verification-before-completion
```
