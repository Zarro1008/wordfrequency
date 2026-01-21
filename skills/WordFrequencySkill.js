/**
 * WordFrequencySkill - 词频与共现分析技能
 *
 * 基于现有 WordFreq.js 模块封装为标准 Skill 接口
 * 用于专利/论文文本分析，生成词云和共现网络
 */

const wf = require('../WordFreq');

class WordFrequencySkill {
  constructor() {
    this.name = 'WordFrequencySkill';
    this.version = '1.0.0';
    this.description = '词频统计与双词共现分析';
  }

  /**
   * 执行单词频率分析
   * @param {Object} input - 输入参数
   * @param {Array<string>} input.texts - 待分析文本数组（专利摘要、论文标题等）
   * @param {string} input.mode - 分析模式：'single_word' | 'two_word_cooccurrence'
   * @param {number} input.top_n - 返回前 N 个高频词
   * @param {Array<string>} input.stopwords - 停用词列表（可选）
   * @returns {Object} 分析结果
   */
  async execute(input) {
    try {
      // 参数验证
      this._validateInput(input);

      const { texts, mode, top_n = 50, stopwords = [] } = input;

      // 合并所有文本
      const combinedText = texts.join('\n');

      let result;

      if (mode === 'single_word') {
        result = this._analyzeSingleWord(combinedText, top_n, stopwords);
      } else if (mode === 'two_word_cooccurrence') {
        result = this._analyzeTwoWordCooccurrence(combinedText, top_n, stopwords);
      } else {
        throw new Error(`不支持的分析模式: ${mode}`);
      }

      return {
        success: true,
        skill_name: this.name,
        timestamp: new Date().toISOString(),
        input_summary: {
          total_texts: texts.length,
          mode: mode,
          top_n: top_n
        },
        result: result
      };

    } catch (error) {
      return {
        success: false,
        skill_name: this.name,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * 单词频率分析
   * @private
   */
  _analyzeSingleWord(text, top_n, stopwords) {
    // 使用 WordFreq 模块的单词计数功能
    const wordCounts = wf.getwordcount(text);

    // 过滤停用词
    const filtered = this._filterStopwords(wordCounts, stopwords);

    // 排序并取前 N 个
    const sorted = Object.entries(filtered)
      .sort((a, b) => b[1] - a[1])
      .slice(0, top_n);

    return {
      word_frequencies: sorted.map(([word, frequency]) => ({
        word: word,
        frequency: frequency,
        normalized_score: frequency / sorted[0][1] // 归一化到 0-1
      })),
      total_unique_words: Object.keys(filtered).length,
      visualization_type: 'word_cloud'
    };
  }

  /**
   * 双词共现分析
   * @private
   */
  _analyzeTwoWordCooccurrence(text, top_n, stopwords) {
    // 使用 WordFreq 模块的双词共现功能
    const cooccurrences = wf.get2wordcount(text);

    // 构建网络边列表
    const edges = cooccurrences
      .map(item => {
        const [word1, word2] = item.key.split('\t');
        return {
          source: word1,
          target: word2,
          weight: item.value,
          normalized_weight: 0 // 稍后归一化
        };
      })
      .filter(edge =>
        !stopwords.includes(edge.source) &&
        !stopwords.includes(edge.target)
      )
      .sort((a, b) => b.weight - a.weight)
      .slice(0, top_n);

    // 归一化权重
    const maxWeight = edges[0]?.weight || 1;
    edges.forEach(edge => {
      edge.normalized_weight = edge.weight / maxWeight;
    });

    // 提取节点
    const nodes = new Set();
    edges.forEach(edge => {
      nodes.add(edge.source);
      nodes.add(edge.target);
    });

    return {
      cooccurrence_network: {
        nodes: Array.from(nodes).map(word => ({
          id: word,
          label: word
        })),
        edges: edges
      },
      total_cooccurrences: cooccurrences.length,
      visualization_type: 'network_graph'
    };
  }

  /**
   * 过滤停用词
   * @private
   */
  _filterStopwords(wordCounts, stopwords) {
    if (stopwords.length === 0) return wordCounts;

    const filtered = {};
    for (const [word, count] of Object.entries(wordCounts)) {
      if (!stopwords.includes(word.toLowerCase())) {
        filtered[word] = count;
      }
    }
    return filtered;
  }

  /**
   * 输入验证
   * @private
   */
  _validateInput(input) {
    if (!input.texts || !Array.isArray(input.texts)) {
      throw new Error('输入参数 texts 必须是数组');
    }

    if (input.texts.length === 0) {
      throw new Error('texts 数组不能为空');
    }

    if (!input.mode || !['single_word', 'two_word_cooccurrence'].includes(input.mode)) {
      throw new Error('mode 必须是 single_word 或 two_word_cooccurrence');
    }
  }

  /**
   * 获取 Skill 元数据
   */
  getMetadata() {
    return {
      name: this.name,
      version: this.version,
      description: this.description,
      input_schema: {
        texts: 'Array<string> - 待分析文本',
        mode: 'string - single_word | two_word_cooccurrence',
        top_n: 'number - 返回前 N 个结果（默认 50）',
        stopwords: 'Array<string> - 停用词列表（可选）'
      },
      output_schema: {
        success: 'boolean',
        result: 'object - 分析结果',
        timestamp: 'string - ISO 时间戳'
      },
      use_cases: [
        '专利技术关键词提取',
        '学术论文主题分析',
        '技术共现网络构建',
        '词云可视化生成'
      ]
    };
  }
}

// 导出 Skill 实例
module.exports = new WordFrequencySkill();

// 使用示例
if (require.main === module) {
  const skill = new WordFrequencySkill();

  // 示例 1：单词频率分析
  const example1 = {
    texts: [
      'artificial intelligence machine learning deep learning neural network',
      'machine learning algorithm neural network training',
      'deep learning convolutional neural network image recognition'
    ],
    mode: 'single_word',
    top_n: 10
  };

  skill.execute(example1).then(result => {
    console.log('单词频率分析结果：');
    console.log(JSON.stringify(result, null, 2));
  });

  // 示例 2：双词共现分析
  const example2 = {
    texts: [
      'artificial intelligence enables machine learning',
      'machine learning drives deep learning',
      'deep learning uses neural networks'
    ],
    mode: 'two_word_cooccurrence',
    top_n: 15
  };

  skill.execute(example2).then(result => {
    console.log('\n双词共现分析结果：');
    console.log(JSON.stringify(result, null, 2));
  });
}
