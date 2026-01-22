# PPTX Image Text Remover Skill

## 概述

這個 skill 可以移除 PowerPoint 簡報中嵌入圖片的文字，同時保持圖片質量。

## 功能特點

- ✅ 智能文字檢測（EasyOCR 或簡單模式）
- ✅ 進階圖像修復（OpenCV inpainting）
- ✅ 多語言支援（英文、中文、日文、韓文等）
- ✅ 批次處理所有圖片
- ✅ 保持原始圖片質量

## 安裝

### 方法 1：安裝到 ~/.claude/skills/

```bash
# 解壓 .skill 文件
unzip pptx-image-text-remover.skill -d ~/.claude/skills/

# 或者直接複製已有的目錄
cp -r ~/.claude/skills/pptx-image-text-remover ~/.claude/skills/
```

### 方法 2：在專案中使用

將 `.skill` 文件或解壓後的目錄放在您的專案中，並按照 SKILL.md 中的說明使用。

## 使用方法

### 基本文字移除

```bash
python scripts/remove_text_from_images.py input.pptx
```

### 指定輸出文件

```bash
python scripts/remove_text_from_images.py presentation.pptx cleaned_presentation.pptx
```

### 選擇檢測模式

```bash
# EasyOCR 模式（預設）- 準確但較慢
python scripts/remove_text_from_images.py input.pptx output.pptx

# 簡單模式 - 快速但準確度較低
python scripts/remove_text_from_images.py input.pptx output.pptx --simple
```

### 指定語言

```bash
# 英文（預設）
python scripts/remove_text_from_images.py input.pptx output.pptx --lang en

# 繁體中文 + 簡體中文
python scripts/remove_text_from_images.py input.pptx output.pptx --lang ch_sim,ch_tra

# 日文
python scripts/remove_text_from_images.py input.pptx output.pptx --lang ja

# 多語言混合
python scripts/remove_text_from_images.py input.pptx output.pptx --lang en,ch_sim
```

## 依賴安裝

```bash
bash scripts/install_dependencies.sh
```

或手動安裝：

```bash
# 必需套件
pip install opencv-python numpy Pillow

# 可選（用於準確的文字檢測）
pip install easyocr
```

## 工作原理

1. **解壓 PPTX** - 提取 PPTX 文件（ZIP 格式）
2. **定位圖片** - 在 `ppt/media/` 目錄中找到所有圖片
3. **檢測文字** - 使用 EasyOCR 或簡單方法定位文字區域
4. **創建遮罩** - 為檢測到的文字區域生成二進制遮罩
5. **修復圖像** - 使用 OpenCV 的 `cv2.inpaint()` 無縫填充文字區域
6. **重新打包** - 用處理過的圖片重新組裝 PPTX

## 檢測方法比較

### EasyOCR 方法
- ✅ 非常準確的文字檢測
- ✅ 多語言支援（50+ 種語言）
- ✅ 處理旋轉和彎曲文字
- ❌ 處理較慢（每張圖片約 2-3 秒）
- ❌ 首次使用需下載大型模型（約 500MB）

### 簡單方法
- ✅ 快速處理（每張圖片 <1 秒）
- ✅ 不需下載模型
- ✅ 記憶體佔用小
- ❌ 複雜文字布局準確度較低
- ❌ 最適合水平文字

## 使用場景

1. **清理螢幕截圖** - 移除簡報中截圖的 UI 文字和標籤
2. **移除浮水印** - 清除簡報圖片的浮水印和版權文字
3. **準備圖片重用** - 清理圖片以便在不同場景重複使用
4. **多語言簡報** - 處理包含中文、日文或韓文的簡報

## 限制

- **背景質量影響** - 在簡單背景上效果最好
- **複雜圖案** - 可能在高度紋理化的背景上留下痕跡
- **OCR 限制** - 簡單模式可能會遺漏風格化或藝術字體
- **圖片格式** - 處理 PPTX media 資料夾中的常見格式（PNG、JPG、BMP）
- **非圖片元素** - 不處理文字框或圖形，僅處理嵌入圖片

## 觸發條件

當用戶說以下內容時，Claude 會使用這個 skill：

- "移除 PowerPoint 圖片中的文字"
- "清理 PPTX 圖片"
- "remove text from PowerPoint images"
- "clean PPTX images"
- "移除簡報圖片的浮水印"

## 文件結構

```
pptx-image-text-remover/
├── SKILL.md                          # 完整文檔
└── scripts/
    ├── remove_text_from_images.py   # 主處理腳本
    └── install_dependencies.sh      # 依賴安裝腳本
```

## 開發信息

- 使用 skill-creator 創建
- 遵循 Anthropic Skills 標準結構
- 驗證通過：`Skill is valid!`
- 技術棧：OpenCV、EasyOCR、NumPy、Pillow

---

**創建日期**: 2026-01-22
**版本**: 1.0.0
**作者**: Multi-Agent Systems Design Team
