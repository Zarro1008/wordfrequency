# 专利分析与科技预测多代理系统

> 基于 MCP、Skills、Cowork 架构的企业级 AI 多代理系统设计

## 📚 文档概览

本目录包含完整的系统设计文档，用于指导专利分析与科技预测多代理系统的开发与实施。

### 核心文档

- **[multi-agent-system-design.md](./multi-agent-system-design.md)** - 完整系统设计文档
  - 系统架构（三层架构：MCP、Skills、Cowork）
  - 5 个核心 Agent 的详细定义
  - 10+ Skills 清单与接口规格
  - 4 个 MCP 数据源配置
  - 实施路线图与技术栈建议

### 补充资源

- **[../config/mcp-config.json](../config/mcp-config.json)** - MCP 数据源配置文件
  - Patent MCP (专利数据库)
  - Academic MCP (学术论文)
  - GRB MCP (政府研究预算)
  - News MCP (科技新闻)

- **[../skills/WordFrequencySkill.js](../skills/WordFrequencySkill.js)** - Skill 实现示例
  - 基于现有 WordFreq.js 模块的封装
  - 标准 Skill 接口实现
  - 单词频率与共现分析

- **[../examples/agent-communication-example.js](../examples/agent-communication-example.js)** - Agent 协作示例
  - 消息总线实现
  - 5 个 Agent 的简化实现
  - 完整的任务协作流程演示

## 🎯 系统目标

本系统旨在通过多代理协作实现：

1. **专利技术趋势分析** - 从大规模专利数据识别技术演进
2. **学术前沿追踪** - 分析学术论文网络，预测研究热点
3. **政策决策支援** - 结合 GRB 数据，提供科技政策建议
4. **知识图谱构建** - 建立跨领域技术关联网络

## 🏗️ 架构概览

```
┌─────────────────────────────────────────────────────────┐
│              Cowork Layer (Agent 协作层)                 │
│  Planner → Research → Analysis → Reviewer → Writer     │
├─────────────────────────────────────────────────────────┤
│              Skills Layer (可复用技能层)                 │
│  聚类 | 引用分析 | 趋势预测 | 词频分析 | 可视化...      │
├─────────────────────────────────────────────────────────┤
│              MCP Layer (标准数据接入层)                  │
│  Patent DB | Academic Papers | GRB | News APIs         │
└─────────────────────────────────────────────────────────┘
```

## 🤖 核心 Agent

| Agent | 职责 | 关键能力 |
|-------|------|----------|
| **Planner** | 任务规划与分解 | 依赖图构建、资源估算 |
| **Research** | 多源数据获取 | MCP 接入、数据验证 |
| **Analysis** | 深度分析计算 | 聚类、网络分析、趋势预测 |
| **Reviewer** | 质量控制审查 | 方法论验证、偏差检测 |
| **Writer** | 结构化输出 | 政策叙事、报告生成、可视化 |

## 🛠️ Skills 清单

### 数据获取类
- DataFetchSkill - 多源数据获取
- DataCleaningSkill - 数据清洗与标准化

### 分析类
- **PatentClusteringSkill** - 专利技术聚类
- **CitationBurstDetectionSkill** - 突发引用检测
- **TrendForecastingSkill** - 趋势预测
- **CrossDomainMappingSkill** - 跨领域关联分析
- **WordFrequencySkill** - 词频与共现分析

### 审查类
- BiasDetectionSkill - 数据偏差检测
- ConfidenceEstimationSkill - 可信度估算

### 输出类
- PolicyFramingSkill - 政策建议生成
- PresentationGenerationSkill - PowerPoint 生成

## 🔌 MCP 数据源

| 数据源 | 提供商 | 用途 |
|--------|--------|------|
| **Patent MCP** | USPTO, EPO, CNIPA | 专利数据、引用网络 |
| **Academic MCP** | PubMed, arXiv, IEEE | 学术论文、作者网络 |
| **GRB MCP** | 政府数据库 | 研究预算、政策文档 |
| **News MCP** | NewsAPI, Google News | 产业动态、市场趋势 |

## 🚀 快速开始

### 1. 查看系统设计

```bash
# 阅读完整设计文档
cat docs/multi-agent-system-design.md
```

### 2. 运行 Skill 示例

```bash
# 测试 WordFrequencySkill
cd /home/user/wordfrequency
node skills/WordFrequencySkill.js
```

### 3. 运行 Agent 协作示例

```bash
# 演示多代理通信
node examples/agent-communication-example.js
```

输出示例：
```
=== 专利分析多代理系统 - 协作示例 ===

[Planner] 开始处理用户请求: 分析 2020-2025 年人工智能芯片专利趋势
[Research] 正在获取数据: fetch_patents
[Analysis] 正在分析数据集: ds_20260121_001
[Reviewer] 正在审查分析结果...
[Writer] 正在生成政策简报...
[Writer] 报告生成完成！

=== 任务完成 ===
```

## 📊 应用场景示例

### 场景 1：AI 芯片技术趋势分析

**输入**：
```json
{
  "task": "分析 2020-2025 年 AI 芯片专利趋势",
  "scope": ["US", "CN", "EP"],
  "output_format": "policy_brief"
}
```

**工作流**：
1. Planner 分解任务
2. Research 获取 12,453 件专利数据
3. Analysis 识别 3 个技术聚类
4. Reviewer 验证分析质量
5. Writer 生成 4 页政策简报

**输出**：
- 政策简报 PDF
- 技术趋势图表
- PowerPoint 演示文稿

### 场景 2：跨领域技术融合分析

**任务**：发现"量子计算"与"人工智能"的交叉技术

**Skills 调用**：
- CrossDomainMappingSkill
- CitationBurstDetectionSkill
- WordFrequencySkill

**成果**：技术关联网络图 + 新兴研究方向报告

## 📈 实施路线图

### Phase 1：基础设施（1-2 月）
- [ ] MCP 协议层实现
- [ ] Patent & Academic MCP 接口
- [ ] 核心 Skills 开发

### Phase 2：Agent 开发（2-3 月）
- [ ] Planner、Research、Analysis Agent
- [ ] Agent 通信协议
- [ ] 简单协作流程

### Phase 3：质量与输出（1-2 月）
- [ ] Reviewer Agent
- [ ] Writer Agent + pptx skill
- [ ] 评估指标体系

### Phase 4：验证与优化（持续）
- [ ] 真实案例验证
- [ ] 算法优化
- [ ] 数据源扩展

## 🔧 技术栈

### 推荐框架
- **Agent 框架**：LangGraph / AutoGen / CrewAI
- **MCP 实现**：Anthropic MCP SDK
- **Skills 封装**：Python (FastAPI) + Node.js

### 数据与分析
- **NLP**：multilingual-e5-large, GPT-4
- **聚类**：scikit-learn, HDBSCAN
- **网络分析**：NetworkX, Gephi
- **可视化**：Plotly, D3.js, pptx skill

### 基础设施
- **数据库**：PostgreSQL, Neo4j
- **消息队列**：RabbitMQ / Kafka
- **容器化**：Docker, Kubernetes

## 📝 贡献指南

### 添加新 Skill

1. 创建 Skill 文件（参考 `WordFrequencySkill.js`）
2. 实现标准接口：
   - `execute(input)` - 执行方法
   - `getMetadata()` - 元数据
   - 输入输出验证

3. 更新 Skills 清单文档

### 添加新 Agent

1. 继承 `BaseAgent` 类
2. 实现 `handleMessage(message)` 方法
3. 定义消息类型与响应逻辑
4. 更新系统设计文档

### 添加新 MCP 数据源

1. 在 `config/mcp-config.json` 添加配置
2. 实现数据源适配器
3. 测试查询与鉴权
4. 更新文档

## 🎓 学习资源

- [Anthropic MCP Documentation](https://modelcontextprotocol.io)
- [LangGraph Multi-Agent Guide](https://langchain-ai.github.io/langgraph/)
- [Multi-Agent Systems: A Modern Approach](https://www.masfoundations.org/)
- [Patent Analytics with AI](https://www.wipo.int/patents/en/)

## 📧 联系方式

- **项目维护者**: Multi-Agent Systems Design Team
- **文档更新**: 2026-01-21
- **版本**: v1.0

## 📄 许可证

本设计文档遵循项目根目录下的 LICENSE 文件。

---

**下一步行动**：

1. ✅ 阅读 [完整系统设计文档](./multi-agent-system-design.md)
2. ✅ 运行 [Agent 协作示例](../examples/agent-communication-example.js)
3. ✅ 查看 [MCP 配置文件](../config/mcp-config.json)
4. 🚀 开始实施 Phase 1：基础设施搭建

