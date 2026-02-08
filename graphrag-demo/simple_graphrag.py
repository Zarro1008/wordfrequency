"""
LlamaIndex GraphRAG 简单示例
使用内存图存储，不需要外部数据库
"""
import os
from llama_index.core import (
    SimpleDirectoryReader,
    KnowledgeGraphIndex,
    ServiceContext,
    StorageContext,
)
from llama_index.core.graph_stores import SimpleGraphStore
from llama_index.llms.anthropic import Anthropic
from llama_index.core.embeddings import resolve_embed_model

def main():
    # 1. 设置 API Key
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("请设置环境变量 ANTHROPIC_API_KEY")
        print("export ANTHROPIC_API_KEY='your-api-key'")
        return

    # 2. 初始化 LLM（使用 Claude）
    llm = Anthropic(
        model="claude-3-5-sonnet-20241022",
        api_key=os.getenv("ANTHROPIC_API_KEY"),
    )

    # 3. 初始化嵌入模型（使用本地模型）
    embed_model = resolve_embed_model("local:BAAI/bge-small-en-v1.5")

    # 4. 配置服务上下文
    service_context = ServiceContext.from_defaults(
        llm=llm,
        embed_model=embed_model,
        chunk_size=512,
    )

    # 5. 创建图存储（内存）
    graph_store = SimpleGraphStore()
    storage_context = StorageContext.from_defaults(graph_store=graph_store)

    # 6. 加载文档
    print("\n正在加载文档...")
    documents = SimpleDirectoryReader("./data").load_data()
    print(f"已加载 {len(documents)} 个文档")

    # 7. 构建知识图谱索引
    print("\n正在构建知识图谱...")
    index = KnowledgeGraphIndex.from_documents(
        documents,
        max_triplets_per_chunk=2,  # 每个文档块提取的三元组数量
        storage_context=storage_context,
        service_context=service_context,
        include_embeddings=True,
    )
    print("知识图谱构建完成！")

    # 8. 保存索引（可选）
    index.storage_context.persist(persist_dir="./storage")
    print("索引已保存到 ./storage")

    # 9. 查询
    print("\n开始查询...")
    query_engine = index.as_query_engine(
        include_text=True,  # 包含原始文本
        response_mode="tree_summarize",  # 使用树形摘要模式
    )

    # 示例查询
    queries = [
        "文档的主要主题是什么？",
        "有哪些关键实体和概念？",
        "它们之间有什么关系？"
    ]

    for query in queries:
        print(f"\n问题: {query}")
        response = query_engine.query(query)
        print(f"回答: {response}")
        print("-" * 80)

    # 10. 可视化图谱（可选）
    print("\n生成图谱可视化...")
    g = index.get_networkx_graph()
    print(f"图谱包含 {g.number_of_nodes()} 个节点和 {g.number_of_edges()} 条边")

    # 保存图谱为 GraphML 格式（可用 Gephi 等工具打开）
    import networkx as nx
    nx.write_graphml(g, "./storage/knowledge_graph.graphml")
    print("图谱已保存到 ./storage/knowledge_graph.graphml")

if __name__ == "__main__":
    main()
