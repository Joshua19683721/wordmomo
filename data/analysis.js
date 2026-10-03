// data/analysis.js — 這一句的解析庫（老師寫好的內容，所有裝置共用）
//
// key 必須和句庫 data/sentences.js 裡的英文「完全一致」（含標點、單複數、大小寫）
//
// 每一筆的格式：
//   {
//     zh / ipa / headline : 基本資訊
//     items    : [ { point, ok, bad, why, exam } ]   逐項對照：項目 / 正確版本 / 常見錯誤 / 原因
//     examples : [ { ok:true, text, note }, { ok:false, text, note } ]  範例兩句（一對一錯）
//     traps    : [ ... ]   國中教育會考陷阱提醒
//     strategy : [ ... ]   實戰建議
//   }
//
// App 會自動幫每個英文句子開頭加上 (O) 或 (X) 標記，不用自己寫。
// 句庫裡沒有 key 的句子，App 會改用自動產生的自我檢查提示。

window.SENTENCE_ANALYSIS = {
  "This": {
    "zh": "這",
    "ipa": "/ðɪs/",
    "headline": "This 不加 s，句首還要大寫 T",
    "items": [
      {
        "point": "單複數",
        "ok": "this bag",
        "bad": "these bag",
        "why": "this 本身就有單複數之別，不會變成加 s 的形式；要表達「這些」得換成 these，或把後面的名詞也變成複數。國中生常以為英文的複數一律靠加 s，連 this 這種指涉單一的字也想幫它加。",
        "exam": "會考把 this／that 與 these／those 配對，或在句中挖空問 This 該配 is 還是 are。作答時先看後面的名詞是單數還是複數。"
      },
      {
        "point": "大小寫",
        "ok": "This",
        "bad": "this",
        "why": "This 放在句子最前面時，T 一定要大寫；只有在句子中間當形容詞修飾名詞時才用小寫 this。國中生打字最常漏的就是這個大寫，寫完要檢查第一個字母。",
        "exam": "會考單選常故意把句首的 This 改成小寫 this，讓你選正確版本。練習時先打大寫 T 再補 his，養成固定的按鍵順序。"
      },
      {
        "point": "be 動詞的搭配",
        "ok": "This is my plan.",
        "bad": "This are my plan.",
        "why": "This 是單數，後面的 be 動詞要用 is；are 留給複數主詞。學生常受中文「這些」影響，看到「這」就直接配上 are。判斷只看一件事：主詞是單數還是複數。",
        "exam": "會考選擇題常給 This is／This are 或 Those is／Those are 四個選項考你。把主詞圈起來，單數配 is、複數配 are，就能秒選。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "This is my new plan.",
        "note": "This 當主詞，後面用 is 說明它是什麼，my new plan 是名詞片語。單數主詞配 is，這是最基本的 be 動詞句型。"
      },
      {
        "ok": false,
        "text": "This are my new plan.",
        "note": "This 是單數，be 動詞要用 is，不能用 are。把 are 改成 is，寫成 (O) This is my new plan. 就正確了。"
      }
    ],
    "traps": [
      "this 沒有加 s 的形式，它和 those 本身就分好了單複數。",
      "This 放在句首要大寫 T，寫在句中修飾名詞時才用小寫。",
      "單數的 This 配 is，複數的 these 配 are，這組對應不要記混。"
    ],
    "strategy": [
      "先寫大寫 T 再補 his，把 This 當成一個按鍵組合來練。",
      "寫完 This 就順手檢查後面是 is 還是 are，錯了立刻改。",
      "把 this／that／these／those 抄成一張四格對照表，每天唸一次。"
    ]
  },
  "This is": {
    "zh": "這是",
    "ipa": "/ðɪs ɪz/",
    "headline": "This 後面的 is 不能省，也不能用 are",
    "items": [
      {
        "point": "be 動詞",
        "ok": "This is a plan.",
        "bad": "This a plan.",
        "why": "英文的 be 動詞（am／is／are）在一般句子中不能省略，This is 後面還要有受詞才完整。省略 be 只出現在少數慣用句型裡，考試一律照完整形式寫。",
        "exam": "會考會在句子中挖掉 be 動詞，或用選項考 (X) This a plan 與 (O) This is a plan。判斷原則：主詞後面沒有動詞，句子就不完整。"
      },
      {
        "point": "is / are 的選擇",
        "ok": "This is my bag.",
        "bad": "This are my bag.",
        "why": "This 是單數，be 動詞必須用 is；are 留給複數主詞，例如 plans 或 those。國中生常受中文「這些」影響，看到「這」就直接寫 are。",
        "exam": "會考題目給 This 或 Those 讓你選 is／are，或在閱讀測驗中出現 This is… 的句子。選之前先問自己：這一個，還是這些？"
      },
      {
        "point": "名詞前的限定詞",
        "ok": "This is a plan.",
        "bad": "This is plan.",
        "why": "is 後面接單數可數名詞時，前面一定要有 a／an 或 my、your 這類限定詞，不能光禿禿只寫名詞。中文可以省略，英文卻不能空掉。",
        "exam": "閱讀測驗與單選常出現缺冠詞的句子版本。名詞前少一個限定詞是台灣學生最常見的錯誤之一，寫完要自己唸一次。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "This is a good idea for the trip.",
        "note": "This is 後面依序接形容詞 a good，再接名詞 idea。be 動詞 is 不能省，單數名詞前也要有 a，兩個規則都守住了。"
      },
      {
        "ok": false,
        "text": "This a good idea for the trip.",
        "note": "少了 be 動詞 is。中文可以說「這是好主意」，英文卻一定要有動詞，補上 is 才完整。"
      }
    ],
    "traps": [
      "This is 是一整組，主詞與 be 動詞都不能拆開，後面還要接得上名詞。",
      "This 配 is、These 配 are，看的是單複數，不是中文口語的習慣。",
      "be 動詞省略只出現在慣用句（例如 Here you are.），一般句子省就是錯。"
    ],
    "strategy": [
      "把 This is 當成三個字的固定塊一次打完，不要中斷。",
      "打完之後停半秒，檢查後面是否接得上名詞或名詞片語。",
      "練習用「主詞—be—名詞」三格填空，每天默寫五個句子。"
    ]
  },
  "not planned": {
    "zh": "未預先計劃的",
    "ipa": "/nɑːt plænd/",
    "headline": "be 動詞後接過去分詞，別加 to 或 ing",
    "items": [
      {
        "point": "過去分詞的拼字",
        "ok": "not planned",
        "bad": "not planed",
        "why": "plan 是重讀音節且以單一子音結尾，加 -ed 時要雙寫 n 變成 planned，這條規則同時管過去式與過去分詞。台灣學生最常只加一個 e，寫成 planed。",
        "exam": "會考在動詞填空題放 planned、planed、planning 讓你圈錯。plan、planned、planning 三態都要會拼，考前默寫一次最保險。"
      },
      {
        "point": "不定詞 to",
        "ok": "not planned",
        "bad": "not to plan",
        "why": "be 動詞後面可以接 V-ing（進行式）或過去分詞（被動），但不能接 to 加動詞原形。寫成 not to plan 意思變成「不打算去計畫」，與原意完全不同。",
        "exam": "會考在 be 動詞後方挖空，選項常放 planned、planning、to plan。判斷關鍵：中文若出現「的」字，多半對應被動的過去分詞。"
      },
      {
        "point": "被動與進行式的差別",
        "ok": "not planned",
        "bad": "not planning",
        "why": "planned 是過去分詞，構成被動，表示「沒有被事先安排好」；planning 是現在分詞，變成「現在沒有在被安排」。中文只寫「未預先計劃的」時，預設是被動。",
        "exam": "閱讀測驗常靠 -ing 與 -ed 的差別出題，看句子談的是當下動作還是已完成的狀態。寫作時先問：這件事有沒有被安排？"
      },
      {
        "point": "否定詞的位置",
        "ok": "not planned",
        "bad": "planned not",
        "why": "英文的否定詞 not 固定放在 be 動詞後面，不能照中文「未……的」把否定搬到前面或句尾。一般結構是 be 動詞 + not + 分詞。",
        "exam": "會考字詞填空常把 not 放在題目預設位置，看你會不會自己校正。檢查口訣：唸起來卡住，就把 not 移回 be 動詞後面。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "The concert is not planned yet.",
        "note": "be 動詞 is 後面先放 not，再接過去分詞 planned，表示「還沒被安排好」。yet 放在句尾加強到目前為止的語氣，這個位置很常考。"
      },
      {
        "ok": false,
        "text": "The concert is not planning.",
        "note": "planning 是進行式，變成「這場演唱會現在沒有在被安排」。要表達沒有被預先安排好，必須用過去分詞 planned。"
      }
    ],
    "traps": [
      "plan 要雙寫 n，planned 與 planning 都一樣，只有 -ed 與 -ing 會多一個 n。",
      "be 後面接 planned（被動）還是 planning（進行中），語意差很多，不能只看中文。",
      "not 要放在 be 動詞後面，寫成 planned not 順序就是錯的。"
    ],
    "strategy": [
      "把 plan、planned、planning 三態寫成三行，每天唸一次並默寫。",
      "看到中文「未……的」就對應 be 加過去分詞，看到「正在」才用 be 加 -ing。",
      "打字時 planned 整個字一次輸入，不要中斷成 plan 加 ed。"
    ]
  },
  "This is not planned": {
    "zh": "這不是預先計劃好的",
    "ipa": "/ðɪs ɪz nɑːt plænd/",
    "headline": "否定詞固定夾在 be 動詞後面",
    "items": [
      {
        "point": "否定句語序",
        "ok": "This is not planned.",
        "bad": "This is planned not.",
        "why": "英文否定句的固定順序是主詞加 be 動詞加 not 加動詞，not 一定要緊跟在 be 動詞後面。照中文語序把否定搬到最後，讀起來會斷成兩截。",
        "exam": "會考在句子中給空格，問 not 要放哪裡；或拿兩個版本讓你選通順的那個。口訣是 be 動詞後面立刻接 not。"
      },
      {
        "point": "be 動詞不可省略",
        "ok": "This is not planned.",
        "bad": "This not planned.",
        "why": "否定句一樣需要 be 動詞，This 後面不能直接跳到 not。少了 is 的句子不完整，會考常把這種版本當成錯誤選項讓你挑出來。",
        "exam": "寫作題會在這裡出題。改錯時先檢查三個骨架字：主詞 This、be 動詞 is、動詞 planned，缺任何一個都不算完整。"
      },
      {
        "point": "名詞前的限定詞",
        "ok": "This is not a plan.",
        "bad": "This is not plan.",
        "why": "is 後面接單數可數名詞 plan，前面一定要有 a／an 或 my、your 這類限定詞。not 只負責否定，不會取代限定詞的功能。",
        "exam": "會考選擇題常把冠詞拿掉做成錯句，或在 This is 後方挖空問該填 a／an／my。判斷時先看名詞可不可數。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "This is not planned in our schedule.",
        "note": "骨架是 This、is、not、planned 四個關鍵詞，再用 in our schedule 補充說明。否定詞緊接 be 動詞，順序完全正確。"
      },
      {
        "ok": false,
        "text": "This is not plan.",
        "note": "錯在 plan 前面少了限定詞 a。not 不會替你完成冠詞的功能，補上 a 之後寫成 (O) This is not a plan. 才是正確句子。"
      }
    ],
    "traps": [
      "not 後面接 be 動詞或動詞原形，接單數名詞時一定要有 a 或 my。",
      "is not 常縮寫成 isn't，口說與會考寫作題都要會寫。",
      "整句順序是 This、is、not、planned，打字時照這四個關鍵詞最不容易出錯。"
    ],
    "strategy": [
      "先用骨架 This _ _ planned 填空，再依序填 is 與 not，最後才補細節。",
      "唸句子時在 is 與 not 之間停一下，節奏對了字序就不會錯。",
      "打完立刻檢查 not 前面是不是 be 動詞、後面是不是動詞原形或分詞。"
    ]
  },
  "Oh no, this is not planned": {
    "zh": "噢不，這完全不在計劃中",
    "ipa": "/əʊ nəʊ, ðɪs ɪz nɑːt plænd/",
    "headline": "Oh no 後要加逗號，後句用小寫",
    "items": [
      {
        "point": "標點符號",
        "ok": "Oh no, this is not planned.",
        "bad": "Oh no this is not planned.",
        "why": "Oh no 是感嘆語，中文寫「噢不，……」用逗號，英文也一樣要加逗號。少了逗號雖然還讀得懂，仍算標點錯誤，而且逗號後要空一格。",
        "exam": "會考寫作或改錯題會檢查感嘆詞後的標點。練習時把 Oh no, 當成一個固定組合先打，之後再接句子本體，就不容易漏。"
      },
      {
        "point": "逗號後的大小寫",
        "ok": "Oh no, this is not planned.",
        "bad": "Oh no, This is not planned.",
        "why": "用逗號連接的兩部分屬於同一個句子，逗號後的第一個字要小寫；只有句號、問號、驚嘆號之後才需要大寫。國中生常以為有標點就一定要大寫。",
        "exam": "會考選擇題會把逗號後改成大寫，讓你選出錯誤版本。判斷口訣：前面是逗號就用小寫，前面是句號才用大寫。"
      },
      {
        "point": "後續句子的完整性",
        "ok": "Oh no, this is not planned.",
        "bad": "Oh no, is not planned.",
        "why": "感嘆詞後面接的是一個完整子句，必須保留主詞 This。只留 be 動詞以後的殘句，讀起來像筆記不像英文句子，寫作題一定判錯。",
        "exam": "閱讀測驗常把這樣的殘句拿來當錯誤選項。檢查方法很簡單：唸一次，發現沒有主詞就代表句子不完整。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "Oh no, the party is not planned yet.",
        "note": "先寫感嘆詞 Oh no 和逗號，再接完整否定子句。逗號後用小寫 the party 當主詞，be 動詞 is 加 not，最後接被動分詞，三個規則都正確。"
      },
      {
        "ok": false,
        "text": "Oh no the party is not planned yet.",
        "note": "少了逗號，感嘆詞和後面的句子黏在一起。感嘆詞後有停頓就要用逗號隔開，補上逗號並空一格才是正確寫法。"
      }
    ],
    "traps": [
      "感嘆詞 Oh no 後面要有逗號，而且逗號後要空一格。",
      "逗號後接一般子句時用小寫，只有句號之後才需要大寫。",
      "關鍵詞順序是 Oh no、This、is、not、planned，漏掉任何一個都算錯。"
    ],
    "strategy": [
      "把 Oh no, 視為一個固定按鍵組合，先打感嘆詞再補逗號。",
      "唸的時候在 Oh no 之後自然停一下，就會記得加逗號。",
      "打完依序檢查三件事：逗號有沒有、大寫對不對、not 在不在 be 動詞後面。"
    ]
  },
  "Mr. President": {
    "zh": "總統先生",
    "ipa": "/ˈmɪstər ˈprezɪdənt/",
    "headline": "Mr. 後面不加 the，President 首字母要大寫。",
    "items": [
      {
        "point": "標題稱謂",
        "ok": "「Mr. President」",
        "bad": "「Mr. the President」",
        "why": "Mr. 對應中文的「先生」，後面接專有名詞或特定職稱時不加冠詞；the 只能用於沒有專名形容的職稱前，例如 the president of the company。總統是特定的人與職務，前面不能再加 the。",
        "exam": "會考常把「Mr./Ms./Dr. + 專有名詞」與「the + 職稱 of 地點」並列成選項，考你判斷冠詞該不該用。"
      },
      {
        "point": "縮寫與句點",
        "ok": "「Mr.」",
        "bad": "「Mr President」",
        "why": "Mr. 是 Mister 的縮寫，正式稱謂後固定要加句點，而且句末只點一次，例如 (O) Good morning, Mr. President.。漏掉句點雖然意思還看得懂，但不正式，會考的標準寫法一律要有。",
        "exam": "會考閱讀與聽力常出現 Mr./Ms./Mrs./Dr.，拼字題會考縮寫後的句點，不可漏字或多加。"
      },
      {
        "point": "專有名詞大小寫",
        "ok": "「President」",
        "bad": "「Mr. president」",
        "why": "這裡的 president 指的是「總統」這個特定職位，屬於專有名詞，所以 P 一定要大寫，不可當成一般名詞小寫。若是「某公司的總裁」這種帶限定說明的職稱，才沒有專名的大寫規則。",
        "exam": "會考字彙與閱讀常以專有名詞大小寫設陷阱，專有名詞首字母漏了大寫就算錯，整個選項都不給分。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "Good evening, Mr. President.",
        "note": "稱謂放在問候語之後，前面用逗號隔開，Mr. 的縮寫句點與句末句點都要有，不可重複。"
      },
      {
        "ok": false,
        "text": "Good evening, Mr. the President.",
        "note": "多加冠詞 the。因為 President 是專有名詞，前面不能加 the；去掉 the 才是正確寫法。"
      }
    ],
    "traps": [
      "「Mr. the President」是最典型的錯誤，the 只能搭配沒有專名的職稱。",
      "President 既是職稱也是專有名詞，這裡兩個字都要大寫。",
      "縮寫 Mr. 的句點不可漏，也不要和句末句點重複點兩次。"
    ],
    "strategy": [
      "把「稱謂 + 專有名詞」當成公式背：Mr./Ms./Mrs./Dr. 後面直接接專有名詞。",
      "看到句中有 the，就先檢查後面的名詞是不是專有名詞，是就不能加 the。",
      "練習時先寫稱謂再寫名字，中間不要憑空插入冠詞或 the。"
    ]
  },
  "calling": {
    "zh": "來電",
    "ipa": "/ˈkɔːlɪŋ/",
    "headline": "calling 在這裡當名詞用，表示「來電這件事」。",
    "items": [
      {
        "point": "動名詞",
        "ok": "「your calling」",
        "bad": "「your to call」",
        "why": "calling 在這裡是動名詞，也就是動詞加 -ing 當名詞用，表示「打電話這件事」。your 是所有格形容詞，後面一定要接名詞，所以接 calling 正確；接 to call 就變成「你的去呼叫」，語意完全不通。",
        "exam": "會考常在完形填空或翻譯題測 Thank you for calling 這類 for + 動名詞的固定結構。"
      },
      {
        "point": "片語選擇",
        "ok": "「a phone call from you」",
        "bad": "「a calling from you」",
        "why": "「來電」最自然的說法是 a call 或 a phone call。calling 當名詞時多用於 your calling 或 a calling card（名片）；硬翻成 a calling 雖看得懂，但不是會考與日常使用的說法。",
        "exam": "會考聽力常出現 Sorry, wrong number. 這類來電情境，選項多為 a phone call 或 a call。"
      },
      {
        "point": "發音與拼字",
        "ok": "calling /ˈkɔːlɪŋ/",
        "bad": "calling /ˈkɔːrɪŋ/",
        "why": "字母 l 在母音前後都讀 /l/，台灣學生常把它唸成 /r/，聽起來像 car-ing。打字時呼叫這個字要有兩個 l，漏掉一個就變成 caling，拼字與發音要一起記。",
        "exam": "會考字彙題有時考拼字或字首發音，call、calling 這組短母音加 /l/ 的字要能立刻反應。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "Thank you for your calling.",
        "note": "介系詞 for 後面接名詞 your calling，意思是「謝謝您來電」，是會考與生活上都會用的說法。"
      },
      {
        "ok": false,
        "text": "Thank you for your to call.",
        "note": "your 後面不能用 to + 動詞。要嘛改成 Thank you for calling me，要嘛把 to call 改回名詞 your calling。"
      }
    ],
    "traps": [
      "for、of 這類介系詞後面接動詞，一律要變成 -ing 形式。",
      "Thank you for 後面是 doing，不是 for to do，這題最常被扣分。",
      "calling 有雙 l，唸成 /r/ 或漏打一個 l 都不正確。"
    ],
    "strategy": [
      "把來電相關的片語整理成同一組記憶：a call、a phone call、your calling。",
      "看到動詞就問自己「這裡當名詞嗎？」當名詞就加 -ing 變成動名詞。",
      "打字時把 calling 當成一個完整單字一次打完，不要中途漏掉 l。"
    ]
  },
  "If it wasn't because of you calling": {
    "zh": "如果不是因為您打電話來",
    "ipa": "/ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ/",
    "headline": "虛擬語氣用 was，because of 後接 -ing。",
    "items": [
      {
        "point": "虛擬語氣",
        "ok": "「If it wasn't because of you calling, …」",
        "bad": "「If it is not because of you calling, …」",
        "why": "「如果不是因為您打電話來」是與現在事實相反的假設，虛擬語氣的 if 子句要用過去式 was 搭配否定，讀起來才是「事實上並非如此」。若寫成 is not，就變成單純的「如果事實不是這樣」，語氣完全不同。",
        "exam": "會考常考與現在事實相反的假設句改寫題，例如 If I were you, I would…，答題前先判斷是否與現實相反。"
      },
      {
        "point": "because of 後接動名詞",
        "ok": "「because of you calling」",
        "bad": "「because of you to call」",
        "why": "because of 是介系詞，後面接名詞或動詞的 -ing 形式，所以 calling 正確；多加 to 變成 because of you to call 就錯了。想用不定詞必須去掉 of，改成 because you called。",
        "exam": "會考選擇與改寫題常出現 because of 後面誤加 to 的陷阱，判斷口訣是「介系詞接名詞或動名詞」。"
      },
      {
        "point": "否定縮寫",
        "ok": "「wasn't」",
        "bad": "「was'nt」",
        "why": "was not 縮寫成 wasn't，字母 n 和 t 要相鄰，撇號不另加，was'nt 這種寫法是錯的。wasn't 本身已經含有 not，不能再接一個 not，也不能再補一次 was。",
        "exam": "會考完形填空常以縮寫字形出題，wasn't、weren't、didn't 都是 n 加 t 的組合，要記牢。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "If it wasn't for you calling, I would have been late.",
        "note": "虛擬語氣寫法：if 子句用過去式 was 加否定，主句用 would have + 過去分詞，兩個子句之間用逗號隔開。"
      },
      {
        "ok": false,
        "text": "If it wasn't because of you to call, I would have been late.",
        "note": "because of 是介系詞，後面要接 -ing 形式的 calling，不能接不定詞 to call；把 to 刪掉就正確了。"
      }
    ],
    "traps": [
      "because of 後面接 -ing，because 後面才接完整子句（because you called）。",
      "這句的主詞是 it，所以只能用 wasn't，不能寫 weren't。",
      "虛擬語氣的 if 子句要用過去式，不要用 is / am。",
      "if 子句在句首時，後面一定要有逗號再接主句。"
    ],
    "strategy": [
      "整理「because of + 名詞或 doing」與「because + 主詞 + 動詞」兩種對照表。",
      "寫假設句時先判斷「與現在事實相反」還是「未來可能」，再決定用 was 還是 will。",
      "打字時把 wasn't 當一個單字一次打完，n 和 t 不要拆開或漏字。"
    ]
  },
  "I am on stage": {
    "zh": "我正在舞台上",
    "ipa": "/aɪ æm ɑːn steɪdʒ/",
    "headline": "舞台前不加 the，主詞 I 配 am。",
    "items": [
      {
        "point": "介系詞與冠詞",
        "ok": "「on stage」",
        "bad": "「on the stage」",
        "why": "「舞台」指演出這個場所時是固定說法 on stage，不加冠詞；加了 the 會讓人聯想到舞台上的某個位置或道具。中文的「在舞台上」本來就沒有對應的 the，國中會考以不加 the 為標準寫法。",
        "exam": "會考常以 on stage、in the audience 這組片語做對照，測學生能否分辨介系詞與冠詞。"
      },
      {
        "point": "be 動詞",
        "ok": "I am on stage.",
        "bad": "I on stage.",
        "why": "英文的 be 動詞不能省略。中文「我正在舞台上」沒有「是」這個字，但英文一定要有 am。漏掉 be 動詞是中文母語者最常見的結構錯誤，寫完句子要回頭檢查 am、is、are 有沒有。",
        "exam": "會考翻譯題常考中文沒有 be 動詞的情況，答題時要主動補出 am、is、are。"
      },
      {
        "point": "主詞與 be 動詞一致",
        "ok": "「I am」",
        "bad": "「I is」",
        "why": "be 動詞必須配合主詞：I 用 am，he、she、it 用 is，you、we、they 用 are。I 是一個人稱代名詞的單數，後面只能配 am，寫成 I is 是台灣學生最常見的主詞動詞不一致。",
        "exam": "會考單選常把 I is、they is 這類選項設成錯誤，檢查規則只有一句：主詞決定 be 動詞。"
      },
      {
        "point": "固定片語辨析",
        "ok": "「on stage / off stage / in the audience」",
        "bad": "「in stage」",
        "why": "上台是 on stage，下台是 off stage，坐在台下則是 in the audience。介系詞 on 用在舞台這種「表面或場所」上，寫成 in stage 就不對；這組片語常一起出題，必須成組記憶。",
        "exam": "會考閱讀與聽力常以 on/off stage、in the audience 描述表演情境，選項多為這組片語。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "I am on stage now.",
        "note": "on stage 是固定搭配，不加冠詞 the；be 動詞 am 配合主詞 I，句尾的 now 表示此刻正在進行。"
      },
      {
        "ok": false,
        "text": "I am on the stage now.",
        "note": "多加冠詞 the。舞台泛指演出場所時直接用 on stage；若改成 off stage 就變成「我已經下台了」，語意完全不同。"
      }
    ],
    "traps": [
      "「在舞台上」是 on stage，不加 the，這是中文母語者最常錯的地方。",
      "I 後面用 am，不要寫成 I is。",
      "be 動詞不能省略，英文沒有「我＋在台上」這種省略說法。",
      "舞台用 on 不用 in，觀眾席才是 in the audience。"
    ],
    "strategy": [
      "把 on stage、off stage、in the audience 三個片語綁在一起背，考試直接套。",
      "寫完 be 動詞句立刻自我檢查：主詞是誰？對應的 am、is、are 有沒有？",
      "中翻英時分兩步：先補出 be 動詞，再處理介系詞與冠詞。"
    ]
  },
  "If it wasn't because of you calling, I am on stage with the besties.": {
    "zh": "如果不是因為您打電話來，我現在正跟好朋友在台上呢。",
    "ipa": "/ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ, aɪ æm ɑːn steɪdʒ wɪð ðə ˈbestiːz/",
    "headline": "if 子句後要逗號；with 表示「和…一起」。",
    "items": [
      {
        "point": "複合句與標點",
        "ok": "If it wasn't because of you calling, I am on stage with the besties.",
        "bad": "If it wasn't because of you calling I am on stage with the besties.",
        "why": "if 條件子句放在句首時，後面一定要加逗號，再接主句。少了逗號，讀者會在 calling 之後就停下，句子讀起來斷成兩截，句子的結構關係不清楚，格式分就會被扣。",
        "exam": "會考完形填空與翻譯題常出現 If 開頭的長句，逗號是得分關鍵，少一個就整題失分。"
      },
      {
        "point": "虛擬語氣",
        "ok": "「If it wasn't because of you calling, …」",
        "bad": "「If it is not because of you calling, …」",
        "why": "這是與現在事實相反的假設，虛擬語氣的 if 子句用過去式 was 加否定。另外 were 通常接 you、he、she、they 這類主詞，it 後面固定用 wasn't，寫成 is not 就失去了假設語氣。",
        "exam": "會考常把虛擬語氣句改成陳述句或反過來出題，做題前先看主詞是 it 還是 you。"
      },
      {
        "point": "with 與 and",
        "ok": "I am on stage with the besties.",
        "bad": "I am on stage and the besties.",
        "why": "with 表示「和……一起」，後面接同伴的名詞；and 是連接詞，不能把兩個名詞直接變成「我」的主詞。要同時提到自己和朋友，要寫 with me and my besties，或簡單寫 with my besties。",
        "exam": "會考單選常考 with 表示「和……一起」，and 則用來連接詞語或對等成分，兩者不能互換。"
      },
      {
        "point": "because of 後接動名詞",
        "ok": "「because of you calling」",
        "bad": "「because of you to call」",
        "why": "because of 是介系詞，後面接名詞或 -ing 動名詞，calling 正確；多加 to 會變成 because of you to call 而錯。想用 to call 要去掉 of，改成 because you called。",
        "exam": "會考翻譯與改寫題常在 because of 後面誤加 to，看到介系詞就立刻檢查後面的詞形。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "If it wasn't because of your calling, I am still on stage with my besties.",
        "note": "if 子句用過去式 was 加否定，主句維持現在式 am，中間用逗號分開；with my besties 表示「和我的好朋友一起」。"
      },
      {
        "ok": false,
        "text": "If it wasn't because of you calling I am on stage with the besties.",
        "note": "if 子句後面少了逗號，句子被硬生生切斷。補上逗號，並再確認 because of 後面接的是 -ing 形式 calling、沒有多加 to。"
      }
    ],
    "traps": [
      "if 開頭的子句後面一定要加逗號，再接主句。",
      "with the besties 不能改成 and the besties，兩者意思不同。",
      "虛擬語氣的 if 子句用 was，不要寫成 is。",
      "besties 偏口語，正式場合或考試請用 friends 與 good friends。"
    ],
    "strategy": [
      "讀長句先在逗號切一刀：左邊是 if 子句，右邊是主句，分兩段確認。",
      "打完主句後檢查有沒有完整的主詞與 be 動詞，這裡是 I am。",
      "because of 之後看到動詞就自動加 -ing；看到 to 就要立刻回頭改。"
    ]
  },
  "kinds of animals": {
    "zh": "各種動物",
    "ipa": "/ˈkaɪndz əv ˈænɪ.məlz/",
    "headline": "kinds 與 animals 都要複數，別漏掉 s",
    "items": [
      {
        "point": "名詞單複數",
        "ok": "kinds of animals",
        "bad": "kinds of animal",
        "why": "「kinds of animals」表示各種動物，animals 是可數名詞複數，前面已有 kinds of 修飾。學生常只把 kind 變成 kinds，卻忘了 animal 也要加 s，寫成 kinds of animal，整個片語的數量就跑掉了。",
        "exam": "會考常在選項中放入 kinds of animal 與 kinds of animals 讓你選，判斷關鍵是 kind 與 animal 都要複數；記住 of 後面的名詞也要跟著變複數。"
      },
      {
        "point": "of 後面的名詞也要複數",
        "ok": "kinds of birds",
        "bad": "kinds of bird",
        "why": "在數量詞加 of 加名詞的結構裡，複數的 kinds 會讓 of 後面的可數名詞一起變複數，所以要寫 kinds of birds。這是台灣學生最常漏改的地方，看到 kind 加了 s 就以為整個片語完成。",
        "exam": "會考字詞填空或改錯常考這個搭配。練習時把 a kind of 與 kinds of 各唸一次：a kind of bird 是單數，kinds of birds 是複數，耳朵聽得出差別就比較不會錯。"
      },
      {
        "point": "a kind of 與 kinds of 的差別",
        "ok": "a kind of dog",
        "bad": "a kinds of dog",
        "why": "a kind of 前面有單數 a，後面的名詞就用單數；kinds of 前面已經是複數 kinds，後面不用再加 a，名詞也用複數。寫成 a kinds of 等於把單數與複數兩套規則混在一起。",
        "exam": "會考可能在同一題比較 a kind of 與 kinds of 的用法。作答時先看 kind 前面的字：a 就是一種、名詞用單數；kinds 就是多種、名詞用複數。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "There are two kinds of animals in my picture.",
        "note": "前面有 two，所以名詞用複數 kinds；of 後面的 animals 也要跟著變複數，be 動詞用 are，整個數量關係才一致。"
      },
      {
        "ok": false,
        "text": "There are two kinds of animal in my picture.",
        "note": "錯在 animal 少了 s。two 已經表示兩種，animals 一定要複數；把 animal 改回 animals，句子就正確了。"
      }
    ],
    "traps": [
      "kinds of animal 少了 s，是本單元最常見的扣分點。",
      "of 後面的名詞要跟著 kinds 一起變複數，不能只改 kind。",
      "a kinds of 一定是錯的，單數 a 與複數 kinds 只能擇一。",
      "判斷要不要複數，先看前面有沒有 a、two、many 這類數量詞。"
    ],
    "strategy": [
      "打完 kinds 之後，順手檢查 of 後面的名詞是不是也加了 s。",
      "唸英文時把單複數唸清楚，kinds of animals 結尾要聽到 -z 的音。",
      "把 a kind of 與 kinds of 各寫三個例句當範例，考前默寫一次。",
      "看到 kind 先問自己：這裡有幾種？一種用 a kind，兩種以上用 kinds。"
    ]
  },
  "There are many kinds of animals in the zoo.": {
    "zh": "動物園裡有許多種動物。",
    "ipa": "/ðeər ɑː ˈmeni ˈkaɪndz əv ˈænɪ.məlz ɪn ðə zuː/",
    "headline": "There are 要配合 many 後面的複數名詞",
    "items": [
      {
        "point": "主詞動詞一致",
        "ok": "There are many kinds of animals in the zoo.",
        "bad": "There is many kinds of animals in the zoo.",
        "why": "There be 句型的 be 動詞要看後面最靠近的那個名詞。many kinds of animals 是複數，所以一定用 are。學生常受中文「有」影響，習慣一律寫 There is，但複數名詞前必須用 are。",
        "exam": "會考常在改錯或選擇題考 There is 與 There are。判斷方法是把後面的名詞唸出來：單數用 is、複數用 are，別靠中文語感猜。"
      },
      {
        "point": "many 後接複數可數名詞",
        "ok": "There are many kinds of animals in the zoo.",
        "bad": "There are many kind of animals in the zoo.",
        "why": "many 是許多，後面一定要接可數名詞的複數，所以寫 many kinds of animals。kinds 本身就是複數，animal 也要加 s；少寫一個 s，整個片語就算錯。",
        "exam": "會考選項常放 many animal 這種寫法來考單複數。口訣：many 加可數複數，much 加不可數；animals 可以一個一個數，所以一定用 many。"
      },
      {
        "point": "定冠詞 the 加場所名詞",
        "ok": "in the zoo",
        "bad": "in zoo",
        "why": "zoo 是可數單數名詞，前面要有 the、this 或 the 這類限定詞。中文講在動物園裡會自然省略，但英文不能空掉，本句用 the zoo 表示談論的那個動物園。",
        "exam": "會考單字題或翻譯題常在這裡失分。動物相關的場所詞如 the zoo、the park、the farm，前面幾乎都要加 the，寫 in the zoo 最穩妥。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "There are many kinds of animals in the zoo.",
        "note": "There are 後面接 many kinds of animals，複數對複數；句尾 in the zoo 用 the 指明是哪個場所，整句結構完整。"
      },
      {
        "ok": false,
        "text": "There is many kinds of animals in the zoo.",
        "note": "be 動詞與後面的複數名詞不一致。many kinds of animals 是複數要用 are，把 is 改成 are，句子就正確了。"
      }
    ],
    "traps": [
      "There be 句型的主詞在後面，be 動詞要跟後面的名詞看齊。",
      "many 之後一定要用複數名詞，漏掉 s 就整句扣分。",
      "in the zoo 少了 the，單字再拼對也不算正確。",
      "zoo 是可數名詞，前面需要 the、this 或 that 這類限定詞。"
    ],
    "strategy": [
      "寫完 There be 立刻回頭看後面的名詞，單數用 is、複數用 are。",
      "打完單字後逐字檢查 s 有沒有漏，尤其是 animal 這類名詞。",
      "練習時把 There is 與 There are 各造三句，再交叉改錯加深印象。",
      "中文可以省略冠詞，英文不行；動物、場所名詞前先想 the。"
    ]
  },
  "How many kinds of animals can you see in this picture?": {
    "zh": "你在這張圖片裡看得到多少種動物？",
    "ipa": "/haʊ ˈmeni ˈkaɪndz əv ˈænɪ.məlz kən juː siː ɪn ðɪs ˈpɪkʃə/",
    "headline": "How many 後接複數，問句要用 can you 的語序",
    "items": [
      {
        "point": "疑問詞 How many",
        "ok": "How many kinds of animals",
        "bad": "How much kinds of animals",
        "why": "How many 用來問可數名詞的數量，所以後面接複數的 kinds of animals。How much 只能問不可數名詞的量或問價錢，用在 animals 這種可數名詞前面一定錯。",
        "exam": "會考常用 How many 與 How much 的配對題或改錯題。判斷方式：先看後面的名詞能不能一個一個數；animals 可以數，就一定要用 How many。"
      },
      {
        "point": "疑問句語序",
        "ok": "How many kinds of animals can you see in this picture?",
        "bad": "How many kinds of animals you can see in this picture?",
        "why": "含 how many 的問句，後面要接一般疑問句語序，也就是問詞之後要立刻出現 can、is、do。少了 can 就變成陳述句，讀起來像在陳述事實，問句便不成立。",
        "exam": "會考在選擇題或句子改寫題考問句語序。口訣：問詞開頭就把 be 動詞或助動詞拉到前面，寫完檢查有沒有 can、is、do。"
      },
      {
        "point": "情態動詞 can",
        "ok": "can you see",
        "bad": "can you sees",
        "why": "can 是情態動詞，後面的動詞一定要用原形 see，不能加 s，也不能改成 sees、saw 這類形式。can 本身就有能力的意思，後面直接接動詞原形。",
        "exam": "會考改錯題常出現 can you sees、can you seeing 這類寫法。寫完 can 就默念原形 see，立刻檢查後面有沒有多加 s 或 -ing。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "How many kinds of animals can you see in this picture?",
        "note": "How many 後接複數 kinds of animals，can 後接原形 see，問詞之後立刻放 can，語序與單複數都正確。"
      },
      {
        "ok": false,
        "text": "How many kind of animals can you see in this picture?",
        "note": "錯在 kind 少了 s。How many 問的是種類數，後面要用複數的 kinds of animals；把 kind 改成 kinds，句子就正確。"
      }
    ],
    "traps": [
      "How many 只能搭配可數名詞複數，animals 前的 s 不能漏。",
      "問詞開頭的句子一定要有 can、is、do，不能用陳述句語序。",
      "can 後面的動詞用原形，see 不加 s 也不加 -ing。",
      "this picture 已經有 this，後面不要再加 the。"
    ],
    "strategy": [
      "寫問句時依序寫 How many、複數名詞、最後放 can you see。",
      "唸出聲檢查：many 後面聽得到 -z 才是複數，聽不到就是漏 s。",
      "把問句和答句一起背，例如 How many kinds of animals 對應 Six。",
      "改錯時先圈出 How many，再檢查後面名詞的單複數。"
    ]
  },
  "My brother is interested in animals.": {
    "zh": "我弟弟對動物感興趣。",
    "ipa": "/maɪ ˈbrʌðər ɪz ˈɪntrəstɪd ɪn ˈænɪ.məlz/",
    "headline": "be interested in 後面接名詞，不要漏 be",
    "items": [
      {
        "point": "interested 與 interesting",
        "ok": "My brother is interested in animals.",
        "bad": "My brother is interesting in animals.",
        "why": "interested 是感到有興趣的，當形容詞描述人的心情，前面要有 be 動詞；interesting 是有趣的，用來描述事物本身。這裡的主詞是 brother，應該說他感到有興趣，而不是他很有趣。",
        "exam": "會考常以選擇題考 interested 與 interesting 的差別。判斷法：接在 be 動詞後面描述人的心情用 interested；放在名詞前描述事物用 interesting。"
      },
      {
        "point": "be 動詞不能漏",
        "ok": "My brother is interested in animals.",
        "bad": "My brother interested in animals.",
        "why": "interested 前面一定要有 be 動詞 is、am 或 are。中文說對動物感興趣可以省略動詞，但英文的 interested 是形容詞，必須靠 be 動詞撐起整個句子，漏掉就不成句。",
        "exam": "會考句子改寫與翻譯常在這裡扣分。練習時把中文的「對……感興趣」一律翻成 be interested in，不要只寫 interested 就以為完成。"
      },
      {
        "point": "介系詞 in 加名詞",
        "ok": "interested in animals",
        "bad": "interested in animal",
        "why": "be interested in 裡的 in 是介系詞，後面接名詞或動名詞。animals 是可數名詞複數，表示對動物這一整類感到有興趣，所以不能寫成單數 animal。",
        "exam": "會考常考 be interested in 後面接名詞或 V-ing，例如 be interested in animals、be interested in reading；接動詞一定要加 -ing。"
      },
      {
        "point": "主詞動詞一致",
        "ok": "My brother is interested in animals.",
        "bad": "My brother am interested in animals.",
        "why": "My brother 是第三人稱單數，be 動詞要用 is。學生常受 I am 影響，把 brother 也配上 am；但 brother 對應 is，只有複數的 brothers 才用 are。",
        "exam": "會考在翻譯題考 My brother、My sister、They 搭配的 be 動詞。口訣：I 用 am，他或單數名詞用 is，you、we、they 與複數用 are。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "My brother is interested in animals.",
        "note": "主詞 My brother 是單數，用 is；interested 後面接介系詞 in 與名詞 animals，結構完整，是標準寫法。"
      },
      {
        "ok": false,
        "text": "My brother is interested on animals.",
        "note": "固定搭配是 be interested in，不是 on。表示對某事物感興趣一律用 in，把 on 改成 in，句子就正確了。"
      }
    ],
    "traps": [
      "interested 描述人的心情，interesting 描述東西有趣，兩者不能混用。",
      "be 動詞不能漏掉，只寫 interested 不成句子。",
      "be interested in 是固定搭配，in 不可改成 on 或 at。",
      "My brother 是單數，be 動詞用 is，不是 am。"
    ],
    "strategy": [
      "把 be interested in 當成一個整塊背，後面直接接名詞或 V-ing。",
      "寫完 interested 就檢查前面有沒有 be、後面有沒有 in。",
      "把 interested 與 interesting 各造三句，練成反射區分。",
      "翻譯「對……感興趣」時，固定寫成 be interested in 加名詞。"
    ]
  },
  "The elephant is bigger than the horse.": {
    "zh": "大象比馬大。",
    "ipa": "/ðiː ˈelɪfənt ɪz ˈbɪɡər ðæn ðə hɔːs/",
    "headline": "比較級 bigger 後接 than，前面別再加 more",
    "items": [
      {
        "point": "比較級加 than",
        "ok": "The elephant is bigger than the horse.",
        "bad": "The elephant is more bigger than the horse.",
        "why": "bigger 已經是 big 的比較級，前面不能再加 more，否則變成重複比較。中文的比較級沒有這個字，但英文的 more 是給多音節字用的，短字比較級直接加 -er。",
        "exam": "會考在改錯題最常出現 more 加比較級。口訣：短字用 -er，長字才用 more，例如 big 變 bigger，beautiful 變 more beautiful。"
      },
      {
        "point": "big 變 bigger 的拼法",
        "ok": "bigger",
        "bad": "biger",
        "why": "big 的結尾是單一子音字母且是單音節字，加 -er 時中間的子音要重複，所以寫成 bigger。台灣學生常只寫一個 g，變成 biger，拼字就錯了。",
        "exam": "會考選擇題或聽力測驗常考比較級拼字。規則：單音節字以 g、l、r、m、n 結尾時要雙寫，如 big 變 bigger、hot 變 hotter。"
      },
      {
        "point": "定冠詞 the 加單數可數名詞",
        "ok": "The elephant is bigger than the horse.",
        "bad": "The elephant is bigger than horse.",
        "why": "elephant 與 horse 都是單數可數名詞，前面要用 the 指出是哪一隻。比較兩者時兩邊的名詞都要加 the，中文可以省略，但英文這裡不能漏。",
        "exam": "會考在翻譯或閱讀理解檢查細節。the 不是裝飾，比較句裡兩邊的單數名詞前都要加 the，否則句子不完整會被判錯。"
      },
      {
        "point": "比較級不能直接用原級",
        "ok": "The elephant is bigger than the horse.",
        "bad": "The elephant is big than the horse.",
        "why": "看到 than 就代表前面必須是比較級或 more、fewer 之類的比較說法，不能用原級 big。big 是本來的大小，bigger 才是比誰大，兩者語意完全不同。",
        "exam": "會考常在改錯與句子合併題出現。寫比較句時先看到 than，再回頭把 be 動詞後面的字改成比較級，形成固定框架。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "The elephant is bigger than the horse.",
        "note": "be 加比較級 bigger 加 than 是一組；兩個單數名詞前都有 the，句型完整，意思就是大象比馬大。"
      },
      {
        "ok": false,
        "text": "The elephant is more bigger than the horse.",
        "note": "bigger 本身已經是比較級，前面不能再加 more，屬於重複比較。刪掉 more 只留 bigger，句子就正確。"
      }
    ],
    "traps": [
      "比較級前面不能再加 more，more 加比較級是會考常見錯答。",
      "bigger 的 g 要寫兩次，big 變 bigger 不能少一個字母。",
      "than 前面的字一定是比較級，看到 than 就回頭檢查。",
      "比較句裡兩邊的單數名詞都要加 the，不能只加一個。"
    ],
    "strategy": [
      "寫比較句時先套公式：主詞加 be 加比較級加 than 加對象。",
      "打完 -er 後回頭看有沒有漏掉要重複的子音字母。",
      "把 more 的用法分兩類記：短字用 -er，長字用 more，中間不要混。",
      "改錯時看到 than 先畫線，再確認前面是比較級而不是原級。"
    ]
  },
  "She has three pets at home.": {
    "zh": "她家裡有三隻寵物。",
    "ipa": "/ʃiː hæz θriː pets ət həʊm/",
    "headline": "第三人稱單數用 has，寵物複數別漏 s",
    "items": [
      {
        "point": "主詞動詞一致",
        "ok": "She has",
        "bad": "She have",
        "why": "主詞 She 是第三人稱單數，現在式動詞要加 -s/-es，所以用「has」。這是國中生最常錯的冠軍：中文「她有」不分人稱，英文卻一定要看主詞。口訣是 I/you/they/it 用「have」，he/she/it 單數用「has」。",
        "exam": "會考常在單選或翻譯題送出「(X) She have three pets.」這種選項；要立刻檢查主詞是誰，三單就自動改成 has。"
      },
      {
        "point": "名詞複數",
        "ok": "three pets",
        "bad": "three pet",
        "why": "前面有數詞 three（三隻），表示數量超過一隻，pet 一定要變成複數「pets」。中文常用「三隻寵物」省略「隻」字，英文卻不能省掉 -s。類似的還有「three dogs」「three cats」。",
        "exam": "翻譯題出現「兩隻狗」「三本書」時，複數 -s 幾乎是必得分點；忘記加 s 即使字面意思對也會被扣分。"
      },
      {
        "point": "介詞 at",
        "ok": "at home",
        "bad": "in home ／ to home",
        "why": "「在家」是固定說法「at home」，home 在這裡當副詞用，前面不加任何介詞的 the，也不加 in、to。學生常受中文「在家裡」影響，硬塞一個介詞進去，這是典型中式英文。",
        "exam": "題目若出現「他在家」翻譯題，標準答案固定是「at home」；改成「in home」一定被扣分。"
      },
      {
        "point": "基數詞 + 複數名詞",
        "ok": "three pets",
        "bad": "threes pet",
        "why": "three 是基數詞，本身已經表達確切數量，後面名詞要接「複數原形」，不能把 -s 搬到數詞上。英語的複數變化只發生在名詞本身：「three books」「two cats」「five apples」。",
        "exam": "會考單選有時把「(X) threes books」當錯誤選項，測的就是「複數標記在名詞上」這個觀念。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "She has three pets at home.",
        "note": "She（第三人稱單數）配 has，three 後面的 pet 變成複數 pets，固定用法 at home 一字不改，四個得分點全部到位。"
      },
      {
        "ok": false,
        "text": "She have three pet at home.",
        "note": "錯在兩處：have 要改 has；pet 要改 pets。中英文最大的差異就在這裡——英文的動詞與名詞都要跟著「單複數」走。"
      }
    ],
    "traps": [
      "看到 She / He / It 就要反射性把 have 換成 has。",
      "數詞大於一（two、three、four…）時，後面的可數名詞複數 -s 不能漏。",
      "at home 是固定用法，前面不加 in、to、at 裡的任何一個字。",
      "複數的 -s 加在名詞上，不是加在數詞上（不是 threes）。"
    ],
    "strategy": [
      "打字前先用括號在旁邊標註「She → has」「three → pets」，打完再刪掉標記。",
      "遇到數詞就自動檢查後面名詞有沒有 -s，形成肌肉記憶。",
      "把 has / have 寫成一組對照小卡，每天唸三遍主詞對應表。"
    ]
  },
  "These animals are endangered.": {
    "zh": "這些動物是瀕危的。",
    "ipa": "/ðiːz ˈænɪ.məlz ɑːr ɪnˈdaʒəd/",
    "headline": "These 配複數 are，endangered 是形容词不是動詞",
    "items": [
      {
        "point": "指示代名詞 + be 動詞一致",
        "ok": "These animals are",
        "bad": "These animal is ／ (X) This animals are",
        "why": "These 是複數指示代名詞，後面的名詞 animals 也要用複數，配上複數的 be 動詞 are。若改成「This animals are」，代名詞與名詞單複數打架，一樣是錯的。",
        "exam": "會考翻譯「這些動物…」時，These 與 are 是一個綁定組合；單選題常拿「(X) This animals are」當誘餌，測單複數一致性。"
      },
      {
        "point": "endangered 的詞性",
        "ok": "are endangered",
        "bad": "are dangerended ／ endangered（誤當動詞）",
        "why": "endangered 是「瀕危的」，是形容詞，後面接名詞時前面要加 be 動詞：「endangered animals」（瀕危的動物）。它不是「使…瀕危」的意思，danger 才會嚇人。學生常把它誤以為跟 danger 同義。",
        "exam": "會考字義題愛考 endangered（瀕危的）與 dangerous（危險的）差別：前者指數量稀少、快絕種，後者只是有危險性。"
      },
      {
        "point": "be 動詞後接形容詞",
        "ok": "are endangered（be + 形容詞）",
        "bad": "are endangering / are endangered by",
        "why": "這句是「這些動物是瀕危的」，結構是 be 動詞 + 形容詞，後面接原級片語。學生容易在後面亂加 by、to 之類的介詞，或誤用進行式「are endangering」（正在使…瀕危），語意完全跑掉。",
        "exam": "閱讀測驗裡的告示牌常寫「(O) This animal is endangered.」，考點就是「be 動詞 + 形容詞」這個固定結構。"
      },
      {
        "point": "單複數詞尾",
        "ok": "These animals",
        "bad": "These animal（複數漏 s）",
        "why": "中文「這些動物」聽起來像單數，英文卻一定要翻成複數：「These animals are」三個部分要一致。動物是可數名詞，數量大於一，複數 -s 不能省。",
        "exam": "翻譯題把「這些動物」誤寫成 these animal，會直接影響動詞要選 are 還是 is，是連動失分。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "These animals are endangered.",
        "note": "These（複數）＋ animals（複數）＋ are（複數）三者一致，be 動詞後接形容詞「endangered」，結構完整、字義正確。"
      },
      {
        "ok": false,
        "text": "These animals are dangerous.",
        "note": "dangerous 是「危險的」，意思變成「這些動物很危險」，和原句的「瀕危、快絕種」不同。考 endangered 與 dangerous 的差異時要特別小心。"
      }
    ],
    "traps": [
      "endangered（瀕危的）和 dangerous（危險的）只差三個字母，意思完全不同。",
      "These 一定要配 are 與複數名詞，三者缺一不可。",
      "be 動詞後面接形容詞，不要多加介詞或 to。",
      "zoo 告示常見「(O) This animal is endangered.」，單數配 is，不要一律加 s。"
    ],
    "strategy": [
      "背「endangered、dangerous、in danger」三組易混淆詞，寫在筆記本同一頁對照。",
      "看到 be 動詞就先預設後面接形容詞，再對照字典確認字義。",
      "練習時把單複數代名詞與 be 動詞綁在一起背：「This is…」「These are…」。"
    ]
  },
  "We should protect animals.": {
    "zh": "我們應該保護動物。",
    "ipa": "/wiː ʃʊd prəˈtekt ˈænɪ.məlz/",
    "headline": "should 後接動詞原形，protect 不加 er",
    "items": [
      {
        "point": "should + 動詞原形",
        "ok": "should protect",
        "bad": "should to protect ／ (X) should protects",
        "why": "should 是情態動詞（can、must、should…），後面一定要接動詞原形，而且中間不能加 to。中文的「應該去保護」很容易讓學生多寫一個 to，或受「動詞+s」習慣影響多寫 s。",
        "exam": "會考翻譯「我們應該…」常考 should 後面接原形；單選題的「(X) should to come」幾乎年年都出現，牢記這條規則就得分。"
      },
      {
        "point": "protect 的字形",
        "ok": "protect",
        "bad": "proctect ／ (X) protech ／ protector（誤加 er）",
        "why": "protect 是「保護」，是動詞原形。學生常誤以為它要變成「保護者」而加 -er（protector），或把 c、t 順序打反。protect 是及物動詞，後面直接接受詞 animals。",
        "exam": "閱讀題的標語「(O) Protect animals.」就是在考這個字；拼字題則直接考 c 與 t 的位置。"
      },
      {
        "point": "及物動詞與受詞",
        "ok": "protect animals",
        "bad": "We should protect.（漏掉受詞）",
        "why": "protect 是及物動詞，後面必須接受詞，這句的受詞就是 animals。若寫成「(X) We should protect.」，意思變成「我們應該保護（什麼？）」，語意不完整，會被扣分。",
        "exam": "翻譯題「保護動物」四個字，答案要完整包含受詞 animals，不能只寫 protect 就交差。"
      },
      {
        "point": "複數與單數的動物",
        "ok": "animals",
        "bad": "animal",
        "why": "動物是集合泛指、數量大於一，必須用複數 animals。protect 後面接的名詞要有 -s，這是本句最容易被忽略的一個字。",
        "exam": "會考常把 animals 漏 s 當作扣分點；寫完複數名詞請停下來複查一次。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "We should protect animals.",
        "note": "「should」立刻接動詞原形 protect，中間沒有 to；protect 是及物動詞，後面受詞 animals 完整，整句結構沒有缺角。"
      },
      {
        "ok": false,
        "text": "We should to protect animals.",
        "note": "should 是情態動詞，後面直接接 protect，絕對不能加 to。看到中文「應該去…」就把 to 一起翻過去，是最常見的中式英文錯誤。"
      }
    ],
    "traps": [
      "should / can / must / may 後面一律接動詞原形，中間不碰 to。",
      "情態動詞後面不要加 -s、-ing、-ed。",
      "protect 是及物動詞，後面受詞不能漏。",
      "animals 複數的 -s 要記得打出來。"
    ],
    "strategy": [
      "在腦中默念「情態動詞→原形」五步：should → (不加 to) → 原形動詞。",
      "把 protect、plant、help 這類「不需要加 er」的動詞貼在書桌前提醒自己。",
      "打完句子後反向檢查：每個 should 後面是不是都接原形。"
    ]
  },
  "Do not feed the animals.": {
    "zh": "不要餵食動物。",
    "ipa": "/duː nəʊt fiːd ðiː ˈænɪ.məlz/",
    "headline": "祈使句否定用 Do not，feed 是原形不加 s",
    "items": [
      {
        "point": "祈使句否定",
        "ok": "Do not feed（＋動詞原形）",
        "bad": "Does not feed the animals. ／ (X) Do not feeds the animals.",
        "why": "本句是祈使句，對「你」下命令，否定用「Do not + 動詞原形」，或縮寫成 Don't。絕對不能用 Does not，因為祈使句的主詞是 you，不是第三人稱。兩種寫法意思相同，會考都收。",
        "exam": "會考在「Do not」與「Does not」之間選答案，記得：主詞是 you 就選「Do not」，主詞是 he/she/it 才選「Does not」。"
      },
      {
        "point": "動詞原形不加 s",
        "ok": "feed the animals",
        "bad": "feeds the animals ／ (X) feeds the animal",
        "why": "「Do not」後面一定要接動詞原形 feed，不能加 -s。有些學生以為前面有 Do 所以還是要變第三人稱，結果寫成 feeds，這是最典型的錯誤。也常有人把 feed 誤打成 feal 或漏掉中間的 e。",
        "exam": "單選題若選項分別是「(X) feeds the animals.」與「(O) feed the animals.」，答案一定後者；主詞是 you，動詞不做變化。"
      },
      {
        "point": "定冠詞 the + 複數名詞",
        "ok": "the animals",
        "bad": "animals（漏 the）",
        "why": "這裡 the 是定冠詞，表示「那些（特定的）動物」，特指大家心知肚意的那群動物，前面沒有指示代詞或名詞接續時不能省略。注意 animals 仍要複數，the 與 -s 兩者都要有。",
        "exam": "泛指時寫 animals，但「不要餵食動物」這種告示語境通常要 the，寫錯會被判與標準答案不符。"
      },
      {
        "point": "feed 與 food",
        "ok": "feed（動詞，餵食）",
        "bad": "food the animals",
        "why": "feed 是「餵」這個動作，是動詞；food 是「食物」，是名詞。學生常因中文都用「餵」而把兩者搞混。動詞要用 feed，名詞要用 food，例如「(O) Give the animals some food.」。",
        "exam": "字義題或翻譯題出現「(O) Give them food.」與「(O) Feed them.」的差別，會考 feed 是動作、food 是東西。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "Do not feed the animals.",
        "note": "標準的告示祈使句否定：「Do not + 動詞原形 feed」，後面接「the animals」。改用縮寫「Don't」也可以，兩種都正確。"
      },
      {
        "ok": false,
        "text": "Do not feeds the animals.",
        "note": "「Do not」後面必須接動詞原形 feed，不能加 -s。看到第三人稱規則就自動加 s，是祈使句裡最常見的誤用。"
      }
    ],
    "traps": [
      "祈使句主詞是 you，否定用 Do not 或 Don't，不是 Does not。",
      "Do / Does 後面的動詞一律用原形，不加 s、不加 -ing。",
      "feed（餵，動詞）與 food（食物，名詞）不要搞混。",
      "the animals 的 the 與 animals 的 -s，兩個都不能漏。"
    ],
    "strategy": [
      "背一組否定對照表：You do not…／He does not…，搭配原形動詞一起唸。",
      "看到 Do not 就反射性在腦中補上「原形」兩個字。",
      "練習時把 feed / food 寫成相鄰兩欄，每天複習一次。"
    ]
  },
  "The zoo is closed every Monday.": {
    "zh": "動物園每週一休館。",
    "ipa": "/ðə zuː ɪz kləʊzd ˈevri ˈmʌndeɪ/",
    "headline": "is closed 是狀態不是進行式，every 後接單數",
    "items": [
      {
        "point": "be 動詞 + 過去分詞（狀態）",
        "ok": "is closed",
        "bad": "is closing / is close",
        "why": "closed 在這裡是形容词，表達「休館」這個持續狀態，所以用 be 動詞 is。千萬不要寫成 is closing（正在關門），意思變成「正在進行關閉的動作」，和告示語意不符。",
        "exam": "會考閱讀的告示牌、課堂公告常出現 is closed，測的就是 be + 過去分詞表狀態的概念。"
      },
      {
        "point": "定冠詞 the + 特定場所",
        "ok": "The zoo",
        "bad": "Zoo / A zoo",
        "why": "前面已經提過的、特定的那個動物園要用定冠詞 the。如果是指第一次提到、泛指一個動物園，才用 a zoo。中文省略冠詞，英文卻不能省。",
        "exam": "閱讀測驗的告示標題常寫 The zoo is closed…，考的就是定冠詞 the 的使用。"
      },
      {
        "point": "every + 單數名詞",
        "ok": "every Monday",
        "bad": "every Mondays",
        "why": "every 本身就含有「每一個」的意思，後面必須接單數名詞 Monday。不能寫成 every Mondays，也不需要 every day 這種搭配。每週一就是 every Monday。",
        "exam": "翻譯「每週一…」固定是 every Monday；三單與複數的判斷在這裡直接適用。"
      },
      {
        "point": "星期一的大小寫",
        "ok": "Monday（每星期一）",
        "bad": "monday / every monday（每星期一）",
        "why": "星期的專有名詞一定要大寫開頭：Monday、Friday、Sunday…。台灣學生常寫成小寫 monday，尤其在輸入時大小寫容易漏打，是很常見的低級失分。",
        "exam": "打字題與翻譯題都會算大小寫，小寫 monday 可能直接算錯，建議打完整句後專門檢查一次。"
      }
    ],
    "examples": [
      {
        "ok": true,
        "text": "The zoo is closed every Monday.",
        "note": "The zoo 是特定場所配 the，is closed 用 be + 過去分詞表狀態，every Monday 裡 Monday 大寫且用單數，每個得分點都正確。"
      },
      {
        "ok": false,
        "text": "The zoo is closing every Mondays.",
        "note": "兩處錯誤：is closed（休館狀態）不能寫成 is closing（正在關門）；every 後面的 Monday 是單數，不能加 s。"
      }
    ],
    "traps": [
      "be + 過去分詞（is closed）是狀態；is + 進行式（is closing）是動作，別搞混。",
      "every 後面接單數名詞，不能加 -s。",
      "星期的專有名詞一定要大寫開頭：Monday、Friday、Sunday。",
      "特定場所用 the（The zoo），泛指才用 a（a zoo）。"
    ],
    "strategy": [
      "把 closed / closing 兩個字並排寫，標上「狀態 vs 動作」，考試前看一分鐘。",
      "練習時每句打完都檢查兩件事：星期的字首大寫了嗎？every 後面是單數嗎？",
      "記住 be + 過去分詞這個公式，延伸到 is closed、is banned、is finished。"
    ]
  }
};
