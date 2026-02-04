"""
GraphRAG 演示 - 无需 LLM API Key
使用预定义的三元组展示图谱功能
"""
import networkx as nx
import matplotlib
matplotlib.use('Agg')  # 使用非交互式后端
import matplotlib.pyplot as plt

def create_demo_graph():
    """创建演示知识图谱"""
    G = nx.DiGraph()

    # 添加实体和关系（三元组格式）
    triplets = [
        # MCP 相关
        ("MCP", "是", "标准化协议"),
        ("MCP", "用于", "访问外部资源"),
        ("MCP", "解耦", "模型推理"),
        ("MCP", "提供", "标准化接口"),

        # Skills 相关
        ("Skills", "是", "技能模块"),
        ("Skills", "包括", "Atomic Skill"),
        ("Skills", "包括", "Composite Skill"),
        ("Atomic Skill", "提供", "单一功能"),
        ("Composite Skill", "组合", "多个Skill"),
        ("Skills", "提供", "可重用能力"),

        # Cowork 相关
        ("Cowork", "是", "协作机制"),
        ("Cowork", "包括", "Planner Agent"),
        ("Cowork", "包括", "Research Agent"),
        ("Cowork", "包括", "Analysis Agent"),
        ("Cowork", "包括", "Reviewer Agent"),
        ("Cowork", "包括", "Writer Agent"),
        ("Planner Agent", "负责", "任务拆解"),
        ("Research Agent", "负责", "数据搜集"),
        ("Analysis Agent", "负责", "模型推论"),
        ("Reviewer Agent", "负责", "品质控管"),
        ("Writer Agent", "负责", "结构化输出"),
        ("Cowork", "实现", "智慧协作"),

        # 系统关系
        ("MCP", "配合", "Skills"),
        ("Skills", "配合", "Cowork"),
        ("企业级AI架构", "包含", "MCP"),
        ("企业级AI架构", "包含", "Skills"),
        ("企业级AI架构", "包含", "Cowork"),
        ("企业级AI架构", "实现", "可扩展系统"),
        ("企业级AI架构", "实现", "可治理系统"),
    ]

    # 添加边到图
    for subject, relation, obj in triplets:
        G.add_edge(subject, obj, relation=relation)

    return G

def analyze_graph(G):
    """分析图谱统计信息"""
    print("\n" + "=" * 60)
    print("知识图谱统计")
    print("=" * 60)
    print(f"节点数量: {G.number_of_nodes()}")
    print(f"边数量: {G.number_of_edges()}")

    print("\n节点列表:")
    for node in sorted(G.nodes()):
        print(f"  - {node}")

    print("\n关系类型:")
    relations = set(nx.get_edge_attributes(G, 'relation').values())
    for relation in sorted(relations):
        print(f"  - {relation}")

def find_paths(G, start, end):
    """查找两个节点间的路径"""
    print(f"\n从 '{start}' 到 '{end}' 的路径:")
    try:
        paths = list(nx.all_simple_paths(G, start, end, cutoff=3))
        if paths:
            for i, path in enumerate(paths[:3], 1):  # 只显示前3条路径
                print(f"\n路径 {i}:")
                for j in range(len(path) - 1):
                    edge_data = G.get_edge_data(path[j], path[j+1])
                    relation = edge_data.get('relation', '?')
                    print(f"  {path[j]} --[{relation}]--> {path[j+1]}")
        else:
            print("  未找到路径")
    except nx.NetworkXNoPath:
        print("  未找到路径")

def get_neighbors(G, node):
    """获取节点的邻居"""
    print(f"\n'{node}' 的相关实体:")

    # 出边（这个实体指向的）
    out_edges = G.out_edges(node, data=True)
    if out_edges:
        print("\n  直接关系:")
        for _, target, data in out_edges:
            relation = data.get('relation', '?')
            print(f"    --[{relation}]--> {target}")

    # 入边（指向这个实体的）
    in_edges = G.in_edges(node, data=True)
    if in_edges:
        print("\n  被引用关系:")
        for source, _, data in in_edges:
            relation = data.get('relation', '?')
            print(f"    {source} --[{relation}]-->")

def visualize_graph(G):
    """可视化图谱"""
    print("\n正在生成图谱可视化...")

    plt.figure(figsize=(20, 14))

    # 使用 spring 布局
    pos = nx.spring_layout(G, k=2, iterations=50)

    # 绘制节点
    nx.draw_networkx_nodes(G, pos,
                          node_color='lightblue',
                          node_size=3000,
                          alpha=0.9)

    # 绘制边
    nx.draw_networkx_edges(G, pos,
                          edge_color='gray',
                          arrows=True,
                          arrowsize=20,
                          arrowstyle='->',
                          connectionstyle='arc3,rad=0.1')

    # 绘制标签
    nx.draw_networkx_labels(G, pos,
                           font_size=8,
                           font_weight='bold')

    # 绘制边标签
    edge_labels = nx.get_edge_attributes(G, 'relation')
    nx.draw_networkx_edge_labels(G, pos,
                                 edge_labels=edge_labels,
                                 font_size=6,
                                 font_color='red')

    plt.title("AI Agents 企业级架构知识图谱", fontsize=16, fontweight='bold')
    plt.axis('off')
    plt.tight_layout()

    # 保存图片
    output_file = "knowledge_graph_demo.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"图谱已保存到: {output_file}")

    # 保存 GraphML 格式
    nx.write_graphml(G, "knowledge_graph_demo.graphml")
    print("图谱数据已保存到: knowledge_graph_demo.graphml")

def main():
    """主函数"""
    print("\n" + "=" * 60)
    print("GraphRAG 演示 - 知识图谱分析")
    print("=" * 60)

    # 创建图谱
    G = create_demo_graph()

    # 基础统计
    analyze_graph(G)

    # 查看特定实体
    get_neighbors(G, "MCP")
    get_neighbors(G, "Skills")
    get_neighbors(G, "Cowork")

    # 路径查询
    find_paths(G, "MCP", "企业级AI架构")
    find_paths(G, "Skills", "可扩展系统")

    # 可视化
    visualize_graph(G)

    print("\n" + "=" * 60)
    print("演示完成！")
    print("=" * 60)

if __name__ == "__main__":
    main()
