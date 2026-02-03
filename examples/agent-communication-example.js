/**
 * Agent 通信协议示例
 *
 * 演示多代理系统中 Agent 之间的消息传递与协作机制
 */

const EventEmitter = require('events');
const crypto = require('crypto');

/**
 * Agent 消息总线
 * 负责 Agent 间的消息路由与传递
 */
class AgentMessageBus extends EventEmitter {
  constructor() {
    super();
    this.agents = new Map();
    this.messageLog = [];
  }

  /**
   * 注册 Agent
   */
  registerAgent(agent) {
    this.agents.set(agent.name, agent);
    console.log(`[MessageBus] Agent 已注册: ${agent.name}`);
  }

  /**
   * 发送消息
   */
  sendMessage(message) {
    // 记录消息
    this.messageLog.push({
      ...message,
      logged_at: new Date().toISOString()
    });

    // 路由到目标 Agent
    const targetAgent = this.agents.get(message.to_agent);
    if (targetAgent) {
      this.emit(`message:${message.to_agent}`, message);
    } else {
      console.error(`[MessageBus] 目标 Agent 不存在: ${message.to_agent}`);
    }
  }

  /**
   * 获取消息历史
   */
  getMessageLog() {
    return this.messageLog;
  }
}

/**
 * 基础 Agent 类
 */
class BaseAgent {
  constructor(name, messageBus) {
    this.name = name;
    this.messageBus = messageBus;
    this.status = 'idle'; // idle, busy, error

    // 注册到消息总线
    messageBus.registerAgent(this);

    // 监听发送给自己的消息
    messageBus.on(`message:${this.name}`, (message) => {
      this.handleMessage(message);
    });
  }

  /**
   * 发送消息给其他 Agent
   */
  sendMessage(toAgent, messageType, payload, requiresResponse = false) {
    const message = {
      message_id: this._generateMessageId(),
      from_agent: this.name,
      to_agent: toAgent,
      message_type: messageType,
      timestamp: new Date().toISOString(),
      payload: payload,
      requires_response: requiresResponse,
      priority: 'normal'
    };

    console.log(`[${this.name}] 发送消息到 ${toAgent}: ${messageType}`);
    this.messageBus.sendMessage(message);
  }

  /**
   * 处理接收到的消息
   */
  handleMessage(message) {
    console.log(`[${this.name}] 收到消息: ${message.message_type} (from ${message.from_agent})`);
    // 子类需要实现具体逻辑
  }

  /**
   * 生成消息 ID
   */
  _generateMessageId() {
    return `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  }
}

/**
 * Planner Agent - 任务规划者
 */
class PlannerAgent extends BaseAgent {
  constructor(messageBus) {
    super('Planner', messageBus);
  }

  /**
   * 开始任务规划
   */
  startTask(userRequest) {
    console.log(`\n[Planner] 开始处理用户请求: ${userRequest.task}\n`);

    // 任务分解
    const subtasks = this._decomposeTask(userRequest);

    // 发送第一个子任务给 Research Agent
    this.sendMessage(
      'Research',
      'task_assignment',
      {
        task_id: subtasks[0].id,
        action: subtasks[0].action,
        params: subtasks[0].params
      },
      true
    );
  }

  /**
   * 任务分解
   */
  _decomposeTask(request) {
    return [
      {
        id: 'task_001',
        agent: 'Research',
        action: 'fetch_patents',
        params: {
          ipc: request.ipc,
          date_range: request.date_range
        }
      },
      {
        id: 'task_002',
        agent: 'Analysis',
        action: 'cluster_patents',
        depends_on: ['task_001']
      },
      {
        id: 'task_003',
        agent: 'Reviewer',
        action: 'review_results',
        depends_on: ['task_002']
      }
    ];
  }

  handleMessage(message) {
    super.handleMessage(message);

    if (message.message_type === 'task_complete') {
      console.log(`[Planner] 任务 ${message.payload.task_id} 已完成`);
      // 触发下一个子任务
    }
  }
}

/**
 * Research Agent - 数据研究者
 */
class ResearchAgent extends BaseAgent {
  constructor(messageBus) {
    super('Research', messageBus);
  }

  handleMessage(message) {
    super.handleMessage(message);

    if (message.message_type === 'task_assignment') {
      this.status = 'busy';
      this._executeTask(message.payload).then(result => {
        this.status = 'idle';

        // 发送结果给 Analysis Agent
        this.sendMessage(
          'Analysis',
          'data_ready',
          {
            task_id: message.payload.task_id,
            dataset: result
          },
          true
        );
      });
    }
  }

  /**
   * 执行数据获取任务
   */
  async _executeTask(taskParams) {
    console.log(`[Research] 正在获取数据: ${taskParams.action}`);

    // 模拟 MCP 数据获取
    await this._simulateDelay(1000);

    return {
      dataset_id: 'ds_20260121_001',
      records: 1245,
      fields: ['patent_id', 'title', 'abstract', 'ipc'],
      source: 'patent_mcp'
    };
  }

  _simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Analysis Agent - 数据分析者
 */
class AnalysisAgent extends BaseAgent {
  constructor(messageBus) {
    super('Analysis', messageBus);
  }

  handleMessage(message) {
    super.handleMessage(message);

    if (message.message_type === 'data_ready') {
      this.status = 'busy';
      this._analyzeData(message.payload).then(result => {
        this.status = 'idle';

        // 发送分析结果给 Reviewer
        this.sendMessage(
          'Reviewer',
          'analysis_complete',
          {
            task_id: message.payload.task_id,
            analysis_results: result,
            confidence: 0.87
          },
          true
        );
      });
    } else if (message.message_type === 'review_feedback') {
      // 处理 Reviewer 的反馈
      if (message.payload.status === 'requires_revision') {
        console.log(`[Analysis] 收到审查反馈，需要修正：${message.payload.notes.join(', ')}`);
        // 重新分析...
      }
    }
  }

  /**
   * 执行数据分析
   */
  async _analyzeData(data) {
    console.log(`[Analysis] 正在分析数据集: ${data.dataset.dataset_id}`);

    // 模拟调用 Skills
    await this._simulateDelay(1500);

    return {
      clusters: [
        {
          cluster_id: 'C01',
          label: '神经网络硬件加速',
          size: 421,
          growth_rate: 0.34
        },
        {
          cluster_id: 'C02',
          label: '光子计算芯片',
          size: 156,
          growth_rate: 0.78
        }
      ],
      method: 'hierarchical_clustering',
      silhouette_score: 0.72
    };
  }

  _simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Reviewer Agent - 质量审查者
 */
class ReviewerAgent extends BaseAgent {
  constructor(messageBus) {
    super('Reviewer', messageBus);
  }

  handleMessage(message) {
    super.handleMessage(message);

    if (message.message_type === 'analysis_complete') {
      this._reviewAnalysis(message.payload).then(review => {
        if (review.status === 'approved') {
          // 发送给 Writer Agent
          this.sendMessage(
            'Writer',
            'write_report',
            {
              task_id: message.payload.task_id,
              approved_results: message.payload.analysis_results,
              review_notes: review.notes
            },
            false
          );
        } else {
          // 要求重新分析
          this.sendMessage(
            'Analysis',
            'review_feedback',
            {
              status: 'requires_revision',
              notes: review.notes,
              recommendations: review.recommendations
            },
            true
          );
        }
      });
    }
  }

  /**
   * 审查分析结果
   */
  async _reviewAnalysis(payload) {
    console.log(`[Reviewer] 正在审查分析结果...`);

    await this._simulateDelay(800);

    const { analysis_results, confidence } = payload;

    // 简单的审查逻辑
    if (confidence > 0.8 && analysis_results.silhouette_score > 0.7) {
      return {
        status: 'approved',
        confidence_assessment: confidence,
        notes: ['聚类质量良好', '结论可信度高']
      };
    } else {
      return {
        status: 'requires_revision',
        notes: ['聚类 C02 样本量偏小'],
        recommendations: ['扩大时间范围以增加样本']
      };
    }
  }

  _simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Writer Agent - 报告撰写者
 */
class WriterAgent extends BaseAgent {
  constructor(messageBus) {
    super('Writer', messageBus);
  }

  handleMessage(message) {
    super.handleMessage(message);

    if (message.message_type === 'write_report') {
      this._generateReport(message.payload).then(report => {
        console.log(`\n[Writer] 报告生成完成！`);
        console.log(`报告标题: ${report.title}`);
        console.log(`输出路径: ${report.output_path}\n`);

        // 通知 Planner 任务完成
        this.sendMessage(
          'Planner',
          'task_complete',
          {
            task_id: message.payload.task_id,
            report: report
          },
          false
        );
      });
    }
  }

  /**
   * 生成报告
   */
  async _generateReport(data) {
    console.log(`[Writer] 正在生成政策简报...`);

    await this._simulateDelay(1200);

    return {
      document_id: 'doc_20260121_001',
      title: '人工智能芯片专利趋势分析与政策建议',
      format: 'policy_brief',
      sections: [
        '执行摘要',
        '关键发现',
        '技术趋势',
        '政策建议'
      ],
      output_path: './output/reports/doc_20260121_001.pdf',
      created_at: new Date().toISOString()
    };
  }

  _simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 主程序 - 演示多代理协作
 */
async function main() {
  console.log('=== 专利分析多代理系统 - 协作示例 ===\n');

  // 创建消息总线
  const messageBus = new AgentMessageBus();

  // 创建各个 Agent
  const planner = new PlannerAgent(messageBus);
  const research = new ResearchAgent(messageBus);
  const analysis = new AnalysisAgent(messageBus);
  const reviewer = new ReviewerAgent(messageBus);
  const writer = new WriterAgent(messageBus);

  // 模拟用户请求
  const userRequest = {
    task: '分析 2020-2025 年人工智能芯片专利趋势',
    ipc: ['G06N3', 'H01L'],
    date_range: '2020-2025',
    output_format: 'policy_brief'
  };

  // 启动任务
  planner.startTask(userRequest);

  // 等待任务完成（实际应用中使用事件或 Promise）
  await new Promise(resolve => setTimeout(resolve, 6000));

  // 显示消息历史
  console.log('\n=== 消息历史记录 ===');
  messageBus.getMessageLog().forEach((msg, index) => {
    console.log(`${index + 1}. [${msg.timestamp}] ${msg.from_agent} → ${msg.to_agent}: ${msg.message_type}`);
  });

  console.log('\n=== 任务完成 ===\n');
}

// 运行示例
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  AgentMessageBus,
  BaseAgent,
  PlannerAgent,
  ResearchAgent,
  AnalysisAgent,
  ReviewerAgent,
  WriterAgent
};
