/* ============================================================
   WordMomo — 核心模組
   ------------------------------------------------------------
   這支檔案負責「不畫畫面的部分」：
     WM.util    通用小工具
     WM.store   學習進度存進瀏覽器（localStorage）
     WM.srs     間隔重複排程（Leitner 盒系統 + 難度調整）
     WM.speech  英文發音（瀏覽器內建 Web Speech API，免費免金鑰）
     WM.stats   從進度算出各種統計數字
   介面呈現請看 app.js，樣式請看 css/style.css。
   ============================================================ */
(function (global) {
  'use strict';

  var WM = {};
  var STORAGE_KEY = 'wordmomo.v1';

  /* ------------------------------------------------------------
     WM.util —— 通用小工具
     ------------------------------------------------------------ */
  WM.util = {
    /** 把字串轉成可以安全塞進 HTML 的文字（防注入） */
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },

    /** 打亂陣列（回傳新陣列，不改動原本的） */
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },

    /** 隨機取 n 個不重複項目 */
    sample: function (arr, n) {
      return WM.util.shuffle(arr).slice(0, n);
    },

    /** 本地日期的 YYYY-MM-DD（不能用 toISOString，那是 UTC，會差一天） */
    dateKey: function (ts) {
      var d = ts == null ? new Date() : new Date(ts);
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    },

    /** 把日期字串還原成當天 00:00 的時間戳 */
    startOfDay: function (key) {
      var p = key.split('-');
      return new Date(+p[0], +p[1] - 1, +p[2]).getTime();
    },

    /** 相差幾天（b - a，以自然日計算） */
    daysBetween: function (aKey, bKey) {
      return Math.round((WM.util.startOfDay(bKey) - WM.util.startOfDay(aKey)) / 86400000);
    },

    /** 一天 = 86400000 毫秒 */
    DAY: 86400000,

    /** 千分位數字 */
    num: function (n) { return Number(n || 0).toLocaleString('en-US'); },

    /** 百分比字串 */
    pct: function (part, total) {
      if (!total) return '0%';
      return Math.round((part / total) * 100) + '%';
    },

    /** 千分之一秒計時器，回傳可呼叫的函式 */
    timer: function () {
      var t0 = performance.now();
      return function () { return Math.round(performance.now() - t0); };
    },

    /** 延遲執行 */
    sleep: function (ms) {
      return new Promise(function (r) { setTimeout(r, ms); });
    },

    /** 猜測使用者的時段，回傳問候語 */
    greeting: function () {
      var h = new Date().getHours();
      if (h < 5)  return '夜深了';
      if (h < 11) return '早安';
      if (h < 14) return '午安';
      if (h < 18) return '午安';
      return '晚安';
    }
  };

  /* ------------------------------------------------------------
     WM.store —— 進度儲存
     ------------------------------------------------------------ */
  var DEFAULTS = {
    version: 1,
    createdAt: 0,
    settings: {
      dailyGoal: 20,
      rate: 0.9,
      voiceURI: '',
      autoPlay: true,
      zhFirst: false,
      theme: 'dark'
    },
    words: {},   // 單字進度，key = "packId/word"
    log: {},     // 每日紀錄，key = "YYYY-MM-DD"
    quiz: { total: 0, right: 0, streak: 0, best: 0 },
    lastPack: 'daily'
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

  var memoryOnly = false;      // localStorage 不可用時的保險
  var memory = null;

  WM.store = {
    state: null,

    /** 讀出進度（並補上日後新增的預設欄位） */
    load: function () {
      var raw = null;
      try {
        raw = global.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        memoryOnly = true;
      }
      var data = null;
      if (raw) {
        try { data = JSON.parse(raw); } catch (e) { data = null; }
      }
      if (!data) data = {};
      this.state = deepMerge(DEFAULTS, data);
      this.state.createdAt = this.state.createdAt || Date.now();
      return this.state;
    },

    /** 寫回瀏覽器 */
    save: function () {
      if (memoryOnly) { memory = JSON.stringify(this.state); return; }
      try {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        memoryOnly = true;
        memory = JSON.stringify(this.state);
      }
    },

    /** 取得某個單字的進度紀錄（沒有就建立一個新的） */
    record: function (wordId) {
      if (!this.state.words[wordId]) {
        this.state.words[wordId] = {
          box: 0, seen: 0, right: 0, wrong: 0,
          lastAt: 0, dueAt: 0
        };
      }
      return this.state.words[wordId];
    },

    /** 今天的紀錄 */
    today: function () {
      var k = WM.util.dateKey();
      if (!this.state.log[k]) this.state.log[k] = { reviewed: 0, right: 0, ms: 0 };
      return this.state.log[k];
    },

    /** 設定項目捷徑 */
    set: function (k, v) { this.state.settings[k] = v; this.save(); },
    get: function (k) { return this.state.settings[k]; },

    /** 匯出成 JSON 字串 */
    exportJSON: function () {
      return JSON.stringify({
        _app: 'WordMomo',
        _version: 1,
        _exportedAt: new Date().toISOString(),
        state: this.state
      }, null, 2);
    },

    /** 從 JSON 字串還原 */
    importJSON: function (text) {
      var data = JSON.parse(text);
      var payload = data && data.state ? data.state : data;
      if (!payload || typeof payload !== 'object') throw new Error('檔案格式不正確');
      this.state = deepMerge(DEFAULTS, payload);
      this.save();
      return true;
    },

    /** 清空全部進度 */
    reset: function () {
      this.state = deepMerge(DEFAULTS, { createdAt: Date.now() });
      this.save();
    }
  };

  /* ------------------------------------------------------------
     WM.srs —— 間隔重複排程
     ------------------------------------------------------------
     概念：每個單字有一個「盒子編號」(box)，數字越大代表記得越牢，
     下次複習的間隔也越長。這是 Leitner 盒系統的做法，
     上面再加上難度微調，比純粹照盒子跑還準。
     ------------------------------------------------------------ */

  // 盒子 → 間隔天數。index 就是 box。
  var INTERVALS = [0, 1, 2, 4, 8, 16, 32];
  var MAX_BOX = INTERVALS.length - 1;
  var MASTER_BOX = 5;          // 到這個盒子就算「已掌握」

  WM.srs = {
    INTERVALS: INTERVALS,
    MAX_BOX: MAX_BOX,
    MASTER_BOX: MASTER_BOX,

    /** 品質分數 → 盒子調整量 */
    //  0 = 完全不會 → 打回 box 0
    //  1 = 有點難   → 留在原盒
    //  2 = 還可以   → 進一格
    //  3 = 很簡單   → 進兩格
    delta: [0, 0, 1, 2],

    /** 產生一顆全新單字的紀錄 */
    fresh: function () {
      return { box: 0, seen: 0, right: 0, wrong: 0, lastAt: 0, dueAt: 0 };
    },

    /**
     * 記錄一次作答，回傳更新後的進度。
     * @param {object} rec  WM.store.record() 拿到的物件
     * @param {number} quality 0~3
     * @returns {object} 更新後的 rec
     */
    grade: function (rec, quality) {
      quality = Math.max(0, Math.min(3, quality | 0));
      var now = Date.now();

      rec.seen += 1;
      if (quality >= 2) rec.right += 1; else rec.wrong += 1;

      var d = this.delta[quality];
      if (quality === 0) {
        rec.box = 0;
        rec.dueAt = now + 10 * 60 * 1000;      // 10 分鐘後再考一次
      } else if (quality === 1) {
        rec.box = Math.max(0, rec.box);
        rec.dueAt = now + Math.max(1, INTERVALS[rec.box] || 1) * WM.util.DAY;
      } else {
        rec.box = Math.min(MAX_BOX, rec.box + d);
        rec.dueAt = now + (INTERVALS[rec.box] || 1) * WM.util.DAY;
      }
      rec.lastAt = now;
      return rec;
    },

    /** 這個單字現在該不該複習 */
    isDue: function (rec, now) {
      now = now || Date.now();
      if (rec.seen === 0) return true;          // 沒學過 → 新的
      return (rec.dueAt || 0) <= now;
    },

    /** 進度百分比（0~100），用來畫長條圖 */
    progressOf: function (rec) {
      return Math.min(100, Math.round((rec.box / MASTER_BOX) * 100));
    },

    /** 是否已掌握 */
    isMastered: function (rec) {
      return rec.box >= MASTER_BOX;
    },

    /** 產生學習佇列：到期優先 → 沒學過 → 最久沒複習 */
    queue: function (items, idOf, recOf, now) {
      now = now || Date.now();
      var list = items.map(function (it) {
        var id = idOf(it);
        var rec = recOf(id);
        return {
          item: it,
          id: id,
          rec: rec,
          due: WM.srs.isDue(rec, now),
          isNew: rec.seen === 0,
          overdueDays: rec.lastAt ? Math.floor((now - rec.dueAt) / WM.util.DAY) : 0,
          staleDays: rec.lastAt ? Math.floor((now - rec.lastAt) / WM.util.DAY) : 0
        };
      });

      // 依優先度排序：
      //   1. 到期且學過的（已經排定的複習，真的逾期了）→ 最急，再也不複習就會忘記
      //   2. 到期但沒學過的（第一次學）                  → 其次
      //   3. 還沒到期的                                  → 最後
      // 同一組裡面，再依「逾期天數 / 閒置天數」由多到少排。
      list.sort(function (a, b) {
        if (a.due !== b.due) return a.due ? -1 : 1;

        if (a.isNew !== b.isNew) {
          // 兩者都到期時，「學過但逾期」比「全新」更急
          return a.isNew ? 1 : -1;
        }

        if (a.due && a.overdueDays !== b.overdueDays) {
          return b.overdueDays - a.overdueDays;
        }
        return b.staleDays - a.staleDays;
      });
      return list;
    }
  };

  /* ------------------------------------------------------------
     WM.speech —— 英文發音
     ------------------------------------------------------------
     用瀏覽器內建的 speechSynthesis，不需要任何 API 金鑰。
     第一次呼叫時語音清單常常是空的，要等 voiceschanged 事件。
     ------------------------------------------------------------ */
  var voices = [];
  var ready = false;
  var readyWaiters = [];

  function loadVoices() {
    if (!('speechSynthesis' in global)) return;
    voices = global.speechSynthesis.getVoices() || [];
    if (voices.length && !ready) {
      ready = true;
      readyWaiters.splice(0).forEach(function (fn) { fn(); });
    }
  }

  WM.speech = {
    supported: ('speechSynthesis' in global && 'SpeechSynthesisUtterance' in global),

    /** 啟動：把語音清單載進來 */
    init: function () {
      if (!this.supported) return;
      loadVoices();
      global.speechSynthesis.onvoiceschanged = loadVoices;
      // 保險：有些瀏覽器不會觸發事件，定時試幾次
      var tries = 0;
      var iv = setInterval(function () {
        loadVoices();
        if (ready || ++tries > 20) clearInterval(iv);
      }, 250);
    },

    /** 取得所有英文語音（已排序：英式 → 美式 → 其他） */
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

    /** 挑一個語音：優先用使用者選的，否則英式 > 美式 > 任意 en */
    pick: function (uri) {
      var en = this.list();
      if (!en.length) return null;
      if (uri) {
        for (var i = 0; i < en.length; i++) if (en[i].voiceURI === uri) return en[i];
      }
      return en[0] || null;
    },

    /**
     * 朗讀一段英文。
     * @param {string} text
     * @param {object} opts { rate, uri, onend, onstart }
     */
    speak: function (text, opts) {
      opts = opts || {};
      if (!this.supported || !text) { if (opts.onend) opts.onend(); return null; }

      var synth = global.speechSynthesis;
      try { synth.cancel(); } catch (e) { /* 忽略 */ }

      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = 'en-US';
      u.rate = Math.max(0.1, Math.min(2, opts.rate != null ? opts.rate : WM.store.get('rate')));
      u.pitch = 1;
      u.volume = 1;

      var v = this.pick(opts.uri || WM.store.get('voiceURI'));
      if (v) { u.voice = v; u.lang = v.lang; }

      if (opts.onstart) u.onstart = opts.onstart;
      u.onend = function () { if (opts.onend) opts.onend(); };
      u.onerror = function () { if (opts.onend) opts.onend(); };

      // Chrome 偶爾會卡住，強制在預估時間後收尾
      var guard = setTimeout(function () {
        if (!speechSynthesis.speaking) return;
        try { synth.cancel(); } catch (e) { /* 忽略 */ }
        if (opts.onend) opts.onend();
      }, Math.max(2500, String(text).length * 110));

      var clear = function () { clearTimeout(guard); };
      var prevEnd = u.onend;
      u.onend = function () { clear(); prevEnd && prevEnd(); };
      var prevErr = u.onerror;
      u.onerror = function () { clear(); prevErr && prevErr(); };

      synth.speak(u);
      return u;
    },

    stop: function () {
      if (!this.supported) return;
      try { global.speechSynthesis.cancel(); } catch (e) { /* 忽略 */ }
    }
  };

  /* ------------------------------------------------------------
     WM.stats —— 統計
     ------------------------------------------------------------ */
  WM.stats = {
    /** 某個字庫的掌握狀況 */
    packProgress: function (pack) {
      var store = WM.store;
      var total = pack.words.length;
      var learned = 0, mastered = 0, due = 0, seen = 0;
      var now = Date.now();
      pack.words.forEach(function (w) {
        var rec = store.record(pack.id + '/' + w.w);
        if (rec.seen > 0) seen++;
        if (WM.srs.progressOf(rec) > 0) learned++;
        if (WM.srs.isMastered(rec)) mastered++;
        if (WM.srs.isDue(rec, now)) due++;
      });
      return {
        total: total,
        seen: seen,
        learned: learned,
        mastered: mastered,
        due: due,
        pct: total ? Math.round((learned / total) * 100) : 0
      };
    },

    /** 連續學習天數（今天沒學也不算斷，從昨天往前算） */
    streak: function () {
      var log = WM.store.state.log;
      var keys = Object.keys(log).filter(function (k) { return log[k].reviewed > 0; });
      if (!keys.length) return 0;
      var today = WM.util.dateKey();
      var hasToday = keys.indexOf(today) !== -1;
      var cursor = today;
      if (!hasToday) {
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

    /** 今天完成幾張卡 / 目標幾張 */
    todayProgress: function () {
      var t = WM.store.today();
      var goal = WM.store.get('dailyGoal') || 20;
      return { done: t.reviewed, goal: goal, pct: Math.min(100, Math.round((t.reviewed / goal) * 100)) };
    },

    /** 整體總覽 */
    overview: function (packs) {
      var totalWords = 0, learned = 0, mastered = 0, due = 0;
      packs.forEach(function (p) {
        var s = WM.stats.packProgress(p);
        totalWords += s.total; learned += s.learned;
        mastered += s.mastered; due += s.due;
      });
      return {
        totalWords: totalWords,
        learned: learned,
        mastered: mastered,
        due: due,
        streak: WM.stats.streak(),
        today: WM.stats.todayProgress(),
        quiz: WM.store.state.quiz
      };
    },

    /** 最近 n 天的每日複習量 [{key, reviewed, right}] */
    recent: function (n) {
      n = n || 14;
      var log = WM.store.state.log;
      var out = [];
      var d = new Date();
      for (var i = n - 1; i >= 0; i--) {
        var t = new Date(d); t.setDate(d.getDate() - i);
        var k = WM.util.dateKey(t.getTime());
        var e = log[k] || { reviewed: 0, right: 0, ms: 0 };
        out.push({ key: k, reviewed: e.reviewed, right: e.right, ms: e.ms });
      }
      return out;
    },

    /** 全部學習紀錄（heatmap 用）：{ 'YYYY-MM-DD': 次數 } */
    heatmap: function () {
      var log = WM.store.state.log, out = {};
      for (var k in log) if (log[k].reviewed > 0) out[k] = log[k].reviewed;
      return out;
    }
  };

  global.WM = WM;
})(typeof window !== 'undefined' ? window : this);
