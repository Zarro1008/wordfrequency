/**
 * 生成多代理系統設計演示文稿
 * 使用 html2pptx 將 HTML 幻燈片轉換為 PowerPoint
 */

const pptxgen = require('pptxgenjs');
const html2pptx = require('../.claude/skills/pptx/scripts/html2pptx');
const path = require('path');

async function createPresentation() {
  console.log('開始生成演示文稿...\n');

  // 創建 PowerPoint 實例
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Multi-Agent Systems Design Team';
  pptx.title = '專利分析與科技預測多代理系統';
  pptx.subject = 'MCP × Skills × Cowork 架構設計';

  // HTML 幻燈片文件列表
  const slides = [
    'slide1.html',  // 封面
    'slide2.html',  // 系統概述
    'slide3.html',  // 三層架構
    'slide4.html',  // MCP Layer
    'slide5.html',  // Skills Layer
    'slide6.html',  // Cowork Layer
    'slide7.html',  // 核心 Agent
    'slide8.html',  // 實施路線圖
    'slide9.html',  // 技術棧
    'slide10.html'  // 總結
  ];

  // 轉換每個 HTML 文件
  for (let i = 0; i < slides.length; i++) {
    const slideFile = slides[i];
    const slidePath = path.join(__dirname, 'slides', slideFile);

    console.log(`[${i + 1}/${slides.length}] 處理 ${slideFile}...`);

    try {
      await html2pptx(slidePath, pptx);
      console.log(`  ✓ 完成`);
    } catch (error) {
      console.error(`  ✗ 錯誤: ${error.message}`);
      throw error;
    }
  }

  // 保存 PowerPoint 文件
  const outputPath = path.join(__dirname, '多代理系統設計.pptx');
  await pptx.writeFile({ fileName: outputPath });

  console.log(`\n演示文稿已生成: ${outputPath}`);
  console.log(`總共 ${slides.length} 張幻燈片\n`);

  return outputPath;
}

// 執行
if (require.main === module) {
  createPresentation()
    .then((outputPath) => {
      console.log('✓ 成功！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n✗ 生成失敗:');
      console.error(error);
      process.exit(1);
    });
}

module.exports = { createPresentation };
