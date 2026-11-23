/* 拾光AI：共享导航、图标、记录编辑器与通用交互。 */
(function () {
  const paths = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M9.5 20v-6h5v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    sparkles: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    folder: '<path d="M3 7.5h6l2-3h4l2 3h4v12H3Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2-.7-.6-1.4.9-1.9-2.1-2.1-1.9.9-1.4-.6-.7-2h-3l-.7 2-1.4.6-1.9-.9-2.1 2.1.9 1.9-.6 1.4-2 .7v3l2 .7.6 1.4-.9 1.9 2.1 2.1 1.9-.9 1.4.6.7 2h3l.7-2 1.4-.6 1.9.9 2.1-2.1-.9-1.9.6-1.4Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    pin: '<path d="m8 3 8 0-1 6 4 4v2H5v-2l4-4Z"/><path d="M12 15v6"/>',
    edit: '<path d="m4 16-.8 4.8L8 20 20 8l-4-4Z"/><path d="m13.5 6.5 4 4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 20h16"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    left: '<path d="m15 5-7 7 7 7"/>',
    right: '<path d="m9 5 7 7-7 7"/>',
    link: '<path d="m9.5 14.5 5-5M7 17l-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0M14 7l1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0"/>',
    text: '<path d="M5 5h14M12 5v15M8 20h8"/>',
    file: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h4M9 13h6M9 17h6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m3 17 5-4 4 3 3-3 6 5"/>',
    mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3Z"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 3 4 3 4-3 4-3M9 9h.01M15 9h.01"/>',
    tag: '<path d="M3 4h8l10 10-7 7L3 10Z"/><circle cx="8" cy="8" r="1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    send: '<path d="m3 3 18 9-18 9 3-9Z"/><path d="M6 12h15"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 13v7H4V6h7"/>',
    brain: '<path d="M9 4a3 3 0 0 0-5 2 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 4 4c2 0 3-1 3-3V6c0-2-1-3-3-3ZM15 4a3 3 0 0 1 5 2 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-4 4c-2 0-3-1-3-3V6c0-2 1-3 3-3Z"/>',
    book: '<path d="M3 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H3ZM21 4h-7a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h7Z"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 8a7 7 0 0 1 12-2l2 6M4 12l2 6a7 7 0 0 0 12-2"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6Z"/><path d="m8 12 3 3 5-6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const typeMap = {
    text: ['文字', 'text'], image: ['照片', 'image'], audio: ['语音', 'mic'], video: ['视频', 'video'], link: ['链接', 'link'], document: ['文档', 'file']
  };
  const formatDate = (timestamp, withYear = true) => new Date(Number(timestamp)).toLocaleDateString('zh-CN', withYear ? { year: 'numeric', month: 'long', day: 'numeric' } : { month: 'long', day: 'numeric' });
  const formatTime = (timestamp) => new Date(Number(timestamp)).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const relativeTime = (timestamp) => {
    const diff = Date.now() - Number(timestamp);
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} 天前`;
    return formatDate(timestamp, false);
  };
  const fileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const units = ['B', 'KB', 'MB', 'GB']; const i = Math.min(3, Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${(bytes / (1024 ** i)).toFixed(i ? 1 : 0)} ${units[i]}`;
  };
  const download = async (name, content, mime = 'text/plain;charset=utf-8') => {
    let blob;
    if (content instanceof Blob) blob = content;
    else if (typeof content === 'string' && content.startsWith('data:')) blob = await (await fetch(content)).blob();
    else blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  function fileToAttachment(file) {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) { reject(new Error(`「${file.name}」超过 2MB。纯本地版建议先压缩附件，避免浏览器存储溢出。`)); return; }
      const ext = file.name.split('.').pop().toLowerCase();
      const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('audio/') ? 'audio' : file.type.startsWith('video/') ? 'video' : ['txt', 'md', 'csv', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext) ? 'document' : 'document';
      const reader = new FileReader();
      reader.onerror = () => reject(new Error(`读取「${file.name}」失败，请重试。`));
      reader.onload = () => {
        const attachment = { id: `file-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, name: file.name, type, mime: file.type, size: file.size, dataUrl: reader.result, uploadedAt: Date.now(), text: '' };
        if (['txt', 'md', 'csv'].includes(ext) || file.type.startsWith('text/')) {
          const textReader = new FileReader(); textReader.onload = () => { attachment.text = String(textReader.result || '').slice(0, 20000); resolve(attachment); }; textReader.onerror = () => resolve(attachment); textReader.readAsText(file);
        } else resolve(attachment);
      };
      reader.readAsDataURL(file);
    });
  }
  // 轻量 Markdown 渲染：只支持标题、强调、列表、引用、代码、链接与分割线，先转义再拼接，避免注入。
  function renderMarkdown(text) {
    const inline = (value) => esc(value)
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/~~([^~\n]+)~~/g, '<del>$1</del>')
      .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
      .replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|[\s（(])(https?:\/\/[^\s<）)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>')
      .replace(/\n/g, '<br>');
    const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    const code = [];
    let paragraph = [];
    let quote = [];
    let list = '';
    let inCode = false;
    const flushParagraph = () => { if (paragraph.length) { out.push(`<p>${inline(paragraph.join('\n'))}</p>`); paragraph = []; } };
    const flushQuote = () => { if (quote.length) { out.push(`<blockquote>${inline(quote.join('\n'))}</blockquote>`); quote = []; } };
    const closeList = () => { if (list) { out.push(`</${list}>`); list = ''; } };
    lines.forEach(raw => {
      const line = raw.replace(/\s+$/, '');
      if (inCode) {
        if (/^```/.test(line.trim())) { out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`); code.length = 0; inCode = false; } else code.push(raw);
        return;
      }
      if (/^```/.test(line.trim())) { flushParagraph(); flushQuote(); closeList(); inCode = true; return; }
      if (!line.trim()) { flushParagraph(); flushQuote(); closeList(); return; }
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) { flushParagraph(); flushQuote(); closeList(); const level = Math.min(heading[1].length + 3, 6); out.push(`<h${level}>${inline(heading[2])}</h${level}>`); return; }
      if (/^([-*_])\1{2,}$/.test(line.trim())) { flushParagraph(); flushQuote(); closeList(); out.push('<hr>'); return; }
      const quoted = line.match(/^>\s?(.*)$/);
      if (quoted) { flushParagraph(); closeList(); quote.push(quoted[1]); return; }
      const bullet = line.match(/^[-*+]\s+(.+)$/);
      if (bullet) { flushParagraph(); flushQuote(); if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; } out.push(`<li>${inline(bullet[1])}</li>`); return; }
      const ordered = line.match(/^\d+[.)]\s+(.+)$/);
      if (ordered) { flushParagraph(); flushQuote(); if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; } out.push(`<li>${inline(ordered[1])}</li>`); return; }
      flushQuote(); closeList(); paragraph.push(line.trim());
    });
    if (inCode) out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`);
    flushParagraph(); flushQuote(); closeList();
    return out.join('');
  }

  // 搜索结果高亮：按原文切分后逐段转义，避免命中特殊字符时破坏转义结果。
  function highlight(text, query) {
    const source = String(text ?? '');
    const keyword = String(query || '').trim();
    if (!keyword) return esc(source);
    const pattern = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return source.split(new RegExp(`(${pattern})`, 'gi'))
      .map((part, index) => index % 2 ? `<mark class="search-hit">${esc(part)}</mark>` : esc(part))
      .join('');
  }
  const SEARCH_KEY = 'shiguangai_search_history';
  function searchHistoryList() {
    try {
      const list = JSON.parse(localStorage.getItem(SEARCH_KEY) || '[]');
      return Array.isArray(list) ? list.filter(item => typeof item === 'string' && item.trim()).slice(0, 5) : [];
    } catch (error) { return []; }
  }
  function rememberSearch(keyword) {
    const value = String(keyword || '').trim();
    if (!value) return searchHistoryList();
    const next = [value, ...searchHistoryList().filter(item => item !== value)].slice(0, 5);
    try { localStorage.setItem(SEARCH_KEY, JSON.stringify(next)); } catch (error) { /* 隐私模式忽略 */ }
    return next;
  }
  function clearSearchHistory() {
    try { localStorage.removeItem(SEARCH_KEY); } catch (error) { /* 隐私模式忽略 */ }
    return [];
  }

  window.SG = { esc, typeMap, formatDate, formatTime, relativeTime, fileSize, download, fileToAttachment, markdown: renderMarkdown, highlight, searchHistoryList, rememberSearch, clearSearchHistory };

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#15191b' : '#1e2623');
  };
  applyTheme(MemoryStore.settings().theme);
  window.setTheme = (theme) => {
    MemoryStore.updateSettings({ theme });
    applyTheme(theme);
  };
  let installPrompt = null;
  window.isAppInstalled = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    window.dispatchEvent(new CustomEvent('shiguang:installable'));
  });
  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    if (window.showToast) window.showToast('拾光AI 已安装到桌面', 'success');
  });
  window.installApp = async () => {
    if (window.isAppInstalled()) return 'installed';
    if (!installPrompt) return 'unavailable';
    installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    installPrompt = null;
    return choice.outcome === 'accepted' ? 'installed' : 'dismissed';
  };
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(error => console.warn('离线缓存注册失败', error));
    });
  }
  window.getIcon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.file}</svg>`;

  window.renderSidebar = function (active) {
    const items = [
      ['home', '工作台', 'home', 'index.html'], ['history', '时光轴', 'clock', 'history.html'],
      ['assistant', '记忆助手', 'sparkles', 'assistant.html'], ['review', '周复盘', 'chart', 'review.html'],
      ['insights', '主题洞察', 'compass', 'insights.html'],
      ['files', '资料库', 'folder', 'files.html'], ['settings', '设置', 'settings', 'settings.html']
    ];
    const name = MemoryStore.settings().name || '我的朋友';
    return `<aside class="app-sidebar" id="sidebar">
      <a class="brand" href="index.html"><span class="brand-mark"></span><span><span class="brand-name">拾光AI</span><span class="brand-sub">MEMORY, MADE VISIBLE</span></span></a>
      <button class="btn btn-primary sidebar-capture" data-action="new-record">${getIcon('plus', 17)} 留下此刻</button>
      <button class="sidebar-search" data-action="open-search">${getIcon('search', 16)}<span>搜索记忆</span><kbd>${/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K'}</kbd></button>
      <div class="nav-label">我的记忆</div>
      <nav class="sidebar-nav">${items.map(item => `<a class="nav-item ${active === item[0] ? 'active' : ''}" href="${item[3]}" ${active === item[0] ? 'aria-current="page"' : ''}>${getIcon(item[2], 19)}<span>${item[1]}</span></a>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="local-note">${getIcon('shield', 16)}<span>默认仅保存在此浏览器<br>随时导出，记忆由你掌握</span></div><div class="profile-chip"><span class="profile-avatar">${esc(name.slice(0, 1))}</span><span><span class="profile-name">${esc(name)}</span><span class="profile-plan">本地个人档案</span></span></div></div>
    </aside><div class="sidebar-overlay" id="sidebar-overlay"></div>`;
  };
  window.renderPageHeader = function ({ eyebrow = 'SHIGUANG AI', title, subtitle = '', actions = '' }) {
    return `<header class="page-header"><div class="row"><button class="btn btn-ghost btn-icon mobile-menu-btn" id="mobile-menu-btn" aria-label="打开导航">${getIcon('menu', 21)}</button><div class="page-heading"><div class="eyebrow">${esc(eyebrow)}</div><h1 class="page-title">${esc(title)}</h1>${subtitle ? `<p class="page-subtitle">${esc(subtitle)}</p>` : ''}</div></div><div class="page-actions">${actions}</div></header>`;
  };
  window.renderEmptyState = function ({ icon = 'book', title, description = '', action = '' }) {
    return `<div class="empty-state"><div class="empty-icon">${getIcon(icon, 27)}</div><h3 class="empty-title">${esc(title)}</h3><p class="empty-desc">${esc(description)}</p>${action}</div>`;
  };
  window.renderRecordCard = function (record) {
    const [type, icon] = typeMap[record.type] || typeMap.text;
    return `<article class="memory-card ${record.pinned ? 'pinned' : ''}" onclick="openRecordDetail('${record.id}')"><div class="memory-card-top"><span class="memory-type">${getIcon(icon, 14)} ${type}</span><span class="memory-date">${record.pinned ? `<span class="pin-mark">${getIcon('pin', 13)}</span> ` : ''}${relativeTime(record.occurredAt)}</span></div><h3 class="memory-title">${esc(record.title)}</h3><p class="memory-excerpt">${esc(record.content || record.attachments.map(f => f.name).join('、') || '暂无文字描述')}</p><div class="memory-footer"><div class="memory-tags">${record.tags.slice(0, 3).map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}</div><span class="row small muted" style="gap:5px"><i class="mood-dot"></i>${esc(record.mood)}</span></div></article>`;
  };

  const PAGES = [
    ['工作台', 'index.html', 'home', '工作台 首页 仪表盘 home dashboard'],
    ['时光轴', 'history.html', 'clock', '时光轴 时间线 全部记忆 timeline'],
    ['记忆助手', 'assistant.html', 'sparkles', '记忆助手 提问 问答 assistant'],
    ['周复盘', 'review.html', 'chart', '周复盘 周报 总结 review'],
    ['主题洞察', 'insights.html', 'compass', '主题洞察 统计 标签 分析 insights'],
    ['年度回顾', 'annual.html', 'book', '年度回顾 年终 总结 报告 annual'],
    ['资料库', 'files.html', 'folder', '资料库 附件 文件 files'],
    ['设置', 'settings.html', 'settings', '设置 偏好 备份 settings']
  ];
  let paletteOpen = false;
  window.openCommandPalette = function () {
    if (paletteOpen) return;
    paletteOpen = true;
    const overlay = document.createElement('div'); overlay.className = 'command-overlay';
    overlay.innerHTML = `<div class="command-panel" role="dialog" aria-modal="true" aria-label="快捷搜索"><div class="command-input-row">${getIcon('search', 18)}<input class="command-input" id="command-input" placeholder="搜索记忆、页面，或直接记录此刻…" autocomplete="off"><span class="command-hint">ESC</span></div><div class="command-results" id="command-results"></div><div class="command-foot"><span>${getIcon('right', 11)} 选择</span><span>Enter 打开</span><span>Esc 关闭</span></div></div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('#command-input');
    const results = overlay.querySelector('#command-results');
    let items = []; let active = 0;

    const close = () => { paletteOpen = false; overlay.remove(); document.removeEventListener('keydown', onKey, true); };
    const run = item => {
      if (!item) return;
      close();
      if (item.kind === 'record') window.openRecordDetail(item.id);
      else if (item.kind === 'action') window.openRecordEditor();
      else location.href = item.href;
    };
    const paintActive = () => {
      results.querySelectorAll('.command-item').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.index) === active));
      results.querySelector('.command-item.active')?.scrollIntoView({ block: 'nearest' });
    };
    const paint = raw => {
      const query = raw.trim();
      const records = MemoryStore.listRecords(query ? { query } : {}).slice(0, query ? 6 : 4);
      const pages = PAGES.filter(page => !query || `${page[0]} ${page[3]}`.toLowerCase().includes(query.toLowerCase()));
      items = [
        ...records.map(record => ({
          kind: 'record', id: record.id, title: record.title, icon: (typeMap[record.type] || typeMap.text)[1],
          meta: `${formatDate(record.occurredAt)}${record.tags.length ? ' · ' + record.tags.slice(0, 2).join('、') : ''}`,
          group: query ? '相关记忆' : '最近的记忆'
        })),
        ...(query ? [] : [{ kind: 'action', title: '留下此刻（新建记忆）', meta: '快速记录', icon: 'plus', group: '操作' }]),
        ...pages.map(page => ({ kind: 'page', href: page[1], title: page[0], meta: '页面跳转', icon: page[2], group: '页面' }))
      ];
      active = 0;
      if (!items.length) { results.innerHTML = `<div class="command-empty">没有找到与「${esc(query)}」相关的记忆或页面。</div>`; return; }
      let lastGroup = '';
      results.innerHTML = items.map((item, index) => {
        const header = item.group !== lastGroup ? `<div class="command-group">${item.group}</div>` : '';
        lastGroup = item.group;
        return `${header}<button class="command-item" data-index="${index}">${getIcon(item.icon, 16)}<span class="command-item-text"><span class="command-item-title">${esc(item.title)}</span><span class="command-item-meta">${esc(item.meta)}</span></span>${getIcon(item.kind === 'page' ? 'external' : 'right', 13)}</button>`;
      }).join('');
      paintActive();
    };
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
      if (!items.length) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); active = (active + 1) % items.length; paintActive(); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); active = (active - 1 + items.length) % items.length; paintActive(); }
      else if (event.key === 'Enter') { event.preventDefault(); run(items[active]); }
    };

    input.addEventListener('input', event => paint(event.target.value));
    results.addEventListener('click', event => { const btn = event.target.closest('[data-index]'); if (btn) run(items[Number(btn.dataset.index)]); });
    results.addEventListener('mouseover', event => { const btn = event.target.closest('[data-index]'); if (btn) { active = Number(btn.dataset.index); paintActive(); } });
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', onKey, true);
    paint('');
    input.focus();
  };

  let shellInitialized = false;
  window.initShell = function () {
    const settings = MemoryStore.settings();
    document.body.classList.toggle('reduce-motion', settings.reduceMotion);
    if (shellInitialized) return;
    shellInitialized = true;
    document.addEventListener('click', event => {
      if (event.target.closest('[data-action="new-record"]')) openRecordEditor();
      if (event.target.closest('[data-action="open-search"]')) openCommandPalette();
      if (event.target.closest('#mobile-menu-btn')) { document.getElementById('sidebar')?.classList.add('open'); document.getElementById('sidebar-overlay')?.classList.add('active'); }
      if (event.target.id === 'sidebar-overlay') { document.getElementById('sidebar')?.classList.remove('open'); document.getElementById('sidebar-overlay')?.classList.remove('active'); }
      if (event.target.classList.contains('modal-overlay')) event.target.remove();
    });
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openCommandPalette(); return; }
      if (event.key === 'Escape') document.querySelector('.modal-overlay:last-of-type')?.remove();
    });
  };
  document.addEventListener('DOMContentLoaded', initShell);

  window.showToast = function (message, type = 'info', duration = 3200) {
    let stack = document.querySelector('.toast-stack');
    if (!stack) { stack = document.createElement('div'); stack.className = 'toast-stack'; document.body.appendChild(stack); }
    const toast = document.createElement('div'); toast.className = `toast ${type}`;
    toast.innerHTML = `${getIcon(type === 'error' ? 'alert' : type === 'success' ? 'check' : 'info', 17)}<span>${esc(message)}</span>`;
    stack.appendChild(toast); setTimeout(() => toast.remove(), duration);
  };
  window.showConfirm = function ({ title, message, confirmText = '确认', onConfirm, danger = true }) {
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-sm" role="dialog" aria-modal="true"><div class="modal-header"><h3 class="modal-title">${esc(title)}</h3><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><p class="soft">${esc(message)}</p></div><div class="modal-footer"><button class="btn btn-secondary" data-close>取消</button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="confirm-action">${esc(confirmText)}</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => overlay.remove());
    overlay.querySelector('#confirm-action').onclick = async () => { try { await onConfirm?.(); overlay.remove(); } catch (error) { showToast(error.message, 'error'); } };
  };

  function attachmentHTML(file) {
    const url = file.dataUrl || file.url || '';
    if (file.type === 'image' && url) return `<div class="attachment-preview"><img src="${url}" alt="${esc(file.name)}"><p class="small muted" style="margin-top:8px">${esc(file.name)}</p></div>`;
    if (file.type === 'audio' && url) return `<div class="attachment-preview"><p class="small">${esc(file.name)}</p><audio src="${url}" controls></audio></div>`;
    if (file.type === 'video' && url) return `<div class="attachment-preview"><video src="${url}" controls></video><p class="small muted">${esc(file.name)}</p></div>`;
    return `<div class="attachment-preview row spread"><span class="row">${getIcon('file', 20)}<span><strong class="small">${esc(file.name)}</strong><span class="file-meta" style="display:block">${fileSize(file.size)}</span></span></span>${url ? `<button class="btn btn-secondary btn-sm" onclick="SG.download('${esc(file.name)}', '${url}')">下载</button>` : ''}</div>`;
  }
  window.openRecordDetail = function (id) {
    const record = MemoryStore.getRecord(id); if (!record) { showToast('这条记忆不存在或已删除。', 'error'); return; }
    const [type, icon] = typeMap[record.type] || typeMap.text;
    const related = MemoryStore.relatedRecords(id, 3);
    const relatedHTML = related.length ? `<div class="related-block"><div class="related-title">${getIcon('link', 14)} 相关记忆</div><div class="related-list">${related.map(item => `<button class="related-item" data-related="${item.id}"><span class="related-item-title">${esc(item.title)}</span><span class="related-item-meta">${formatDate(item.occurredAt, false)} · ${item.sharedTags.length ? `共同标签：${item.sharedTags.map(esc).join('、')}` : '内容相近'}</span></button>`).join('')}</div></div>` : '';
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-lg" role="dialog" aria-modal="true"><div class="modal-header"><div><span class="memory-type">${getIcon(icon, 14)} ${type}</span><h3 class="modal-title" style="margin-top:7px">${esc(record.title)}</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><div class="detail-meta"><span>${getIcon('calendar', 13)} ${formatDate(record.occurredAt)} ${formatTime(record.occurredAt)}</span><span>${getIcon('smile', 13)} ${esc(record.mood)}</span><span>${esc(record.source)}</span></div><div class="memory-tags" style="margin-bottom:18px">${record.tags.map(tag => `<span class="tag tag-teal">${esc(tag)}</span>`).join('')}</div><div class="detail-content">${renderMarkdown(record.content || '这条记忆只有附件，没有文字描述。')}</div>${record.attachments.map(attachmentHTML).join('')}${relatedHTML}</div><div class="modal-footer detail-footer" style="justify-content:space-between"><div class="row"><button class="btn btn-ghost btn-sm" id="detail-pin">${getIcon('pin', 15)} ${record.pinned ? '取消置顶' : '置顶'}</button><button class="btn btn-ghost btn-sm" id="detail-delete">${getIcon('trash', 15)} 删除</button></div><div class="row"><button class="btn btn-secondary btn-sm" id="detail-share">${getIcon('image', 15)} 分享卡片</button><button class="btn btn-dark" id="detail-edit">${getIcon('edit', 15)} 编辑记忆</button></div></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('[data-close]').onclick = () => overlay.remove();
    overlay.querySelectorAll('[data-related]').forEach(btn => btn.onclick = () => { const nextId = btn.dataset.related; overlay.remove(); openRecordDetail(nextId); });
    overlay.querySelector('#detail-share').onclick = () => openShareCard(id);
    overlay.querySelector('#detail-edit').onclick = () => { overlay.remove(); openRecordEditor(id); };
    overlay.querySelector('#detail-pin').onclick = () => { MemoryStore.togglePin(id); overlay.remove(); showToast('置顶状态已更新', 'success'); };
    overlay.querySelector('#detail-delete').onclick = () => { overlay.remove(); showConfirm({ title: '删除这条记忆？', message: `「${record.title}」及其附件将被永久删除，建议先导出备份。`, confirmText: '永久删除', onConfirm: () => { MemoryStore.deleteRecord(id); showToast('记忆已删除', 'success'); } }); };
  };

  function wrapCanvasText(ctx, text, maxWidth, maxLines) {
    const chars = Array.from(String(text || '').replace(/\s+/g, ' ').trim());
    const lines = []; let line = '';
    chars.forEach(char => {
      if (ctx.measureText(line + char).width > maxWidth && line) { lines.push(line); line = char; }
      else line += char;
    });
    if (line) lines.push(line);
    if (lines.length > maxLines) {
      const kept = lines.slice(0, maxLines);
      kept[maxLines - 1] = `${kept[maxLines - 1].slice(0, -1)}…`;
      return kept;
    }
    return lines;
  }
  function canvasRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }
  window.openShareCard = function (id) {
    const record = MemoryStore.getRecord(id);
    if (!record) { showToast('这条记忆不存在或已删除。', 'error'); return; }
    const W = 1080; const H = 1440; const pad = 64; const left = 104; const contentWidth = W - left * 2;
    const serif = '"Noto Serif SC", "Songti SC", SimSun, serif';
    const sans = 'Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
    const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f6f3ed'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#dedbd2'; ctx.lineWidth = 2; ctx.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
    ctx.strokeStyle = 'rgba(231,111,81,.14)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(W - 96, H - 132, 118, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(W - 96, H - 132, 166, 0, Math.PI * 2); ctx.stroke();

    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e76f51'; ctx.beginPath(); ctx.arc(left + 9, 138, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1e2623'; ctx.font = `700 30px ${serif}`; ctx.fillText('拾光AI', left + 32, 150);
    ctx.fillStyle = '#89908a'; ctx.font = `600 15px ${sans}`; ctx.textAlign = 'right'; ctx.fillText('MEMORY, MADE VISIBLE', W - left, 148); ctx.textAlign = 'left';
    ctx.fillStyle = '#dedbd2'; ctx.fillRect(left, 196, contentWidth, 1);

    const date = new Date(record.occurredAt);
    ctx.fillStyle = '#2a6f6a'; ctx.font = `600 24px ${sans}`;
    ctx.fillText(`${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日 · ${record.mood}`, left, 266);

    let y = 352;
    ctx.fillStyle = '#1e2623'; ctx.font = `700 54px ${serif}`;
    wrapCanvasText(ctx, record.title, contentWidth, 3).forEach(line => { ctx.fillText(line, left, y); y += 76; });

    y += 20;
    ctx.fillStyle = '#53605a'; ctx.font = `400 30px ${serif}`;
    const bodyLines = wrapCanvasText(ctx, record.content || '这条记忆只有附件，没有文字描述。', contentWidth, Math.max(3, Math.floor((H - 372 - y) / 58)));
    bodyLines.forEach(line => { ctx.fillText(line, left, y); y += 58; });

    const tagY = H - 286; let tagX = left;
    ctx.font = `600 22px ${sans}`;
    record.tags.slice(0, 5).forEach(tag => {
      const chipWidth = ctx.measureText(tag).width + 40;
      if (tagX + chipWidth > W - left) return;
      ctx.fillStyle = '#dfece8'; canvasRoundRect(ctx, tagX, tagY, chipWidth, 44, 22); ctx.fill();
      ctx.fillStyle = '#2a6f6a'; ctx.fillText(tag, tagX + 20, tagY + 30);
      tagX += chipWidth + 12;
    });

    ctx.fillStyle = '#dedbd2'; ctx.fillRect(left, H - 206, contentWidth, 1);
    ctx.fillStyle = '#1e2623'; ctx.font = `700 28px ${serif}`; ctx.fillText('记录，是对时间最温柔的抵抗。', left, H - 138);
    ctx.fillStyle = '#89908a'; ctx.font = `500 20px ${sans}`; ctx.fillText('拾光AI · 本地记忆档案', left, H - 94);

    const url = canvas.toDataURL('image/png');
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-share" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">SHARE MEMORY</div><h3 class="modal-title">分享这张记忆卡片</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><div class="share-preview"><img src="${url}" alt="记忆分享卡片预览"></div><p class="share-hint">1080 × 1440 的图片，已包含标题、正文与标签，可直接保存或分享。</p></div><div class="modal-footer"><button class="btn btn-secondary" data-close>关闭</button><button class="btn btn-primary" id="download-share">${getIcon('download', 16)} 下载图片</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => overlay.remove());
    overlay.querySelector('#download-share').onclick = () => {
      const safeTitle = record.title.replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 30) || '记忆';
      SG.download(`拾光AI-${safeTitle}-${new Date(record.occurredAt).toISOString().slice(0, 10)}.png`, url);
      showToast('分享卡片已开始下载', 'success');
    };
  };

  window.openDailyReview = function () {
    const record = MemoryStore.dailyReview();
    if (!record) { showToast('还没有可以回顾的旧记忆，再多记录几天吧。', 'info'); return; }
    const [type, icon] = typeMap[record.type] || typeMap.text;
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-review" role="dialog" aria-modal="true"><div class="modal-header"><div><span class="review-kicker">${getIcon('sparkles', 14)} DAILY REVIEW · 每日回顾</span><h3 class="modal-title" style="margin-top:8px">${esc(record.title)}</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><div class="detail-meta"><span>${getIcon('calendar', 13)} ${formatDate(record.occurredAt)}</span><span>${getIcon(icon, 13)} ${type}</span><span>${getIcon('smile', 13)} ${esc(record.mood)}</span></div><p class="review-lead">偶然翻到这一条，也许值得再读一遍。</p><div class="detail-content">${renderMarkdown(record.content || '这条记忆只有附件，没有文字描述。')}</div><div class="memory-tags" style="margin-top:18px">${record.tags.map(tag => `<span class="tag tag-teal">${esc(tag)}</span>`).join('')}</div><button class="btn btn-ghost btn-sm" id="review-open-detail" style="margin-top:14px">${getIcon('external', 14)} 打开完整记忆</button></div><div class="modal-footer"><button class="btn btn-secondary" data-close>稍后</button><button class="btn btn-primary" id="review-done">${getIcon('check', 16)} 记住了</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => overlay.remove());
    overlay.querySelector('#review-open-detail').onclick = () => { overlay.remove(); openRecordDetail(record.id); };
    overlay.querySelector('#review-done').onclick = () => {
      overlay.remove();
      MemoryStore.markReviewed();
      showToast('今日回顾完成，明天再见', 'success');
    };
  };

  window.openTagManager = function () {
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-tags" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">TAG MANAGER</div><h3 class="modal-title">标签管理</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><p class="tag-manager-desc">重命名、合并或删除标签，相关记忆会立即同步更新。</p><div class="tag-manager-list" id="tag-manager-list"></div></div><div class="modal-footer"><span class="tag-manager-total" id="tag-manager-total"></span><button class="btn btn-secondary" data-close>完成</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => overlay.remove());
    let editing = null; let merging = null;

    function renderList() {
      const list = overlay.querySelector('#tag-manager-list');
      const tags = MemoryStore.tags();
      overlay.querySelector('#tag-manager-total').textContent = `${tags.length} 个标签 · ${tags.reduce((sum, tag) => sum + tag.count, 0)} 次使用`;
      if (!tags.length) { list.innerHTML = `<div class="tag-manager-empty">还没有任何标签。记录时添加标签后会出现在这里。</div>`; return; }
      list.innerHTML = tags.map(tag => {
        if (editing === tag.name) {
          return `<form class="tag-row tag-row-edit" data-tag="${esc(tag.name)}"><input class="input" name="tag-name" value="${esc(tag.name)}" maxlength="12" autocomplete="off" aria-label="新的标签名"><div class="tag-row-actions"><button class="btn btn-primary btn-sm" type="submit">保存</button><button class="btn btn-ghost btn-sm" type="button" data-cancel>取消</button></div></form>`;
        }
        if (merging === tag.name) {
          const others = tags.filter(item => item.name !== tag.name);
          return `<div class="tag-row tag-row-edit"><span class="tag tag-teal">${esc(tag.name)}</span><div class="tag-row-actions"><select class="select tag-merge-select" data-merge-target aria-label="合并目标"><option value="">合并到…</option>${others.map(item => `<option value="${esc(item.name)}">${esc(item.name)}（${item.count} 条）</option>`).join('')}</select><button class="btn btn-primary btn-sm" data-confirm-merge="${esc(tag.name)}">合并</button><button class="btn btn-ghost btn-sm" data-cancel>取消</button></div></div>`;
        }
        return `<div class="tag-row"><span class="tag tag-teal">${esc(tag.name)}</span><span class="tag-row-count">${tag.count} 条</span><div class="tag-row-actions"><button class="btn btn-ghost btn-sm" data-rename="${esc(tag.name)}">${getIcon('edit', 13)} 重命名</button><button class="btn btn-ghost btn-sm" data-merge="${esc(tag.name)}">${getIcon('link', 13)} 合并</button><button class="btn btn-ghost btn-sm" data-delete="${esc(tag.name)}">${getIcon('trash', 13)} 删除</button></div></div>`;
      }).join('');
      bind();
    }

    function bind() {
      const list = overlay.querySelector('#tag-manager-list');
      list.querySelectorAll('[data-rename]').forEach(btn => btn.onclick = () => {
        editing = btn.dataset.rename; merging = null; renderList();
        const input = list.querySelector('input[name="tag-name"]'); if (input) { input.focus(); input.select(); }
      });
      list.querySelectorAll('[data-merge]').forEach(btn => btn.onclick = () => { merging = btn.dataset.merge; editing = null; renderList(); });
      list.querySelectorAll('[data-delete]').forEach(btn => btn.onclick = () => {
        const name = btn.dataset.delete;
        showConfirm({
          title: `删除标签「${name}」？`, message: '相关记忆不会被删除，只会移除这个标签。', confirmText: '删除',
          onConfirm: () => {
            const count = MemoryStore.deleteTag(name);
            renderList();
            showToast(count ? `已从 ${count} 条记忆中移除「${name}」` : '标签已删除', 'success');
          }
        });
      });
      list.querySelectorAll('[data-cancel]').forEach(btn => btn.onclick = () => { editing = null; merging = null; renderList(); });
      const form = list.querySelector('form[data-tag]');
      if (form) {
        form.onsubmit = event => {
          event.preventDefault();
          const from = form.dataset.tag;
          const to = String(new FormData(form).get('tag-name') || '').trim();
          if (!to) { showToast('标签名不能为空', 'error'); return; }
          if (to === from) { editing = null; renderList(); return; }
          const apply = () => {
            const count = MemoryStore.renameTag(from, to);
            editing = null; renderList();
            showToast(count ? `已把「${from}」更新为「${to}」` : '标签已更新', 'success');
          };
          if (MemoryStore.tags().some(tag => tag.name === to)) {
            showConfirm({ title: `合并「${from}」到「${to}」？`, message: '两个标签下的记忆会被合并，不会丢失记录。', confirmText: '合并', danger: false, onConfirm: apply });
          } else apply();
        };
      }
      list.querySelectorAll('[data-confirm-merge]').forEach(btn => btn.onclick = () => {
        const from = btn.dataset.confirmMerge;
        const to = list.querySelector('[data-merge-target]').value;
        if (!to) { showToast('请选择要合并到的标签', 'error'); return; }
        showConfirm({
          title: `合并「${from}」到「${to}」？`, message: '两个标签下的记忆会被合并，不会丢失记录。', confirmText: '合并', danger: false,
          onConfirm: () => {
            const count = MemoryStore.renameTag(from, to);
            merging = null; renderList();
            showToast(`已合并，影响 ${count} 条记忆`, 'success');
          }
        });
      });
    }

    renderList();
  };

  window.openRecordEditor = function (id = null, onSaved = null, preset = {}) {
    const existing = id ? MemoryStore.getRecord(id) : null;
    if (id && !existing) { showToast('没有找到要编辑的记忆。', 'error'); return; }
    const record = existing || { title: '', content: '', type: preset.type || 'text', occurredAt: Date.now(), mood: '平静', tags: preset.tags || [], attachments: [...(preset.attachments || [])], source: preset.source || '手动记录' };
    let attachments = [...record.attachments];
    const dateValue = new Date(record.occurredAt - new Date(record.occurredAt).getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-lg" role="dialog" aria-modal="true"><form id="record-form"><div class="modal-header"><div><div class="eyebrow">${existing ? 'EDIT MEMORY' : 'CAPTURE THE MOMENT'}</div><h3 class="modal-title">${existing ? '编辑记忆' : '此刻，值得留下'}</h3></div><button class="btn btn-ghost btn-icon" type="button" data-close>${getIcon('x')}</button></div><div class="modal-body"><div class="form-stack"><div class="field"><label class="field-label" for="record-title">标题</label><input class="input" id="record-title" maxlength="80" value="${esc(record.title)}" placeholder="给这段记忆一个名字，留空将自动截取正文"></div><div class="field"><label class="field-label" for="record-content">正文</label><textarea class="textarea" id="record-content" style="min-height:160px" placeholder="发生了什么？当时的你在想什么？">${esc(record.content)}</textarea></div><div class="form-grid"><div class="field"><label class="field-label" for="record-type">记忆类型</label><select class="select" id="record-type">${Object.entries(typeMap).map(([key, value]) => `<option value="${key}" ${record.type === key ? 'selected' : ''}>${value[0]}</option>`).join('')}</select></div><div class="field"><label class="field-label" for="record-date">发生时间</label><input class="input" id="record-date" type="datetime-local" value="${dateValue}" required></div><div class="field"><label class="field-label" for="record-mood">此刻心情</label><select class="select" id="record-mood">${['平静', '愉快', '有收获', '专注', '充实', '轻松', '期待', '温暖', '兴奋', '反思', '疲惫', '低落'].map(mood => `<option ${record.mood === mood ? 'selected' : ''}>${mood}</option>`).join('')}</select></div><div class="field"><label class="field-label" for="record-tags">标签</label><input class="input" id="record-tags" value="${esc(record.tags.join('，'))}" placeholder="学习，阅读（用逗号分隔）"></div></div><div class="field"><span class="field-label">附件</span><div class="row wrap"><button class="btn btn-secondary btn-sm" type="button" id="add-attachment">${getIcon('upload', 14)} 添加文件</button><button class="btn btn-secondary btn-sm" type="button" id="record-audio">${getIcon('mic', 14)} 录制语音</button><span class="field-hint">照片 / 语音 / 视频 / 文档，单个不超过 2MB</span></div><input type="file" id="attachment-input" multiple hidden accept="image/*,audio/*,video/*,.txt,.md,.csv,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"><div class="editor-attachments" id="editor-attachments"></div></div></div></div><div class="modal-footer"><button class="btn btn-secondary" type="button" data-close>取消</button><button class="btn btn-primary" type="submit" id="save-record">${getIcon('check', 16)} ${existing ? '保存修改' : '存入时光'}</button></div></form></div>`;
    document.body.appendChild(overlay);
    const renderAttachments = () => { overlay.querySelector('#editor-attachments').innerHTML = attachments.map((file, index) => `<div class="editor-attachment">${getIcon(typeMap[file.type]?.[1] || 'file', 15)}<span>${esc(file.name)} · ${fileSize(file.size)}</span><button type="button" class="btn btn-ghost btn-icon btn-sm" data-remove-file="${index}" aria-label="移除附件">${getIcon('x', 14)}</button></div>`).join(''); };
    renderAttachments();
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => overlay.remove());
    overlay.querySelector('#add-attachment').onclick = () => overlay.querySelector('#attachment-input').click();
    overlay.querySelector('#attachment-input').onchange = async event => {
      try { for (const file of event.target.files) attachments.push(await fileToAttachment(file)); renderAttachments(); }
      catch (error) { showToast(error.message, 'error', 5000); }
    };
    overlay.querySelector('#editor-attachments').onclick = event => { const btn = event.target.closest('[data-remove-file]'); if (btn) { attachments.splice(Number(btn.dataset.removeFile), 1); renderAttachments(); } };
    let mediaRecorder = null;
    overlay.querySelector('#record-audio').onclick = async event => {
      const button = event.currentTarget;
      if (mediaRecorder?.state === 'recording') { mediaRecorder.stop(); return; }
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { showToast('当前浏览器不支持录音，可直接上传语音文件。', 'error'); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream); const chunks = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop()); button.innerHTML = `${getIcon('mic', 14)} 录制语音`; button.classList.remove('btn-danger');
          const blob = new Blob(chunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          if (blob.size > 2 * 1024 * 1024) { showToast('录音超过 2MB，请录制更短的片段。', 'error'); return; }
          try { attachments.push(await fileToAttachment(new File([blob], `语音_${Date.now()}.webm`, { type: blob.type }))); overlay.querySelector('#record-type').value = 'audio'; renderAttachments(); showToast('语音已附加，保存后存入时光', 'success'); } catch (error) { showToast(error.message, 'error'); }
        };
        mediaRecorder.start(); button.innerHTML = `${getIcon('mic', 14)} 停止录音`; button.classList.add('btn-danger'); showToast('正在录音，再次点击即可停止');
      } catch (error) { showToast('无法使用麦克风，请检查浏览器权限。', 'error'); }
    };
    overlay.querySelector('#record-form').onsubmit = async event => {
      event.preventDefault();
      if (mediaRecorder?.state === 'recording') { showToast('请先停止录音再保存。', 'error'); return; }
      const content = overlay.querySelector('#record-content').value.trim();
      if (!content && !attachments.length) { showToast('写一点内容，或添加一个附件后再保存。', 'error'); return; }
      const button = overlay.querySelector('#save-record'); button.disabled = true; button.textContent = '保存中…';
      const payload = {
        title: overlay.querySelector('#record-title').value.trim(), content,
        type: overlay.querySelector('#record-type').value,
        occurredAt: new Date(overlay.querySelector('#record-date').value).getTime(),
        mood: overlay.querySelector('#record-mood').value,
        tags: overlay.querySelector('#record-tags').value.split(/[,，]/).map(v => v.trim()).filter(Boolean),
        attachments, isSample: false
      };
      try {
        const saved = existing ? MemoryStore.updateRecord(id, payload) : MemoryStore.createRecord(payload);
        overlay.remove(); showToast(existing ? '修改已保存' : '这一刻，已存入时光', 'success'); onSaved?.(saved);
      } catch (error) { showToast(error.message, 'error', 5000); button.disabled = false; button.textContent = '重新保存'; }
    };
    setTimeout(() => overlay.querySelector('#record-title').focus(), 50);
  };
})();
