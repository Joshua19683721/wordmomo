/* ============================================================
   WordMomo — 核心模組
   ------------------------------------------------------------
   這支檔案負責「不畫畫面的部分」：
     WM.util    通用小工具
     WM.text    英文斷詞與比對（打字練習的比對邏輯都在這裡）
     WM.audio   打字音效（用 Web Audio 即時合成，不需要音檔）
     WM.store   學習進度 + 字庫內容，存在瀏覽器裡
     WM.speech  英文發音（瀏覽器內建 Web Speech API）
     WM.packs   字庫 / 漸進鏈 / 步驟 的新增修改刪除
     WM.stats   統計
   介面呈現請看 app.js，樣式請看 css/style.css。
   ============================================================ */
(function (global) {
  'use strict';

  var WM = {};
  var STORAGE_KEY = 'wordmomo.v2';

  /* ------------------------------------------------------------
     WM.util —— 通用小工具
     ------------------------------------------------------------ */
  WM.util = {
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },
    sample: function (arr, n) { return WM.util.shuffle(arr).slice(0, n); },
    dateKey: function (ts) {
      var d = ts == null ? new Date() : new Date(ts);
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    },
    startOfDay: function (key) {
      var p = key.split('-');
      return new Date(+p[0], +p[1] - 1, +p[2]).getTime();
    },
    DAY: 86400000,
    num: function (n) { return Number(n || 0).toLocaleString('en-US'); },
    pct: function (part, total) {
      if (!total) return '0%';
      return Math.round((part / total) * 100) + '%';
    },
    greeting: function () {
      var h = new Date().getHours();
      if (h < 5)  return '夜深了';
      if (h < 11) return '早安';
      if (h < 14) return '午安';
      if (h < 18) return '下午好';
      return '晚安';
    },
    /** 產生一個短且不重複的 id */
    uid: function (prefix) {
      return (prefix || 'id') + '-' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
    },
    debounce: function (fn, ms) {
      var t;
      return function () {
        var self = this, args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(self, args); }, ms || 300);
      };
    }
  };

  /* ------------------------------------------------------------
     WM.text —— 英文斷詞與比對
     ------------------------------------------------------------
     打字練習的核心。要點：
       · 使用者輸入的是「一個單字」，比對時不看大小寫、不看標點
       · 單字裡的撇號 (don't) 也忽略，讓初學者不被絆住
       · 逗號、句號、分號這些標點由程式自動顯示，使用者不用打
     ------------------------------------------------------------ */
  WM.text = {
    /** 把一句英文切成 token 陣列 */
    tokenize: function (s) {
      var parts = String(s == null ? '' : s).split(/\s+/).filter(function (x) { return x.length; });
      return parts.map(function (raw) {
        /* 開頭/結尾的非英數字元視為標點，單獨存起來 */
        var m = raw.match(/^([^\w]*)(.*?)([^\w]*)$/);
        var lead = m ? m[1] : '';
        var word = m ? m[2] : raw;
        var tail = m ? m[3] : '';
        return { raw: raw, word: word, lead: lead, tail: tail, core: WM.text.core(word) };
      });
    },

    /** 取「可比對的核心」：只留英數字，小寫 */
    core: function (s) {
      return String(s == null ? '' : s)
        .toLowerCase()
        .replace(/[‘’ʼ'`]/g, '')
        .replace(/[^a-z0-9]/g, '');
    },

    /** 使用者打的內容是否等於目標單字 */
    matches: function (typed, target) {
      var a = WM.text.core(typed), b = WM.text.core(target);
      return b.length > 0 && a === b;
    },

    /** 這個字串有幾個「要打的」單字 */
    count: function (s) { return WM.text.tokenize(s).length; },

    /** 整串組回來（用於整句發音） */
    join: function (tokens) {
      return tokens.map(function (t) { return t.raw; }).join(' ');
    }
  };

  /* ------------------------------------------------------------
     WM.audio —— 打字音效
     ------------------------------------------------------------
     用 Web Audio 即時合成「咔哒」聲，不需要任何音檔。
     必須在使用者第一次按鍵之後才能啟動（瀏覽器 autoplay 限制）。
     ------------------------------------------------------------ */
  WM.audio = {
    ctx: null,
    noise: null,
    supported: !!(global.AudioContext || global.webkitAudioContext),
    on: true,

    _ensure: function () {
      if (!this.supported || !this.on) return false;
      if (this.ctx) {
        if (this.ctx.state === 'suspended') { try { this.ctx.resume(); } catch (e) { /* 忽略 */ } }
        return true;
      }
      var AC = global.AudioContext || global.webkitAudioContext;
      try { this.ctx = new AC(); } catch (e) { this.supported = false; return false; }

      /* 先做好一段 20 毫秒的噪音緩衝，之後每次按鍵重播 */
      var len = Math.max(1, Math.floor(this.ctx.sampleRate * 0.02));
      var buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      }
      this.noise = buf;
      return true;
    },

    /** 敲一下鍵盤 */
    tick: function (soft) {
      if (!this._ensure()) return;
      var ctx = this.ctx, t = ctx.currentTime;

      var src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.playbackRate.value = 0.85 + Math.random() * 0.35;

      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1300 + Math.random() * 1100;
      bp.Q.value = 1.1;

      var hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 600;

      var g = ctx.createGain();
      g.gain.setValueAtTime(soft ? 0.10 : 0.15, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      src.connect(bp); bp.connect(hp); hp.connect(g); g.connect(ctx.destination);
      src.start(t);
      src.stop(t + 0.05);
    },

    /** 答對 / 答錯的提示音 */
    chime: function (ok) {
      if (!this._ensure()) return;
      var ctx = this.ctx, t = ctx.currentTime;
      var notes = ok ? [880, 1174.7] : [320, 240];
      notes.forEach(function (f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = f;
        var st = t + i * 0.09;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.exponentialRampToValueAtTime(0.12, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, st + 0.16);
        o.connect(g); g.connect(ctx.destination);
        o.start(st); o.stop(st + 0.18);
      });
    },

    setEnabled: function (v) { this.on = !!v; }
  };

  /* ------------------------------------------------------------
     WM.store —— 進度與字庫內容
     ------------------------------------------------------------
     重要：state.packs 是「唯一真實來源」。
     第一次載入時從 js/data.js 的內建字庫初始化，
     之後新增/修改/刪除都直接改這裡並存檔 —— 包含內建字庫也能改。
     隨時可以「還原成內建字庫」重置。
     ------------------------------------------------------------ */
  var DEFAULTS = {
    version: 3,
    settings: {
      dailyGoal: 20,
      rate: 0.9,
      voiceURI: '',
      autoPlay: true,
      theme: 'dark',
      typeSound: true
    },
    packs: null,        // null = 還沒初始化，啟動時從內建字庫建立
    removedBuiltIn: [], // 使用者主動刪掉的內建字庫，之後不會自動補回來
    progress: {},       // '<packId>/<chainId>' -> { step, done, lastAt, tries, miss }
    log: {},            // 'YYYY-MM-DD' -> { steps, chains, miss }
    lastPack: ''
  };

  function deepMerge(base, patch) {
    var out = {}, k;
    for (k in base) {
      if (!Object.prototype.hasOwnProperty.call(base, k)) continue;
      if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
        out[k] = (patch && typeof patch[k] === 'object' && patch[k] !== null)
          ? deepMerge(base[k], patch[k])
          : deepMerge(base[k], null);
      } else {
        out[k] = (patch && Object.prototype.hasOwnProperty.call(patch, k)) ? patch[k] : base[k];
      }
    }
    return out;
  }

  var memoryOnly = false;

  WM.store = {
    state: null,

    load: function () {
      var raw = null;
      try { raw = global.localStorage.getItem(STORAGE_KEY); } catch (e) { memoryOnly = true; }
      var data = null;
      if (raw) { try { data = JSON.parse(raw); } catch (e) { data = null; } }
      this.state = deepMerge(DEFAULTS, data || {});
      this.state.progress = this.state.progress || {};
      this.state.log = this.state.log || {};
      this.state.removedBuiltIn = this.state.removedBuiltIn || [];
      if (!Array.isArray(this.state.packs) || !this.state.packs.length) {
        this.state.packs = WM.packs.cloneBuiltIn();
      } else {
        /* 網站更新後新增的內建字庫，補進舊的存檔裡。
           使用者改過或刪過的字庫不會被覆蓋或撿回來。 */
        var added = WM.packs.mergeMissingBuiltIn();
        if (added.length) this.save();
      }
      return this.state;
    },

    save: function () {
      if (memoryOnly) return;
      try { global.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); }
      catch (e) { memoryOnly = true; }
    },

    today: function () {
      var k = WM.util.dateKey();
      if (!this.state.log[k]) this.state.log[k] = { steps: 0, chains: 0, miss: 0 };
      return this.state.log[k];
    },

    set: function (k, v) { this.state.settings[k] = v; this.save(); },
    get: function (k) { return this.state.settings[k]; },

    exportJSON: function () {
      return JSON.stringify({
        _app: 'WordMomo', _version: 2,
        _exportedAt: new Date().toISOString(),
        state: this.state
      }, null, 2);
    },

    importJSON: function (text) {
      var data = JSON.parse(text);
      var payload = data && data.state ? data.state : data;
      if (!payload || typeof payload !== 'object') throw new Error('檔案格式不正確');
      this.state = deepMerge(DEFAULTS, payload);
      this.state.progress = this.state.progress || {};
      this.state.log = this.state.log || {};
      if (!Array.isArray(this.state.packs) || !this.state.packs.length) {
        this.state.packs = WM.packs.cloneBuiltIn();
      }
      this.save();
      return true;
    },

    resetProgress: function () {
      this.state.progress = {};
      this.state.log = {};
      this.save();
    },

    resetAll: function () {
      this.state = deepMerge(DEFAULTS, { packs: WM.packs.cloneBuiltIn() });
      this.save();
    }
  };

  /* ------------------------------------------------------------
     WM.speech —— 英文發音
     ------------------------------------------------------------ */
  var voices = [], voiceReady = false;

  function loadVoices() {
    if (!('speechSynthesis' in global)) return;
    voices = global.speechSynthesis.getVoices() || [];
    if (voices.length) voiceReady = true;
  }

  WM.speech = {
    supported: ('speechSynthesis' in global && 'SpeechSynthesisUtterance' in global),

    init: function () {
      if (!this.supported) return;
      loadVoices();
      global.speechSynthesis.onvoiceschanged = loadVoices;
      var tries = 0;
      var iv = setInterval(function () {
        loadVoices();
        if (voiceReady || ++tries > 20) clearInterval(iv);
      }, 250);
    },

    ready: function () { return voiceReady; },

    list: function () {
      return voices.filter(function (v) { return /^en(-|_|$)/i.test(v.lang); })
        .sort(function (a, b) {
          var rank = function (v) {
            if (/en-GB/i.test(v.lang)) return 0;
            if (/en-US/i.test(v.lang)) return 1;
            return 2;
          };
          return rank(a) - rank(b) || a.name.localeCompare(b.name);
        });
    },

    pick: function (uri) {
      var en = this.list();
      if (!en.length) return null;
      if (uri) for (var i = 0; i < en.length; i++) if (en[i].voiceURI === uri) return en[i];
      return en[0] || null;
    },

    speak: function (text, opts) {
      opts = opts || {};
      if (!this.supported || !text) { if (opts.onend) opts.onend(); return null; }
      var synth = global.speechSynthesis;
      try { synth.cancel(); } catch (e) { /* 忽略 */ }

      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = 'en-US';
      u.rate = Math.max(0.1, Math.min(2, opts.rate != null ? opts.rate : WM.store.get('rate')));
      u.pitch = 1;
      var v = this.pick(opts.uri || WM.store.get('voiceURI'));
      if (v) { u.voice = v; u.lang = v.lang; }

      /* 保險：有些瀏覽器語音會卡住，逾時就收尾 */
      var guard = setTimeout(function () {
        if (!global.speechSynthesis.speaking) return;
        try { synth.cancel(); } catch (e) { /* 忽略 */ }
        if (opts.onend) opts.onend();
      }, Math.max(3000, String(text).length * 130));

      u.onstart = function () { if (opts.onstart) opts.onstart(); };
      u.onend = function () { clearTimeout(guard); if (opts.onend) opts.onend(); };
      u.onerror = function () { clearTimeout(guard); if (opts.onend) opts.onend(); };

      synth.speak(u);
      return u;
    },

    stop: function () {
      if (!this.supported) return;
      try { global.speechSynthesis.cancel(); } catch (e) { /* 忽略 */ }
    }
  };

  /* ------------------------------------------------------------
     WM.packs —— 字庫與漸進鏈
     ------------------------------------------------------------ */
  WM.packs = {
    /** 深拷貝內建字庫（第一次啟入時存進 localStorage） */
    cloneBuiltIn: function () {
      var src = (global.WORDMOMO_DATA && global.WORDMOMO_DATA.packs) || [];
      return JSON.parse(JSON.stringify(src)).map(function (p) {
        p.custom = false;
        p.chains = (p.chains || []).map(function (c) {
          c.steps = (c.steps || []).map(function (s) {
            return { en: s.en || '', zh: s.zh || '', ipa: s.ipa || '' };
          });
          return c;
        });
        return p;
      });
    },

    all: function () { return WM.store.state.packs; },
    first: function () { return WM.store.state.packs[0] || null; },

    /** 這個 id 是不是內建字庫（相對於 js/data.js） */
    isBuiltIn: function (id) {
      var src = (global.WORDMOMO_DATA && global.WORDMOMO_DATA.packs) || [];
      return src.some(function (p) { return p.id === id; });
    },

    /**
     * 把「網站更新後新增的內建字庫」補進舊的存檔。
     * 已經存在的字庫一律不動（保留使用者的改名與編輯），
     * 使用者曾經刪掉的內建字庫也不會撿回來。
     * @returns {string[]} 本次補上的字庫 id
     */
    mergeMissingBuiltIn: function () {
      var st = WM.store.state;
      var removed = st.removedBuiltIn || [];
      var added = [];
      this.cloneBuiltIn().forEach(function (bp) {
        if (this.idExists(bp.id)) return;             /* 已經有了 → 不動它 */
        if (removed.indexOf(bp.id) !== -1) return;   /* 使用者刪過 → 不撿回來 */
        st.packs.push(bp);
        added.push(bp.id);
      }.bind(this));
      return added;
    },

    get: function (id) {
      var list = WM.store.state.packs;
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },

    idExists: function (id) {
      return WM.store.state.packs.some(function (p) { return p.id === id; });
    },

    uniqueId: function (base) {
      var id = base || 'pack', n = 1;
      while (this.idExists(id)) { id = (base || 'pack') + '-' + (++n); }
      return id;
    },

    /* ---------- 字庫層級 ---------- */

    create: function (data) {
      data = data || {};
      var pack = {
        id: this.uniqueId('pack'),
        name: (String(data.name || '').trim()) || '新字庫',
        icon: data.icon || '📦',
        level: data.level || 'A1',
        desc: data.desc || '',
        custom: true,
        chains: []
      };
      WM.store.state.packs.push(pack);
      WM.store.save();
      return pack;
    },

    update: function (id, patch) {
      var p = this.get(id);
      if (!p) return null;
      if (patch.name != null)  { var n = String(patch.name).trim(); if (n) p.name = n; }
      if (patch.icon != null)  { var i = String(patch.icon).trim(); if (i) p.icon = i; }
      if (patch.level != null) p.level = patch.level;
      if (patch.desc != null)  p.desc = String(patch.desc);
      WM.store.save();
      return p;
    },

    remove: function (id) {
      var list = WM.store.state.packs;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id !== id) continue;
        list.splice(i, 1);

        /* 記下「使用者刪過這個內建字庫」，網站下次更新不會又冒出來 */
        if (this.isBuiltIn(id)) {
          var rm = WM.store.state.removedBuiltIn || (WM.store.state.removedBuiltIn = []);
          if (rm.indexOf(id) === -1) rm.push(id);
        }

        var prefix = id + '/';
        Object.keys(WM.store.state.progress).forEach(function (k) {
          if (k.indexOf(prefix) === 0) delete WM.store.state.progress[k];
        });
        if (WM.store.state.lastPack === id) WM.store.state.lastPack = '';
        WM.store.save();
        return true;
      }
      return false;
    },

    move: function (id, dir) {
      var list = WM.store.state.packs;
      var i = -1;
      for (var k = 0; k < list.length; k++) if (list[k].id === id) { i = k; break; }
      if (i < 0) return false;
      var j = i + dir;
      if (j < 0 || j >= list.length) return false;
      var t = list[i]; list[i] = list[j]; list[j] = t;
      WM.store.save();
      return true;
    },

    /** 還原成出廠狀態（內建字庫內容 + 清空進度） */
    restoreBuiltIn: function () {
      WM.store.state.packs = this.cloneBuiltIn();
      WM.store.state.removedBuiltIn = [];   /* 清除「刪過內建字庫」的紀錄 */
      WM.store.resetProgress();
      return true;
    },

    /* ---------- 漸進鏈 ---------- */

    addChain: function (packId, atIndex) {
      var p = this.get(packId);
      if (!p) return null;
      var c = { id: WM.util.uid('c'), steps: [{ en: '', zh: '', ipa: '' }] };
      if (atIndex == null || atIndex < 0 || atIndex > p.chains.length) p.chains.push(c);
      else p.chains.splice(atIndex, 0, c);
      WM.store.save();
      return c;
    },

    getChain: function (packId, chainId) {
      var p = this.get(packId);
      if (!p) return null;
      for (var i = 0; i < p.chains.length; i++) if (p.chains[i].id === chainId) return p.chains[i];
      return null;
    },

    chainIndex: function (packId, chainId) {
      var p = this.get(packId);
      if (!p) return -1;
      for (var i = 0; i < p.chains.length; i++) if (p.chains[i].id === chainId) return i;
      return -1;
    },

    updateChain: function (packId, chainId, patch) {
      var c = this.getChain(packId, chainId);
      if (!c) return null;
      if (patch.title != null) c.title = String(patch.title);
      WM.store.save();
      return c;
    },

    removeChain: function (packId, chainId) {
      var p = this.get(packId);
      if (!p) return false;
      var i = this.chainIndex(packId, chainId);
      if (i < 0) return false;
      p.chains.splice(i, 1);
      delete WM.store.state.progress[packId + '/' + chainId];
      WM.store.save();
      return true;
    },

    moveChain: function (packId, chainId, dir) {
      var p = this.get(packId);
      var i = this.chainIndex(packId, chainId);
      if (!p || i < 0) return false;
      var j = i + dir;
      if (j < 0 || j >= p.chains.length) return false;
      var t = p.chains[i]; p.chains[i] = p.chains[j]; p.chains[j] = t;
      WM.store.save();
      return true;
    },

    /* ---------- 步驟 ---------- */

    addStep: function (packId, chainId, atIndex) {
      var c = this.getChain(packId, chainId);
      if (!c) return null;
      var s = { en: '', zh: '', ipa: '' };
      if (atIndex == null || atIndex < 0 || atIndex > c.steps.length) c.steps.push(s);
      else c.steps.splice(atIndex, 0, s);
      WM.store.save();
      return s;
    },

    updateStep: function (packId, chainId, stepIndex, patch) {
      var c = this.getChain(packId, chainId);
      var s = c && c.steps[stepIndex];
      if (!s) return null;
      if (patch.en != null)  s.en = String(patch.en);
      if (patch.zh != null)  s.zh = String(patch.zh);
      if (patch.ipa != null) s.ipa = String(patch.ipa);
      WM.store.save();
      return s;
    },

    removeStep: function (packId, chainId, stepIndex) {
      var c = this.getChain(packId, chainId);
      if (!c || !c.steps.length) return false;
      c.steps.splice(stepIndex, 1);
      if (!c.steps.length) this.removeChain(packId, chainId);
      WM.store.save();
      return true;
    },

    moveStep: function (packId, chainId, stepIndex, dir) {
      var c = this.getChain(packId, chainId);
      if (!c) return false;
      var j = stepIndex + dir;
      if (j < 0 || j >= c.steps.length) return false;
      var t = c.steps[stepIndex]; c.steps[stepIndex] = c.steps[j]; c.steps[j] = t;
      WM.store.save();
      return true;
    },

    /** 刪掉整條鏈裡所有空白步驟（編輯時用） */
    pruneBlankSteps: function (packId, chainId) {
      var c = this.getChain(packId, chainId);
      if (!c) return 0;
      var before = c.steps.length;
      c.steps = c.steps.filter(function (s) { return String(s.en || '').trim().length; });
      if (!c.steps.length) this.removeChain(packId, chainId);
      WM.store.save();
      return before - c.steps.length;
    },

    /* ---------- 進度 ---------- */

    chainProgress: function (packId, chainId) {
      var c = this.getChain(packId, chainId);
      var total = c ? c.steps.length : 0;
      var rec = WM.store.state.progress[packId + '/' + chainId];
      if (!rec) return { step: 0, total: total, done: false, lastAt: 0, tries: 0, miss: 0, pct: 0 };
      return {
        step: rec.step || 0,
        total: total,
        done: !!rec.done,
        lastAt: rec.lastAt || 0,
        tries: rec.tries || 0,
        miss: rec.miss || 0,
        pct: total ? Math.min(100, Math.round(((rec.step || 0) / total) * 100)) : 0
      };
    },

    /** 完成一個步驟，回傳是不是剛剛把整條鏈讀完 */
    completeStep: function (packId, chainId, stepIndex, wasMistake) {
      var key = packId + '/' + chainId;
      if (!WM.store.state.progress[key]) {
        WM.store.state.progress[key] = { step: 0, done: false, lastAt: 0, tries: 0, miss: 0 };
      }
      var rec = WM.store.state.progress[key];
      rec.step = Math.max(rec.step, stepIndex + 1);
      rec.tries = (rec.tries || 0) + 1;
      if (wasMistake) rec.miss = (rec.miss || 0) + 1;
      rec.lastAt = Date.now();

      var c = this.getChain(packId, chainId);
      var isLast = !!(c && stepIndex >= c.steps.length - 1);
      var wasDone = rec.done;
      if (isLast) rec.done = true;

      var t = WM.store.today();
      t.steps += 1;
      if (wasMistake) t.miss += 1;
      if (isLast && !wasDone) t.chains += 1;

      WM.store.save();
      return { isLast: isLast, justFinished: isLast && !wasDone };
    },

    /* ---------- 匯出成 JS 片段 ---------- */

    toJS: function (onlyIds) {
      var packs = WM.store.state.packs;
      if (onlyIds && onlyIds.length) {
        packs = packs.filter(function (p) { return onlyIds.indexOf(p.id) !== -1; });
      }
      var q = function (s) {
        return "'" + String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
      };
      var out = [];
      out.push('window.WORDMOMO_DATA = {');
      out.push('  version: 2,');
      out.push('  packs: [');
      packs.forEach(function (p, pi) {
        out.push('    {');
        out.push('      id: ' + q(p.id) + ',');
        out.push('      name: ' + q(p.name) + ',');
        out.push('      icon: ' + q(p.icon) + ',');
        out.push('      level: ' + q(p.level) + ',');
        out.push('      desc: ' + q(p.desc) + ',');
        out.push('      chains: [');
        p.chains.forEach(function (c, ci) {
          out.push('        {');
          out.push('          id: ' + q(c.id) + ',');
          out.push('          steps: [');
          c.steps.forEach(function (s, si) {
            out.push('            { en: ' + q(s.en) + ', zh: ' + q(s.zh) + ', ipa: ' + q(s.ipa) + ' }' +
              (si < c.steps.length - 1 ? ',' : ''));
          });
          out.push('          ]');
          out.push('        }' + (ci < p.chains.length - 1 ? ',' : ''));
        });
        out.push('      ]');
        out.push('    }' + (pi < packs.length - 1 ? ',' : ''));
      });
      out.push('  ]');
      out.push('};');
      return out.join('\n');
    }
  };

  /* ------------------------------------------------------------
     WM.stats —— 統計
     ------------------------------------------------------------ */
  WM.stats = {
    packProgress: function (pack) {
      var total = 0, done = 0, started = 0, stepsDone = 0, stepsAll = 0;
      pack.chains.forEach(function (c) {
        total++;
        var pr = WM.packs.chainProgress(pack.id, c.id);
        if (pr.step > 0) started++;
        if (pr.done) done++;
        stepsDone += pr.step;
        stepsAll += pr.total;
      });
      return {
        total: total, done: done, started: started,
        stepsDone: stepsDone, stepsAll: stepsAll,
        pct: total ? Math.round((done / total) * 100) : 0,
        stepPct: stepsAll ? Math.round((stepsDone / stepsAll) * 100) : 0
      };
    },

    streak: function () {
      var log = WM.store.state.log;
      var keys = Object.keys(log).filter(function (k) { return log[k].steps > 0; });
      if (!keys.length) return 0;
      var today = WM.util.dateKey();
      var cursor = today;
      if (keys.indexOf(today) === -1) {
        var y = new Date(); y.setDate(y.getDate() - 1);
        cursor = WM.util.dateKey(y.getTime());
        if (keys.indexOf(cursor) === -1) return 0;
      }
      var n = 0;
      while (keys.indexOf(cursor) !== -1) {
        n++;
        var d = new Date(WM.util.startOfDay(cursor));
        d.setDate(d.getDate() - 1);
        cursor = WM.util.dateKey(d.getTime());
      }
      return n;
    },

    todayProgress: function () {
      var t = WM.store.today();
      var goal = WM.store.get('dailyGoal') || 20;
      return { done: t.steps, goal: goal, pct: Math.min(100, Math.round((t.steps / goal) * 100)), miss: t.miss };
    },

    overview: function () {
      var self = this;
      var chains = 0, done = 0, stepsAll = 0, stepsDone = 0, startedPacks = 0;
      WM.store.state.packs.forEach(function (p) {
        var s = self.packProgress(p);
        chains += s.total; done += s.done;
        stepsAll += s.stepsAll; stepsDone += s.stepsDone;
        if (s.started > 0) startedPacks++;
      });
      return {
        packs: WM.store.state.packs.length,
        chains: chains, done: done,
        stepsAll: stepsAll, stepsDone: stepsDone,
        startedPacks: startedPacks,
        streak: this.streak(),
        today: this.todayProgress()
      };
    },

    recent: function (n) {
      n = n || 14;
      var log = WM.store.state.log, out = [];
      var d = new Date();
      for (var i = n - 1; i >= 0; i--) {
        var t = new Date(d); t.setDate(d.getDate() - i);
        var k = WM.util.dateKey(t.getTime());
        var e = log[k] || { steps: 0, chains: 0, miss: 0 };
        out.push({ key: k, steps: e.steps, chains: e.chains, miss: e.miss });
      }
      return out;
    },

    heatmap: function () {
      var log = WM.store.state.log, out = {};
      for (var k in log) if (log[k].steps > 0) out[k] = log[k].steps;
      return out;
    },

    /** 推薦清單：優先沒學過的，其次最久沒碰的 */
    nextChains: function (pack, limit) {
      var rows = pack.chains.map(function (c, i) {
        return { chain: c, index: i, pr: WM.packs.chainProgress(pack.id, c.id) };
      });
      rows.sort(function (a, b) {
        if (a.pr.done !== b.pr.done) return a.pr.done ? 1 : -1;
        var aNew = a.pr.step === 0, bNew = b.pr.step === 0;
        if (aNew !== bNew) return aNew ? -1 : 1;
        return a.pr.lastAt - b.pr.lastAt;
      });
      return rows.slice(0, limit || 5);
    },

    /** 每天固定一條鏈當「今日練習」 */
    dailyChain: function (pack) {
      if (!pack || !pack.chains.length) return null;
      var dayIndex = Math.floor(WM.util.startOfDay(WM.util.dateKey()) / WM.util.DAY);
      return pack.chains[dayIndex % pack.chains.length];
    }
  };

  global.WM = WM;
})(typeof window !== 'undefined' ? window : this);
