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
    printer: '<path d="M7 8V3h10v5"/><path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="7" rx="1"/>',
    mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    speaker: '<path d="M4 9.5v5h3.6L13 19V5L7.6 9.5Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/>',
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
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
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

  // 朗读用纯文本：去掉 Markdown 标记与链接地址，避免读出多余的符号。
  function speakableText(value) {
    return String(value || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/[*_~`>#]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // 记忆朗读：同一时间只朗读一条记忆，关闭弹窗或切换记忆时自动停止。
  const speech = { synth: 'speechSynthesis' in window ? window.speechSynthesis : null, current: null };
  const canSpeak = () => Boolean(speech.synth && 'SpeechSynthesisUtterance' in window);
  const setReadButton = (button, reading) => {
    if (!button) return;
    button.innerHTML = reading ? `${getIcon('stop', 15)} 停止朗读` : `${getIcon('speaker', 15)} 朗读`;
    button.classList.toggle('is-reading', reading);
    button.setAttribute('aria-pressed', String(reading));
  };
  function stopReading() {
    const current = speech.current;
    if (!current) return;
    speech.current = null;
    current.utterance.onend = null;
    current.utterance.onerror = null;
    try { speech.synth.cancel(); } catch (error) { /* 部分浏览器可能不支持 */ }
    if (document.contains(current.button)) setReadButton(current.button, false);
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
  function removeSearchHistory(keyword) {
    const value = String(keyword || '').trim();
    const next = searchHistoryList().filter(item => item !== value);
    try { localStorage.setItem(SEARCH_KEY, JSON.stringify(next)); } catch (error) { /* 隐私模式忽略 */ }
    return next;
  }
  function clearSearchHistory() {
    try { localStorage.removeItem(SEARCH_KEY); } catch (error) { /* 隐私模式忽略 */ }
    return [];
  }
  // 头像处理：读图后居中裁成正方形，压到 160px 的 JPEG，控制本地存储占用。
  function processAvatarFile(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) { reject(new Error('请选择图片文件（JPG / PNG / WebP）。')); return; }
      if (file.size > 8 * 1024 * 1024) { reject(new Error('图片过大，请选择 8MB 以内的图片。')); return; }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('读取图片失败，请重试。'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('图片解析失败，请换一张试试。'));
        img.onload = () => {
          const size = 160;
          const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#f6f3ed'; ctx.fillRect(0, 0, size, size);
          const scale = Math.max(size / img.width, size / img.height);
          const w = img.width * scale; const h = img.height * scale;
          ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  window.SG = { esc, typeMap, formatDate, formatTime, relativeTime, fileSize, download, fileToAttachment, markdown: renderMarkdown, highlight, searchHistoryList, rememberSearch, removeSearchHistory, clearSearchHistory, processAvatarFile };

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
    const avatar = MemoryStore.settings().avatar;
    const avatarHTML = avatar ? `<img src="${avatar}" alt="${esc(name)}的头像">` : esc(name.slice(0, 1));
    return `<a class="skip-link" href="#main-content">跳到主要内容</a>
      <aside class="app-sidebar" id="sidebar" aria-label="侧边栏">
      <a class="brand" href="index.html"><img class="brand-mark" src="assets/shiguang-mark.svg" alt=""><span><span class="brand-name">拾光AI</span><span class="brand-sub">MEMORY, MADE VISIBLE</span></span></a>
      <button class="btn btn-primary sidebar-capture" data-action="new-record">${getIcon('plus', 17)} 留下此刻</button>
      <button class="sidebar-search" data-action="open-search">${getIcon('search', 16)}<span>搜索记忆</span><kbd>${/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K'}</kbd></button>
      <div class="nav-label">我的记忆</div>
      <nav class="sidebar-nav" aria-label="主导航">${items.map(item => `<a class="nav-item ${active === item[0] ? 'active' : ''}" href="${item[3]}" ${active === item[0] ? 'aria-current="page"' : ''}>${getIcon(item[2], 19)}<span>${item[1]}</span>${item[0] === 'assistant' ? '<span class="nav-dot" aria-hidden="true">AI</span>' : ''}</a>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="local-note"><i aria-hidden="true"></i><span><b>本地私密模式</b><small>默认仅保存在此浏览器 · 随时导出</small></span></div><div class="profile-chip"><span class="profile-avatar ${avatar ? 'has-img' : ''}">${avatarHTML}</span><span><span class="profile-name">${esc(name)}</span><span class="profile-plan">本地个人档案</span></span></div></div>
    </aside><div class="sidebar-overlay" id="sidebar-overlay"></div>`;
  };
  window.renderPageHeader = function ({ eyebrow = 'SHIGUANG AI', title, subtitle = '', actions = '' }) {
    return `<header class="page-header"><div class="row"><button class="btn btn-ghost btn-icon mobile-menu-btn" id="mobile-menu-btn" aria-label="打开导航" aria-controls="sidebar" aria-expanded="false">${getIcon('menu', 21)}</button><div class="page-heading"><div class="eyebrow">${esc(eyebrow)}</div><h1 class="page-title">${esc(title)}</h1>${subtitle ? `<p class="page-subtitle">${esc(subtitle)}</p>` : ''}</div></div><div class="page-actions">${actions}</div></header>`;
  };
  window.renderEmptyState = function ({ icon = 'book', illustration = '', title, description = '', action = '' }) {
    return `<div class="empty-state">${illustration ? `<img class="empty-illustration" src="${esc(illustration)}" alt="">` : `<div class="empty-icon">${getIcon(icon, 27)}</div>`}<h3 class="empty-title">${esc(title)}</h3><p class="empty-desc">${esc(description)}</p>${action}</div>`;
  };
  window.renderRecordCard = function (record) {
    const [type, icon] = typeMap[record.type] || typeMap.text;
    return `<article class="memory-card ${record.pinned ? 'pinned' : ''}" tabindex="0" role="button" data-clickable aria-label="打开记忆：${esc(record.title)}" onclick="openRecordDetail('${record.id}')"><div class="memory-card-top"><span class="memory-type">${getIcon(icon, 14)} ${type}</span><span class="memory-date">${record.pinned ? `<span class="pin-mark">${getIcon('pin', 13)}</span> ` : ''}${relativeTime(record.occurredAt)}</span></div><h3 class="memory-title">${esc(record.title)}</h3><p class="memory-excerpt">${esc(record.content || record.attachments.map(f => f.name).join('、') || '暂无文字描述')}</p><div class="memory-footer"><div class="memory-tags">${record.tags.slice(0, 3).map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}</div><span class="row small muted" style="gap:5px"><i class="mood-dot"></i>${esc(record.mood)}</span></div></article>`;
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
    overlay.innerHTML = `<div class="command-panel" role="dialog" aria-modal="true" aria-label="快捷搜索"><div class="command-input-row">${getIcon('search', 18)}<input class="command-input" id="command-input" placeholder="搜索记忆、页面，或直接记录此刻…" autocomplete="off"><span class="command-hint">ESC</span></div><div class="command-recents" id="command-recents"></div><div class="command-results" id="command-results"></div><div class="command-foot"><span>${getIcon('right', 11)} 选择</span><span>Enter 打开</span><span>Esc 关闭</span></div></div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('#command-input');
    const recents = overlay.querySelector('#command-recents');
    const results = overlay.querySelector('#command-results');
    let items = []; let active = 0;

    const close = () => { paletteOpen = false; overlay.remove(); document.removeEventListener('keydown', onKey, true); };
    const run = item => {
      if (!item) return;
      const query = input.value.trim();
      if (query) SG.rememberSearch(query);
      close();
      if (item.kind === 'record') window.openRecordDetail(item.id);
      else if (item.kind === 'action') window.openRecordEditor();
      else location.href = item.href;
    };
    const paintActive = () => {
      results.querySelectorAll('.command-item').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.index) === active));
      results.querySelector('.command-item.active')?.scrollIntoView({ block: 'nearest' });
    };
    const paintRecents = query => {
      const list = query ? [] : SG.searchHistoryList();
      recents.innerHTML = list.map(item => `<button class="command-recent" data-recent="${esc(item)}">${getIcon('clock', 11)}${esc(item)}</button>`).join('');
      recents.hidden = !list.length;
    };
    const suggestionsFor = query => {
      const seen = new Set([query.toLowerCase()]);
      return [...SG.searchHistoryList(), ...MemoryStore.tags().map(tag => tag.name)]
        .filter(word => {
          if (!word || seen.has(word.toLowerCase())) return false;
          seen.add(word.toLowerCase()); return true;
        }).slice(0, 5);
    };
    const paint = raw => {
      const query = raw.trim();
      const records = MemoryStore.listRecords(query ? { query } : {}).slice(0, query ? 6 : 4);
      const pages = PAGES.filter(page => !query || `${page[0]} ${page[3]}`.toLowerCase().includes(query.toLowerCase()));
      items = [
        ...records.map(record => ({
          kind: 'record', id: record.id, title: record.title, titleHTML: highlight(record.title, query), icon: (typeMap[record.type] || typeMap.text)[1],
          meta: `${formatDate(record.occurredAt)}${record.tags.length ? ' · ' + record.tags.slice(0, 2).join('、') : ''}`,
          group: query ? '相关记忆' : '最近的记忆'
        })),
        ...(query ? [] : [{ kind: 'action', title: '留下此刻（新建记忆）', meta: '快速记录', icon: 'plus', group: '操作' }]),
        ...pages.map(page => ({ kind: 'page', href: page[1], title: page[0], titleHTML: highlight(page[0], query), meta: '页面跳转', icon: page[2], group: '页面' }))
      ];
      active = 0;
      if (!items.length) {
        const suggestions = suggestionsFor(query);
        results.innerHTML = `<div class="command-empty">没有找到与「${esc(query)}」相关的记忆或页面。${suggestions.length ? `<div class="command-suggest"><span>试试</span>${suggestions.map(word => `<button class="command-suggest-item" data-suggest="${esc(word)}">${esc(word)}</button>`).join('')}</div>` : ''}</div>`;
        return;
      }
      let lastGroup = '';
      results.innerHTML = items.map((item, index) => {
        const header = item.group !== lastGroup ? `<div class="command-group">${item.group}</div>` : '';
        lastGroup = item.group;
        return `${header}<button class="command-item" data-index="${index}">${getIcon(item.icon, 16)}<span class="command-item-text"><span class="command-item-title">${item.titleHTML ?? esc(item.title)}</span><span class="command-item-meta">${esc(item.meta)}</span></span>${getIcon(item.kind === 'page' ? 'external' : 'right', 13)}</button>`;
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

    input.addEventListener('input', event => { paintRecents(event.target.value.trim()); paint(event.target.value); });
    recents.addEventListener('click', event => {
      const btn = event.target.closest('[data-recent]'); if (!btn) return;
      const value = btn.dataset.recent;
      input.value = value; paintRecents(value); paint(value); input.focus();
    });
    results.addEventListener('click', event => {
      const suggest = event.target.closest('[data-suggest]');
      if (suggest) {
        const value = suggest.dataset.suggest;
        input.value = value; paintRecents(value); paint(value); input.focus(); return;
      }
      const btn = event.target.closest('[data-index]'); if (btn) run(items[Number(btn.dataset.index)]);
    });
    results.addEventListener('mouseover', event => { const btn = event.target.closest('[data-index]'); if (btn) { active = Number(btn.dataset.index); paintActive(); } });
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', onKey, true);
    paintRecents('');
    paint('');
    input.focus();
  };

  let shellInitialized = false;
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function enhanceModals() {
    const stack = [];
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof Element) || !node.classList.contains('modal-overlay')) return;
          const dialog = node.querySelector('[role="dialog"]') || node.querySelector('.modal');
          if (!dialog) return;
          if (!dialog.hasAttribute('role')) dialog.setAttribute('role', 'dialog');
          dialog.setAttribute('aria-modal', 'true');
          if (!dialog.hasAttribute('aria-label') && !dialog.hasAttribute('aria-labelledby')) {
            const title = dialog.querySelector('.modal-title');
            if (title) { const id = `modal-title-${Date.now().toString(36)}`; title.id = id; dialog.setAttribute('aria-labelledby', id); }
          }
          dialog.setAttribute('tabindex', '-1');
          stack.push({ overlay: node, previous: document.activeElement });
          const target = dialog.querySelectorAll(FOCUSABLE)[0] || dialog;
          target.focus({ preventScroll: true });
        });
        mutation.removedNodes.forEach(node => {
          if (!(node instanceof Element) || !node.classList.contains('modal-overlay')) return;
          const index = stack.findIndex(item => item.overlay === node);
          if (index === -1) return;
          const [{ previous }] = stack.splice(index, 1);
          if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
        });
      });
    });
    observer.observe(document.body, { childList: true });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const top = stack[stack.length - 1];
      if (!top || !document.contains(top.overlay)) return;
      const dialog = top.overlay.querySelector('[role="dialog"]') || top.overlay.querySelector('.modal');
      if (!dialog) return;
      const focusables = [...dialog.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length > 0);
      if (!focusables.length) { event.preventDefault(); dialog.focus(); return; }
      const first = focusables[0]; const last = focusables[focusables.length - 1];
      const outside = !dialog.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || outside)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || outside)) { event.preventDefault(); first.focus(); }
    });
  }
  window.initShell = function () {
    const settings = MemoryStore.settings();
    document.body.classList.toggle('reduce-motion', settings.reduceMotion);
    if (shellInitialized) return;
    shellInitialized = true;
    const main = document.querySelector('.app-main');
    if (main && !main.id) { main.id = 'main-content'; main.setAttribute('tabindex', '-1'); }
    const setSidebar = open => {
      document.getElementById('sidebar')?.classList.toggle('open', open);
      document.getElementById('sidebar-overlay')?.classList.toggle('active', open);
      document.getElementById('mobile-menu-btn')?.setAttribute('aria-expanded', String(open));
    };
    document.addEventListener('click', event => {
      if (event.target.closest('[data-action="new-record"]')) openRecordEditor();
      if (event.target.closest('[data-action="open-search"]')) openCommandPalette();
      if (event.target.closest('#mobile-menu-btn')) setSidebar(true);
      if (event.target.id === 'sidebar-overlay') setSidebar(false);
      if (event.target.classList.contains('modal-overlay')) event.target.remove();
    });
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openCommandPalette(); return; }
      if (event.key === 'Enter' || event.key === ' ') {
        const card = event.target.closest?.('[data-clickable]');
        if (card && event.target === card) { event.preventDefault(); card.click(); return; }
      }
      if (event.key === 'Escape') {
        const overlays = document.querySelectorAll('.modal-overlay');
        if (overlays.length) overlays[overlays.length - 1].remove();
        else setSidebar(false);
      }
    });
    enhanceModals();
  };
  // 品牌开场动画：每个浏览器仅首次访问展示，可跳过；开启减少动效时不展示。
  function maybeShowIntro() {
    const markSeen = () => { try { localStorage.setItem('shiguang-intro-v2', '1'); } catch (error) {} };
    try { if (localStorage.getItem('shiguang-intro-v2') === '1') return; } catch (error) { return; }
    try {
      if (document.body.classList.contains('reduce-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { markSeen(); return; }
    } catch (error) { markSeen(); return; }
    const overlay = document.createElement('div');
    overlay.className = 'intro';
    overlay.setAttribute('role', 'presentation');
    overlay.setAttribute('aria-label', '拾光AI 品牌开场动画');
    overlay.innerHTML = `<button class="intro-skip" type="button">跳过</button><div class="intro-glow" aria-hidden="true"></div><div class="intro-orbit" aria-hidden="true"><i></i></div><div class="intro-cards" aria-hidden="true"><span></span><span></span><b></b></div><div class="intro-brand" aria-hidden="true"><strong>拾光AI</strong><em>MEMORY, MADE VISIBLE</em></div>`;
    document.body.appendChild(overlay);
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      markSeen();
      overlay.classList.add('done');
      overlay.querySelector('.intro-skip').remove();
      setTimeout(() => overlay.remove(), 800);
    };
    overlay.querySelector('.intro-skip').addEventListener('click', finish);
    setTimeout(finish, 4300);
  }
  document.addEventListener('DOMContentLoaded', initShell);
  document.addEventListener('DOMContentLoaded', () => { maybeShowIntro(); });

  window.showToast = function (message, type = 'info', duration = 3200, action = null) {
    let stack = document.querySelector('.toast-stack');
    if (!stack) { stack = document.createElement('div'); stack.className = 'toast-stack'; document.body.appendChild(stack); }
    const toast = document.createElement('div'); toast.className = `toast ${type}`;
    toast.innerHTML = `${getIcon(type === 'error' ? 'alert' : type === 'success' ? 'check' : 'info', 17)}<span>${esc(message)}</span>${action ? `<button class="toast-action" type="button">${esc(action.label)}</button>` : ''}`;
    stack.appendChild(toast);
    if (action) {
      toast.querySelector('.toast-action').onclick = () => { action.onClick?.(); toast.remove(); };
    }
    setTimeout(() => toast.remove(), duration);
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
  window.openLightbox = function (images, start = 0) {
    const list = (images || []).filter(item => item && (item.dataUrl || item.url));
    if (!list.length) return;
    let index = Math.min(Math.max(0, Number(start) || 0), list.length - 1);
    const previousFocus = document.activeElement;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `<div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="图片预览"><div class="lightbox-bar"><span class="lightbox-name"></span><span class="lightbox-count"></span><div class="row"><button type="button" class="btn btn-ghost btn-icon lightbox-btn" data-lightbox-download aria-label="下载图片" title="下载">${getIcon('download', 18)}</button><button type="button" class="btn btn-ghost btn-icon lightbox-btn" data-lightbox-close aria-label="关闭预览" title="关闭">${getIcon('x', 18)}</button></div></div><div class="lightbox-stage"><button type="button" class="lightbox-nav prev" data-lightbox-prev aria-label="上一张">${getIcon('left', 20)}</button><img class="lightbox-image" alt=""><button type="button" class="lightbox-nav next" data-lightbox-next aria-label="下一张">${getIcon('right', 20)}</button></div></div>`;
    document.body.appendChild(overlay);
    const image = overlay.querySelector('.lightbox-image');
    const nameBox = overlay.querySelector('.lightbox-name');
    const countBox = overlay.querySelector('.lightbox-count');
    const prevBtn = overlay.querySelector('[data-lightbox-prev]');
    const nextBtn = overlay.querySelector('[data-lightbox-next]');
    const paint = () => {
      const item = list[index];
      image.src = item.dataUrl || item.url;
      image.alt = item.name || '记忆图片';
      nameBox.textContent = item.name || '记忆图片';
      countBox.textContent = `${index + 1} / ${list.length}`;
      const single = list.length < 2;
      prevBtn.hidden = single; nextBtn.hidden = single;
    };
    const step = delta => { index = (index + delta + list.length) % list.length; paint(); };
    const close = () => {
      window.removeEventListener('keydown', onKey, true);
      overlay.remove();
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus({ preventScroll: true });
    };
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); event.stopPropagation(); step(-1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); event.stopPropagation(); step(1); }
    };
    overlay.querySelector('[data-lightbox-close]').onclick = close;
    overlay.querySelector('[data-lightbox-download]').onclick = () => { const item = list[index]; SG.download(item.name || '记忆图片', item.dataUrl || item.url); };
    prevBtn.onclick = () => step(-1);
    nextBtn.onclick = () => step(1);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    window.addEventListener('keydown', onKey, true);
    paint();
    overlay.querySelector('[data-lightbox-close]').focus({ preventScroll: true });
  };
  window.openRecordDetail = function (id) {
    const record = MemoryStore.getRecord(id); if (!record) { showToast('这条记忆不存在或已删除。', 'error'); return; }
    const [type, icon] = typeMap[record.type] || typeMap.text;
    const related = MemoryStore.relatedRecords(id, 3);
    // 连续浏览：按时间倒序取相邻记录，← 看更早一条，→ 看更新一条。
    const timeline = MemoryStore.listRecords().sort((a, b) => b.occurredAt - a.occurredAt);
    const index = timeline.findIndex(item => item.id === id);
    const earlier = index >= 0 && index < timeline.length - 1 ? timeline[index + 1] : null;
    const later = index > 0 ? timeline[index - 1] : null;
    const navHTML = timeline.length > 1 ? `<div class="detail-nav">
      <button class="btn btn-ghost btn-icon btn-sm" id="detail-prev" title="上一条（更早，←）" aria-label="上一条记忆" ${earlier ? '' : 'disabled'}>${getIcon('left', 15)}</button>
      <span class="detail-position">${index >= 0 ? index + 1 : '-'} / ${timeline.length}</span>
      <button class="btn btn-ghost btn-icon btn-sm" id="detail-next" title="下一条（更新，→）" aria-label="下一条记忆" ${later ? '' : 'disabled'}>${getIcon('right', 15)}</button>
    </div>` : '';
    const relatedHTML = related.length ? `<div class="related-block"><div class="related-title">${getIcon('link', 14)} 相关记忆</div><div class="related-list">${related.map(item => `<button class="related-item" data-related="${item.id}"><span class="related-item-title">${esc(item.title)}</span><span class="related-item-meta">${formatDate(item.occurredAt, false)} · ${item.sharedTags.length ? `共同标签：${item.sharedTags.map(esc).join('、')}` : '内容相近'}</span></button>`).join('')}</div></div>` : '';
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-lg" role="dialog" aria-modal="true"><div class="modal-header"><div><span class="memory-type">${getIcon(icon, 14)} ${type}</span><h3 class="modal-title" style="margin-top:7px">${esc(record.title)}</h3></div><div class="row">${navHTML}<button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div></div><div class="modal-body"><div class="detail-meta"><span>${getIcon('calendar', 13)} ${formatDate(record.occurredAt)} ${formatTime(record.occurredAt)}</span><span>${getIcon('smile', 13)} ${esc(record.mood)}</span><span>${esc(record.source)}</span></div><div class="memory-tags" style="margin-bottom:18px">${record.tags.map(tag => `<span class="tag tag-teal">${esc(tag)}</span>`).join('')}</div><div class="detail-content">${renderMarkdown(record.content || '这条记忆只有附件，没有文字描述。')}</div>${record.attachments.map(attachmentHTML).join('')}${relatedHTML}</div><div class="modal-footer detail-footer" style="justify-content:space-between"><div class="row"><button class="btn btn-ghost btn-sm" id="detail-pin">${getIcon('pin', 15)} ${record.pinned ? '取消置顶' : '置顶'}</button>${canSpeak() ? `<button class="btn btn-ghost btn-sm" id="detail-read" type="button" aria-pressed="false">${getIcon('speaker', 15)} 朗读</button>` : ''}<button class="btn btn-ghost btn-sm" id="detail-export">${getIcon('image', 15)} 长图</button><button class="btn btn-ghost btn-sm" id="detail-delete">${getIcon('trash', 15)} 删除</button></div><div class="row"><button class="btn btn-secondary btn-sm" id="detail-share">${getIcon('image', 15)} 分享卡片</button><button class="btn btn-dark" id="detail-edit">${getIcon('edit', 15)} 编辑记忆</button></div></div></div>`;
    document.body.appendChild(overlay);
    const imageAttachments = record.attachments.filter(file => file.type === 'image' && (file.dataUrl || file.url));
    if (imageAttachments.length) {
      overlay.querySelectorAll('.attachment-preview img').forEach((image, position) => {
        const open = () => openLightbox(imageAttachments, position);
        image.classList.add('zoomable');
        image.setAttribute('role', 'button');
        image.setAttribute('tabindex', '0');
        image.setAttribute('aria-label', `放大查看 ${imageAttachments[position]?.name || '图片'}`);
        image.addEventListener('click', open);
        image.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
      });
    }
    const goTo = target => { if (!target) return; overlay.remove(); openRecordDetail(target.id); };
    const onNavKey = event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (!document.body.contains(overlay)) { document.removeEventListener('keydown', onNavKey, true); return; }
      if (event.target.closest && event.target.closest('input, textarea, audio, video')) return;
      event.preventDefault();
      goTo(event.key === 'ArrowLeft' ? earlier : later);
    };
    document.addEventListener('keydown', onNavKey, true);
    overlay.querySelector('[data-close]').onclick = () => { document.removeEventListener('keydown', onNavKey, true); overlay.remove(); };
    overlay.querySelector('#detail-prev')?.addEventListener('click', () => goTo(earlier));
    overlay.querySelector('#detail-next')?.addEventListener('click', () => goTo(later));
    overlay.querySelectorAll('[data-related]').forEach(btn => btn.onclick = () => { document.removeEventListener('keydown', onNavKey, true); const nextId = btn.dataset.related; overlay.remove(); openRecordDetail(nextId); });
    overlay.querySelector('#detail-share').onclick = () => openShareCard(id);
    overlay.querySelector('#detail-export').onclick = () => { document.removeEventListener('keydown', onNavKey, true); overlay.remove(); openMemoryLongImage(id); };
    overlay.querySelector('#detail-edit').onclick = () => { document.removeEventListener('keydown', onNavKey, true); overlay.remove(); openRecordEditor(id); };
    overlay.querySelector('#detail-pin').onclick = () => { document.removeEventListener('keydown', onNavKey, true); MemoryStore.togglePin(id); overlay.remove(); showToast('置顶状态已更新', 'success'); };
    const readButton = overlay.querySelector('#detail-read');
    if (readButton) {
      let queued = null;
      const finish = () => {
        if (!speech.current || speech.current.button !== readButton) return;
        speech.current = null;
        setReadButton(readButton, false);
      };
      readButton.onclick = () => {
        if (speech.current && speech.current.button === readButton) { stopReading(); return; }
        stopReading();
        const text = [record.title, speakableText(record.content)].filter(Boolean).join('。');
        if (!text) { showToast('这条记忆没有可朗读的文字。', 'info'); return; }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 1;
        utterance.onend = finish;
        utterance.onerror = finish;
        speech.current = { button: readButton, utterance };
        setReadButton(readButton, true);
        // 刚 cancel 完立刻 speak，部分 Chrome 版本会丢弃新的朗读，稍等一拍更稳。
        queued = setTimeout(() => {
          if (!speech.current || speech.current.utterance !== utterance) return;
          try { speech.synth.speak(utterance); } catch (error) { stopReading(); }
        }, 60);
      };
      // 右上角关闭、点遮罩、按 Esc、切换到相邻记忆都会移除弹窗，这里统一收尾。
      const watcher = new MutationObserver(() => {
        if (document.body.contains(overlay)) return;
        watcher.disconnect();
        if (queued) clearTimeout(queued);
        if (speech.current && speech.current.button === readButton) stopReading();
      });
      watcher.observe(document.body, { childList: true });
    }
    overlay.querySelector('#detail-delete').onclick = () => {
      document.removeEventListener('keydown', onNavKey, true);
      overlay.remove();
      MemoryStore.deleteRecord(id);
      showToast(`「${record.title}」已移到回收站`, 'success', 5200, {
        label: '撤销',
        onClick: () => { MemoryStore.restoreRecord(id); showToast('已恢复这条记忆', 'success'); }
      });
    };
  };

  // 时间胶囊详情：封存期间只展示标题与日期，内容完全不渲染，避免从 DOM 泄露。
  window.openCapsule = function (id) {
    const capsule = MemoryStore.getCapsule(id);
    if (!capsule) { showToast('这枚时间胶囊不存在或已经开启。', 'error'); return; }
    const days = Math.max(1, Math.ceil((Number(capsule.unlockAt) - Date.now()) / 86400000));
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-sm capsule-seal" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">TIME CAPSULE</div><h3 class="modal-title">一枚沉睡的时间胶囊</h3></div><button class="btn btn-ghost btn-icon" data-close aria-label="关闭">${getIcon('x')}</button></div><div class="modal-body"><div class="seal-lock">${getIcon('lock', 26)}</div><h4 class="seal-title">${esc(capsule.title)}</h4><p class="seal-days"><strong>${days}</strong> 天后开启</p><div class="seal-meta"><span>${getIcon('calendar', 13)} 写于 ${formatDate(capsule.sealedAt || capsule.createdAt)}</span><span>${getIcon('clock', 13)} 开启 ${formatDate(capsule.unlockAt)}</span></div><p class="seal-hint">封存期间，这段内容不会出现在搜索、洞察、年度回顾与导出中。到期后会自动变成一条普通记忆。</p></div><div class="modal-footer seal-footer"><button class="btn btn-ghost btn-sm" id="capsule-delete">${getIcon('trash', 15)} 永久删除</button><div class="row"><button class="btn btn-secondary btn-sm" id="capsule-open">提前开启</button><button class="btn btn-dark" data-close>先让它睡着</button></div></div></div>`;
    document.body.appendChild(overlay);
    const onEsc = event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } };
    const close = () => { document.removeEventListener('keydown', onEsc, true); overlay.remove(); };
    document.addEventListener('keydown', onEsc, true);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = close);
    overlay.querySelector('#capsule-open').onclick = () => {
      showConfirm({
        title: '现在打开这枚胶囊？', message: '打开后会立即变成普通记忆，和其他记录一样出现在搜索与时光轴中。', confirmText: '现在开启', danger: false,
        onConfirm: () => {
          const record = MemoryStore.openCapsule(id);
          close();
          if (record) { showToast('胶囊已开启，欢迎回来', 'success'); openRecordDetail(record.id); }
        }
      });
    };
    overlay.querySelector('#capsule-delete').onclick = () => {
      showConfirm({
        title: '永久删除这枚胶囊？', message: '封存的内容会被直接删除，不会进入回收站，也无法恢复。', confirmText: '永久删除',
        onConfirm: () => { MemoryStore.deleteCapsule(id); close(); showToast('这枚胶囊已删除', 'success'); }
      });
    };
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
    const avatarSrc = MemoryStore.settings().avatar;
    const draw = (avatarImg) => {
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
    if (avatarImg) {
      ctx.save();
      ctx.beginPath(); ctx.arc(left + 24, H - 101, 24, 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(avatarImg, left, H - 125, 48, 48);
      ctx.restore();
      ctx.strokeStyle = '#dedbd2'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(left + 24, H - 101, 24, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#89908a'; ctx.font = `500 20px ${sans}`; ctx.fillText('拾光AI · 本地记忆档案', avatarImg ? left + 60 : left, H - 94);

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
    if (!avatarSrc) { draw(null); return; }
    const avatarImg = new Image();
    avatarImg.onload = () => draw(avatarImg);
    avatarImg.onerror = () => draw(null);
    avatarImg.src = avatarSrc;
  };

  /* 记忆导出：长图、打印 / PDF 与批量导出中心 */
  const LONG_WIDTH = 1080;
  const LONG_LEFT = 96;
  const LONG_CONTENT = LONG_WIDTH - LONG_LEFT * 2;
  const LONG_SERIF = '"Noto Serif SC", "Songti SC", SimSun, serif';
  const LONG_SANS = 'Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
  const MAX_LONG_IMAGE_RECORDS = 12;

  function longTextLines(ctx, text, maxWidth, maxLines) {
    const source = String(text ?? '').replace(/\r/g, '');
    const lines = [];
    source.split('\n').forEach(paragraph => {
      if (lines.length >= maxLines) return;
      const chars = Array.from(paragraph.trim());
      if (!chars.length) return;
      let line = '';
      chars.forEach(char => {
        if (ctx.measureText(line + char).width > maxWidth && line) { lines.push(line); line = char; }
        else line += char;
      });
      if (line) lines.push(line);
    });
    const flat = source.replace(/\s/g, '');
    if (!lines.length) return ['（无正文）'];
    if (lines.length > maxLines) lines.length = maxLines;
    if (flat.length > lines.join('').length) {
      const last = lines[lines.length - 1];
      lines[lines.length - 1] = `${last.slice(0, Math.max(1, last.length - 1))}…`;
    }
    return lines;
  }

  function openLongImagePreview({ url, blob, filename, count, label }) {
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-share" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">LONG IMAGE</div><h3 class="modal-title">记忆长图预览</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><div class="share-preview"><img src="${url}" alt="记忆长图预览"></div><p class="share-hint">${esc(label)} · 共 ${count} 条 · 1080px 宽长图，可直接保存或分享。</p></div><div class="modal-footer"><button class="btn btn-secondary" data-close>关闭</button><button class="btn btn-primary" id="long-download">${getIcon('download', 16)} 下载长图</button></div></div>`;
    document.body.appendChild(overlay);
    const close = () => { window.removeEventListener('keydown', onKey); overlay.remove(); URL.revokeObjectURL(url); };
    const onKey = event => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    overlay.querySelector('#long-download').onclick = () => {
      SG.download(filename, blob);
      showToast('长图已开始下载', 'success');
    };
  }

  function exportLongImage(records, label) {
    if (!records.length) { showToast('当前范围没有可导出的记忆。', 'error'); return; }
    const single = records.length === 1;
    const bodyLimit = single ? 160 : 14;
    const measure = document.createElement('canvas').getContext('2d');
    const blocks = records.map(record => {
      const [typeName] = typeMap[record.type] || typeMap.text;
      const date = new Date(record.occurredAt);
      measure.font = `700 46px ${LONG_SERIF}`;
      const titleLines = longTextLines(measure, record.title, LONG_CONTENT, 3);
      measure.font = `400 27px ${LONG_SERIF}`;
      const bodyLines = longTextLines(measure, record.content || '这条记忆只有附件，没有文字描述。', LONG_CONTENT, bodyLimit);
      const imageCount = record.attachments.filter(file => file.type === 'image').length;
      const height = 40 + titleLines.length * 62 + 24 + bodyLines.length * 50 + (record.tags.length ? 54 : 0) + (record.attachments.length ? 34 : 0) + 58;
      return { record, typeName, date, titleLines, bodyLines, imageCount, height };
    });
    const headerHeight = 292;
    const footerHeight = 168;
    const totalHeight = Math.min(32000, headerHeight + blocks.reduce((sum, block) => sum + block.height, 0) + footerHeight);
    const canvas = document.createElement('canvas');
    canvas.width = LONG_WIDTH; canvas.height = totalHeight;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f6f3ed'; ctx.fillRect(0, 0, LONG_WIDTH, totalHeight);
    ctx.strokeStyle = '#dedbd2'; ctx.lineWidth = 2; ctx.strokeRect(56, 56, LONG_WIDTH - 112, totalHeight - 112);
    ctx.strokeStyle = 'rgba(231,111,81,.12)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(LONG_WIDTH - 84, 132, 96, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(LONG_WIDTH - 84, 132, 140, 0, Math.PI * 2); ctx.stroke();

    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e76f51'; ctx.beginPath(); ctx.arc(LONG_LEFT + 9, 128, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1e2623'; ctx.font = `700 30px ${LONG_SERIF}`; ctx.fillText('拾光AI', LONG_LEFT + 32, 140);
    ctx.fillStyle = '#89908a'; ctx.font = `600 15px ${LONG_SANS}`; ctx.textAlign = 'right'; ctx.fillText('MEMORY ARCHIVE', LONG_WIDTH - LONG_LEFT, 138); ctx.textAlign = 'left';
    ctx.fillStyle = '#dedbd2'; ctx.fillRect(LONG_LEFT, 178, LONG_CONTENT, 1);
    ctx.fillStyle = '#2a6f6a'; ctx.font = `600 24px ${LONG_SANS}`; ctx.fillText(label, LONG_LEFT, 234);
    ctx.fillStyle = '#89908a'; ctx.font = `500 18px ${LONG_SANS}`; ctx.fillText(`共 ${records.length} 条 · ${new Date().toLocaleDateString('zh-CN')} 导出`, LONG_LEFT, 266);

    let y = headerHeight;
    blocks.forEach(block => {
      const { record, typeName, date } = block;
      ctx.fillStyle = '#2a6f6a'; ctx.font = `600 23px ${LONG_SANS}`;
      ctx.fillText(`${typeName} · ${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日 · ${record.mood}`, LONG_LEFT, y + 24);
      y += 40;
      ctx.fillStyle = '#1e2623'; ctx.font = `700 46px ${LONG_SERIF}`;
      block.titleLines.forEach(line => { ctx.fillText(line, LONG_LEFT, y + 40); y += 62; });
      y += 24;
      ctx.fillStyle = '#53605a'; ctx.font = `400 27px ${LONG_SERIF}`;
      block.bodyLines.forEach(line => { ctx.fillText(line, LONG_LEFT, y + 32); y += 50; });
      if (record.tags.length) {
        let tagX = LONG_LEFT;
        ctx.font = `600 21px ${LONG_SANS}`;
        record.tags.slice(0, 6).forEach(tag => {
          const chipWidth = ctx.measureText(tag).width + 36;
          if (tagX + chipWidth > LONG_WIDTH - LONG_LEFT) return;
          ctx.fillStyle = '#dfece8'; canvasRoundRect(ctx, tagX, y + 6, chipWidth, 38, 19); ctx.fill();
          ctx.fillStyle = '#2a6f6a'; ctx.fillText(tag, tagX + 18, y + 31);
          tagX += chipWidth + 10;
        });
        y += 54;
      }
      if (record.attachments.length) {
        const text = `附件 ${record.attachments.length} 项${block.imageCount ? ` · 含 ${block.imageCount} 张图片` : ''}`;
        ctx.fillStyle = '#89908a'; ctx.font = `500 20px ${LONG_SANS}`;
        ctx.fillText(text, LONG_LEFT, y + 20);
        y += 34;
      }
      ctx.fillStyle = '#e4e0d6'; ctx.fillRect(LONG_LEFT, y + 20, LONG_CONTENT, 1);
      y += 58;
    });

    const footY = totalHeight - 118;
    ctx.fillStyle = '#dedbd2'; ctx.fillRect(LONG_LEFT, footY - 46, LONG_CONTENT, 1);
    ctx.fillStyle = '#1e2623'; ctx.font = `700 26px ${LONG_SERIF}`; ctx.fillText('记录，是对时间最温柔的抵抗。', LONG_LEFT, footY);
    ctx.fillStyle = '#89908a'; ctx.font = `500 19px ${LONG_SANS}`; ctx.fillText('拾光AI · 本地记忆档案', LONG_LEFT, footY + 40);

    const stamp = new Date().toISOString().slice(0, 10);
    const safeTitle = String(records[0].title || '').replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 30) || '记忆';
    const filename = single
      ? `拾光AI-${safeTitle}-${new Date(records[0].occurredAt).toISOString().slice(0, 10)}.png`
      : `拾光AI-记忆长图-${records.length}条-${stamp}.png`;
    canvas.toBlob(blob => {
      if (!blob) { showToast('长图生成失败，请减少导出条数后重试。', 'error'); return; }
      openLongImagePreview({ url: URL.createObjectURL(blob), blob, filename, count: records.length, label });
    }, 'image/png');
  }

  window.openMemoryLongImage = function (id) {
    const record = MemoryStore.getRecord(id);
    if (!record) { showToast('这条记忆不存在或已删除。', 'error'); return; }
    exportLongImage([record], `单条记忆 · ${formatDate(record.occurredAt)}`);
  };

  function printMemoryReport(records, label) {
    if (!records.length) { showToast('当前范围没有可导出的记忆。', 'error'); return; }
    const items = records.map(record => {
      const [typeName] = typeMap[record.type] || typeMap.text;
      const paragraphs = String(record.content || '').trim()
        .split(/\n+/).filter(Boolean)
        .map(line => `<p>${esc(line)}</p>`).join('') || '<p>这条记忆只有附件，没有文字描述。</p>';
      const tags = record.tags.length ? `<div class="tags">${record.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>` : '';
      const files = record.attachments.length ? `<p class="files">附件：${record.attachments.map(file => esc(file.name)).join('、')}</p>` : '';
      return `<article><div class="meta">${esc(typeName)} · ${esc(formatDate(record.occurredAt))} ${esc(formatTime(record.occurredAt))} · ${esc(record.mood)}</div><h2>${esc(record.title)}</h2><div class="body">${paragraphs}</div>${tags}${files}</article>`;
    }).join('');
    const doc = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>拾光AI · 记忆档案</title><style>
      @page { size: A4; margin: 20mm 16mm; }
      * { box-sizing: border-box; }
      body { margin: 0; color: #1e2623; background: #fff; font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 12pt; line-height: 1.75; }
      header { border-bottom: 2px solid #1e2623; padding-bottom: 14px; margin-bottom: 26px; }
      .brand { display: flex; align-items: center; gap: 8px; font-size: 15pt; font-weight: 700; letter-spacing: .04em; }
      .dot { width: 10px; height: 10px; border-radius: 50%; background: #e76f51; }
      .label { margin-top: 10px; color: #89908a; font-size: 8pt; letter-spacing: .22em; }
      h1 { margin: 8px 0 6px; font-family: "Noto Serif SC", "Songti SC", SimSun, serif; font-size: 24pt; }
      .sub { margin: 0; color: #53605a; font-size: 10pt; }
      article { border-bottom: 1px solid #dedbd2; padding-bottom: 18px; margin-bottom: 22px; break-inside: avoid; page-break-inside: avoid; }
      .meta { color: #2a6f6a; font-size: 9.5pt; font-weight: 600; }
      h2 { margin: 8px 0 10px; font-family: "Noto Serif SC", "Songti SC", SimSun, serif; font-size: 16pt; line-height: 1.4; }
      .body p { margin: 0 0 8px; white-space: pre-wrap; word-break: break-word; }
      .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .tags span { padding: 2px 10px; border: 1px solid #bcd7d0; border-radius: 99px; color: #2a6f6a; font-size: 8.5pt; }
      .files { margin: 8px 0 0; color: #89908a; font-size: 9pt; }
      footer { margin-top: 26px; padding-top: 12px; border-top: 1px solid #dedbd2; color: #89908a; font-size: 9pt; text-align: center; }
    </style></head><body><header><div class="brand"><span class="dot"></span>拾光AI</div><div class="label">MEMORY ARCHIVE</div><h1>我的记忆档案</h1><p class="sub">${esc(label)} · 共 ${records.length} 条 · 导出于 ${esc(new Date().toLocaleString('zh-CN'))}</p></header>${items}<footer>拾光AI · 本地记忆档案 · 记录，是对时间最温柔的抵抗。</footer></body></html>`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('tabindex', '-1');
    iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    document.body.appendChild(iframe);
    const frameWindow = iframe.contentWindow;
    if (!frameWindow) {
      iframe.remove();
      showToast('当前浏览器无法创建打印视图，请换用桌面浏览器重试。', 'error');
      return;
    }
    const frameDoc = frameWindow.document;
    frameDoc.open();
    frameDoc.write(doc);
    frameDoc.close();
    window.setTimeout(() => {
      try {
        frameWindow.focus();
        frameWindow.print();
      } catch (error) {
        showToast('打印启动失败，请检查浏览器的打印权限。', 'error');
      }
      window.setTimeout(() => iframe.remove(), 60000);
    }, 320);
  }

  window.openExportCenter = function () {
    const tags = MemoryStore.tags();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const toDateValue = value => {
      const date = new Date(Number(value));
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    const parseDate = (value, endOfDay) => {
      if (!value) return undefined;
      const date = new Date(`${value}T00:00:00`);
      if (Number.isNaN(date.getTime())) return undefined;
      if (endOfDay) date.setHours(23, 59, 59, 999);
      return date.getTime();
    };
    const stamp = () => new Date().toISOString().slice(0, 10);
    const state = {
      scope: 'all',
      tag: tags[0]?.name || '',
      from: toDateValue(today.getTime() - 29 * 86400000),
      to: toDateValue(today.getTime()),
      format: 'image'
    };
    const formats = [
      { key: 'image', icon: 'image', title: '长图 PNG', desc: '1080px 宽长图，适合保存与分享' },
      { key: 'pdf', icon: 'printer', title: '打印 / PDF', desc: 'A4 排版，可打印或另存为 PDF' },
      { key: 'markdown', icon: 'file', title: 'Markdown', desc: '纯文本归档，保留标题、正文与标签' },
      { key: 'json', icon: 'download', title: 'JSON 备份', desc: '完整数据备份，不受范围限制，不含密钥' }
    ];
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-lg export-modal" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">EXPORT MEMORIES</div><h3 class="modal-title">导出记忆</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body">
      <section class="export-section">
        <div class="export-label">导出范围</div>
        <div class="filter-pills" id="export-scopes">
          <button class="pill" data-scope="all">全部记忆</button>
          <button class="pill" data-scope="tag" ${tags.length ? '' : 'disabled'}>按标签</button>
          <button class="pill" data-scope="range">按日期</button>
        </div>
        <div class="export-sub" id="export-tag" hidden>${tags.length ? `<div class="filter-pills">${tags.slice(0, 12).map((tag, index) => `<button class="pill ${index === 0 ? 'active' : ''}" data-tag="${esc(tag.name)}">${esc(tag.name)} · ${tag.count}</button>`).join('')}</div>` : '<p class="muted small">还没有任何标签，先给记忆添加标签再来。</p>'}</div>
        <div class="export-sub" id="export-range" hidden>
          <div class="row wrap export-dates">
            <label class="export-date"><span>开始日期</span><input class="input" type="date" id="export-from" value="${state.from}" max="${state.to}"></label>
            <label class="export-date"><span>结束日期</span><input class="input" type="date" id="export-to" value="${state.to}"></label>
          </div>
          <div class="row wrap export-quick"><button class="btn btn-ghost btn-sm" data-range="7">近 7 天</button><button class="btn btn-ghost btn-sm" data-range="30">近 30 天</button><button class="btn btn-ghost btn-sm" data-range="year">今年</button></div>
        </div>
      </section>
      <section class="export-section">
        <div class="export-label">导出格式</div>
        <div class="export-formats" id="export-formats">${formats.map(item => `<button class="export-format ${item.key === state.format ? 'active' : ''}" data-format="${item.key}">${getIcon(item.icon, 18)}<div class="export-format-text"><strong>${item.title}</strong><span>${item.desc}</span></div></button>`).join('')}</div>
      </section>
      <div class="export-summary" id="export-summary"></div>
    </div><div class="modal-footer"><span class="export-note">数据只在本地生成，不会上传。</span><button class="btn btn-secondary" data-close>取消</button><button class="btn btn-primary" id="export-run">${getIcon('download', 16)} 生成导出</button></div></div>`;
    document.body.appendChild(overlay);

    const scopes = overlay.querySelector('#export-scopes');
    const tagWrap = overlay.querySelector('#export-tag');
    const rangeWrap = overlay.querySelector('#export-range');
    const fromInput = overlay.querySelector('#export-from');
    const toInput = overlay.querySelector('#export-to');
    const summary = overlay.querySelector('#export-summary');
    const runBtn = overlay.querySelector('#export-run');

    const close = () => overlay.remove();
    const scopeLabel = () => {
      if (state.scope === 'tag') return state.tag ? `标签「${state.tag}」` : '按标签';
      if (state.scope === 'range') return `${state.from} 至 ${state.to}`;
      return '全部记忆';
    };
    const currentRecords = () => {
      if (state.scope === 'tag' && state.tag) return MemoryStore.listRecords({ tag: state.tag }).sort((a, b) => a.occurredAt - b.occurredAt);
      if (state.scope === 'range') {
        const from = parseDate(state.from);
        const to = parseDate(state.to, true);
        if (from !== undefined && to !== undefined && from > to) return [];
        return MemoryStore.listRecords({ from, to }).sort((a, b) => a.occurredAt - b.occurredAt);
      }
      return MemoryStore.listRecords().sort((a, b) => a.occurredAt - b.occurredAt);
    };

    function paint() {
      scopes.querySelectorAll('[data-scope]').forEach(btn => btn.classList.toggle('active', btn.dataset.scope === state.scope));
      tagWrap.hidden = state.scope !== 'tag';
      rangeWrap.hidden = state.scope !== 'range';
      overlay.querySelectorAll('[data-tag]').forEach(btn => btn.classList.toggle('active', btn.dataset.tag === state.tag));
      overlay.querySelectorAll('[data-format]').forEach(btn => btn.classList.toggle('active', btn.dataset.format === state.format));
      const count = currentRecords().length;
      if (state.format === 'json') {
        summary.textContent = `将导出完整备份，共 ${MemoryStore.listRecords().length} 条记忆，不受上方范围限制；文件不含 API 密钥。`;
        summary.classList.remove('warn');
        return;
      }
      if (!count) {
        summary.textContent = '当前范围还没有记忆，换个范围再试试。';
        summary.classList.remove('warn');
        return;
      }
      const tooMany = state.format === 'image' && count > MAX_LONG_IMAGE_RECORDS;
      summary.textContent = `${scopeLabel()} · 共 ${count} 条记忆${tooMany ? ` · 长图一次最多 ${MAX_LONG_IMAGE_RECORDS} 条，请缩小范围或改用 PDF` : ''}。`;
      summary.classList.toggle('warn', tooMany);
    }

    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    scopes.addEventListener('click', event => {
      const btn = event.target.closest('[data-scope]'); if (!btn || btn.disabled) return;
      state.scope = btn.dataset.scope; paint();
    });
    tagWrap.addEventListener('click', event => {
      const btn = event.target.closest('[data-tag]'); if (!btn) return;
      state.tag = btn.dataset.tag; paint();
    });
    fromInput.addEventListener('change', () => { state.from = fromInput.value; paint(); });
    toInput.addEventListener('change', () => { state.to = toInput.value; paint(); });
    overlay.querySelectorAll('[data-range]').forEach(btn => btn.onclick = () => {
      const key = btn.dataset.range;
      const now = new Date(); now.setHours(0, 0, 0, 0);
      if (key === 'year') {
        state.from = toDateValue(new Date(now.getFullYear(), 0, 1).getTime());
        state.to = toDateValue(now.getTime());
      } else {
        state.from = toDateValue(now.getTime() - (Number(key) - 1) * 86400000);
        state.to = toDateValue(now.getTime());
      }
      fromInput.value = state.from; toInput.value = state.to;
      paint();
    });
    overlay.querySelector('#export-formats').addEventListener('click', event => {
      const btn = event.target.closest('[data-format]'); if (!btn) return;
      state.format = btn.dataset.format; paint();
    });
    runBtn.onclick = () => {
      if (state.format === 'json') {
        close();
        SG.download(`拾光AI-备份-${stamp()}.json`, MemoryStore.exportJSON());
        showToast('已导出 JSON 备份（不含密钥）', 'success');
        return;
      }
      const records = currentRecords();
      if (!records.length) { showToast('当前范围没有可导出的记忆。', 'error'); return; }
      if (state.format === 'image' && records.length > MAX_LONG_IMAGE_RECORDS) { showToast(`长图一次最多 ${MAX_LONG_IMAGE_RECORDS} 条，请缩小范围或改用 PDF。`, 'error'); return; }
      if (state.format === 'markdown') {
        close();
        SG.download(`拾光AI-记忆-${stamp()}.md`, MemoryStore.exportMarkdown(records));
        showToast(`已导出 ${records.length} 条记忆的 Markdown`, 'success');
        return;
      }
      if (state.format === 'pdf') { close(); printMemoryReport(records, scopeLabel()); return; }
      close();
      exportLongImage(records, scopeLabel());
    };
    paint();
  };

  window.openAnnualPoster = function (year) {
    const data = MemoryStore.annual(year);
    if (!data.total) { showToast(`${data.year} 年还没有记忆，先留下一条再来生成年度长图。`, 'error'); return; }
    const W = 1080; const H = 1860; const LEFT = 96; const CONTENT = W - LEFT * 2;
    const SERIF = LONG_SERIF; const SANS = LONG_SANS;
    const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const fmt = timestamp => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };
    const sectionTitle = (text, y) => {
      ctx.fillStyle = '#d6a84b'; ctx.fillRect(LEFT, y - 18, 24, 3);
      ctx.fillStyle = '#1e2623'; ctx.font = `700 28px ${SERIF}`; ctx.textAlign = 'left'; ctx.fillText(text, LEFT, y + 12);
    };

    ctx.fillStyle = '#f6f3ed'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#dedbd2'; ctx.lineWidth = 2; ctx.strokeRect(56, 56, W - 112, H - 112);
    ctx.strokeStyle = 'rgba(231,111,81,.12)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(W - 90, 190, 96, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(W - 90, 190, 138, 0, Math.PI * 2); ctx.stroke();

    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    ctx.fillStyle = '#e76f51'; ctx.beginPath(); ctx.arc(LEFT + 9, 128, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1e2623'; ctx.font = `700 30px ${SERIF}`; ctx.fillText('拾光AI', LEFT + 32, 140);
    ctx.fillStyle = '#89908a'; ctx.font = `600 15px ${SANS}`; ctx.textAlign = 'right'; ctx.fillText('YEAR IN MEMORY', W - LEFT, 138); ctx.textAlign = 'left';
    ctx.fillStyle = '#dedbd2'; ctx.fillRect(LEFT, 176, CONTENT, 1);

    ctx.fillStyle = '#1e2623'; ctx.font = `700 150px ${SERIF}`; ctx.fillText(String(data.year), LEFT - 4, 340);
    ctx.font = `700 40px ${SERIF}`; ctx.fillText(`这一年，你留下了 ${data.total} 条记忆。`, LEFT, 412);
    ctx.fillStyle = '#53605a'; ctx.font = `500 22px ${SANS}`;
    ctx.fillText(`${fmt(data.first.occurredAt)} — ${fmt(data.last.occurredAt)} · ${data.words} 个字 · ${data.activeDays} 天有记录`, LEFT, 456);

    ctx.fillStyle = '#efece3'; canvasRoundRect(ctx, LEFT, 500, CONTENT, 142, 18); ctx.fill();
    const stats = [['记录条数', data.total], ['记录天数', data.activeDays], ['写下字数', data.words], ['最长连续', `${data.longestStreak} 天`]];
    stats.forEach(([label, value], index) => {
      const center = LEFT + CONTENT / 8 + index * CONTENT / 4;
      if (index) { ctx.fillStyle = '#dedbd2'; ctx.fillRect(LEFT + index * CONTENT / 4, 528, 1, 86); }
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1e2623'; ctx.font = `700 42px ${SERIF}`; ctx.fillText(String(value), center, 572);
      ctx.fillStyle = '#89908a'; ctx.font = `500 18px ${SANS}`; ctx.fillText(label, center, 610);
    });
    ctx.textAlign = 'left';

    sectionTitle('月度轨迹', 712);
    const barBase = 986; const barMax = 196; const barWidth = 46; const gap = 26;
    const maxCount = Math.max(...data.months.map(month => month.count), 1);
    const chartStart = LEFT + (CONTENT - (12 * barWidth + 11 * gap)) / 2;
    data.months.forEach((month, index) => {
      const height = month.count ? Math.max(10, Math.round(month.count / maxCount * barMax)) : 4;
      const x = chartStart + index * (barWidth + gap);
      ctx.fillStyle = month.count ? (index === data.busiestMonth.month - 1 ? '#d6a84b' : '#2a6f6a') : '#e4e0d6';
      canvasRoundRect(ctx, x, barBase - height, barWidth, height, 6); ctx.fill();
      ctx.textAlign = 'center';
      if (month.count) { ctx.fillStyle = '#89908a'; ctx.font = `500 16px ${SANS}`; ctx.fillText(String(month.count), x + barWidth / 2, barBase - height - 12); }
      ctx.fillStyle = '#89908a'; ctx.font = `500 16px ${SANS}`; ctx.fillText(`${month.month}月`, x + barWidth / 2, barBase + 30);
    });
    ctx.textAlign = 'left';

    sectionTitle('年度关键词', 1104);
    if (!data.tags.length) { ctx.fillStyle = '#89908a'; ctx.font = `500 20px ${SANS}`; ctx.fillText('这一年的记忆还没有标签。', LEFT, 1160); }
    const drawChips = (items, startY, background, color) => {
      let x = LEFT; let y = startY;
      items.forEach(item => {
        const label = `${item.name} · ${item.count}`;
        ctx.font = `600 22px ${SANS}`;
        const width = ctx.measureText(label).width + 38;
        if (x + width > W - LEFT) { x = LEFT; y += 50; }
        ctx.fillStyle = background; canvasRoundRect(ctx, x, y, width, 38, 19); ctx.fill();
        ctx.fillStyle = color; ctx.font = `600 22px ${SANS}`; ctx.fillText(label, x + 19, y + 26);
        x += width + 12;
      });
    };
    drawChips(data.tags.slice(0, 6), 1136, '#dfece8', '#2a6f6a');

    sectionTitle('心情底色', 1286);
    drawChips(data.moods.slice(0, 4), 1318, '#f3e7d3', '#a8781f');

    sectionTitle('代表记忆', 1420);
    let highlightY = 1470;
    data.highlights.slice(0, 3).forEach((record, index) => {
      ctx.fillStyle = '#d6a84b'; ctx.font = `700 20px ${SANS}`; ctx.fillText(`0${index + 1}`, LEFT, highlightY);
      ctx.fillStyle = '#1e2623'; ctx.font = `700 26px ${SERIF}`;
      ctx.fillText(longTextLines(ctx, record.title, CONTENT - 260, 1)[0], LEFT + 58, highlightY);
      ctx.fillStyle = '#89908a'; ctx.font = `500 18px ${SANS}`; ctx.textAlign = 'right';
      ctx.fillText(fmt(record.occurredAt), W - LEFT, highlightY); ctx.textAlign = 'left';
      highlightY += 58;
    });

    ctx.fillStyle = '#dedbd2'; ctx.fillRect(LEFT, 1660, CONTENT, 1);
    ctx.fillStyle = '#1e2623'; ctx.font = `700 30px ${SERIF}`; ctx.fillText('记录，是对时间最温柔的抵抗。', LEFT, 1712);
    ctx.fillStyle = '#89908a'; ctx.font = `500 19px ${SANS}`; ctx.fillText(`${data.year} · 拾光AI · 本地记忆档案`, LEFT, 1756);

    const filename = `拾光AI-${data.year}年度回顾.png`;
    canvas.toBlob(blob => {
      if (!blob) { showToast('年度长图生成失败，请稍后重试。', 'error'); return; }
      openLongImagePreview({ url: URL.createObjectURL(blob), blob, filename, count: data.total, label: `${data.year} 年度回顾` });
    }, 'image/png');
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

  window.openTrashManager = function () {
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-tags modal-trash" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">RECYCLE BIN</div><h3 class="modal-title">回收站</h3></div><button class="btn btn-ghost btn-icon" data-close>${getIcon('x')}</button></div><div class="modal-body"><p class="tag-manager-desc">删除的记忆会保留 30 天，可随时恢复；永久删除后无法找回。</p><div class="trash-list" id="trash-list"></div></div><div class="modal-footer"><span class="tag-manager-total" id="trash-total"></span><button class="btn btn-ghost btn-sm" id="trash-clear">${getIcon('trash', 14)} 清空回收站</button><button class="btn btn-secondary" data-close>完成</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = () => overlay.remove());
    const list = overlay.querySelector('#trash-list');
    const total = overlay.querySelector('#trash-total');
    const clearBtn = overlay.querySelector('#trash-clear');
    const syncCount = () => { const el = document.getElementById('trash-count'); if (el) el.textContent = `${MemoryStore.trash().length} 条`; };

    function renderList() {
      const items = MemoryStore.trash();
      total.textContent = `${items.length} 条 · 最多保留 30 天`;
      clearBtn.disabled = !items.length;
      syncCount();
      if (!items.length) { list.innerHTML = `<div class="trash-empty">回收站是空的。<br>删除的记忆会先来到这里，30 天内都可以恢复。</div>`; return; }
      list.innerHTML = items.map(record => `<div class="trash-row"><div class="trash-main"><div class="trash-title">${esc(record.title)}</div><div class="trash-meta">${formatDate(record.occurredAt)} · 删除于 ${formatDate(record.deletedAt)}</div><p class="trash-excerpt">${esc(record.content || '这条记忆只有附件。')}</p></div><div class="trash-actions"><button class="btn btn-ghost btn-sm" data-restore="${esc(record.id)}">${getIcon('refresh', 13)} 恢复</button><button class="btn btn-ghost btn-sm" data-purge="${esc(record.id)}">${getIcon('trash', 13)} 永久删除</button></div></div>`).join('');
      list.querySelectorAll('[data-restore]').forEach(btn => btn.onclick = () => {
        const restored = MemoryStore.restoreRecord(btn.dataset.restore);
        renderList();
        if (restored) showToast(`已恢复「${restored.title}」`, 'success');
      });
      list.querySelectorAll('[data-purge]').forEach(btn => btn.onclick = () => {
        const record = items.find(item => item.id === btn.dataset.purge);
        if (!record) return;
        showConfirm({
          title: '永久删除这条记忆？', message: `「${record.title}」及其附件将无法找回。`, confirmText: '永久删除',
          onConfirm: () => { MemoryStore.purgeRecord(record.id); renderList(); showToast('已永久删除', 'success'); }
        });
      });
    }

    clearBtn.onclick = () => {
      const count = MemoryStore.trash().length;
      if (!count) return;
      showConfirm({
        title: '清空回收站？', message: `${count} 条记忆及其附件将被永久删除，无法找回。`, confirmText: '清空',
        onConfirm: () => { const removed = MemoryStore.emptyTrash(); renderList(); showToast(`已永久删除 ${removed} 条记忆`, 'success'); }
      });
    };
    renderList();
  };

  // 记忆草稿：只保存文字字段，附件体积大不写入草稿，避免撑爆本地存储。
  const RECORD_DRAFT_KEY = 'shiguangai_record_draft';
  function readRecordDraft() {
    try {
      const raw = JSON.parse(localStorage.getItem(RECORD_DRAFT_KEY) || 'null');
      if (!raw || typeof raw !== 'object') return null;
      const title = typeof raw.title === 'string' ? raw.title : '';
      const content = typeof raw.content === 'string' ? raw.content : '';
      const tags = typeof raw.tags === 'string' ? raw.tags : '';
      if (!title.trim() && !content.trim() && !tags.trim()) return null;
      return {
        title, content, tags,
        type: typeMap[raw.type] ? raw.type : 'text',
        mood: typeof raw.mood === 'string' && raw.mood ? raw.mood : '平静',
        occurredAt: Number.isFinite(Number(raw.occurredAt)) && Number(raw.occurredAt) > 0 ? Number(raw.occurredAt) : Date.now(),
        savedAt: Number(raw.savedAt) || 0
      };
    } catch (error) { return null; }
  }
  function clearRecordDraft() { try { localStorage.removeItem(RECORD_DRAFT_KEY); } catch (error) { /* 隐私模式忽略 */ } }

  window.openRecordEditor = function (id = null, onSaved = null, preset = {}) {
    const existing = id ? MemoryStore.getRecord(id) : null;
    if (id && !existing) { showToast('没有找到要编辑的记忆。', 'error'); return; }
    const draft = existing ? null : readRecordDraft();
    const record = existing || {
      title: draft ? draft.title : '',
      content: draft ? draft.content : '',
      type: draft ? draft.type : (preset.type || 'text'),
      occurredAt: draft ? draft.occurredAt : Date.now(),
      mood: draft ? draft.mood : '平静',
      tags: draft ? draft.tags.split(/[,，]/).map(value => value.trim()).filter(Boolean) : (preset.tags || []),
      attachments: [...(preset.attachments || [])],
      source: preset.source || '手动记录'
    };
    let attachments = [...record.attachments];
    const toLocalInput = stamp => new Date(Number(stamp) - new Date(Number(stamp)).getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const dateValue = toLocalInput(record.occurredAt);
    const unlockDate = new Date(); unlockDate.setDate(unlockDate.getDate() + 30);
    const unlockDefault = `${unlockDate.getFullYear()}-${String(unlockDate.getMonth() + 1).padStart(2, '0')}-${String(unlockDate.getDate()).padStart(2, '0')}`;
    const capsuleHTML = existing ? '' : `<div class="field capsule-field"><label class="capsule-toggle"><input type="checkbox" id="record-capsule">${getIcon('lock', 15)}<span>封存为时间胶囊</span></label><div class="capsule-date" id="capsule-date" hidden><input class="input" id="record-unlock" type="date" value="${unlockDefault}"><span class="field-hint">到开启日期前，这条记忆不会出现在搜索、洞察与导出中；到期会自动转为普通记忆。</span></div></div>`;
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal modal-lg" role="dialog" aria-modal="true"><form id="record-form"><div class="modal-header"><div><div class="eyebrow">${existing ? 'EDIT MEMORY' : 'CAPTURE THE MOMENT'}</div><h3 class="modal-title">${existing ? '编辑记忆' : '此刻，值得留下'}</h3></div><button class="btn btn-ghost btn-icon" type="button" data-close>${getIcon('x')}</button></div><div class="modal-body"><div class="form-stack"><div class="draft-notice" id="draft-notice" hidden><span></span><button type="button" class="btn btn-ghost btn-sm" id="discard-draft">丢弃草稿</button></div><div class="field"><label class="field-label" for="record-title">标题</label><input class="input" id="record-title" maxlength="80" value="${esc(record.title)}" placeholder="给这段记忆一个名字，留空将自动截取正文"></div><div class="field"><label class="field-label" for="record-content">正文</label><textarea class="textarea" id="record-content" style="min-height:160px" placeholder="发生了什么？当时的你在想什么？">${esc(record.content)}</textarea></div><div class="form-grid"><div class="field"><label class="field-label" for="record-type">记忆类型</label><select class="select" id="record-type">${Object.entries(typeMap).map(([key, value]) => `<option value="${key}" ${record.type === key ? 'selected' : ''}>${value[0]}</option>`).join('')}</select></div><div class="field"><label class="field-label" for="record-date">发生时间</label><input class="input" id="record-date" type="datetime-local" value="${dateValue}" required></div><div class="field"><label class="field-label" for="record-mood">此刻心情</label><select class="select" id="record-mood">${['平静', '愉快', '有收获', '专注', '充实', '轻松', '期待', '温暖', '兴奋', '反思', '疲惫', '低落'].map(mood => `<option ${record.mood === mood ? 'selected' : ''}>${mood}</option>`).join('')}</select></div><div class="field"><label class="field-label" for="record-tags">标签</label><input class="input" id="record-tags" value="${esc(record.tags.join('，'))}" placeholder="学习，阅读（用逗号分隔）"><div class="tag-suggest" id="tag-suggest" aria-live="polite" hidden></div></div></div>${capsuleHTML}<div class="field"><span class="field-label">附件</span><div class="row wrap"><button class="btn btn-secondary btn-sm" type="button" id="add-attachment">${getIcon('upload', 14)} 添加文件</button><button class="btn btn-secondary btn-sm" type="button" id="record-audio">${getIcon('mic', 14)} 录制语音</button><button class="btn btn-secondary btn-sm" type="button" id="record-dictate" aria-pressed="false" title="把说的话转成正文">${getIcon('sparkles', 14)} 语音转文字</button><span class="field-hint">照片 / 语音 / 视频 / 文档，单个不超过 2MB</span></div><input type="file" id="attachment-input" multiple hidden accept="image/*,audio/*,video/*,.txt,.md,.csv,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"><div class="editor-dropzone" id="editor-dropzone">${getIcon('upload', 15)}<span>把文件拖到这里，或按 Ctrl / ⌘ + V 粘贴图片</span></div><div class="editor-attachments" id="editor-attachments"></div></div></div></div><div class="modal-footer"><button class="btn btn-secondary" type="button" data-close>取消</button><button class="btn btn-primary" type="submit" id="save-record">${getIcon('check', 16)} ${existing ? '保存修改' : '存入时光'}</button></div></form></div>`;
    document.body.appendChild(overlay);
    const capsuleToggle = overlay.querySelector('#record-capsule');
    if (capsuleToggle) capsuleToggle.onchange = () => {
      const wrap = overlay.querySelector('#capsule-date');
      wrap.hidden = !capsuleToggle.checked;
      if (capsuleToggle.checked) overlay.querySelector('#record-unlock').focus();
    };
    const renderAttachments = () => { overlay.querySelector('#editor-attachments').innerHTML = attachments.map((file, index) => `<div class="editor-attachment">${getIcon(typeMap[file.type]?.[1] || 'file', 15)}<span>${esc(file.name)} · ${fileSize(file.size)}</span><button type="button" class="btn btn-ghost btn-icon btn-sm" data-remove-file="${index}" aria-label="移除附件">${getIcon('x', 14)}</button></div>`).join(''); };
    renderAttachments();
    const draftNotice = overlay.querySelector('#draft-notice');
    const draftLabel = draftNotice.querySelector('span');
    const draftState = { timer: null, saved: false };
    const collectDraft = () => ({
      title: overlay.querySelector('#record-title').value,
      content: overlay.querySelector('#record-content').value,
      type: overlay.querySelector('#record-type').value,
      mood: overlay.querySelector('#record-mood').value,
      tags: overlay.querySelector('#record-tags').value,
      occurredAt: new Date(overlay.querySelector('#record-date').value).getTime() || Date.now()
    });
    const hasDraftContent = data => Boolean(data.title.trim() || data.content.trim() || data.tags.trim());
    const writeDraft = () => {
      clearTimeout(draftState.timer); draftState.timer = null;
      if (existing || draftState.saved) return;
      const data = collectDraft();
      if (!hasDraftContent(data)) { clearRecordDraft(); draftNotice.hidden = true; return; }
      try { localStorage.setItem(RECORD_DRAFT_KEY, JSON.stringify({ ...data, savedAt: Date.now() })); }
      catch (error) { console.warn('草稿保存失败', error); return; }
      draftNotice.hidden = false;
      draftLabel.textContent = `草稿已自动保存 · ${formatTime(Date.now())}`;
    };
    const queueDraft = () => {
      if (existing || draftState.saved) return;
      clearTimeout(draftState.timer);
      draftState.timer = setTimeout(writeDraft, 700);
    };
    if (draft) {
      draftNotice.hidden = false;
      draftLabel.textContent = `已恢复未保存的草稿 · ${formatTime(draft.savedAt || Date.now())}`;
      draftLabel.title = '草稿仅保留文字内容，附件不会随草稿恢复';
    }
    overlay.addEventListener('input', queueDraft);
    overlay.addEventListener('change', queueDraft);
    overlay.addEventListener('click', event => { if (event.target === overlay) writeDraft(); });
    overlay.querySelector('#discard-draft').onclick = () => {
      clearRecordDraft(); draftNotice.hidden = true;
      overlay.querySelector('#record-title').value = '';
      overlay.querySelector('#record-content').value = '';
      overlay.querySelector('#record-type').value = preset.type || 'text';
      overlay.querySelector('#record-mood').value = '平静';
      overlay.querySelector('#record-tags').value = '';
      overlay.querySelector('#record-date').value = toLocalInput(Date.now());
      refreshTagSuggest();
      overlay.querySelector('#record-content').focus();
      showToast('草稿已丢弃，可以重新开始', 'success');
    };
    let recognition = null; let dictating = false;
    const cleanups = [];
    const cleanupRuntime = () => {
      cleanups.splice(0).forEach(fn => { try { fn(); } catch (error) { console.warn(error); } });
      if (recognition) { try { recognition.onend = null; recognition.stop(); } catch (error) { console.warn(error); } recognition = null; }
    };
    const closeEditor = () => { writeDraft(); cleanupRuntime(); overlay.remove(); };
    const onEsc = event => { if (event.key === 'Escape') { writeDraft(); cleanupRuntime(); } };
    document.addEventListener('keydown', onEsc, true);
    cleanups.push(() => document.removeEventListener('keydown', onEsc, true));
    const addFiles = async files => {
      const list = Array.from(files || []).filter(Boolean);
      if (!list.length) return;
      let added = 0;
      for (const file of list) {
        try { attachments.push(await fileToAttachment(file)); added += 1; }
        catch (error) { showToast(error.message, 'error', 5000); }
      }
      if (added) { renderAttachments(); showToast(`已添加 ${added} 个附件`, 'success'); }
    };
    overlay.querySelectorAll('[data-close]').forEach(btn => btn.onclick = closeEditor);
    overlay.querySelector('#add-attachment').onclick = () => overlay.querySelector('#attachment-input').click();
    overlay.querySelector('#attachment-input').onchange = event => { addFiles(event.target.files); event.target.value = ''; };
    const form = overlay.querySelector('#record-form');
    const dropzone = overlay.querySelector('#editor-dropzone');
    const hasFiles = event => Array.from(event.dataTransfer?.types || []).includes('Files');
    const onDragOver = event => { if (!hasFiles(event)) return; event.preventDefault(); dropzone.classList.add('active'); };
    const onDragLeave = event => { if (!event.relatedTarget || !form.contains(event.relatedTarget)) dropzone.classList.remove('active'); };
    const onDrop = event => { if (!event.dataTransfer) return; event.preventDefault(); dropzone.classList.remove('active'); addFiles(event.dataTransfer.files); };
    ['dragenter', 'dragover'].forEach(type => form.addEventListener(type, onDragOver));
    form.addEventListener('dragleave', onDragLeave);
    form.addEventListener('drop', onDrop);
    const onPaste = event => {
      if (!document.body.contains(overlay)) { document.removeEventListener('paste', onPaste); return; }
      const files = Array.from(event.clipboardData?.files || []).filter(file => /^(image|audio|video)\//.test(file.type));
      if (!files.length) return;
      event.preventDefault(); addFiles(files);
    };
    document.addEventListener('paste', onPaste);
    cleanups.push(() => document.removeEventListener('paste', onPaste));
    const dictateBtn = overlay.querySelector('#record-dictate');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    dictateBtn.onclick = () => {
      if (!SpeechRecognition) { showToast('当前浏览器不支持语音转文字，可先录制语音留档。', 'error', 4500); return; }
      if (dictating) { recognition?.stop(); return; }
      try {
        recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN'; recognition.interimResults = false; recognition.continuous = true;
        recognition.onresult = event => {
          let text = '';
          for (let index = event.resultIndex; index < event.results.length; index += 1) {
            if (event.results[index].isFinal) text += event.results[index][0].transcript;
          }
          if (!text.trim()) return;
          const area = overlay.querySelector('#record-content');
          area.value += (area.value && !/[\s\n]$/.test(area.value) ? ' ' : '') + text.trim();
          area.scrollTop = area.scrollHeight;
        };
        recognition.onerror = event => {
          const message = event.error === 'not-allowed' ? '麦克风权限被拒绝，请在地址栏允许后重试。' : event.error === 'no-speech' ? '没有听到声音，请靠近麦克风再试一次。' : `语音识别中断（${event.error}）。`;
          showToast(message, 'error', 4500);
        };
        recognition.onend = () => {
          dictating = false;
          dictateBtn.classList.remove('btn-danger'); dictateBtn.setAttribute('aria-pressed', 'false');
          dictateBtn.innerHTML = `${getIcon('sparkles', 14)} 语音转文字`;
        };
        recognition.start(); dictating = true;
        dictateBtn.classList.add('btn-danger'); dictateBtn.setAttribute('aria-pressed', 'true');
        dictateBtn.innerHTML = `${getIcon('mic', 14)} 正在聆听 · 点击结束`;
      } catch (error) { showToast(`语音识别未能启动：${error.message}`, 'error', 4500); }
    };
    form.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
    overlay.querySelector('#editor-attachments').onclick = event => { const btn = event.target.closest('[data-remove-file]'); if (btn) { attachments.splice(Number(btn.dataset.removeFile), 1); renderAttachments(); } };
    const tagsInput = overlay.querySelector('#record-tags');
    const suggestBox = overlay.querySelector('#tag-suggest');
    const autoOrganize = MemoryStore.settings().autoOrganize;
    let suggestTimer = null;
    const currentTags = () => tagsInput.value.split(/[,，]/).map(value => value.trim()).filter(Boolean);
    const refreshTagSuggest = () => {
      if (!autoOrganize || !document.body.contains(overlay)) return;
      const source = `${overlay.querySelector('#record-title').value} ${overlay.querySelector('#record-content').value}`;
      const list = MemoryStore.suggestTags(source, currentTags(), 3);
      if (!list.length) { suggestBox.hidden = true; suggestBox.innerHTML = ''; return; }
      suggestBox.innerHTML = `<span class="tag-suggest-label">${getIcon('sparkles', 12)} 建议标签</span>${list.map(tag => `<button type="button" class="tag-suggest-chip" data-suggest-tag="${esc(tag)}">+ ${esc(tag)}</button>`).join('')}`;
      suggestBox.hidden = false;
    };
    const queueSuggest = delay => { clearTimeout(suggestTimer); suggestTimer = setTimeout(refreshTagSuggest, delay); };
    ['#record-title', '#record-content'].forEach(selector => overlay.querySelector(selector).addEventListener('input', () => queueSuggest(320)));
    tagsInput.addEventListener('input', () => queueSuggest(140));
    suggestBox.addEventListener('click', event => {
      const btn = event.target.closest('[data-suggest-tag]'); if (!btn) return;
      const tag = btn.dataset.suggestTag;
      const list = currentTags();
      if (!list.includes(tag)) tagsInput.value = [...list, tag].join('，');
      refreshTagSuggest();
    });
    cleanups.push(() => clearTimeout(suggestTimer));
    queueSuggest(120);
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
      if (dictating) recognition?.stop();
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
        const sealing = !existing && Boolean(capsuleToggle?.checked);
        let saved;
        if (sealing) {
          const rawDate = overlay.querySelector('#record-unlock').value;
          const unlockAt = rawDate ? new Date(`${rawDate}T23:59:59`).getTime() : 0;
          if (!unlockAt || unlockAt <= Date.now()) {
            showToast('开启日期需要晚于今天，才能封存。', 'error');
            button.disabled = false; button.textContent = '重新保存';
            return;
          }
          saved = MemoryStore.createCapsule(payload, unlockAt);
        } else {
          saved = existing ? MemoryStore.updateRecord(id, payload) : MemoryStore.createRecord(payload);
        }
        draftState.saved = true; clearRecordDraft(); draftNotice.hidden = true;
        closeEditor();
        showToast(sealing ? '已封存，等那一天再打开' : existing ? '修改已保存' : '这一刻，已存入时光', 'success');
        onSaved?.(saved);
      } catch (error) { showToast(error.message, 'error', 5000); button.disabled = false; button.textContent = '重新保存'; }
    };
    setTimeout(() => overlay.querySelector('#record-title').focus(), 50);
  };
})();
