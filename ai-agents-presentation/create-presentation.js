const pptxgen = require('pptxgenjs');
const html2pptx = require('/home/user/wordfrequency/.claude/skills/pptx/scripts/html2pptx.js');

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI Agents Presentation';
  pptx.title = 'AI Agents 與企業級 AI 架構';

  // Slide 1: Title
  await html2pptx('slides/slide1.html', pptx);

  // Slide 2: MCP Concept
  await html2pptx('slides/slide2.html', pptx);

  // Slide 3: MCP Problems
  await html2pptx('slides/slide3.html', pptx);

  // Slide 4: Skills Concept
  await html2pptx('slides/slide4.html', pptx);

  // Slide 5: Skills Levels
  await html2pptx('slides/slide5.html', pptx);

  // Slide 6: Skills Examples
  await html2pptx('slides/slide6.html', pptx);

  // Slide 7: Cowork Concept
  await html2pptx('slides/slide7.html', pptx);

  // Slide 8: Cowork Roles
  await html2pptx('slides/slide8.html', pptx);

  // Slide 9: Cowork Example
  await html2pptx('slides/slide9.html', pptx);

  // Slide 10: Summary
  await html2pptx('slides/slide10.html', pptx);

  await pptx.writeFile({ fileName: 'AI-Agents-Enterprise-Architecture.pptx' });
  console.log('Presentation created successfully!');
}

createPresentation().catch(console.error);
