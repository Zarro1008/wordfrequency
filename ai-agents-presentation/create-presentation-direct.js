const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'AI Agents Presentation';
pptx.title = 'AI Agents 與企業級 AI 架構';

// Colors (without # prefix)
const colors = {
  darkBlue: '1C2833',
  techBlue: '3498DB',
  teal: '1ABC9C',
  purple: '9B59B6',
  orange: 'F39C12',
  red: 'E74C3C',
  darkGray: '2C3E50',
  lightGray: 'ECF0F1',
  white: 'FFFFFF',
  lightGrayText: 'BDC3C7'
};

// Slide 1: Title
const slide1 = pptx.addSlide();
slide1.background = { color: colors.darkBlue };
slide1.addText('AI Agents 與企業級 AI 架構', {
  x: 0.5, y: 2.5, w: 9, h: 1,
  fontSize: 56, bold: true, color: colors.white, align: 'center'
});
slide1.addText('MCP、Skills、Cowork 三大核心概念', {
  x: 0.5, y: 3.8, w: 9, h: 0.6,
  fontSize: 28, color: colors.teal, align: 'center'
});
slide1.addText('政策分析與科技預測｜決策支援', {
  x: 0.5, y: 5.1, w: 9, h: 0.3,
  fontSize: 14, color: colors.lightGrayText, align: 'center'
});

// Slide 2: MCP Concept
const slide2 = pptx.addSlide();
slide2.background = { color: colors.lightGray };
slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide2.addText('MCP（Model Context Protocol）', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.techBlue }, line: { type: 'none' }
});
slide2.addText('概念說明', {
  x: 0.82, y: 0.07, w: 5, h: 0.35,
  fontSize: 20, bold: true, color: colors.white
});

slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.83, w: 8.9, h: 0.97,
  fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.teal }
});
slide2.addText([
  { text: '定義：', options: { bold: true } },
  { text: '上下文與能力暴露的標準化協議\n', options: {} },
  { text: '核心功能：', options: { bold: true } },
  { text: '讓 AI Agent 以一致、可控的方式存取外部資源與工具', options: {} }
], {
  x: 0.82, y: 1.97, w: 8.36, h: 0.69,
  fontSize: 16, color: colors.darkGray, lineSpacing: 22
});

slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 2.94, w: 8.9, h: 0.97,
  fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.teal }
});
slide2.addText('可存取資源：\n• 資料庫\n• 檔案系統\n• API\n• 專用分析模組', {
  x: 0.82, y: 3.08, w: 8.36, h: 0.69,
  fontSize: 16, color: colors.darkGray, lineSpacing: 18
});

slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 4.11, w: 8.9, h: 0.55,
  fill: { color: colors.teal }, line: { type: 'none' }
});
slide2.addText('類比：AI Agent 世界中的「USB-C 介面標準」', {
  x: 0.82, y: 4.25, w: 8.36, h: 0.28,
  fontSize: 16, bold: true, color: colors.white
});

// Slide 3: MCP Problems
const slide3 = pptx.addSlide();
slide3.background = { color: colors.lightGray };
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide3.addText('MCP 解決的關鍵問題', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.techBlue }, line: { type: 'none' }
});
slide3.addText('企業級挑戰', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

const problems = [
  '各 Agent 與工具之間介面不一致',
  '上下文（context）來源混亂、不可控',
  '工具權限與可用性難以治理',
  '不利於企業級擴充與審計（auditability）'
];

problems.forEach((problem, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  slide3.addShape(pptx.shapes.RECTANGLE, {
    x: 0.55 + col * 4.65, y: 1.94 + row * 1.11, w: 4.31, h: 0.83,
    fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.red }
  });
  slide3.addText(problem, {
    x: 0.82 + col * 4.65, y: 2.08 + row * 1.11, w: 3.77, h: 0.55,
    fontSize: 15, color: colors.darkGray, lineSpacing: 22, valign: 'middle'
  });
});

// Slide 4: Skills Concept
const slide4 = pptx.addSlide();
slide4.background = { color: colors.lightGray };
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide4.addText('Skills（技能模組）', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.purple }, line: { type: 'none' }
});
slide4.addText('概念說明', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.83, w: 8.9, h: 0.55,
  fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.teal }
});
slide4.addText([
  { text: '定義：', options: { bold: true } },
  { text: '可被 Agent 呼叫的原子級或組合級能力', options: {} }
], {
  x: 0.82, y: 1.97, w: 8.36, h: 0.28,
  fontSize: 16, color: colors.darkGray
});

slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 2.53, w: 8.9, h: 1.25,
  fill: { color: colors.white }, line: { type: 'none' }
});
slide4.addText([
  { text: '特性：', options: { bold: true, fontSize: 16 } },
  { text: '\n• 明確輸入／輸出\n• 可測試\n• 可重用\n• 可被編排（orchestration）', options: { fontSize: 15 } }
], {
  x: 0.82, y: 2.67, w: 8.36, h: 0.97,
  color: colors.darkGray, lineSpacing: 18
});

slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 3.94, w: 8.9, h: 0.55,
  fill: { color: colors.purple }, line: { type: 'none' }
});
slide4.addText('核心意義：Agent「能做什麼」的具體體現', {
  x: 0.82, y: 4.08, w: 8.36, h: 0.28,
  fontSize: 16, bold: true, color: colors.white
});

// Slide 5: Skills Levels
const slide5 = pptx.addSlide();
slide5.background = { color: colors.lightGray };
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide5.addText('Skills 的層級架構', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.purple }, line: { type: 'none' }
});
slide5.addText('兩大層級', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

// Atomic Skill box
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.94, w: 4.03, h: 2.22,
  fill: { color: colors.white }, line: { type: 'solid', pt: 8, color: colors.purple }
});
slide5.addText('Atomic Skill', {
  x: 0.9, y: 2.22, w: 3.33, h: 0.28,
  fontSize: 20, bold: true, color: colors.purple
});
slide5.addText([
  { text: '原子技能', options: { bold: true } },
  { text: '\n\n單一功能\n\n', options: {} },
  { text: '如：摘要、分類、比對', options: { italic: true, fontSize: 13, color: '7F8C8D' } }
], {
  x: 0.9, y: 2.64, w: 3.33, h: 1.11,
  fontSize: 15, color: colors.darkGray, lineSpacing: 22
});

// Composite Skill box
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 5.42, y: 1.94, w: 4.03, h: 2.22,
  fill: { color: colors.white }, line: { type: 'solid', pt: 8, color: colors.purple }
});
slide5.addText('Composite Skill', {
  x: 5.77, y: 2.22, w: 3.33, h: 0.28,
  fontSize: 20, bold: true, color: colors.purple
});
slide5.addText([
  { text: '組合技能', options: { bold: true } },
  { text: '\n\n多個 Skill 的流程組合\n\n', options: {} },
  { text: '如：完整分析任務', options: { italic: true, fontSize: 13, color: '7F8C8D' } }
], {
  x: 5.77, y: 2.64, w: 3.33, h: 1.11,
  fontSize: 15, color: colors.darkGray, lineSpacing: 22
});

// Slide 6: Skills Examples
const slide6 = pptx.addSlide();
slide6.background = { color: colors.lightGray };
slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide6.addText('Skills 範例：專利分析應用', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.purple }, line: { type: 'none' }
});
slide6.addText('專利分析 Skills', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

const skills = [
  { name: 'PatentClusteringSkill', desc: '依 IPC/CPC 或 embedding 進行分群' },
  { name: 'CitationBurstDetectionSkill', desc: '偵測突發引用技術' },
  { name: 'TechnologyTrendNarrativeSkill', desc: '將分析結果轉為政策／產業敘事' }
];

skills.forEach((skill, idx) => {
  slide6.addShape(pptx.shapes.RECTANGLE, {
    x: 0.55, y: 1.83 + idx * 0.83, w: 8.9, h: 0.69,
    fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.purple }
  });
  slide6.addText([
    { text: skill.name, options: { bold: true, fontSize: 18, color: colors.purple } },
    { text: '\n' + skill.desc, options: { fontSize: 14 } }
  ], {
    x: 0.82, y: 1.97 + idx * 0.83, w: 8.36, h: 0.42,
    color: colors.darkGray, lineSpacing: 22
  });
});

// Slide 7: Cowork Concept
const slide7 = pptx.addSlide();
slide7.background = { color: colors.lightGray };
slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide7.addText('Cowork（Co-worker Agents）', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.orange }, line: { type: 'none' }
});
slide7.addText('概念說明', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.83, w: 8.9, h: 0.55,
  fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.teal }
});
slide7.addText([
  { text: '定義：', options: { bold: true } },
  { text: '多個 Agent 之間的協作關係與分工機制', options: {} }
], {
  x: 0.82, y: 1.97, w: 8.36, h: 0.28,
  fontSize: 16, color: colors.darkGray
});

slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 2.53, w: 8.9, h: 1.25,
  fill: { color: colors.white }, line: { type: 'none' }
});
slide7.addText([
  { text: '核心要素：', options: { bold: true, fontSize: 16 } },
  { text: '\n• 角色分工（role-based agents）\n• 任務分解\n• 協商與回饋\n• 共同目標導向', options: { fontSize: 15 } }
], {
  x: 0.82, y: 2.67, w: 8.36, h: 0.97,
  color: colors.darkGray, lineSpacing: 18
});

slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 3.94, w: 8.9, h: 0.55,
  fill: { color: colors.orange }, line: { type: 'none' }
});
slide7.addText('本質：AI Agent 團隊的組織與協作模式', {
  x: 0.82, y: 4.08, w: 8.36, h: 0.28,
  fontSize: 16, bold: true, color: colors.white
});

// Slide 8: Cowork Roles
const slide8 = pptx.addSlide();
slide8.background = { color: colors.lightGray };
slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide8.addText('典型的 Cowork 角色架構', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.orange }, line: { type: 'none' }
});
slide8.addText('五大角色', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

const roles = [
  { name: 'Planner Agent', desc: '任務拆解與流程規劃' },
  { name: 'Research Agent', desc: '資料蒐集與驗證' },
  { name: 'Analysis Agent', desc: '模型推論與分析' },
  { name: 'Reviewer Agent', desc: '品質控管與批判' },
  { name: 'Writer Agent', desc: '結構化輸出與敘事' }
];

roles.slice(0, 4).forEach((role, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: 0.55 + col * 4.65, y: 1.94 + row * 0.97, w: 4.31, h: 0.83,
    fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.orange }
  });
  slide8.addText([
    { text: role.name, options: { bold: true, fontSize: 16, color: colors.orange } },
    { text: '\n' + role.desc, options: { fontSize: 13 } }
  ], {
    x: 0.82 + col * 4.65, y: 2.08 + row * 0.97, w: 3.77, h: 0.55,
    color: colors.darkGray, lineSpacing: 18
  });
});

// Writer Agent centered at bottom
slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 2.875, y: 3.88, w: 4.31, h: 0.83,
  fill: { color: colors.white }, line: { type: 'solid', pt: 6, color: colors.orange }
});
slide8.addText([
  { text: 'Writer Agent', options: { bold: true, fontSize: 16, color: colors.orange } },
  { text: '\n結構化輸出與敘事', options: { fontSize: 13 } }
], {
  x: 3.145, y: 4.02, w: 3.77, h: 0.55,
  color: colors.darkGray, lineSpacing: 18
});

// Slide 9: Cowork Example
const slide9 = pptx.addSlide();
slide9.background = { color: colors.lightGray };
slide9.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.83,
  fill: { color: colors.darkBlue }, line: { type: 'none' }
});
slide9.addText('技術趨勢分析：Cowork 流程示範', {
  x: 0.55, y: 0.21, w: 8, h: 0.44,
  fontSize: 32, bold: true, color: colors.white
});

slide9.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.11, w: 8.9, h: 0.55,
  fill: { color: colors.orange }, line: { type: 'none' }
});
slide9.addText('完整協作流程', {
  x: 0.82, y: 1.25, w: 5, h: 0.28,
  fontSize: 20, bold: true, color: colors.white
});

slide9.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: 1.83, w: 8.9, h: 2.78,
  fill: { color: colors.white }, line: { type: 'none' }
});

const workflow = [
  'Planner Agent：定義分析目標（技術趨勢）',
  'Research Agent：透過 MCP 擷取專利與新聞',
  'Analysis Agent：呼叫多個 Skills 進行網絡分析',
  'Reviewer Agent：檢查方法與結論合理性',
  'Writer Agent：產出簡報'
];

slide9.addText(
  workflow.map((step, idx) => ({
    text: (idx + 1) + '. ' + step.split('：')[0] + '：',
    options: { bold: true, color: colors.orange, fontSize: 15, breakLine: false }
  })).concat(workflow.map((step, idx) => ({
    text: step.split('：')[1] + '\n',
    options: { fontSize: 15, color: colors.darkGray }
  }))),
  {
    x: 0.82, y: 2.08, w: 8.36, h: 2.29,
    lineSpacing: 22
  }
);

// Actually let's create the workflow text properly
slide9.addText([
  { text: '1. ', options: { bold: true, color: colors.orange } },
  { text: 'Planner Agent：', options: { bold: true, color: colors.orange } },
  { text: '定義分析目標（技術趨勢）\n', options: {} },
  { text: '2. ', options: { bold: true, color: colors.orange } },
  { text: 'Research Agent：', options: { bold: true, color: colors.orange } },
  { text: '透過 MCP 擷取專利與新聞\n', options: {} },
  { text: '3. ', options: { bold: true, color: colors.orange } },
  { text: 'Analysis Agent：', options: { bold: true, color: colors.orange } },
  { text: '呼叫多個 Skills 進行網絡分析\n', options: {} },
  { text: '4. ', options: { bold: true, color: colors.orange } },
  { text: 'Reviewer Agent：', options: { bold: true, color: colors.orange } },
  { text: '檢查方法與結論合理性\n', options: {} },
  { text: '5. ', options: { bold: true, color: colors.orange } },
  { text: 'Writer Agent：', options: { bold: true, color: colors.orange } },
  { text: '產出簡報', options: {} }
], {
  x: 0.82, y: 2.08, w: 8.36, h: 2.29,
  fontSize: 15, color: colors.darkGray, lineSpacing: 22
});

// Slide 10: Summary
const slide10 = pptx.addSlide();
slide10.background = { color: colors.darkBlue };

slide10.addShape(pptx.shapes.RECTANGLE, {
  x: 0.69, y: 1.25, w: 8.33, h: 1.11,
  fill: { color: '1C283310' },
  line: { type: 'solid', pt: 3, color: colors.teal }
});
slide10.addText('MCP + Skills + Cowork\n= 企業級 AI 架構', {
  x: 1.11, y: 1.53, w: 7.5, h: 0.55,
  fontSize: 36, bold: true, color: colors.teal, align: 'center', lineSpacing: 30
});

slide10.addShape(pptx.shapes.RECTANGLE, {
  x: 0.69, y: 2.64, w: 8.33, h: 1.94,
  fill: { color: colors.white }, line: { type: 'none' }
});
slide10.addText([
  { text: '• ', options: { bold: true, color: colors.teal } },
  { text: 'MCP', options: { bold: true, color: colors.teal } },
  { text: ' 提供標準化介面\n', options: {} },
  { text: '• ', options: { bold: true, color: colors.teal } },
  { text: 'Skills', options: { bold: true, color: colors.teal } },
  { text: ' 提供可重用能力\n', options: {} },
  { text: '• ', options: { bold: true, color: colors.teal } },
  { text: 'Cowork', options: { bold: true, color: colors.teal } },
  { text: ' 實現智慧協作\n', options: {} },
  { text: '• 三者結合構建可擴展、可治理的企業級 AI 系統', options: {} }
], {
  x: 1.11, y: 2.92, w: 7.5, h: 1.39,
  fontSize: 16, color: colors.darkGray, lineSpacing: 22
});

pptx.writeFile({ fileName: 'AI-Agents-Enterprise-Architecture.pptx' })
  .then(() => console.log('Presentation created successfully!'))
  .catch(err => console.error('Error:', err));
