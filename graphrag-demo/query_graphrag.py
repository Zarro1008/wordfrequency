"""
从已保存的索引加载并查询 GraphRAG
"""
import os
from llama_index.core import (
    load_index_from_storage,
    StorageContext,
    ServiceContext,
)
from llama_index.llms.anthropic import Anthropic
from llama_index.core.embeddings import resolve_embed_model

def main():
    # 检查 API Key
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("请设置环境变量 ANTHROPIC_API_KEY")
        return

    # 初始化服务
    llm = Anthropic(
        model="claude-3-5-sonnet-20241022",
        api_key=os.getenv("ANTHROPIC_API_KEY"),
    )
    embed_model = resolve_embed_model("local:BAAI/bge-small-en-v1.5")
    service_context = ServiceContext.from_defaults(llm=llm, embed_model=embed_model)

    # 从存储加载索引
    print("正在加载索引...")
    storage_context = StorageContext.from_defaults(persist_dir="./storage")
    index = load_index_from_storage(
        storage_context=storage_context,
        service_context=service_context,
    )
    print("索引加载完成！")

    # 创建查询引擎
    query_engine = index.as_query_engine(
        include_text=True,
        response_mode="tree_summarize",
        verbose=True,  # 显示详细信息
    )

    # 交互式查询
    print("\n=== GraphRAG 交互式查询 ===")
    print("输入 'quit' 退出\n")

    while True:
        query = input("您的问题: ").strip()
        if query.lower() in ['quit', 'exit', 'q']:
            break

        if not query:
            continue

        try:
            response = query_engine.query(query)
            print(f"\n回答: {response}\n")
            print("-" * 80)
        except Exception as e:
            print(f"错误: {e}\n")

if __name__ == "__main__":
    main()
