#!/usr/bin/env python3
"""
生成多代理系統設計演示文稿
使用 python-pptx 庫直接創建 PowerPoint
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor

# 配色方案
COLOR_DARK = RGBColor(44, 62, 80)      # #2C3E50 深藍紫
COLOR_TEAL = RGBColor(22, 160, 133)    # #16A085 青綠
COLOR_CORAL = RGBColor(255, 107, 157)  # #FF6B9D 珊瑚橙
COLOR_WHITE = RGBColor(255, 255, 255)  # #FFFFFF 白色
COLOR_LIGHT_BG = RGBColor(247, 249, 252)  # #F7F9FC 淺灰背景
COLOR_TEXT = RGBColor(45, 55, 72)      # #2D3748 深灰文字
COLOR_TEXT_LIGHT = RGBColor(85, 85, 85)  # #555555 淺灰文字
COLOR_LIGHT_GRAY = RGBColor(189, 195, 199)  # #BDC3C7

def add_sidebar(slide, color):
    """添加左側色條"""
    left = Inches(0)
    top = Inches(0)
    width = Inches(0.15)
    height = Inches(7.5)

    shape = slide.shapes.add_shape(
        1,  # Rectangle
        left, top, width, height
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()

def add_title_slide(prs):
    """封面頁"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout

    # 深色背景
    background = slide.shapes.add_shape(
        1,  # Rectangle
        Inches(0), Inches(0), Inches(10), Inches(7.5)
    )
    background.fill.solid()
    background.fill.fore_color.rgb = COLOR_DARK
    background.line.fill.background()

    # 標題
    title_box = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(8), Inches(2))
    text_frame = title_box.text_frame
    text_frame.word_wrap = True

    p1 = text_frame.paragraphs[0]
    p1.text = "專利分析與科技預測"
    p1.font.size = Pt(48)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_WHITE
    p1.alignment = PP_ALIGN.CENTER

    p2 = text_frame.add_paragraph()
    p2.text = "多代理系統"
    p2.font.size = Pt(48)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_WHITE
    p2.alignment = PP_ALIGN.CENTER

    # 副標題
    subtitle_box = slide.shapes.add_textbox(Inches(1), Inches(4.7), Inches(8), Inches(0.5))
    p = subtitle_box.text_frame.paragraphs[0]
    p.text = "MCP × Skills × Cowork 架構設計"
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEAL
    p.alignment = PP_ALIGN.CENTER

    # 底部文字
    footer_box = slide.shapes.add_textbox(Inches(1), Inches(6.3), Inches(8), Inches(0.4))
    p = footer_box.text_frame.paragraphs[0]
    p.text = "基於企業級 AI 多代理協作框架"
    p.font.size = Pt(16)
    p.font.color.rgb = COLOR_LIGHT_GRAY
    p.alignment = PP_ALIGN.CENTER

def add_overview_slide(prs):
    """系統概述"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_TEAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "系統概述"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 核心目標小標題
    subtitle1_box = slide.shapes.add_textbox(Inches(0.6), Inches(1.5), Inches(8.5), Inches(0.4))
    p = subtitle1_box.text_frame.paragraphs[0]
    p.text = "核心目標"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEAL

    # 核心目標列表
    content1_box = slide.shapes.add_textbox(Inches(0.9), Inches(2.0), Inches(8.2), Inches(1.6))
    tf = content1_box.text_frame
    tf.word_wrap = True

    items1 = [
        "專利技術趨勢分析 - 識別技術演進軌跡",
        "學術前沿追蹤 - 預測研究熱點",
        "政策決策支援 - 結合 GRB 數據提供建議",
        "知識圖譜構建 - 跨領域技術關聯"
    ]

    for i, item in enumerate(items1):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.font.size = Pt(15)
        p.font.color.rgb = COLOR_TEXT
        p.level = 0
        p.space_before = Pt(6) if i > 0 else Pt(0)

    # 設計原則小標題
    subtitle2_box = slide.shapes.add_textbox(Inches(0.6), Inches(4.0), Inches(8.5), Inches(0.4))
    p = subtitle2_box.text_frame.paragraphs[0]
    p.text = "設計原則"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEAL

    # 設計原則列表
    content2_box = slide.shapes.add_textbox(Inches(0.9), Inches(4.5), Inches(8.2), Inches(1.2))
    tf = content2_box.text_frame
    tf.word_wrap = True

    items2 = [
        "模組化解耦 - MCP 統一數據，Skills 原子化",
        "可擴展性 - Agent 與 Skills 可動態增減",
        "可審計性 - 決策過程可追溯"
    ]

    for i, item in enumerate(items2):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.font.size = Pt(15)
        p.font.color.rgb = COLOR_TEXT
        p.level = 0
        p.space_before = Pt(6) if i > 0 else Pt(0)

def add_architecture_slide(prs):
    """三層架構"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_CORAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "三層架構設計"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 三個層次的框
    layers = [
        ("Cowork Layer 協作層", "Planner → Research → Analysis → Reviewer → Writer", 1.7),
        ("Skills Layer 技能層", "聚類 | 引用分析 | 趨勢預測 | 詞頻分析 | 可視化...", 3.2),
        ("MCP Layer 數據接入層", "Patent DB | Academic Papers | GRB Database | News APIs", 4.7)
    ]

    for title, desc, top in layers:
        # 背景框
        bg_box = slide.shapes.add_shape(
            1,  # Rectangle
            Inches(0.6), Inches(top), Inches(8.5), Inches(1.1)
        )
        bg_box.fill.solid()
        bg_box.fill.fore_color.rgb = COLOR_LIGHT_BG
        bg_box.line.color.rgb = COLOR_TEAL
        bg_box.line.width = Pt(5)

        # 標題
        title_box = slide.shapes.add_textbox(Inches(0.9), Inches(top + 0.15), Inches(8), Inches(0.3))
        p = title_box.text_frame.paragraphs[0]
        p.text = title
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK

        # 描述
        desc_box = slide.shapes.add_textbox(Inches(0.9), Inches(top + 0.5), Inches(8), Inches(0.5))
        tf = desc_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(14)
        p.font.color.rgb = COLOR_TEXT

def add_mcp_slide(prs):
    """MCP Layer 詳細"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_TEAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "MCP Layer 數據接入層"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 簡介
    intro_box = slide.shapes.add_textbox(Inches(0.6), Inches(1.4), Inches(8.5), Inches(0.5))
    tf = intro_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "標準化協議統一多源異構數據訪問，內建快取、重試與權限控制"
    p.font.size = Pt(16)
    p.font.color.rgb = COLOR_TEXT

    # 數據源列表
    sources = [
        ("Patent MCP - 專利數據庫", "USPTO、EPO、CNIPA、WIPO - 專利全文、引用網絡"),
        ("Academic MCP - 學術論文", "PubMed、arXiv、IEEE Xplore - 論文、作者網絡"),
        ("GRB MCP - 政府研究預算", "研究項目資助、科技政策文檔、預算分配"),
        ("News MCP - 科技新聞", "NewsAPI、Google News - 產業動態、市場趨勢")
    ]

    start_top = 2.3
    for i, (name, desc) in enumerate(sources):
        top = start_top + i * 0.9

        # 名稱
        name_box = slide.shapes.add_textbox(Inches(0.6), Inches(top), Inches(8.5), Inches(0.3))
        p = name_box.text_frame.paragraphs[0]
        p.text = name
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK

        # 描述
        desc_box = slide.shapes.add_textbox(Inches(0.6), Inches(top + 0.3), Inches(8.5), Inches(0.3))
        tf = desc_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(14)
        p.font.color.rgb = COLOR_TEXT_LIGHT

def add_skills_slide(prs):
    """Skills Layer 詳細"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_CORAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "Skills Layer 技能層"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 簡介
    intro_box = slide.shapes.add_textbox(Inches(0.6), Inches(1.4), Inches(8.5), Inches(0.4))
    p = intro_box.text_frame.paragraphs[0]
    p.text = "可重用、可測試、可編排的原子級與組合級能力"
    p.font.size = Pt(16)
    p.font.color.rgb = COLOR_TEXT

    # Skills 卡片（2列3行）
    skills = [
        ("PatentClusteringSkill", "專利技術聚類分析"),
        ("CitationBurstDetectionSkill", "突發引用技術檢測"),
        ("TrendForecastingSkill", "技術趨勢預測"),
        ("CrossDomainMappingSkill", "跨領域技術關聯分析"),
        ("WordFrequencySkill", "詞頻與共現網絡分析"),
        ("BiasDetectionSkill", "數據偏差檢測")
    ]

    col_width = 4.0
    row_height = 1.0
    start_left = 0.6
    start_top = 2.3

    for i, (name, desc) in enumerate(skills):
        row = i // 2
        col = i % 2

        left = start_left + col * (col_width + 0.5)
        top = start_top + row * (row_height + 0.2)

        # 背景框
        bg_box = slide.shapes.add_shape(
            1,  # Rectangle
            Inches(left), Inches(top), Inches(col_width), Inches(row_height)
        )
        bg_box.fill.solid()
        bg_box.fill.fore_color.rgb = COLOR_LIGHT_BG
        bg_box.line.color.rgb = COLOR_TEAL
        bg_box.line.width = Pt(4)

        # 技能名稱
        name_box = slide.shapes.add_textbox(Inches(left + 0.2), Inches(top + 0.2), Inches(col_width - 0.4), Inches(0.3))
        p = name_box.text_frame.paragraphs[0]
        p.text = name
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK

        # 描述
        desc_box = slide.shapes.add_textbox(Inches(left + 0.2), Inches(top + 0.5), Inches(col_width - 0.4), Inches(0.4))
        tf = desc_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(13)
        p.font.color.rgb = COLOR_TEXT_LIGHT

def add_cowork_slide(prs):
    """Cowork Layer"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_TEAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "Cowork Layer 協作層"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 簡介
    intro_box = slide.shapes.add_textbox(Inches(0.6), Inches(1.4), Inches(8.5), Inches(0.4))
    p = intro_box.text_frame.paragraphs[0]
    p.text = "多 Agent 角色分工與協作機制"
    p.font.size = Pt(16)
    p.font.color.rgb = COLOR_TEXT

    # 工作流程框
    workflow_box = slide.shapes.add_shape(
        1,  # Rectangle
        Inches(0.6), Inches(2.0), Inches(8.5), Inches(0.8)
    )
    workflow_box.fill.solid()
    workflow_box.fill.fore_color.rgb = COLOR_LIGHT_BG
    workflow_box.line.fill.background()

    workflow_text = slide.shapes.add_textbox(Inches(0.6), Inches(2.2), Inches(8.5), Inches(0.4))
    p = workflow_text.text_frame.paragraphs[0]
    p.text = "Planner → Research → Analysis → Reviewer → Writer"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK
    p.alignment = PP_ALIGN.CENTER

    # 協作特點小標題
    subtitle_box = slide.shapes.add_textbox(Inches(0.6), Inches(3.2), Inches(8.5), Inches(0.4))
    p = subtitle_box.text_frame.paragraphs[0]
    p.text = "協作特點"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 特點列表
    content_box = slide.shapes.add_textbox(Inches(0.9), Inches(3.7), Inches(8.2), Inches(2.0))
    tf = content_box.text_frame
    tf.word_wrap = True

    items = [
        "基於消息傳遞的非同步通信",
        "任務分解與依賴管理",
        "質量控制與迭代優化",
        "可追溯的決策過程",
        "Agent 間協商與反饋機制"
    ]

    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.font.size = Pt(15)
        p.font.color.rgb = COLOR_TEXT
        p.level = 0
        p.space_before = Pt(6) if i > 0 else Pt(0)

def add_agents_slide(prs):
    """核心 Agent"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_CORAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "核心 Agent 角色"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # Agent 列表
    agents = [
        ("Planner Agent 規劃者", "任務分解、依賴圖構建、資源估算、進度監控"),
        ("Research Agent 研究者", "MCP 數據獲取、數據清洗、質量驗證、數據集構建"),
        ("Analysis Agent 分析者", "調用 Skills 進行聚類、引用分析、趨勢預測、網絡分析"),
        ("Reviewer Agent 審查者", "方法論驗證、偏差檢測、可信度評估、質量控制"),
        ("Writer Agent 撰寫者", "政策敘事、報告生成、可視化、演示文稿製作")
    ]

    start_top = 1.6
    for i, (name, role) in enumerate(agents):
        top = start_top + i * 0.9

        # Agent 名稱
        name_box = slide.shapes.add_textbox(Inches(0.6), Inches(top), Inches(8.5), Inches(0.3))
        p = name_box.text_frame.paragraphs[0]
        p.text = name
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = COLOR_TEAL

        # Agent 職責
        role_box = slide.shapes.add_textbox(Inches(0.6), Inches(top + 0.3), Inches(8.5), Inches(0.3))
        tf = role_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = role
        p.font.size = Pt(14)
        p.font.color.rgb = COLOR_TEXT_LIGHT

def add_roadmap_slide(prs):
    """實施路線圖"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_TEAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "實施路線圖"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 階段列表
    phases = [
        ("Phase 1：基礎設施（1-2 月）", "MCP 協議層實現、Patent 與 Academic MCP 接口、核心 Skills 開發"),
        ("Phase 2：Agent 開發（2-3 月）", "Planner、Research、Analysis Agent 實現、Agent 通信協議、簡單協作流程"),
        ("Phase 3：質量與輸出（1-2 月）", "Reviewer Agent、Writer Agent、pptx skill 集成、評估指標體系"),
        ("Phase 4：驗證與優化（持續）", "真實案例驗證、算法優化、數據源擴展")
    ]

    start_top = 1.6
    for i, (title, details) in enumerate(phases):
        top = start_top + i * 1.25

        # 背景框
        bg_box = slide.shapes.add_shape(
            1,  # Rectangle
            Inches(0.6), Inches(top), Inches(8.5), Inches(1.0)
        )
        bg_box.fill.solid()
        bg_box.fill.fore_color.rgb = COLOR_LIGHT_BG
        bg_box.line.color.rgb = COLOR_TEAL
        bg_box.line.width = Pt(5)

        # 階段標題
        title_box = slide.shapes.add_textbox(Inches(0.9), Inches(top + 0.15), Inches(8), Inches(0.3))
        p = title_box.text_frame.paragraphs[0]
        p.text = title
        p.font.size = Pt(19)
        p.font.bold = True
        p.font.color.rgb = COLOR_DARK

        # 階段詳情
        details_box = slide.shapes.add_textbox(Inches(0.9), Inches(top + 0.5), Inches(8), Inches(0.4))
        tf = details_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = details
        p.font.size = Pt(14)
        p.font.color.rgb = COLOR_TEXT_LIGHT

def add_tech_stack_slide(prs):
    """技術棧"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_sidebar(slide, COLOR_CORAL)

    # 標題
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(8.5), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "技術棧建議"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_DARK

    # 技術分類
    tech_sections = [
        ("Agent 框架", "LangGraph / AutoGen / CrewAI"),
        ("MCP 實現", "Anthropic MCP SDK"),
        ("Skills 封裝", "Python (FastAPI) + Node.js"),
        ("NLP 與分析", "multilingual-e5-large, GPT-4, scikit-learn, NetworkX"),
        ("數據與基礎設施", "PostgreSQL, Neo4j, RabbitMQ / Kafka, Docker, Kubernetes"),
        ("可視化", "Plotly, D3.js, pptx skill")
    ]

    start_top = 1.6
    for i, (category, tech) in enumerate(tech_sections):
        top = start_top + i * 0.8

        # 分類標題
        category_box = slide.shapes.add_textbox(Inches(0.6), Inches(top), Inches(8.5), Inches(0.3))
        p = category_box.text_frame.paragraphs[0]
        p.text = category
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = COLOR_TEAL

        # 技術列表
        tech_box = slide.shapes.add_textbox(Inches(0.6), Inches(top + 0.3), Inches(8.5), Inches(0.3))
        tf = tech_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = tech
        p.font.size = Pt(14)
        p.font.color.rgb = COLOR_TEXT

def add_conclusion_slide(prs):
    """總結頁"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])

    # 深色背景
    background = slide.shapes.add_shape(
        1,  # Rectangle
        Inches(0), Inches(0), Inches(10), Inches(7.5)
    )
    background.fill.solid()
    background.fill.fore_color.rgb = COLOR_DARK
    background.line.fill.background()

    # 標題
    title_box = slide.shapes.add_textbox(Inches(1), Inches(0.8), Inches(8), Inches(0.8))
    p = title_box.text_frame.paragraphs[0]
    p.text = "下一步行動"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p.alignment = PP_ALIGN.CENTER

    # 立即開始
    subtitle1_box = slide.shapes.add_textbox(Inches(1), Inches(2.0), Inches(8), Inches(0.4))
    p = subtitle1_box.text_frame.paragraphs[0]
    p.text = "立即開始"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEAL

    content1_box = slide.shapes.add_textbox(Inches(1.5), Inches(2.5), Inches(7), Inches(1.2))
    tf = content1_box.text_frame
    tf.word_wrap = True

    items1 = [
        "閱讀完整設計文檔",
        "運行 Agent 協作示例",
        "選擇技術棧並搭建環境"
    ]

    for i, item in enumerate(items1):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.font.size = Pt(17)
        p.font.color.rgb = COLOR_WHITE
        p.level = 0
        p.space_before = Pt(8) if i > 0 else Pt(0)

    # Phase 1 目標
    subtitle2_box = slide.shapes.add_textbox(Inches(1), Inches(4.0), Inches(8), Inches(0.4))
    p = subtitle2_box.text_frame.paragraphs[0]
    p.text = "Phase 1 目標"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEAL

    content2_box = slide.shapes.add_textbox(Inches(1.5), Inches(4.5), Inches(7), Inches(1.2))
    tf = content2_box.text_frame
    tf.word_wrap = True

    items2 = [
        "實現 MCP 協議層",
        "開發核心 Skills（聚類、引用分析）",
        "建立第一個工作流程"
    ]

    for i, item in enumerate(items2):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.font.size = Pt(17)
        p.font.color.rgb = COLOR_WHITE
        p.level = 0
        p.space_before = Pt(8) if i > 0 else Pt(0)

    # 底部標語
    footer_box = slide.shapes.add_textbox(Inches(1), Inches(6.3), Inches(8), Inches(0.5))
    p = footer_box.text_frame.paragraphs[0]
    p.text = "企業級 AI 多代理系統 · 智慧決策支援"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEAL
    p.alignment = PP_ALIGN.CENTER

def main():
    """生成完整演示文稿"""
    print("開始生成演示文稿...\n")

    # 創建演示文稿
    prs = Presentation()
    prs.slide_width = Inches(10)  # 16:9
    prs.slide_height = Inches(7.5)

    # 添加所有幻燈片
    slides_funcs = [
        ("封面", add_title_slide),
        ("系統概述", add_overview_slide),
        ("三層架構", add_architecture_slide),
        ("MCP Layer", add_mcp_slide),
        ("Skills Layer", add_skills_slide),
        ("Cowork Layer", add_cowork_slide),
        ("核心 Agent", add_agents_slide),
        ("實施路線圖", add_roadmap_slide),
        ("技術棧", add_tech_stack_slide),
        ("總結", add_conclusion_slide)
    ]

    for i, (name, func) in enumerate(slides_funcs, 1):
        print(f"[{i}/{len(slides_funcs)}] 創建幻燈片: {name}")
        func(prs)

    # 保存文件
    output_path = "多代理系統設計.pptx"
    prs.save(output_path)

    print(f"\n✓ 演示文稿已生成: {output_path}")
    print(f"總共 {len(prs.slides)} 張幻燈片\n")

if __name__ == "__main__":
    main()
