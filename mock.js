/* 拾光AI：本地记忆数据层。所有页面共用这一份真实、可持久化的数据。 */
(function () {
  const STORAGE_KEY = 'shiguang-ai-memory-v2';
  const DAY = 86400000;
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const atDay = (offset, hour = 9, minute = 0) => {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.getTime() + offset * DAY;
  };

  const defaultSettings = {
    name: '我的朋友',
    avatar: '',
    model: 'openai/gpt-4o-mini',
    apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: '',
    aiEnabled: false,
    autoOrganize: true,
    reduceMotion: false,
    reminder: true,
    theme: 'light',
    lastReviewAt: 0
  };

  function seedData() {
    const rows = [
      ['英语精听的一点突破', '今天把一段 3 分钟的英语播客反复听了五遍。前两遍只能抓住零星单词，第三遍开始听出连读，最后终于不用字幕也能复述大意。原来“听不懂”不是天赋问题，只是还没有给耳朵足够多次的样本。', 'text', 0, ['学习', '英语'], '有收获', '手动记录'],
      ['拾光产品闭环梳理', '把产品从“什么都能聊”收敛成一条真正可用的闭环：随手记录、自动归档、随时找回、每周复盘。下一步要验证的是，用户能否在三十秒内找回一条旧记忆。', 'text', 0, ['工作', '产品'], '专注', '手动记录'],
      ['晨跑三公里', '沿河跑了三公里，速度不快，但没有停下来。风有点凉，跑到第二公里时脑子反而清醒了。下周继续保持三次，不追求配速。', 'text', -1, ['生活', '运动'], '轻松', '手动记录'],
      ['《认知觉醒》读书笔记', '真正的成长不是不断收藏方法，而是让行动发生在舒适区边缘。今天最有共鸣的一句：清晰力才是行动力。准备把下周目标缩减为一件最重要的事。', 'document', -2, ['阅读', '学习'], '平静', '文档整理'],
      ['周末看展路线', '城市美术馆的“时间的形状”展览，周六下午三点入场。想重点看摄影单元，结束后沿河走回家。展览链接：https://example.com/time-exhibition', 'link', -3, ['生活', '灵感'], '期待', '链接收藏'],
      ['给妈妈打电话', '电话里她一直在说楼下桂花开了，还问我有没有好好吃饭。以前总觉得这些话题很琐碎，现在觉得，能记住这些琐碎本身就是一种幸福。', 'text', -4, ['家人', '生活'], '温暖', '手动记录'],
      ['本周学习小结', '完成了两次英语精听和一章产品设计课程。最大的进步不是学了多少，而是开始留下可回看的笔记。下周继续每天二十五分钟，不再临时加任务。', 'text', -6, ['学习', '复盘'], '充实', '周复盘'],
      ['一个关于记忆的灵感', '记忆不应该只是按时间排列的仓库。未来当我问“那段低谷是怎么走过来的”，它应该能把零散的记录重新连成一条路。', 'text', -8, ['灵感', '产品'], '兴奋', '灵感速记'],
      ['项目评审后的反思', '评审时我急着解释方案，漏掉了对方真正的担忧。下次先复述问题，再回答。把“被理解”放在“说服别人”之前。', 'document', -11, ['工作', '复盘'], '反思', '会议记录'],
      ['新买的绿植', '给书桌添了一盆龟背竹。浇水、擦叶子的时候，注意力终于从屏幕上移开了一会儿。希望它和这个记忆库一起慢慢长大。', 'text', -15, ['生活', '日常'], '愉快', '手动记录']
    ];
    const records = rows.map((row, index) => ({
      id: `sample-${index + 1}`,
      title: row[0], content: row[1], type: row[2], occurredAt: atDay(row[3], 8 + (index % 10)),
      createdAt: atDay(row[3], 8 + (index % 10)), updatedAt: atDay(row[3], 8 + (index % 10)),
      tags: row[4], mood: row[5], source: row[6], pinned: index === 0 || index === 7,
      attachments: [], isSample: true
    }));
    return { version: 2, records, reviews: [], chats: [], settings: clone(defaultSettings), createdAt: Date.now() };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return seedData();
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.records)) throw new Error('数据格式不完整');
      return {
        ...seedData(), ...parsed,
        records: parsed.records,
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
        chats: Array.isArray(parsed.chats) ? parsed.chats : [],
        settings: { ...defaultSettings, ...(parsed.settings || {}) }
      };
    } catch (error) {
      console.error('读取本地记忆失败，已载入安全示例数据', error);
      return seedData();
    }
  }

  let db = load();
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      window.dispatchEvent(new CustomEvent('shiguang:change'));
    } catch (error) {
      console.error('保存本地记忆失败', error);
      throw new Error('浏览器本地存储空间不足。请删除较大的附件，或先导出备份后清理数据。');
    }
  }
  function normalizeRecord(input, existing) {
    const now = Date.now();
    const content = String(input.content || '').trim();
    const title = String(input.title || '').trim() || content.split('\n')[0].slice(0, 42) || '未命名记忆';
    const occurredAt = Number(input.occurredAt) || existing?.occurredAt || now;
    return {
      id: existing?.id || input.id || uid('memory'),
      title, content,
      type: ['text', 'image', 'audio', 'video', 'link', 'document'].includes(input.type) ? input.type : (existing?.type || 'text'),
      occurredAt,
      createdAt: existing?.createdAt || Number(input.createdAt) || now,
      updatedAt: now,
      tags: Array.isArray(input.tags) ? [...new Set(input.tags.map(v => String(v).trim()).filter(Boolean))].slice(0, 8) : [],
      mood: String(input.mood || '平静'),
      source: String(input.source || '手动记录'),
      pinned: typeof input.pinned === 'boolean' ? input.pinned : Boolean(existing?.pinned),
      attachments: Array.isArray(input.attachments) ? input.attachments : (existing?.attachments || []),
      isSample: Boolean(existing?.isSample && input.isSample !== false)
    };
  }
  function startOfWeek(offset = 0) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const day = date.getDay() || 7;
    date.setDate(date.getDate() - day + 1 + offset * 7);
    return date.getTime();
  }
  function topCounts(items, key) {
    const counts = {};
    items.forEach(item => {
      const values = key === 'tags' ? item.tags : [item[key]];
      values.filter(Boolean).forEach(value => { counts[value] = (counts[value] || 0) + 1; });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }
  // 本地标签词表：无需联网，用关键词命中给正文推荐标签。
  const TAG_RULES = [
    { tag: '学习', keywords: ['背单词', '复习', '课程', '笔记', '考试', '精听', '练习', '学习'] },
    { tag: '英语', keywords: ['英语', '单词', '听力', '口语', '播客', 'podcast'] },
    { tag: '工作', keywords: ['会议', '项目', '方案', '评审', '同事', '客户', '汇报', '加班', '需求'] },
    { tag: '阅读', keywords: ['读书', '看书', '书里', '读到', '章节', '作者'] },
    { tag: '运动', keywords: ['跑步', '健身', '游泳', '瑜伽', '拉伸', '公里', '球'] },
    { tag: '家人', keywords: ['妈妈', '爸爸', '父母', '家里', '奶奶', '爷爷', '孩子'] },
    { tag: '灵感', keywords: ['灵感', '突然想到', '点子', '想法', '创意'] },
    { tag: '复盘', keywords: ['复盘', '反思', '总结', '回顾', '改进'] },
    { tag: '生活', keywords: ['散步', '做饭', '早餐', '午饭', '晚饭', '购物', '打扫', '天气', '咖啡'] }
  ];
  function textBigrams(value) {
    const clean = String(value || '').toLowerCase().replace(/[\s，。、！？：；“”‘’（）《》…—\-,.!?;:'"()[\]/]/g, '');
    const set = new Set();
    for (let i = 0; i < clean.length - 1; i += 1) set.add(clean.slice(i, i + 2));
    return set;
  }
  function similarityOf(a, b) {
    if (!a.size || !b.size) return 0;
    let overlap = 0;
    a.forEach(pair => { if (b.has(pair)) overlap += 1; });
    return overlap / Math.sqrt(a.size * b.size);
  }

  const MemoryStore = {
    key: STORAGE_KEY,
    all() { return clone(db); },
    settings() { return clone(db.settings); },
    listRecords(filters = {}) {
      const query = String(filters.query || '').trim().toLowerCase();
      return db.records.filter(record => {
        const haystack = `${record.title}\n${record.content}\n${record.tags.join(' ')}`.toLowerCase();
        return (!query || haystack.includes(query)) &&
          (!filters.type || record.type === filters.type) &&
          (!filters.tag || record.tags.includes(filters.tag)) &&
          (!filters.mood || record.mood === filters.mood) &&
          (!filters.pinned || record.pinned) &&
          (!filters.from || record.occurredAt >= Number(filters.from)) &&
          (!filters.to || record.occurredAt <= Number(filters.to));
      }).sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.occurredAt - a.occurredAt);
    },
    getRecord(id) { const found = db.records.find(item => item.id === id); return found ? clone(found) : null; },
    createRecord(input) {
      const record = normalizeRecord({ ...input, isSample: false });
      db.records.unshift(record); persist(); return clone(record);
    },
    updateRecord(id, patch) {
      const index = db.records.findIndex(item => item.id === id);
      if (index < 0) throw new Error('没有找到这条记忆，可能已被删除。');
      db.records[index] = normalizeRecord({ ...db.records[index], ...patch }, db.records[index]);
      persist(); return clone(db.records[index]);
    },
    deleteRecord(id) { db.records = db.records.filter(item => item.id !== id); persist(); },
    togglePin(id) {
      const record = db.records.find(item => item.id === id);
      if (!record) return null;
      record.pinned = !record.pinned; record.updatedAt = Date.now(); persist(); return clone(record);
    },
    relatedRecords(id, limit = 3) {
      const target = db.records.find(item => item.id === id);
      if (!target) return [];
      const targetPairs = textBigrams(`${target.title}${target.content}`);
      const scored = db.records.filter(item => item.id !== id).map(item => {
        const sharedTags = item.tags.filter(tag => target.tags.includes(tag));
        const similarity = similarityOf(targetPairs, textBigrams(`${item.title}${item.content}`));
        let score = sharedTags.length * 5 + similarity * 8;
        if (item.mood === target.mood) score += 1.5;
        if (item.type === target.type) score += 0.5;
        if (Math.abs(item.occurredAt - target.occurredAt) <= 30 * DAY) score += 1;
        return { record: item, score, sharedTags };
      }).filter(entry => entry.score >= 2).sort((a, b) => b.score - a.score || b.record.occurredAt - a.record.occurredAt);
      return scored.slice(0, limit).map(entry => ({ ...clone(entry.record), sharedTags: entry.sharedTags }));
    },
    years() {
      return [...new Set(db.records.map(item => new Date(item.occurredAt).getFullYear()))].sort((a, b) => b - a);
    },
    annual(year) {
      const target = Number(year) || new Date().getFullYear();
      const records = db.records.filter(item => new Date(item.occurredAt).getFullYear() === target).sort((a, b) => a.occurredAt - b.occurredAt);
      const months = Array.from({ length: 12 }, (_, index) => ({ month: index + 1, count: records.filter(item => new Date(item.occurredAt).getMonth() === index).length }));
      const activeDays = [...new Set(records.map(item => new Date(item.occurredAt).toDateString()))]
        .map(day => new Date(day).setHours(0, 0, 0, 0)).sort((a, b) => a - b);
      let longestStreak = 0; let streak = 0;
      activeDays.forEach((day, index) => {
        streak = index > 0 && day - activeDays[index - 1] === DAY ? streak + 1 : 1;
        longestStreak = Math.max(longestStreak, streak);
      });
      const tags = topCounts(records, 'tags');
      const moods = topCounts(records, 'mood');
      const highlights = [...records].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.tags.length - a.tags.length || String(b.content).length - String(a.content).length).slice(0, 3);
      return {
        year: target,
        total: records.length,
        activeDays: activeDays.length,
        words: records.reduce((sum, item) => sum + String(item.content || '').replace(/\s/g, '').length, 0),
        longestStreak,
        months, tags, moods, types: topCounts(records, 'type'),
        highlights: clone(highlights),
        first: records[0] ? clone(records[0]) : null,
        last: records[records.length - 1] ? clone(records[records.length - 1]) : null,
        busiestMonth: months.reduce((best, month) => month.count > best.count ? month : best, months[0]),
        topTag: tags[0] || null,
        topMood: moods[0] || null
      };
    },
    graph() {
      const nodes = db.records.map(record => ({
        id: record.id, title: record.title, type: record.type, mood: record.mood,
        tags: [...record.tags], occurredAt: record.occurredAt, degree: 0
      }));
      const pairs = new Map(nodes.map(node => [node.id, textBigrams(`${node.title}${node.tags.join('')}`)]));
      const contentPairs = new Map(db.records.map(record => [record.id, textBigrams(record.content)]));
      const links = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]; const b = nodes[j];
          const sharedTags = a.tags.filter(tag => b.tags.includes(tag));
          const similarity = Math.max(similarityOf(pairs.get(a.id), pairs.get(b.id)), similarityOf(contentPairs.get(a.id), contentPairs.get(b.id)));
          if (!sharedTags.length && similarity < 0.16) continue;
          const weight = sharedTags.length + similarity * 2;
          links.push({ source: a.id, target: b.id, weight, sharedTags, similarity });
          a.degree += 1; b.degree += 1;
        }
      }
      return { nodes: clone(nodes), links: clone(links) };
    },
    tags() { return topCounts(db.records, 'tags'); },
    suggestTags(text, exclude = [], limit = 3) {
      const source = String(text || '').toLowerCase();
      if (source.trim().length < 4) return [];
      const scores = new Map();
      topCounts(db.records, 'tags').forEach(item => {
        if (exclude.includes(item.name)) return;
        if (source.includes(String(item.name).toLowerCase())) scores.set(item.name, 3);
      });
      TAG_RULES.forEach(rule => {
        if (exclude.includes(rule.tag)) return;
        if (rule.keywords.some(word => source.includes(word))) scores.set(rule.tag, (scores.get(rule.tag) || 0) + 2);
      });
      return [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([name]) => name);
    },
    renameTag(from, to) {
      const source = String(from || '').trim();
      const target = String(to || '').trim();
      if (!source || !target || source === target) return 0;
      let affected = 0;
      db.records.forEach(record => {
        if (!record.tags.includes(source)) return;
        record.tags = [...new Set(record.tags.map(tag => tag === source ? target : tag))];
        record.updatedAt = Date.now();
        affected += 1;
      });
      if (affected) persist();
      return affected;
    },
    deleteTag(name) {
      const target = String(name || '').trim();
      if (!target) return 0;
      let affected = 0;
      db.records.forEach(record => {
        if (!record.tags.includes(target)) return;
        record.tags = record.tags.filter(tag => tag !== target);
        record.updatedAt = Date.now();
        affected += 1;
      });
      if (affected) persist();
      return affected;
    },
    moods() { return topCounts(db.records, 'mood'); },
    weekRange(offset = 0) {
      const start = startOfWeek(offset); return { start, end: start + 7 * DAY - 1 };
    },
    weekRecords(offset = 0) {
      const { start, end } = this.weekRange(offset);
      return db.records.filter(item => item.occurredAt >= start && item.occurredAt <= end)
        .sort((a, b) => a.occurredAt - b.occurredAt).map(clone);
    },
    stats() {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const { start, end } = this.weekRange(0);
      const activeDays = new Set(db.records.map(item => new Date(item.occurredAt).toDateString()));
      let streak = 0;
      for (let i = 0; i < 365; i += 1) {
        if (activeDays.has(new Date(today.getTime() - i * DAY).toDateString())) streak += 1;
        else if (i > 0 || activeDays.size) break;
      }
      const daily = Array.from({ length: 7 }, (_, i) => {
        const from = start + i * DAY; const to = from + DAY - 1;
        return { date: from, count: db.records.filter(item => item.occurredAt >= from && item.occurredAt <= to).length };
      });
      return {
        total: db.records.length,
        week: db.records.filter(item => item.occurredAt >= start && item.occurredAt <= end).length,
        attachments: db.records.reduce((sum, item) => sum + item.attachments.length, 0),
        pinned: db.records.filter(item => item.pinned).length,
        streak, daily, tags: topCounts(db.records, 'tags'), types: topCounts(db.records, 'type')
      };
    },
    insights() {
      const records = db.records;
      const now = new Date();
      const activeDays = new Set(records.map(item => new Date(item.occurredAt).toDateString()));
      const weekday = Array(7).fill(0);
      const periods = [
        { key: 'dawn', label: '凌晨', range: '0–6 点', count: 0 },
        { key: 'morning', label: '上午', range: '6–12 点', count: 0 },
        { key: 'afternoon', label: '下午', range: '12–18 点', count: 0 },
        { key: 'evening', label: '夜晚', range: '18–24 点', count: 0 }
      ];
      records.forEach(item => {
        const date = new Date(item.occurredAt);
        weekday[(date.getDay() + 6) % 7] += 1;
        const hour = date.getHours();
        periods[hour < 6 ? 0 : hour < 12 ? 1 : hour < 18 ? 2 : 3].count += 1;
      });
      const months = [];
      for (let i = 5; i >= 0; i -= 1) {
        const cursor = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const start = cursor.getTime();
        const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1).getTime() - 1;
        months.push({ label: `${cursor.getMonth() + 1} 月`, count: records.filter(item => item.occurredAt >= start && item.occurredAt <= end).length });
      }
      const firstAt = records.reduce((min, item) => Math.min(min, item.occurredAt), Date.now());
      const spanWeeks = Math.max(1, Math.ceil((Date.now() - firstAt) / (7 * DAY)));
      const tags = topCounts(records, 'tags');
      const moods = topCounts(records, 'mood');
      return {
        total: records.length,
        activeDays: activeDays.size,
        tags, moods, types: topCounts(records, 'type'),
        weekday, periods, months,
        averagePerWeek: Math.round((records.length / spanWeeks) * 10) / 10,
        topTag: tags[0] || null,
        topMood: moods[0] || null,
        busiestWeekday: weekday.indexOf(Math.max(...weekday)),
        peakPeriod: periods.reduce((best, item) => item.count > best.count ? item : best, periods[0])
      };
    },
    onThisDay(limit = 3) {
      const now = new Date();
      const sameDay = db.records.filter(item => {
        const date = new Date(item.occurredAt);
        return date.getMonth() === now.getMonth() && date.getDate() === now.getDate() && date.getFullYear() < now.getFullYear();
      }).sort((a, b) => b.occurredAt - a.occurredAt);
      if (sameDay.length) return { mode: 'same-day', items: sameDay.slice(0, limit).map(clone) };
      const past = db.records.filter(item => item.occurredAt <= Date.now() - 7 * DAY).sort((a, b) => b.occurredAt - a.occurredAt);
      if (past.length) return { mode: 'past', items: past.slice(0, limit).map(clone) };
      return { mode: 'none', items: [] };
    },
    monthCounts(year, month) {
      const start = new Date(year, month, 1).setHours(0, 0, 0, 0);
      const end = new Date(year, month + 1, 1).setHours(0, 0, 0, 0) - 1;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
      const counts = {};
      db.records.forEach(item => {
        if (item.occurredAt < start || item.occurredAt > end) return;
        const day = new Date(item.occurredAt).getDate();
        counts[day] = (counts[day] || 0) + 1;
      });
      const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
      return { year, month, start, end, daysInMonth, firstWeekday, counts, total };
    },
    retrieve(question, limit = 5) {
      const text = String(question || '').trim();
      if (!text) return this.listRecords().slice(0, limit).map(clone);
      const domainWords = [...new Set([...db.records.flatMap(r => r.tags), '英语', '学习', '工作', '生活', '阅读', '运动', '跑步', '家人', '灵感', '复盘', '情绪', '心情', '产品', '计划', '记录', '记忆', '本周', '这周'])];
      const words = domainWords.filter(word => text.toLowerCase().includes(word.toLowerCase()));
      const latin = text.toLowerCase().match(/[a-z0-9]{2,}/g) || [];
      const keywords = [...new Set([...words, ...latin])];
      const scored = db.records.map(record => {
        let score = 0;
        keywords.forEach(word => {
          if (record.tags.some(tag => tag.toLowerCase().includes(word.toLowerCase()))) score += 8;
          if (record.title.toLowerCase().includes(word.toLowerCase())) score += 5;
          if (record.content.toLowerCase().includes(word.toLowerCase())) score += 3;
        });
        if (/这周|本周|最近/.test(text) && record.occurredAt >= startOfWeek(0)) score += 2;
        if (record.pinned) score += 0.5;
        return { record, score };
      }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || b.record.occurredAt - a.record.occurredAt);
      const fallback = /这周|本周|最近/.test(text) ? this.weekRecords(0).reverse() : this.listRecords().slice(0, limit);
      return (scored.length ? scored.map(item => item.record) : fallback).slice(0, limit).map(clone);
    },
    askLocal(question) {
      const sources = this.retrieve(question, 4);
      if (!db.records.length) return { answer: '你的记忆库还是空的。先记录一件今天发生的事，再来向我提问吧。', sources: [], mode: 'local' };
      if (!sources.length) return { answer: '暂时没有在你的记忆里找到足够相关的记录。可以换一个时间、人物或标签再问我，我不会编造没有记录的内容。', sources: [], mode: 'local' };
      const lines = sources.map((record, index) => `${index + 1}. **${record.title}**（${new Date(record.occurredAt).toLocaleDateString('zh-CN')}）：${record.content.slice(0, 110)}${record.content.length > 110 ? '…' : ''}`);
      let intro = `我在你的记忆库中找到了 ${sources.length} 条相关记录：`;
      if (/心情|情绪|感受/.test(question)) {
        const moods = sources.map(item => item.mood).filter(Boolean);
        intro = `从这些记录看，你当时的主要感受是「${[...new Set(moods)].join('、') || '未标记'}」。具体线索如下：`;
      } else if (/总结|复盘|学了|学到|这周|本周/.test(question)) {
        intro = `根据你的真实记录，这段时间可以从以下 ${sources.length} 个片段来回顾：`;
      }
      return { answer: `${intro}\n\n${lines.join('\n\n')}\n\n以上回答仅依据你保存的记录生成，可点击下方来源查看原文。`, sources, mode: 'local' };
    },
    buildReview(offset = 0) {
      const records = this.weekRecords(offset);
      const { start, end } = this.weekRange(offset);
      const tags = topCounts(records, 'tags');
      const moods = topCounts(records, 'mood');
      const highlights = [...records].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.occurredAt - a.occurredAt).slice(0, 3);
      const review = {
        id: uid('review'), weekStart: start, weekEnd: end, createdAt: Date.now(),
        recordIds: records.map(item => item.id),
        summary: records.length ? `这一周你留下了 ${records.length} 条记忆，主要围绕${tags.slice(0, 3).map(item => `「${item.name}」`).join('、') || '日常片段'}展开。出现最多的感受是「${moods[0]?.name || '平静'}」。${highlights[0] ? `其中，“${highlights[0].title}”值得再次被看见。` : ''}` : '这一周还没有记录。空白并不要紧，从一件小事开始，就是下一周的起点。',
        wins: highlights.length ? highlights.map(item => `保留了「${item.title}」这一片段：${item.content.slice(0, 65)}${item.content.length > 65 ? '…' : ''}`) : ['给自己留出了重新开始的空间。'],
        challenges: records.length < 3 ? ['记录频率偏低，可以选择一个固定场景，例如睡前或通勤后，用一分钟留下当天最值得记住的一件事。'] : ['已有不少片段，下一步可以给它们补充更准确的标签，让未来检索和连接更容易。'],
        nextSteps: tags.length ? [`围绕「${tags[0].name}」再推进一个足够小的行动，并在下周记录结果。`, '挑一条本周记忆补充当时的感受，让复盘不只看见事件，也看见自己。'] : ['本周先记录一件真实发生的小事，不需要完整，也不需要漂亮。'],
        sourceMode: 'local'
      };
      return review;
    },
    saveReview(review) {
      const exists = db.reviews.findIndex(item => item.weekStart === review.weekStart);
      if (exists >= 0) db.reviews[exists] = { ...review, id: db.reviews[exists].id };
      else db.reviews.unshift(review);
      persist(); return clone(review);
    },
    listReviews() { return clone(db.reviews.sort((a, b) => b.weekStart - a.weekStart)); },
    saveChat(chat) { db.chats.unshift({ ...chat, id: uid('chat'), createdAt: Date.now() }); db.chats = db.chats.slice(0, 50); persist(); },
    chats() { return clone(db.chats); },
    clearChats() { db.chats = []; persist(); },
    attachments() {
      return db.records.flatMap(record => record.attachments.map(file => ({ ...file, recordId: record.id, recordTitle: record.title, uploadedAt: record.createdAt })));
    },
    deleteAttachment(recordId, attachmentId) {
      const record = db.records.find(item => item.id === recordId);
      if (!record) return;
      record.attachments = record.attachments.filter(item => item.id !== attachmentId);
      record.updatedAt = Date.now(); persist();
    },
    updateSettings(patch) { db.settings = { ...db.settings, ...patch }; persist(); return clone(db.settings); },
    dailyReview() {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const candidates = db.records.filter(item => item.occurredAt < today.getTime() - 7 * DAY).sort((a, b) => a.occurredAt - b.occurredAt);
      if (!candidates.length) return null;
      const seed = Number(`${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`);
      return clone(candidates[seed % candidates.length]);
    },
    reviewedToday() {
      const last = new Date(Number(db.settings.lastReviewAt) || 0);
      const now = new Date();
      return last.getFullYear() === now.getFullYear() && last.getMonth() === now.getMonth() && last.getDate() === now.getDate();
    },
    markReviewed() { db.settings.lastReviewAt = Date.now(); persist(); return clone(db.settings); },
    exportJSON() {
      const exported = clone(db);
      exported.settings.apiKey = '';
      exported.exportedAt = Date.now();
      return JSON.stringify(exported, null, 2);
    },
    exportMarkdown(records) {
      const list = records || this.listRecords();
      const lines = ['# 拾光AI · 我的记忆档案', '', `导出时间：${new Date().toLocaleString('zh-CN')}`, `共 ${list.length} 条记忆`, '', '---', ''];
      list.forEach(record => {
        lines.push(`## ${record.title}`, '', `- 时间：${new Date(record.occurredAt).toLocaleString('zh-CN')}`, `- 类型：${record.type}`, `- 心情：${record.mood}`, `- 标签：${record.tags.join('、') || '无'}`, '', record.content || '（无正文）', '');
        if (record.attachments.length) lines.push(`附件：${record.attachments.map(file => file.name).join('、')}`, '');
        lines.push('---', '');
      });
      return lines.join('\n');
    },
    importJSON(raw, mode = 'merge') {
      const incoming = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!incoming || !Array.isArray(incoming.records)) throw new Error('这不是有效的拾光AI备份文件：缺少 records 数组。');
      const now = Date.now();
      const imported = incoming.records.map(item => normalizeRecord({ ...item, isSample: false }, null));
      if (mode === 'replace') db.records = [];
      const ids = new Set(db.records.map(item => item.id));
      imported.forEach(item => {
        if (ids.has(item.id)) item.id = uid('memory');
        item.createdAt = Number(item.createdAt) || now;
        db.records.push(item); ids.add(item.id);
      });
      if (Array.isArray(incoming.reviews)) db.reviews = mode === 'replace' ? incoming.reviews : [...db.reviews, ...incoming.reviews];
      persist();
      return imported.length;
    },
    clearAll() { db = { version: 2, records: [], reviews: [], chats: [], settings: clone(db.settings), createdAt: Date.now() }; persist(); },
    resetDemo() { const settings = clone(db.settings); db = seedData(); db.settings = settings; persist(); }
  };

  window.MemoryStore = MemoryStore;
})();
