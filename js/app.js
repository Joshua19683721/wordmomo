/* ============================================================
   WordMomo — 介面主程式
   ------------------------------------------------------------
   這個檔案負責「畫畫面 + 接收互動」：
     1. 小工具與全域綁定
     2. 儀表板（總覽、今日單字、字庫選擇）
     3. 單字卡（翻卡 + 語音 + 熟悉度評分）
     4. 測驗（四種模式 + 計分 + 錯題回顧）
     5. 統計（學習曲線、連續天數heatmap、掌握度）
     6. 設定抽屜（目標、語速、音色、匯出匯入）
     7. 路由與啟動
   想加新頁面？在 views 物件裡加一個函式，再把 nav 加一顆即可。
   ============================================================ */
(function () {
  'use strict';

  var WM = window.WM;
  var DATA = window.WORDMOMO_DATA || { packs: [] };
  var packs = DATA.packs || [];
  var $ = function (sel) { return document.querySelector(sel); };
  var esc = function (s) { return WM.util.esc(s); };

  /* 把所有單字攤平成一份清單，並給每個單字一個唯一 id */
  var allWords = [];
  packs.forEach(function (p) {
    p.words.forEach(function (w) {
      allWords.push({ pack: p, word: w, id: p.id + '/' + w.w });
    });
  });
  function findPack(id) {
    for (var i = 0; i < packs.length; i++) if (packs[i].id === id) return packs[i];
    return packs[0];
  }
  function recOf(id) { return WM.store.record(id); }

  /* 各頁面暫存（切換頁面時不會消失） */
  var session = {
    study: { packId: null, queue: [], idx: 0, flipped: false, correct: 0, done: false },
    quiz:  { mode: null, packId: null, total: 10, items: [], idx: 0, answered: false, results: [], lastAnswer: null, done: false }
  };

  /* ============================================================
     1. 小工具
     ============================================================ */
  function toast(msg, kind) {
    var wrap = $('#toastWrap');
    var el = document.createElement('div');
    el.className = 'toast' + (kind ? ' toast--' + kind : '');
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }, 2300);
  }

  function speak(text, onStart, onEnd) {
    var btn = document.querySelector('.speak-btn.is-playing');
    if (btn) btn.classList.remove('is-playing');
    WM.speech.speak(text, {
      onstart: function () {
        var b = document.querySelector('.speak-btn');
        if (b) b.classList.add('is-playing');
        if (onStart) onStart();
      },
      onend: function () {
        var b = document.querySelector('.speak-btn');
        if (b) b.classList.remove('is-playing');
        if (onEnd) onEnd();
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f5fc' : '#0c0d1a');
  }

  function ringSVG(pct) {
    var R = 52, C = 2 * Math.PI * R;
    var off = C * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<svg viewBox="0 0 116 116" aria-hidden="true">' +
      '<circle class="ring__track" cx="58" cy="58" r="' + R + '"></circle>' +
      '<circle class="ring__value" cx="58" cy="58" r="' + R + '" ' +
        'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle>' +
      '</svg>';
  }

  function statTile(ico, num, label) {
    return '<div class="card stat-tile">' +
      '<div class="stat-tile__ico">' + ico + '</div>' +
      '<div><div class="stat-tile__num">' + num + '</div>' +
      '<div class="stat-tile__lab">' + label + '</div></div></div>';
  }

  /* ============================================================
     2. 儀表板
     ============================================================ */
  function viewDashboard() {
    var ov = WM.stats.overview(packs);
    var today = ov.today;

    /* 今日單字：依日期決定，每天固定但會換 */
    var dayIndex = Math.floor(WM.util.startOfDay(WM.util.dateKey()) / WM.util.DAY);
    var dw = allWords[dayIndex % allWords.length];

    var packHTML = packs.map(function (p) {
      var s = WM.stats.packProgress(p);
      return '<button class="pack" data-start-pack="' + p.id + '">' +
        '<div class="pack__ico">' + p.icon + '</div>' +
        '<div class="pack__body">' +
          '<div class="pack__name">' + esc(p.name) + ' <span class="pill">' + esc(p.level) + '</span></div>' +
          '<div class="pack__meta">' + s.learned + ' / ' + s.total + ' 詞' +
            (s.due > 0 ? ' · <span style="color:var(--warn)">' + s.due + ' 待複習</span>' : '') + '</div>' +
          '<div class="bar pack__bar"><div class="bar__fill" style="width:' + s.pct + '%"></div></div>' +
        '</div>' +
        '<div class="pack__pct">' + s.pct + '%</div>' +
      '</button>';
    }).join('');

    return '' +
    '<section class="hero">' +
      '<div class="hero__text">' +
        '<p class="hero__hi">' + WM.util.greeting() + '，今天的單字准备好了嗎？</p>' +
        '<h1 class="hero__title">已複習 ' + today.done + ' / ' + today.goal + ' 張單字卡</h1>' +
        '<p class="hero__sub">' +
          (ov.due > 0
            ? '目前有 <strong>' + ov.due + '</strong> 個單字等你複習。'
            : '今天的複習都完成了，繼續挑戰新單字吧！') +
        '</p>' +
        '<div class="btn-row" style="margin-top:16px">' +
          '<a class="btn btn--lg" href="#/study" style="background:#fff;color:var(--brand-700);border:0">開始學習 ▸</a>' +
          '<a class="btn btn--lg btn--ghost" href="#/quiz" style="border-color:rgba(255,255,255,.5);color:#fff">直接測驗</a>' +
        '</div>' +
      '</div>' +
      '<div class="ring">' + ringSVG(today.pct) +
        '<div class="ring__mid"><div class="ring__num">' + today.pct + '%</div>' +
        '<div class="ring__cap">今日目標</div></div>' +
      '</div>' +
    '</section>' +

    '<div class="grid grid--4" style="margin-bottom:18px">' +
      statTile('🔥', ov.streak, '連續天數') +
      statTile('📚', ov.learned + ' / ' + ov.totalWords, '已學單字') +
      statTile('🏆', ov.mastered, '已掌握') +
      statTile('✅', ov.quiz.total ? WM.util.pct(ov.quiz.right, ov.quiz.total) : '—', '測驗正確率') +
    '</div>' +

    '<div class="stack">' +
      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">今日單字</h2>' +
        '<span class="pill pill--brand">每天一顆</span></div>' +
        '<div class="daily-word">' +
          '<div class="daily-word__w">' + esc(dw.word.w) + '</div>' +
          '<div class="daily-word__ipa">' + esc(dw.word.ipa) + ' <span class="pill">' + esc(dw.word.pos) + '</span></div>' +
          '<div class="daily-word__zh">' + esc(dw.word.zh) + '</div>' +
          '<button class="speak-btn" data-speak="' + esc(dw.word.w) + '" aria-label="播放發音">🔊</button>' +
          '<p class="daily-word__en" style="margin-top:16px">' + esc(dw.word.en) + '</p>' +
          '<p class="daily-word__zhen">' + esc(dw.word.zhEn) + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">選擇字庫</h2>' +
        '<span class="card__sub">共 ' + packs.length + ' 個主題</span></div>' +
        '<div class="stack" style="gap:10px">' + packHTML + '</div>' +
      '</section>' +
    '</div>';
  }

  /* ============================================================
     3. 單字卡
     ============================================================ */
  function startStudy(packId, keepHash) {
    var pack = findPack(packId || WM.store.get('lastPack') || packs[0].id);
    WM.store.set('lastPack', pack.id);

    var ranked = WM.srs.queue(pack.words, function (w) { return pack.id + '/' + w.w; }, recOf);
    var goal = WM.store.get('dailyGoal') || 20;

    /* 到期該複習的排前面，再補上還沒學過的。
       注意：未學過的單字 isDue() 也會回 true，所以要扣掉 isNew 才不會重複排兩次。 */
    var due   = ranked.filter(function (r) { return r.due && !r.isNew; });
    var fresh = ranked.filter(function (r) { return r.isNew; });
    var picked = due.concat(fresh).slice(0, goal);

    if (!picked.length) picked = ranked.slice(0, goal);   // 全都還沒到期 → 隨機複習

    session.study = {
      packId: pack.id, pack: pack,
      queue: picked, idx: 0, flipped: false, correct: 0, done: false
    };

    if (!keepHash) {
      location.hash = '#/study/' + pack.id;   /* 深層連結：#/study/tech 可以直接連到某個字庫 */
      render();                               /* hash 沒變時不會觸發 hashchange，所以主動重畫 */
    }
  }

  function viewStudy() {
    var s = session.study;

    /* 深層連結 #/study/<packId>：直接開課 */
    var want = routeArg();
    if (want && packs.some(function (p) { return p.id === want; })) {
      if (s.packId !== want) {
        startStudy(want, true);
        s = session.study;              /* startStudy 會重新指派 session.study，要重新抓一次 */
        location.replace('#/study/' + want);
      }
    }

    if (!s.packId) {
      /* 還沒選字庫 → 顯示選擇畫面 */
      return '<div class="stack">' +
        '<section class="card card--pad-lg">' +
          '<div class="card__head"><div><h2 class="card__title">選擇要學的字庫</h2>' +
          '<p class="card__sub">系統會優先安排「到期該複習」和「還沒學過」的單字</p></div></div>' +
          '<div class="stack" style="gap:10px">' +
            packs.map(function (p) {
              var st = WM.stats.packProgress(p);
              return '<button class="pack" data-start-pack="' + p.id + '">' +
                '<div class="pack__ico">' + p.icon + '</div>' +
                '<div class="pack__body"><div class="pack__name">' + esc(p.name) + '</div>' +
                '<div class="pack__meta">' + st.due + ' 待複習 · ' + st.total + ' 總詞數</div></div>' +
                '<div class="pack__pct">' + st.pct + '%</div></button>';
            }).join('') +
          '</div>' +
        '</section></div>';
    }

    if (s.done || s.idx >= s.queue.length) return studySummary();

    var row = s.queue[s.idx];
    var w = row.item;
    var zhFirst = !!WM.store.get('zhFirst');

    /* 正面：看英文（預設）或看中文（zhFirst 開啟時，訓練「回想」而非「認得」）
       背面：永遠是完整的解說 */
    var speakBtn = '<button class="speak-btn" data-speak="' + esc(w.w) + '" aria-label="播放發音">🔊</button>';

    var frontHTML = zhFirst
      ? '<div class="flash__zh">' + esc(w.zh) + '</div>' +
        '<div class="flash__ipa">' + esc(w.pos) + ' · ' + esc(w.en) + '</div>' +
        speakBtn +
        '<div class="flash__hint">先自己回想英文，再翻面對答案</div>'
      : '<div class="flash__w">' + esc(w.w) + '</div>' +
        '<div class="flash__ipa">' + esc(w.ipa) + ' <span class="pill">' + esc(w.pos) + '</span></div>' +
        speakBtn +
        '<div class="flash__hint">點卡片翻面</div>';

    var front = '<div class="flash__face flash__face--front">' + frontHTML + '</div>';
    var back =
      '<div class="flash__face flash__face--back">' +
        '<div class="flash__w" style="font-size:1.6rem">' + esc(w.w) + '</div>' +
        '<div class="flash__ipa">' + esc(w.ipa) + ' <span class="pill">' + esc(w.pos) + '</span></div>' +
        '<div class="flash__zh">' + esc(w.zh) + '</div>' +
        speakBtn +
        '<p class="flash__en">' + esc(w.en) + '</p>' +
        '<p class="flash__zhen">' + esc(w.zhEn) + '</p>' +
      '</div>';

    return '' +
    '<div class="study__bar">' +
      '<a class="btn btn--ghost btn--sm" href="#/">← 儀表板</a>' +
      '<div class="seg" id="studyPackSeg">' +
        packs.map(function (p) {
          return '<button class="seg__btn' + (p.id === s.packId ? ' is-active' : '') +
                 '" data-switch-pack="' + p.id + '">' + p.icon + ' ' + esc(p.name) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="study__count">' + (s.idx + 1) + ' / ' + s.queue.length + '</div>' +
    '</div>' +

    '<div class="bar" style="margin-bottom:18px"><div class="bar__fill" style="width:' +
      Math.round((s.idx / s.queue.length) * 100) + '%"></div></div>' +

    '<div class="flash' + (s.flipped ? ' is-flipped' : '') + '" id="flashCard">' +
      '<div class="flash__inner">' + front + back + '</div>' +
    '</div>' +

    '<div class="grade" id="gradeRow">' +
      '<button class="btn btn--bad btn--lg" data-grade="0">還不熟 <span class="kbd">←</span></button>' +
      '<button class="btn btn--ok btn--lg" data-grade="3">很簡單 <span class="kbd">→</span></button>' +
    '</div>' +

    '<p style="text-align:center;color:var(--text-3);font-size:.82rem;margin-top:16px">' +
      '快捷鍵：<span class="kbd">空白</span> 翻面 · <span class="kbd">←</span> 不熟 · <span class="kbd">→</span> 簡單' +
    '</p>';
  }

  function studySummary() {
    var s = session.study;
    var total = s.queue.length;
    var rate = total ? Math.round((s.correct / total) * 100) : 0;
    var msg = rate >= 90 ? '太強了！' : rate >= 70 ? '不錯喔！' : rate >= 40 ? '繼續加油！' : '再複習幾輪就會記住了。';
    return '<section class="card card--pad-lg quiz__done">' +
      '<div style="font-size:3rem">' + (rate >= 70 ? '🎉' : '💪') + '</div>' +
      '<h2>本輪完成！</h2>' +
      '<div class="quiz__score">' + rate + '<small>% 正確率</small></div>' +
      '<p style="color:var(--text-2)">' + msg + '</p>' +
      '<p style="color:var(--text-3);font-size:.9rem">共複習 ' + total + ' 張單字卡</p>' +
      '<div class="btn-row" style="justify-content:center;margin-top:20px">' +
        '<button class="btn btn--primary" data-restart-study>再學一輪</button>' +
        '<a class="btn btn--ghost" href="#/quiz">做個測驗</a>' +
        '<a class="btn btn--ghost" href="#/">回到儀表板</a>' +
      '</div></section>';
  }

  function flipCard() {
    var s = session.study;
    if (s.done) return;
    s.flipped = !s.flipped;
    var card = $('#flashCard');
    if (card) card.classList.toggle('is-flipped', s.flipped);
    /* 翻到背面時自動念出例句，幫助建立情境記憶 */
    if (s.flipped && WM.store.get('autoPlay')) {
      var w = s.queue[s.idx].item;
      setTimeout(function () { speak(w.en); }, 340);
    }
  }

  function gradeCard(quality) {
    var s = session.study;
    if (s.done || s.idx >= s.queue.length) return;

    var row = s.queue[s.idx];
    WM.srs.grade(row.rec, quality);

    /* 寫入今日紀錄 */
    var t = WM.store.today();
    t.reviewed += 1;
    if (quality >= 2) { t.right += 1; s.correct += 1; }
    WM.store.save();

    WM.speech.stop();
    s.idx += 1;
    s.flipped = false;

    if (s.idx >= s.queue.length) {
      s.done = true;
    }
    render();
  }

  /* ============================================================
     4. 測驗
     ============================================================ */
  var MODES = {
    en2zh:  { icon: '🔤', name: '英翻中選擇題', desc: '看英文單字與例句，從四個中文意思裡選一個。' },
    zh2en:  { icon: '🅰️', name: '中翻英選擇題', desc: '看中文意思，從四個英文單字裡選一個。' },
    listen: { icon: '🎧', name: '聽力測驗',       desc: '只聽發音就能選出正確的英文單字。' },
    spell:  { icon: '⌨️', name: '聽寫拼字',       desc: '看中文與例句，直接把英文單字打出來。' }
  };

  function viewQuiz() {
    var q = session.quiz;

    /* 深層連結：
         #/quiz/listen        → 預選「聽力測驗」模式
         #/quiz/listen/daily  → 直接用「日常生活」字庫開始測驗
         #/quiz/listen/all    → 直接用全部字庫開始測驗 */
    var parts = routeParts();
    var want = parts[1] || '';
    var wantPack = parts[2] || '';

    if (MODES[want]) {
      if (q.mode !== want) { q.mode = want; q.started = false; }
      if (wantPack && !q.started) {
        buildQuiz(want, wantPack, q.total);
        return quizQuestion();
      }
    }

    if (!q.mode) return quizSetup();
    if (q.done) return quizResult();
    return quizQuestion();
  }

  function quizSetup() {
    var modeHTML = Object.keys(MODES).map(function (k) {
      var m = MODES[k];
      var on = session.quiz.mode === k ? ' is-active' : '';
      return '<button class="mode' + on + '" data-mode="' + k + '">' +
        '<div class="mode__ico">' + m.icon + '</div>' +
        '<div class="mode__name">' + m.name + '</div>' +
        '<div class="mode__desc">' + m.desc + '</div></button>';
    }).join('');

    return '<section class="card card--pad-lg quiz__setup">' +
      '<div class="card__head"><div>' +
        '<h2 class="card__title">選擇測驗模式</h2>' +
        '<p class="card__sub">答對的單字會自動升級，不熟的會回到最前面再練</p>' +
      '</div></div>' +
      '<div class="quiz__modes">' + modeHTML + '</div>' +
      '<div class="grid grid--2">' +
        '<div class="field"><label for="qPack">字庫</label>' +
          '<select class="input" id="qPack">' +
            '<option value="all">全部字庫</option>' +
            packs.map(function (p) { return '<option value="' + p.id + '">' + p.icon + ' ' + esc(p.name) + '</option>'; }).join('') +
          '</select></div>' +
        '<div class="field"><label for="qCount">題數</label>' +
          '<select class="input" id="qCount">' +
            [5, 10, 15, 20, 30].map(function (n) { return '<option value="' + n + '"' + (n === 10 ? ' selected' : '') + '>' + n + ' 題</option>'; }).join('') +
          '</select></div>' +
      '</div>' +
      '<button class="btn btn--primary btn--lg btn--block" id="qStart">開始測驗 ▸</button>' +
    '</section>';
  }

  function buildQuiz(mode, packId, count) {
    var pool = packId === 'all'
      ? allWords
      : allWords.filter(function (x) { return x.pack.id === packId; });

    /* 優先出題：到期 / 沒學過的排在最前面（WM.srs.queue 已經排好序） */
    var picked = WM.srs.queue(pool, function (x) { return x.id; }, recOf).slice(0, count);

    /* 選的字庫太小時，從其他字庫隨機補到指定題數 */
    var guard = 0;
    var have = {};
    picked.forEach(function (r) { have[r.item.id] = true; });
    while (picked.length < count && guard < count * 12) {
      guard++;
      var extra = WM.util.sample(allWords, 1)[0];
      if (!extra || have[extra.id]) continue;
      have[extra.id] = true;
      picked.push({ item: extra, id: extra.id, rec: recOf(extra.id), due: true, isNew: false, staleDays: 0 });
    }

    var items = picked.map(function (r) {
      var x = r.item;                 // { pack, word, id }
      var w = x.word;

      /* 干擾項優先取自同一個字庫，不夠再從全部字庫補 */
      var dist = WM.util.sample(pool.filter(function (o) { return o.word.w !== w.w; }), 3);
      var g2 = 0;
      while (dist.length < 3 && g2 < 40) {
        g2++;
        var d = WM.util.sample(allWords, 1)[0];
        if (d && d.word.w !== w.w && !dist.some(function (o) { return o.word.w === d.word.w; })) dist.push(d);
      }

      return {
        entry: x, id: x.id, word: w,
        options: WM.util.shuffle(dist.slice(0, 3).map(function (o) { return o.word; }).concat([w]))
      };
    });

    session.quiz = {
      mode: mode, packId: packId, total: items.length,
      items: items, idx: 0, answered: false, results: [], done: false, started: true
    };
  }

  function quizQuestion() {
    var q = session.quiz;
    var it = q.items[q.idx];
    var w = it.word;
    var pct = Math.round((q.idx / q.total) * 100);

    var stem = '', body = '';

    if (q.mode === 'en2zh') {
      stem = '<div class="quiz__q">這個單字是什麼意思？</div>' +
        '<div class="quiz__main">' + esc(w.w) + '</div>' +
        '<div class="quiz__prompt">' + esc(w.ipa) + ' · ' + esc(w.en) + '</div>';
      body = '<div class="opts">' + it.options.map(function (o) {
        return '<button class="opt" data-answer="' + esc(o.zh) + '">' + esc(o.zh) + '</button>';
      }).join('') + '</div>';
    } else if (q.mode === 'zh2en') {
      stem = '<div class="quiz__q">這個意思是哪個英文？</div>' +
        '<div class="quiz__main">' + esc(w.zh) + '</div>' +
        '<div class="quiz__prompt">' + esc(w.pos) + '</div>';
      body = '<div class="opts">' + it.options.map(function (o) {
        return '<button class="opt" data-answer="' + esc(o.w) + '">' + esc(o.w) + '</button>';
      }).join('') + '</div>';
    } else if (q.mode === 'listen') {
      stem = '<div class="quiz__q">聽聽看，這是哪個單字？</div>' +
        '<div style="margin:18px 0"><button class="speak-btn" data-speak="' + esc(w.w) + '" aria-label="播放發音" style="width:78px;height:78px;font-size:1.9rem">🔊</button></div>' +
        '<div class="quiz__prompt">點上面的喇叭可以重播</div>';
      body = '<div class="opts">' + it.options.map(function (o) {
        return '<button class="opt" data-answer="' + esc(o.w) + '">' + esc(o.w) + '</button>';
      }).join('') + '</div>';
    } else {
      /* spell 聽寫 */
      stem = '<div class="quiz__q">請拼出這個英文單字</div>' +
        '<div class="quiz__main">' + esc(w.zh) + '</div>' +
        '<div class="quiz__prompt">' + esc(w.en).replace(new RegExp('\\b' + w.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i'), '＿＿＿＿') + '</div>';
      body = '<div class="typed"><div class="typed__row">' +
        '<input class="input" id="spellInput" type="text" autocomplete="off" autocapitalize="off" ' +
          'autocorrect="off" spellcheck="false" placeholder="輸入英文單字…">' +
        '<button class="btn btn--primary" data-spell-submit>送出</button>' +
        '</div></div>';
    }

    return '' +
    '<div class="quiz__progress">' +
      '<button class="btn btn--ghost btn--sm" data-quiz-exit>← 離開</button>' +
      '<div class="bar"><div class="bar__fill" style="width:' + pct + '%"></div></div>' +
      '<div class="study__count" style="margin:0">' + (q.idx + 1) + ' / ' + q.total + '</div>' +
    '</div>' +

    '<section class="card card--pad-lg">' +
      '<div class="quiz__stem">' + stem + '</div>' +
      body +
      '<div id="quizFeedback"></div>' +
    '</section>' +

    (q.mode === 'listen' ? '<p style="text-align:center;color:var(--text-3);font-size:.82rem;margin-top:16px">' +
      '快捷鍵：<span class="kbd">空白</span> 重播發音 · <span class="kbd">1</span><span class="kbd">2</span><span class="kbd">3</span><span class="kbd">4</span> 選答案</p>' : '');
  }

  function submitAnswer(given) {
    var q = session.quiz;
    if (q.answered) return;

    var it = q.items[q.idx];
    var w = it.word;
    var expected = (q.mode === 'en2zh') ? w.zh : w.w;
    var isRight = q.mode === 'spell'
      ? String(given).trim().toLowerCase() === w.w.toLowerCase()
      : given === expected;

    q.answered = true;
    q.lastAnswer = isRight;

    /* 選擇題：把對錯直接標在選項上 */
    if (q.mode !== 'spell') {
      var btns = document.querySelectorAll('.opt');
      for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        b.disabled = true;
        if (b.getAttribute('data-answer') === expected) b.classList.add('is-right');
        else if (b.getAttribute('data-answer') === given) b.classList.add('is-wrong');
      }
    } else {
      var input = $('#spellInput');
      if (input) {
        input.disabled = true;
        input.classList.add(isRight ? 'is-right' : 'is-wrong');
      }
    }

    /* 更新間隔重複進度 */
    WM.srs.grade(recOf(it.id), isRight ? 3 : 0);
    var t = WM.store.today();
    t.reviewed += 1;
    if (isRight) t.right += 1;
    q.results.push({ word: w, zh: w.zh, right: isRight, given: given });
    var st = WM.store.state.quiz;
    st.total += 1;
    if (isRight) st.right += 1;
    if (st.total > 0) {
      var rate = st.right / st.total;
      st.streak = rate >= 0.7 ? st.streak + 1 : 0;
      if (st.streak > st.best) st.best = st.streak;
    }
    WM.store.save();

    /* 顯示回饋 */
    var fb = $('#quizFeedback');
    if (fb) {
      fb.innerHTML =
        '<div class="feedback feedback--' + (isRight ? 'ok' : 'bad') + '">' +
          '<div class="feedback__head">' + (isRight ? '✓ 答對了！' : '✗ 再記一次') + '</div>' +
          '<div class="feedback__en"><strong>' + esc(w.w) + '</strong> ' + esc(w.ipa) + ' · ' + esc(w.pos) + ' — ' + esc(w.zh) + '</div>' +
          '<div class="feedback__zh">' + esc(w.en) + '<br>' + esc(w.zhEn) + '</div>' +
        '</div>' +
        '<div class="btn-row" style="justify-content:center;margin-top:16px">' +
          '<button class="speak-btn" data-speak="' + esc(w.w) + '" aria-label="播放發音" style="width:46px;height:46px;font-size:1.1rem">🔊</button>' +
          '<button class="btn btn--primary" data-next-question>' +
            (q.idx + 1 >= q.total ? '看結果 ▸' : '下一題 ▸') +
          '</button>' +
        '</div>';
      if (WM.store.get('autoPlay')) setTimeout(function () { speak(w.w); }, 200);
    }
  }

  function nextQuestion() {
    var q = session.quiz;
    if (!q.answered) return;
    q.idx += 1;
    q.answered = false;
    if (q.idx >= q.items.length) q.done = true;
    render();
    if (q.mode === 'listen') setTimeout(function () { speak(q.items[q.idx].word.w); }, 250);
  }

  function quizResult() {
    var q = session.quiz;
    var right = q.results.filter(function (r) { return r.right; }).length;
    var total = q.results.length;
    var rate = total ? Math.round((right / total) * 100) : 0;

    var wrong = q.results.filter(function (r) { return !r.right; });
    var reviewHTML = wrong.length
      ? '<div class="review-list">' + wrong.map(function (r) {
          return '<div class="review-item">' +
            '<span>' + (r.given ? '❌' : '⏳') + '</span>' +
            '<span class="review-item__w">' + esc(r.word.w) + '</span>' +
            '<span class="review-item__zh">' + esc(r.word.zh) + '</span>' +
            '<span class="review-item__mark">' + (r.given ? '你選了「' + esc(r.given) + '」' : '沒作答') + '</span>' +
          '</div>';
        }).join('') + '</div>'
      : '<p style="color:var(--ok);text-align:center">全部答對，沒有錯題！</p>';

    var msg = rate === 100 ? '滿分！太厲害了 🎉' : rate >= 80 ? '表現很好！' : rate >= 50 ? '還可以，再練會更穩。' : '這些單字要多看幾次。';

    return '<section class="card card--pad-lg quiz__done">' +
      '<div style="font-size:3rem">' + (rate >= 80 ? '🎉' : rate >= 50 ? '💪' : '📚') + '</div>' +
      '<h2>測驗完成</h2>' +
      '<div class="quiz__score">' + rate + '<small>% 正確率</small></div>' +
      '<p style="color:var(--text-2)">' + msg + '（答對 ' + right + ' / ' + total + ' 題）</p>' +
      (wrong.length ? '<h3 style="margin-top:26px">需要加強的單字</h3>' + reviewHTML : '') +
      '<div class="btn-row" style="justify-content:center;margin-top:24px">' +
        '<button class="btn btn--primary" data-quiz-again>再測一次</button>' +
        '<a class="btn btn--ghost" href="#/study">回去背單字</a>' +
        '<a class="btn btn--ghost" href="#/">回到儀表板</a>' +
      '</div></section>';
  }

  /* ============================================================
     5. 統計
     ============================================================ */
  function viewStats() {
    var ov = WM.stats.overview(packs);
    var recent = WM.stats.recent(14);
    var max = Math.max.apply(null, recent.map(function (r) { return r.reviewed; }).concat([1]));

    var barsHTML = recent.map(function (r) {
      var h = Math.round((r.reviewed / max) * 100);
      var d = r.key.split('-');
      return '<div class="chart__col" title="' + r.key + '：' + r.reviewed + ' 張">' +
        '<div class="chart__bar' + (r.reviewed ? '' : ' chart__bar--empty') + '" style="height:' + Math.max(3, h) + '%"></div>' +
        '<div class="chart__lab">' + (+d[1]) + '/' + (+d[2]) + '</div></div>';
    }).join('');

    /* heatmap：最近 91 天，湊成 13 週 × 7 天（由週日開始） */
    var heat = WM.stats.heatmap();
    var cells = '';
    var start = new Date();
    start.setDate(start.getDate() - 90);
    start.setDate(start.getDate() - start.getDay());   // 往前回推到最近的週日
    for (var i = 0; i < 91; i++) {
      var t = new Date(start); t.setDate(start.getDate() + i);
      var k = WM.util.dateKey(t.getTime());
      var c = heat[k] || 0;
      var lv = c === 0 ? 0 : c < 10 ? 1 : c < 25 ? 2 : c < 50 ? 3 : 4;
      cells += '<div class="heat__cell" data-lv="' + lv + '" title="' + k + '：' + c + ' 張"></div>';
    }

    var masteryHTML = packs.map(function (p) {
      var s = WM.stats.packProgress(p);
      var pr = s.total ? Math.round((s.mastered / s.total) * 100) : 0;
      return '<div class="mastery__row">' +
        '<div class="mastery__name">' + p.icon + ' ' + esc(p.name) + '</div>' +
        '<div class="mastery__num">' + s.mastered + ' / ' + s.total + ' 已掌握</div>' +
        '<div class="bar"><div class="bar__fill bar__fill--ok" style="width:' + pr + '%"></div></div>' +
      '</div>';
    }).join('');

    var totalLearnedPct = ov.totalWords ? Math.round((ov.learned / ov.totalWords) * 100) : 0;

    return '<div class="stack">' +
      '<div class="grid grid--4">' +
        statTile('🔥', ov.streak, '連續天數') +
        statTile('📖', ov.learned, '學過的單字') +
        statTile('🏆', ov.mastered, '已掌握') +
        statTile('⚡', ov.quiz.best, '最高連對') +
      '</div>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">近 14 天複習量</h2>' +
        '<span class="card__sub">今天 ' + ov.today.done + ' 張</span></div>' +
        '<div class="chart">' + barsHTML + '</div>' +
      '</section>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">學習日曆</h2>' +
        '<span class="card__sub">最近 13 週</span></div>' +
        '<div class="heat">' + cells + '</div>' +
        '<p style="color:var(--text-3);font-size:.8rem;margin:10px 0 0">顏色越深代表當天複習越多張單字卡</p>' +
      '</section>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">各字庫掌握度</h2></div>' +
        '<div class="mastery">' + masteryHTML + '</div>' +
        '<div style="margin-top:20px">' +
          '<div style="display:flex;justify-content:space-between;font-size:.86rem;margin-bottom:6px">' +
            '<span style="color:var(--text-2)">整體進度</span>' +
            '<span style="font-weight:700">' + totalLearnedPct + '%</span></div>' +
          '<div class="bar"><div class="bar__fill" style="width:' + totalLearnedPct + '%"></div></div>' +
        '</div>' +
      '</section>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">測驗紀錄</h2></div>' +
        '<div class="grid grid--3">' +
          statTile('✎', ov.quiz.total, '累積題數') +
          statTile('✅', ov.quiz.total ? WM.util.pct(ov.quiz.right, ov.quiz.total) : '—', '總正確率') +
          statTile('🔥', ov.quiz.streak, '目前連對') +
        '</div>' +
      '</section>' +
    '</div>';
  }

  /* ============================================================
     6. 設定
     ============================================================ */
  function openDrawer() { $('#settingsDrawer').hidden = false; }
  function closeDrawer() { $('#settingsDrawer').hidden = true; }

  function syncSettingsUI() {
    var s = WM.store.state.settings;
    $('#setGoal').value = s.dailyGoal;
    $('#setGoalOut').textContent = s.dailyGoal;
    $('#setSpeechRate').value = s.rate;
    $('#setSpeechRateOut').textContent = Number(s.rate).toFixed(2);
    $('#setAutoPlay').checked = !!s.autoPlay;
    $('#setZhFirst').checked = !!s.zhFirst;
    applyTheme(s.theme || 'dark');

    var sel = $('#setVoice');
    var en = WM.speech.list();
    var hint = $('#voiceHint');
    if (!WM.speech.supported) {
      hint.textContent = '這個瀏覽器不支援語音發音功能，建議改用 Chrome 或 Edge。';
      sel.innerHTML = '<option>不支援</option>';
      sel.disabled = true;
      return;
    }
    if (!en.length) {
      hint.textContent = '正在偵測語音…（若持續空白表示系統尚未安裝英文語音包）';
      sel.innerHTML = '<option value="">載入中…</option>';
      return;
    }
    sel.innerHTML = en.map(function (v) {
      return '<option value="' + esc(v.voiceURI) + '"' + (v.voiceURI === s.voiceURI ? ' selected' : '') + '>' +
        esc(v.name) + ' (' + esc(v.lang) + ')</option>';
    }).join('');
    if (!s.voiceURI) sel.value = en[0].voiceURI;
    hint.textContent = '共 ' + en.length + ' 個英文語音可選。';
  }

  function bindSettings() {
    $('#setGoal').addEventListener('input', function () {
      $('#setGoalOut').textContent = this.value;
      WM.store.set('dailyGoal', +this.value);
    });
    $('#setSpeechRate').addEventListener('input', function () {
      $('#setSpeechRateOut').textContent = (+this.value).toFixed(2);
      WM.store.set('rate', +this.value);
    });
    $('#setAutoPlay').addEventListener('change', function () { WM.store.set('autoPlay', this.checked); });
    $('#setZhFirst').addEventListener('change', function () { WM.store.set('zhFirst', this.checked); });
    $('#setVoice').addEventListener('change', function () {
      WM.store.set('voiceURI', this.value);
      speak('Hello, this is how I sound.');
    });

    document.querySelectorAll('[data-close-drawer]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });

    /* 點頁面空白處開啟設定：鍵盤 "，" 或齒輪 */
    $('#exportBtn').addEventListener('click', function () {
      var blob = new Blob([WM.store.exportJSON()], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'wordmomo-progress-' + WM.util.dateKey() + '.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      toast('已匯出進度檔', 'ok');
    });
    $('#importBtn').addEventListener('click', function () { $('#importFile').click(); });
    $('#importFile').addEventListener('change', function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          WM.store.importJSON(String(reader.result));
          toast('匯入成功！', 'ok');
          syncSettingsUI();
          render();
        } catch (e) {
          toast('匯入失敗：檔案格式不正確', 'bad');
        }
      };
      reader.readAsText(f);
      this.value = '';
    });
    $('#resetBtn').addEventListener('click', function () {
      if (confirm('確定要清除全部學習進度嗎？\n這個動作無法復原。')) {
        WM.store.reset();
        toast('已清除全部進度');
        render();
      }
    });
  }

  /* ============================================================
     7. 路由與事件
     ============================================================ */
  var ROUTES = {
    dashboard: viewDashboard,
    study:    viewStudy,
    quiz:     viewQuiz,
    stats:    viewStats
  };

  /* 支援兩種深層連結：
       #/study/tech   → 直接進入「科技網路」字庫的單字卡
       #/quiz/listen   → 直接預選「聽力測驗」模式
     hash 格式：#/<頁面>/<參數> */
  function routeParts() {
    var h = (location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
    return h.split('/').filter(function (x) { return x; });
  }

  function currentRoute() {
    var p = routeParts();
    return ROUTES[p[0]] ? p[0] : 'dashboard';
  }

  /* 取得 hash 裡的參數，例如 #/study/tech 的 tech */
  function routeArg() {
    return routeParts()[1] || '';
  }

  function render() {
    var route = currentRoute();
    var app = $('#app');

    /* 換頁時先關掉抽屜、停掉發音 */
    closeDrawer();
    WM.speech.stop();

    /* 畫面產生失敗時不要整頁卡死，直接把錯誤顯示出來（方便日後改程式時除錯） */
    var html;
    try {
      html = ROUTES[route]();
    } catch (err) {
      if (window.console) console.error(err);
      html = '<div class="card empty"><div class="empty__ico">⚠️</div>' +
        '<h2>這頁載入失敗</h2>' +
        '<p style="color:var(--bad);font-family:ui-monospace,monospace">' +
          esc(err && err.message ? err.message : String(err)) + '</p>' +
        '<p>多半是 <code>js/data.js</code> 的資料格式不正確，檢查每個單字是不是都有 ' +
        '<code>w / ipa / pos / zh / en / zhEn</code> 這六個欄位。</p></div>';
    }
    app.innerHTML = html;

    document.querySelectorAll('.nav__link, .tabbar__link').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-view') === route);
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    /* 進入測驗或單字卡時，自動念出第一張 */
    if (route === 'study' && session.study.queue.length && !session.study.done) {
      if (WM.store.get('autoPlay')) {
        var first = session.study.queue[session.study.idx];
        if (first) setTimeout(function () { speak(first.item.w); }, 300);
      }
    }
    if (route === 'quiz' && session.quiz.mode === 'listen' && !session.quiz.done && !session.quiz.answered) {
      setTimeout(function () {
        var it = session.quiz.items[session.quiz.idx];
        if (it) speak(it.word.w);
      }, 350);
    }
  }

  function onClick(e) {
    var t = e.target;
    var el;

    /* 發音按鈕 */
    if ((el = t.closest('[data-speak]'))) {
      e.stopPropagation();
      speak(el.getAttribute('data-speak'));
      return;
    }

    /* 開始某個字庫 */
    if ((el = t.closest('[data-start-pack]'))) {
      startStudy(el.getAttribute('data-start-pack'));
      return;
    }
    if ((el = t.closest('[data-switch-pack]'))) {
      startStudy(el.getAttribute('data-switch-pack'));
      return;
    }

    /* 翻卡 */
    if ((el = t.closest('#flashCard'))) { flipCard(); return; }

    /* 熟悉度評分 */
    if ((el = t.closest('[data-grade]'))) {
      gradeCard(+el.getAttribute('data-grade'));
      return;
    }
    if ((el = t.closest('[data-restart-study]'))) {
      startStudy(session.study.packId);
      return;
    }

    /* 測驗 */
    if ((el = t.closest('[data-mode]'))) {
      session.quiz.mode = el.getAttribute('data-mode');
      document.querySelectorAll('.mode').forEach(function (m) {
        m.classList.toggle('is-active', m === el);
      });
      return;
    }
    if (t.closest('#qStart')) {
      var packSel = $('#qPack').value;
      var cnt = +$('#qCount').value;
      if (!packs.length) { toast('沒有可用的單字資料', 'bad'); return; }
      buildQuiz(session.quiz.mode, packSel, cnt);
      render();
      return;
    }
    if ((el = t.closest('.opt'))) { submitAnswer(el.getAttribute('data-answer')); return; }
    if (t.closest('[data-quiz-exit]')) {
      WM.speech.stop();
      session.quiz = { mode: null, packId: null, total: 10, items: [], idx: 0, answered: false, results: [], done: false, started: false };
      render();
      return;
    }
    if (t.closest('[data-spell-submit]')) {
      var inp = $('#spellInput');
      if (inp) submitAnswer(inp.value);
      return;
    }
    if (t.closest('[data-next-question]')) { nextQuestion(); return; }
    if (t.closest('[data-quiz-again]')) {

      buildQuiz(session.quiz.mode, session.quiz.packId, session.quiz.total);
      render();
      return;
    }

    /* 設定抽屜 */
    if (t.closest('#themeBtn')) {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      WM.store.set('theme', next);
      return;
    }
    if (t.closest('[data-open-settings]')) { openDrawer(); return; }
  }

  function onKey(e) {
    /* Escape 關閉設定抽屜 */
    if (e.key === 'Escape' && !$('#settingsDrawer').hidden) { closeDrawer(); return; }

    /* 輸入框內不打斷打字 */
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Enter' && e.target.id === 'spellInput') { submitAnswer(e.target.value); }
      return;
    }

    var route = currentRoute();

    if (route === 'study' && !session.study.done) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); gradeCard(3); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); gradeCard(0); return; }
    }

    if (route === 'quiz') {
      var q = session.quiz;
      if (q.mode === 'listen' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        var cur = q.items[q.idx];
        if (cur && !q.answered) speak(cur.word.w);
        return;
      }
      if (!q.answered && /^[1-9]$/.test(e.key)) {
        var opts = document.querySelectorAll('.opt');
        var idx = +e.key - 1;
        if (opts[idx]) { e.preventDefault(); submitAnswer(opts[idx].getAttribute('data-answer')); }
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && q.answered) { e.preventDefault(); nextQuestion(); }
    }
  }

  /* ============================================================
     啟動
     ============================================================ */
  function boot() {
    if (!packs.length) {
      document.getElementById('app').innerHTML =
        '<div class="card empty"><div class="empty__ico">📭</div>' +
        '<h2>還沒有單字資料</h2><p>請確認 <code>js/data.js</code> 存在且內容正確。</p></div>';
      return;
    }

    WM.store.load();
    applyTheme(WM.store.get('theme') || 'dark');
    WM.speech.init();
    bindSettings();
    syncSettingsUI();

    /* 語音清單通常晚一點才載入，等載好再更新下拉選單 */
    setTimeout(syncSettingsUI, 900);
    setTimeout(syncSettingsUI, 2200);

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', render);
    window.addEventListener('beforeunload', function () { WM.store.save(); });

    /* 先把啟動畫面收掉，再畫內容 —— 就算內容有錯也不會卡在 logo */
    setTimeout(function () {
      var s = document.getElementById('splash');
      if (s) s.classList.add('is-hidden');
    }, 420);

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
