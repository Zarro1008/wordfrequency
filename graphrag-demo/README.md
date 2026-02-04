# GraphRAG 演示 - LlamaIndex 实现

使用 LlamaIndex 构建的 GraphRAG（Graph-based Retrieval Augmented Generation）快速原型。

## 什么是 GraphRAG？

GraphRAG 将**知识图谱**与**检索增强生成（RAG）**结合，通过图结构捕捉实体间的关系，实现更强大的问答系统。

### 与传统 RAG 的区别

| 特性 | 传统 RAG | GraphRAG |
|------|---------|----------|
| 检索方式 | 向量相似度 | 图遍历 + 向量检索 |
| 关系理解 | 弱 | 强（显式建模） |
| 多跳推理 | 困难 | 自然支持 |
| 全局理解 | 有限 | 通过社区检测 |
| 可解释性 | 低 | 高（路径可视化） |

## 项目结构

```
graphrag-demo/
├── README.md                 # 本文档
├── requirements.txt          # Python 依赖
├── simple_graphrag.py        # 构建知识图谱
├── query_graphrag.py         # 查询已保存的图谱
├── data/                     # 源文档目录
│   ├── ai_agents.txt
│   └── knowledge_graph.txt
└── storage/                  # 保存的索引（自动生成）
    └── knowledge_graph.graphml
```

## 安装依赖

### 方法 1：使用 pip（推荐）

```bash
pip install llama-index llama-index-llms-anthropic networkx
```

### 方法 2：使用 requirements.txt

```bash
pip install -r requirements.txt
```

## 配置

### 1. 设置 API Key

使用 Claude API（Anthropic）：

```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

或者使用 `.env` 文件：

```bash
# 创建 .env 文件
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env
```

### 2. 准备文档

将您的文档放在 `data/` 目录：

```bash
# 支持的格式
- .txt（纯文本）
- .pdf（PDF 文档）
- .docx（Word 文档）
- .md（Markdown）
```

## 使用方法

### 步骤 1：构建知识图谱

```bash
python simple_graphrag.py
```

这将：
1. 加载 `data/` 目录中的所有文档
2. 提取实体和关系
3. 构建知识图谱
4. 保存索引到 `storage/`
5. 导出图谱可视化文件

### 步骤 2：查询知识图谱

```bash
python query_graphrag.py
```

进入交互式查询模式：

```
您的问题: MCP 是什么？
回答: MCP（Model Context Protocol）是一种标准化协议...

您的问题: AI Agents 有哪些协作角色？
回答: 典型的协作角色包括 Planner Agent、Research Agent...
```

## 高级配置

### 调整图谱构建参数

编辑 `simple_graphrag.py`：

```python
index = KnowledgeGraphIndex.from_documents(
    documents,
    max_triplets_per_chunk=2,  # 每个文档块提取的三元组数量
    chunk_size=512,             # 文档分块大小
    include_embeddings=True,    # 包含向量嵌入
)
```

### 更改 LLM

使用 OpenAI：

```python
from llama_index.llms.openai import OpenAI

llm = OpenAI(
    model="gpt-4",
    api_key=os.getenv("OPENAI_API_KEY"),
)
```

### 使用外部图数据库（Neo4j）

```python
from llama_index.graph_stores.neo4j import Neo4jGraphStore

graph_store = Neo4jGraphStore(
    username="neo4j",
    password="your-password",
    url="bolt://localhost:7687",
    database="neo4j",
)
```

## 可视化知识图谱

生成的 `knowledge_graph.graphml` 文件可以用以下工具打开：

1. **Gephi**（推荐）
   - 下载：https://gephi.org/
   - 支持交互式可视化和分析

2. **yEd**
   - 下载：https://www.yworks.com/products/yed
   - 自动布局算法

3. **Python NetworkX**

```python
import networkx as nx
import matplotlib.pyplot as plt

G = nx.read_graphml("storage/knowledge_graph.graphml")
nx.draw(G, with_labels=True, node_color='lightblue',
        node_size=500, font_size=10)
plt.show()
```

## 示例查询

### 基础查询
```
问：文档的主要主题是什么？
问：有哪些关键实体？
问：MCP 和 Skills 有什么关系？
```

### 多跳推理
```
问：如何构建一个企业级 AI 系统？
问：解释 Cowork 中各个 Agent 如何协作
```

### 关系查询
```
问：列出所有与 GraphRAG 相关的概念
问：知识图谱和传统 RAG 的区别
```

## 性能优化

### 1. 使用更快的嵌入模型

```python
# 使用 OpenAI 嵌入（更快但需要 API）
from llama_index.embeddings.openai import OpenAIEmbedding
embed_model = OpenAIEmbedding()

# 或使用轻量级本地模型
embed_model = resolve_embed_model("local:sentence-transformers/all-MiniLM-L6-v2")
```

### 2. 批量处理

对于大量文档，使用批量处理：

```python
from llama_index.core import DocumentSummaryIndex

# 分批加载
batch_size = 10
for i in range(0, len(documents), batch_size):
    batch = documents[i:i+batch_size]
    # 处理批次
```

### 3. 增量更新

只更新新文档，不重建整个索引：

```python
# 加载现有索引
index = load_index_from_storage(storage_context)

# 添加新文档
new_docs = SimpleDirectoryReader("./new_data").load_data()
index.insert(new_docs)
index.storage_context.persist()
```

## 故障排除

### 问题 1：API Key 错误

```
错误: ANTHROPIC_API_KEY not found
解决: export ANTHROPIC_API_KEY='your-key'
```

### 问题 2：内存不足

```
错误: Out of memory
解决:
- 减少 chunk_size
- 减少 max_triplets_per_chunk
- 分批处理文档
```

### 问题 3：图谱构建慢

```
解决:
- 使用更小的嵌入模型
- 减少文档数量
- 使用 GPU 加速
```

## 扩展功能

### 1. 社区检测

识别图中的主题社区：

```python
import networkx as nx
from networkx.algorithms import community

G = index.get_networkx_graph()
communities = community.greedy_modularity_communities(G)
print(f"发现 {len(communities)} 个社区")
```

### 2. 中心性分析

找到最重要的实体：

```python
centrality = nx.degree_centrality(G)
sorted_nodes = sorted(centrality.items(), key=lambda x: x[1], reverse=True)
print("Top 5 最重要的实体:")
for node, score in sorted_nodes[:5]:
    print(f"  {node}: {score:.3f}")
```

### 3. 路径查找

查找实体间的最短路径：

```python
try:
    path = nx.shortest_path(G, "MCP", "Skills")
    print(f"路径: {' -> '.join(path)}")
except nx.NetworkXNoPath:
    print("未找到路径")
```

## 参考资源

- **LlamaIndex 文档**: https://docs.llamaindex.ai/
- **Microsoft GraphRAG**: https://github.com/microsoft/graphrag
- **Neo4j 图数据库**: https://neo4j.com/
- **NetworkX 文档**: https://networkx.org/

## 常见问题

**Q: GraphRAG 适合什么场景？**
A:
- 需要理解实体关系的问答系统
- 多文档的跨文档推理
- 需要可解释性的 AI 应用
- 知识密集型领域（法律、医疗、金融）

**Q: 与 Microsoft GraphRAG 有什么区别？**
A:
- LlamaIndex：轻量级，易于集成，适合快速原型
- Microsoft GraphRAG：功能更全，支持社区检测和分层摘要，适合生产环境

**Q: 性能如何？**
A:
- 小规模（< 100 文档）：实时响应
- 中等规模（100-1000 文档）：秒级响应
- 大规模（> 1000 文档）：建议使用外部图数据库（Neo4j）

## 许可证

MIT License
