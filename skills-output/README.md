# PDF to PPTX Skill

## 概述

這個 skill 可以將 PDF 文件轉換為可編輯的 PowerPoint 演示文稿。

## 功能特點

- ✅ 提取 PDF 每頁的文字和圖片
- ✅ 智能布局（混合、純文字、純圖片）
- ✅ 生成完全可編輯的 PPTX 文件
- ✅ 保持頁面結構

## 安裝

### 方法 1：安裝到 ~/.claude/skills/

```bash
# 解壓 .skill 文件
unzip pdf-to-pptx.skill -d ~/.claude/skills/

# 或者直接複製已有的目錄
cp -r ~/.claude/skills/pdf-to-pptx ~/.claude/skills/
```

### 方法 2：在專案中使用

將 `.skill` 文件或解壓後的目錄放在您的專案中，並按照 SKILL.md 中的說明使用。

## 使用方法

### 基本轉換

```bash
python scripts/pdf_to_pptx.py input.pdf
```

### 指定輸出文件

```bash
python scripts/pdf_to_pptx.py report.pdf presentation.pptx
```

### 選擇布局模式

```bash
# 自動模式（默認）
python scripts/pdf_to_pptx.py input.pdf --mode auto

# 純文字模式
python scripts/pdf_to_pptx.py input.pdf --mode text-only

# 圖片優先模式
python scripts/pdf_to_pptx.py input.pdf --mode image-focus
```

## 依賴安裝

```bash
bash scripts/install_dependencies.sh
```

或手動安裝：

```bash
pip install PyMuPDF python-pptx Pillow
```

## 文件結構

```
pdf-to-pptx/
├── SKILL.md                          # 完整文檔
└── scripts/
    ├── pdf_to_pptx.py               # 主轉換腳本
    └── install_dependencies.sh      # 依賴安裝腳本
```

## 觸發條件

當用戶說以下內容時，Claude 會使用這個 skill：

- "把這個 PDF 轉成可編輯的演示文稿"
- "將這份 PDF 報告轉成 PowerPoint"
- "convert PDF to PowerPoint"
- "PDF to PPTX"

## 限制

- 需要可選擇文字的 PDF（不支持掃描件 OCR）
- 不保留原 PDF 的字體
- 複雜表格可能需要手動調整
- 顏色簡化為默認灰色

## 開發信息

- 使用 skill-creator 創建
- 遵循 Anthropic Skills 標準結構
- 驗證通過：`Skill is valid!`

---

**創建日期**: 2026-01-22
**版本**: 1.0.0
**作者**: Multi-Agent Systems Design Team
