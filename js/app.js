/* ============================================================
   WordMomo — 介面主程式
   ------------------------------------------------------------
   1. 小工具
   2. 儀表板
   3. 學習頁（漸進式打字練習）★ 核心
   4. 字庫管理頁（新增／修改／刪除）
   5. 統計頁
   6. 設定、字庫編輯視窗、匯出
   7. 路由與啟動
   ============================================================ */
(function () {
  'use strict';

  var WM = window.WM;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return WM.util.esc(s); };

  var ICONS = ['📦','🎯','☕','💼','✈️','📚','💻','🗣️','🎨','🧪','🏥','🍳','⚽','🎵','🧠','🌍','🛠️','📝','🔬','🍜'];
  var LEVELS = ['A1','A2','B1','B2','C1','C2'];

  /* 同一個字最多錯幾次，就直接顯示答案 */
  var MAX_STRIKES = 3;

  /* 喇叭按鈕要唸的英文。
     刻意「不」把英文寫進 data-speak 屬性 —— 練習中答案必須是隱藏的，
     如果寫在 HTML 裡，看原始碼就看得到 cheating。這裡改用代號，點擊時才解析。 */
  var sayRegistry = {}, saySeq = 0;
  function sayRef(text) {
    var id = 'say' + (++saySeq);
    sayRegistry[id] = text;
    return id;
  }

  /* 打字練習的暫存狀態 */
  var tstate = {
    packId: null,
    chainId: null,
    stepIdx: 0,
    tokIdx: 0,
    typed: '',
    wrong: false,        // 目前的單字是不是打錯過
    tokErr: 0,           // 目前的單字已經錯幾次
    givenUp: false,      // 錯三次，答案已顯示，等 Enter 重練 / 空白跳過
    skipped: false,      // 這一步有用到「跳過」
    missCount: 0,        // 這一步總共打錯幾次
    finished: false,     // 整個步驟完成
    revealAll: false,    // 使用者按了 Ctrl+; 偷看答案
    autoNextIn: 0,       // 單字步驟完成後自動接下一個步驟的倒數
    startedAt: 0
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
    }, 2200);
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

  function packById(id) { return WM.packs.get(id); }
  function lastPack() {
    var p = packById(WM.store.get('lastPack')) || WM.packs.first();
    return p;
  }

  /* ============================================================
     2. 儀表板
     ============================================================ */
  function viewDashboard() {
    var ov = WM.stats.overview();
    var today = ov.today;
    var pack = lastPack();

    if (!pack) {
      return '<div class="card empty"><div class="empty__ico">📭</div>' +
        '<h2>還沒有任何字庫</h2><p>到「字庫」頁新增一個，或重設為內建字庫。</p>' +
        '<a class="btn btn--primary" href="#/packs">前往字庫管理</a></div>';
    }

    var daily = WM.stats.dailyChain(pack);
    var firstStep = daily && daily.steps.length ? daily.steps[0] : null;
    var packStats = WM.stats.packProgress(pack);

    var packHTML = WM.packs.all().map(function (p) {
      var s = WM.stats.packProgress(p);
      return '<a class="pack" href="#/learn/' + p.id + '">' +
        '<div class="pack__ico">' + p.icon + '</div>' +
        '<div class="pack__body">' +
          '<div class="pack__name">' + esc(p.name) +
            ' <span class="pill">' + esc(p.level) + '</span>' +
            (p.custom ? ' <span class="pill pill--brand">自訂</span>' : '') + '</div>' +
          '<div class="pack__meta">' + s.done + ' / ' + s.total + ' 條完成 · ' +
            s.stepsDone + ' / ' + s.stepsAll + ' 步驟</div>' +
          '<div class="bar pack__bar"><div class="bar__fill" style="width:' + s.stepPct + '%"></div></div>' +
        '</div>' +
        '<div class="pack__pct">' + s.stepPct + '%</div>' +
      '</a>';
    }).join('');

    return '' +
    '<section class="hero">' +
      '<div class="hero__text">' +
        '<p class="hero__hi">' + WM.util.greeting() + '，今天練了嗎？</p>' +
        '<h1 class="hero__title">已完成 ' + today.done + ' / ' + today.goal + ' 個步驟</h1>' +
        '<p class="hero__sub">' +
          (today.done >= today.goal
            ? '今天的目標達成了，明天繼續！'
            : '照著中文把英文打出來，打錯就會卡住必須重打。') +
          (today.miss ? '　這次共打錯 ' + today.miss + ' 次。' : '') +
        '</p>' +
        '<div class="btn-row" style="margin-top:16px">' +
          '<a class="btn btn--lg" href="#/learn" style="background:#fff;color:var(--brand-700);border:0">開始練習 ▸</a>' +
          '<a class="btn btn--lg btn--ghost" href="#/packs" style="border-color:rgba(255,255,255,.5);color:#fff">管理字庫</a>' +
        '</div>' +
      '</div>' +
      '<div class="ring">' + ringSVG(today.pct) +
        '<div class="ring__mid"><div class="ring__num">' + today.pct + '%</div>' +
        '<div class="ring__cap">今日目標</div></div>' +
      '</div>' +
    '</section>' +

    '<div class="grid grid--4" style="margin-bottom:18px">' +
      statTile('🔥', ov.streak, '連續天數') +
      statTile('📖', ov.done + ' / ' + ov.chains, '完成條數') +
      statTile('✎', ov.stepsDone + ' / ' + ov.stepsAll, '完成步驟') +
      statTile('📦', ov.packs, '字庫數') +
    '</div>' +

    '<div class="stack">' +
      (firstStep ? '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">今日練習</h2>' +
        '<span class="pill pill--brand">' + pack.icon + ' ' + esc(pack.name) + '</span></div>' +
        '<div class="daily">' +
          '<div class="daily__zh">' + esc(firstStep.zh) + '</div>' +
          '<div class="daily__ipa">' + (firstStep.ipa ? esc(firstStep.ipa) : '<span class="muted">（整句不標音標）</span>') + '</div>' +
          '<button class="speak-btn" data-say="' + sayRef(firstStep.en) + '" aria-label="播放發音">🔊</button>' +
          '<p class="daily__hint">點喇叭聽發音，或按 <span class="kbd">Ctrl</span>+<span class="kbd">\'</span></p>' +
        '</div>' +
        '<div class="btn-row" style="justify-content:center;margin-top:6px">' +
          '<a class="btn btn--primary" href="#/learn/' + pack.id + '/' + (daily ? daily.id : '') + '">開始 ▸</a>' +
        '</div>' +
      '</section>' : '') +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">所有字庫</h2>' +
        '<a class="btn btn--sm btn--ghost" href="#/packs">管理</a></div>' +
        '<div class="stack" style="gap:10px">' + packHTML + '</div>' +
      '</section>' +
    '</div>';
  }

  /* ============================================================
     3. 學習頁 —— 漸進式打字練習
     ============================================================ */

  /** 沒有選字庫時：顯示字庫選擇 */
  function learnPackPicker() {
    var packs = WM.packs.all();
    if (!packs.length) {
      return '<div class="card empty"><div class="empty__ico">📭</div>' +
        '<h2>還沒有任何字庫</h2>' +
        '<a class="btn btn--primary" href="#/packs">去新增一個字庫</a></div>';
    }
    return '<section class="card card--pad-lg">' +
      '<div class="card__head"><div><h2 class="card__title">選擇要練的字庫</h2>' +
      '<p class="card__sub">每一條「漸進鏈」都會從單字一路帶到完整句子</p></div></div>' +
      '<div class="stack" style="gap:10px">' +
        packs.map(function (p) {
          var s = WM.stats.packProgress(p);
          return '<a class="pack" href="#/learn/' + p.id + '">' +
            '<div class="pack__ico">' + p.icon + '</div>' +
            '<div class="pack__body"><div class="pack__name">' + esc(p.name) + '</div>' +
            '<div class="pack__meta">' + s.total + ' 條漸進鏈 · 已完成 ' + s.done + ' 條</div>' +
            '<div class="bar pack__bar"><div class="bar__fill" style="width:' + s.stepPct + '%"></div></div>' +
            '</div><div class="pack__pct">' + s.stepPct + '%</div></a>';
        }).join('') +
      '</div></section>';
  }

  /** 選了字庫但沒選鏈：顯示漸進鏈列表 */
  function learnChainList(pack) {
    var s = WM.stats.packProgress(pack);
    var rows = pack.chains.map(function (c, i) {
      var pr = WM.packs.chainProgress(pack.id, c.id);
      var first = c.steps[0] || { en: '', zh: '' };
      var badge = pr.done ? '<span class="pill pill--ok">已完成</span>'
                 : pr.step > 0 ? '<span class="pill pill--warn">進行中 ' + pr.step + '/' + pr.total + '</span>'
                 : '<span class="pill">未開始</span>';
      return '<a class="chain-row' + (pr.done ? ' is-done' : '') + '" href="#/learn/' + pack.id + '/' + c.id + '">' +
        '<span class="chain-row__no">' + (i + 1) + '</span>' +
        '<span class="chain-row__body">' +
          '<span class="chain-row__zh">' + esc(first.zh || '(未填中文)') + '</span>' +
          '<span class="chain-row__en">' + esc(first.en || '(未填英文)') + '</span>' +
        '</span>' +
        '<span class="chain-row__steps">' + c.steps.length + ' 步</span>' +
        badge +
      '</a>';
    }).join('');

    return '' +
    '<div class="study__bar">' +
      '<a class="btn btn--ghost btn--sm" href="#/learn">← 字庫</a>' +
      '<h2 style="margin:0">' + pack.icon + ' ' + esc(pack.name) + '</h2>' +
      '<div class="study__count">' + s.done + ' / ' + s.total + ' 條完成</div>' +
    '</div>' +
    '<div class="bar" style="margin-bottom:16px"><div class="bar__fill" style="width:' + s.stepPct + '%"></div></div>' +
    (pack.chains.length
      ? '<div class="chain-list">' + rows + '</div>'
      : '<div class="card empty"><div class="empty__ico">✎</div><h2>這個字庫還沒有內容</h2>' +
        '<p>到「字庫」頁編輯，加入第一條漸進鏈。</p>' +
        '<a class="btn btn--primary" href="#/packs">編輯字庫</a></div>');
  }

  /** 練習中的畫面 */
  function learnPractice(pack, chain) {
    var step = chain.steps[tstate.stepIdx];
    if (!step) return learnChainList(pack);

    var tokens = WM.text.tokenize(step.en);
    var pr = WM.packs.chainProgress(pack.id, chain.id);

    /* 漸進階梯 */
    var ladder = chain.steps.map(function (st, i) {
      var cls = i < tstate.stepIdx ? 'is-done'
              : i === tstate.stepIdx ? 'is-now'
              : 'is-todo';
      var mark = i < tstate.stepIdx ? '✓' : (i === tstate.stepIdx ? '●' : String(i + 1));
      return '<li class="ladder__item ' + cls + '">' +
        '<span class="ladder__mark">' + mark + '</span>' +
        '<span class="ladder__zh">' + esc(st.zh || '…') + '</span>' +
      '</li>';
    }).join('');

    /* 逐字槽位：答案預設不顯示，只顯示「你已經打出來而且確認正確」的字 */
    var revealDone = !!WM.store.get('revealOnCorrect');
    var slotsHTML = tokens.map(function (t, i) {
      var done = i < tstate.tokIdx;
      var cur = i === tstate.tokIdx;
      var pun = (t.lead || t.tail) ? '<span class="slot__pun">' + esc(t.lead || t.tail) + '</span>' : '';
      var body;
      if (tstate.finished || tstate.revealAll || (cur && tstate.givenUp)) {
        /* 錯三次 → 這格直接顯示答案 */
        body = '<span class="slot__txt">' + esc(t.word) + '</span>';
      } else if (done) {
        body = revealDone
          ? '<span class="slot__txt">' + esc(t.word) + '</span>'        /* 打對了就顯示 */
          : '<span class="slot__txt">' + esc(WM.text.core(t.word)) + '</span>';
      } else if (cur) {
        body = '<span class="slot__txt' + (tstate.wrong ? ' is-bad' : '') + '">' +
                 esc(tstate.typed) + '<span class="slot__caret"></span>' +
               '</span>';
      } else {
        body = '<span class="slot__txt slot__txt--blank"></span>';     /* 還不知道是什麼 */
      }
      var cls = 'slot' + (done || tstate.finished || tstate.revealAll ? ' is-ok' : '') +
                (cur && !tstate.finished && !tstate.givenUp ? ' is-now' : '') +
                (tstate.wrong && cur ? ' is-bad' : '') +
                (cur && tstate.givenUp ? ' is-giveup' : '');
      return '<span class="' + cls + '" data-slot="' + i + '">' + pun + body + '</span>';
    }).join(' ');

    var stateText = tstate.finished
      ? (tstate.skipped ? '完成（這一步有跳過的字）' : '完成')
      : tstate.givenUp ? '錯了 ' + MAX_STRIKES + ' 次，已顯示答案'
      : tstate.wrong ? '打錯了，刪掉重打'
      : '第 ' + Math.min(tstate.tokIdx + 1, tokens.length) + ' / ' + tokens.length + ' 個字';

    var bodyHTML;
    if (tstate.finished) {
      bodyHTML = '<div class="practice__done" id="practiceDone"></div>';
    } else if (tstate.givenUp) {
      var curTok = tokens[tstate.tokIdx];
      bodyHTML =
        '<div class="giveup" id="giveup">' +
          '<div class="giveup__title">這個字錯了 ' + MAX_STRIKES + ' 次，已經幫你顯示答案並念過一次</div>' +
          '<div class="giveup__word">' + esc(curTok ? curTok.word : '') + '</div>' +
          '<div class="btn-row" style="justify-content:center;margin-top:14px">' +
            '<button class="btn btn--primary" data-act="retry-word">重新練習一次 <span class="kbd">Enter</span></button>' +
            '<button class="btn" data-act="skip-word">跳過，下一個字 <span class="kbd">空白</span></button>' +
          '</div>' +
        '</div>';
    } else {
      bodyHTML =
        '<div class="typerow">' +
          '<input class="input typerow__input" id="typer" type="text" autocomplete="off" ' +
            'autocapitalize="off" autocorrect="off" spellcheck="false" ' +
            'value="' + esc(tstate.typed) + '" ' +
            'placeholder="把英文打出來，按空白鍵送出這個字">' +
          '<span class="typerow__state' + (tstate.wrong ? ' is-bad' : '') + '" id="typerState">' +
            stateText +
          '</span>' +
        '</div>';
    }

    var shortcutsHTML = tstate.finished
      ? (tstate.autoNextIn
          ? '<div class="shortcuts"><span>下一個步驟是單字，正在自動接續…</span></div>'
          : '')
      : tstate.givenUp
        ? '<div class="shortcuts">' +
            '<span><span class="kbd">Enter</span> 重新練習這個字</span>' +
            '<span><span class="kbd">空白</span> 跳過，下一個字</span>' +
          '</div>'
        : '<div class="shortcuts">' +
            '<span><span class="kbd">空白</span> 送出這個字</span>' +
            '<span><span class="kbd">Ctrl</span>+<span class="kbd">\'</span> 播放發音</span>' +
            '<span><span class="kbd">Ctrl</span>+<span class="kbd">;</span> 顯示答案</span>' +
            '<span><span class="kbd">Enter</span> 送出</span>' +
          '</div>';

    return '' +
    '<div class="study__bar">' +
      '<a class="btn btn--ghost btn--sm" href="#/learn/' + pack.id + '">← ' + esc(pack.name) + '</a>' +
      '<div class="study__count">步驟 ' + (tstate.stepIdx + 1) + ' / ' + chain.steps.length +
        '　·　鏈 ' + (WM.packs.chainIndex(pack.id, chain.id) + 1) + ' / ' + pack.chains.length + '</div>' +
    '</div>' +

    '<div class="bar" style="margin-bottom:16px"><div class="bar__fill" style="width:' +
      Math.round((tstate.stepIdx / chain.steps.length) * 100) + '%"></div></div>' +

    '<ol class="ladder">' + ladder + '</ol>' +

    '<section class="card card--pad-lg practice' +
      (tstate.finished ? ' is-finished' : '') +
      (tstate.givenUp ? ' is-giveup' : '') +
      (tstate.finished && tstate.skipped ? ' is-weak' : '') + '">' +
      '<div class="practice__zh">' + esc(step.zh) + '</div>' +
      '<div class="practice__ipa">' + (step.ipa ? esc(step.ipa) : '<span class="muted">整句不標音標，直接用發音按鈕聽</span>') + '</div>' +
      '<button class="speak-btn" data-say="' + sayRef(step.en) + '" aria-label="播放發音">🔊</button>' +

      '<div class="practice__type">' +
        '<div class="slots" id="slots">' + slotsHTML + '</div>' +
        bodyHTML +
      '</div>' +
    '</section>' +

    shortcutsHTML +
    (tstate.finished
      ? '<div class="btn-row" style="justify-content:center;margin-top:18px" id="nextActions"></div>'
      : '');
  }

  /** 步驟完成後的動作按鈕 */
  function renderNextActions() {
    var box = $('#nextActions');
    if (!box) return;
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;

    var btns = '';
    if (tstate.stepIdx + 1 < chain.steps.length) {
      btns += '<button class="btn btn--primary btn--lg" data-act="next-step">下一個步驟 ▸</button>';
    }
    var nextChain = pack.chains[WM.packs.chainIndex(pack.id, chain.id) + 1];
    if (nextChain) {
      btns += '<button class="btn btn--lg" data-act="next-chain">下一條漸進鏈 ▸</button>';
    }
    btns += '<a class="btn btn--ghost" href="#/learn/' + pack.id + '">回到鏈列表</a>';
    btns += '<button class="btn btn--ghost" data-act="retry-step">再打一次</button>';
    box.innerHTML = btns;
  }

  /* ---------- 打字引擎 ---------- */

  function initPractice(pack, chain) {
    var pr = WM.packs.chainProgress(pack.id, chain.id);
    tstate.packId = pack.id;
    tstate.chainId = chain.id;
    /* 從上次進度接著練，已完成則從頭開始複習 */
    tstate.stepIdx = pr.done ? 0 : Math.min(pr.step, chain.steps.length - 1);
    tstate.tokIdx = 0;
    tstate.typed = '';
    tstate.wrong = false;
    tstate.missCount = 0;
    tstate.finished = false;
    tstate.revealAll = false;
    tstate.tokErr = 0;
    tstate.givenUp = false;
    tstate.skipped = false;
    tstate.autoNextIn = 0;
    tstate.startedAt = Date.now();
  }

  function focusTyper() {
    var el = $('#typer');
    if (el && !el.disabled) { try { el.focus(); } catch (e) { /* 忽略 */ } }
  }

  /** 送出目前這個單字進行比對 */
  function commitWord() {
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;
    var step = chain.steps[tstate.stepIdx];
    if (!step) return;

    /* 已經放棄三次並顯示答案的字：空白 = 跳過，不再糾纏 */
    if (tstate.givenUp) { skipWord(); return; }

    var tokens = WM.text.tokenize(step.en);
    var tok = tokens[tstate.tokIdx];
    if (!tok) return;

    var typed = tstate.typed.trim();
    if (!typed) { WM.audio.tick(true); return; }   /* 還沒打東西就按空白：提示音，不動作 */

    if (WM.text.matches(typed, tok.word)) {
      /* --- 答對 --- */
      tstate.typed = '';
      tstate.wrong = false;
      tstate.tokErr = 0;
      tstate.givenUp = false;
      tstate.tokIdx++;

      if (tstate.tokIdx >= tokens.length) {
        finishStep();
      } else {
        WM.audio.chime(true);
        WM.speech.speak(tok.word);          /* 空白鍵 = 唸出這個單字 */
        render();
        focusTyper();
      }
    } else {
      /* --- 打錯：標紅並鎖住，必須刪掉重打 --- */
      tstate.wrong = true;
      tstate.missCount++;
      tstate.tokErr = (tstate.tokErr || 0) + 1;
      WM.audio.chime(false);

      /* 同一個字錯三次 → 顯示答案並唸一次，之後 Enter 重練 / 空白跳過 */
      if (tstate.tokErr >= MAX_STRIKES) {
        tstate.givenUp = true;
        tstate.typed = '';
        tstate.wrong = false;
        WM.speech.speak(tok.word);
      }

      render();
      var el = $('#typer');
      if (el && !tstate.givenUp) { try { el.focus(); el.select(); } catch (e) { /* 忽略 */ } }
    }
  }

  /** 錯三次的字：Enter 重新練一次 */
  function retryWord() {
    if (!tstate.givenUp) return;
    tstate.givenUp = false;
    tstate.tokErr = 0;
    tstate.typed = '';
    tstate.wrong = false;
    render();
    focusTyper();
  }

  /** 錯三次的字：空白跳過，直接往下一個字 */
  function skipWord() {
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;
    var step = chain.steps[tstate.stepIdx];
    if (!step) return;

    tstate.givenUp = false;
    tstate.tokErr = 0;
    tstate.typed = '';
    tstate.wrong = false;
    tstate.skipped = true;                 /* 這一步有字是靠「跳過」過關的 */

    tstate.tokIdx++;
    if (tstate.tokIdx >= WM.text.tokenize(step.en).length) finishStep();
    else { render(); focusTyper(); }
  }

  /** 整個步驟完成。回傳是否應該自動接下一個步驟 */
  function finishStep() {
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;

    tstate.finished = true;
    var wasMistake = tstate.missCount > 0;
    var wasSkipped = !!tstate.skipped;
    WM.packs.completeStep(pack.id, chain.id, tstate.stepIdx, wasMistake, wasSkipped);

    /* 整串輸入完畢 → 再把這一串完整念一次 */
    var step = chain.steps[tstate.stepIdx];
    WM.audio.chime(true);
    if (step) WM.speech.speak(step.en);

    /* 下一個步驟是「短詞組」（三個字以內）就自動接下去，讓你可以一路連打；
       碰到完整句子（四個字以上）才停下來等你確認。 */
    var next = chain.steps[tstate.stepIdx + 1];
    if (next && WM.text.tokenize(next.en).length <= 3) {
      tstate.autoNextIn = 1100;
      render();
      renderNextActions();
      setTimeout(function () {
        if (tstate.finished && tstate.autoNextIn) { tstate.autoNextIn = 0; goNextStep(); }
      }, 1100);
      return;
    }

    render();
    renderNextActions();
  }

  function goNextStep() {
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;
    if (tstate.stepIdx + 1 >= chain.steps.length) return;
    tstate.stepIdx++;
    tstate.tokIdx = 0;
    tstate.typed = '';
    tstate.wrong = false;
    tstate.finished = false;
    tstate.revealAll = false;
    tstate.tokErr = 0;
    tstate.givenUp = false;
    tstate.skipped = false;
    tstate.autoNextIn = 0;
    render();
    focusTyper();
    if (WM.store.get('autoPlay')) {
      var s = chain.steps[tstate.stepIdx];
      if (s) setTimeout(function () { WM.speech.speak(s.en); }, 250);
    }
  }

  function goNextChain() {
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;
    var i = WM.packs.chainIndex(pack.id, chain.id);
    var next = pack.chains[i + 1];
    if (!next) { location.hash = '#/learn/' + pack.id; render(); return; }
    initPractice(pack, next);
    location.hash = '#/learn/' + pack.id + '/' + next.id;
    render();
    focusTyper();
  }

  function retryStep() {
    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!pack || !chain) return;
    tstate.tokIdx = 0;
    tstate.typed = '';
    tstate.wrong = false;
    tstate.finished = false;
    tstate.revealAll = false;
    tstate.tokErr = 0;
    tstate.givenUp = false;
    tstate.skipped = false;
    tstate.autoNextIn = 0;
    tstate.missCount = 0;
    render();
    focusTyper();
  }

  function viewLearn() {
    var parts = routeParts();
    var pack = parts[1] ? packById(parts[1]) : null;
    if (!pack) return learnPackPicker();

    var chain = parts[2] ? WM.packs.getChain(pack.id, parts[2]) : null;
    if (!chain) return learnChainList(pack);

    /* 換到別的鏈就重新初始化 */
    if (tstate.packId !== pack.id || tstate.chainId !== chain.id) initPractice(pack, chain);
    if (tstate.stepIdx >= chain.steps.length) tstate.stepIdx = chain.steps.length - 1;

    return learnPractice(pack, chain);
  }

  /* ============================================================
     4. 字庫管理
     ============================================================ */
  function viewPacks() {
    var packs = WM.packs.all();
    var cards = packs.map(function (p, i) {
      var s = WM.stats.packProgress(p);
      return '<div class="packcard">' +
        '<div class="packcard__top">' +
          '<div class="packcard__ico">' + p.icon + '</div>' +
          '<div class="packcard__info">' +
            '<div class="packcard__name">' + esc(p.name) +
              ' <span class="pill">' + esc(p.level) + '</span>' +
              (p.custom ? ' <span class="pill pill--brand">自訂</span>' : '') + '</div>' +
            '<div class="packcard__meta">' + s.total + ' 條漸進鏈 · ' + s.stepsAll + ' 個步驟 · 已完成 ' + s.done + ' 條</div>' +
            (p.desc ? '<div class="packcard__desc">' + esc(p.desc) + '</div>' : '') +
          '</div>' +
          '<div class="packcard__pct">' + s.stepPct + '%</div>' +
        '</div>' +
        '<div class="bar" style="margin:10px 0"><div class="bar__fill" style="width:' + s.stepPct + '%"></div></div>' +
        '<div class="packcard__acts">' +
          '<a class="btn btn--sm btn--primary" href="#/learn/' + p.id + '">開始學</a>' +
          '<button class="btn btn--sm" data-edit-pack="' + p.id + '">✎ 編輯內容</button>' +
          '<button class="btn btn--sm" data-move-pack="' + p.id + '" data-dir="-1"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button class="btn btn--sm" data-move-pack="' + p.id + '" data-dir="1"' + (i === packs.length - 1 ? ' disabled' : '') + '>↓</button>' +
          '<span style="flex:1"></span>' +
          '<button class="btn btn--sm btn--danger" data-del-pack="' + p.id + '">🗑 刪除</button>' +
        '</div>' +
      '</div>';
    }).join('');

    return '' +
    '<div class="study__bar">' +
      '<h2 style="margin:0">字庫管理</h2>' +
      '<div class="study__count">共 ' + packs.length + ' 個</div>' +
    '</div>' +
    '<div class="btn-row" style="margin-bottom:16px">' +
      '<button class="btn btn--primary" data-new-pack>＋ 新增字庫</button>' +
      '<button class="btn btn--ghost" data-open-export>匯出成 data.js</button>' +
      '<button class="btn btn--ghost" data-restore>還原內建字庫</button>' +
    '</div>' +
    (packs.length
      ? '<div class="stack" style="gap:12px">' + cards + '</div>'
      : '<div class="card empty"><div class="empty__ico">📦</div><h2>還沒有字庫</h2>' +
        '<p>按「新增字庫」建立第一個，或按「還原內建字庫」取回預設內容。</p></div>');
  }

  /* ---------- 字庫編輯視窗 ---------- */
  var editPackId = null;
  var pickedIcon = null;

  function openPackEditor(packId) {
    editPackId = packId || null;
    var p = editPackId ? WM.packs.get(editPackId) : null;
    pickedIcon = p ? p.icon : '📦';
    renderPackEditor();
    $('#packModal').hidden = false;
  }

  function renderPackEditor() {
    var body = $('#packModalBody');
    var p = editPackId ? packById(editPackId) : null;
    $('#packModalTitle').textContent = p ? '編輯字庫' : '新增字庫';

    if (!p) {
      body.innerHTML =
        '<div class="grid grid--2">' +
          '<div class="field"><label>字庫名稱</label>' +
            '<input class="input" id="npName" placeholder="例如：自定義1" value="自定義1"></div>' +
          '<div class="field"><label>等級</label><select class="input" id="npLevel">' +
            LEVELS.map(function (l) { return '<option' + (l === 'A1' ? ' selected' : '') + '>' + l + '</option>'; }).join('') +
          '</select></div>' +
        '</div>' +
        '<div class="field"><label>說明</label>' +
          '<input class="input" id="npDesc" placeholder="選填"></div>' +
        '<div class="field"><label>圖示</label>' +
          '<div class="iconpick" id="npIcons">' +
            ICONS.map(function (i) {
              return '<button class="iconpick__b" data-icon="' + i + '">' + i + '</button>';
            }).join('') +
          '</div></div>' +
        '<p class="hint">建立之後就可以在這裡加入「漸進鏈」：單字 → 詞組 → 句子 → 段落。</p>';
      bindNewPackForm();
      return;
    }

    var chainsHTML = p.chains.map(function (c, ci) {
      var stepsHTML = c.steps.map(function (s, si) {
        return '<div class="stepedit" data-chain="' + c.id + '" data-si="' + si + '">' +
          '<div class="stepedit__no">' + (si + 1) + '</div>' +
          '<div class="stepedit__fields">' +
            '<input class="input" data-f="en" placeholder="英文" value="' + esc(s.en) + '">' +
            '<input class="input" data-f="zh" placeholder="中文" value="' + esc(s.zh) + '">' +
            '<input class="input" data-f="ipa" placeholder="音標（可留空）" value="' + esc(s.ipa) + '">' +
          '</div>' +
          '<div class="stepedit__acts">' +
            '<button class="icon-btn" data-step-up title="上移" data-chain="' + c.id + '" data-si="' + si + '">↑</button>' +
            '<button class="icon-btn" data-step-down title="下移" data-chain="' + c.id + '" data-si="' + si + '">↓</button>' +
            '<button class="icon-btn" data-step-del title="刪除" data-chain="' + c.id + '" data-si="' + si + '">✕</button>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<details class="chainedit"' + (ci === 0 ? ' open' : '') + '>' +
        '<summary class="chainedit__head">' +
          '<span>第 ' + (ci + 1) + ' 條</span>' +
          '<span class="chainedit__preview">' + esc(c.steps[0] ? c.steps[0].zh : '空白') + '</span>' +
          '<span class="chainedit__acts">' +
            '<button class="icon-btn" data-chain-up data-chain="' + c.id + '">↑</button>' +
            '<button class="icon-btn" data-chain-down data-chain="' + c.id + '">↓</button>' +
            '<button class="icon-btn" data-chain-del data-chain="' + c.id + '">🗑</button>' +
          '</span>' +
        '</summary>' +
        '<div class="chainedit__body">' + stepsHTML +
          '<button class="btn btn--sm btn--ghost" data-step-add data-chain="' + c.id + '">＋ 新增步驟</button>' +
        '</div>' +
      '</details>';
    }).join('');

    body.innerHTML =
      '<div class="grid grid--2">' +
        '<div class="field"><label>字庫名稱</label>' +
          '<input class="input" id="npName" value="' + esc(p.name) + '"></div>' +
        '<div class="field"><label>等級</label><select class="input" id="npLevel">' +
          LEVELS.map(function (l) { return '<option' + (l === p.level ? ' selected' : '') + '>' + l + '</option>'; }).join('') +
        '</select></div>' +
      '</div>' +
      '<div class="field"><label>說明</label>' +
        '<input class="input" id="npDesc" value="' + esc(p.desc) + '"></div>' +
      '<div class="field"><label>圖示</label>' +
        '<div class="iconpick" id="npIcons" data-cur="' + p.icon + '">' +
          ICONS.concat([p.icon]).filter(function (v, i, a) { return a.indexOf(v) === i; })
            .map(function (i) {
              return '<button class="iconpick__b' + (i === p.icon ? ' is-on' : '') + '" data-icon="' + i + '">' + i + '</button>';
            }).join('') +
        '</div></div>' +

      '<div class="chainedit__list">' +
        '<div class="card__head" style="margin-top:8px"><h3 class="card__title">漸進鏈內容</h3>' +
        '<button class="btn btn--sm btn--primary" data-chain-add>＋ 新增一條</button></div>' +
        (p.chains.length ? chainsHTML : '<p class="hint">還沒有內容，按「新增一條」開始。</p>') +
      '</div>' +
      '<p class="hint" style="margin-top:10px">欄位會在您停止輸入 0.4 秒後自動儲存。</p>';

    bindEditPackForm();
  }

  /* 字庫編輯視窗的事件綁定。
     ⚠ 這些監聽器只能綁一次（啟動時呼叫），不能放進 renderPackEditor，
       否則每次重畫都會多綁一份，點一下按鈕就會觸發兩次。 */
  function bindPackModalOnce() {
    var body = $('#packModalBody');

    body.addEventListener('input', function (e) {
      var f = e.target.closest('[data-f]');
      if (!f || !editPackId) return;
      var row = f.closest('[data-chain]');
      if (!row) return;
      var patch = {};
      patch[f.getAttribute('data-f')] = f.value;
      WM.packs.updateStep(editPackId, row.getAttribute('data-chain'), +row.getAttribute('data-si'), patch);
    });

    body.addEventListener('click', function (e) {
      var t = e.target, btn;

      if ((btn = t.closest('[data-icon]'))) {
        pickedIcon = btn.getAttribute('data-icon');
        body.querySelectorAll('.iconpick__b').forEach(function (x) { x.classList.remove('is-on'); });
        btn.classList.add('is-on');
        savePackMeta();
        return;
      }
      if (!editPackId) return;

      if (t.closest('[data-chain-add]')) { WM.packs.addChain(editPackId); renderPackEditor(); render(); return; }
      if ((btn = t.closest('[data-chain-del]'))) {
        if (!confirm('確定刪除這條漸進鏈？裡面的步驟會一起消失。')) return;
        WM.packs.removeChain(editPackId, btn.getAttribute('data-chain')); renderPackEditor(); render(); return;
      }
      if ((btn = t.closest('[data-chain-up]'))) {
        WM.packs.moveChain(editPackId, btn.getAttribute('data-chain'), -1); renderPackEditor(); render(); return;
      }
      if ((btn = t.closest('[data-chain-down]'))) {
        WM.packs.moveChain(editPackId, btn.getAttribute('data-chain'), 1); renderPackEditor(); render(); return;
      }
      if ((btn = t.closest('[data-step-add]'))) {
        WM.packs.addStep(editPackId, btn.getAttribute('data-chain')); renderPackEditor(); render(); return;
      }
      if ((btn = t.closest('[data-step-del]'))) {
        WM.packs.removeStep(editPackId, btn.getAttribute('data-chain'), +btn.getAttribute('data-si'));
        renderPackEditor(); render(); return;
      }
      if ((btn = t.closest('[data-step-up]'))) {
        WM.packs.moveStep(editPackId, btn.getAttribute('data-chain'), +btn.getAttribute('data-si'), -1);
        renderPackEditor(); render(); return;
      }
      if ((btn = t.closest('[data-step-down]'))) {
        WM.packs.moveStep(editPackId, btn.getAttribute('data-chain'), +btn.getAttribute('data-si'), 1);
        renderPackEditor(); render(); return;
      }
    });
  }

  function savePackMeta() {
    if (!editPackId) return;
    WM.packs.update(editPackId, {
      name: ($('#npName').value || '').trim(),
      icon: pickedIcon,
      level: $('#npLevel').value,
      desc: $('#npDesc').value || ''
    });
    render();
  }

  function bindNewPackForm() {
    $('#packModalDone').onclick = function () {
      var name = ($('#npName').value || '').trim() || '新字庫';
      var pack = WM.packs.create({
        name: name,
        icon: pickedIcon || '📦',
        level: $('#npLevel').value,
        desc: ($('#npDesc').value || '').trim()
      });
      editPackId = pack.id;
      pickedIcon = pack.icon;
      toast('已建立「' + pack.name + '」，接著加入內容吧', 'ok');
      renderPackEditor();
      render();
    };
  }

  function bindEditPackForm() {
    var save = WM.util.debounce(function () { savePackMeta(); }, 400);
    ['#npName', '#npLevel', '#npDesc'].forEach(function (sel) {
      var el = $(sel);
      if (el) el.addEventListener('input', save);
    });

    $('#packModalDone').onclick = function () {
      savePackMeta();
      closeModal();
      render();
      toast('已儲存', 'ok');
    };
  }

  function closeModal() {
    $('#packModal').hidden = true;
    $('#exportModal').hidden = true;
    editPackId = null;
  }

  /* ---------- 匯出 ---------- */
  function openExport() {
    var sel = $('#exportScope');
    sel.innerHTML = '<option value="all">全部字庫</option>' + WM.packs.all().map(function (p) {
      return '<option value="' + p.id + '">只匯出：' + esc(p.name) + '</option>';
    }).join('');
    sel.onchange = refreshExport;
    refreshExport();
    $('#exportModal').hidden = false;
  }

  function refreshExport() {
    var v = $('#exportScope').value;
    $('#exportText').value = WM.packs.toJS(v === 'all' ? null : [v]);
  }

  /* ============================================================
     5. 統計頁
     ============================================================ */
  function viewStats() {
    var ov = WM.stats.overview();
    var recent = WM.stats.recent(14);
    var max = Math.max.apply(null, recent.map(function (r) { return r.steps; }).concat([1]));

    var barsHTML = recent.map(function (r) {
      var h = Math.round((r.steps / max) * 100);
      var d = r.key.split('-');
      return '<div class="chart__col" title="' + r.key + '：' + r.steps + ' 個步驟">' +
        '<div class="chart__bar' + (r.steps ? '' : ' chart__bar--empty') + '" style="height:' + Math.max(3, h) + '%"></div>' +
        '<div class="chart__lab">' + (+d[1]) + '/' + (+d[2]) + '</div></div>';
    }).join('');

    var heat = WM.stats.heatmap();
    var cells = '';
    var start = new Date();
    start.setDate(start.getDate() - 90);
    start.setDate(start.getDate() - start.getDay());
    for (var i = 0; i < 91; i++) {
      var t = new Date(start); t.setDate(start.getDate() + i);
      var k = WM.util.dateKey(t.getTime());
      var c = heat[k] || 0;
      var lv = c === 0 ? 0 : c < 5 ? 1 : c < 15 ? 2 : c < 30 ? 3 : 4;
      cells += '<div class="heat__cell" data-lv="' + lv + '" title="' + k + '：' + c + ' 個步驟"></div>';
    }

    var masteryHTML = WM.packs.all().map(function (p) {
      var s = WM.stats.packProgress(p);
      return '<div class="mastery__row">' +
        '<div class="mastery__name">' + p.icon + ' ' + esc(p.name) + '</div>' +
        '<div class="mastery__num">' + s.done + ' / ' + s.total + ' 條</div>' +
        '<div class="bar"><div class="bar__fill bar__fill--ok" style="width:' + s.stepPct + '%"></div></div>' +
      '</div>';
    }).join('');

    var overallPct = ov.stepsAll ? Math.round((ov.stepsDone / ov.stepsAll) * 100) : 0;

    return '<div class="stack">' +
      '<div class="grid grid--4">' +
        statTile('🔥', ov.streak, '連續天數') +
        statTile('📖', ov.done, '完成條數') +
        statTile('✎', ov.stepsDone, '完成步驟') +
        statTile('📦', ov.packs, '字庫數') +
      '</div>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">近 14 天練習量</h2>' +
        '<span class="card__sub">今天 ' + ov.today.done + ' 個步驟</span></div>' +
        '<div class="chart">' + barsHTML + '</div>' +
      '</section>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">學習日曆</h2>' +
        '<span class="card__sub">最近 13 週</span></div>' +
        '<div class="heat">' + cells + '</div>' +
        '<p style="color:var(--text-3);font-size:.8rem;margin:10px 0 0">顏色越深代表當天完成的步驟越多</p>' +
      '</section>' +

      '<section class="card">' +
        '<div class="card__head"><h2 class="card__title">各字庫進度</h2></div>' +
        '<div class="mastery">' + masteryHTML + '</div>' +
        '<div style="margin-top:20px">' +
          '<div style="display:flex;justify-content:space-between;font-size:.86rem;margin-bottom:6px">' +
            '<span style="color:var(--text-2)">整體步驟完成度</span>' +
            '<span style="font-weight:700">' + overallPct + '%</span></div>' +
          '<div class="bar"><div class="bar__fill" style="width:' + overallPct + '%"></div></div>' +
        '</div>' +
      '</section>' +
    '</div>';
  }

  /* ============================================================
     6. 設定
     ============================================================ */
  function syncSettingsUI() {
    var s = WM.store.state.settings;
    $('#setGoal').value = s.dailyGoal;
    $('#setGoalOut').textContent = s.dailyGoal;
    $('#setSpeechRate').value = s.rate;
    $('#setSpeechRateOut').textContent = Number(s.rate).toFixed(2);
    $('#setAutoPlay').checked = !!s.autoPlay;
    $('#setTypeSound').checked = !!s.typeSound;
    $('#setReveal').checked = s.revealOnCorrect !== false;
    applyTheme(s.theme || 'dark');

    var vsel = $('#setTtsVendor');
    var vhint = $('#vendorHint');
    var sel = $('#setVoice');
    var hint = $('#voiceHint');

    if (!WM.speech.supported) {
      hint.textContent = '這個瀏覽器不支援語音發音，建議改用 Chrome 或 Edge。';
      sel.innerHTML = '<option>不支援</option>';
      sel.disabled = true;
      vsel.innerHTML = '<option>不支援</option>';
      vsel.disabled = true;
      return;
    }

    /* 供應商選單：把不存在的選項拿掉，並標出數量與是否需要網路 */
    var counts = WM.speech.counts();
    vsel.innerHTML = WM.speech.PROVIDERS.map(function (p) {
      var n = counts[p.key != null ? p.key : 'other'] || 0;
      if (p.key !== 'auto' && n === 0) return '';
      var label = p.label + (p.key === 'auto' ? '' : '（' + n + ' 個）');
      return '<option value="' + p.key + '"' + (s.ttsVendor === p.key ? ' selected' : '') + '>' +
        esc(label) + '</option>';
    }).join('');
    vsel.disabled = false;

    var en = WM.speech.list();
    if (!en.length) {
      hint.textContent = '正在偵測語音…（持續空白代表系統尚未安裝英文語音包）';
      sel.innerHTML = '<option value="">載入中…</option>';
      vhint.textContent = '等待語音清單載入…';
      return;
    }

    /* 依供應商分組，線上語音標示需要網路 */
    var g = WM.speech.grouped();
    var group = { microsoft: 'Microsoft 微軟（離線）', google: 'Google 谷歌（線上，需要網路）', other: '其他／系統' };
    var html = '';
    ['microsoft', 'google', 'other'].forEach(function (key) {
      if (!g[key].length) return;
      html += '<optgroup label="' + esc(group[key]) + '">';
      g[key].forEach(function (v) {
        var mark = WM.speech.isOnline(v) ? ' 🌐' : '';
        html += '<option value="' + esc(v.voiceURI) + '"' +
          (v.voiceURI === s.voiceURI ? ' selected' : '') + '>' +
          esc(v.name) + ' (' + esc(v.lang) + ')' + mark + '</option>';
      });
      html += '</optgroup>';
    });
    sel.innerHTML = html;

    var cur = WM.speech.current();
    vhint.textContent = cur
      ? '目前會用：' + cur.name + (WM.speech.isOnline(cur) ? '（線上，斷網時會自動改用微軟）' : '（離線）')
      : '沒有可用的英文語音。';
    hint.textContent = '共 ' + en.length + ' 個英文語音可選。' +
      (s.voiceURI && !WM.speech.pick(s.voiceURI, s.ttsVendor)
        ? '（已選的語音不存在，會自動改用上面的引擎）' : '');
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
    $('#setTypeSound').addEventListener('change', function () {
      WM.store.set('typeSound', this.checked);
      WM.audio.setEnabled(this.checked);
    });
    $('#setVoice').addEventListener('change', function () {
      WM.store.set('voiceURI', this.value);
      syncSettingsUI();
      WM.speech.speak('Hello, this is how I sound.');
    });
    $('#setTtsVendor').addEventListener('change', function () {
      WM.store.set('ttsVendor', this.value);
      /* 換供應商時清掉指定語音，讓引擎偏好真正生效 */
      WM.store.set('voiceURI', '');
      syncSettingsUI();
      WM.speech.speak('Hello, this is how I sound.');
    });
    $('#setReveal').addEventListener('change', function () {
      WM.store.set('revealOnCorrect', this.checked);
      render();
    });

    document.querySelectorAll('[data-close-drawer]').forEach(function (el) {
      el.addEventListener('click', function () { $('#settingsDrawer').hidden = true; });
    });
    document.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    $('#exportBtn').addEventListener('click', function () {
      var blob = new Blob([WM.store.exportJSON()], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'wordmomo-backup-' + WM.util.dateKey() + '.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      toast('已匯出備份', 'ok');
    });
    $('#importBtn').addEventListener('click', function () { $('#importFile').click(); });
    $('#importFile').addEventListener('change', function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          WM.store.importJSON(String(reader.result));
          toast('匯入成功', 'ok');
          syncSettingsUI();
          render();
        } catch (e) { toast('匯入失敗：檔案格式不正確', 'bad'); }
      };
      reader.readAsText(f);
      this.value = '';
    });
    $('#clearProgressBtn').addEventListener('click', function () {
      if (!confirm('只清除學習紀錄，字庫內容會保留。確定嗎？')) return;
      WM.store.resetProgress();
      toast('已清除學習紀錄');
      render();
    });
    $('#resetBtn').addEventListener('click', function () {
      if (!confirm('這會刪除所有自訂字庫並還原成內建內容，且清空紀錄。\n確定要重設嗎？')) return;
      WM.store.resetAll();
      toast('已重設為內建字庫');
      syncSettingsUI();
      render();
    });

    $('#copyExportBtn').addEventListener('click', function () {
      var ta = $('#exportText');
      ta.select();
      try {
        document.execCommand('copy');
        toast('已複製到剪貼簿', 'ok');
      } catch (e) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(ta.value).then(function () { toast('已複製', 'ok'); });
        } else { toast('複製失敗，請手動選取', 'bad'); }
      }
    });
    $('#downloadExportBtn').addEventListener('click', function () {
      var blob = new Blob([$('#exportText').value], { type: 'text/javascript;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'data.js';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      toast('已下載 data.js', 'ok');
    });
  }

  /* ============================================================
     7. 路由與事件
     ============================================================ */
  var ROUTES = {
    dashboard: viewDashboard,
    learn:     viewLearn,
    packs:     viewPacks,
    stats:     viewStats
  };

  function routeParts() {
    var h = (location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
    return h.split('/').filter(function (x) { return x; });
  }
  function currentRoute() {
    var p = routeParts();
    return ROUTES[p[0]] ? p[0] : 'dashboard';
  }

  function render() {
    var route = currentRoute();
    var app = $('#app');

    $('#settingsDrawer').hidden = true;
    WM.speech.stop();
    sayRegistry = {}; saySeq = 0;   /* 每次重畫重新建立，避免殘留舊的發音內容 */

    var html;
    try {
      html = ROUTES[route]();
    } catch (err) {
      if (window.console) console.error(err);
      html = '<div class="card empty"><div class="empty__ico">⚠️</div>' +
        '<h2>這頁載入失敗</h2>' +
        '<p style="color:var(--bad);font-family:ui-monospace,monospace">' +
          esc(err && err.message ? err.message : String(err)) + '</p></div>';
    }
    app.innerHTML = html;

    document.querySelectorAll('.nav__link, .tabbar__link').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-view') === route);
    });
    var sn = $('#streakNum');
    if (sn) sn.textContent = WM.stats.streak();

    if (route !== 'learn') { tstate.packId = null; tstate.chainId = null; }
    else if (app.querySelector('#typer')) focusTyper();
  }

  function onClick(e) {
    var t = e.target, el;

    if ((el = t.closest('[data-say]'))) {
      var txt = sayRegistry[el.getAttribute('data-say')];
      if (txt) {
        el.classList.add('is-playing');
        WM.speech.speak(txt, { onend: function () { el.classList.remove('is-playing'); } });
      }
      return;
    }

    /* 打字練習的動作 */
    if ((el = t.closest('[data-act]'))) {
      var a = el.getAttribute('data-act');
      if (a === 'next-step') goNextStep();
      else if (a === 'next-chain') goNextChain();
      else if (a === 'retry-step') retryStep();
      else if (a === 'retry-word') retryWord();
      else if (a === 'skip-word') skipWord();
      return;
    }

    /* 字庫管理 */
    if (t.closest('[data-new-pack]')) { openPackEditor(null); return; }
    if ((el = t.closest('[data-edit-pack]'))) { openPackEditor(el.getAttribute('data-edit-pack')); return; }
    if ((el = t.closest('[data-move-pack]'))) {
      WM.packs.move(el.getAttribute('data-move-pack'), +el.getAttribute('data-dir'));
      render();
      return;
    }
    if ((el = t.closest('[data-del-pack]'))) {
      var p = packById(el.getAttribute('data-del-pack'));
      if (!p) return;
      if (!confirm('確定要刪除字庫「' + p.name + '」嗎？\n裡面 ' + p.chains.length + ' 條漸進鏈與學習紀錄都會消失。')) return;
      WM.packs.remove(p.id);
      toast('已刪除「' + p.name + '」');
      render();
      return;
    }
    if (t.closest('[data-open-export]')) { openExport(); return; }
    if (t.closest('[data-restore]')) {
      if (!confirm('還原成內建字庫會刪掉所有自訂字庫與紀錄，確定嗎？')) return;
      WM.packs.restoreBuiltIn();
      toast('已還原內建字庫', 'ok');
      render();
      return;
    }

    /* 設定 */
    if (t.closest('#themeBtn')) {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      WM.store.set('theme', next);
      return;
    }
    if (t.closest('[data-open-settings]')) { $('#settingsDrawer').hidden = false; return; }
  }

  function onKeyDown(e) {
    /* 設定抽屜：Esc 關閉 */
    if (e.key === 'Escape') {
      if (!$('#settingsDrawer').hidden) { $('#settingsDrawer').hidden = true; return; }
      if (!$('#packModal').hidden || !$('#exportModal').hidden) { closeModal(); return; }
    }

    var editing = e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA';
    var onLearn = currentRoute() === 'learn';
    var mod = e.ctrlKey || e.metaKey;

    function speakCurrent() {
      var pack = packById(tstate.packId);
      var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
      var step = chain && chain.steps[tstate.stepIdx];
      if (!step) return;
      var btn = $('.speak-btn');
      if (btn) btn.classList.add('is-playing');
      WM.speech.speak(step.en, { onend: function () {
        var b = $('.speak-btn');
        if (b) b.classList.remove('is-playing');
      } });
    }

    /* 學習頁快捷鍵（會蓋掉瀏覽器預設，先擋下來） */
    if (onLearn && mod) {
      var k = String(e.key || '');
      if (k === 'p' || k === 'P' || k === "'" || k === '"') {   /* Ctrl+P / Ctrl+' → 播放發音 */
        e.preventDefault();
        speakCurrent();
        return;
      }
      if (k === ';' || k === ':') {                                /* Ctrl+; → 顯示答案 */
        e.preventDefault();
        if (tstate.finished) return;
        tstate.revealAll = true;
        render();
        focusTyper();
        toast('已顯示答案，繼續照著打就好');
        return;
      }
    }

    /* 錯三次、答案已顯示的狀態：Enter 重新練 / 空白 跳過
       （此時沒有輸入框，所以要另外攔） */
    if (onLearn && tstate.givenUp && !tstate.finished) {
      if (e.key === 'Enter') { e.preventDefault(); retryWord(); return; }
      if (e.key === ' ')     { e.preventDefault(); skipWord(); return; }
    }

    /* 打字輸入框：空白 / Enter = 送出並比對 */
    if (e.target.id === 'typer') {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        commitWord();
        return;
      }
      /* 其他按鍵 → 打字音效 */
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
        if (WM.store.get('typeSound')) WM.audio.tick();
      }
      return;
    }

    if (editing) return;
  }

  function onInput(e) {
    if (e.target.id !== 'typer') return;
    tstate.typed = e.target.value;

    var pack = packById(tstate.packId);
    var chain = WM.packs.getChain(tstate.packId, tstate.chainId);
    if (!chain) return;
    var step = chain.steps[tstate.stepIdx];
    if (!step) return;
    var tokens = WM.text.tokenize(step.en);
    var tok = tokens[tstate.tokIdx];
    if (!tok) return;

    var slot = document.querySelector('.slot[data-slot="' + tstate.tokIdx + '"]');
    if (!slot) return;

    var bad = tstate.wrong && !WM.text.matches(tstate.typed, tok.word);
    /* 只顯示「你自己打的字」，不顯示目標單字 */
    slot.innerHTML = '<span class="slot__txt' + (bad ? ' is-bad' : '') + '">' +
      esc(tstate.typed) + '<span class="slot__caret"></span></span>';
    slot.classList.toggle('is-bad', !!bad);

    /* 重新輸入正確內容時，把紅色錯誤狀態拿掉 */
    if (tstate.wrong && WM.text.matches(tstate.typed, tok.word)) {
      tstate.wrong = false;
      slot.classList.remove('is-bad');
      var st = document.getElementById('typerState');
      if (st) {
        st.classList.remove('is-bad');
        st.textContent = '第 ' + Math.min(tstate.tokIdx + 1, tokens.length) + ' / ' + tokens.length + ' 個字';
      }
    }
  }

  /* ============================================================
     啟動
     ============================================================ */
  function boot() {
    if (!window.WORDMOMO_DATA || !WM.packs.cloneBuiltIn().length) {
      $('#app').innerHTML = '<div class="card empty"><div class="empty__ico">📭</div>' +
        '<h2>還沒有字庫資料</h2><p>請確認 <code>js/data.js</code> 存在且內容正確。</p></div>';
      return;
    }

    WM.store.load();
    applyTheme(WM.store.get('theme') || 'dark');
    WM.speech.init();
    WM.audio.setEnabled(!!WM.store.get('typeSound'));
    bindSettings();
    bindPackModalOnce();
    syncSettingsUI();
    setTimeout(syncSettingsUI, 900);
    setTimeout(syncSettingsUI, 2200);

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('input', onInput);
    window.addEventListener('hashchange', render);
    window.addEventListener('beforeunload', function () { WM.store.save(); });

    setTimeout(function () {
      var sp = document.getElementById('splash');
      if (sp) sp.classList.add('is-hidden');
    }, 380);

    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
