// data/analysis.js — 「解析這一句」的深度解析庫（所有裝置共用）
//
// key 必須和句庫 data/sentences.js 裡的英文「完全一致」（含標點、單複數、大小寫）
//
// 每筆的格式：
//   {
//     zh / ipa / headline          : 基本資訊
//     structure : [ { role, token, pos, func, mark } ]
//                  一、句子結構與詞性對照表：每個單字／片語一列
//     mistakes  : [ { title, bad, ok, why, exOkText, exOkZh, exBadText, exBadNote } ]
//                  二、學生常犯常見錯誤版本與解析（每句 4 個錯誤類型）
//     traps     : [ ... ]          三、國中教育會考陷阱提醒
//     strategy  : [ ... ]          四、會考實戰建議
//   }
//
// 撰寫規則：
//   1. 所有英文句子的開頭都要有 (O) 正確 或 (X) 錯誤標記；App 會自動上色。
//   2. 例句中想強調的重點片語，用 Markdown 的 **雙星號** 包起來。
//   3. 句庫裡沒有對應 key 的句子，App 會改用自動產生的自我檢查提示。

window.SENTENCE_ANALYSIS = {
  "This": {
    "zh": "這",
    "ipa": "/ðɪs/",
    "headline": "指示代名詞 this：離你近、而且只有一個的那個",
    "structure": [
      {
        "role": "指示代名詞（主詞）",
        "token": "This",
        "pos": "指示代名詞 (Demonstrative Pronoun)",
        "func": "單獨使用、單獨當主詞時，this 指「離說話者較近的那一個（單數）」，例如指著眼前的東西說 this",
        "mark": "O"
      },
      {
        "role": "指示代名詞（受詞）",
        "token": "this",
        "pos": "指示代名詞 (Demonstrative Pronoun)",
        "func": "放在動詞或介系詞後面時改當受詞，意思不變，例如 I like this.；它和 that（那個）正好是近與遠的對比",
        "mark": "O"
      },
      {
        "role": "指示詞用法（後接名詞）",
        "token": "this + 名詞",
        "pos": "指示詞 (Demonstrative Determiner)",
        "func": "後面接單數名詞時，this 不再單獨當主詞，而是修飾名詞，例如 this book、this school；後面的名詞一定要是單數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "大小寫錯誤：把 this 當成專有名詞",
        "bad": "(X) This is my desk. Put **This** on the chair.",
        "ok": "(O) This is my desk. Put **this** on the chair.",
        "why": "this 只是普通的指示代名詞，不是專有名詞。英文只有句子的第一個字（或專有名詞）要大寫，句子中間出現的 this 不論在句首、句中或句尾都必須小寫。台灣學生常因為中文沒有大小寫差別，或覺得「這個東西」像人名一樣特別，就把句中的 this 寫成 This，在會考答案卡上會直接被判錯。記法：整句只有開頭那個字有資格大寫。",
        "exOkText": "(O) **This** is my dictionary. Please give **this** to Tom.",
        "exOkZh": "這是我的字典。請把這個交給湯姆。",
        "exBadText": "(X) **This** is my dictionary. Please give **This** to Tom.",
        "exBadNote": "錯誤：this 不是專有名詞，句子中間必須寫小寫 this"
      },
      {
        "title": "this 與 it 混淆（中翻英最常見）",
        "bad": "(X) I bought **this** yesterday at the bookstore.",
        "ok": "(O) I bought **it** yesterday at the bookstore.",
        "why": "中文「這」只有一個字，英文卻要分成 this 和 it：this 指離說話者近、看得見的單數東西；it 指對話中已知、但已經不在眼前的東西，或用在非特定的受詞。台灣學生最常見的毛病就是看到中文「這」就一律翻成 this，寫出 I bought this yesterday. 這種中文式英文。判斷法：問自己「對方看得到嗎？」看不到就用 it。",
        "exOkText": "(O) **This** cake is great. I ate **it** at the party yesterday.",
        "exOkZh": "這個蛋糕很好吃。我昨天在派對上把它吃掉了。",
        "exBadText": "(X) **This** cake is great. I ate **this** at the party yesterday.",
        "exBadNote": "錯誤：已經不在眼前的受詞要用 it，不能用 this"
      },
      {
        "title": "單複數混淆：this 與 these 搞混",
        "bad": "(X) **This** are my books.",
        "ok": "(O) **These** are my books.",
        "why": "this 是單數，these 是複數；that 是單數、those 也是複數。指眼前的兩本書一定要用 these，不能用 this 頂替，否則主詞變單數，後面的 be 動詞也會跟著錯（This are…）。台灣學生常因中文沒有 this／these 的數量差別，在指複數物品時直接用 this。口訣：一個用 this，一個以上用 these。",
        "exOkText": "(O) **These** are my new friends from Grade 7.",
        "exOkZh": "這些是我七年級的新朋友。",
        "exBadText": "(X) **This** are my new friends from Grade 7.",
        "exBadNote": "錯誤：指複數朋友要用 These，且後面 are 要一併改成 are"
      },
      {
        "title": "省略 be 動詞（中翻英時把動詞漏掉）",
        "bad": "(X) **This** my school.",
        "ok": "(O) **This is** my school.",
        "why": "英文的句子一定要有動詞，this 單獨使用時不能直接接名詞或形容詞。中文說「這本書」就結束，英文卻必須補上 be 動詞：This is my book.、This is a good idea.。台灣學生中翻英時常把 be 動詞省掉，寫成 This my book.，整句沒有動詞。記法：this 前面若沒有動詞，後面一定要用 is。",
        "exOkText": "(O) **This is** a good idea for our class trip.",
        "exOkZh": "這是我們班級旅行的好主意。",
        "exBadText": "(X) **This** a good idea for our class trip.",
        "exBadNote": "錯誤：缺 be 動詞，應為 This is a good idea…"
      }
    ],
    "traps": [
      "近指與遠指的對比陷阱：this／these 指離說話者近、看得到的人事物；that／those 指較遠或不在眼前的。會考圖文題與對話題會故意問 this 指的是哪一個，要看圖或讀情境再作答。",
      "單複數指示詞陷阱：this／that 只能指單數，these／those 才是複數。題目一旦把 this 換成 these，後面的 be 動詞和實質動詞都要跟著改成複數形式。",
      "拼寫與位置陷阱：this 的 s 不能漏（寫成 thi 錯），th 是 this／that 專用、the 才是定冠詞；this 後面接名詞時，那個名詞必須是單數。"
    ],
    "strategy": [
      "指東西時先做分類：單數還是複數？近的還是遠的？單數近 → this，複數近 → these，單數遠 → that，複數遠 → those。",
      "看到 this 後面直接接名詞，就檢查兩件事：名詞是單數嗎？前面還有沒有再加 a／the／my？",
      "翻譯時把中文的「這」拆成三層：眼前的（this）、對話中已知的（it）、泛指的（one 或省略），不要全部翻成 this。",
      "朗讀練習：This is my seat.／I like this one.／These are my friends.，把 this 的單數感與 these 的複數感記在耳朵裡。"
    ]
  },
  "This is": {
    "zh": "這是",
    "ipa": "/ðɪs ɪz/",
    "headline": "最小的判斷句型：主詞 this 加 be 動詞 is",
    "structure": [
      {
        "role": "主詞",
        "token": "This",
        "pos": "指示代名詞 (Demonstrative Pronoun)",
        "func": "單獨當主詞，指離說話者較近的那一個（單數）東西",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "單數主詞專用的 be 動詞，緊接在主詞後面，後面接名詞或名詞片語（This is my bag.）",
        "mark": "O"
      },
      {
        "role": "系動詞片語",
        "token": "This is",
        "pos": "主詞 + be 動詞 (Subject + Linking Verb)",
        "func": "英文最小的判斷句型，用來指認眼前的東西，後面絕對不能空著，一定要接東西",
        "mark": "O"
      },
      {
        "role": "縮寫限制",
        "token": "This is（不縮寫）",
        "pos": "書寫規則 (Writing Rule)",
        "func": "this is 不能寫成 This's；正式書寫、會考作答與打字練習都要完整寫出兩個字",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "縮寫誤用：寫成 This's",
        "bad": "(X) **This's** my new bag.",
        "ok": "(O) **This is** my new bag.",
        "why": "this is 沒有縮寫成 This's 的用法。英文縮寫只針對 be 動詞或助動詞本身，指示代名詞加上 be 動詞必須完整寫出。台灣學生常看到 Good morning's 這類寫法就照樣類推，寫出 This's my bag.，在會考作文與改錯題都算錯。記法：看到 this，後面一律把 is 完整寫出來，句子短也不縮寫。",
        "exOkText": "(O) **This is** the answer to the question.",
        "exOkZh": "這就是那個問題的答案。",
        "exBadText": "(X) **This's** the answer to the question.",
        "exBadNote": "錯誤：this is 不可縮寫成 This's"
      },
      {
        "title": "be 動詞與主詞單複數不一致（is / are）",
        "bad": "(X) These **is** my new classmate.",
        "ok": "(O) These **are** my new classmates.",
        "why": "be 動詞要跟著主詞變化：單數主詞用 is，複數主詞用 are。this 是單數所以配 is；一旦主詞換成 these（複數），is 就必須改成 are。台灣學生常受中文「這些都是……」的影響，主詞已經變成複數卻仍然用 is。檢查法：寫完句子先把主詞圈起來，看它是 this 還是 these，再決定用 is 還是 are。",
        "exOkText": "(O) **These are** the books I borrowed from the library.",
        "exOkZh": "這些是我從圖書館借的書。",
        "exBadText": "(X) **These is** the books I borrowed from the library.",
        "exBadNote": "錯誤：主詞 these 是複數，be 動詞應為 are"
      },
      {
        "title": "冠詞／所有格與 this 疊加使用",
        "bad": "(X) **This is a my** school bag.",
        "ok": "(O) **This is my** school bag.",
        "why": "this 後面接名詞時，a、an、the、my 這類詞只能擇一使用，不能疊加。正確寫法是 This is my school bag. 或 This is the school bag.；台灣學生常寫成 This is a my school bag.，把兩個指示系統一起用，句子就多出一個多餘的詞。口訣：前面已經有 this，後面就不用再加一次冠詞或所有格。",
        "exOkText": "(O) **This is the** library near my home.",
        "exOkZh": "這就是我家附近的圖書館。",
        "exBadText": "(X) **This is a the** library near my home.",
        "exBadNote": "錯誤：this 與 the／a 不能同時使用，擇一即可"
      },
      {
        "title": "問句語序錯誤（把 is 留在原位）",
        "bad": "(X) **This is** your school bag?",
        "ok": "(O) **Is this** your school bag?",
        "why": "This is … 是陳述句（直述句）；問句必須把 be 動詞提到句首。問「這是你的書包嗎？」英文是 Is this your bag?，不是 This is your bag?。台灣學生受中文「這是你書包嗎？」的語序影響，習慣把 is 留在原位，整句變成陳述句再加問號，會考選擇題常因此選錯。口訣：問句開頭是 Is／Are／Do／Did，不會是 This。",
        "exOkText": "(O) **Is this** the right bus stop?",
        "exOkZh": "這是正確的公車站嗎？",
        "exBadText": "(X) **This is** the right bus stop?",
        "exBadNote": "錯誤：問句要把 is 提到句首，寫成 Is this…?"
      }
    ],
    "traps": [
      "be 動詞呼應陷阱：this → is，these → are。題目故意把主詞從 this 換成 these 時，is 一定要跟著改成 are，只換一半的選項就是陷阱。",
      "縮寫陷阱：this is 不能縮寫成 This's。會考常出現 This's a good idea. 當錯誤選項，正確選項永遠是完整寫出的 this is。",
      "問句語序陷阱：會考把 This is your bag?（錯）與 Is this your bag?（對）並列，答案差別只在 is 有沒有被搬到句首。"
    ],
    "strategy": [
      "記住這是「主詞 + be 動詞」的最小句型，後面缺東西時要自己補上名詞：This is + 名詞／名詞片語。",
      "寫完做兩次檢查：① 這句有沒有 be 動詞（is）？② be 動詞跟主詞的單複數一致嗎？",
      "問句練習：把 This is my seat. 改寫成 Is this my seat?，習慣讓 is 站到最前面。",
      "朗讀完整句子五次：This is my new school.／This is a good idea.，建立口語節奏與單複數語感。"
    ]
  },
  "not planned": {
    "zh": "未預先計劃的",
    "ipa": "/nɑːt plænd/",
    "headline": "否定詞 not 加過去分詞 planned：沒有被事先安排",
    "structure": [
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定副詞 (Negative Adverb)",
        "func": "放在 be 動詞或助動詞後面（或一般動詞前）表示否定，擺在 planned 前面否定整個片語",
        "mark": "O"
      },
      {
        "role": "過去分詞（表語）",
        "token": "planned",
        "pos": "動詞過去分詞 (Past Participle) — 此處作形容詞",
        "func": "plan 加 -ed，擺在 be 動詞後面當表語，含「被……安排的」意思，強調事情本身沒有事先安排",
        "mark": "O"
      },
      {
        "role": "否定片語",
        "token": "not planned",
        "pos": "否定詞 + 過去分詞 (Negative Participle Phrase)",
        "func": "整個片語只能修飾名詞或放在 be 動詞後面當表語，不能自己當主要動詞用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "否定詞 not 的位置放錯",
        "bad": "(X) The trip is planned **not**.",
        "ok": "(O) The trip is **not planned**.",
        "why": "not 是否定詞，位置要放對：必須緊接在 be 動詞或助動詞後面（is not、did not），或放在一般動詞前面（do not plan）。所以「沒有被計劃」要寫 is not planned，不能寫 planned not 或 not is planned。台灣學生常把中文「不」的位置直接搬過去。檢查法：先找 be 動詞，not 一定在它後面。",
        "exOkText": "(O) The school trip is **not planned** yet.",
        "exOkZh": "學校畢業旅行還沒有安排好。",
        "exBadText": "(X) The school trip is planned **not** yet.",
        "exBadNote": "錯誤：not 要緊接在 is 後面，寫成 is not planned"
      },
      {
        "title": "漏加過去分詞字尾 -ed",
        "bad": "(X) The activity is not **plan**.",
        "ok": "(O) The activity is not **planned**.",
        "why": "not 後面接過去分詞 planned（plan 加 -ed），表示「某件事沒有被事先安排」。只寫 not plan 就變成「沒有打算」，意思完全跑掉。台灣學生常把 plan、planned、planning 三個形狀混用，短篇填空裡尤其容易漏寫 -ed。口訣：be 動詞後接過去分詞，plan 的過去分詞是 planned，讀音 /plænd/。",
        "exOkText": "(O) The party was not **planned** in advance.",
        "exOkZh": "這場派對不是事先安排好的。",
        "exBadText": "(X) The party was not **plan** in advance.",
        "exBadNote": "錯誤：漏了過去分詞字尾 -ed，應為 planned"
      },
      {
        "title": "把過去分詞誤當主要動詞用",
        "bad": "(X) They **not planned** the trip last week.",
        "ok": "(O) They **did not plan** the trip last week.",
        "why": "planned 是過去分詞，本身不能單獨當主要動詞。否定某個人「沒有計畫」要用原形，前面加助動詞：They did not plan the trip.。台灣學生常寫成 They not planned the trip.，這句既沒有助動詞也沒有原形動詞，結構不完整。判斷法：有 be 動詞就接分詞，沒有就接原形並加 did／will。",
        "exOkText": "(O) We **did not plan** to go to the museum.",
        "exOkZh": "我們沒有計畫要去博物館。",
        "exBadText": "(X) We **not planned** to go to the museum.",
        "exBadNote": "錯誤：分詞不能當主要動詞，要改為 did not plan"
      },
      {
        "title": "主動與被動的語意混淆（not planned / not planning）",
        "bad": "(X) I am not **planning** to go, so the trip is not **planned**.",
        "ok": "(O) The trip is not **planned** by us yet.",
        "why": "not planned 是被動用法，強調「事情本身沒有被安排」；not planning 是主動用法，強調「人沒有在計畫」。兩者主詞不同：This is not planned.（這件事沒被安排）／I am not planning to go.（我沒打算要去）。台灣學生常把兩者互換，閱讀測驗就會誤判誰是動作執行者。",
        "exOkText": "(O) The camping trip is not **planned**, so we must change the date.",
        "exOkZh": "露營行程還沒安排好，所以我們必須改日期。",
        "exBadText": "(X) I am not **planned** to go on the camping trip.",
        "exBadNote": "錯誤：人不能用 planned 當主動，要寫 I am not planning to go"
      }
    ],
    "traps": [
      "否定位置陷阱：not 一定在 be 動詞或助動詞之後。選項中出現 planned not 這種位置，不用讀完就知道是錯的。",
      "分詞字尾陷阱：not 後面接過去分詞 planned（-ed），不是原形 plan。會考短篇填空常在這個字尾上挖空。",
      "主動與被動陷阱：planned 是被動的（事情沒有被安排），換成 planning 就變成主動（人沒有在計畫），閱讀測驗常考這組差異。"
    ],
    "strategy": [
      "記住公式：be 動詞 + not + 過去分詞（is not planned、was not planned、isn't planned）。",
      "看到 plan 立刻分三個形：plan（原形）／planned（過去分詞，be 動詞後用）／planning（現在分詞，be 動詞後表進行式）。",
      "寫句子時先確定有沒有 be 動詞：有 → 後面接分詞；沒有 → 改用原形加助動詞（They did not plan…）。",
      "朗讀 This is not planned. 與 They did not plan it. 各三遍，用耳朵分辨「沒有被安排」和「沒有去安排」的差別。"
    ]
  },
  "This is not planned": {
    "zh": "這不是預先計劃好的",
    "ipa": "/ðɪs ɪz nɑːt plænd/",
    "headline": "主詞 + be 動詞 + not + 過去分詞，四段語序不能調換",
    "structure": [
      {
        "role": "主詞",
        "token": "This",
        "pos": "指示代名詞 (Demonstrative Pronoun)",
        "func": "單獨當主詞，指正在談的那一件事（單數），放在句首要大寫",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "單數主詞專用的 be 動詞，連接主詞與後面的表語，不能省略",
        "mark": "O"
      },
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定副詞 (Negative Adverb)",
        "func": "緊接在 be 動詞 is 的後面，否定整個句子，位置不能移動",
        "mark": "O"
      },
      {
        "role": "過去分詞（表語）",
        "token": "planned",
        "pos": "動詞過去分詞 (Past Participle) — 此處作表語",
        "func": "plan 加 -ed，放在 be 動詞後面當表語，表示「（某件事）被事先安排的」",
        "mark": "O"
      },
      {
        "role": "整句結構",
        "token": "This is not planned",
        "pos": "否定系動詞句 (Negative Linking-verb Sentence)",
        "func": "主詞 + be 動詞 + not + 過去分詞，四個部分缺一不可，語序不可調換",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "否定詞 not 的語序錯誤（丟到句尾）",
        "bad": "(X) This is planned **not**.",
        "ok": "(O) This is **not planned**.",
        "why": "否定句的固定語序是「主詞 + be 動詞 + not + 其他」，not 一定要緊跟在 is 後面。This is not planned. 才是正確順序；寫成 This is planned not. 等於把 not 丟到句尾，讀起來像被拆開的補語，會考作文、選詞題與改錯題都算錯。口訣：不管中文的「不」說在哪裡，英文的 not 一律跟在 be 動詞後面。",
        "exOkText": "(O) The surprise party for Tom **is not planned**.",
        "exOkZh": "給湯姆的驚喜派對還沒安排好。",
        "exBadText": "(X) The surprise party for Tom **is planned not**.",
        "exBadNote": "錯誤：not 必須緊接在 is 後面，寫成 is not planned"
      },
      {
        "title": "省略 be 動詞（整句沒有動詞）",
        "bad": "(X) This **not planned**.",
        "ok": "(O) This **is not planned**.",
        "why": "英文系動詞句不能省略 be 動詞。This is not planned. 中的 is 必須留著，因為它連接主詞 this 與後面的分詞 planned。台灣學生有兩種省略：一是把 is 省掉寫成 This not planned.；二是受中文影響，把 not planned 當成完整句。判斷法：this 後面接分詞，中間一定要有 is 或 was。",
        "exOkText": "(O) This **is not planned** for Friday afternoon.",
        "exOkZh": "這件事還沒有安排在星期五下午。",
        "exBadText": "(X) This **not planned** for Friday afternoon.",
        "exBadNote": "錯誤：缺 be 動詞，應為 This is not planned…"
      },
      {
        "title": "過去分詞形式與拼寫錯誤",
        "bad": "(X) This is not **planed**.",
        "ok": "(O) This is not **planned**.",
        "why": "not 後面一定要用過去分詞 planned，而 planned 的拼字是 plan 加 -ed，不能寫成 plan，也不能寫成 planed。plan 本身以 n 結尾，加 -ed 時 n 不重複，字母一錯整個詞就不存在了。這類錯誤在會考單字題、克漏字測驗與打字練習都常出現。記法：plan 加 -ed 只加一個 d，讀音 /plænd/，尾音是 /nd/。",
        "exOkText": "(O) The new library is not **planned** to open this year.",
        "exOkZh": "新圖書館今年不預計完工。",
        "exBadText": "(X) The new library is not **planed** to open this year.",
        "exBadNote": "錯誤：拼字錯誤，plan 加 -ed 不重複 n，應為 planned"
      },
      {
        "title": "否定 be 動詞誤用 don't",
        "bad": "(X) This don't planned.",
        "ok": "(O) This **is not** planned.",
        "why": "否定 be 動詞時要用 is not，不能用 don't。don't 是用來否定實質動詞的：This isn't planned. 才是正確；寫成 This don't planned. 同時犯了兩個錯——don't 不能否定 be 動詞，而且 don't 後面接的是原形動詞。口訣：句子裡有 is，否定就找 not；看到 is 就不找 don't。",
        "exOkText": "(O) The exchange activity **is not planned** yet.",
        "exOkZh": "交流活動還沒有安排。",
        "exBadText": "(X) The exchange activity **don't planned** yet.",
        "exBadNote": "錯誤：否定 be 動詞要用 is not，don't 後面也不能接分詞"
      }
    ],
    "traps": [
      "否定語序陷阱：not 必須緊跟 is。選項中 This is planned not. 一定是錯的，考試常把這句當成干擾項。",
      "be 動詞省略陷阱：中文可以說「這沒計劃」，英文不能省掉 is。This not planned. 沒有動詞，一讀就知道錯。",
      "否定方式陷阱：否定 be 動詞用 is not，寫成 This don't planned. 會同時錯在否定方式與動詞形式，兩個錯誤疊在一起。"
    ],
    "strategy": [
      "套公式：This／That（主詞，單數）+ is（be 動詞）+ not（否定）+ planned（過去分詞）。",
      "寫完照順序唸一遍：主詞 → be 動詞 → not → 分詞，任何一環缺了就回去補。",
      "特別練一次 is not 與 isn't 的差別：正式書寫用 is not，兩者意思完全相同，寫錯字形最容易被扣分。",
      "用中文對照檢查：中文說「這不是預先計劃好的」時，英文的 not 一定要卡在 is 後面、planned 前面。"
    ]
  },
  "Oh no, this is not planned": {
    "zh": "噢不，這完全不在計劃中",
    "ipa": "/əʊ nəʊ, ðɪs ɪz nɑːt plænd/",
    "headline": "感嘆語 Oh no 先開口，逗號後 this 要大寫",
    "structure": [
      {
        "role": "感嘆語",
        "token": "Oh no",
        "pos": "感嘆語 (Interjection)",
        "func": "表示自己突然發現壞消息時的驚訝與沮喪，是一個片語，中間有空格",
        "mark": "O"
      },
      {
        "role": "標點",
        "token": ",",
        "pos": "標點 (Punctuation)",
        "func": "逗號把感嘆語和後面的主詞句分開，逗號後的第一個字 this 必須大寫成 This",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "this",
        "pos": "指示代名詞 (Demonstrative Pronoun)",
        "func": "指代前面正在談的那件事（單數），放在 be 動詞前當主詞",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "單數主詞專用的 be 動詞，連接主詞與後面的表語，不可省略",
        "mark": "O"
      },
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定副詞 (Negative Adverb)",
        "func": "緊接在 is 後面，否定整件事「不在計畫中」",
        "mark": "O"
      },
      {
        "role": "過去分詞（表語）",
        "token": "planned",
        "pos": "動詞過去分詞 (Past Participle)",
        "func": "plan 加 -ed，擺在 be 動詞後當表語，表示「被事先安排好的」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "感嘆語使用場合錯誤（把 Oh no 當問候語）",
        "bad": "(X) **Hello no**, this is not planned.",
        "ok": "(O) **Oh no**, this is not planned.",
        "why": "Oh no 是感嘆語，只用在自己突然發現壞消息、意外或沮喪的瞬間，例如發現考卷拿錯、活動臨時取消。打招呼、問候、呼喚對方都不能用 Oh no，應該用 Hello、Hi。台灣學生常把 Oh 當成萬用的「啊」，在句子開頭亂加，形成不倫不類的句子。判斷法：這句是在「打招呼」，還是在「聽到壞消息」？",
        "exOkText": "(O) **Oh no!** I left my English notebook at home.",
        "exOkZh": "噢不！我把英文筆記本落在家裡了。",
        "exBadText": "(X) **Hello no!** I left my English notebook at home.",
        "exBadNote": "錯誤：Oh no 是感嘆語，不能當問候語使用"
      },
      {
        "title": "No 與 Oh no 的功能差異",
        "bad": "(X) **No**, this is not planned.",
        "ok": "(O) **Oh no**, this is not planned.",
        "why": "No 與 Oh no 的功能不同：No 開頭是「不對／不是那樣」，用來反對或否定別人剛說的話；Oh no 是「啊不好了」，用來表達自己發現壞消息的感嘆，兩者不能互換。所以想說「噢不，這件事沒被安排」時要用 Oh no；只寫 No, this is not planned. 會讓讀者以為你在反駁對方的說法。會考情境題常考這個差別。",
        "exOkText": "(O) **Oh no**, we can't join the baseball game tomorrow.",
        "exOkZh": "噢不，我們明天沒辦法參加棒球比賽。",
        "exBadText": "(X) **No**, we can't join the baseball game tomorrow.",
        "exBadNote": "錯誤：這是感嘆的壞消息，不是反駁別人，應寫 Oh no"
      },
      {
        "title": "逗號後的 this 忘記大寫",
        "bad": "(X) Oh no, **this** is not planned.",
        "ok": "(O) Oh no, **This** is not planned.",
        "why": "逗號代表前面的句子結束了，後面新子句的第一個字一定要大寫。Oh no 後面加了逗號，後面的 this 就是新子句的開頭，必須寫成 This。台灣學生常忘記這個規則，寫出 Oh no, this is not planned.，看起來像是一個字不小心拼錯。口訣：只要看到逗號，就檢查逗號後面那個字的字首有沒有大寫。",
        "exOkText": "(O) **Oh no, This** is not what I expected at all.",
        "exOkZh": "噢不，這完全不是我預期的。",
        "exBadText": "(X) **Oh no, this** is not what I expected at all.",
        "exBadNote": "錯誤：逗號後是新的子句，this 的字首必須大寫成 This"
      },
      {
        "title": "語意理解錯誤：not 否定的是哪一個字",
        "bad": "(X) Oh no, this is not planned.（誤讀成：這個人沒有計畫）",
        "ok": "(O) Oh no, this is not planned.（讀成：這件事不在計畫中）",
        "why": "閱讀測驗中 this is not planned 的重點是「這件事事先沒有被安排」，not 否定的是 planned 這個過去分詞，不是 is，也不是某個人。台灣學生常誤讀成「這個人沒有計畫」或「這件事以後也不會被安排」，於是把句子的主體抓錯。作者想強調的是「一切都不在計畫中」。作答前先圈出 not，再看它否定的是哪一個字。",
        "exOkText": "(O) Oh no, this is not planned. We need another way.",
        "exOkZh": "噢不，這件事不在計畫中。我們需要另一個方法。",
        "exBadText": "(X) Oh no, this is not planned.（誤讀：這件事以後也不會被安排）",
        "exBadNote": "錯誤：not 否定的是「事先被安排」，不是「以後會不會安排」"
      }
    ],
    "traps": [
      "感嘆語陷阱：Oh no 只在自己聽到壞消息時出現，問候語一定是 Hello／Hi；把兩者混用是會考最常見的語氣誤判。",
      "標點陷阱：Oh no 後面要加逗號，逗號後面的 this 要大寫成 This，標點與大小寫兩個檢查缺一不可。",
      "閱讀陷阱：No 和 Oh no 意思不同；this is not planned 談的是「這件事不在計畫中」，不是「某個人沒有計畫」，抓錯主體就會答錯題。"
    ],
    "strategy": [
      "先判斷語氣：自己在感嘆壞消息 → 用 Oh no；否定或反駁對方的話 → 用 No。",
      "寫完含 Oh no 的句子，做標點檢查：逗號有了嗎？逗號後的第一個字大寫了嗎？",
      "看到 this is not planned 就畫箭頭指向前面談的那件事，提醒自己它指「這件事」而不是「這個人」。",
      "完整朗讀：Oh no, this is not planned.，用唸的語氣感受 Oh no 的驚訝，再確認 Oh no 後面有逗號、This 有大寫。"
    ]
  },
  "Mr. President": {
    "zh": "總統先生",
    "ipa": "/ˈmɪstər ˈprezɪdənt/",
    "headline": "稱謂 + 職稱：Mr. 不能省，President 要大寫當專有名詞",
    "structure": [
      {
        "role": "敬稱/稱謂",
        "token": "Mr.",
        "pos": "稱謂 (Title) — Mister 的縮寫",
        "func": "對男性的尊稱，必須接在姓氏或職稱前面，Mr. 後面的句點是英文標點規則的一部分，不能漏寫",
        "mark": "O"
      },
      {
        "role": "職稱",
        "token": "President",
        "pos": "專有名詞 (Proper Noun) — 總統",
        "func": "表示對方的職位，是 Mr. 所指的對象；指特定國家的元首時屬於專有名詞，開頭必須大寫",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "專有名詞大小寫錯誤（president 沒大寫）",
        "bad": "(X) Good morning, Mr. president. ／ (X) MR. PRESIDENT",
        "ok": "(O) Good morning, Mr. President.",
        "why": "President 在這裡不是一般名詞，而是「某一國元首」的職稱，性質接近專有名詞，開頭一定要大寫。中文的「總統」沒有大小寫的問題，學生最容易在打字時直接照著中文語感的首字大寫規則處理，結果把整個片語寫成 mr. president 或全部大寫的 MR. PRESIDENT。判斷法：前面有 Mr. 這種敬稱，後面就是對特定的人的稱呼，屬於專有名詞範圍。",
        "exOkText": "(O) **Mr. President**, thank you for your time.",
        "exOkZh": "總統先生，感謝您撥空。",
        "exBadText": "(X) **Mr. president**, thank you for your time.",
        "exBadNote": "錯誤：職稱 President 是專有名詞，開頭要大寫"
      },
      {
        "title": "稱謂與職稱順序顛倒（中式直譯）",
        "bad": "(X) President Mr. Wang ／ (X) Mr. President of Mr. Wang",
        "ok": "(O) Mr. President ／ (O) President Wang",
        "why": "中文「總統先生」由前到後是「職稱＋先生」，學生容易照著中文順序直譯成 President Mr. Wang。英文的規則剛好相反：稱謂 Mr. 一定在最前面，接著才是職稱或姓氏。稱謂只能出現一次，Mr. President 與 President Wang 兩種都正確，但不能把 Mr. 擠到職稱後面，也不能中間插入 of。",
        "exOkText": "(O) **Mr. President** and **President Wang** both spoke today.",
        "exOkZh": "總統先生和王總統今天都發言了。",
        "exBadText": "(X) **President Mr. Wang** spoke today.",
        "exBadNote": "錯誤：稱謂 Mr. 必須在職稱前面，順序不能照中文直譯"
      },
      {
        "title": "稱謂選用錯誤（不分男女都用 Mr.）",
        "bad": "(X) Excuse me, Mr. White, is this seat yours?",
        "ok": "(O) Excuse me, Ms. White, is this seat yours?",
        "why": "台灣中文的「先生」不區分性別，學生因此把 Mr. 當成對任何人的通用稱呼，對女性也說 Mr.。英文的稱謂分得很清楚：Mr. 只用於男性，女性要用 Ms.、Mrs. 或 Miss。同樣的道理也適用於職稱稱呼，對方是女性就不能用 Mr. President，必須依對象的性別與身分選擇合適的稱謂。",
        "exOkText": "(O) **Mr. President**, may I ask a question?",
        "exOkZh": "總統先生，我可以問一個問題嗎？",
        "exBadText": "(X) This is **Mr. Smith**. May I help you?",
        "exBadNote": "錯誤：對方是女性，稱謂應為 Ms. 或 Mrs.，不能一律用 Mr."
      },
      {
        "title": "拼寫錯誤（President 字母順序／重複）",
        "bad": "(X) Mr. Presidant ／ (X) Mr. Prresident",
        "ok": "(O) Mr. President",
        "why": "President 這個字是基礎單字，卻因為不常用而容易被拼錯，常見錯誤是 presidant（把 n 與 d 的順序記成中文的「總統」發音想像）、prresident（重複 r），以及漏掉中間的 e 寫成 pritdent。會考單字題與打字練習都會直接考拼字。記法：pre-si-dent，四段，si 固定，最後是 -dent。",
        "exOkText": "(O) The **President** will give a speech tomorrow.",
        "exOkZh": "總統明天將發表演說。",
        "exBadText": "(X) The **Presidant** will give a speech tomorrow.",
        "exBadNote": "錯誤：拼字錯誤，正確為 President（pre-si-dent）"
      }
    ],
    "traps": [
      "大寫與小寫的分界：指出「特定國家的元首」時用大寫 President（如 the President of the United States），若泛指某公司的負責人或學校的校長則用小寫 president（如 the president of our school）。",
      "稱謂與全名不能重複：Mr. President 與 President Wang 擇一使用，不可寫成 Mr. President Wang Chen，也不要加 of 或逗號把稱謂和名字隔開。",
      "稱謂受詞位置：稱謂片語當主詞時，前面不要再加冠詞（不要寫 the Mr. President），當一般職稱描述職位時才需要 the。"
    ],
    "strategy": [
      "記住公式：「敬稱 Mr.／Ms. ＋ 職稱（President, Governor, Mayor）＋（選填）姓氏」，稱謂永遠排第一。",
      "打字時把句首大寫的規則關掉想：Mr. President 的 P 大寫是因為它是專有名詞，不是因為它在句首。",
      "看到 male / female 的題目敘述，先確定對方性別再選稱謂，考試中 Ms. 與 Mrs. 的差別也算一分。",
      "把 President 依音節分段記憶：pre-si-dent，一邊念一邊打字，練到不用想就能打出來。"
    ]
  },
  "calling": {
    "zh": "來電",
    "ipa": "/ˈkɔːlɪŋ/",
    "headline": "call 的 -ing 形式，這裡當名詞用，意思是「來電」這件事",
    "structure": [
      {
        "role": "動名詞",
        "token": "calling",
        "pos": "動名詞／現在分詞 (Gerund / Present Participle) — call 的 -ing 形式",
        "func": "在此句中不當動詞，而是名詞化，表示「打電話」這個行為或事件，中文翻譯為「來電」",
        "mark": "O"
      },
      {
        "role": "動名詞片語",
        "token": "you calling",
        "pos": "動名詞片語 (Gerund Phrase)",
        "func": "整段相當於一個名詞「您的來電」，在 because of 後面擔任受詞，是本句要表達的關鍵",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "詞性錯誤：用動詞原形 call 代替 calling",
        "bad": "(X) It wasn't because of you call.",
        "ok": "(O) It wasn't because of you calling.",
        "why": "because of 後面必須放名詞或名詞化的成分，不能直接放動詞原形。中文「因為您打電話」聽起來像一整個動作，學生就順手寫成 you call，但英文裡 call 在這裡是動詞，整句意思會不成立。解法是加上 -ing 把它變成名詞：call 變 calling，整段就等於一個名詞「您的來電」，句子才完整。",
        "exOkText": "(O) I'm glad about **your calling** yesterday.",
        "exOkZh": "我很感謝你昨天打電話來。",
        "exBadText": "(X) I'm glad about **your call** is coming. ／ (X) It's because of **you call**.",
        "exBadNote": "錯誤：because of / about 後面接名詞，動詞要加 -ing 變成名詞"
      },
      {
        "title": "結構錯誤：介系詞後面多加 be 動詞",
        "bad": "(X) It's because of you are calling me.",
        "ok": "(O) It's because of you calling me.",
        "why": "you calling 已經是一個完整的動名詞片語，it 就是它的形式主語。學生常看到 you 就反射性地補上 are，變成 because of you are calling，這樣等於在句子中間塞進一個 be 動詞，結構就壞掉了。判斷法：because of 這種介系詞片語裡面不會再有 be 動詞，因為整段已經被當成名詞使用，不是一個句子。",
        "exOkText": "(O) Thank you **for calling** me so late.",
        "exOkZh": "謝謝你這麼晚還打電話給我。",
        "exBadText": "(X) Thank you **for you are calling** me so late.",
        "exBadNote": "錯誤：動名詞片語前不能再加 you are，for 後直接接 calling"
      },
      {
        "title": "時態錯誤：because of / after 後面直接用過去式",
        "bad": "(X) It's because of you called me that I forgot.",
        "ok": "(O) It's because of you calling me that I forgot.",
        "why": "because of、after、before、thank you for 這些片語後面接的是「事情的名詞」，不是句子，所以不能隨意改成過去式 called。中文「因為您打電話」沒有動詞時態變化，學生一看到時間已經過去，就順手把 call 變成 called。判斷法：只要這個片語整段被當成名詞，裡面的動詞就固定用原形加 -ing，不隨句子時態改變。",
        "exOkText": "(O) I was late **because of calling** you on the way.",
        "exOkZh": "我因為路上打電話給你而遲到了。",
        "exBadText": "(X) I was late **because of called** you on the way.",
        "exBadNote": "錯誤：because of 後面是名詞化的動名詞 calling，不是過去式 called"
      },
      {
        "title": "拼寫錯誤：雙 l 與字母順序",
        "bad": "(X) because of you cailing ／ (X) because of you callling",
        "ok": "(O) because of you calling",
        "why": "call 本身是 c-a-l-l 雙 l，加 -ing 之後變成 c-a-l-l-i-n-g，總共七個字母。台灣學生最常見的錯誤是打字時漏掉一個 l 寫成 callling，或把 c 和 a 順序顛轉寫成 cailing。這是基礎拼字題與打字練習的高頻扣分點。記法：call 讀「考」，calling 讀「考-靈」，中間那個 l 絕對不能少。",
        "exOkText": "(O) The **calling** card on the desk belongs to Tom.",
        "exOkZh": "桌上那張名片是 Tom 的。",
        "exBadText": "(X) The **cailing** card on the desk belongs to Tom.",
        "exBadNote": "錯誤：拼字錯誤，應為 calling（c-a-l-l-i-n-g）"
      }
    ],
    "traps": [
      "名詞與動詞的分界：calling 出現在「主詞位置」時是名詞（那通來電），出現在「動作進行中」時才是動詞（我正在打）。中文都譯成「打電話」，英文判斷要看它在句子裡擔任什麼成分。",
      "calling 不等於 telephone：中文「電話來電」直譯會寫出 a telephone calling，英文中 telephone 與 call 重複，正確說法是 a phone call 或 a telephone call。",
      "介系詞陷阱：克漏字測驗常考「thank you for ___」「I'm glad about ___」，答案都是 -ing 形式（calling, helping, meeting），不是 call 原形或 called。"
    ],
    "strategy": [
      "記公式：介系詞（of / for / about / because of）＋ 動詞原形 + ing ＝ 一個名詞，記成「V-ing 當名詞」。",
      "看到 because of 就立刻在腦中把後面換成「一件事」來翻譯，語意會通順很多：因為「您打電話這件事」。",
      "打字時用手指分段敲 c-a-l-l，再接 -i-n-g，特別注意雙 l 與 e 結尾（-ing 前面不加 e）。",
      "把 calling 和 called 分開練：calling 是進行式／動名詞，called 是過去式，兩者不能互換位置。"
    ]
  },
  "If it wasn't because of you calling": {
    "zh": "如果不是因為您打電話來",
    "ipa": "/ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ/",
    "headline": "It 虛主語 + wasn't because of：省略倒裝的「要不是…」句型",
    "structure": [
      {
        "role": "連接詞",
        "token": "If",
        "pos": "連接詞 (Conjunction)",
        "func": "帶出從屬子句，與後面的主句（I am on stage…）配對，整個句子是「與現在事實相反」的假設",
        "mark": "O"
      },
      {
        "role": "虛主語",
        "token": "it",
        "pos": "代詞 (Pronoun) — 虛主語 (Dummy Subject)",
        "func": "本身沒有意義，只是把真正的主詞 because of you calling 提到前面，讓句子可以接動詞；不能省略，也不能換成 he、she、you",
        "mark": "O"
      },
      {
        "role": "縮寫否定動詞 + 介系詞片語",
        "token": "wasn't because of",
        "pos": "縮寫句 (Contraction) — was not because of",
        "func": "表示「要不是…」的讓步語氣，說話人用一整個否定來表達「多虧你打電話，我才有這個機會」",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "把 because 與 you calling 連起來；because of 後面只能接名詞或動名詞",
        "mark": "O"
      },
      {
        "role": "動名詞片語",
        "token": "you calling",
        "pos": "動名詞片語 (Gerund Phrase)",
        "func": "真正的內容「您打電話來」，作為 because of 的受詞，it 空的真正主詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（because 漏掉 of）",
        "bad": "(X) If it wasn't because you calling.",
        "ok": "(O) If it wasn't because of you calling.",
        "why": "這裡的 because 是介系詞，後面一定要加 of 才能接受詞，這就是固定片語 because of。學生常把 because 當成連接詞（可接完整句子，如 because I was busy）而忘記 of。判斷法：because of 後面接名詞；because 後面接完整句子，兩者不能混。整句意思會從「要不是您的來電」變成語法不成立。",
        "exOkText": "(O) If it wasn't **because of** you, I would have failed.",
        "exOkZh": "要不是有你，我就會不及格了。",
        "exBadText": "(X) If it wasn't **because you** called, I would have failed.",
        "exBadNote": "錯誤：介系詞片語應為 because of，不能漏掉 of"
      },
      {
        "title": "虛主語 it 誤換或省略",
        "bad": "(X) If he wasn't because of you calling. ／ (X) If wasn't because of you calling.",
        "ok": "(O) If it wasn't because of you calling.",
        "why": "這個句型是英文口語最常見的省略倒裝，完整寫法是 If it were not because of you calling me…；it 是沒有實質意義的虛主語，只負責把 because of you calling 這個長片語提到句首當主語。學生看到 because of 就想找一個「人」當主語而填上 he，或乾脆省略 it，兩種都錯。",
        "exOkText": "(O) **If it wasn't because of** your help, I couldn't finish.",
        "exOkZh": "要不是有你的幫忙，我沒辦法完成。",
        "exBadText": "(X) **If wasn't because of** your help, I couldn't finish.",
        "exBadNote": "錯誤：虛主語 it 不能省略，也不能換成 he / she / you"
      },
      {
        "title": "否定語意顛倒（wasn't 變成 was）",
        "bad": "(X) If it was because of you calling, I am still at home.",
        "ok": "(O) If it wasn't because of you calling, I would be still at home.",
        "why": "wasn't 是「不是」，整句要表達的是「要不是您打電話來（我才不會在這裡）」，帶有感謝與驚訝的語氣。如果去掉否定變成 was，語意完全反轉成「正因為您打電話來，我還在家裡」，跟講話者想表達的相反。閱讀測驗常故意放一個 wasn't 讓你判斷說話者的語氣，寫作時更要先想清楚自己是要感謝還是要抱怨。",
        "exOkText": "(O) If it **wasn't** because of you calling, I would still be sleeping.",
        "exOkZh": "要不是您打電話來，我現在還在睡覺。",
        "exBadText": "(X) If it **was** because of you calling, I would still be sleeping.",
        "exBadNote": "錯誤：去掉否定後語意完全相反，wasn't 的「要不是」語氣不能省"
      },
      {
        "title": "結構錯誤：because of 之後多加 be 動詞",
        "bad": "(X) If it wasn't because of you are calling me.",
        "ok": "(O) If it wasn't because of you calling me.",
        "why": "because of you calling me 整段是一個名詞，it 只是它的替身，兩者之間不能再插入 are。學生常因為看到 you 就反射式補上 be 動詞，整句的結構就垮了。判斷法：把 because of 後面整段圈起來當一個名詞看待，it 已經是它的主語，裡面絕對不會有 be 動詞。",
        "exOkText": "(O) If it wasn't because of **you calling** me, I'd miss the show.",
        "exOkZh": "要不是您打電話給我，我就會錯過表演了。",
        "exBadText": "(X) If it wasn't because of **you are calling** me, I'd miss the show.",
        "exBadNote": "錯誤：動名詞片語前不能再加 are，because of 後面是名詞"
      }
    ],
    "traps": [
      "it 不是「他／她」：這個句型裡的 it 沒有任何指涉對象，學生若代入中文「要不然」的「不然」兩字，很容易誤以為要填人稱代詞。",
      "wasn't 的強烈語氣：口語中的 wasn't because of 是強烈的「要不是」；正式書面語應寫成 If it were not because of…（were 虛擬式），兩者語氣不同，會考閱讀可能用正式寫法出題。",
      "介系詞測驗點：句中空格若接在 because 後面且後續是名詞或 you calling，答案必須是 of；because of 與 because 意思相近但用法完全不同。"
    ],
    "strategy": [
      "背下整個骨架：If it wasn't because of + 動名詞（…, I would…），口語與作文都能直接套用。",
      "拆解語意：把它讀成「要不是您打電話來，後面的句子才會成立」，就會發現後面的 I am on stage / I would be 是一組對照，立刻抓到句意重點。",
      "遇到 it 開頭的 because 句，直接在 it 底下畫線提醒自己：這是虛主語，不能刪、不能換。",
      "檢查 because of 後面：只看兩個字——of 在不在、後面有沒有 be 動詞，就能擋掉最常見的兩個錯。"
    ]
  },
  "I am on stage": {
    "zh": "我正在舞台上",
    "ipa": "/aɪ æm ɑːn steɪdʒ/",
    "headline": "on stage 不加 the：整個片語當副詞用，意思是「在舞台上」",
    "structure": [
      {
        "role": "主詞",
        "token": "I",
        "pos": "代詞 (Pronoun) — 第一人稱單數",
        "func": "句子的主語，發音時要輕短，放句首大寫",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "am",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "與主詞 I 搭配，表示現在正在發生的狀態，後面接片語",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "on stage",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "固定說法，on 在此表示「在某個表面之上」；整個片語當副詞用，修飾 am，表示人正站在舞台上",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞誤加（on the stage）",
        "bad": "(X) I am on the stage now.",
        "ok": "(O) I am on stage now.",
        "why": "這是台灣學生最常見的錯誤，直覺上中文「在舞台上」有「這座舞台」的感覺，就想加 the。英文的 on stage 是一個固定片語，stage 在這裡是抽象的「舞台這個場所」，前面不加定冠詞。同理還有 on purpose（故意的）、on duty（值班的）這類不加 the 的片語。判斷法：stand on stage 這種「演出、表演」的語境一律不加 the。",
        "exOkText": "(O) The singer is **on stage** right now.",
        "exOkZh": "歌手此刻正在舞台上。",
        "exBadText": "(X) The singer is **on the stage** right now.",
        "exBadNote": "錯誤：on stage 是固定片語，前面不加 the"
      },
      {
        "title": "介系詞誤用（in stage / in the stage）",
        "bad": "(X) I am in stage. ／ (X) I am in the stage.",
        "ok": "(O) I am on stage.",
        "why": "on 表示「在某個平面的上面」，in 表示「在裡面」。站在舞台上，人是在舞台的表面之上，所以用 on；用 in 會讓人想像成「舞台的內部空間」。中文「在舞台（裡）」不分上與內，學生就容易選 in。練習時可以舉例記憶：on the desk（在桌面上）、on the bus（在公車上）、on stage（在舞台上），這一類都固定用 on。",
        "exOkText": "(O) Please stay **on stage** until the music stops.",
        "exOkZh": "請留在舞台上，直到音樂停止。",
        "exBadText": "(X) Please stay **in stage** until the music stops.",
        "exBadNote": "錯誤：介系詞應為 on，不是 in"
      },
      {
        "title": "語序錯誤（I am stage on）",
        "bad": "(X) I am stage on with my friends.",
        "ok": "(O) I am on stage with my friends.",
        "why": "台灣中文說「我舞台在」時是把地點放在前面，學生因此照著中文語序把 stage 提前。英文的基本規則是「主詞 + 動詞 + 其他」，片語放在 be 動詞之後，不論裡面有幾個單字都不能拆開顛倒。這是中文母語者的典型語序干擾，尤其在口頭解釋題或翻譯題最容易出現。",
        "exOkText": "(O) My friends are **on stage**, and I am backstage.",
        "exOkZh": "我的朋友們在台上，而我在後台。",
        "exBadText": "(X) My friends are **stage on**, and I am backstage.",
        "exBadNote": "錯誤：片語不可拆開顛倒，應為 on stage"
      },
      {
        "title": "be 動詞省略（I on stage）",
        "bad": "(X) I on stage every Friday.",
        "ok": "(O) I am on stage every Friday.",
        "why": "中文口說「我（每週五）都在舞台」會省略「是」，學生便把這個習慣帶進英文，寫成 I on stage。英文的句子只要有主詞 I，就一定要有動詞；be 動詞不能用「省略」處理。這類錯誤在中文演講稿翻譯、口語練習題中特別常見，檢查方法很簡單：寫完後看「主詞後面有沒有動詞」。",
        "exOkText": "(O) She **is on stage** every Friday night.",
        "exOkZh": "她每週五晚上都在舞台上。",
        "exBadText": "(X) She **on stage** every Friday night.",
        "exBadNote": "錯誤：主詞後缺少 be 動詞，應為 is on stage"
      }
    ],
    "traps": [
      "stage 前面不加 the：會考與日常口語都是 on stage；只有在強調「這一座特定的舞台」或與其他舞台對比時，才會用 on the stage。",
      "stage 是可數名詞：on a stage（在一座舞台上，單數加冠詞）、on two stages（兩座舞台）都可以；沒有冠詞的 on stage 是一種「演出狀態」的說法。",
      "近義片語要分清：on stage（在舞台上的演出中）、on the stage（在舞台的表面上）、backstage（在後台），位置與情境不同，不能互換。"
    ],
    "strategy": [
      "記成公式：「主詞 + am / is / are + on stage」，整個片語貼在 be 動詞後面，不加 the。",
      "朗讀整句（I am on stage.）建立語感，特別念出連音 /ən steɪdʒ/，就不容易再插入冠詞。",
      "寫作檢查三件事：主詞後面有沒有 be 動詞、on stage 有沒有被拆開、有沒有多加 the。",
      "延伸練習：on time（準時）、on duty（值班）、on sale（特價中），把這組不加 the 的片語一起背最容易記住。"
    ]
  },
  "If it wasn't because of you calling, I am on stage with the besties.": {
    "zh": "如果不是因為您打電話來，我現在正跟好朋友在台上呢。",
    "ipa": "/ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ, aɪ æm ɑːn steɪdʒ wɪð ðə ˈbestiːz/",
    "headline": "從屬子句後要有逗號：完整句 = If it wasn't because of you calling, + I am on stage…",
    "structure": [
      {
        "role": "連接詞",
        "token": "If",
        "pos": "連接詞 (Conjunction)",
        "func": "開啟從屬子句，代表一個與現在事實相反的假設，是全句第一個字，首字母要大寫",
        "mark": "O"
      },
      {
        "role": "虛主語",
        "token": "it",
        "pos": "代詞 (Pronoun) — 虛主語 (Dummy Subject)",
        "func": "沒有實質意思，只負責讓 because of you calling 這個長片語能當主語使用，不能刪也不能換成別的人",
        "mark": "O"
      },
      {
        "role": "縮寫否定 + 介系詞片語",
        "token": "wasn't because of",
        "pos": "縮寫句 (Contraction) — was not because of",
        "func": "表示「要不是…」的讓步語氣，帶有感謝對方來電的意味",
        "mark": "O"
      },
      {
        "role": "人稱代詞",
        "token": "you",
        "pos": "代詞 (Pronoun) — 受詞",
        "func": "作為動名詞 calling 的執行者，整段 you calling 當名詞「您的來電」用",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "calling",
        "pos": "動名詞 (Gerund) — call 的 -ing 形式",
        "func": "把動詞 call 名詞化，整段 you calling 相當於中文的「您打電話來」這件事",
        "mark": "O"
      },
      {
        "role": "標點",
        "token": ",",
        "pos": "標點 (Punctuation) — 逗號",
        "func": "分隔開頭的 If 從屬子句與後面的主句，是本句最重要的標點得分點，漏寫會變成-run-on 錯誤",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "I",
        "pos": "代詞 (Pronoun) — 第一人稱單數",
        "func": "主句的主詞，指講話自己；放在逗號後面時仍要大寫",
        "mark": "O"
      },
      {
        "role": "be 動詞片語",
        "token": "am on stage",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "be 動詞 am 加上固定片語 on stage（不加 the），表示「正站在舞台上」",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "with the besties",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "with 表示「跟……一起」，the besties 是 bestie 的複數，前面要加定冠詞 the，語意為「跟我的好朋友們一起」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "標點錯誤：從屬子句後漏逗號",
        "bad": "(X) If it wasn't because of you calling I am on stage with the besties.",
        "ok": "(O) If it wasn't because of you calling, I am on stage with the besties.",
        "why": "If 引導的是從屬子句，必須靠逗號與主句分開，這是會考標點題的固定考點。台灣學生的中文習慣是「如果……，（換行）就……」，打字時常忘記英文的逗號，句子變成兩句黏在一起。長句特別容易漏，尤其 when、if、because 這些連接詞開頭時。看到 If 就先在腦中點一個逗號，是最省力的防漏技巧。",
        "exOkText": "(O) **If it wasn't because of you calling,** I am on stage with the besties.",
        "exOkZh": "要不是您打電話來，我現在就正跟好朋友在台上呢。",
        "exBadText": "(X) **If it wasn't because of you calling** I am on stage with the besties.",
        "exBadNote": "錯誤：If 從屬子句與主句之間缺少逗號"
      },
      {
        "title": "固定片語誤加冠詞（on the stage）",
        "bad": "(X) I am on the stage with the besties.",
        "ok": "(O) I am on stage with the besties.",
        "why": "on stage 是固定片語，表示「在舞台上演出」這個狀態，前面不加 the。學生看到中文「在舞台上」就自動補上定冠詞，變成 on the stage。與前一句的 if 子句合併後更容易漏判，因為注意力全被前面的 because of 吸走。檢查時只要把 on stage 三個字圈起來，問自己「這裡是場所還是演出狀態」，就能避免多餘的 the。",
        "exOkText": "(O) We are **on stage** for the school play tonight.",
        "exOkZh": "今晚的校園劇，我們都會上台演出。",
        "exBadText": "(X) We are **on the stage** for the school play tonight.",
        "exBadNote": "錯誤：on stage 為固定片語，前面不加 the"
      },
      {
        "title": "結構錯誤：because of 之後多插入 be 動詞",
        "bad": "(X) If it wasn't because of you are calling, I am on stage.",
        "ok": "(O) If it wasn't because of you calling, I am on stage.",
        "why": "because of you calling 整段是當作一個名詞使用，前面已有虛主語 it，所以 you 後面不能再加 are。學生看到 you 就自動補上 be 動詞，是中文母語者最典型的反應。判斷法：把 because of 到 calling 整段括起來當一個名詞看，it 已經是它的主語，裡面不可能再有 be 動詞或助動詞。",
        "exOkText": "(O) If it wasn't because of **you calling,** I'd still be at home.",
        "exOkZh": "要不是您打電話來，我現在還在家裡。",
        "exBadText": "(X) If it wasn't because of **you are calling,** I'd still be at home.",
        "exBadNote": "錯誤：動名詞片語前不能再加 are，because of 後面接的是名詞"
      },
      {
        "title": "拼寫錯誤：besties 字母缺漏或順序顛倒",
        "bad": "(X) I am on stage with the bestys. ／ (X) with the bestee",
        "ok": "(O) I am on stage with the besties.",
        "why": "bestie 是口語常用的「好友」，複數 besties 正確拼法是 b-e-s-t-i-e-s，七個字母。台灣學生最常寫成 bestys（漏掉 e）與 bestee（s 打成 e），兩者都直接影響拼字題與打字正確率。記法：best + ie + s，中間是 ie 這個字母組合，結尾再加 s 想成「最好的一群人」。",
        "exOkText": "(O) I am on stage with **the besties** from my class.",
        "exOkZh": "我正跟班上的好朋友們在台上。",
        "exBadText": "(X) I am on stage with **the bestys** from my class.",
        "exBadNote": "錯誤：拼字錯誤，複數應為 besties（best + ie + s）"
      }
    ],
    "traps": [
      "wasn't 的語意陷阱：把否定去掉變成 If it was because of you calling，語意會完全反轉成「正因為您打電話來」。閱讀測驗常用這一個字考判斷力，做題時先圈出 wasn。",
      "虛主語 it 與後面主句的 I：句子裡出現兩個「人稱」，it 是假的（沒有指涉對象），I 才是真的主詞。兩者不要互換，也不要把 it 刪掉。",
      "複數名詞前的 the：besties 是複數，前面必須加 the（the besties），不可寫成 with besties；相對地，on stage 這個片語則不能加 the，兩者規則相反，最容易混淆。"
    ],
    "strategy": [
      "寫作時用兩段式：先寫「If it wasn't because of you calling」，寫完立刻打上逗號，再接主句「I am on stage with the besties」，標點自然不會漏。",
      "圈出三個重點片語檢查：because of you（介系詞後不要加 be 動詞）、on stage（不加 the）、the besties（複數要加 the）。",
      "整句唸出來聽節奏：If it wasn't because of you calling, I am on stage with the besties.，在 calling 後自然會換氣，就是逗號的位置。",
      "把這句當成模板背起來，之後寫「要不是你幫我，我就能順利完成了」時，只要替換 calling 與主句就能套用，是最容易上手的英式口語句型之一。"
    ]
  },
  "kinds of animals": {
    "zh": "各種動物",
    "ipa": "/ˈkaɪndz əv ˈænɪ.məlz/",
    "headline": "複數 kinds 決定整個片語都要複數",
    "structure": [
      {
        "role": "量詞/名詞",
        "token": "kinds",
        "pos": "名詞 (Noun) — kind 的複數",
        "func": "表示「種類」，是本句的主詞，為複數形",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "表示所屬或包含的關係，把 kinds 與 animals 連起來",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "作為 of 的受詞，因前面 kinds 是複數而用複數形",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數一致性錯誤（單複數不匹配）",
        "bad": "(X) kind of animals ／ (X) kinds of animal",
        "ok": "(O) kinds of animals",
        "why": "這個片語的主詞是 kinds（複數），of 後面的受詞 animals 也必須是複數，數量才一致。台灣學生常犯兩種相反的錯：前面加了 s、後面忘記加 s（kinds of animal）；或以為 animal 是總稱所以永遠單數。判斷法很簡單：kinds 已經是「多種」，of 後面的可數名詞一定是複數。",
        "exOkText": "(O) There are many **kinds of books** in the library.",
        "exOkZh": "圖書館裡有許多種類的書。",
        "exBadText": "(X) There are many **kind of books** in the library.",
        "exBadNote": "錯誤：kind 應為複數 kinds，many 後面的名詞也要用複數"
      },
      {
        "title": "介系詞誤用（for / to 取代 of）",
        "bad": "(X) kinds for animals ／ (X) kinds to animals",
        "ok": "(O) kinds of animals",
        "why": "表達「……的種類」時，介系詞固定用 of，不能用 for 或 to。學生常受中文「給動物的種類」影響，把 of 誤換成 for。of 的意思是「屬於、包含」，for 是「為了、給」，兩者意思完全不同，考試不能用錯。",
        "exOkText": "(O) I like all **kinds of music**.",
        "exOkZh": "我喜歡所有種類的音樂。",
        "exBadText": "(X) I like all **kinds for music**.",
        "exBadNote": "錯誤：介系詞應為 of，不是 for"
      },
      {
        "title": "可數與不可數名詞的混淆",
        "bad": "(X) kinds of animal",
        "ok": "(O) kinds of animals",
        "why": "animal 是可數名詞，可以一個一個數。既然 kinds 是複數，of 後面的 animal 就必須跟著變成複數 animals。學生常誤以為「動物」是總稱（像 water、rice 那種不可數名詞）而忘記加 s，但 animals 是可數的。",
        "exOkText": "(O) The zoo has many **kinds of monkeys**.",
        "exOkZh": "動物園有許多種類的猴子。",
        "exBadText": "(X) The zoo has many **kinds of monkey**.",
        "exBadNote": "錯誤：monkey 是可數名詞，應為複數 monkeys"
      },
      {
        "title": "主詞與動詞不一致（用 is 而非 are）",
        "bad": "(X) Kinds of animals **is** interesting.",
        "ok": "(O) Kinds of animals **are** interesting.",
        "why": "kinds of animals 的主詞中心詞是 kinds（複數），所以 be 動詞要用 are。學生常被後面的 animals 混淆，或誤以為整個片語看起來像單數。判斷口訣：of 不影響判斷，只看 of 前面的那個名詞——kinds 是複數就用 are。",
        "exOkText": "(O) **Kinds of food are** different in every country.",
        "exOkZh": "各國的食物種類不同。",
        "exBadText": "(X) **Kinds of food is** different in every country.",
        "exBadNote": "錯誤：主詞為複數 kinds，be 動詞應為 are"
      }
    ],
    "traps": [
      "主詞與動詞呼應陷阱：會考常出現「Kinds of + 複數名詞 + 動詞」的句型，動詞要根據 of 前面的 kinds 決定單複數，用 are / have / do。",
      "量詞複數陷阱：many kinds of、all kinds of、different kinds of 都要求 kind 加 s，而且後面的名詞也要複數。",
      "介系詞陷阱：克漏字測驗常考「kinds ___」，答案永遠是 of，不可選 for、in、on。"
    ],
    "strategy": [
      "記住公式：「複數 kinds + of + 複數名詞」，例如 two kinds of dogs、many kinds of flowers。",
      "判斷主詞：看到 kinds of 開頭的句子，立刻在 kinds 底下畫線，提醒自己這是複數主詞。",
      "檢查前後一致性：寫作或選擇題時，確認 kinds 和後面的名詞同時是複數。",
      "大聲朗讀正確句（There are many kinds of animals in the zoo.），培養對複數 s 的語感。"
    ]
  },
  "being with all kinds of animals": {
    "zh": "與各種動物相處",
    "ipa": "/ˈbiːɪŋ wɪð ɔːl kaɪndz əv ˈænɪ.məlz/",
    "intro": "這是一個正確的**動名詞片語（V-ing 片語）**，意思是「與各種動物相處」「和所有種類的動物在一起」。它通常不能單獨成為一個完整的句子，而是作為句子的**主詞、補語或修飾語**來使用。",
    "headline": "動名詞片語當主詞時，整個片語視為單數，後面的動詞要用 is",
    "structure": [
      {
        "role": "動名詞/現在分詞",
        "token": "being",
        "pos": "動詞 (Verb) 的 -ing 形式",
        "func": "作為動名詞，表示「處於…狀態」或「存在」；單獨使用時要當名詞看待",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "表示「與…一起」，後面接名詞或動名詞片語",
        "mark": "O"
      },
      {
        "role": "量詞/片語",
        "token": "all kinds of",
        "pos": "片語 (Phrase)",
        "func": "表示「各種各樣的」；kind 必須加 s",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "作為 of 的受詞，表示「動物」；因前面 kinds 是複數而用複數形",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動詞形式錯誤（該用原形卻用 ing，或該用 ing 卻用原形）",
        "bad": "(X) be with all kinds of animals（當作主詞時）",
        "ok": "(O) being with all kinds of animals（當作主詞時）",
        "why": "當我們要把「動詞片語」當作「主詞」使用時，必須把動詞改為**動名詞 (V-ing)** 形式。學生常忘記加 ing，直接把原形動詞 be 放在句首當主詞，這是嚴重的文法錯誤。判斷法：主詞位置不能放 be 動詞；如果要用「和動物相處」當主詞，就一定要用 being 開頭。",
        "exOkText": "(O) **Being with all kinds of animals** is exciting.",
        "exOkZh": "與各種動物相處很令人興奮。",
        "exBadText": "(X) **Be with all kinds of animals** is exciting.",
        "exBadNote": "錯誤：主詞位置不能放原形動詞 be，要用動名詞 being"
      },
      {
        "title": "介系詞誤用（of / for 取代 with）",
        "bad": "(X) being of all kinds of animals ／ (X) being for all kinds of animals",
        "ok": "(O) being with all kinds of animals",
        "why": "表達「與…相處／在一起」時，介系詞必須使用 **with**。學生常因中文翻譯「和」的影響，誤用 of 或 for：of 是「屬於、包含」，for 是「為了、給」，兩個都不表示「一起」，放進這個位置句子就不成立。",
        "exOkText": "(O) She enjoys **being with her friends**.",
        "exOkZh": "她喜歡和朋友在一起。",
        "exBadText": "(X) She enjoys **being of her friends**.",
        "exBadNote": "錯誤：介系詞應為 with，不是 of"
      },
      {
        "title": "複數一致性錯誤（kinds 和 animals 的單複數不匹配）",
        "bad": "(X) being with all kind of animals ／ (X) being with all kinds of animal",
        "ok": "(O) being with all kinds of animals",
        "why": "all kinds of 是固定用法，**kind 必須加 s**，而且後面的 **animal 也必須是複數 animals**。學生常犯兩種相反的錯：前面加了 s、後面卻忘記加 s（all kinds of animal）；或是前面沒加 s、後面卻加了 s（all kind of animals）。",
        "exOkText": "(O) He likes **all kinds of sports**.",
        "exOkZh": "他喜歡各種運動。",
        "exBadText": "(X) He likes **all kind of sports**.",
        "exBadNote": "錯誤：kind 應為複數 kinds"
      },
      {
        "title": "當作主詞時，動詞單複數呼應錯誤（用 are 而非 is）",
        "bad": "(X) Being with all kinds of animals **are** fun.",
        "ok": "(O) Being with all kinds of animals **is** fun.",
        "why": "當 **Being with…** 這個動名詞片語當作主詞時，**整個片語視為單數**，因此動詞必須使用單數動詞 **is**。學生常被後面的 animals（複數）混淆而誤用 are。口訣：動名詞開頭的主詞一律當單數，與後面名詞的單複數無關。",
        "exOkText": "(O) **Playing basketball is** good for health.",
        "exOkZh": "打籃球對健康有益。",
        "exBadText": "(X) **Playing basketball are** good for health.",
        "exBadNote": "錯誤：動名詞主詞視為單數，動詞應為 is"
      }
    ],
    "traps": [
      "**動名詞主詞的陷阱**：會考常考「V-ing + 單數動詞」的句型。看到句首是 V-ing（如 Being、Playing、Reading），後面的動詞一定要選 is、was、has 等單數動詞，不能選 are、were、have。",
      "**量詞複數的陷阱**：會考常考 all kinds of、many kinds of、different kinds of 等片語。務必注意 kind 必須加 s，且後面的名詞也必須是複數。",
      "**介系詞陷阱**：在克漏字測驗中，常考「being ___」的空格，正確答案永遠是 with（表示陪伴、相處），不可選 of、in、on 等。",
      "**完整句子的陷阱**：會考閱讀測驗中，常出現「Being with all kinds of animals」單獨出現在選項中，這是一個片語，不是完整句子。若題目要求選出「完整的句子」，這個選項就是錯的。"
    ],
    "strategy": [
      "記住公式：背誦「Being with + 複數名詞 + 單數動詞」這個公式。例如：Being with good friends is happy.",
      "判斷主詞：看到「Being with…」開頭的句子，立刻在 Being 底下畫線，提醒自己這是動名詞主詞，動詞要用單數。",
      "注意前後一致性：寫作或選擇題時，檢查 all kinds 和後面的名詞是否同時是複數。",
      "區分片語與句子：若選項是「Being with all kinds of animals」，它只是一個片語，不能單獨存在，必須搭配主要動詞（如 is fun）才能成為完整句子。",
      "多讀例句：大聲朗讀正確的句子（如：Being with all kinds of animals is interesting.），培養對動名詞主詞與單數動詞的語感。"
    ]
  },
  "There are many kinds of animals in the zoo.": {
    "zh": "動物園裡有許多種動物。",
    "ipa": "/ðeər ɑː ˈmeni ˈkaɪndz əv ˈænɪ.məlz ɪn ðə zuː/",
    "headline": "There are 說「有」，後面接真正的主詞 many kinds of animals",
    "structure": [
      {
        "role": "虛擬動詞片語",
        "token": "There are",
        "pos": "虛擬動詞 (Existential there) + be 動詞",
        "func": "表示「某處有某物」，只負責引出句子，本身不帶單複數",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "many",
        "pos": "限定詞 (Determiner) — 修飾可數名詞複數",
        "func": "修飾後面的 kinds，表示「許多種」，數量很多",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "kinds of animals",
        "pos": "名詞片語 (Noun Phrase) — kinds 為中心詞（複數）",
        "func": "There are 後面真正的主詞，說明「有」什麼東西；中心詞是 kinds，故用 are",
        "mark": "O"
      },
      {
        "role": "介系詞片語（地點）",
        "token": "in the zoo",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "指出動物所在的地點，in 表示在……之內，後接 the zoo",
        "mark": "O"
      },
      {
        "role": "冠詞",
        "token": "the",
        "pos": "定冠詞 (Definite Article)",
        "func": "指定雙方都知道的那座動物園",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "zoo",
        "pos": "名詞 (Noun) — 具體單數名詞",
        "func": "動物存在的地點，zoo 本身不需複數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "There is 與 There are 混用（單複數不一致）",
        "bad": "(X) There **is** many kinds of animals in the zoo.",
        "ok": "(O) There **are** many kinds of animals in the zoo.",
        "why": "There be 句型的 be 動詞，要看後面真正的主詞決定單複數，後面是 many kinds of animals（複數），所以必須用 are。台灣學生最常犯的錯是看到 There 就直接套 is，完全跳過主詞檢查。判斷法：把 There 暫時遮住，看剩下的主詞是單數（is）還是複數（are）。",
        "exOkText": "(O) There **are** ten kinds of birds in the park.",
        "exOkZh": "公園裡有十種鳥。",
        "exBadText": "(X) There **is** ten kinds of birds in the park.",
        "exBadNote": "錯誤：後接複數主詞 kinds，be 動詞應為 are"
      },
      {
        "title": "many 後面的名詞忘記複數化",
        "bad": "(X) There are many kinds of **animal** in the zoo.",
        "ok": "(O) There are many kinds of **animals** in the zoo.",
        "why": "many 只能用來修飾可數名詞的複數形。kinds of 後面的 animal 是可數名詞，前面又是 many 修飾 kinds，所以 animal 也必須變成複數 animals。學生常以為「動物」是總稱而保持單數，導致 kinds of animal。記得：只要前面是 many、a lot of、some，後面可數名詞一律複數。",
        "exOkText": "(O) There are many kinds of **flowers** in the garden.",
        "exOkZh": "花園裡有許多種花。",
        "exBadText": "(X) There are many kinds of **flower** in the garden.",
        "exBadNote": "錯誤：many 後的可數名詞必須是複數 flowers"
      },
      {
        "title": "地點介系詞誤用（on / at 取代 in）",
        "bad": "(X) There are many kinds of animals **on** the zoo.",
        "ok": "(O) There are many kinds of animals **in** the zoo.",
        "why": "in 表示在某一空間「裡面」，是表達地點最常用的介系詞；zoo 是有圍牆、有範圍的場所，動物是在裡面，所以用 in。on 是用在平面或表面（on the wall、on the table），at 是用在某一點或地理位置（at the zoo 指抵達現場）。本句描述「裡面有什麼」，固定用 in。",
        "exOkText": "(O) There are many kinds of plants **in** the forest.",
        "exOkZh": "森林裡有許多種類的植物。",
        "exBadText": "(X) There are many kinds of plants **on** the forest.",
        "exBadNote": "錯誤：在……之內應用 in，on 用於表面"
      },
      {
        "title": "冠詞與複數一致性（a kind 與 kinds 混搭）",
        "bad": "(X) There are **a** kinds of animals in the zoo.",
        "ok": "(O) There are **many** kinds of animals in the zoo.",
        "why": "a/an 是單數限定詞，只能接單數名詞 kinds 前面再加 a 就變成「一種」，與中文「許多種」矛盾。表示「許多種」要用 many / all / different / several 這類限定詞搭配複數 kinds。學生常把 many 誤寫成 a，結果變成 a kinds，語意和文法都錯。",
        "exOkText": "(O) There are **several** kinds of monkeys in the zoo.",
        "exOkZh": "動物園裡有好幾種猴子。",
        "exBadText": "(X) There are **a** kinds of monkeys in the zoo.",
        "exBadNote": "錯誤：a 只能接單數，複數 kinds 前面應用 several / many / all"
      }
    ],
    "traps": [
      "There be 陷阱：會考常把 There is / There are 放在選項中，判斷關鍵是先看 be 動詞後面第一個名詞（這裡是 many kinds）決定單複數，不要被前面的 There 迷惑。",
      "複數連鎖陷阱：kinds of animals 本身已是複數，前面又加 many，後面的 animal 也要複數，形成「雙重複數」要求，最容易漏加 s。",
      "地點介系詞陷阱：in the zoo / at the zoo 意思不同——in the zoo 是「在動物園裡面」，at the zoo 是「在動物園那裡」。描述園內內容時用 in。"
    ],
    "strategy": [
      "寫作時先找主詞：讀到 There are，馬上用鉛筆框起後面的 many kinds of animals，確認 be 動詞和它一致。",
      "複數檢查清單：many + kinds（複數） + of + animals（複數），三個 s 都要在才算正確。",
      "地點口訣：在裡面用 in，在表面用 on，在地點用 at；動物關在園內，一定選 in。",
      "朗讀整句並注意停頓：There are / many kinds of animals / in the zoo，唸順了就會自然注意到每一段都是複數。"
    ]
  },
  "How many kinds of animals can you see in this picture?": {
    "zh": "你在這張圖片裡看得到多少種動物？",
    "ipa": "/haʊ ˈmeni ˈkaɪndz əv ˈænɪ.məlz kən juː siː ɪn ðɪs ˈpɪkʃə/",
    "headline": "How many 引導的特殊疑問句，問數量要用 can 問「能不能看到」",
    "structure": [
      {
        "role": "疑問詞片語",
        "token": "How many",
        "pos": "疑問詞 (Question Word) + 限定詞 many",
        "func": "對可數名詞複數提問「多少」，後面直接接名詞 kinds",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "kinds of animals",
        "pos": "名詞片語 (Noun Phrase) — kinds 為中心詞",
        "func": "被問的對象，說明要數的是「幾種動物」；中心詞是複數 kinds",
        "mark": "O"
      },
      {
        "role": "情態動詞",
        "token": "can",
        "pos": "情態動詞 (Modal Verb)",
        "func": "表示能力或可能性，「你能不能看到」，後面接原形動詞 see",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "you",
        "pos": "代名詞 (Pronoun) — 人稱代名詞",
        "func": "問話的對象，回答時也用 you 呼應",
        "mark": "O"
      },
      {
        "role": "實質動詞",
        "token": "see",
        "pos": "動詞 (Verb) — 原形",
        "func": "本句的核心動作「看見」，因為前面是 can，必須用原形 see",
        "mark": "O"
      },
      {
        "role": "介系詞片語（地點）",
        "token": "in this picture",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "說明看的地方，in 表示在這張圖片裡面，this 作指示形容詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "情態動詞後面誤用動詞的 -s 形式",
        "bad": "(X) How many kinds of animals can you **sees** in this picture?",
        "ok": "(O) How many kinds of animals can you **see** in this picture?",
        "why": "情態動詞 can / will / must / should 後面的動詞一律用原形，不能加 -s、-ed，也不會隨主詞變化。即使主詞是 he、she 或單數名詞，can 後面也永遠是 see 不是 sees。這是國中會考的高頻錯點，學生常因中文「看得見」語感而多加 s。口訣：can 後面是原形，永遠不加 s。",
        "exOkText": "(O) How many books can you **read** in a minute?",
        "exOkZh": "你一分鐘能讀多少本書？",
        "exBadText": "(X) How many books can you **reads** in a minute?",
        "exBadNote": "錯誤：can 後面的動詞必須用原形 read"
      },
      {
        "title": "How many 與 How much 混淆（可數與不可數）",
        "bad": "(X) How **much** kinds of animals can you see?",
        "ok": "(O) How **many** kinds of animals can you see?",
        "why": "How many 用來問可數名詞的數量，後面接可數名詞複數（kinds、animals、books）；How much 用來問不可數名詞的量或問價格（How much water、How much is it）。kinds 和 animals 都是可數名詞的複數，所以只能配 many。學生常因中文「多少」不分而混用，判斷法：先看後面的名詞能不能一個一個數，能數就用 many。",
        "exOkText": "(O) How **many** students are there in your class?",
        "exOkZh": "你班上有多少位學生？",
        "exBadText": "(X) How **much** students are there in your class?",
        "exBadNote": "錯誤：students 是可數名詞複數，應用 How many"
      },
      {
        "title": "疑問句語序錯誤（陳述句語序）",
        "bad": "(X) How many kinds of animals you can see in this picture?",
        "ok": "(O) How many kinds of animals can you see in this picture?",
        "why": "特殊疑問句的語序是「疑問詞 + 助動詞/can + 主詞 + 動詞」，也就是 can 一定要放在 you 前面。本句是「你（can）看得到多少種」，所以順序是 How many…can you see，不能寫成 you can see。學生常把疑問句和敘述句的語序搞混，考試選擇題常拿 this 和 that 來設陷阱。",
        "exOkText": "(O) How **many colors can you see** in the picture?",
        "exOkZh": "你在這張圖片裡看得到多少種顏色？",
        "exBadText": "(X) How **many colors you can see** in the picture?",
        "exBadNote": "錯誤：疑問句語序應為 can you see，不能把 can 放到主詞後面"
      },
      {
        "title": "指示形容詞誤用（this / these 混用）",
        "bad": "(X) How many kinds of animals can you see in **these** picture?",
        "ok": "(O) How many kinds of animals can you see in **this** picture?",
        "why": "this 是單數指示形容詞，後面要接單數名詞 picture；these 是複數，後面要接複數名詞 pictures。本句說的是「這張圖片」，用單數 picture，所以前面固定是 this，不能用 these。學生常因中文「這些圖片」而誤用 these。判斷法：this/that 接單數，these/those 接複數，看名詞決定用哪一組。",
        "exOkText": "(O) How many kinds of animals can you see in **this** book?",
        "exOkZh": "你在這本書裡看得到多少種動物？",
        "exBadText": "(X) How many kinds of animals can you see in **these** book?",
        "exBadNote": "錯誤：book 是單數，指示形容詞應為 this，不是 these"
      }
    ],
    "traps": [
      "How many 陷阱：How many 後面必定接可數名詞複數，本句為 kinds（複數），若看到 How many kind 這種選項就直接排除。",
      "can 語序陷阱：會考選擇題常把 can you see 和 you can see 互換當錯誤選項，記住 can 一定在主詞 you 的前面。",
      "指示形容詞陷阱：this picture / that picture 才是單數，these/those pictures 才是複數，題目中的 picture 是單數，答案鎖定 this。"
    ],
    "strategy": [
      "複習公式：「How many + 複數名詞 + can you + 動詞原形 + …?」，套公式就不會忘記 can 的位置。",
      "回答也要複數：被問 How many kinds 時，答案要用數字加複數，例如 I can see three kinds.（三種），不要說 three kind。",
      "檢查兩個標點：疑問句開頭 How many、結尾問號「?」，兩者缺一不可。",
      "練習替換：把 picture 換成 book、map、window，套同一個句型，練習 this 和單數名詞的搭配。"
    ]
  },
  "My brother is interested in animals.": {
    "zh": "我弟弟對動物感興趣。",
    "ipa": "/maɪ ˈbrʌðər ɪz ˈɪntrəstɪd ɪn ˈænɪ.məlz/",
    "headline": "be interested in 是固定片語，in 不能省略",
    "structure": [
      {
        "role": "所有格限定詞",
        "token": "My",
        "pos": "限定詞 (Determiner) — 物主代詞",
        "func": "表示「我的」，後面接單數名詞 brother，說明是誰的哥哥／弟弟",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "brother",
        "pos": "名詞 (Noun) — 單數名詞",
        "func": "句子的主詞，指「我弟弟」，因為是單數所以 be 動詞用 is",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "與單數主詞 brother 呼應，構成 be interested in 的片語",
        "mark": "O"
      },
      {
        "role": "形容詞片語",
        "token": "interested in",
        "pos": "片語 (Phrasal Adjective) — 固定的形容詞片語",
        "func": "表示「對……感興趣」，interested 後面一定要用介系詞 in 連接感興趣的對象",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "作為介系詞 in 的受詞，表示「對動物感興趣」；這裡談多種動物，所以用複數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "片語遺漏介系詞（interested 少了 in）",
        "bad": "(X) My brother is interested **animals**.",
        "ok": "(O) My brother is interested **in** animals.",
        "why": "interested 這個字本身不能單獨接名詞，中文「感興趣」在翻譯成英文時必須搭配 be interested in 這個固定片語，in 絕對不能省略。學生常受中文「他對動物有興趣」影響，把英文當成 interested animals 這種直接對譯。口訣：看到 interested，後面立刻補 in，這是必背片語。",
        "exOkText": "(O) My sister is **interested in** science.",
        "exOkZh": "我妹妹對科學感興趣。",
        "exBadText": "(X) My sister is **interested** science.",
        "exBadNote": "錯誤：interested 後面一定要加介系詞 in"
      },
      {
        "title": "介系詞誤用（at / on / with 取代 in）",
        "bad": "(X) My brother is interested **at** animals.",
        "ok": "(O) My brother is interested **in** animals.",
        "why": "be interested 的固定搭配就是 in，意思相當於中文的「對……感興趣」，介系詞只能用 in。at 是用在時間或地點（at school、at ten），on 用在表面上或特定主題日期（on the desk），with 是和某人一起。學生常在介系詞選擇題中猶豫，判斷法：這是背下來的固定片語，不需推理，be interested 後面永遠是 in。",
        "exOkText": "(O) Many students are interested **in** English songs.",
        "exOkZh": "許多學生對英文歌曲感興趣。",
        "exBadText": "(X) Many students are interested **on** English songs.",
        "exBadNote": "錯誤：固定片語為 be interested in，介系詞應為 in"
      },
      {
        "title": "be 動詞與主詞不一致（用 are 取代 is）",
        "bad": "(X) My brother **are** interested in animals.",
        "ok": "(O) My brother **is** interested in animals.",
        "why": "本句主詞是 brother（單數），be 動詞必須用 is，不是 are。學生有時看到後面的 animals 是複數，就誤以為整句要用 are。判斷口訣：be 動詞只看它前面最近的那個主詞，My brother 是單數，animals 只是 in 的受詞，不影響 be 動詞的選擇。",
        "exOkText": "(O) My friend **is** interested in drawing.",
        "exOkZh": "我的朋友對畫畫感興趣。",
        "exBadText": "(X) My friend **are** interested in drawing.",
        "exBadNote": "錯誤：主詞 friend 是單數，be 動詞應為 is"
      },
      {
        "title": "字形與發音錯誤（interest 誤寫為 interested）",
        "bad": "(X) My brother is **interest** in animals.",
        "ok": "(O) My brother is **interested** in animals.",
        "why": "主詞 brother 前面有 be 動詞 is，後面要用形容詞，必須寫 interested（-io 結尾，發音 /ɪnstrestɪd/），不能寫原形動詞或名詞 interest。interested 表示「感到興趣的」，後面接介系詞 in；interest 是名詞或動詞原形，後面不能直接接 in。寫作或克漏字測驗常考這個字形，記住 -ed 結尾的 interested。",
        "exOkText": "(O) Tom is **interested** in dinosaurs.",
        "exOkZh": "湯姆對恐龍感興趣。",
        "exBadText": "(X) Tom is **interest** in dinosaurs.",
        "exBadNote": "錯誤：be 動詞後要用形容詞 interested，不能用原形 interest"
      }
    ],
    "traps": [
      "片語完整性陷阱：interested 這個形容詞的 -ed 不能省，也不能單獨使用；會考單字題常在 interested / interesting 之間設陷阱，要分清楚「感到興趣的」和「有趣的」。",
      "介系詞搭配陷阱：interested in / worried about / good at / famous for 這類固定搭配是會考選擇題最愛考的點，介系詞一錯整題就錯。",
      "單複數判斷陷阱：看到後面的 animals 是複數不代表 be 動詞用 are，be 動詞永遠只由前面的主詞 My brother 決定。"
    ],
    "strategy": [
      "背下固定片語：be interested in = 對……感興趣，be good at = 擅長，be famous for = 以……聞名，整組記憶不單獨記單字。",
      "寫作時自我檢查：寫完 interested，立刻確認後面有沒有 in 這個字母，漏掉就立刻補上。",
      "分辨字形：interested（-ed 結尾，形容「感到興趣的」）對 interesting（-ing 結尾，形容「有趣的」事物）。",
      "替換練習：把 animals 換成 sports、music、science，練習同一個句型，強化 interested in 的固定用法。"
    ]
  },
  "The elephant is bigger than the horse.": {
    "zh": "大象比馬大。",
    "ipa": "/ðiː ˈelɪfənt ɪz ˈbɪɡər ðæn ðə hɔːs/",
    "headline": "比較級 big 的 -er 加在 than 前，構成「比……更」的比較",
    "structure": [
      {
        "role": "冠詞",
        "token": "The",
        "pos": "定冠詞 (Definite Article)",
        "func": "用於單數可數名詞前，特指那隻大象，這裡是本句的主詞",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "elephant",
        "pos": "名詞 (Noun) — 單數名詞",
        "func": "比較的主體，表示大象，因為是單數所以 be 動詞用 is",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "與單數主詞 elephant 呼應，連接主詞和比較級部分",
        "mark": "O"
      },
      {
        "role": "比較級",
        "token": "bigger",
        "pos": "形容詞 (Adjective) — big 的比較級",
        "func": "表示「更大的」，是本句的動詞部分，說明大象的大小",
        "mark": "O"
      },
      {
        "role": "連接詞",
        "token": "than",
        "pos": "連接詞 (Conjunction) — 比較級專用連接詞",
        "func": "連接比較級和被比較的對象，意思是「比」，後面接比較基準 the horse",
        "mark": "O"
      },
      {
        "role": "比較對象",
        "token": "the horse",
        "pos": "名詞片語 (Noun Phrase) — 單數名詞 horse",
        "func": "被比較的對象，作為 than 的受詞，horse 是單數，前面加 the 保持對稱",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "比較級字形錯誤（忘記加 -er 或用 more）",
        "bad": "(X) The elephant is **big** than the horse.",
        "ok": "(O) The elephant is **bigger** than the horse.",
        "why": "短形容詞（big、tall、small、short、young、old、fast、cheap 等）要變成比較級時，直接在原字後加 -er；只有長形容詞才用 more 加原級（如 more beautiful）。學生常忘記加 -er，或習慣用 more 而把短形容詞也加上 more。判斷法：big 這種單音節短字，直接加 -er；而且加 -er 之後一定要搭配 than。",
        "exOkText": "(O) My schoolbag is **heavier** than yours.",
        "exOkZh": "我的書包比你的重。",
        "exBadText": "(X) My schoolbag is **more heavy** than yours.",
        "exBadNote": "錯誤：重單音節形容詞直接加 -er，不加 more"
      },
      {
        "title": "比較級與最高級混用（the biggest）",
        "bad": "(X) The elephant is **the biggest** than the horse.",
        "ok": "(O) The elephant is **bigger** than the horse.",
        "why": "bigger 是比較級，表示「比某個東西更」，後面接 than；the biggest 是最高級，表示「三者以上中最」，後面接 in 或 of 範圍（如 the biggest in the zoo），絕對不能和 than 搭配。學生常以為「比」就要加 the，但 the 只能用於最高級。判斷法：看到 than 就是比較級，沒有 than 就是最高級。",
        "exOkText": "(O) An elephant is **taller** than a horse.",
        "exOkZh": "大象比馬高。",
        "exBadText": "(X) An elephant is **the tallest** than a horse.",
        "exBadNote": "錯誤：最高級不能搭配 than，應使用比較級 taller"
      },
      {
        "title": "be 動詞與主詞不一致（用 are 取代 is）",
        "bad": "(X) The elephant **are** bigger than the horse.",
        "ok": "(O) The elephant **is** bigger than the horse.",
        "why": "主詞是 elephant（單數），be 動詞必須用 is。學生有時看到後面的 horse 以為是複數，或忘記 elephant 是單數而誤用 are。判斷口訣：be 動詞只由前面的主詞 The elephant 決定，the horse 只是被比較的對象，不影響 be 動詞。",
        "exOkText": "(O) The tiger **is** stronger than the dog.",
        "exOkZh": "老虎比狗強壯。",
        "exBadText": "(X) The tiger **are** stronger than the dog.",
        "exBadNote": "錯誤：主詞 tiger 是單數，be 動詞應為 is"
      },
      {
        "title": "最高級遺漏 the 或比較級誤用 the",
        "bad": "(X) The elephant is **bigger** the horse. ／ (X) The elephant is **the bigger** than the horse.",
        "ok": "(O) The elephant is **bigger** than the horse.",
        "why": "比較級前面不加 the，後面一定要有 than；最高級前面才需要 the，後面用 in/of 交代範圍。學生常把最高級的「冠詞加在前面」的規則誤套到比較級上，寫出 the bigger than，或干脆漏掉 than 變成 bigger the horse。判斷法：比較級三要素——big 變 bigger、有 than、前面沒有 the。",
        "exOkText": "(O) A cat is **smaller** than a dog.",
        "exOkZh": "貓比狗小。",
        "exBadText": "(X) A cat is **the smaller** than a dog.",
        "exBadNote": "錯誤：比較級前不加 the，且一定要搭配 than"
      }
    ],
    "traps": [
      "比較級搭配陷阱：比較級（bigger）一定搭配 than；最高級（the biggest）搭配 in/of，兩者不能混用，這是會考選擇題最常設的陷阱。",
      "短字元比較級陷阱：big、tall、hot 這類單音節短形容詞要加 -er（bigger、taller、hotter），絕對不能用 more + 原級。",
      "冠詞使用陷阱：the 只能加在最高級前面（the biggest），比較級前不加 the；本句的 the elephant 和 the horse 的 the 是各自名詞的定冠詞，與比較級無關。"
    ],
    "strategy": [
      "記住公式：「主詞 + be + 短形容詞 + er + than + 對象」，例如 The elephant is bigger than the horse，一步到位。",
      "背誦短形容詞比較級清單：big→bigger、tall→taller、hot→hotter、small→smaller、young→younger、fast→faster，看到就自動加 -er。",
      "檢查三要素：加了 -er 嗎？有 than 嗎？前面有多餘的 the 嗎？三項都對才安全。",
      "朗讀整句：The elephant is bigger than the horse.，把重音落在 bigger 和 than 上，用語感輔助記憶比較級的語法結構。"
    ]
  },
  "She has three pets at home.": {
    "zh": "她家裡有三隻寵物。",
    "ipa": "/ʃiː hæz θriː pets ət həʊm/",
    "headline": "三單 has 遇上複數 pets：主詞決定動詞，數詞決定名詞",
    "structure": [
      {
        "role": "主詞",
        "token": "She",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主語，指「她」；因為是第三人稱單數，決定後面的動詞要用 has",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "has",
        "pos": "動詞 (Verb) — have 的第三人稱單數現在式",
        "func": "表示「有、擁有」，是本句的動詞；主詞是 She，所以用 has",
        "mark": "O"
      },
      {
        "role": "數詞",
        "token": "three",
        "pos": "數詞 (Numeral)",
        "func": "表示數量「三」，後面的可數名詞一定要改成複數",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "pets",
        "pos": "名詞 (Noun) — pet 的複數",
        "func": "has 的受詞，表示「寵物」；因為前面是 three（三隻），必須搭配複數 pets",
        "mark": "O"
      },
      {
        "role": "片語",
        "token": "at home",
        "pos": "片語 (Phrase) — home 為副詞性用法",
        "func": "表示「在家裡」，at 是固定介系詞；此處 home 前面不加 the，也不能把 at 換成 in",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數動詞用錯（have 忘記變 has）",
        "bad": "(X) She have three pets at home.",
        "ok": "(O) She has three pets at home.",
        "why": "have 遇到 he、she、it 這類第三人稱單數主詞時，必須變成 has。台灣學生常在口說或快速作答時忘記變化，尤其容易受中文「她有寵物」沒有動詞變化的影響，直接說成 have。判斷法：把主詞換成 I / You / They，動詞就變回 have；換成 He / She / It，動詞一定要變 has。",
        "exOkText": "(O) Lily **has** a dog and two cats.",
        "exOkZh": "莉莉有一隻狗和兩隻貓。",
        "exBadText": "(X) Lily **have** a dog and two cats.",
        "exBadNote": "錯誤：主詞 Lily 是第三人稱單數，have 要變成 has"
      },
      {
        "title": "數詞後面的可數名詞要改成複數",
        "bad": "(X) She has three pet at home.",
        "ok": "(O) She has three pets at home.",
        "why": "數詞 three 本身就表示「三隻」，後面的可數名詞一定要用複數。台灣學生最常忘記加 s，尤其在克漏字測驗中寫成 three pet 就直接丟掉一分。判斷口訣：one 用單數，two、three、many、some 之後全部用複數；看到數字就先決定名詞的形狀。",
        "exOkText": "(O) My uncle **has five bikes** in his garage.",
        "exOkZh": "我叔叔的車庫裡有五輛腳踏車。",
        "exBadText": "(X) My uncle **has five bike** in his garage.",
        "exBadNote": "錯誤：five 之後的可數名詞要用複數 bikes"
      },
      {
        "title": "at home 是固定片語，不能改成 in home",
        "bad": "(X) She has three pets in home. ／ (X) She has three pets at the home.",
        "ok": "(O) She has three pets at home.",
        "why": "「在家裡」固定說 at home，這裡 home 當副詞用，前面不加 the，也不能把 at 換成 in 或 on。台灣學生受中文「在家」直譯影響會寫 in home；另一種常錯是加上定冠詞變 at the home。只有當 home 後面接所有物或特定房子時，才用 in my home、at her home。",
        "exOkText": "(O) My cat stays **at home** on rainy days.",
        "exOkZh": "下雨天我的貓都待在家裡。",
        "exBadText": "(X) My cat stays **in home** on rainy days.",
        "exBadNote": "錯誤：「在家裡」是 at home，不能用 in home"
      },
      {
        "title": "數詞與名詞之間不插 of（three of pets）",
        "bad": "(X) She has three of pets at home.",
        "ok": "(O) She has three pets at home. ／ (O) She has three of her pets at home.",
        "why": "「數詞 + 複數名詞」要直接相鄰，中間不需要加 of。學生有時誤以為 of 是「所有的」而把它插進去，寫成 three of pets。of 只能出現在「數詞 of 所有格或名詞」之間，表示其中幾個，例如 three of her pets（三隻她的寵物）。",
        "exOkText": "(O) She has **three of her pets** at home.",
        "exOkZh": "她家裡有她的三隻寵物。",
        "exBadText": "(X) She has **three of pets** at home.",
        "exBadNote": "錯誤：of 後面要有「所有物或名詞」才有作用，不能直接接 pets"
      }
    ],
    "traps": [
      "三單 vs 複數陷阱：題組常把 She has ... 與 They have ... 放在一起考，答題前先圈主詞，再決定 has 或 have。",
      "數詞 + 名詞陷阱：three pets、two cats、many books 一律用複數，選填題常在 pet 與 pets 之間設選項。",
      "at home 陷阱：閱讀測驗會出現 in the home、at my house 的變體，看 home 前有無所有格或 the，就能決定用 in 還是 at。"
    ],
    "strategy": [
      "寫作時先圈主詞：看到 She / He / It 就立刻把 have 改寫成 has，確認後再往下寫。",
      "數字與名詞綁在一起：three 一出現，馬上補上 pets，養成「數字一出、名詞就變複數」的習慣。",
      "把 at home 當成單一單位背下來，寫作時不要隨意加 the，也不要臨時替換介系詞。",
      "大聲朗讀正確句兩次（She has three pets at home.），用嘴感受 has 尾音的 /z/，比只看字更容易記住。"
    ]
  },
  "These animals are endangered.": {
    "zh": "這些動物是瀕危的。",
    "ipa": "/ðiːz ˈænɪ.məlz ɑːr ɪnˈdaʒəd/",
    "headline": "These、animals、are 呼應同一個複數，endangered 是 be 後面的表語",
    "structure": [
      {
        "role": "指示代名詞",
        "token": "These",
        "pos": "代名詞 (Pronoun) — 指示代詞的複數形",
        "func": "指「這些」，是本句的主詞；因為是複數，後面的 be 動詞必須用 are",
        "mark": "O"
      },
      {
        "role": "主詞中心詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "與 These 呼應的複數名詞，說明「這些」是哪些東西",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "are",
        "pos": "動詞 (Verb) — be 動詞的複數現在式",
        "func": "和主詞呼應，表示「是」，後面接受詞或表語",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "endangered",
        "pos": "形容詞 (Adjective)",
        "func": "be 動詞後的表語，表示「瀕危的、面臨滅絕的」；雖以 -ed 結尾，但這裡是形容詞而不是動詞過去式",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "指示代名詞與 be 動詞不一致（is / are）",
        "bad": "(X) These animals is endangered.",
        "ok": "(O) These animals are endangered.",
        "why": "These 是複數指示代詞，be 動詞就要用 are；is 只能配單數主詞，例如 This animal is endangered.。台灣學生常因中文沒有單複數變化而不加區分。口訣：主詞是 these / they / those 或可數名詞複數就用 are；看到 this / it / a 開頭的單數才用 is。",
        "exOkText": "(O) **These tigers are** endangered.",
        "exOkZh": "這些老虎是瀕危的。",
        "exBadText": "(X) **These tigers is** endangered.",
        "exBadNote": "錯誤：These 是複數指示代詞，be 動詞要用 are"
      },
      {
        "title": "be 動詞後誤用動詞：endangered 當成動作",
        "bad": "(X) These animals are endanger. ／ (X) These animals are endangering.",
        "ok": "(O) These animals are endangered.",
        "why": "are 後面要接「說明狀態的」形容詞，endangered 在這裡就是形容詞。學生常把它誤當成 protect 的動詞變化，寫成 are endanger 或 are endangering。分辨法：能直接放在 be 動詞後面當表語的就是形容詞；endangering 是「使……瀕危」的動作語意，意思完全不同。",
        "exOkText": "(O) Many sea turtles **are endangered** now.",
        "exOkZh": "現在許多海龜都瀕臨滅絕。",
        "exBadText": "(X) Many sea turtles **are endangering** now.",
        "exBadNote": "錯誤：are 後面要接形容詞 endangered，不能用動詞 endangering"
      },
      {
        "title": "endangered 與 dangerous 詞義混淆",
        "bad": "(X) These animals are dangerous.",
        "ok": "(O) These animals are endangered.",
        "why": "endangered 是「瀕臨滅絕的」，是一種需要被保護的狀態；dangerous 是「危險的」，泛指會造成危險。老虎確實也可能 dangerous，但題目要考的是「瀕危物種」這個生態概念，所以要選 endangered。看到保護動物、生態保育的題幹，就往 endangered 想。",
        "exOkText": "(O) Pangolins **are endangered** in many countries.",
        "exOkZh": "穿山甲在許多國家都瀕臨滅絕。",
        "exBadText": "(X) Pangolins **are dangerous** in many countries.",
        "exBadNote": "錯誤：語意是「瀕危」而非「危險」，應選 endangered"
      },
      {
        "title": "形容詞不能加 in：in endangered 應為 in danger",
        "bad": "(X) These animals are in endangered.",
        "ok": "(O) These animals are endangered. ／ (O) These animals are in danger.",
        "why": "endangered 是形容詞，不能像名詞一樣組成 are in endangered。學生看到 are 就反射式加 in，結果造出錯的片語。表達「處於危險中」要用名詞片語 are in danger；表達「是瀕危的」就直接用 are endangered。兩者擇一，不能混著寫。",
        "exOkText": "(O) Small fish **are in danger** in the ocean.",
        "exOkZh": "小魚在海洋中有危險。",
        "exBadText": "(X) Small fish **are in endangered** in the ocean.",
        "exBadNote": "錯誤：in 後面要接名詞 danger，形容詞 endangered 不能放在 in 之後"
      }
    ],
    "traps": [
      "is / are 呼應陷阱：閱讀題常把 these 改成 this，句子其他字不變，考生必須立刻重新判斷 be 動詞。",
      "詞義陷阱：dangerous、endangered、in danger 三種說法聽起來相近，但考的是「瀕危物種」還是「有危險」。",
      "字尾陷阱：-ed 結尾不一定就是動詞過去式，are 後面要填能當表語、描述狀態的字。"
    ],
    "strategy": [
      "讀題時先圈主詞：These / This 畫起來，決定 is 或 are，再繼續往下作答。",
      "背下 endangered 就能連到三種用法：be endangered、in danger、endangered species（瀕危物種）。",
      "用中文檢查語意：讀完問自己「這些動物是『會傷人』還是『快要消失』？」後者才是瀕危。",
      "練習 be 動詞 + 形容詞的框架：are endangered、are dangerous、are cute，形容詞換著填，句型就熟了。"
    ]
  },
  "We should protect animals.": {
    "zh": "我們應該保護動物。",
    "ipa": "/wiː ʃʊd prəˈtekt ˈænɪ.məlz/",
    "headline": "should 一出現，後面就鎖死動詞原形 protect",
    "structure": [
      {
        "role": "主詞",
        "token": "We",
        "pos": "代名詞 (Pronoun) — 人稱代詞的複數形",
        "func": "句子的主語，指「我們」；是複數，但本句沒有 be 動詞",
        "mark": "O"
      },
      {
        "role": "情態動詞",
        "token": "should",
        "pos": "情態動詞 (Modal Verb)",
        "func": "表示「應該」，後面一定要接動詞原形，是本句的動詞核心",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "protect",
        "pos": "動詞 (Verb) — 原形",
        "func": "及物動詞，意思是「保護」，後面接受詞；不加 s、不加 -ed、不加 -ing",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "protect 的受詞；這裡泛指「動物」整體，用複數表示",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "should 後面沒有接動詞原形",
        "bad": "(X) We should protects animals. ／ (X) We should to protect animals.",
        "ok": "(O) We should protect animals.",
        "why": "情態動詞 can、should、must、will 後面一律接動詞原形，不加 s、不加 -ed、不加 -ing，也不加 to。台灣學生最常犯兩種：受中文「應該要」影響而多寫 to；看到 protect 好像當主詞就自己加了 s。寫完 should 先停一秒，確認下一個字是原形再往下寫。",
        "exOkText": "(O) Students **should protect** wild birds.",
        "exOkZh": "學生應該保護野生鳥類。",
        "exBadText": "(X) Students **should protects** wild birds.",
        "exBadNote": "錯誤：should 後面要接動詞原形 protect，不加 s"
      },
      {
        "title": "protect 不可隨意加字尾（protector / protecter）",
        "bad": "(X) We should protectors animals.",
        "ok": "(O) We should protect animals.",
        "why": "protect 在這裡是動詞，不能加 -er、-or 變成名詞或比較級。加了字尾之後，句子結構就變成「名詞 + 名詞」，讀起來完全不通。判斷法：看後面有沒有受詞 animals；有受詞的這個字就是動詞，必須維持原形，而且前面已經有 should，再變形一定錯。",
        "exOkText": "(O) We should **protect** endangered animals.",
        "exOkZh": "我們應該保護瀕危動物。",
        "exBadText": "(X) We should **protector** endangered animals.",
        "exBadNote": "錯誤：protect 是動詞，不能加 -or 變成名詞"
      },
      {
        "title": "泛指「動物」時漏加複數 s",
        "bad": "(X) We should protect animal.",
        "ok": "(O) We should protect animals.",
        "why": "中文「動物」沒有單複數變化，但英文 animal 是可數名詞，泛指「動物」整體時要用複數 animals。台灣學生常受中文影響漏掉 s，尤其在限字數的短答或寫作裡。記住：中文沒有 s 的地方英文常常要加；保護動物這類環保句子裡，animals 幾乎一定出現。",
        "exOkText": "(O) Farmers should take care of **animals**.",
        "exOkZh": "農夫應該照顧動物。",
        "exBadText": "(X) Farmers should take care of **animal**.",
        "exBadNote": "錯誤：泛指動物整體時要用複數 animals"
      },
      {
        "title": "should 與 must 語氣混淆（中文「應該」的對應）",
        "bad": "(X) We must protect animals. （把中文的「應該」直接翻成 must）",
        "ok": "(O) We should protect animals.",
        "why": "should 是「應該、最好」，屬於建議；must 是「必須」，屬於強制命令。題目中文寫「應該」時，英文答案要用 should；中文寫「必須、一定要」才用 must。這種語氣對應錯誤在翻譯與閱讀題很常見，務必把中文提示詞和英文情態動詞一對一配好，反過來看到 must 先確認中文是不是「必須」。",
        "exOkText": "(O) We **should** use less plastic every day.",
        "exOkZh": "我們每天應該少用塑膠。",
        "exBadText": "(X) We **should** — 我們必須用塑膠，句中用 must 才是「必須」",
        "exBadNote": "錯誤：中文若寫「必須」，英文才用 must；寫「應該」要用 should"
      }
    ],
    "traps": [
      "情態動詞後的陷阱：選擇題常在 protects / protecting / to protect 之間設選項，記住一律選原形。",
      "字尾陷阱：protect 本身已以 -ct 結尾，學生容易誤以為還要再加字尾；這裡完全不需要變化。",
      "翻譯陷阱：中文「應該」對應 should、「必須」對應 must，照著中文的語氣強度選，不要憑感覺。"
    ],
    "strategy": [
      "寫作時先寫 We should，暫停，再寫 protect——兩個詞之間絕對不插入 to 或 -s。",
      "用四格公式套句子：主詞 + 情態動詞 + 動詞原形 + 受詞，例如 We should protect animals.",
      "複數把關：寫完名詞順手檢查前面有沒有 one / three / many，或中文的「各種、所有」，再決定單複數。",
      "把 should 與 must 各寫三個例句對照（We should save water. / We must wear a helmet.），把語氣差異記成身體記憶。"
    ]
  },
  "Do not feed the animals.": {
    "zh": "不要餵食動物。",
    "ipa": "/duː nəʊt fiːd ðiː ˈænɪ.məlz/",
    "headline": "否定祈使句的固定語序：Do not + 動詞原形 + the + 複數名詞",
    "structure": [
      {
        "role": "助動詞",
        "token": "Do",
        "pos": "助動詞 (Auxiliary)",
        "func": "和 not 搭配形成否定祈使句「不要」，本身不帶主要語意",
        "mark": "O"
      },
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定詞 (Participle)",
        "func": "緊跟在助動詞 Do 之後，構成 do not（口語可縮寫為 Don't）",
        "mark": "O"
      },
      {
        "role": "主要動詞",
        "token": "feed",
        "pos": "動詞 (Verb) — 原形",
        "func": "意思是「餵食」，被 Do not 否定後仍維持原形，不加 s、不加 -ing",
        "mark": "O"
      },
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "限定詞 (Determiner)",
        "func": "特指前面提過的那一群動物，這個位置不可省略",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "feed 的受詞，指園內那群動物，與 the 搭配使用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "Do not 後面沒有接動詞原形",
        "bad": "(X) Do not feeds the animals. ／ (X) Do not feeding the animals.",
        "ok": "(O) Do not feed the animals.",
        "why": "Do not 已經把這句變成否定態，後面的動詞就必須回到原形，不能加 s 也不能加 -ing。台灣學生常受一般句型影響，看到 animals 是複數就順手把動詞也變成 feeds。判斷法：把 not 拿掉後唸一次（Feed the animals.），如果能成立，那個字就是原形。",
        "exOkText": "(O) **Do not feed** the animals at the zoo.",
        "exOkZh": "在動物園裡不要餵食動物。",
        "exBadText": "(X) **Do not feeds** the animals at the zoo.",
        "exBadNote": "錯誤：Do not 後面要接動詞原形 feed，不加 s"
      },
      {
        "title": "feed 與 food 詞性混淆",
        "bad": "(X) Do not food the animals.",
        "ok": "(O) Do not feed the animals.",
        "why": "feed 是動詞「餵食」，food 是名詞「食物」，兩個字只差一個字母，學生常在背單字或打字時混用。分辨法：後面跟著受詞 the animals 時，那個字就是動詞，只能是 feed；food 是名詞，不能作祈使句的主要動詞，也不能直接帶受詞。",
        "exOkText": "(O) Please **feed** the birds in the park.",
        "exOkZh": "請餵食公園裡的鳥。",
        "exBadText": "(X) Please **food** the birds in the park.",
        "exBadNote": "錯誤：food 是名詞「食物」，這裡要用動詞 feed"
      },
      {
        "title": "定冠詞 the 不可漏掉",
        "bad": "(X) Do not feed animals.",
        "ok": "(O) Do not feed the animals.",
        "why": "這裡的 the 負責特指「（前面提過的）那些動物」，不是泛指所有動物。台灣學生常覺得動物是複數就不需要 the，但英文裡複數名詞前面一樣可以用 the。判斷法：句中若已經出現過動物園或動物這個對象，the 就是在回指前面那一群，不能省。",
        "exOkText": "(O) The animals are hungry. **Do not feed** them now.",
        "exOkZh": "動物們很餓，現在不要餵食牠們。",
        "exBadText": "(X) The animals are hungry. **Do not feed** animals now.",
        "exBadNote": "錯誤：這裡的 animals 是特指前面提到的那群，前面要加 the"
      },
      {
        "title": "否定詞位置放錯（Feed don't the animals）",
        "bad": "(X) Feed don't the animals. ／ (X) Feed not the animals.",
        "ok": "(O) Do not feed the animals. ／ (O) Don't feed the animals.",
        "why": "否定句的固定語序是「助動詞 + not + 主要動詞」，助動詞一定站在最前面。這是中文直譯「餵食不要動物」造成的高發錯誤。考試中若改用縮寫 Don't，也要讓 Don't 在句首，後面再接原形動詞，絕對不能寫成 Feed don't the animals.",
        "exOkText": "(O) **Don't feed** the animals bread.",
        "exOkZh": "不要拿麵包餵動物。",
        "exBadText": "(X) **Feed don't** the animals bread.",
        "exBadNote": "錯誤：助動詞與 not 必須放在句首，語序不可對調"
      }
    ],
    "traps": [
      "祈使句否定陷阱：句子改寫題常把 feed 換成 feeds 或 feeding，只有原形能通過。",
      "feed / food 打字陷阱：兩字只差一格鍵盤，選擇題或連字題常故意設計相似選項。",
      "冠詞陷阱：單複數名詞前面都可以有 the（the animal、the animals），看到 the 就不要隨意改動名詞。"
    ],
    "strategy": [
      "背口訣「Do not 一放，動詞回原形」：只要看到句首 Do not 或 Don't，下一個字就檢查有沒有多 s 或 -ing。",
      "寫完否定句做「翻回肯定」練習：把 Do not 刪掉，讀剩下的 Feed the animals.，確認能成立。",
      "feed 與 food 成對記憶：feed 是「餵（動詞）」、food 是「食物（名詞）」，一次記兩個方向。",
      "縮寫與完整式都練：Don't feed the animals.（口語）與 Do not feed the animals.（寫作）各寫一次，考試看題目要求選。"
    ]
  },
  "The zoo is closed every Monday.": {
    "zh": "動物園每週一休館。",
    "ipa": "/ðə zuː ɪz kləʊzd ˈevri ˈmʌndeɪ/",
    "headline": "is closed 描述狀態，every 後面的 Monday 是單數且要大寫",
    "structure": [
      {
        "role": "定冠詞",
        "token": "The",
        "pos": "限定詞 (Determiner)",
        "func": "特指某一個特定的動物園，是主詞 the zoo 的一部分",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "zoo",
        "pos": "名詞 (Noun)",
        "func": "句子的主語中心詞，指「動物園」；單數，所以 be 動詞用 is",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞第三人稱單數",
        "func": "和單數主詞 the zoo 呼應，表示「是」，引出後面的狀態描述",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "closed",
        "pos": "形容詞 (Adjective) — close 的過去分詞",
        "func": "be 動詞後的表語，表示「關著的、休館的」這種持續狀態，不是「正在關門」的動作",
        "mark": "O"
      },
      {
        "role": "時間狀語",
        "token": "every Monday",
        "pos": "片語 (Phrase) — 不定數量詞片語",
        "func": "表示頻率「每週一」；every 後面的名詞用單數，而且星期名稱首字母要大寫",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "星期名稱沒有大寫",
        "bad": "(X) The zoo is closed every monday.",
        "ok": "(O) The zoo is closed every Monday.",
        "why": "星期的第一個字母一定要大寫，例如 Monday、Friday，這是英文的固定拼寫規則。會考的填空題與改錯題常專門檢查這一點。台灣學生用注音符號或中文思考，習慣全部小寫或隨手打字，就會漏掉大寫。寫完星期名稱後回頭檢查第一個字母即可。",
        "exOkText": "(O) The library is open **every Sunday**.",
        "exOkZh": "圖書館每週日都開放。",
        "exBadText": "(X) The library is open **every sunday**.",
        "exBadNote": "錯誤：星期名稱首字母要大寫，應為 Sunday"
      },
      {
        "title": "every 後面加了複數 s",
        "bad": "(X) The zoo is closed every Mondays.",
        "ok": "(O) The zoo is closed every Monday.",
        "why": "every 是「每一個」，後面必須接單數名詞，不能加 s，也不能加 a。台灣學生常受「每個星期一＝所有星期一」的語感影響，寫成 every Mondays。口訣：every、each、one of 這三個字後面一定都是單數名詞，選項裡只要出現複數形就可以直接排除。",
        "exOkText": "(O) The zoo is closed **every Monday** in summer.",
        "exOkZh": "動物園夏天每週一都休館。",
        "exBadText": "(X) The zoo is closed **every Mondays** in summer.",
        "exBadNote": "錯誤：every 後面的名詞用單數 Monday，不加 s"
      },
      {
        "title": "狀態與動作混淆（is closed 寫成 is closing）",
        "bad": "(X) The zoo is closing every Monday.",
        "ok": "(O) The zoo is closed every Monday.",
        "why": "is closed 描述的是「（每週一）都處於休館狀態」；is closing 是現在進行式，意思是「現在正在關門」，語意完全不同，也無法表達每週反覆的固定狀態。分辨法：休館時間是固定的事實就用 be + 過去分詞；正在做的動作才用 be + -ing。",
        "exOkText": "(O) The museum **is closed** every Monday evening.",
        "exOkZh": "博物館每週一晚上都休館。",
        "exBadText": "(X) The museum **is closing** every Monday evening.",
        "exBadNote": "錯誤：is closing 是「正在關門」，表達固定休館要用 is closed"
      },
      {
        "title": "be 動詞被省略（closed 前少了 is）",
        "bad": "(X) The zoo closed every Monday.",
        "ok": "(O) The zoo is closed every Monday.",
        "why": "closed 在這裡是形容詞，必須靠 be 動詞 is 構成句子的謂語。直接寫 The zoo closed every Monday. 會變成「動物園（過去）關門了」的動作句，語意與原句不同。台灣學生常以為「關閉」本身就是動詞而漏掉 be。檢查法：把 closed 前面的字圈起來，確認有沒有 be 動詞。",
        "exOkText": "(O) The park **is closed** every Monday.",
        "exOkZh": "公園每週一都關閉。",
        "exBadText": "(X) The park **closed** every Monday.",
        "exBadNote": "錯誤：closed 是過去分詞當表語，前面必須有 be 動詞 is"
      }
    ],
    "traps": [
      "星期與月份大小寫陷阱：Monday、May、June 在句中一定要大寫，改錯題專門考這一點。",
      "every 陷阱：every Monday 不加 s；相對的 each Monday 也不加 s，別和 every other Monday（每隔一週）混淆。",
      "狀態片語陷阱：be closed（休館）、be open（營業）都用 be + 過去分詞，不要寫成 be closing / be opening。"
    ],
    "strategy": [
      "寫完星期名稱就檢查首字母大小寫，把 Monday 到 Sunday 七個字背熟並全部大寫。",
      "看到 every 就提醒自己：後面單數、沒有 a、也不加 -s。",
      "背三個公共場所常用句型：The zoo is closed every Monday. / The library is open on Sunday. / The museum is closed today.",
      "分清楚 be closed 與 be closing，練習時用中文問自己「是『關著』還是『正在關』」。"
    ]
  }
};
