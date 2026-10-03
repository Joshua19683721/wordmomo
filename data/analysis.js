// data/analysis.js — 「解析這一句」的深度解析庫（所有裝置共用）
//
// key 必須和句庫 data/sentences.js 裡的英文「完全一致」（含標點、單複數、大小寫）
//
// 每筆的格式：
//   {
//     zh / ipa / intro / headline
//     structure : [ { role, token, pos, func, mark } ]     一、句子結構與詞性對照表
//     mistakes  : [ { title, bad, ok, why, exOkText, exOkZh, exBadText, exBadNote } ]
//                                                          二、學生常犯常見錯誤版本與解析（每句 4 類）
//     traps     : [ ... ]                                三、國中教育會考陷阱提醒
//     strategy  : [ ... ]                                四、會考實戰建議
//   }
//
// 撰寫規格見 docs/analysis-prompt.md（產生用 prompt）。
// App 會自動為英文句加上 (O)/(X) 上色；**雙星號** 會轉成粗體。
// 句庫裡沒有對應 key 的句子，App 會改用自動產生的自我檢查提示。

window.SENTENCE_ANALYSIS = {
  "student": {
    "zh": "學生",
    "ipa": "ˈstuː.dənt",
    "intro": "針對您提供的單字 **student**，這是一個可數單數名詞，本身不是完整句子，但可以單獨當主詞（The student is late.）。它是整條「單字 → 片語 → 句子」鏈的起點，後面的 students、students who are exercising 都由它延伸而來。最該注意的方向是：單數可數名詞單獨使用時，前面一定要有 a／an／the 或 one，否則就是漏了冠詞。",
    "headline": "可數單數名詞，前面要有 a／an／the",
    "structure": [
      {
        "role": "詞本體",
        "token": "student",
        "pos": "名詞 (Noun) — 可數單數",
        "func": "指「一位學生」，是本單字的最小單位；放進句子時首字母要大寫，單獨當主詞前要有冠詞",
        "mark": "O"
      },
      {
        "role": "泛指用法",
        "token": "a student",
        "pos": "冠詞 (Article) + 名詞",
        "func": "第一次提到、泛指任何一位學生時，單數可數名詞前面一定要加 a",
        "mark": "O"
      },
      {
        "role": "特指用法",
        "token": "the student",
        "pos": "定冠詞 (Definite Article) + 名詞",
        "func": "指特定的某位學生（前面提過或雙方都知道是誰），用 the",
        "mark": "O"
      },
      {
        "role": "字尾發音",
        "token": "-ent",
        "pos": "字尾 (Suffix)",
        "func": "結尾 -ent 讀輕短的 /ənt/，最後的 t 只做輕音、不上捲，不可讀成 /dəɹnt/ 或吞掉不發",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼寫錯誤（字母順序錯亂、漏字母）",
        "bad": "(X) She is a **studnet**. ／ (X) She is a **studint**.",
        "ok": "(O) She is a **student**.",
        "why": "student 的拼字是 s-t-u-d-e-n-t，七個字母一個都不能少、也不能互換。台灣學生最常見的錯法有兩種：一種把 en 打成 net 變成 studnet，一種把 d 後面的 e 漏掉變成 studint。拼錯的單字在會考完成測驗會直接判錯，連句子看懂也救不了。判斷法：把單字拆成 stu + den + t 三塊唸一次（den 就是「商店」），是最不容易寫錯的記法。",
        "exOkText": "(O) Every **student** must bring his ID card.",
        "exOkZh": "每位學生都必須帶身分證。",
        "exBadText": "(X) Every **studnet** must bring his ID card.",
        "exBadNote": "錯誤：字母順序錯亂，應為 student"
      },
      {
        "title": "漏掉冠詞（可數單數名詞不能「裸奔」）",
        "bad": "(X) She is **student**. ／ (X) He wants to be **student**.",
        "ok": "(O) She is **a student**.",
        "why": "student 是可數單數名詞，放進句子裡前面一定要有 a、an、the 或 one，不能光禿禿地直接出現。這是中文母語者最典型的英文錯誤，因為中文說「他是學生」完全不需要冠詞，看到中文直譯就會忘記。判斷法：寫完一句後檢查每個單數可數名詞，如果它的前面是句首、動詞或介詞，卻沒有 a／an／the／one，就是漏寫冠詞，立刻補上。",
        "exOkText": "(O) Tom is **a student** from Tainan.",
        "exOkZh": "Tom 是一位來自台南的學生。",
        "exBadText": "(X) Tom is **student** from Tainan.",
        "exBadNote": "錯誤：單數可數名詞 student 前面漏了冠詞 a"
      },
      {
        "title": "字尾發音錯誤（-ent 的 /t/ 漏掉或多捲舌）",
        "bad": "(X) **studen** ／ (X) **studernt**",
        "ok": "(O) **student** — /ˈstuː.dənt/",
        "why": "student 的重音在第一音節 /ˈstuː/，後半段是輕短的 /dənt/，最後那個 t 只做輕音、不上捲、也不加重。台灣學生常唸成 /ˈstuː.dəɹnt/（多捲一個 r），或是乾脆把 t 吞掉變成「studen」，一聽到就很像別的單字。判斷法：凡單字結尾是 -ent，t 一律輕輕帶過、嘴巴不捲，唸起來要短促；把 t 唸成重音反而會被當成別的字。",
        "exOkText": "(O) Our **students** are young and active.",
        "exOkZh": "我們的學生既年輕又活潑。",
        "exBadText": "(X) The **studen** in the photo is my brother.",
        "exBadNote": "錯誤：漏掉字尾 -ent 最後的 /t/ 音"
      },
      {
        "title": "詞義混淆（student 與 study 混用）",
        "bad": "(X) She **students** every evening. ／ (X) He is good at **student**.",
        "ok": "(O) She **studies** every evening. ／ (O) He is good at **studying**.",
        "why": "student 是名詞「學生」，study 是動詞「學習」，兩個單字只差三個字母，意思卻完全不同。台灣學生常把 student 當動詞用（She students…），或在 good at、enjoy 後面接名詞。判斷法：student 只能站在「冠詞、形容詞、介詞」的位置當名詞，永遠不會自己變動詞；一旦要用「學習」這個動作，請改用 study 或 studying，動詞加 s 才是 studies。",
        "exOkText": "(O) Every **student** in our class works hard.",
        "exOkZh": "我們班每位學生都很努力。",
        "exBadText": "(X) He is good at **student**.",
        "exBadNote": "錯誤：student 是名詞，不能用在 good at 後面接動作"
      }
    ],
    "traps": [
      "**關鍵字陷阱：a 開頭的單字**：會考選項常把 a student 寫成 a students，或在兩個以上學生時仍用 a；單數用 a students 這種寫法一律錯，複數前面不再加 a。",
      "**關鍵字陷阱：單複數的 be 動詞**：看到 a student 配 is，看到 students 配 are；只要主詞變成複數，is 一定要改成 are，這是單選題最常設的陷阱。",
      "**關鍵字陷阱：中文沒有冠詞**：看到「是學生」「買了一隻狗」這類中文直譯，英文就要警覺要補 a／an／the，漏冠詞是國中英文最常被扣分的地方。",
      "**關鍵字陷阱：student 與 study**：字面只差幾個字母，但一個是名詞、一個是動詞，題目常用這種形近字混淆來考你。"
    ],
    "strategy": [
      "把單字拆塊記：student 記成 stu + den + t，寫的時候一塊一塊寫，出錯率最低。",
      "寫完句子做「冠詞掃描」：由左到右檢查每一個單數可數名詞，前面一定要有 a／an／the／one。",
      "單字配例句一起背：不要只背中文意思，把 a student、the student、good student 三個搭配一起背，詞性自然就分得清。",
      "分清兩組相似字：student（學生，名詞）對 study（學習，動詞），成對記憶最不容易混。"
    ]
  },
  "students": {
    "zh": "學生們",
    "ipa": "ˈstuː.dənts",
    "intro": "針對您提供的單字 **students**，這是 student 的複數形式，本身不是完整句子，但常常當主詞使用。它是這條片語鏈中「人數」概念的起點，後面 all of the students、students who are exercising 都以它為核心。最該注意的方向有兩個：複數的 -s 不能漏，以及主詞變成複數後 be 動詞一定要跟著變成 are。",
    "headline": "複數加 -s，be 動詞要用 are",
    "structure": [
      {
        "role": "詞本體",
        "token": "students",
        "pos": "名詞 (Noun) — 可數複數",
        "func": "指兩位以上的學生，是後面 all of the students 等片語的主體",
        "mark": "O"
      },
      {
        "role": "複數變化",
        "token": "-s",
        "pos": "字尾 (Suffix)",
        "func": "student 是規則名詞，複數直接加 -s；唸成 /ts/，要重讀不能拖音",
        "mark": "O"
      },
      {
        "role": "限定詞搭配",
        "token": "the students",
        "pos": "定冠詞 (Definite Article) + 名詞",
        "func": "指雙方都知道的某一群學生，用 the",
        "mark": "O"
      },
      {
        "role": "動詞搭配",
        "token": "are",
        "pos": "動詞 (Verb) — be 動詞複數",
        "func": "複數主詞後面的 be 動詞一定要用 are，不能用 is",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數漏加 -s（單複數沒對上）",
        "bad": "(X) All of the **student** are in the classroom. ／ (X) Two **student** are late today.",
        "ok": "(O) All of the **students** are in the classroom.",
        "why": "students 是 student 加 -s 形成的複數，凡是兩位以上的人或物，就一定要把 -s 寫出來。台灣學生最常忘記的是「有兩個以上」的情況，因為中文的「學生們」在口頭上常常省略。判斷法：只要看到 two、three、many、all of the 這些詞，後面的可數名詞就一定要變複數；同時複數名詞後面的 be 動詞也要一起改成 are。",
        "exOkText": "(O) All the **students** are ready for the test.",
        "exOkZh": "所有學生都準備好考試了。",
        "exBadText": "(X) All the **student** is ready for the test.",
        "exBadNote": "錯誤：主詞是複數，應寫 students 且 be 動詞要用 are"
      },
      {
        "title": "複數拼寫錯誤（多打或少打字母）",
        "bad": "(X) The **studnets** are late. ／ (X) The **studens** are waiting outside.",
        "ok": "(O) The **students** are late.",
        "why": "複數只是加一個 s，原本的七個字母一個都不能變動。台灣學生最常見的錯法是重複字母（studnets，多打了 n）與吞掉 t（studens），這在限時作答時特別常發生。判斷法：複數寫完後把 s 暫時遮住，檢查剩下的部分是否剛好等於原單字 student，兩邊對得起就沒錯。",
        "exOkText": "(O) Our **students** practice English every day.",
        "exOkZh": "我們的學生每天練習英文。",
        "exBadText": "(X) Our **studens** practice English every day.",
        "exBadNote": "錯誤：複數漏字母，應為 students"
      },
      {
        "title": "主詞與 be 動詞不一致（is / are 誤用）",
        "bad": "(X) The **students is** playing basketball. ／ (X) My **students are** on the way.",
        "ok": "(O) The **students are** playing basketball.",
        "why": "be 動詞要跟主詞的數配合：單數用 is，複數用 are。students 是複數，所以一定配 are。台灣學生常受中文「學生們正在打球」一句沒有動詞變化的影響，憑語感直接寫 is。判斷法：寫 be 動詞前先問「主詞是一個還是一堆？」一個寫 is，兩個以上寫 are；改主詞複數時，務必記得連 be 動詞一起改。",
        "exOkText": "(O) The **students are** good at sports.",
        "exOkZh": "這些學生很擅長運動。",
        "exBadText": "(X) The **students is** good at sports.",
        "exBadNote": "錯誤：主詞 students 是複數，be 動詞應為 are"
      },
      {
        "title": "數量詞搭配錯誤（many / much 混用）",
        "bad": "(X) There are **much students** in the gym. ／ (X) I have **much students** here.",
        "ok": "(O) There are **many students** in the gym.",
        "why": "many 專門修飾可數名詞的複數，much 專門修飾不可數名詞。students 是可數複數，所以前面只能用 many。台灣學生常因中文「很多學生」和「很多水」翻譯起來一模一樣而全部用 much。判斷法：先看後面名詞可不可以數（兩個、幾個）：可以數就用 many、a lot of、a few，不能數才用 much。",
        "exOkText": "(O) **Many students** joined the English club.",
        "exOkZh": "許多學生加入了英文社。",
        "exBadText": "(X) **Much students** joined the English club.",
        "exBadNote": "錯誤：much 只能修飾不可數名詞，複數要用 many"
      }
    ],
    "traps": [
      "**關鍵字陷阱：all of the + 複數**：all of the students 表示「所有的學生」，後面一定接複數，並且整個片語當主詞時，be 動詞用 are。",
      "**關鍵字陷阱：a + 複數**：a students 這種寫法絕對不對；「一個學生」用 a student，「學生們」用 students 或 all of the students。",
      "**關鍵字陷阱：複數的 -s 發音**：students 唸成 /ˈstuː.dənts/，尾音 /ts/ 要清楚唸出，不可拖成中文的輕聲。",
      "**關鍵字陷阱：主詞改了、be 動詞沒改**：選項常故意把 students 配 is 來誘騙，複數主詞配 is 一律錯。"
    ],
    "strategy": [
      "複數 -s 自我檢查：寫完句子數一下主詞有幾個，只要超過一個，馬上檢查名詞有沒有 s。",
      "be 動詞跟著主詞走：改主詞單複數時，把 is／are 也一起改，不要分兩次寫。",
      "數量詞配對練習：把 many / much、a few / a little 整理成一組，背名詞可數不可數一起記。",
      "片語提前熟悉：把 all of the students、the students who are exercising 當作單一整體背誦，聽到就能整組反應。"
    ]
  },
  "exercising": {
    "zh": "正在運動",
    "ipa": "ˈek.sɚ.saɪ.zɪŋ",
    "intro": "針對您提供的單字 **exercising**，這是動詞 exercise 的現在分詞（-ing 形式），本身不是完整句子，放在句中時前面一定要有 be 動詞。它是這條鏈中「動作正在進行」的關鍵訊號，也是判斷整句時態的依據。最該注意的方向是：-ing 不能單獨當動詞用，前面必須配 is／am／are／was／were，而且拼字時 e 不能亂刪。",
    "headline": "-ing 進行式，前面一定要配 be 動詞",
    "structure": [
      {
        "role": "詞本體",
        "token": "exercising",
        "pos": "動詞 (Verb) — exercise 的現在分詞",
        "func": "表示「正在做的動作」，本身不能獨立當句子的動詞，前面要有 be 動詞",
        "mark": "O"
      },
      {
        "role": "進行式結構",
        "token": "be + exercising",
        "pos": "動詞片語 (Verb Phrase) — be 動詞 + 現在分詞",
        "func": "構成現在或過去的進行式，be 動詞隨人稱與時態變化",
        "mark": "O"
      },
      {
        "role": "字尾變化",
        "token": "exercise → exercising",
        "pos": "字形變化 (Word Form)",
        "func": "exercise 的重音在 sɚ，不是重音結尾，加 -ing 時保留 e，不能寫成 exercing",
        "mark": "O"
      },
      {
        "role": "動名詞用法",
        "token": "Exercising is good for you.",
        "pos": "動名詞 (Gerund)",
        "func": "-ing 形式也可以當名詞用，這時整個詞作主詞，不需再加 be 動詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "現在分詞拼寫錯誤（漏字母、誤刪 e）",
        "bad": "(X) She is **exercsing** every morning. ／ (X) He is **exercing** now.",
        "ok": "(O) She is **exercising** every morning.",
        "why": "exercise 加 -ing 時，因為重音在第二音節 sɚ、不在最後一個音節，所以 e 要保留，寫成 exercising。台灣學生常見兩種錯法：漏掉 si 兩個字母變成 exercsing，以及誤刪 e 變成 exercing。判斷法：拼 -ing 前先看重音在哪裡，重音不在最後一音節就要保留 e；寫完後把 -ing 遮住，看剩下的字母有沒有少。",
        "exOkText": "(O) The boys **are exercising** on the playground.",
        "exOkZh": "這些男孩正在操場上運動。",
        "exBadText": "(X) The boys **are exercsing** on the playground.",
        "exBadNote": "錯誤：現在分詞漏字母，應為 exercising"
      },
      {
        "title": "進行式漏掉 be 動詞",
        "bad": "(X) The students **exercising** on the field. ／ (X) She often **exercising** at night.",
        "ok": "(O) The students **are exercising** on the field.",
        "why": "現在分詞 exercising 前面一定要有 be 動詞（am／is／are／was／were），單獨出現時句子就不完整。台灣學生常以為 -ing 本身就等於「正在」，直接把 -ing 當成動詞寫進句子。判斷法：把句子唸出來，若「誰在做？」沒有答案，就是 be 動詞漏了；進行式的公式就是「主詞 + am／is／are + 動詞加 -ing」。",
        "exOkText": "(O) My sister **is exercising** in the living room.",
        "exOkZh": "我姐姐正在客廳裡運動。",
        "exBadText": "(X) My sister **exercising** in the living room.",
        "exBadNote": "錯誤：-ing 前缺少 be 動詞，句子不完整"
      },
      {
        "title": "詞形選擇錯誤（do exercising 誤用）",
        "bad": "(X) I **do exercising** every day. ／ (X) She likes **doing exercising**.",
        "ok": "(O) I **do exercise** every day.",
        "why": "中文說「做運動」，英文要用 exercise 當動詞，不能再加 -ing，因為 do / doing 後面要接「動詞原形」或「名詞」。台灣學生受中文「做運動」三個字的影響，會直接寫 do exercising。判斷法：exercise 當動詞用時是原形；只有放在 be 動詞後面，或作名詞（Exercise is good.）時才用 exercising。",
        "exOkText": "(O) He **does exercise** after school every day.",
        "exOkZh": "他每天放學後都做運動。",
        "exBadText": "(X) He **does exercising** after school every day.",
        "exBadNote": "錯誤：do 後面要接動詞原形 exercise，不加 -ing"
      },
      {
        "title": "be 動詞時態判斷錯誤（進行式的時態隨時間變）",
        "bad": "(X) She **is exercising** last night. ／ (X) They **are exercising** yesterday.",
        "ok": "(O) She **was exercising** last night.",
        "why": "be + 進行式的 be 動詞必須跟時間一致：現在就用 am／is／are，過去就用 was／were。句尾出現 last night、yesterday 等過去時間時，be 動詞要改成 was／were。台灣學生常因為中文沒有時態變化而一律用 is。判斷法：寫 be + doing 前先找時間副詞，有過去時間就把 be 改成 was／were，並在旁邊畫一個時間的記號提醒自己。",
        "exOkText": "(O) They **were exercising** on the field at five o'clock.",
        "exOkZh": "他們五點時正在操場上運動。",
        "exBadText": "(X) They **are exercising** on the field at five o'clock last night.",
        "exBadNote": "錯誤：有 last night，be 動詞應改為 were"
      }
    ],
    "traps": [
      "**關鍵字陷阱：-ing 不是動詞**：看到 -ing 就想直接當動詞，是最常見的失分點；進行式一定要成對出現 be + V-ing。",
      "**關鍵字陷阱：重音與 e**：exercise 加 -ing 保留 e，容易被誤刪；判斷關鍵是重音在不在最後一個音節。",
      "**關鍵字陷阱：時間副詞**：last night、yesterday、two days ago 一出現，be 動詞就從 am／is／are 變成 was／were。",
      "**關鍵字陷阱：exercise 與 exercising 的詞性**：exercise 可當動詞也可當名詞，exercising 只能當現在分詞或動名詞。"
    ],
    "strategy": [
      "背公式：進行式 = am／is／are／was／were + 動詞原形 + -ing，寫之前先在心裡唸一次。",
      "加 -ing 前先看重音：重音不在最後一音節就保留 e，exercise、write 都要用到。",
      "練習時自我提問：看到 -ing 就問自己「前面的 be 在哪裡？」找不到就是錯了。",
      "把時間副詞圈起來：只要看到 last night、yesterday，就先決定 be 用 am／is／are 還是 was／were，再填 -ing。",
      "多讀多聽：讓耳朵習慣 /ˈek.sɚ.saɪ.zɪŋ/ 的重音在第一音節，唸順了拼寫自然就對。"
    ]
  },
  "students who are exercising": {
    "zh": "正在運動的學生們",
    "ipa": "ˈstuː.dənts huː ɑːr ˈek.sɚ.saɪ.zɪŋ",
    "intro": "針對您提供的片語 **students who are exercising**，這是由名詞加上關係子句組成的名詞片語，本身不能單獨成句，必須放在主詞或受詞的位置。它把「學生」和「正在運動」兩件事合在一起，用來指特定的一群人。最該注意的方向是：who 後面的 be 動詞要跟 students 的複數對上（用 are），而且關係子句裡的 be 動詞和 -ing 都不能漏。",
    "headline": "關係代名詞 who + 進行式，整體當名詞用",
    "structure": [
      {
        "role": "中心語",
        "token": "students",
        "pos": "名詞 (Noun) — 可數複數",
        "func": "整個片語的「頭」，誰在運動就由它決定，所以後面的 be 動詞要用 are",
        "mark": "O"
      },
      {
        "role": "連接詞",
        "token": "who",
        "pos": "關係代名詞 (Relative Pronoun)",
        "func": "代替前面的 students，並把「正在運動」這個子句接到 students 後面",
        "mark": "O"
      },
      {
        "role": "子句動詞",
        "token": "are",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "構成進行式，與複數主詞 students 對應，所以用 are",
        "mark": "O"
      },
      {
        "role": "子句動作",
        "token": "exercising",
        "pos": "動詞 (Verb) — 現在分詞",
        "func": "接在 are 後面，表示「正在做」的動作，描述的是那一群學生",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "關係子句漏掉 be 動詞",
        "bad": "(X) The students **who exercising** on the field are from Class 2. ／ (X) I know the boy **who playing** basketball.",
        "ok": "(O) The students **who are exercising** on the field are from Class 2.",
        "why": "who 是連接 students 和子句的橋樑，who 後面接的是完整的子句，子句裡一定要有 be 動詞搭配 -ing。台灣學生常因為 who 看起來像主詞，就把 be 動詞省掉，直接寫 who exercising。判斷法：who 之後如果直接接動詞卻沒有 be，那就是漏了；進行式的固定公式 be + 動詞 -ing 在關係子句裡一樣不能少。",
        "exOkText": "(O) The girl **who is exercising** is my cousin.",
        "exOkZh": "那個正在運動的女孩是我表姐。",
        "exBadText": "(X) The girl **who exercising** is my cousin.",
        "exBadNote": "錯誤：who 後漏掉 be 動詞，應為 who is exercising"
      },
      {
        "title": "主詞與 be 動詞不一致（are / is 誤用）",
        "bad": "(X) The students **who is** exercising are from Class 2. ／ (X) The students **who are** exercising **is** very happy.",
        "ok": "(O) The students **who are** exercising are from Class 2.",
        "why": "片語裡的主詞是 students（複數），所以關係子句裡的 be 動詞要用 are，不能用 is。台灣學生常照著整句最前面看，以為「students 前面有 the 就是單數」，其實 the 跟單複數無關。判斷法：先圈出真正的主詞，看它是單數還是複數，再決定 be；而且整句有兩個 be 動詞時，兩邊都要各自跟 students 的複數對上，全用 are。",
        "exOkText": "(O) The students **who are** exercising **are** in good shape.",
        "exOkZh": "那些正在運動的學生身體很健康。",
        "exBadText": "(X) The students **who is** exercising **is** in good shape.",
        "exBadNote": "錯誤：兩處 be 動詞都應配合複數主詞改為 are"
      },
      {
        "title": "關係代名詞選錯（人不能用 which）",
        "bad": "(X) The students **which** are exercising are from Class 2. ／ (X) The boy **which** I met yesterday is Tom.",
        "ok": "(O) The students **who are** exercising are from Class 2.",
        "why": "關係代名詞要依先行詞的種類選：人或一般生物用 who，物品用 which 或 that。students、boy 都是人，所以必須用 which 是錯的，會改用 who。判斷法：先看 who 前面那個名詞是「人」還是「物」，人才用 who，物才用 which／that；兩者都行的情況，會考通常也建議人用 who。",
        "exOkText": "(O) The students **who are** exercising come from Taiwan.",
        "exOkZh": "那些正在運動的學生來自台灣。",
        "exBadText": "(X) The students **which** are exercising come from Taiwan.",
        "exBadNote": "錯誤：先行詞是人，關係代名詞應用 who 而非 which"
      },
      {
        "title": "片語單獨成句（缺少主詞與主要動詞）",
        "bad": "(X) Students who are exercising. ／ (X) **Who are exercising** the students?",
        "ok": "(O) The students who are exercising are wearing T-shirts.",
        "why": "students who are exercising 是一個名詞片語，本身沒有主要動詞，不能加句點單獨成句；它必須放在主詞或受詞的位置，前面要有句子其他成分。台灣學生在回答「誰在運動？」時常直接寫學生who are exercising就結束。判斷法：寫完先問「主要動詞在哪裡？」如果整句只有 be 動詞、沒有真正表示動作或狀態的動詞，就是把片語當句子了。",
        "exOkText": "(O) The students **who are exercising** are on the playground.",
        "exOkZh": "那些正在運動的學生在操場上。",
        "exBadText": "(X) Students **who are exercising**.",
        "exBadNote": "錯誤：名詞片語不能單獨成句，缺少主要動詞"
      }
    ],
    "traps": [
      "**關鍵字陷阱：who 不是裝飾**：who 後面一定要有完整子句，漏 be 動詞就變成錯誤的 who exercising。",
      "**關鍵字陷阱：兩個 be 動詞**：這個片語本身帶 are，接到句尾還可能再出現一個 be，兩個都要跟複數 students 對應。",
      "**關鍵字陷阱：which 不能指人**：選項常故意用 which 代替 who 來誘騙，記住「人物用 who」。",
      "**關鍵字陷阱：片語不等於句子**：介系詞片詞、代詞片語、關係子句片語都要整組當名詞用，不能自己加句點。"
    ],
    "strategy": [
      "分層拆解：先看中心語 students，再看 who 引导的子句，把片語拆成兩塊就不會漏字。",
      "檢查 be 動詞：寫完後數一數句中有幾個 be，逐一看是否都跟複數主詞一致。",
      "關係代名詞口訣：人物 who、物品 which／that，看到人名職業類名詞先寫 who。",
      "整組背誦：把 students who are exercising 當一個整體單元背，之後接上 are wearing 就能直接組句子。"
    ]
  },
  "all of the students": {
    "zh": "所有的學生",
    "ipa": "ɔːl əv ðə ˈstuː.dənts",
    "intro": "針對您提供的片語 **all of the students**，這是「代詞 + 介系詞 + 定冠詞 + 名詞複數」組成的名詞片語，本身不能單獨成句，通常當主詞或受詞使用。它表示「把學生全部包括在內」，是這條鏈中「範圍」概念的起點。最該注意的方向是：all 後面一定要接 of，而 of the students 這個三件組要整組一起寫。",
    "headline": "all 後一定要接 of，of the students 整組一起",
    "structure": [
      {
        "role": "限定詞",
        "token": "all",
        "pos": "代詞／限定詞 (Determiner)",
        "func": "表示「全部的」，後面接 of 短語，說明範圍包含哪些人",
        "mark": "O"
      },
      {
        "role": "連接詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "把 all 和 the students 連起來，不可省略，也不能換成 for／with",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "the",
        "pos": "定冠詞 (Definite Article)",
        "func": "指特定的那群學生，寫在 of 與名詞複數之間",
        "mark": "O"
      },
      {
        "role": "核心名詞",
        "token": "students",
        "pos": "名詞 (Noun) — 可數複數",
        "func": "of 的受詞；整個片語當主詞時，後面的 be 動詞要用 are",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "漏掉介系詞 of",
        "bad": "(X) **All the students** are in the classroom. ／ (X) **All students** joined the trip.",
        "ok": "(O) **All of the students** are in the classroom.",
        "why": "all 本身只表示「全部」，要說明「全部的哪些東西」必須靠 of 把受詞接上來，所以 all 後面一定要有 of。台灣學生常受「all the students」這種簡略說法影響，習慣性把 of 省掉。判斷法：all 後面若直接接名詞（the students、my friends），中間一定要補 of；這是會考單選中最常見的缺字陷阱。",
        "exOkText": "(O) **All of the students** passed the English test.",
        "exOkZh": "所有學生都通過了英文測驗。",
        "exBadText": "(X) **All the students** passed the English test.",
        "exBadNote": "錯誤：all 後面漏掉介系詞 of"
      },
      {
        "title": "介系詞誤用（of 換成 for／with／to）",
        "bad": "(X) **All for the students** are happy. ／ (X) **All with the students** have the same teacher.",
        "ok": "(O) **All of the students** are happy.",
        "why": "of 是「……的」，用來表示所屬或範圍，這裡固定是 all of the students。台灣學生常因為 for（在……期間／為了）、with（和……一起）也出現在其他句型裡，就隨手替換，寫出 all for the students 這種錯法。判斷法：看到 all，就固定往後接 of；介系詞一旦和前面的代詞綁定，就不要臨時替換成別的字。",
        "exOkText": "(O) **All of the students** took part in the speech contest.",
        "exOkZh": "所有學生都參加了演講比賽。",
        "exBadText": "(X) **All to the students** took part in the speech contest.",
        "exBadNote": "錯誤：of 被換成 to，介系詞選擇錯誤"
      },
      {
        "title": "主詞與 be 動詞不一致（are 誤用 is）",
        "bad": "(X) All of the students **is** in the gym. ／ (X) All of the students **has** finished the homework.",
        "ok": "(O) All of the students **are** in the gym.",
        "why": "all of the students 整組當主詞時，真正的主詞是 students（複數），所以 be 動詞用 are。台灣學生常因為看到 all 以為是「一個整體」而寫 is，這是受中文「所有的學生都在」一句沒有動詞變化影響。判斷法：判斷 be 動詞時不要看 all，直接看最靠近動詞的名詞——students 是複數就配 are。",
        "exOkText": "(O) All of the students **are** very friendly to me.",
        "exOkZh": "所有的學生對我都很友善。",
        "exBadText": "(X) All of the students **is** very friendly to me.",
        "exBadNote": "錯誤：主詞是 students（複數），be 動詞應為 are"
      },
      {
        "title": "all 與 every／each 的結構混淆",
        "bad": "(X) **Every of the students** is here. ／ (X) **Every of them** joined the club.",
        "ok": "(O) **Each of the students** is here.",
        "why": "every 後面不能接 of，必須直接接單數名詞（every student）；要表達「每一個（群體中的）」要用 each of the 或 every one of the。台灣學生常以為 every 和 each 可以互換，於是寫出 every of the students。判斷法：all of the＋複數、each of the＋單數、every＋單數名詞，三種結構分開記，不要混著用。",
        "exOkText": "(O) **Each of the students** has a different dream.",
        "exOkZh": "每位學生都有不同的夢想。",
        "exBadText": "(X) **Every of the students** has a different dream.",
        "exBadNote": "錯誤：every 不能接 of，應改為 each of 或 every one of"
      }
    ],
    "traps": [
      "**關鍵字陷阱：all of 的完整性**：all of the students 是一個整體，中間少 of 就整個錯，會考選項最愛拿這種缺字版本當誘餌。",
      "**關鍵字陷阱：all 的主詞仍是複數**：all 只是範圍詞，真正決定 be 動詞的是 the students（複數），所以一定用 are。",
      "**關鍵字陷阱：all of 可接不可數**：all of the water、all of my money 是正確的，因為 all of 後面只要名詞，不限可數不可數。",
      "**關鍵字陷阱：every 不接 of**：看到 every of 就是錯，題目常拿 each of 的正確選項來對比。",
      "**關鍵字陷阱：中文沒有 of**：中文只說「所有的學生」，英文卻必須多寫 of 這個字。"
    ],
    "strategy": [
      "把片語當成一個單元背：all of the students 一起唸、一起寫，不要拆開分別記憶。",
      "寫完做三件檢查：有沒有 all、有沒有 of、有沒有 the students，缺一個就扣分。",
      "be 動詞看最近的複數名詞：主詞片語前面再長，都找 students 來決定 is／are。",
      "整理對照表：all of the＋複數、each of the＋單數、every＋單數名詞，寫句前先對照。",
      "大量朗讀：讓嘴巴習慣「ɔːl əv ðə」的連貫發音，聽寫時就不會漏 of。"
    ]
  },
  "all of the students who are exercising": {
    "zh": "所有正在運動的學生",
    "ipa": "ɔːl əv ðə ˈstuː.dənts huː ɑːr ˈek.sɚ.saɪ.zɪŋ",
    "intro": "針對您提供的片語 **all of the students who are exercising**，這是「代詞片語加上關係子句」組成的長名詞片語，本身不能單獨成句，通常當主詞。它同時含有「全部」和「正在運動」兩個限定條件，是整條鏈中最複雜的單一單位。最該注意的方向是：關係代名詞 who 不能隨意省略，子句裡的 be 動詞與 -ing 都要完整，而且整組要用複數 are。",
    "headline": "who 不可省；子句 are + 運動，別漏字",
    "structure": [
      {
        "role": "主詞中心語",
        "token": "all of the students",
        "pos": "代詞片語 (Pronoun Phrase)",
        "func": "整個片語的主體，表示「所有的學生」，後面主要動詞要用 are",
        "mark": "O"
      },
      {
        "role": "連接詞",
        "token": "who",
        "pos": "關係代名詞 (Relative Pronoun)",
        "func": "代替 students，把「正在運動」這個子句接到名詞後面修飾它",
        "mark": "O"
      },
      {
        "role": "子句動詞",
        "token": "are",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "與複數主詞 students 對應，構成進行式，不可省略",
        "mark": "O"
      },
      {
        "role": "子句動作",
        "token": "exercising",
        "pos": "動詞 (Verb) — 現在分詞",
        "func": "表示「正在做」；被省略的完整寫法是 All of the students are exercising.",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "關係子句的 be 動詞與主詞不一致（is 誤用）",
        "bad": "(X) All of the students who **is** exercising are late. ／ (X) All of the students who **is** exercising wear the same uniform.",
        "ok": "(O) All of the students who **are** exercising are late.",
        "why": "who 代替的就是 students（複數），所以 who 後面的 be 動詞必須用 are。台灣學生常被前面很長的 all of the 嚇到，隨手寫 is 就結束，忘了數主詞。判斷法：不管片語多長，判斷 be 動詞時只問一句「who 前面那個名詞是幾個？」是兩個以上就用 are；整句出現兩個 be 動詞時，兩處都要用 are。",
        "exOkText": "(O) All of the students who **are** exercising are in good shape.",
        "exOkZh": "所有正在運動的學生身體都很健康。",
        "exBadText": "(X) All of the students who **is** exercising are in good shape.",
        "exBadNote": "錯誤：who 指複數 students，子句 be 動詞應為 are"
      },
      {
        "title": "關係子句漏掉 be 動詞",
        "bad": "(X) All of the students who exercising are late. ／ (X) All of the students who exercising wear the same uniform.",
        "ok": "(O) All of the students who are exercising are late.",
        "why": "who 是連接子句的關係代名詞，它後面要接一個完整的子句，進行式子句一定是 are + 動詞 -ing，be 動詞不能省。台灣學生常看到 who 就以為「有連接詞了」，直接跳到 -ing。判斷法：寫完 who 之後立刻檢查有沒有 be 動詞，進行式的公式是 be + doing，兩者缺一不可。",
        "exOkText": "(O) All of the students who are exercising join the marathon.",
        "exOkZh": "所有正在運動的學生都參加馬拉松。",
        "exBadText": "(X) All of the students who exercising join the marathon.",
        "exBadNote": "錯誤：who 後漏掉 be 動詞，應為 who are exercising"
      },
      {
        "title": "be 動詞後漏掉 -ing 形式",
        "bad": "(X) All of the students who are **exercise** are late. ／ (X) All of the students who are **exercise** wear blue shirts.",
        "ok": "(O) All of the students who are exercising are late.",
        "why": "進行式的兩部分缺一不可：are 提供了時態，-ing 才表示動作正在進行。只寫 are exercise，讀起來像「是運動（這件事）」而不是「正在運動」。判斷法：看到 be 動詞就先在心裡接上 be + doing，寫 -ing 的時候要確認前面已經有 be，而不是先寫 -ing 再回頭補 be。",
        "exOkText": "(O) All of the students who are **exercising** get extra credits.",
        "exOkZh": "所有正在運動的學生都得到額外加分。",
        "exBadText": "(X) All of the students who are **exercise** get extra credits.",
        "exBadNote": "錯誤：are 後面接原形，進行式必須加 -ing"
      },
      {
        "title": "隨意省略 who 造成語意錯誤",
        "bad": "(X) All of the students **are exercising** are wearing T-shirts. ／ (X) All of the students are exercising **wear** T-shirts.",
        "ok": "(O) All of the students who are exercising are wearing T-shirts.",
        "why": "who 不可隨意省略，一省掉，students 就不再是「正在運動的學生」的主詞，而變成兩句黏在一起的錯誤結構，出現連續兩個 be 動詞。台灣學生以為 who 是裝飾品，寫不出來就刪掉。判斷法：先固定寫出 who are exercising 這一塊，再檢查句尾有沒有第二個 are；兩個 are 中間隔著 who，句子才讀得通。",
        "exOkText": "(O) All of the students who are exercising **are wearing** T-shirts.",
        "exOkZh": "所有正在運動的學生都穿著 T 恤。",
        "exBadText": "(X) All of the students **are exercising** are wearing T-shirts.",
        "exBadNote": "錯誤：省略 who 後出現兩個 be 動詞，句子結構錯誤"
      }
    ],
    "traps": [
      "**關鍵字陷阱：兩個 be 動詞**：who are 與 are wearing 各有一個 be，兩個都要跟複數 students 配 are，中間不能省 who。",
      "**關鍵字陷阱：省略 who 就變意思**：把 who 刪掉，句子會從「正在運動的學生」變成「所有學生」，語意完全不同。",
      "**關鍵字陷阱：進行式要成對**：are 與 -ing 是綁定的，少寫其中一個都算錯。",
      "**關鍵字陷阱：長片語主詞**：這個片語可以當整句主詞，後面的動詞要跟 students 的複數一致，用 are 不用 is。"
    ],
    "strategy": [
      "分層組裝：先寫 all of the students，中間加 who are exercising，最後接上句尾動詞，順序不要跳。",
      "兩個 are 各別檢查：寫完後數一數 be 動詞有幾個，每一個都去對一次主詞 students。",
      "口訣：who 不能省，are 不能少，-ing 不能丟——三個關鍵字缺一不可。",
      "先還原再檢查：把 who are exercising 括起來，問自己這一段在修飾誰，答案應該是 students。",
      "練習縮寫辨識：認真讀過 all of the students who are exercising 這整串，練到看到就能整個讀出來。"
    ]
  },
  "wearing": {
    "zh": "穿著",
    "ipa": "ˈwer.ɪŋ",
    "intro": "針對您提供的單字 **wearing**，這是動詞 wear 的現在分詞（-ing 形式），本身不是完整句子，放進句子時前面一定要有 be 動詞。它代表「此刻穿著」的狀態，是這條鏈中描述學生外觀的關鍵動詞。最該注意的方向是：拼字不要把 r 重複，wear 結尾本來就有 r，直接加 -ing；而且表達「穿著」時前面必須配 is／am／are。",
    "headline": "wear 加 -ing，前面要 be 動詞；別寫成 wearring",
    "structure": [
      {
        "role": "詞本體",
        "token": "wearing",
        "pos": "動詞 (Verb) — wear 的現在分詞",
        "func": "表示「穿著」的狀態，前面要有 be 動詞，不能自己當主要動詞",
        "mark": "O"
      },
      {
        "role": "進行式結構",
        "token": "be + wearing",
        "pos": "動詞片語 (Verb Phrase) — be 動詞 + 現在分詞",
        "func": "構成現在進行式，表示「此刻正穿著」；be 動詞隨人稱與時態變化",
        "mark": "O"
      },
      {
        "role": "字形對照",
        "token": "wear / wore / worn",
        "pos": "動詞三態 (Verb Forms)",
        "func": "wear 是不規則動詞，一般現在式用 wear，過去式用 wore，過去分詞用 worn",
        "mark": "O"
      },
      {
        "role": "字尾拼寫",
        "token": "wear → wearing",
        "pos": "字形變化 (Word Form)",
        "func": "wear 結尾是 r，直接加 -ing，不重複 r，所以寫 wearing 而不是 wearring",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼寫錯誤（重複字母 wearring）",
        "bad": "(X) She is **wearring** a blue dress. ／ (X) He is **warng** a red hat.",
        "ok": "(O) She is **wearing** a blue dress.",
        "why": "wear 加 -ing 時，因為原字結尾是 r 而不是短母音加 e，所以不需要重複字母，直接寫 wearing。台灣學生常受「短母音 + 單一子音就重複」規則誤導，寫成 wearring；也有把 ea 順序顛倒寫成 warng 的。判斷法：寫完 -ing 後把 -ing 遮住，剩下的字母必須剛好等於原字 wear，一個不多一個不少。",
        "exOkText": "(O) The students **are wearing** white shirts today.",
        "exOkZh": "學生們今天穿著白襯衫。",
        "exBadText": "(X) The students **are wearring** white shirts today.",
        "exBadNote": "錯誤：r 不需要重複，應為 wearing"
      },
      {
        "title": "進行式漏掉 be 動詞",
        "bad": "(X) He **wearing** a red hat. ／ (X) She often **wearing** her uniform on Monday.",
        "ok": "(O) He **is wearing** a red hat.",
        "why": "wearing 是現在分詞，前面一定要有 am／is／are／was／were 才構成進行式，單獨出現句子就不完整。台灣學生常以為「穿著」這個中文詞本身就等於英文的 wearing，忘記英文還需要 be 動詞。判斷法：寫完 wearing 就檢查前面有沒有 be；進行式的公式是「主詞 + am／is／are + 動詞加 -ing」，缺 be 就不是完整句。",
        "exOkText": "(O) My brother **is wearing** a baseball cap.",
        "exOkZh": "我哥哥正戴著一頂棒球帽。",
        "exBadText": "(X) My brother **wearing** a baseball cap.",
        "exBadNote": "錯誤：wearing 前缺少 be 動詞"
      },
      {
        "title": "詞義混淆（wear 與 dress／put on 混用）",
        "bad": "(X) She is **dressing** a red coat. ／ (X) He **put ons** a pair of shoes every morning.",
        "ok": "(O) She is **wearing** a red coat.",
        "why": "wear 是「穿戴（衣服、帽子、眼鏡、鞋襪）」，強調穿戴在身上；dress 當動詞是「替別人穿衣服」（dress a child）或「化妝、盛裝」；put on 則是「穿上」這個短暫的動作。台灣學生常把 wear 和 dress 混用。判斷法：自己身上穿的衣服、帽子用 wear；替別人穿用 dress sb；短暫的穿上動作用 put on。",
        "exOkText": "(O) She is **wearing** a pretty dress to the party.",
        "exOkZh": "她穿著一件漂亮的洋裝去派對。",
        "exBadText": "(X) She is **dressing** a pretty dress to the party.",
        "exBadNote": "錯誤：wear 才表示自己穿戴，dress 不接「自己穿的衣物」"
      },
      {
        "title": "進行式的時態判斷錯誤（搭配過去時間）",
        "bad": "(X) She **is wearing** a red coat yesterday. ／ (X) They **are wearing** their uniforms last night.",
        "ok": "(O) She **was wearing** a red coat yesterday.",
        "why": "be + wearing 的 be 動詞必須符合句子時間：說明「現在穿著」用 is／am／are，描述「當時穿著」用 was／were。句尾有 yesterday、last night 等過去時間時，be 動詞就要改成 was／were。台灣學生因中文沒有動詞變化而一律用 is。判斷法：先圈時間副詞，再決定 be 動詞的形式，最後才接 wearing。",
        "exOkText": "(O) He **was wearing** a helmet when I saw him.",
        "exOkZh": "我看到他的時候，他正戴著安全帽。",
        "exBadText": "(X) He **is wearing** a helmet when I saw him.",
        "exBadNote": "錯誤：saw 是過去式，be 動詞應為 was wearing"
      }
    ],
    "traps": [
      "**關鍵字陷阱：wear / wearing / wore / worn**：wear 是一般現在式，wearing 進行式，wore 過去式，worn 過去分詞，題目會故意混著考。",
      "**關鍵字陷阱：wear 不重複字母**：wearing 只有一個 r，寫成 wearring 直接算錯，是最常見的拼字扣分點。",
      "**關鍵字陷阱：wear 與 dress**：中文都翻成「穿」，但 wear 是自己穿戴，dress 是替別人穿或化妝，選錯就錯。",
      "**關鍵字陷阱：時間副詞**：last night、yesterday 搭配 wearing 時，be 動詞要從 is 改成 was。"
    ],
    "strategy": [
      "背三態：wear – wore – worn 一起記，過去式千萬不要寫成 weared。",
      "-ing 前先寫 be：寫句時先打好 be 動詞，再把 wearing 接上去，可以徹底避免漏 be。",
      "遮字檢查法：把 -ing 遮住檢查剩下的拼字，立刻能抓出 wearring 這類錯誤。",
      "分清狀態與動作：說「此刻穿著」用 be wearing，說「習慣性穿著」用 wear / wears，兩者不能互換。",
      "朗讀句型：每天唸幾句 She is wearing…，讓耳朵習慣 be + wearing 的連音。"
    ]
  },
  "are wearing": {
    "zh": "穿著",
    "ipa": "ɑːr ˈwer.ɪŋ",
    "intro": "針對您提供的片語 **are wearing**，這是「be 動詞 + 現在分詞」組成的進行式動詞片語，本身不能單獨成句，必須有主詞搭配。它表達「（他們）此刻正穿著」的狀態，最後通常會接受詞說明穿什麼。最該注意的方向是：are 必須配複數或第二人稱主詞，而且 wearing 前面不能沒有 be 動詞。",
    "headline": "be + 進行式；are 要配複數主詞",
    "structure": [
      {
        "role": "主片語核心",
        "token": "are wearing",
        "pos": "動詞片語 (Verb Phrase) — 進行式",
        "func": "整個片語是句子的主要動詞，前面要有主詞、後面可接受詞",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "are",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "提供時態並構成進行式；只能用於複數主詞或 you／we／they",
        "mark": "O"
      },
      {
        "role": "現在分詞",
        "token": "wearing",
        "pos": "動詞 (Verb) — wear 的現在分詞",
        "func": "與 are 搭配表示「正在穿著」，不可單獨存在",
        "mark": "O"
      },
      {
        "role": "常見搭配",
        "token": "They are wearing T-shirts.",
        "pos": "例句 (Example)",
        "func": "are 前面最常見的主詞是 they、we、you 或 the students 等複數名詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "be 動詞與主詞不一致（are 誤配單數主詞）",
        "bad": "(X) **She are wearing** a red hat. ／ (X) **He are wearing** a blue shirt.",
        "ok": "(O) **She is wearing** a red hat.",
        "why": "be 動詞的選擇完全取決於主詞：單數第三人稱用 is，複數與第二人稱用 are。She、He 都是單數，卻接 are，就是典型錯誤。台灣學生常因為片語背熟了 are wearing 就直接套上，忘了回頭看主詞。判斷法：把主詞和 be 動詞並排寫，she／he 配 is，they／we／you 配 are，再檢查一次。",
        "exOkText": "(O) **They are wearing** school uniforms on Monday.",
        "exOkZh": "他們星期一穿著校服。",
        "exBadText": "(X) **She are wearing** school uniforms on Monday.",
        "exBadNote": "錯誤：主詞 She 是單數，be 動詞應為 is"
      },
      {
        "title": "片語不能單獨成句（缺少主詞）",
        "bad": "(X) **Are wearing** a red hat. ／ (X) **Are wearing** the same uniform.",
        "ok": "(O) **She is wearing** a red hat.",
        "why": "are wearing 是動詞片語，前面一定要有主詞，否則沒有人知道是誰在穿。它可以單獨回答 Who is… 這類問句，但一定要和前問句搭配，不能自己加句點結束。台灣學生在翻譯或書寫時常只寫譯出的動詞部分。判斷法：寫完先問「誰在穿？」沒有主詞就不能成句。",
        "exOkText": "(O) **Who is wearing** the red hat? — **Tom is wearing** it.",
        "exOkZh": "誰戴著那頂紅帽子？——湯姆戴著。",
        "exBadText": "(X) **Are wearing** the red hat.",
        "exBadNote": "錯誤：動詞片語單獨成句，缺少主詞"
      },
      {
        "title": "原形與現在分詞混淆（wear 誤用）",
        "bad": "(X) They **are wear** school uniforms. ／ (X) The students **are wear** T-shirts today.",
        "ok": "(O) They **are wearing** school uniforms.",
        "why": "進行式的第二部分一定是「動詞原形加 -ing」，wear 本身最後是 r 結尾，直接加 -ing 變 wearing，不加 -ing 就是原形 wear，句子立刻變錯。台灣學生常把熟悉的基本動詞直接套進片語。判斷法：看到 be 動詞後面，強迫自己寫原形再手動加 -ing，不要從詞彙庫直接調出 wear。",
        "exOkText": "(O) The students **are wearing** white shirts and blue pants.",
        "exOkZh": "學生們穿著白襯衫和藍色長褲。",
        "exBadText": "(X) The students **are wear** white shirts and blue pants.",
        "exBadNote": "錯誤：are 後面必須用現在分詞 wearing"
      },
      {
        "title": "進行式與一般現在式混淆（習慣性動作用 wear）",
        "bad": "(X) She **is wearing** a red hat every day. ／ (X) He **is wearing** the same uniform every Monday.",
        "ok": "(O) She **wears** a red hat every day.",
        "why": "be wearing 強調「此刻正在穿」的狀態，是短暫的畫面；如果句子表示習慣、每個禮拜都如此，就應該用一般現在式 wear（三單變 wears）。台灣學生常把 every day 這類表示頻率的副詞和進行式混在一起。判斷法：看到 every day、every Monday、usually、always 這類頻率詞，通常用一般現在式；看到 now、at the moment 才用 be wearing。",
        "exOkText": "(O) She **wears** a red hat every day.",
        "exOkZh": "她每天戴著一頂紅帽子。",
        "exBadText": "(X) She **is wearing** a red hat every day.",
        "exBadNote": "錯誤：every day 表示習慣，應用一般現在式 wears"
      }
    ],
    "traps": [
      "**關鍵字陷阱：are 只能配複數**：she、he 是單數，選項若寫 She are wearing 就是錯的，題目最常這樣設陷阱。",
      "**關鍵字陷阱：進行式的 -ing**：be 動詞後面一定要接 V-ing，寫成 are wear 立刻扣分。",
      "**關鍵字陷阱：every day 不用進行式**：表示習慣的頻率詞配一般現在式，這是會考常見的時態判斷題。",
      "**關鍵字陷阱：wear / wore / worn**：wear 是一般現在式，wore 是過去式，選項常混著考，要看清楚時間線索。"
    ],
    "strategy": [
      "先找主詞再寫 be：句子的第一個動作就是確認主詞單複數，馬上決定 is 還是 are。",
      "背好進行式公式：am／is／are + 動詞原形 + -ing，三個部分缺一不可。",
      "頻率詞分流：every day、usually 用一般現在式；now、Look! 用 be + doing。",
      "練習回答問句：學會用 What is he wearing? 提問，再用 He is wearing… 回答，片語就不會單獨出現。"
    ]
  },
  "all of the students who are exercising are wearing": {
    "zh": "所有正在運動的學生都穿著",
    "ipa": "ɔːl əv ðə ˈstuː.dənts huː ɑːr ˈek.sɚ.saɪ.zɪŋ ɑːr ˈwer.ɪŋ",
    "intro": "針對您提供的句子 **all of the students who are exercising are wearing**，這是一個完整句子，主詞和主要動詞都齊全，可以單獨成句（後面通常再接受詞）。它的結構是「長名詞片語當主詞 + 進行式主要動詞」，把整條片語鏈整合在一起。最該注意的方向是：句中有兩個 be 動詞（子句的 are 和主要動詞的 are），兩者都要跟複數主詞一致，而且 who 不能省略。",
    "headline": "兩個 be 動詞都要 are，who 不能省",
    "structure": [
      {
        "role": "主詞",
        "token": "all of the students",
        "pos": "代詞片語 (Pronoun Phrase)",
        "func": "整句的主體，表示「所有的學生」，決定後面所有 be 動詞都要用 are",
        "mark": "O"
      },
      {
        "role": "連接詞",
        "token": "who",
        "pos": "關係代名詞 (Relative Pronoun)",
        "func": "代替 students，把「正在運動」這個子句接到主詞後面作修飾",
        "mark": "O"
      },
      {
        "role": "關係子句",
        "token": "are exercising",
        "pos": "子句 (Clause) — 進行式",
        "func": "修飾 students，說明是哪一群學生；be 動詞是 are，與複數一致",
        "mark": "O"
      },
      {
        "role": "主要動詞",
        "token": "are wearing",
        "pos": "動詞片語 (Verb Phrase) — 進行式",
        "func": "句子真正要表達的動作，表示「都正穿著」，後面接受詞",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "T-shirts.",
        "pos": "名詞 (Noun)",
        "func": "穿著的對象；這裡省略不算錯，但完整句應補上",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞與 be 動詞不一致（後一個 are 誤寫 is）",
        "bad": "(X) All of the students who are exercising **is wearing** T-shirts. ／ (X) All of the students who are exercising **is** on the playground.",
        "ok": "(O) All of the students who are exercising **are wearing** T-shirts.",
        "why": "這句有兩個 be 動詞：關係子句裡的 are，和主要動詞的 are。兩者的主詞都是 students（複數），所以都必須用 are。台灣學生常在前面 who are 寫對之後，寫到句尾就順手改回 is。判斷法：把主詞圈起來寫在最上方，整句所有 be 動詞都看著它決定，複數就一律 are。",
        "exOkText": "(O) All of the students who are exercising **are wearing** the same uniform.",
        "exOkZh": "所有正在運動的學生都穿著同樣的制服。",
        "exBadText": "(X) All of the students who are exercising **is wearing** the same uniform.",
        "exBadNote": "錯誤：主要動詞的 be 也要配合複數主詞用 are"
      },
      {
        "title": "漏掉句尾的 be 動詞",
        "bad": "(X) All of the students who are exercising **wearing** T-shirts. ／ (X) All of the students who are exercising **wearing** blue caps.",
        "ok": "(O) All of the students who are exercising **are wearing** T-shirts.",
        "why": "wearing 是現在分詞，前面一定要有 be 動詞才能構成進行式，單獨放著句子就不完整。因為前面已經出現過 who are，學生容易誤以為「整句已經有 be 了」，句尾就忘了再寫一個。判斷法：數一數句中有幾個現在分詞（exercising、wearing），每個前面都要配一個 be 動詞。",
        "exOkText": "(O) All of the students who are exercising **are wearing** hats.",
        "exOkZh": "所有正在運動的學生都戴著帽子。",
        "exBadText": "(X) All of the students who are exercising **wearing** hats.",
        "exBadNote": "錯誤：wearing 前缺少 be 動詞"
      },
      {
        "title": "進行式與完成式混淆（have wearing 誤用）",
        "bad": "(X) The students **have wearing** the new uniforms. ／ (X) All of the students **have wearing** T-shirts today.",
        "ok": "(O) The students **are wearing** the new uniforms.",
        "why": "have 動詞後面接「過去分詞」（worn），不是現在分詞（wearing）。要說「（此刻）正穿著」必須用 are wearing；若要說「已經穿好了」才用 have put on。台灣學生常把兩個 -ing 形式一起背，就會誤以為 have 後面也能接 -ing。判斷法：看到 have／has／had，後面只接過去分詞；看到 am／is／are，後面才接現在分詞。",
        "exOkText": "(O) The students **are wearing** the new school uniforms.",
        "exOkZh": "學生們正穿著新的校服。",
        "exBadText": "(X) The students **have wearing** the new school uniforms.",
        "exBadNote": "錯誤：have 後面要接過去分詞，不能接 -ing 形式"
      },
      {
        "title": "語序錯誤（關係子句位置放錯）",
        "bad": "(X) All of the students are wearing T-shirts **who are exercising**. ／ (X) All of the students wearing T-shirts **are exercising** on the field.",
        "ok": "(O) All of the students **who are exercising** are wearing T-shirts.",
        "why": "關係子句 who are exercising 是用來修飾名詞 students 的，必須緊緊接在 students 後面，不能整個搬到句尾。台灣學生常按中文語序「所有學生都穿著 T 恤，正在運動」把兩個訊息排反順序。判斷法：who 的前面一定要是被修飾的名詞，寫完檢查 who 的前一個字是不是 students，是就對了。",
        "exOkText": "(O) All of the students **who are exercising** are wearing T-shirts.",
        "exOkZh": "所有正在運動的學生都穿著 T 恤。",
        "exBadText": "(X) All of the students **are wearing T-shirts who are exercising**.",
        "exBadNote": "錯誤：關係子句必須緊接在被修飾的名詞 students 後面"
      }
    ],
    "traps": [
      "**關鍵字陷阱：兩個 be 動詞**：who are 與 are wearing 都要用 are，只要一處寫成 is 就整句錯。",
      "**關鍵字陷阱：兩個現在分詞**：exercising 和 wearing 前面都要有 be，漏一個就不完整。",
      "**關鍵字陷阱：who 不能省略**：省掉 who 會變成兩個 be 動詞連在一起，句子讀不通。",
      "**關鍵字陷阱：子句位置**：who 前面必須是它所修飾的名詞，位置放錯意思就整個改變。",
      "**關鍵字陷阱：have / be 的分工**：be 後接 -ing，have 後接過去分詞，兩個時態詞不能混用。"
    ],
    "strategy": [
      "寫之前先圈主詞：把 all of the students 括起來放句首，後面兩處 be 動詞都看著它寫。",
      "分層組裝：主詞 → who are exercising → are wearing → 受詞，一層一層加，不跳步就不會漏。",
      "清點 -ing：寫完後數一數有幾個 -ing，檢查每個前面是否都有 be。",
      "朗讀檢查語序：唸出聲後重點聽 who 的前面是不是 students，錯序馬上就聽得出來。",
      "背下整句模板：把這句當成範例句背起來，之後換名詞、換地點就能套用。"
    ]
  },
  "dog": {
    "zh": "狗",
    "ipa": "dɔːɡ",
    "intro": "針對您提供的單字 **dog**，這是一個可數單數名詞，本身不是完整句子，但可以單獨當主詞（The dog is barking.）。它是這條鏈中動物類單字的起點，後面 dogs、her dogs 都由它延伸而來。最該注意的方向有兩個：一是可數單數名詞前面要有冠詞或數量詞，二是 /ɡ/ 是濁音，唸成 /k/ 就會和 dock（船塢）混淆。",
    "headline": "可數單數名詞；/ɡ/ 要唸成濁音",
    "structure": [
      {
        "role": "詞本體",
        "token": "dog",
        "pos": "名詞 (Noun) — 可數單數",
        "func": "指「一隻狗」，可數所以有複數 dogs，單獨使用前要有冠詞或數量詞",
        "mark": "O"
      },
      {
        "role": "泛指用法",
        "token": "a dog",
        "pos": "冠詞 (Article) + 名詞",
        "func": "泛指任何一隻狗時，單數可數名詞前面一定要加 a",
        "mark": "O"
      },
      {
        "role": "複數變化",
        "token": "dogs",
        "pos": "名詞複數 (Plural Noun)",
        "func": "兩隻以上要加 -s，唸成 /dɔːɡz/；「狗群」這個意思也用複數表示",
        "mark": "O"
      },
      {
        "role": "發音重點",
        "token": "/dɔːɡ/",
        "pos": "音標 (Phonetics)",
        "func": "/ɔː/ 是長音要拖長，/ɡ/ 是清舌根塞音要振動喉嚨，不可讀成 /dɔk/",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤（字母互換與音譯拼法）",
        "bad": "(X) My **doog** is barking. ／ (X) My **dok** runs every morning.",
        "ok": "(O) My **dog** is barking.",
        "why": "dog 只有三個字母，d-o-g 順序固定。台灣學生最常犯兩種：一是打字時把 d 與 g 對調成 doog，二是看到 dog 的音就直接照音標成 dok，忘了最後的 g 也要寫。判斷法：寫完把單字唸一次，確認最後有沒有那個喉嚨音；如果只有 /k/ 而沒有 /ɡ/，拼字就少了一個字母。",
        "exOkText": "(O) The **dog** is sleeping under the table.",
        "exOkZh": "那隻狗正在桌子底下睡覺。",
        "exBadText": "(X) The **dok** is sleeping under the table.",
        "exBadNote": "錯誤：漏掉最後的 g，拼字變成 dok"
      },
      {
        "title": "漏掉冠詞或數量詞",
        "bad": "(X) I have **dog**. ／ (X) She bought **dog** yesterday.",
        "ok": "(O) I have **a dog**.",
        "why": "dog 是可數單數名詞，說「一隻狗」時前面一定要有 a、an、the、one 或是數量詞，不能直接出現。中文「我有狗」不需要量詞，英文卻一定要加。判斷法：寫完句子檢查 dog 前面的字，如果直接接動詞或句首，就是漏了，補上 a 或數字。",
        "exOkText": "(O) My neighbor has **a dog** and two cats.",
        "exOkZh": "我鄰居有一隻狗和兩隻貓。",
        "exBadText": "(X) My neighbor has **dog** and two cats.",
        "exBadNote": "錯誤：可數單數名詞 dog 前面漏了冠詞 a"
      },
      {
        "title": "複數與數量詞配合錯誤",
        "bad": "(X) He has three **dog**. ／ (X) I saw many **dog** in the park.",
        "ok": "(O) He has three **dogs**.",
        "why": "只要數量詞是三隻、很多隻這類表示兩隻以上的詞，dog 就一定要變成複數 dogs。台灣學生常在寫數字時忘記名詞也要跟著變。判斷法：先寫數量詞，寫完立刻檢查後面的名詞有沒有加 s；數量大於一，複數就一定要跟上。",
        "exOkText": "(O) He has three **dogs** and one cat.",
        "exOkZh": "他有 three 隻狗和一隻貓。",
        "exBadText": "(X) He has three **dog** and one cat.",
        "exBadNote": "錯誤：三隻要用複數 dogs，單數 dog 只能搭配 one"
      },
      {
        "title": "泛指整類動物時誤用複數",
        "bad": "(X) **Dogs are** friendly animals. ／ (X) **Dogs can** bark loudly.",
        "ok": "(O) **A dog is** a friendly animal.",
        "why": "要概括說明「狗這一種動物」的特徵時，英文習慣用單數來表示整類，這是中文「狗是…」多個句子翻成複數時最容易犯的錯。判斷法：看後面有沒有「這一類的共同特徵」——有就用單數 a dog；只有在數特定的很多隻狗時才用 dogs。",
        "exOkText": "(O) **A dog is** a loyal animal.",
        "exOkZh": "狗是一種忠心的動物。",
        "exBadText": "(X) **Dogs are** a loyal animal.",
        "exBadNote": "錯誤：概括整類動物時要用單數，且 a 後面的名詞也要用單數"
      }
    ],
    "traps": [
      "**關鍵字陷阱：/ɡ/ 與 /k/**：dog 的尾音是 /ɡ/（振動喉嚨），不是 /k/；唸錯會被聽成 dock，聽力測驗直接失分。",
      "**關鍵字陷阱：單數可數名詞要有冠詞**：看到 a dog、one dog、this dog 之外的單數寫法，多半漏了字。",
      "**關鍵字陷阱：three dogs 才是複數**：數字大於一，名詞一定要加 s，這是最容易漏的地方。",
      "**關鍵字陷阱：泛指整類用單數**：Dogs are friendly animals 是常見錯法，會考喜歡拿這種句子考單複數的判斷。"
    ],
    "strategy": [
      "練習 /ɡ/ 音：把 finger、leg、dog 放在一起唸，感覺喉嚨振動的位置。",
      "寫完做數量檢查：有數量詞就檢查名詞單複數，數字大於一必定是複數。",
      "把冠詞當成必填格：寫單數可數名詞時，先留一個位置給 a／the／one。",
      "分清單數與整類：描述特徵用單數，描述具体的很多隻才用複數。",
      "背搭配而不是背單字：a dog、two dogs、her dogs 一起記，複數概念自然清楚。"
    ]
  },
  "dogs": {
    "zh": "狗群",
    "ipa": "dɔːɡz",
    "intro": "針對您提供的單字 **dogs**，這是 dog 的複數形式（中文常翻成「狗群」或「狗（複數）」），本身不是完整句子，但常當主詞使用。它代表「兩隻以上的狗」這個數量概念，是後面 her dogs 的基礎。最該注意的方向是：-s 是複數不是所有格，所有格要寫成 the dog's；另外複數主詞後面的 be 動詞要用 are。",
    "headline": "複數 -s 不是所有格；be 動詞用 are",
    "structure": [
      {
        "role": "詞本體",
        "token": "dogs",
        "pos": "名詞 (Noun) — 可數複數",
        "func": "指兩隻以上的狗，中文常翻成「狗群」；後面接 be 動詞時用 are",
        "mark": "O"
      },
      {
        "role": "複數字尾",
        "token": "-s",
        "pos": "字尾 (Suffix)",
        "func": "dog 結尾是 /ɡ/，加 -s 後唸成 /ɡz/，是複數記號，不是所有格",
        "mark": "O"
      },
      {
        "role": "所有格對照",
        "token": "the dog's",
        "pos": "所有格 (Possessive)",
        "func": "表示「那隻狗的」，要在 s 後再加一個 's'，兩者意義完全不同",
        "mark": "O"
      },
      {
        "role": "數量搭配",
        "token": "two dogs / many dogs",
        "pos": "數量詞片語",
        "func": "複數名詞前面配 two、many、a lot of，many 只能修飾可數複數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數漏加 -s",
        "bad": "(X) She has two **dog**. ／ (X) I saw many **dog** in the park.",
        "ok": "(O) She has two **dogs**.",
        "why": "dogs 是 dog 加 s 形成的複數，凡是兩隻以上就一定要寫出 -s。台灣學生常在寫數字或 many 之後忘記名詞也要變化。判斷法：先寫數量詞，看到 two、three、many 就立刻在名詞後面加 s；寫完整句再回頭檢查一次數量與名詞是否一致。",
        "exOkText": "(O) Two **dogs** are sleeping in the yard.",
        "exOkZh": "兩隻狗正在院子裡睡覺。",
        "exBadText": "(X) Two **dog** are sleeping in the yard.",
        "exBadNote": "錯誤：兩隻要用複數 dogs"
      },
      {
        "title": "誤用所有格 's 當成複數",
        "bad": "(X) There are three **dog's** in the yard. ／ (X) The **dog's** are running fast.",
        "ok": "(O) There are three **dogs** in the yard.",
        "why": "複數是 dog 加一個 s；所有格則是 dog 後面加 's，中文兩者都沒有，所以特別容易搞混。dog's 表示「這隻狗的」，後面通常接名詞（the dog's leash）；dogs 才表示「很多隻狗」。判斷法：看後面還有沒有接名詞，接名詞的就是所有格 dog's，沒有接名詞且前面有數量詞的就是複數 dogs。",
        "exOkText": "(O) The **dogs'** tails are wagging.",
        "exOkZh": "這些狗的尾巴在搖。",
        "exBadText": "(X) There are three **dog's** tails wagging.",
        "exBadNote": "錯誤：複數要寫 dogs，所有格 's 不能當複數用"
      },
      {
        "title": "主詞與 be 動詞不一致（is 誤用）",
        "bad": "(X) The **dogs is** in the yard. ／ (X) **My dogs are** very friendly.",
        "ok": "(O) The **dogs are** in the yard.",
        "why": "dogs 是複數，be 動詞一定要用 are。台灣學生常因為中文「狗在院子裡」沒有動詞變化而直接寫 is。判斷法：be 動詞前的主詞若是 dogs、students、people 這類複數，一律寫 are；同時句子後面出現 have、wear 等動詞也要特別檢查單複數。",
        "exOkText": "(O) The **dogs are** chasing the cat.",
        "exOkZh": "這些狗正在追那隻貓。",
        "exBadText": "(X) The **dogs is** chasing the cat.",
        "exBadNote": "錯誤：主詞是複數 dogs，be 動詞應為 are"
      },
      {
        "title": "數量詞搭配錯誤（many / much 與 a few）",
        "bad": "(X) There are **much dogs** outside. ／ (X) I have **much dogs** at home.",
        "ok": "(O) There are **many dogs** outside.",
        "why": "dogs 是可數複數，所以前面只能用 many、a lot of、a few 這類搭配可數複數的詞；much 只能修飾不可數名詞。台灣學生常因中文「很多狗」和「很多水」翻譯一樣而混用。判斷法：先問後面的名詞能不能數（幾隻？），能數就用 many／a few，不能數才用 much。",
        "exOkText": "(O) **A few dogs** are waiting at the gate.",
        "exOkZh": "有幾隻狗正在門口等著。",
        "exBadText": "(X) **A few much dogs** are waiting at the gate.",
        "exBadNote": "錯誤：much 與可數複數 dogs 搭配錯誤"
      }
    ],
    "traps": [
      "**關鍵字陷阱：'s 的位置**：dog's 是所有格「某隻狗的」，dogs 是複數「很多隻狗」，兩者只差一個撇號，意思完全不同。",
      "**關鍵字陷阱：複數主詞配 are**：選項常寫 The dogs is…，一旦主詞是 dogs，is 一律錯。",
      "**關鍵字陷阱：many 只能配複數**：much dogs 是會考常見錯配，看到可數名詞就要立刻檢查數量詞。",
      "**關鍵字陷阱：複數發音**：dogs 唸成 /dɔːɡz/，尾音是 /z/ 不可省略，也不要唸成 /dɔːɡs/。"
    ],
    "strategy": [
      "撇號特別注意：寫完 dogs 後想一想後面有沒有接名詞，接名詞就要改成 dog's。",
      "寫 be 動詞前先確認主詞是單數還是複數，dogs 一定配 are。",
      "數量詞配對表：many、a few、a lot of 配可數複數；much、a little 配不可數。",
      "唸出聲音確認 /z/：把 dogs 唸三遍，感覺喉嚨的振動，發音對了單字才記得牢。"
    ]
  },
  "her dogs": {
    "zh": "她的狗",
    "ipa": "hɜːr dɔːɡz",
    "intro": "針對您提供的片語 **her dogs**，這是「所有格形容詞 + 名詞複數」組成的名詞片語，本身不能單獨成句，通常當主詞或受詞使用。它表示「屬於她的狗（可能不只一隻）」，是這條鏈中「人稱 + 所有格」的組合點。最該注意的方向是：her 放在名詞前、hers 單獨使用；her 是寫在名詞前的所有格，不能用 of her 代替。",
    "headline": "her 放名詞前、hers 單獨用；不能用 of her",
    "structure": [
      {
        "role": "限定詞",
        "token": "her",
        "pos": "所有格形容詞 (Possessive Adjective)",
        "func": "表示「她的」，必須緊接在名詞前面；單獨使用時要改成 hers",
        "mark": "O"
      },
      {
        "role": "核心名詞",
        "token": "dogs",
        "pos": "名詞 (Noun) — 可數複數",
        "func": "被修飾的名詞，表示兩隻以上；當主詞時後面的 be 動詞用 are",
        "mark": "O"
      },
      {
        "role": "易混淆對照",
        "token": "hers",
        "pos": "所有格代詞 (Possessive Pronoun)",
        "func": "後面不再接名詞時才用 hers，等於 her 的東西",
        "mark": "O"
      },
      {
        "role": "易混淆對照",
        "token": "she",
        "pos": "人稱代詞 (Personal Pronoun)",
        "func": "she 是主格代詞「她」，不能在後面直接接名詞變成所有格",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "her 與 hers 混淆",
        "bad": "(X) **Hers dogs** are in the yard. ／ (X) **Hers two dogs** are very friendly.",
        "ok": "(O) **Her dogs** are in the yard.",
        "why": "her 是所有格形容詞，後面一定要接名詞；hers 是所有格代詞，後面什麼都不接，兩者不能互換。台灣學生常覺得 her 後面有 dog，應該用「更完整」的 hers。判斷法：看到後面有名詞（dogs）就用 her；後面沒有名詞、需要用 = 代替整組（The red one is hers.）才用 hers。",
        "exOkText": "(O) **Her dogs** are friendly to everyone.",
        "exOkZh": "她的狗對每個人都很友善。",
        "exBadText": "(X) **Hers dogs** are friendly to everyone.",
        "exBadNote": "錯誤：名詞前面要用所有格形容詞 her，不是代詞 hers"
      },
      {
        "title": "人稱代詞與所有格混淆（she 誤用）",
        "bad": "(X) **She dogs** are in the yard. ／ (X) I like **she dogs** very much.",
        "ok": "(O) **Her dogs** are in the yard.",
        "why": "she 是主格人稱代詞「她／她的」，後面不能直接接名詞；表示「她的」放在名詞前一定要用所有格 her。台灣學生常受中文「她的」兩字同形影響，隨手寫 she。判斷法：代詞後面跟著名詞，就一定要把 she 改成 her；his、my、your 也有同樣規則。",
        "exOkText": "(O) **Her dogs** live with her parents.",
        "exOkZh": "她的狗和她的父母住在一起。",
        "exBadText": "(X) **She dogs** live with her parents.",
        "exBadNote": "錯誤：she 是主格代詞，名詞前應用所有格 her"
      },
      {
        "title": "複數漏加 -s",
        "bad": "(X) She walks **her dog** every morning. ／ (X) **Her dog** are in the yard.",
        "ok": "(O) She walks **her dogs** every morning.",
        "why": "中文「她的狗」不分單複數，但英文要看實際有幾隻：兩隻以上就要用 her dogs，只有一隻才用 her dog。台灣學生常受中文影響一律寫單數。判斷法：翻譯時先問自己「一隻還是很多隻？」，很多隻就要在 dog 後面加 s，並檢查後面的 be 動詞是否也變成 are。",
        "exOkText": "(O) **Her dogs** are all golden retrievers.",
        "exOkZh": "她的狗全都是黃金獵犬。",
        "exBadText": "(X) **Her dogs is** all golden retrievers.",
        "exBadNote": "錯誤：主詞是複數 dogs，be 動詞應為 are"
      },
      {
        "title": "用 of + 代詞誤代所有格",
        "bad": "(X) The **dogs of her** are in the yard. ／ (X) The **house of her** is near the school.",
        "ok": "(O) **Her dogs** are in the yard.",
        "why": "所有格有兩種寫法：短的放在名詞前（her dogs），長的用 of 但後面必須接名詞（the dogs of Amy），絕對不能接代詞 her。台灣學生常直接寫 the dogs of her。判斷法：of 的後面只能放名詞或專有名詞，出現 her／my／your 這些代詞時，就要把 of 拿掉，把代詞搬到名詞前面。",
        "exOkText": "(O) **Her dogs** bark loudly at night.",
        "exOkZh": "她的狗晚上叫得很大聲。",
        "exBadText": "(X) The **dogs of her** bark loudly at night.",
        "exBadNote": "錯誤：of 後面不能接代詞，應改為 Her dogs"
      }
    ],
    "traps": [
      "**關鍵字陷阱：her 與 hers**：名詞前用 her，沒有名詞時才用 hers，這是所有格最常見的送分題。",
      "**關鍵字陷阱：she 與 her**：she 是主格代詞，her 是所有格形容詞；只要後面有名詞就選 her。",
      "**關鍵字陷阱：單複數**：中文「她的狗」沒有分單複數，英文 her dog 與 her dogs 要依實際數量選擇。",
      "**關鍵字陷阱：of 後不能接代詞**：the dogs of her 這種寫法在會考中一定錯，看到 of 就檢查後面是不是名詞。",
      "**關鍵字陷阱：be 動詞配合**：her dogs 當主詞時是複數，be 動詞要用 are。"
    ],
    "strategy": [
      "背 her／hers／she 的對照：把三個詞放在一起寫一次，位置關係就記住了。",
      "翻譯前先問數量：「她的狗」是一隻還是很多隻，決定用 dog 還是 dogs。",
      "看到 of 就檢查：of 後面只能接名詞或專有名詞，接代詞就改寫成短式所有格。",
      "練習句型：造三句 Her dogs… 的句子並標出 be 動詞，練熟了就不會單複數用錯。",
      "口訣：名詞前用 her，單獨用 hers，of 後面換名字。"
    ]
  },
  "feeds": {
    "zh": "餵食",
    "ipa": "fiːdz",
    "intro": "針對您提供的英文單字 **feeds**，這是一個單一單字，不能單獨成句，必須搭配主詞（例如 Rita、She）與受詞才有意義。feeds 是動詞 feed 的「第三人稱單數現在式」，中文是「餵（食）」。這個單字最該注意的，是結尾的 **-s** 與它的過去式 **fed**——兩者只差一個字母，卻代表完全不同的時態。",
    "headline": "feeds 結尾 -s 不可漏，過去式是 fed",
    "structure": [
      {
        "role": "動詞（核心用法）",
        "token": "feeds",
        "pos": "動詞 (Verb) — feed 的第三人稱單數現在式",
        "func": "表示「餵（食）」的習慣性動作。主詞若是 Rita、Tom、he、she、it 等單數，動詞結尾一定要加 -s",
        "mark": "O"
      },
      {
        "role": "原形對照",
        "token": "feeds",
        "pos": "動詞原形 (Base Form) — feed",
        "func": "feeds 去掉結尾 -s 就是原形 feed。當主詞是 I、you、we、they 等複數時，必須改回原形 feed，不能用 feeds",
        "mark": "O"
      },
      {
        "role": "過去式對照",
        "token": "feeds",
        "pos": "過去式 (Past Tense) — fed",
        "func": "feed 是不規則動詞，過去式是 fed（不是 feeded、不是 feeds）。句中一旦出現 yesterday、last night 等過去時間，動詞就要立刻換成 fed",
        "mark": "O"
      },
      {
        "role": "詞性對照",
        "token": "feeds",
        "pos": "名詞 (Noun) — feed 亦可指「飼料」",
        "func": "同一個字形還能當名詞「飼料」；當名詞時可數，寫成 two feeds 就是「兩份飼料」。動詞與名詞用法要分清楚，不能混著用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤（字母重複或多加母音）",
        "bad": "(X) Rita **feedes** her dogs every day. ／ (X) Rita **feedz** her dogs every day.",
        "ok": "(O) Rita **feeds** her dogs every day.",
        "why": "feeds 的拼字是 f-e-e-d-s，前面一定是兩個 e，結尾才是 s。台灣國中生最常見的錯法有兩種：一種是把 feed 與 -s 之間又加一個 e，寫成 feedes；另一種是用 z 取代 s，寫成 feedz。原因是把英文的「-s 结尾」誤記成中文式的加音。判斷法：唸出 feed 的讀音 /fiːd/，接一個極短促的 /z/ 音，字母就只是多加一個 s，不會多出任何母音。",
        "exOkText": "(O) My father **feeds** the fish every morning.",
        "exOkZh": "我爸爸每天早上餵魚。",
        "exBadText": "(X) My father **feedes** the fish every morning.",
        "exBadNote": "錯誤：feed 與 -s 之間多出一個 e，應為 feeds"
      },
      {
        "title": "發音錯誤（-s 尾讀成 /s/ 或與 feet 混淆）",
        "bad": "(X) Rita **feeds**（讀成 /fiːts/）her dogs.",
        "ok": "(O) Rita **feeds**（讀成 /fiːdz/）her dogs.",
        "why": "feeds 結尾是清音節尾，出現在 /d/ 之後時要濁化成 /dz/，所以正確讀音是 /fiːdz/，不是 /fiːts/。台灣學生常唸成 /fiːts/，理由是把所有 -s 都讀成輕短的清音。另外 feed 的長音 /iː/ 也很容易被唸成短音 /ɪ/，變成 /fɪdz/，與 fit 混淆。判斷法：唸完 /iː/ 後嘴巴要保持微笑、拉長，再快速滑到 /dz/，整個音節才會清楚。",
        "exOkText": "(O) Tom **feeds** his cat twice a day.",
        "exOkZh": "湯姆一天餵他的貓兩次。",
        "exBadText": "(X) Tom **feeds**（讀成 /fiːts/）his cat twice a day.",
        "exBadNote": "錯誤：-s 在 /d/ 後要濁化，應讀 /dz/ 而非 /ts/"
      },
      {
        "title": "時態錯誤（把現在式 feeds 當成過去式）",
        "bad": "(X) Rita **feeds** her dogs yesterday.",
        "ok": "(O) Rita **fed** her dogs yesterday.",
        "why": "feeds 是「現在式第三人稱單數」，只描述習慣或現在的動作；一旦句子裡出現 yesterday、last night、two days ago 等過去時間，動詞就必須换成過去式。feed 是少數不規則動詞之一，過去式是 fed，絕對不能寫成 feeded。學生常犯的錯是「看到主詞是 Rita 就自動加 s」，忘了先看時間。判斷法：寫完動詞先不要決定加不加 s，請先圈出句子裡的時間副詞；沒有過去時間才用 feeds。",
        "exOkText": "(O) Rita **fed** her dogs yesterday.",
        "exOkZh": "麗塔昨天餵了她的狗。",
        "exBadText": "(X) Rita **feeds** her dogs yesterday.",
        "exBadNote": "錯誤：有 yesterday，動詞要用過去式 fed"
      },
      {
        "title": "詞性錯誤（把動詞 feeds 當名詞使用）",
        "bad": "(X) The **feeds** are cheap this week.",
        "ok": "(O) The **feed** is cheap this week.",
        "why": "feeds 作動詞是「餵食」，作名詞時對應的單數是 feed，指的是「飼料」。當你要說「這些飼料很便宜」時，feed 是可數名詞，要用複數 feeds；一旦句中已經有 the 這種單數冠詞，前面就只能接單數 feed。混淆的來源是中文「飼料」翻成英文後，學生直接套上 -s。判斷法：先看後面有沒有動詞（are / is / buy / use）；有名詞（飼料）時才用 feed / feeds，有動作時才用 feed / feeds 作動詞。",
        "exOkText": "(O) The **feed** for the dogs is expensive.",
        "exOkZh": "狗的食物很貴。",
        "exBadText": "(X) The **feeds** for the dogs are expensive.",
        "exBadNote": "錯誤：feed 在此為單數名詞，the feeds 語意變成「多份飼料」"
      }
    ],
    "traps": [
      "**第三人稱單數的陷阱**：feeds 只用在 he、she、it、單數人名或單數名詞之後；主詞若是 they、we、you 或複數名詞，動詞一律用原形 feed。",
      "**不規則過去式的陷阱**：feed 的過去式是 fed，屬於 f-e-d 三字母家族（feed / fled / fled），不要自行加上 -ed 變成 feeded。",
      "**辨音題的陷阱**：feeds 讀 /fiːdz/，feet 讀 /fiːt/，差在最後一個 /z/ 與 /t/；會考常考「選出與 feeds 發音相近但不同」的選項。",
      "**詞性陷阱**：同一字形 feed 可作動詞也可作名詞。看到句子裡沒有「人」在做動作時，別忘了它可能當「飼料」解釋。"
    ],
    "strategy": [
      "先圈時間，再選動詞：寫題第一步先找 yesterday、last night、every day 等時間字，決定好用 feeds 還是 fed 再往下寫。",
      "看到單數主詞就反射加 s：主詞是 Rita、he、the dog，動詞結尾立刻檢查一次有沒有 -s；主詞是 they、we，則絕對不加。",
      "把三態抄成一行：feed - feeds - fed，貼在錯題本封面，看到 feed 就唸出三個形狀。",
      "不規則動詞用「小家庭」記憶：feed / fled 同屬一組，學會 feed 就能連帶記住 fled，比單背一串有效。"
    ]
  },
  "feeds her dogs": {
    "zh": "餵她的狗",
    "ipa": "fiːdz hɜːr dɔːɡz",
    "intro": "針對您提供的英文片語 **feeds her dogs**，這是「動詞 + 物主代名詞 + 名詞複數」組成的片語，沒有時間詞也不能單獨成句，但已經可以看出完整的語意主幹。最該注意的，是 **her** 是「她的」而不是「這裡」，以及 **dogs** 一定要用複數。",
    "headline": "her 是「她的」非 here；dogs 複數不能漏 s",
    "structure": [
      {
        "role": "動詞",
        "token": "feeds",
        "pos": "動詞 (Verb) — feed 的第三人稱單數現在式",
        "func": "這片語的動作核心，表示「餵（食）」；它後面必須接受詞，不能直接停在這裡",
        "mark": "O"
      },
      {
        "role": "物主形容詞",
        "token": "her",
        "pos": "物主代詞 (Possessive Adjective) — her",
        "func": "修飾後面的名詞 dogs，表示「她的」，用來交代這些狗是屬於誰的；它後面一定要接名詞，不能單獨使用",
        "mark": "O"
      },
      {
        "role": "名詞（受詞）",
        "token": "dogs",
        "pos": "名詞 (Noun) — dog 的複數",
        "func": "被餵的對象，放在動詞後面當受詞。dog 是可數名詞，一隻以上就要加 -s，寫成 her dog 就變成「她的那隻狗」的意思完全不同",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "近形詞混淆（her 她的／here 這裡）",
        "bad": "(X) Rita feeds **here** dogs every day.",
        "ok": "(O) Rita feeds **her** dogs every day.",
        "why": "her 和 here 只差一個字母，讀音也幾乎一樣（/hɜː/），但意思完全相反：her 是「她的」，here 是「這裡」（副詞）。本片語要用來交代所有權，必須用物主形容詞 her；而且 her 後面一定要接名詞，如果寫成 here，后面又直接跟 dogs，句子就既缺了所有權、又多了個不合語法的副詞。判斷法：看後面接的是不是名詞——接名詞用 her，接動詞或單獨出現用 here。",
        "exOkText": "(O) Tom **feeds** **his** cat every morning.",
        "exOkZh": "湯姆每天早上餵他的貓。",
        "exBadText": "(X) Tom **feeds** **here** cat every morning.",
        "exBadNote": "錯誤：here 是副詞「這裡」，不能放在名詞前當所有格"
      },
      {
        "title": "冠詞與物主代詞誤用（her 前多加 the）",
        "bad": "(X) Rita feeds **the her** dogs every day. ／ (X) Rita feeds **a her** dog.",
        "ok": "(O) Rita feeds **her** dogs every day.",
        "why": "her 本身就是物主代詞，裡面已經含有「她的」這個指示功能，前面不需要再加 the 或 a 這類冠詞。要加冠詞的情況是名詞沒有帶所有格，例如 a dog；但 her dogs 已經用 her 交代了所有權，再加冠詞就變成多餘。台灣學生常因中文「她的那些狗」聽起來像要加指示詞，就直覺地補上 the。判斷法：看到 my、your、his、her、its、our、their 之類的物主代詞，後面直接接名詞，中間絕對不加任何冠詞。",
        "exOkText": "(O) Tom **feeds** **his** ducks every morning.",
        "exOkZh": "湯姆每天早上餵他的鴨子。",
        "exBadText": "(X) Tom feeds the his ducks every morning.",
        "exBadNote": "錯誤：his 本身已含「他的」的意思，前面不可再加冠詞；物主代詞後面直接接名詞即可。"
      },
      {
        "title": "語序錯誤（受詞被放到動詞前面）",
        "bad": "(X) **Her dogs** Rita feeds every day.",
        "ok": "(O) Rita **feeds** her dogs every day.",
        "why": "英文的基本語序是「主詞 + 動詞 + 受詞」，中文可以說「她的狗麗塔餵」，但英文絕對不行。受詞 her dogs 一定要緊跟在動詞 feeds 後面，這樣讀起來才是一個完整的動作。台灣學生常受中文「把字句」「受詞提前」語序的影響，把受詞拉到句首。判斷法：把片語翻成中文後，對照英文檢查「誰（主詞）做什麼（動詞）對誰做（受詞）」，順序反了就一定錯。",
        "exOkText": "(O) Rita **feeds** **the birds** every morning.",
        "exOkZh": "麗塔每天早上餵鳥。",
        "exBadText": "(X) **The birds** Rita feeds every morning.",
        "exBadNote": "錯誤：受詞被提到句首，違反「主詞＋動詞＋受詞」語序"
      },
      {
        "title": "詞義辨析（feed 餵食／raise 飼養）",
        "bad": "(X) Rita **feeds** her dogs since they were puppies.",
        "ok": "(O) Rita **raises** her dogs since they were puppies.",
        "why": "feed 是「每天按時餵東西給動物吃」，重點在「吃的那個動作」；raise 則是「從小把動物養大、照顧牠成長」，重點在「養育的過程」。兩者中文都可能被籠統地翻成「養」，所以學生常混用。判斷法：問自己句子強調的是「今天餵了東西」還是「從小拉扯大」；前者用 feed，後者用 raise。此外養「人」時只能用 raise children，不能說 feed children。",
        "exOkText": "(O) My aunt **raises** three goats on the farm.",
        "exOkZh": "我阿姨在農場養了三隻山羊。",
        "exBadText": "(X) My aunt **feeds** three goats on the farm.",
        "exBadNote": "錯誤：養大、照顧動物成長要用 raise，feed 只指餵食"
      }
    ],
    "traps": [
      "**her / his / their 的陷阱**：her 是「她的」，his 是「他的」，their 是「他們的」。片語中修飾名詞的所有格，後面一定要接名詞，her 本身不能當受詞用。",
      "**可數名詞的陷阱**：dog、cat、bird 都是可數名詞，泛指一群時不加 -s 會被扣分；會考常在「單複數」題型直接考這個。",
      "**基本語序的陷阱**：英文一定要「主詞在前、動詞在中、受詞在後」，不會像中文一樣把受詞提到前面。",
      "**feed / raise / keep 的陷阱**：這三個中文都能翻成「養」，但英文分得很細——餵食用 feed，養大用 raise，飼養籠統可用 keep。"
    ],
    "strategy": [
      "用「主—動—受」三格檢查：把片語拆成三塊，確認順序是誰做什麼、對誰做，任何一塊跑到前面都要立刻畫掉。",
      "看到 her、his、their 就問後面有沒有名詞：物主代詞是「空的」，後面沒有名詞就是錯的。",
      "名詞複數養成檢查習慣：寫完一個可數名詞就唸一次「一隻／兩隻」，數量超過一就自動加 -s。",
      "把詞義相近的單字做成對照卡：feed / raise / keep、also / too / as well 三組一起背，考試時才不會互換。"
    ]
  },
  "day": {
    "zh": "一天",
    "ipa": "deɪ",
    "intro": "針對您提供的英文單字 **day**，這是一個單一名詞，不能單獨成為完整句子，前面通常要加冠詞或數詞（a day、two days、every day）。中文的「一天」在英文裡有三種不同表現：一天（a day）、每天（every day）、白天（the day）。最該注意的，是單複數與 **every day 不能加 s** 這兩件事。",
    "headline": "泛指要複數 days；every day 永遠不加 s",
    "structure": [
      {
        "role": "名詞（核心用法）",
        "token": "day",
        "pos": "名詞 (Noun) — 可數名詞",
        "func": "表示「一天、一日」，是計算時間的基本單位；單獨使用時前面要加冠詞或數詞，如 a day、two days",
        "mark": "O"
      },
      {
        "role": "複數形式",
        "token": "day",
        "pos": "複數 (Plural) — days",
        "func": "當數量超過一天時，day 要加 -s 變成 days，例如 three days（三天）。單複數的差別會直接改變句子的意思",
        "mark": "O"
      },
      {
        "role": "介系詞搭配",
        "token": "day",
        "pos": "名詞片語 (Noun Phrase) — during the day / at night",
        "func": "day 也可表示「白天」，此時常與 during the day、in the daytime 連用，並與 at night 形成對比",
        "mark": "O"
      },
      {
        "role": "複合詞",
        "token": "day",
        "pos": "複合詞 (Compound Word) — birthday / Monday",
        "func": "day 當詞根時，前面要與其他字直接連寫成一個字：birthday（生日）、daylight（日光）、Monday（星期一）",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "可數名詞單複數（三天誤寫成 three day）",
        "bad": "(X) I stayed there for **three day**. ／ (X) It took me **two day** to finish it.",
        "ok": "(O) I stayed there for **three days**.",
        "why": "day 是可數名詞，數量大於一時一定要變成複數 days。中文「三天」的「三」已經隱含複數，但英文要求把這個複數訊息寫在名詞上。台灣學生常把中文的數量詞習慣直接搬過去，只寫數字不加 -s。判斷法：數字大於 1 且名詞是可數的，就一定要在名詞後面加 -s（three books、two days、five apples），這是會考最基本也最常見的扣分點。",
        "exOkText": "(O) We practiced English for **two hours** every **day**.",
        "exOkZh": "我們每天練習英文兩小時。",
        "exBadText": "(X) We practiced English for two hour every day.",
        "exBadNote": "錯誤：hour 是可數名詞，兩小時要用複數 hours"
      },
      {
        "title": "介系詞搭配錯誤（在白天誤用 in the day）",
        "bad": "(X) He works **in the day** and sleeps **in the night**.",
        "ok": "(O) He works **during the day** and sleeps **at night**.",
        "why": "day 表示「白天」時，最自然的說法是 during the day 或 in the daytime；中文的「在白天」若直譯成 in the day，雖然偶爾有人這樣說，但不是會考標準用法。特別要注意它與 at night 的對比關係——夜晚是「在某一點的時候」，用 at；白天是一整段時間，用 during / in the。判斷法：把中文的「在……」和英文的 at / in / on / during 逐一配對，「在早上」用 in the morning、「在晚上」用 at night，別混用。",
        "exOkText": "(O) Most people **work during the day** and rest **at night**.",
        "exOkZh": "大多數人白天工作、晚上休息。",
        "exBadText": "(X) Most people work in the day and rest in the night.",
        "exBadNote": "錯誤：「在夜晚」固定用 at night，「在白天」用 during the day"
      },
      {
        "title": "複合副詞誤加複數（every days / every Day）",
        "bad": "(X) **Every days** I walk my dog. ／ (X) **Every Day** I walk my dog.",
        "ok": "(O) **Every day** I walk my dog.",
        "why": "every 後面的單數名詞絕對不能加 -s，這是英文最基本的規則：every day、every week、every student，永遠是單數。此外 every day 在句中當「每天」這個複合副詞時，day 必須全部小寫；只有句子的第一個字才需要大寫。混淆的來源是中文「每天」沒有單複數變化。判斷法：看到 every、each，就立刻把後面的名詞鎖定在單數，並檢查大小寫是否正確。",
        "exOkText": "(O) **Every morning** I drink a cup of tea.",
        "exOkZh": "我每天早上都喝一杯茶。",
        "exBadText": "(X) **Every Mornings** I drink a cup of tea.",
        "exBadNote": "錯誤：every 後面的名詞要用單數且小寫，應為 every morning"
      },
      {
        "title": "複合詞拼寫錯誤（birthday 不可拆開）",
        "bad": "(X) My **birth day** is in May.",
        "ok": "(O) My **birthday** is in May.",
        "why": "day 當「詞根」跟其他字結合時，兩邊要直接連寫成一個單字，不能用空格分開。這類詞在國中階段很常見：birthday（生日）、daylight（日光）、everyday（日常的，形容詞）、Monday、Tuesday、Friday、Wednesday、Thursday、Saturday。台灣學生常依中文的「生日」兩字對應英文時，把 birthday 拆成 birth day。判斷法：把這組詞當成一個整體背誦，並注意 everyday（形容詞「日常的」）與 every day（副詞「每天」）的差別。",
        "exOkText": "(O) We had a party on my grandmother's **birthday**.",
        "exOkZh": "我們在我奶奶生日時辦了派對。",
        "exBadText": "(X) We had a party on my grandmother's birth day.",
        "exBadNote": "錯誤：birthday 是單字，不能拆成 birth day"
      }
    ],
    "traps": [
      "**every 後的單數陷阱**：every day、every week、every student 全部用單數；寫成 every days 在會考中一定扣分。",
      "**everyday 與 every day 的陷阱**：everyday 是形容詞（日常的，如 everyday life），every day 是副詞片語（每天，如 I do it every day），兩者差一個空格，意義完全不同。",
      "**at night 的固定用法陷阱**：「在夜晚」永遠是 at night，at 在這裡表示「在某個時間點」；不要寫成 in the night。",
      "**星期名稱拼寫陷阱**：星期幾的名稱一律大寫開頭且不拆開，如 Monday、Wednesday、Friday，前面不加 the 也可直接用 on Monday。"
    ],
    "strategy": [
      "看到 every / each 就鎖單數：這兩個字出現的句子，後面所有名詞一律不變複數，寫完再回頭檢查一次。",
      "在腦中做「中英配對表」：早上 in the morning、中午 at noon、下午 in the afternoon、晚上 at night、全部時間 all day，一行一組背起來。",
      "把星期名稱畫成一個星期的圓圈：Monday 到 Sunday 繞一圈，順便複習 Wednesday 雙 d、Thursday 沒有 u。",
      "每天寫英文日記時刻意用一次 every day 和 once a day，寫錯就立刻抄寫正確形式，讓單複數規則變成肌肉記憶。"
    ]
  },
  "a day": {
    "zh": "一天",
    "ipa": "ə deɪ",
    "intro": "針對您提供的英文片語 **a day**，這是「冠詞 + 可數名詞單數」的最小單位片語，不能單獨成句，但已經是完整的名詞片語。中文的「一天」在英文裡可以對應 a day（泛指一天）、one day（某一天）、the day（特定的那天）。最該注意的，是冠詞 **a** 的選擇與省略規則。",
    "headline": "冠詞 a 不可省、不可用 an，也不能說 the day",
    "structure": [
      {
        "role": "冠詞",
        "token": "a",
        "pos": "冠詞 (Article) — 不定冠詞 a",
        "func": "放在可數名詞單數前面，表示「一個」；因 day 以 /d/ 這個輔音音開頭，所以用 a 而不是 an",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "day",
        "pos": "名詞 (Noun) — 可數名詞單數",
        "func": "表示時間單位「一天」。被冠詞 a 修飾時必須是單數，寫成 a days 是錯的；表達「三天」要改成 three days",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞選擇錯誤（a 與 an 混淆）",
        "bad": "(X) I will stay for **an day**.",
        "ok": "(O) I will stay for **a day**.",
        "why": "a 與 an 的選擇不看你怎麼唸中文，而是看**後面名詞第一個音**是不是母音音。day 的發音是 /deɪ/，開頭是輔音音 /d/，所以必須用 a；只有像 hour（/aʊər/）這種雖然拼字以 h 開頭、但發音是母音的字才會用 an。台灣學生常因為「一」聽起來像母音而一律用 an。判斷法：把名詞單獨唸一次，若唸出來第一個音是 /e/、/a/、/o/ 才用 an。",
        "exOkText": "(O) We waited for **an hour** and **a day**.",
        "exOkZh": "我們等了一小時又等了一天。",
        "exBadText": "(X) We waited for **a hour** and **an day**.",
        "exBadNote": "錯誤：hour 唸 /aʊər/ 用 an，day 唸 /deɪ/ 用 a，兩者剛好相反"
      },
      {
        "title": "冠詞誤用（泛指 a 與特指 the 混淆）",
        "bad": "(X) I want to rest **the day**. ／ (X) She was sick **the day**.",
        "ok": "(O) I want to rest **a day**.",
        "why": "冠詞 a 表示泛指「任何一個、隨便一個」，對應中文沒有特定對象的「一天」；冠詞 the 表示特指「特定的那一天」，前面通常要有對話中的線索或修飾語。台灣學生常因為中文省略冠詞，就誤以為英文也可以隨便加 the，結果語意整個跑掉。判斷法：問自己「是哪一天？」——答不出具體是哪一天，就用 a；已經知道是哪一天（例如昨天、上課那天、the day we met），才用 the。",
        "exOkText": "(O) My father takes a walk **a day** after dinner.",
        "exOkZh": "我爸爸每天晚饭后散步。",
        "exBadText": "(X) My father takes a walk the day after dinner.",
        "exBadNote": "錯誤：泛指「每天」應用 a day，the day 是「那一天」"
      },
      {
        "title": "語意辨析（a day 一天／a whole day 一整天）",
        "bad": "(X) It rained **a day** long. ／ (X) I waited **a day** there.",
        "ok": "(O) It rained **a whole day** long.",
        "why": "a day 是一個「二十四小時的時間單位」，強調的是「一天這個量」；如果要強調「從頭到尾、一整天沒有間斷」，就必須加上 whole（整個），寫成 a whole day 或 all day。中文的「下了一整天雨」「等了一整天」裡的「整」字，英文要用 whole 才有。少了 whole，語意會變成「下了一天那麼長的時間」，雖然文法可接受，但和中文想表達的語意並不相同。判斷法：中文裡出現「整、整天、一整天」時，先檢查英文有沒有 whole。",
        "exOkText": "(O) We stayed at the museum for **a whole day**.",
        "exOkZh": "我們在博物館待了一整天。",
        "exBadText": "(X) We stayed at the museum for **a day long**.",
        "exBadNote": "錯誤：中文「一整天」需用 a whole day，a day long 語意不同"
      },
      {
        "title": "介系詞後冠詞省略（for day 漏掉 a）",
        "bad": "(X) She stayed there **for day**. ／ (X) I waited **for day** before you came.",
        "ok": "(O) She stayed there **for **a** day**.",
        "why": "在 for two days、in a day、after a day 這類結構中，a day 是一個完整的名詞片語，冠詞 a 絕對不能省略。台灣學生因為中文「待了一天」沒有冠詞，就把英文的 a 一併省掉，結果句子在會考的單字填空、克漏字題型中會直接被扣分。判斷法：只要 day 的前面是介系詞（for / in / after / within），就把它當成一個完整名詞片語，冠詞、數詞一個都不能少。",
        "exOkText": "(O) The rain lasted for **a whole day** in our town.",
        "exOkZh": "我們這裡的雨下了一整天。",
        "exBadText": "(X) The rain lasted for whole day in our town.",
        "exBadNote": "錯誤：for 後面接的是完整名詞片語，冠詞 a 不能省略，否則句子結構不完整。"
      }
    ],
    "traps": [
      "**a 與 an 的陷阱**：判斷依據是發音不是拼字。hour（/aʊər/）用 an、honest（/ˈɑːnɪst/）用 an，而 university（/ˌjuːnɪˈvɜːsəti/）用 a。",
      "**冠詞省略的陷阱**：英文只要在正式寫作中，單數可數名詞前幾乎都要有冠詞或限定詞，不能像中文一樣全省掉。",
      "**a day 與 one day 的陷阱**：a day 是泛指的「一天」，one day 強調「某一天」（有一天）；He is my friend. → She is **a** day。／ He called me **one day**. 兩者意思不同。",
      "**可數名詞與複數的陷阱**：a day 只能用單數；表達「三天以上」必須改為複數 three days，冠詞 a 會被數字取代。"
    ],
    "strategy": [
      "口訣「單數不裸奔」：單數可數名詞前面如果沒有 this、that、my、your 等限定詞，就一定要有 a、an 或 the。",
      "a / an 判斷兩步驟：先看後面單字，再把那個單字單獨唸出來判斷首音，不要用中文思維直接決定。",
      "寫完含 a day 的句子，用手指數一次「主詞、動詞、介系詞、冠詞、名詞」，確認冠詞的位置沒有掉。",
      "把 a day / a whole day / all day / one day / the day 五個版本抄成一列對照，考前唸一次就能分清楚。"
    ]
  },
  "times a day": {
    "zh": "一天幾次",
    "ipa": "taɪmz ə deɪ",
    "intro": "針對您提供的英文片語 **times a day**，這是表示頻率的副詞片語，通常放在主要動詞之後或句尾，不能單獨成句。中文「一天幾次」在英文裡有固定的組合方式：**次數 + times + a day**。最該注意的，是次數要用複數 **times**，以及冠詞 **a** 絕對不能省略。",
    "headline": "次數加 times，後接 a day 不能斷開",
    "structure": [
      {
        "role": "次數",
        "token": "times",
        "pos": "數詞 (Numeral) + 名詞 (Noun) — time 的複數",
        "func": "放在 times 前面的數字表示「幾次」；一次用 once、兩次用 twice、三次以上才用 three times、four times，times 一定要用複數",
        "mark": "O"
      },
      {
        "role": "冠詞",
        "token": "a",
        "pos": "冠詞 (Article) — 不定冠詞 a",
        "func": "連接次數與時間單位，表示「每一個」；在 once a day、twice a day、three times a day 這類固定結構中絕對不能省略",
        "mark": "O"
      },
      {
        "role": "時間單位",
        "token": "day",
        "pos": "名詞 (Noun) — 可數名詞單數",
        "func": "表示頻率的週期是「一天」。被 a 修飾時必須用單數，寫成 a days 是錯的",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞後名詞誤加複數（a days）",
        "bad": "(X) Rita feeds her dogs three times **a days**.",
        "ok": "(O) Rita feeds her dogs three times **a day**.",
        "why": "不定冠詞 a / an 後面一定要接可數名詞的單數，這是英文的基本規則：a day、a dog、an apple，絕對不能寫成 a days、a dogs。times a day 是一個固定的頻率單位，表示「每一個當中」，所以這裡的 day 只表示「一天這個週期」，不需要複數。混淆的來源是中文「一天幾次」裡的「幾次」讓人聯想到複數。判斷法：看到 a 或 an，後面的名詞立刻鎖定單數，一個字都不准加。",
        "exOkText": "(O) I brush my teeth **three times a day**.",
        "exOkZh": "我一天刷三次牙。",
        "exBadText": "(X) I brush my teeth three times a days.",
        "exBadNote": "錯誤：不定冠詞 a 後面一定接可數名詞的單數，a days 裡的複數 -s 是多餘的。"
      },
      {
        "title": "時間單位誤用（times one day / times the day）",
        "bad": "(X) I feed my dog three times **one day**. ／ (X) He drinks milk **times the day**.",
        "ok": "(O) I feed my dog three times **a day**.",
        "why": "times a day 是固定的頻率單位，「一天」這個週期前面只能搭配不定冠詞 a，作用相當於中文的「每一個」。one day 是「有一天」（指某個特定的日子），the day 是「那一天」，兩者都把時間鎖定成單獨的某一天，不能拿來當重複的量詞使用。台灣學生常因中文「一天三次」的「一天」和「有一天」的「一天」寫法相同而混用。判斷法：只要前面有「幾次」在修飾，這裡的單位就必須是 a day，寫成 every day、one day、the day 都會出錯或語意變質。",
        "exOkText": "(O) I take a shower **twice a day**.",
        "exOkZh": "我一天洗兩次澡。",
        "exBadText": "(X) I take a shower twice one day.",
        "exBadNote": "錯誤：頻率單位的週期固定用 a day，不能用 one day"
      },
      {
        "title": "次數用單數（three time a day）",
        "bad": "(X) Rita feeds her dogs **three time a day**.",
        "ok": "(O) Rita feeds her dogs **three times a day**.",
        "why": "「次」這個概念在英文裡，兩次以上要用複數 times。twice 之後接單數 time（twice a day），但 three times、four times 之後一定接複數。台灣學生常把中文「三次」的「次」直接對應成單數 time，結果漏掉 -s。判斷法：把次數寫成數字後，唸出英文「幾 times」；times 的 s 聽得見才算對，一次則特判成 once。",
        "exOkText": "(O) He goes to the gym **four times a week**.",
        "exOkZh": "他一個星期去健身房四次。",
        "exBadText": "(X) He goes to the gym four time a week.",
        "exBadNote": "錯誤：「次」要複數，應為 four times a week"
      },
      {
        "title": "頻率片語位置錯誤（插在動詞與受詞之間）",
        "bad": "(X) Rita **three times a day** feeds her dogs.",
        "ok": "(O) Rita **feeds** her dogs **three times a day**.",
        "why": "表示頻率的片語（three times a day、every day、often）在英文裡屬於副詞片語，位置應該放在「主要動詞之後」，或在句子最末尾；它不能插進主詞與動詞之間，也不能插在動詞與受詞之間。台灣學生常受中文「一天三次餵狗」的語序影響，把整個頻率片語搬到最前面或中間。判斷法：先用括號把 three times a day 框起來，暫時當作不存在，再檢查剩下的「主詞 + 動詞 + 受詞」是否完整，最後把括號整塊放到動詞後面。",
        "exOkText": "(O) My brother **plays basketball** **three times a week**.",
        "exOkZh": "我哥哥一個星期打三次籃球。",
        "exBadText": "(X) Three times a week my brother plays basketball.",
        "exBadNote": "錯誤：頻率片語屬於副詞，應放在主要動詞之後或句末，不能插進主詞與動詞之間擋住句子。"
      }
    ],
    "traps": [
      "**once / twice / three times 的陷阱**：一次是 once（不是 one time），兩次是 twice（不是 two times），三次以上才用 three times、four times。",
      "**冠詞陷阱**：once a day、twice a day 中間的 a 不可省略，這是會考克漏字最常挖的地方。",
      "**語序陷阱**：頻率片語放在主要動詞之後或句末；放在句首要配合強烈語氣，會考題目一律以動詞後為準。",
      "**times 與 time 的陷阱**：time（時間）作不可數名詞不可加 s；times（次數）才可數，寫 three times 才是「三次」。"
    ],
    "strategy": [
      "把 once a day、twice a day、three times a day 當成三個不可拆的整塊背誦，考試時整個搬進空格。",
      "寫句子先寫「主詞 + 動詞 + 受詞」，最後才把頻率片語貼到動詞後面，順序永遠不會錯。",
      "複數 -s 檢查：寫完 times 之後，刻意在旁邊畫一個小 s，提醒自己次數是複數。",
      "延伸練習把 a day 換成 a week、a month、a year 各寫一句，發現規則完全一樣，記憶就會穩固。"
    ]
  },
  "many times a day": {
    "zh": "一天多次",
    "ipa": "ˈmen.i taɪmz ə deɪ",
    "intro": "針對您提供的英文片語 **many times a day**，這是「數量詞 + 次數 + 冠詞 + 時間單位」組成的頻率片語，屬於副詞片語，不能單獨成句。它比單純的 times a day 多了 many，表示「很多次、非常頻繁」。最該注意的，是 **many 之後一定要接可數複數**，以及「a day」已經含有「每一個」的意思，不能再疊加 every day。",
    "headline": "many 後接複數 times；不可再疊加 every day",
    "structure": [
      {
        "role": "數量詞",
        "token": "many",
        "pos": "限定詞 (Determiner) — 修飾可數名詞複數",
        "func": "表示「很多」，後面一定要接可數名詞的複數形式。它不能修飾不可數名詞，那是 much 的工作",
        "mark": "O"
      },
      {
        "role": "次數",
        "token": "times",
        "pos": "名詞 (Noun) — time 的複數",
        "func": "表示「次數」；被 many 修飾，所以必須用複數 times，寫成 many time 是錯的",
        "mark": "O"
      },
      {
        "role": "時間單位",
        "token": "a day",
        "pos": "名詞片語 (Noun Phrase) — a + day",
        "func": "表示頻率週期為「一天」。這裡的 a 已相當於中文的「每一個」，所以整個片語等於「一天很多次」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "限定詞選擇錯誤（many 與 much 混淆）",
        "bad": "(X) Rita feeds her dogs **much** times a day.",
        "ok": "(O) Rita feeds her dogs **many** times a day.",
        "why": "many 只能用來修飾「可數名詞的複數」，much 只能用來修飾「不可數名詞」。times 是可數的次數，所以前面只能用 many；much times 在英文中不存在。反過來，water、money、time（時間）這些不可數名詞前面就必須用 much。判斷法：看到 many 就問「後面的名詞能不能一個一個點數？」能點數（books、times、days）用 many；不能點數（water、money、information）用 much。",
        "exOkText": "(O) She makes **many** mistakes in her homework.",
        "exOkZh": "她的作業裡有很多錯誤。",
        "exBadText": "(X) She makes much mistakes in her homework.",
        "exBadNote": "錯誤：mistakes 是可數複數，要用 many 不能用 much"
      },
      {
        "title": "many 後接單數（many time a day）",
        "bad": "(X) Rita feeds her dogs **many time** a day.",
        "ok": "(O) Rita feeds her dogs **many times** a day.",
        "why": "many 的規則和 every、each、another 完全一樣：後面的可數名詞一定要用複數。many times、many books、many students，唯獨不能寫 many time。台灣學生常把 many 理解成單純的「很多」，以為名詞形式可以自己決定，於是漏掉 -s。判斷法：寫完 many 之後立刻在名詞旁邊標一個「複數」記號，寫完整句再回頭檢查 -s 有沒有出現。",
        "exOkText": "(O) My father reads **many books** in a year.",
        "exOkZh": "我爸爸一年讀很多書。",
        "exBadText": "(X) My father reads many book in a year.",
        "exBadNote": "錯誤：many 後面的可數名詞要用複數 books"
      },
      {
        "title": "時間單位重複疊加（many times every day）",
        "bad": "(X) Rita feeds her dogs **many times every day**.",
        "ok": "(O) Rita feeds her dogs **many times a day**.",
        "why": "a day 本身已經含有「每一天」的意思，等同中文的「一天……次」的量詞結構；如果再把 every day 加在後面，就變成同時表達兩次時間週期，語意重複且不符合英文慣用說法。中文「一天多次」只有一個時間單位，所以英文也只需要一個。判斷法：看到 a day、per day、each day 其中之一，就不要再寫 every day；三個時間單位只能挑一個用。",
        "exOkText": "(O) He checks his phone **many times a day**.",
        "exOkZh": "他一天看好幾次手機。",
        "exBadText": "(X) He checks his phone many times every day.",
        "exBadNote": "錯誤：a day 已含「每一天」，不可再疊加 every day"
      },
      {
        "title": "比較級誤用（more many times）",
        "bad": "(X) Rita feeds her dogs **more many times** a day than her brother.",
        "ok": "(O) Rita feeds her dogs **many more times** a day than her brother.",
        "why": "many 本身已經是「很多」的限定詞，它的比較級是 many more，結構是「限定詞 + more + 原級複數名詞」：many more、a lot more、much more。把 many 變成比較級時，只能在後面加 more，不能寫成 more many。台灣學生常因中文「更多次」直譯成「更多 + many」而犯此錯。判斷法：比較級的公式只有一個——在原有的量詞後面加 more；口訣「原本有多少，就加多少 more」。",
        "exOkText": "(O) This year I read **many more books** than last year.",
        "exOkZh": "今年我讀的書比去年多很多。",
        "exBadText": "(X) This year I read more many books than last year.",
        "exBadNote": "錯誤：比較級為 many more，不能寫成 more many"
      }
    ],
    "traps": [
      "**many 與 much 的陷阱**：many + 可數複數（many times、many books）；much + 不可數（much water、much time）。時間「時間」是不可數的，much time 對，many time 錯。",
      "**many 後面必須複數的陷阱**：many time、many day 全部錯；和 every、each、another 的規則完全一樣。",
      "**時間單位不疊加的陷阱**：a day、per day、each day、every day 只能擇一，寫兩個就是語意重複。",
      "**比較級公式的陷阱**：many more、much more、a lot more，不可寫成 more many、more much。"
    ],
    "strategy": [
      "用「點數測試」分辨 many / much：能在腦中一個一個點算的名詞用 many，算不出個數的名詞用 much。",
      "寫完限定詞立刻檢查名詞：each、every、another、many、few、several 後面全部是單數禁區，看到名詞就確認沒有 -s。",
      "背誦時把 many times a day 當成不可拆的整塊，中間的 a 與 times 的 -s 都是固定成員。",
      "用替換練習鞏固：把 a day 換成 a week、a month，反覆寫 many times a week，會發現唯一難點只在 times 的複數。"
    ]
  },
  "Rita feeds her dogs many times a day": {
    "zh": "麗塔一天餵她的狗很多次",
    "ipa": "ˈriː.tə fiːdz hɜːr dɔːɡz ˈmen.i taɪmz ə deɪ",
    "intro": "針對您提供的英文句子 **Rita feeds her dogs many times a day**，這是一個語法完全正確的簡單句，結構是「主詞 + 動詞 + 受詞 + 頻率副詞片語」。它把前面學過的單字與片語全部串起來。整句最該注意的，是主詞 Rita 為第三人稱單數，動詞必須加 -s；以及人名的**大小寫**與句末的**標點符號**。",
    "headline": "第三人稱單數加 -s；人名大寫、句末要有句點",
    "structure": [
      {
        "role": "主詞",
        "token": "Rita",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "句子的主角，表示動作的執行者。人名首字母必須大寫，後面字母全部小寫，這是英文書寫的硬性規定",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "feeds",
        "pos": "動詞 (Verb) — 第三人稱單數現在式",
        "func": "表示習慣性的動作「餵食」。因為主詞 Rita 是第三人稱單數，動詞結尾一定要加 -s，這是整句最關鍵的一個字母",
        "mark": "O"
      },
      {
        "role": "物主形容詞",
        "token": "her",
        "pos": "物主代詞 (Possessive Adjective) — her",
        "func": "修飾後面的名詞 dogs，說明這些狗是屬於 Rita 的；Rita 是女性，所以用 her 而非 his",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "dogs",
        "pos": "名詞 (Noun) — dog 的複數",
        "func": "被餵的對象，置於動詞之後。泛指多隻狗，所以要用複數 dogs",
        "mark": "O"
      },
      {
        "role": "頻率副詞片語",
        "token": "many times a day",
        "pos": "副詞片語 (Adverb Phrase) — 頻率",
        "func": "說明這個動作發生的頻率「一天很多次」，放在受詞之後、句子末尾，是英文頻率片語的標準位置",
        "mark": "O"
      },
      {
        "role": "標點符號",
        "token": "（句末加句點）",
        "pos": "標點 (Punctuation) — Period",
        "func": "這是一個敘述句，句末必須加句點；若是疑問句才用問號，驚嘆語氣才用驚嘆號",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞與動詞一致（第三人稱單數漏 -s）",
        "bad": "(X) Rita **feed** her dogs many times a day.",
        "ok": "(O) Rita **feeds** her dogs many times a day.",
        "why": "在一般現在時中，主詞是第三人稱單數（I 以外的人名、he、she、it、單數名詞）時，動詞結尾一定要加 -s。Rita 是單數人名，所以必須寫 feeds。台灣學生最常見的錯法是受中文影響，因為中文動詞沒有單複數變化，就直接把原形 feed 寫上去。判斷法：寫完主詞先確認是「單數還是人稱複數」，單數就在動詞旁邊畫一個 s 提醒自己。",
        "exOkText": "(O) My sister **watches** TV every evening.",
        "exOkZh": "我姐姐每天晚上看電視。",
        "exBadText": "(X) My sister watch TV every evening.",
        "exBadNote": "錯誤：主詞為第三人稱單數，動詞要用 watches"
      },
      {
        "title": "專有名詞大小寫錯誤（人名首字母未大寫）",
        "bad": "(X) **rita** feeds her dogs many times a day.",
        "ok": "(O) **Rita** feeds her dogs many times a day.",
        "why": "英文的專有名詞（人名、地名、學校名）第一個字母一定要大寫，後面的字母則保持小寫。Rita 是人名，必須寫成 Rita，不能寫成 rita。台灣學生在快速作答的時候，句首第一個字往往隨手小寫，會考在檢查大小寫的題型中就會直接扣分。判斷法：每寫完一句，回頭看第一個字是不是大寫；如果第一個字是人名或地名，再確認後面沒有全部大寫。",
        "exOkText": "(O) **Tom** plays the piano after school.",
        "exOkZh": "湯姆放學後彈鋼琴。",
        "exBadText": "(X) **tom** plays the piano after school.",
        "exBadNote": "錯誤：人名 Tom 首字母必須大寫"
      },
      {
        "title": "物主代詞與所有權不一致（her 誤用成 his）",
        "bad": "(X) Rita feeds **his** dogs many times a day.",
        "ok": "(O) Rita feeds **her** dogs many times a day.",
        "why": "物主代詞要和句中的主詞對應：主詞是 Rita（女性），她的所有物就要用 her；his 是「他的」，屬於男性。台灣學生有時會受中文「牠們」不分性別的影響，或直接把前一課學到的 his 順手寫出來。判斷法：寫 her / his / their 之前，先回頭看一眼主詞是男生、女生還是一群人，性别對不上就是錯的。",
        "exOkText": "(O) **Linda** takes care of **her** little brother.",
        "exOkZh": "琳達照顧她的弟弟。",
        "exBadText": "(X) **Linda** takes care of **his** little brother.",
        "exBadNote": "錯誤：主詞是女性 Linda，所有物要用 her"
      },
      {
        "title": "句末標點符號缺失（沒有加句點）",
        "bad": "(X) Rita feeds her dogs many times a day",
        "ok": "(O) Rita feeds her dogs many times a day.",
        "why": "這是一個完整的敘述句，英文書寫規定句子結束時必須加句點（.）。台灣學生受中文標點習慣影響，很少在純英文句子後面放任何符號，於是會考在「選出正確句子」或「標點符號」題型中就會失分。判斷法：寫完英文句子的最後一個字，先問自己這是敘述句（句點）、疑問句（問號）還是驚嘆語氣（驚嘆號），再決定要加哪一個符號。",
        "exOkText": "(O) Tom **feeds** his dog **twice a day**.",
        "exOkZh": "湯姆一天餵他的狗兩次。",
        "exBadText": "(X) Tom feeds his dog twice a day",
        "exBadNote": "錯誤：這是敘述句，句末必須加句點；若是一般問句才用問號，驚嘆語氣才用驚嘆號。"
      }
    ],
    "traps": [
      "**第三人稱單數的陷阱**：句子沒有過去時間，就是一般現在時；主詞 Rita 是單數，動詞一定要加 -s（feeds、watches、studies），是會考最高頻的出題點。",
      "**人名大寫的陷阱**：專有名詞首字母大寫，其餘小寫；不要寫成 RITA，也不要寫成 rita。",
      "**所有格的陷阱**：her dogs 是「她的狗」，his dogs 是「他的狗」，their dogs 是「他們的狗」；非人類動物的複數要用 they / their / them。",
      "**頻率片語位置的陷阱**：many times a day 放在句尾或主要動詞之後；「一天多次」只有一個時間單位，不可再寫 every day。"
    ],
    "strategy": [
      "四步驟拆句：先圈主詞、確認人數 → 決定動詞形式 → 依序放受詞 → 最後貼上頻率片語並補標點。",
      "寫完必做三次檢查：主詞-動詞一致、專有名詞大小寫、句末標點，這三項是會考最穩的得分點。",
      "主詞旁邊寫上縮寫：看到人名就標「三單」，看到 he / she / it 也標「三單」，動詞欄立刻檢查 -s。",
      "把整句大聲唸兩次，唸到順口為止；語感能幫你發現漏字、順序不對和少加標點的問題。"
    ]
  },
  "fat": {
    "zh": "胖的",
    "ipa": "fæt",
    "intro": "針對您提供的英文單字 **fat**，這是一個單一形容詞，不能單獨成句，前面通常需要 be 動詞（is / are）或放在名詞前（a fat dog）。中文的「胖的」翻成 fat，但要注意 fat 也可作名詞指「油脂」，而它的比較級是 **fatter**，不是 more fat。最該注意的，是形容詞的位置與比較級的構成。",
    "headline": "fat 是形容詞；比較級 fatter 不能寫 more fat",
    "structure": [
      {
        "role": "形容詞（核心用法）",
        "token": "fat",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞或放在 be 動詞後作表語，表示「胖的」；放在名詞前時要緊貼名詞，如 a fat dog",
        "mark": "O"
      },
      {
        "role": "比較級",
        "token": "fat",
        "pos": "比較級 (Comparative) — fatter",
        "func": "描述「更胖」時，fat 加 -er 變成 fatter；fat 是單音節短音節形容詞，屬於直接加 -er 的一類",
        "mark": "O"
      },
      {
        "role": "名詞用法",
        "token": "fat",
        "pos": "名詞 (Noun) — 油脂、肥肉",
        "func": "作名詞時指食物中的「油脂」，屬於不可數名詞，不能加 -s；one unit of fat 這樣的量詞才會出現",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞比較級錯誤（more fat 誤用）",
        "bad": "(X) He is **more fat** than me.",
        "ok": "(O) He is **fatter** than me.",
        "why": "英文形容詞變成比較級有兩條路：短音節形容詞直接加 -er，長音節形容詞才在前面加 more。fat 只有一個音節，而且以短母音 a 結尾，屬於短音節，所以必須用 fatter，不能用 more fat。台灣學生常因中文「更胖」沒有明顯字尾而一律加 more。判斷法：先數音節，一個音節就加 -er，兩個以上的長音節才用 more；而且 more 後面的形容詞要還原成原級。",
        "exOkText": "(O) My dog is **fatter** than yours.",
        "exOkZh": "我的狗比你的狗胖。",
        "exBadText": "(X) My dog is more fat than yours.",
        "exBadNote": "錯誤：fat 為單音節短音節，比較級應為 fatter"
      },
      {
        "title": "不可數名詞誤加複數（fats）",
        "bad": "(X) The **fats** in this soup are good for you.",
        "ok": "(O) The **fat** in this soup is good for you.",
        "why": "fat 當名詞解釋「油脂」時，是不可數物質名詞，就像 water、money、rice 一樣，不能加 -s，也沒有用複數的時候。台灣學生看到中文「油脂」可數的印象，或直接套用前面學到的「名詞加 s」的規則，就會寫出 fats。判斷法：把 fat 換成 water、oil 試看看，句子一樣通順就代表它不可數；不可數名詞要數量時用 a piece of fat、a lot of fat。",
        "exOkText": "(O) There is too much **fat** in this fried chicken.",
        "exOkZh": "這炸雞的油脂太多了。",
        "exBadText": "(X) There are too much fat in this fried chicken.",
        "exBadNote": "錯誤：fat 作「油脂」時不可數，不可加 -s，也不用 are"
      },
      {
        "title": "形容詞位置錯誤（修飾名詞時被放到名詞後面）",
        "bad": "(X) Rita has two **dogs fat**.",
        "ok": "(O) Rita has two **fat dogs**.",
        "why": "英文字詞排列有固定順序：「形容詞 + 名詞」。當 fat 用來修飾名詞時，必須放在名詞前面，而且可以連續使用多個形容詞，如 a big fat dog。本句中的 two 是數詞，也屬於名詞前的修飾成分，所以正確順序是 two fat dogs。台灣學生常受中文「兩隻胖的狗」影響，寫成 dogs fat。判斷法：把中文裡形容詞的位置找出來，搬到英文裡的名詞前面去，絕對不會錯。",
        "exOkText": "(O) The **fat cat** is sleeping on my bed.",
        "exOkZh": "那隻胖貓正在我的床上睡覺。",
        "exBadText": "(X) The cat fat is sleeping on my bed.",
        "exBadNote": "錯誤：形容詞必須置於名詞前，不能寫成 cat fat"
      },
      {
        "title": "單獨使用錯誤（片語不能單獨成句）",
        "bad": "(X) **Fat.** ／ (X) Rita's dog is very **fat**? It sleeps all day.",
        "ok": "(O) Rita's dog is very **fat**.",
        "why": "fat 是一個形容詞，描述特徵的形容詞本身不能單獨成為句子，必須有主詞搭配 be 動詞（is / am / are）才能構成完整的句子。中文的「胖」可以單獨回答問題，英文不行。判斷法：寫完形容詞後問自己「誰（主詞）是（be 動詞）胖的」，三個部分缺一不可；如果只是單獨出現一個 fat，一定是漏寫了 be 動詞或主詞。",
        "exOkText": "(O) **These dogs are too fat.**",
        "exOkZh": "這些狗太胖了。",
        "exBadText": "(X) These dogs **too fat**.",
        "exBadNote": "錯誤：缺少 be 動詞 are，不能直接接形容詞"
      }
    ],
    "traps": [
      "**短音節形容詞的陷阱**：fat、big、hot、thin 這類單音節短音節形容詞，比較級直接加 -er（fatter、bigger、hotter），絕對不能加 more。",
      "**位置陷阱**：形容詞修飾名詞時一定在名詞前面（a fat dog）；作表語時一定在 be 動詞後面（is fat），兩種位置不能互換。",
      "**詞性陷阱**：fat 當「油脂」是不可數名詞，寫成 fats 或用 are 都是錯的，量詞要用 a piece of。",
      "**形近音近詞陷阱**：fat（胖的）、fit（健康的、合身的）、fate（命運）字形與讀音相近，會考常拿來出題，要分清楚。"
    ],
    "strategy": [
      "先數音節再變級：單音節短音節加 -er，單音節長音節（fine、big 的 b 為長音時仍加 -er）與多音節才考慮 more，寫前先分類。",
      "形容詞一律放句首修飾：寫「a ____ dog」的題目時，空格一定在名詞前面，直接把形容詞填進去。",
      "回答「為什麼牠們太胖」這類問題時，先寫 they are，再接 fat，結構一下就清楚。",
      "把 fat / fit / fate / flat 四個字抄成一列，唸出各自主題句，聽辨與字形同時加深印象。"
    ]
  },
  "too fat": {
    "zh": "太胖了",
    "ipa": "tuː fæt",
    "intro": "針對您提供的英文片語 **too fat**，這是「副詞 too + 形容詞 fat」構成的片語，本身還不能單獨成句，必須放在 be 動詞之後或名詞之前。中文的「太胖了」裡，「太」表示程度超過了理想狀態，英文用 **too**；要表達「很胖」才用 very。最該注意的，是 too 後面一定要接形容詞**原級**，以及修飾名詞時的冠詞順序。",
    "headline": "too 後接原級；修飾名詞時冠詞要放中間",
    "structure": [
      {
        "role": "程度副詞",
        "token": "too",
        "pos": "副詞 (Adverb) — 程度副詞",
        "func": "表示「太、超過了正常程度」，帶有負面或超出預期的語氣，後面必須接形容詞原級",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "fat",
        "pos": "形容詞 (Adjective) — 原級",
        "func": "描述狀態「胖的」。在 too 之後要用原級，不能變成 fatter、也不能換成名詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（too fat to sb）",
        "bad": "(X) These jeans are too fat **to me**.",
        "ok": "(O) These jeans are too fat **for me**.",
        "why": "「對某人而言太胖」要用 too + 形容詞 + **for** + 人，介系詞固定是 for，不是 to。to 只能出現在另一個結構 too...to do（太胖以致無法做某事）裡，例如 too fat to run。台灣學生常因中文「對我來說」而選擇直譯成 to me。判斷法：看到「too + 形容詞 + 某人」時，直接套公式 too + 形容詞 + for + sb，for 不用思考。",
        "exOkText": "(O) This coat is too fat **for me** to wear.",
        "exOkZh": "這件外套對我來說太胖了，穿不下。",
        "exBadText": "(X) This coat is too fat to me to wear.",
        "exBadNote": "錯誤：「對某人而言太胖」固定用 too + 形容詞 + for + 人；to 只出現在 too...to do 的結構裡。"
      },
      {
        "title": "程度副詞後誤用比較級（too fatter）",
        "bad": "(X) These dogs are **too fatter** than before.",
        "ok": "(O) These dogs are **too fat** now.",
        "why": "too 是程度副詞，後面的形容詞必須用**原級**，不能加 -er 也不能加 -est。中文「更胖」與「太胖」在翻譯時常被混為一談，但兩者結構不同：比較要用 fatter than …，程度要用 too fat。台灣學生有時看到 than 就反射加 -er，忘記前面已經有 too。判斷法：只要前面有 too、very、so、quite，就把後面的形容詞鎖在原級，出現 -er 就一定是錯的。",
        "exOkText": "(O) The puppies are **too fat** to run fast.",
        "exOkZh": "這些小狗太胖了，跑不快。",
        "exBadText": "(X) The puppies are too fatter to run fast.",
        "exBadNote": "錯誤：too 後的形容詞要用原級 fat，不能加 -er"
      },
      {
        "title": "冠詞與形容詞順序錯誤（a too fat dog）",
        "bad": "(X) Rita has **a too fat dog**.",
        "ok": "(O) Rita has **too fat a dog**.",
        "why": "英文形容詞的順序是「冠詞 + 形容詞 + 名詞」，也就是 a fat dog；當中間插入了 too、so、such 這類修飾語時，冠詞必須被夾在修飾語和名詞之間，變成 too fat **a** dog。台灣學生常因中文「一隻太胖的狗」而寫成 a too fat dog。判斷法：寫「冠詞 + 修飾語 + 名詞」時，做一個簡單的交換測試——把 too 移到冠詞前面，若句子變通順就代表冠詞位置放錯了。",
        "exOkText": "(O) He is **so kind a teacher** that we all love him.",
        "exOkZh": "他是位如此好的老師，我們都愛他。",
        "exBadText": "(X) He is a so kind teacher that we all love him.",
        "exBadNote": "錯誤：so 修飾形容詞時，冠詞 a 必須放在形容詞與名詞之間"
      },
      {
        "title": "語意辨析（too fat 太胖／very fat 很胖）",
        "bad": "(X) I don't like my dog because she is **very fat** and unhealthy.",
        "ok": "(O) I don't like my dog because she is **too fat** and unhealthy.",
        "why": "very fat 只是客觀描述「她很胖」，語氣單純；too fat 則帶有「胖得超過了理想或健康範圍」的評價意味，暗示這是一個問題。中文的「太胖了」明顯帶有批評與超出範圍的語感，所以要選 too；若只是單純描述外型，則用 very fat 較恰當。判斷法：句子帶有抱怨、健康、可愛與否等判斷時用 too；純粹描述狀態大小時用 very。",
        "exOkText": "(O) **These dogs are too fat**; the doctor said they need a special diet.",
        "exOkZh": "這些狗太胖了，醫生說牠們需要特別的飲食。",
        "exBadText": "(X) These dogs are very fat; the doctor said they need a special diet.",
        "exBadNote": "錯誤：語意是「胖得過頭」，應用 too fat 而非 very fat"
      }
    ],
    "traps": [
      "**too + 形容詞的固定意義陷阱**：too happy、too good、too difficult 其實都帶有「超出預期、甚至不好」的反面語意，會考常拿來考字面意義。",
      "**too 與 very 的陷阱**：very fat 只是「很胖」的客觀描述，too fat 是「太胖」帶有負評，兩者不可隨意互換。",
      "**原級鎖定陷阱**：too、very、so、quite、enough 後面的形容詞一律用原級，出現 -er / -est 一定錯。",
      "**冠詞順序陷阱**：too fat a dog、so interesting a book，冠詞必須夾在形容詞和名詞中間，寫成 a too fat dog 就錯了。"
    ],
    "strategy": [
      "先寫主詞與 be 動詞，再決定程度詞：She is ______ 太胖了，就填 too fat，結構永遠不會亂。",
      "看到 too / very / so 就立刻檢查後面的形容詞有沒有變級，這是一秒就能確認的規則。",
      "修飾名詞時先用「a fat dog」建立正確順序，再插入 too 做交換測試，冠詞的位置就不會搞混。",
      "把 too 的兩種語氣各寫一句，一句用 very fat、一句用 too fat，比較句子帶來的感受差異。"
    ]
  },
  "they are too fat": {
    "zh": "牠們太胖了",
    "ipa": "ðeɪ ɑːr tuː fæt",
    "intro": "針對您提供的英文片語 **they are too fat**，這是「主詞 + be 動詞 + 程度副詞 + 形容詞」構成的主句，已經可以獨立成句。中文用單一個「牠們」概括，但英文裡 **they 是複數**，所以 be 動詞一定要用 **are**。最該注意的，是主詞與 be 動詞的一致，以及 it / they 與 they / them 的格位差別。",
    "headline": "they 配 are；受詞要用 them、所有格用 their",
    "structure": [
      {
        "role": "主詞（代詞）",
        "token": "they",
        "pos": "代詞 (Pronoun) — 主格",
        "func": "表示「他／她／牠們」，是主格形式，只能放在主詞位置，後面必須搭配複數的 be 動詞 are",
        "mark": "O"
      },
      {
        "role": "系動詞",
        "token": "are",
        "pos": "系動詞 (Linking Verb) — be 動詞複數形",
        "func": "連接主詞和表語，表示狀態。因為主詞 they 是複數，所以用 are，不能用 is 或 am",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "too fat",
        "pos": "副詞 + 形容詞片語 (Adverb + Adjective)",
        "func": "放在 be 動詞後面描述主詞的狀態「太胖了」；too 是程度副詞，fat 要用原級",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "代詞選擇錯誤（they 與 it 混淆）",
        "bad": "(X) **It** are too fat. ／ (X) **It** is too fat dogs.",
        "ok": "(O) **They** are too fat.",
        "why": "英文代詞 it 通常只用來指**單數**事物（那本書、那隻貓、今天天氣），而中文的「牠們」不分單複數都翻成「牠」，學生因此習慣性地用 it。當主詞是兩隻以上的動物或一樣東西時，必須用 they，be 動詞也跟著改成 are。判斷法：先數前文的動物有幾隻，一隻以上就直接套用 they are，絕對不用 it。",
        "exOkText": "(O) These cats are old. **They are** sleeping now.",
        "exOkZh": "這些貓老了，牠們現在正在睡覺。",
        "exBadText": "(X) These cats are old. It is sleeping now.",
        "exBadNote": "錯誤：複數動物要用 they are，it 只指單數"
      },
      {
        "title": "be 動詞與主詞不一致（are 誤用成 is）",
        "bad": "(X) They **is** too fat.",
        "ok": "(O) They **are** too fat.",
        "why": "be 動詞有三個現在式形狀，必須和主詞的人稱與數量對齊：I 用 am，he / she / it 與單數名詞用 is，you / we / they 與複數名詞用 are。they 是複數，所以只能配 are。台灣學生常因中文沒有 be 動詞而對這條規則特別陌生，會直覺選比較熟悉的 is。判斷法：寫 be 動詞時先看主詞的數量——一到單數 is，兩以上複數 are，I 開頭 am。",
        "exOkText": "(O) My parents **are** both teachers.",
        "exOkZh": "我的父母都是老師。",
        "exBadText": "(X) My parents is both teachers.",
        "exBadNote": "錯誤：主詞 My parents 為複數，be 動詞要用 are"
      },
      {
        "title": "代詞格位錯誤（主格 they 誤用於受詞位置）",
        "bad": "(X) Rita feeds **they** twice a day.",
        "ok": "(O) Rita feeds **them** twice a day.",
        "why": "they 是主格，只能站在主詞的位置；一旦它被動詞接住、變成「被餵的對象」，就必須换成受格 **them**。同理，主格 he / she / it 對應受格 him / her / it；主格 we 對應受格 us；主格 I 對應受格 me。判斷法：看到代詞前面有動詞（feeds、gives、sees、knows），那這個代詞就处在受詞位置，一律用受格。",
        "exOkText": "(O) Tom visits **them** every Sunday.",
        "exOkZh": "湯姆每個星期日都去看他們。",
        "exBadText": "(X) Tom visits they every Sunday.",
        "exBadNote": "錯誤：受詞位置要用受格 them，不能用主格 they"
      },
      {
        "title": "所有格誤用（they's 誤寫成 their）",
        "bad": "(X) These dogs are too fat because **they's** bowls are too big.",
        "ok": "(O) These dogs are too fat because **their** bowls are too big.",
        "why": "英文沒有「they's」這種寫法，複數代詞 they 的物主代詞是獨立的 **their**，後面直接接名詞，不加 -'s。their = 他們的、牠們的，theirs = 他們的（那個東西，本身當受詞）。台灣學生常把單數的 his、her 直接加 -'s 套用到 they 上，變成非標準的 they's。判斷法：所有格沒有複數變化，his 沒有 his's、her 沒有 her's、they 也沒有 they's，一律用 their。",
        "exOkText": "(O) **Their** fur is soft and golden.",
        "exOkZh": "牠們的毛又軟又金黃。",
        "exBadText": "(X) They's fur is soft and golden.",
        "exBadNote": "錯誤：沒有 they's 這個形式，應改用 their"
      }
    ],
    "traps": [
      "**they 的數量陷阱**：they 只指兩隻以上；一隻要用 it，兩隻以上才用 they，be 動詞也隨之在 is / are 之間切換。",
      "**be 動詞一致的陷阱**：I am / he is / they are 沒有例外，這是會考選擇題最基礎也最常出現的規則。",
      "**格位陷阱**：they（主格）與 them（受格）不能混用；動詞後面一定要用受格，這在完形填空題中特別常見。",
      "**所有格陷阱**：沒有 they's；their 後面接名詞，theirs 本身就是名詞，兩個不能同時加名詞。"
    ],
    "strategy": [
      "寫 be 動詞前先做「數量檢查」：唸出主詞，算出是一個還是一個以上，is 或 are 立刻就能確定。",
      "看到代詞先問位置：它在句首或連詞後面就是主格，在動詞後面就是受格，答案自動浮現。",
      "把 be 動詞三句口訣寫在草稿紙最上方：I am、he is、they are，考試時看一眼就不會錯。",
      "記住非人類的複數動物一律用 they / them / their / their，it / its 只留給單數，這是閱讀題的常錯點。"
    ]
  },
  "why they are too fat": {
    "zh": "為什麼牠們會太胖",
    "ipa": "waɪ ðeɪ ɑːr tuː fæt",
    "intro": "針對您提供的英文片語 **why they are too fat**，這其實是一個**間接問句的從句**，不能單獨成為問句，必須把它放進別的句子裡（Do you know why they are too fat?）。它內部要用**陳述句語序** they are，不能用疑問句語序 are they。最該注意的，是問句語序與陳述句語序的差別。",
    "headline": "why 從句用陳述語序 they are，不能倒裝",
    "structure": [
      {
        "role": "疑問詞",
        "token": "why",
        "pos": "疑問詞 (Question Word)",
        "func": "問「為什麼」，後面接完整的子句。單獨使用時後面必須是陳述句語序，不能倒裝",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "they",
        "pos": "代詞 (Pronoun) — 主格",
        "func": "子句的主語，表示「牠們」；因為是主格，所以後面的 be 動詞用複數的 are",
        "mark": "O"
      },
      {
        "role": "系動詞與表語",
        "token": "are too fat",
        "pos": "系動詞 (Verb) + 副詞 + 形容詞",
        "func": "be 動詞 are 連接主詞 they 與表語 too fat，整個子句說明「牠們為什麼會太胖」這個待說明的內容",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "間接問句誤用疑問語序（are they 倒裝）",
        "bad": "(X) Do you know **why are they too fat**?",
        "ok": "(O) Do you know **why they are too fat**?",
        "why": "when、where、why、how 這類疑問詞引導的**間接問句**，其內部必須使用陳述句語序，也就是「主詞 + 動詞」，不能把 be 動詞提到前面。直接問句是 Why are they too fat?（are they 倒裝），但只要被放進別的句子裡，are 就必須回到 they 後面。台灣學生最常犯的錯就是照抄前面直接問句的語序。判斷法：先寫出完整句子 Do you know ...?，再把 why they are too fat 整塊塞進去。",
        "exOkText": "(O) Can you tell me **where they live**?",
        "exOkZh": "你可以告訴我牠們住哪裡嗎？",
        "exBadText": "(X) Can you tell me where do they live?",
        "exBadNote": "錯誤：間接問句須用陳述語序 where they live"
      },
      {
        "title": "誤當成完整問句（單獨使用缺問句結構）",
        "bad": "(X) **Why they are too fat?**",
        "ok": "(O) **Why are they too fat?**",
        "why": "why they are too fat 裡沒有 can you tell me、do you know 這類引導詞，也沒有 be 動詞或助動詞提到句首，因此它不是一個完整的問句，不能單獨使用。問句的完整結構是「疑問詞 + be 動詞 / 助動詞 + 主詞 ...」，are 必須提到 they 前面才是真正的問句。判斷法：寫完 why 子句後問自己，句首有沒有 can / do / does / is / are；有才成問句，沒有就是子句。",
        "exOkText": "(O) **Why are your dogs so fat?**",
        "exOkZh": "你的狗為什麼這麼胖？",
        "exBadText": "(X) Why your dogs are so fat?",
        "exBadNote": "錯誤：問句須把 are 提到主詞前，且語序為 Why are your dogs..."
      },
      {
        "title": "疑問詞與 because 併用錯誤",
        "bad": "(X) Why they are too fat **because** they eat a lot.",
        "ok": "(O) They are too fat **because** they eat a lot.",
        "why": "why 是「為什麼」，用來**提問**；because 是「因為」，用來**回答原因**。兩者一個問、一個答，不能出現在同一個句子裡互相干擾。中文「為什麼牠們太胖，因為吃太多」在英文裡必須拆成兩句：先問 Do you know why they are too fat?，再答 Because they eat too much.。判斷法：看到 because，前面就應該是解釋而不是提問；若整句是提問，就要把 because 拿掉。",
        "exOkText": "(O) **Because** they eat too much junk food.",
        "exOkZh": "因為牠們吃太多垃圾食物。",
        "exBadText": "(X) Because they are too fat because they eat too much junk food.",
        "exBadNote": "錯誤：because 不可連用兩次，也不能用來提問"
      },
      {
        "title": "簡答內容錯誤（重複原問句內容）",
        "bad": "(X) — Why are they too fat? — **Because they are too fat.**",
        "ok": "(O) — Why are they too fat? — **Because they eat too much.**",
        "why": "回答 Why 問句時，答案必須提供**新的原因資訊**。如果只是把問題原封不動地重複一次，就等於沒有回答，會在會考的問答題型中被判為錯誤。答句的開頭要用 Because、They eat…、It is because… 這類承接詞，再帶出具體原因。判斷法：回答前先確認自己的句子有沒有出現問題中已經有的詞（are too fat）；完全一樣就是白回答，必須換成具體原因。",
        "exOkText": "(O) — Why do you feed your dog so often? — **Because he is still a puppy.**",
        "exOkZh": "— 你為什麼這麼常餵狗？— 因為牠還是小狗。",
        "exBadText": "(X) — Why do you feed your dog so often? — Because I feed my dog so often.",
        "exBadNote": "錯誤：答案只是把問題原封不動重複一次，等於沒有回答，必須換成具體的新原因。"
      }
    ],
    "traps": [
      "**間接問句語序陷阱**：Why do you know… 這類結構中，疑問詞後面一律用陳述語序（they are、he lives），是會考最高頻的出題點。",
      "**完整問句的陷阱**：只有 be 動詞或助動詞（are、do、does、can、will）提到主詞前面，才是真正的問句；單獨的 why they are… 只是子句。",
      "**why 與 because 的陷阱**：why 提問、because 回答，兩者不出現在同一子句；答句用 Because 開頭最安全。",
      "**重複回答的陷阱**：簡答必須提供新資訊，只把問題重複一次不算回答，閱讀測驗的問答題型常考這一點。"
    ],
    "strategy": [
      "間接問句兩段式：先寫外層的 Do you know…?，再把 why they are too fat 當成一塊完整的名詞片語塞進去。",
      "遇到 wh- 開頭的詞就用「主詞在前」測試：把主詞 they 放在前面能讀通，就是正確的陳述語序。",
      "練習答問時養成先寫 Because 的習慣，答案內容務必包含原題沒出現過的資訊。",
      "把常見間接問句整理成一頁：why he is…、where she lives…、how they met…，看到模板就不會慌。"
    ]
  },
  "that is why they are too fat": {
    "zh": "那就是為什麼牠們太胖的原因",
    "ipa": "ðæt ɪz waɪ ðeɪ ɑːr tuː fæt",
    "intro": "針對您提供的英文句子 **that is why they are too fat**，這是一個完整的簡單句，使用固定的結果表達 **That is why…**，中文正是「那就是……的原因」。that 在這裡是連接詞、is 是 be 動詞，後面接 why 引導的原因從句。最該注意的，是 **that is why 這個語塊不能拆開或改寫**，以及 be 動詞要與主詞 that 一致。",
    "headline": "That is why 是固定語塊，不可拆成 Why is that",
    "structure": [
      {
        "role": "主詞",
        "token": "that",
        "pos": "指示代詞 (Demonstrative Pronoun) — 作主語",
        "func": "在這個結構中當主語，指「那件事」；句首第一個字必須大寫成 That",
        "mark": "O"
      },
      {
        "role": "系動詞",
        "token": "is",
        "pos": "系動詞 (Linking Verb) — be 動詞",
        "func": "連接主詞 that 與後面的內容；主詞是單數 that，所以用 is，不能用 are 或 am",
        "mark": "O"
      },
      {
        "role": "結果連接詞片語",
        "token": "that is why",
        "pos": "連接詞片語 (Connective Phrase)",
        "func": "整個片語相當於中文「那就是……的原因」，後面接 why 引導的原因從句，說明結果的出處",
        "mark": "O"
      },
      {
        "role": "原因從句",
        "token": "they are too fat",
        "pos": "從句 (Clause) — 主詞 + 系動詞 + 表語",
        "func": "用陳述句語序說明「牠們太胖」這個事實；they 是複數，be 動詞用 are，too fat 為原級表語",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "漏掉 be 動詞（That why）",
        "bad": "(X) **That why** they are too fat.",
        "ok": "(O) **That is** why they are too fat.",
        "why": "That 在這裡當主語，後面一定要有 be 動詞 is 把它和後面的 why 從句連起來。台灣學生常因中文「那就是為什麼牠們太胖」省略了「是」而把 is 漏掉，寫成 That why。判斷法：that 單獨站在句首當主語時，它孤零零一個字一定有點奇怪——立刻檢查後面是不是缺了 is、are。",
        "exOkText": "(O) **That is** why he never gets sick.",
        "exOkZh": "那就是他從來不生病的原因。",
        "exBadText": "(X) That why he never gets sick.",
        "exBadNote": "錯誤：主詞 that 後面缺少 be 動詞 is"
      },
      {
        "title": "be 動詞與主詞不一致（is 誤用成 are）",
        "bad": "(X) That **are** why they are too fat.",
        "ok": "(O) That **is** why they are too fat.",
        "why": "主詞 that 是單數，be 動詞必須用 is。句子後面出現 they、are 只是因為它們屬於後面的 why 從句，不能影響前面主詞 that 的判斷。台灣學生常被句尾的複數 they 帶偏，以為整句是複數而選了 are。判斷法：be 動詞只跟**緊鄰它前面**的那個主詞配對，中間隔著 why 從句的主詞完全不算數。",
        "exOkText": "(O) That **is** what I want to say.",
        "exOkZh": "那就是我想說的。",
        "exBadText": "(X) That are what I want to say.",
        "exBadNote": "錯誤：主詞 that 為單數，be 動詞應為 is"
      },
      {
        "title": "固定語塊順序錯誤（Why is that）",
        "bad": "(X) **Why is that** they are too fat.",
        "ok": "(O) **That is why** they are too fat.",
        "why": "That is why 是固定語塊，that（主詞）必須在句首、is 在後、why 在最後；不能把 why 搬到句首變成 Why is that。因為 That is why 本身已經是一個完整的表達（「那就是……的原因」），why 後面接的是從句，不是句子真正的疑問對象。台灣學生容易受中文「為什麼會有這種情況」影響而調整語序。判斷法：把 That is why 當成一個詞組背起來，永遠放在句子的前半段。",
        "exOkText": "(O) That is why **we should leave early** tomorrow.",
        "exOkZh": "那就是我們明天該提早出發的原因。",
        "exBadText": "(X) Why is that we should leave early tomorrow.",
        "exBadNote": "錯誤：固定語塊不可倒裝，應為 That is why..."
      },
      {
        "title": "代詞指代不明（they 沒有先行詞）",
        "bad": "(X) I bought a dog last month. That is why **they** are too fat.",
        "ok": "(O) I bought a dog last month. That is why **the dog is** too fat.",
        "why": "代詞 they 必須有明確的先行詞，而且只指兩隻以上。前文只提到一隻狗（a dog）時，they 沒有指代對象，讀者無從知道牠們是誰；這種寫法在會考的閱讀測驗中被視為表意不明。判斷法：寫完 they / them / their，數一數前文出現過幾個可以指稱的對象，只有一個就必須改用單數 it，或把名詞重新寫出來（the dogs）。",
        "exOkText": "(O) I bought three dogs last month. That is why **they** are too fat.",
        "exOkZh": "我上個月買了三隻狗，那就是牠們太胖的原因。",
        "exBadText": "(X) I bought a dog last month. That is why they are too fat.",
        "exBadNote": "錯誤：前文只有一隻狗，they 無法指代，應用 the dog is"
      }
    ],
    "traps": [
      "**That is why 語塊陷阱**：這是寫死的固定片語，等於中文「那就是……的原因」，絕不能寫成 Why is that。",
      "**be 動詞就近原則的陷阱**：主詞 that 為單數用 is；句尾出現的 they are 不影響前面 be 動詞的選擇。",
      "**為什麼的兩種問法陷阱**：It is because he is late. 用 because 回答；That is why he is late. 用來**總結**原因，位置與用途不同。",
      "**代詞指代陷阱**：they 一定要有兩隻以上的先行詞，單數事物要用 it；閱讀測驗很常考這類表意是否清楚。"
    ],
    "strategy": [
      "把 That is why / That is why not / That is the reason 三個片語抄成一列，練成不經大腦的反應。",
      "寫 be 動詞時只看向左邊最近的主詞，中間有從句就先括起來跳過，避免被 they 誤導。",
      "寫完代詞立刻做「指代回頭查」：回到前文數一數提到的對象有幾個，數量對不上就立刻改。",
      "練習時把 Because he eats too much. 與 That is why he is fat. 兩句配成一組，明白「回答」與「總結」的差別。"
    ]
  },
  "butterfly": {
    "zh": "蝴蝶",
    "ipa": "ˈbʌt.ɚ.flaɪ",
    "intro": "針對您提供的英文單字 **butterfly**，這是一個單一的英文單字，本身不能獨立成句，必須放進名詞組裡當主詞或受詞使用。它由 butter（奶油）與 fly（會飛的昆蟲）複合而成，是國中會考單字題與克漏字的高頻字。最該注意的方向有兩個：字母拼寫與重音位置要記牢，以及它是可數名詞，前面一定要有冠詞或量詞。",
    "headline": "可數名詞；拼字與重音都要記牢",
    "structure": [
      {
        "role": "複合詞前段",
        "token": "butter",
        "pos": "名詞 (Noun) — 奶油",
        "func": "與後段複合組成新字，單獨出現時是「奶油」，不要誤以為它就是整個字的意思",
        "mark": "O"
      },
      {
        "role": "複合詞後段",
        "token": "fly",
        "pos": "名詞 (Noun) — 會飛的昆蟲",
        "func": "提供「飛行昆蟲」的意涵，與前段合寫成一個單字，中間不分開",
        "mark": "O"
      },
      {
        "role": "整體字義",
        "token": "butterfly",
        "pos": "可數名詞 (Countable Noun) — 蝴蝶",
        "func": "可作主詞或受詞；單數前要加 a、the、one 等限定詞，複數寫成 butterflies",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤：字母增減顛倒",
        "bad": "(X) I saw a **butterfy** near the tree. ／ (X) A **butterflay** flew past me.",
        "ok": "(O) I saw a **butterfly** near the tree.",
        "why": "butterfly 由 butter 與 fly 組成，共九個字母，順序固定。台灣學生最常見的錯法是漏掉中間的 r 寫成 butterfy，或是把字母 l 誤看成 y 寫成 butterflay，結果整個字就不存在了。判斷法：先在心中拆成 butter + fly 兩段唸一次，再合起來寫，並確認 t、e、r、f、l 這幾個關鍵字母都出現。",
        "exOkText": "(O) A **butterfly** landed on the flower.",
        "exOkZh": "一隻蝴蝶停在花上。",
        "exBadText": "(X) A **butterfly** landed on the flower.",
        "exBadNote": "錯誤：butterfy 漏掉了字母 r，拼法錯誤，正確應為 butterfly"
      },
      {
        "title": "複合詞誤拆成兩個單字",
        "bad": "(X) A **butter fly** is an insect. ／ (X) Look at that **butter fly**!",
        "ok": "(O) A **butterfly** is an insect.",
        "why": "butterfly 是合成詞，合成後已經是一個完整的單字，寫作一個詞，中間不能有空格。學生常因中文習慣把每個字分開書寫，或看到 butter 就以為要單獨標出來。判斷法：只要拆開後其中一半沒有完整的意思（例如 butter 是奶油、fly 是蒼蠅），就必須合寫成一個字。",
        "exOkText": "(O) We watched a **butterfly** fly over the pond.",
        "exOkZh": "我們看著一隻蝴蝶飛過池塘上空。",
        "exBadText": "(X) We watched a **butter fly** fly over the pond.",
        "exBadNote": "錯誤：butterfly 是合成詞，中間不能加空格，必須合寫成一個字"
      },
      {
        "title": "重音位置錯誤",
        "bad": "(X) bu-TER-fly ／ (X) BUT-ter-FLY",
        "ok": "(O) BUT-ter-fly",
        "why": "butterfly 是三音節單字，重音落在第一音節 but-，讀作 /ˈbʌt.ɚ.flaɪ/，後半段要弱化、唸快一點。台灣學生常把重音放到第二音節或第三音節，唸成 bu-TER-fly，聽起來像另一個字，連同學都聽不懂。判斷法：合成詞的前半段通常是主體，重音多在前；唸到最有力的那一個音節，就是重音所在。",
        "exOkText": "(O) A **butterfly** with pretty wings flew by us.",
        "exOkZh": "一隻有著漂亮翅膀的蝴蝶從我們旁邊飛過。",
        "exBadText": "(X) I said it as bu-TER-fly, so nobody understood.",
        "exBadNote": "錯誤：重音應在第一音節 but-，唸成 bu-TER-fly 會讓聽者聽不出這個字"
      },
      {
        "title": "易混昆蟲單字的詞義混淆",
        "bad": "(X) A **bee** has beautiful wings. ／ (X) A **bee** is a colorful insect.",
        "ok": "(O) A **butterfly** has beautiful wings.",
        "why": "butterfly 是蝴蝶，bee 是蜜蜂，兩者雖然都是昆蟲，外形與習性卻完全不同：蝴蝶白天活動、翅膀華麗；蜜蜂體型小、會採蜜釀蜂蜜。台灣學生常因課本圖片相鄰而把兩者混為一談。判斷法：記三個關鍵字，butterfly 蝴蝶、bee 蜜蜂、fly（蒼蠅）蚊蠅，看到 b 開頭的 bee 就想到蜜蜂。",
        "exOkText": "(O) A **butterfly** and a **bee** both visited the garden.",
        "exOkZh": "一隻蝴蝶和一隻蜜蜂都造訪了花園。",
        "exBadText": "(X) A **bee** and a **butterfly** both visited the garden.",
        "exBadNote": "錯誤：bee 是蜜蜂、butterfly 是蝴蝶，兩種昆蟲不可互換"
      }
    ],
    "traps": [
      "**拼寫的陷阱**：butterfly 容易漏 r 或把 l 看成 y，會考選擇題常把 butterfy、butterflay 當成錯誤選項，看清楚每個字母的位置就能排除。",
      "**重音的陷阱**：合成詞重音多在前段，butterfly 要唸 /ˈbʌt.ɚ.flaɪ/，若題目考音標或唸法，唸成第二音節就會被扣分。",
      "**可數名詞的陷阱**：butterfly 是可數名詞，泛指時前面要加 a 或 one，說「很多隻」要用 many butterflies，不能用 much。",
      "**字義的陷阱**：butterfly（蝴蝶）、bee（蜜蜂）、fly（蒼蠅）常在同一課出現，會考讀句判斷昆蟲名稱是否正確。"
    ],
    "strategy": [
      "把單字拆讀再合寫：butter + fly 唸兩次、寫一次，字母自然不會漏。",
      "分清前段主體：butter 放前面只是造字用，真正的主體是後面的昆蟲，不要把 butter（奶油）當成答案。",
      "大聲唸三遍找重音：唸出聲才感覺得到哪個音節最有力，重音自然落在 BUT-。",
      "用圖像記憶：把蝴蝶畫在腦中，配上四個易混字一起記，單字題就不會選錯。",
      "寫作時檢查兩件事：拼字九個字母齊不齊、有沒有誤加空格。"
    ]
  },
  "butterflies": {
    "zh": "蝴蝶（複數）",
    "ipa": "ˈbʌt.ɚ.flaɪz",
    "intro": "針對您提供的英文單字 **butterflies**，這是單字 butterfly 的複數形式，本身同樣不能獨立成句，必須放在名詞組中。這個字最需要留心的是 y 結尾的複數變化、複數尾音的唸法，以及它作為可數複數時，前面要搭配 many、a few 這類限定詞。",
    "headline": "y 結尾複數變 ies，唸成 /aɪz/",
    "structure": [
      {
        "role": "單數原型",
        "token": "butterfly",
        "pos": "可數名詞 (Countable Noun) — 蝴蝶（單數）",
        "func": "作為變成複數的原型，結尾是「子音字母 + y」的組合",
        "mark": "O"
      },
      {
        "role": "複數變化",
        "token": "-y → -ies",
        "pos": "名詞複數變化 (Plural Formation)",
        "func": "子音字母加 y 結尾的名詞，變複數時要去掉 y，改加 ies",
        "mark": "O"
      },
      {
        "role": "整體字義",
        "token": "butterflies",
        "pos": "可數名詞複數 (Countable Noun, plural) — 蝴蝶",
        "func": "作主詞時後面的動詞要用複數；前面用 many、a few、some 等限定詞搭配",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數變化規則錯誤（y 沒變成 ies）",
        "bad": "(X) Many **butterflys** are in the park. ／ (X) I saw two **butterflys** today.",
        "ok": "(O) Many **butterflies** are in the park.",
        "why": "butterfly 的 y 前面是子音字母 r，屬於「子音 + y」結尾，變複數要去掉 y 再加 ies，寫成 butterflies。台灣學生常直接照單字加 s，寫成 butterflys；也有在 y 後面多加一個 e 寫成 butterflyes，兩種都不合規則。判斷法：看 y 前面一個字母，是子音就去 y 加 ies，是母音就保留 y 只加 s。",
        "exOkText": "(O) Lots of **butterflies** visited the park.",
        "exOkZh": "很多蝴蝶造訪了這座公園。",
        "exBadText": "(X) Lots of **butterflys** visited the park.",
        "exBadNote": "錯誤：butterfly 是子音字母 + y 結尾，複數要去 y 加 ies，寫成 butterflies"
      },
      {
        "title": "複數 -ies 的發音錯誤",
        "bad": "(X) 唸成 /ˈbʌt.ɚ.flaɪ.iz/ ／ (X) 把字母 i 唸出來：BUT-ter-flies",
        "ok": "(O) 唸成 /ˈbʌt.ɚ.flaɪz/",
        "why": "複數的 ies 在這個字裡唸成 /aɪz/，字母 i 本身不發音，e 也不發音，只留下 /aɪz/ 這個音。由於前一個音是清音 /f/，所以 /z/ 也不加強讀，唸得又快又輕。學生常把 i 唸出來變成 /flies/，或漏掉尾音的 /z/，讓聽者以為還是單數。判斷法：複數尾音要「輕輕帶過」，唸完一個 /z/ 就停。",
        "exOkText": "(O) The **butterflies** flew over the lake.",
        "exOkZh": "那些蝴蝶飛過湖面上空。",
        "exBadText": "(X) I said **butterflies** as /ˈbʌt.ɚ.flaɪ.iz/.",
        "exBadNote": "錯誤：複數 ies 要唸成 /aɪz/，不能把字母 i 與 e 唸出來變成 /iz/"
      },
      {
        "title": "可數複數與數量詞的搭配錯誤",
        "bad": "(X) I saw **a butterflies** in the sky. ／ (X) There are **much butterflies** here.",
        "ok": "(O) I saw **some butterflies** in the sky.",
        "why": "butterflies 是可數名詞的複數，前面不能再加冠詞 a 或 an，也不能用不可數用的 much。台灣學生常把「很多隻」直譯成 a butterflies，或習慣性地用 much 修飾所有名詞。判斷法：many 修可數複數、much 修不可數；單數用 one，複數用 a few 或 some，前面不要加 a。",
        "exOkText": "(O) How **many butterflies** can you see?",
        "exOkZh": "你可以看到幾隻蝴蝶？",
        "exBadText": "(X) How **many butterfly** can you see?",
        "exBadNote": "錯誤：how many 後面的可數名詞一定要用複數 butterflies"
      },
      {
        "title": "y 結尾單字兩種變化混淆",
        "bad": "(X) The boy play with his **toys**. ／ (X) Two **deyes** are broken.",
        "ok": "(O) The boy play with his **toys**.",
        "why": "y 結尾的名詞變複數有兩種規則：boy、key、toy 這類「母音字母 + y」保留 y 直接加 s；study、city、butterfly 這類「子音字母 + y」才要去 y 加 ies。學生常背錯一邊，於是把 toys 寫成 toies，或把 study 寫成 studys。判斷法：看 y 前一個字母，母音就加 s，子音就變 ies。",
        "exOkText": "(O) The **butterflies** and the **babies** are playing together.",
        "exOkZh": "那些蝴蝶和那些小宝宝正在一起玩。",
        "exBadText": "(X) The **butterflies** and the **babys** are playing together.",
        "exBadNote": "錯誤：baby 是子音字母 + y，要寫成 babies，不能保留 y 寫成 babys"
      }
    ],
    "traps": [
      "**複數規則的陷阱**：butterflys 是錯的，butterfly 要變 butterflies；會考常在單複數題目中設計這種半對半錯的選項。",
      "**發音的陷阱**：複數尾音是 /z/，不是 /s/ 也不是 /iz/；若題目考單複數的讀音差異，唸錯就選不出來。",
      "**限定詞的陷阱**：a butterflies 這種寫法一定錯，複數名詞前面不能有 a；也別用 much 修飾可數複數。",
      "**對比題的陷阱**：busy→busies、boy→boys 是會考最愛考的對照，兩種規則各記一個例子最保險。"
    ],
    "strategy": [
      "背一組對照表：子音 + y 記 three 例（fly→flies、city→cities、study→studies），母音 + y 記 boy→boys，隨時對照就不會錯。",
      "寫複數時先圈出 y 前面那個字母，判斷母音或子音再動筆。",
      "唸出聲確認尾音：butterflies 唸完要聽得到 /z/，聽不到就是漏了複數。",
      "把單複數配成對背：butterfly / butterflies、bee / bees 一起記，考試時不用現場推。",
      "看到 how many、a lot of 這類詞，就立刻檢查後面的名詞是不是複數。"
    ]
  },
  "bee": {
    "zh": "蜜蜂",
    "ipa": "biː",
    "intro": "針對您提供的英文單字 **bee**，這是一個單一的英文單字，不能獨立成句，要放在名詞組中使用。bee 拼法很短，卻是最容易寫錯的單字之一，因為它和 be、been、bean 只差一兩個字母。最該注意三件事：字形不要混淆、ee 一定要讀長音、以及它是可數名詞且複數不能加撇號。",
    "headline": "字形近 be/been，ee 讀長音 /iː/",
    "structure": [
      {
        "role": "起首字母",
        "token": "b",
        "pos": "字母 (Letter) — 讀 /b/",
        "func": "bee 的第一個字母，雙唇閉合後放開，氣流要衝出，不送氣",
        "mark": "O"
      },
      {
        "role": "字尾字母",
        "token": "ee",
        "pos": "字母組合 (Letter Group) — 讀長音 /iː/",
        "func": "ee 固定讀長音 /iː/，和 be、bed 的短音 /e/ 完全不同，是本單字最容易唸錯的地方",
        "mark": "O"
      },
      {
        "role": "整體字義",
        "token": "bee",
        "pos": "可數名詞 (Countable Noun) — 蜜蜂",
        "func": "可作主詞或受詞；單數前要加 a、the 等限定詞，複數寫成 bees",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "與 be、been、bean 的字形混淆",
        "bad": "(X) A **be** is a small flying insect. ／ (X) I saw a **bean** near the tree.",
        "ok": "(O) A **bee** is a small flying insect.",
        "why": "bee 是蜜蜂，be 是動詞「是」，been 是 be 的過去分詞，bean 是「豆子」，四個字唸音都一樣，只靠意思和字母區分。台灣學生在聽寫或克漏字時，常把蜜蜂寫成 be，或把 bee 寫成 bean。判斷法：看到昆蟲、會飛、採蜜這類情境就必須寫 bee；看到「是」「去過」就寫 be 或 been。",
        "exOkText": "(O) A **bee** landed on the pink flower.",
        "exOkZh": "一隻蜜蜂停在粉紅色的花上。",
        "exBadText": "(X) A **be** landed on the pink flower.",
        "exBadNote": "錯誤：昆蟲要用 bee，be 是動詞「是」，不能表示蜜蜂"
      },
      {
        "title": "長音與短音的發音錯誤",
        "bad": "(X) 唸成 /be/（和 be、bed 同音） ／ (X) B 開頭後的 ee 唸成短音",
        "ok": "(O) 唸成 /biː/",
        "why": "ee 這個字母組合一律讀長音 /iː/，和中文的「必」一樣拉長；相對地 be、bed 才是短音 /e/。台灣學生受中文影響常把 bee 唸成 /be/，尾音不拉長，聽起來就變成動詞 be。判斷法：ee、ea、ie 看到就拉長音，唸完用手指按住喉嚨感受震動，震動明顯就是長音。",
        "exOkText": "(O) The **bee** is flying to the tree.",
        "exOkZh": "那隻蜜蜂正飛向那棵樹。",
        "exBadText": "(X) I said **bee**, but everyone heard the verb be.",
        "exBadNote": "錯誤：ee 要讀長音 /biː/，唸成短音 /be/ 就會被聽成動詞 be"
      },
      {
        "title": "單數可數名詞與冠詞的搭配",
        "bad": "(X) I saw **a bees** in the garden. ／ (X) **the** bee is very big.",
        "ok": "(O) I saw **a bee** in the garden.",
        "why": "bee 是可數名詞，單數前面要加 a、an、the 或 one，複數前面則不能加 a。台灣學生常誤以為「蜜蜂」是集合名詞而加 the，或在複數前面又加 a。判斷法：先問自己「這是一隻還是多隻」，一隻就寫 a bee，多隻就寫 bees，前面不再加 a。",
        "exOkText": "(O) A **bee** and two **butterflies** were in the garden.",
        "exOkZh": "花園裡有一隻蜜蜂和兩隻蝴蝶。",
        "exBadText": "(X) A **bees** and two **butterflies** were in the garden.",
        "exBadNote": "錯誤：a 後面的可數名詞必須是單數 bee，複數前面不能加 a"
      },
      {
        "title": "複數 s 與所有格 's 的混淆",
        "bad": "(X) There are many **bee's** in the tree. ／ (X) The **bee's** wings are black.",
        "ok": "(O) There are many **bees** in the tree.",
        "why": "bees 是複數，表示「很多隻蜜蜂」，中間不加撇號；bee's 是所有格，後面一定要接名詞，表示「蜜蜂的……」。台灣學生常把兩者混在一起，寫出 bee's 卻想表達複數。判斷法：撇號後面如果沒有名詞，撇號就是多寫的；看到「很多隻」直接寫 bees。",
        "exOkText": "(O) The **bee's** legs are covered with yellow pollen.",
        "exOkZh": "蜜蜂的腿上沾滿了黃色的花粉。",
        "exBadText": "(X) The **bees** legs are covered with yellow pollen.",
        "exBadNote": "錯誤：表示「蜜蜂的」要寫所有格 bee's，bees 只是複數，不能加名詞"
      }
    ],
    "traps": [
      "**同音字的陷阱**：be、been、bee、bean 唸音相同，會考聽寫或選字題時必須看句子情境判斷。",
      "**長音的陷阱**：bee 讀 /biː/，若題目列出 /be/ 的選項就是錯的，音標要看清楚長音符號。",
      "**冠詞的陷阱**：a bees 這類寫法絕對錯，a 後面只接單數可數名詞。",
      "**撇號的陷阱**：bee's 與 bees 只差一個撇號，會考「所有格」時要能分辨複數和所有格。"
    ],
    "strategy": [
      "把 be、been、bee、bean 寫成一列抄到筆記本，用中文註記意思，每天唸一次分組背。",
      "唸單字時把音拉長：bee 的 ee 拉長音，唸出震動感就一定不會唸成 be。",
      "寫名詞前先確認單複數：單數加 a，複數不加 a，寫完唸一遍句子檢查。",
      "看到撇號就先找後面的名詞：沒有名詞就一定是複數，把撇號刪掉。",
      "蜜蜂的相關單字一起記：bee、honey、honeybee，下次遇到題目不會再陌生。"
    ]
  },
  "bees": {
    "zh": "蜜蜂（複數）",
    "ipa": "biːz",
    "intro": "針對您提供的英文單字 **bees**，這是 bee 的複數形式，本身不能獨立成句。它由單數直接加 s 構成，規則簡單但容易出錯：s 唸成 /z/、拼字不能漏掉 e、當主詞時 be 動詞要改成 are。會考常在這幾個地方設陷阱。",
    "headline": "-s 唸 /z/，別寫成所有格 bee's",
    "structure": [
      {
        "role": "單數原型",
        "token": "bee",
        "pos": "可數名詞 (Countable Noun) — 蜜蜂（單數）",
        "func": "以 ee 結尾的單數名詞，變複數時直接在尾端加 s，字母完全保留",
        "mark": "O"
      },
      {
        "role": "複數變化",
        "token": "-s",
        "pos": "名詞複數變化 (Plural Formation)",
        "func": "大多數可數名詞加 s 就能變複數；因為 ee 結尾是元音，所以 s 要唸成 /z/",
        "mark": "O"
      },
      {
        "role": "整體字義",
        "token": "bees",
        "pos": "可數名詞複數 (Countable Noun, plural) — 蜜蜂",
        "func": "作主詞時後面的 be 動詞要用 are；前面搭配 many、some、a few 等限定詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數 -s 的清濁發音錯誤",
        "bad": "(X) 唸成 /biːs/ ／ (X) 唸成 /biːɪz/",
        "ok": "(O) 唸成 /biːz/",
        "why": "名詞複數的 s 要看前一個音決定唸法：前面的音是清音就唸 /s/，是濁音或元音就唸 /z/。bee 的尾音是長音 /iː/，屬於元音，所以複數要唸成 /z/。學生常照單數唸成 /s/，或受前面 butterflies 影響加上 /ɪz/。判斷法：唸完單數看最後一個音有沒有震動，震動就唸 /z/。",
        "exOkText": "(O) The **bees** are flying to the flowers.",
        "exOkZh": "那些蜜蜂正飛向花朵。",
        "exBadText": "(X) I said **bees**, but I pronounced the last s like /s/.",
        "exBadNote": "錯誤：ee 結尾是元音，複數的 s 要唸成 /z/，不能唸成 /s/"
      },
      {
        "title": "拼寫錯誤：漏字母或重複字母",
        "bad": "(X) There are many **be** in the tree. ／ (X) Two **beess** flew away.",
        "ok": "(O) There are many **bees** in the tree.",
        "why": "bees 的正確拼法是 b、e、e、s 依序四個字母，複數只是尾端多加一個 s，前面兩個 e 完全不能動。台灣學生常以為複數就要重複一次字尾，寫成 beess；或是偷懶略過重複的 e，寫成 be。判斷法：複數前綴一律照抄單數，只在最後面加一個字母 s，絕不改動前面的字母。",
        "exOkText": "(O) Many **bees** and **butterflies** visited the park.",
        "exOkZh": "許多蜜蜂和蝴蝶造訪了公園。",
        "exBadText": "(X) Many **beess** and **butterflies** visited the park.",
        "exBadNote": "錯誤：複數只在尾端加一個 s，寫成 beess 是重複字母的錯誤"
      },
      {
        "title": "複數主詞與 be 動詞的不一致",
        "bad": "(X) There **is** many **bees** in the hive. ／ (X) The **bees** is flying home.",
        "ok": "(O) There **are** many **bees** in the hive.",
        "why": "be 動詞要跟後面的主詞單複數一致：單數用 is，複數用 are。bees 是複數，無論放在 There 句型後面當真正主詞，還是放在句首當主詞，be 動詞都必須改成 are。台灣學生常憑中文「有蜜蜂在」一律用 is。判斷法：先圈出真正的主詞，看它是單數還是複數，再決定 is 或 are。",
        "exOkText": "(O) **Bees** are flying from flower to flower.",
        "exOkZh": "蜜蜂們在花叢間飛來飛去。",
        "exBadText": "(X) **Bees** is flying from flower to flower.",
        "exBadNote": "錯誤：主詞 Bees 是複數，be 動詞必須用 are，不能用 is"
      },
      {
        "title": "集合名詞與數量詞搭配錯誤",
        "bad": "(X) I saw a **bees** in the tree. ／ (X) A **hive** of bee is in the garden.",
        "ok": "(O) I saw a swarm of **bees** in the tree.",
        "why": "一群蜜蜂要用集合名詞搭配 of，寫成 a swarm of bees 或 a hive of bees，不能寫成 a bees，也不能在 of 後面接單數。台灣學生常覺得 of 是多餘的，或忘記 of 後面的名詞要跟前面的集合名詞保持一致。判斷法：遇到一群、一堆這類集合名詞，一定套用「a 集合名詞 of 複數名詞」的公式。",
        "exOkText": "(O) A **swarm of bees** flew over our picnic.",
        "exOkZh": "一大群蜜蜂飛過我們的野餐上方。",
        "exBadText": "(X) A **hive** of bee flew over our picnic.",
        "exBadNote": "錯誤：集合名詞 of 後面的可數名詞要用複數 bee 改成 bees"
      }
    ],
    "traps": [
      "**發音的陷阱**：bee 結尾是元音，複數要唸 /z/；如果和清輔音結尾的昆蟲名詞混在一起背，尾音很容易唸錯。",
      "**拼字的陷阱**：beess 是重複字母的常見錯法，寫完複數一定要檢查前面的字母有沒有被改動。",
      "**一致性的陷阱**：There **is** many bees 這種句子是會考常見的錯句，主詞是複數就要用 are。",
      "**所有格的陷阱**：bees（複數）和 bee's（蜜蜂的）只差一個撇號，題目出現 legs、wings 等名詞時要判斷是否需要所有格。"
    ],
    "strategy": [
      "單複數成對背：bee / bees、butterfly / butterflies 一起唸，尾音自然分得出來。",
      "寫完複數檢查兩件事：前面字母有沒有被改、s 是不是只有一個。",
      "寫 There be 句型時先找主詞：主詞在 bees 後面也要找出來，確認是複數才用 are。",
      "記住集合名詞公式：一群 X 就是 a swarm of Xs，of 後面一律用複數。",
      "唸出聲分辨 /z/ 和 /s/：手摸喉嚨，有震動的是 /z/，對應 bee 這類元音結尾的字。"
    ]
  },
  "butterflies and bees": {
    "zh": "蝴蝶和蜜蜂",
    "ipa": "ˈbʌt.ɚ.flaɪz ænd biːz",
    "intro": "針對您提供的英文片語 **butterflies and bees**，這是由兩個名詞用連接詞 and 組成的名詞片語，本身不能單獨成句，前面必須再接主詞與動詞。它同時出現兩組單複數變化（butterfly→butterflies、bee→bees），所以要特別檢查連接詞有沒有漏掉、兩邊的單複數是否一致。",
    "headline": "並列結構：連接詞不能漏，兩邊要對稱",
    "structure": [
      {
        "role": "並列項（前）",
        "token": "butterflies",
        "pos": "可數名詞複數 (Countable Noun, plural) — 蝴蝶",
        "func": "第一個被並列的名詞，y 結尾要變成 ies，前面若有冠詞會只放在整組的最前面",
        "mark": "O"
      },
      {
        "role": "並列連接詞",
        "token": "and",
        "pos": "連接詞 (Conjunction) — 和",
        "func": "連接兩個地位相等的名詞，兩個詞之間一定要有它，不能省略",
        "mark": "O"
      },
      {
        "role": "並列項（後）",
        "token": "bees",
        "pos": "可數名詞複數 (Countable Noun, plural) — 蜜蜂",
        "func": "第二個被並列的名詞，與前面同一層級，單複數與前面的詞一致",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "butterflies and bees",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整組可以當主詞或受詞使用，如 Many butterflies and bees…；不能自己成句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "漏掉並列連接詞",
        "bad": "(X) **Butterflies bees** are flying. ／ (X) I saw **butterflies, bees** in the garden.",
        "ok": "(O) **Butterflies and bees** are flying.",
        "why": "兩個名詞並列時，中間一定要用 and、or 或逗號隔開，不能直接黏在一起。台灣學生受中文「蝴蝶蜜蜂」影響，會把兩個字不加連接詞直接寫出，或誤以為加逗號就等於並列。判斷法：把兩個名詞各自圈起來，中間必須有 and 才算正確的並列結構。",
        "exOkText": "(O) **Butterflies and bees** visited the garden.",
        "exOkZh": "蝴蝶和蜜蜂都造訪了花園。",
        "exBadText": "(X) **Butterflies bees** visited the garden.",
        "exBadNote": "錯誤：兩個名詞中間漏了連接詞 and，不能直接並排黏在一起"
      },
      {
        "title": "並列兩邊的單複數不一致",
        "bad": "(X) **Butterfly and bees** are flying. ／ (X) Many **butterflies and bee** are here.",
        "ok": "(O) **Butterflies and bees** are flying.",
        "why": "用 and 並列的兩個詞地位相同，層級一樣，因此單複數也必須一致：不是兩個都用複數，就是兩個都用單數。台灣學生常只把記得的字變複數，另一個字忘了變。判斷法：寫完並列結構後，兩個詞一起檢查字尾，一個有 s 另一個沒有就是錯的。",
        "exOkText": "(O) A **butterfly and a bee** flew over the pond.",
        "exOkZh": "一隻蝴蝶和一隻蜜蜂飛過池塘上方。",
        "exBadText": "(X) A **butterfly and bees** flew over the pond.",
        "exBadNote": "錯誤：兩個並列名詞必須單複數一致，一個用單數就要兩個都用單數，不能只有 butterfly 變複數。"
      },
      {
        "title": "冠詞重複與重複使用",
        "bad": "(X) I saw **the butterflies and the bees** in the garden. ／ (X) **The butterflies and bees** are hungry.",
        "ok": "(O) I saw **the butterflies and the bees** in the garden.",
        "why": "冠詞在並列結構中只放一次，兩個名詞共用同一個冠詞，所以要寫 the butterflies and bees。台灣學生常受中文的「蝴蝶和蜜蜂都…」，在每一個名詞前都加 the，變成 the butterflies and the bees。判斷法：先寫冠詞一次，接兩個名詞之間加 and，中間不再重複寫冠詞。",
        "exOkText": "(O) **The butterflies and bees** were in the garden.",
        "exOkZh": "那些蝴蝶和蜜蜂都在花園裡。",
        "exBadText": "(X) **The butterflies and the bees** were in the garden.",
        "exBadNote": "錯誤：並列的兩個名詞共用同一個冠詞，the 只寫一次，不能在每個名詞前都重複寫一次。"
      },
      {
        "title": "連接詞 and 的連讀發音",
        "bad": "(X) 兩個詞之間把 and 唸成完整的 /ænd/ ／ (X) and 唸成 /æn/",
        "ok": "(O) /ən/ 或 /ənd/，視前後音而定",
        "why": "and 在句子中常弱化。當後面的字以母音開頭時，and 的 d 會被吸收，唸成 /ən/；後面的字是子音開頭時才唸成 /ənd/，其中 t 也會失爆破。台灣學生常把每個單字都唸得很清楚，聽起來像在逐字報數。判斷法：一句話裡的連接詞要輕輕帶過，唸快一點就會自然連讀。",
        "exOkText": "(O) I like **butterflies and bees** very much.",
        "exOkZh": "我非常喜歡蝴蝶和蜜蜂。",
        "exBadText": "(X) I said every word slowly, like **butterflies** / **and** / **bees**.",
        "exBadNote": "錯誤：and 在句中要弱化成 /ən/，不能三個字都重讀成獨立的一拍"
      }
    ],
    "traps": [
      "**連接詞的陷阱**：butterflies bees 這種寫法一定錯，並列兩詞中間一定要有 and。",
      "**單複數一致的陷阱**：butterfly and bees 這種只變一半的寫法是會考最愛設的陷阱，檢查兩個詞的詞尾。",
      "**冠詞的陷阱**：the 只能寫一次，不要在兩個名詞前各寫一次，除非語意上指兩個不同的群體。",
      "**唸法的陷阱**：and 弱化成 /ən/ 是聽力題的常考點，聽到清楚的 /ænd/ 要判斷是不是沒有連讀。"
    ],
    "strategy": [
      "並列結構三步驟：寫冠詞一次、加 and 連接、檢查兩邊單複數是否一致。",
      "把兩個名詞圈起來做對照：butterfly→butterflies、bee→bees，變化一起記。",
      "遇到長並列句先畫草稿：主詞、and、後面名詞三塊分開寫，比較不容易漏。",
      "唸句子時特別注意 and 要輕，練熟了聽力測驗也聽得出連讀。",
      "複數名詞前不加 a，寫完檢查有沒有冠詞重複的問題。"
    ]
  },
  "about butterflies and bees": {
    "zh": "關於蝴蝶和蜜蜂",
    "ipa": "əˈbaʊt ˈbʌt.ɚ.flaɪz ænd biːz",
    "intro": "針對您提供的英文片語 **about butterflies and bees**，這是以介系詞 about 開頭的介系詞片語，本身不能單獨成句，前面要有主詞與動詞，或整組當名詞使用。最該注意三件事：about 不能隨意換成 of、介系詞後面接動詞一定要變成 -ing、以及整組片語在句中放的位置。",
    "headline": "about 是介系詞，後面只能接名詞或 -ing",
    "structure": [
      {
        "role": "介系詞",
        "token": "about",
        "pos": "介系詞 (Preposition) — 關於、大約",
        "func": "本身沒有實質意義，用來引出後面的受詞；後面一定要接名詞或名詞片語",
        "mark": "O"
      },
      {
        "role": "介系詞受詞",
        "token": "butterflies",
        "pos": "可數名詞複數 (Countable Noun, plural) — 蝴蝶",
        "func": "接受 about 修飾，說明「關於什麼」，複合詞尾 y 變成 ies",
        "mark": "O"
      },
      {
        "role": "並列連接詞",
        "token": "and",
        "pos": "連接詞 (Conjunction) — 和",
        "func": "連接兩個同層級的介系詞受詞，中間不可省略",
        "mark": "O"
      },
      {
        "role": "介系詞受詞",
        "token": "bees",
        "pos": "可數名詞複數 (Countable Noun, plural) — 蜜蜂",
        "func": "與前面同層級，同樣接受 about 修飾，單複數要與前面一致",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "about butterflies and bees",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "整組修飾名詞或放在句末作地點式補充，本身不能獨立成句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞選錯（about 與 of/on 互換）",
        "bad": "(X) I know a lot **of** butterflies and bees. ／ (X) She wrote a book **on** butterflies and bees.",
        "ok": "(O) I know a lot **about** butterflies and bees.",
        "why": "about 表示「關於」某個主題，是最中性、最廣泛的說法；of 表示「……的」，on 表示「關於某個特定領域的研究或論述」。台灣學生常以為「關於」一定要用 of，或把 on 當成 about 的同義詞。判斷法：泛指某個主題用 about，強調專門研究或論述才用 on，兩者不能隨意互換。",
        "exOkText": "(O) I read a book **about** butterflies and bees.",
        "exOkZh": "我讀了一本關於蝴蝶和蜜蜂的書。",
        "exBadText": "(X) I read a book **on** butterflies and bees.",
        "exBadNote": "錯誤：泛指主題時用 about，on 強調專門論述或研究，語意不同"
      },
      {
        "title": "介系詞後接動詞未變成 -ing",
        "bad": "(X) I know a lot **about collect** butterflies. ／ (X) She is happy **about see** them.",
        "ok": "(O) I know a lot **about collecting** butterflies.",
        "why": "介系詞後面不能直接接動詞原形，必須把動詞變成動名詞，也就是加 -ing。about collect 是錯的，要寫 about collecting。台灣學生常在「關於」這個片語後面直接放動詞。判斷法：寫完介系詞先暫停，確認下一個詞是名詞，還是動詞加 -ing，一眼就能看出來。",
        "exOkText": "(O) She is good **at collecting** butterflies and bees.",
        "exOkZh": "她很擅長採集蝴蝶和蜜蜂。",
        "exBadText": "(X) She is good **at collect** butterflies and bees.",
        "exBadNote": "錯誤：介系詞 at 後接動詞必須變成 -ing collecting"
      },
      {
        "title": "介系詞片語位置錯誤",
        "bad": "(X) **About butterflies and bees**, I know nothing. ／ (X) She is **about happy** to see them.",
        "ok": "(O) I know nothing **about butterflies and bees**.",
        "why": "介系詞片語不能放在句首獨立成句，也不能插在 be 動詞與其後的表語之間，否則句子會斷裂。台灣學生常照中文「關於蝴蝶和蜜蜂，我……」的語序把片語放到句首。判斷法：英文的介系詞片語要放在名詞後面或句末，不能放句首當獨立句子。",
        "exOkText": "(O) The book is **about butterflies and bees**.",
        "exOkZh": "那本書是關於蝴蝶和蜜蜂的。",
        "exBadText": "(X) The book **is about butterflies and bees** which is interesting.",
        "exBadNote": "錯誤：介系詞片語可放句末或名詞後，但不能插在 be 動詞和表語中間"
      },
      {
        "title": "about 的弱讀與發音",
        "bad": "(X) 唸成 /əˈbaʊt/ 的重讀版，逐字用力念 ／ (X) 漏掉 t 的音",
        "ok": "(O) /əˈbaʊt/ 或 /əbaʊt/",
        "why": "about 在句子中常弱化，唸成 /əbaʊt/，開頭的 a 變成輕短的 /ə/，重音甚至會移到後面的字上；但兩種唸法都算正確。台灣學生常把它唸得像單獨一個單字，聽起來生硬。判斷法：about 後面接的名詞才是重點，about 本身要唸輕、唸快，自然就會連讀。",
        "exOkText": "(O) She told us a lot **about butterflies and bees**.",
        "exOkZh": "她告訴我們許多關於蝴蝶和蜜蜂的事。",
        "exBadText": "(X) She said /əˈbaʊt/ very loudly before every word.",
        "exBadNote": "錯誤：about 在句中要弱化，唸成 /əbaʊt/，不能像單獨單字一樣重讀"
      }
    ],
    "traps": [
      "**介系詞選用的陷阱**：about、of、on、for 都可能接在名詞前，意思卻不同，考題常在這裡設計干擾選項。",
      "**-ing 的陷阱**：介系詞後接動詞一定要變 -ing，看到 collect 原形就是錯的。",
      "**位置的陷阱**：介系詞片語放句首會變成不完整句子，會考單句判斷題常出現。",
      "**聽力的陷阱**：about 常弱化唸成 /əbaʊt/，聽力題出現輕音不必驚訝，那也是正確唸法。"
    ],
    "strategy": [
      "介系詞後面先放名詞：寫 about 後先想「關於什麼」，名詞就自然跟著出現。",
      "看到「關於 + 動詞」立刻改 -ing，這是最常見也最容易檢查的規則。",
      "檢查片語位置：不能放句首獨立成句，也不能插在 be 動詞中間。",
      "把 about、on、of 綁成三個例句一起背，比單記單字更容易分清楚。",
      "唸句時把 about 唸輕，讓耳朵熟悉弱讀，聽力測驗會更順。"
    ]
  },
  "anything about butterflies and bees": {
    "zh": "任何關於蝴蝶和蜜蜂的事",
    "ipa": "ˈen.i.θɪŋ əˈbaʊt ˈbʌt.ɚ.flaɪz ænd biːz",
    "intro": "針對您提供的英文片語 **anything about butterflies and bees**，這是以代名詞 anything 為核心、加上修飾語的名詞片語，本身不能單獨成句。這個片語的重點是 anything 的使用限制：它只能用於否定句和疑問句，而且後面接名詞或介系詞片語時，中間一定要有空格。",
    "headline": "anything 只能用於否定句與疑問句",
    "structure": [
      {
        "role": "代名詞（核心）",
        "token": "anything",
        "pos": "不定代名詞 (Indefinite Pronoun) — 任何事物",
        "func": "代表「任何事物」，只能用在否定句與疑問句中，不能用在一般肯定句",
        "mark": "O"
      },
      {
        "role": "修飾語（介系詞）",
        "token": "about",
        "pos": "介系詞 (Preposition) — 關於",
        "func": "帶出修飾範圍，說明 anything 是「關於什麼」的anything",
        "mark": "O"
      },
      {
        "role": "修飾語（名詞）",
        "token": "butterflies and bees",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "接受 about 修飾，限定 anything 的內容；兩個名詞用 and 並列",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "anything about butterflies and bees",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整組可當主詞或受詞，前面須接動詞才能成句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "anything 用於肯定句（語意限制）",
        "bad": "(X) **Anything** about butterflies and bees is interesting. ／ (X) I know **anything** about bees.",
        "ok": "(O) I don't know **anything** about butterflies and bees.",
        "why": "anything 表示「任何事物」，帶有全無範圍的意思，只能用在否定句和疑問句裡。台灣學生常把 anything 當成 everything 的同義詞，直接放進肯定句。判斷法：看到 anything，先檢查句子是否含 not、don't，或是不是疑問句；兩個都沒有就不能用，換成 something。",
        "exOkText": "(O) Do you know **anything about butterflies and bees**?",
        "exOkZh": "你知道任何關於蝴蝶和蜜蜂的事嗎？",
        "exBadText": "(X) I know **anything about butterflies and bees**.",
        "exBadNote": "錯誤：anything 不能用於肯定句，應改成 something"
      },
      {
        "title": "複合片語被黏成一個字",
        "bad": "(X) I don't know **anythingabout** butterflies. ／ (X) She said **nothingabout** the bees.",
        "ok": "(O) I don't know **anything about** butterflies.",
        "why": "anything 與後面的介系詞片語是兩個不同的詞，中間一定要有空格，不能黏成一個單字。台灣學生在快速抄寫或克漏字時常把兩個字接在一起。判斷法：寫完代名詞先停頓，再寫下一個詞，中間永遠留一個空格，檢查時數一數空格在哪。",
        "exOkText": "(O) I don't know **anything about** the bees in our garden.",
        "exOkZh": "我不了解任何關於我們花園裡蜜蜂的事。",
        "exBadText": "(X) I don't know **anythingabout** the bees in our garden.",
        "exBadNote": "錯誤：anything 與 about 是兩個詞，中間必須有空格，不能黏成 anythingabout"
      },
      {
        "title": "片語內部語序錯亂",
        "bad": "(X) I don't know **about anything** butterflies and bees. ／ (X) She said **butterflies anything about bees**.",
        "ok": "(O) I don't know **anything about** butterflies and bees.",
        "why": "英文的修飾語一定放在被修飾的詞之後。anything 是核心，about butterflies and bees 是修飾它的部分，所以 about 一定出現在 anything 後面。台灣學生受中文「關於任何事」語序影響，容易把 about 擺到 anything 前面。判斷法：先寫核心詞 anything，再把修飾語整組貼在它後面。",
        "exOkText": "(O) She knows **anything about** collecting bees.",
        "exOkZh": "她了解任何關於採集蜜蜂的事。",
        "exBadText": "(X) She knows **about anything** collecting bees.",
        "exBadNote": "錯誤：修飾語必須放在 anything 之後，不能寫 about anything"
      },
      {
        "title": "單字片語誤當成完整句子",
        "bad": "(X) **Anything about butterflies and bees**! ／ (X) **Anything about butterflies and bees** is interesting.",
        "ok": "(O) I don't know **anything about** butterflies and bees.",
        "why": "這個片語裡只有代名詞與名詞，缺少動詞，本身不能獨立成句，必須放在完整句子中當主詞或受詞。台灣學生看到單字表格就把整組當成一句話唸出來。判斷法：檢查有沒有動詞，沒有動詞就不是句子，一定要補上 know、like、want 之類的動詞才完整。",
        "exOkText": "(O) Tell me **anything about** butterflies and bees.",
        "exOkZh": "跟我說任何關於蝴蝶和蜜蜂的事。",
        "exBadText": "(X) **Anything about butterflies and bees**.",
        "exBadNote": "錯誤：片語中缺少動詞，不能獨立成句，前面要補上動詞才完整"
      }
    ],
    "traps": [
      "**語意限制的陷阱**：anything 只能用於否定句與疑問句，放進肯定句一定錯，是會考高頻陷阱。",
      "**拼寫的陷阱**：anythingabout 這類黏字在克漏字與聽寫中常出現，寫完要檢查空格。",
      "**語序的陷阱**：修飾語一定在後面，about anything 是中文式語序，寫出來就扣分。",
      "**完整性檢查的陷阱**：單字表上的片語不能單獨當答案，要確認它被放進有動詞的句子裡。"
    ],
    "strategy": [
      "記 anything、something、nothing、everything 的對照表，寫完立刻檢查句子正負。",
      "寫代名詞後停頓再寫下一個詞，養成空格的習慣。",
      "修飾語永遠放後面：先寫核心詞 anything，再把整組 about 片語接上去。",
      "組句子時先找動詞：這片語沒有動詞，一定要搭配 know、want、tell 才能成句。",
      "做練習時把片語填進句子的空位，不要單獨背一整串，比較能掌握用法。"
    ]
  },
  "ask Sophia": {
    "zh": "問索菲亞",
    "ipa": "æsk soʊˈfiː.ə",
    "intro": "針對您提供的英文片語 **ask Sophia**，這是由動詞加上受詞組成的動詞片語，本身不能單獨成句，前面需要主詞。ask 是本課的重點動詞，最常考的是第三人稱單數的變化、ask 後面接動詞不能加 to，以及它的過去式拼寫；Sophia 是人名，首字母必須大寫。",
    "headline": "ask 是動詞；Sophia 是人名要大寫",
    "structure": [
      {
        "role": "動詞",
        "token": "ask",
        "pos": "動詞 (Verb) — 問、詢問",
        "func": "本片語的核心動作；作主詞時若為第三人稱單數要變成 asks",
        "mark": "O"
      },
      {
        "role": "受詞（人）",
        "token": "Sophia",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "接受 ask 的動作，是被問的那個人；專有名詞首字母一定要大寫",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "ask Sophia",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "可作主詞或句子的動詞核心，ask 後面還可以再接問什麼的內容",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數的動詞變化（少加 s）",
        "bad": "(X) He **ask** Sophia about bees. ／ (X) Tom **ask** me every day.",
        "ok": "(O) He **asks** Sophia about bees.",
        "why": "在一般現在時裡，主詞是第三人稱單數（例如 he、she、it、Tom、Sophia）時，動詞要加 s。台灣學生常以為只有 he、she、it 這類代詞才需要加 s，忘了人名同樣是第三人稱單數。判斷法：寫完句子檢查主詞是單數還是複數，單數就把動詞詞尾加 s。",
        "exOkText": "(O) Sophia **asks** me about butterflies every day.",
        "exOkZh": "索菲亞每天問我關於蝴蝶的事。",
        "exBadText": "(X) Sophia **ask** me about butterflies every day.",
        "exBadNote": "錯誤：主詞 Sophia 是第三人稱單數，動詞要加 s 變成 asks"
      },
      {
        "title": "專有名詞首字母未大寫",
        "bad": "(X) I want to ask **sophia** about bees. ／ (X) Yesterday I ask **Sophia** a question.",
        "ok": "(O) I want to ask **Sophia** about bees.",
        "why": "Sophia 是人名，屬於專有名詞，首字母必須大寫，這是英文書寫的基本規則。台灣學生在快速書寫或聽寫時常把所有人名都小寫，尤其在句子中段更容易漏掉。判斷法：看到大寫單字問自己「這是人名或地名嗎」，是的話首字母一定大寫，寫完再掃一次。",
        "exOkText": "(O) I want to ask **Sophia** about the butterflies.",
        "exOkZh": "我想問索菲亞關於那些蝴蝶的事。",
        "exBadText": "(X) I want to ask **sophia** about the butterflies.",
        "exBadNote": "錯誤：人名 Sophia 是專有名詞，首字母必須大寫，不能因為它在句子中段就寫成小寫。"
      },
      {
        "title": "ask 後接動詞誤加 to",
        "bad": "(X) I want to **ask to Sophia** about bees. ／ (X) She likes to **ask to ask** questions.",
        "ok": "(O) I want to **ask Sophia** about bees.",
        "why": "ask 是及物動詞，後面直接接人或接問的內容，中間不加 to。加了 to 會變成 ask to Sophia，語意變成「為了索菲亞而去問」，語法也錯。台灣學生常把 want to 與 ask 連在一起，順手多加 to。判斷法：ask 之後要嘛接名詞（問人），要嘛接句子（問問題），兩種都不加 to。",
        "exOkText": "(O) Could you **ask Sophia** to bring her book?",
        "exOkZh": "你可以請索菲亞把她的書帶來嗎？",
        "exBadText": "(X) Could you **ask to Sophia** to bring her book?",
        "exBadNote": "錯誤：ask 是及物動詞，後面直接接受詞 Sophia，中間不能加 to，否則語意變成「為了索菲亞」。"
      },
      {
        "title": "ask 的過去式拼寫錯誤",
        "bad": "(X) Yesterday I **askt** Sophia about bees. ／ (X) She **ask**ed me last night.",
        "ok": "(O) Yesterday I **asked** Sophia about bees.",
        "why": "ask 屬於規則動詞，過去式直接加 -ed，寫成 asked，d 要保留。台灣學生常因前面有 sk 就以為是特殊變化，寫成 askt，或把 d 漏掉寫成 aske。判斷法：規則動詞一律加 -ed，先把原字完整寫出來再在最後加 d、e、d 三個字母。",
        "exOkText": "(O) I **asked** Sophia about butterflies last week.",
        "exOkZh": "我上週問過索菲亞關於蝴蝶的事。",
        "exBadText": "(X) I **askt** Sophia about butterflies last week.",
        "exBadNote": "錯誤：ask 是規則動詞，過去式要加 -ed 寫成 asked，不能寫成 askt"
      }
    ],
    "traps": [
      "**第三人稱單數的陷阱**：人名 Sophia 也是第三人稱單數，動詞要加 s，不能因為不是代詞就忘記。",
      "**大寫的陷阱**：專有名詞首字母大寫是必檢項目，句子中段最容易漏。",
      "**to 的陷阱**：ask 是及物動詞，ask someone 不加 to；只有 ask someone to do 才出現 to，但位置在受詞之後。",
      "**時態的陷阱**：看到 yesterday、last week 就用過去式 asked，且要記得保留 d。"
    ],
    "strategy": [
      "寫完句子做三項檢查：動詞有沒有加 s、人名有沒有大寫、時態對不對。",
      "把 ask、asked、asking 三個形狀一起背，避免只會寫原形。",
      "ask someone 與 ask someone to do 兩個句型分開練，不要混著記。",
      "規則動詞加 -ed 的口訣：只加尾巴，不改前面的字母。",
      "寫完唸一次聽起來順不順，ask 的 sk 音要清楚唸出來。"
    ]
  },
  "ask Sophia anything": {
    "zh": "問索菲亞任何事",
    "ipa": "æsk soʊˈfiː.ə ˈen.i.θɪŋ",
    "intro": "針對您提供的英文片語 **ask Sophia anything**，這是動詞 ask 後面接了兩個受詞的動詞片語，本身不能單獨成句。ask somebody something 是固定句型，兩個受詞的位置不能互換；同時 anything 只能用於否定句與疑問句，這兩點是本片語最需要注意的地方。",
    "headline": "ask somebody something：雙受詞不能互換",
    "structure": [
      {
        "role": "動詞",
        "token": "ask",
        "pos": "動詞 (Verb) — 問、詢問",
        "func": "本句的動作核心，後面依序接「問誰」和「問什麼」兩個受詞",
        "mark": "O"
      },
      {
        "role": "間接受詞（人）",
        "token": "Sophia",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "回答 ask「問誰」，位置一定在先，首字母大寫",
        "mark": "O"
      },
      {
        "role": "直接受詞（事物）",
        "token": "anything",
        "pos": "不定代名詞 (Indefinite Pronoun) — 任何事物",
        "func": "回答 ask「問什麼」，一定放在人的後面；只能用於否定與疑問語氣",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "ask Sophia anything",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "雙受詞句型 ask somebody something 的完整示範，前面需補上主詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "雙受詞語序顛倒",
        "bad": "(X) I want to **ask anything Sophia** about bees. ／ (X) She can **ask anything Tom**.",
        "ok": "(O) I want to **ask Sophia anything** about bees.",
        "why": "ask somebody something 這個句型中，someone 一定是人，something 一定是事物，順序不能互換。台灣學生受中文「問任何事給索菲亞」語序影響，常把 anything 擺到人名前面。判斷法：先寫問的人，再寫問的內容，檢查時確認 anything 的後面沒有再跟人名。",
        "exOkText": "(O) Did you **ask Sophia anything** about the bees?",
        "exOkZh": "你有問索菲亞任何關於蜜蜂的事嗎？",
        "exBadText": "(X) Did you **ask anything Sophia** about the bees?",
        "exBadNote": "錯誤：ask 問人的受詞要先寫，anything 必須放在 Sophia 後面"
      },
      {
        "title": "anything 位置錯放（插入受詞中間）",
        "bad": "(X) I want to **ask anything about Sophia** today. ／ (X) He will **ask about anything Sophia**.",
        "ok": "(O) I want to **ask Sophia anything** about bees.",
        "why": "在 ask somebody something 句型中，anything 只能緊接在人名之後，不能被別的詞打斷，也不能被移到自己另加的修飾語前面。台灣學生常插入 about butterflies 這類片語，結果把 anything 擠到錯誤位置。判斷法：寫完檢查 anything 的前後，前一個詞要是人名，後面接句子或標點。",
        "exOkText": "(O) I can **ask Sophia anything** I want to know.",
        "exOkZh": "索菲亞任何我知道的事我都可以問。",
        "exBadText": "(X) I can **ask anything** anything **Sophia** I want to know.",
        "exBadNote": "錯誤：雙受詞不可拆分，anything 必須緊接在人名 Sophia 後面"
      },
      {
        "title": "ask 與 ask about 的介系詞誤用",
        "bad": "(X) I want to **ask about anything Sophia** told me. ／ (X) Did you **ask for** Sophia anything?",
        "ok": "(O) I want to **ask Sophia anything** about bees.",
        "why": "ask 表示「問某人」時，後面直接接受詞，不加介系詞；ask about 才表示「詢問某個主題」，而且 about 後面接的是事情不是人。台灣學生常看到「問關於某事」就自動加 about，於是把 about 加在人名後面。判斷法：about 後面接主題，ask 後面接人，兩者位置要分清楚。",
        "exOkText": "(O) I want to **ask about** butterflies and bees.",
        "exOkZh": "我想詢問關於蝴蝶和蜜蜂的事。",
        "exBadText": "(X) I want to **ask about Sophia** anything.",
        "exBadNote": "錯誤：about 後面接的是主題不是人，問人要寫 ask Sophia"
      },
      {
        "title": "anything 與 something 的選擇錯誤",
        "bad": "(X) I asked Sophia **something** about bees. ／ (X) Can you ask me **something** about bees?",
        "ok": "(O) I didn't ask Sophia **anything** about bees.",
        "why": "anything 用於否定句與疑問句，something 用於肯定句。台灣學生常因為中文「問了任何事」裡的「任何」就直接對應 anything，忽略整句其實是肯定句。判斷法：先看整句是肯定、否定還是疑問，再選對應的代詞，肯定句用 something。",
        "exOkText": "(O) I didn't ask Sophia **anything** about bees.",
        "exOkZh": "我沒有問索菲亞任何關於蜜蜂的事。",
        "exBadText": "(X) I asked Sophia **anything** about bees.",
        "exBadNote": "錯誤：這是肯定句，不能用 anything，要改成 something"
      }
    ],
    "traps": [
      "**雙受詞語序的陷阱**：ask someone something 的順序不能對調，這是會考填空與改錯的高頻題型。",
      "**介系詞的陷阱**：ask 問人時不加 about，about 是接在後面問主題時才出現。",
      "**代詞選擇的陷阱**：anything 與 something 要依整句語氣決定，不能只看中文的「任何」。",
      "**位置拆分的陷阱**：anything 不可被其他成分隔開，寫完要確認它緊接在人名後面。"
    ],
    "strategy": [
      "把 ask somebody something 當成一個整體公式背，寫作時依序填入。",
      "寫完檢查兩件事：anything 前一個詞是不是人名，整句是肯定還是否定。",
      "ask about 的用法單獨記，約束是「後面接主題不接人」。",
      "用問答卡練習：Given ask, 造出 somebody 和 something 兩塊，拼回完整句子。",
      "遇到 anything 先看整句語氣，這是最快的判斷捷徑。"
    ]
  },
  "you can ask Sophia anything": {
    "zh": "你可以問索菲亞任何事",
    "ipa": "juː kæn æsk soʊˈfiː.ə ˈen.i.θɪŋ",
    "intro": "針對您提供的英文句子 **you can ask Sophia anything**，這是一個完整且文法正確的簡單句，由「主詞 + 情態動詞 + 動詞原形 + 受詞」組成。最該注意的地方是 can 後面一定要接動詞原形、陳述句與疑問句的語序不同，以及整句是肯定句所以用 anything 很特別的用法需要注意語氣。",
    "headline": "can 是情態動詞，後面一律接動詞原形",
    "structure": [
      {
        "role": "主詞",
        "token": "you",
        "pos": "代名詞 (Pronoun) — 你",
        "func": "句子的主角，表示對方；因後面接 can，不需再自己變化",
        "mark": "O"
      },
      {
        "role": "情態動詞",
        "token": "can",
        "pos": "情態動詞 (Modal Verb) — 能夠、可以",
        "func": "表示能力或許可，本身就帶時態與人稱變化，後面直接接動詞原形",
        "mark": "O"
      },
      {
        "role": "動詞（原形）",
        "token": "ask",
        "pos": "動詞原形 (Verb Base Form) — 問",
        "func": "接受 can 支配，必須用原形，不能加 s、不能加 to、不能變過去式",
        "mark": "O"
      },
      {
        "role": "受詞（人）",
        "token": "Sophia",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "回答「問誰」，緊接在動詞後面，首字母大寫",
        "mark": "O"
      },
      {
        "role": "受詞（事物）",
        "token": "anything",
        "pos": "不定代名詞 (Indefinite Pronoun) — 任何事",
        "func": "回答「問什麼」，放在人名之後；這裡表示「任何事都可以問」",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "you can ask Sophia anything",
        "pos": "簡單句 (Simple Sentence)",
        "func": "語序為主詞 + 情態動詞 + 動詞原形 + 受詞，是會考最典型的基本句型",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "情態動詞 can 後接動詞非原形",
        "bad": "(X) You can **asks** Sophia anything. ／ (X) You can **to ask** Sophia anything.",
        "ok": "(O) You can **ask** Sophia anything.",
        "why": "情態動詞 can 後面一定要接動詞原形，因為 can 本身就表示時態與人稱，所以 ask 不能再加 s，也不能加 to。台灣學生常把一般句型的規則套在 can 後面，寫成 can askes 或 can to ask。判斷法：看到 can、must、should、may，後面直接寫動詞字典裡的原形，一個字母都不改。",
        "exOkText": "(O) You **can ask** Sophia anything about butterflies.",
        "exOkZh": "你可以問索菲亞任何關於蝴蝶的事。",
        "exBadText": "(X) You **can asks** Sophia anything about butterflies.",
        "exBadNote": "錯誤：can 是情態動詞，後面必須接動詞原形 ask，不能加 s"
      },
      {
        "title": "疑問句語序錯誤（未將 can 提前）",
        "bad": "(X) **You can** ask Sophia anything? ／ (X) **You ask** Sophia anything can?",
        "ok": "(O) **Can you** ask Sophia anything?",
        "why": "這句帶有詢問語氣，問句要把情態動詞 can 提到主詞 you 的前面，變成 Can you…？台灣學生常把 can 留在原位，句尾才加問號，形成問號位置錯誤。判斷法：句尾有問號時，檢查主詞後面是不是情態動詞，若是就要把它移到主詞前面。",
        "exOkText": "(O) **Can you** ask Sophia anything about bees?",
        "exOkZh": "你可以問索菲亞任何關於蜜蜂的事嗎？",
        "exBadText": "(X) **You can** ask Sophia anything about bees?",
        "exBadNote": "錯誤：疑問句要把 can 提到主詞 you 前面，句尾加問號"
      },
      {
        "title": "誤加助動詞造成雙動詞",
        "bad": "(X) You **do can** ask Sophia anything. ／ (X) She **does can** ask him anything.",
        "ok": "(O) You **can** ask Sophia anything.",
        "why": "can 本身就是情態動詞，前面不能再加 do 或 does，否則會變成雙動詞，句子不成立。台灣學生常以為一般現在時一定要加 do 或 does，於是硬塞一個進去。判斷法：先看句子有沒有情態動詞或 be 動詞，有它們就表示不需要再加 do 或 does。",
        "exOkText": "(O) You **can** ask Sophia anything you like.",
        "exOkZh": "你想問索菲亞任何事都可以。",
        "exBadText": "(X) You **do can** ask Sophia anything you like.",
        "exBadNote": "錯誤：can 本身就是情態動詞，前面不能再加 do 形成雙動詞"
      },
      {
        "title": "句末標點與語氣不符",
        "bad": "(X) You can ask Sophia **anything**. ／ (X) Can you ask Sophia anything**?**?",
        "ok": "(O) You can ask Sophia **anything**.",
        "why": "這句是陳述句，語氣是肯定，句末要用句點；只有變成疑問語氣如 Can you…？才用問號，而且一個問句只用一個問號。台灣學生常受中文語氣影響，在感嘆或疑問時多打問號。判斷法：句子有沒有 be 動詞或情態動詞不代表語氣，重點看有沒有 do、did、can 提前等問句特徵。",
        "exOkText": "(O) I **can** ask Sophia anything about bees.",
        "exOkZh": "我可以問索菲亞任何關於蜜蜂的事。",
        "exBadText": "(X) I **can** ask Sophia anything about bees??",
        "exBadNote": "錯誤：這是陳述句，語氣是肯定，句末要用句點；只有問句才用問號，而且一個問句只寫一個問號。"
      }
    ],
    "traps": [
      "**情態動詞的陷阱**：can 後面只能接原形，這是會考選擇題最常見的扣分點。",
      "**語序的陷阱**：can 提前變 Can you…？是疑問句的固定語序，句尾問號要配合。",
      "**雙動詞的陷阱**：do/does 與 can、be 動詞不能同時出現，句子里只能有一個主要動詞形式。",
      "**標點的陷阱**：陳述句用句點、問句用問號，問號一個就夠，不要連續使用。"
    ],
    "strategy": [
      "背下四個情態動詞：can、may、must、should，後面一律接原形。",
      "寫完句子檢查：主詞 + 情態動詞 + 原形動詞，三塊照順序排。",
      "看到句尾問號，就檢查 can 有沒有提到主詞前面。",
      "遇到 do 或 does 先停一下，確認句子裡沒有情態動詞或 be 動詞。",
      "寫完唸一遍，確認語氣和標點一致再往下作答。"
    ]
  },
  "insect": {
    "zh": "昆蟲",
    "ipa": "ˈɪn.sekt",
    "intro": "針對您提供的英文單字 **insect**，這是一個單一的英文單字，本身不能獨立成句，必須放在名詞組中使用。它是本課的類別詞，代表昆蟲這一類動物。最該注意三件事：拼字不要與 insert、incident 搞混、單數的音節與重音要唸對，以及它在科學分類上只包含真正的昆蟲。",
    "headline": "昆蟲是可數單數，拼字別寫成 insert",
    "structure": [
      {
        "role": "前段音節",
        "token": "in",
        "pos": "音節 (Syllable) — 讀 /ɪn/",
        "func": "昆蟲的分類前綴，對應昆蟲學 insectology 的說法，與 insert 的 in 不同義",
        "mark": "O"
      },
      {
        "role": "後段音節",
        "token": "sect",
        "pos": "音節 (Syllable) — 讀 /sekt/",
        "func": "表示「切割、分類」，呼應昆蟲被分類歸屬的意思",
        "mark": "O"
      },
      {
        "role": "整體字義",
        "token": "insect",
        "pos": "可數名詞 (Countable Noun) — 昆蟲",
        "func": "類別名詞，可指一隻昆蟲或整類昆蟲；單數前加 a/the，複數為 insects",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "與 insert、incident 的字形混淆",
        "bad": "(X) A **insert** has six legs. ／ (X) An **incident** happened in the garden.",
        "ok": "(O) An **insect** has six legs.",
        "why": "insect 是昆蟲，insert 是「插入」，incident 是「事件」，三個字長得很像但意思完全不同。台灣學生在聽寫或快寫時，常把 insect 誤寫成 insert 或 incident。判斷法：看到昆蟲、昆蟲學這類語意就必須寫 insect，判斷時以句子的意思為準，不以字形相似為準。",
        "exOkText": "(O) An **insect** flew into the classroom.",
        "exOkZh": "一隻昆蟲飛進了教室。",
        "exBadText": "(X) An **insert** flew into the classroom.",
        "exBadNote": "錯誤：昆蟲要用 insect，insert 是「插入」，意思完全不同"
      },
      {
        "title": "音節切分與重音位置錯誤",
        "bad": "(X) 唸成 in-SECT ／ (X) 唸成 IN-sect",
        "ok": "(O) 唸成 IN-sect，重音在第一音節",
        "why": "insect 是兩音節單字，重音落在第一音節 in-，讀作 /ˈɪn.sekt/，第一音節要用力、第二音節要弱化。台灣學生常把重音放到第二音節唸成 in-SECT，聽起來像別的字。判斷法：兩音節單字重音通常在前，唸出聲時第一個音節最大聲就對了。",
        "exOkText": "(O) The **insect** crawled on the leaf.",
        "exOkZh": "那隻昆蟲在葉子上爬。",
        "exBadText": "(X) I said it as in-SECT, so my teacher didn't understand.",
        "exBadNote": "錯誤：重音應在第一音節 in-，唸成 in-SECT 會聽不出這個字"
      },
      {
        "title": "詞性誤用（把名詞當動詞或形容詞）",
        "bad": "(X) He **insect** a net. ／ (X) The room was very **insect**.",
        "ok": "(O) He caught an **insect** with a net.",
        "why": "insect 是名詞，不能當動詞使用，也沒有對應的形容詞。台灣學生有時看到單字表就直接套用到句中，寫出 insect a net 這種句子。判斷法：判斷單字在句中擔任什麼角色，能放在 a、the 後面作受詞的才是名詞；動詞要配合專門的動詞。",
        "exOkText": "(O) A small **insect** sat on my hand.",
        "exOkZh": "一隻小昆蟲停在我手上。",
        "exBadText": "(X) A small **insect** was very **insect** today.",
        "exBadNote": "錯誤：insect 是名詞，不能直接當形容詞修飾其他詞；要修飾名詞得用別的形容詞。"
      },
      {
        "title": "分類語意錯誤（蜘蛛不算昆蟲）",
        "bad": "(X) A spider is an **insect**. ／ (X) Butterflies and bees are not **insects**.",
        "ok": "(O) Butterflies and bees are **insects**.",
        "why": "昆蟲有六條腿，蜘蛛有八條腿，所以蜘蛛屬於蛛形綱，不屬於昆蟲綱。台灣學生常把「會爬的小動物」都當成昆蟲，看到蟲字就歸類。判斷法：判斷是否為昆蟲先數腿數，六條腿、有三節身體才是昆蟲，這也是自然課與會考結合的分類重點。",
        "exOkText": "(O) Bees and butterflies are **insects** with six legs.",
        "exOkZh": "蜜蜂和蝴蝶都是六條腿的昆蟲。",
        "exBadText": "(X) Spiders are **insects** with eight legs.",
        "exBadNote": "錯誤：蜘蛛有八條腿，屬於蛛形綱，不屬於昆蟲綱；昆蟲一定要是六條腿才算。"
      }
    ],
    "traps": [
      "**字形陷阱**：insect、insert、incident 拼法接近，考單字選擇題時要看語意，不要只看字形相似。",
      "**重音陷阱**：重音在第一音節 in-，唸錯位置在聽力題會導致判斷錯誤。",
      "**詞性陷阱**：insect 只能作名詞，不能當動詞或形容詞使用。",
      "**分類陷阱**：蜘蛛有八條腿不算昆蟲，會考結合自然課的分類題。"
    ],
    "strategy": [
      "把 insect、insert、incident 寫成一列對照，標上中文意思分組記。",
      "唸單字時先吸一口氣重讀 IN，再弱化 -sect，重音自然正確。",
      "寫句子時確認 insect 的前後有沒有冠詞或形容詞，確認它是名詞。",
      "結合自然課整理分類：六條腿是昆蟲，蜘蛛、螃蟹不是，分類題就不會錯。",
      "寫完檢查一次詞性，避免把單字硬套進不適合的位置。"
    ]
  },
  "insects": {
    "zh": "昆蟲（複數）",
    "ipa": "ˈɪn.sekts",
    "intro": "針對您提供的英文單字 **insects**，這是 insect 的複數形式，本身同樣不能獨立成句。複數規則很簡單，只要在字尾加 s，但有三個地方容易出錯：拼寫時不要動到前面的字母、複數的 s 唸成 /s/ 而非 /z/，以及集合名詞或數量詞的搭配。",
    "headline": "複數加在字尾，-ts 唸成 /ts/",
    "structure": [
      {
        "role": "單數原型",
        "token": "insect",
        "pos": "可數名詞 (Countable Noun) — 昆蟲（單數）",
        "func": "以 t 結尾的單數名詞，變複數時只在最後加 s，前面的字母完全保留",
        "mark": "O"
      },
      {
        "role": "複數變化",
        "token": "-s",
        "pos": "名詞複數變化 (Plural Formation)",
        "func": "前面是清輔音 /t/，所以複數的 s 讀成清音 /s/，形成 /ts/",
        "mark": "O"
      },
      {
        "role": "整體字義",
        "token": "insects",
        "pos": "可數名詞複數 (Countable Noun, plural) — 昆蟲",
        "func": "作主詞時 be 動詞用 are；搭配 a swarm of、many 等表達",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數拼寫與 s 的位置錯誤",
        "bad": "(X) Many **insect's** live in the garden. ／ (X) A **insects** flew by.",
        "ok": "(O) Many **insects** live in the garden.",
        "why": "insects 就是在 insect 最後加一個 s，前面 insect 五個字母完全不能動，也不要加撇號。台灣學生常誤以為在 t 後面要變成 ts 而多寫一個字母，或把複數與所有格混淆。判斷法：複數只在最後加 s，寫完檢查前面 insect 有沒有被改動。",
        "exOkText": "(O) Many **insects** are flying over the pond.",
        "exOkZh": "許多昆蟲正在池塘上空飛舞。",
        "exBadText": "(X) Many **insects's** are flying over the pond.",
        "exBadNote": "錯誤：複數就是在 insect 最後加一個 s，前面五個字母完全不動，也不能多加撇號。"
      },
      {
        "title": "複數 s 的清濁發音（/s/ 與 /z/ 混淆）",
        "bad": "(X) 唸成 /ˈɪn.sektz/ ／ (X) 唸成 /ˈɪn.se.kəts/",
        "ok": "(O) 唸成 /ˈɪn.sekts/",
        "why": "名詞複數的 s，前面是清輔音時唸 /s/，是濁音或元音時唸 /z/。insect 最後的 t 是清音，所以 insects 要唸成 /ts/，舌尖抵住上齒齦不震動。台灣學生常唸成 /z/ 或多唸出一個母音。判斷法：唸複數時手摸喉嚨，沒有震動就是 /s/，對應 insect 這類清音結尾的字。",
        "exOkText": "(O) The **insects** crawled on the window.",
        "exOkZh": "那些昆蟲在窗戶上爬行。",
        "exBadText": "(X) I said **insects**, but I pronounced it with a buzzing z.",
        "exBadNote": "錯誤：t 是清輔音，複數的 s 要讀成清音 /s/，不能讀成 /z/"
      },
      {
        "title": "可數複數與數量詞、不可數量詞的誤用",
        "bad": "(X) I saw **many insect** in the field. ／ (X) There are **much insects** outside.",
        "ok": "(O) I saw **many insects** in the field.",
        "why": "insects 是可數名詞的複數，前面要用 many、a few、some 這類可數量詞，不能用 much 這種修飾不可數名詞的詞，也不能用單數 insect。台灣學生常混淆 many 與 much，或忘記名詞要變複數。判斷法：先看量詞是 many 還是 much，many 後面一定接複數可數名詞。",
        "exOkText": "(O) How **many insects** do you see in the picture?",
        "exOkZh": "你在圖片裡看到幾隻昆蟲？",
        "exBadText": "(X) How **many insect** do you see in the picture?",
        "exBadNote": "錯誤：how many 後面的可數名詞要用複數 insects"
      },
      {
        "title": "集合名詞與複數搭配錯誤",
        "bad": "(X) I saw a **insects** in the field. ／ (X) A **swarm** of insect is flying.",
        "ok": "(O) I saw a **swarm of insects** in the field.",
        "why": "一群昆蟲要用集合名詞搭配 of，寫成 a swarm of insects，of 後面的名詞必須用複數，且前面不能直接加 a。台灣學生常省略 of 或忘記把 insect 變成 insects。判斷法：套用「a 集合名詞 of 複數名詞」的公式，如 a swarm of insects、a cloud of insects。",
        "exOkText": "(O) A **swarm of insects** flew over the picnic area.",
        "exOkZh": "一大群昆蟲飛過野餐區上方。",
        "exBadText": "(X) A **swarm of insect** flew over the picnic area.",
        "exBadNote": "錯誤：集合名詞 of 後面的可數名詞要用複數 insects"
      }
    ],
    "traps": [
      "**複數拼寫的陷阱**：insect 前面五個字母不能動，複數只在最後加 s，不要變成 insect's。",
      "**發音的陷阱**：t 是清輔音，複數唸 /s/；和 bee 這類元音結尾唸 /z/ 形成對比，考點常在這裡。",
      "**many/much 的陷阱**：many 後接可數複數，much 後接不可數，insects 只能用 many。",
      "**集合名詞的陷阱**：a swarm of insects 的 of 不能省，of 後面一定要用複數。"
    ],
    "strategy": [
      "單複數成對寫：insect / insects 寫在同一行，複數只加一個 s。",
      "複數規則口訣：前面清音唸 /s/，前面濁音或元音唸 /z/，insect 屬前者。",
      "看到 many 就檢查名詞有沒有變複數，看到 much 就檢查是不是不可數。",
      "集合名詞用公式背：一群 X 就是 a swarm of Xs，of 後面一律複數。",
      "寫完做一次通讀，檢查有沒有漏字或多寫撇號。"
    ]
  },
  "of insects": {
    "zh": "關於昆蟲的",
    "ipa": "əv ˈɪn.sekts",
    "intro": "針對您提供的 **of insects**，這是一個介系詞片語（prepositional phrase），不是完整句子，單獨使用時前面一定要有名詞（例如 a book of insects）。of 表示「關於／屬於」，後面必須接名詞；這裡 insects 是可數名詞的複數，代表泛指「昆蟲這一類」。",
    "headline": "of 後接泛指複數；片語不能單獨成句",
    "structure": [
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "片語的靈魂，後面一定要接名詞或名詞片語，表示「…的／關於…」；沒有受詞就不能成立",
        "mark": "O"
      },
      {
        "role": "of 的受詞",
        "token": "insects",
        "pos": "名詞 (Noun) — insect 的複數",
        "func": "被 of 引導的名詞，泛指「昆蟲（整類）」；可數名詞泛指一整類要用複數，且不加 the",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "of insects",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "整個片語用來修飾前面的名詞（a book **of insects**），自己不能當主詞或受詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用：of 與 for 混淆",
        "bad": "(X) **for insects**",
        "ok": "(O) **of insects**",
        "why": "of 表示「關於、屬於」，後面接名詞組成「…的」；for 表示「為了、給」，後面接的是目的或對象。台灣學生常把兩個介系詞互換，寫出 knowledge **for** insects（為了昆蟲的知識）這種句子。判斷法：of 後面一定接「事物」，for 後面接的是「為了誰、為了什麼」。",
        "exOkText": "(O) He has great **knowledge of insects**.",
        "exOkZh": "他有豐富的昆蟲知識。",
        "exBadText": "(X) He has great knowledge **for insects**.",
        "exBadNote": "錯誤：表示「關於昆蟲」要用 of，for 是「為了、給」的意思。"
      },
      {
        "title": "名詞複數錯誤：insect 漏加 -s",
        "bad": "(X) of insect",
        "ok": "(O) of insects",
        "why": "insect 是可數名詞，泛指「昆蟲這一整類」時必須用複數 insects；若用單數 insect，就變成「一隻昆蟲」，前面還要有 a、an 或 the 才合法。會考很常在這裡出題：of 後面的名詞到底要不要 -s。判斷法：of 後面若指「一整類事物」，一律加 -s。",
        "exOkText": "(O) There are hundreds **of insects** in the garden.",
        "exOkZh": "花園裡有數百隻昆蟲。",
        "exBadText": "(X) There are hundreds **of insect** in the garden.",
        "exBadNote": "錯誤：insect 沒有加 -s，泛指一整類昆蟲要用複數。"
      },
      {
        "title": "片語不能單獨成句（缺少主詞與動詞）",
        "bad": "(X) **of insects**.",
        "ok": "(O) **a book of insects**.",
        "why": "of insects 是介系詞片語，只能依附在名詞後面當修飾語，自己沒有主詞也沒有動詞，不能獨立成句。學生容易照著中文「昆蟲的」三個字就把它當一句話寫下來。判斷法：介系詞片語前面一定要先找到一個名詞（名詞片語）當主詞或受詞，找不到就是錯的。",
        "exOkText": "(O) She is reading a book **of insects**.",
        "exOkZh": "她正在讀一本昆蟲的書。",
        "exBadText": "(X) She is reading **of insects**.",
        "exBadNote": "錯誤：介系詞片語 of insects 單獨使用，前面缺名詞 book。"
      },
      {
        "title": "所有格 's 誤用：of 後面多加一個 's",
        "bad": "(X) of **insect's**",
        "ok": "(O) of insects",
        "why": "of 後面泛指一整類昆蟲時用複數 insects，不加所有格 's；insect's 是「某隻昆蟲的」，只能用在 a、the、this 這類單數名詞前面。台灣學生非常容易把「昆蟲的書」寫成 a book of insect's。判斷法：a lot of / kinds of 之後一定是「複數名詞原形」，絕對不加 's。",
        "exOkText": "(O) This is a book **of insects**.",
        "exOkZh": "這是一本昆蟲的書。",
        "exBadText": "(X) This is a book **of insect's**.",
        "exBadNote": "錯誤：of 後面泛指一整類昆蟲時不加所有格 's。"
      }
    ],
    "traps": [
      "**of 與 for 的陷阱**：of 是「…的／關於」，for 是「為了／給」。會考選項常把兩者互換，讀題時先問自己「這裡是擁有某種知識，還是要為昆蟲做什麼？」",
      "**複數的陷阱**：of 後面的名詞如果泛指一整類（昆蟲、魚、水果），一定要用複數 insects；只有指「一隻」時才用單數並加上 a / an / the。",
      "**片語不能獨立的陷阱**：介系詞片語永遠不能單獨成句，前面一定有名詞。克漏字常把 of 挖空讓你選，介系詞一錯整題就錯。",
      "**'s 的陷阱**：of insects（泛指一整類）不加 's；insect's（某隻昆蟲的）前面要有 a、the、this、that 等限定詞。"
    ],
    "strategy": [
      "看到 of 就做兩件事：檢查後面的名詞有沒有 -s，再確認前面有沒有名詞當主詞或受詞。",
      "把 of 換成中文的「…的」試看看，讀起來通順的才保留；for 換成「為了」試看看，兩種介系詞一次分清楚。",
      "背下三組必背片語：a book of insects（昆蟲的書）、a picture of insects（昆蟲的照片）、a lot of insects（很多昆蟲），考試直接套用。",
      "練習時先畫結構箭頭：名詞 →（of）→ 名詞。箭頭兩端少任何一端就是錯的。",
      "寫完用檢查清單掃一次：主詞有了嗎？動詞有了嗎？of 對了嗎？名詞複數加了嗎？"
    ]
  },
  "knowledge": {
    "zh": "知識",
    "ipa": "ˈnɑː.lɪdʒ",
    "intro": "針對您提供的 **knowledge**，這是一個單字（不可數名詞），本身不是完整句子，通常要放在名詞片語裡當主詞或受詞，例如 She has great knowledge of insects.。它表示「知識」，抽象、不可數，沒有複數形；拼字上開頭的 k 不發音，是最容易唸錯的地方。",
    "headline": "不可數名詞沒有複數；k 不發音",
    "structure": [
      {
        "role": "單字",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "句子的核心，表示「知識」；抽象名詞不能一個一個數，所以沒有複數形",
        "mark": "O"
      },
      {
        "role": "不發音字母",
        "token": "k",
        "pos": "不發音的字母 (Silent Letter)",
        "func": "開頭的 k 本身不發音，只用來讓字形對應 hard c 的 /k/，讀音是 /ˈnɑː.lɪdʒ/",
        "mark": "O"
      },
      {
        "role": "字尾",
        "token": "-ledge",
        "pos": "字尾 (Suffix)",
        "func": "結尾的 dge 讀 /dʒ/，字尾整體讀 /lɪdʒ/，不要唸成 /ledʒ/ 或多加一個母音",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "不可數名詞的複數錯誤（多加 -s）",
        "bad": "(X) **knowledges**",
        "ok": "(O) **knowledge**",
        "why": "knowledge 是抽象的不可數名詞，跟 water、information 一樣，沒有辦法一個一個數，所以不能加 -s 變成 knowledges。學生看到「知識」好像不只一種，就以為要變複數。判斷法：問自己「Can I count it?（我能一個一個數嗎？）」不能數的名詞就沒有 -s、-es。",
        "exOkText": "(O) He has great **knowledge** of insects.",
        "exOkZh": "他有豐富的昆蟲知識。",
        "exBadText": "(X) He has great **knowledges** of insects.",
        "exBadNote": "錯誤：knowledge 是不可數名詞，不能加 -s 變 knowledges。"
      },
      {
        "title": "拼寫錯誤：漏掉不發音的 k",
        "bad": "(X) **knowlege** ／ (X) **knowledeg**",
        "ok": "(O) **knowledge**",
        "why": "knowledge 裡的 k 雖然不發音，仍然一定要寫出來；字母順序是 k-n-o-w-l-e-d-g-e，一共 9 個字母，know 裡也同樣有這個 k。判斷法：唸音之前先把 9 個字母唸一遍 k-n-o-w-l-e-d-g-e，確認順序無誤，再連起來唸 /ˈnɑː.lɪdʒ/。",
        "exOkText": "(O) She has **knowledge** of insects.",
        "exOkZh": "她有昆蟲的知識。",
        "exBadText": "(X) She has **knowlege** of insects.",
        "exBadNote": "錯誤：拼法是 k-n-o-w-l-e-d-g-e，不能漏掉 k 或顛倒字母。"
      },
      {
        "title": "冠詞誤用：不可數名詞前不加 a / an",
        "bad": "(X) **a knowledge**",
        "ok": "(O) **knowledge**",
        "why": "不可數名詞前面不能用 a / an，也不能用 one 或數字去數。要表示「一點點知識」要用 a little knowledge；表示「很多知識」要用 a lot of / much knowledge。判斷法：a / an 只能放在「單數、可數」名詞前面，knowledge 兩個條件都不符合。",
        "exOkText": "(O) She has **a little knowledge** of insects.",
        "exOkZh": "她有一點點昆蟲的知識。",
        "exBadText": "(X) She has **a knowledge** of insects.",
        "exBadNote": "錯誤：knowledge 不可數，前面不能加冠詞 a。"
      },
      {
        "title": "詞性錯誤：把名詞 knowledge 當動詞用",
        "bad": "(X) She **knowledge** a lot about insects. ／ (X) She **knowledges** about insects.",
        "ok": "(O) She **knows** a lot about insects.",
        "why": "knowledge 的詞性只有名詞，不能帶 -s、-ed，也不能直接放在主詞後面當動詞。「知道、懂得」要用動詞 know；「研究昆蟲」要用 study。判斷法：先看這個字在句中要當「動作」還是「東西」，動作就是動詞；knowledge 只是東西（知識），所以只能當名詞。",
        "exOkText": "(O) She **knows** a lot about insects.",
        "exOkZh": "她很了解昆蟲。",
        "exBadText": "(X) She **knowledge** a lot about insects.",
        "exBadNote": "錯誤：knowledge 是名詞，不能當動詞用，應該用 knows。"
      }
    ],
    "traps": [
      "**不可數名詞的陷阱**：knowledge、information、advice、homework、furniture 都是不可數名詞，沒有複數形，前面也不能加 a / an。會考選項常放 knowledges 當錯誤答案。",
      "**k 不發音的陷阱**：knowledge、know、knee、knife 的 k 都不發音，但拼字一定要保留，字彙題常在這裡設陷阱。",
      "**詞性的陷阱**：知識（名詞）＝ knowledge；知道（動詞）＝ know。兩者只差一個字尾，卻不能互換使用。",
      "**字尾 -dge 的陷阱**：結尾的 dge 讀 /dʒ/，整字讀 /ˈnɑː.lɪdʒ/，不要唸成 /ˈnɑː.lɪdʒə/，也不讀 /d/。"
    ],
    "strategy": [
      "把不可數名詞另抄一頁常背：knowledge、information、advice、furniture、homework、luggage，前面一律不加 a / an。",
      "背單字時把「字形—音標—詞性」三件事一起記，knowledge 這種不規則發音的詞尤其需要。",
      "寫句子前先圈出不可數名詞，決定要用 a lot of / much，而不是 many 或數字。",
      "遇到名詞想拿來當動詞用時，先回想它的詞性；台灣學生最常犯的就是把 know 和 knowledge 混用。",
      "默寫 knowledge 這個字，寫完回頭數字母是不是 9 個，順序 k-n-o-w-l-e-d-g-e。"
    ]
  },
  "knowledge of insects": {
    "zh": "昆蟲知識",
    "ipa": "ˈnɑː.lɪdʒ əv ˈɪn.sekts",
    "intro": "針對您提供的 **knowledge of insects**，這是一個名詞片語（noun phrase），前面還缺主詞和動詞，不能單獨成句，例如 She has great knowledge of insects.。它表示「昆蟲的知識」：knowledge 是不可數名詞，of insects 說明是哪一種知識，後面的 insects 要用複數表示泛指。",
    "headline": "名詞片語須接動詞；of 後面用複數",
    "structure": [
      {
        "role": "中心名詞",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "片語的核心，表示「知識」；整個名詞片語能不能加 the，看的就是這個字",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接 knowledge 和 insects，表示「…的」，後面必須接名詞或名詞片語",
        "mark": "O"
      },
      {
        "role": "of 的受詞",
        "token": "insects",
        "pos": "名詞 (Noun) — insect 的複數",
        "func": "說明是哪一種知識，泛指「昆蟲（整類）」要用複數，前面不加 the",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "knowledge of insects",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "可以整個當主詞或受詞，後面還要接一個動詞才有完整句子",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用：of 與 with 混淆",
        "bad": "(X) knowledge **with** insects",
        "ok": "(O) knowledge **of insects**",
        "why": "of 表示「關於、屬於」，是純粹的所屬關係；with 表示「和…一起、帶有…」，後面通常是陪伴或附帶的東西。台灣學生受中文「和昆蟲的知識」影響，容易寫成 knowledge with insects。判斷法：of 後面只表示「這是誰的／哪方面的」；with 一定帶有「一起、帶著」的意思。",
        "exOkText": "(O) She has great **knowledge of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has great knowledge **with insects**.",
        "exBadNote": "錯誤：with 是「和…一起」，表示所屬關係要用 of。"
      },
      {
        "title": "名詞複數錯誤：insect 漏加 -s",
        "bad": "(X) knowledge of insect",
        "ok": "(O) knowledge of insects",
        "why": "of 後面的 insects 泛指「昆蟲這一整類」，一定要用複數；寫成單數 insect，句子就變成「某一隻昆蟲的知識」，意義完全跑掉。介系詞不會改變名詞的單複數，判斷法：只要是泛指一整類，of 之後的名詞就檢查有沒有 -s。",
        "exOkText": "(O) The museum has **knowledge of insects**.",
        "exOkZh": "博物館有昆蟲方面的知識。",
        "exBadText": "(X) The museum has a knowledge of **insect**.",
        "exBadNote": "錯誤：insect 漏加 -s，泛指要用複數 insects。"
      },
      {
        "title": "名詞片語不能單獨成句（缺少動詞）",
        "bad": "(X) She **knowledge of insects**.",
        "ok": "(O) She **has great** knowledge **of insects**.",
        "why": "名詞片語只是句子的「零件」，本身沒有動作，必須再接一個動詞才有完整句子。台灣學生常把中文「她昆蟲的知識」照著語序直譯過來，就少了一個動詞。判斷法：一個句子至少要有「誰 + 做什麼」，名詞片語只能扮演其中一個角色。",
        "exOkText": "(O) She **has** great knowledge **of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She great knowledge of insects.",
        "exBadNote": "錯誤：名詞片語後面缺動詞 has，句子不完整。"
      },
      {
        "title": "定冠詞 the 誤加：泛指時不加 the",
        "bad": "(X) knowledge of **the insects**",
        "ok": "(O) knowledge of insects",
        "why": "insects 在這裡是泛指「昆蟲這一整類」，前面不加 the；the 是「特指」某一群特定的昆蟲。隨便加 the 之後，句意就限定成「某一批特定昆蟲的知識」。判斷法：前面沒有 this、that、these、those 或專有名詞做提示，泛指名詞前面就不加 the。",
        "exOkText": "(O) He has great **knowledge of insects**.",
        "exOkZh": "他有豐富的昆蟲知識。",
        "exBadText": "(X) He has great knowledge of **the insects**.",
        "exBadNote": "錯誤：insects 是泛指，前面不加 the。"
      }
    ],
    "traps": [
      "**of 與 with 的陷阱**：of 表示所屬、關於；with 表示「一起、帶有」。會考選項常放 with、for、about 來混淆。",
      "**of 後面泛指用複數**：of the world、of insects、of fruits 都是複數且不加 the，不要寫成 of insect。",
      "**名詞片語不能獨立的陷阱**：名詞片語一定要接動詞或 be 動詞。只給一個名詞片語，就知道後面還缺動詞。",
      "**the 的使用時機**：只有特指才加 the，泛指一整類不加。昆蟲這種生物名詞做泛指時一律不加 the。"
    ],
    "strategy": [
      "練習時把名詞片語框起來：［ knowledge of insects ］，再問自己「誰要對它做什麼？」",
      "of 這個介系詞專門接「所屬、關於」，背下 of = …的，測試自己會不會翻成「昆蟲的」。",
      "寫完 of 之後立刻檢查兩件事：後面的名詞是複數嗎？前面有沒有亂加 the？",
      "把整組片語當成一個單位背誦，寫句子時整塊複製，就不會漏掉動詞。",
      "遇到不會的介系詞，先用中文「…的」試一次，能通順通常就是 of。"
    ]
  },
  "great knowledge": {
    "zh": "豐富的知識",
    "ipa": "ɡreɪt ˈnɑː.lɪdʒ",
    "intro": "針對您提供的 **great knowledge**，這是一個「形容詞 + 名詞」組成的名詞片語，還不是完整句子，前面要補上主詞和動詞（例如 She has great knowledge of insects.）。great 在這裡修飾不可數名詞 knowledge，表示「豐富的、大量的」，中文常翻成「豐富的知識」。",
    "headline": "形容詞必須在名詞前；great 修飾不可數",
    "structure": [
      {
        "role": "形容詞",
        "token": "great",
        "pos": "形容詞 (Adjective)",
        "func": "修飾後面的名詞 knowledge，表示「豐富的、大量的」；英文形容詞一定要放在名詞前面",
        "mark": "O"
      },
      {
        "role": "中心名詞",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "片語的核心，表示「知識」；不可數名詞沒有複數形，前面也不加冠詞 a / an",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "great knowledge",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "可以當主詞或受詞，後面要接動詞才成為完整句子",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞位置錯誤：把 great 放到名詞後面",
        "bad": "(X) knowledge great",
        "ok": "(O) great knowledge",
        "why": "英文的形容詞一定要放在所修飾的名詞前面；中文可以說「知識豐富」，英文卻只能說 knowledge is great（用 be 動詞）或 great knowledge。學生常受中文語序影響把形容詞放後面。判斷法：先找出名詞，形容詞就貼在它前面寫，寫完再回頭掃一次。",
        "exOkText": "(O) She has **great knowledge** of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has **knowledge great** of insects.",
        "exBadNote": "錯誤：形容詞 great 必須放在名詞 knowledge 前面。"
      },
      {
        "title": "數量詞誤用：不可數名詞不能用 many",
        "bad": "(X) **many** knowledge",
        "ok": "(O) **much** knowledge ／ (O) **a lot of** knowledge",
        "why": "many 只能修飾可數名詞的複數，much 才能修飾不可數名詞。knowledge 屬於不可數名詞，所以 many knowledge 是錯的，國中會考很常在這裡考 many / much / a lot of 的選擇。判斷法：先看名詞能不能一個一個數，能數用 many，不能數用 much。",
        "exOkText": "(O) She has **much knowledge** of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has **many knowledge** of insects.",
        "exBadNote": "錯誤：knowledge 不可數，many 只能修飾可數名詞的複數。"
      },
      {
        "title": "形容詞誤用：把副詞 greatly 當形容詞",
        "bad": "(X) She **greatly** knows insects.",
        "ok": "(O) She has **great knowledge** of insects.",
        "why": "great 是形容詞，專門放在名詞前面；greatly 是副詞，修飾動詞或整個句子，意思是「默默地、大大地」。台灣學生常因為看到 -ly 就覺得比較正式而亂用。判斷法：判斷一個字是形容詞還是副詞，看它後面接的是名詞還是動詞。",
        "exOkText": "(O) He has **great knowledge** of insects.",
        "exOkZh": "他有豐富的昆蟲知識。",
        "exBadText": "(X) He **greatly knows** insects.",
        "exBadNote": "錯誤：greatly 是副詞，修飾動詞 knows；修飾名詞要用 great。"
      },
      {
        "title": "介系詞漏加：兩個名詞之間少 of",
        "bad": "(X) She has great knowledge insects.",
        "ok": "(O) She has great knowledge **of** insects.",
        "why": "兩個名詞要靠 of 連起來才能表示所屬關係，也就是中文「…的」；漏掉 of 之後，句子讀起來會在兩個名詞中間突然斷掉，讀者根本不知道是「什麼的知識」。判斷法：看到「名詞 + 名詞」直接相鄰，中間一定漏了一個介系詞，通常就是 of。",
        "exOkText": "(O) She has great knowledge **of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has great knowledge insects.",
        "exBadNote": "錯誤：knowledge 與 insects 之間要加介系詞 of。"
      }
    ],
    "traps": [
      "**形容詞位置的陷阱**：英文形容詞永遠在名詞前面。閱讀測驗看到「名詞 + 形容詞」就應立刻判錯。",
      "**many / much 的陷阱**：knowledge 是不可數名詞，只能用 much 或 a lot of；many 只修飾可數複數。",
      "**副詞的陷阱**：greatly 是副詞，修飾動詞；great 是形容詞，修飾名詞。兩者不能互換。",
      "**介系詞的陷阱**：knowledge 和 insects 是兩個名詞，中間一定要有 of 連接，漏掉句子就不成立。"
    ],
    "strategy": [
      "背形容詞時一定連著範例一起背：great knowledge、great fun、a great day，一看到名詞就往前放。",
      "寫完名詞片語立刻做「回頭查」：找一找有沒有形容詞跑到名詞後面。",
      "把不可數名詞與數量詞配對做成表格：knowledge—much、information—a lot of、students—many。",
      "遇到 -ly 結尾的字先問：這裡修飾的是動詞嗎？是的才用 -ly。",
      "考試時把 a / an / the 圈起來檢查，不可數名詞前面出現冠詞就先當它錯。"
    ]
  },
  "great knowledge of insects": {
    "zh": "豐富的昆蟲知識",
    "ipa": "ɡreɪt ˈnɑː.lɪdʒ əv ˈɪn.sekts",
    "intro": "針對您提供的 **great knowledge of insects**，這是一個名詞片語，結構是「形容詞 + 名詞 + 介系詞片語」，還不是完整句子，前面要有主詞和動詞（例如 She has great knowledge of insects.）。它表示「豐富的昆蟲知識」，of insects 說明知識的範圍，insects 要用複數且不加 the。",
    "headline": "形容詞+名詞+of 複數，缺主詞動詞",
    "structure": [
      {
        "role": "形容詞",
        "token": "great",
        "pos": "形容詞 (Adjective)",
        "func": "修飾 knowledge，表示「豐富的、大量的」，位置固定在名詞前面",
        "mark": "O"
      },
      {
        "role": "中心名詞",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "片語的核心「知識」；不可數，沒有複數形，前面也不加 a / an",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "把 knowledge 和 insects 連起來，表示「…的」；後面一定要有名詞",
        "mark": "O"
      },
      {
        "role": "of 的受詞",
        "token": "insects",
        "pos": "名詞 (Noun) — insect 的複數",
        "func": "說明是哪方面的知識，泛指一整類昆蟲用複數，前面不加 the",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞片語位置錯誤：of insects 誤放在名詞前面",
        "bad": "(X) of insects great knowledge",
        "ok": "(O) great knowledge of insects",
        "why": "這是「後置修飾」：介系詞片語一定要放在它所修飾的名詞後面。中文可以說「昆蟲的豐富知識」（of 在前），英文卻是 knowledge of insects（of 在後）。判斷法：of 前面離它最近的一定要是名詞；如果 of 前面是動詞，就是放錯位置了。",
        "exOkText": "(O) She has **great knowledge of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has **of insects** great knowledge.",
        "exBadNote": "錯誤：of insects 是後置修飾，必須放在 knowledge 後面。"
      },
      {
        "title": "名詞複數錯誤：insect 漏加 -s",
        "bad": "(X) great knowledge of insect",
        "ok": "(O) great knowledge of insects",
        "why": "of 後面的 insects 泛指「昆蟲整類」，必須用複數；漏了 -s，意義就變成「一隻昆蟲的知識」。判斷法：a lot of / kinds of / of 之後的名詞，一律檢查有沒有 -s，看到單數就改複數。",
        "exOkText": "(O) She has great knowledge **of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has great knowledge **of insect**.",
        "exBadNote": "錯誤：insect 漏加 -s，泛指要用複數。"
      },
      {
        "title": "名詞片語不能單獨成句（缺少主詞與動詞）",
        "bad": "(X) She great knowledge of insects.",
        "ok": "(O) She has great knowledge of insects.",
        "why": "一個英文句子至少要有主詞和動詞兩個部分。great knowledge of insects 只是名詞片語，還需要 someone + has 才能成為完整的句子；台灣學生常照著中文「豐富的昆蟲知識」直接寫下來，就少了一個動詞。判斷法：把片語圈起來之後問「誰 + 做了什麼」；兩個都答不出來，就代表句子還不完整。",
        "exOkText": "(O) **He has** great knowledge of insects.",
        "exOkZh": "他有豐富的昆蟲知識。",
        "exBadText": "(X) **He great** knowledge of insects.",
        "exBadNote": "錯誤：缺動詞 has，主詞和動詞之間一定要有動詞。"
      },
      {
        "title": "介系詞誤用：of 與 in 混淆",
        "bad": "(X) great knowledge **in** insects",
        "ok": "(O) great knowledge **of insects**",
        "why": "in 表示「在…裡面」，是位置關係；of 表示「…的／關於」，是範圍或領域關係。昆蟲的知識屬於「哪個領域」，不是「在哪裡」，所以不能用 in。判斷法：in 一定要能翻成「在…裡面」；翻不出來就不是 in。",
        "exOkText": "(O) She has great **knowledge of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has great knowledge **in insects**.",
        "exBadNote": "錯誤：in 是「在…裡面」，表示範圍關係要用 of。"
      }
    ],
    "traps": [
      "**of 位置的陷阱**：of insects 是後置修飾，必須在 knowledge 後面。中文「昆蟲的知識」放前面，英文放後面。",
      "**複數的陷阱**：of 後面泛指一整類要用複數 insects，且不加 the。",
      "**成句的陷阱**：名詞片語本身不是句子，後面一定要接動詞，前面要有主詞。",
      "**in 與 of 的陷阱**：in 是位置「在…裡面」，of 是所屬與範圍。兩者互換是會考常見的出題點。"
    ],
    "strategy": [
      "把「形容詞 + 名詞 + of + 名詞複數」當成一個模板背起來，之後要擴充只要往裡面加東西。",
      "寫完 of 之後立刻檢查三件事：前面最近的是不是名詞、後面有沒有 -s、有沒有亂加 the。",
      "每次造句都用同一個版型：主詞 + 動詞 + 形容詞 + 名詞 + of + 名詞複數，寫五次就會變成反射動作。",
      "把 of 和 in 各寫一張例句卡對照，避免混用。",
      "檢查清單：主詞？動詞？形容詞在名詞前？of 在名詞後？名詞是複數？"
    ]
  },
  "has great knowledge": {
    "zh": "擁有豐富知識",
    "ipa": "hæz ɡreɪt ˈnɑː.lɪdʒ",
    "intro": "針對您提供的 **has great knowledge**，這是「動詞 + 名詞片語」組成的動賓結構，前面還缺主詞，所以還不是完整句子（例如 She has great knowledge.）。has 是「有」的意思，主詞是第三人稱單數時才用 has；後面的 great knowledge 是受詞。",
    "headline": "has 要配第三人稱單數；前面缺主詞",
    "structure": [
      {
        "role": "動詞",
        "token": "has",
        "pos": "動詞 (Verb) — have 的第三人稱單數",
        "func": "句子的動作「有」；主詞是 he / she / it 或單數名詞時才用 has",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "great",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞 knowledge，表示「豐富的、大量的」，放在名詞前",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "被 has 這個動作涉及的對象，表示「知識」；不可數，沒有複數形",
        "mark": "O"
      },
      {
        "role": "整體結構",
        "token": "has great knowledge",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "完整的「動作 + 受詞」，前面還要加一個主詞（she / he / the student）才成句子",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數錯誤：has 誤用成 have",
        "bad": "(X) She **have** great knowledge.",
        "ok": "(O) She **has** great knowledge.",
        "why": "have 變成第三人稱單數要加 -s 或 -es 變成 has；I / you / we / they 後面才用 have。主詞還沒出現的時候就很容易忘記判斷。判斷法：先寫主詞，再回頭決定動詞要不要加 -s；主詞是 he、she、it 或單數名詞就加。",
        "exOkText": "(O) She **has** great knowledge of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She **have** great knowledge of insects.",
        "exBadNote": "錯誤：主詞 she 是第三人稱單數，have 要改成 has。"
      },
      {
        "title": "動詞片語不能單獨成句（缺少主詞）",
        "bad": "(X) **Has great knowledge.**",
        "ok": "(O) **She has great knowledge.**",
        "why": "英文句子的基本順序是「誰做什麼」，動詞片語前面一定要有主詞說明是誰在做這個動作；中文「擁有豐富知識」看起來像一句完整的話，英文卻一定要先寫出那個「誰」。判斷法：寫完動詞就停下來問「是誰？」；答不出來，主詞就是缺了。",
        "exOkText": "(O) **My brother has great knowledge** of insects.",
        "exOkZh": "我哥哥有豐富的昆蟲知識。",
        "exBadText": "(X) **Has great knowledge** of insects.",
        "exBadNote": "錯誤：動詞片語前缺主詞，句子不完整。"
      },
      {
        "title": "be 動詞與一般動詞並用：was / has 疊在一起",
        "bad": "(X) She **was has** great knowledge.",
        "ok": "(O) She **has** great knowledge.",
        "why": "一個簡單句只能有一個主要動詞。has 本身已經是動詞，前面不能再加 was / is / are。學生常以為「過去的東西就要加 was」。判斷法：看到 was / is / are / were，就立刻檢查後面是不是已經有動詞；有了就是重複。",
        "exOkText": "(O) She **has great knowledge** of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She **was has** great knowledge of insects.",
        "exBadNote": "錯誤：was 和 has 兩個動詞疊在一起，只能留一個。"
      },
      {
        "title": "數量詞誤用：many 不能修飾 knowledge",
        "bad": "(X) She has **many knowledge**.",
        "ok": "(O) She has **much knowledge**. ／ (O) She has **a lot of knowledge**.",
        "why": "many 只能修飾可數名詞的複數，much 或 a lot of 才能修飾不可數名詞。knowledge 是抽象的不可數名詞，所以 many knowledge 不合文法。判斷法：先判斷名詞能不能數；不能數就換成 much 或 a lot of。",
        "exOkText": "(O) She has **much knowledge** of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has **many knowledge** of insects.",
        "exBadNote": "錯誤：knowledge 不可數，many 只能修飾可數名詞的複數。"
      }
    ],
    "traps": [
      "**has / have 的陷阱**：只有 he、she、it 和單數名詞後面用 has；I、you、we、they 用 have。",
      "**主詞的陷阱**：動詞片語前面一定要有主詞，寫完動詞先問「是誰？」",
      "**雙動詞的陷阱**：was / is / are 和一般動詞不能疊用，看到 be 動詞就要檢查後面。",
      "**many / much 的陷阱**：knowledge 是不可數名詞，只能配 much 或 a lot of。"
    ],
    "strategy": [
      "寫「動詞開頭」的句子前，先寫主詞，再寫動詞，順序固定下來就不會漏 -s。",
      "把 be 動詞（am / is / are / was / were）和一般動詞分成兩頁整理，複習時互相比對。",
      "遇到 many 就立刻檢查後面的名詞能不能數，這是最快的自我檢查法。",
      "把 has great knowledge 整組當成一個受詞片語背下來，要用的時候整塊搬。",
      "寫完一句話做自我檢查：主詞有了嗎？動詞有 -s 嗎？有沒有兩個動詞？"
    ]
  },
  "has great knowledge of insects": {
    "zh": "擁有豐富的昆蟲知識",
    "ipa": "hæz ɡreɪt ˈnɑː.lɪdʒ əv ˈɪn.sekts",
    "intro": "針對您提供的 **has great knowledge of insects**，這是「動詞 + 名詞片語」的動賓結構，前面還需要一個主詞（例如 She has great knowledge of insects.）。整組結構是「動詞 + 形容詞 + 名詞 + 介系詞片語」，of insects 說明知識的範圍，insects 要用複數且不加 the。",
    "headline": "動詞要三單；of 後面用複數不加 the",
    "structure": [
      {
        "role": "動詞",
        "token": "has",
        "pos": "動詞 (Verb) — have 的第三人稱單數",
        "func": "句子的動作「有」；要配 he / she / it 或單數名詞當主詞",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "great",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞 knowledge，表示「豐富的、大量的」，放在名詞前",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "has 這個動作的對象，表示「知識」；不可數所以沒有複數",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接 knowledge 與 insects，表示「…的」，後面一定要接名詞",
        "mark": "O"
      },
      {
        "role": "of 的受詞",
        "token": "insects",
        "pos": "名詞 (Noun) — insect 的複數",
        "func": "說明是哪方面的知識，泛指一整類昆蟲用複數，前面不加 the",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用：of 與 with 混淆",
        "bad": "(X) has great knowledge **with** insects",
        "ok": "(O) has great knowledge **of insects**",
        "why": "of 表示「關於、屬於」，with 表示「和…一起、帶有…」。知識的範圍是「昆蟲的知識」，屬於所屬關係，必須用 of；with 會變成「帶著昆蟲的知識」，語意完全不同。判斷法：of 後面只說明「範圍、領域」；with 一定帶有「一起、帶著」的意思。",
        "exOkText": "(O) She has great **knowledge of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has great knowledge **with insects**.",
        "exBadNote": "錯誤：with 是「和…一起」，表示所屬關係要用 of。"
      },
      {
        "title": "名詞複數錯誤：insect 漏加 -s",
        "bad": "(X) has great knowledge of insect",
        "ok": "(O) has great knowledge of insects",
        "why": "of 後面的 insects 泛指「昆蟲一整類」，必須用複數；寫成單數 insect，句子就只指「一隻昆蟲的知識」。介系詞 of 不會改變名詞的單複數。判斷法：只要 of 後面泛指一整類事物，就立刻在名詞後面加 -s。",
        "exOkText": "(O) He has great knowledge **of insects**.",
        "exOkZh": "他有豐富的昆蟲知識。",
        "exBadText": "(X) He has great knowledge **of insect**.",
        "exBadNote": "錯誤：insect 漏加 -s，泛指要用複數 insects。"
      },
      {
        "title": "定冠詞 the 誤加在 knowledge 前",
        "bad": "(X) has great **the** knowledge of insects",
        "ok": "(O) has great knowledge of insects",
        "why": "knowledge 在這裡是泛指「知識」這個概念，前面不加 the；the 是「特指」某一種特定的知識。隨便加 the 之後，句子就變成「那一份特定的知識」。判斷法：前面沒有 this、that、these、those 或專有名詞做提示，就不要加 the。",
        "exOkText": "(O) She has **great knowledge** of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She has **the great knowledge** of insects.",
        "exBadNote": "錯誤：knowledge 泛指時前面不加 the。"
      },
      {
        "title": "be 動詞與一般動詞並用：is has 疊在一起",
        "bad": "(X) She **is has** great knowledge of insects.",
        "ok": "(O) She **has** great knowledge of insects.",
        "why": "has 前面不能再加 is / are / was / were。學生常以為「有東西」要用 be 動詞，其實 be 動詞後面要接名詞、形容詞或分詞，不能接另一個動詞。判斷法：看到 is / was 就檢查後面，如果已經有 has、have、plays 這類動詞，就是重複了。",
        "exOkText": "(O) She **has great knowledge** of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) She **is has** great knowledge of insects.",
        "exBadNote": "錯誤：is 和 has 是兩個動詞疊在一起，只能留一個。"
      }
    ],
    "traps": [
      "**has 的陷阱**：has 只能配 he、she、it 或單數名詞當主詞，題目有時故意不寫主詞讓你判斷。",
      "**of 與 with 的陷阱**：of 是所屬與範圍，with 是「一起、帶有」，互換是常見出題點。",
      "**the 的陷阱**：泛指「知識」不加 the；只有特指某一種知識時才加。",
      "**雙動詞的陷阱**：be 動詞後面接不了一般的 has / have，兩個動詞疊用一定錯。"
    ],
    "strategy": [
      "把「動詞 + 形容詞 + 名詞 + of + 名詞複數」寫成一張公式卡，之後所有句子都從這張卡長出來。",
      "練習時先寫主詞再寫動詞，確定主詞是單數才寫 has。",
      "寫完 of 之後做三連檢查：名詞是複數嗎？有沒有漏 -s？有沒有多 the？",
      "把 be 動詞的合法搭配（be + 名詞 / 形容詞 / 分詞）列成清單，看到 be 就對照一次。",
      "把 know、study、have knowledge 三個片語一起記，比較它們的差別。"
    ]
  },
  "she has great knowledge of insects": {
    "zh": "她擁有豐富的昆蟲知識",
    "ipa": "ʃiː hæz ɡreɪt ˈnɑː.lɪdʒ əv ˈɪn.sekts",
    "intro": "針對您提供的 **she has great knowledge of insects**，這是一個完整句子，結構是「主詞 + 動詞 + 形容詞 + 名詞 + 介系詞片語」，意思是「她擁有豐富的昆蟲知識」。主詞 she 是第三人稱單數，後面的動詞必須用 has；會考最常考的就是千萬不能漏掉那個 -s。",
    "headline": "she 對應 has；of 後面用複數不加 the",
    "structure": [
      {
        "role": "主詞",
        "token": "she",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主體，說明是「誰」；因為是第三人稱單數，後面的動詞要加 -s / -es",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "has",
        "pos": "動詞 (Verb) — have 的第三人稱單數",
        "func": "句子的動作「有」；主詞是 she，所以用 has 而不是 have",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "great",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞 knowledge，表示「豐富的、大量的」，位置在名詞前",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "knowledge",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "has 這個動作的對象，表示「知識」；不可數所以沒有複數，前面也不加 a / an",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "of insects",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "後置修飾 knowledge，表示「昆蟲的」；insects 用複數且前面不加 the",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數錯誤：she 後面誤用 have",
        "bad": "(X) She **have** great knowledge of insects.",
        "ok": "(O) She **has** great knowledge of insects.",
        "why": "主詞 she 是第三人稱單數，動詞要用第三人稱單數形式 have → has；只有 I / you / we / they 才用 have。台灣學生最容易在短句裡漏掉這個 -s。判斷法：主詞是 he、she、it 或單數名詞時，動詞一定要加 -s 或 -es。",
        "exOkText": "(O) **She has** great knowledge of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) **She have** great knowledge of insects.",
        "exBadNote": "錯誤：主詞 she 是第三人稱單數，have 要改成 has。"
      },
      {
        "title": "主詞代名詞誤用：she 寫成 he 或 it",
        "bad": "(X) **He** has great knowledge of insects.",
        "ok": "(O) **She** has great knowledge of insects.",
        "why": "she 是女性第三人稱單數，he 是男性，it 是動物或物品；主詞一換，句子的對象就整個不一樣，閱讀測驗要回答 who 也會答錯。判斷法：看句中提到的人是谁，指女生就用 she；he / it 後面一樣要用 has，中間沒有其他提示可依。",
        "exOkText": "(O) **She has** great knowledge of insects.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) **It has** great knowledge of insects.",
        "exBadNote": "錯誤：句中指的是人（女生），主詞要用 She 不是 It。"
      },
      {
        "title": "代名詞與所有格誤用：her 誤寫成 she",
        "bad": "(X) She has great knowledge of **she** insects.",
        "ok": "(O) She has great knowledge of **her** insects.",
        "why": "所有格要用 her、his、my、their；主格 she、he、I、they 只能當主詞，不能放在名詞前面修飾它。判斷法：看這個代名詞後面有沒有名詞；有名詞就是所有格，要改成 her / his / their。",
        "exOkText": "(O) She has great knowledge of **her** insects.",
        "exOkZh": "她對她的昆蟲很有研究。",
        "exBadText": "(X) She has great knowledge of **she** insects.",
        "exBadNote": "錯誤：修飾名詞 insects 要用所有格 her，不能用主格 she。"
      },
      {
        "title": "介系詞片語位置錯誤：of insects 誤置於句首",
        "bad": "(X) Of insects she has great knowledge.",
        "ok": "(O) She has great knowledge of insects.",
        "why": "of insects 是修飾 knowledge 的後置介系詞片語，必須放在 knowledge 後面；如果搬到句首，就變成「關於昆蟲，她擁有豐富的知識」，句子的重點和結構都亂了。判斷法：介系詞片語前面離它最近的一定要是名詞；如果那裡是動詞或句號，就是位置錯了。",
        "exOkText": "(O) **She has great knowledge of insects**.",
        "exOkZh": "她有豐富的昆蟲知識。",
        "exBadText": "(X) **Of insects** she has great knowledge.",
        "exBadNote": "錯誤：of insects 要放在 knowledge 後面，不能移到句首。"
      }
    ],
    "traps": [
      "**第三人稱單數的陷阱**：she、he、it 後面的動詞一定要加 -s（has、goes）。這是會考填空最常考的一點。",
      "**代名詞的陷阱**：she / he / I 是主格，只能當主詞；her / his / my 是所有格，只能放在名詞前。",
      "**介系詞片語位置的陷阱**：of insects 要接在 knowledge 後面，不能放到句首當狀語。",
      "**單複數的陷阱**：of 後面泛指昆蟲要用複數 insects，而且前面不加 the。"
    ],
    "strategy": [
      "寫完句子先圈主詞：she 嗎？是就立刻檢查動詞有沒有 -s，這是最快的一次檢查。",
      "把主格與所有格做成對照表（I-me、she-her、he-his、we-us、they-them），隨時複習。",
      "寫介系詞片語時，一律先寫主詞和動詞，最後才把 of insects 接到名詞後面。",
      "把整句當範例句背下來：She has great knowledge of insects.，之後要擴充再改寫。",
      "口頭造句時把第三人稱單數的 -s 唸出來，讓耳朵習慣 has 的聲音。"
    ]
  },
  "dream": {
    "zh": "夢",
    "ipa": "driːm",
    "intro": "針對您提供的 **dream**，這是一個單字，本身不是完整句子，必須放在名詞前（a good dream）、動詞前（to dream）或主詞後（She dreams）才能使用。它既是名詞「夢」，也是動詞「做夢」，拼法完全一樣，只能靠句子中的位置判斷。發音是 /driːm/，中間的 ea 讀長音 /iː/。",
    "headline": "一字兩詞性；發音 /driːm/",
    "structure": [
      {
        "role": "單字",
        "token": "dream",
        "pos": "名詞或動詞 (Noun / Verb)",
        "func": "可作可數名詞「夢」或動詞「做夢」；靠它在句子中的位置判斷詞性",
        "mark": "O"
      },
      {
        "role": "發音重點",
        "token": "-ea-",
        "pos": "母音組合 (Vowel Team)",
        "func": "ea 在此讀長音 /iː/，整個字讀 /driːm/，不讀 /drɛm/ 或 /drɪm/",
        "mark": "O"
      },
      {
        "role": "字尾",
        "token": "-eam",
        "pos": "字母組合 (Letter Group)",
        "func": "拼字 d-r-e-a-m 共 5 個字母，e 不單獨發音，a 發 /iːm/，結合成 -eam",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "詞性判斷錯誤：名詞 dream 前漏加冠詞",
        "bad": "(X) She had **dream** last night. ／ (X) I had **dream** about it.",
        "ok": "(O) She had **a dream** last night.",
        "why": "dream 作名詞時，前面一定要有冠詞 a / an / the 或是所有格 my / his；只寫 dream 會讓讀者以為它是動詞，句子就不完整。台灣學生常忘記加冠詞。判斷法：名詞前缺 a / an / the / my / his 時，先檢查是不是漏寫了。",
        "exOkText": "(O) She had **a strange dream** last night.",
        "exOkZh": "她昨晚做了個奇怪的夢。",
        "exBadText": "(X) She had **strange dream** last night.",
        "exBadNote": "錯誤：名詞 dream 前面漏了冠詞 a，應該是 a strange dream。"
      },
      {
        "title": "可數名詞的複數錯誤：漏加 -s",
        "bad": "(X) She had two **dream**.",
        "ok": "(O) She had two **dreams**.",
        "why": "dream 是可數名詞，可以用 two / many / a few 修飾，所以要加 -s 變成 dreams（發音 /driːmz/，s 讀 /z/）。不加 -s，「兩個夢」就不成立。判斷法：前面有數字或 many / a few，就一定要檢查名詞有沒有 -s。",
        "exOkText": "(O) I **had two dreams** last night.",
        "exOkZh": "我昨晚做了兩個夢。",
        "exBadText": "(X) I had two **dream** last night.",
        "exBadNote": "錯誤：dream 是可數名詞，前面有 two 就要加 -s 變成 dreams。"
      },
      {
        "title": "發音錯誤：ea 誤讀成 /e/ 或 /ɪ/",
        "bad": "(X) **drɛm** ／ (X) **drɪm**",
        "ok": "(O) **driːm**",
        "why": "dream 裡的 ea 是母音組合，讀長音 /iː/，跟 team、eat、meat 的 ea 一樣。台灣學生常讀成 /drɛm/。會考聽力完全靠音辨識，唸錯就完全聽不出來。判斷法：ea 旁邊還有一個 a（dream、team）通常讀長音 /iː/；旁邊有 r（earth、heard）才讀 /ɜː/。",
        "exOkText": "(O) I had a **good dream** last night.",
        "exOkZh": "我昨晚做了個好夢。",
        "exBadText": "(X) I had a **good dream** last night.（dream 唸成 /drɛm/）",
        "exBadNote": "錯誤：dream 的 ea 讀 /iː/，不能讀成 /e/ 或 /ɪ/。"
      },
      {
        "title": "拼寫錯誤：字母順序或字形錯誤",
        "bad": "(X) **drema** ／ (X) **deram**",
        "ok": "(O) **dream**",
        "why": "dream 的拼字是 d-r-e-a-m，e 和 a 不可省略、不可互換；結合成 -eam 讀 /iːm/。台灣學生常寫成 drema、deram。判斷法：先唸出 /driːm/，再對照字母 d-r-e-a-m 一個一個核對。",
        "exOkText": "(O) She often **dreams** of flying.",
        "exOkZh": "她常夢見飛行。",
        "exBadText": "(X) She often **dremes** of flying.",
        "exBadNote": "錯誤：拼字應為 dreams，不能寫成 dremes。"
      }
    ],
    "traps": [
      "**詞性的陷阱**：dream 既是名詞「夢」也是動詞「做夢」。名詞前要有 a / an / the / my；動詞則自己帶 -s、-ed。",
      "**複數的陷阱**：dream 是可數名詞，dreams 的 -s 要讀 /z/，不是 /s/。two dreams、many dreams 都要加 -s。",
      "**發音的陷阱**：dream 的 ea 讀 /iː/（長音），不是 /e/；聽力測驗常直接考這個字。",
      "**詞彙搭配的陷阱**：dream come true（夢想成真）是固定搭配，不能寫成 dreams come true。"
    ],
    "strategy": [
      "把 dream 的用法做成對照卡：a good dream（名詞）／ to dream（動詞）／ She dreams（動詞）。",
      "唸單字時先拆音：d-r-rea-m → /driːm/，再自己拼回去，發音就不會亂。",
      "寫句子前先判斷 dream 要當名詞還是動詞，再決定前面要不要加冠詞、後面要不要加 -s。",
      "把 dream come true、have a bad dream 這類固定搭配整組背，不要一個字一個字拼。",
      "複數 -s 讀 /z/ 的規則（bags、dreams、dogs）一起整理成一張小表。"
    ]
  },
  "dreams": {
    "zh": "夢（複數）",
    "ipa": "driːmz",
    "intro": "針對您提供的 **dreams**，這是 **dream** 的複數形（/driːmz/），可以當名詞「多個夢」，也可以是動詞的第三人稱單數「（他／她）做夢」。判斷方法：名詞用法前面要有 a lot of / my / her 等；動詞用法的主詞必須是 he、she 或單數名詞。結尾的 -s 要讀 /z/。",
    "headline": "複數 -s 讀 /z/；名詞動詞兩用",
    "structure": [
      {
        "role": "單字",
        "token": "dreams",
        "pos": "名詞或動詞 (Noun / Verb) — dream 的複數形",
        "func": "當名詞是「多個夢」；當動詞是第三人稱單數「做夢」",
        "mark": "O"
      },
      {
        "role": "詞尾",
        "token": "-s",
        "pos": "字母 (Letter)",
        "func": "複數或第三人稱單數的 -s；前面是 /drɪːm/ 的鼻音，所以要讀 /z/",
        "mark": "O"
      },
      {
        "role": "常用搭配",
        "token": "dreams",
        "pos": "詞組搭配 (Collocation)",
        "func": "常見搭配有 have dreams、bad dreams、dreams come true，通常整組記憶最快",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數漏加 -s",
        "bad": "(X) She had three **dream**.",
        "ok": "(O) She had three **dreams**.",
        "why": "dreams 的 -s 是名詞複數的記號，前面有 three / many / a few 等數量詞時，後面的可數名詞一定要加 -s；漏了 -s，「三個夢」就變成不成立的說法。判斷法：數字 + 名詞這個版型裡，名詞一定要變複數。",
        "exOkText": "(O) I **had three dreams** last night.",
        "exOkZh": "我昨晚做了三個夢。",
        "exBadText": "(X) I had three **dream** last night.",
        "exBadNote": "錯誤：前面有 three，dream 要變複數 dreams。"
      },
      {
        "title": "所有格 's 誤加在複數名詞後",
        "bad": "(X) My **dream's** came true.",
        "ok": "(O) My **dreams** came true.",
        "why": "所有格 's 用在「某個人所擁有的」的單數名詞後面；複數名詞表示「很多個」時不加 's，否則會被讀成「那些夢的（東西）」。判斷法：前面有數字或 many / a few 時，後面的複數名詞不加 's。",
        "exOkText": "(O) My **dreams** came true.",
        "exOkZh": "我的夢想實現了。",
        "exBadText": "(X) My **dream's** came true.",
        "exBadNote": "錯誤：複數名詞 dreams 不加所有格 's，應寫 my dreams。"
      },
      {
        "title": "冠詞誤用：a / an 加在複數名詞前",
        "bad": "(X) She has **a** dreams.",
        "ok": "(O) She has **many dreams**.",
        "why": "a / an 只能接「單數可數」名詞；dreams 已經是複數，前面要改用 many / a lot of / several。判斷法：看到冠詞後面的名詞帶 -s，冠詞一定是錯的，直接刪掉冠詞或換成 many。",
        "exOkText": "(O) She has **a lot of dreams** about the future.",
        "exOkZh": "她有很多關於未來的夢想。",
        "exBadText": "(X) She has **a dreams** about the future.",
        "exBadNote": "錯誤：dreams 是複數，不能用冠詞 a，要用 a lot of 或 many。"
      },
      {
        "title": "第三人稱單數誤用：主詞是 they 卻加了 -s",
        "bad": "(X) They **dreams** every night.",
        "ok": "(O) They **dream** every night.",
        "why": "動詞的第三人稱單數 -s 只用在 he / she / it 或單數名詞（the dog）後面；主詞是 I / you / we / they 或複數名詞時要用原形。台灣學生常一律加 -s。判斷法：看主詞，單數（he / she / it）加 -s，其餘一律用原形。",
        "exOkText": "(O) My little sister **dreams** about becoming a doctor.",
        "exOkZh": "我的小妹妹夢想當醫生。",
        "exBadText": "(X) They **dreams** about becoming doctors.",
        "exBadNote": "錯誤：主詞 They 是複數，動詞要用原形 dream。"
      }
    ],
    "traps": [
      "**複數 -s 讀音的陷阱**：dreams 結尾讀 /z/，不要讀成 /s/。bags、dogs、dreams 都一樣。",
      "**冠詞的陷阱**：a / an 不能加在複數名詞前，看到複數就改用 many、a lot of、a few。",
      "**所有格的陷阱**：複數名詞不加 's；只有單數名詞（my dream's）才加 's，這是會考很愛考的細節。",
      "**第三人稱單數的陷阱**：動詞加 -s 的主詞只有 he / she / it。They、We、You 一律用原形。"
    ],
    "strategy": [
      "複數名詞一律做「數字 + 名詞 -s」的練習：one dream、two dreams、three dreams。",
      "把 dreams 的三種角色分開背：名詞複數、第三人稱單數動詞、dreams of… 介系詞片語。",
      "寫完複數名詞大聲唸一次，確認尾音是 /z/，順便把發音練熟。",
      "看到 they / we / you，馬上在動詞旁邊畫一個「不加 s」的記號提醒自己。",
      "把「冠詞 + 複數」當成一個專項練，兩秒內就能判斷對錯。"
    ]
  },
  "bad dreams": {
    "zh": "惡夢",
    "ipa": "bæd driːmz",
    "intro": "針對您提供的 **bad dreams**，這是一個「形容詞 + 名詞複數」的名詞片語，還不是完整句子，前面要有主詞和動詞（例如 She had bad dreams last night.）。bad 是形容詞，修飾名詞 dreams，表示「壞的、可怕的」，英文裡形容詞一定要放在名詞前面；dreams 可數，所以用複數形。",
    "headline": "形容詞在名詞前；可數複數加 -s",
    "structure": [
      {
        "role": "形容詞",
        "token": "bad",
        "pos": "形容詞 (Adjective)",
        "func": "修飾後面的名詞 dreams，表示「壞的、可怕的」；位置固定在名詞前",
        "mark": "O"
      },
      {
        "role": "中心名詞",
        "token": "dreams",
        "pos": "名詞 (Noun) — dream 的複數",
        "func": "片語的核心，表示「多個夢」；可數，前面若有數量詞一定要對應複數",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "bad dreams",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "可以當主詞或受詞，後面要接動詞或 be 動詞才成為完整句子",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞與副詞混淆：用 badly 修飾名詞",
        "bad": "(X) She has **badly** dreams.",
        "ok": "(O) She has **bad dreams**.",
        "why": "badly 是副詞，修飾動詞或整句（He speaks badly.）；要修飾名詞 dreams 就必須用形容詞 bad。台灣學生常以為「壞地」就是 badly。判斷法：看到空格先問「這裡要修飾的是名詞還是動詞？」修飾名詞用 bad，修飾動詞才用 badly。",
        "exOkText": "(O) She has **bad dreams** very often.",
        "exOkZh": "她常常做惡夢。",
        "exBadText": "(X) She has **badly** dreams very often.",
        "exBadNote": "錯誤：badly 是副詞，修飾名詞 dreams 要用形容詞 bad。"
      },
      {
        "title": "名詞複數漏加 -s",
        "bad": "(X) She had two **bad dream**.",
        "ok": "(O) She had two **bad dreams**.",
        "why": "dreams 是可數名詞，前面有 two、a few、many 等數量詞時複數不能漏，否則「兩個夢」就變成不成立的說法；形容詞 bad 本身不變，但不會影響名詞的單複數變化。判斷法：數量詞 + 形容詞 + 名詞這個版型裡，最後的名詞一定要複數。",
        "exOkText": "(O) I **had two bad dreams** last night.",
        "exOkZh": "我昨晚做了兩個惡夢。",
        "exBadText": "(X) I had two **bad dream** last night.",
        "exBadNote": "錯誤：前面有 two，dream 要加 -s 變成 bad dreams。"
      },
      {
        "title": "量詞誤用：a little 用在可數複數名詞",
        "bad": "(X) She had **a little bad dreams**.",
        "ok": "(O) She had **a few bad dreams**.",
        "why": "a little / little 後面只能接不可數名詞，a few / few 後面才可以接可數名詞的複數。dreams 是可數複數，所以不能用 a little。判斷法：little → 不可數；few → 可數。唸不出「一點點的幾個夢」就要改用 a few。",
        "exOkText": "(O) I had **a few bad dreams** last night.",
        "exOkZh": "我昨晚做了幾個惡夢。",
        "exBadText": "(X) I had **a little bad dreams** last night.",
        "exBadNote": "錯誤：a little 後面要接不可數名詞，bad dreams 是可數複數。"
      },
      {
        "title": "詞性誤用：名詞片語 bad dreams 當動詞用",
        "bad": "(X) She **bad dreams** every night.",
        "ok": "(O) She **has bad dreams** every night.",
        "why": "bad dreams 是名詞片語（bad 修飾 dreams），不能直接放在主詞後面當動詞。「做惡夢」要用 have / have got + bad dreams。判斷法：名詞片語後面一定要有動詞；找不到動詞就是錯的。",
        "exOkText": "(O) The little boy **has bad dreams** every night.",
        "exOkZh": "那個小男孩每晚都做惡夢。",
        "exBadText": "(X) The little boy **bad dreams** every night.",
        "exBadNote": "錯誤：bad dreams 是名詞片語，缺動詞 has。"
      }
    ],
    "traps": [
      "**形容詞位置的陷阱**：英文形容詞在名詞前面（bad dreams），不在後面（dreams bad）。閱讀測驗常利用中文語序出題。",
      "**bad 與 badly 的陷阱**：bad 是形容詞修飾名詞；badly 是副詞修飾動詞。She has bad dreams. ／ She sleeps badly. 兩句不能混。",
      "**a little 與 a few 的陷阱**：a little + 不可數；a few + 可數複數。bad dreams 可數，要用 a few 或 a lot of。",
      "**複數的陷阱**：bad 是不變的形容詞，但名詞 dreams 仍然要加 -s；形容詞不影響名詞的單複數。"
    ],
    "strategy": [
      "把「形容詞 + 名詞」的順序背成一個版型：good students、bad dreams、new books，看到名詞就往前放形容詞。",
      "遇到空格先做「詞性定位」：這裡要修飾的是名詞（用 bad）還是動詞（用 badly）？",
      "把 a little / a few、much / many 做成一張對照表，練到不用想。",
      "寫完複數名詞就檢查前面有沒有數量詞：有數量詞就要複數。",
      "把 have a bad dream、have bad dreams 兩個固定搭配都背下來，口語和考試都用得上。"
    ]
  },
  "from bad dreams": {
    "zh": "從惡夢中",
    "ipa": "frʌm bæd driːmz",
    "intro": "針對您提供的 **from bad dreams**，這是一個介系詞片語，表示「從惡夢中」，不能單獨成句，前面要有主詞和動詞（例如 She woke up from bad dreams.）。from 表示起點或離開的方向，後面接名詞片語 bad dreams；dreams 是可數複數，前面不加冠詞。",
    "headline": "from 表起點；介系詞片語須接主詞動詞",
    "structure": [
      {
        "role": "介系詞",
        "token": "from",
        "pos": "介系詞 (Preposition)",
        "func": "表示起點、來源或離開的方向；後面一定要接名詞或名詞片語",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "bad",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞 dreams，表示「壞的、可怕的」，放在名詞前",
        "mark": "O"
      },
      {
        "role": "of 類受詞",
        "token": "dreams",
        "pos": "名詞 (Noun) — dream 的複數",
        "func": "被 from 引導的名詞，表示「惡夢」；可數複數，前面不加冠詞",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "from bad dreams",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "放在動詞後面修飾它（woke up **from bad dreams**），自己不能單獨成句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用：from 與 of 混淆",
        "bad": "(X) woke up **of** bad dreams",
        "ok": "(O) woke up **from** bad dreams",
        "why": "from 表示「從…出來、離開」，是起點或方向；of 表示「…的」是所屬。woke up from 是固定搭配，表示「從（夢）中醒來」；用 of 就變成「為（的東西）醒來」，語意完全不通。判斷法：中文能翻成「從…」就用 from，能翻成「…的」就用 of。",
        "exOkText": "(O) The little boy **woke up from bad dreams**.",
        "exOkZh": "那個小男孩從惡夢中醒來。",
        "exBadText": "(X) The little boy woke up **of bad dreams**.",
        "exBadNote": "錯誤：表示「從某個狀態出來」要用 from，of 是「…的」。"
      },
      {
        "title": "名詞複數漏加 -s",
        "bad": "(X) woke up from two **bad dream**",
        "ok": "(O) woke up from two **bad dreams**",
        "why": "dreams 是可數名詞，前面有數量詞 two、three、many、a few 時一定要用複數；介系詞 from 只表示起點或方向，不會改變名詞本身的單複數。判斷法：介系詞後面的名詞一樣要看它前面的數量詞，有數字或 many / a few 就用複數。",
        "exOkText": "(O) She woke up **from two bad dreams**.",
        "exOkZh": "她從兩個惡夢中醒來。",
        "exBadText": "(X) She woke up **from two bad dream**.",
        "exBadNote": "錯誤：前面有 two，dream 要加 -s。"
      },
      {
        "title": "定冠詞 the 誤加在泛指複數前",
        "bad": "(X) woke up from **the** bad dreams",
        "ok": "(O) woke up from bad dreams",
        "why": "bad dreams 在這裡是泛指「惡夢」這一整類，前面不加 the；the 是「特指」某一次具體的惡夢。判斷法：前面沒有 this、that、these、those 或專有名詞做提示，泛指名詞就不加 the。",
        "exOkText": "(O) She woke up **from bad dreams** again.",
        "exOkZh": "她又從惡夢中醒來。",
        "exBadText": "(X) She woke up from **the bad dreams** again.",
        "exBadNote": "錯誤：bad dreams 是泛指，前面不加 the。"
      },
      {
        "title": "介系詞片語不能單獨成句（缺少主詞與動詞）",
        "bad": "(X) From bad dreams woke up the little boy.",
        "ok": "(O) The little boy woke up from bad dreams.",
        "why": "介系詞片語沒有主詞也沒有動詞，不能獨立成句，更不能搬到句首去當主詞。句子一定要先有「主詞 + 動詞」，介系詞片語是後來附加上去的修飾。判斷法：看到句首是 From、Of、In，就立刻檢查主詞跑到哪裡去了。",
        "exOkText": "(O) **The little girl woke up from bad dreams** at midnight.",
        "exOkZh": "那個小女孩半夜從惡夢中醒來。",
        "exBadText": "(X) **From bad dreams** woke up the little girl.",
        "exBadNote": "錯誤：介系詞片語不能放句首當主詞，句子必須先有主詞和動詞。"
      }
    ],
    "traps": [
      "**from 的陷阱**：from 表示起點、來源、離開方向（come from、wake up from）；of 表示所屬（a book of）。兩者互換最常錯。",
      "**複數的陷阱**：bad dreams 可數，前面有數量詞就要複數；介系詞不會改變單複數。",
      "**the 的陷阱**：泛指「惡夢」一整類不加 the；只有 this、those 等提示才加 the。",
      "**成句的陷阱**：介系詞片語不能單獨成句，也不能放在句首當主詞。"
    ],
    "strategy": [
      "背三個 from 的固定搭配：come from（來自）、different from（不同於）、wake up from（從…醒來）。",
      "看到 of 立刻問「能翻成…的嗎？」，看到 from 立刻問「能翻成從…嗎？」",
      "寫介系詞片語時，先寫好主詞和動詞，最後再把片語接到動詞後面。",
      "把「泛指不加 the、特指才加 the」整理成小抄本，考前唸一次。",
      "句子寫完做結構檢查：主詞？動詞？介系詞後面有名詞嗎？名詞是複數嗎？"
    ]
  },
  "waking up": {
    "zh": "醒來",
    "ipa": "ˈweɪ.kɪŋ ʌp",
    "intro": "針對您提供的英文片語「waking up」，這是一個「動詞 + 副小品詞」構成的片語動詞（phrasal verb），不是能單獨成句的完整句子。它由 wake（醒來）加上副小品詞 up 組成，意思相當於中文的「醒來」。本句最該注意兩件事：-ing 動名詞形式的變化，以及 up 這個小品詞絕對不能漏掉。",
    "headline": "動名詞要加 -ing；副小品詞 up 不能漏",
    "structure": [
      {
        "role": "動詞（動名詞）",
        "token": "waking",
        "pos": "動詞 (Verb) — wake 的現在分詞／動名詞形式",
        "func": "wake 是原形動詞，加上 -ing 變成 waking，表示動作正在進行，也可當名詞使用。wake 以 e 結尾，要先去掉 e 再加 -ing",
        "mark": "O"
      },
      {
        "role": "副小品詞",
        "token": "up",
        "pos": "副小品詞 (Particle) — 片語動詞的一部分",
        "func": "up 本身沒有單獨意思，必須依附在 wake 後面，兩者合起來 wake up 才有「醒來」的意思，漏掉就只剩「醒」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動名詞與動詞原形混淆（漏加 -ing）",
        "bad": "(X) **wake up** ／ (X) **woke up**",
        "ok": "(O) **waking up**",
        "why": "本句要的是 -ing 形式：表示動作正在進行，或放在 be 動詞、keep、介系詞後面當動名詞。wake 是原形，woke 是過去式，兩者都不能直接取代 waking。學生常因只背了 wake up 一個說法，看到要填 -ing 就随手寫原形。判斷法：先掃描句子裡有沒有 am / is / are / was / were、keep、介系詞，只要有一個，動詞立刻變成 -ing 形式。",
        "exOkText": "(O) I am **waking up** at six every morning.",
        "exOkZh": "我每天早上六點醒來。",
        "exBadText": "(X) I am **wake up** at six every morning.",
        "exBadNote": "錯誤：am 後面要接動名詞 waking，不能用原形 wake"
      },
      {
        "title": "副小品詞遺漏（漏寫 up）",
        "bad": "(X) **waking**",
        "ok": "(O) **waking up**",
        "why": "up 是片語動詞 wake up 的一部分，兩個字合起來才表示「醒來」；單獨的 waking 只表示「醒著、正在發生」，語意完全不同。會考選擇題常故意把 up 拿掉，讓選項讀起來仍然通順，學生只憑語意就會上當。判斷法：背片語動詞時一定整組背，寫完後回頭檢查小品詞還在不在。",
        "exOkText": "(O) The baby is **waking up**.",
        "exOkZh": "寶寶正在醒來。",
        "exBadText": "(X) The baby is **waking** now.",
        "exBadNote": "錯誤：waking up 是片語動詞，漏掉 up 語意就變成「醒著」"
      },
      {
        "title": "-ing 拼字規則錯誤（去 e 加 ing）",
        "bad": "(X) **wakeing up**",
        "ok": "(O) **waking up**",
        "why": "wake 以 e 結尾，加 -ing 前必須先去掉 e，正確寫法是 waking；直接把 -ing 接在 e 後面變成 wakeing 是錯的。這個規則和 sleep 不同（sleep 不去 e，直接加 ing 變成 sleeping），兩個規則混在一起時最容易出錯。判斷法：原形以 e 結尾就去掉 e 再加 ing，不以 e 結尾就直接加 ing。",
        "exOkText": "(O) She keeps **waking up** early.",
        "exOkZh": "她一直很早醒來。",
        "exBadText": "(X) She keeps **wakeing up** early.",
        "exBadNote": "錯誤：wake 要先去 e 再加 ing，寫成 wakeing 是錯的"
      },
      {
        "title": "現在分詞與過去式混淆（waking 與 woke 互換）",
        "bad": "(X) **woke up** ／ (X) **wake up**",
        "ok": "(O) **waking up**",
        "why": "waking 是現在分詞（-ing 形式），woke 是過去式，兩者時態與用法完全不同。句子裡只要出現 be 動詞、keep、介系詞，就一定要用 -ing 形式；若出現 last night、yesterday 等過去時間，才用 woke up。學生常只背 woke up 一個形式。判斷法：woke 後面若接 be 動詞或 keep，句子一定錯。",
        "exOkText": "(O) I often dream, and I am **waking up** from a bad dream.",
        "exOkZh": "我常常做夢，而且會從惡夢中醒來。",
        "exBadText": "(X) I often dream, and I am **woke up** from a bad dream.",
        "exBadNote": "錯誤：am 後面要接 -ing 形式，woke 是過去式不能放在 am 後面"
      }
    ],
    "traps": [
      "**-ing 形式的判斷**：看到 be 動詞（am / is / are / was / were）、keep、enjoy、finish 或介系詞（in / on / at / from）後面，動詞一律要加 -ing，這是會考填空題最常考的規則。",
      "**小品詞的考法**：會考常把 wake up 拆成 wake 和 up 兩格，或故意刪掉 up，出現 (X) The baby is waking. 這類選項時要立刻判錯。",
      "**字形陷阱**：waking / woke / wake 三個形式只差幾個字母，選項常互換位置，務必先看句子裡的 be 動詞或時間副詞再作答。",
      "**發音陷阱**：wake、waking 唸 /weɪk/ 是雙元音，woke 唸 /woʊk/，唸錯會影響聽力測驗與口語評量。"
    ],
    "strategy": [
      "三態一起背：wake – woke – woken 是不規則動詞，請和 keep – kept – kept、sleep – slept – slept 放在同一張表反覆複習。",
      "先找定位詞：寫 -ing 之前先掃描句子裡有沒有 be 動詞、keep、介系詞，有這三類詞就一定加 -ing。",
      "小品詞畫圈提醒：把 up 圈起來，提醒自己它不能單獨離開 wake，寫完立刻檢查一次有沒有漏。",
      "用熟悉情境造句：每天寫一句 I am waking up at ____，用起床時間加深語感。",
      "朗讀練音感：把 waking up 連唸三遍，特別注意 waking 的 /ɪ/ 與 woke 的 /oʊ/ 差異。"
    ]
  },
  "waking up from bad dreams": {
    "zh": "從惡夢中醒來",
    "ipa": "ˈweɪ.kɪŋ ʌp frʌm bæd driːmz",
    "intro": "針對您提供的英文片語「waking up from bad dreams」，這是「片語動詞 waking up」後面接介系詞片語 from bad dreams，仍然不是能單獨成句的完整句子。from 表示「從…出來」，bad dreams 是複數名詞片語。本句最該注意介系詞 from 的選擇，以及名詞複數 dreams 不能漏掉 s。",
    "headline": "from 表「從」；bad dreams 的 s 不能漏",
    "structure": [
      {
        "role": "動詞（動名詞）",
        "token": "waking",
        "pos": "動詞 (Verb) — wake 的現在分詞形式",
        "func": "表示「醒來」這個動作正在進行。放在介系詞 from 之前，構成片語動詞的主體",
        "mark": "O"
      },
      {
        "role": "副小品詞",
        "token": "up",
        "pos": "副小品詞 (Particle) — 片語動詞的一部分",
        "func": "必須緊跟在 waking 後面，兩者合起來 wake up 才有「醒來」的意思，不能被介系詞隔開",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "from bad dreams",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "from 後接名詞 bad dreams，表示「從夢境這個起點出來」，用來修飾整個片語動詞 waking up",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞 from 誤用為 in / on",
        "bad": "(X) waking up **in** bad dreams ／ (X) waking up **on** bad dreams",
        "ok": "(O) waking up **from** bad dreams",
        "why": "from 表示「從某個地方出來」，描述起點；in 表示「在…裡面」，on 表示「在…表面上」。「從夢中醒來」的重點是「離開夢境」，所以必須用 from。學生受中文「在夢中」影響，常選 in，語意就變成「在夢裡醒來」。判斷法：中文出現「從…出來／離開」就選 from；出現「在…裡面」才選 in。",
        "exOkText": "(O) I woke up **from** a bad dream.",
        "exOkZh": "我從一個惡夢中醒來。",
        "exBadText": "(X) I woke up **in** a bad dream.",
        "exBadNote": "錯誤：表示「從夢中出來」要用 from，in 是「在夢裡面」"
      },
      {
        "title": "名詞複數遺漏（dream 少 s）",
        "bad": "(X) **bad dream** ／ (X) **a bad dream**",
        "ok": "(O) **bad dreams**",
        "why": "本句的 dreams 是可數名詞複數，前面沒有 a / the，表示「一個接一個、很多個惡夢」，所以一定要加 s。中文「惡夢」沒有單複數的變化，學生寫英文時很容易漏掉 s。判斷法：名詞前若沒有 a / an / the / 數字，且語意是「多個」，英文通常就要加 -s。",
        "exOkText": "(O) He often **wakes up from bad dreams**.",
        "exOkZh": "他常常從惡夢中醒來。",
        "exBadText": "(X) He often wakes up from **bad dream**.",
        "exBadNote": "錯誤：表示多個惡夢要用複數 dreams，漏掉 s"
      },
      {
        "title": "形容詞與名詞順序錯誤（bad 位置）",
        "bad": "(X) **dreams bad** ／ (X) **dream bad**",
        "ok": "(O) **bad dreams**",
        "why": "英文是「形容詞 + 名詞」的固定順序，bad 一定要放在 dreams 前面。中文可以說「惡夢」而不會把修飾語放到後面，學生照中文語序就會顛倒。會考選項中如果出現 dreams bad 這種寫法，直接判為錯誤。判斷法：看到空格在名詞前面、而且空格後面接名詞，答案一定是形容詞。",
        "exOkText": "(O) She woke up from **bad dreams** again.",
        "exOkZh": "她又是從惡夢中醒來。",
        "exBadText": "(X) She woke up from **dreams bad** again.",
        "exBadNote": "錯誤：英文形容詞要放在名詞之前，應為 bad dreams"
      },
      {
        "title": "片語語序錯誤（from bad dreams 提前）",
        "bad": "(X) **from bad dreams**, waking up ／ (X) **from bad dreams** waking up",
        "ok": "(O) **waking up from bad dreams**",
        "why": "from bad dreams 是用來修飾片語動詞 waking up 的後置修飾，必須緊跟在後面；把它搬到最前面，片語動詞本身就被拆開了。學生受中文「從惡夢中醒來」的語序影響，直譯成「從惡夢中，醒來」就出錯。判斷法：片語動詞的補充說明固定跟在後面，不會移到前面；若要移到句首，整個片語動詞也必須一起移動。",
        "exOkText": "(O) I am **waking up from bad dreams** tonight.",
        "exOkZh": "我今晚又從惡夢中醒來。",
        "exBadText": "(X) **From bad dreams**, I am waking up tonight.",
        "exBadNote": "錯誤：把接在片語後面的介系詞片語搬到句首，片語動詞被拆開"
      }
    ],
    "traps": [
      "**介系詞三選一的陷阱**：from（起點）、in（範圍內）、on（表面接觸）是會考最常考的一組，選錯就整句錯。",
      "**複數名詞的陷阱**：bad dreams 是複數，前面若出現 a 就一定錯；複數前要用 some、many、several，或乾脆不加詞。",
      "**形容詞位置陷阱**：選項出現 dreams bad、the dreams bad 等寫法時直接判錯，英文形容詞永遠在名詞之前。",
      "**片語不可拆**：waking up 與 from bad dreams 是兩個整體，中間插入其他成分就會破壞結構。"
    ],
    "strategy": [
      "把 wake up from 綁在一起背：看到「從…醒來」就整組輸出，不要分開選詞。",
      "逐格檢查順序：waking → up → from → bad → dreams，一格一格對照，確認沒有跳格。",
      "分清三種 -s：動詞第三人稱單數（wakes）、名詞複數（dreams）、形容詞比較級（better），各有各的規則。",
      "整理易混介系詞表：把 from / in / on / at 各配三個例句，每天複習一次。",
      "改寫練習：把本片語分別改成 a bad dream、bad dreams、a good dream，比較單複數的差異。"
    ]
  },
  "kept waking up": {
    "zh": "不斷醒來",
    "ipa": "kept ˈweɪ.kɪŋ ʌp",
    "intro": "針對您提供的英文片語「kept waking up」，這是「keep + 動名詞 + 副小品詞」結構的片語，同樣不能單獨成句。kept 是 keep 的過去式，後面一定接動名詞 waking，up 是 wake 的小品詞。本句最該注意 keep 後面絕對不能接動詞原形。",
    "headline": "keep 後面要接動名詞，絕不加 to",
    "structure": [
      {
        "role": "動詞",
        "token": "kept",
        "pos": "動詞 (Verb) — keep 的過去式（不規則動詞）",
        "func": "表示過去發生的持續性動作，本身的時態由 kept 這個形式承擔，後面不能再加 be 動詞",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "waking",
        "pos": "動名詞 (Gerund) — keep 後接 V-ing",
        "func": "keep 表示「持續」時，後面必須接動名詞，表示動作不斷進行；這裡是喚醒這個動作",
        "mark": "O"
      },
      {
        "role": "副小品詞",
        "token": "up",
        "pos": "副小品詞 (Particle) — 片語動詞的一部分",
        "func": "緊跟在動名詞後面，與 waking 合起來才是 wake up「醒來」的意思",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "keep 後接動詞原形",
        "bad": "(X) kept **wake up**",
        "ok": "(O) kept **waking up**",
        "why": "keep 表示「持續、一直」時，後面必須接動名詞（V-ing），表示動作持續進行。學生常把中文的「一直保持醒來」直譯成 kept 加原形。keep 後面若接原形，句子就變成沒有受詞的不及物用法。判斷法：看到 keep、enjoy、finish、practice、mind、suggest 後面，動詞一律變成 -ing 形式。",
        "exOkText": "(O) She **kept waking up** all night.",
        "exOkZh": "她整夜不斷醒來。",
        "exBadText": "(X) She kept **wake** up all night.",
        "exBadNote": "錯誤：keep 後面要接動名詞 waking，不能用原形 wake"
      },
      {
        "title": "keep 後誤接 to + 動詞原形",
        "bad": "(X) kept **to wake up**",
        "ok": "(O) kept **waking up**",
        "why": "中文「一直保持…」的「保持」常讓學生直譯成 keep to…，但 to + 原形是另一種句型，語意是「打算／決定要」，不是「持續」。例如 want to sleep、decide to leave 都是這類結構。判斷法：表「持續不斷」用 keep + V-ing；表「打算做某事」才用 to + 原形，兩者不能互換。",
        "exOkText": "(O) The noise kept **waking** me up.",
        "exOkZh": "噪音一直把我吵醒。",
        "exBadText": "(X) The noise kept **to wake** me up.",
        "exBadNote": "錯誤：表「持續」用 keep + 動名詞，to + 原形是「打算做」"
      },
      {
        "title": "連續過去式（kept + woke）",
        "bad": "(X) kept **woke** up",
        "ok": "(O) kept **waking up**",
        "why": "kept 本身已經是過去式，後面若再放過去式 woke，整句會出現兩個過去式動詞，這在標準英文中不成立。keep + 動名詞的結構裡，時態完全由 keep 負責，後面只能接非限定形式。判斷法：一個簡單句只能有一個主要動詞；看到兩個動詞就想辦法刪掉一個。",
        "exOkText": "(O) He **kept waking** every hour.",
        "exOkZh": "他每小時都醒來一次。",
        "exBadText": "(X) He kept **woke** every hour.",
        "exBadNote": "錯誤：kept 已是過去式，後面要接 -ing，不能再接 woke"
      },
      {
        "title": "keep 的不規則過去式拼寫錯誤",
        "bad": "(X) **keeped** waking up",
        "ok": "(O) **kept** waking up",
        "why": "keep 是不規則動詞，過去式直接去掉 -p 加 -t，寫成 kept，不能照規則動詞的方式加 -ed 變成 keeped。學生常套用「動詞加 -ed」的通則而寫錯。判斷法：背不規則動詞表時，keep – kept – kept、sleep – slept – slept、wake – woke – woken 必須成組記，不能套用規則。",
        "exOkText": "(O) The baby **kept** waking up at midnight.",
        "exOkZh": "寶寶半夜一直醒來。",
        "exBadText": "(X) The baby **keeped** waking up at midnight.",
        "exBadNote": "錯誤：keep 的過去式是 kept，不能加 -ed 寫成 keeped"
      }
    ],
    "traps": [
      "**keep + 動名詞的填空陷阱**：會考給「kept ___ up」，選項常放 wake、woke、waking、woke up，答案一定是 waking。",
      "**不規則動詞拼寫陷阱**：keeped、sleped、waked 在選項中非常常見，只要看到 -ed 結尾就要立刻懷疑。",
      "**雙動詞陷阱**：kept woke up 這類寫法讀起來「好像對」，但英文一句話只允許一個主要動詞，看到兩個動詞就直接判錯。",
      "**to + 原形的誘惑**：want to sleep、decide to leave 的句型很容易讓學生把 to 加到 keep 後面，務必分清楚語意。"
    ],
    "strategy": [
      "畫結構圖：把「主詞 + keep + V-ing + 小品詞」畫成四格，寫作時逐格填入。",
      "不規則動詞表每天唸：本課的 keep、wake、sleep 三個一定要同時記三態。",
      "對比造句：先寫對一句 He kept waking up.，再故意寫成 kept wake up，兩句並排記憶更牢。",
      "唸出聲音檢查：kept 結尾的 /t/ 要唸出來，若寫成 keeped 會多出一個 /ɪd/，唸起來立刻不對。",
      "擴充 keep 家族：keep、keep on、keep doing、keep someone doing 各配一句例句。"
    ]
  },
  "kept waking up from bad dreams": {
    "zh": "不斷從惡夢中醒來",
    "ipa": "kept ˈweɪ.kɪŋ ʌp frʌm bæd driːmz",
    "intro": "針對您提供的英文片語「kept waking up from bad dreams」，這是「keep + 動名詞 + 副小品詞 + 介系詞片語」的完整片語組合，仍然不是能單獨成句的完整句子。整串的重點在於 keep 後的動名詞、up 小品詞、from 介系詞三個環節都不能出錯。本句最該注意 bad 是形容詞，不可改成副詞。",
    "headline": "bad 是形容詞；from 不能換成 after",
    "structure": [
      {
        "role": "動詞",
        "token": "kept",
        "pos": "動詞 (Verb) — keep 的過去式（不規則動詞）",
        "func": "表示過去持續發生的動作，這個片語的時態核心，後面必須接動名詞",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "waking",
        "pos": "動名詞 (Gerund) — keep 後接 V-ing",
        "func": "承接 kept，表示「不斷地」進行喚醒這個動作",
        "mark": "O"
      },
      {
        "role": "副小品詞",
        "token": "up",
        "pos": "副小品詞 (Particle) — 片語動詞的一部分",
        "func": "必須緊接在 waking 後面，中間不能插入 from bad dreams",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "from bad dreams",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "from 後接名詞片語 bad dreams，表示夢境這個起點，整個片語放在最後修飾前面的動作",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞誤用為副詞（bad 改成 badly）",
        "bad": "(X) kept waking up from **badly** dreams",
        "ok": "(O) kept waking up from **bad** dreams",
        "why": "bad 是形容詞，用來修飾名詞 dreams；badly 是副詞，用來修飾動詞、表示方式。名詞前面只能放形容詞，學生常因為聽到 badly 的音就誤用。判斷法：先看空格後面接的是名詞還是動詞——修飾名詞用 bad，修飾動詞才用 badly。",
        "exOkText": "(O) He kept waking up from **bad** dreams.",
        "exOkZh": "他不斷從惡夢中醒來。",
        "exBadText": "(X) He kept waking up from **badly** dreams.",
        "exBadNote": "錯誤：bad 是形容詞，badly 是副詞，dreams 是名詞要用 bad"
      },
      {
        "title": "介系詞 from 誤用為 after",
        "bad": "(X) kept waking up **after** bad dreams",
        "ok": "(O) kept waking up **from** bad dreams",
        "why": "bad dreams 在這裡是「醒來」的起點，也就是夢境，所以用 from 表示「從夢裡出來」；after 表示「在…之後」，會變成「做完夢之後醒來」。雖然中文聽起來接近，英文的固定說法是 wake up from a bad dream。判斷法：waking 是「離開」某個狀態，固定搭配 wake (up) from + 來源。",
        "exOkText": "(O) I kept waking up **from** bad dreams.",
        "exOkZh": "我不斷從惡夢中醒來。",
        "exBadText": "(X) I kept waking up **after** bad dreams.",
        "exBadNote": "錯誤：固定搭配是 wake up from…，不能用 after"
      },
      {
        "title": "重複動詞（kept was waking up）",
        "bad": "(X) kept **was** waking up from bad dreams",
        "ok": "(O) kept waking up from bad dreams",
        "why": "kept 本身已經是帶時態的動詞，後面不能再加 be 動詞 was，否則一句話出現兩個主要動詞。學生常誤以為「講過去就一定要搭配 was / were」。判斷法：一般動詞的過去式自己就帶了時態（keep → kept），只有 be 動詞本身要變化時才用 was / were。",
        "exOkText": "(O) She **kept waking** up from bad dreams.",
        "exOkZh": "她不斷從惡夢中醒來。",
        "exBadText": "(X) She **kept was waking** up from bad dreams.",
        "exBadNote": "錯誤：kept 已是過去式動詞，後面不能再加 was"
      },
      {
        "title": "副小品詞與片語分離（up 跑到句尾）",
        "bad": "(X) kept waking **from bad dreams up**",
        "ok": "(O) kept **waking up** from bad dreams",
        "why": "副小品詞 up 在片語動詞裡必須緊跟在 wake 後面，不能被介系詞片語隔開搬到後面。這和「可分離片語動詞」（如 pick it up，疑問句可把賓語提前）不同，wake up 沒有賓語，up 絕對不能移動。判斷法：沒有賓語的片語動詞，小品詞固定黏在動詞後面。",
        "exOkText": "(O) He kept **waking up** from bad dreams.",
        "exOkZh": "他不斷從惡夢中醒來。",
        "exBadText": "(X) He kept **waking from bad dreams up**.",
        "exBadNote": "錯誤：up 必須緊跟 waking，介系詞片語不能插在中間"
      }
    ],
    "traps": [
      "**形容詞與副詞的位置**：bad dreams（名詞前用 bad）與 he slept badly（動詞後用 badly）是同一組題的兩面，選項常互換。",
      "**wake up from 的固定搭配**：from 不可改成 after / in，會考在「從夢中醒來」這裡設選項陷阱。",
      "**雙動詞檢查法**：句中若出現 kept was、kept did wake up 之類兩個動詞，直接判定錯誤。",
      "**小品詞位置陷阱**：選項故意把 up 放到介系詞片語之後，看你會不會被語意順暢騙過去。"
    ],
    "strategy": [
      "六層標記：keep（過去式）→ -ing → up → from → bad → dreams，逐層確認沒有跳格。",
      "記住三條紅線：keep 後不用原形、up 不移動、from 不更換，測驗前先默念一次。",
      "慢速複誦：把整串以每個詞為單位慢慢唸三遍，聽聽每個停頓點是否自然。",
      "改寫練習：把本片語分別改成「他常常醒來」與「她整夜醒來」兩句，檢查 kept 能否通用。",
      "中英對譯：唸中文「不斷從惡夢中醒來」時，腦中同步浮現 waking up from bad dreams，建立一對一對應。"
    ]
  },
  "he kept waking up": {
    "zh": "他不斷醒來",
    "ipa": "hiː kept ˈweɪ.kɪŋ ʌp",
    "intro": "針對您提供的英文句子「he kept waking up」，這是一個句子片段，完整寫作 He kept waking up. 或 He kept waking up from bad dreams.。結構是「主詞 + keep 的過去式 + 動名詞 + 副小品詞」。本句最該注意主詞 he 與動詞形式必須一致，且句首的 he 必須大寫成 He。",
    "headline": "he 要大寫；動詞要跟主詞一致",
    "structure": [
      {
        "role": "主詞",
        "token": "he",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主角，說明是「他」在反覆做某事；位於句首時第一個字母必須大寫成 He",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "kept",
        "pos": "動詞 (Verb) — keep 的過去式（不規則動詞）",
        "func": "表示過去發生的持續性動作，這個形式本身就帶了第三人稱單數的意義，後面不能再漏 -s",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "waking",
        "pos": "動名詞 (Gerund) — keep 後接 V-ing",
        "func": "承接 kept，表示「不斷地」進行喚醒這個動作",
        "mark": "O"
      },
      {
        "role": "副小品詞",
        "token": "up",
        "pos": "副小品詞 (Particle) — 片語動詞的一部分",
        "func": "緊接在 waking 後面，與 waking 合成 wake up「醒來」的意思",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞與動詞不一致（漏第三人稱單數 -s）",
        "bad": "(X) He **keep** waking up.",
        "ok": "(O) He **kept** waking up.",
        "why": "主詞 he 是第三人稱單數。一般現在時的動詞要加 -s（keep → keeps），而本句用的是敘事過去式 kept，這個形式本身已經帶了第三人稱單數的意思，之後不能再漏掉 -s 或寫成原形。學生常把「第三人稱單數」只綁在現在式，於是把 kept 又寫回 keep。判斷法：寫完先看「主詞 + 動詞」這兩格是否一致。",
        "exOkText": "(O) **He kept** waking up three times last night.",
        "exOkZh": "他昨晚醒來三次。",
        "exBadText": "(X) **He keep** waking up three times last night.",
        "exBadNote": "錯誤：主詞 he 搭配過去式必須寫 kept，不能寫成原形 keep"
      },
      {
        "title": "句首字母未大寫",
        "bad": "(X) **he** kept waking up.",
        "ok": "(O) He kept waking up.",
        "why": "英文句子的第一個字母一定要大寫。he 是代名詞，只有出現在句首時才大寫成 He，若在句子中間仍然寫小寫。學生在改錯題、填空題常整句用小寫，或大小寫混用。判斷法：寫完句子先看第一個字，再掃描有沒有專有名詞（人名、地名、學校名）也漏了大寫。",
        "exOkText": "(O) **He kept** waking up and felt tired.",
        "exOkZh": "他不斷醒來，感到很累。",
        "exBadText": "(X) **he kept** waking up and felt tired.",
        "exBadNote": "錯誤：句首第一個字母必須大寫，he 要寫成 He"
      },
      {
        "title": "keep 表持續，誤換成單次動作",
        "bad": "(X) He **woke up** last night.",
        "ok": "(O) He kept waking up.",
        "why": "keep doing 表示「不斷、反覆做某事」；woke up 只表示「醒來了」這一次。兩者語意差距很大：一夜醒來很多次要用 kept waking up，若只醒一次才用 woke up。學生常因為看到「昨夜」就直接套最簡單的 woke up，漏掉「不斷」的意義。判斷法：中文若出現「一直、不斷、屢次」，英文就要用 keep + 動名詞。",
        "exOkText": "(O) He **kept waking up** again and again.",
        "exOkZh": "他一次又一次地醒來。",
        "exBadText": "(X) He **woke up** last night.",
        "exBadNote": "錯誤：woke up 只表示醒來一次，無法表達「不斷」，要用 kept waking up"
      },
      {
        "title": "狀語位置錯誤（時間副詞插在主詞與動詞之間）",
        "bad": "(X) He **last night** kept waking up.",
        "ok": "(O) He kept waking up last night.",
        "why": "英文的基本語序是「主詞 + 動詞 + 其他成分」，時間副詞一般放在動詞之後或句尾；把它插在主詞與動詞中間，句子結構就斷裂了。會考閱讀測驗與改錯題常刻意這樣排版來誤導學生。判斷法：看到「主詞 + 時間 + 動詞」這種排列，先懷疑是不是語序錯了。",
        "exOkText": "(O) He kept waking up **last night**.",
        "exOkZh": "他昨晚不斷醒來。",
        "exBadText": "(X) He **last night** kept waking up.",
        "exBadNote": "錯誤：時間副詞不能插在主詞與動詞之間，應放在動詞之後"
      }
    ],
    "traps": [
      "**主詞與動詞一致性**：選項中 He keep / He keeps / He kept 三種都可能出現，先看是不是敘事句（有 last night 等過去時間），再決定用 kept。",
      "**句首大寫的送分題**：會考常在每個選項大小寫都一樣，看似難選；先檢查句首字母就能秒殺一個錯誤選項。",
      "**keep 與 wake 的語意差**：kept waking up（不斷醒來）與 woke up（醒來一次）不同，選項混排時要回頭看中文提示。",
      "**語序陷阱**：He last night kept waking up 讀起來還算順，但英文語序不允許時間副詞插在主詞與動詞之間。"
    ],
    "strategy": [
      "三件檢查：主詞大小寫、動詞形式、句末標點，寫完立刻畫勾。",
      "先寫時間再選動詞：句子若有 last night，就立刻把動詞定成 kept，再填主詞。",
      "口語複誦比較：唸 He kept waking up 與 He woke up 各三遍，體會「不斷」的差別。",
      "時態變換練習：同一個主詞分別搭配 kept waking up、woke up、will wake up，比較三種時態。",
      "整理三態表：keep – kept – kept、wake – woke – woken、sleep – slept – slept 放在同一頁每天複習。"
    ]
  },
  "he kept waking up from bad dreams": {
    "zh": "他不斷從惡夢中醒来",
    "ipa": "hiː kept ˈweɪ.kɪŋ ʌp frʌm bæd driːmz",
    "intro": "針對您提供的英文句子「he kept waking up from bad dreams」，這是一個可以直接成句的完整句子，屬於「主詞 + 動詞 + 動名詞 + 介系詞片語」的簡單句。整句圍繞「不斷從惡夢中醒來」的意思，檢查重點在於介系詞片語的完整與名詞前的修飾。本句最該注意 bad 這個關鍵形容詞不能漏寫。",
    "headline": "bad 不能漏；複數名詞前不加冠詞",
    "structure": [
      {
        "role": "主詞",
        "token": "he",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主角，位於句首所以寫成大寫的 He，說明是「他」在反覆做某事",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "kept",
        "pos": "動詞 (Verb) — keep 的過去式（不規則動詞）",
        "func": "表示過去持續發生的動作，這個形式本身帶有第三人稱單數的意義",
        "mark": "O"
      },
      {
        "role": "動名詞片語",
        "token": "waking up",
        "pos": "動名詞片語 (Gerund Phrase) — keep + V-ing + 小品詞",
        "func": "承接 kept 表示「不斷地醒來」，up 必須緊接在 waking 後面不能被拆開",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "from bad dreams",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "from 後接名詞片語 bad dreams，表示夢境這個起點；bad 是修飾 dreams 的形容詞，dreams 用複數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "關鍵形容詞漏寫（bad 遺漏）",
        "bad": "(X) He kept waking up from **dreams**. ／ (X) He kept waking up from **a dream**.",
        "ok": "(O) He kept waking up from **bad dreams**.",
        "why": "bad 是修飾 dreams 的關鍵形容詞，去掉之後「從惡夢中醒來」的語意就消失了。句子雖然文法通順，但意思完全錯誤，這正是會考最喜歡的「只差一個字」陷阱。判斷法：翻譯題或改錯題寫完後，逐字比對中文的每個字，確認沒有漏掉修飾語（好的、壞的、大、小）。",
        "exOkText": "(O) He kept waking up from **bad dreams** all night.",
        "exOkZh": "他整夜不斷從惡夢中醒來。",
        "exBadText": "(X) He kept waking up from **dreams** all night.",
        "exBadNote": "錯誤：漏掉修飾名詞的形容詞 bad，語意變成「從夢中醒來」"
      },
      {
        "title": "複數名詞前誤加冠詞",
        "bad": "(X) He kept waking up from **a bad dreams**. ／ (X) He kept waking up from **the bad dreams**.",
        "ok": "(O) He kept waking up from **bad dreams**.",
        "why": "dreams 是複數名詞，前面不能加 a，也不能隨便加 the（the 表示特指，前面要有明確的對象）。本句是一般敘述，直接用複數名詞即可。學生常因中文沒有冠詞而在英文中亂加 a / the。判斷法：a / an 只能接單數可數名詞；複數前若要限定，要用 some、many、several 或 his / her 等。",
        "exOkText": "(O) She kept waking up from **bad dreams**.",
        "exOkZh": "她不斷從惡夢中醒來。",
        "exBadText": "(X) She kept waking up from **a bad dreams**.",
        "exBadNote": "錯誤：複數名詞前不能加 a，dreams 已是複數"
      },
      {
        "title": "because 誤用（連接詞後缺主詞與動詞）",
        "bad": "(X) He kept waking up from bad dreams **because**. ／ (X) He kept waking up from bad dreams **because bad dreams**.",
        "ok": "(O) He kept waking up from bad dreams **because he had them**.",
        "why": "because 是從屬連接詞，後面一定要接「主詞 + 動詞」構成的原因子句，不能直接接名詞，也不能單獨使用。學生常把 because 當成中文的「因為」隨手加在句尾，卻忘記補上主詞與動詞。判斷法：because 後面若找不到動詞，就改寫成 because + 一個完整的句子。",
        "exOkText": "(O) He kept waking up from bad dreams **because he was afraid**.",
        "exOkZh": "他不斷從惡夢中醒來，因為他很害怕。",
        "exBadText": "(X) He kept waking up from bad dreams **because bad dreams**.",
        "exBadNote": "錯誤：because 後面要有主詞與動詞，bad dreams 只是名詞片語"
      },
      {
        "title": "介系詞片語誤插在 keep 與動名詞之間",
        "bad": "(X) He kept **from bad dreams** waking up.",
        "ok": "(O) He kept **waking up** from bad dreams.",
        "why": "keep 後面必須緊接動名詞 waking up，介系詞片語 from bad dreams 是用來修飾整個片語動詞的，必須放在 waking up 之後。插在中間會把 keep + 動名詞這個核心結構拆斷。判斷法：先找出「keep + V-ing」這個核心，再把修飾它的介系詞片語放到最後。",
        "exOkText": "(O) He kept **waking up** from bad dreams.",
        "exOkZh": "他不斷從惡夢中醒來。",
        "exBadText": "(X) He kept **from bad dreams** waking up.",
        "exBadNote": "錯誤：keep 後面要緊接動名詞 waking up，介系詞片語不能插在中間"
      }
    ],
    "traps": [
      "**冠詞與複數的搭配**：a + 單數、the + 特指、零冠詞 + 泛指，是會考最常見的選項陷阱，尤其是複數名詞前誤加 a。",
      "**關鍵修飾語脫落**：字數比較少的選項常常就是拿掉 bad 的版本，看似合理其實語意殘缺，讀題時要對照中文線索。",
      "**because 的完整性**：because 後面若只有名詞（because bad dreams），整個選項一定是錯的。",
      "**片語核心不可拆**：keep + 動名詞是本句核心，任何插入成分都會破壞結構。"
    ],
    "strategy": [
      "逐字對譯：寫完英文後把中文逐字對上去，確認 bad 與 dreams 的 s 都沒有漏。",
      "先寫核心再加修飾：先寫 he kept waking up，再決定要不要加 from 短語。",
      "冠詞對比練習：把本句改成 from a bad dream、from his bad dreams，對照冠詞的差異。",
      "因果句練習：用 because 與 so 各寫一句完整句子，檢查 because 後面是否都有主詞與動詞。",
      "語序自檢：把句子唸出聲後停頓，聽起來不通順的位置多半是插入成分放錯了。"
    ]
  },
  "because he kept waking up from bad dreams": {
    "zh": "因為他不斷從惡夢中醒來",
    "ipa": "bɪˈkəz hiː kept ˈweɪ.kɪŋ ʌp frʌm bæd driːmz",
    "intro": "針對您提供的英文句子「because he kept waking up from bad dreams」，這是一個以 because 開頭的原因從句，本身不能單獨成句，後面必須接一個主句，例如 Because he kept waking up from bad dreams, he was tired.。本句最該注意 because 後面一定要有完整的主詞與謂語。",
    "headline": "because 從句不能單獨成句",
    "structure": [
      {
        "role": "連接詞",
        "token": "because",
        "pos": "連接詞 (Conjunction) — 表原因",
        "func": "引導原因從句，後面一定要接主詞與動詞；放在句首時後面要加逗號，句末則直接接在主句之後",
        "mark": "O"
      },
      {
        "role": "從句主詞",
        "token": "he",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "從句裡的主語，說明是「他」不斷從惡夢中醒來；在從句中位於 because 之後",
        "mark": "O"
      },
      {
        "role": "從句動詞",
        "token": "kept",
        "pos": "動詞 (Verb) — keep 的過去式（不規則動詞）",
        "func": "從句的謂語，表示過去持續發生的動作，後面接動名詞",
        "mark": "O"
      },
      {
        "role": "動名詞片語",
        "token": "waking up",
        "pos": "動名詞片語 (Gerund Phrase)",
        "func": "承接 kept 表示「不斷地醒來」，up 緊接在 waking 後面不可拆開",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "from bad dreams",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "from 後接複數名詞片語 bad dreams，表示夢境這個起點，放在整個片語動詞之後修飾它",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "because 從句單獨成句（缺少主句）",
        "bad": "(X) Because he kept waking up from bad dreams.",
        "ok": "(O) Because he kept waking up from bad dreams, he was tired.",
        "why": "because 引導的是原因從句，屬於複合句的一部分，單獨使用句子意思不完整。中文的「因為…」常常可以自成一句，學生因此把 Because 開頭的句子獨立成句，讀起來好像也通順。判斷法：寫完 Because 開頭的句子，問自己「誰怎麼樣？」，若找不到主句的部分，就必須補上。",
        "exOkText": "(O) **Because he kept waking up from bad dreams**, he looked tired in class.",
        "exOkZh": "因為他一直從惡夢中醒來，他在課堂上看起來很累。",
        "exBadText": "(X) **Because he kept waking up from bad dreams.**",
        "exBadNote": "錯誤：because 引導的從句不能單獨成句，後面要接主句"
      },
      {
        "title": "because 誤用為 because of（後面接名詞）",
        "bad": "(X) He was sleepy **because of he kept waking up** from bad dreams.",
        "ok": "(O) He was sleepy **because he kept waking up** from bad dreams.",
        "why": "because of 是「片語」，後面只能接名詞或名詞片語；because 是「連接詞」，後面要接完整子句（有主詞和動詞）。學生常把 because of 直接用在整個句子前面。判斷法：because of 後面若出現 he / they 這類代名詞或動詞，立刻改回 because。",
        "exOkText": "(O) He was sleepy **because he kept waking up** from bad dreams.",
        "exOkZh": "他很睏，因為他不斷從惡夢中醒來。",
        "exBadText": "(X) He was sleepy **because of he kept waking up** from bad dreams.",
        "exBadNote": "錯誤：because of 後面只能接名詞，代名詞後要改用 because"
      },
      {
        "title": "標點與連接詞誤用（用句號切開從句）",
        "bad": "(X) He slept only two hours. **Because he kept waking up from bad dreams.**",
        "ok": "(O) **Because he kept waking up from bad dreams**, he slept only two hours.",
        "why": "because 引導的原因從句屬於句子內部的一部分，中間不能用句號切開。中文的標點習慣常讓學生在 Because 前直接打上一個句號，變成兩個殘缺的句子。判斷法：句中出現 because 時，前面若是句號就要刪掉；若 because 在句首，後面要加逗號。",
        "exOkText": "(O) **Because he kept waking up from bad dreams**, he slept only two hours.",
        "exOkZh": "因為他不斷從惡夢中醒來，他只睡了兩個小時。",
        "exBadText": "(X) He slept only two hours. **Because he kept waking up from bad dreams.**",
        "exBadNote": "錯誤：because 從句不能被句號切開，要用逗號接在主句後面"
      },
      {
        "title": "邏輯連接詞語意誤用（because 與 although 混淆）",
        "bad": "(X) **Although he kept waking up from bad dreams**, he slept very well.",
        "ok": "(O) **Because he kept waking up from bad dreams**, he didn't sleep well.",
        "why": "because 表原因，although 表讓步或轉折，兩者語意方向正好相反。本句要表達「因為不斷從惡夢中醒來，所以睡不好」，必須用 because；用 although 會變成「雖然一直醒來，卻睡得很好」，與中文完全相反。判斷法：中文出現「因為」對應 because，出現「雖然」對應 although / though，不能互換。",
        "exOkText": "(O) **Because he kept waking up from bad dreams**, he felt tired all day.",
        "exOkZh": "因為他不斷從惡夢中醒來，他一整天都很累。",
        "exBadText": "(X) **Although he kept waking up from bad dreams**, he felt fine all day.",
        "exBadNote": "錯誤：這裡要表達原因應用 because，although 是「雖然」的意思"
      }
    ],
    "traps": [
      "**從句完整性**：because / although / if 這類連接詞後面，必須有主詞和動詞；選項中若只有名詞，整句判錯。",
      "**because of 與 because**：because of + 名詞，because + 完整子句，兩者不能互換，是會考必考配對。",
      "**標點陷阱**：because 在句首時後面要加逗號；在句尾時前面只留空白，句中不能出現句號。",
      "**語意方向**：because 與 although 方向相反，選項如果把兩者對調，讀起來「很奇怪」就是錯誤訊號。"
    ],
    "strategy": [
      "記熟複合句公式：因為 + 子句 + 逗號 + 主句，先套公式再填內容。",
      "圈出連接詞：看到 because / although 先問「它後面有沒有主詞和動詞？」",
      "互換練習：把 Because he kept waking up from bad dreams, he was tired. 改成 Although … , he was fine.，比較語意差異。",
      "標點自檢：把句子唸出來，聽到逗號的地方就是英文標點該停頓的位置。",
      "中英對照：寫中文時就把「因為」對應成 Because 加逗號的寫法，養成固定習慣。"
    ]
  },
  "night": {
    "zh": "夜晚",
    "ipa": "naɪt",
    "intro": "針對您提供的英文單字「night」，這是一個單獨的單字，不構成完整句子，意思是「夜晚、夜間」。它的音標是 /naɪt/，母音是雙元音 /aɪ/，與 nine 同音。本句最該注意字形與同音字 night、knight 的區分，以及它是一個可數名詞。",
    "headline": "night 的 /aɪ/ 要念對，別和 knight 搞混",
    "structure": [
      {
        "role": "單字本義",
        "token": "night",
        "pos": "名詞 (Noun) — 可數名詞，表示夜晚",
        "func": "表示從天黑到天亮的一段時間。可加 -s 變成 nights；前面可加形容詞修飾，也可以放在 at night、last night 等片語中",
        "mark": "O"
      },
      {
        "role": "常見搭配",
        "token": "at night",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "最常見的用法是出現在時間片語 at night（夜間）、all night（整夜）、last night（昨晚）之後，前面不加冠詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字與發音混淆（nite / knite）",
        "bad": "(X) **nite** ／ (X) **knite**",
        "ok": "(O) **night**",
        "why": "night 的標準拼字是 n-i-g-h-t，中間有 gh 這兩個字母；nite 只是美式口語中「lite」的諧音簡寫，不是標準英文寫法。發音上 night 唸 /naɪt/，母音是雙元音 /aɪ/，若唸成短音 /ɪ/ 就會變成 nit 的音。判斷法：唸到 /naɪt/ 又有「夜」的意思，一定寫 night，中間的 gh 不可漏。",
        "exOkText": "(O) I can't sleep **at night**.",
        "exOkZh": "我晚上睡不著。",
        "exBadText": "(X) I can't sleep **at nite**.",
        "exBadNote": "錯誤：標準拼字是 night，中間有 gh，不能簡寫成 nite"
      },
      {
        "title": "可數性與單複數錯誤（漏 s 或誤加 s）",
        "bad": "(X) **two night** ago ／ (X) He came here **two nights**",
        "ok": "(O) **two nights** ago",
        "why": "night 是可數名詞，複數要加 -s 變成 nights。中文沒有單複數變化，學生寫英文時常漏寫 s；反過來，單數的 night 前若加了 a，也不能再加 -s。判斷法：可數名詞計數時一定加 -s，two nights、three nights、every night 都不能省略。",
        "exOkText": "(O) I **woke up twice** in two **nights**.",
        "exOkZh": "我兩晚都醒來了兩次。",
        "exBadText": "(X) I woke up twice in two **night**.",
        "exBadNote": "錯誤：可數名詞複數要加 s，應寫成 two nights"
      },
      {
        "title": "詞性誤用（名詞當形容詞修飾名詞）",
        "bad": "(X) He had a **night** dream. ／ (X) She had a **night** sleep.",
        "ok": "(O) He had a **bad** dream.",
        "why": "night 是名詞，不能直接放在另一個名詞前面當修飾語。要修飾名詞 dream，正確做法是用形容詞 bad，或用所有格 last night's dream。學生常看到中文「惡夢」就以為 night 可以放前面。判斷法：兩個名詞相鄰時，中間一定要有形容詞或所有格 -'s，不能光靠名詞排列。",
        "exOkText": "(O) He had a **bad** dream last night.",
        "exOkZh": "他昨晚做了個惡夢。",
        "exBadText": "(X) He had a **night** dream last night.",
        "exBadNote": "錯誤：night 是名詞不能修飾 dream，應改用形容詞 bad"
      },
      {
        "title": "介系詞搭配錯誤（in night）",
        "bad": "(X) I read a book **in night**. ／ (X) She sleeps **on night**.",
        "ok": "(O) I read a book **at night**.",
        "why": "表「在夜間」這個一般狀態，固定用 at night，前面不加 the；in night 的寫法在標準英文中不成立。in the night 是「在那一個特定的夜晚」，語意不同，兩者不能混用。判斷法：把「每晚、經常在夜間」等固定概念記成 at night 這個整組，不要單獨在 night 前面加介系詞。",
        "exOkText": "(O) He often has **bad dreams at night**.",
        "exOkZh": "他晚上常常做惡夢。",
        "exBadText": "(X) He often has bad dreams **in night**.",
        "exBadNote": "錯誤：表「在夜間」要用 at night，in night 不成立"
      }
    ],
    "traps": [
      "**同音字陷阱**：night（夜晚）、knight（騎士）、knit（織毛線）、nit（虱）同音，會考在字彙與聽力題常一起出現，看字形要抓 gh 與 k。",
      "**單複數陷阱**：night 是可數名詞，two nights ago、every night 都要加 s，問句 How many nights…? 也是複數。",
      "**at night 固定搭配**：表「在夜間」用 at night 且不加冠詞；in the night 是「在那一個特定的夜晚」，語意不同。",
      "**名詞不能當形容詞**：要修飾名詞要用 bad / dark / late 等形容詞，不能直接把 night 放在前面。"
    ],
    "strategy": [
      "唸音節定音：把 night 和 nine、light、right 排在一起唸，牢記 /aɪ/ 這個韻母。",
      "字形記憶：night 裡有 gh，兩字母要一起寫；寫完默寫三遍。",
      "搭配背誦：at night、all night、at midnight、last night 四組一起記。",
      "造句練習：寫三句分別用 last night、every night、two nights ago，檢查複數 s 有沒有漏。",
      "混淆詞整理：把 night / knight / knit / nit 做成對照表，每天複習一次。"
    ]
  },
  "last night": {
    "zh": "昨晚",
    "ipa": "læst naɪt",
    "intro": "針對您提供的英文片語「last night」，這是一個表示時間的副詞片語，單獨使用不能成句，必須放在句中當時間狀語，意思是「昨晚」。本句最該注意 last night 前面不加任何介詞，也不可以與 ago、yesterday 重複使用。",
    "headline": "last night 前不加介詞，也不能和 ago 同用",
    "structure": [
      {
        "role": "時間狀語",
        "token": "last night",
        "pos": "時間副詞片語 (Time Adverbial Phrase)",
        "func": "說明動作發生的時間是「昨晚」，是判斷動詞要用過去式的關鍵線索，前面不加介詞也不加冠詞",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "last",
        "pos": "限定詞 (Determiner) — last 的單數限定用法",
        "func": "修飾單數名詞 night，表示「最近的那一個晚上」，因為修飾的是單數，所以 night 不能加 -s",
        "mark": "O"
      },
      {
        "role": "核心名詞",
        "token": "night",
        "pos": "名詞 (Noun) — 可數名詞單數",
        "func": "被 last 限定的中心詞，唸 /naɪt/，與前面的 last 合成整個時間片語",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤加（in last night）",
        "bad": "(X) **in last night** ／ (X) **at last night**",
        "ok": "(O) **last night**",
        "why": "last night 是固定的時間副詞片語，前面不加任何介詞，也不加冠詞。學生受中文「在昨晚」影響，會在英文前面多加 in 或 at，寫成 in last night。判斷法：last night、yesterday、tomorrow、today 這類「時間點副詞」都是獨立的，前面不加介詞。",
        "exOkText": "(O) I **slept** very well **last night**.",
        "exOkZh": "我昨晚睡得很好。",
        "exBadText": "(X) I **slept** very well **in last night**.",
        "exBadNote": "錯誤：last night 前不加介詞，in last night 不成立"
      },
      {
        "title": "語意重複（與 ago / yesterday 併用）",
        "bad": "(X) **last night ago** ／ (X) **last night yesterday**",
        "ok": "(O) **last night** ／ (O) **two nights ago**",
        "why": "last night 本身就已經指向「昨晚」，再加上 ago 或 yesterday 就重複了。正確的說法二選一：說「昨晚」用 last night；說「兩天前」用 two nights ago。學生常把兩種時間說法混在一起。判斷法：ago 前面必須是「數字 + 複數名詞」，例如 three days ago；一旦有 ago 就不需要 last / yesterday。",
        "exOkText": "(O) I **couldn't sleep last night**.",
        "exOkZh": "我昨晚睡不著。",
        "exBadText": "(X) I couldn't sleep **last night ago**.",
        "exBadNote": "錯誤：last night 已表達時間，不需再加 ago"
      },
      {
        "title": "誤作定語修飾名詞（缺所有格 -'s）",
        "bad": "(X) the **last night** show ／ (X) **last night** homework",
        "ok": "(O) the **last night's** show ／ (O) **last night's** homework",
        "why": "last night 本身是時間狀語，不能直接放在名詞前當修飾語；要修飾名詞必須用所有格 last night's + 名詞，或改寫成 the show last night。學生常以為「時間 + 名詞」就能直接當定語。判斷法：名詞前若要用某個時間修飾，必須加所有格符號 's。",
        "exOkText": "(O) I finished **last night's** homework.",
        "exOkZh": "我完成了昨晚的作業。",
        "exBadText": "(X) I finished **last night** homework.",
        "exBadNote": "錯誤：修飾名詞要用所有格 last night's，不能直接用 last night"
      },
      {
        "title": "語意誤用（把「每晚」寫成 last night）",
        "bad": "(X) I have bad dreams **last night**. ／ (X) I get up **last night** every morning.",
        "ok": "(O) I have bad dreams **every night**.",
        "why": "last night 專指「某一個特定的晚上」，不能表示習慣性的「每一晚」。表「每晚」要用 every night。學生常因為中文「我晚上都…」的說法，就直接套上「我昨晚…」。判斷法：中文若沒有「昨晚」這個明確時間，就不能用 last night，應改用 every night 或 on weekdays。",
        "exOkText": "(O) I **have bad dreams every night**.",
        "exOkZh": "我每晚都做惡夢。",
        "exBadText": "(X) I have bad dreams **last night**.",
        "exBadNote": "錯誤：last night 只指特定的一個晚上，習慣性「每晚」要用 every night"
      }
    ],
    "traps": [
      "**不加介詞的陷阱**：last night 前加 in / at 是最常見的錯誤選項，看到就直接排除。",
      "**ago 的固定結構**：ago 前必須是「數字 + 複數名詞」（two nights ago / three days ago），last night 不可與 ago 並用。",
      "**last 的單複數**：last 修飾單數 night；表「過去幾個晚上」要用 the last three nights，不要把 night 也加 s 在 last 後面。",
      "**語意陷阱**：last night（昨晚）與 every night（每晚）不同，選項中兩者互換時要回頭對照中文。"
    ],
    "strategy": [
      "整組背誦：last night、last week、last month、last year 一起記，擴充成一系列時間片語。",
      "寫作檢查：寫完句子先圈出時間片語，確認前面沒有介詞、句子裡也沒有重複的時間詞。",
      "對照練習：把 last night 換成 two nights ago 造句，比較兩種說法的差異。",
      "造句練習：寫五句描述昨晚的句子，每句都放 last night，檢查動詞是否都變成過去式。",
      "語意分組：把 last night（特定）與 every night（習慣）分成兩組背，避免混用。"
    ]
  },
  "slept": {
    "zh": "睡覺",
    "ipa": "slept",
    "intro": "針對您提供的英文單字「slept」，這是一個單獨的動詞形式，不能單獨成句，必須搭配主詞才能構成句子。slept 是 sleep（睡覺）的過去式，唸 /slept/，其中的 e 不發音。本句最該注意這是不規則動詞，不能寫成 sleeped。",
    "headline": "sleep 的過去式是 slept，e 不發音",
    "structure": [
      {
        "role": "動詞本體",
        "token": "slept",
        "pos": "動詞 (Verb) — sleep 的過去式（不規則動詞）",
        "func": "表示過去發生的「睡覺」這個動作，前面必須接主詞；後面接時間狀語（如 last night）就成為完整句子",
        "mark": "O"
      },
      {
        "role": "時態變化",
        "token": "sleep",
        "pos": "動詞原形 (Base Form)",
        "func": "slept 的原形是 sleep；三態是 sleep – slept – slept，過去式與過去分詞同形，用在助動詞後面時要寫成 has slept",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "不規則動詞字形錯誤（sleeped）",
        "bad": "(X) **sleeped** ／ (X) **slept** + 誤加 e",
        "ok": "(O) **slept**",
        "why": "sleep 是不規則動詞，過去式由 ee 變成 e（sleep → slept），不能套用規則動詞「加 -ed」的寫法變成 sleeped。學生常因不熟而寫錯，或誤寫成 sleped。判斷法：不規則動詞表上的字一定要成組背，看到 -ed 結尾就先確認這個動詞是否在表上。",
        "exOkText": "(O) I **slept** for eight hours last night.",
        "exOkZh": "我昨晚睡了八小時。",
        "exBadText": "(X) I **sleeped** for eight hours last night.",
        "exBadNote": "錯誤：sleep 的過去式是 slept，不能加 -ed 寫成 sleeped"
      },
      {
        "title": "發音錯誤（把不發音的 e 唸出來）",
        "bad": "(X) 唸成 /sleːpt/ ／ (X) 拼成 **sleped**",
        "ok": "(O) /slept/",
        "why": "slept 中的 e 是不發音的 e，只唸 /slept/ 一個音節；學生常把它唸成長音 /sleːpt/，拼寫時就順手寫成 sleped。發音錯誤會直接影響會考的聽力測驗與口語評量。判斷法：唸的時候舌尖輕觸上顎唸 /t/，整個詞只有一個音節，念完不會有多餘的音。",
        "exOkText": "(O) She **slept** soundly all night.",
        "exOkZh": "她整夜睡得很沉。",
        "exBadText": "(X) She **sleped** soundly all night.",
        "exBadNote": "錯誤：把 e 唸成長音就會多一個音節，正確只唸 /slept/"
      },
      {
        "title": "詞性誤用（動詞當形容詞修飾名詞）",
        "bad": "(X) the **slept** baby ／ (X) a **slept** boy",
        "ok": "(O) the **sleeping** baby",
        "why": "slept 是動詞的過去式，不能放在名詞前當修飾語；要修飾名詞必須用現在分詞 sleeping（正在睡的）或換成其他形容詞。學生常因為 slept 看起來像形容詞就直接放在名詞前面。判斷法：名詞前的空格若填動詞，一定要變成 -ing 形式。",
        "exOkText": "(O) The **sleeping** baby looked peaceful.",
        "exOkZh": "那個睡著的小寶寶看起來很安詳。",
        "exBadText": "(X) The **slept** baby looked peaceful.",
        "exBadNote": "錯誤：slept 是動詞，修飾名詞要用現在分詞 sleeping"
      },
      {
        "title": "助動詞搭配錯誤（has slept / have slept）",
        "bad": "(X) He **have slept** for two hours. ／ (X) He **has sleep** for two hours.",
        "ok": "(O) He **has slept** for two hours.",
        "why": "助動詞後面一律接「過去分詞」；slept 剛好同時是過去式與過去分詞，所以 has slept 是正確的。但主詞是 he 就必須用 has 而不是 have，而原形 sleep 也不能直接跟在 has 後面。學生常在這裡同時犯兩個錯。判斷法：主詞第三人稱單數用 has，其他用 have；後面接過去分詞，不要再加 to be。",
        "exOkText": "(O) He **has slept** for two hours already.",
        "exOkZh": "他已經睡了兩個小時了。",
        "exBadText": "(X) He **have slept** for two hours already.",
        "exBadNote": "錯誤：主詞是 he，助動詞要用 has 不用 have"
      }
    ],
    "traps": [
      "**不規則動詞陷阱**：選項常放 sleeped、slept、sleep 三種，判斷關鍵是句中的時間副詞或助動詞。",
      "**助動詞與主詞一致**：has / have 必須配合 he / she / it 與 I / you / we / they，寫完要回頭檢查一次。",
      "**過去式與過去分詞**：本課兩者同形（slept），但同形不代表可以省略，has slept 中 slept 一個字都不能少。",
      "**e 不發音**：slept 只有一個音節，唸成兩三個音節會在聽力題被判錯。"
    ],
    "strategy": [
      "三態背誦：sleep – slept – slept，配合 keep – kept – kept、wake – woke – woken 一起記。",
      "每天造三句：一句用 slept、一句用 has slept、一句用 sleep，比較三種時態的差別。",
      "圈動詞檢查：寫完句子把動詞圈起來，確認是 slept 而不是 sleeped 或 sleped。",
      "朗讀練習：把 slept 唸 20 遍，特別感受 e 不發音、只有一個音節。",
      "同尾詞一起學：把 slept 與 stopped、swept 放在一起唸，都是 /ept/ 結尾，可以加深記憶。"
    ]
  },
  "slept last night": {
    "zh": "昨晚睡眠",
    "ipa": "slept læst naɪt",
    "intro": "針對您提供的英文片語「slept last night」，這是「動詞 + 時間狀語」的組合，本身還不是完整句子，前面要補上主詞才能成句，例如 I slept last night.。slept 是 sleep 的過去式，last night 是判斷時態的關鍵線索。本句最該注意動詞一定要用過去式 slept，且前面不能漏掉主詞。",
    "headline": "有 last night，動詞就要用過去式 slept",
    "structure": [
      {
        "role": "謂語動詞",
        "token": "slept",
        "pos": "動詞 (Verb) — sleep 的過去式（不規則動詞）",
        "func": "表示昨晚發生的「睡覺」這個動作，是整句的核心；因為有 last night，所以一定要用過去式",
        "mark": "O"
      },
      {
        "role": "時間狀語",
        "token": "last night",
        "pos": "時間副詞片語 (Time Adverbial Phrase)",
        "func": "說明動作發生的時間，放在動詞之後，也是決定動詞時態的直接線索",
        "mark": "O"
      },
      {
        "role": "結構提示",
        "token": "（需補主詞）",
        "pos": "片段提示",
        "func": "這段片語只有動詞與時間狀語，沒有主詞，不能單獨成句；前面要補上 I / he / she 等主詞，句首還要大寫",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動詞時態錯誤（未用過去式）",
        "bad": "(X) I **sleep** last night. ／ (X) She **sleep** last night.",
        "ok": "(O) I **slept** last night.",
        "why": "last night 指向過去的時間，因此動詞必須使用過去式 slept。中文「我睡覺」沒有時態變化，學生寫英文時常直接用原形。判斷法：先掃描時間詞（last night、yesterday、last week、two days ago），有的話立刻在動詞旁畫記號，強制改成過去式。",
        "exOkText": "(O) I **slept** well last night.",
        "exOkZh": "我昨晚睡得很好。",
        "exBadText": "(X) I **sleep** well last night.",
        "exBadNote": "錯誤：last night 是過去時間，動詞要用過去式 slept"
      },
      {
        "title": "語序錯誤（時間狀語插在主詞與動詞之間）",
        "bad": "(X) I **last night** slept. ／ (X) I **last night** slept well.",
        "ok": "(O) I **slept** last night.",
        "why": "英文的基本語序是「主詞 + 動詞 + 其他成分」，時間狀語一般放在動詞之後或句尾；插在主詞與動詞之間會打斷句子結構。學生常照中文「我昨晚睡得很好」的順序直譯。判斷法：先找出動詞，立刻把它放在主詞後面，其他成分再往後排。",
        "exOkText": "(O) I **slept very well** last night.",
        "exOkZh": "我昨晚睡得很好。",
        "exBadText": "(X) I **last night slept** very well.",
        "exBadNote": "錯誤：時間狀語不能插在主詞與動詞之間"
      },
      {
        "title": "動詞後誤加 to",
        "bad": "(X) I **slept to** last night. ／ (X) She **slept to** last night.",
        "ok": "(O) I **slept** last night.",
        "why": "sleep 是不及物動詞，後面直接加時間狀語 last night，中間不能加 to。這個 to 是從 sleep to bed（上床睡覺）那個固定搭配誤植過來的。判斷法：slept 後面接「時間」時不要加 to；只有接「地點」且是固定成語（sleep to bed、sleep at home）才用介系詞。",
        "exOkText": "(O) She **slept** eight hours last night.",
        "exOkZh": "她昨晚睡了八小時。",
        "exBadText": "(X) She **slept to** last night.",
        "exBadNote": "錯誤：slept 後面接時間狀語不加 to"
      },
      {
        "title": "片語誤當完整句（漏掉主詞）",
        "bad": "(X) **Slept** last night. ／ (X) **Slept** very badly last night.",
        "ok": "(O) He **slept** very badly last night.",
        "why": "英文的簡單句一定要同時有主詞和動詞，這段片語只有動詞與時間狀語，缺了主詞就不能成句。學生在翻譯題或改寫題中常只寫動詞片語就交卷。判斷法：寫完檢查「誰 + 做什麼 + 何時」三格是否都填滿，缺一格就不能算完整句子。",
        "exOkText": "(O) He **slept** very badly last night.",
        "exOkZh": "他昨晚睡得很不好。",
        "exBadText": "(X) **Slept** very badly last night.",
        "exBadNote": "錯誤：句子缺少主詞，必須補上 He 等主詞"
      }
    ],
    "traps": [
      "**時間副詞與時態**：last night、yesterday、last week 一定要配過去式，這是會考最常見的出題點。",
      "**不規則動詞**：選項中的 sleeped 是最大的陷阱，常與 slept 一起出現，看時間詞就能秒判。",
      "**語序陷阱**：I last night slept 讀起來中文味很重，但英文語序不允許，會考改錯題常拿來設題。",
      "**片語不成句**：slept last night 是片語，單獨寫在答案欄會被判錯，務必補上主詞。"
    ],
    "strategy": [
      "先圈時間再寫動詞：看到 last night 立刻寫 slept，順序顛倒就容易出錯。",
      "補主詞練習：把 slept last night 分別加上 I、he、she、they 當主詞，寫成四句。",
      "語序口訣：主詞在前，動詞緊跟，其他成分（時間、方式）一律往後排。",
      "不規則動詞複習：把 sleep – slept – slept 抄寫三遍，並與 keep、wake 一起背。",
      "整句範例抄寫：完整寫下 He slept terribly last night.，同時練習過去式、副詞與語序。"
    ]
  },
  "terribly": {
    "zh": "極糟糕地",
    "ipa": "ˈter.ə.bli",
    "intro": "針對您提供的英文單字「terribly」，這是一個副詞，不能單獨成句，必須放在句子中修飾動詞或另一個副詞，意思是「極其、非常地」，語意可褒可貶。音標是 /ˈterəbli/，由形容詞 terrible 變化而來。本句最該注意修飾動詞一定要用副詞 terribly，而不是形容詞 terrible。",
    "headline": "修飾動詞用副詞 terribly，不是形容詞 terrible",
    "structure": [
      {
        "role": "修飾語",
        "token": "terribly",
        "pos": "副詞 (Adverb) — 由形容詞加 -ly 變化而來",
        "func": "放在所修飾的動詞之後，表示「非常地、極其地」，語意可褒可貶，須看所修飾的動詞而定",
        "mark": "O"
      },
      {
        "role": "詞形對應",
        "token": "terrible",
        "pos": "形容詞 (Adjective) — -ly 前的原形",
        "func": "terrible 用來修飾名詞（a terrible night），terribly 用來修飾動詞（slept terribly）；兩者只能各司其職",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞與副詞混淆（terrible 代替 terribly）",
        "bad": "(X) He **slept terrible** last night. ／ (X) She sang **terrible**.",
        "ok": "(O) He **slept terribly** last night.",
        "why": "terrible 是形容詞，用來修飾名詞（a terrible night）；terribly 是副詞，用來修飾動詞（slept）。學生常因為兩者只差一個 ly 就隨意選。判斷法：先看空格的前一個詞是動詞還是名詞——前面是動詞就填 -ly 結尾的副詞。",
        "exOkText": "(O) He **slept terribly** last night.",
        "exOkZh": "他昨晚睡得非常糟糕。",
        "exBadText": "(X) He **slept terrible** last night.",
        "exBadNote": "錯誤：terrible 是形容詞，不能修飾動詞 slept"
      },
      {
        "title": "副詞位置錯誤（感官動詞後直接放副詞）",
        "bad": "(X) She felt **terribly** after the bad dream. ／ (X) He looks **terribly** today.",
        "ok": "(O) She felt **terrible** after the bad dream.",
        "why": "在 be 動詞或感官動詞（look、feel、sound、taste）之後，要用能單獨回答「怎麼樣」的形容詞；直接寫 She felt terribly 是不合英文習慣的表達。判斷法：把形容詞單獨抽出來問「她怎麼樣？」，如果答不出完整的描述，就該換成副詞。",
        "exOkText": "(O) She felt **terrible** after the bad dream.",
        "exOkZh": "那個惡夢之後，她感覺很糟。",
        "exBadText": "(X) She felt **terribly** after the bad dream.",
        "exBadNote": "錯誤：感官動詞後要用形容詞 terrible，不是副詞 terribly"
      },
      {
        "title": "語意搭配不合（terribly 修飾正面情感動詞）",
        "bad": "(X) She **terribly likes** apples. ／ (X) He **terribly loves** music.",
        "ok": "(O) She **really likes** apples.",
        "why": "terribly 帶有「糟糕地、痛苦地」的語意色彩，通常修飾負面的動詞與狀況（hurt、cry、miss、suffer）；不能拿來修飾 like、love、enjoy 這類正面情感動詞。要表達「非常喜歡」用 really 或 very。判斷法：把 terribly 換成「很糟地」唸一遍，讀起來不通順就改用 really。",
        "exOkText": "(O) He **terribly missed** his family.",
        "exOkZh": "他非常想念家人。",
        "exBadText": "(X) He **terribly likes** cartoons.",
        "exBadNote": "錯誤：terribly 帶負面語意，修飾 like 應改成 really"
      },
      {
        "title": "拼寫變化規則錯誤（-ble 變 -bly）",
        "bad": "(X) He slept **terribly** last night. ／ (X) She was **terrible**-ly tired.",
        "ok": "(O) He slept **terribly** last night.",
        "why": "由 -ble 結尾的形容詞加 -ly 時，要先把 le 改成 y 再接 -ly：terrible → terribly；同理 possible → possibly、comfortable → comfortably。學生常直接加 -ly 變成 terribly，或把 ly 分開寫成 terrible-ly。判斷法：看到 -ble 結尾，先把 le 換成 y，再接 -ly。",
        "exOkText": "(O) She was **terribly** tired.",
        "exOkZh": "她累極了。",
        "exBadText": "(X) She was **terribly** tired.",
        "exBadNote": "錯誤：-ble 加 -ly 要變成 -bly，寫成 terribly 是錯的"
      }
    ],
    "traps": [
      "**形容詞與副詞的填空**：空格前是動詞就選 -ly 副詞，空格後接名詞就選形容詞，這是會考必考配對。",
      "**感官動詞的陷阱**：look、feel、sound、taste 後面用形容詞（He looks terrible.），不是副詞（He looks terribly.）。",
      "**拼寫規則**：-ble → -bly 的變化常被忽略，選擇題中 terribly、terribily 都是錯誤選項。",
      "**語意色彩**：terribly 帶負面語意，修飾正面情感動詞時讀起來很奇怪，要改用 really。"
    ],
    "strategy": [
      "先判斷修飾對象：動筆前先問「這裡要修飾的是動詞還是名詞？」再決定要不要加 -ly。",
      "對照表整理：terrible / terribly、possible / possibly、comfortable / comfortably 三組放在一起背。",
      "位置口訣：中文「很糟」可以放句尾當形容，英文若接動詞就得變成副詞往前放。",
      "造句對比：寫三句分別用 terribly tired、slept terribly、felt terrible，比較位置差異。",
      "語意檢查：把 terribly 換成「糟糕地」唸一遍，語意不通就改用 really。"
    ]
  },
  "slept terribly": {
    "zh": "睡得很糟糕",
    "ipa": "slept ˈter.ə.bli",
    "intro": "針對您提供的片語 **slept terribly**，這是一個「動詞＋副詞」組合的片語，本身沒有主詞，不能單獨成句，前面必須接上主詞（例如 Adam slept terribly.）。它表示「睡得很糟糕」，最需要注意的是兩個重點：動詞要變成過去式 slept，以及修飾動詞時必須用副詞 terribly 而不是形容詞 terrible。",
    "headline": "動詞用過去式 slept；修飾動詞要用副詞",
    "structure": [
      {
        "role": "動詞",
        "token": "slept",
        "pos": "動詞 (Verb) — sleep 的過去式",
        "func": "表示動作已經發生、已經結束，是 sleep 的第二型態；這個片語被當動詞使用，前面要補上主詞才能成句",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "terribly",
        "pos": "副詞 (Adverb) — terrible 的副詞形式",
        "func": "修飾旁邊的動詞 slept，表示「糟糕地」；修飾動詞一定要用副詞，不能用原形形容词",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動詞三態變化錯誤（用了原形 sleep）",
        "bad": "(X) Adam **sleep** terribly. ／ (X) Adam **sleeps** terribly.",
        "ok": "(O) Adam **slept** terribly.",
        "why": "slept 是 sleep 的過去式，表示動作已經發生、已經結束。台灣學生常把 sleep、slept、sleeping 三個形式混在一起，看到「睡得很糟」就反射式寫下原形 sleep。判斷法：先看句子的時間線，只要敘述的是已發生的事，動詞就往第二型態（過去式）找；原形只能出現在祈使句（Sleep well.）或主詞後搭配 do／can 的時候。",
        "exOkText": "(O) My little brother **slept** terribly last night.",
        "exOkZh": "我弟弟昨晚睡得很糟糕。",
        "exBadText": "(X) My little brother **sleep** terribly last night.",
        "exBadNote": "錯誤：sleep 是原形，這裡要敘述昨晚已發生的事，必須改成過去式 slept。"
      },
      {
        "title": "詞性錯誤（用形容詞 terrible 修飾動詞）",
        "bad": "(X) Adam **slept terrible**.",
        "ok": "(O) Adam **slept terribly**.",
        "why": "terrible 是形容詞，只能修飾名詞（a terrible night）；terribly 才是副詞，修飾動詞。學生常受中文「睡得很糟」影響，直覺把「糟」當形容詞搬過去。判斷法：看空格的前後——前面是動詞就選 -ly 副詞，後面接名詞（前面有 a／the）才用原形。terrible 這類字要連同 -ly 一起背。",
        "exOkText": "(O) Tom runs **quickly** every morning.",
        "exOkZh": "湯姆每天早上跑得很快。",
        "exBadText": "(X) Tom runs **quick** every morning.",
        "exBadNote": "錯誤：quick 是形容詞，quickly 才是副詞；修飾動詞要用副詞。"
      },
      {
        "title": "動詞拼寫錯誤（自行加 -ed 變成 sleeped）",
        "bad": "(X) Adam **sleeped** terribly. ／ (X) Adam **slepted** terribly.",
        "ok": "(O) Adam **slept** terribly.",
        "why": "sleep 是不規則動詞，過去式直接換成 slept，不能在原形後面加 -ed。會考很愛考這類「看起來合理」的加 -ed 寫法，學生常以為所有動詞都是加 d 就好。判斷法：把常見不規則動詞分成三類來背——完全換字（sleep→slept）、元音變化（come→came）、加 d 而尾音不變（stop→stopped）；遇到的動詞先在這三類裡找，找不到才加 -ed。",
        "exOkText": "(O) He **wrote** a letter to his teacher yesterday.",
        "exOkZh": "他昨天寫了一封信給老師。",
        "exBadText": "(X) He **writed** a letter to his teacher yesterday.",
        "exBadNote": "錯誤：write 是不規則動詞，過去式是 wrote，不能自行加 -ed。"
      },
      {
        "title": "省略主詞錯誤（片語不能單獨成句）",
        "bad": "(X) **Slept terribly** last night.",
        "ok": "(O) He **slept terribly** last night.",
        "why": "slept terribly last night 只描述動作，裡面沒有說「誰」做的，屬於動詞片語，不能單獨成句；英文句子一定要有主詞。學生常把中文省略主詞的習慣帶進來，以為「睡得很糟」翻成三個字就可以。判斷法：把句子唸出來問自己「是誰做的？」答不出來就必須補上主詞，或改成 -ing 片語另當主詞（例：Being with animals is fun.）。",
        "exOkText": "(O) The little baby **cried** loudly at night.",
        "exOkZh": "小嬰兒晚上哭得很大聲。",
        "exBadText": "(X) **Cried** loudly at night.",
        "exBadNote": "錯誤：只有動作沒有主詞，不能單獨成句，前面要補上 the little baby。"
      }
    ],
    "traps": [
      "**形容詞與副詞的陷阱**：會考克漏字常把 **terrible／terribly** 放進空格，判斷關鍵是空格前面是動詞還是名詞。",
      "**不規則動詞的陷阱**：看到選項結尾是 -ed 要提高警覺，sleep、write、buy、eat 都不能直接加 -ed。",
      "**片語不能單獨成句的陷阱**：像 slept terribly 這種沒有主詞的片語，只能出現在句子裡，不會自己成為一整題的答案。",
      "**語序的陷阱**：方式副詞（terribly）要放在時間副詞（last night）之前，這是本課本的固定順序。"
    ],
    "strategy": [
      "三態表格反覆唸：把 sleep–slept–sleeping、write–wrote–written 寫在筆記本角落，每天早晚各唸一次。",
      "空格前先看詞性：寫到空格時先圈出前一個字是名詞還是動詞，再決定填哪一格。",
      "句子永遠補主詞：草稿上每寫完一句就檢查「主詞＋動詞」是否齊全，片語一定不能獨自成句。",
      "把正確句連寫五遍：Adam slept terribly. 寫五遍再默寫兩遍，讓正確形式變成肌肉記憶。",
      "整理成三欄筆記：原形／過去式／分詞，哪一欄空著就立刻補上，考試前只看這三欄。"
    ]
  },
  "slept terribly last night": {
    "zh": "昨晚睡得很糟糕",
    "ipa": "slept ˈter.ə.bli læst naɪt",
    "intro": "針對您提供的片語 **slept terribly last night**，這是「動詞＋副詞＋時間副詞」的組合，仍然沒有主詞，不能單獨成句，必須接在主詞後面。相較前一個片語，它多了一個強烈的時間線索 last night，整個句子的時態要跟著這個時間走，是判斷過去式的最快依據。",
    "headline": "last night 決定用過去式；方式副詞在時間前",
    "structure": [
      {
        "role": "動詞",
        "token": "slept",
        "pos": "動詞 (Verb) — sleep 的過去式",
        "func": "表示昨晚已發生的動作，形式由句尾的 last night 決定",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "terribly",
        "pos": "副詞 (Adverb)",
        "func": "修飾動詞 slept，說明睡的「方式」是糟糕；方式副詞放在時間副詞前面",
        "mark": "O"
      },
      {
        "role": "時間副詞",
        "token": "last night",
        "pos": "時間副詞片語 (Time Phrase)",
        "func": "放在句尾說明動作發生的時間，同時是判斷時態最重要的線索",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "時間副詞與時態不一致（出現 last night 卻用原形）",
        "bad": "(X) He **sleep** terribly last night. ／ (X) He **sleeps** terribly last night.",
        "ok": "(O) He **slept** terribly last night.",
        "why": "last night 是百分之百的過去時間，凡是搭配它出現的句子，動詞一定要用過去式。學生常常看到了 last night 卻因為句型不熟而順手寫原形，或寫成第三人稱單數的 sleeps。判斷法：草稿時把時間副詞先圈起來，主詞寫完立刻在動詞旁邊寫上「過去」兩個字，等於替自己設下一個檢查點，寫完再回頭對一次。",
        "exOkText": "(O) Lucy **watched** TV last night.",
        "exOkZh": "露西昨晚看電視。",
        "exBadText": "(X) Lucy **watch** TV last night.",
        "exBadNote": "錯誤：有 last night 就一定要用過去式 watched，不能用原形 watch。"
      },
      {
        "title": "副詞位置錯誤（時間副詞被放到方式副詞前面）",
        "bad": "(X) He **slept last night terribly**.",
        "ok": "(O) He **slept terribly last night**.",
        "why": "英文的敘述順序是「主詞＋動詞＋方式副詞＋時間副詞」，也就是先說怎麼做、最後說什麼時候做。台灣學生受中文「昨晚睡得很糟」影響，很容易把時間放到前面。判斷法：把句子換成「主詞＋動詞＋時間＋方式」之後覺得很彆扭，就多半是錯的；也可以記口訣：短動作放前面、時間放最後。",
        "exOkText": "(O) He **played basketball well yesterday**.",
        "exOkZh": "他昨天籃球打得很好。",
        "exBadText": "(X) He **played basketball yesterday well**.",
        "exBadNote": "錯誤：方式副詞 well 應該在時間副詞 yesterday 之前。"
      },
      {
        "title": "時間副詞寫得不完整（漏掉 last）",
        "bad": "(X) He slept terribly **night**. ／ (X) He slept terribly **the last night**.",
        "ok": "(O) He slept terribly **last night**.",
        "why": "「昨晚」的固定說法是 last night，兩個字都要有：last 表示「上一個」，night 才表示「晚上」。漏掉 last 只剩 night 會變成不明所以的單字；而 the last night 雖然文法通順，但語氣變成「最近的那個晚上」，不是會考的標準答案。判斷法：中文的「上一個禮拜的晚上」一定對應 last night，不會加 the。",
        "exOkText": "(O) We **had** a great time **last weekend**.",
        "exOkZh": "我們上週末玩得很開心。",
        "exBadText": "(X) We **had** a great time **weekend**.",
        "exBadNote": "錯誤：漏掉 last，只剩 weekend，時間說法不完整。"
      },
      {
        "title": "動詞拼寫錯誤（對不規則動詞加 -ed）",
        "bad": "(X) He **sleeped** terribly last night. ／ (X) He **slepted** terribly last night.",
        "ok": "(O) He **slept** terribly last night.",
        "why": "很多學生知道「昨天要用過去式」，卻不知道過去式怎麼拼，於是在原形後面直接加 -ed。sleep 屬於不規則動詞，過去式是 slept，完全不保留原形的拼法。判斷法：寫 -ed 之前先問自己「這個動詞是不是不規則動詞？」是就直接翻筆記本查；查不到再用加 -ed 的規則，並且用重音檢查法讀一次：sleeped 的重音會跑到最後，聽起來很怪。",
        "exOkText": "(O) She **bought** a new dictionary last week.",
        "exOkZh": "她上週買了一本新字典。",
        "exBadText": "(X) She **buyed** a new dictionary last week.",
        "exBadNote": "錯誤：buy 是不規則動詞，過去式是 bought，不能加 -ed。"
      }
    ],
    "traps": [
      "**last night 的陷阱**：只要 last night 出現在句子裡，所有動詞都要檢查是否已變成過去式，包括已經有 -ed 的 watch。",
      "**時間與方式互換的陷阱**：會考常把 last night 和 terribly 對調出題，看你能不能守住「方式在前、時間在後」。",
      "**不規則動詞加 -ed 的陷阱**：選項裡出現 sleeped、slepted 這種寫法時要立刻刪掉，它們在正式英文中不存在。",
      "**漏字的陷阱**：night 前面一定要有 last，只寫 night 會被視為時間資訊不完整而不得分。"
    ],
    "strategy": [
      "先圈時間再寫動詞：作答時第一步永遠是先找時間副詞，找到就圈起來，再決定動詞形式。",
      "背八個就夠用的時間副詞：last night、yesterday、last week、two days ago、ago、in 2020，看到就啟動過去式模式。",
      "語序口訣：主詞、動詞、方式、時間，念熟了就不會把時間塞到前面。",
      "造句練習：每天用 slept terribly last night 造一個屬於自己的句子，寫在本子上加註中文。",
      "檢查兩次的習慣：寫完後從句尾往回讀一遍，專門檢查時間副詞與動詞時態是否一致。"
    ]
  },
  "Adam slept terribly last night": {
    "zh": "亞當昨晚睡得很糟糕",
    "ipa": "ˈæd.əm slept ˈter.ə.bli læst naɪt",
    "intro": "針對您提供的句子 **Adam slept terribly last night**，這是一個文法完全正確的簡單句，可以單獨成句。它由「主詞＋動詞＋副詞＋時間副詞」四個部分組成，正是國中會考最典型的句型：先靠時間判斷時態，再看要修飾的是名詞還是動詞，最後確認專有名詞的大小寫。",
    "headline": "有 last night 用過去式；修飾動詞用副詞",
    "structure": [
      {
        "role": "主詞",
        "token": "Adam",
        "pos": "專有名詞 (Proper Noun)",
        "func": "句子的主角，專有名詞第一個字母一定要大寫",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "slept",
        "pos": "動詞 (Verb) — sleep 的過去式",
        "func": "句子的核心動作，表示昨晚已發生；形式由句尾的 last night 決定",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "terribly",
        "pos": "副詞 (Adverb)",
        "func": "修飾動詞 slept，說明睡的「方式」；修飾動詞要用副詞而非形容詞",
        "mark": "O"
      },
      {
        "role": "時間副詞",
        "token": "last night",
        "pos": "時間副詞片語 (Time Phrase)",
        "func": "放在句尾說明時間，同時是判斷時態的關鍵線索",
        "mark": "O"
      },
      {
        "role": "敘述部分",
        "token": "slept terribly last night",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "主詞後面整段要回答「做什麼、怎麼做、什麼時候」，順序不可任意調換",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "專有名詞大小寫錯誤（Adam 寫成 adam）",
        "bad": "(X) **adam** slept terribly last night.",
        "ok": "(O) **Adam** slept terribly last night.",
        "why": "Adam 是人名，屬於專有名詞，規則是每個字的第一個字母都要大寫。中文名字沒有大小寫的問題，所以學生寫句子時常常順手打成小寫，句子看起來也還能讀懂，直到會考的檢定或改錯題才會發現被扣分。判斷法：句子開頭的第一個字一定大寫；中間出現的人名、地名、學校名一律大寫，寫完後用手指從句首掃到句尾檢查一次。",
        "exOkText": "(O) **Kevin** lost his wallet yesterday.",
        "exOkZh": "凱文昨天弄丟了錢包。",
        "exBadText": "(X) **kevin** lost his wallet yesterday.",
        "exBadNote": "錯誤：人名 Kevin 是專有名詞，第一個字母必須大寫。"
      },
      {
        "title": "動詞時態錯誤（忘記用過去式）",
        "bad": "(X) Adam **sleep** terribly last night.",
        "ok": "(O) Adam **slept** terribly last night.",
        "why": "句尾有明確的過去時間 last night，動詞必須使用過去式。學生常因粗心，只顧著寫主詞與副詞，忘記把 sleep 改為 slept。判斷法：先找時間副詞，看到 last night、yesterday、last week、two days ago 就立刻在動詞旁邊畫一個記號，強制自己使用過去式，寫完再回頭確認。",
        "exOkText": "(O) He **ate** a big dinner last night.",
        "exOkZh": "他昨晚吃了一頓大餐。",
        "exBadText": "(X) He **eat** a big dinner last night.",
        "exBadNote": "錯誤：未將 eat 改為過去式 ate。"
      },
      {
        "title": "形容詞與副詞混淆（修飾動詞用形容詞）",
        "bad": "(X) Adam slept **terrible** last night.",
        "ok": "(O) Adam slept **terribly** last night.",
        "why": "terrible 是形容詞，用來修飾名詞（a terrible night）；terribly 是副詞，用來修飾動詞（slept）。學生常誤把形容詞當副詞來修飾動詞，是會考克漏字最常見的陷阱之一。判斷法：看到空格先問「這裡要修飾的是名詞還是動詞？」修飾動詞就要選 -ly 結尾的副詞。",
        "exOkText": "(O) She sings **beautifully**.",
        "exOkZh": "她唱得很美。",
        "exBadText": "(X) She sings **beautiful**.",
        "exBadNote": "錯誤：beautiful 是形容詞，不能修飾動詞 sings。"
      },
      {
        "title": "be 動詞與一般動詞並用（雙動詞錯誤）",
        "bad": "(X) Adam **was slept** terribly last night.",
        "ok": "(O) Adam **slept** terribly last night.",
        "why": "一個簡單句中只能有一個主要動詞。slept 本身已經帶有過去式的時態，前面不能再加 was。學生常誤以為「表達過去就一定要加 was／were」。記憶法：一般動詞的過去式自己就攜帶時態（sleep → slept），不需要 be 動詞幫忙；只有 be 動詞本身變化時才用 was／were。",
        "exOkText": "(O) They **went** to the movies last Sunday.",
        "exOkZh": "他們上週日去看了電影。",
        "exBadText": "(X) They **were went** to the movies last Sunday.",
        "exBadNote": "錯誤：動詞重複，went 前面不能再加 were。"
      }
    ],
    "traps": [
      "**時間副詞的陷阱**：看到 last night、yesterday、last week、two days ago 等字眼，動詞一定要用過去式，常考題型是選出正確的動詞形式。",
      "**詞性修飾的陷阱**：look、sound、feel、sleep、study 等動詞後面若要修飾，必須用副詞（-ly），例如 (O) He looks happy. ／ (X) He looks happily.。",
      "**大小寫的陷阱**：人名一律大寫，會考的單字題常把 Adam 變成 adam 當成錯誤選項。",
      "**雙動詞的陷阱**：看到 was／were 與一般動詞過去式同時出現，八成是錯的，簡單句只允許一個主要動詞。"
    ],
    "strategy": [
      "先抓時間，再選動詞：寫題第一步先看有沒有時間副詞，有就立刻在動詞旁畫記號提醒自己選過去式。",
      "判斷修飾對象：看到空格先問「要修飾的是名詞還是動詞？」修飾動詞就選副詞 terribly。",
      "檢查雙動詞：寫完後唸一次句子，聽到「was slept」「were went」這種組合就立刻改。",
      "大聲朗讀培養語感：把正確句子唸幾次，讓大腦習慣正確語序，考試時就能憑語感刪掉錯誤選項。",
      "抄寫時順便背單字：每次抄到專有名詞時順便複誦一次 Adam 的大小寫，养成肌肉記憶。"
    ]
  },
  "animal": {
    "zh": "動物",
    "ipa": "ˈæn.ɪ.məl",
    "intro": "針對您提供的單字 **animal**，這是一個可數名詞（單數形式），本身不能單獨成句，必須放進句子裡當主詞或受詞。它中文意思是「動物」，最需要注意的三件事是拼字不能拼錯、發音要唸對，以及它是可數名詞所以必須分單數與複數。",
    "headline": "可數名詞要分單複數：animal → animals",
    "structure": [
      {
        "role": "詞條本身",
        "token": "animal",
        "pos": "名詞 (Noun) — 可數名詞，單數",
        "func": "本課本的單字主體，中文意思是「動物」，可數表示一隻、一頭、一種都用它",
        "mark": "O"
      },
      {
        "role": "單複數判斷",
        "token": "animal",
        "pos": "名詞 (Noun) — 單數形式",
        "func": "只提到一隻時用 animal；提到兩隻以上或泛指一群時，必須變成複數 animals 才能使用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤（字母順序或重複出錯）",
        "bad": "(X) The zoo has many **animel**. ／ (X) I saw an **anmal** yesterday.",
        "ok": "(O) The zoo has many **animals**.",
        "why": "animal 的拼字是 a-n-i-m-a-l，前面 ani、後面 mal，很多學生會把 mal 誤寫成 mel，或漏掉 a 變成 anmal。會考單字題與拼字題都直接看這個字怎麼寫，拼錯就算整題錯。判斷法：把單字拆成音節記成「an-i-mal」三段，依音節一段一段拼回去；寫完再由右往左唸一次確認。",
        "exOkText": "(O) A **cat** is a kind of **animal**.",
        "exOkZh": "貓是一種動物。",
        "exBadText": "(X) A cat is a kind of **animel**.",
        "exBadNote": "錯誤：animel 拼字錯誤，正確應為 animal。"
      },
      {
        "title": "單複數錯誤（可數名詞複數漏加 -s）",
        "bad": "(X) There are many **animal** in the forest.",
        "ok": "(O) There are many **animals** in the forest.",
        "why": "animal 是可數名詞，many、a lot of、two、three 這些詞後面一定要接複數，否則句子不成立。中文的「很多動物」沒有單複數變化，所以學生常常忘了加 s，尤其是前面已經有 many 的時候覺得「應該很明顯了」。判斷法：看到 many、a lot of、some、several 就立刻在名詞後面加 s 或 es，這是最可靠的觸發條件。",
        "exOkText": "(O) I like **animals** very much.",
        "exOkZh": "我非常喜歡動物。",
        "exBadText": "(X) I like **animal** very much.",
        "exBadNote": "錯誤：泛指多種動物要用複數 animals，單數 animal 不加 s 不能表示這層意思。"
      },
      {
        "title": "發音錯誤（重音位置與尾音唸錯）",
        "bad": "(X) 唸成 /əˈnɑː.məl/ 或把 -al 唸成 -el。",
        "ok": "(O) /ˈæn.ɪ.məl/（重音在第一音節）",
        "why": "animal 的重音在第一音節 an-，後面是弱讀的 ɪ 和 əl。台灣學生常受中文音調影響，把重音放到 -mal，或把最後的 -al 唸成中文的「ㄟ爾」，讀起來像 animel。判斷法：三音節以上的單字，標音時重音符號一定在前面；唸之前先寫下音標 /ˈæn.ɪ.məl/，照著唸三遍再離開書本。",
        "exOkText": "(O) The **animal** /ˈæn.ɪ.məl/ ran into the woods.",
        "exOkZh": "那隻動物跑進了樹林。",
        "exBadText": "(X) The animal /əˈnɑː.məl/ ran into the woods.",
        "exBadNote": "錯誤：重音應在第一音節 /ˈæn-/，不能讀成 /əˈnɑː/。"
      },
      {
        "title": "不定冠詞搭配錯誤（a animal 應為 an animal）",
        "bad": "(X) I saw **a animal** in my yard.",
        "ok": "(O) I saw **an animal** in my yard.",
        "why": "不定冠詞 a 用在輔音音開頭的單數名詞前，an 用在母音音開頭的單數名詞前。animal 的第一個音是 /æ/，屬於母音音，所以必須用 an。學生常看字母而不是看讀音，以為 a 打頭就用 a。判斷法：不要看字母看音標，唸出第一個音；母音音（a e i o u，以及偶爾出現的 h）就用 an，其餘用 a。",
        "exOkText": "(O) **An** elephant is a large **animal**.",
        "exOkZh": "大象是一種大型動物。",
        "exBadText": "(X) **A** elephant is a large animal.",
        "exBadNote": "錯誤：elephant 以母音音開頭，要用 an 而不是 a。"
      }
    ],
    "traps": [
      "**many 後一定要複數的陷阱**：many animals 正確，many animal 錯誤，這是會考克漏字最常見的送分或失分點。",
      "**a／an 看音標不看字母的陷阱**：只要第一個音是母音音就用 an，例如 an hour、a university。",
      "**重音位置的陷阱**：三音節單字的重音多在第一音節，讀錯重音會讓口語聽起來像另一個字。",
      "**拼字檢查的陷阱**：動名詞寫成 animaling、複數寫成 animels 都算錯，複數只有加 s 一種變化。"
    ],
    "strategy": [
      "抄單字時連音標一起抄：每次抄 animal 就把 /ˈæn.ɪ.məl/ 寫在旁邊，音標會強迫大腦記住發音。",
      "單字卡分成三欄：原形 animal、複數 animals、相關片語 kinds of animals，隨時補充。",
      "看到數量詞就反應加 s：many、a lot of、some、two 這四個詞看到就檢查後面的名詞。",
      "每天唸十遍：唸的時候用手比出三個音節 an-i-ma-la，唸熟了拼字自然就對。",
      "把單字放進句子裡記：只背單字容易忘，多寫兩三個例句會記得更牢。"
    ]
  },
  "animals": {
    "zh": "動物（複數）",
    "ipa": "ˈæn.ɪ.məlz",
    "intro": "針對您提供的單字 **animals**，這是 animal 的複數形式，中文是「動物（複數）」，本身同樣不能單獨成句。它要注意的地方是：複數只在字尾加 s，拼法與發音都要跟著改，而且當它拿來修飾別的名詞時，反而要還原成單數。",
    "headline": "複數加 -s；當定語時要還原成單數",
    "structure": [
      {
        "role": "詞條本身",
        "token": "animals",
        "pos": "名詞 (Noun) — 可數名詞的複數",
        "func": "由 animal 在字尾加 s 構成，表示兩隻以上或泛指一整群動物",
        "mark": "O"
      },
      {
        "role": "用於修飾",
        "token": "animals",
        "pos": "名詞 (Noun) — 複數；作定語時還原為單數",
        "func": "單獨當主詞或受詞時用複數；若放在另一個名詞前面修飾它，則要寫成單數 animal",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複數拼寫錯誤（多加字母或誤加撇號）",
        "bad": "(X) I love **animels**. ／ (X) I love **animal's**.",
        "ok": "(O) I love **animals**.",
        "why": "這個字的複數規則最簡單：直接在字尾加一個 s，變成 animals。會有 animels 或 animal's 的寫法，通常是套用了 bus→buses、baby→babies 這類需要加 es 或加撇號的規則，結果弄巧成拙。判斷法：看單數結尾——如果已經是 s、x、sh、ch 才加 es；以母音加 y 結尾才把 y 變 ies，其他一律直接加 s。",
        "exOkText": "(O) Farmers raise many **animals** on the farm.",
        "exOkZh": "農夫在農場養了許多動物。",
        "exBadText": "(X) Farmers raise many **animal's** on the farm.",
        "exBadNote": "錯誤：複數不加撇號，正確應為 animals。"
      },
      {
        "title": "單複數誤用（用複數指涉一隻動物）",
        "bad": "(X) I bought **one animals** yesterday. ／ (X) There is **two animals** in the cage.",
        "ok": "(O) I bought **one animal** yesterday.",
        "why": "數字與名詞的單複數必須一致：one、a、an 搭配單數，two、three、many 搭配複數。中文的「一隻動物」「兩隻動物」在寫成英文時，如果直接把複數 animals 套上去，就會出現 one animals 這種一看就怪的句子。判斷法：先寫數字，再問自己「這數字是幾？」一之後接單數，兩以上接複數，寫完立刻檢查一次。",
        "exOkText": "(O) Three **dogs** are running in the park.",
        "exOkZh": "三隻狗在公園裡跑。",
        "exBadText": "(X) Three **dog** are running in the park.",
        "exBadNote": "錯誤：數字 three 之後的名詞要用複數 dogs。"
      },
      {
        "title": "發音錯誤（複數 -s 尾音唸成 /s/ 或忘記唸）",
        "bad": "(X) 把 animals 唸成 /ˈæn.ɪ.məl/，尾音漏掉或唸成清音 /s/。",
        "ok": "(O) /ˈæn.ɪ.məlz/（-s 唸成 /z/ 的濁音）",
        "why": "複數尾音有三種唸法：以 /p/、/t/、/k/ 結尾唸 /s/；以濁音結尾（-el、-ou、-n 等）唸 /z/；以 s、x、sh、ch 結尾才多一個 /ɪz/ 音。animal 結尾是 /l/ 屬於濁音，所以要唸 /z/。台灣學生常唸成 /s/，聽起來像單數。判斷法：唸複數時手掌貼在喉嚨，感覺得到震動就是 /z/。",
        "exOkText": "(O) The **animals** /ˈæn.ɪ.məlz/ are in the zoo.",
        "exOkZh": "那些動物在動物園裡。",
        "exBadText": "(X) The animal /ˈæn.ɪ.məl/ are in the zoo.",
        "exBadNote": "錯誤：唸成單數，複數的 /z/ 尾音漏掉了。"
      },
      {
        "title": "詞性錯誤（作定語時沒有還原成單數）",
        "bad": "(X) She works at an **animals** home.",
        "ok": "(O) She works at an **animal** home.",
        "why": "英文的名詞片語裡，用來修飾後面名詞的那一個字稱為定語，必須用單數：animal home、school bag、bus stop。學生看到本課本的主題單字是 animals，就直接套上去寫成 animals home。判斷法：只要一個名詞緊緊靠在另一個名詞前面當修飾，它就是定語，一律改回單數；判斷方式是看後面還有沒有別的名詞跟著。",
        "exOkText": "(O) Many **animal** shelters are now open in our city.",
        "exOkZh": "我們市裡現在有很多動物收容所。",
        "exBadText": "(X) Many **animals** shelters are now open in our city.",
        "exBadNote": "錯誤：shelters 前面的修飾語要用單數 animal。"
      }
    ],
    "traps": [
      "**複數不加撇號的陷阱**：會考常把 animal's 當成選項，但撇號只屬於所有格，複數永遠沒有撇號。",
      "**定語用單數的陷阱**：animals home、animals school 全是錯的，會考克漏字很喜歡在這裡設陷阱。",
      "**數字與名詞一致性的陷阱**：one animal、two animals 要能立刻判斷，寫錯在會考是整題失分。",
      "**複數尾音的陷阱**：口語測驗中唸成單數會被扣分，記得 -l 結尾唸 /z/。"
    ],
    "strategy": [
      "把單複數寫成對照表：左欄 animal、右欄 animals，每次寫句子時對照著看。",
      "複數規則只背三條：一般加 s、s/x/sh/ch 加 es、母音加 y 變 ies，夠用一整年。",
      "寫到定語就停一秒：兩個名詞排在一起時，問自己後面那個名詞是不是被修飾，是就把前面改單數。",
      "每天唸五組單複數：animal–animals、dog–dogs，唸出尾音差異可以幫助口語。",
      "造句驗證單字：寫一個含 animals 的句子，再寫一個含 animal home 的句子，差別就記住了。"
    ]
  },
  "kinds of animals": {
    "zh": "各種動物",
    "ipa": "kaɪndz əv ˈæn.ɪ.məlz",
    "intro": "針對您提供的片語 **kinds of animals**，這是一個「名詞複數＋of＋名詞複數」的名詞片語，本身不能單獨成句，要放在主詞或受詞的位置。of 在這裡是固定搭配，專門用來表示「……的種類」，中間不能隨意換成別的介系詞。",
    "headline": "of 是固定搭配；前後名詞都要複數",
    "structure": [
      {
        "role": "前中心名詞",
        "token": "kinds",
        "pos": "名詞 (Noun) — kind 的複數",
        "func": "片語的核心，表示「多種」，所以要用複數 kinds",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "kinds of 是不可拆的固定搭配，用來連接「種類」和被分類的對象",
        "mark": "O"
      },
      {
        "role": "後中心名詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "被分類的對象，這裡泛指「動物」整群，所以用複數 animals",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（把 of 換成 for、in 或 at）",
        "bad": "(X) She has experience **with kinds for animals**. ／ (X) He studies **kinds in animals**.",
        "ok": "(O) She has experience **with kinds of animals**.",
        "why": "of 在「A of B」中表示「B 的 A」，是所有格關係的固定用法，不能用 for、in、at 取代。學生常因中文「對動物的各種……」而誤以為要用 for。判斷法：kinds of、a cup of、a bottle of、a piece of 這類片語要整組背，不要單獨想 of 的意思；看到 of 前面是單數或複數名詞，幾乎都是所有格關係。",
        "exOkText": "(O) I don't like **kinds of animals** with long tails.",
        "exOkZh": "我不喜歡有長尾巴的動物。",
        "exBadText": "(X) I don't like kinds of animals **for** long tails.",
        "exBadNote": "錯誤：kinds of 是固定搭配，of 不能改成 for。"
      },
      {
        "title": "前中心名詞複數漏 -s（kind 沒有變成 kinds）",
        "bad": "(X) The zoo shows **kind of animals** from Africa.",
        "ok": "(O) The zoo shows **kinds of animals** from Africa.",
        "why": "中文的「各種」本身就含有「很多種」的意思，但英文的 kind 是可數名詞，只有一種時才用 kind。既然要表達多種，就必須變成複數 kinds。學生常受中文影響省略 -s。判斷法：中文的「各種、各樣、不同」幾乎都對應英文複數；看到這類中文就立刻檢查名詞是否已經加了 s。",
        "exOkText": "(O) People eat **kinds of animals** as food in some countries.",
        "exOkZh": "有些國家把某些動物當食物吃。",
        "exBadText": "(X) People eat kind of animals as food in some countries.",
        "exBadNote": "錯誤：「各種」要用複數 kinds，不能用單數 kind。"
      },
      {
        "title": "of 後缺中心名詞（片語不完整）",
        "bad": "(X) She is friendly **with all kinds of**.",
        "ok": "(O) She is friendly **with all kinds of animals**.",
        "why": "of 在這個片語裡是一個介系詞，介系詞後面一定要有名詞或名詞片語當它的受詞，否則整個片語是缺角的。學生在填空題常把 of 當成句子的結尾，寫完就停筆。判斷法：寫完每一個介系詞都問一句「它後面跟的是誰？」沒有受詞就不能停，of 前面已經有 kinds，後面就必須補上被分類的對象。",
        "exOkText": "(O) My brother is good **at taking care of animals**.",
        "exOkZh": "我哥哥很會照顧動物。",
        "exBadText": "(X) My brother is good at taking care **of**.",
        "exBadNote": "錯誤：of 後面缺少受詞，片語不完整。"
      },
      {
        "title": "拼寫錯誤（誤加撇號或漏字母）",
        "bad": "(X) I read a book **about kind's of animals**. ／ (X) I read a book about **kinds of animal**s.",
        "ok": "(O) I read a book **about kinds of animals**.",
        "why": "kinds 是複數，不加撇號；撇號只用在所有格（the student's book）。另外 kinds 的字尾 -ds 也要寫齊，很多人在快速書寫時漏掉 s 變成 kind。判斷法：複數名詞一律沒有撇號，看到撇號先確認是不是所有格；寫完單字用手指一個字母一個字母滑過去，檢查尾音有沒有漏。",
        "exOkText": "(O) The book describes many **kinds of animals**.",
        "exOkZh": "這本書介紹了許多種類的動物。",
        "exBadText": "(X) The book describes many **kind's of animals**.",
        "exBadNote": "錯誤：複數不加撇號，應為 kinds。"
      }
    ],
    "traps": [
      "**of 不能亂換的陷阱**：kinds of 與 a cup of、a piece of 一樣是固定搭配，會考克漏字常把 of 換成 for 當錯誤選項。",
      "**「各種」等於複數的陷阱**：中文「各種」不代表英文也要照抄，英文必須寫 kinds。",
      "**介系詞不能單獨存在的陷阱**：of 後面缺少受詞的句子一律錯，檢查時從介系詞往後看。",
      "**複數不加撇號的陷阱**：kind's 這種寫法在會考中一定是錯的。"
    ],
    "strategy": [
      "背固定片語清單：a kind of、kinds of、a cup of、a piece of、a lot of，整組背不要拆開。",
      "用中文提示法：看到「各種」「每種」就先在草稿寫 kinds，再往後接 of。",
      "檢查介系詞：寫完後從頭到尾掃描一遍所有介系詞，確認後面都有受詞。",
      "複數一次寫完整：kind 記得加 s，寫成 kind 之後再往後接詞之前先回頭補字尾。",
      "句型填空練習：把 He is good at ____. 這種題型找五題來做，答案一定是 kinds of animals。"
    ]
  },
  "all kinds of animals": {
    "zh": "各種各樣的動物",
    "ipa": "ɔːl kaɪndz əv ˈæn.ɪ.məlz",
    "intro": "針對您提供的片語 **all kinds of animals**，這是「限定詞 all＋名詞複數 kinds of＋名詞複數」的名詞片語，本身不能單獨成句。加上 all 之後語氣更強，表示「所有的種類、各式各樣的」，因此三個部分的位置和單複數都必須完全正確。",
    "headline": "all 修飾 kinds；all 之後不要再加 of",
    "structure": [
      {
        "role": "限定詞",
        "token": "all",
        "pos": "限定詞 (Determiner) — 相當於形容詞",
        "func": "修飾後面的名詞複數 kinds，表示「所有的、各式各樣的」，位置一定在名詞之前",
        "mark": "O"
      },
      {
        "role": "前中心名詞",
        "token": "kinds",
        "pos": "名詞 (Noun) — kind 的複數",
        "func": "片語的核心名詞，與 all 搭配表示多種並存",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "kinds of 固定搭配，連接「種類」與被分類的對象，前面已經有 all 就不需要再加 of",
        "mark": "O"
      },
      {
        "role": "後中心名詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "被分類的對象，泛指動物整群，所以用複數 animals",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "限定詞位置錯誤（all 之後多加一個 of）",
        "bad": "(X) He is good **at all of kinds of animals**. ／ (X) I saw **all of the kinds** of animals.",
        "ok": "(O) He is good **at all kinds of animals**.",
        "why": "of 在 kinds of 這個片語裡已經把 kinds 與 animals 綁在一起，前面再加 all of 會變成多餘的 of，句子結構就散了。中文「所有各種的動物」有兩個「的」，學生容易照著翻成 all of kinds of。判斷法：of 的數量要對應，all kinds of animals 只有一個 of；寫完後數一數 of 有幾個，出現兩個以上就要檢查。",
        "exOkText": "(O) The teacher talked about **all kinds of animals** in class.",
        "exOkZh": "老師在課堂上談了各種各樣的動物。",
        "exBadText": "(X) The teacher talked about **all of kinds of animals** in class.",
        "exBadNote": "錯誤：all 與 kinds 之間多加了 of，固定搭配被拆開。"
      },
      {
        "title": "單複數不一致（all 之後的名詞沒有變複數）",
        "bad": "(X) She is afraid **of all kind of animals**. ／ (X) He doesn't like **all kind animals**.",
        "ok": "(O) She is afraid **of all kinds of animals**.",
        "why": "all 後面一定要接可數名詞的複數，前面一個 all 就已經代表「全部」了，後面再用單數會語意不通。中文「所有動物」直接翻成 all animal，學生很容易忘記加 s。判斷法：all、both、many、most、some 這五個限定詞後面全部只接複數，寫完立刻檢查字尾有沒有 s。",
        "exOkText": "(O) Our school has **all kinds of animals** in its garden.",
        "exOkZh": "我們學校花園裡有各式各樣的動物。",
        "exBadText": "(X) Our school has **all kind animal** in its garden.",
        "exBadNote": "錯誤：all 後面的 kind 與 animal 都要變成複數。"
      },
      {
        "title": "語序錯誤（片語被拆開，形容詞群跑到名詞後面）",
        "bad": "(X) She is afraid of **animals of all kinds**. ／ (X) He kept **animals all kinds of** at home.",
        "ok": "(O) She is afraid of **all kinds of animals**.",
        "why": "英文形容性質的片語必須整個放在它所修飾的名詞前面，順序是 all → kinds → of → animals，中間不能被拆開也不能倒過來。這是中文「動物各種各樣」語序直接搬過來造成的錯誤。判斷法：把片語整組當一個方塊看待，寫的時候一次寫完，不在中間插入別的詞；看到 of 之後接動物名詞才是正確順序。",
        "exOkText": "(O) The zoo cares for **all kinds of animals**.",
        "exOkZh": "這座動物園照顧各式各樣的動物。",
        "exBadText": "(X) The zoo cares for **animals of all kinds**.",
        "exBadNote": "錯誤：片語順序顛倒，all kinds of 必須放在 animals 前面。"
      },
      {
        "title": "拼字錯誤（all 漏字母或 animals 拼錯）",
        "bad": "(X) I read about **al kinds of animels**. ／ (X) I read about **all kind of animal**.",
        "ok": "(O) I read about **all kinds of animals**.",
        "why": "all 只有三個字母，必須是 a-l-l 三個都要在，少一個 l 變成 al 就變成別的字。animals 則是 animal 加 s，字母順序不能顛倒成 animels。會考單字題常以小錯的形式出題，學生看到就選。判斷法：all 這種短單字寫完後逐字點一遍；動物相關的單字統一抄在一起，用手指唸 an-i-ma-ls 檢查。",
        "exOkText": "(O) Scientists study **all kinds of animals** in the world.",
        "exOkZh": "科學家研究世界各地各種各樣的動物。",
        "exBadText": "(X) Scientists study **al kinds of animels** in the world.",
        "exBadNote": "錯誤：al 應為 all，animels 應為 animals，兩處拼字都錯。"
      }
    ],
    "traps": [
      "**all 之後接複數的陷阱**：all kinds、all students 全部要加 s，這是克漏字最常見的扣分點。",
      "**多餘 of 的陷阱**：all of kinds of 是典型錯誤寫法，只出現一個 of 才是正確的。",
      "**片語不可拆的陷阱**：會考選項常把 all kinds of animals 重新排列，順序還原不對就會選錯。",
      "**短單字拼寫的陷阱**：al、alls、animals 拼錯字時，句子仍可能被讀懂，但會考一律判錯。"
    ],
    "strategy": [
      "把片語當成一個方塊：all kinds of animals 整組背、整組寫，永遠不要拆開。",
      "限定詞清單背熟：all、both、half、many、most、few、some 後面只接複數，寫完就檢查。",
      "of 數一遍：每寫完一句，数一數 of 的數量，該有一個的地方出現兩個就是錯。",
      "用中英對照檢查：把「各種各樣的動物」與 all kinds of animals 寫成兩欄對照，練語序。",
      "句型替換練習：把 animals 換成 books、foods 各造一句，確認你會套用到任何名詞。"
    ]
  },
  "with all kinds of animals": {
    "zh": "和各種各樣的動物在一起",
    "ipa": "wɪð ɔːl kaɪndz əv ˈæn.ɪ.məlz",
    "intro": "針對您提供的片語 **with all kinds of animals**，這是以介系詞 with 開頭的介系詞片語，本身不能單獨成句，通常放在動詞後面表示「和……一起」或作 be 動詞後的表語。with 後面接的必須是名詞或名詞片語，不能接動詞原形。",
    "headline": "with 後面只能接名詞或名詞片語",
    "structure": [
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "片語的起點，表示「和……一起、帶著」，後面必須有名詞或名詞片語當受詞",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "all",
        "pos": "限定詞 (Determiner)",
        "func": "修飾 kinds，表示「各種各樣的」，只能放在名詞前面",
        "mark": "O"
      },
      {
        "role": "前中心名詞",
        "token": "kinds",
        "pos": "名詞 (Noun) — kind 的複數",
        "func": "與 all 搭配，表示「多種」並存",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "kinds of 固定搭配，表示「……的種類」，不能被其他介系詞取代",
        "mark": "O"
      },
      {
        "role": "後中心名詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數",
        "func": "整個介系詞片語的受詞核心，泛指動物整群",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（把 with 換成 to、for 或 of）",
        "bad": "(X) She is good **to all kinds of animals**. ／ (X) He has a fear **of all kinds of animals**.",
        "ok": "(O) She is good **with all kinds of animals**.",
        "why": "with 表示「和……一起相處」，是這個語境固定要用的介系詞，不能用 to、for、of 取代。學生常因中文「對動物很好」而選 to。判斷法：把 with 的意思記成「一起」，凡是要表達「跟……一起做、對……有經驗、待在一起」，第一個念頭就要跳出 with。",
        "exOkText": "(O) My sister plays **with all kinds of animals** at the farm.",
        "exOkZh": "我姊姊在農場和各種動物一起玩。",
        "exBadText": "(X) My sister plays **to** all kinds of animals at the farm.",
        "exBadNote": "錯誤：play 表示「和……一起玩」要用 with，不能用 to。"
      },
      {
        "title": "with 與 and 混淆（用連接詞代替介系詞）",
        "bad": "(X) She is good **and all kinds of animals**. ／ (X) He lives **and cats** now.",
        "ok": "(O) She is good **with all kinds of animals**.",
        "why": "中文的「和」在句子裡常被直接翻成 and，但 and 只能用來連接兩個相同的詞類（名詞和名詞、動詞和動詞），不能接在動詞後面表示「和某人一起」。表示「和某人一起」要用 with。判斷法：看到動詞後面還要再帶一個對象，就用介系詞 with；只有當兩個詞詞性相同、地位平行時才用 and。",
        "exOkText": "(O) She works **with doctors and nurses** every day.",
        "exOkZh": "她每天和醫生、護士一起工作。",
        "exBadText": "(X) She works and doctors and nurses every day.",
        "exBadNote": "錯誤：表示「和……一起」要用 with，不能用 and。"
      },
      {
        "title": "介系詞後接動詞原形（with have、with be）",
        "bad": "(X) She is good **with have animals**. ／ (X) He likes staying **with be** with his dog.",
        "ok": "(O) She is good **with having animals**.",
        "why": "介系詞後面一定要接名詞或名詞片語當受詞，不能直接接動詞原形。如果要把動詞放進來，必須改成動名詞 -ing 或名詞化。學生常看到中文「和養動物」就直接把 have 擺上去。判斷法：寫完介系詞先停下來，檢查後面的字是名詞還是動詞；是動詞就立刻加 -ing。",
        "exOkText": "(O) He is good **with dealing with frightened animals**.",
        "exOkZh": "他很會應付受驚的動物。",
        "exBadText": "(X) He is good **with deal** with frightened animals.",
        "exBadNote": "錯誤：介系詞 with 後面要用動名詞 dealing，不能用原形 deal。"
      },
      {
        "title": "發音錯誤（把 with 唸成 /wɪθ/）",
        "bad": "(X) 唸成 /wɪθ/（清音），或漏掉 ð 的舌頭動作。",
        "ok": "(O) /wɪð/（齒音，舌尖輕觸上齒）",
        "why": "with 裡面的 th 是清音還是濁音要靠後面的聲音判斷：the、this、they 用濁音 /ð/，think、three、thin 用清音 /θ/。with 後面接的是原音開頭的名詞或片語，所以用濁音 /ð/，舌尖要碰到上齒。判斷法：唸 with 時若後面接 the、a、this，就用 /ð/；接 think、three、thin 就用 /θ/。",
        "exOkText": "(O) She stays **with** /wɪð/ her pets all day.",
        "exOkZh": "她整天和她的寵物待在一起。",
        "exBadText": "(X) She stays **with** /wɪθ/ her pets all day.",
        "exBadNote": "錯誤：with 應唸濁音 /wɪð/，不是清音 /wɪθ/。"
      }
    ],
    "traps": [
      "**with 不能換成 and 的陷阱**：play with、stay with、work with 這些固定說法，會考常放 and 當錯誤選項。",
      "**介系詞後接動詞的陷阱**：with 後面出現 have、be、do 時一律是錯的，必須名詞化。",
      "**with 與 for 的意義差異陷阱**：with 表示「一起」，for 表示「為了、給」，兩者不能互換。",
      "**th 音的陷阱**：口語題中 with 唸成 /wɪθ/ 會被判定為發音錯誤。"
    ],
    "strategy": [
      "整理 with 片語表：play with、stay with、work with、good with，寫在筆記本同一頁。",
      "遇到 and 先問詞性：兩邊詞性不一樣就不能用 and，改用 with。",
      "介系詞後停三秒：寫完 with、of、in 之類，檢查後面是名詞還是動詞。",
      "唸 th 音時照鏡子：看舌尖有沒有碰到上齒，碰到才是正確的 /ð/。",
      "整組默寫：每週默寫一次 with all kinds of animals，檢查介系詞與複數都正確。"
    ]
  },
  "being with all kinds of animals": {
    "zh": "和各種各樣的動物待在一起",
    "ipa": "ˈbiː.ɪŋ wɪð ɔːl kaɪndz əv ˈæn.ɪ.məlz",
    "intro": "針對您提供的片語 **being with all kinds of animals**，這是一個動名詞片語，開頭的 being 不能單獨當動詞用，也不能自己成為一個完整句子，通常放在動詞後面當受詞。整個片語的意思是「和各種動物待在一起」，重點在 being 必須寫成動名詞形式。",
    "headline": "being 是動名詞；當主詞時動詞要用單數",
    "structure": [
      {
        "role": "動名詞",
        "token": "being",
        "pos": "動名詞 (Gerund) — be 動詞的 -ing 形式",
        "func": "把動作 be 變成名詞化的片語，可以放動詞後面當受詞，也可以自己當主詞",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "表示「和……一起」，後面接名詞片語；being with 是固定搭配",
        "mark": "O"
      },
      {
        "role": "名詞片語",
        "token": "all kinds of animals",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整組作為 with 的受詞，表示被分類的對象；用複數表示泛指",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動名詞與原形 be 混淆（漏掉 -ing）",
        "bad": "(X) She enjoys **be with all kinds of animals**. ／ (X) **Be with all kinds of animals** is fun.",
        "ok": "(O) She enjoys **being with all kinds of animals**.",
        "why": "being 是 be 動詞加上 -ing 形成的動名詞，用來把動作變成可以當名詞使用的形式。學生常覺得 be 已經是動詞了，不用再加 -ing，於是寫出 enjoys be 這種句子。判斷法：看 being 前面是什麼——後面接動詞（enjoys、likes、hates）時一定是動名詞；後面沒有動詞、自己在句子開頭當主詞時，也是動名詞。",
        "exOkText": "(O) He doesn't like **being alone** at home.",
        "exOkZh": "他不喜歡一個人待在家裡。",
        "exBadText": "(X) He doesn't like **be** alone at home.",
        "exBadNote": "錯誤：like 後面要用動名詞 being，不能用原形 be。"
      },
      {
        "title": "拼寫錯誤（beeing、been 誤用）",
        "bad": "(X) She enjoys **beeing** with all kinds of animals. ／ (X) She enjoys **been** with all kinds of animals.",
        "ok": "(O) She enjoys **being** with all kinds of animals.",
        "why": "being 只能由 be 加 -ing 構成，正確拼法是 b-e-i-n-g，中間是 ei 兩個字母。beeing 多寫一個 e，been 則是 be 的過去分詞，兩者都不能當動名詞使用。判斷法：背三個 be 的衍生形——am／is／are、was／were、been、being，being 專門負責「動作名詞化」的工作，看到就要想到它。",
        "exOkText": "(O) Being a **doctor** is not easy.",
        "exOkZh": "當醫生並不容易。",
        "exBadText": "(X) Being a **doctor** are not easy.",
        "exBadNote": "錯誤：動名詞作主詞時，後面的動詞要用單數 is。"
      },
      {
        "title": "主詞與動詞不一致（動名詞當主詞卻用複數動詞）",
        "bad": "(X) **Being with all kinds of animals are** fun for children.",
        "ok": "(O) **Being with all kinds of animals is** fun for children.",
        "why": "動名詞片語當主詞時，整組被視為一個單一概念，後面的動詞要用單數 is。學生看到片語裡面有 all kinds of animals 這種複數名詞，就順手把動詞也變成 are。判斷法：不管主詞片語裡面有幾個名詞，只要主詞是「動作」開頭的動名詞片語，動詞一律用單數；只有描述兩個以上並列的人或物時才用 are。",
        "exOkText": "(O) **Keeping pets is** a big responsibility.",
        "exOkZh": "養寵物是一項很大的責任。",
        "exBadText": "(X) **Keeping pets are** a big responsibility.",
        "exBadNote": "錯誤：動名詞片語作主詞，後面的動詞要用單數 is。"
      },
      {
        "title": "介系詞搭配誤用（with 換成 to 或 of）",
        "bad": "(X) She enjoys being **to all kinds of animals**. ／ (X) He is used **of being** with cats.",
        "ok": "(O) She enjoys being **with all kinds of animals**.",
        "why": "being with 表示「和……待在一起」，介系詞已經被固定在這個搭配裡，不能替換成 to 或 of。學生看到中文「跟動物相處」容易想到 to。判斷法：把 enjoy、be used、be good 這些常搭配的動詞與 with 綁在一起背，成對記憶最不容易錯。",
        "exOkText": "(O) I am **used to being** around many animals.",
        "exOkZh": "我習慣和很多動物待在一起。",
        "exBadText": "(X) I am **used to being of** around many animals.",
        "exBadNote": "錯誤：being 後面接 with 表示「和……一起」，不能用 of。"
      }
    ],
    "traps": [
      "**動名詞必加 -ing 的陷阱**：enjoys、likes、hates 之後接動作，必須用 -ing 形式，不能用原形。",
      "**being 拼字的陷阱**：beeing 與 been 都是錯的寫法，being 只有一種拼法。",
      "**動名詞作主詞用單數的陷阱**：片語裡面有複數名詞時，動詞仍然用 is。",
      "**being with 固定搭配的陷阱**：會考選項常放 being to、being of 都是錯的。"
    ],
    "strategy": [
      "把 be 的四種形式畫成一格：am/is/are、was/were、been、being，寫在單字頁最下方。",
      "凡遇 enjoys／likes／hates 就自動加 -ing：寫完動詞立刻在腦中補上 being。",
      "動名詞當主詞的句型抄三句：Being a student is fun. 每天唸一次。",
      "介系詞搭配表：be good with、be used to being、enjoy being，寫成一列背。",
      "用替換練習：把 animals 換成 books、classmates 各寫一句，確認你能套用到任何名詞。"
    ]
  },
  "enjoys being": {
    "zh": "喜歡待在",
    "ipa": "ɪnˈdʒɔɪz ˈbiː.ɪŋ",
    "intro": "針對您提供的片語 **enjoys being**，這是「動詞＋動名詞」的片語，本身不能單獨成句，必須補上主詞與後面的內容。enjoys 已經是第三人稱單數形式，後面接動作時要用動名詞 being，整個結構是會考很常見的考點。",
    "headline": "第三人稱單數加 -s；enjoy 後接動名詞",
    "structure": [
      {
        "role": "動詞",
        "token": "enjoys",
        "pos": "動詞 (Verb) — enjoy 的第三人稱單數現在式",
        "func": "表示「喜歡」，主詞是第三人稱單數所以字尾要加 s；後面可以直接接受詞",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "being",
        "pos": "動名詞 (Gerund) — be 動詞的 -ing 形式",
        "func": "當 enjoys 的受詞，把「待在某處」這個動作名詞化，放在動詞後面",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數形式錯誤（漏掉字尾 -s）",
        "bad": "(X) Tara **enjoy** being with animals. ／ (X) He **enjoy** reading books.",
        "ok": "(O) Tara **enjoys** being with animals.",
        "why": "enjoy 是動詞，當主詞是第三人稱單數（Tara、he、she、it、單數名詞）時，現在式必須加 -s 變成 enjoys。台灣學生常覺得加 s 是複數專屬，忘了動詞也有第三人稱單數的變化。判斷法：寫完主詞先看是「他」還是「他們」，單數加 s，複數用原形；口訣是一個 s 三個地方——名詞複數、動詞三單、名詞所有格。",
        "exOkText": "(O) My father **enjoys** cooking on weekends.",
        "exOkZh": "我爸爸喜歡週末做菜。",
        "exBadText": "(X) My father **enjoy** cooking on weekends.",
        "exBadNote": "錯誤：主詞 My father 是第三人稱單數，動詞要加 s 變成 enjoys。"
      },
      {
        "title": "不定式誤用（enjoy 後接 to be）",
        "bad": "(X) Tara **enjoys to be** with animals. ／ (X) He **enjoys to be** alone at home.",
        "ok": "(O) Tara **enjoys being** with animals.",
        "why": "enjoy 這個動詞後面只能接動名詞（-ing 形式），不能接不定式 to do。少數動詞可以兩種都接，例如 want、like、hate、prefer，但 enjoy 不行。學生常因為中文「喜歡去公園」裡有「去」，就直接寫上 to。判斷法：把 enjoy、finish、mind、avoid 這幾個「只能接 -ing」的動詞整理成一張小表，看到就排除 to do。",
        "exOkText": "(O) We **enjoy** hiking in the mountains every fall.",
        "exOkZh": "我們每年秋天都喜歡去山上健行。",
        "exBadText": "(X) We **enjoy** to hike in the mountains every fall.",
        "exBadNote": "錯誤：enjoy 後面只能接動名詞 hiking，不能用 to hike。"
      },
      {
        "title": "動詞拼寫錯誤（enjoies、enjoys 多一個字母）",
        "bad": "(X) Tara **enjoies** being with animals. ／ (X) She **enjoyss** reading at night.",
        "ok": "(O) Tara **enjoys** being with animals.",
        "why": "enjoy 加上第三人稱單數的 -s 時，直接把 s 接在 y 後面變成 enjoys，不會變成 enjoies。很多學生看到 y 結尾就以為要把 y 變成 i 再加 es，那是 study、fly 這類「輔音＋y」結尾才有的規則。判斷法：y 前面是母音（a e i o u）時直接加 s；y 前面是輔音才變 y 為 i 再加 es。enjoy 的 y 前面是 o，所以直接加 s。",
        "exOkText": "(O) Nora **enjoys** watching documentaries.",
        "exOkZh": "諾拉喜歡看紀錄片。",
        "exBadText": "(X) Nora **enjoies** watching documentaries.",
        "exBadNote": "錯誤：正確拼法是 enjoys，y 前是母音 o，無法則變成 enjoies。"
      },
      {
        "title": "詞義選擇錯誤（enjoy 直接搭配動物名詞）",
        "bad": "(X) Tara **enjoys dogs**. ／ (X) I **enjoy cats** very much.",
        "ok": "(O) Tara **likes dogs** very much.",
        "why": "enjoy 表示「享受某個過程或活動」，後面通常接動名詞或抽象的經驗，不習慣直接接動物這種具體名詞。要表達「喜歡動物」，用 like、love 才是自然英文。台灣學生常因中文都是「喜歡」而一律用 enjoy。判斷法：enjoy 後面問一句「這是一個動作嗎？」是就用 being／doing；是一個單獨的名詞時，換成 like 或 love。",
        "exOkText": "(O) Kids usually **like** small **animals**.",
        "exOkZh": "小孩通常喜歡小動物。",
        "exBadText": "(X) Kids usually **enjoy** small **animals**.",
        "exBadNote": "錯誤：喜歡某種動物用 like 較自然，enjoy 後面接動名詞或經驗。"
      }
    ],
    "traps": [
      "**三單 -s 的陷阱**：會考會把 enjoy 與 enjoys 當成兩個選項，判斷關鍵只有一個——主詞是不是單數。",
      "**enjoy + to do 的陷阱**：只有 want、would like、decide 等動詞能接 to do，enjoy 不行。",
      "**y 結尾變化的陷阱**：enjoys 與 studies 拼法不同，enjoy 的 y 前是母音，只能直接加 s。",
      "**enjoy 與 like 的語意陷阱**：喜歡某個具體東西用 like，享受某個過程才用 enjoy。"
    ],
    "strategy": [
      "先確認主詞：寫動詞前先看主詞是單數還是複數，單數就自動加 s。",
      "整理只能接 -ing 的動詞：enjoy、finish、mind、avoid、practice，做成一張小表貼在課本旁。",
      "y 結尾規則複習：y 前母音加 s、y 前輔音變 ies，寫 enjoys 時唸一次這個規則。",
      "口說練習：把 I enjoy being. 唸出來再自己造一句短的，動名詞就會變得自然。",
      "檢查兩次：寫完後回頭看動詞字尾，再看後面是不是 being，兩個都對才算完成。"
    ]
  },
  "enjoys being with all kinds of animals": {
    "zh": "喜歡和各種各樣的動物待在一起",
    "ipa": "ɪnˈdʒɔɪz ˈbiː.ɪŋ wɪð ɔːl kaɪndz əv ˈæn.ɪ.məlz",
    "intro": "針對您提供的片語 **enjoys being with all kinds of animals**，這是「動詞＋動名詞＋介系詞片語」的完整受詞結構，本身仍然不能單獨成句，前面要有主詞。它把 enjoy 的用法、being 的動名詞形式，以及 with all kinds of animals 這個名詞片語三個重點串在一起。",
    "headline": "enjoy 加 -s；being 加 with；名詞片語不拆開",
    "structure": [
      {
        "role": "動詞",
        "token": "enjoys",
        "pos": "動詞 (Verb) — enjoy 的第三人稱單數現在式",
        "func": "表示「喜歡」，字尾的 s 是第三人稱單數的標記",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "being",
        "pos": "動名詞 (Gerund) — be 的 -ing 形式",
        "func": "enjoys 的受詞，把「待著」這個動作名詞化；enjoy 後面只能接 -ing 形式",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "表示「和……一起」，搭配 being 構成 being with，後面接名詞片語",
        "mark": "O"
      },
      {
        "role": "名詞片語",
        "token": "all kinds of animals",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "作為 with 的受詞，整組放在 being 後面，修飾語不可拆開或移到後面",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（with 換成 to、for 或 at）",
        "bad": "(X) Tara enjoys being **to all kinds of animals**. ／ (X) He enjoys being **for all kinds of animals**.",
        "ok": "(O) Tara enjoys being **with all kinds of animals**.",
        "why": "being with 是固定搭配，表示「和……待在一起」，介系詞已經綁定不能替換。學生常把中文「和動物相處」的「和」直接想成 for 或 to。判斷法：把 enjoys being 與 enjoys doing 當成一組，把 with 當成後半段的固定開頭；整段以 with 起頭往後唸一次，就不容易記錯。",
        "exOkText": "(O) She enjoys being **with her grandparents** on Sundays.",
        "exOkZh": "她喜歡星期天和祖父母待在一起。",
        "exBadText": "(X) She enjoys being **to her grandparents** on Sundays.",
        "exBadNote": "錯誤：being 後面表示「和……一起」要用 with，不能用 to。"
      },
      {
        "title": "結構誤用（enjoy 後面接不定式 to be）",
        "bad": "(X) Tara enjoys **to be with** all kinds of animals. ／ (X) He enjoys **to be** a vet.",
        "ok": "(O) Tara enjoys **being with** all kinds of animals.",
        "why": "enjoy 是只能接動名詞的動詞，後面必須是 -ing 形式，不能用 to do。中文「喜歡當獸醫」的「當」很容易讓人直接寫上 to be。判斷法：寫 enjoy 時先在腦中默念 enjoy doing，確認後面接的是 -ing 形式；再檢查 be 動詞是否已經變成 being。",
        "exOkText": "(O) I enjoy **taking care of** my sister's dog.",
        "exOkZh": "我喜歡幫忙照顧我姐姐的狗。",
        "exBadText": "(X) I enjoy **to take care of** my sister's dog.",
        "exBadNote": "錯誤：enjoy 後面只能接動名詞，不能用不定式 to take。"
      },
      {
        "title": "語序錯誤（把名詞片語搬到動詞前面）",
        "bad": "(X) All kinds of animals Tara enjoys being with. ／ (X) With all kinds of animals she likes to stay.",
        "ok": "(O) Tara enjoys being with all kinds of animals.",
        "why": "英文先講主詞與動作，再補上說明內容；學生常受中文「各種動物塔拉喜歡待在一起」的語序影響，把受詞片語搬到最前面。判斷法：受詞一定要在動詞之後，寫完 enjoys 之後才開始寫 being、with，最後才寫名詞；順序是 enjoys → being → with → animals。",
        "exOkText": "(O) Our teacher enjoys teaching **many kinds of animals** science.",
        "exOkZh": "我們老師喜歡教許多種類的動物相關知識。",
        "exBadText": "(X) Many kinds of animals our teacher enjoys teaching science.",
        "exBadNote": "錯誤：受詞片語必須放在動詞 enjoys 之後，不能搬到句首。"
      },
      {
        "title": "拼字與複數錯誤（enjoies、animels 混用）",
        "bad": "(X) Tara enjoys being with all kinds of **animels**. ／ (X) Tara **enjoies** being with all kinds of animals.",
        "ok": "(O) Tara enjoys being with all kinds of animals.",
        "why": "這個片語裡有兩個容易出錯的地方：動詞 enjoys 的拼法，以及 animals 複數的拼法。animels 多了一個 e，而複數規則只在字尾加 s；enjoys 的 y 前面是母音 o，所以直接加 s，不會變成 enjoies。判斷法：把 enjoys 與 animals 這兩個字單獨抄在便條上，每天唸一次並確認字尾。",
        "exOkText": "(O) Kevin enjoys being **with different kinds of animals**.",
        "exOkZh": "凱文喜歡和不同種類的動物待在一起。",
        "exBadText": "(X) Kevin **enjoies** being with different kinds of **animels**.",
        "exBadNote": "錯誤：enjoys 與 animals 兩處拼字都錯，複數不需加 e。"
      }
    ],
    "traps": [
      "**enjoy 只能接 -ing 的陷阱**：enjoys to be 是會考最常見的錯誤選項，看到 to 就刪掉。",
      "**being with 不能拆的陷阱**：with all kinds of animals 要整組接在 being 後面。",
      "**複數字尾 -s 的陷阱**：animels、kinds of animal 都是常見的錯誤寫法。",
      "**受詞位置的陷阱**：會考選項常把受詞片語重新排列，順序還原不對就會選錯。"
    ],
    "strategy": [
      "畫出結構圖：enjoys → being → with → animals，寫的時候照著箭頭一個一個填。",
      "先把最熟的 enjoy doing 寫順，再往後接 with 那一段，分段學習比較輕鬆。",
      "複數字尾檢查：每次寫完 nouns，檢查前一個詞是 many、all kinds 還是 the。",
      "整句默寫：每天默寫一次這個片語，隔天用眼睛檢查三個重點：s、ing、of。",
      "延伸造句：把 animals 換成 books、children、sports 各寫一句，確認你能自由替換。"
    ]
  },
  "Tara enjoys being with all kinds of animals": {
    "zh": "塔拉喜歡和各種各樣的動物待在一起",
    "ipa": "ˈtær.ə ɪnˈdʒɔɪz ˈbiː.ɪŋ wɪð ɔːl kaɪndz əv ˈæn.ɪ.məlz",
    "intro": "針對您提供的句子 **Tara enjoys being with all kinds of animals**，這是一個可以單獨成句的完整句子，結構是「主詞＋動詞＋動名詞＋介系詞片語」。它把本課文的四個重點全部收進來：專有名詞大寫、動詞第三人稱單數、enjoy 後接動名詞，以及名詞片語的固定順序。",
    "headline": "專有名詞大寫；enjoy 加 -s 且接動名詞",
    "structure": [
      {
        "role": "主詞",
        "token": "Tara",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "句子的主角，表示是誰喜歡；人名的第一個字母一定要大寫",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "enjoys",
        "pos": "動詞 (Verb) — enjoy 的第三人稱單數現在式",
        "func": "表示「喜歡」，主詞是單數人名所以字尾加 s；後面直接接受詞",
        "mark": "O"
      },
      {
        "role": "動名詞",
        "token": "being",
        "pos": "動名詞 (Gerund) — be 的 -ing 形式",
        "func": "enjoys 的受詞，把「待著」這個動作名詞化；enjoy 後面不能接 to do",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "搭配 being 表示「和……一起」，後面接名詞或名詞片語",
        "mark": "O"
      },
      {
        "role": "名詞片語",
        "token": "all kinds of animals",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "with 的受詞，整組放在 being 後面，修飾語 all kinds of 不可拆開或後移",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "專有名詞大小寫錯誤（Tara 寫成 tara）",
        "bad": "(X) **tara** enjoys being with all kinds of animals.",
        "ok": "(O) **Tara** enjoys being with all kinds of animals.",
        "why": "Tara 是人名，屬於專有名詞，第一個字母一定要大寫。中文人名沒有大小寫的區別，所以學生在快速書寫時常順手打成小寫，整句讀起來仍然通順，卻在會考的改錯題或單字題被判錯。判斷法：句子開頭第一個字一定大寫；句中出現的人名、地名、學校名也一律大寫，寫完後用手指從頭掃到尾確認一次。",
        "exOkText": "(O) **Tara** often reads books about dogs.",
        "exOkZh": "塔拉常常讀關於狗的書。",
        "exBadText": "(X) **tara** often reads books about dogs.",
        "exBadNote": "錯誤：人名 Tara 是專有名詞，第一個字母必須大寫。"
      },
      {
        "title": "第三人稱單數形式錯誤（enjoy 漏掉 -s）",
        "bad": "(X) Tara **enjoy** being with all kinds of animals. ／ (X) He **enjoy** being with pets.",
        "ok": "(O) Tara **enjoys** being with all kinds of animals.",
        "why": "主詞 Tara 是第三人稱單數，動詞 enjoy 在現在式必須變成 enjoys。學生常以為加 s 是名詞複數專屬的規則，忽略動詞也有三單變化。判斷法：寫完主詞先確認是「他」還是「他們」，單數加 s、複數用原形；記住「一個 s 三個地方」——名詞複數、動詞三單、所有格。",
        "exOkText": "(O) My sister **enjoys** visiting the aquarium on Sundays.",
        "exOkZh": "我姊姊喜歡星期天去水族館。",
        "exBadText": "(X) My sister **enjoy** visiting the aquarium on Sundays.",
        "exBadNote": "錯誤：主詞是單數第三人稱，動詞要用 enjoys。"
      },
      {
        "title": "受詞結構錯誤（enjoy 後接不定式 to be）",
        "bad": "(X) Tara enjoys **to be with** all kinds of animals. ／ (X) She enjoys **to be** a teacher.",
        "ok": "(O) Tara enjoys **being with** all kinds of animals.",
        "why": "enjoy 是只能接受動名詞的動詞，後面必須接 -ing 形式；中文「喜歡當老師」的「當」會讓人直接寫出 to be。少數動詞如 want、would like、decide 可以接 to do，但 enjoy 不行。判斷法：整理「只能接 -ing」的動詞清單（enjoy、finish、mind、avoid、practice），看到它們就先把 to 刪掉。",
        "exOkText": "(O) Tara enjoys **learning** about different animals.",
        "exOkZh": "塔拉喜歡學習各種動物的知識。",
        "exBadText": "(X) Tara enjoys **to learn** about different animals.",
        "exBadNote": "錯誤：enjoy 後面只能接動名詞 learning，不能用 to learn。"
      },
      {
        "title": "語序錯誤（受詞片語被搬到主詞前面）",
        "bad": "(X) All kinds of animals Tara enjoys being with. ／ (X) Being with all kinds of animals Tara likes it.",
        "ok": "(O) Tara enjoys being with all kinds of animals.",
        "why": "英文的順序是「誰＋做什麼＋對什麼」，主詞一定在最前面，整段受詞一定在動詞之後。學生受中文「各種動物塔拉喜歡待在一起」影響，會把名詞片語放到最前面，變成沒有動詞的殘句。判斷法：寫之前先在草稿畫三格——主詞格、動詞格、受詞格，依序填入就不會亂。",
        "exOkText": "(O) Tara enjoys being **with all kinds of animals** at the farm.",
        "exOkZh": "塔拉喜歡在農場和各種各樣的動物待在一起。",
        "exBadText": "(X) With all kinds of animals at the farm Tara enjoys being.",
        "exBadNote": "錯誤：介系詞片語必須放在動詞 enjoys 之後，不能搬到句首。"
      }
    ],
    "traps": [
      "**人名大寫的陷阱**：會考會把 tara 當成錯誤選項，專有名詞的規則不會因為句子通順而改變。",
      "**三單 -s 的陷阱**：enjoy 與 enjoys 只差一個 s，判斷只有主詞單複數一個依據。",
      "**enjoy + to do 的陷阱**：enjoys to be 是最常見的錯誤配對，看到 to 就要停下來。",
      "**受詞位置與結構的陷阱**：把 with all kinds of animals 拆開或移到句首，句子就不完整。"
    ],
    "strategy": [
      "先寫三格草稿：主詞、動詞、受詞，依序填寫就不會把片語放錯位置。",
      "檢查清單化：寫完後依序檢查三件事——Tara 大寫了嗎、enjoys 有 s 嗎、後面是 being 嗎。",
      "enjoy + doing 變成反射動作：寫到 enjoys 就不假思索接 being，之後再補 with 那段。",
      "整句朗讀五遍：唸到 all kinds of animals 這個單位要一口氣唸完，語感會幫你鎖定順序。",
      "擴寫成短文：用這句話再寫兩句，例如 Tara takes care of them on weekends，語意會更完整。"
    ]
  },
  "snake": {
    "zh": "蛇",
    "ipa": "sneɪk",
    "intro": "針對您提供的單字 **snake**，這是一個可以單獨使用的單字（名詞），不是完整句子，但它是句子裡最重要的主詞或受詞。意思是「蛇」，屬於可數名詞，複數為 snakes。最該注意的，是字尾 -ke 的拼寫、a_e 母音唸長音 /eɪ/，以及它和 sneak「偷偷溜走」只差一個字母。",
    "headline": "snake 拼 -ke、a_e 長音、複數加 -s",
    "structure": [
      {
        "role": "詞彙本體",
        "token": "snake",
        "pos": "名詞 (Noun) — 可數名詞、單數",
        "func": "指「蛇」這種動物，單獨寫出來就已經完整表達意思，可以放主詞或受詞的位置",
        "mark": "O"
      },
      {
        "role": "拼寫特徵",
        "token": "-ake",
        "pos": "字母組合 (Letter Pattern)",
        "func": "s-n-a-k-e 共五個字母，a 與 k 之間的 e 絕對不能漏，漏掉就變成另一個字 snak",
        "mark": "O"
      },
      {
        "role": "音節與母音",
        "token": "a_e",
        "pos": "母音組合 (Vowel Pattern)",
        "func": "a 和 e 之間隔著一個輔音，這種 a_e 組合母音要唸長音 /eɪ/，和 make、cake 相同",
        "mark": "O"
      },
      {
        "role": "變化形式",
        "token": "snakes",
        "pos": "複數形式 (Plural Form)",
        "func": "snake 是規則名詞，複數直接加 -s，唸成 /sneɪks/，尾音多一個 /s/",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼寫錯誤（漏掉字尾的 -e）",
        "bad": "(X) snak ／ (X) a snak",
        "ok": "(O) snake ／ (O) a snake",
        "why": "snake 必須寫成 s-n-a-k-e 五個字母，最後的 e 不能省略。這個 e 不是裝飾，它決定前面 a 的唸法：只有在 a 和 k 之間有這個 e，母音才會唸成長音 /eɪ/；漏掉 e 變成 snak，母音就自動變成短音 /æ/，聽起來變成另一個字。台灣學生常覺得「snak 看起來就夠了」而少寫一字母，會考單字題和完形填空都會因此被扣分。判斷法：寫完 snake 立刻檢查最後一格有沒有 e。",
        "exOkText": "(O) A **snake** lives in the grass.",
        "exOkZh": "一條蛇住在草叢裡。",
        "exBadText": "(X) A **snak** lives in the grass.",
        "exBadNote": "錯誤：snake 少寫最後一個 e，拼成 snak 就不是正確的字了"
      },
      {
        "title": "單複數變化錯誤（複數漏加 -s）",
        "bad": "(X) two snake ／ (X) three snake",
        "ok": "(O) two snakes ／ (O) three snakes",
        "why": "snake 是可數名詞，數量超過一個就要加 -s 變成 snakes。台灣學生最常犯的錯是受中文影響省略複數，寫成 two snake；也有人以為 snake 裡已經有一個 s 音就不用再加。判斷法：看到 two、three、many、a few 這些數量詞，馬上檢查後面的名詞有沒有 -s；snake 以清輔音 /k/ 結尾，加 -s 之後唸成 /ks/，要聽得出一個「斯」音。",
        "exOkText": "(O) There are three **snakes** in the garden.",
        "exOkZh": "花園裡有三條蛇。",
        "exBadText": "(X) There are three **snake** in the garden.",
        "exBadNote": "錯誤：three 之後的可數名詞要加 -s，應寫成 three snakes"
      },
      {
        "title": "發音錯誤（a_e 母音沒唸成長音）",
        "bad": "(X) snek ／ (X) sneck",
        "ok": "(O) snake",
        "why": "snake 的 a 與 k 之間有一個 e，這種 a_e 字母組合要唸長音 /eɪ/，和 make、name、cake 的母音相同；唸成短音 /æ/ 就變成 sneck，是完全不同的音。另外結尾的 k 要清楚發出 /k/，不能吞掉，否則聽起來像 snigh。判斷法：看到母音 a_e 組合，先在 a 上畫一個長音記號，再單獨把 k 唸出來；唸完 snake 之後確認耳朵有聽到「ㄟ」的音。",
        "exOkText": "(O) I saw a long **snake** near the river.",
        "exOkZh": "我在河邊看到一條長長的蛇。",
        "exBadText": "(X) I saw a long **sneck** near the river.",
        "exBadNote": "錯誤：把長音 /eɪ/ 唸成短音，拼成 sneck 就變成另一個字了"
      },
      {
        "title": "字形混淆（snake 與 sneak）",
        "bad": "(X) The boy want to **snake** away. ／ (X) She **snaked** into the room quietly.",
        "ok": "(O) The boy wants to **sneak** away. ／ (O) She **sneaked** into the room quietly.",
        "why": "snake 和 sneak 只差一個字母 i，但 sneak 是動詞，意思是「偷偷溜進、溜走」，三態是 sneak-sneaked-sneaked。台灣學生在會考的字彙題或翻譯題裡，常常看到「偷跑」就反射寫成 snake。判斷法：只要句子裡 snake 前面有不定詞 to，或它站在主詞後面接動作，它就必須是動詞 sneak；只有在描述動物、出現圖片、或寫 a / the snake 時，才是名詞 snake。",
        "exOkText": "(O) The cat **sneaked** out of the room quietly.",
        "exOkZh": "那隻貓悄悄溜出了房間。",
        "exBadText": "(X) The cat **snaked** out of the room quietly.",
        "exBadNote": "錯誤：snake 是名詞「蛇」，要表達「溜走」必須用動詞 sneak"
      }
    ],
    "traps": [
      "**關鍵字陷阱 a_e 母音**：看到母音 a 後面是 k 再接 e，母音一律唸長音 /eɪ/，如 snake、cake、lake。唸錯音就分不出 snake 和 sneck。",
      "**關鍵字陷阱 two / three**：數量詞後面的可數名詞一定要複數。寫完 two snake 要立刻補上 -s，否則其他字都對，整句還是錯的。",
      "**關鍵字陷阱 sneak**：snake 是「蛇」，sneak 是「偷偷溜走」，兩者只差一個字母，會考字彙題常故意拿來混淆。",
      "**關鍵字陷阱複數的 -s**：snake 唸 /sneɪk/，snakes 唸 /sneɪks/。這和 buses、classes 的處理方式不同，不要一律唸成 /z/。"
    ],
    "strategy": [
      "先寫字形再寫音：把 s-n-a-k-e 拆開唸一次，確認最後的 e 在，再看 a 有沒有變成長音。",
      "看上下文判斷詞性：句子裡有 to 後面接動詞，或是在描述動物時用 snake；有「偷偷離開」的意思時用 sneak。",
      "複數三件套：snake 是規則變化，複數直接加 -s，不必背整張不規則變化表。",
      "錯題本分類：把 snake、sneak、snack 這種只差一個字母的字寫成一組，每天唸一次，聽感會自動分開。",
      "口說練習：snake 是單音節字，重音落在唯一的音節上；唸時刻意拖長 /eɪ/ 和 /k/，耳朵就會記住。"
    ]
  },
  "a snake": {
    "zh": "一條蛇",
    "ipa": "ə sneɪk",
    "intro": "針對您提供的 **a snake**，這是一個名詞片語（名詞短語），單獨出現時表示「一條蛇」，還不能自己構成完整句子。它由「不定冠詞 a + 單數可數名詞 snake」兩部分組成。最該注意的是 a 與 an 的選擇、單數可數名詞不能漏冠詞，以及冠詞與後面形容詞的擺放順序。",
    "headline": "a + 單數可數名詞：a / an 與冠詞位置",
    "structure": [
      {
        "role": "不定冠詞",
        "token": "a",
        "pos": "不定冠詞 (Indefinite Article)",
        "func": "放在單數可數名詞前表示「一個」；snake 唸 /s/ 開頭是清輔音，所以用 a 不用 an",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "snake",
        "pos": "名詞 (Noun) — 單數可數名詞",
        "func": "指一條蛇，是這個片語的核心；前面的 a 把它變成「一個」的意思",
        "mark": "O"
      },
      {
        "role": "片語整體",
        "token": "a snake",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "在句子中可以當主詞或受詞，例如 (O) A snake came in.，但不能自己獨立成句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞選用錯誤（an 誤用在 s 開頭的字）",
        "bad": "(X) an snake",
        "ok": "(O) a snake",
        "why": "a 與 an 的差別在於後面接的單字「發音時的第一個音」，而不是字母本身。snake 唸起來第一個音是 /s/ 這個清輔音，所以必須用 a；只有母音，或 h 沒有發音（hour、honest）時才用 an，例如 an apple。台灣學生常受中文語感影響，覺得 an 加單字比較正式，於是寫成 an snake。判斷法：念出這個字，嘴唇放鬆不張開就選 a，張開就準備 an。",
        "exOkText": "(O) **A snake** crawled under the bed.",
        "exOkZh": "一條蛇爬到床底下去了。",
        "exBadText": "(X) **An snake** crawled under the bed.",
        "exBadNote": "錯誤：snake 唸 /s/ 開頭屬清輔音，必須用 a，不能用 an"
      },
      {
        "title": "單數可數名詞前漏加冠詞",
        "bad": "(X) I saw snake in the garden. ／ (X) He caught snake yesterday.",
        "ok": "(O) I saw a snake in the garden. ／ (O) He caught a snake yesterday.",
        "why": "snake 是單數可數名詞，只要它在句中擔任主詞或受詞，前面就一定要有冠詞或其他限定詞（a、the、my、his、數字），不能光憑名詞出現。中文可以說「我看到蛇」不必帶量詞，英文卻不行。學生在翻譯題最常漏掉這個 a，一個字沒寫整題就錯。判斷法：寫完單數可數名詞就往回看，如果前面沒有 a / the / 物主代名詞，立刻補上。",
        "exOkText": "(O) **A snake** was sleeping near the door.",
        "exOkZh": "一條蛇正在門邊睡覺。",
        "exBadText": "(X) **Snake** was sleeping near the door.",
        "exBadNote": "錯誤：單數可數名詞 snake 前面漏了不定冠詞 a"
      },
      {
        "title": "冠詞與形容詞的搭配語序錯誤",
        "bad": "(X) a snake long ／ (X) a snake brown",
        "ok": "(O) a long snake ／ (O) a brown snake",
        "why": "英文「冠詞 + 形容詞 + 名詞」的順序是固定的：a 或 the 一定在最前面，形容詞夾在冠詞和名詞之間，名詞永遠放最後。snake 是名詞，long、brown 都是形容詞，絕對不能插到名詞後面。台灣學生的錯誤多來自中文「一條長長的蛇」可以調整語序，英文卻不行。判斷法：先寫冠詞，再寫形容詞，最後寫名詞，出錯時就找得出卡在哪一格。",
        "exOkText": "(O) **A big snake** was sleeping on the road.",
        "exOkZh": "一條大蛇睡在路上。",
        "exBadText": "(X) **A snake big** was sleeping on the road.",
        "exBadNote": "錯誤：冠詞和名詞之間才可以插形容詞，big 不能放在 snake 後面"
      },
      {
        "title": "名詞所有格誤用（把「某條蛇的」當成「一條蛇」）",
        "bad": "(X) This is a snake's tail. ／ (X) a snake's home",
        "ok": "(O) This is the snake's tail. ／ (O) a snake's home",
        "why": "'s 所有格表示「某個東西的」，後面一定要再接名詞，所以 snake's 不是「一條蛇」，而是「某條蛇的」。學生看到 's 就以為整個片語等於 snake，直接寫 a snake's home 想說「蛇的家」。判斷法：所有格後面如果沒有再接名詞，代表你只是想要「一條蛇」，就應該寫 a snake；接上 home、tail、skin 這類名詞才需要 's。",
        "exOkText": "(O) **The snake's** skin is very smooth.",
        "exOkZh": "那條蛇的皮膚非常光滑。",
        "exBadText": "(X) **A snake's** skin is very smooth.",
        "exBadNote": "錯誤：前面已經有後名詞 skin，要指特定那一條應該用 the；a snake's 只表示「某條蛇的」"
      }
    ],
    "traps": [
      "**關鍵字陷阱 a / an**：判斷依據是「念出來的第一個音」，不是字母。sun、snake、school 都用 a；hour、honest 因為 h 不發音要用 an。",
      "**關鍵字陷阱單數可數名詞**：snake 這類動物名詞，單獨出現時一定要有 a / the / my，漏掉冠詞是翻譯與克漏字最常見的扣分點。",
      "**關鍵字陷阱兩隻以上**：數量變成兩隻以上時，a 要換成數字或 two、many，此時名詞要加 -s。(O) two snakes ／ (X) two snake。",
      "**關鍵字陷阱 's**：寫完 snake's 要回頭確認後面還有沒有名詞；沒有名詞就代表 's 用錯了。"
    ],
    "strategy": [
      "寫句子時把句子分成「誰 + 做什麼 + 什麼東西」三格，先在第三格寫名詞，再回頭補冠詞，漏寫機率立刻降到最低。",
      "唸出單字的第一個音來決定 a 或 an，考試時唸不出就先寫下來，最後再確認一次。",
      "形容詞一律放在「冠詞和名詞中間」，可以畫一個空格子 a ▢ snake 來提醒自己。",
      "看到 's 就問自己：後面還有沒有名詞？沒有的話就把 's 刪掉。",
      "練習時把 I see ___ . 這種填空句抄五遍，每一格都必須填 a snake 或 the snake，形成肌肉記憶。"
    ]
  },
  "pet": {
    "zh": "寵物",
    "ipa": "pet",
    "intro": "針對您提供的單字 **pet**，這是一個可以單獨使用的單字，不是完整句子。它既是名詞「寵物」，也可以當動詞「撫摸動物」，同一個字身兼兩種詞性。最該注意的是它只有 p、e、t 三個字母、母音讀短音 /e/，以及身為可數名詞時的複數變化。",
    "headline": "pet 名詞動詞兼用：拼三格、短音 e、複數 pets",
    "structure": [
      {
        "role": "詞彙本體",
        "token": "pet",
        "pos": "名詞 (Noun) — 可數名詞、單數",
        "func": "指「被人飼養陪伴的動物」，a dog、a cat、a snake 都算是 pet",
        "mark": "O"
      },
      {
        "role": "詞性延伸",
        "token": "pet",
        "pos": "動詞 (Verb) — 動詞原形",
        "func": "同一個字也可作動詞，意思是「用手輕輕撫摸動物」，主詞是第三人稱單數時要寫 pets",
        "mark": "O"
      },
      {
        "role": "拼寫與音節",
        "token": "p-e-t",
        "pos": "字母與音節 (Letters and Syllables)",
        "func": "只有三個字母、單音節，母音 e 讀短音 /e/，和 bed、pen 的母音完全相同",
        "mark": "O"
      },
      {
        "role": "變化形式",
        "token": "pets",
        "pos": "複數與三單數 (Plural / Third Person)",
        "func": "名詞複數是 pets，動詞第三人稱單數也寫 pets，但意思要靠上下文判斷",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "詞性誤用（把 pet 當成形容詞，語意重複）",
        "bad": "(X) She has a pet animal at home. ／ (X) That is a pet dog.",
        "ok": "(O) She has a pet at home. ／ (O) That is a dog.",
        "why": "pet 本身就是名詞，指「被飼養的動物」，已經包含「動物」的意思，所以 (X) a pet animal 是語意重複，英文不會這樣講；把 pet 放在名詞前當成「寵物的…」的形容詞，同樣是詞性誤用。正確說法是 I have a pet，或 The pet is a snake。判斷法：寫完 pet 之後如果又接了一個動物名詞，馬上刪掉其中一個，英文只會留一個。",
        "exOkText": "(O) She has **a pet** in her room.",
        "exOkZh": "她房間裡養了一隻寵物。",
        "exBadText": "(X) She has **a pet animal** in her room.",
        "exBadNote": "錯誤：pet 已經是「寵物」，再加 animal 語意重複，應刪去 animal"
      },
      {
        "title": "字形相近誤植（pet / pest / pat）",
        "bad": "(X) a pest ／ (X) She pers her dog.",
        "ok": "(O) a pet ／ (O) She pets her dog.",
        "why": "pet 只有 p、e、t 三個字母，母音是短音 e，寫成 pest 就變成「害蟲」，意思完全相反；寫成 pat 是「輕拍」，也不能代替 pet。台灣學生在聽寫和會考單字題常把 e 和 o 或 s 搞混。判斷法：把 pet 拆成 p-e-t 三格，e 那一格要寫成圓弧的 e，寫完唸一次「佩特」確認母音是短音。",
        "exOkText": "(O) My **pet** dog is called Lucky.",
        "exOkZh": "我的寵物狗叫幸運。",
        "exBadText": "(X) My **pest** dog is called Lucky.",
        "exBadNote": "錯誤：pest 是「害蟲」，寵物的英文是 pet，兩者不能互換"
      },
      {
        "title": "發音錯誤（把短音 /e/ 唸成長音 /eɪ/）",
        "bad": "(X) pate ／ (X) 唸成「派特」",
        "ok": "(O) pet",
        "why": "pet 的母音是短音 /e/，跟 bed、pen、ten 相同；它不是 a_e 母音組合，所以不需要唸長音。台灣學生受中文「寵物 p-a-i-t」影響，常常唸成「派特」，聽起來變成另一個字 pate「酥餅」。判斷法：看到單一字母 e 夾在兩個輔音之間，母音一律讀短音；要讀 /eɪ/ 必須是 a_e 這種兩字母組合。唸完後確認嘴形是放鬆微笑，不是張開的「ㄟ」。",
        "exOkText": "(O) We got a **pet** bird last week.",
        "exOkZh": "我們上星期買了一隻寵物鳥。",
        "exBadText": "(X) We got a **pate** bird last week.",
        "exBadNote": "錯誤：把短音 /e/ 唸成長音，拼成 pate 就是另一個字了"
      },
      {
        "title": "可數名詞的單複數與複合名詞複數位置",
        "bad": "(X) He has two pet. ／ (X) She has three pet dog.",
        "ok": "(O) He has two pets. ／ (O) She has three pet dogs.",
        "why": "pet 是可數名詞，數量一變就要改：兩個用 two pets。在「數字 + 名詞」的複合名詞裡，複數只加在緊靠數字的那一個名詞上，three pet dogs 不能寫成 three pets dog。判斷法：看到 two、three 這種數字，先確認後面的名詞有沒有 -s；兩個名詞並排時，只改被數字直接修飾的那一個。",
        "exOkText": "(O) We have two **pets** — a dog and a snake.",
        "exOkZh": "我們有兩隻寵物——一隻狗和一條蛇。",
        "exBadText": "(X) We have two **pet** — a dog and a snake.",
        "exBadNote": "錯誤：數字 two 之後的可數名詞要加 -s，應為 two pets"
      }
    ],
    "traps": [
      "**關鍵字陷阱 pet / pest**：只差一個字母 s，但 pet 是「寵物」、pest 是「害蟲」。會考字彙選擇常拿這組來混淆，看題目時先確認在講動物還是蟲害。",
      "**關鍵字陷阱 pet 同時是動詞**：She **pets** the dog. 的 pets 是動詞第三人稱單數；a pet 的 pet 是名詞。判讀時看前面有沒有 she / he / it。",
      "**關鍵字陷阱數字加名詞**：two pet birds 的複數加在 pet 上（離數字最近的那個），不是加在 birds 上。",
      "**關鍵字陷阱短音 e**：單一字母 e 夾在輔音之間唸短音 /e/，只有 a_e 才有長音 /eɪ/。"
    ],
    "strategy": [
      "把 pet 寫成 p-e-t 三格口訣記牢，一個字三個字母，寫完檢查有沒有多畫或少畫。",
      "遇到「養什麼動物」的題目先固定句型 I have a pet.，後面再接內容，避免漏冠詞。",
      "練習比較 pet（寵物）與 pest（害蟲）的例句各三句，用不同底線標出來，考前唸一次。",
      "寫段落時，數字後面的名詞一律複數化，改完朗讀一遍檢查順不順。",
      "遇到不會的單字，先問自己「這是名詞還是動詞」，詞性判對了，拼字與單複數自然就對。"
    ]
  },
  "a pet": {
    "zh": "隻寵物",
    "ipa": "ə pet",
    "intro": "針對您提供的 **a pet**，這是一個由「不定冠詞 a + 單數可數名詞 pet」組成的名詞片語，單獨出現時表示「一隻寵物」，還不是完整句子。最該注意的是冠詞與後面的限定詞不能疊加（a my pet 一律不行）、可數名詞必須複數化，以及 a 和名詞之間一定要有空格。",
    "headline": "冠詞只能一個：不能寫 a my pet 或 a pets",
    "structure": [
      {
        "role": "不定冠詞",
        "token": "a",
        "pos": "不定冠詞 (Indefinite Article)",
        "func": "表示「一隻」，只能修飾單數可數名詞；後面是 /p/ 開頭的 pet，所以用 a 不用 an",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "pet",
        "pos": "名詞 (Noun) — 單數可數名詞",
        "func": "指被飼養的動物，是這個片語的核心，也是後面 as a pet 這類片語要說明的對象",
        "mark": "O"
      },
      {
        "role": "片語整體",
        "token": "a pet",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "可在句子中當主詞（(O) A pet needs food.）或受詞（(O) She has a pet.）",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞與物主代詞、指示形容詞重複",
        "bad": "(X) She has a my pet. ／ (X) I like a this pet.",
        "ok": "(O) She has my pet. ／ (O) I like this pet.",
        "why": "冠詞 a、an、the 和物主代詞 my、your、his，以及指示形容詞 this、that、these、those 都是「限定詞」，一個名詞前面只能有一個，不能疊加。學生常因為中文「一隻我的寵物」聽起來很順，就寫出 a my pet。判斷法：名詞前面如果已經有 my、this、that，就把 a 刪掉；反過來，寫 a 的時候後面不准再出現任何 my、this、these。",
        "exOkText": "(O) This **pet** is a snake my sister keeps.",
        "exOkZh": "這隻寵物是我姊姊養的一條蛇。",
        "exBadText": "(X) This **a pet** is a snake my sister keeps.",
        "exBadNote": "錯誤：冠詞 a 與指示形容詞 this 重複，前面已有 this 不能再加 a"
      },
      {
        "title": "可數名詞複數誤用（冠詞與單複數不一致）",
        "bad": "(X) She has a pets. ／ (X) We keep two pet.",
        "ok": "(O) She has a pet. ／ (O) We keep two pets.",
        "why": "冠詞和名詞的「數」一定要一致：a 只能配單數，所以 a pets 是不合規的組合；數量變成 two、three 之後，冠詞消失，名詞要自己變複數。學生常在改單複數時忘了把 a 一起改掉，或忘了把 a 刪掉。判斷法：寫完冠詞立刻檢查後面的名詞——看到 a 就找單數，看到數字就找複數，兩者不能同時出現。",
        "exOkText": "(O) She has a **pet** snake at home.",
        "exOkZh": "她家裡養了一條寵物蛇。",
        "exBadText": "(X) She has **a pets** snake at home.",
        "exBadNote": "錯誤：a 只能修飾單數名詞，pets 是複數，冠詞要改成 two 或直接刪掉"
      },
      {
        "title": "拼寫與字距錯誤（冠詞漏字或黏成一個字）",
        "bad": "(X) She has apet at home. ／ (X) She has pet at home.",
        "ok": "(O) She has a pet at home.",
        "why": "a pet 是兩個字，中間一定要有空格，而且 a 不能漏。把 a 和 pet 黏成 apet，看起來就變成一個沒有人聽得過的字，答案卡上會直接判錯；把 a 漏掉則變成中文式的「她家裡有寵物」。判斷法：寫完名詞片語後，用手指在每個字之間點一下確認空格存在，再從右邊數回去，確認單數名詞前面有冠詞。",
        "exOkText": "(O) She has **a pet** at home.",
        "exOkZh": "她家裡養了一隻寵物。",
        "exBadText": "(X) She has **apet** at home.",
        "exBadNote": "錯誤：a 與 pet 中間漏了空格，黏成 apet 會變成一個不存在的字"
      },
      {
        "title": "語意重複修飾（pet 與 animal 疊用）",
        "bad": "(X) She keeps a pet animal. ／ (X) He bought a pet dog yesterday.",
        "ok": "(O) She keeps a pet. ／ (O) He bought a dog yesterday.",
        "why": "pet 本身已經是「被人飼養的動物」，後面再加 animal 或另一種動物名稱，就變成「寵物的動物」，語意重複。英文表達偏好精簡，這種疊加通常出現在故意設錯的選項裡。判斷法：寫完 pet 之後再看後面，如果又接了一個動物名詞，二選一保留就好；想強調種類時，直接說 a pet snake 就夠了。",
        "exOkText": "(O) He bought **a pet** last week.",
        "exOkZh": "他上星期買了一隻寵物。",
        "exBadText": "(X) He bought **a pet animal** last week.",
        "exBadNote": "錯誤：pet 與 animal 語意重複，留 pet 或留 animal 其中一個即可"
      }
    ],
    "traps": [
      "**關鍵字陷阱一隻 / 一條**：中文的「隻」「條」在英文不翻譯，都是 a。寫 a pet、a snake、a dog，不要自己加量詞。",
      "**關鍵字陷阱限定詞只能一個**：a、the、my、this 只能擇一，出現 a my pet、a this pet 就是錯的。",
      "**關鍵字陷阱冠詞與數的一致**：a + 單數，數字 + 複數，the + 單複數皆可。看到 a pets 一律判錯。",
      "**關鍵字陷阱字距**：冠詞 a 是獨立的一個字，必須和後面的名詞分開寫，apet、pet a 都不是英文寫法。"
    ],
    "strategy": [
      "寫「一隻寵物」時固定用 a pet，唸一次 /ə pet/ 讓耳朵習慣冠詞的弱音。",
      "複數化時同時檢查冠詞：把 a pets 整組改掉，不要只改名詞。",
      "抄寫練習時特別注意空格，a 和名詞之間的距離要比一般單字間距再大一點。",
      "背一張限定詞清單：a / an / the / my / your / this / that，每個名詞前只能挑一個。",
      "把寵物相關的字畫成一張圖：a dog、a cat、a snake、a pet，四個都用 a，一次記住同一個冠詞。"
    ]
  },
  "as a pet": {
    "zh": "作為寵物",
    "ipa": "æz ə pet",
    "intro": "針對您提供的 **as a pet**，這是一個介系詞片語，意思是「作為寵物、當成寵物」，單獨出現時不能成句，必須接在名詞或動詞後面說明身分或用途。最該注意的是 as 後面要接「冠詞 + 名詞」的完整片語，以及這個介系詞片語只能放在被修飾的名詞後面。",
    "headline": "as + 冠詞 + 名詞：身分介系詞片語，不能單獨成句",
    "structure": [
      {
        "role": "介系詞",
        "token": "as",
        "pos": "介系詞 (Preposition)",
        "func": "表示「以……的身分、作為」，後面必須接名詞或名詞片語，不能接動詞原形",
        "mark": "O"
      },
      {
        "role": "冠詞 + 名詞",
        "token": "a pet",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "as 後面必須帶冠詞 a，表示「一隻寵物」這個身分，不能省略成 as pet",
        "mark": "O"
      },
      {
        "role": "片語位置",
        "token": "as a pet",
        "pos": "介系詞片語 (Preposition Phrase)",
        "func": "後置修飾前面的名詞，例如 (O) She keeps a snake **as a pet**.，不能放在句首或插在受詞前面",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞搭配錯誤（把 as 換成 for 或 to）",
        "bad": "(X) She keeps a snake for a pet. ／ (X) He raised it to a pet.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He raised it as a pet.",
        "why": "as 在這裡表示身分、角色，後面接「一隻寵物」這個身分；for 是表示目的或對象，用在 keep a snake for a pet 會變成「為了某個寵物而養蛇」，語意完全不同；to a pet 則完全不合英文語法。判斷法：問自己「是把蛇當成寵物，還是為了寵物而養蛇？」表身分一律用 as。",
        "exOkText": "(O) She keeps a snake **as a pet**.",
        "exOkZh": "她把一條蛇當寵物養。",
        "exBadText": "(X) She keeps a snake **for a pet**.",
        "exBadNote": "錯誤：as 才是「當作」的身分介系詞，for 表示目的或對象"
      },
      {
        "title": "介系詞後漏加冠詞（省略 a）",
        "bad": "(X) She keeps a snake as pet. ／ (X) He has a dog as a pet already.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He has a dog as a pet already.",
        "why": "as 是介系詞，介系詞後面一定要接名詞，而單數可數名詞前面一定要有冠詞，所以 as pet 不合規則，必須寫 as a pet。學生常覺得「前面已經有一個 a 了，不用再加」，其實 as 開啟的是一個新的名詞片語，冠詞要重新出現。判斷法：看到 as 或 of、for、with，後面立刻檢查三格：冠詞、形容詞（可省略）、名詞；冠詞那一格不能空。",
        "exOkText": "(O) My brother keeps a snake **as a pet**.",
        "exOkZh": "我弟弟養了一條蛇當寵物。",
        "exBadText": "(X) My brother keeps a snake **as pet**.",
        "exBadNote": "錯誤：as 後面的單數可數名詞 pet 前面要加冠詞 a"
      },
      {
        "title": "介系詞片語位置錯誤（放到受詞前面）",
        "bad": "(X) She keeps as a pet a snake. ／ (X) He bought as a pet that bird.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He bought that bird as a pet.",
        "why": "英文沒有中文常說的「把受詞提前」的說法。as a pet 是用來說明前面那個名詞的身分的，必須緊跟在被修飾的名詞後面，也就是「動詞 + 受詞 + as a pet」。學生常受「把一條蛇當寵物養」的語序影響，把 as a pet 拉到中間。判斷法：先畫底線畫出受詞，再把 as a pet 貼在受詞後面，動詞絕對不能插在中間。",
        "exOkText": "(O) She keeps **a snake as a pet**.",
        "exOkZh": "她養了一條蛇當作寵物。",
        "exBadText": "(X) She keeps **as a pet a snake**.",
        "exBadNote": "錯誤：as a pet 是後置修飾，必須接在受詞 a snake 之後"
      },
      {
        "title": "發音錯誤（as 的強讀與弱讀、尾音不分）",
        "bad": "(X) 把 as 一律唸成 /æz/ ／ (X) 唸成 /eɪz/",
        "ok": "(O) 句首重讀 /æz/ ／ (O) 句中弱讀 /əz/",
        "why": "as 是一個可以弱讀的介系詞：在句子中間、沒有強調需求時，母音會輕輕唸成 /əz/；只有在句首、前面有逗號停頓，或特別要強調「當作」這個身分時，才會唸成清楚的 /æz/。它的尾音是清音 /z/，不是 /s/，唸成 /eɪz/ 就變成複數的 as。判斷法：連讀整句時，如果某個字又輕又不擔心聽漏，那個字多半就是可以弱讀的介系詞。",
        "exOkText": "(O) She keeps **a snake as** a pet. （連讀時 as 輕唸成 /əz/）",
        "exOkZh": "她養了一條蛇當寵物。（連讀時 as 弱讀）",
        "exBadText": "(X) She keeps **a snake AS** a pet. （as 唸成 /eɪz/）",
        "exBadNote": "錯誤：as 的尾音是清音 /z/，唸成 /eɪz/ 聽起來變成複數的 as"
      }
    ],
    "traps": [
      "**關鍵字陷阱 as / for**：「當作……」用 as，「為了……／給……」用 for。(O) as a pet ／ (X) for a pet，兩者語意不同。",
      "**關鍵字陷阱介系詞後要有冠詞**：as 後面接單數可數名詞，冠詞 a 不能省，as pet 一律判錯。",
      "**關鍵字陷阱位置**：as a pet 是名詞的後置修飾，一定放在名詞後面，不能插在動詞和受詞中間。",
      "**關鍵字陷阱 as 的發音**：as 唸 /əz/ 或 /æz/，尾音是 /z/；複數的 as 才唸清楚 /æz/，別唸成 /eɪz/。"
    ],
    "strategy": [
      "看到 as 就在腦中畫格：as ▢ 名詞，格裡先填冠詞，再填名詞，漏不掉。",
      "背固定句型：keep / raise + 受詞 + as a pet，三個部分缺一不可。",
      "寫句子時先完成「動詞 + 受詞」，最後再把 as a pet 貼在受詞後面，位置就不會亂。",
      "把 as、of、for、with 這四個介系詞綁在一起複習，統一記住「後面要接名詞、要冠詞」。",
      "口說練習時刻意做弱讀，唸整句只把動詞和實質名詞念清楚，聽起來才會自然。"
    ]
  },
  "a snake as a pet": {
    "zh": "一條蛇作為寵物",
    "ipa": "ə sneɪk æz ə pet",
    "intro": "針對您提供的 **a snake as a pet**，這是一個名詞片語：單數可數名詞 a snake，後面接一個介系詞片語 as a pet 來說明它的身分。單獨出現時它還不是句子，但已經是完整的主詞單位，可以放在 She keeps ______ 的受詞位置。最該注意的是 as a pet 只能後置修飾、冠詞不能重複，以及單複數要前後一致。",
    "headline": "名詞 + 後置修飾：as a pet 放後面，冠詞不重複",
    "structure": [
      {
        "role": "名詞片語核心",
        "token": "a snake",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "指一條蛇，是整個片語被修飾的主體，也是整段話的受詞核心",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "as",
        "pos": "介系詞 (Preposition)",
        "func": "表示身分，說明前面那條蛇「被當成什麼」，開啟後面的 as a pet",
        "mark": "O"
      },
      {
        "role": "身分片語",
        "token": "as a pet",
        "pos": "介系詞片語 (Preposition Phrase)",
        "func": "後置修飾 a snake，說明這條蛇是以寵物的身分被養著，位置不能移動",
        "mark": "O"
      },
      {
        "role": "片語整體",
        "token": "a snake as a pet",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "可在句中當主詞或受詞，例如 (O) She keeps a snake as a pet.",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞重複錯誤（名詞前出現兩個 a）",
        "bad": "(X) She keeps a a snake as a pet. ／ (X) He has a a dog.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He has a dog.",
        "why": "a snake 裡的 a 已經把 snake 變成單數的「一條蛇」，後面 as a pet 的 a 屬於另一個名詞片語 pet，兩者各管各的，絕對不能連著寫成 a a。學生常在改寫句子時把 a 移來移去，最後多留一個。判斷法：每寫一個 a，就在旁邊標出它修飾的是哪一個名詞；如果連續出現兩個 a，中間一定還缺了東西。",
        "exOkText": "(O) She keeps **a snake as a pet**.",
        "exOkZh": "她養了一條蛇當寵物。",
        "exBadText": "(X) She keeps **a a snake** as a pet.",
        "exBadNote": "錯誤：snake 前只需要一個 a，連寫兩個 a 是冠詞重複"
      },
      {
        "title": "後置修飾語序錯誤（介系詞片語插到名詞中間）",
        "bad": "(X) She keeps a as a pet snake. ／ (X) He bought a as a pet bird.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He bought a bird as a pet.",
        "why": "a as a pet snake 這種寫法把介系詞片語插到冠詞和名詞中間，違反「冠詞 + 名詞」的基本組合。介系詞片語只能整個放在被修飾名詞的後面，而且要緊接著，不能拆開名詞。學生常看到中文「一條當寵物的蛇」就照著直譯。判斷法：把 a snake 圈起來當成一個不可拆的單位，as a pet 只能排在它的右邊。",
        "exOkText": "(O) He bought **a bird as a pet**.",
        "exOkZh": "他買了一隻鳥當寵物。",
        "exBadText": "(X) He bought **a as a pet bird**.",
        "exBadNote": "錯誤：as a pet 被插進冠詞和名詞中間，必須整個放在名詞後面"
      },
      {
        "title": "單複數與冠詞不一致",
        "bad": "(X) She keeps a snakes as a pet. ／ (X) He keeps two snake as a pet.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He keeps two snakes as a pet.",
        "why": "這個片語裡的名詞必須和它的冠詞或數字保持一致：前面有 a 就是單數，a snakes 互相矛盾；前面是 two、three 就必須複數，two snake 少了一個 -s。學生在整段改寫時只改數字忘了改名詞，或只改名詞忘了改冠詞。判斷法：把「冠詞或數字」和「名詞」用線連起來對照檢查，兩邊的數要一樣。",
        "exOkText": "(O) She keeps **a snake as a pet**.",
        "exOkZh": "她養了一條蛇當寵物。",
        "exBadText": "(X) She keeps **a snakes as a pet**.",
        "exBadNote": "錯誤：a 只能修飾單數，snakes 是複數，冠詞與名詞不一致"
      },
      {
        "title": "as 與 be 動詞的分工錯誤（雙動詞）",
        "bad": "(X) She keeps a snake is a pet. ／ (X) He raised it be a pet.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He raised it as a pet.",
        "why": "as 是介系詞，後面接名詞或名詞片語，構成「把 A 當成 B」的身分說法；be 是 be 動詞，後面接表語，如果要說「牠就是寵物」應該寫 The snake is a pet.，不能把 be 塞進 keep 後面。學生常以為「當成」一定要翻成 be，於是寫出 keeps a snake is a pet 這種雙動詞病句。判斷法：先把句子分成「主詞 + 動詞 + 補語」，身分片語前面一律用 as。",
        "exOkText": "(O) The snake is a pet, and she keeps **it as a pet**.",
        "exOkZh": "那條蛇是寵物，她把它當寵物養。",
        "exBadText": "(X) The snake is a pet, and she keeps **it is a pet**.",
        "exBadNote": "錯誤：keep 後面不能再用 is，兩個動詞疊在一起就是病句"
      }
    ],
    "traps": [
      "**關鍵字陷阱兩個 a**：(O) a snake as a pet 裡有兩個 a，但它們分別修飾 snake 和 pet，中間不能連在一起寫成 a a snake。",
      "**關鍵字陷阱位置**：as a pet 只能後置，插到冠詞與名詞之間一定錯。(X) a as a pet snake。",
      "**關鍵字陷阱數的一致**：a + 單數、數字 + 複數。a snakes、two snake 都是會考常見的錯誤選項。",
      "**關鍵字陷阱雙動詞**：keep 這種實義動詞後面不能直接接 is、are，身分片語要用 as 帶。"
    ],
    "strategy": [
      "背一個模板：a + 單數名詞 + as a + 單數名詞，兩邊的結構完全一樣，考試時套用就不會亂。",
      "寫完檢查兩次：先看有沒有連續兩個 a，再看冠詞和名詞的數是否一致。",
      "把「身分片語」當成一個單位，唸的時候中途不要停，位置自然就對了。",
      "比較三種說法：keep a snake（養蛇）、keep a snake as a pet（當寵物養）、the snake is a pet（這蛇是寵物），差在哪裡一看就懂。",
      "遇到 as 一律畫括號：as (a pet)，括號裡就是一個完整的名詞片語，冠詞不能省。"
    ]
  },
  "keeps a snake": {
    "zh": "養一條蛇",
    "ipa": "kiːps ə sneɪk",
    "intro": "針對您提供的 **keeps a snake**，這是一個「動詞 + 受詞」組成的動詞片語，意思是「養一條蛇」，還不能自己成句，前面要補主詞，例如 She keeps a snake.。最該注意的是 keeps 已經是第三人稱單數現在式，所以主詞不能是 I、you 或複數；同時要分清楚現在式 keeps 和過去式 kept。",
    "headline": "keeps 是三單數現在式；keep–kept–kept 不規則",
    "structure": [
      {
        "role": "動詞",
        "token": "keeps",
        "pos": "動詞 (Verb) — keep 的第三人稱單數現在式",
        "func": "表示習慣性、持續的飼養動作；主詞是 he / she / it 或單數名詞時必須加 -s",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "a snake",
        "pos": "名詞片語 (Noun Phrase) — 受詞",
        "func": "接受 keep 這個動作的對象，前面要有冠詞 a，表示「一條蛇」",
        "mark": "O"
      },
      {
        "role": "片語整體",
        "token": "keeps a snake",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "可在句中當主要動詞（(O) She keeps a snake.）或轉成動名詞當主語",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數漏加 -s",
        "bad": "(X) She keep a snake. ／ (X) My sister keep a snake.",
        "ok": "(O) She keeps a snake. ／ (O) My sister keeps a snake.",
        "why": "keep 是實義動詞，當主詞是 he、she、it 或單數名詞時，現在式必須加 -s 變成 keeps。中文的動詞沒有這個人稱變化，所以學生常整句都寫 keep，忘了只在第三人稱單數才加。判斷法：寫完動詞先看主詞——I / you / we / they 用原形，he / she / it / 單數名詞一定要有 -s，這是會考最容易拿分的固定規則。",
        "exOkText": "(O) She **keeps** a snake as a pet.",
        "exOkZh": "她養了一條蛇當寵物。",
        "exBadText": "(X) She **keep** a snake as a pet.",
        "exBadNote": "錯誤：主詞 She 是第三人稱單數，動詞要加 -s 變成 keeps"
      },
      {
        "title": "時態選擇錯誤（依時間詞判斷）",
        "bad": "(X) She keeps a snake last night. ／ (X) He keeps a snake yesterday.",
        "ok": "(O) She kept a snake last night. ／ (O) He kept a snake yesterday.",
        "why": "keeps 是現在式，用來說明習慣或現在的情況，一旦句中出現 last night、yesterday、last week 這類過去時間，就必須改成過去式 kept。學生常只記得加 s，卻忘了換時態。判斷法：動筆前先圈出時間詞——有 last、yesterday、ago、in 2020 就往過去式想，沒有才留在現在式；兩者只能擇一，不能同時出現。",
        "exOkText": "(O) She **kept** a snake two years ago.",
        "exOkZh": "她兩年前養過一條蛇。",
        "exBadText": "(X) She **keeps** a snake two years ago.",
        "exBadNote": "錯誤：有過去時間 two years ago，動詞要用過去式 kept"
      },
      {
        "title": "助動詞 do / does 誤用",
        "bad": "(X) She does keeps a snake. ／ (X) Does she keeps a snake?",
        "ok": "(O) She keeps a snake. ／ (O) Does she keep a snake?",
        "why": "keep 是實義動詞，句中已經有它擔任主要動詞，就不能再用 do / does 加強。do / does 只能用於疑問句或否定句中「代替」實義動詞出現的地方。學生常把 does 當成「第三人稱單數」的標誌，於是寫出 does keeps。判斷法：看到句首的 Do / Does，後面要接動詞原形 keep，不能接 keeps；沒有句首助動詞時，就讓 keeps 自己負責三單數。",
        "exOkText": "(O) **Does** she **keep** a snake at home?",
        "exOkZh": "她家裡有養蛇嗎？",
        "exBadText": "(X) **Does** she **keeps** a snake at home?",
        "exBadNote": "錯誤：有助動詞 does 時，後面的實義動詞要用原形 keep"
      },
      {
        "title": "不規則動詞三態混淆（不能寫 keeped）",
        "bad": "(X) She keeped a snake. ／ (X) He has keeped a snake.",
        "ok": "(O) She kept a snake. ／ (O) He has kept a snake.",
        "why": "keep 是不規則動詞，過去式和過去分詞都是 kept，絕對沒有 keeped 這個形式。現在式 keep、第三人稱單數 keeps、過去式與過去分詞 kept，必須整組背熟。判斷法：背動詞時一定背「三態」而不是只背中文意思；看到 -ed 就先問自己這個動詞是不是規則變化，keep、sleep、buy、eat 都要特別小心。",
        "exOkText": "(O) She has **kept** a snake for three years.",
        "exOkZh": "她養蛇已經三年了。",
        "exBadText": "(X) She has **keeped** a snake for three years.",
        "exBadNote": "錯誤：keep 的過去分詞是 kept，沒有 keeped 這個形式"
      }
    ],
    "traps": [
      "**關鍵字陷阱 he / she / it**：這三個代名詞後面的實義動詞現在式一定要加 -s（keeps），只有 I / you / we / they 用原形。",
      "**關鍵字陷阱 last night / yesterday**：看到過去時間，動詞要從 keeps 換成 kept，兩者不能同時出現。",
      "**關鍵字陷阱 Does**：句首有 Does 時，後面的動詞要退回去用原形 keep；有 keeps 的句子一定沒有助動詞。",
      "**關鍵字陷阱 keeped**：keep 是不規則動詞，過去式寫 kept，不加 -ed。"
    ],
    "strategy": [
      "每背一個動詞就寫三態：keep / keeps / kept，本子上直式排列，考試前看一遍。",
      "寫句子先定主詞再定動詞：主詞是 she 就自動在動詞後面加 s，形成固定動作。",
      "看到時間詞立刻在旁邊寫 P（過去）或 N（現在），再回頭選動詞。",
      "do / does / did 出現在句首時，後面只准接原形，把這條規則抄在草稿紙上。",
      "唸整句時用耳朵檢查：聽起來三個音節的 keeps，和兩個音節的 keep，差在最後那個 /s/。"
    ]
  },
  "keeps a snake as a pet": {
    "zh": "養一條蛇作為寵物",
    "ipa": "kiːps ə sneɪk æz ə pet",
    "intro": "針對您提供的 **keeps a snake as a pet**，這是一個「動詞 + 受詞 + 身分介系詞片語」組成的動詞片語，意思是「把一條蛇當寵物養」，還不能單獨成句。最該注意的是 as a pet 修飾的是受詞 a snake 而不是整個動作，以及表達長期持續飼養時要選對動詞形式和選詞。",
    "headline": "as a pet 修飾受詞；持續飼養的用字與時態",
    "structure": [
      {
        "role": "動詞",
        "token": "keeps",
        "pos": "動詞 (Verb) — keep 的第三人稱單數現在式",
        "func": "表示「飼養、保有」這種持續的狀態，主詞若是 she / he / it 要加 -s",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "a snake",
        "pos": "名詞片語 (Noun Phrase) — 受詞",
        "func": "被飼養的對象，也是 as a pet 這個身分片語要修飾的對象",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "as",
        "pos": "介系詞 (Preposition)",
        "func": "表示身分，開啟後面的 as a pet，說明「以什麼身分」",
        "mark": "O"
      },
      {
        "role": "身分片語",
        "token": "as a pet",
        "pos": "介系詞片語 (Preposition Phrase)",
        "func": "後置修飾受詞 a snake，說明這條蛇的飼養身分，不可拆開或移動",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "非謂語用法錯誤（to 後面接原形）",
        "bad": "(X) To keeping a snake is not easy. ／ (X) She likes to keeps a snake.",
        "ok": "(O) Keeping a snake is not easy. ／ (O) She likes to keep a snake.",
        "why": "keep 這個動作要變成名詞片語時必須用動名詞 keeping，而放在 to 後面則要用原形 keep。學生常把兩種形式混在一起，寫出 to keeping 或 likes to keeps。判斷法：看 to 後面的動詞，如果它是「一個動作」當主題用，就改寫成 keeping；如果 to 是不定式符號，後面一律用原形。口訣：to 前面要動名詞，to 後面要原形。",
        "exOkText": "(O) **Keeping** a snake as a pet takes time.",
        "exOkZh": "養一條蛇當寵物要花時間。",
        "exBadText": "(X) **To keeping** a snake as a pet takes time.",
        "exBadNote": "錯誤：句首當主語要用動名詞 keeping，不能用 to keeping"
      },
      {
        "title": "身分片語的修飾對象錯誤（修飾到動詞）",
        "bad": "(X) She keeps as a pet a snake. ／ (X) He raised as a pet that bird.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) He raised that bird as a pet.",
        "why": "as a pet 說明的是「那條蛇」的身分，不是「養」這個動作的身分，所以它一定緊跟在受詞後面。學生有時會把整個片語往前挪，變成 keeps as a pet a snake，或誤以為 as a pet 在修飾前面的動詞而把受詞丟到後面。判斷法：用括號標出受詞 (a snake)，as a pet 只能出現在這個括號的正後方。",
        "exOkText": "(O) She keeps **a snake (as a pet)**.",
        "exOkZh": "她養了一條蛇（當作寵物）。",
        "exBadText": "(X) She keeps **as a pet** a snake.",
        "exBadNote": "錯誤：as a pet 被移到動詞後面，變成修飾動作，位置錯誤"
      },
      {
        "title": "動詞形式錯誤（持續狀態不能用原形疊在 be 後面）",
        "bad": "(X) She is keep a snake as a pet. ／ (X) He is keeps a snake.",
        "ok": "(O) She is keeping a snake as a pet. ／ (O) He keeps a snake.",
        "why": "飼養寵物是一種持續狀態，所以表達「她現在養著一條蛇當寵物」要用 be + 動名詞 keeping，或直接用一般現在式 keeps；寫成 is keep 是動詞疊加，語法根本不成立。學生也常在 want、decide、enjoy 之後忘記用動名詞。判斷法：把 keep 換成中文的「正在做、喜歡做」，對應的英文就是 be + keeping 或 enjoy + keeping，中間絕對不能夾原形。",
        "exOkText": "(O) She **is keeping** a snake as a pet these days.",
        "exOkZh": "她這陣子正養著一條蛇當寵物。",
        "exBadText": "(X) She **is keep** a snake as a pet these days.",
        "exBadNote": "錯誤：be 動詞後面要接動名詞 keeping，不能接原形 keep"
      },
      {
        "title": "動詞選詞錯誤（keep / grow / feed 的差別）",
        "bad": "(X) My uncle grows a snake as a pet. ／ (X) She breeds a snake as a pet at home.",
        "ok": "(O) My uncle keeps a snake as a pet. ／ (O) She feeds the snake every day.",
        "why": "keep 是「飼養、保有」某個動物，讓它留在身邊當寵物；feed 只是「餵食」，不表示你擁有牠；grow 是「種植、栽培」，用在動物身上完全不通。學生翻譯「他養了一條蛇當寵物」時常選 grow 或 feed。判斷法：中文的「養寵物」對應 keep；「餵牠吃」才用 feed；「從小養大」才用 raise。",
        "exOkText": "(O) My uncle **keeps** a snake as a pet at home.",
        "exOkZh": "我叔叔家裡養了一條蛇當寵物。",
        "exBadText": "(X) My uncle **grows** a snake as a pet at home.",
        "exBadNote": "錯誤：grow 是「種植、栽培」；養蛇當寵物要用 keeps"
      }
    ],
    "traps": [
      "**關鍵字陷阱 to keeping**：to 是不定式符號，後面接原形 keep；當名詞用時才用動名詞 keeping。出現 to keeping 一律判錯。",
      "**關鍵字陷阱 be + 動名詞**：表達「正在養」要寫 is keeping，不是 is keep。",
      "**關鍵字陷阱 as a pet 的位置**：它修飾的是受詞 a snake，必須緊接在受詞後面，不可拆開。",
      "**關鍵字陷阱 keep 的意思**：keep 是「飼養、保有」，不是 feed（餵食）也不是 grow（種植）。"
    ],
    "strategy": [
      "把片語拆成三塊背：動詞 keeps、受詞 a snake、修飾 as a pet，考試時依序填進句子空格。",
      "每寫到 be 動詞就檢查後面接的是 -ing 形式還是形容詞，習慣後就不會漏。",
      "非謂語的 to 位置多看兩秒：前面是介系詞或 want / decide / enjoy 就要變 keeping。",
      "唸句子時在 as a pet 前做一個小停頓，耳朵自然會把這個片語接到受詞後面。",
      "整理一份 keep / feed / raise / grow 的對照表，考試前看一次，選詞不再猶豫。"
    ]
  },
  "even keeps a snake as a pet": {
    "zh": "甚至養一條蛇作為寵物",
    "ipa": "ˈiː.vən kiːps ə sneɪk æz ə pet",
    "intro": "針對您提供的 **even keeps a snake as a pet**，這是「副詞 + 動詞片語」組成的一段，意思是「甚至把一條蛇當寵物養」，還不是完整句子，前面需要主詞（She even keeps…）。最該注意的是 even 的位置與語意——它放在主要動詞前面，用來加強語氣、表示「甚至、連…都」。",
    "headline": "even 放動詞前表加強語氣，不能和 very 併用",
    "structure": [
      {
        "role": "副詞",
        "token": "even",
        "pos": "副詞 (Adverb)",
        "func": "加強語氣，表示「甚至、連…都」；放在主要動詞前修飾整個動作",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "keeps",
        "pos": "動詞 (Verb) — keep 的第三人稱單數現在式",
        "func": "表示持續飼養的動作，主詞若是 she / he / it 要加 -s",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "a snake",
        "pos": "名詞片語 (Noun Phrase) — 受詞",
        "func": "被飼養的對象，前面有冠詞 a，不能省略",
        "mark": "O"
      },
      {
        "role": "身分片語",
        "token": "as a pet",
        "pos": "介系詞片語 (Preposition Phrase)",
        "func": "後置修飾受詞 a snake，說明這條蛇被飼養的身分",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "副詞位置錯誤（把 even 放到受詞後面）",
        "bad": "(X) She keeps a snake even as a pet. ／ (X) She keeps even a snake as a pet.",
        "ok": "(O) She even keeps a snake as a pet.",
        "why": "even 這個副詞修飾的是整個動作，所以位置在主要動詞 keeps 的前面，不能放在受詞 a snake 後面，也不能插在動詞與受詞之間。學生常把它當成「也」或「還」而隨意放置。判斷法：把 even 拿掉，剩下的 she keeps a snake as a pet 讀起來完全成立，那 even 就應該插在動詞前面。",
        "exOkText": "(O) She **even keeps** a snake as a pet at home.",
        "exOkZh": "她甚至在家裡養了一條蛇當寵物。",
        "exBadText": "(X) She keeps a snake **even** as a pet at home.",
        "exBadNote": "錯誤：even 要放在主要動詞前，不能插在受詞和 as 之間"
      },
      {
        "title": "語意錯誤（even 不能與 very / too 併用）",
        "bad": "(X) She very even keeps a snake. ／ (X) He too even keeps a snake.",
        "ok": "(O) She even keeps a snake. ／ (O) He even keeps a snake.",
        "why": "even 自帶「甚至、超出預期」的語意，本身就已經是一個強調語氣的副詞，所以前面不能再加 very 或 too，否則語意重複。另外 too 只能用於肯定句，遇到否定句應該用 either，這也是會考常考的搭配。判斷法：句中已經有 even、very、too、really 其中一個時，就不要再加第二個強調詞。",
        "exOkText": "(O) She **even** keeps a snake as a pet.",
        "exOkZh": "她甚至養了一條蛇當寵物。",
        "exBadText": "(X) She **very even** keeps a snake as a pet.",
        "exBadNote": "錯誤：even 已經表示加強語意，前面不能再加 very"
      },
      {
        "title": "發音錯誤（even 的第一音節不是短音）",
        "bad": "(X) 唸成 /ˈevən/ ／ (X) 中間漏掉 /ə/",
        "ok": "(O) /ˈiː.vən/",
        "why": "even 有兩個音節，第一個是長音 /iː/（和 eat、green 的母音相同），第二個音節是輕輕的 /ən/。台灣學生常唸成短音的「ㄝˋven」，或把中間的 /ə/ 吞掉唸成 /iːvn/，聽者都聽不出是哪個字。判斷法：even 的第一個音節要張開嘴唸，和 eating 一樣長；唸完第二個音節再閉起來，中間那個輕音不能省。",
        "exOkText": "(O) She **even** keeps a snake as a pet. （even 唸 /ˈiː.vən/）",
        "exOkZh": "她甚至養了一條蛇當寵物。",
        "exBadText": "(X) She **eeven** keeps a snake as a pet.",
        "exBadNote": "錯誤：even 是 e-v-e-n，中間的 e 不能重複，唸出來的音就不對了"
      },
      {
        "title": "拼寫與字距錯誤（even 常被誤寫）",
        "bad": "(X) evan ／ (X) evn ／ (X) sheeven keeps a snake",
        "ok": "(O) even ／ (O) she even keeps a snake",
        "why": "even 由 e、v、e、n 四個字母組成，中間的 v 千萬不能漏，也不能把其中一個 e 換成 a。台灣學生常寫成 evan、evn，或把 even 和前面的字黏成 sheeven，答案卡上會被直接判錯。判斷法：把 even 拆成 e-v-e-n 四格，一格一個字母；even 和前一個字之間一定要有空格，和下一個動詞之間也要有空格。",
        "exOkText": "(O) She **even** keeps a snake as a pet.",
        "exOkZh": "她甚至養了一條蛇當寵物。",
        "exBadText": "(X) She **evn** keeps a snake as a pet.",
        "exBadNote": "錯誤：even 拼寫少了一個字母 v，應寫成 even"
      }
    ],
    "traps": [
      "**關鍵字陷阱 even 的位置**：even 修飾動作，放在主要動詞前。(X) She keeps a snake even as a pet. 一律判錯。",
      "**關鍵字陷阱 very even**：even 本身就是強調副詞，不能再加 very；too 更不能出現在否定句裡。",
      "**關鍵字陷阱 even / ever / never**：三個都是副詞，意思分別是「甚至」「曾經」「從來不」，考題常拿來互換測驗。",
      "**關鍵字陷阱拼字與空格**：even 的 e-v-e-n 四個字母不能漏，句首要大寫 Even，與前一個字之間要有空格。"
    ],
    "strategy": [
      "把 even 當成動詞前的小招牌，寫句子時先寫 she ___ keeps，中間那一格就是留給 even 的。",
      "背一組對照：even 竟然、ever 曾經、never 從來不，三個詞一起記不容易混。",
      "改錯練習時專門找副詞位置，把選項裡位置錯亂的 even 挑出來。",
      "even / very / too 三選一，寫完檢查有沒有重複使用強調詞。",
      "唸英文時用嘴型確認：even 的第一音節要張嘴，唸成「ㄝˋven」就要立刻修正。"
    ]
  },
  "she even keeps a snake as a pet": {
    "zh": "她甚至養了一條蛇作為寵物",
    "ipa": "ʃiː ˈiː.vən kiːps ə sneɪk æz ə pet",
    "intro": "針對您提供的 **she even keeps a snake as a pet**，這是一個完整的簡單句，採用「主詞 + 副詞 + 動詞 + 受詞 + 介系詞片語」的標準語序，用一般現在式描述她長期的飼養習慣。最該注意的是主詞 she 與動詞 keeps 的一致，以及英文基本語序和中文的差異。",
    "headline": "完整句語序：主詞 → 副詞 → 動詞 → 受詞 → 修飾",
    "structure": [
      {
        "role": "主詞",
        "token": "she",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主角，表示「她」；主詞是單數，後面的實義動詞就要加 -s",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "even",
        "pos": "副詞 (Adverb)",
        "func": "加強語氣表示「甚至」，位置在主要動詞前，插在主詞和動詞之間",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "keeps",
        "pos": "動詞 (Verb) — keep 的第三人稱單數現在式",
        "func": "表示持續飼養的動作；因為主詞是 she，所以用 -s 形式",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "a snake",
        "pos": "名詞片語 (Noun Phrase) — 受詞",
        "func": "接受 keep 動作的對象，冠詞 a 不能省，必須緊接在動詞之後",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "as",
        "pos": "介系詞 (Preposition)",
        "func": "表示身分，開啟 as a pet，說明飼養的方式",
        "mark": "O"
      },
      {
        "role": "身分片語",
        "token": "as a pet",
        "pos": "介系詞片語 (Preposition Phrase)",
        "func": "後置修飾受詞 a snake，說明這條蛇的飼養身分，不可拆開",
        "mark": "O"
      },
      {
        "role": "句型",
        "token": "she even keeps a snake as a pet",
        "pos": "簡單句 (Simple Sentence)",
        "func": "只有一個主要動詞 keeps，是在最基礎 S + V 句型上加入副詞與修飾語的擴充句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞與動詞不一致（第三人稱單數漏 -s）",
        "bad": "(X) She keep a snake as a pet. ／ (X) She keep even a snake as a pet.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) She even keeps a snake as a pet.",
        "why": "主詞 she 是第三人稱單數，後面的實義動詞必須變成 keeps。副詞 even 的插入不會改變主詞的數，也不會讓動詞變回原形。學生在句子變長之後特別容易忘記加 -s，因為注意力都放在受詞和修飾語上。判斷法：寫完整句時先把主詞和動詞寫在一起 she keeps，中間再插入其他成分，順序一亂就會忘。",
        "exOkText": "(O) She **keeps** a snake as a pet at home.",
        "exOkZh": "她在家裡養了一條蛇當寵物。",
        "exBadText": "(X) She **keep** a snake as a pet at home.",
        "exBadNote": "錯誤：主詞 She 是第三人稱單數，動詞要加 -s 變成 keeps"
      },
      {
        "title": "英文基本語序錯誤（受詞提前）",
        "bad": "(X) She a snake keeps as a pet. ／ (X) She a snake as a pet keeps even.",
        "ok": "(O) She keeps a snake as a pet. ／ (O) She even keeps a snake as a pet.",
        "why": "英文的基本語序是「主詞 + 動詞 + 受詞」，受詞一定在動詞之後。中文可以說「她一條蛇養」，學生照著中文語序翻譯，就會把 a snake 擺到 keeps 前面，整句讀起來不成句。判斷法：先寫主詞和動詞 she keeps，再把其他成分由內往外加——受詞、修飾語、副詞依序補上去。",
        "exOkText": "(O) She **keeps a snake as a pet**.",
        "exOkZh": "她養了一條蛇當寵物。",
        "exBadText": "(X) She **a snake keeps** as a pet.",
        "exBadNote": "錯誤：受詞必須在動詞之後，不能把 a snake 提到 keeps 前面"
      },
      {
        "title": "後置修飾被拆開（代詞放到介系詞前）",
        "bad": "(X) She keeps as a pet it. ／ (X) She keeps as a pet a snake.",
        "ok": "(O) She keeps it as a pet. ／ (O) She keeps a snake as a pet.",
        "why": "as a pet 是一個不可拆的介系詞片語，必須完整地接在受詞後面，拆開或移到別的位置，句子就失去「身分」的意思。另外用代詞 it 時，it 一定要在 as a pet 前面，不能被夾到後面去。判斷法：把 as a pet 圈起來當一個單位，移動時整個一起移動，裡面任何一個字都不能單獨拿出來。",
        "exOkText": "(O) She keeps **it as a pet** in her bedroom.",
        "exOkZh": "她在臥室裡把它當寵物養著。",
        "exBadText": "(X) She keeps **as a pet it** in her bedroom.",
        "exBadNote": "錯誤：代詞 it 不能放在介系詞片語 as a pet 前面，應寫 keeps it as a pet"
      },
      {
        "title": "代詞使用錯誤（she 與 her 混用）",
        "bad": "(X) Her even keeps a snake as a pet. ／ (X) She keeps she snake as a pet.",
        "ok": "(O) She even keeps a snake as a pet. ／ (O) She keeps her snake as a pet.",
        "why": "she 是主格代詞，只能放在主詞位置、動詞前面；her 是物主代詞，只能放在名詞前面修飾所有物。學生常把兩個搞混，寫出 Her keeps… 或在名詞前誤用 she。判斷法：看到後面有動詞，就把 she 當主詞；看到後面接名詞，就用 her / his / my。唸出來時 she 的音比 her 長，可以當成口訣。",
        "exOkText": "(O) **She** keeps **her** snake as a pet in her room.",
        "exOkZh": "她把自己的蛇當寵物養在房間裡。",
        "exBadText": "(X) **Her** keeps **she** snake as a pet in her room.",
        "exBadNote": "錯誤：主詞要用主格 she，名詞前要用物主代詞 her"
      }
    ],
    "traps": [
      "**關鍵字陷阱 she / her**：she 在動詞前當主詞，her 在名詞前當定語。寫完檢查一次位置就分得清。",
      "**關鍵字陷阱 S + V + O**：受詞一定要在動詞後面。(X) She a snake keeps… 一律判錯。",
      "**關鍵字陷阱 as a pet 的完整性**：介系詞片語不可拆開，用代詞 it 替換受詞時位置也要照原樣。",
      "**關鍵字陷阱三單數**：句子再長，主詞是 she，動詞就必須是 keeps。"
    ],
    "strategy": [
      "寫複雜句先寫骨架：she ___ a snake，兩個空格分別填動詞和受詞，最後再加工修飾語。",
      "唸整句時用停頓檢查語序：she / even / keeps / a snake / as a pet，五個部分依序出現就對了。",
      "把 even 當成插在主詞和動詞之間的東西，位置就不會跑到後面。",
      "as a pet 整個圈起來，絕不單獨移動其中任何一個字。",
      "每次寫完英文句子，用手指從頭到尾點一次，確認每一段都在正確的位置上。"
    ]
  },
  "doll": {
    "zh": "洋娃娃",
    "ipa": "dɑːl",
    "intro": "針對您提供的單字 **doll**，這是一個可以單獨使用的單字，不是完整句子。它指「洋娃娃」這種玩具，是可數名詞，複數是 dolls。最該注意的是它和 puppet（人偶）、toy（玩具）的差別，以及字首的 d 要發出有聲的 /d/ 音、結尾是兩個 l。",
    "headline": "doll 是洋娃娃：拼 d-o-ll、d 發 /d/、複數 dolls",
    "structure": [
      {
        "role": "詞彙本體",
        "token": "doll",
        "pos": "名詞 (Noun) — 可數名詞、單數",
        "func": "指「洋娃娃」，常與 house 組成複合名詞 a doll's house",
        "mark": "O"
      },
      {
        "role": "拼寫與音節",
        "token": "d-o-ll",
        "pos": "字母與音節 (Letters and Syllables)",
        "func": "四個字母、單音節；結尾的兩個 l 都要寫出來，漏一個就變成另一個字",
        "mark": "O"
      },
      {
        "role": "子音與母音",
        "token": "d / -oll",
        "pos": "發音部位 (Sounds)",
        "func": "d 是有聲的舌頭音要彈出 /d/；母音 o 讀長音 /ɑː/，和 ball、call 相同",
        "mark": "O"
      },
      {
        "role": "變化形式",
        "token": "dolls",
        "pos": "複數形式 (Plural Form)",
        "func": "名詞複數直接加 -s，唸成 /dɑːlz/，和單數結尾的 /l/ 聽起來不同",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "詞義混淆（doll / puppet / toy）",
        "bad": "(X) She has a puppet which can talk. ／ (X) He bought a doll for his son.",
        "ok": "(O) She has a doll which can talk. ／ (O) He bought a toy for his son.",
        "why": "doll 特指「洋娃娃」，是小孩抱著玩的布偶或塑膠人偶；puppet 是「手套木偶、戲劇用的提線或布袋木偶」；toy 是「玩具」的總稱，範圍最大。會考閱讀如果出現 children、play、cute、bedroom 等線索，通常對應 doll。判斷法：翻譯中文的「洋娃娃」固定寫 doll，其他情境才用 toy 或 puppet。",
        "exOkText": "(O) This **doll** has long hair and a red dress.",
        "exOkZh": "這個洋娃娃有長頭髮和一條紅裙子。",
        "exBadText": "(X) This **puppet** has long hair and a red dress.",
        "exBadNote": "錯誤：puppet 是戲劇用的木偶；抱在手上玩的洋娃娃是 doll"
      },
      {
        "title": "拼寫錯誤（doll 的雙 l 不能漏或增）",
        "bad": "(X) a dol ／ (X) two dolles",
        "ok": "(O) a doll ／ (O) two dolls",
        "why": "doll 的結尾是兩個 l 一起，寫成 dol 就少了一個字母；複數是直接加 -s 變成 dolls，不是 dolles。台灣學生常在聽寫時把 doll 誤寫成 dolle 或 dolll。判斷法：把 doll 拆成 d-o-l-l 四格，兩個 l 各寫一格再加 s；唸的時候結尾 /l/ 只出現一次，但寫的時候兩個 l 都要在。",
        "exOkText": "(O) My sister has a **doll** and a toy box.",
        "exOkZh": "我姊姊有一個洋娃娃和一個玩具箱。",
        "exBadText": "(X) My sister has a **dol** and a toy box.",
        "exBadNote": "錯誤：doll 結尾有兩個 l，拼成 dol 少了一個字母"
      },
      {
        "title": "發音錯誤（d 沒彈舌或元音唸短音）",
        "bad": "(X) 把 doll 唸成 /tɑːl/ ／ (X) 母音唸成短音 /ɒ/",
        "ok": "(O) /dɑːl/",
        "why": "doll 的第一個音是有聲的 /d/，舌尖要頂住上齒龈再彈開，不能唸成 /t/（那會變成 toll「通行費」），也不能省略；母音 o 讀長音 /ɑː/，和 ball、call、all 一樣。台灣學生常唸成「ㄉㄡˋ」把 o 唸成短音。判斷法：唸 doll 時先閉嘴再彈舌發出 /d/，然後把嘴張大唸長音 /ɑː/，和 all 對照唸一次。",
        "exOkText": "(O) The **doll** is sitting on the bed.",
        "exOkZh": "那個洋娃娃坐在床上。",
        "exBadText": "(X) She bought a **tol** for her sister.",
        "exBadNote": "錯誤：把 doll 的 d 唸成 t，拼成 tol 變成 toll「通行費」，聽起來完全不同"
      },
      {
        "title": "單複數變化與複合名詞的所有格",
        "bad": "(X) She has two doll. ／ (X) a dolls house",
        "ok": "(O) She has two dolls. ／ (O) a doll's house",
        "why": "doll 是可數名詞，數量一變就要加 -s：two dolls。複合名詞的複數只加在緊接數字或冠詞的那一個字上，而「娃娃屋」因為表示兩個主體的關係（娃娃的家）要加所有格 's，寫成 a doll's house，不能寫成 a dolls house。判斷法：兩個名詞並排時，先看要不要表達「所有」，要表達就用 's，不要表達就加 -s。",
        "exOkText": "(O) She has three **dolls** in her room.",
        "exOkZh": "她房間裡有三個洋娃娃。",
        "exBadText": "(X) She has three **doll** in her room.",
        "exBadNote": "錯誤：數字 three 之後的名詞要加 -s，應寫成 three dolls"
      }
    ],
    "traps": [
      "**關鍵字陷阱 doll / toll / dol**：doll 是洋娃娃，toll 是通行費，只差一個字母，會考單字題常拿來混淆。",
      "**關鍵字陷阱 doll / puppet / toy**：洋娃娃是 doll，人偶是 puppet，玩具的總稱是 toy，三者不可互換。",
      "**關鍵字陷阱 a doll's house**：娃娃屋要有所有格 's，寫成 a dolls house 就是錯的。",
      "**關鍵字陷阱 two doll**：數字後面一定要複數化，漏掉 -s 直接扣分。"
    ],
    "strategy": [
      "把 doll 和 ball、call、all 放在一起唸，一次練會長音 /ɑː/。",
      "背三個詞的對照：doll（洋娃娃）、puppet（木偶）、toy（玩具），翻譯時先對號入座。",
      "寫完複數就回頭檢查 -s，這是最容易拿回的分數。",
      "娃娃屋這種複合名詞特別抄三遍，把 's 的位置記牢。",
      "把 doll 拆成 d-o-l-l 四格寫，練幾天後就不會再少字母。"
    ]
  },
  "the doll": {
    "zh": "那個洋娃娃",
    "ipa": "ðə dɑːl",
    "intro": "針對您提供的 **the doll**，這是由「定冠詞 the + 單數可數名詞 doll」組成的名詞片語，表示「那個洋娃娃」，單獨出現時還不是完整句子。最該注意的是 a 與 the 的差別：第一次提到的動物用 a，再次提到、指特定的那一個時才用 the。",
    "headline": "特定的那一個才用 the；單數名詞配 is / was",
    "structure": [
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "定冠詞 (Definite Article)",
        "func": "表示特指「那個（大家都知道的那隻）」；後面接單音節或子音開頭的單字時，the 要弱讀成 /ðə/",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "doll",
        "pos": "名詞 (Noun) — 單數可數名詞",
        "func": "指特定的洋娃娃；單數名詞後面的 be 動詞要配 is 或 was",
        "mark": "O"
      },
      {
        "role": "片語整體",
        "token": "the doll",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "可當主詞（(O) The doll is broken.）或受詞（(O) She bought the doll.）",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞選擇錯誤（再次提到仍用 a）",
        "bad": "(X) I bought a doll yesterday. A doll is on the desk. ／ (X) She has a snake. A snake is her pet.",
        "ok": "(O) I bought a doll yesterday. The doll is on the desk. ／ (O) She has a snake. The snake is her pet.",
        "why": "英文的冠詞會隨談話進行改變：第一次提到某個東西時用 a，再次提到同一個東西時就要換成 the。學生常沿用第一次的寫法，於是出現 I bought a doll. A doll is broken. 這種讀起來像在介紹另一個娃娃的句子。判斷法：唸完整段時問自己「前面提過這隻娃娃了嗎？」提過就換 the，這在口說與寫作都是必考規則。",
        "exOkText": "(O) I bought a doll yesterday. **The doll** is on the desk now.",
        "exOkZh": "我昨天買了一個洋娃娃。那個娃娃現在在桌上。",
        "exBadText": "(X) I bought a doll yesterday. **A doll** is on the desk now.",
        "exBadNote": "錯誤：第二句指的是同一個娃娃，第二次提到必須用 the"
      },
      {
        "title": "定冠詞誤用（泛指時多加 the）",
        "bad": "(X) The dolls are friendly animals. ／ (X) The water is important.",
        "ok": "(O) Dolls are friendly animals. ／ (O) Water is important.",
        "why": "the 用來指「特定的、我們都知道是哪一個」，如果是要泛指一整類或一般現象，就不能加 the。中文沒有冠詞，學生很容易把 the 當成「這一類」的標記而多加。判斷法：句中的名詞如果沒有特定對象，例如談一般種類、學科或物質名稱，就不加 the；複數泛指時更是直接不加冠詞。",
        "exOkText": "(O) **Dolls** are usually made of cloth or plastic.",
        "exOkZh": "洋娃娃通常是用布或塑膠做的。",
        "exBadText": "(X) **The dolls** are usually made of cloth or plastic.",
        "exBadNote": "錯誤：泛指整類洋娃娃時，複數前面不加冠詞"
      },
      {
        "title": "冠詞與指示形容詞重複（the + this）",
        "bad": "(X) Look at the this doll on the bed. ／ (X) I like the that doll.",
        "ok": "(O) Look at this doll on the bed. ／ (O) I like that doll.",
        "why": "the 和 this / that 都是限定詞，一個名詞前面只能擇一。this is the doll 已經把關係講清楚了，the 就是多餘的；想強調「那個娃娃」就直接用 that doll。學生常在翻譯中文「這那個娃娃」時把兩個英文限定詞都寫進去。判斷法：名詞前面只能站一個限定詞，寫完第二個就刪掉第一個，兩個都不能省的情況根本不存在。",
        "exOkText": "(O) This **doll** is broken. ／ (O) The **doll** is broken.",
        "exOkZh": "這個洋娃娃壞了。／那個洋娃娃壞了。",
        "exBadText": "(X) Look at **the this** doll on the bed.",
        "exBadNote": "錯誤：the 與 this 都是限定詞，不能同時修飾同一個名詞"
      },
      {
        "title": "be 動詞與單複數不一致",
        "bad": "(X) The doll are on the bed. ／ (X) The doll were new.",
        "ok": "(O) The doll is on the bed. ／ (O) The doll was new.",
        "why": "the doll 是單數名詞，所以搭配的 be 動詞必須用 is / was；複數名詞 dolls 才是 are / were。中文「這個娃娃在床上」沒有動詞變化，學生常一律用 are。判斷法：看到 be 動詞時先找前面的主詞，單數就是 is 或 was，複數才是 are 或 were；doll 和 dolls 只差一個 s，很容易看漏。",
        "exOkText": "(O) **The doll** is on the bed, and the cats are on the sofa.",
        "exOkZh": "洋娃娃在床上，貓在沙發上。",
        "exBadText": "(X) **The doll** are on the bed, and the cats is on the sofa.",
        "exBadNote": "錯誤：the doll 是單數要用 is，the cats 是複數要用 are"
      }
    ],
    "traps": [
      "**關鍵字陷阱 a → the**：第一次提到用 a，第二次提到同一個東西要換 the，這是口說與寫作都常考的規則。",
      "**關鍵字陷阱泛指不加 the**：談整類事物（Dolls are toys.）或一般物質（Water is important.）時一律不加 the。",
      "**關鍵字陷阱 the + this/that**：一個名詞前面只能有一個限定詞，出現 the this、the that 就是錯的。",
      "**關鍵字陷阱單數配 is**：the doll 是單數，be 動詞用 is / was；只有 dolls 才是 are / were。"
    ],
    "strategy": [
      "口說練習時刻意做兩次介紹：a doll… and the doll…，把冠詞變化練成反射動作。",
      "看到單數名詞就先在旁邊寫 is，看到複數就寫 are，再回頭把句子填完整。",
      "泛指的句子特別練習用零冠詞，例如 (O) Snakes are good pets.",
      "複數詞 dolls 一定要寫出來，兩個 l 加 s，缺一不可。",
      "翻譯完檢查三件事：該用 a 還 the、限定詞有沒有重複、主詞和動詞的數一不一致。"
    ]
  },
  "eyes": {
    "zh": "眼睛",
    "ipa": "aɪz",
    "intro": "針對您提供的單字 eyes，這是一個單獨的單字（名詞），還不能自己構成一個完整句子，通常只能拿來當主詞或受詞使用。eye 的複數是 eyes，表示「眼睛」，在會考裡常出現在 have ... eyes 這類高頻句型中。中文的「眼睛」沒有單複數的差別，但英文只要數量超過一，就一定要把 -s 加上去。",
    "headline": "eye 的複數是 eyes，別漏掉 -s",
    "structure": [
      {
        "role": "單字",
        "token": "eyes",
        "pos": "名詞 (Noun) — eye 的複數形",
        "func": "表示「眼睛」；人的眼睛有兩隻，所以用複數 eyes 這個形式",
        "mark": "O"
      },
      {
        "role": "構字",
        "token": "eye + s",
        "pos": "構字規則 (Word Formation)",
        "func": "可數名詞變複數通常在字尾加 -s：eye → eyes；注意 eyesight（視力）是不可數，不能加 -s",
        "mark": "O"
      },
      {
        "role": "常見誤用",
        "token": "eye",
        "pos": "名詞 (Noun) — 單數形",
        "func": "只能表示「一隻眼睛」；若要指自己的雙眼，必須改回複數 eyes",
        "mark": "X"
      }
    ],
    "mistakes": [
      {
        "title": "單複數錯誤（複數漏加 -s）",
        "bad": "(X) She has two **eye**. ／ (X) The doll has big brown **eye**.",
        "ok": "(O) She has two brown **eyes**.",
        "why": "eye 是可數名詞，只要數量超過一隻，就必須變成複數 eyes。中文的「眼睛」沒有單複數的變化，學生常以為寫一個「眼」字就夠了，於是寫出 two eye。判斷法：看到 two、three、many、a few、a lot of 等數量詞，後面的可數名詞一定要加 -s；口訣是「數字一到，s 跑不掉」。",
        "exOkText": "(O) The baby has big brown **eyes**.",
        "exOkZh": "那個嬰兒有著棕色的眼睛。",
        "exBadText": "(X) The baby has big brown **eye**.",
        "exBadNote": "錯誤：baby 的眼睛有兩隻，eye 應改成複數 eyes"
      },
      {
        "title": "拼字錯誤（字母順序或重複）",
        "bad": "(X) I have a sore **eay**. ／ (X) She has big **eies**.",
        "ok": "(O) She has big brown **eyes**.",
        "why": "eye 的字母順序是 e-y-e，複數是 e-y-e-s。國中生常把 y 擺錯位置，或忘記最後的 s，寫成 eay、eies、eyess。這種錯在會考的單字題、克漏字、連線題都會出現，只要把 eye → eyes 這個對寫五遍就能記牢。判斷法：唸的時候耳朵當裁判，邊寫邊唸 /aɪ/、/aɪz/，寫錯的形狀馬上就會露出來。",
        "exOkText": "(O) She has beautiful **eyes**.",
        "exOkZh": "她有一雙美麗的眼睛。",
        "exBadText": "(X) She has beautiful **eies**.",
        "exBadNote": "錯誤：eye 拼成 eies，字母順序錯誤又漏了 s"
      },
      {
        "title": "詞性誤用（把名詞 eyes 當動詞用）",
        "bad": "(X) She **eyes** the boy every day.",
        "ok": "(O) Her **eyes** are big.",
        "why": "eyes 是名詞，擔任主詞或受詞，不能自己當動詞，更不需要加 -s。學生常因為中文「看」這個動作很直覺，就把 eyes 誤以為相當於 see。判斷法：eyes 前面一定要有主詞或限定詞（例如 Her eyes、the doll's eyes、big brown eyes），後面若接動詞，前面就必須先有形容詞或物主代名詞。",
        "exOkText": "(O) His **eyes** are bright and big.",
        "exOkZh": "他的眼睛又大又亮。",
        "exBadText": "(X) He **eyes** the present twice.",
        "exBadNote": "錯誤：eyes 是名詞，不能加 -s 之後當動詞用"
      },
      {
        "title": "發音錯誤（同音字 eyes / ice 混淆）",
        "bad": "(X) She has two **ice**.",
        "ok": "(O) She has two brown **eyes**.",
        "why": "eyes 的發音是 /aɪz/，和 ice（冰）完全同音。會考聽力測驗最喜歡拿同音字做干擾選項，聽到 /aɪz/ 卻選成 ice，一題就整個失分。判斷法：eyes 結尾有 /z/ 的氣音，ice 則是清音 /s/，嘴形要放對；寫作時也可以在旁邊註明中文，聽到音立刻對照就能選出正確的字。",
        "exOkText": "(O) The panda has black **eyes**.",
        "exOkZh": "那隻熊貓有黑色的眼睛。",
        "exBadText": "(X) The panda has black **ice**.",
        "exBadNote": "錯誤：/aɪz/ 對應 eyes（眼睛），ice 是「冰」的意思"
      }
    ],
    "traps": [
      "**單複數陷阱**：two / three / many / a few 後面的可數名詞一定要加 -s，eyes 不能只寫成 eye。",
      "**同音字陷阱**：eyes 與 ice 都讀 /aɪz/，聽力測驗常拿來混淆，必須靠前後文判斷。",
      "**可數與不可數陷阱**：eyes（眼睛）可數，但 eyesight（視力）、vision（視覺）是不可數名詞，不能加 -s。",
      "**字形陷阱**：eye 的字母順序是 e-y-e，寫成 eay 就錯了，複數則是 eyes 不是 eies。"
    ],
    "strategy": [
      "唸出聲：把 eye、eyes、ice 各唸三遍，用耳朵分出 /aɪ/ 和 /aɪz/ 的尾音差異。",
      "整片語記憶：記 eyes 不如記 big brown eyes、beautiful eyes 這種搭配，考試時可以整段套用。",
      "寫完檢查：草稿寫完後把所有名詞圈起來，確認該加 -s 的地方都加了。",
      "整理易混字：把 eyes / ice、ear / ear 這類字抄在同一欄，左寫英文、右寫中文。",
      "句型套用：熟記 have big brown eyes 這個高頻句型，閱讀測驗看到就立刻反應。"
    ]
  },
  "brown eyes": {
    "zh": "棕色眼睛",
    "ipa": "braʊn aɪz",
    "intro": "針對您提供的 brown eyes，這是一個名詞片語（修飾語加上名詞），不能單獨成句，要放在主詞或受詞的位置才會成為句子的一部分。brown 是顏色形容詞，負責修飾後面的名詞 eyes。這個片語最需要注意的是形容詞一定要放在名詞前面，以及 eyes 必須用複數。",
    "headline": "顏色形容詞放名詞前，eyes 用複數",
    "structure": [
      {
        "role": "形容詞",
        "token": "brown",
        "pos": "形容詞 (Adjective)",
        "func": "表示顏色「棕色的」，放在名詞前面修飾 eyes，這是英文形容詞的標準位置",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "eyes",
        "pos": "名詞 (Noun) — eye 的複數",
        "func": "片語的核心字，表示「眼睛」；因為是一對，所以用複數",
        "mark": "O"
      },
      {
        "role": "常見誤用",
        "token": "eye",
        "pos": "名詞 (Noun) — 單數形",
        "func": "本片語要指一雙眼睛，必須寫 eyes；寫成 eye 是最常見的錯法",
        "mark": "X"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞位置錯誤（放到名詞後面）",
        "bad": "(X) She has **eyes brown**. ／ (X) The doll has **eyes big and brown**.",
        "ok": "(O) She has **brown eyes**.",
        "why": "英文的形容詞要放在被修飾的名詞前面，這叫做「形容詞前位」。中文卻常說「棕色的眼睛」，把形容詞放後面，學生因此照著中文語序寫出 eyes brown。判斷法：把兩個詞互換位置，讀起來「名詞 + 形容詞」就一定是錯的；brown 這種顏色詞永遠站名詞前面。",
        "exOkText": "(O) The panda has **brown eyes**.",
        "exOkZh": "那隻熊貓有棕色的眼睛。",
        "exBadText": "(X) The panda has **eyes brown**.",
        "exBadNote": "錯誤：brown 是形容詞，必須放在名詞 eyes 前面"
      },
      {
        "title": "單複數錯誤（複數漏加 -s）",
        "bad": "(X) She has brown **eye**. ／ (X) His brown **eye** are big.",
        "ok": "(O) She has brown **eyes**.",
        "why": "brown 只是一個修飾語，真正負責數量的是 eyes。只要在講「一雙眼睛」或任何兩隻以上的情況，就一定要用複數 eyes。學生常在寫 the doll has big brown eyes 時，把焦點放在片語而忘了名詞本身要變。判斷法：先找片語裡的核心名詞，再單獨檢查它有沒有加 -s。",
        "exOkText": "(O) My little sister has **brown eyes**.",
        "exOkZh": "我的小妹妹有棕色的眼睛。",
        "exBadText": "(X) My little sister has **brown eye**.",
        "exBadNote": "錯誤：眼睛有兩隻，eye 應改為複數 eyes"
      },
      {
        "title": "介系詞誤用（在名詞間多加 of）",
        "bad": "(X) The doll has eyes **of** brown.",
        "ok": "(O) The doll has **brown** eyes.",
        "why": "英文形容詞直接放在名詞前修飾，中間不需要任何介系詞。學生受中文「棕色的眼睛」影響，會以為要先用 of 連接顏色詞和名詞。判斷法：of 是「某人的某物」的專用介系詞，要和名詞、複數名詞連用（the eyes of the doll），不能夾在兩個單數名詞中間；顏色詞 + 名詞中間一律不加東西。",
        "exOkText": "(O) The giraffe has **brown eyes**.",
        "exOkZh": "那隻長頸鹿有棕色的眼睛。",
        "exBadText": "(X) The giraffe has eyes **of brown**.",
        "exBadNote": "錯誤：顏色形容詞直接修飾名詞，不可以在中間加 of"
      },
      {
        "title": "拼字錯誤（brown 拼成 bom / brwon）",
        "bad": "(X) She has **bom** eyes. ／ (X) He has **brwon** eyes.",
        "ok": "(O) She has **brown** eyes.",
        "why": "brown 的字母順序是 b-r-o-w-n，是一個國中必背的顏色單字。學生常把 w 和 o 對調寫成 brwon，或受中文「棕」字的影響寫成 bom。判斷法：brown 和 crown（皇冠）的字首一樣，都是 br 開頭，記 crown 就能帶出 brown；寫完後用手指一個字一個字指著唸。",
        "exOkText": "(O) The little dog has **brown eyes**.",
        "exOkZh": "那隻小狗有棕色的眼睛。",
        "exBadText": "(X) The little dog has **brwon eyes**.",
        "exBadNote": "錯誤：brown 拼成 brwon，字母順序錯了"
      }
    ],
    "traps": [
      "**形容詞位置陷阱**：英文形容詞一律放名詞前面，eyes brown 這種寫法一定錯。",
      "**介系詞誤加陷阱**：of 專門用在「名詞 of 名詞」，顏色形容詞和名詞之間不能加 of。",
      "**複數陷阱**：片語裡修飾語再漂亮，核心名詞 eyes 一樣要加 -s。",
      "**可數性陷阱**：eyes 可數可複數，但 eyesight（視力）不可數，兩者不要混用。"
    ],
    "strategy": [
      "畫箭頭：複習時在 brown 和 eyes 之間畫一條箭頭，提醒自己箭頭只能從形容詞指向名詞。",
      "詞類分組背：把 brown、blue、big、beautiful 這些形容詞和 eyes 放在一起背，寫作時自然先想形容詞。",
      "複數隨身查：口算時養成「先找名詞、馬上看要不要 -s」的順序，錯率最低。",
      "整句練習：把 She has brown eyes. 這種完整句抄寫五遍，比只背單字有效。",
      "考卷回掃：交卷前把片語裡的名詞再圈一次，專抓漏 -s 的問題。"
    ]
  },
  "big brown eyes": {
    "zh": "大棕色眼睛",
    "ipa": "bɪɡ braʊn aɪz",
    "intro": "針對您提供的 big brown eyes，這是一個名詞片語（兩個修飾語加一個名詞），同樣不能單獨成句。這個片語比前一個多了 big，因此要處理兩個形容詞之間的順序問題。big 講大小、brown 講顏色，兩者同時出現時位置不能隨便換。",
    "headline": "大小在顏色前：big brown eyes",
    "structure": [
      {
        "role": "形容詞",
        "token": "big",
        "pos": "形容詞 (Adjective)",
        "func": "表示大小「大」，負責修飾 eyes，位置在最前面",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "brown",
        "pos": "形容詞 (Adjective)",
        "func": "表示顏色「棕色的」，排在 big 之後、eyes 之前",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "eyes",
        "pos": "名詞 (Noun) — eye 的複數",
        "func": "片語的核心，表示「眼睛」，要放在所有修飾語後面",
        "mark": "O"
      },
      {
        "role": "常見誤用",
        "token": "brown big eyes",
        "pos": "形容詞片語 (Adjective Phrase)",
        "func": "兩個形容詞順序顛倒，big（大小）必須排在 brown（顏色）前面",
        "mark": "X"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞順序錯誤（big 與 brown 對調）",
        "bad": "(X) The doll has **brown big eyes**.",
        "ok": "(O) The doll has **big brown eyes**.",
        "why": "英文多形容詞的順序有固定習慣：大小 → 形狀 → 顏色 → 材料 → 用途，所以 big（大）一定在 brown（棕色）前面。中文可以說「大棕色的」或「棕色大的」都通順，學生就容易照中文順序亂排。判斷法：把兩個形容詞想成「體積戶籍資料」——尺寸先講、顏色後講，寫完唸一次就會記住。",
        "exOkText": "(O) The toy bear has **big brown eyes**.",
        "exOkZh": "那隻玩具熊有著大大的棕色眼睛。",
        "exBadText": "(X) The toy bear has **brown big eyes**.",
        "exBadNote": "錯誤：big（大小）必須在 brown（顏色）之前"
      },
      {
        "title": "修飾語遺漏（漏掉 brown）",
        "bad": "(X) The doll has **big eyes**.",
        "ok": "(O) The doll has **big brown eyes**.",
        "why": "片語裡的每個修飾語都有它要傳達的訊息，漏掉一個，句子就不完整了。big eyes 只是一般的大眼睛，只有加上 brown 才指出顏色。學生在克漏字或翻譯題常把看得懂的詞先填進去，剩下的就不管了。判斷法：翻譯題做完後把中文和英文逐詞對照一次，「棕色的」沒有對到 brown 就是漏掉了。",
        "exOkText": "(O) The giraffe has **big brown eyes**.",
        "exOkZh": "那隻長頸鹿有著又大又棕色的眼睛。",
        "exBadText": "(X) The giraffe has **big eyes**.",
        "exBadNote": "錯誤：漏掉顏色形容詞 brown，片語資訊不完整"
      },
      {
        "title": "大小寫錯誤（形容詞隨意大寫）",
        "bad": "(X) She has big **Brown** eyes.",
        "ok": "(O) She has big **brown** eyes.",
        "why": "英文只有專有名詞（人名、地名、國名、姓氏）與句子的第一個字需要大寫，普通的顏色形容詞一律小寫。學生常覺得「Brown eyes」看起來比較正式，於是隨手大寫。判斷法：大寫前先自問「這是某個專有名詞的名稱嗎？」不是的話就一定是小寫；會考的單字與改錯題很愛考這一點。",
        "exOkText": "(O) The doll has **big brown** eyes.",
        "exOkZh": "那個洋娃娃有著大而棕色的眼睛。",
        "exBadText": "(X) The doll has big **Brown** eyes.",
        "exBadNote": "錯誤：brown 是普通形容詞，不可隨意大寫"
      },
      {
        "title": "介系詞誤用（誤加 of / with）",
        "bad": "(X) The doll has eyes **of big brown**. ／ (X) The doll has **with** big brown eyes.",
        "ok": "(O) The doll has **big brown eyes**.",
        "why": "這裡的名詞已經被兩個形容詞完整修飾，中間不需要也不允許再加介系詞。of 只能用在「the eyes of the doll」這種句型，with 則要放名詞後面當後置修飾。判斷法：形容詞 + 名詞中間永遠是空的；看到 of 或 with 夾在中間，八成就是錯的。",
        "exOkText": "(O) The toy has **big brown eyes**.",
        "exOkZh": "那個玩具有著大大的棕色眼睛。",
        "exBadText": "(X) The toy has eyes **of big brown**.",
        "exBadNote": "錯誤：形容詞與名詞之間不可以加介系詞 of"
      }
    ],
    "traps": [
      "**形容詞順序陷阱**：多形容詞依「大小 → 顏色」排列，big 一定在 brown 之前，寫反就錯。",
      "**資訊完整陷阱**：big eyes 與 big brown eyes 意思不同，不能只寫自己會的那個詞。",
      "**大寫規則陷阱**：只有專有名詞和句首才大寫，big、brown 這種普通形容詞一定要小寫。",
      "**介系詞位置陷阱**：形容詞與名詞之間不能夾 of、with、for 等介系詞。"
    ],
    "strategy": [
      "口訣背誦：把「大小→形狀→顏色→材料」八個字寫在筆記本角落，每個片語都照這順序排。",
      "填空的捷徑：遇到選擇題先找最後的名詞，再從後往前把形容詞依序放回去。",
      "翻譯對照：完成翻譯題後逐詞檢查，確認中文的每個形容詞都有對應的英文。",
      "唸整串：big brown eyes 連在一起唸十遍，語感會自然記住順序。",
      "錯誤本累積：把寫錯的 brown big eyes 抄在錯題本上，考前複習一次就夠。"
    ]
  },
  "with big brown eyes": {
    "zh": "帶著大棕色眼睛的",
    "ipa": "wɪð bɪɡ braʊn aɪz",
    "intro": "針對您提供的 with big brown eyes，這是一個介系詞片語，單獨使用時不能成句，一定要接在名詞後面當後置修飾。with 在這裡不是「和」的意思，而是「有著、帶著」。這個片語要特別注意 with 這個介系詞不能隨意替換，以及後面的形容詞與名詞都不能簡化。",
    "headline": "with 是「帶著」，接在名詞後面修飾",
    "structure": [
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "表示「帶著、有著」，後面接名詞或名詞片語；出現時通常放在它所修飾的名詞後面",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "big brown",
        "pos": "形容詞片語 (Adjective Phrase)",
        "func": "big 表示大小、brown 表示顏色，依「大小→顏色」的順序排列",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "eyes",
        "pos": "名詞 (Noun) — eye 的複數",
        "func": "片語中被修飾的名詞，表示「眼睛」，必須用複數且放在 with 的後面",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（of / for 取代 with）",
        "bad": "(X) The doll **of** big brown eyes is mine. ／ (X) The doll **for** big brown eyes is mine.",
        "ok": "(O) The doll **with** big brown eyes is mine.",
        "why": "with 這個介系詞的意義是「帶著、有著」，用來說明一個東西身上具有某個特徵，後面一定接名詞。of 是「某人的某物」，for 是「為了」，兩者的語意完全不同，換成之後整個片語就不成立。判斷法：中文若翻成「有著……的」，英文就對應 with；出現「的」字不代表英文要用 of。",
        "exOkText": "(O) I bought a doll **with big brown eyes**.",
        "exOkZh": "我買了一個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) I bought a doll **of big brown eyes**.",
        "exBadNote": "錯誤：表示「帶著」要用 with，不可用 of"
      },
      {
        "title": "with 後誤接動詞原形",
        "bad": "(X) The doll **with have** big brown eyes is mine. ／ (X) The doll **with big brown eyes have** is mine.",
        "ok": "(O) The doll **with big brown eyes** is mine.",
        "why": "with 是介系詞，後面只能接名詞、代名詞或名詞片語，絕對不能接動詞。學生常因為中文「有著」聽起來像一個動作，就寫出 with have 或 with has。判斷法：介系詞後面接動詞，必須先變成 -ing 形式或過去分詞；這裡的名詞是 eyes，後面本來就沒有動詞。",
        "exOkText": "(O) The cat **with big brown eyes** is sleeping.",
        "exOkZh": "那隻有著大棕色眼睛的貓正在睡覺。",
        "exBadText": "(X) The cat **with has** big brown eyes is sleeping.",
        "exBadNote": "錯誤：with 是介系詞，後面不能直接接動詞 has"
      },
      {
        "title": "單複數錯誤（eyes 漏加 -s）",
        "bad": "(X) The doll with big brown **eye** is mine.",
        "ok": "(O) The doll with big brown **eyes** is mine.",
        "why": "加了 with 之後，片語變得更長，學生更容易只顧著套介系詞而忘記核心名詞的複數。eyes 指兩隻眼睛，一定要加 -s；寫成 eye 就變成「一隻眼睛」，語意完全不同。判斷法：先在草稿上寫好 with big brown eyes 這一段，再去加前面的名詞，順序反過來就容易顧此失彼。",
        "exOkText": "(O) The toy **with big brown eyes** is on the desk.",
        "exOkZh": "那個有著大棕色眼睛的玩具在書桌上。",
        "exBadText": "(X) The toy **with big brown eye** is on the desk.",
        "exBadNote": "錯誤：eyes 要用複數，不能寫成 eye"
      },
      {
        "title": "拼字錯誤（with 拼成 wath / wirh）",
        "bad": "(X) The doll **wath** big brown eyes is mine. ／ (X) The doll **wirh** big brown eyes is mine.",
        "ok": "(O) The doll **with** big brown eyes is mine.",
        "why": "with 的字母順序是 w-i-t-h，是國中必背的介系詞。學生常把 th 寫成 ht，寫成 wirt、wath，或把 t 和 h 對調成 wirh。判斷法：with 和 without 是一組，記 without（沒有）就會連帶記起 with（帶著）；寫的時候用手指沿著 w-i-t-h 走一遍。",
        "exOkText": "(O) He is a boy **with big brown eyes**.",
        "exOkZh": "他是一個有著大棕色眼睛的男孩。",
        "exBadText": "(X) He is a boy **wath big brown eyes**.",
        "exBadNote": "錯誤：with 拼成 wath，th 的字母順序錯誤"
      }
    ],
    "traps": [
      "**介系詞語意陷阱**：with 是「帶著」，of 是「某人的」，for 是「為了」，三個不能互換。",
      "**介系詞後接詞類陷阱**：with 後面只能接名詞或名詞片語，出現動詞就是錯的。",
      "**後置修飾陷阱**：with 片語要放在它修飾的名詞後面，放到名詞前面就不成立。",
      "**複數陷阱**：片語越長越容易忘記核心名詞的 -s，交卷前要再確認 eyes。"
    ],
    "strategy": [
      "背成對單字：with / without、in / out 一起背，記一次就記住兩組。",
      "定位口訣：先找要修飾的名詞，再把 with 片語貼到它後面，位置就不會亂。",
      "詞性掃描：看到介系詞就把後面的詞念一遍，確認是名詞不是動詞。",
      "整句練習：把 the doll with big brown eyes 整句抄寫，練繫詞 is 的搭配。",
      "標點複查：with 片語作補充說明時，前面常加逗號，寫作時要記得。"
    ]
  },
  "the doll with big brown eyes": {
    "zh": "那個有著大棕色眼睛的洋娃娃",
    "ipa": "ðə dɑːl wɪð bɪɡ braʊn aɪz",
    "intro": "針對您提供的 the doll with big brown eyes，這是一個名詞片語，前面有定冠詞 the，後面接 with 後置修飾。它還是一個可以用來當主詞或受詞的完整名詞群，但本身仍不是句子。這個片語的重點是 the 一定要有，以及 with 後面的修飾不能漏。",
    "headline": "定冠詞 the 不可漏，with 片語放後面",
    "structure": [
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Determiner) — 定冠詞",
        "func": "表示「特定的那一個」，告訴讀者是哪隻洋娃娃；有 the 就代表後面可以接修飾語",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "doll",
        "pos": "名詞 (Noun)",
        "func": "片語的核心，表示「洋娃娃」；被 the 限定，所以用單數",
        "mark": "O"
      },
      {
        "role": "後置修飾",
        "token": "with big brown eyes",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "放在名詞後面補充說明這個洋娃娃的特徵，with 表示「帶著」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "定冠詞錯誤（漏加 the）",
        "bad": "(X) **doll** with big brown eyes is mine. ／ (X) I like **doll** with big brown eyes.",
        "ok": "(O) **The doll** with big brown eyes is mine.",
        "why": "名詞前面有修飾語時，通常要加 the，表示「那一個有著大棕色眼睛的洋娃娃」。學生常以為形容詞已經幫忙識別了，就不必加 the，於是把冠詞漏掉。判斷法：中文出現「那個……的」時，英文前面幾乎一定對應 the；單數可數名詞前面沒有任何詞，句子就不完整。",
        "exOkText": "(O) **The doll with big brown eyes** is on the bed.",
        "exOkZh": "那個有著大棕色眼睛的洋娃娃在床上。",
        "exBadText": "(X) **Doll with big brown eyes** is on the bed.",
        "exBadNote": "錯誤：句首單數可數名詞 doll 前面必須加定冠詞 the"
      },
      {
        "title": "介系詞誤用（with 換成 of）",
        "bad": "(X) The doll **of** big brown eyes is mine.",
        "ok": "(O) The doll **with** big brown eyes is mine.",
        "why": "of 的正確用法是「the eyes of the doll」（洋娃娃的眼睛），這時 of 後面要接完整的所有關係內容。而要表達「帶著大棕色眼睛的洋娃娃」這個整體概念，就必須用 with。學生看到中文的「的」就自動選 of，是最典型的誤用。判斷法：看 of 後面如果只接形容詞加名詞（of big brown eyes），多半不對。",
        "exOkText": "(O) I want **the doll with big brown eyes**.",
        "exOkZh": "我想要那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) I want **the doll of big brown eyes**.",
        "exBadNote": "錯誤：表示「帶著特徵」要用 with，of 會改變句子意思"
      },
      {
        "title": "單複數錯誤（doll 誤用複數）",
        "bad": "(X) The **dolls** with big brown eyes are mine.",
        "ok": "(O) The **doll** with big brown eyes is mine.",
        "why": "定冠詞 the 加上單數名詞，表示特指一隻洋娃娃，後面的 be 動詞就要用 is。如果同時有兩隻以上，才寫 the dolls 並搭配 are。學生常看到 with 後面的 eyes 是複數，就誤以為前面的 doll 也要變複數。判斷法：複數只看它自己前面有沒有 s，後面的修飾語變不變完全不影響。",
        "exOkText": "(O) **The doll with big brown eyes** looks friendly.",
        "exOkZh": "那個有著大棕色眼睛的洋娃娃看起來很可愛。",
        "exBadText": "(X) **The dolls with big brown eyes** looks friendly.",
        "exBadNote": "錯誤：doll 是單數，be 動詞要配 is，不可用 dolls"
      },
      {
        "title": "形容詞順序錯誤（brown big）",
        "bad": "(X) The doll with **brown big eyes** is mine.",
        "ok": "(O) The doll with **big brown eyes** is mine.",
        "why": "多形容詞的固定順序是「大小 → 形狀 → 顏色 → 材料 → 用途」，所以 big 一定在 brown 前面。片段被 with 拉長之後，學生更容易忘記順序，把中文的「棕色大的」直譯過來。判斷法：把形容詞排隊由大到細，尺寸先開口，顏色最後收尾。",
        "exOkText": "(O) She bought **the doll with big brown eyes**.",
        "exOkZh": "她買了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) She bought **the doll with brown big eyes**.",
        "exBadNote": "錯誤：big（大小）要排在 brown（顏色）之前"
      }
    ],
    "traps": [
      "**定冠詞陷阱**：單數可數名詞前若沒有別的詞限定，必須加 the，漏掉就整句不成立。",
      "**of 與 with 陷阱**：the eyes of the doll（某人的某物）用 of；the doll with big brown eyes（帶著某特徵）用 with。",
      "**一致與複數陷阱**：the doll 是單數，係動詞用 is；不要被後面的 eyes 帶走。",
      "**形容詞順序陷阱**：with 片語裡的形容詞一樣遵守大小、顏色的排列順序。"
    ],
    "strategy": [
      "先寫名詞：草稿上先寫 the doll，再把 with big brown eyes 貼在後面，順序不會亂。",
      "圈出冠詞：寫完後把 the、a、an 圈起來檢查，確認單數名詞都有冠詞。",
      "背成對句型：the doll with big brown eyes 整串記，比分開背三個單字有效。",
      "唸出繫動詞：唸 the doll ... is ...，讓單數配 is 變成肌肉記憶。",
      "整理對照表：把 the eyes of the doll 與 the doll with big brown eyes 放在一起比較。"
    ]
  },
  "chose": {
    "zh": "選擇",
    "ipa": "tʃoʊz",
    "intro": "針對您提供的單字 chose，這是一個動詞（choose 的過去式），但單獨一個動詞還不能成句，前面必須有主詞。chose 是不規則動詞的過去式，所以拼法和唸法都跟原形不同。這個單字最要注意的是時態判斷，以及不要和 choose、choice 這幾個形近字搞混。",
    "headline": "choose 的過去式 chose，別寫 choosed",
    "structure": [
      {
        "role": "單字",
        "token": "chose",
        "pos": "動詞 (Verb) — choose 的過去式",
        "func": "表示過去發生的選擇動作，通常放在主詞之後、受詞之前",
        "mark": "O"
      },
      {
        "role": "構字",
        "token": "choose → chose",
        "pos": "構字規則 (Word Formation)",
        "func": "不規則動詞的變化，不能在原形後面加 -ed，要整個換成 chose",
        "mark": "O"
      },
      {
        "role": "易混字",
        "token": "choice",
        "pos": "名詞 (Noun)",
        "func": "是「選擇」的名詞形式，和動詞 chose 不同，不可混用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "原形與第三人稱單數混淆（漏加 -s）",
        "bad": "(X) He **choose** the doll every day.",
        "ok": "(O) He **chose** the doll every day.",
        "why": "chose 是過去式，只能用在已發生的動作上。若寫 He choose the doll every day，every day 就是一般現在式的訊號，主詞 He 是第三人稱單數，動詞必須寫 chooses。學生常看到 chose 就很確定，直接忘了加 -s。判斷法：先看時間，是現在（every day）就用 chooses，是過去（yesterday）才用 chose。",
        "exOkText": "(O) Eric **chose** the doll yesterday.",
        "exOkZh": "埃里克昨天選了那個洋娃娃。",
        "exBadText": "(X) Eric **choose** the doll yesterday.",
        "exBadNote": "錯誤：yesterday 是過去時間，動詞要用過去式 chose"
      },
      {
        "title": "不規則過去式誤加 -ed（choosed）",
        "bad": "(X) Eric **choosed** the doll yesterday.",
        "ok": "(O) Eric **chose** the doll yesterday.",
        "why": "choose 屬於不規則動詞，過去式不是把 -d 加在原形後面，而是整個字換掉，變成 chose。學生看到規則動詞就自動套上 -ed，寫出 choosed、goed、buyed 這種不存在的字。判斷法：背一張不規則動詞表，把 choose、buy、go、eat 這類高频放在一起，寫作時就不會加 -ed。",
        "exOkText": "(O) She **chose** the doll with big brown eyes.",
        "exOkZh": "她選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) She **choosed** the doll with big brown eyes.",
        "exBadNote": "錯誤：choose 是不規則動詞，過去式是 chose，不能加 -ed"
      },
      {
        "title": "詞性誤用（把動詞當名詞用）",
        "bad": "(X) That was a wise **chose**.",
        "ok": "(O) That was a wise **choice**.",
        "why": "chose 是動詞，不能直接當名詞使用；表示「選擇」這個概念的名詞是 choice。學生常因為中文都翻成「選擇」，就以為兩個字可以互換。判斷法：名詞前面要有冠詞、形容詞或所有格標記（a wise __、my __）；如果空格後面接的是句子，就一定要用動詞。",
        "exOkText": "(O) Making a **choice** is not easy.",
        "exOkZh": "做一個選擇並不容易。",
        "exBadText": "(X) Making a **chose** is not easy.",
        "exBadNote": "錯誤：名詞應寫 choice，不能用動詞 chose"
      },
      {
        "title": "拼字錯誤（choze / chos）",
        "bad": "(X) Eric **choze** the doll yesterday. ／ (X) She **chos** it.",
        "ok": "(O) Eric **chose** the doll yesterday.",
        "why": "chose 的拼字是 c-h-o-s-e 五個字母，最後一定要有 e。學生常漏掉尾音 e 寫成 chos，或把 s 誤打成 z 寫成 choze，尤其在聽寫時更容易出錯。判斷法：把 choose 和 chose 當成一組一起唸 /tʃuːz/ 和 /tʃoʊz/，唸出尾音時順便把字母唸出來，e 就記住了。",
        "exOkText": "(O) My sister **chose** the blue one.",
        "exOkZh": "我姐姐選了藍色的那個。",
        "exBadText": "(X) My sister **choze** the blue one.",
        "exBadNote": "錯誤：chose 拼成 choze，s 被誤寫成 z 且漏了 e"
      }
    ],
    "traps": [
      "**不規則變化陷阱**：choose 的過去式是 chose，不能寫 choosed，規則加 -ed 只對規則動詞有效。",
      "**三單陷阱**：every day、usually 是一般現在式訊號，主詞是第三人稱單數時要寫 chooses。",
      "**詞性陷阱**：choose / chose 是動詞，choice 才是名詞，中文同義不代表英文可互換。",
      "**拼字陷阱**：chose 最後有 e，寫成 chos 就是錯的，聽寫題特別容易失分。"
    ],
    "strategy": [
      "整理不規則表：把 choose、buy、come、do、eat 抄成一列，每天複習一次。",
      "時間先行：作答前先圈出 yesterday、last night 等時間詞，再決定用哪個時態。",
      "寫完倒回去看：寫完 chose 後回頭確認有沒有多加 -d 或 -s。",
      "口說帶動手寫：邊寫邊唸 /tʃoʊz/，聲音能幫忙記住拼字。",
      "對照名詞：把 choose（動詞）與 choice（名詞）寫在同一行，隨時複習就不會混。"
    ]
  },
  "chose the doll": {
    "zh": "選擇了那個洋娃娃",
    "ipa": "tʃoʊz ðə dɑːl",
    "intro": "針對您提供的 chose the doll，這是一個動詞片語（動詞加上受詞），前面還需要主詞才能構成完整句子。chose 是過去式動詞，the doll 則是受詞。這個片語的重點在於：past 式要判對、定冠詞 the 不能漏，以及受詞的位置要放對。",
    "headline": "過去式 chose + 受詞 the doll，冠詞別漏",
    "structure": [
      {
        "role": "動詞",
        "token": "chose",
        "pos": "動詞 (Verb) — choose 的過去式",
        "func": "句子的主要動作，表示過去做了某個選擇；還沒有主詞，不能單獨成句",
        "mark": "O"
      },
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Determiner) — 定冠詞",
        "func": "限定接下來的名詞 doll，表示特定的那一個洋娃娃",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "doll",
        "pos": "名詞 (Noun)",
        "func": "被選擇的對象，因為有 the 限定所以用單數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動詞時態錯誤（用原形 choose）",
        "bad": "(X) Eric **choose** the doll last Sunday.",
        "ok": "(O) Eric **chose** the doll last Sunday.",
        "why": "chose 是過去式，通常和 last Sunday、yesterday、two days ago 這類過去時間一起出現。如果句子的時間訊號是過去，動詞就必須用過去式 chose。學生有時會受中文「埃里克選了洋娃娃」影響，以為選了就是過去，卻忘了英文要靠動詞本身變化來表達。判斷法：先圈時間詞，再對照動詞表決定形式。",
        "exOkText": "(O) Eric **chose** the doll with big brown eyes.",
        "exOkZh": "埃里克選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Eric **choose** the doll with big brown eyes.",
        "exBadNote": "錯誤：動詞要用過去式 chose，不能用原形 choose"
      },
      {
        "title": "定冠詞誤用（漏加 the 或誤用 a）",
        "bad": "(X) Eric chose **doll** last Sunday. ／ (X) Eric chose **a** doll last Sunday.",
        "ok": "(O) Eric chose **the doll** last Sunday.",
        "why": "受詞若是單數可數名詞，前面一定要有冠詞。這裡指的是特定的那一個洋娃娃，所以用 the，不是 a；漏掉冠詞的寫法在會考克漏字和改錯題都會被判錯。判斷法：單數可數名詞前如果沒有 this、that、my、his 這類限定詞，就要自己補上 the 或 a。",
        "exOkText": "(O) She **chose the doll** on the table.",
        "exOkZh": "她選了桌上的那個洋娃娃。",
        "exBadText": "(X) She **chose doll** on the table.",
        "exBadNote": "錯誤：受詞 doll 是單數可數名詞，前面必須加 the"
      },
      {
        "title": "單複數錯誤（doll 漏加 -s）",
        "bad": "(X) Eric chose **the dolls** last Sunday.",
        "ok": "(O) Eric chose **the doll** last Sunday.",
        "why": "這裡只選了一隻洋娃娃，所以用單數 the doll。學生有時看到 chose 這種動詞就自動讓受詞變複數，或受到「選了東西」的中文影響而加上 -s。判斷法：複數要看實際數量，主詞和受詞之間沒有對應關係；只提到一隻就寫單數。",
        "exOkText": "(O) He **chose the doll** and put it in the box.",
        "exOkZh": "他選了那個洋娃娃並把它放進盒子裡。",
        "exBadText": "(X) He **chose the dolls** and put it in the box.",
        "exBadNote": "錯誤：只選了一隻，應用單數 the doll，且代詞要用 it"
      },
      {
        "title": "語序錯誤（受詞放在動詞前面）",
        "bad": "(X) Eric **the doll chose** last Sunday.",
        "ok": "(O) Eric **chose the doll** last Sunday.",
        "why": "英文的基本語序是「主詞 + 動詞 + 受詞」，動詞一定要放在受詞前面。受詞前移的寫法在中文偶爾可以成立（把娃娃選了），但英文不行，會被視為錯誤語序。判斷法：拿到句子先找動詞，動詞後面才是受詞；如果動詞後面沒有東西，多半是語序放錯了。",
        "exOkText": "(O) My sister **chose the doll** last Sunday.",
        "exOkZh": "我妹妹上週日選了那個洋娃娃。",
        "exBadText": "(X) My sister **the doll chose** last Sunday.",
        "exBadNote": "錯誤：受詞不能放在動詞前面，基本語序不可顛倒"
      }
    ],
    "traps": [
      "**時態陷阱**：chose 已經是過去式，不能再加 -ed、-s 或 be 動詞。",
      "**冠詞陷阱**：單數可數名詞前一定要有 the、a、an 或限定詞，不能光禿禿一個名詞。",
      "**語序陷阱**：主詞 + 動詞 + 受詞是基本語序，受詞不能提到動詞前面。",
      "**一致陷阱**：doll 是單數，後面提到它時要用 it，不能用 they。"
    ],
    "strategy": [
      "先找動詞：讀題時先圈出動詞，再依時間決定用 choose 還是 chose。",
      "冠詞檢查表：寫完後檢查每個單數名詞前面有沒有冠詞或限定詞。",
      "套模板：背下「主詞 + 過去式動詞 + the + 單數名詞」這個模板，直接往上填。",
      "唸整句：把整句唸順，唸到不順的地方通常就是語序或時態錯了。",
      "延伸練習：自己造兩三句用 chose 的句子，寫在錯題本旁邊加深印象。"
    ]
  },
  "chose the doll with big brown eyes": {
    "zh": "選擇了那個有著大棕色眼睛的洋娃娃",
    "ipa": "tʃoʊz ðə dɑːl wɪð bɪɡ braʊn aɪz",
    "intro": "針對您提供的 chose the doll with big brown eyes，這是一個動詞片語，後面接了很長的受詞修飾，前面還需要主詞才能成句。整個結構是「動詞 + 受詞名詞 + with 後置修飾」。這個片語的考點最多：動詞時態、定冠詞、介系詞、形容詞順序都會出現。",
    "headline": "動詞＋受詞＋with 修飾，四個點都要對",
    "structure": [
      {
        "role": "動詞",
        "token": "chose",
        "pos": "動詞 (Verb) — choose 的過去式",
        "func": "主要動作，表示過去的選擇；還需搭配主詞才能成句",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "the doll",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被選擇的對象，the 限定單數名詞 doll",
        "mark": "O"
      },
      {
        "role": "後置修飾",
        "token": "with big brown eyes",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "補充說明這隻洋娃娃帶有大而棕色的眼睛，with 表示「帶著」",
        "mark": "O"
      },
      {
        "role": "核心名詞",
        "token": "eyes",
        "pos": "名詞 (Noun) — eye 的複數",
        "func": "with 片語裡的名詞，要放在兩個形容詞之後，並記得加 -s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（with 換成 of / in）",
        "bad": "(X) She chose the doll **of** big brown eyes. ／ (X) She chose the doll **in** big brown eyes.",
        "ok": "(O) She chose the doll **with** big brown eyes.",
        "why": "with 表示「帶著某特徵」，是修飾整隻洋娃娃的正確介系詞。of 只能用在 the eyes of the doll 這種所有關係的句型，in 則表示「在……裡面」，用在這裡語意完全不通。判斷法：中文若譯成「有著……的」，英文就對應 with；看到 of 就要檢查後面是不是接完整的所有關係。",
        "exOkText": "(O) Eric **chose the doll with big brown eyes**.",
        "exOkZh": "埃里克選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Eric **chose the doll of big brown eyes**.",
        "exBadNote": "錯誤：表示「帶著特徵」要用 with，不可用 of"
      },
      {
        "title": "形容詞順序錯誤（brown big）",
        "bad": "(X) She chose the doll with **brown big eyes**.",
        "ok": "(O) She chose the doll with **big brown eyes**.",
        "why": "多形容詞的順序是「大小 → 形狀 → 顏色 → 材料」，big 表示大小，一定排在 brown 之前。片語越長，學生越容易忽略這個規則，把中文的「棕色大的」直譯過來。判斷法：寫完兩個以上形容詞時，依序唸出「大小、形狀、顏色」，檢查有沒有跳階或倒序。",
        "exOkText": "(O) She **chose the doll with big brown eyes** and paid for it.",
        "exOkZh": "她選了那個有著大棕色眼睛的洋娃娃並付了錢。",
        "exBadText": "(X) She **chose the doll with brown big eyes** and paid for it.",
        "exBadNote": "錯誤：big（大小）要排在 brown（顏色）前面"
      },
      {
        "title": "動詞時態錯誤（用原形 choose）",
        "bad": "(X) She **choose** the doll with big brown eyes last week.",
        "ok": "(O) She **chose** the doll with big brown eyes last week.",
        "why": "last week 是明確的過去時間，動詞必須用過去式 chose。當受詞變得很長時，學生的注意力全放在名詞和修飾語上，反而忘記最前面的動詞要變化。判斷法：寫句子一律由左到右，動詞剛寫完就先確認時態，再往後面寫修飾語。",
        "exOkText": "(O) He **chose the doll with big brown eyes** yesterday.",
        "exOkZh": "他昨天選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) He **choose the doll with big brown eyes** yesterday.",
        "exBadNote": "錯誤：yesterday 要求用過去式 chose，不能用原形"
      },
      {
        "title": "定冠詞漏加（doll 前缺 the）",
        "bad": "(X) She chose **doll** with big brown eyes last week.",
        "ok": "(O) She chose **the doll** with big brown eyes last week.",
        "why": "單數可數名詞 doll 前面必須有冠詞或限定詞，這裡指的是特定的那一個，所以用 the。漏加冠詞在會考克漏字、選填題都非常常見，扣分時也不會給提示。判斷法：寫完受詞後立刻檢查第一個名詞前面有沒有 the / a / an，养成習慣就不會漏。",
        "exOkText": "(O) Eric **chose the doll with big brown eyes** at the store.",
        "exOkZh": "埃里克在商店選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Eric **chose doll with big brown eyes** at the store.",
        "exBadNote": "錯誤：受詞 doll 前必須加定冠詞 the"
      }
    ],
    "traps": [
      "**長片語失焦陷阱**：受詞越長越容易忘記前面動詞的時態和冠詞，要分區塊檢查。",
      "**with 與 of 陷阱**：the doll with big brown eyes 用 with；the eyes of the doll 才用 of。",
      "**形容詞順序陷阱**：with 片語內的大小、顏色順序規則完全不變。",
      "**複數陷阱**：片語最後的 eyes 一定要加 -s，這是最後一步也是最常被忽略的一步。"
    ],
    "strategy": [
      "分段書寫：把句子分成「動詞」「受詞名詞」「with 修飾」三塊寫，各寫各的再組合。",
      "由左到右：依序完成主詞、動詞、冠詞、名詞、修飾，順序固定就不會漏。",
      "交卷前倒查：從句尾往回唸一遍，特別確認 eyes 的 -s 和 doll 的 the。",
      "整句背誦：把這一句當成範例句背下來，之後遇到同型題直接套用。",
      "錯題改寫：把錯誤版本逐字改成正確版本，比只看解答更有用。"
    ]
  },
  "Eric chose the doll": {
    "zh": "埃里克選擇了那個洋娃娃",
    "ipa": "ˈer.ɪk tʃoʊz ðə dɑːl",
    "intro": "針對您提供的 Eric chose the doll，這是一個完整的簡單句，結構是「主詞 + 動詞 + 受詞」。Eric 是專有名詞，chose 是過去式動詞，the doll 是受詞。會考最常考的就是這種短句的改錯與選填，專有名詞的大寫和動詞時態是兩大重點。",
    "headline": "專有名詞大寫，動詞用過去式",
    "structure": [
      {
        "role": "主詞",
        "token": "Eric",
        "pos": "專有名詞 (Proper Noun)",
        "func": "句子的主角，是人名所以第一個字母一定要大寫",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "chose",
        "pos": "動詞 (Verb) — choose 的過去式",
        "func": "主要動作，表示過去做了選擇；有主語之後，單一動詞即可成句",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "the doll",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被選擇的對象，由定冠詞 the 加上單數名詞 doll 組成",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "專有名詞大小寫錯誤（eric）",
        "bad": "(X) **eric** chose the doll last Sunday.",
        "ok": "(O) **Eric** chose the doll last Sunday.",
        "why": "人名、地名、國名、姓氏都屬於專有名詞，第一個字母一定要大寫，這是英文的基本規則。台灣學生常因為打字時不按 Shift，或看到中文不需要標記大小寫，就直接寫成 eric。判斷法：句子開頭一定大寫，但句子中間出現的人名也一樣要大寫，這兩種情況都要特別注意。",
        "exOkText": "(O) **Eric** chose the doll with big brown eyes.",
        "exOkZh": "埃里克選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) **eric** chose the doll with big brown eyes.",
        "exBadNote": "錯誤：人名 Eric 是專有名詞，首字母必須大寫"
      },
      {
        "title": "動詞時態錯誤（用原形 choose）",
        "bad": "(X) Eric **choose** the doll last Sunday.",
        "ok": "(O) Eric **chose** the doll last Sunday.",
        "why": "last Sunday 是過去時間，動詞必須改成過去式 chose。很多句子沒有寫明時間，只能從上下文推論，這時更要靠動詞形式判斷。學生常把「選了」直接寫成原形，以為中文的「了」已經表示過去。判斷法：英文的時態完全由動詞變化負責，中文的「了」在英文裡沒有對應的形狀。",
        "exOkText": "(O) Eric **chose** the doll and smiled.",
        "exOkZh": "埃里克選了那個洋娃娃並笑了。",
        "exBadText": "(X) Eric **choose** the doll and smiled.",
        "exBadNote": "錯誤：與 past 時態的敘述搭配，動詞要用 chose"
      },
      {
        "title": "第三人稱單數 -s 錯誤（chooses）",
        "bad": "(X) Eric **chooses** the doll last Sunday.",
        "ok": "(O) Eric **chose** the doll last Sunday.",
        "why": "chose 已經是過去式，不會再變成 chooses。chooses 是原形 choose 在一般現在式、第三人稱單數時的形式，兩者不能混用。學生常因為看到主詞 Eric 是單數，就反射式地幫動詞加上 -s。判斷法：先定時態再定單複數；已經是過去式的動詞，後面不論主詞是誰都不加 -s。",
        "exOkText": "(O) Eric **chose** the doll yesterday.",
        "exOkZh": "埃里克昨天選了那個洋娃娃。",
        "exBadText": "(X) Eric **chooses** the doll yesterday.",
        "exBadNote": "錯誤：過去式 chose 不能再加 -s，兩種時態混用"
      },
      {
        "title": "定冠詞誤用（漏加 the）",
        "bad": "(X) Eric chose **doll** last Sunday. ／ (X) Eric chose **a** doll last Sunday.",
        "ok": "(O) Eric chose **the doll** last Sunday.",
        "why": "受詞是單數可數名詞，前面一定要有冠詞。這裡指的是特定的那一個洋娃娃，要用 the；用 a 就變成「選了一隻洋娃娃」，語意不對，漏掉則直接不成句。判斷法：會考改錯與選填最常出現的就是冠詞，寫完受詞先停下來檢查前面那一格。",
        "exOkText": "(O) Eric **chose the doll** on the shelf.",
        "exOkZh": "埃里克選了架子上的那個洋娃娃。",
        "exBadText": "(X) Eric **chose the dol** on the shelf.",
        "exBadNote": "錯誤：拼字不完整，正確應為 the doll"
      }
    ],
    "traps": [
      "**專有名詞大寫陷阱**：人名在句中也要大寫，eric 這種寫法會直接被扣分。",
      "**時態一致陷阱**：過去式後面不能再出現 chooses，兩種形式不能同時用在一個句子裡。",
      "**三單陷阱**：只有一般現在式、第三人稱單數主詞才加 -s，chose 不加。",
      "**冠詞陷阱**：the doll 與 a doll 語意不同，選擇特定的東西就要用 the。"
    ],
    "strategy": [
      "分三塊檢查：主詞、動詞、受詞各看一遍，逐塊確認大小寫、時態、冠詞。",
      "大寫練習：寫完句子先檢查所有專有名詞，再檢查句首，兩者都不能漏。",
      "默寫範例句：把這一句當範例背下來，考試時遇到同型題直接套。",
      "理解時態：記住英文靠動詞表示時間，不要用中文的「了」去對應英文。",
      "改錯本：把寫錯的版本與正確版本並列抄寫，考前一週複習一次。"
    ]
  },
  "Eric chose the doll with big brown eyes": {
    "zh": "埃里克選擇了那個有著大棕色眼睛的洋娃娃",
    "ipa": "ˈer.ɪk tʃoʊz ðə dɑːl wɪð bɪɡ braʊn aɪz",
    "intro": "針對您提供的 Eric chose the doll with big brown eyes，這是一個完整的簡單句，雖然受詞很長，但核心結構仍是「主詞 + 動詞 + 受詞」。後面的 with big brown eyes 是受詞的後置修飾，補充說明這隻洋娃娃的特徵。會考常考這種長短句混合的情況，務必逐段拆開檢查。",
    "headline": "主詞動詞受詞加 with 修飾，逐段檢查",
    "structure": [
      {
        "role": "主詞",
        "token": "Eric",
        "pos": "專有名詞 (Proper Noun)",
        "func": "句子的主角，人名首字母要大寫；單數主詞不影響過去式動詞的形式",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "chose",
        "pos": "動詞 (Verb) — choose 的過去式",
        "func": "主要動作，表示過去的選擇；已經是過去式，不再加 -s",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "the doll",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被選擇的對象，由定冠詞 the 與單數名詞 doll 組成",
        "mark": "O"
      },
      {
        "role": "後置修飾",
        "token": "with big brown eyes",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "放在受詞名詞後面，說明洋娃娃帶有大而棕色的眼睛",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用（of 取代 with）",
        "bad": "(X) Eric chose the doll **of** big brown eyes.",
        "ok": "(O) Eric chose the doll **with** big brown eyes.",
        "why": "with 表示「帶著、有著」，用來修飾整隻洋娃娃這個名詞；of 的用法是「某人的某物」，例如 the eyes of the doll，後面要接被擁有的對象。學生看到中文有「的」字就選 of，是最常見的介系詞錯誤。判斷法：of 後面接的所有關係必須是完整的名詞片語，而且前面也要有名詞；只接形容詞就是錯的。",
        "exOkText": "(O) Eric **chose the doll with big brown eyes**.",
        "exOkZh": "埃里克選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Eric **chose the doll of big brown eyes**.",
        "exBadNote": "錯誤：表示「帶著特徵」要用 with，of 用於 the eyes of the doll"
      },
      {
        "title": "形容詞順序錯誤（brown big eyes）",
        "bad": "(X) Eric chose the doll with **brown big eyes**.",
        "ok": "(O) Eric chose the doll with **big brown eyes**.",
        "why": "英文多形容詞的固定順序是「大小 → 形狀 → 顏色 → 材料 → 用途」，big 屬於大小，必須排在 brown 前面。中文可以說「大棕色的」或「棕色的大眼睛」都通順，學生就容易照中文排列。判斷法：把形容詞想成報身體資料，先報尺寸再報顏色，寫完唸一次就會固定下來。",
        "exOkText": "(O) Eric **chose the doll with big brown eyes** and smiled.",
        "exOkZh": "埃里克選了那個有著大棕色眼睛的洋娃娃並笑了。",
        "exBadText": "(X) Eric **chose the doll with brown big eyes** and smiled.",
        "exBadNote": "錯誤：big（大小）應排在 brown（顏色）之前"
      },
      {
        "title": "雙動詞錯誤（was chose）",
        "bad": "(X) Eric **was chose** the doll with big brown eyes.",
        "ok": "(O) Eric **chose** the doll with big brown eyes.",
        "why": "一個簡單句中只能有一個主要動詞。chose 本身已經帶有過去式的時態，前面不能再加 was。學生常誤以為「中文的『選了』等於英文的 was chose」，於是多加一個 be 動詞。判斷法：一般動詞的過去式自己就表達時間，就像 slept、went 一樣，不需要 be 動詞幫忙。",
        "exOkText": "(O) Eric **chose** the doll with big brown eyes.",
        "exOkZh": "埃里克選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Eric **was chose** the doll with big brown eyes.",
        "exBadNote": "錯誤：句中出現兩個主要動詞，was 應刪除"
      },
      {
        "title": "定冠詞漏加（doll 前缺 the）",
        "bad": "(X) Eric chose **doll** with big brown eyes.",
        "ok": "(O) Eric chose **the doll** with big brown eyes.",
        "why": "受詞是單數可數名詞，前面一定要有定冠詞 the，表示特定的那一個。當受詞後面又接了很長的修飾語時，學生很容易把注意力放在修飾語上，忘了前面還缺一個 the。判斷法：寫句子時先把 the doll 寫完並畫底線，再接 with 之後的內容。",
        "exOkText": "(O) Eric **chose the doll with big brown eyes** at the store.",
        "exOkZh": "埃里克在商店選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Eric **chose doll with big brown eyes** at the store.",
        "exBadNote": "錯誤：受詞 doll 前缺少定冠詞 the"
      }
    ],
    "traps": [
      "**長受詞失焦陷阱**：受詞越長越容易忽略前面的冠詞與動詞，務必分段檢查。",
      "**雙動詞陷阱**：一個簡單句只能有一個主要動詞，過去式不需搭配 was。",
      "**with 與 of 陷阱**：the doll with ... 是整體特徵，the eyes of the doll 才用 of。",
      "**形容詞順序陷阱**：with 片語內的形容詞順序規則完全不變，big 仍在 brown 之前。"
    ],
    "strategy": [
      "分塊拆解：把句子切成主詞、動詞、受詞、修飾四塊，逐一確認沒有錯誤。",
      "先寫短再寫長：先確定 Eric chose the doll 正確，再加上 with 片語。",
      "檢查順序固定：主詞看大寫、動詞看時態、名詞看冠詞與單複數、修飾看介系詞。",
      "整句朗讀：唸出聲時若覺得卡住，多半是語序或介系詞出了問題。",
      "範例句整理：把這類長受詞句型收進錯題本，考前重寫兩次。"
    ]
  },
  "Little Eric chose the doll with big brown eyes": {
    "zh": "小埃里克選擇了那個有著大棕色眼睛的洋娃娃",
    "ipa": "ˈlɪt.əl ˈer.ɪk tʃoʊz ðə dɑːl wɪð bɪɡ braʊn aɪz",
    "intro": "針對您提供的 Little Eric chose the doll with big brown eyes，這是一個完整的敘事句，比前一句多了一個 Little 來修飾人名。Little 在這裡是形容詞，要放在專有名詞 Eric 前面，而且 E 也要大寫。整個句子包含主詞、動詞、受詞與後置修飾，結構完整。",
    "headline": "Little 修飾人名，兩字都要大寫",
    "structure": [
      {
        "role": "主詞修飾語",
        "token": "Little",
        "pos": "形容詞 (Adjective)",
        "func": "表示「小的、年幼的」，放在人名 Eric 前面作修飾；它本身是一般字，不需大寫",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "Eric",
        "pos": "專有名詞 (Proper Noun)",
        "func": "句子的主角，人名首字母必須大寫；Little 與 Eric 合起來才是一個完整的名詞片語",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "chose",
        "pos": "動詞 (Verb) — choose 的過去式",
        "func": "主要動作，表示過去的選擇，搭配單數主詞也不變化",
        "mark": "O"
      },
      {
        "role": "受詞與修飾",
        "token": "the doll with big brown eyes",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被選擇的對象，後接 with 片語說明洋娃娃帶有大而棕色的眼睛",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "專有名詞大小寫錯誤（Little eric）",
        "bad": "(X) **Little eric** chose the doll with big brown eyes.",
        "ok": "(O) **Little Eric** chose the doll with big brown eyes.",
        "why": "Little 是修飾人名的形容詞，本身是小寫；後面的 Eric 是專有名詞，E 一定要大寫。學生常以為 Little 和 Eric 既然合在一起，整串都用同一種大小寫。判斷法：逐字檢查每個字，只要它是人名，就一定要大寫；形容詞不論在句首與否都保持小寫。",
        "exOkText": "(O) **Little Eric chose the doll** with big brown eyes.",
        "exOkZh": "小埃里克選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) **Little eric chose the doll** with big brown eyes.",
        "exBadNote": "錯誤：人名 Eric 必須大寫，Little 維持小寫"
      },
      {
        "title": "單複數錯誤（doll 誤用複數 dolls）",
        "bad": "(X) Little Eric chose **the dolls** with big brown eyes.",
        "ok": "(O) Little Eric chose **the doll** with big brown eyes.",
        "why": "句子只提到一隻洋娃娃，所以受詞要用單數 the doll。學生常看到 Little Eric 是單數，就誤以為受詞也要用複數，或者受到 the eyes 是複數的影響而一起改掉。判斷法：主詞和受詞之間沒有數量對應關係，各自看自己前面有沒有 s；後面修飾語的單複數完全不影響前面的名詞。",
        "exOkText": "(O) **Little Eric chose the doll** and put it on the desk.",
        "exOkZh": "小埃里克選了那個洋娃娃並把它放在桌上。",
        "exBadText": "(X) **Little Eric chose the dolls** and put it on the desk.",
        "exBadNote": "錯誤：只選了一隻，應用單數 the doll，後續代詞用 it"
      },
      {
        "title": "定冠詞漏加（doll 前缺 the）",
        "bad": "(X) Little Eric chose **doll** with big brown eyes.",
        "ok": "(O) Little Eric chose **the doll** with big brown eyes.",
        "why": "受詞是單數可數名詞，前面必須有 the，這裡指的是特定的那一隻洋娃娃。句子越長，學生越容易在寫到最後時漏掉最前面的小詞，這是會考選填題最常見的失分點。判斷法：寫完句子後從頭掃到尾，專門檢查每一個單數名詞前面那一格是否已經填上 the，漏填時立刻補回。",
        "exOkText": "(O) Little Eric **chose the doll with big brown eyes** at the store.",
        "exOkZh": "小埃里克在商店選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Little Eric **chose doll with big brown eyes** at the store.",
        "exBadNote": "錯誤：受詞 doll 前必須加定冠詞 the"
      },
      {
        "title": "形容詞順序錯誤（brown big eyes）",
        "bad": "(X) Little Eric chose the doll with **brown big eyes**.",
        "ok": "(O) Little Eric chose the doll with **big brown eyes**.",
        "why": "多形容詞的固定順序是「大小 → 形狀 → 顏色 → 材料」，所以 big 一定在 brown 前面。句子越長，這種小規則越容易被忽略，學生往往照中文語序排列形容詞。判斷法：寫兩個以上形容詞時，先寫 big 再寫 brown，然後唸一次確認順序。",
        "exOkText": "(O) Little Eric **chose the doll with big brown eyes** happily.",
        "exOkZh": "小埃里克開心地選了那個有著大棕色眼睛的洋娃娃。",
        "exBadText": "(X) Little Eric **chose the doll with brown big eyes** happily.",
        "exBadNote": "錯誤：big（大小）要排在 brown（顏色）之前"
      }
    ],
    "traps": [
      "**兩段式人名陷阱**：Little Eric 只有 E 要大寫，Little 是一般形容詞維持小寫。",
      "**長句失焦陷阱**：句子變長不代表規則變少，冠詞與形容詞順序一樣要檢查。",
      "**複數連動陷阱**：the doll 與 with 後面的 eyes 各自決定單複數，不要互相影響。",
      "**順序陷阱**：big brown 是固定搭配，寫成 brown big 一律算錯。"
    ],
    "strategy": [
      "逐段拆寫：把 Little Eric、chose、the doll、with big brown eyes 分四段寫再組合。",
      "最後通讀：寫完從句首到句尾唸一次，特別注意每個單數名詞前面的 the。",
      "背誦範例句：這一句是很好的完整範例，背下來可同時練大小寫與結構。",
      "錯題訂正：把 brown big eyes 抄進錯題本，寫上正確順序並註明原因。",
      "自造短句：用自己喜歡的玩具改寫兩句，練習把長受詞寫對。"
    ]
  },
  "store": {
    "zh": "商店",
    "ipa": "stɔːr",
    "intro": "針對您提供的單字 store，這是一個單字，單獨使用時不能成句，要搭配主詞與動詞才有完整的句子。store 當名詞時表示「商店」，是可數名詞；當動詞時表示「儲存」，是及物動詞。這個單字容易出錯的地方在於複數、拼字，以及它可當動詞這件事。",
    "headline": "store 是可數名詞，也可當動詞「儲存」",
    "structure": [
      {
        "role": "單字",
        "token": "store",
        "pos": "名詞 (Noun) — 商店",
        "func": "表示「商店」，可數名詞，前面要加 a / the，複數是 stores",
        "mark": "O"
      },
      {
        "role": "詞義延伸",
        "token": "store",
        "pos": "動詞 (Verb) — 儲存",
        "func": "同一個字也可作及物動詞，後面接被儲存的物品，如 store the books",
        "mark": "O"
      },
      {
        "role": "常見誤用",
        "token": "stor",
        "pos": "拼字錯誤 (Spelling)",
        "func": "store 必須有五個字母，結尾的 e 不能漏掉，否則字形就不完整",
        "mark": "X"
      }
    ],
    "mistakes": [
      {
        "title": "可數名詞誤當不可數（漏複數與冠詞）",
        "bad": "(X) My father works in **store**. ／ (X) There are two **store** on this street.",
        "ok": "(O) My father works in **a store**.",
        "why": "store 作「商店」時是可數名詞，複數為 stores，前面必須有 a、the、two 這類限定詞。學生常受中文「商店沒有單複數」影響，把它當成不可數名詞，於是漏掉冠詞與 -s。判斷法：問自己「可以說 one store、two stores 嗎？」可以的就是可數名詞，複數要加 -s。",
        "exOkText": "(O) My father works in **a store** near the park.",
        "exOkZh": "我父親在公園附近的一家商店工作。",
        "exBadText": "(X) My father works in **store** near the park.",
        "exBadNote": "錯誤：可數名詞前需加冠詞，且商店可數不可漏 -s"
      },
      {
        "title": "拼字錯誤（stroe / stor）",
        "bad": "(X) I went to the **stroe** yesterday. ／ (X) There is a small **stor** on my street.",
        "ok": "(O) I went to the **store** yesterday.",
        "why": "store 的字母順序是 s-t-o-r-e，一共五個字母，最後的 e 不能漏。學生常把 o 和 e 對調寫成 stroe，或直接漏掉尾音 e 寫成 stor。判斷法：把 store 和 story 一起記（s-t-o 開頭），寫的時候用手指一個字一個字點，確認最後有 e。",
        "exOkText": "(O) She bought a doll at the **store**.",
        "exOkZh": "她在商店買了一個洋娃娃。",
        "exBadText": "(X) She bought a doll at the **stroe**.",
        "exBadNote": "錯誤：store 拼成 stroe，字母順序錯誤"
      },
      {
        "title": "介系詞搭配錯誤（at 與 on / in 混用）",
        "bad": "(X) My mother works **on** the store. ／ (X) I bought it **in** a store.",
        "ok": "(O) My mother works **at** the store.",
        "why": "在某一個地方工作，英文固定用 at the store；在某家商店買東西，可以用 at the store 或 in the store，但不能說 on the store。學生常把中文的「在商店」直接對應成 on。判斷法：表示「在某個機構、地點」時，介系詞優先選 at；on 通常用在表面或接觸的地方。",
        "exOkText": "(O) Eric bought a doll **at the store**.",
        "exOkZh": "埃里克在商店買了一個洋娃娃。",
        "exBadText": "(X) Eric bought a doll **on the store**.",
        "exBadNote": "錯誤：表示在某家商店要用 at，不用 on"
      },
      {
        "title": "詞性誤用（當動詞卻漏第三人稱單數 -s）",
        "bad": "(X) He **store** the books in the box.",
        "ok": "(O) He **stores** the books in the box.",
        "why": "store 當動詞「儲存」時，是一般動詞，在一般現在式且主詞是第三人稱單數（he、she、it）時要加 -s，寫成 stores。學生常因為記的是名詞形式，寫動詞時就忘了變化。判斷法：把 store 當動詞時套上「主詞 + 動詞 + 受詞」的框架，檢查主詞是誰，再決定要不要加 -s。",
        "exOkText": "(O) She **stores** the dolls in the box.",
        "exOkZh": "她把那些洋娃娃收納在盒子裡。",
        "exBadText": "(X) She **store** the dolls in the box.",
        "exBadNote": "錯誤：一般現在式第三人稱單數，動詞應寫成 stores"
      }
    ],
    "traps": [
      "**可數性陷阱**：store（商店）是可數名詞，複數為 stores，前面要有冠詞或數量詞。",
      "**拼字陷阱**：store 有五個字母，結尾的 e 不能漏，stor、stroe 都是常見錯法。",
      "**介系詞陷阱**：在某家商店要用 at the store，不可用 on the store。",
      "**詞性陷阱**：store 當動詞「儲存」時是及物動詞，後面必須接受詞。"
    ],
    "strategy": [
      "一詞兩義：把名詞「商店」與動詞「儲存」分別寫在筆記本兩欄，用例句區分。",
      "複數複習：寫兩次 one store、two stores、the stores，複數感會建立起來。",
      "介系詞搭配：把 at the store 當成一個成語單位整組背，不要單獨記 at。",
      "寫完檢查三項：冠詞、複數 -s、拼字，拼寫時用手指跟著唸。",
      "造句練習：用 store 造兩個句子，一個當名詞、一個當動詞，詞性自然就分開了。"
    ]
  },
  "the store": {
    "zh": "這家商店",
    "ipa": "ðə stɔːr",
    "intro": "針對您提供的英文片語 **the store**，這不是一個能單獨成句的完整句子，而是一個名詞片語（Noun Phrase），由「定冠詞 the + 名詞 store」兩部分組成。中文的「這家商店」本身省略了主詞和動詞，英文則必須把它放進句子裡當主詞或受詞才算完整。整個片語的重點只有一個：the 決定了「是哪一家特定的店」。",
    "headline": "the 指特定那一家；單獨出現不能成句",
    "structure": [
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "指出是哪一家特定的商店，也就是中文「這家／那家」的意思；單數可數名詞前若對方已知道是哪一家，就要加 the",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "store",
        "pos": "名詞 (Noun) — 可數名詞，單數",
        "func": "片語的中心語，負責表達「商店」這個概念；它自己不能獨立成句，必須靠前面的 the 或與其他成分組合",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "可數名詞前漏冠詞（單數名詞一定要有 the 或 a）",
        "bad": "(X) I went to **store** this morning.",
        "ok": "(O) I went to **the store** this morning.",
        "why": "英文的單數可數名詞前面一定要有冠詞（a／an／the）或所有格，store 屬於可數名詞，絕對不能單獨裸放在介系詞後面。台灣學生受中文「我去店裡」沒有冠詞的影響，最常忘記的就是這個 the。判斷法：每看到單數可數名詞前面是空格，就先問「這裡需不需要 a 或 the？」若對方已經知道是哪一家，就用 the。",
        "exOkText": "(O) My sister bought a hat **at the store**.",
        "exOkZh": "我姐姐在這家商店買了一頂帽子。",
        "exBadText": "(X) My sister bought a hat **at store**.",
        "exBadNote": "錯誤：介系詞後的單數可數名詞 store 前面漏了冠詞 the"
      },
      {
        "title": "可數名詞的單複數誤用",
        "bad": "(X) There are many **the store** in my city. ／ (X) There are many **store** in my city.",
        "ok": "(O) There are many **stores** in my city.",
        "why": "中文沒有單複數的變化，但英文裡 store 是可數名詞，要表示「很多家店」必須用複數 stores，而且複數名詞前面不再用 the。台灣學生常犯兩個錯：一是忘記加 -s，二是在複數名詞前還加上一個 the。判斷法：名詞前出現 many、some、a lot of、three 等數量詞時，單數一定要變成複數，而且前面不能再有 the。",
        "exOkText": "(O) There are three **stores** in front of my school.",
        "exOkZh": "我學校前面有三家商店。",
        "exBadText": "(X) There are three **the store** in front of my school.",
        "exBadNote": "錯誤：three 後面要用複數 stores，而且複數名詞前不能加 the"
      },
      {
        "title": "詞義混淆：store（商店）與 storage（儲藏處）",
        "bad": "(X) My father keeps his tools in the **store**. ／ (X) The **store** is full of old boxes.",
        "ok": "(O) My father keeps his tools in the **storage room**. ／ (O) The **storage room** is full of old boxes.",
        "why": "store 的意思是「商店」，是會買東西的地方；要表示「儲放東西的空間」應該用 storage 或 storeroom。台灣學生常把這兩個字混在一起，結果就出現「把工具放在店裡」這種不合理的情況。判斷法：看到「放東西、堆東西、儲存」的情境，腦中要跳出 storage；看到「買東西、店員、營業」才用 store。",
        "exOkText": "(O) We put the old boxes in the **storage room**.",
        "exOkZh": "我們把舊箱子放進儲藏室。",
        "exBadText": "(X) We put the old boxes in the **store**.",
        "exBadNote": "錯誤：store 是「商店」，儲藏空間要用 storage room"
      },
      {
        "title": "把片語當成完整句子（缺主詞動詞，缺大小寫與句號）",
        "bad": "(X) **The store**",
        "ok": "(O) **The store** is next to the bank.",
        "why": "名詞片語 the store 只是句子中的一個成分，沒有動詞就無法構成完整句子，會考中這種寫法一律不算對。另外台灣學生也常忘記句首大寫與句末句號，扣分時反而冤枉。判斷法：寫完一句後做兩件事——確認開頭第一個字有沒有大寫、確認結尾有沒有句號或問號。",
        "exOkText": "(O) **The store** opens at nine every morning.",
        "exOkZh": "這家商店每天早上九點營業。",
        "exBadText": "(X) **the store** opens at nine every morning",
        "exBadNote": "錯誤：片語不能單獨成句，句首未大寫，句末也漏了句號"
      }
    ],
    "traps": [
      "**定冠詞的陷阱**：the 表示「雙方都知道是哪一家」，第一次提到時應該用 a／an。題目中出現 the store 時，前面一定要有已知的資訊。",
      "**可數名詞的陷阱**：store 是可數名詞，單數前不能沒有冠詞；複數前不能加 the。這兩種錯法都常出現在會考選擇題的誘餌選項中。",
      "**字義的陷阱**：store（商店）與 storage（儲藏處）只差三個字母，會考字義辨析時常拿來混淆。",
      "**句型完整性的陷阱**：單純的名詞片語不能單獨當答案，選擇題中若某一選項只有名詞而沒有動詞，直接排除。"
    ],
    "strategy": [
      "先分詞再組句：看到 the store 先拆成 the（冠詞）與 store（名詞），確認它只是名詞片語，一定還要有動詞搭配。",
      "冠詞三選一：每寫一個單數可數名詞，就檢查前面是 a、an 還是 the，絕不讓它裸放。",
      "背單字時連同例句一起背：把 the store 放進「I went to the store.」這個句子裡記，比只背單字更不容易用錯。",
      "寫完立刻檢查標點：句首大寫、句末句號，是成本最低的檢查，兩秒就能避免失分。"
    ]
  },
  "in the store": {
    "zh": "在商店裡",
    "ipa": "ɪn ðə stɔːr",
    "intro": "針對您提供的英文片語 **in the store**，這是一個介系詞片語（Prepositional Phrase），由「介系詞 in + 名詞片語 the store」組成，用來表示地點。它本身不能單獨成句，必須接在動詞後面當地點狀語。中文的「在商店裡」可以獨立說完，英文則一定要有「誰」和「做什麼」搭配。",
    "headline": "介系詞 + 名詞片語；放動詞後當地點狀語",
    "structure": [
      {
        "role": "介系詞",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "表示「在……之內」的空間關係，後面一定接名詞或名詞片語，不能接動詞原形",
        "mark": "O"
      },
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "指出是哪一家特定的商店；介系詞後的單數可數名詞前同樣不能漏掉冠詞",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "store",
        "pos": "名詞 (Noun) — 可數名詞，單數",
        "func": "片語的受詞，表達「商店」這個地點；整組 in the store 修飾前面的動詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞 in 與 on 的選擇（空間內 vs 表面上）",
        "bad": "(X) There is a big sale sign **in the store**.",
        "ok": "(O) There is a big sale sign **on the store**.",
        "why": "in 表示「在某個空間之內」，on 表示「在某個物體的表面上」。招牌貼在建築物外牆上，所以要用 on the store；只有人或東西真的在店裡面（空間內）才用 in the store。台灣學生常把中文「在店裡的看板」直接翻成 in。判斷法：東西是「貼、掛、畫在某表面上」就用 on；是「走進去、在裡頭」才用 in。",
        "exOkText": "(O) There is a big sign **on the store**.",
        "exOkZh": "商店外牆上有一塊大招牌。",
        "exBadText": "(X) There is a big sign **in the store**.",
        "exBadNote": "錯誤：招牌貼在外牆表面，要用 on 而不是 in"
      },
      {
        "title": "介系詞片語的位置（不能插在動詞與受詞之間）",
        "bad": "(X) She bought **in the store** a new bag.",
        "ok": "(O) She bought a new bag **in the store**.",
        "why": "英文的語序是「主詞 + 動詞 + 受詞 + 地點狀語」，表示地點的介系詞片語要放在受詞之後，不能插在動詞和受詞中間。台灣學生常因中文「在商店買了一個新包包」的語序，把介系詞組提到前面。判斷法：把句子寫成「誰 + 做什麼 + 什麼東西 + 在哪裡」，依序填入就不會出錯。",
        "exOkText": "(O) She bought a new bag **in the store**.",
        "exOkZh": "她在這家商店買了一個新包包。",
        "exBadText": "(X) She bought **in the store** a new bag.",
        "exBadNote": "錯誤：地點狀語要放在受詞之後，不能插在動詞與受詞中間"
      },
      {
        "title": "把片語單獨當成完整句子（缺主詞與動詞）",
        "bad": "(X) **In the store** yesterday.",
        "ok": "(O) **I was in the store** yesterday.",
        "why": "in the store 是介系詞片語，只能當地點狀語修飾動詞，本身沒有動詞也不能成句。台灣學生常把中文的「在商店裡」直接照抄成英文單獨一段。判斷法：拿到一個片段先問「誰？做什麼？」，兩個都補得出來才是一個完整句子，只補得出其中一個就不是。",
        "exOkText": "(O) There are many new books **in the store**.",
        "exOkZh": "商店裡有很多新書。",
        "exBadText": "(X) **In the store** and I bought a pencil.",
        "exBadNote": "錯誤：介系詞片語沒有動詞，不能自己站在句首成句"
      },
      {
        "title": "介系詞後名詞的單複數會改變意思",
        "bad": "(X) He works **in the stores** near my house.",
        "ok": "(O) He works **in the store** near my house.",
        "why": "in the store 是「在（某一家）店裡面」，in the stores 變成「在那些店裡面」，意思完全不同。台灣學生常忽略冠詞與複數的差別，靠中文的「在店裡」一律想成同一件事。判斷法：英文裡 the store 與 the stores 差一個 -s 就是兩個不同的場景；看到複數名詞先問「是很多家店，還是其中一家？」",
        "exOkText": "(O) My aunt works **in the store** on Green Street.",
        "exOkZh": "我姑姑在綠街的那一家店上班。",
        "exBadText": "(X) My aunt works **in the stores** on Green Street.",
        "exBadNote": "錯誤：複數 the stores 變成「在那些店裡」，與原意不同"
      }
    ],
    "traps": [
      "**in 與 on 的陷阱**：in 表示空間之內，on 表示接觸表面。會考選擇題常把這兩個介系詞互換，讀題時要先分清東西是「在裡面」還是「貼在上面」。",
      "**語序的陷阱**：介系詞片語修飾動作時要放在受詞之後，會考的選擇題會故意把它插在動詞與受詞中間。",
      "**句子完整性的陷阱**：只有介系詞片語、沒有主詞與動詞的選項一定錯，看到就直接排除。",
      "**單複數的陷阱**：in the store 與 in the stores 意思不同，複數版本等於「在那些店裡」。"
    ],
    "strategy": [
      "寫完句子後把介系詞片語圈起來，檢查它是不是緊接在受詞後面。",
      "把 in／on／at 三個介系詞做成一張對照卡：in＝在裡面、on＝在表面、at＝在某個點，貼在書桌前。",
      "每個片語都補成完整句子再記，例如 I was in the store yesterday.，這樣就不會只記半截。",
      "考卷上看到介系詞片語單獨成句的選項，先在旁邊畫個叉，再繼續看其他選項。"
    ]
  },
  "cutest": {
    "zh": "最可愛的",
    "ipa": "kjuː.t̮ɪst",
    "intro": "針對您提供的英文單字 **cutest**，這是一個形容詞（Adjective）的最高級形式，意思是「最可愛的」，由 cute 加 -est 構成。它不是完整的句子，必須放在 be 動詞後面當表語，或放在名詞前當定語。會考中最高級是必考變化，規則多、錯法也固定，值得單獨整理。",
    "headline": "cute 的最高級；前面要 the，別加 more",
    "structure": [
      {
        "role": "形容詞（最高級）",
        "token": "cutest",
        "pos": "形容詞 (Adjective) — cute 的最高級",
        "func": "表示三者或以上之中「最可愛的」，用來修飾名詞或放在 be 動詞後當表語；本身沒有時態變化",
        "mark": "O"
      },
      {
        "role": "應搭配的定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "最高級前面固定要加 the；本單字被單獨抽出來時省略了 it 與 the，套回句子要補回來才完整",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字混淆：cut（切）與 cute（可愛）",
        "bad": "(X) My little sister is really **cut**.",
        "ok": "(O) My little sister is really **cute**.",
        "why": "cut 的意思是「切、剪」，cute 才是「可愛」。兩個字只差一個字母，唸音幾乎一樣，所以台灣學生在聽寫和造句時常常搞混，甚至把 cutest 也拼對了卻把原形拼錯。判斷法：只要接得上 -er、-est 變成 cuter、cutest，而且意思跟「可愛」有關，就一定是 c-u-t-e。",
        "exOkText": "(O) My little sister is really **cute**.",
        "exOkZh": "我的小妹妹真的很可愛。",
        "exBadText": "(X) My little sister is really **cut**.",
        "exBadNote": "錯誤：cut 是「切」，「可愛」要用 cute"
      },
      {
        "title": "最高級前面漏掉定冠詞 the",
        "bad": "(X) This puppy is **cutest** in our class.",
        "ok": "(O) This puppy is **the cutest** in our class.",
        "why": "形容詞最高級前面一定要加定冠詞 the，這是固定規則不能省略。因為最高級表示「某個範圍內唯一的最高者」，屬於特指。台灣學生常把最高級當一般形容詞看待，寫短句時就順手漏掉。判斷法：看到 -est 結尾，前面沒有 the 就是錯的，先補上再往下寫。",
        "exOkText": "(O) Lucy is **the cutest** girl in our class.",
        "exOkZh": "露西是我們班最可愛的女生。",
        "exBadText": "(X) Lucy is **cutest** girl in our class.",
        "exBadNote": "錯誤：最高級 cutest 前面漏了定冠詞 the"
      },
      {
        "title": "最高級與 more 疊加使用",
        "bad": "(X) This puppy is **more cutest** in our class.",
        "ok": "(O) This puppy is **the cutest** in our class.",
        "why": "形容詞變最高級只有兩條路：短形容詞加 -est，長形容詞前面加 the most，兩者只能擇一，不能同時使用。cutest 已經是最高級，前面不能再加 more。台灣學生常因中文「更可愛」就直接翻成 more cutest。判斷法：看到 -est 結尾就不要再寫 more；看到 the most 就要確認後面的形容詞是長的那種。",
        "exOkText": "(O) This book is **more interesting** than that one.",
        "exOkZh": "這本書比那本更有趣。",
        "exBadText": "(X) This book is **the most interestinger** than that one.",
        "exBadNote": "錯誤：the most 後面要用原級 interesting，不能再加 -er"
      },
      {
        "title": "比較對象只有兩個時用 -er，不用 -est",
        "bad": "(X) Of the two puppies, this one is **the cutest**.",
        "ok": "(O) Of the two puppies, this one is **cuter**.",
        "why": "最高級必須拿三個或三個以上的對象互相比較；當比較的對象只有兩個時，只能用比較級 -er。of the two 這個片語就是「在這兩隻之中」，所以只能用 cuter。台灣學生常忽略比較的數量，習慣性把所有比較都升級成最高級。判斷法：看到 of the two 就用比較級；看到 in my class 這種不確定數量的大範圍才用最高級。",
        "exOkText": "(O) Of the two sisters, Amy is **taller**.",
        "exOkZh": "在這兩個姊妹之中，Amy 比較高。",
        "exBadText": "(X) Of the two sisters, Amy is **the tallest**.",
        "exBadNote": "錯誤：只有兩個比較對象時要用比較級 taller"
      }
    ],
    "traps": [
      "**最高級三要素的陷阱**：最高級要「三者以上 + the + 範圍介詞（in／of／among）」，三個條件缺一不可，會考常故意拿掉其中一項當誘餌。",
      "**cut 與 cute 的陷阱**：這組字只差一個字母，會考的拼字題與字義題常拿來出題，只要唸到 cut 就要警覺是不是寫錯了。",
      "**more 與 -est 的陷阱**：短形容詞用 -est，長形容詞用 the most，兩者絕對不能同時出現。",
      "**比較數目的陷阱**：of the two 用比較級，in the room 這種不確定數量的範圍才用最高級。"
    ],
    "strategy": [
      "背最高級時把三要素一起背：the + 最高級 + in／of 範圍，寫句子時照這個公式填空。",
      "每寫到 -est 就立刻用手指檢查前面有沒有 the，這是最快的自我檢查。",
      "把 cut、cute、cut 三個字分開寫在三列，每天唸一次加深印象。",
      "多做比較級／最高級的克漏字，特別注意比較對象只有兩個的那一類句子。"
    ]
  },
  "the cutest": {
    "zh": "最可愛的一個",
    "ipa": "ðə kjuː.t̮ɪst",
    "intro": "針對您提供的英文片語 **the cutest**，這是「定冠詞 the + 形容詞最高級」構成的名詞片語，中文要補成「最可愛的一個」才自然。片語本身不能單獨成句，通常放在 be 動詞後當表語，並在後面接 one，或在後面接範圍介詞片語。這個單位的重點是：省略可以，但省略的規則不能亂。",
    "headline": "the + 最高級；省略 one 的規則要守",
    "structure": [
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "最高級前面的固定搭配，表示特指「那最可愛的一個」；不能換成 this、that 或 a",
        "mark": "O"
      },
      {
        "role": "形容詞（最高級）",
        "token": "cutest",
        "pos": "形容詞 (Adjective) — cute 的最高級",
        "func": "表示「最可愛的」；後面的中心詞 one 可以省略，但省略只在比較關係的句子中成立",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "省略中心詞時要保留 the one",
        "bad": "(X) Mia is **the cutest**.",
        "ok": "(O) Mia is **the cutest one**.",
        "why": "the cutest 這種省略說法只在做「比較關係」時才成立，意思是「最可愛的那一個」，省略掉的其實是 one。把它單獨拿來造句時，句子的意思會變得懸空，會考的填空題常在這裡扣分。判斷法：看到 the + 最高級單獨站在 be 動詞後面，就檢查後面有沒有 one，或者有沒有接範圍介詞片語。",
        "exOkText": "(O) Mia is **the cutest one** in her class.",
        "exOkZh": "Mia 是她班裡最可愛的那一個。",
        "exBadText": "(X) Mia is **the cutest**.",
        "exBadNote": "錯誤：獨立使用時省略的 one 要說出來，否則句子不完整"
      },
      {
        "title": "最高級誤加複數 -s",
        "bad": "(X) The two girls in my class are **the cutests**.",
        "ok": "(O) The two girls in my class are **the cutest ones**.",
        "why": "the cutest 是從一群人中挑出一個最高者，本身是單數概念，後面不能直接加 -s。要表示多個，就要重複後面的中心詞寫成 the cutest ones，或改成 the most cutest girls。台灣學生常以為加了 the 之後就變成複數。判斷法：the 最高級默認只指「一個」，要複數就把後面的 ones 或 girls 一起加 s。",
        "exOkText": "(O) The two girls in my class are **the cutest ones**.",
        "exOkZh": "我班上的兩個女生是最可愛的。",
        "exBadText": "(X) The two girls in my class are **the cutests**.",
        "exBadNote": "錯誤：the cutest 後面不能直接加 s，要寫 the cutest ones"
      },
      {
        "title": "the most 與 -est 疊加",
        "bad": "(X) Mia is **the most cutest** girl in her class.",
        "ok": "(O) Mia is **the cutest** girl in her class.",
        "why": "短形容詞（cute）變最高級要加 -est，長形容詞（difficult、interesting）才用 the most，兩種方式擇一。台灣學生常因為中文「最可愛」就同時想到 the most 和 cutest，於是兩個一起寫。判斷法：先看形容詞長短——三個字母以內的短字用 -est，超過三個字母的才用 the most。",
        "exOkText": "(O) This is **the most interesting** story I have ever read.",
        "exOkZh": "這是我讀過最有趣的故事。",
        "exBadText": "(X) Mia is **the most cutest** girl in her class.",
        "exBadNote": "錯誤：-est 與 the most 不能同時使用，只能擇一"
      },
      {
        "title": "把最高級前的 the 換成 this 或 that",
        "bad": "(X) Mia is **that cutest** girl in her class.",
        "ok": "(O) Mia is **the cutest** girl in her class.",
        "why": "最高級前面必須用定冠詞 the，不能用指示代詞 this 或 that，因為最高級表示「某個範圍內唯一的最高者」，是一種特指。台灣學生有時候會順手加 this 或 that，變成「那個最可愛的」。判斷法：the 後面接單數名詞加最高級；this／that 後面接單數名詞加普通形容詞。",
        "exOkText": "(O) **That** dog is **the cutest** in my class.",
        "exOkZh": "那隻狗是我班裡最可愛的。",
        "exBadText": "(X) **That** dog is **that cutest** in my class.",
        "exBadNote": "錯誤：最高級前面要用 the，不能用 that"
      }
    ],
    "traps": [
      "**最高級前只能用 the 的陷阱**：會考選擇題常把 this、that、a 放在最高級前面當誘餌，記住最高級只認 the。",
      "**省略 one 的陷阱**：the cutest 單獨出現會被視為不完整，獨立造句要寫 the cutest one。",
      "**-est 不加 s 的陷阱**：形容詞最高級後面直接加 s 是不存在的用法，看到 the cutests 立刻判錯。",
      "**短形容詞的陷阱**：三個字母以內的形容詞（cute、tall、big）一律加 -est，不要寫 the most。"
    ],
    "strategy": [
      "把 the cutest 當成一個整體單位背，寫的時候一次寫出「the + cutest」，不要分兩次下筆。",
      "獨立造句時養成把 one 寫出來的習慣，交卷前再快速掃一次。",
      "複數寫法只記一種：the cutest ones 或 the cutest girls，絕不寫 the cutests。",
      "用對照表整理 the／this／that／a 各自能接什麼詞形，做題時照表選。"
    ]
  },
  "the cutest in the store": {
    "zh": "商店裡最可愛的一個",
    "ipa": "ðə kjuː.t̮ɪst ɪn ðə stɔːr",
    "intro": "針對您提供的英文片語 **the cutest in the store**，這是「最高級片語 + 範圍介詞片語」的名詞片語，用來說明「在某個範圍內最可愛的那一個」。它同樣不能單獨成句，要放在 be 動詞後當表語。最高級的靈魂就在最後這組範圍介詞，選對了整句才通順。",
    "headline": "最高級 + 範圍介詞；範圍要放最後",
    "structure": [
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "最高級前的固定搭配，表示特指「那最可愛的一個」",
        "mark": "O"
      },
      {
        "role": "形容詞（最高級）",
        "token": "cutest",
        "pos": "形容詞 (Adjective) — cute 的最高級",
        "func": "表達比較的结果「最可愛的」；後面接範圍介詞片語，說明比較的場域",
        "mark": "O"
      },
      {
        "role": "範圍介詞片語",
        "token": "in the store",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "表示比較的範圍是「在這家店裡面」；in 後面接地點，of 後面接成員的集合",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "範圍介詞 of 與 in 的選擇",
        "bad": "(X) Lucy is **the cutest of the store**.",
        "ok": "(O) Lucy is **the cutest in the store**.",
        "why": "of 強調「屬於某一群人」，後面接人或動物的集合；in 強調「在某個地點或範圍之內」。store 是地點，所以要用 in the store；of 後面則應該接 of my family、among my classmates 這種成員集合。台灣學生常因中文「店裡最可愛的」就直譯成 of。判斷法：後面是地點、場所用 in；後面是一群人或一堆東西用 of 或 among。",
        "exOkText": "(O) Lucy is **the cutest in the store**.",
        "exOkZh": "露西是這家店裡最可愛的。",
        "exBadText": "(X) Lucy is **the cutest of the store**.",
        "exBadNote": "錯誤：store 是地點，範圍介詞要用 in 而不是 of"
      },
      {
        "title": "介系詞後的特指與泛指（in the store 與 in a store）",
        "bad": "(X) Lucy is the cutest in **a store**.",
        "ok": "(O) Lucy is the cutest in **the store**.",
        "why": "in the store 的 store 是特指「那一家特定的店」，所以用 the；in a store 是「在某一類店裡」，語意完全不同。台灣學生在介系詞後面常隨手用 a 或 the，沒有判斷前面的內容是否已經指定過對象。判斷法：前面已經提過是哪一家，後面就一律用 the store。",
        "exOkText": "(O) I went to three stores, and Lucy is **the cutest in the store**.",
        "exOkZh": "我去了三家商店，露西是其中那家店裡最可愛的。",
        "exBadText": "(X) I went to three stores, and Lucy is **the cutest in a store**.",
        "exBadNote": "錯誤：a store 是泛指，與前面已指定的 the store 不一致"
      },
      {
        "title": "範圍介詞片語的位置（必須接在最高級之後）",
        "bad": "(X) Lucy is **the in the store cutest** girl.",
        "ok": "(O) Lucy is **the cutest in the store**.",
        "why": "範圍介詞片語（in the store、of my family）是用來說明「在什麼範圍內比較」的，英文的固定順序是「最高級 + 範圍介詞片語」，不能插進冠詞和最高級中間。台灣學生常按中文「在店裡最可愛的」把介系詞放到最前面。判斷法：先寫「主詞 + be 動詞 + the + 最高級」，最後再把 in／of 那組接到後面。",
        "exOkText": "(O) Lucy is **the cutest in the store**.",
        "exOkZh": "露西是這家店裡最可愛的。",
        "exBadText": "(X) Lucy is **the in the store cutest** girl.",
        "exBadNote": "錯誤：範圍介詞片語要放在最高級之後，不能插進 the 與最高級中間"
      },
      {
        "title": "介系詞 in 與 at 的選擇（店內空間 vs 店家地點）",
        "bad": "(X) Lucy is the cutest **at the store**.",
        "ok": "(O) Lucy is the cutest **in the store**.",
        "why": "at the store 只表示「在店這個地點」，常用在「在某家店裡辦事、等人服務」的情況；in the store 強調「在這家店的範圍之內」，最適合放在最高級後面當比較範圍。台灣學生常把兩個介系詞互換。判斷法：最高級後面表示比較範圍時用 in the store；純粹提到「在某家店」這個地點時才用 at the store。",
        "exOkText": "(O) Lucy is **the cutest in the store**.",
        "exOkZh": "露西是這家店裡最可愛的。",
        "exBadText": "(X) Lucy is **the cutest at the store**.",
        "exBadNote": "錯誤：表示店內的比較範圍要用 in，不能用 at"
      }
    ],
    "traps": [
      "**範圍介詞的陷阱**：in＋地點、of＋成員集合、among＋三個以上成員，三種介詞不能互換，會考常拿來出題。",
      "**冠詞一致性的陷阱**：前面已經指定是哪一家店，後面就必須用 the store，換成 a store 就變成泛指。",
      "**語序的陷阱**：範圍介詞片語一定接在最高級之後，不會插進 the 與最高級中間。",
      "**in 與 at 的陷阱**：at the store 是地點，in the store 是店內空間，最高級後面要用 in。"
    ],
    "strategy": [
      "把最高級句型整理成公式：the + 最高級 + in／of + 範圍，寫完照公式檢查一次。",
      "範圍介詞每次寫完都問一句「這裡是地點還是人」，地點用 in、人用 of。",
      "遇到 the store 就整組照抄，不要拆開重組，避免漏 the 或改成 a。",
      "多讀會考短文，統計最高級後面出現的介詞，出現最多的那個就是最常考的。"
    ]
  },
  "was the cutest in the store": {
    "zh": "是商店裡最可愛的一個",
    "ipa": "wəz ðə kjuː.t̮ɪst ɪn ðə stɔːr",
    "intro": "針對您提供的英文片語 **was the cutest in the store**，這已經有動詞了，但還缺主詞，所以仍然不是完整的句子，通常是完整句子被截掉主詞後的樣子。was 是 be 動詞的過去式，後面接表語表達狀態。整串的重點在 be 動詞：它必須有主詞陪著，而且要跟主詞的人稱與數一致。",
    "headline": "be 動詞要有主詞；was 要配合第三人稱單數",
    "structure": [
      {
        "role": "be 動詞",
        "token": "was",
        "pos": "動詞 (Verb) — be 動詞的過去式，肯定句",
        "func": "表示過去的狀態，前面一定要有主詞；主詞是 he／she／it 或單數名詞時用 was",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "the cutest",
        "pos": "名詞片語 (Noun Phrase) — 定冠詞 + 最高級",
        "func": "be 動詞後面接表語，說明主詞「是什麼」；最高級前固定加 the",
        "mark": "O"
      },
      {
        "role": "範圍介詞片語",
        "token": "in the store",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "修飾最高級，交代比較的範圍是「在這家店裡面」，放在表語的最後方",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "缺少主詞（be 動詞前面一定要有主詞）",
        "bad": "(X) **Was the cutest in the store**.",
        "ok": "(O) **It was the cutest in the store**.",
        "why": "英文句子一定要有主詞和動詞，be 動詞前面如果沒有主詞，句子就不完整，會考的選擇題中這樣的選項一律是錯的。中文可以省略主詞，英文不行，這是台灣學生最常犯的通病。判斷法：寫完句子先數一數「誰 + 做什麼」，缺「誰」就不能算完成。",
        "exOkText": "(O) The puppy **was the cutest in the store**.",
        "exOkZh": "那隻小狗是這家店裡最可愛的。",
        "exBadText": "(X) **Was the cutest** in the store.",
        "exBadNote": "錯誤：be 動詞 was 前面缺少主詞，句子不完整"
      },
      {
        "title": "be 動詞與主詞不一致（應該用 was）",
        "bad": "(X) **She were the cutest in the store**.",
        "ok": "(O) **She was the cutest in the store**.",
        "why": "be 動詞會隨著主詞的人稱和數改變：I 用 am，he／she／it 或單數名詞用 was，you／we／they 或複數名詞用 were。主詞是 she，屬於第三人稱單數，所以固定用 was。台灣學生常一律寫 were 或 am，忘了 be 動詞要跟人稱配合。判斷法：看到 it、he、she 就反射寫 was，看到 you、we、they 才寫 were。",
        "exOkText": "(O) **She was the tallest** girl in her class.",
        "exOkZh": "她是班上最高的女生。",
        "exBadText": "(X) **She were the tallest** girl in her class.",
        "exBadNote": "錯誤：主詞 She 是第三人稱單數，be 動詞要用 was"
      },
      {
        "title": "最高級誤加 -ed（把形容詞當動詞用）",
        "bad": "(X) The puppy **was the cutested** one in the store.",
        "ok": "(O) The puppy **was the cutest** one in the store.",
        "why": "cutest 是形容詞，用來修飾名詞或放在 be 動詞後當表語，本身不是動詞，所以不會有過去式 -ed 的變化。台灣學生看到 was 就以為後面的字也要跟著變過去式。判斷法：先問這個字是動詞還是形容詞；形容詞沒有時態變化，was 只是說明「當時是」這個狀態而已。",
        "exOkText": "(O) The toy **was the cutest** in the store.",
        "exOkZh": "那個玩具是這家店裡最可愛的。",
        "exBadText": "(X) The toy **was the cutested** in the store.",
        "exBadNote": "錯誤：cutest 是形容詞，沒有 cutested 這個形式"
      },
      {
        "title": "疑問句沒有把 be 動詞提到句首",
        "bad": "(X) **It was the cutest in the store?**",
        "ok": "(O) **Was it the cutest in the store?**",
        "why": "一般疑問句的結構是「be 動詞 + 主詞 + 其他成分」，問句要把 was 從主詞後面搬到句子的第一個字，句尾用問號。台灣學生常忘記調換位置，只在句尾補一個問號。判斷法：句尾有問號時，先檢查 be 動詞是不是站在句子的第一個字。",
        "exOkText": "(O) **Was it the cutest in the store?**",
        "exOkZh": "它是這家店裡最可愛的嗎？",
        "exBadText": "(X) **It was the cutest in the store?**",
        "exBadNote": "錯誤：問句要把 be 動詞 was 提到句首，語序沒有倒裝"
      }
    ],
    "traps": [
      "**be 動詞前置的陷阱**：會考問句最常考 was／were 與主詞的調換，看到問號就先檢查 was 有沒有在第一個字。",
      "**was 與 were 的陷阱**：主詞是 it、he、she 或單數名詞一律用 was，不要跟中文的「是」一樣不分人稱。",
      "**形容詞無時態的陷阱**：was 後面接形容詞最高級時，形容詞本身不會變化，不會出現 cutested 這種形式。",
      "**句子完整性的陷阱**：沒有主詞的選項一律是錯的，會考常故意拿這種半截句當誘餌。"
    ],
    "strategy": [
      "寫 be 動詞句時養成「先找主詞、再寫 be 動詞」的順序，主詞一確定，was 或 were 就自動浮現。",
      "把 I am／he is／they are 這張對照表背熟，考試時反射式套用。",
      "遇到問號就把 be 動詞往前搬，寫完再唸一次確認語序。",
      "每天唸五個 be 動詞句型（陳述、否定、疑問各一句），耳朵熟了就不會漏主詞。"
    ]
  },
  "it was the cutest in the store": {
    "zh": "它是商店裡最可愛的一個",
    "ipa": "ɪt wəz ðə kjuː.t̮ɪst ɪn ðə stɔːr",
    "intro": "針對您提供的英文句子 **it was the cutest in the store.**，這是一個完整的簡單句，結構為「主詞 + be 動詞 + 表語 + 範圍介詞片語」。it 在這裡是真正指前面提過的某樣東西，不是虛代詞。整句要表達「它（前面提過的那個）當時是這個範圍裡最可愛的」，所以主詞、be 動詞、最高級和範圍四個部分缺一不可。",
    "headline": "主詞 + was + the 最高級 + 範圍，四件都要齊",
    "structure": [
      {
        "role": "主詞",
        "token": "it",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主角，負責承受「是誰」；it 是第三人稱單數，所以 be 動詞用 was",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "was",
        "pos": "動詞 (Verb) — be 動詞的過去式",
        "func": "連接主詞和表語，表示過去的狀態；放在主詞後面",
        "mark": "O"
      },
      {
        "role": "表語（定冠詞）",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "最高級前的固定搭配，表示特指「那最可愛的一個」，不能省略",
        "mark": "O"
      },
      {
        "role": "表語（最高級）",
        "token": "cutest",
        "pos": "形容詞 (Adjective) — cute 的最高級",
        "func": "說明主詞的狀態「是最可愛的」；形容詞沒有時態變化",
        "mark": "O"
      },
      {
        "role": "範圍介詞片語",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "表示比較的範圍「在這家店裡面」，與後面的名詞片語組成範圍修飾語",
        "mark": "O"
      },
      {
        "role": "範圍受詞",
        "token": "the store",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "介系詞 in 的受詞，指出比較的場域是這家特定商店",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "虛代詞 it 用錯（應改用真正的主詞）",
        "bad": "(X) **It** was the cutest animal in the store.",
        "ok": "(O) **The puppy** was the cutest animal in the store.",
        "why": "it 只有兩種用法：一種是真正指前面提過的單一東西，一種是虛代詞，用在 It is nice to meet you. 這類固定句型裡。像本句這種描述具體動物的句子，前面必須有真正的主詞，不能用 it 空著。台灣學生常覺得中文可以省略，所以隨手用 it 帶過。判斷法：問自己「it 到底指什麼？」答不出來就必須改成真正的名詞。",
        "exOkText": "(O) **The panda** was the cutest in the store.",
        "exOkZh": "那隻熊貓是這家店裡最可愛的。",
        "exBadText": "(X) **It** was the cutest in the store.",
        "exBadNote": "錯誤：前面沒有提到過任何東西，it 無法當主詞，要改成 The panda"
      },
      {
        "title": "短句裡最容易漏掉的 the（最高級前加冠詞）",
        "bad": "(X) It was **cutest** puppy in the store.",
        "ok": "(O) It was **the cutest** puppy in the store.",
        "why": "最高級前面一定要加 the，這是固定規則。台灣學生在 it was 這種短短的句子裡最容易漏掉，因為句子一短就容易急著寫完。判斷法：寫完 be 動詞後面那個字，如果結尾是 -est，前面沒有 the 就立刻補上再往下寫。",
        "exOkText": "(O) It was **the cutest** puppy in the store.",
        "exOkZh": "它是這家店裡最可愛的小狗。",
        "exBadText": "(X) It was **cutest** puppy in the store.",
        "exBadNote": "錯誤：最高級 cutest 前面漏了定冠詞 the"
      },
      {
        "title": "語序錯誤（表語片語不能倒到主詞後面）",
        "bad": "(X) **The cutest in the store was it**.",
        "ok": "(O) **It was the cutest in the store**.",
        "why": "英文的語序是「主詞 + be 動詞 + 表語」，it 必須站在最前面當主詞，不能把 the cutest in the store 整組搬到 was 後面，再讓 it 跑到句尾。台灣學生受中文「最可愛的它是……」的語序影響，會把形容詞片語提到最前面。判斷法：主詞一定是人或物的名詞，寫在最前面；the cutest 這種片語是表語，寫在 be 動詞後面。",
        "exOkText": "(O) It was **the cutest in the store**.",
        "exOkZh": "它是這家店裡最可愛的。",
        "exBadText": "(X) The cutest in the store was **it**.",
        "exBadNote": "錯誤：主詞 it 必須放在句首，形容詞片語要當表語"
      },
      {
        "title": "最高級缺少比較範圍（句子資訊不完整）",
        "bad": "(X) It was **the cutest**.",
        "ok": "(O) It was **the cutest in the store**.",
        "why": "最高級一定要交代「在什麼範圍內比較」，否則聽眾無從知道它跟誰比。可以用 in + 場所、of + 群體、among + 三個以上成員來交代。台灣學生翻譯中文「它是最可愛的」時常忘記補上範圍。判斷法：句尾如果只有 the cutest，就立刻問「範圍呢？」然後補上 in the store 或 of my family。",
        "exOkText": "(O) It was **the cutest in our class**.",
        "exOkZh": "它是我們班裡最可愛的。",
        "exBadText": "(X) It was **the cutest**.",
        "exBadNote": "錯誤：最高級沒有交代比較範圍，句子資訊不完整"
      }
    ],
    "traps": [
      "**it 的兩種用法的陷阱**：it 指向具體事物時，前面一定要有上下文；想表達「它很可愛」不能直接用 it 開頭，要寫 The panda was…",
      "**最高級三要素的陷阱**：the + 最高級 + 範圍介詞，三者缺一不可，會考常故意拿掉範圍當誘餌。",
      "**語序的陷阱**：主詞一定要在句首，the cutest 這類表語片語一定在 be 動詞之後。",
      "**定冠詞的陷阱**：最高級前面漏 the 是最常見的扣分點，交卷前快速掃一遍所有 -est。"
    ],
    "strategy": [
      "寫完含最高級的句子後，用手指數一次：the、-est、in／of 有沒有到齊。",
      "背句型時把「It was the + 最高級 + in the + 場所」當成一個模板整組背。",
      "以 it 開頭的句子，寫完先問「it 是誰？」，答不出來就換成真正的名詞。",
      "多讀會考短文，特別注意最高級出現的地方，通常後面都會跟著 in 或 of。"
    ]
  },
  "because it was the cutest in the store": {
    "zh": "因為它是商店裡最可愛的一個",
    "ipa": "bɪˈkəz ɪt wəz ðə kjuː.t̮ɪst ɪn ðə stɔːr",
    "intro": "針對您提供的英文片語 **because it was the cutest in the store**，這是一個原因副詞子句，由連接詞 because 引導，後面接完整的子句（主詞 it + be 動詞 was + 表語）。它本身還不是完整句子，前面需要一個主句搭配。本句的重點在連接詞 because：它和 so 是同一組的因果連接詞，兩者只能擇一。",
    "headline": "because 引導原因子句；不能和 so 併用",
    "structure": [
      {
        "role": "連接詞",
        "token": "because",
        "pos": "連接詞 (Conjunction) — 從屬連接詞",
        "func": "引導原因副詞子句，回答「為什麼」；後面接主詞加動詞的完整子句，後面不能再加 so",
        "mark": "O"
      },
      {
        "role": "子句主詞",
        "token": "it",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "原因子句的主角，配合 be 動詞 was",
        "mark": "O"
      },
      {
        "role": "子句動詞",
        "token": "was",
        "pos": "動詞 (Verb) — be 動詞的過去式",
        "func": "連接主詞與表語，表示過去的狀態",
        "mark": "O"
      },
      {
        "role": "子句表語",
        "token": "the cutest",
        "pos": "名詞片語 (Noun Phrase) — 定冠詞 + 最高級",
        "func": "說明「是最可愛的」；最高級前固定加 the",
        "mark": "O"
      },
      {
        "role": "範圍介詞片語",
        "token": "in the store",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "交代比較的範圍，位於子句的最後方，修飾最高級",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "because 與 so 一起使用（中文式直譯）",
        "bad": "(X) **Because** it was the cutest in the store, **so** I bought it.",
        "ok": "(O) **Because** it was the cutest in the store, I bought it. ／ (O) It was the cutest in the store, **so** I bought it.",
        "why": "because 和 so 都是表達因果的連接詞，但它們是一組，只能擇一使用：選了 because 就不能再用 so，選了 so 就不能再用 because。台灣學生受中文「因為……所以……」的影響，會把兩個都寫出來，這在會考中是明確的錯誤。判斷法：寫完 because 就把後面的 so 擦掉，反之亦然。",
        "exOkText": "(O) **Because** it was the cutest in the store, I bought it.",
        "exOkZh": "因為它是這家店裡最可愛的，我把它買了下來。",
        "exBadText": "(X) **Because** it was the cutest in the store, **so** I bought it.",
        "exBadNote": "錯誤：because 和 so 不能同時使用，選一個就好"
      },
      {
        "title": "because 與 and 混淆（表原因不用 and）",
        "bad": "(X) It was the cutest in the store, **and** I bought it.",
        "ok": "(O) I bought it **because** it was the cutest in the store.",
        "why": "and 只能連接兩件對等的句子（並列關係），不能表示「前一句是後一句的原因」。要說明原因必須用 because、since 或 so。台灣學生常覺得中文「因為很可愛，所以買了」翻成英文只要用 and 連起來。判斷法：問自己「前一句是後一句的原因嗎？」是就用 because 或 so；只是兩件事並排發生才用 and。",
        "exOkText": "(O) I bought it **because** it was the cutest in the store.",
        "exOkZh": "我買下它是因為它是這家店裡最可愛的。",
        "exBadText": "(X) It was the cutest in the store, **and** I bought it.",
        "exBadNote": "錯誤：and 只能表示並列，不能表達因果關係"
      },
      {
        "title": "because 後面誤加逗號（中文標點直覺）",
        "bad": "(X) I wanted it **because**, it was the cutest in the store.",
        "ok": "(O) I wanted it **because** it was the cutest in the store.",
        "why": "because 已經把前後兩部分連成一整個句子，中間不能再用逗號分開。台灣學生受中文「因為很可愛，所以想買」逗號習慣的影響，會在 because 後面也加上一個逗號。判斷法：because 是連接詞，後面接主詞時不加逗號；只有 when、if 這類插入語放在句子中間時才可能需要逗號。",
        "exOkText": "(O) I wanted it **because** it was the cutest in the store.",
        "exOkZh": "我想要它，因為它是這家店裡最可愛的。",
        "exBadText": "(X) I wanted it **because**, it was the cutest in the store.",
        "exBadNote": "錯誤：because 後面不能加逗號，連接詞已經把句子連成一體"
      },
      {
        "title": "因果邏輯顛倒（原因與結果放反）",
        "bad": "(X) It was the cutest in the store **because** I bought it.",
        "ok": "(O) I bought it **because** it was the cutest in the store.",
        "why": "because 後面接的應該是「原因」，前面是「結果」。這句的中文語意是「它最可愛，因為我買了它」，因果完全反過來了：應該是我因為它可愛才買它。台灣學生在翻譯中文時常把兩半對調。判斷法：把 because 換成中文「因為」，唸出來若不通順，就是因果放反了。",
        "exOkText": "(O) I bought it **because** it was the cutest in the store.",
        "exOkZh": "我買下它是因為它是這家店裡最可愛的。",
        "exBadText": "(X) It was the cutest in the store **because** I bought it.",
        "exBadNote": "錯誤：因果顛倒，應該是因為可愛才買，而不是因為買了才可愛"
      }
    ],
    "traps": [
      "**because 與 so 只能擇一的陷阱**：兩者都表因果，同時出現就是錯，會考選擇題常設計這個誘餌。",
      "**because 不能加逗號的陷阱**：中文「因為……，所以……」的逗號習慣不要帶進英文句子。",
      "**and 不能表達原因的陷阱**：要說明原因用 because、since、so，and 只負責並列。",
      "**因果順序的陷阱**：英文習慣把結果放前面、原因放後面，也就是 I bought it because it was the cutest."
    ],
    "strategy": [
      "寫完因果句後，用手指把 because 和 so 各找一次，確認只出現一個。",
      "把 because、so、and 做成三張小卡：because（原因）、so（結果）、and（並排），落筆前先決定要用哪一張。",
      "句尾唸一次，聽到 because 和 so 同時出現就立刻改。",
      "多練習把中文的「因為……所以……」改寫成只有 because 或只有 so 的英文句。"
    ]
  },
  "climbing": {
    "zh": "爬山",
    "ipa": "ˈklaɪ.mɪŋ",
    "intro": "針對您提供的英文單字 **climbing**，這是動詞 climb 加 -ing 形成的 -ing 形式，本身不是完整句子。它可以當動名詞（當名詞用，如 I like climbing.）、當現在分詞（放在 be 動詞後構成進行式，如 He is climbing.）、也可以放在介詞後面接成片語。會考最常考的就是這三種用法與 -ing 的拼寫變化。",
    "headline": "climb + -ing；介詞後與 be 動詞後都要用",
    "structure": [
      {
        "role": "動詞（-ing 形式）",
        "token": "climbing",
        "pos": "動名詞／現在分詞 (Gerund / Present Participle)",
        "func": "由 climb 加 -ing 構成；接在 be 動詞後構成現在進行式，接在介詞或 enjoy 等動詞後則當動名詞使用",
        "mark": "O"
      },
      {
        "role": "應搭配的 be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞",
        "func": "climbing 放在 be 動詞後面才構成現在進行式，所以要補上 am／is／are；單獨抽出這個字時這一層被省略了",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動名詞與原形動詞的詞性誤用（特定詞後要加 -ing）",
        "bad": "(X) He is good at **climb**.",
        "ok": "(O) He is good at **climbing**.",
        "why": "climbing 在這裡是動名詞（Gerund），當名詞使用；像 be good at、enjoy、finish、keep、practice 這一類詞，後面一定要接動名詞，不能接原形動詞。台灣學生常把動詞原形和動名詞混用，中文又看不出差別。判斷法：只要看到 at、enjoy、practice、finish、keep 這些字，後面的動詞立刻加 -ing。",
        "exOkText": "(O) She enjoys **climbing** mountains on weekends.",
        "exOkZh": "她週末喜歡爬山。",
        "exBadText": "(X) She enjoys **climb** mountains on weekends.",
        "exBadNote": "錯誤：enjoy 後面必須接動名詞 climbing"
      },
      {
        "title": "-ing 的拼寫規則（去 e 加 ing，輔音不重複）",
        "bad": "(X) I like **climbin** mountains. ／ (X) I like **climbbing** mountains.",
        "ok": "(O) I like **climbing** mountains.",
        "why": "動詞加 -ing 時要去掉結尾的 e 再加 ing；如果是「輔音字母 + y」結尾，則要去 y 加 ing。而 climb 這種以 b 結尾的單音節動詞，不屬於「短母音 + 單一輔音」結尾，所以 b 不重複。台灣學生常多寫一個 b，或忘記處理結尾的 e。判斷法：先處理結尾（去 e 或改 y），之後才考慮要不要雙寫輔音。",
        "exOkText": "(O) We practiced **climbing** all last weekend.",
        "exOkZh": "我們上個週末都在練習爬山。",
        "exBadText": "(X) We practiced **climbbing** all last weekend.",
        "exBadNote": "錯誤：climb 加 -ing 時 b 不重複，應寫 climbing"
      },
      {
        "title": "進行式：be 動詞後必須加 -ing",
        "bad": "(X) They are **climb** the hill now.",
        "ok": "(O) They are **climbing** the hill now.",
        "why": "be 動詞後面接現在分詞 -ing 就構成現在進行式，表示「正在做」。不能直接用原形 climb，否則句子變成兩個動詞並列，語法不成立。台灣學生常忘記 be 動詞後的 -ing。判斷法：看到 am／is／are，後面一定要有個 -ing 結尾的字。",
        "exOkText": "(O) They are **climbing** the hill now.",
        "exOkZh": "他們正在爬那座山丘。",
        "exBadText": "(X) They are **climb** the hill now.",
        "exBadNote": "錯誤：be 動詞後要接 -ing 才能構成現在進行式"
      },
      {
        "title": "動名詞作主語時視為單數",
        "bad": "(X) **Climbing** mountains are my favorite hobby.",
        "ok": "(O) **Climbing** mountains is my favorite hobby.",
        "why": "動名詞作主語時，雖然寫法是 -ing 結尾，但整個片語視為單數一個概念，所以後面的 be 動詞要用 is。台灣學生常看到 -ing 就以為是複數。判斷法：動名詞作主語＝一個概念＝單數＝用 is。",
        "exOkText": "(O) **Climbing** mountains is my favorite hobby.",
        "exOkZh": "爬山是我最喜歡的興趣。",
        "exBadText": "(X) **Climbing** mountains are my favorite hobby.",
        "exBadNote": "錯誤：動名詞片語作主語視為單數，be 動詞要用 is"
      }
    ],
    "traps": [
      "**-ing 拼寫的陷阱**：去結尾 e（make → making）、改結尾 y（study → studying），但單音節的 climb、jump 不重複輔音。",
      "**介詞後接動名詞的陷阱**：at、enjoy、practice、finish、keep、mind 這些詞後面一定要 -ing。",
      "**進行式的陷阱**：看到 am／is／are，後面必須是 -ing，這是會考最常檢查的地方。",
      "**動名詞當單數的陷阱**：Swimming is good exercise. 這種句子要用 is，不是 are。"
    ],
    "strategy": [
      "整理一張「-ing 變化表」：去 e 型、改 y 型、輔音重複型，每週複習一次。",
      "背片語搭配時整組背：enjoy climbing、be good at climbing、keep climbing。",
      "寫句子時看到 be 動詞就自動在腦中加上 -ing。",
      "練習時把原形與 -ing 版本並排寫，久了自然分得出來。"
    ]
  },
  "mountain climbing": {
    "zh": "爬山運動",
    "ipa": "ˈmaʊn.tən ˈklaɪ.mɪŋ",
    "intro": "針對您提供的英文片語 **mountain climbing**，這是一個複合名詞（Noun Compound），由「名詞 mountain + 動名詞 climbing」組成，整個詞組當名詞使用，指「爬山這項運動」。它不能單獨成句，通常放在 be 動詞後當表語，或搭配 do、go、take up 等動詞。複合名詞的重點是詞序與定語規則。",
    "headline": "複合名詞主要詞在後；作定語時名詞用單數",
    "structure": [
      {
        "role": "定語（名詞）",
        "token": "mountain",
        "pos": "名詞 (Noun) — 可數名詞，此處作定語",
        "func": "修飾後面的 climbing，表示是「哪一種」爬山；作定語時用單數且不加冠詞、不加 s",
        "mark": "O"
      },
      {
        "role": "中心語（動名詞）",
        "token": "climbing",
        "pos": "動名詞 (Gerund)",
        "func": "複合名詞的主要詞，決定整個詞組的意思是「爬山這項活動」，位置一定在後面",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "複合名詞的詞序錯誤（主要詞要放後面）",
        "bad": "(X) **Climbing mountain** is good exercise.",
        "ok": "(O) **Mountain climbing** is good exercise.",
        "why": "複合名詞的順序是「修飾語 + 主要名詞」。在 mountain climbing 裡，climbing（爬山這件事）才是主要的活動，mountain 只是修飾它，所以 mountain 放在前面。台灣學生常把兩個字對調。判斷法：問自己「這件事叫什麼？」那個就是主要名詞，必須放在最後。",
        "exOkText": "(O) **Mountain climbing** is a popular sport in Taiwan.",
        "exOkZh": "爬山是台灣熱門的運動。",
        "exBadText": "(X) **Climbing mountain** is a popular sport in Taiwan.",
        "exBadNote": "錯誤：主要詞 climbing 要放在後面，應寫 mountain climbing"
      },
      {
        "title": "作定語的名詞要用單數，且不加冠詞",
        "bad": "(X) She does **mountains climbing** every Sunday. ／ (X) She does **the mountain climbing** every Sunday.",
        "ok": "(O) She does **mountain climbing** every Sunday.",
        "why": "複合名詞的前半段是用來修飾後半段的「定語」，英文的定語一律用單數，而且不加冠詞、不加 -s。mountain climbing 是「一項運動」的名稱，不會變成 mountains climbing。台灣學生常以為複數名詞作定語要加 s，或順手加一個 the。判斷法：定語前面不加 the、a，也沒有 s。",
        "exOkText": "(O) She does **mountain climbing** every Sunday.",
        "exOkZh": "她每個星期天都去爬山。",
        "exBadText": "(X) She does **the mountain climbing** every Sunday.",
        "exBadNote": "錯誤：作定語的 mountain 不加冠詞 the，也不加 s"
      },
      {
        "title": "連字號使用錯誤（作形容詞時要加連字號）",
        "bad": "(X) He won a **mountainclimbing** contest last year.",
        "ok": "(O) He won a **mountain-climbing** contest last year.",
        "why": "mountain climbing 當名詞時分開寫，當形容詞修飾後面的名詞（contest、club、trip）時，兩個字之間要加連字號。台灣學生常把兩種用法混在一起，或乾脆把兩字黏成一個。判斷法：後面還接名詞就是形容詞，要加連字號；自己當主詞或受詞就分開寫。",
        "exOkText": "(O) He won a **mountain-climbing** contest last year.",
        "exOkZh": "他去年贏得了爬山比賽。",
        "exBadText": "(X) He won a **mountainclimbing** contest last year.",
        "exBadNote": "錯誤：作形容詞時要寫成 mountain-climbing，中間有連字號"
      },
      {
        "title": "搭配的動詞用錯（go／do／take up + 運動名）",
        "bad": "(X) My brother **makes** mountain climbing in spring.",
        "ok": "(O) My brother **takes up** mountain climbing in spring.",
        "why": "運動名稱前面要搭配特定的動詞：mountain climbing 用 do（做這項運動）、go（去做這項運動）、take up（開始從事），不能用 make。台灣學生常把中文的「做」直接翻成 make。判斷法：運動、學科前面用 do；開始從事某項運動用 take up，別忘了後面的 up。",
        "exOkText": "(O) My brother **takes up** mountain climbing in spring.",
        "exOkZh": "我哥哥在春天開始爬山。",
        "exBadText": "(X) My brother **makes** mountain climbing in spring.",
        "exBadNote": "錯誤：運動名稱前要用 do／go／take up，不用 make"
      }
    ],
    "traps": [
      "**複合名詞詞序的陷阱**：主要名詞在後面，mountain climbing 不能寫成 climbing mountain。",
      "**定語單數的陷阱**：作定語的名詞不加 s 也不加冠詞，mountain climbing 不能寫成 mountains climbing。",
      "**連字號的陷阱**：作形容詞時寫 mountain-climbing，作名詞時分開寫，兩種形式不能混用。",
      "**運動搭配的陷阱**：go／do／take up + 運動名，make 不能用，而且 take up 的 up 不能漏。"
    ],
    "strategy": [
      "把三種寫法整理成一張表：名詞 mountain climbing、形容詞 mountain-climbing、搭配動詞 do mountain climbing。",
      "看到複合名詞先問「哪個字是主要的」，把它圈起來放最後。",
      "背運動搭配時整組背：go swimming、do mountain climbing、take up jogging。",
      "寫完檢查一次定語：前面有沒有 the、a 或 s，有就刪掉。"
    ]
  },
  "hours of mountain climbing": {
    "zh": "幾小時的爬山",
    "ipa": "ˈaʊ.ɚz əv ˈmaʊn.tən ˈklaɪ.mɪŋ",
    "intro": "針對您提供的英文片語 **hours of mountain climbing**，這是一個「複數名詞 + of + 名詞」構成的名詞片語，整體當名詞使用，相當於中文「幾小時的爬山」。它本身不能單獨成句，通常放在動詞後面當受詞。這個單位的重點有三個：of 的選擇、of 前面不加所有格、of 後面用動名詞。",
    "headline": "hours 用複數；of 後接動名詞，前面不加 's",
    "structure": [
      {
        "role": "修飾語（複數名詞）",
        "token": "hours",
        "pos": "名詞 (Noun) — hour 的複數形式",
        "func": "表示「幾小時」這個時間量；前面的數量詞一到九（one 除外）都要用複數",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接兩個名詞，表示「……的所有者」，把 hours 和 mountain climbing 組成一個名詞片語",
        "mark": "O"
      },
      {
        "role": "受詞（複合名詞）",
        "token": "mountain climbing",
        "pos": "名詞片語 (Noun Phrase) — 複合名詞",
        "func": "of 的受詞，說明這幾小時是在做什麼；本身當名詞用，所以用動名詞形式 climbing",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "of 與 for 的選擇",
        "bad": "(X) I spent two hours **for** mountain climbing.",
        "ok": "(O) I spent two hours **of** mountain climbing.",
        "why": "of 構成「時間的所有者」，two hours of mountain climbing 是「兩小時的爬山」，整個片語當名詞用；for 後面要接動詞或動名詞，例如 two hours for climbing。台灣學生常把中文「的」一律翻成 of，忽略了 spend + 時間 + for + 動名詞的固定搭配。判斷法：hours of 後面接名詞，spent...for 後面接動名詞。",
        "exOkText": "(O) He spends two hours **of** mountain climbing every day.",
        "exOkZh": "他每天花兩小時爬山。",
        "exBadText": "(X) He spends two hours **for** mountain climbing every day.",
        "exBadNote": "錯誤：兩小時的爬山要用 of，for 後面要接動名詞"
      },
      {
        "title": "所有格 -'s 誤用（of 前面的名詞不加所有格）",
        "bad": "(X) I spent two **hour's** of mountain climbing.",
        "ok": "(O) I spent two **hours** of mountain climbing.",
        "why": "名詞所有格是用來表示「某個人的」的，例如 my sister's book。當 hours of 後面接活動名稱時，標準寫法就是 of，前面既不加 -'s 也不變形。台灣學生看到中文「兩小時的」就直接加 -'s，是很典型的直譯錯誤。判斷法：of 之後的名詞不變形，前面的 hours 也保持原樣。",
        "exOkText": "(O) The two **hours** of mountain climbing made me tired.",
        "exOkZh": "那兩個小時的爬山讓我很累。",
        "exBadText": "(X) The two **hour's** of mountain climbing made me tired.",
        "exBadNote": "錯誤：of 前面的複數名詞不加所有格 -'s"
      },
      {
        "title": "of 之後用動名詞，不能用不定式",
        "bad": "(X) It took him two hours of **to climb** the mountain.",
        "ok": "(O) It took him two hours of **climbing** the mountain.",
        "why": "of 前面有 hours 這種抽象名詞時，of 後面要用「名詞」來當它的內容，最自然的選擇就是動名詞 -ing 形式或原形名詞，不能寫成 to climb 這種不定式。台灣學生常看到 to climb 就覺得是「去爬山」，但放在 of 之後就不成立。判斷法：of 後面只接名詞或動名詞，絕對不會出現 to。",
        "exOkText": "(O) It took him two hours of **climbing** the mountain.",
        "exOkZh": "他花了兩個小時爬山。",
        "exBadText": "(X) It took him two hours of **to climb** the mountain.",
        "exBadNote": "錯誤：of 之後要用動名詞 climbing，不能用不定式 to climb"
      },
      {
        "title": "數量詞與可數名詞的複數搭配",
        "bad": "(X) We spent **three hour** of mountain climbing yesterday.",
        "ok": "(O) We spent **three hours** of mountain climbing yesterday.",
        "why": "數字 two、three 之後的可數名詞一定要用複數；只有 one 才搭配單數 hour。台灣學生常因中文「三個小時」裡沒有單複數變化，就把 hour 原封不動地寫上去。判斷法：數字一到九，除了 one 之外的名詞一律變成複數。",
        "exOkText": "(O) We spent **three hours** of mountain climbing yesterday.",
        "exOkZh": "我們昨天爬了三個小時的山。",
        "exBadText": "(X) We spent **three hour** of mountain climbing yesterday.",
        "exBadNote": "錯誤：three 後面的可數名詞要用複數 hours"
      }
    ],
    "traps": [
      "**of 與 for 的陷阱**：of 表示所有關係、for 表示目的或對象，會考常在「花時間做某事」這個句型上設陷阱。",
      "**所有格的陷阱**：of 前面不加 -'s，只有「某個人的」才用所有格，這是中文直譯最容易踩到的雷。",
      "**of 後面不出現 to 的陷阱**：of 之後接名詞或動名詞，出現 to 就是錯的。",
      "**數量詞複數的陷阱**：one hour 對 two／three／four hours，數字一到九只有 one 用單數。"
    ],
    "strategy": [
      "把 of 和 for 做成一張對照卡，寫完 hours 之後停一秒，確認選對介詞。",
      "寫完 of 片語後檢查一次：前面有沒有 -'s、後面有沒有 to，有就改掉。",
      "練習時把 I spent two hours of climbing 整組背，不要拆開記。",
      "每次寫數字都順手檢查後面的名詞有沒有變複數，這個檢查只要一秒。"
    ]
  },
  "four hours of mountain climbing": {
    "zh": "四個小時的爬山",
    "ipa": "fɔːr ˈaʊ.ɚz əv ˈmaʊn.tən ˈklaɪ.mɪŋ",
    "intro": "針對您提供的英文片語 **four hours of mountain climbing**，這是「數詞 four + 複數名詞 hours + of + 複合名詞」構成的名詞片語，整體相當於中文「四個小時的爬山」。它不能單獨成句，通常當受詞使用。這個單位的重點有四個：數字怎麼寫、of 不能漏、序數詞怎麼用，以及 for 與 four 的同音混淆。",
    "headline": "four + hours 複數；of 不能漏；for／four 要分清",
    "structure": [
      {
        "role": "數詞",
        "token": "four",
        "pos": "數詞 (Numeral) — 基數詞",
        "func": "表示數量「四」，後面接可數名詞的複數；唸音與介系詞 for 相同，但功能完全不同",
        "mark": "O"
      },
      {
        "role": "中心名詞",
        "token": "hours",
        "pos": "名詞 (Noun) — hour 的複數形式",
        "func": "表示時間單位「小時」；前面是 four 這類數字，所以必須用複數",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接兩個名詞，表示「……的」，把整組組成一個名詞片語；不能省略",
        "mark": "O"
      },
      {
        "role": "受詞（複合名詞）",
        "token": "mountain climbing",
        "pos": "名詞片語 (Noun Phrase) — 複合名詞",
        "func": "of 的受詞，說明這四小時在做什麼；當名詞用，所以用動名詞形式 climbing",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "序數詞與基數詞的選擇（four 與 fourth）",
        "bad": "(X) We went hiking on May **four**.",
        "ok": "(O) We went hiking on May **fourth**.",
        "why": "表示順序、日期、樓層或名次時要用序數詞 fourth（第四），four 是基數詞，只表示「四個」這個數量。台灣學生常在日期直接用基數詞。判斷法：只要看到「日期、樓層、次序、名次」這些字，就把數字變成序數詞，記法是 four 加 th 變 fourth。",
        "exOkText": "(O) We went hiking on May **fourth**.",
        "exOkZh": "我們五月四號去爬山。",
        "exBadText": "(X) We went hiking on May **four**.",
        "exBadNote": "錯誤：日期要用序數詞 fourth，不能用基數詞 four"
      },
      {
        "title": "of 的省略（時間單位後必須接 of）",
        "bad": "(X) I spent **four hours mountain climbing**.",
        "ok": "(O) I spent **four hours of mountain climbing**.",
        "why": "hours 和 mountain climbing 之間一定要有 of，才能構成「四小時的爬山」這個名詞片語。少了 of，兩組名詞就直接黏在一起，句子變成四小時的山在爬。台灣學生照中文「四個小時爬山」翻譯時常漏掉 of。判斷法：時間單位後面接活動名稱，中間要加 of。",
        "exOkText": "(O) I spent **four hours of mountain climbing** last Sunday.",
        "exOkZh": "我上個星期天爬了四個小時的山。",
        "exBadText": "(X) I spent **four hours mountain climbing** last Sunday.",
        "exBadNote": "錯誤：hours 與 mountain climbing 之間漏了介系詞 of"
      },
      {
        "title": "for 與 four 的同音混淆",
        "bad": "(X) I climb the mountain **for** hours every day.",
        "ok": "(O) I climb the mountain **for four hours** every day.",
        "why": "for（介系詞）與 four（數字四）唸音完全相同，但功能不同：for 後面接時間量表示「持續多久」，four 後面接名詞表示數量。台灣學生在聽力與口說中常把兩者搞混，寫作時尤其容易把數字誤寫成 for。判斷法：要表達「持續四小時」時寫 for four hours，這兩個詞一定是一起出現的。",
        "exOkText": "(O) I climb the mountain **for four hours** every day.",
        "exOkZh": "我每天爬山四個小時。",
        "exBadText": "(X) I climb the mountain **for** hours every day.",
        "exBadNote": "錯誤：表示持續四小時要寫 for four hours，不能只寫 for"
      },
      {
        "title": "英文數字寫成阿拉伯數字",
        "bad": "(X) I spent **4** hours of mountain climbing yesterday.",
        "ok": "(O) I spent **four** hours of mountain climbing yesterday.",
        "why": "在英文寫作與會考作答中，句子裡的數目通常要拼成英文單字（four），而不是直接保留阿拉伯數字。台灣學生翻譯句子時常直接把 4 抄上去。判斷法：把題目的數字唸出來再拼寫一次，檢查字母有沒有漏，這個檢查只要幾秒。",
        "exOkText": "(O) We spent **four hours** of mountain climbing yesterday.",
        "exOkZh": "我們昨天爬了四個小時的山。",
        "exBadText": "(X) We spent **4 hours** of mountain climbing yesterday.",
        "exBadNote": "錯誤：正式英文寫作中數字要拼成單字 four"
      }
    ],
    "traps": [
      "**序數詞的陷阱**：日期、樓層、名次一律用序數詞 fourth，不能用基數詞 four。",
      "**of 不能省的陷阱**：時間單位後接活動名稱一定要加 of，少了就變成兩個名詞硬湊在一起。",
      "**for 與 four 的陷阱**：兩個字唸音一樣但功能不同，會考的聽力題常拿來混淆。",
      "**數字拼寫的陷阱**：句中的數目要寫成英文單字，直接留阿拉伯數字在正式寫作中會被扣分。"
    ],
    "strategy": [
      "把 four／fourth／forty／fourteen 寫成一列，每天唸一次分清楚。",
      "寫完時間片語立刻檢查兩個地方：of 有沒有、有沒有漏掉 -s。",
      "口說時刻意練習 for four hours 這個組合，唸順了就分得出來。",
      "做完題目用手指把所有數字圈起來，確認該寫單字的地方都寫了單字。"
    ]
  },
  "after four hours of mountain climbing": {
    "zh": "經過四個小時的爬山後",
    "ipa": "ˈæf.tɚ fɔːr ˈaʊ.ɚz əv ˈmaʊn.tən ˈklaɪ.mɪŋ",
    "intro": "針對您提供的片語 **after four hours of mountain climbing**，這是一個「介系詞 + 數量 + of + 動名詞」組成的時間片語，本身不能單獨成句，必須接在主詞與動詞的前面或後面。中文「經過四個小時的爬山後」說的是「一段持續的活動」加上「活動結束的那個時間點」，整組用來修飾後面的動作。最該注意的有三處：after 的語意、時間量的複數，以及 climbing 必須寫成動名詞。",
    "headline": "after 表「過了多久」，climbing 要動名詞",
    "structure": [
      {
        "role": "介系詞",
        "token": "after",
        "pos": "介系詞 (Preposition) — + 時間量",
        "func": "引出「經過某段時間之後」的起點；後面接的是一段時間量（四個小時），不是某一個時刻",
        "mark": "O"
      },
      {
        "role": "數詞",
        "token": "four",
        "pos": "數詞 (Numeral) — 基數詞",
        "func": "修飾後面的名詞 hours，數字大於一，所以名詞一定要用複數",
        "mark": "O"
      },
      {
        "role": "時間名詞",
        "token": "hours",
        "pos": "名詞 (Noun) — hour 的複數",
        "func": "表示「小時」這個可數的時間單位；one hour 是單位名稱，four hours 才是四個小時",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "of 後面接名詞或「動名詞」，把 mountain climbing 變成「爬山這件事」，表示「四小時的時間花在爬山上面」",
        "mark": "O"
      },
      {
        "role": "動名詞片語",
        "token": "mountain climbing",
        "pos": "動名詞片語 (Gerund Phrase) — climbing 是 climb 的動名詞",
        "func": "整組當名詞用，說明這四個小時在做什麼活動；of 後面不能直接接動詞原形",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "時間單位複數漏加 -s（four hour）",
        "bad": "(X) after four **hour** of mountain climbing",
        "ok": "(O) after four **hours** of mountain climbing",
        "why": "hour 是可數名詞，中文「四個小時」明顯不止一個單位，所以英文必須寫成複數 hours。學生常受中文「四小時」沒有量詞「個」的影響，直接把 hour 原形照搬過來。判斷法：數字只要大於一，後面的可數名詞一律加 -s；只有 one 後面才用單數，而且 one hour 是單位名稱，four hours 才是「四小時」。",
        "exOkText": "(O) He felt **sore** after three hours of mountain climbing.",
        "exOkZh": "爬了三個小時的山之後，他覺得雙腿痠痛。",
        "exBadText": "(X) He felt sore after three **hour** of mountain climbing.",
        "exBadNote": "錯誤：three 大於一，可數名詞 hour 必須加 -s 變成 hours，四個小時就不能寫成單數。"
      },
      {
        "title": "介系詞 of 與 for 誤用（活動用 of，理由用 for）",
        "bad": "(X) after four hours **for** mountain climbing ／ (X) after four hours **in** mountain climbing",
        "ok": "(O) after four hours **of** mountain climbing",
        "why": "of 表示「……的」，用來把時間單位和活動名稱連起來；for 表示目的、對象或持續多久，中文「為了爬山」才用 for。學生常把 of 與 for 混為一談。判斷法：只要後面接的是「一段時間裡在做什麼活動」，前面一定是 of；for 後面接的是目的或對象（for you、for two hours）。",
        "exOkText": "(O) She was tired after an hour **of** piano practice.",
        "exOkZh": "練琴一小時後，她覺得很累。",
        "exBadText": "(X) She was tired after an hour **for** piano practice.",
        "exBadNote": "錯誤：for 表示目的或持續多久；這裡是「練琴這項活動」，必須用 of piano practice。"
      },
      {
        "title": "動名詞誤用動詞原形（of 後不能接 climb）",
        "bad": "(X) after four hours of mountain **climb**",
        "ok": "(O) after four hours of mountain **climbing**",
        "why": "climbing 這個動作在句中是被當成「事物」來用的（爬山這件事），所以要用動名詞 climbing，這是英文的「名詞化」手法。介系詞 of / in / by / for 之後，動詞一律要變成動名詞。判斷法：看到「介系詞 + 動詞」，先在心裡把動詞加上 -ing 再寫上去，絕對不要寫原形。",
        "exOkText": "(O) After two hours of **swimming**, he felt very tired.",
        "exOkZh": "游了兩小時的泳之後，他覺得非常累。",
        "exBadText": "(X) After two hours of **swim**, he felt very tired.",
        "exBadNote": "錯誤：of 後面接動詞一定要用動名詞 swimming，寫成原形 swim 就不合文法。"
      },
      {
        "title": "介系詞片語位置錯誤（after 修飾錯對象）",
        "bad": "(X) **Mountain climbing** after four hours was tiring. ／ (X) after four hours of mountain climbing Rosa's legs got sore",
        "ok": "(O) **After four hours of mountain climbing**, Rosa's legs got sore.",
        "why": "after + 一段時間 + of + 活動，這整組的關係是「活動做完之後的時間點」，所以必須放在主詞與動詞之前，後面加逗號，讓讀者知道是「時間背景」。學生受中文「爬山四小時後腿痠痛」影響，容易把 after four hours 塞到 climb 附近，變成「爬完四小時才去爬山」。判斷法：after 帶時間點，一定放句首；of 後面的動名詞才是被修飾的活動。",
        "exOkText": "(O) **After four hours of mountain climbing**, the legs got sore.",
        "exOkZh": "爬了四個小時的山之後，雙腿變得痠痛。",
        "exBadText": "(X) Mountain climbing **after four hours** was tiring.",
        "exBadNote": "錯誤：after four hours 變成修飾 climbing，語意變成「爬完四小時才爬山」"
      }
    ],
    "traps": [
      "**時間量詞陷阱**：數字大於一，可數名詞一定要加 -s。four hour ✗ / four hours ✓。會考常在這裡設一個選項，讓你以為 hour 是不可數名詞。",
      "**of 與 for 陷阱**：of + 活動（of running），for + 目的或對象（for a gift、for two hours）。兩者互換是會考克漏字最常見的錯法。",
      "**介系詞 + 動詞陷阱**：介系詞後面的動詞必須變成動名詞。看到 of climb、for swim 一律判錯，寫成 of climbing、for swimming。",
      "**位置陷阱**：after / before 引導時間狀語置於句首時，後面要加逗號；放句尾時不加。兩者意思相同，但會考句子排序常拿位置出題。"
    ],
    "strategy": [
      "先圈時間量詞：看到 after + 數字 + 單位，先確認單複數，再往下寫 of 和動名詞，順序檢查最不容易錯。",
      "建立「介系詞 + 動名詞」的肌肉記憶：of / for / in / by / with 後面看到動詞，一律先加 -ing，這個規則可以省掉一半的檢查時間。",
      "朗讀時把 after 開頭的片語當成標題唸一次：唸順了，逗號位置自然就對了。",
      "整理自己的時間片語清單：after two hours of…、before dinner、at the age of…，考前唸三轮，考場上直接套用。"
    ]
  },
  "legs": {
    "zh": "雙腿",
    "ipa": "leɡz",
    "intro": "針對您提供的單字 **legs**，這是一個名詞（leg 的複數形式），單獨一個詞，本身不是完整句子，必須放進句子裡當主詞、動詞或受詞使用。中文的「雙腿」在英文裡同時包含了「兩條」和「身體部位」兩個訊息，前者要用複數，後者要用 leg 這個字。最該注意的是複數拼寫、發音，以及它和相似字形的差別。",
    "headline": "可數名詞複數加 -s，尾音要唸成 /z/",
    "structure": [
      {
        "role": "身體部位名詞",
        "token": "legs",
        "pos": "名詞 (Noun) — leg 的複數",
        "func": "指「兩條腿」；做主詞時視為複數，後面的動詞要用複數形式（are / got）",
        "mark": "O"
      },
      {
        "role": "構詞變化",
        "token": "leg → legs",
        "pos": "構詞 (Morphology) — 規則複數",
        "func": "leg 是可數名詞，複數直接加 -s；這是不規則複數之外的規則變化",
        "mark": "O"
      },
      {
        "role": "發音",
        "token": "legs",
        "pos": "音標 (Phonetics) — /leɡz/",
        "func": "複數的 -s 在 leg 後面要讀成有聲的 /z/，跟單數 leg 的尾音 /ɡ/ 明顯不同",
        "mark": "O"
      },
      {
        "role": "語意數量",
        "token": "legs（雙腿）",
        "pos": "語意 (Semantics) — 數量概念",
        "func": "中文「雙腿」強調「兩條」，所以英文一定要用複數 legs；單數 a leg 只指其中一條",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "可數名詞複數漏加 -s（leg 誤用為複數）",
        "bad": "(X) Rosa's **leg** got sore. ／ (X) He hurt two **leg**.",
        "ok": "(O) Rosa's **legs** got sore.",
        "why": "leg 是可數名詞，代表一條具体的腿；中文的「雙腿」和英文的 two legs 都表示兩條以上，英文就一定要用複數 legs。學生常因為中文沒有明說「兩條 leg」而直接沿用單數。判斷法：只要前面有 two、three、my、his，或中文出現「雙腿」「兩腿」，後面的 leg 一律加 -s。",
        "exOkText": "(O) My **legs** feel sore after running.",
        "exOkZh": "跑步之後，我的雙腿覺得痠痛。",
        "exBadText": "(X) My **leg** feel sore after running.",
        "exBadNote": "錯誤：中文是「雙腿」，leg 必須用複數 legs；且 legs 是複數主詞，後面的動詞要用 are"
      },
      {
        "title": "單複數語意錯置（一條腿與兩條腿混用）",
        "bad": "(X) Rosa hurt **leg** on the mountain. ／ (X) Only **leg** was hurt.",
        "ok": "(O) Rosa hurt **her legs** on the mountain.",
        "why": "hurt 這個動作如果發生在「兩邊」，就要用複數；如果只講「其中一條受傷」，才用單數並加上 a 或 one。學生常把中文「腿受傷」的「腿」直接翻成單數 leg。判斷法：先問自己「是幾條腿？」——兩條用 legs，一條用 a leg，並且 one leg 的前面要有 a、one 或 this。",
        "exOkText": "(O) He broke **one of his legs** last week.",
        "exOkZh": "他上週摔斷了自己的一條腿。",
        "exBadText": "(X) He broke **one of his leg** last week.",
        "exBadNote": "錯誤：one of 後面的名詞一定要用複數，必須寫成 legs 而不能寫成單數 leg。"
      },
      {
        "title": "複數 -s 發音錯誤（讀成 /s/ 或吞掉）",
        "bad": "(X) legs 讀成 /leks/ ／ (X) legs 讀成 /leɡ/",
        "ok": "(O) legs 讀成 /leɡz/",
        "why": "leg 結尾是 /ɡ/ 這個有聲音，加上的複數 -s 會讓前面的 /ɡ/ 變得更有力，整個尾音要讀成 /z/。學生常直接套用 bus 的規則讀成 /s/，或忘記唸出這個音。判斷法：清音（p、t、k、f）後面接 -s 讀 /s/；浊音（b、d、ɡ、v）後面接 -s 就讀 /z/。",
        "exOkText": "(O) **legs** /leɡz/ — 我的雙腿 /maɪ leɡz/",
        "exOkZh": "唸法參考：legs 讀 /leɡz/，my legs 讀 /maɪ leɡz/。",
        "exBadText": "(X) legs /leks/ — 錯把 -s 讀成清音",
        "exBadNote": "錯誤：leg 結尾是 /ɡ/，複數 -s 要讀成有聲的 /z/，不能讀成 /s/"
      },
      {
        "title": "字形相近詞辨析（leg / lay / lie）",
        "bad": "(X) Rosa's **lies** were sore. ／ (X) She **laied** down to rest her leg.",
        "ok": "(O) Rosa's **legs** were sore.",
        "why": "leg 是「腿」，唸 /leɡ/；lay 是「躺、放置」的過去式（lay-laid-laid），lie 是「躺」的原形（lie-lay-lain）。這三個字在聽力與快速閱讀時很容易混淆，寫作時只要檢查句意就可分辨。判斷法：句中出現「身體的部位」一定是 leg；出現「躺下、放東西」才是 lay 或 lie。",
        "exOkText": "(O) He **lay** down on the bed to rest his **legs**.",
        "exOkZh": "他躺在床上讓雙腿休息。",
        "exBadText": "(X) He **leid** down on the bed to rest his **legs**.",
        "exBadNote": "錯誤：「躺下」的過去式是 lay，不是 lead／leid；legs 才表示「腿」"
      }
    ],
    "traps": [
      "**單複數陷阱**：leg 與 legs 意思不同，legs 指「雙腿」。會考在翻譯或短文填空時，常把「腿痠痛」誤譯成 one leg。",
      "**one of 陷阱**：one of his legs、two of the books，of 後面的名詞一定要用複數，這是會考必考句型。",
      "**發音陷阱**：複數 -s 在 /ɡ/ 後讀 /z/。聽力題中若聽到 /leɡz/ 就要立刻反應是 legs。",
      "**拼字陷阱**：leg、lay、lie、lead 四個字在字形與發音上都很接近，會考字彙題常故意設計成混淆選項。"
    ],
    "strategy": [
      "背單字時把「單數 — 複數」一起背：leg — legs — legs，寫的時候才不會漏 -s。",
      "造句時固定寫兩次：先寫 Rosa's leg，再寫 Rosa's legs，用對比的方式把複數感記牢。",
      "唸 20 遍 leg / legs，注意舌尖要碰上顎發出 /z/，這是唯一能根治發音錯誤的方法。",
      "把 leg、lie、lay、lead 寫成一列放在筆記本封面，每天看一次，做完會考題目時特別容易回想起來。"
    ]
  },
  "Rosa's legs": {
    "zh": "羅莎的雙腿",
    "ipa": "ˈroʊ.zəz leɡz",
    "intro": "針對您提供的片語 **Rosa's legs**，這是「專有名詞所有格 + 複數名詞」組成的名詞片語，本身不能單獨成句，必須配上動詞才有完整意思。中文「羅莎的雙腿」裡，屬於誰的部分靠「的」表示，數量靠「雙」表示，英文分別用 's 和複數 -s 這兩個記號來處理。最該注意所有格符號只能加一個 s，而且專有名詞一定要大寫。",
    "headline": "'s 只能加一個，專有名詞首字要大寫",
    "structure": [
      {
        "role": "專有名詞",
        "token": "Rosa",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "句子的主角，表示這個人的名字；首字母必須大寫，'s 要緊貼在這個字後面",
        "mark": "O"
      },
      {
        "role": "所有格",
        "token": "'s",
        "pos": "所有格 (Possessive) — 名詞所有格",
        "func": "表示「Rosa 的」，也就是「這個東西屬於 Rosa」；放在名詞後面，不影響後面名詞的單複數",
        "mark": "O"
      },
      {
        "role": "身體部位名詞",
        "token": "legs",
        "pos": "名詞 (Noun) — leg 的複數",
        "func": "表示「兩條腿」；前面已有 all，後面若接動詞要用複數形式（are / got）",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "所有格符號漏加（漏掉 's）",
        "bad": "(X) **Rosa** legs got sore. ／ (X) the **Tom** book",
        "ok": "(O) **Rosa's** legs got sore.",
        "why": "「Rosa 的腿」表示腿屬於 Rosa，英文用名詞所有格「's」來表示，這個符號絕對不能省。學生常以為中文的「的」可以不寫，或以為動作詞已經表示完關係。判斷法：中文出現「誰的什麼」時，中間一定要翻成「's」；如果發現句子少了一個關係，就先檢查所有格。",
        "exOkText": "(O) **Maria's** hands were cold after the climb.",
        "exOkZh": "爬山之後，瑪莉亞的雙手很冷。",
        "exBadText": "(X) **Maria** hands were cold after the climb.",
        "exBadNote": "錯誤：漏加所有格 's，寫成 Maria hands 就不再是「瑪莉亞的手」，必須加 -s。"
      },
      {
        "title": "複數名詞後誤加所有格 s（ Rosa's legs' ）",
        "bad": "(X) Rosa's **legs'** got sore. ／ (X) the **students'** bags",
        "ok": "(O) Rosa's **legs** got sore.",
        "why": "名詞所有格只有一個基本規則：有生命的人或動物，複數時只在 s 之後再加一個撇號（students'），絕對不能在 s 之後再加一個 s（legs'）。legs 本身已經是複數，再加 's 就變成錯誤形式。判斷法：所有格撇號永遠只加一個 s；看到 legs'、books' 要立刻判錯。",
        "exOkText": "(O) The **workers'** gloves were very dirty.",
        "exOkZh": "那些工人的手套很髒。",
        "exBadText": "(X) The **workers's** gloves were very dirty.",
        "exBadNote": "錯誤：workers 已是複數，所有格只能寫 workers'，不能寫 workers's"
      },
      {
        "title": "專有名詞未大寫（rosa's）",
        "bad": "(X) **rosa's** legs got sore. ／ (X) **rosa** went to the top of the mountain",
        "ok": "(O) **Rosa's** legs got sore.",
        "why": "人名、地名、學校名等專有名詞的第一個字母一定要大寫，這是英文的基本大小寫規則，也是會考每題都在檢查的細節。特別注意所有格形式也一樣：寫成 rosa's 或 Rosa'S 都不對，撇號之後的 s 維持小寫。判斷法：寫完人名立刻檢查第一個字母；撇號後面的 s 永遠是小寫。",
        "exOkText": "(O) **Rosa** and **Amy** climbed **Mount** Tai together.",
        "exOkZh": "羅莎和艾美一起爬了玉山。",
        "exBadText": "(X) **rosa** and **amy** climbed **mount** Tai together.",
        "exBadNote": "錯誤：人名 Rosa、Amy 與山名 Mount Tai 的首字母都必須大寫，寫成小寫一律算錯。"
      },
      {
        "title": "所有格與 of 所有格誤用（誤加 of 或漏掉 the）",
        "bad": "(X) Rosa **of** the legs got sore. ／ (X) legs **of Rosa's** got sore",
        "ok": "(O) Rosa's legs got sore. ／ (O) the legs **of Rosa** got sore.",
        "why": "英文表示所有格有兩種方式：日常口語和會考句子最常用「's」；正式文章或名詞太長時可以用「of + the + 名詞」。兩者不能混用，也不能同時出現。判斷法：短名詞（單人、單物）一律用 's；只有句子本身很正式或名詞片語很長時才用 of，而且 of 前面一定要有 the。",
        "exOkText": "(O) **The legs of Rosa** were very sore after the climb.",
        "exOkZh": "爬山之後，羅莎的雙腿非常痠痛。",
        "exBadText": "(X) **Rosa of** the legs were very sore after the climb.",
        "exBadNote": "錯誤：所有格不能寫成 Rosa of；要用 Rosa's 或 the legs of Rosa，且 of 前面要有 the"
      }
    ],
    "traps": [
      "**撇號陷阱**：所有格只用一個撇號加 s。workers'（對）與 workers's（錯）、legs'（錯），是會考常見的選項設計。",
      "**大小寫陷阱**：人名的 's 中，撇號前的字母大寫、s 小寫，寫成 Rosa'S 一定扣分。",
      "**單複數陷阱**：'s 不影響後面名詞的單複數。Rosa's leg 是「一條腿」，Rosa's legs 才是「雙腿」，兩者意思不同。",
      "**of 所有格陷阱**：the legs of Rosa 中 of 前面必須有 the，漏掉 the 就變成 two legs of Rosa，語意完全不同。"
    ],
    "strategy": [
      "寫完名詞片語就做「三檢查」：有沒有 's、's 有沒有加錯位置、專有名詞有沒有大寫。",
      "背一組對照：Tom's book（單數）對比 the boys' books（複數），把撇號的位置一次記清楚。",
      "題目出現所有格時，用鉛筆在名詞下方畫一條線，提醒自己這裡要決定單數還是複數。",
      "把 of 所有格當成「正式寫法」來記，日常寫作和考試一律優先用 's，比較不會出錯。"
    ]
  },
  "sore": {
    "zh": "痠痛的",
    "ipa": "sɔːr",
    "intro": "針對您提供的單字 **sore**，這是一個形容詞，用來描述身體某個部位「痠痛」的狀態，單獨一個詞不能成句，必須放在 be 動詞或 get 動詞後面。中文的「痠痛」在英文裡是形容詞，所以前面一定要有系動詞（are / got / feel）。最該注意的，是不能單獨使用、不能拿來當名詞，以及它的比較級變化方式。",
    "headline": "形容詞要配系動詞，比較級變 sorer／sorest",
    "structure": [
      {
        "role": "身體狀態形容詞",
        "token": "sore",
        "pos": "形容詞 (Adjective)",
        "func": "描述雙腿的狀態「痠痛的」；放在 be 動詞或 get 後面，前面若加 the 就要用 a / the + 單數名詞",
        "mark": "O"
      },
      {
        "role": "詞性功能",
        "token": "sore",
        "pos": "形容詞 (Adjective) — 與系動詞搭配",
        "func": "英文的形容詞不能自己當句子用，前面一定要有 is / are / got / feel 等動詞撐住",
        "mark": "O"
      },
      {
        "role": "發音",
        "token": "sore",
        "pos": "音標 (Phonetics) — /sɔːr/",
        "func": "唸成一個音節，捲舌的長音；不能唸成兩個音節的 so-re",
        "mark": "O"
      },
      {
        "role": "詞形變化",
        "token": "sore — sorer — sorest",
        "pos": "比較級 / 最高級 (Comparative / Superlative)",
        "func": "單音節形容詞直接加 -r / -est；因為結尾是 e，最高級要保留 e 再加 -st",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞漏加系動詞（單獨使用造成殘句）",
        "bad": "(X) Rosa's legs **sore** after the climb. ／ (X) My legs **sore** yesterday.",
        "ok": "(O) Rosa's legs **got sore** after the climb.",
        "why": "sore 是形容詞，負責描述狀態；英文的句子一定要有動詞當骨幹，形容詞不能自己站在主詞後面當動詞用。中文「腿痠痛」省略了「變得」，英文就必須補上 get 或 be。判斷法：寫完主詞和形容詞，如果發現整句沒有動詞，那就是漏了系動詞，馬上補 got / are。",
        "exOkText": "(O) His shoulders **are** sore after carrying the bag.",
        "exOkZh": "背了包包之後，他的肩膀痠痛。",
        "exBadText": "(X) His shoulders sore after carrying the bag.",
        "exBadNote": "錯誤：sore 是形容詞，前面必須有 be 動詞 are，不能自己當動詞用，否則是殘句。"
      },
      {
        "title": "形容詞與名詞混淆（誤加定冠詞當名詞用）",
        "bad": "(X) Rosa has a **sore** in her legs. ／ (X) There is a **sore** on his leg.",
        "ok": "(O) Rosa's legs **are sore** after the climb.",
        "why": "sore 作形容詞時描述部位狀態；中文「有個痠痛處」在英文要用名詞 a sore（一處腫痛）這個完全不同的意思。學生常把形容詞直接加冠詞當名詞用，句子就不合文法。判斷法：sore 前面有 a 或 the 時，它一定是指「一處傷口或腫痛」，跟「整個部位痠痛」的意思要分清楚。",
        "exOkText": "(O) He had a **sore** on his foot after the hike.",
        "exOkZh": "走完那段步道後，他腳上有一處腫痛。",
        "exBadText": "(X) His legs had **sore** after the hike.",
        "exBadNote": "錯誤：legs 是整個部位，要用 are sore；a sore 指的是「一處傷口」"
      },
      {
        "title": "比較級與最高級變化錯誤（more sore / most sore）",
        "bad": "(X) His legs are **more sore** than mine. ／ (X) That is the **most sore** climb.",
        "ok": "(O) His legs are **sorer** than mine.",
        "why": "sore 是單音節形容詞，比較級與最高級直接加 -r 和 -est，不用 more 和 most。因為原形結尾是 e，最高級要保留 e 再加 -st，寫成 sorest。判斷法：短形容詞（≤ 7 個字母、1～2 個音節）一律用 -er / -est；長形容詞才用 more / most。",
        "exOkText": "(O) My legs are **sorest** after mountain climbing.",
        "exOkZh": "爬山之後，我的雙腿最痠痛。",
        "exBadText": "(X) My legs are **most sore** after mountain climbing.",
        "exBadNote": "錯誤：sore 是短形容詞，最高級要用 sorest，不能用 more 或 most 的寫法。"
      },
      {
        "title": "同音字形混淆（soar / saw / sore）",
        "bad": "(X) The birds **soar** in the sky and my legs are **saw**. ／ (X) His legs are **saw**.",
        "ok": "(O) The birds **soar** in the sky and my legs are **sore**.",
        "why": "sore（痠痛）、soar（高飛）、saw（看見，see 的過去式）三個字唸音完全相同，只有拼寫不同。寫作時如果只靠唸音決定拼字，就會全部寫錯。判斷法：唸到 /sɔːr/ 時，先看句子在描述什麼——身體狀態用 sore，鳥在飛用 soar，過去看到用 saw。",
        "exOkText": "(O) I **saw** that the eagle began to **soar**, but my legs stayed **sore**.",
        "exOkZh": "我看到那隻鷹開始飛上天空，但我的雙腿依然痠痛。",
        "exBadText": "(X) I **sore** that the eagle began to **saw**, but my legs stayed **saw**.",
        "exBadNote": "錯誤：看到用 saw、鳥在飛用 soar、身體痠痛用 sore，三者唸音相同但拼寫完全不同。"
      }
    ],
    "traps": [
      "**系詞陷阱**：英文形容詞前一定要有 is / are / was / were / get / feel，直接寫 legs sore 一律判錯。",
      "**比較級陷阱**：短形容詞用 -er / -est（sorer、sorest），不是 more sore / most sore。會考在最高級選擇題很愛考這裡。",
      "**詞性陷阱**：a sore 是「一處腫痛」，are sore 是「整個部位痠痛」，題目翻譯時千萬不要搞混。",
      "**同音字陷阱**：sore、soar、saw 唸音相同，會考字彙題會故意放進同一篇短文裡考辨識能力。"
    ],
    "strategy": [
      "背單字時順便背比較級：sore — sorer — sorest，三個一起寫在筆記本同一列，寫作時就不會猶豫。",
      "自我糾錯：每寫完一句含形容詞的句子，檢查「主詞和形容詞之間有沒有動詞」，沒有就補上。",
      "用手機錄下自己唸 /sɔːr/，確認只唸一個音節且捲舌，發音正確了，聽力題也會跟著對。",
      "把 sore、soar、saw 三個字寫成一行，加上中文註記，每天唸一次，形成字形記憶。"
    ]
  },
  "got sore": {
    "zh": "變酸痛",
    "ipa": "ɡɑːt sɔːr",
    "intro": "針對您提供的片語 **got sore**，這是「動詞 get + 形容詞 sore」組成的系動詞片語，專門用來描述「狀態從某個樣子變成另一個樣子」，本身還不能單獨成句，前面需要主詞。中文的「變痠痛」正好對應這個結構。最該注意的是 get 後面不能加 to、不能疊第二個動詞，以及這裡用過去式的原因。",
    "headline": "get 後直接接形容詞，不能加 to",
    "structure": [
      {
        "role": "系動詞",
        "token": "got",
        "pos": "動詞 (Verb) — get 的過去式",
        "func": "當系動詞用，表示「變成」；後面接形容詞就構成「變得如何」",
        "mark": "O"
      },
      {
        "role": "狀態變化",
        "token": "got + sore",
        "pos": "系動詞片語 (Link Verb Phrase)",
        "func": "表示從正常狀態變成痠痛；如果是現在反覆發生，就用 get；已經完成則用 got",
        "mark": "O"
      },
      {
        "role": "狀態形容詞",
        "token": "sore",
        "pos": "形容詞 (Adjective)",
        "func": "描述變化之後的狀態，必須緊接在 get / got 後面，前面不能再加 be 動詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "get 後誤加 to（把系動詞當一般動詞）",
        "bad": "(X) Rosa's legs **got to be** sore. ／ (X) His legs **got to sore**.",
        "ok": "(O) Rosa's legs **got sore**.",
        "why": "get 當「變得」講的時候是系動詞，後面直接接形容詞或名詞，不加 to。學生看到 get 有一個 to (get to school) 的用法，就誤以為這裡也要加。判斷法：get 後面接形容詞就是系動詞用法，直接貼上去；只有接「地點、目的地」時才用 get to。",
        "exOkText": "(O) After the climb, her hands **got cold**.",
        "exOkZh": "爬完山之後，她的手變得很冷。",
        "exBadText": "(X) After the climb, her hands **got to be cold**.",
        "exBadNote": "錯誤：get 當「變得」用時是系動詞，後面直接接 cold，不能再加 to be 這種句型。"
      },
      {
        "title": "雙動詞疊加（系動詞與一般動詞並用）",
        "bad": "(X) Rosa's legs **got became** sore. ／ (X) His legs **got were** sore.",
        "ok": "(O) Rosa's legs **got sore**.",
        "why": "get 已經是這句的動詞，再加 became 或 were 就變成一個句子裡有兩個動詞，英文的簡單句禁止這種寫法。學生常以為「變得」要寫兩個動詞才完整。判斷法：一個簡單句只能有一個主要動詞；「變得痠痛」只要 get 這一個詞就夠了，後面加形容詞即結束。",
        "exOkText": "(O) His feet **got wet** during the rain.",
        "exOkZh": "下雨的時候，他的腳濕了。",
        "exBadText": "(X) His feet **got were** wet during the rain.",
        "exBadNote": "錯誤：got 已經是這句的動詞，後面不能再加 were，否則一個句子出現兩個動詞。"
      },
      {
        "title": "時態誤用（未標示完成的變化用原形或進行式）",
        "bad": "(X) Rosa's legs **are sore** after four hours of climbing. ／ (X) Rosa's legs **get sore** after four hours of climbing.",
        "ok": "(O) Rosa's legs **got sore** after four hours of climbing.",
        "why": "這句在敘述一個已經發生、已經完成的變化過程，所以用過去式 got。如果寫成 are sore，表示「現在正在痠痛」；寫成 get sore，則是表示「每次爬山都會痠」的一般事實。判斷法：敘述句講「某一次發生的事」用 got；講「always、usually、every time」才用 get。",
        "exOkText": "(O) Her legs **got tired** after the long walk.",
        "exOkZh": "走了很久之後，她的雙腿累了。",
        "exBadText": "(X) Her legs **are tired** after the long walk.",
        "exBadNote": "錯誤：動作已經完成，變化要用過去式 got，不能用現在式 are 或進行式 getting。"
      },
      {
        "title": "get 的詞義誤用（「得到」義誤當「變得」義）",
        "bad": "(X) I **got sore** yesterday. ／ (X) She got sore in her legs.",
        "ok": "(O) I **felt sore** yesterday.",
        "why": "get 也有「得到、拿到」的意思（get a gift），這個義項後面接的是具體的名詞。當主詞是人而不是身體部位時，get 後面不能直接接形容詞表達身體感覺。判斷法：腿、眼睛、手「變得痠痛」才用 get sore；人自己「覺得痠痛」要用 feel sore 或 be sore。",
        "exOkText": "(O) He **felt sore** all over after the game.",
        "exOkZh": "比賽完之後，他全身都覺得痠痛。",
        "exBadText": "(X) He **got sore** all over after the game.",
        "exBadNote": "錯誤：主詞是人時，get 後面不能接形容詞，要用 feel sore 或 be sore"
      }
    ],
    "traps": [
      "**to 的陷阱**：get to school（到達某地）vs. get sick（變得生病）。後面接形容詞時絕對不加 to。",
      "**系動詞疊加陷阱**：get 後面只能接一個形容詞或名詞，再加一個動詞就是雙動詞錯，會考選項常這樣設。",
      "**時態陷阱**：已完成用 got，習慣性用 get。題幹若有 after four hours、yesterday，幾乎一定選 got。",
      "**主詞陷阱**：legs 這類身體部位作主詞時可用 get sore；人作主詞時要用 feel sore，兩者不能互換。"
    ],
    "strategy": [
      "把 get 的三種用法分開背：get to + 地點、get + 名詞（得到）、get + 形容词（變得），分三欄寫在筆記本上。",
      "寫題時先圈出形容詞，確認前面要配的是 get 還是 be，再決定要不要加 to。",
      "遇到 a / the / 所有格的名詞當主詞，立刻套用 get + 形容詞 這個句型。",
      "每天唸三遍 got sore / get sick / get cold，把「動詞 + 形容詞」這個節奏練成口語習慣。"
    ]
  },
  "Rosa's legs got sore": {
    "zh": "羅莎的腿變酸痛了",
    "ipa": "ˈroʊ.zəz leɡz ɡɑːt sɔːr",
    "intro": "針對您提供的英文句子 **Rosa's legs got sore**，這是一個結構完整的簡單句，語意與文法都正確。它由「主詞 + 系動詞 + 形容詞」三個部分組成，是國中會考最常見的狀態句型。最該注意三件事：主詞 legs 是複數、系動詞要用 get（表示變化）而不是 be、以及形容詞必須原封不動地接在後面。",
    "headline": "複數主詞 + get 表變化 + 形容詞收尾",
    "structure": [
      {
        "role": "主詞（所有格）",
        "token": "Rosa's",
        "pos": "專有名詞所有格 (Proper Noun Possessive)",
        "func": "限定後面的 legs，表示「這些腿屬於 Rosa」；首字母大寫",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "legs",
        "pos": "名詞 (Noun) — leg 的複數",
        "func": "整句的主語，因為是複數所以後面的動詞要用複數或 get／are 這類不分單複數的形式",
        "mark": "O"
      },
      {
        "role": "系動詞",
        "token": "got",
        "pos": "動詞 (Verb) — get 的過去式",
        "func": "當系動詞用，表示狀態「由好變壞」的變化；已完成所以用過去式，後面不再加 be 動詞",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "sore",
        "pos": "形容詞 (Adjective)",
        "func": "描述變化後的狀態「痠痛的」，緊接在系動詞後面，句子到此結束",
        "mark": "O"
      },
      {
        "role": "隱含時間狀語",
        "token": "（After four hours of mountain climbing）",
        "pos": "省略的時間狀語",
        "func": "雖然沒有寫在句中，但 After four hours of mountain climbing 隱含「過去」，所以動詞用 got 而不是 get",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞複數與動詞不一致（誤用第三人稱單數）",
        "bad": "(X) Rosa's legs **has got** sore. ／ (X) Rosa's legs **have sore**.",
        "ok": "(O) Rosa's legs **got** sore.",
        "why": "legs 是複數名詞，作主詞時後面的動詞不能按單數處理，has 這種第三人稱單數形式絕對不能用。學生常以為 legs 只是一個「身體部位名稱」，就順手加了 has。判斷法：把主詞單獨圈起來，看它是單數還是複數；legs、hands、feet 都是複數，動詞直接用 got / are 就對了。",
        "exOkText": "(O) His **feet** got cold during the hike.",
        "exOkZh": "走那段山路時，他的腳變得很冷。",
        "exBadText": "(X) His **feet has** got cold during the hike.",
        "exBadNote": "錯誤：feet 是複數主詞，後面不能搭配第三人稱單數 has，要把動詞也改成複數。"
      },
      {
        "title": "形容詞誤換成名詞（soreness）",
        "bad": "(X) Rosa's legs got **soreness**. ／ (X) His legs got **sore**-ness after the run.",
        "ok": "(O) Rosa's legs got **sore**.",
        "why": "sore 是形容詞，專門放在系動詞後面描述狀態；soreness 是名詞，必須放在 the、a、my 之類的詞後面。兩者位置完全相反，替換之後句子就不合文法。判斷法：名詞前面要有冠詞或限定詞，形容詞前面則接在系動詞後面；看到複數名詞 legs 就知道後面要的是形容詞。",
        "exOkText": "(O) She felt **sore** in her shoulders.",
        "exOkZh": "她覺得肩膀痠痛。",
        "exBadText": "(X) She felt **soreness** in her shoulders.",
        "exBadNote": "錯誤：soreness 是名詞，要用 a soreness 或 the soreness；描述狀態用形容詞 sore"
      },
      {
        "title": "時態誤用（忽略時間背景而用現在式或未來式）",
        "bad": "(X) Rosa's legs **are sore** after four hours of mountain climbing. ／ (X) Rosa's legs **will get sore** after four hours of climbing.",
        "ok": "(O) Rosa's legs **got sore** after four hours of mountain climbing.",
        "why": "After four hours of mountain climbing 描述的是已經結束的一段經歷，這個時間背景隱含過去，所以動詞要用 got。寫成 are sore 變成「現在正在痠」，寫成 will get sore 變成「將來會痠」。判斷法：題目只要出現 After…、Yesterday、last week、兩天前，動詞一律用過去式。",
        "exOkText": "(O) After four hours of **climbing**, his legs **felt** tired.",
        "exOkZh": "爬了四個小時的山之後，他的雙腿覺得很累。",
        "exBadText": "(X) After four hours of **climbing**, his legs **are** tired.",
        "exBadNote": "錯誤：時間背景是已經發生的過去，應用過去式 felt 或 got，不能用現在式 are。"
      },
      {
        "title": "漏掉系動詞造成殘句（形容詞直接接在主詞後）",
        "bad": "(X) Rosa's legs **sore** after the climb. ／ (X) Rosa's legs sore last night.",
        "ok": "(O) Rosa's legs **got sore** after the climb.",
        "why": "英文句子一定要有動詞，sore 是形容詞不能自己擔任動詞，這樣寫出來的句子是殘缺的，主詞和表語之間少了連結。中文「腿變痠痛」的「變得」在英文就是 got。判斷法：寫完主詞加形容詞，回頭檢查中間是否有一個動詞；沒有就補上 got、are 或 felt。",
        "exOkText": "(O) The **climbers** were **exhausted** after the long trip.",
        "exOkZh": "長途旅行之後，那些登山者筋疲力盡。",
        "exBadText": "(X) The **climbers** exhausted after the long trip.",
        "exBadNote": "錯誤：exhausted 是形容詞，前面必須有 be 動詞 were，不能自己當動詞用。"
      }
    ],
    "traps": [
      "**主謂一致陷阱**：legs 是複數，has 一定判錯。會考選項常放 Rosa's leg has 與 Rosa's legs have 讓你選。",
      "**系動詞選擇陷阱**：強調「變化過程」用 get，只描述「當下狀態」用 be。題目若說 became、after climbing，選 get。",
      "**時態陷阱**：After + 過去發生的活動，後面一定用過去式；寫成 are 或 will get 都錯。",
      "**詞性陷阱**：sore（形容詞）與 soreness（名詞）位置相反，會考翻譯題會故意用這組字設陷阱。"
    ],
    "strategy": [
      "拆句練習：看到任何句子先切三塊「主詞 / 動詞 / 表語」，再檢查每一塊的詞性是否正確。",
      "寫完題目後主動問自己三個問題：主詞是單數還是複數？動詞對不對時態？表語的詞性對不對？",
      "把 be 動詞句與 get 動詞句並排抄寫比較，久了就會對「狀態」和「變化」的分界有感覺。",
      "翻譯題先畫箭頭標出中文的「變得／是／很」，再對應成 got／is／are，錯誤率會大幅下降。"
    ]
  },
  "rest": {
    "zh": "休息",
    "ipa": "rest",
    "intro": "針對您提供的單字 **rest**，這是一個多詞性的單字：作名詞時可以表示「休息」，也可以表示「其餘的、剩下的部分」；作動詞時表示「休息、停下來」。單獨一個詞不能成句，必須放進句子裡。最該注意的是兩個意思的差異，以及它在做「休息」這個意思時是可數名詞，要加 a。",
    "headline": "一詞兩義：休息 a rest／其餘 the rest of",
    "structure": [
      {
        "role": "名詞（義一）",
        "token": "rest（a rest）",
        "pos": "名詞 (Noun) — 可數",
        "func": "表示「一次休息」；前面要加 a、the 或所有格，例如 took a rest",
        "mark": "O"
      },
      {
        "role": "名詞（義二）",
        "token": "rest（the rest of）",
        "pos": "名詞 (Noun) — 不可數",
        "func": "表示「其餘的、剩下的部分」；前面一定要加 the，後面要接 of + 名詞",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "rest",
        "pos": "動詞 (Verb)",
        "func": "表示人或動物「停下來休息」；過去式 rested，進行式 resting",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "一詞兩義混淆（the rest of 與 a rest 混用）",
        "bad": "(X) The **rest** students are here. ／ (X) Please take a rest of you.",
        "ok": "(O) The **rest of** the students are here.",
        "why": "rest 表示「其餘的時候」前面必須是 the，而且後面一定要接 of + 名詞；表示「休息」則用 a / the rest，後面不能接 of。學生常因為中文「其餘同學」四個字裡都有「其餘」就選了 rest，忘了加 of。判斷法：看到「其餘、剩下的」就寫 the rest of + 名詞；看到「休息片刻」就寫 a rest。",
        "exOkText": "(O) **The rest of** the apples are in the box.",
        "exOkZh": "剩下的蘋果都在盒子裡。",
        "exBadText": "(X) **The rest** apples are in the box.",
        "exBadNote": "錯誤：表示「其餘的」時必須寫 the rest of the apples，不能漏掉 of"
      },
      {
        "title": "可數與不可數混淆（誤加冠詞與複數 -s）",
        "bad": "(X) He took a **rests** after the climb. ／ (X) We had many **a rest** today.",
        "ok": "(O) He took a **rest** after the climb.",
        "why": "表示「休息」這個動作次數時，rest 是可數名詞，但一次休息要用單數 a rest；有三次才寫 three rests。中文「休息」沒有單複數的分別，英文卻一定要分清楚。判斷法：前面有 a、one、two、three 之類的數字或冠詞時，rest 一定要跟著變單數或複數。",
        "exOkText": "(O) The climbers took three **rests** on the way up.",
        "exOkZh": "登山的人在上山的路上休息了三次。",
        "exBadText": "(X) The climbers took three **rest** on the way up.",
        "exBadNote": "錯誤：three 大於一，rest 是可數名詞，必須用複數 rests 才能表示三次。"
      },
      {
        "title": "與相近字形詞義混淆（rest / restaurant）",
        "bad": "(X) We ate dinner at a **rest** near the mountain. ／ (X) The **rest** was delicious.",
        "ok": "(O) We ate dinner at a **restaurant** near the mountain.",
        "why": "rest 是「休息、其餘」，跟吃飯毫無關係；restaurant 才是「餐廳」。兩者字形很像，學生在會考字彙題或翻譯題裡常誤選。判斷法：跟食物、菜單、點餐有關的一定是 restaurant；跟停下來、恢復體力有關的才是 rest。",
        "exOkText": "(O) After a long **rest**, we ate at a **restaurant**.",
        "exOkZh": "好好休息了一下之後，我們去一家餐廳吃飯。",
        "exBadText": "(X) After a long **restaurant**, we ate at a **rest**.",
        "exBadNote": "錯誤：restaurant 是餐廳，rest 是休息、其餘，兩個字的意思完全不同不能混用。"
      },
      {
        "title": "詞形轉換錯誤（把動詞 rest 當形容詞用）",
        "bad": "(X) I feel **rest** today. ／ (X) She looked **rest** after the trip.",
        "ok": "(O) I feel **rested** today.",
        "why": "rest 作動詞是「休息」，不能直接放在 feel、look 後面當狀態描述；要描述「休息過的、恢復的」必須用形容詞 rested。學生常以為加了 -ed 就是過去式，所以隨手寫成 rest。判斷法：感覺動詞（feel、look、seem）後面接的是形容詞，動詞一定要變成 -ed 形式。",
        "exOkText": "(O) He looked **rested** after a short nap.",
        "exOkZh": "小睡一下之後，他看起來精神飽滿。",
        "exBadText": "(X) He looked **rest** after a short nap.",
        "exBadNote": "錯誤：looked 後面要接形容詞 rested，rest 是動詞不能直接放在後面"
      }
    ],
    "traps": [
      "**一詞兩義陷阱**：會考翻譯常把「其餘的」和「休息」放進同一句考你，the rest of 與 a rest 的差別是本單字最核心的考點。",
      "**冠詞陷阱**：the rest（其餘）一定要加 the，a rest（休息）一定要加 a，寫錯冠詞整個語意就變了。",
      "**字形陷阱**：rest 與 restaurant 拼寫相近，會考字彙題會放在一起考，看上下文才能選出正確答案。",
      "**詞性陷阱**：rested 是形容詞、resting 是現在分詞、rested（過去式）也是同一個拼法，要靠句子位置判斷詞性。"
    ],
    "strategy": [
      "把 rest 抄成三欄：a rest（休息）、the rest of（其餘）、rest（動詞），每欄各配一個例句。",
      "做翻譯題時先圈中文的「其餘」，有這兩個字就立刻寫 the rest of，不要猶豫。",
      "記住 can 的用法：We can rest here. 這是動詞用法；We can have a rest. 這是名詞用法，兩種都收錄。",
      "把 rest、restaurant、restful 寫成一列，每天唸一次並各造一句，聽力與字彙題都會變簡單。"
    ]
  },
  "a rest": {
    "zh": "休息片刻",
    "ipa": "ə rest",
    "intro": "針對您提供的片語 **a rest**，這是「不定冠詞 a + 名詞 rest」組成的名詞片語，本身不能單獨成句，必須放在動詞後面當受詞。中文的「休息片刻」暗示這是一次短暫的停下，所以英文用單數並加上冠詞 a。最該注意的是 a 的使用時機、a 與 an 的選擇，以及 rest 兩個意思在冠詞上的不同。",
    "headline": "單數可數才用 a，a rest 不能接 of",
    "structure": [
      {
        "role": "不定冠詞",
        "token": "a",
        "pos": "冠詞 (Article) — 不定冠詞",
        "func": "放在單數可數名詞前，表示「一次」；rest 以 /r/ 開頭是子音，所以用 a 不用 an",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "rest",
        "pos": "名詞 (Noun) — 可數",
        "func": "表示「一次休息」；作受詞時前面的動詞常見 take、have、get",
        "mark": "O"
      },
      {
        "role": "片語功能",
        "token": "a rest",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整組當受詞使用，通常放在 took / had / took 這類動詞後面",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "漏加不定冠詞 a",
        "bad": "(X) He took **rest** after the climb. ／ (X) Let's have **rest** for a while.",
        "ok": "(O) He took **a rest** after the climb.",
        "why": "rest 在「休息」這個義項是可數名詞，前面必須有冠詞 a 才表示「一次休息」。中文「休息」不帶量詞，學生就容易整個冠詞省略。判斷法：只要名詞前面沒有 the、my、this、one 這類限定詞，單數可數名詞就一定要自己加 a。",
        "exOkText": "(O) The climbers had **a rest** under the tree.",
        "exOkZh": "登山的人們在樹下休息了一下。",
        "exBadText": "(X) The climbers had **rest** under the tree.",
        "exBadNote": "錯誤：單數可數名詞 rest 前必須加冠詞 a，寫成 had rest 是不合文法的"
      },
      {
        "title": "a 與 an 選擇錯誤（誤用 an）",
        "bad": "(X) He took **an** rest for ten minutes. ／ (X) She needed **an** rest badly.",
        "ok": "(O) He took **a** rest for ten minutes.",
        "why": "a / an 的選擇要看後面單字的「發音」而不是字母。rest 的第一個音是 /r/，屬於子音，所以前面一律用 a；只有母音開頭的音（an hour、an apple）才用 an。學生常靠字母而不是唸音來決定。判斷法：唸出這個單字的第一個音，是母音才用 an，其餘一律用 a。",
        "exOkText": "(O) We took **a** short rest after the game.",
        "exOkZh": "比賽之後，我們稍微休息了一下。",
        "exBadText": "(X) We took **an** short rest after the game.",
        "exBadNote": "錯誤：rest 唸起來是 /r/ 開頭的子音，冠詞必須用 a，不能用 an；判斷要看發音不看字母。"
      },
      {
        "title": "「其餘」義誤用（a rest of 的冠詞錯誤）",
        "bad": "(X) A rest of the water was cold. ／ (X) A rest of the students left early.",
        "ok": "(O) **The rest of** the water was cold.",
        "why": "表示「其餘的、剩下的部分」時，rest 是不可數的整體，前面一定要用 the，後面一定要接 of + 名詞；a rest 是「一次休息」，兩者完全不能互換。學生常因中文「剩下的水」隨手用了 a。判斷法：of 這個字一出現，前面就必須是 the rest of，這個句型要背成一個整塊。",
        "exOkText": "(O) **The rest of** the team practiced until night.",
        "exOkZh": "隊裡的其他人練習到晚上。",
        "exBadText": "(X) **A rest of** the team practiced until night.",
        "exBadNote": "錯誤：表示「其餘的」必須寫成 the rest of，不能用 a rest of，兩者語意不同。"
      },
      {
        "title": "冠詞與數量修飾語搭配錯誤（a rest of two hours）",
        "bad": "(X) He took a rest **of** two hours. ／ (X) She had a rest **in** ten minutes.",
        "ok": "(O) He took a rest **for** two hours.",
        "why": "表示「休息了多久」要用 for + 時間段；of 後面接的是「事物的歸屬」，兩者用法完全不同。學生常因中文「兩小時的休息」而直譯成 a rest of two hours。判斷法：修飾「時間長度」用 for，修飾「事物的組成」用 of。",
        "exOkText": "(O) The runners took a rest **for** half an hour.",
        "exOkZh": "跑者們休息了半個小時。",
        "exBadText": "(X) The runners took a rest **of** half an hour.",
        "exBadNote": "錯誤：修飾時間長度要用 for；of 後面接的是「……的」，不能放時間段在後面。"
      }
    ],
    "traps": [
      "**冠詞省略陷阱**：會考翻譯「休息片刻」時，中文沒有冠詞，但英文一定要寫 a rest，漏掉直接扣分。",
      "**a / an 陷阱**：判斷依據是發音不是字母。rest 唸 /r/，固定用 a；an hour 才用 an。",
      "**the rest of 陷阱**：這個片語是鐵律搭配，前面必須 the，後面必須 of，錯一個字語意就全變。",
      "**for / of 陷阱**：a rest for two hours（休息兩小時）與 the rest of the class（班上其餘的人）字形相似，考試常刻意混淆。"
    ],
    "strategy": [
      "寫完受詞先檢查前面有沒有冠詞或限定詞，沒有就補 a。",
      "把 a rest、the rest of、a rest for 三個片語寫成一列，各造一句，分開記憶就不會混。",
      "唸 a rest / an hour / a big apple，練的是母音與子音的耳朵，這比背規則有效。",
      "遇到中文「其餘、剩下的」四個字，立刻在腦中浮現 the rest of，這是最省時間的觸發點。"
    ]
  },
  "took a rest": {
    "zh": "休息了一下",
    "ipa": "tʊk ə rest",
    "intro": "針對您提供的片語 **took a rest**，這是「動詞 take 的過去式 + a rest」組成的動詞片語，本身還不能單獨成句，前面需要主詞。中文的「休息了一下」表示一個已經完成的短暫動作，所以動詞要用過去式。最該注意的是 take 的不規則變化、這個固定搭配不能加 to，以及期間長短要用 for。",
    "headline": "take 過去式是 took，期間長度用 for",
    "structure": [
      {
        "role": "動詞",
        "token": "took",
        "pos": "動詞 (Verb) — take 的過去式（不規則變化）",
        "func": "表示「休息了」這個已完成的動作；take 在此是固定搭配 take a rest 的動詞",
        "mark": "O"
      },
      {
        "role": "不定冠詞",
        "token": "a",
        "pos": "冠詞 (Article) — 不定冠詞",
        "func": "把 rest 變成可數的「一次休息」，放在動詞後面當受詞的一部分",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "rest",
        "pos": "名詞 (Noun) — 可數",
        "func": "受詞，表示休息這個行為；a rest 是固定搭配，中間不能插入其他字",
        "mark": "O"
      },
      {
        "role": "搭配",
        "token": "took a rest",
        "pos": "動詞片語 (Verb Phrase)",
        "func": "整組當句子的動詞部分，後面可接 for + 時間段或 at + 地點",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "不規則動詞過去式變化錯誤（tok / taked / tooked）",
        "bad": "(X) He **tok** a rest. ／ (X) She **taked** a rest after school.",
        "ok": "(O) He **took** a rest.",
        "why": "take 是不規則動詞，過去式是 took、過去分詞是 taken，絕對不能加 -ed 變成 taked，也不能只寫一半的 tok。學生常以為只要在 take 後面加 d 就好。判斷法：take、come、give、make 這類常見不規則動詞要整組背成三態：take - took - taken。",
        "exOkText": "(O) She **took** a rest because she was tired.",
        "exOkZh": "因為累了，她休息了一下。",
        "exBadText": "(X) She **taked** a rest because she was tired.",
        "exBadNote": "錯誤：take 是不規則動詞，過去式是 took，不能加 -ed 寫成 taked 或 tok。"
      },
      {
        "title": "固定搭配誤加 to（或誤改為其他動詞）",
        "bad": "(X) He **took to** a rest. ／ (X) She **took to rest** for an hour.",
        "ok": "(O) He **took** a rest.",
        "why": "take a rest 是固定搭配，a rest 是不可拆開的整體，動詞與受詞之間不能插入 to 或其他字。學生看到 take 有「花費時間在某活動上」的用法（take two hours），就誤以為這裡也要加 to。判斷法：看到 a rest 就把它當成一個名詞塊，前面的動詞固定用 take 或 have。",
        "exOkText": "(O) The players **took** a short rest after the first half.",
        "exOkZh": "球隊在上半場結束後短暫休息了一下。",
        "exBadText": "(X) The players **took to** a short rest after the first half.",
        "exBadNote": "錯誤：take a rest 是固定搭配，動詞與受詞之間不能加 to，否則就不是這個用法。"
      },
      {
        "title": "期間長短的介系詞誤用（漏掉 for）",
        "bad": "(X) He took a rest **two hours**. ／ (X) She took a rest **in** ten minutes.",
        "ok": "(O) He took a rest **for two hours**.",
        "why": "表示持續多久要用 for + 時間段；in + 數字表示「在幾點鐘之內」或「過多久之後會發生」，兩者語意不同。中文「休息兩小時」沒有介詞，英文卻一定要加。判斷法：只要看到「休息／行走了多長的時間」，前面就填 for。",
        "exOkText": "(O) The hikers **rested** for twenty minutes at the top.",
        "exOkZh": "登山者們在山頂休息了二十分鐘。",
        "exBadText": "(X) The hikers **rested** twenty minutes at the top.",
        "exBadNote": "錯誤：表示持續的時間長度必須用 for，不可直接放數字，也不能用 in，兩者語意不同。"
      },
      {
        "title": "完成式誤用（過去分詞 taken 與過去式混淆）",
        "bad": "(X) She has **took** a rest already. ／ (X) He has **take** a rest before the game.",
        "ok": "(O) She has **taken** a rest already.",
        "why": "have / has 後面要接過去分詞，take 的過去分詞是 taken，不是過去式 took。學生常把過去式和過去分詞混用，於是寫出 has took。判斷法：看到 has / have / had，後面立刻換成 -t 的過去分詞（take-taken、go-gone、write-written）。",
        "exOkText": "(O) The climbers have **taken** a short rest already.",
        "exOkZh": "登山的人們已經休息過一下了。",
        "exBadText": "(X) The climbers have **toke** a short rest already.",
        "exBadNote": "錯誤：has 後面要接過去分詞 taken，過去式 took 不能用在完成式中，這是最常見的混淆。"
      }
    ],
    "traps": [
      "**不規則動詞陷阱**：take - took - taken 三態必背。會考在填空與改錯題常把 tok、taked、toke 當成誘餌選項。",
      "**固定搭配陷阱**：take a rest / have a rest 中間不能加 to，也不能拆開，這是口語固定說法。",
      "**for / in 陷阱**：for two hours（持續兩小時）與 in two hours（兩小時之後）意思完全不同，看題目要選對。",
      "**完成式陷阱**：has taken 與 took 在同一個句子裡角色不同，看到 have / has 就一定要想 past participle。"
    ],
    "strategy": [
      "把 take - took - taken 寫成三欄，每天唸一次，寫作時自然就不會變成 taked。",
      "遇到 a rest 就固定寫 take 或 have，不要另外發明動詞。",
      "看到中文「多久、幾小時」立刻在草稿上寫 for，再填數字。",
      "把 take a rest 與 take a photo、take a bus 三句放在一起背，整組 take 的搭配會記得更牢。"
    ]
  },
  "mountain": {
    "zh": "山",
    "ipa": "ˈmaʊn.tən",
    "intro": "針對您提供的單字 **mountain**，這是一個單數可數名詞，指一座山，單獨一個詞不能成句，必須放進句子裡。中文的「山」是類名稱呼，所以英文可以不加冠詞；但一旦特指某一座山，就要加 the。最該注意的是複數拼字、字尾 -tain 的唸法，以及它和形容詞 mountainous 的差別。",
    "headline": "可數名詞複數加 s，-tain 唸 /tɪn/",
    "structure": [
      {
        "role": "地理名詞",
        "token": "mountain",
        "pos": "名詞 (Noun) — 單數可數",
        "func": "指一座山；前面依語境加 a、the 或不加（泛指山這種地形）",
        "mark": "O"
      },
      {
        "role": "構詞變化",
        "token": "mountain → mountains",
        "pos": "構詞 (Morphology) — 規則複數",
        "func": "可數名詞複數直接加 -s，讀成 /-tɪnz/",
        "mark": "O"
      },
      {
        "role": "發音",
        "token": "mountain",
        "pos": "音標 (Phonetics) — /ˈmaʊn.tɪn/",
        "func": "字尾 -tain 唸 /tɪn/，跟 contain、certain 一樣，不唸 /teɪn/",
        "mark": "O"
      },
      {
        "role": "相關詞",
        "token": "mountainous",
        "pos": "形容詞 (Adjective)",
        "func": "描述「多山的」地區，用來修飾名詞，不能替代 mountain 當名詞使用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "可數名詞複數漏加 -s",
        "bad": "(X) They climbed two **mountain**. ／ (X) There are many **mountain** in Taiwan.",
        "ok": "(O) They climbed two **mountains**.",
        "why": "mountain 是可數名詞，中文「兩座山」「很多山」在英文一定要用複數 mountains。學生常因中文「山」沒有複數形式而直接沿用單數。判斷法：數字或 many、a lot of、several 這些詞後面，只要是可數名詞就一定要加 -s。",
        "exOkText": "(O) The **mountains** in northern Taiwan are very tall.",
        "exOkZh": "台灣北部的山非常高大。",
        "exBadText": "(X) The **mountain** in northern Taiwan are very tall.",
        "exBadNote": "錯誤：前面的 the mountains 是複數，mountain 必須加 -s，而且主詞是複數，動詞也要改成 are"
      },
      {
        "title": "字尾 -tain 發音錯誤（唸成 /teɪn/）",
        "bad": "(X) mountain 唸成 /ˈmaʊn.teɪn/ ／ (X) 爬山活動寫成 moun-tain 時 t 唸成 t-e-i",
        "ok": "(O) mountain 唸成 /ˈmaʊn.tɪn/",
        "why": "字尾 -tain 裡的 ai 不唸字母名稱，而是一個單獨的短音 /ɪ/，跟 contain、certain、paint 完全一樣。學生常受中文諧音或字母名稱影響，唸成 /teɪn/，聽力時就完全聽不出來。判斷法：把 -tain 單獨唸一次，確認是「提」而不是「泰」，再放回單字裡。",
        "exOkText": "(O) We climbed the **mountain** /ˈmaʊn.tɪn/ yesterday.",
        "exOkZh": "我們昨天爬了 mountain 這座山。",
        "exBadText": "(X) We climbed the **mountain** /ˈmaʊn.teɪn/ yesterday.",
        "exBadNote": "錯誤：-tain 要唸成 /tɪn/，不能唸成 /teɪn/，跟 contain、certain 一樣。"
      },
      {
        "title": "拼字錯誤（字尾字母顛倒或漏字）",
        "bad": "(X) **Mountan** ／ (X) **Mountian** ／ (X) **Moutain**",
        "ok": "(O) **Mountain**",
        "why": "mountain 的拼字是 moun-tain，字母順序固定，學生很容易把 n 和 i 顛倒寫成 mountian，或漏掉 n。判斷法：先寫 moun，再寫 tain，中間不要猶豫；寫完默唸一次就會立刻發現錯誤。",
        "exOkText": "(O) **Mountain** climbing is a good way to stay healthy.",
        "exOkZh": "爬山是保持健康的好方法。",
        "exBadText": "(X) **Mountian** climbing is a good way to stay healthy.",
        "exBadNote": "錯誤：字母順序錯誤，應寫成 Mountain，不能寫成 Mountian 或 Moutain。"
      },
      {
        "title": "詞性與詞形誤用（形容詞 mountainous 用錯）",
        "bad": "(X) Taiwan is very **mountain**. ／ (X) The **mountain** region is beautiful.",
        "ok": "(O) Taiwan is very **mountainous**.",
        "why": "mountain 是名詞，不能直接用來修飾動詞或另一個名詞；要描述「多山的」必須用形容詞 mountainous。學生常以為「很山」可以用原形。判斷法：看到「很⋯⋯」或「一個地方很⋯⋯」這類修飾結構，馬上檢查是不是需要 -ous、-ful 這類形容詞詞尾。",
        "exOkText": "(O) Hualien is famous for its **mountainous** scenery.",
        "exOkZh": "花蓮以山區景色聞名。",
        "exBadText": "(X) Hualien is famous for its **mountain** scenery.",
        "exBadNote": "錯誤：mountain 是名詞，修飾 scenery 要用形容詞 mountainous"
      }
    ],
    "traps": [
      "**複數陷阱**：會考翻譯「許多山」時，中文沒有複數，英文一定要寫 many mountains，漏 -s 直接扣分。",
      "**發音陷阱**：-tain 唸 /tɪn/。聽力題讀出 /ˈmaʊn.tɪn/ 時，學生常常寫成 mountane 或想不起來。",
      "**冠詞陷阱**：特指某一座山要加 the（the mountain we climbed），泛指山這種地形則不加。",
      "**詞性陷阱**：mountainous 才是形容詞，會考字彙題會把 mountain 與 mountainous 當成兩個選項放在一起。"
    ],
    "strategy": [
      "寫單字時順便寫三遍：mountain、mountains、mountainous，三個詞形一起記。",
      "唸 20 遍 mountain，重點練習 -tain 的 /ɪ/ 音，這是最容易出錯的地方。",
      "看到 many、a lot of、two、three，馬上檢查後面的名詞有沒有加 -s。",
      "整理「山」的相關片語：mountain climbing、at the top of the mountain、the foot of the mountain，整組一起背最有效率。"
    ]
  },
  "the mountain": {
    "zh": "這座山",
    "ipa": "ðə ˈmaʊn.tən",
    "intro": "針對您提供的片語 **the mountain**，這是「定冠詞 the + 單數可數名詞 mountain」組成的名詞片語，意思是「這座山、那一座山」，本身不能單獨成句。中文的「這座山」帶有指示意味，所以英文一定要用 the。最該注意的是 the 不能漏、不能亂加，以及後面若要重複提到這座山，應該用代名詞而不是再寫一次 the mountain。",
    "headline": "特指要加 the，重複提及改用代名詞",
    "structure": [
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "表示特指，說明是說話者心中已知的「那一座山」；放在單數可數名詞前",
        "mark": "O"
      },
      {
        "role": "地理名詞",
        "token": "mountain",
        "pos": "名詞 (Noun) — 單數可數",
        "func": "指一座山；單獨出現時通常不加冠詞，特指時才加 the",
        "mark": "O"
      },
      {
        "role": "片語功能",
        "token": "the mountain",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整組可當主詞或受詞；作主詞時後面動詞用單數，因為 mountain 是單數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "漏加定冠詞 the（特指情境）",
        "bad": "(X) We climbed **mountain** all day. ／ (X) **Mountain** was very steep.",
        "ok": "(O) We climbed **the mountain** all day.",
        "why": "the 是定冠詞，用來表示特指，也就是「特定的那一座山」。中文的「這座山」「那座山」本身就帶有指示意味，英文就一定要有 the；泛指山這種地形才不加。判斷法：中文有「這、那、某一座」就加 the；泛指地形不加。",
        "exOkText": "(O) The view from **the mountain** was amazing.",
        "exOkZh": "從這座山看出去的景色非常壯觀。",
        "exBadText": "(X) The view from **mountain** was amazing.",
        "exBadNote": "錯誤：特指某一座山要加 the，寫成 from mountain 表示「從山上」泛指"
      },
      {
        "title": "定冠詞位置錯誤（放在名詞之後）",
        "bad": "(X) We climbed **mountain the** last Sunday. ／ (X) **Mountain the** is very high.",
        "ok": "(O) We climbed **the mountain** last Sunday.",
        "why": "the 是冠詞，一定放在名詞前面，絕對不能寫在名詞後面。學生受中文「山這一座」或舊式英文說法的影響，偶爾會把 the 放到名詞後面，讀起來雖然還猜得懂，卻不是標準英文。判斷法：英文的修飾詞一律前置，冠詞、形容詞、數詞、名詞所有格全部都排在名詞前面，寫完立刻檢查一次位置。",
        "exOkText": "(O) **The mountain** is covered with clouds today.",
        "exOkZh": "今天這座山被雲霧籠罩著。",
        "exBadText": "(X) **Mountain the** is covered with clouds today.",
        "exBadNote": "錯誤：冠詞 the 必須放在名詞前面，不能寫成 mountain the，位置放錯就不合文法。"
      },
      {
        "title": "冠詞與泛指、複數的界線未分清",
        "bad": "(X) Mountain climbing is his hobby. ／ (X) The mountains is covered with snow.",
        "ok": "(O) **Mountain** climbing is his hobby.",
        "why": "mountain climbing 是一個複合名詞，climbing 是動名詞，整個片語前面不加 the；而 the mountains 複數作主詞時，動詞必須用複數 is 錯、are 對。學生常把「群山」和「一座山」混在一起。判斷法：複合名詞 mountain climbing 前面不加冠詞；the mountains 是複數，後面動詞用 are。",
        "exOkText": "(O) **Mountain** climbing is popular in Taiwan.",
        "exOkZh": "爬山在台灣很受歡迎。",
        "exBadText": "(X) **The mountain** climbing is popular in Taiwan.",
        "exBadNote": "錯誤：mountain climbing 是複合名詞，前面不加冠詞 the，加了 the 就不對。"
      },
      {
        "title": "重複提及時誤重複冠詞（應改用代名詞）",
        "bad": "(X) I climbed **the mountain**. **The mountain** was very steep.",
        "ok": "(O) I climbed **the mountain**. **It** was very steep.",
        "why": "同一個名詞在句中第二次提到時，英文要改用代名詞 it，語氣才自然；重複寫 the mountain 不算錯句，但會讓句子顯得笨拙，在會考的簡化寫作中容易被扣分。判斷法：同一個單數名詞第二次出現，直接換成 it 或 one。",
        "exOkText": "(O) **The mountain** is far away. **It** takes two hours to climb.",
        "exOkZh": "這座山很遠，爬上去要兩個小時。",
        "exBadText": "(X) **The mountain** is far away. **The mountain** takes two hours to climb.",
        "exBadNote": "錯誤：第二次提到同一座山應改用代名詞 it，不宜重複寫完整的名詞片語，語氣才自然。"
      }
    ],
    "traps": [
      "**定冠詞陷阱**：the mountain（這座山）與 a mountain（一座山）、mountains（群山）三者語意不同，會考翻譯時要分清楚。",
      "**複合名詞陷阱**：mountain climbing 前面不加 the，因為 climbing 是動名詞，會考選擇題常拿來考冠詞。",
      "**位置陷阱**：the 只能放在名詞前面，寫成 mountain the 一定判錯。",
      "**一致性陷阱**：the mountain 單數配 is，the mountains 複數配 are，兩者不能混用。"
    ],
    "strategy": [
      "看到中文「這座、那座、某座」就立刻寫 the，這是最直接的對應規則。",
      "把 the mountain、a mountain、mountains、mountain climbing 四個詞排成一列，各造一句比較語意。",
      "寫完句子檢查兩件事：the 有沒有漏、the 在名詞前面還是後面。",
      "第二次提到同一個名詞時強迫自己改寫成 it，養成這個習慣，寫作會更精簡。"
    ]
  },
  "top of the mountain": {
    "zh": "山頂",
    "ipa": "tɑːp əv ðə ˈmaʊn.tən",
    "intro": "針對您提供的片語 **top of the mountain**，這是「名詞 top + of + the + 名詞」組成的名詞片語，表示「山頂」，本身不能單獨成句，必須當主詞或受詞使用。中文的「山頂」是「山」的一部分，所以中間用 of 表示歸屬，of 前面的 the 也一定要保留。最該注意的是 of 兩邊的完整性，以及 at / on / in 這幾個介系詞的語意差別。",
    "headline": "of 前後都要完整，at / on / in 有別",
    "structure": [
      {
        "role": "被修飾的名詞",
        "token": "top",
        "pos": "名詞 (Noun) — 可數",
        "func": "表示「頂部」，是這個片語的重點詞；前面用 the 表示特指某一個頂端",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "表示歸屬，連接「頂端」和「山」；後面一定要接 the + 名詞",
        "mark": "O"
      },
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "of 後面指特定的那座山，必須保留 the；漏掉就變成泛指，語意不同",
        "mark": "O"
      },
      {
        "role": "所有權中心",
        "token": "mountain",
        "pos": "名詞 (Noun) — 單數可數",
        "func": "被 of 修飾的對象，表示「這座山」；作為 the + 單數名詞，後面動詞應用單數",
        "mark": "O"
      },
      {
        "role": "片語功能",
        "token": "top of the mountain",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整組可當主詞或受詞；前面常再加 at、reached、to 等字形成完整句子",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "of 所有格漏加定冠詞 the",
        "bad": "(X) We reached the top of **mountain**. ／ (X) The top of mountain is very windy.",
        "ok": "(O) We reached the top of **the mountain**.",
        "why": "of 表示「……的」，of 後面接的名詞如果是特指對象，前面一定要有 the。學生常以為 the 已經出現在 top 前面就夠了，忘記 of 後面還要再出現一次。判斷法：每個名詞片語各自獨立，of 兩邊的名詞前都要自己帶冠詞或限定詞。",
        "exOkText": "(O) The **top of the mountain** is covered with snow.",
        "exOkZh": "山頂被雪覆蓋著。",
        "exBadText": "(X) The **top of mountain** is covered with snow.",
        "exBadNote": "錯誤：of 後面指的是特指的那座山，必須保留 the，漏掉之後就變成泛指。"
      },
      {
        "title": "介系詞 at / on / in 的語意誤用",
        "bad": "(X) They arrived **on** the top of the mountain. ／ (X) He fell **in** the top of the mountain.",
        "ok": "(O) They arrived **at** the top of the mountain.",
        "why": "at the top of 表示「到達山頂那個位置」；on the top of 表示「在山頂的表面上面」，是一種接觸關係；in the mountain 表示「在山體裡面」。三者語意不同，用錯句子就不成立。判斷法：到達某個地點用 at，站在某物體表面上用 on，進入某個空間內部用 in。",
        "exOkText": "(O) We sat **on** the top of the mountain and ate lunch.",
        "exOkZh": "我們坐在山頂上吃午餐。",
        "exBadText": "(X) We sat **in** the top of the mountain and ate lunch.",
        "exBadNote": "錯誤：坐在山頂表面要用 on，in 表示在山體內部，兩者語意完全不同，不能互換。"
      },
      {
        "title": "所有格與 of 結構混用（誤加 's 或誤用所有格）",
        "bad": "(X) the top **of the mountain's** ／ (X) the top **of mountain's**",
        "ok": "(O) the **top of the mountain** ／ (O) the **mountain's top**",
        "why": "「山頂」可以用 of 結構或所有格兩種方式表達，但兩者不能同時出現，也不能只留一半。of 結構要完整寫出 the mountain；用所有格時 mountain 後面接 's，後面的 top 前面就不再加 the。判斷法：of 與 's 是兩套系統，選一套用到底。",
        "exOkText": "(O) The **mountain's top** is very steep and windy.",
        "exOkZh": "這座山的山頂又陡又風大。",
        "exBadText": "(X) The **top of the mountain's** is very steep and windy.",
        "exBadNote": "錯誤：of 結構和所有格不能混用，the mountain's 本身就是完整的所有格片語"
      },
      {
        "title": "片語語序錯誤（of 兩邊詞語互換）",
        "bad": "(X) the mountain **of the top** ／ (X) the top **of the mountain the**",
        "ok": "(O) the **top of the mountain**",
        "why": "of 前面放被修飾的重點詞（top），後面放被歸屬的對象（the mountain），順序固定不可互換。學生常受中文「山的頂」影響，把詞序顛倒成 the mountain of the top。判斷法：of 前面的名詞才是句子要強調的主體，這也是「X of Y」結構的核心。",
        "exOkText": "(O) We climbed to the **top of the mountain** before noon.",
        "exOkZh": "我們在中午前爬到了山頂。",
        "exBadText": "(X) We climbed to the **mountain of the top** before noon.",
        "exBadNote": "錯誤：of 結構的語序顛倒了，應寫成 the top of the mountain，不能寫成 the mountain of the top。"
      }
    ],
    "traps": [
      "**of 兩邊都要檢查陷阱**：the top of the mountain 中有兩個 the，只寫一個或寫三個都會扣分，會考填空常設這個坑。",
      "**介系詞陷阱**：at the top of（在那個高度）、on the top of（在表面）、in the mountain（在山裡），三個介系詞語意完全不同。",
      "**所有格陷阱**：the mountain's top 與 the top of the mountain 都可以，但 of 與 's 絕對不能同時出現。",
      "**語序陷阱**：X of Y 結構中 X 才是重點，顛倒成 Y of X 就變成完全不同的意思。"
    ],
    "strategy": [
      "寫完 of 結構就停下來數一次：of 的兩邊是不是都有冠詞或限定詞。",
      "把 at the top of、on the top of、in the mountain 三句並排寫，各標中文，語意差別一次記清楚。",
      "遇到「山頂、腳下、頂端」這類詞，立刻套用 X of the Y 的模板。",
      "翻譯時先圈出中文句子的主體（是山頂還是山），再決定誰放在 of 前面。"
    ]
  },
  "on the top of the mountain": {
    "zh": "在山頂上",
    "ipa": "ɑːn ðə tɑːp əv ðə ˈmaʊn.tən",
    "intro": "針對您提供的片語 **on the top of the mountain**，這是一個介系詞片語，不能單獨成句，必須接在動詞後面當地點狀語。它表示「在山頂上」，最容易出錯的地方有兩個：on 表示「在某物的上表面」，以及 the top of… 是固定結構，介系詞不能隨意替換。",
    "headline": "on 表上表面，the top of 不可拆開",
    "structure": [
      {
        "role": "介系詞",
        "token": "on",
        "pos": "介系詞 (Preposition)",
        "func": "接在 the top of the mountain 前面，表示「在某物的上表面」，中文的「上」在英文裡通常用 on",
        "mark": "O"
      },
      {
        "role": "冠詞",
        "token": "the",
        "pos": "定冠詞 (Definite Article)",
        "func": "最高級 the top 前面一定要加 the；of 後面的 the mountain 也要用 the，表示特定的一座山",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "top",
        "pos": "名詞 (Noun) — 頂端、最高處",
        "func": "the top of… 是固定結構，等於「…的頂端」，不可刪掉 of 或把 of 移到別的位置",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "of the mountain",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "of 相當於中文的「…的」，後面接名詞 mountain，說明是哪一座山的頂端",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞搭配錯誤：on 與 in、at、over 混淆",
        "bad": "(X) **in** the top of the mountain ／ (X) **at** the top of the mountain",
        "ok": "(O) **on** the top of the mountain",
        "why": "on 表示「在某物體的上表面」，與接觸面有關，所以「站在山頂上」要用 on。in 是「在……裡面」，用在山頂就不合理；at 只表示「在某個地點」，聽起來像「在山頂附近」而不是「在上面」。學生常受中文「在山頂上」的影響，以為「上」就等於 at。判斷法：先問「有沒有接觸到一個表面？」有就用 on，沒有就用 at 或 in。",
        "exOkText": "(O) We put a flag **on the top of** the mountain.",
        "exOkZh": "我們在山頂上插了一面旗子。",
        "exBadText": "(X) We put a flag **in the top of** the mountain.",
        "exBadNote": "錯誤：in 是「在……裡面」，山頂屬於頂端表面，應用 on。"
      },
      {
        "title": "冠詞錯誤：最高級前漏加 the",
        "bad": "(X) on top of the mountain ／ (X) on the top of mountain",
        "ok": "(O) on **the top of** the mountain",
        "why": "the top 是「頂端這個特定位置」，前面一定要加定冠詞 the，這是最高級名詞的固定規則。同樣地，of 後面的 mountain 也需要 the，因為討論的是特定的一座山。學生常覺得中文不需要冠詞，於是整串漏掉。判斷法：看到 top、bottom、best、worst 這些「最高級」字眼，先在前面畫一個 the 的位置再檢查。",
        "exOkText": "(O) We camped **on the top of** the mountain.",
        "exOkZh": "我們在山頂上露營。",
        "exBadText": "(X) We camped **on top of mountain**.",
        "exBadNote": "錯誤：最高級 the top 與 mountain 前都漏了定冠詞 the。"
      },
      {
        "title": "成分缺漏：介系詞片語不能單獨成句",
        "bad": "(X) **On the top of the mountain** we a rest. ／ (X) We there **on the top of the mountain**.",
        "ok": "(O) We **took a rest on the top of the mountain**.",
        "why": "on the top of the mountain 裡面只有介系詞與名詞，沒有主詞和動詞，所以不能自己構成完整句子，必須當作地點狀語接在動詞後面。學生在造句或做翻譯時，容易直接把它當主詞或當結論。判斷法：把這串字單獨唸一遍，如果找不到「誰做什麼事」，就是缺主詞或動詞，要補齊才能成句。",
        "exOkText": "(O) They rested **on the top of the mountain** for an hour.",
        "exOkZh": "他們在山頂上休息了一小時。",
        "exBadText": "(X) **On the top of the mountain** for an hour.",
        "exBadNote": "錯誤：整句只有介系詞片語，缺主詞與動詞，無法單獨成句。"
      },
      {
        "title": "比較級與最高級誤用：the top 不可再加 more 或 most",
        "bad": "(X) **more the top** of the mountain ／ (X) on the **most top** of the mountain",
        "ok": "(O) on **the top of** the mountain",
        "why": "the top 本身已經含有「最高處」的意思，相當於最高級，前面不能再加 more、most 或 very，否則語意重複，會變成錯誤用法。同理，the best、the worst 也都是最高級，不能說 more the best。學生看到中文「更高的頂端」就直覺加 more。判斷法：只要前面已經有 the 表示最高級，後面就不再加比較級或 very。",
        "exOkText": "(O) This is **the top of** the mountain.",
        "exOkZh": "這就是山頂。",
        "exBadText": "(X) This is **more the top** of the mountain.",
        "exBadNote": "錯誤：the top 已是最高級，不可再加 more。"
      }
    ],
    "traps": [
      "**介系詞陷阱**：中文「在山頂上」容易被直覺寫成 at the top。會考常考 in、on、at 的選擇，判斷重點是「有沒有接觸表面」。",
      "**最高級陷阱**：the top、the best、the most 這類最高級，前面必定有 the，且不可再加 more、very。",
      "**of 不可省**：the top of the mountain 中，of 是「……的」的意思，刪掉 of 就變成錯誤的 the top mountain。",
      "**片語陷阱**：介系詞片語不能單獨成句，考題若給空格讓你填空，先看空格前有沒有動詞，決定這裡該填介系詞還是名詞。"
    ],
    "strategy": [
      "先找動詞：介系詞片語一定接在動詞後面，寫句子時先確定「誰做了什麼」，再補地點。",
      "背熟固定結構 the top of、the bottom of、the middle of，三個都不能替換介系詞。",
      "整理方位詞表：on 在……上（表面）、in 在……裡、at 在（某點）、between 在……之間。",
      "寫完檢查兩處 the：最高級前一個，of 後面的名詞前一個。",
      "把片語放回完整句子唸一次，最快找出缺漏的成分。"
    ]
  },
  "took a rest on the top of the mountain": {
    "zh": "在山頂上休息了一下",
    "ipa": "tʊk ə rest ɑːn ðə tɑːp əv ðə ˈmaʊn.tən",
    "intro": "針對您提供的 **took a rest on the top of the mountain**，這是一個「動詞片語」，已經有動詞 took，但還沒有主詞，所以不能單獨成句，必須接在主詞後面使用。它表示「在山頂上休息了一下」，重點在 take a rest 這個固定動詞片語，以及 took 本身已經是過去式。",
    "headline": "take a rest 固定搭配，took 已是過去式",
    "structure": [
      {
        "role": "動詞",
        "token": "took",
        "pos": "動詞 (Verb) — take 的過去式",
        "func": "表示過去發生的動作，是這句的核心動詞；它已經自帶過去式，後面不要再加 was",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "a rest",
        "pos": "名詞片語 (Noun Phrase) — 冠詞 + 名詞",
        "func": "take 的受詞，表示「休息一下」；rest 在這裡是可數名詞，前面要有冠詞 a",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "on",
        "pos": "介系詞 (Preposition)",
        "func": "接在受詞後面，表示休息的地點是在某物的上表面",
        "mark": "O"
      },
      {
        "role": "最高級名詞片語",
        "token": "the top",
        "pos": "名詞片語 (Noun Phrase) — the + 最高級名詞",
        "func": "the top 表示「頂端」，前面一定要有 the，後面用 of 說明是哪裡的頂端",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "of the mountain",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "of + 名詞，相當於「……的」，修飾 the top，指出是那座山的頂端",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動詞時態錯誤：忘記把 take 變成 took",
        "bad": "(X) She **take** a rest on the top of the mountain. ／ (X) She **taked** a rest on the top of the mountain.",
        "ok": "(O) She **took** a rest on the top of the mountain.",
        "why": "take 是不規則動詞，過去式是 took，不能加 -ed 變成 taked。這裡的動作已經發生、已經結束，所以必須用過去式。學生常因為只背得熟 take 的原形，而忘記整句要改時態。判斷法：看到 took、went、had 這類表示「已經完成」的動詞，就回頭確認句子其他動詞是否也都要用過去式，時態要前後一致。",
        "exOkText": "(O) We **took** a short rest on the hill.",
        "exOkZh": "我們在山上稍微休息了一下。",
        "exBadText": "(X) We **take** a short rest on the hill.",
        "exBadNote": "錯誤：動作已完成，take 應改為過去式 took。"
      },
      {
        "title": "冠詞用法錯誤：a rest 不可漏冠詞或誤用 the rest",
        "bad": "(X) She took **rest** on the top of the mountain. ／ (X) She took **the rest** on the top of the mountain.",
        "ok": "(O) She took **a rest** on the top of the mountain.",
        "why": "這裡的 rest 是可數名詞，表示「一次休息」，前面必須有冠詞 a。漏掉 a 會讓句子變成缺成分；换成 the rest 則語意完全變了，the rest 是「剩下的部分」，不是「休息一下」。學生常因中文沒有冠詞而漏寫。判斷法：可數名詞單數、前面沒有指示詞與所有格時，格位要補上 a 或 an。",
        "exOkText": "(O) He took **a rest** under the tree.",
        "exOkZh": "他在樹下休息了一下。",
        "exBadText": "(X) He took **the rest** under the tree.",
        "exBadNote": "錯誤：the rest 是「剩下的部分」，要用 a rest 才表示休息。"
      },
      {
        "title": "動詞與受詞固定搭配：rest 不可單獨當動詞",
        "bad": "(X) She **rest** on the top of the mountain. ／ (X) She **resting** on the top of the mountain.",
        "ok": "(O) She **took a rest** on the top of the mountain.",
        "why": "rest 在這裡是名詞，不能單獨拿來當句子的主要動詞，前面一定要搭配 take 或 have 這類動詞才完整。寫成 rest 就像中文的「她休息」變成沒有動詞的片段；寫成 resting 則變成動名詞片語，也不能獨立成句。判斷法：看到 rest 前面若沒有 take、have、let 之類的動詞，就是漏了固定搭配。",
        "exOkText": "(O) Let us **take a rest** for ten minutes.",
        "exOkZh": "讓我們休息十分鐘吧。",
        "exBadText": "(X) Let us **rest** for ten minutes.",
        "exBadNote": "錯誤：少了動詞 take，rest 不能單獨作主要動詞。"
      },
      {
        "title": "名詞單複數錯誤：rest 不可加 s",
        "bad": "(X) She took **a rests** on the top of the mountain. ／ (X) She took **many rests** on the top of the mountain.",
        "ok": "(O) She took **a rest** on the top of the mountain.",
        "why": "a 這個冠詞後面一定要接單數名詞，所以是 a rest，不能寫 a rests；而 many rests 雖然單複數形式正確，卻改變了語意，「很多次休息」和「休息一下」是兩件事。學生常把「休息」誤認為和 water、coffee 一樣的不可數名詞。判斷法：先看前面的詞是 a、one 還是 many／several，前者接單數、後者接複數。",
        "exOkText": "(O) The climbers took **a rest** every hour.",
        "exOkZh": "登山者們每小時就休息一下。",
        "exBadText": "(X) The climbers took **many rests** every hour.",
        "exBadNote": "錯誤：語意變成「多次休息」，原文是休息一下。"
      }
    ],
    "traps": [
      "**不規則動詞陷阱**：take 的過去式是 took，不能寫成 taked；這類不規則變化在會考「選出正確動詞」必考。",
      "**冠詞陷阱**：a rest 與 the rest 意思完全不同，一個是「休息一下」，一個是「剩下的部分」。",
      "**動詞陷阱**：rest 單獨出現時要看前後，有沒有 take／have 搭配，不能自己當主要動詞。",
      "**語序陷阱**：動詞之後依序是受詞、介系詞片語（受詞 + 地點），不要把地點插在受詞前面。"
    ],
    "strategy": [
      "寫句子先定動詞：這類片語的核心是 take a rest，動詞一定在最前面，後面接受詞與地點。",
      "把 a rest 當成一個整塊記憶，不要拆成 a + rest 去猜單複數。",
      "不規則動詞表每天複習，尤其 take–took–taken、go–went–gone 這幾個高頻變化。",
      "受詞後面接地點、時間時，順序是「受詞 → 介系詞片語」，這是會考常見的語序點。",
      "做完題後把整句唸一次，感覺怪怪的通常就是冠詞或時態出錯。"
    ]
  },
  "so she took a rest on the top of the mountain": {
    "zh": "所以她在山頂上休息了一下",
    "ipa": "soʊ ʃiː tʊk ə rest ɑːn ðə tɑːp əv ðə ˈmaʊn.tən",
    "intro": "針對您提供的完整句子 **so she took a rest on the top of the mountain**，這是一個有主詞、有動詞的完整句子。句首的 so 是連接詞，表示「所以」，把前後兩件事連成因果關係；後面 she 是第三人稱單數，took 已經是過去式，不用再加 -s。",
    "headline": "so 前要加逗號，動詞用過去式 took",
    "structure": [
      {
        "role": "連接詞",
        "token": "so",
        "pos": "連接詞 (Conjunction)",
        "func": "表示「所以」，連接前後兩句；後面接完整句子，前面通常要有逗號",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "she",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主角，負責執行動詞 took；第三人稱單數的動詞變化要特別小心",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "took",
        "pos": "動詞 (Verb) — take 的過去式",
        "func": "表示過去發生的動作；因為已經是過去式，所以不再加 -s，句子才不會出錯",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "a rest",
        "pos": "名詞片語 (Noun Phrase) — 冠詞 + 可數名詞",
        "func": "take 的受詞，表示「休息一下」，可數名詞單數前要有冠詞 a",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "on",
        "pos": "介系詞 (Preposition)",
        "func": "表示休息的地點在某物的上表面，後面接地點名詞片語",
        "mark": "O"
      },
      {
        "role": "名詞片語",
        "token": "the top of the mountain",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "作為 on 的受詞，指明「哪裡的頂端」；最高級前與專有名詞前都有 the",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "連接詞 so 的語意與使用錯誤",
        "bad": "(X) **And** she took a rest on the top of the mountain. ／ (X) **Because** she took a rest on the top of the mountain, she was tired.",
        "ok": "(O) **So** she took a rest on the top of the mountain.",
        "why": "so 是「所以」，只能放在「前句的結果」前面，不能和 because（因為）同時用，否則因果關係重複。改成 and 則變成單純的並列，語意方向不對。學生常覺得中文的「所以」可有可無，於是隨意換成 and。判斷法：先問「後句是前句的結果嗎？」是就用 so，是原因就要改用 because。",
        "exOkText": "(O) She was tired, **so** she took a rest on the top of the mountain.",
        "exOkZh": "她很累，所以在山頂上休息了一下。",
        "exBadText": "(X) She was tired, **because** so she took a rest on the top of the mountain.",
        "exBadNote": "錯誤：because 與 so 同時使用，因果邏輯重複。"
      },
      {
        "title": "標點符號錯誤：連接詞 so 之前要加逗號",
        "bad": "(X) She was tired **so** she took a rest on the top of the mountain. ／ (X) **So,** she took a rest on the top of the mountain.",
        "ok": "(O) She was tired, **so** she took a rest on the top of the mountain.",
        "why": "在「兩個完整句子」中間用連接詞時，連接詞前面要加逗號，這叫作逗號加連接詞。中文沒有這個逗號，所以學生常忘記；另一個常見錯誤是句首直接用 so 卻多加逗號，句首的 so 後面不接逗號。判斷法：把句子分成兩截，中間夾連接詞就在它前面點一個逗號。",
        "exOkText": "(O) The path was long, **so** they stopped for a rest.",
        "exOkZh": "路很長，所以他們停下來休息。",
        "exBadText": "(X) The path was long **so** they stopped for a rest.",
        "exBadNote": "錯誤：連接詞 so 前少了逗號，兩句之間要分段。"
      },
      {
        "title": "動詞形式錯誤：第三人稱單數與過去式分不清",
        "bad": "(X) So she **take** a rest on the top of the mountain. ／ (X) So she **taked** a rest on the top of the mountain.",
        "ok": "(O) So she **took** a rest on the top of the mountain.",
        "why": "she 是第三人稱單數，但這裡的動作已經完成，所以要用過去式 took，而不是原形 take。三人稱單數加 -s 的規則只適用於一般現在時（she takes），不能和過去式混在一起；也絕對不能寫成 taked。判斷法：先看時間決定是「現在」還是「過去」，再決定要不要加 -s，兩者只會擇一。",
        "exOkText": "(O) So she **took** a short rest there.",
        "exOkZh": "所以她在那裡稍微休息了一下。",
        "exBadText": "(X) So she **takes** a rest every day.",
        "exBadNote": "錯誤：原文是已完成的動作，應用過去式 took。"
      },
      {
        "title": "雙動詞錯誤：took 前面不能再加 was",
        "bad": "(X) So she **was took** a rest on the top of the mountain. ／ (X) So she **is took** a rest on the top of the mountain.",
        "ok": "(O) So she **took** a rest on the top of the mountain.",
        "why": "一個簡單句中只能有一個主要動詞。took 本身已經帶了過去式語意，前面再加 was 或 is 就變成兩個動詞，句子不成立。學生常誤以為「過去式一定要搭配 be 動詞」。判斷法：一般動詞的過去式自己就表示時間，不需要 be 動詞幫忙；只有 be 動詞本身才會變成 was、were。",
        "exOkText": "(O) So she **went** home and slept.",
        "exOkZh": "所以她回家睡覺了。",
        "exBadText": "(X) So she **were went** home and slept.",
        "exBadNote": "錯誤：動詞重複，went 前不能再加 were。"
      }
    ],
    "traps": [
      "**so 的陷阱**：so 是「所以」，只能接在結果那一句；千萬不要和 because 一起使用。",
      "**逗號陷阱**：兩個完整句子用 so、and、but、or 連接時，連接詞前面要加逗號，這是會考標點必考點。",
      "**動詞形式陷阱**：she 這種第三人稱單數，加 -s 只在一般現在時成立；一旦用過去式就必須寫 took。",
      "**雙動詞陷阱**：was／is 加過去式動詞一定錯，會考常設這種錯誤選項。"
    ],
    "strategy": [
      "看到句首 so，先確認前面是否已經有完整句子，並在 so 前方補上逗號。",
      "判斷動詞形式用兩步：先看時間詞判斷時態，再看主詞是不是第三人稱單數。",
      "寫完句子數一次動詞數量，出現兩個主要動詞就一定是錯的。",
      "把 so 換成中文的「所以」朗讀一次，確認因果方向沒有反轉。",
      "整理常用連接詞清單：so、because、and、but、if、when，考前快速複習搭配。"
    ]
  },
  "coffee": {
    "zh": "咖啡",
    "ipa": "ˈkɑː.fi",
    "intro": "針對您提供的單字 **coffee**，這是一個單獨的單詞，本身不是句子。它是「咖啡」的意思，在英文裡屬於不可數名詞，不能加複數、也不能直接用 a 或 an 修飾，要表示一杯就要搭配量詞，例如 a cup of coffee。",
    "headline": "不可數名詞，別加 s 也別直接加 a",
    "structure": [
      {
        "role": "單字",
        "token": "coffee",
        "pos": "名詞 (Noun) — 不可數名詞 (Uncountable Noun)",
        "func": "指「咖啡」這種飲料，沒有複數形式，也不能直接加 a / an，要用量詞搭配來數",
        "mark": "O"
      },
      {
        "role": "常見搭配",
        "token": "a cup of coffee",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "標準的量詞搭配，表示「一杯咖啡」；這是會考克漏字與選詞題最常出現的組合",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤：cofee、coffe 漏字母",
        "bad": "(X) I drank a cup of **cofee**. ／ (X) He likes **coffe** with milk.",
        "ok": "(O) I drank a cup of **coffee**.",
        "why": "coffee 的拼法是 c‑o‑f‑f‑e‑e，兩個 f 都不能省，後面是兩個 e。學生常因為唸得快，只寫一個 f 或一個 e，變成 cofee、coffe。判斷法：把單字分成 co‑ffee 兩塊唸，音節有兩個就要寫兩個 ee，中間的 ff 也要記牢。",
        "exOkText": "(O) She drinks **coffee** every morning.",
        "exOkZh": "她每天早上喝咖啡。",
        "exBadText": "(X) She drinks **cofee** every morning.",
        "exBadNote": "錯誤：coffee 少了一個 f 與一個 e。"
      },
      {
        "title": "不可數名詞誤加複數：寫成 coffees",
        "bad": "(X) I drank two **coffees** this morning. ／ (X) The shop sells many **coffees**.",
        "ok": "(O) I drank two **cups of coffee** this morning.",
        "why": "coffee 是不可數名詞，表示物質本身，沒有複數形式，所以不能寫成 coffees。要表達「兩杯咖啡」必須用量詞 cups of coffee，或用 two cups of the coffee。學生常看到「兩」就直接在名詞後面加 s。判斷法：像 water、rice、money 這類物質名詞一律不加 s，要數就用 a cup／a glass／a bowl。",
        "exOkText": "(O) My father drinks **three cups of coffee** a day.",
        "exOkZh": "我爸爸一天喝三杯咖啡。",
        "exBadText": "(X) My father drinks **three coffees** a day.",
        "exBadNote": "錯誤：coffee 不可數，不能加 s，要寫 cups of coffee。"
      },
      {
        "title": "量詞搭配錯誤：不能直接用 a 或數字加 coffee",
        "bad": "(X) I want **a coffee**. ／ (X) I drank **two coffee** this morning.",
        "ok": "(O) I want **a cup of coffee**.",
        "why": "在國中教材的標準用法中，coffee 前面要用量詞 cup 來數，寫成 a coffee 會被視為不完整，而 two coffee 少了複數與量詞都不對。正確說法是 a cup of coffee、two cups of coffee。判斷法：不可數名詞要數它時，前面一定會出現 cup、glass、bag、bottle 這類量詞，先找量詞再找名詞。",
        "exOkText": "(O) Would you like **a cup of coffee**?",
        "exOkZh": "你要來一杯咖啡嗎？",
        "exBadText": "(X) Would you like **a coffee**?",
        "exBadNote": "錯誤：應加量詞 cup，寫成 a cup of coffee。"
      },
      {
        "title": "發音與重音錯誤：重音位置與母音",
        "bad": "(X) I read coffee as **/kəˈfiː/**. ／ (X) I read coffee as **/ˈkoʊfi/**.",
        "ok": "(O) I read coffee as **/ˈkɑː.fi/**, with the stress on **co-**.",
        "why": "coffee 的重音在第一音節 co-，不是第二音節；第一個母音是長音 /ɑː/（美式常唸 /ɔː/），不是 /oʊ/；最後的 ee 讀長音 /iː/。學生若受西班牙語系或中文影響，容易把重音放到後面。判斷法：兩音節單字重音通常在前，唸起來前長後短、節奏像「咖啡」的第一音節拉長。",
        "exOkText": "(O) The word **coffee** is /ˈkɑː.fi/ — stress on the first syllable.",
        "exOkZh": "coffee 唸作 /ˈkɑː.fi/，重音在第一音節。",
        "exBadText": "(X) The word **coffee** is /kəˈfiː/ — stress on the last syllable.",
        "exBadNote": "錯誤：重音放錯位置，應重讀第一音節 co-。"
      }
    ],
    "traps": [
      "**不可數名詞陷阱**：coffee 不能加 s，會考常常直接考「單數、複數、不可數」的分類題。",
      "**量詞陷阱**：數咖啡一定要用 cup of，「三杯」是 three cups of coffee，不是 three coffees。",
      "**拼字陷阱**：co-ffee 有雙 f 與雙 e，少一個就扣分。",
      "**發音陷阱**：重音在第一音節，母音是 /ɑː/，不是 /oʊ/。"
    ],
    "strategy": [
      "把單字分成音節記：co‑ffee，一塊一塊寫就不會漏字母。",
      "背一份不可數名詞清單：water、milk、tea、coffee、rice、bread、money，看到它們就別加 s。",
      "學會數不可數名詞的句型：a cup of、a glass of、a bottle of、two cups of。",
      "唸單字時把重音音節拉長，一邊唸一邊寫可以幫助記憶發音與拼寫。",
      "做題時先圈出名詞，判斷它屬於可數、不可數再決定要不要加 s。"
    ]
  },
  "cups of coffee": {
    "zh": "幾杯咖啡",
    "ipa": "kʌps əv ˈkɑː.fi",
    "intro": "針對您提供的片語 **cups of coffee**，這是一個名詞片語，本身不能單獨成句，必須當主詞、賓語或受詞使用。它表示「幾杯咖啡」，結構是「量詞複數 + of + 不可數名詞」，三個部分缺一不可。",
    "headline": "量詞複數 + of + 不可數名詞",
    "structure": [
      {
        "role": "量詞（名詞）",
        "token": "cups",
        "pos": "名詞 (Noun) — 複數形",
        "func": "表示杯子的數量，因數量超過一杯要用複數；前面要搭配 a、two、three 等詞",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "把量詞和所裝的物品連起來，相當於中文的「……的」，這裡只能用 of",
        "mark": "O"
      },
      {
        "role": "不可數名詞",
        "token": "coffee",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "被裝在杯子裡的內容物，維持不可數、不加 s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "量詞單複數錯誤：cup 忘了變複數",
        "bad": "(X) I drank **two cup** of coffee. ／ (X) I bought **a cups** of coffee.",
        "ok": "(O) I drank **two cups** of coffee.",
        "why": "cup 在這裡是可數的量詞，數量超過一時必須變成複數 cups，而且 cup 以 s 結尾時發音要加 /s/ 變成 /kʌps/。寫成 a cups 是最典型的錯誤：冠詞 a 只能接單數名詞。判斷法：看到 a、an、one 就用單數，看到 two、three、many 就用複數。",
        "exOkText": "(O) She ordered **two cups of coffee**.",
        "exOkZh": "她點了兩杯咖啡。",
        "exBadText": "(X) She ordered **two cup** of coffee.",
        "exBadNote": "錯誤：數量大於一，量詞 cup 應改成複數 cups。"
      },
      {
        "title": "介系詞搭配錯誤：of 不可換成 for 或 in",
        "bad": "(X) I bought a cup **for** coffee. ／ (X) She put some sugar **in** my cup for coffee.",
        "ok": "(O) I bought a cup **of** coffee.",
        "why": "「一杯……的咖啡」這個結構只能用 of，表示容器與內容物的關係。for 是「為了、給」，用在這裡會變成「為了咖啡」，語意不通；in 是「在……裡面」，位置關係也不對。學生常依中文「一杯咖啡」的語序硬翻。判斷法：量詞 + of + 物品，是一個固定公式，三個位置都不能互換。",
        "exOkText": "(O) He drank **a cup of tea** after lunch.",
        "exOkZh": "他午飯後喝了一杯茶。",
        "exBadText": "(X) He drank **a cup for tea** after lunch.",
        "exBadNote": "錯誤：介系詞應為 of，for 變成「為了茶」。"
      },
      {
        "title": "不可數名詞誤複數化：of 後面加 s",
        "bad": "(X) I bought **cups of coffees**. ／ (X) She likes **black coffees** in the evening.",
        "ok": "(O) I bought **cups of coffee**.",
        "why": "of 後面的名詞是「被裝的內容物」，coffee 屬於不可數名詞，不論幾杯都不能加 s。寫成 cups of coffees 是很常見的重複複數錯誤，會考選詞題常常混在一起考。判斷法：of 後面的名詞先判斷是否可數，coffee、water、rice 這類一律保持原形。",
        "exOkText": "(O) They served **cups of coffee** to everyone.",
        "exOkZh": "他們端了咖啡給每一個人。",
        "exBadText": "(X) They served **cups of coffees** to everyone.",
        "exBadNote": "錯誤：coffee 不可數，不加 s。"
      },
      {
        "title": "成分缺漏：名詞片語不能單獨成句",
        "bad": "(X) **Cups of coffee** every morning. ／ (X) **Cups of coffee** in my school bag.",
        "ok": "(O) **She drinks** cups of coffee every morning.",
        "why": "cups of coffee 裡面只有名詞和介系詞，沒有主詞與動詞，不能單獨構成完整句子，通常要放在動詞後面當受詞，或放在 be 動詞後面當主語。學生在翻譯或造句時容易直接把它當一句。判斷法：寫完一句後問「誰做了什麼」，答不出來就是少了動詞。",
        "exOkText": "(O) I always buy **cups of coffee** on my way to school.",
        "exOkZh": "我上學路上總是買幾杯咖啡。",
        "exBadText": "(X) **Cups of coffee** on my way to school.",
        "exBadNote": "錯誤：缺主詞與動詞，無法單獨成句。"
      }
    ],
    "traps": [
      "**量詞複數陷阱**：cups 已經是複數，寫 a cups 直接判錯；冠詞 a 只接單數。",
      "**介系詞陷阱**：量詞後面固定用 of，用 for、with、in 都是錯的。",
      "**雙重複數陷阱**：cups of coffees 是「複數加複數」，會考特別愛考這種組合。",
      "**成分陷阱**：名詞片語不能單獨成句，做翻譯題時要記得補動詞。"
    ],
    "strategy": [
      "記熟公式：數詞／冠詞 + 量詞（複數）+ of + 不可數名詞，一步一步套上去。",
      "把不可數名詞單獨列表背熟，寫到 of 後面時就不會手滑加 s。",
      "量詞複數要連發音一起記：cup /kʌp/ → cups /kʌps/。",
      "寫完句子檢查三件事：有沒有主詞、有沒有動詞、名詞片語位置對不對。",
      "克漏字題先讀空格前後的詞，決定這裡該填量詞、介系詞還是名詞。"
    ]
  },
  "three cups of coffee": {
    "zh": "三杯咖啡",
    "ipa": "θriː kʌps əv ˈkɑː.fi",
    "intro": "針對您提供的片語 **three cups of coffee**，這是一個名詞片語，還不能單獨成句，通常當主詞或受詞使用。它表示「三杯咖啡」，由數詞 three、量詞複數 cups、介系詞 of 與不可數名詞 coffee 四個部分組成，順序固定。",
    "headline": "數詞 + 量詞複數 + of + 不可數名詞",
    "structure": [
      {
        "role": "數詞",
        "token": "three",
        "pos": "數詞 (Numeral)",
        "func": "表示數量「三」，決定後面的量詞要用單數還是複數；數詞前不加冠詞",
        "mark": "O"
      },
      {
        "role": "量詞（複數）",
        "token": "cups",
        "pos": "名詞 (Noun) — 複數形",
        "func": "被數詞 three 修飾，表示「三個杯子」，因此用複數",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接量詞與內容物，表示「裝著……的」，位置固定不可移動",
        "mark": "O"
      },
      {
        "role": "不可數名詞",
        "token": "coffee",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "杯子裡的內容物，保持不可數、不加 s、前面不加 the",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "名稱單複數錯誤：被數詞修飾要用複數",
        "bad": "(X) I drank **three cup** of coffee. ／ (X) My father buys **five cup** of coffee every day.",
        "ok": "(O) I drank **three cups** of coffee.",
        "why": "數詞 three、five 都是大於一，被它們修飾的名詞一定要用複數，所以 cup 要變成 cups。學生常以為只有句尾的名詞才需要複數，忘了中間的量詞也要跟著變。判斷法：看到數詞或 many、several，就把後面最近的名詞變成複數。",
        "exOkText": "(O) She bought **three cups of coffee** for the meeting.",
        "exOkZh": "她為會議買了三杯咖啡。",
        "exBadText": "(X) She bought **three cup** of coffee for the meeting.",
        "exBadNote": "錯誤：被 three 修飾，量詞要用複數 cups。"
      },
      {
        "title": "冠詞誤用：數詞前不加冠詞，of 後不加 the",
        "bad": "(X) I drank **a three cups** of coffee. ／ (X) I drank three cups of **the coffee**.",
        "ok": "(O) I drank **three cups of coffee**.",
        "why": "數詞本身已經表示數量，前面不能再加 a 或 the，否則就變成「三個三杯」。of 後面的 coffee 是泛指這種飲品，前面也不加 the；只有在特指某一杯時才會說 the coffee in this cup。判斷法：數詞前面只能接動詞或形容词（three cups are hot），不能接冠詞。",
        "exOkText": "(O) **Three cups of coffee** are on the desk.",
        "exOkZh": "三杯咖啡在桌上。",
        "exBadText": "(X) **A three cups of coffee** are on the desk.",
        "exBadNote": "錯誤：數詞前不可加冠詞 a。"
      },
      {
        "title": "固定詞序錯誤：of 的位置不可移動",
        "bad": "(X) I drank three cups coffee **of**. ／ (X) I drank **coffee three cups of**.",
        "ok": "(O) I drank **three cups of coffee**.",
        "why": "這個片語的語序是「數詞 + 量詞 + of + 名詞」，屬於固定結構，of 不能被刪掉、也不能搬到最後。學生有時受中文「三杯咖啡」影響，寫成 three cups coffee；或把 of 放句尾，都是錯的。判斷法：of 之後一定要有名詞，of 自己不能當受詞站在句尾。",
        "exOkText": "(O) He ordered **two bowls of rice** and **three cups of coffee**.",
        "exOkZh": "他點了兩碗飯和三杯咖啡。",
        "exBadText": "(X) He ordered **two bowls rice of** and **three cups coffee**.",
        "exBadNote": "錯誤：of 被刪掉，語序變成錯誤的 bowls rice of。"
      },
      {
        "title": "發音錯誤：cup 複數的尾音與 coffee 重音",
        "bad": "(X) I read **cups** as /kʌp/. ／ (X) I put the stress on **-fee** in coffee.",
        "ok": "(O) I read **cups** as /kʌps/ and keep the stress on **co-** in coffee.",
        "why": "cups 結尾是清音 s，要加 /s/ 讀成 /kʌps/，不能只讀成單數的 /kʌp/；coffee 的重音在第一音節 co-，不是 -fee。學生在聽力與口試常因這兩個細節被扣分。判斷法：複數名詞唸完後一定要有那個尾音，接著立刻練一次 cups of coffee 的完整發音。",
        "exOkText": "(O) I drink **three cups of coffee** in the morning.",
        "exOkZh": "我早上喝三杯咖啡。",
        "exBadText": "(X) I say **three cup of coffee** — like a single cup.",
        "exBadNote": "錯誤：cups 要唸出 /s/ 尾音，coffee 重音在第一音節。"
      }
    ],
    "traps": [
      "**數詞加複數陷阱**：three cups 的複數在量詞，別只讓句尾的詞變複數。",
      "**冠詞陷阱**：數詞前面不接 a／the，of 後面的不可數名詞也不接 the。",
      "**語序陷阱**：量詞與 of 是綁在一起的固定組合，不可拆開或調換順序。",
      "**聽力陷阱**：cups 的 /s/ 尾音聽起來不明顯，但一定要讀出來。"
    ],
    "strategy": [
      "套公式：數詞 + 量詞（複數）+ of + 不可數名詞，先寫數詞再依序往後接。",
      "寫完後逐字檢查每個名詞的單複數，確認被數詞修飾的都變了。",
      "複數名詞連同發音一起背，唸出 /s/ 尾音能加深印象。",
      "遇到 a、the、one 就停下來想一下：前面已經有數詞或指示詞了嗎？",
      "克漏字時先看空格後面的名詞，決定前面該填數詞、量詞還是介系詞。"
    ]
  },
  "three cups of coffee a day": {
    "zh": "一天三杯咖啡",
    "ipa": "θriː kʌps əv ˈkɑː.fi ə deɪ",
    "intro": "針對您提供的片語 **three cups of coffee a day**，這是一個名詞片語加上時間狀語，還是不能單獨成句，通常當主詞或賓語。它表示「一天三杯咖啡」，重點在句尾的 a day，這裡的 a 相當於中文的「每」，表示每天的數量。",
    "headline": "句尾 a day 的 a 是「每一」的意思",
    "structure": [
      {
        "role": "數詞",
        "token": "three",
        "pos": "數詞 (Numeral)",
        "func": "表示數量「三」，決定量詞要用複數，前面不加冠詞",
        "mark": "O"
      },
      {
        "role": "量詞（複數）",
        "token": "cups",
        "pos": "名詞 (Noun) — 複數形",
        "func": "被 three 修飾，所以用複數，表示三個杯子",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接量詞與內容物，表示「盛裝……的」，位置固定",
        "mark": "O"
      },
      {
        "role": "不可數名詞",
        "token": "coffee",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "杯子裡的飲品，保持不可數、不加 s",
        "mark": "O"
      },
      {
        "role": "冠詞 + 名詞",
        "token": "a day",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "表示頻率，這裡的 a 相當於 every／each，意思是「每一天」；放在名詞片語之後說明週期",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞 a 的特殊用法錯誤：a day 不可改成 the day",
        "bad": "(X) I drink three cups of coffee **the day**. ／ (X) I drink three cups of coffee **every a day**.",
        "ok": "(O) I drink three cups of coffee **a day**.",
        "why": "這裡的 a 不是「一個」而是「每一」，相當於 every 或 each，表示每天的固定數量，所以要寫 a day。改成 the day 變成「那一天」，語意完全不同；寫 every a day 則是重複疊字。判斷法：看到 a 緊接單數可數名詞 day，且在句尾表示週期時，直接譯成「每一天」。",
        "exOkText": "(O) My mother drinks **two cups of tea** a day.",
        "exOkZh": "我媽媽一天喝兩杯茶。",
        "exBadText": "(X) My mother drinks **two cups of tea** the day.",
        "exBadNote": "錯誤：a 在這裡表示「每」，不能改成 the day。"
      },
      {
        "title": "名詞單複數錯誤：a day 與 coffee 都不可加 s",
        "bad": "(X) I drink three cups of coffee **a days**. ／ (X) I drink three cups of **coffees** a day.",
        "ok": "(O) I drink three cups of coffee **a day**.",
        "why": "a 後面接單數可數名詞，所以是 a day 不是 a days；coffee 是不可數名詞，也不能寫成 coffees。這兩個名詞在片語裡的判斷方式不同，一個看冠詞，一個看名詞種類。判斷法：a／one 後面一定是單數；of 後面的不可數名詞永遠不加 s。",
        "exOkText": "(O) I read for **two hours a day**.",
        "exOkZh": "我每天讀書兩小時。",
        "exBadText": "(X) I read for **two hours a days**.",
        "exBadNote": "錯誤：冠詞 a 後面要用單數 days。"
      },
      {
        "title": "語序錯誤：時間狀語的位置",
        "bad": "(X) **A day**, I drink three cups of coffee. ／ (X) I drink **a day** three cups of coffee.",
        "ok": "(O) I drink **three cups of coffee a day**.",
        "why": "表示「一天三杯」這種頻率的時間狀語，放在名詞片語之後最自然，也就是「主詞 + 動詞 + 物件 + a day」。放句首雖然可以，但後面必須補上完整句子（不能只用逗號斷開）；插在名詞中間則一定錯。判斷法：a day 修飾的是整個「喝三杯咖啡」的動作，必須放在這串名詞片語的最後面。",
        "exOkText": "(O) He runs **three miles a day**.",
        "exOkZh": "他一天跑三英里。",
        "exBadText": "(X) He runs **three miles** — **a day** is too much for him.",
        "exBadNote": "錯誤：把 a day 拆到後半句，時間狀語位置錯誤。"
      },
      {
        "title": "限定詞與介系詞搭配錯誤：a day、per day、every day 的選擇",
        "bad": "(X) I drink three cups of coffee **per a day**. ／ (X) I drink three cups of coffee **in every day**.",
        "ok": "(O) I drink three cups of coffee **a day**.",
        "why": "「一天三杯」這種固定數量最自然的說法是 a day；per 後面直接接單數名詞（per day），不能再加 a；in every day 也不合英文慣例。學生常把中文的「每天」直譯成 in every day。判斷法：數量 + 單數名詞 + a day 是固定公式，per 之後就不加 a，兩者擇一。",
        "exOkText": "(O) She checks her phone **five times a day**.",
        "exOkZh": "她一天看五次手機。",
        "exBadText": "(X) She checks her phone **five times in every day**.",
        "exBadNote": "錯誤：中文直譯，應改用 a day 或 every day。"
      }
    ],
    "traps": [
      "**a day 的陷阱**：這裡的 a 等於 every，中文翻成「每天」，學生常誤以為要寫 the day。",
      "**單複數陷阱**：a day 的 day 用單數，coffee 保持不可數，兩者都不能加 s。",
      "**語序陷阱**：a day 必須放在整個名詞片語之後，插在中間或拆開都錯。",
      "**中文直譯陷阱**：中文的「一天三杯」不能翻成 in every day、per a day。"
    ],
    "strategy": [
      "把「a day」當成整塊單位背，寫數量時直接往名詞片語後面接。",
      "練習時把 three cups of coffee a day 整句唸順，節奏會更自然。",
      "比較 a day、every day、per day 三種說法的使用場合，選擇最簡單的一種。",
      "寫完後回頭確認每個名詞的單複數，冠詞 a 後面一定是單數。",
      "看到中文「每」字，先在英文寫下 a、every 或 per 之一，再決定其後的單複數。"
    ]
  },
  "having three cups of coffee a day": {
    "zh": "一天喝三杯咖啡",
    "ipa": "ˈhæv.ɪŋ θriː kʌps əv ˈkɑː.fi ə deɪ",
    "intro": "針對您提供的片語 **having three cups of coffee a day**，這是一個動名詞片語，having 後面接名詞片語，整個片語還沒有主詞與主要動詞，所以不能單獨成句。它相當於中文的「一天喝三杯咖啡」，重點在 having 必須保持動名詞形式，不能加 to。",
    "headline": "having 是動名詞，不能加 to 也不能加 s",
    "structure": [
      {
        "role": "動名詞",
        "token": "having",
        "pos": "動名詞 (Gerund) — have 的 -ing 形式",
        "func": "表示「喝著、享用著」的動作，後面接名詞作為受詞；它本身不能單獨作主要動詞",
        "mark": "O"
      },
      {
        "role": "數詞",
        "token": "three",
        "pos": "數詞 (Numeral)",
        "func": "表示數量「三」，決定量詞用複數，前面不加冠詞",
        "mark": "O"
      },
      {
        "role": "量詞（複數）",
        "token": "cups",
        "pos": "名詞 (Noun) — 複數形",
        "func": "被 three 修飾所以用複數，是 having 的受詞",
        "mark": "O"
      },
      {
        "role": "介系詞與不可數名詞",
        "token": "of coffee",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "of 連接量詞與內容物，coffee 保持不可數、不加 s",
        "mark": "O"
      },
      {
        "role": "時間狀語",
        "token": "a day",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "放在名詞片語之後表示頻率，這裡的 a 相當於 every",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動名詞形式錯誤：have、having、to have 混用",
        "bad": "(X) **To having** three cups of coffee a day is bad. ／ (X) **Have** three cups of coffee a day is bad for you.",
        "ok": "(O) **Having** three cups of coffee a day is bad for you.",
        "why": "動名詞 having 已經含有「做……的」意思，前面不能再加 to，也不能還原成原形 have。寫成 to having 學生常覺得不可思議，但這是會考常見的錯誤選項。判斷法：作主語時用 V-ing 形式，前面不加 to；想表達「為了喝三杯」才用 to have。",
        "exOkText": "(O) **Having** three cups of coffee a day is not healthy.",
        "exOkZh": "一天喝三杯咖啡不健康。",
        "exBadText": "(X) **To have** three cups of coffee a day is not healthy.",
        "exBadNote": "錯誤：作主語要用動名詞 having，不能用不定式 to have。"
      },
      {
        "title": "缺少 be 動詞：片語當主詞要有動詞",
        "bad": "(X) **Having** three cups of coffee a day **good** for you. ／ (X) **Having** three cups of coffee a day **be** expensive.",
        "ok": "(O) **Having** three cups of coffee a day **is** bad for our health.",
        "why": "having three cups of coffee a day 是一個名詞性的動名詞片語，當主詞時後面一定要接動詞，最常用的是 is／are。漏掉 is，整句就只剩片語與形容詞，無法成句。學生常以為 having 已經是動詞就不需要 be 動詞。判斷法：片語作主詞時問「它是什麼？」，答案要用 is/are 帶出。",
        "exOkText": "(O) **Having** three cups of coffee a day **is** a bad habit.",
        "exOkZh": "一天喝三杯咖啡是個壞習慣。",
        "exBadText": "(X) **Having** three cups of coffee a day **a bad habit**.",
        "exBadNote": "錯誤：主詞與 a bad habit 之間少了 be 動詞 is。"
      },
      {
        "title": "動名詞誤加複數與主詞動詞不一致",
        "bad": "(X) He keeps **havings** three cups of coffee a day. ／ (X) **Having** three cups of coffee a day **are** a bad habit.",
        "ok": "(O) **Having** three cups of coffee a day **is** a bad habit.",
        "why": "動名詞是名詞的一種，但 having 在這裡是固定形式，永遠不加 s。另一個常見錯誤是主詞與動詞不一致：整個動名詞片語作主詞時視為單一的一件事，所以後面用 is 而不是 are。判斷法：把整個片語想成一個名詞，那「喝三杯咖啡」這件事只有一件，用單數動詞。",
        "exOkText": "(O) **Eating** too much sugar **is** bad for us.",
        "exOkZh": "吃太多糖對我們有害。",
        "exBadText": "(X) **Eating** too much sugar **are** bad for us.",
        "exBadNote": "錯誤：動名詞片語作主詞視為單數，應用 is。"
      },
      {
        "title": "介系詞搭配錯誤：後接動詞要用動名詞",
        "bad": "(X) I gave up **to have** three cups of coffee a day. ／ (X) He is used to **have** three cups of coffee a day.",
        "ok": "(O) I gave up **having** three cups of coffee a day.",
        "why": "像 give up（放棄）、be used to（習慣於）、be good at（擅長）這類動詞或片語，後面一律接 V-ing 動名詞，不能用不定式或原形。這是會考固定搭配的高頻考點。判斷法：看到 give up、be used to、look forward to、be interested in，後面就寫 -ing 形式。",
        "exOkText": "(O) She gave up **having** coffee before bed.",
        "exOkZh": "她放棄了睡前喝咖啡的習慣。",
        "exBadText": "(X) She gave up **to have** coffee before bed.",
        "exBadNote": "錯誤：give up 後面要接動名詞 having。"
      }
    ],
    "traps": [
      "**動名詞陷阱**：having 不能加 to，也不能加 s，形式固定。",
      "**主詞陷阱**：動名詞片語當主詞時，後面用 is 而不是 are，並且不能漏掉 be 動詞。",
      "**介系詞搭配陷阱**：give up、be used to、be good at 後面一律接 V-ing。",
      "**時態陷阱**：談習慣時還是用一般現在式，不要隨意改成 having had。"
    ],
    "strategy": [
      "分清楚三種非謂語形式：to have（目的）、having（進行或主語）、have（受詞），依位置決定。",
      "把 give up doing、be used to doing、be good at doing 這組搭配整理成一頁，背起來。",
      "作主語的片語後面一律加 is，先寫出 is 再回頭檢查有沒有漏。",
      "唸出 having three cups of coffee a day，體會它是「一整件事」而非一個動作單位。",
      "做完題問自己：這裡是名詞還是動作？名詞就要有 be 動詞或介系詞。"
    ]
  },
  "health": {
    "zh": "健康",
    "ipa": "helθ",
    "intro": "針對您提供的單字 **health**，這是一個單獨的單詞，本身不是句子。它是「健康」的意思，屬於不可數名詞，沒有複數、也不能直接加 a 或 an；同時要分清楚它是名詞，對應的形容詞是 healthy。",
    "headline": "health 是名詞，對應形容詞 healthy",
    "structure": [
      {
        "role": "單字",
        "token": "health",
        "pos": "名詞 (Noun) — 不可數名詞 (Uncountable Noun)",
        "func": "指「健康」這件事或健康狀態，沒有複數、前面不加 a／an；要修飾名詞時用形容詞 healthy",
        "mark": "O"
      },
      {
        "role": "詞性對照",
        "token": "health",
        "pos": "名詞 (Noun) ↔ healthy (形容詞)",
        "func": "health 放在 be 動詞後面或介系詞後面；healthy 用來修飾人或描述身體狀態",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤：helth、helt h 漏字母",
        "bad": "(X) **Helth** is more important than money. ／ (X) I care about my **helthy**.",
        "ok": "(O) **Health** is more important than money.",
        "why": "health 的拼法是 h‑e‑a‑l‑t‑h，前面有 ea 兩個母音字母，結尾是 lth。學生常漏掉 ea 變成 helth，或把 th 順序顛倒。判斷法：把單字分成 heal‑th 兩塊，heal 記得先有 ea，th 順序固定寫在最後。",
        "exOkText": "(O) **Health** is the first thing we should take care of.",
        "exOkZh": "健康是我們首先該照顧的事。",
        "exBadText": "(X) **Helth** is the first thing we should take care of.",
        "exBadNote": "錯誤：漏掉字母 e，拼成 helth。"
      },
      {
        "title": "詞性轉換錯誤：health 與 healthy 混用",
        "bad": "(X) My father is **health**. ／ (X) She looks **health** today.",
        "ok": "(O) My father is **healthy**.",
        "why": "health 是名詞，描述某種狀態；healthy 是形容詞，描述人或身體的狀況。說某人很健康要用 healthy，不能用 health。學生常忽略名詞與形容詞的差別。判斷法：空格前面是 be 動詞或名詞，後面要接一個「狀態」，就要換成形容詞 healthy。",
        "exOkText": "(O) Eating vegetables keeps you **healthy**.",
        "exOkZh": "吃蔬菜讓你保持健康。",
        "exBadText": "(X) Eating vegetables keeps you **health**.",
        "exBadNote": "錯誤：keeps 後面接形容詞 healthy，不是名詞 health。"
      },
      {
        "title": "不可數名詞誤用：加冠詞或複數",
        "bad": "(X) She has **a health** problem. ／ (X) Drinking more water is good for your **healths**.",
        "ok": "(O) She has **a health** problem. ／ (O) Drinking more water is good for your **health**.",
        "why": "health 作為整體的健康狀態時是不可數名詞，不能寫 healths；前面加 a 只在 health problem、health care 這類複合詞中才成立，單獨的 health 不能加冠詞。判斷法：前面是 your、our、his 這類所有格時，後面直接接 health，不加 s 也不加 the。",
        "exOkText": "(O) **Good health** is more important than money.",
        "exOkZh": "健康比錢更重要。",
        "exBadText": "(X) **Good healths** are more important than money.",
        "exBadNote": "錯誤：health 是不可數名詞，不可加 s。"
      },
      {
        "title": "固定搭配錯誤：keep healthy 與 in good health",
        "bad": "(X) We should keep **health**. ／ (X) She stays in **a good health**.",
        "ok": "(O) We should keep **healthy**.",
        "why": "health 作為名詞時，前面若接 keep、stay、be，常用 in good health（不加冠詞）；若要修飾 keep 後的狀態，則用形容詞 healthy，中間什麼都不加。寫成 keep health 會讓人讀不出是什麼意思。判斷法：keep 後面接的是「狀態」而非事物，所以用 healthy；be／stay 後面才用 in good health。",
        "exOkText": "(O) **Keeping in good health** takes effort.",
        "exOkZh": "保持健康需要努力。",
        "exBadText": "(X) She stays in **a good health**.",
        "exBadNote": "錯誤：in good health 是固定搭配，中間不加冠詞 a。"
      }
    ],
    "traps": [
      "**不可數名詞陷阱**：health 沒有複數，不能寫 healths。",
      "**詞性陷阱**：health 是名詞，描述人的狀態要用 healthy，這是會考常見的詞性轉換題。",
      "**拼字陷阱**：health 有 ea 也有 lth，少一個字母就錯。",
      "**搭配陷阱**：in good health 前面不加冠詞；keep healthy 後面不加 anything。"
    ],
    "strategy": [
      "把 health、healthy、healthily 三個形狀一起背，寫句子時自然會選對詞性。",
      "遇到名詞先判斷是否可數，不可數就別加 s，也別隨便加 a。",
      "整理健康相關的固定搭配：in good health、keep healthy、take care of、be bad for。",
      "拼字把單字分塊記：heal-th，寫完再回頭檢查有沒有漏字母。",
      "朗讀 health 時注意 /θ/ 咬舌音，把舌尖輕放在上下牙之間。"
    ]
  },
  "our health": {
    "zh": "我們的健康",
    "ipa": "ˈaʊ.ɚ helθ",
    "intro": "針對您提供的片語 **our health**，這是一個名詞片語，還不能單獨成句，必須搭配動詞或 be 動詞使用。our 是所有格形容詞，表示「我們的」，後面一定要緊接名詞；health 是不可數名詞，不加複數也不加冠詞。",
    "headline": "our 後面一定要接名詞，不可單獨用",
    "structure": [
      {
        "role": "所有格形容詞",
        "token": "our",
        "pos": "所有格形容詞 (Possessive Adjective)",
        "func": "表示「我們的」，後面一定要接名詞；它本身不能單獨使用，也不能加 -s 變成 our's",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "health",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "被 our 修飾，表示「我們的健康」；前面已有 our，所以不再加 a／an，後面也不加 s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "人稱代詞誤用：our 不可寫成 we 或 us",
        "bad": "(X) **We** health is very good. ／ (X) **Us** health is very important.",
        "ok": "(O) **Our** health is very important.",
        "why": "our 是所有格形容詞，專門用來修飾後面的名詞；we 是主格（我們），us 是賓格（我們），兩者都不能直接接名詞。要表示「我們的健康」一定要用 our。判斷法：看到名詞前缺一個「……的」，就填 our／your／his／their 這類所有格形容詞。",
        "exOkText": "(O) **Our** health is the most important thing.",
        "exOkZh": "我們的健康是最重要的事。",
        "exBadText": "(X) **We** health is the most important thing.",
        "exBadNote": "錯誤：we 不能修飾名詞，應改用所有格形容詞 our。"
      },
      {
        "title": "所有格詞尾誤加：our’s 是不存在的寫法",
        "bad": "(X) **Our’s** health is important. ／ (X) The doctor cares about **our’s** health.",
        "ok": "(O) **Our** health is important.",
        "why": "ours 是所有格代詞，本身已經含有「我們的」的意思，可以單獨使用，後面不能再接名詞，更不能寫成 our's。這個撇號加 s 是中文母語者最常見的錯誤。判斷法：修飾名詞用 our，單獨使用才用 ours，兩者不能加 's。",
        "exOkText": "(O) This book is **ours**.",
        "exOkZh": "這本書是我們的。",
        "exBadText": "(X) This book is **our’s**.",
        "exBadNote": "錯誤：所有格代詞是 ours，不能寫成 our's。"
      },
      {
        "title": "語序錯誤：所有格形容詞必須緊接名詞",
        "bad": "(X) Our is very good **health**. ／ (X) **Health our** is very good.",
        "ok": "(O) **Our health** is very good.",
        "why": "所有格形容詞在英文中只能放在名詞前面，形成「our + 名詞」的固定組合，不能拆開，也不能放到名詞後面。中文的「我們的健康」順序剛好相反，學生翻譯時常把 our 放到最後。判斷法：寫完先檢查 our 有沒有立刻接在 health 前面，沒有就是語序錯了。",
        "exOkText": "(O) **Our health** depends on good habits.",
        "exOkZh": "我們的健康取決於良好的習慣。",
        "exBadText": "(X) **Health our** depends on good habits.",
        "exBadNote": "錯誤：所有格形容詞 our 不能放在名詞後面。"
      },
      {
        "title": "發音錯誤：our 的弱讀與連讀",
        "bad": "(X) I read our as **/ˈaʊər/** with a strong r. ／ (X) I read our as **/aʊ/**.",
        "ok": "(O) I read our as **/ˈaʊ.ɚ/**, with a weak r.",
        "why": "在美式英語中 our 讀 /ˈaʊ.ɚ/，結尾的 r 是弱化音，舌位不一定要真的捲起；英式則常讀 /ˈaʊə/ 或與 hour 同音。學生若把 r 唸得很重，或唸成 hour，容易聽不出來。判斷法：our 是一個音節、兩個音素，一口气唸完，不要在中間停頓。",
        "exOkText": "(O) **Our health** matters a lot to everyone.",
        "exOkZh": "我們的健康對每個人都很重要。",
        "exBadText": "(X) I read **our** as the same word as **hour**.",
        "exBadNote": "錯誤：our 在美式發音中結尾是弱化 r，聽感不同於 hour。"
      }
    ],
    "traps": [
      "**所有格詞尾陷阱**：our 修飾名詞時不能加 's，ours 才是可單獨使用的代詞。",
      "**人稱代詞陷阱**：we、us 是代詞，不能直接修飾名詞。",
      "**語序陷阱**：所有格形容詞永遠在名詞前面，寫完立刻檢查。",
      "**單複數陷阱**：health 不可數，前面有 our 之後更不需要加冠詞。"
    ],
    "strategy": [
      "把 our／ours、your／yours、their／theirs 整理成對照表，一起背效率最高。",
      "寫名詞片語時先用中文想好「誰的 + 什麼」，再依序填入所有格形容詞與名詞。",
      "複習 health 是不可數名詞，前有所有格時不加 a、不加 s。",
      "唸 our health 兩次，特別注意 r 的弱化與重音在第一音節。",
      "做完題檢查所有格形容詞有沒有「落單」後面沒接名詞。"
    ]
  },
  "for our health": {
    "zh": "對我們的健康",
    "ipa": "fɚ ˈaʊ.ɚ helθ",
    "intro": "針對您提供的片語 **for our health**，這是一個介系詞片語，不能單獨成句，必須放在形容詞、動詞或名詞後面作修飾。它表示「對我們的健康」，for 在這裡是「對、為了」的意思，後面接所有格形容詞 our 與不可數名詞 health。",
    "headline": "for 是「對」，後面接所有格片語",
    "structure": [
      {
        "role": "介系詞",
        "token": "for",
        "pos": "介系詞 (Preposition)",
        "func": "表示「對、為了」，後面接對象（健康、某人），是 bad for／good for 的固定搭配",
        "mark": "O"
      },
      {
        "role": "所有格形容詞",
        "token": "our",
        "pos": "所有格形容詞 (Possessive Adjective)",
        "func": "表示「我們的」，必須緊接名詞；不可寫成 our's，也不能單獨使用",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "health",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "被 our 修飾，作為 for 的受詞；前面已有 our，所以不加冠詞，後面也不加 s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞語意錯誤：for 不可換成 of",
        "bad": "(X) Coffee is not good **of** our health. ／ (X) I bought a cup **for** coffee at the café.",
        "ok": "(O) Coffee is not good **for** our health.",
        "why": "of 表示「……的」，屬於所有關係；for 表示「對、為了」，表示對象或目的。「對我們的健康有害」要用 for，用 of 會變成「我們健康的」，語意完全不同。學生常因中文「對」的語感而選錯。判斷法：of 後面一定是「某人的某物」，for 後面是「對象或目的」。",
        "exOkText": "(O) Exercise is good **for our health**.",
        "exOkZh": "運動對我們的健康有益。",
        "exBadText": "(X) Exercise is good **of our health**.",
        "exBadNote": "錯誤：of 是「……的」，對健康有益要用 for。"
      },
      {
        "title": "介系詞後接動詞要用動名詞",
        "bad": "(X) Walking is good **for keep** our health. ／ (X) He gave up **for drink** too much coffee.",
        "ok": "(O) Walking is good **for keeping** our health.",
        "why": "介系詞後面接動詞時，一律要用 V-ing 動名詞，不能用原形或不定式。for keep、for drink 都是把中文「為了保持、為了喝」直接翻譯的結果。判斷法：看到介系詞後面原本要放動詞，就改成 -ing 形式。",
        "exOkText": "(O) He stopped **for drinking** too much coffee.",
        "exOkZh": "他停止了喝過多咖啡的習慣。",
        "exBadText": "(X) He stopped **for drink** too much coffee.",
        "exBadNote": "錯誤：介系詞 for 後面的動詞要用動名詞 drinking。"
      },
      {
        "title": "冠詞誤用：所有格形容詞前不加 the",
        "bad": "(X) Coffee is not good **for the our** health. ／ (X) Walking is good **for the our** health.",
        "ok": "(O) Coffee is not good **for our** health.",
        "why": "our 已經是「我們的」，後面直接接 health 即可，中間不能再插入 the。類似的錯誤還有 our the health、the our health，都是重複使用冠詞。判斷法：our 前面若出現 the、a、this 等詞，就是多餘的，直接刪掉。",
        "exOkText": "(O) Fruit is good **for our health**.",
        "exOkZh": "水果對我們的健康有益。",
        "exBadText": "(X) Fruit is good **for the our health**.",
        "exBadNote": "錯誤：所有格形容詞 our 前面不可加定冠詞 the。"
      },
      {
        "title": "成分缺漏：介系詞片語不能單獨成句",
        "bad": "(X) **For our health**, and we drink more water. ／ (X) **For our health** is important.",
        "ok": "(O) **Keeping fit is important for our health**.",
        "why": "for our health 裡面只有介系詞與名詞，沒有主詞與動詞，不能獨立成句，也不能用 and 接在後面。學生在翻譯「為了健康」時容易直接照搬。判斷法：寫完後問「誰做了什麼」，如果只有這串介系詞片語，就是還缺主詞與動詞。",
        "exOkText": "(O) We need to eat more vegetables **for our health**.",
        "exOkZh": "為了健康，我們需要多吃蔬菜。",
        "exBadText": "(X) **For our health** and we need more vegetables.",
        "exBadNote": "錯誤：缺主詞與動詞，且用 and 連接片段。"
      }
    ],
    "traps": [
      "**for 與 of 的陷阱**：for 是「對、為了」，of 是「……的」，兩者絕不能互換。",
      "**介系詞加動名詞的陷阱**：for 後面接動詞要變 -ing，不能用原形。",
      "**冠詞陷阱**：our 前面不再加 the，避免重複修飾。",
      "**成分陷阱**：介系詞片語不能單獨成句，必須依附在動詞或名詞後面。"
    ],
    "strategy": [
      "整理 for 的三種用法：為了（目的）、對……（對象）、代替（替代），依語境判斷。",
      "把 for 與 of 的差別做成對照例句，寫作練習時特別檢查這兩個介系詞。",
      "介系詞後要接動詞時，直接在腦中補上 -ing。",
      "寫完片語先確認 our 有沒有接上 health，兩者不能分開。",
      "翻譯題對照中文的「對」與「的」，分別對應 for 與 of。"
    ]
  },
  "bad for our health": {
    "zh": "對我們的健康有害",
    "ipa": "bæd fɚ ˈaʊ.ɚ helθ",
    "intro": "針對您提供的片語 **bad for our health**，這是一個「形容詞 + 介系詞片語」的組合，本身還不能單獨成句，必須有主詞與 be 動詞或一般動詞才完整。它表示「對我們的健康有害」，重點在 bad 修飾後面的 for our health，不能用副詞 badly 代替。",
    "headline": "bad 修飾後面整串，要用形容詞不用副詞",
    "structure": [
      {
        "role": "形容詞",
        "token": "bad",
        "pos": "形容詞 (Adjective)",
        "func": "表示「壞的、有害的」，用來修飾後面的 for our health，而不是修飾動詞",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "for",
        "pos": "介系詞 (Preposition)",
        "func": "表示「對」，後面接對象 our health；bad for… 是固定搭配，介系詞不可更換",
        "mark": "O"
      },
      {
        "role": "所有格形容詞",
        "token": "our",
        "pos": "所有格形容詞 (Possessive Adjective)",
        "func": "表示「我們的」，必須緊接名詞，不可寫成 our's 或 our the",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "health",
        "pos": "名詞 (Noun) — 不可數名詞",
        "func": "作為 for 的受詞，表示「我們的健康」；前面已有 our，不加冠詞也不加 s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "be 動詞缺漏：片語不能單獨成句",
        "bad": "(X) **Bad** for our health. ／ (X) Too much sugar **bad** for our health.",
        "ok": "(O) Too much sugar **is bad** for our health.",
        "why": "bad for our health 只是一個片語，裡面沒有動詞，必須靠 be 動詞（is／are）或一般動詞（如 hurts）撐起整句。漏掉 is，讀起來就不成句。學生在翻譯短句時最容易犯這個錯。判斷法：寫完一句問「是什麼？」，那前面就要補 is 或 are。",
        "exOkText": "(O) Drinking too much coffee **is bad** for our health.",
        "exOkZh": "喝太多咖啡對我們的健康有害。",
        "exBadText": "(X) Drinking too much coffee **bad** for our health.",
        "exBadNote": "錯誤：主詞與形容詞之間少了 be 動詞 is。"
      },
      {
        "title": "介系詞搭配錯誤：bad for 不可改成 bad to 或 bad on",
        "bad": "(X) Too much sugar is bad **to** our health. ／ (X) Too much sugar is bad **on** our health.",
        "ok": "(O) Too much sugar is bad **for** our health.",
        "why": "bad for… 是固定搭配，表示「對……有害」，介系詞只能用 for。to 是「到、對某人口氣」，用在健康上語意不成立；on 是「在上面」，用在健康上則是中文直譯。判斷法：背熟三個固定句型 good for、bad for、good to somebody。",
        "exOkText": "(O) Smoking is bad **for your health**.",
        "exOkZh": "抽菸對你的健康有害。",
        "exBadText": "(X) Smoking is bad **to your health**.",
        "exBadNote": "錯誤：對健康有害要用 bad for，不是 bad to。"
      },
      {
        "title": "形容詞與副詞混淆：修飾動詞不能用 bad",
        "bad": "(X) He **bad** sleeps every night. ／ (X) She **bad** drinks coffee before bed.",
        "ok": "(O) He **sleeps badly** every night.",
        "why": "bad 是形容詞，只能修飾名詞或放在 be 動詞後面；若要修飾動詞 slept、drinks，就必須用副詞 badly。學生常混淆這兩種詞性，會考選擇題常常把 bad 與 badly 放在一起考。判斷法：看空格後面接的是名詞還是動詞，接動詞就選 -ly。",
        "exOkText": "(O) He **sleeps badly** and feels tired in the morning.",
        "exOkZh": "他睡得很不好，早上總是很累。",
        "exBadText": "(X) He **bad sleeps** and feels tired in the morning.",
        "exBadNote": "錯誤：bad 是形容詞，修飾動詞要用副詞 badly。"
      },
      {
        "title": "語序錯誤：形容詞不可放在介系詞片語之後",
        "bad": "(X) Too much sugar is **for our health bad**. ／ (X) Too much sugar is **bad for health our**.",
        "ok": "(O) Too much sugar is **bad for our health**.",
        "why": "英文的語序是「主詞 + be 動詞 + 形容詞 + 介系詞片語」，形容詞一定在介系詞片語前面。中文「對我們的健康有害」的順序剛好相反，學生翻譯時常把 bad 放到最後。判斷法：寫完檢查 be 動詞後面是不是形容詞先出現，是就對了。",
        "exOkText": "(O) Fast food is **bad for our health**.",
        "exOkZh": "速食對我們的健康有害。",
        "exBadText": "(X) Fast food is **for our health bad**.",
        "exBadNote": "錯誤：形容詞應放在介系詞片語之前。"
      }
    ],
    "traps": [
      "**be 動詞陷阱**：bad for… 是片語，缺了 is／are 就不能成句。",
      "**介系詞陷阱**：bad for 是固定搭配，不能改成 bad to 或 bad on。",
      "**詞性陷阱**：bad 是形容詞，修飾動詞時要改成副詞 badly。",
      "**語序陷阱**：形容詞要在介系詞片語之前，順序是「be + bad + for our health」。"
    ],
    "strategy": [
      "背熟健康主題的固定搭配：be good for、be bad for、keep in good health、take care of。",
      "寫完句子檢查三個位置：be 動詞在不在、介系詞對不對、形容詞位置對不對。",
      "bad 與 badly 分開整理，練習時各寫三個例句加深區別。",
      "翻譯時把中文的「對」對應到 for，把「有害」對應到 bad，順序自然就對了。",
      "遇到 our 立刻檢查後面是否接名詞，our 前面是否有多餘的 the。"
    ]
  },
  "be bad for our health": {
    "zh": "對我們的健康有害",
    "ipa": "bi bæd fɚ ˈaʊ.ɚ helθ",
    "intro": "針對您提供的英文片語 **(O) be bad for our health**，這是一個不能單獨成句的片語，必須放在主詞之後、和別的成分一起使用才有完整句子。整個片語由「be 動詞 + 形容詞 + 介系詞片語」三段構成，最該注意的是 bad 後面固定接 for，以及 health 是不可數名詞、不能加 s。",
    "headline": "bad 後固定接 for；health 不可數",
    "structure": [
      {
        "role": "動詞",
        "token": "be",
        "pos": "be 動詞 (Linking Verb) — 是／有",
        "func": "連接主詞和後面的性質描述，後面一定要接形容詞，不能接副詞",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "bad",
        "pos": "形容詞 (Adjective)",
        "func": "描述主詞的狀況「有害的」；因為緊接在 be 動詞後面，所以必須用形容詞",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "for",
        "pos": "介系詞 (Preposition)",
        "func": "bad for 是固定搭配，表示「對……有害」，後面接受詞",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "our health",
        "pos": "所有格代詞 (Possessive Pronoun) + 不可數名詞 (Uncountable Noun)",
        "func": "for 的對象，「我們的健康」；health 不可數，前面不加 the、不加 s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "單字拼寫錯誤：health 漏字母",
        "bad": "(X) Smoking is bad for our **helth**. ／ (X) Junk food is bad for our **healt**.",
        "ok": "(O) Smoking is bad for our **health**.",
        "why": "health 由 h-e-a-l-t-h 六個字母組成，a 在第二個位置，國中生最常見的錯法就是把這個 a 漏掉寫成 helth，或把最後的 th 少寫一個變成 healt。為什麼對：health 是可背、可默寫的基礎單字，只要把字形固定下來就不會錯。判斷法：把它記成「**heal（治愈）+ th（抽象名詞的常見結尾）**」兩塊，寫完後回頭數一次是不是六個字母，a 有沒有出現。",
        "exOkText": "(O) **Smoking** is bad for our **health**.",
        "exOkZh": "抽菸對我們的健康有害。",
        "exBadText": "(X) **Smoking** is bad for our **helth**.",
        "exBadNote": "錯誤：health 少了一個 a，拼成 helth"
      },
      {
        "title": "介系詞搭配錯誤：for 誤用為 of",
        "bad": "(X) Smoking is bad **of** our health. ／ (X) Drinking is bad **to** our health.",
        "ok": "(O) Smoking is bad **for** our health.",
        "why": "「對……有害」英文固定說 bad for …。of 是「……的」，to 是「朝著、對某個人」（bad to somebody 是「對某人不友善」，後面接人）。學生受中文「對健康有害」影響，容易憑空把 for 寫成 of。判斷法：**對身體有害 → for；對人不友善 → to somebody**。兩個介系詞換了，句意就整個改掉，會考選項常把兩者放在一起考。",
        "exOkText": "(O) Eating too much sugar is bad **for our health**.",
        "exOkZh": "吃太多糖對我們的健康有害。",
        "exBadText": "(X) Eating too much sugar is bad **of our health**.",
        "exBadNote": "錯誤：對健康有害的固定搭配是 bad for，不是 bad of"
      },
      {
        "title": "形容詞與副詞混淆：bad 誤用成 badly",
        "bad": "(X) Smoking is **badly** for our health.",
        "ok": "(O) Smoking is **bad** for our health.",
        "why": "be 動詞後面一定接**形容詞**，用來說明「是怎樣」；副詞 badly 用來修飾**動詞**（He speaks badly.）。這句的動詞是 be，後面的內容在描述狀態，所以只能用 bad。學生常因中文「對健康很不好」而直接在鍵盤上打出 badly。判斷法：**be 動詞後面 → 形容詞；實義動詞後面 → 副詞**。而且 badly 後面緊接 for（介系詞），語意根本接不起來。",
        "exOkText": "(O) The weather is **bad** for our health today.",
        "exOkZh": "今天的天氣對我們的健康不好。",
        "exBadText": "(X) The weather is **badly** for our health today.",
        "exBadNote": "錯誤：be 動詞 is 後面要用形容詞 bad，不能用副詞 badly"
      },
      {
        "title": "片語不能單獨成句：be 動詞被省略",
        "bad": "(X) **Smoking** bad for our health.",
        "ok": "(O) **Smoking is** bad for our health.",
        "why": "be bad for our health 是「be 動詞 + 形容詞 + 介系詞片語」的片語，**不能自己獨立成句**。要成句就必須補上主詞，而且 be 動詞絕對不能省。中文可以說「抽菸對健康有害」省略動詞，英文卻不行。判斷法：寫完後用手指從頭到尾點一次，**第一個字必須是名詞或動名詞，第二個字一定要是 be 動詞**，少一個就是錯。",
        "exOkText": "(O) **Eating too much meat is** bad for our health.",
        "exOkZh": "吃太多肉對我們的健康有害。",
        "exBadText": "(X) **Eating too much meat** bad for our health.",
        "exBadNote": "錯誤：省略了 be 動詞 is，片語不能單獨成句"
      }
    ],
    "traps": [
      "**bad for 與 bad to 的陷阱**：(O) bad for health（對健康有害）後接事物；(O) bad to sb（對某人不客氣）後接人。會考常把兩者放進同一題，看你分不分得出。",
      "**不可數名詞的陷阱**：(O) health 是不可數名詞，不能加 s、不能加 the、也不能用 a。看到 healths 或 a health 一律排除。",
      "**be 動詞不能省的陷阱**：(O) be bad for … 是片語，只要缺了 be 動詞整句就不通。克漏字常在這裡挖空設陷阱。",
      "**our 不能加 -'s 的陷阱**：(O) our 是所有格代詞，後面接名詞就是「我們的○○」，不能再寫成 our's health。"
    ],
    "strategy": [
      "整句背誦：把 (O) Smoking is bad for our health. 當成一個模範句整句背，之後任何「某行為 + is bad for our health」都套得上。",
      "套句型公式：主詞（名詞或動名詞）+ **be 動詞** + bad + **for** + our health，五個位置缺一不可，考試時逐格檢查。",
      "分類記憶：把 health 放進不可數名詞清單（water、rice、money、news、coffee），看到 a 或複數就立刻刪掉。",
      "be 動詞不省略：寫完英文句子，用筆在動詞的位置畫一個圈，確認有沒有被吃掉。",
      "中英對照：中文常省略 be 動詞，英文不能。翻譯時先把中文還原成完整句，再對照英文檢查。"
    ]
  },
  "can't be bad for our health": {
    "zh": "不可能對我們的健康有害",
    "ipa": "kænt bi bæd fɚ ˈaʊ.ɚ helθ",
    "intro": "針對您提供的英文片語 **(O) can't be bad for our health**，這同樣是一個不能單獨成句的片語，前面多了一個情態動詞 can't。這個片語的語氣非常肯定——不是「沒有很糟」，而是「一定不可能有害」。最該注意的是 can't 的縮寫形式、情態動詞後面不能再加 to，以及否定詞不能重複。",
    "headline": "can't 後接原形 be，不可加 to",
    "structure": [
      {
        "role": "情態動詞",
        "token": "can't",
        "pos": "情態動詞 (Modal Verb) — can 的否定縮寫",
        "func": "表達強烈的否定與推測「不可能」；後面一律接動詞原形",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "be",
        "pos": "動詞原形 (Bare Infinitive) — be 動詞",
        "func": "接在情態動詞後面，必須保持原形，不能變成 is / was / to be",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "bad",
        "pos": "形容詞 (Adjective)",
        "func": "be 後面接形容詞；與前面的 can't 形成「不可能有害」的語意",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "for our health",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "for 引出對象「對我們的健康」，放在最後收尾",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "縮寫形式與拼寫錯誤：can't 寫法",
        "bad": "(X) **Cound't** be bad for our health. ／ (X) **Cant** be bad for our health.",
        "ok": "(O) **Can't** be bad for our health.",
        "why": "can't 是 can + not 的縮寫，標準寫法是 **can + 撇號 + t**，中間的 n 絕對不能漏，也不能多加一個 d 變成 cound't（那是 could 的音）。另外因為 can't 修飾整句，位於句首時第一個字母必須大寫成 Can't。判斷法：寫完 can't 回頭檢查兩件事——**有沒有撇號**、**n 有沒有被吃掉**。",
        "exOkText": "(O) That's fine. **It can't** be bad for our health.",
        "exOkZh": "沒關係，那不可能對我們的健康有害。",
        "exBadText": "(X) It **cound't** be bad for our health.",
        "exBadNote": "錯誤：can't 拼成 cound't（多了 d），中間的 n 與撇號也沒寫對"
      },
      {
        "title": "情態動詞後誤加不定詞 to",
        "bad": "(X) It **can't to be** bad for our health.",
        "ok": "(O) It **can't be** bad for our health.",
        "why": "can / can't / should / must 這類情態動詞，後面**直接接動詞原形**，中間不能再加 to：can + be，不能寫成 can to be。這是會考克漏字的固定陷阱。判斷法：看到 can、should、must 後面只寫**一個動詞**就結束；學生常受 want to 的 to 影響而多加一個字。",
        "exOkText": "(O) You **can't use** my bike today.",
        "exOkZh": "你今天不能用我的腳踏車。",
        "exBadText": "(X) You **can't to use** my bike today.",
        "exBadNote": "錯誤：情態動詞 can't 後面不能加 to，要直接接原形 use"
      },
      {
        "title": "重複否定：can't 後面又加 not",
        "bad": "(X) It **can't not** be bad for our health.",
        "ok": "(O) It **can't be** bad for our health.",
        "why": "can't 本身就已經是否定，後面再加 not 就變成「不可能不有害」，語意整個反轉成「一定有害」，與原意正好相反。這種錯誤多半是學生想加重語氣，或混淆了 **can't（不可能）**和 **must not（不可以）**。判斷法：一個句子裡**只能有一個否定詞**。要說「不可以」用 must not 或 don't，要說「不可能」用 can't，兩者擇一。",
        "exOkText": "(O) Drinking soda **can't be** good for you.",
        "exOkZh": "喝汽水不可能對你有好處。",
        "exBadText": "(X) Drinking soda **can't not be** good for you.",
        "exBadNote": "錯誤：can't 與 not 重複否定，語意變成「一定會對你有好處」"
      },
      {
        "title": "陳述句主詞被省略",
        "bad": "(X) **Can't** be bad for our health.",
        "ok": "(O) **It** can't be bad for our health.",
        "why": "中文的「不可能對健康有害」可以省略主詞，英文的陳述句**一定要有主詞**，而且主詞要放在 can't 前面。最常見的主詞是 it（指前面提過的那件事）。判斷法：寫完英文後圈出**第一個字**，它必須是名詞、代詞（I / you / it / they）或動名詞；如果第一個字是 can、can't 這類情態動詞，就表示你漏寫主詞了。",
        "exOkText": "(O) **It** can't be bad for our health; it tastes great.",
        "exOkZh": "那不可能對我們的健康有害；它很好喝。",
        "exBadText": "(X) Can't be bad for our health; it tastes great.",
        "exBadNote": "錯誤：英文陳述句不能省略主詞，前面要補上 it"
      }
    ],
    "traps": [
      "**can't 語意的陷阱**：(O) can't be bad 是「不可能有害」，語氣非常肯定，等於「一定還不錯」，**不是**「很不健康」。閱讀測驗常拿它設題，看你是否能理解這層反轉。",
      "**情態動詞後不加 to 的陷阱**：can / should / must 後面接動詞原形。選項若出現 can to be、should to go 之類的寫法，一律排除。",
      "**撇號的陷阱**：can't 要有撇號，its（它的）要有撇號，it's（它是）也要有撇號。會考選擇題常以 cound't、cant's、its 混用來考。",
      "**our health 的不可數陷阱**：(O) health 不能加 s 或 the，這個錯誤會直接破壞整句的結構。"
    ],
    "strategy": [
      "記成句型公式：主詞（it / something）+ can't + **be 原形** + bad + for + our health，寫作時逐格填。",
      "理解 can't be bad 的邏輯：can't 表示 100% 不可能，所以 bad 被排除，剩下的是「一定不錯」。做閱讀題時把這句翻成「那一定還不錯」再看答案。",
      "縮寫三檢查：寫完 can't 後回頭看（1）有沒有撇號（2）t 前面的 n 在不在（3）句首有沒有大寫。",
      "整理情態動詞家族：can / could / should / must / may / might 後面一律接原形，這是會考萬用規則。",
      "避免否定堆疊：寫句子時把 not、never、can't 用不同顏色圈出來，超過一個就停下來重寫。"
    ]
  },
  "having three cups of coffee a day can't be bad for our health": {
    "zh": "一天喝三杯咖啡不可能對我們的健康有害",
    "ipa": "ˈhæv.ɪŋ θriː kʌps əv ˈkɑː.fi ə deɪ kænt bi bæd fɚ ˈaʊ.ɚ helθ",
    "intro": "針對您提供的英文句子 **(O) having three cups of coffee a day can't be bad for our health**，這是一個以動名詞作主語的完整句子，語意是「每天喝三杯咖啡，不可能對健康有害」。全句最該注意的，是主語必須用 -ing 動名詞 having，以及 three cups of、coffee 這些數量與不可數名詞的用法。",
    "headline": "動名詞當主語，coffee 不可加 s",
    "structure": [
      {
        "role": "主語（動名詞片語）",
        "token": "having three cups of coffee a day",
        "pos": "動名詞 (Gerund) — have 的 -ing 形式 + 名詞片語",
        "func": "整個 -ing 片語當主語，把「喝三杯咖啡」當成一件事來看",
        "mark": "O"
      },
      {
        "role": "數詞",
        "token": "three",
        "pos": "基數詞 (Cardinal Number)",
        "func": "修飾後面的量詞，表示數量三",
        "mark": "O"
      },
      {
        "role": "量詞",
        "token": "cups",
        "pos": "複數名詞 (Plural Noun) — cup 的複數",
        "func": "盛裝用的容器；three 之後一定要用複數",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "構成「量詞 + of + 內容物」，表示 cups 裡裝的是 coffee",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "coffee",
        "pos": "不可數名詞 (Uncountable Noun)",
        "func": "of 的受詞「咖啡」；不可數，不能加 s，前面也不直接加數字",
        "mark": "O"
      },
      {
        "role": "時間片語",
        "token": "a day",
        "pos": "時間片語 (Time Phrase)",
        "func": "表示頻率「一天」，緊接在主語之後，說明一天喝三杯",
        "mark": "O"
      },
      {
        "role": "謂語",
        "token": "can't be bad for our health",
        "pos": "情態動詞 can't + be 動詞 + 形容詞 + 介系詞片語",
        "func": "整句的動詞部分，對前面的動名詞主語作否定推測",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主語形式錯誤：動名詞誤用成不定詞",
        "bad": "(X) **To have** three cups of coffee a day can't be bad for our health.",
        "ok": "(O) **Having** three cups of coffee a day can't be bad for our health.",
        "why": "這裡的 having 意思是「喝三杯咖啡這件事」，它是一個**名詞化的動作**，要放在主語位置。英文規定一個句子只能有一個動詞：既然 can't be 已經是動詞，主語就不能再用不定詞 To have，否則會出現兩個動詞。判斷法：句子開頭若接的是一個動作，而且後面還有別的動詞，主語就一定要用 **-ing 動名詞**。",
        "exOkText": "(O) **Getting** up at six every morning is not easy.",
        "exOkZh": "每天早上六點起床並不容易。",
        "exBadText": "(X) **To get** up at six every morning is not easy.",
        "exBadNote": "錯誤：主語位置只能用動名詞 Getting，不能用不定詞 To get"
      },
      {
        "title": "量詞與名詞的單複數錯誤",
        "bad": "(X) Having three **cup** of coffee a day can't be bad for our health.",
        "ok": "(O) Having three **cups** of coffee a day can't be bad for our health.",
        "why": "three 是數字，後面的名詞一定要用**複數**：cup → cups。英文的規則是「數字 + 複數名詞」，除非那個名詞本身不可數（three days、three cups、three pieces of water）。學生常看到 cup 就想到單杯的印象而直接寫單數。判斷法：**看到 one 到 nine 的數字，後面的可數名詞一律加 s**。",
        "exOkText": "(O) He drinks **three cups of tea** every morning.",
        "exOkZh": "他每天早上喝三杯 tea。",
        "exBadText": "(X) He drinks **three cup of tea** every morning.",
        "exBadNote": "錯誤：three 後面的可數名詞 cup 要用複數 cups"
      },
      {
        "title": "不可數名詞誤加複數 s",
        "bad": "(X) Having three cups of **coffees** a day can't be bad for our health.",
        "ok": "(O) Having three cups of **coffee** a day can't be bad for our health.",
        "why": "coffee 是**不可數名詞**，和 water、rice、money、health 一樣沒有複數形式。學生常因為前面已經有 cups，覺得整個片語都要複數，於是連 coffee 也加上 s。判斷法：可數才有複數。判斷一個詞能不能數，就問一句「two ___ 講不講得通？」two coffees 講不通，two cups of coffee 才通。",
        "exOkText": "(O) Two **pieces of** bread and three cups of **water** are on the table.",
        "exOkZh": "桌上放著兩片麵包和三杯水。",
        "exBadText": "(X) Two **breads** and three cups of **waters** are on the table.",
        "exBadNote": "錯誤：bread、water 都是不可數名詞，不能加 s"
      },
      {
        "title": "介系詞搭配錯誤：of 誤用為 for / with",
        "bad": "(X) Having three cups **for** coffee a day can't be bad for our health. ／ (X) Having three cups **with** coffee a day...",
        "ok": "(O) Having three cups **of** coffee a day can't be bad for our health.",
        "why": "「一杯（某物）」的量詞片語固定是 **a cup of / three cups of + 物**，of 表示「裝的是」；for 是「為了、給」，with 是「帶著、含有」，放這裡都接不起來。學生常憑中文「三杯咖啡的」直覺選錯介系詞。判斷法：名詞 + of + 名詞 構成「單位 + 內容物」；看到 cup、piece、bottle、glass，後面一律接 **of**。",
        "exOkText": "(O) I bought two **bottles of** milk this morning.",
        "exOkZh": "我今天早上買了兩瓶牛奶。",
        "exBadText": "(X) I bought two **bottles for** milk this morning.",
        "exBadNote": "錯誤：bottles of milk 的固定搭配是 of，不是 for"
      }
    ],
    "traps": [
      "**動名詞當主語的陷阱**：一句話只能有一個動詞。句首的 -ing 是「動作當名詞」，後面若還有動詞，主語就必須是 -ing，不能用 to do。會考常拿 To have／Having 對照出題。",
      "**量詞 + of + 不可數名詞的陷阱**：(O) three cups **of** coffee、(O) a piece **of** bread。of 不能漏，coffee 也不能加 s，這兩點會一起考。",
      "**a day 位置別移動**：(O) a day 在這裡是修飾主語的頻率片語，緊接在 having … 之後。寫成 having three cups of coffee day a 就不成立。",
      "**不可數名詞清單**：water、rice、money、news、health、coffee、bread、information 都不能加 s，看見加 s 的選項直接排除。"
    ],
    "strategy": [
      "套句型公式：Having + 數量 + 量詞（複數）+ of + 不可數名詞 + a day + 謂語，寫作時逐格對照，缺一格就是錯。",
      "一規則管到底：數字後接可數名詞用複數，數字後接不可數名詞要加 of 單位（三 cups **of** water）。",
      "背一份不可數名詞清單，並搭配 a piece of、a glass of、a cup of 等單位詞一起記。",
      "寫完立刻檢查有幾個動詞：用不同顏色圈出所有動詞（含 -ing 形式），數一數應該只有一個主要動詞。",
      "克漏字作答時先標題號：把空格編號，依序判斷空格要的是單數、複數、of、還是一個字母，錯誤率會大幅下降。"
    ]
  },
  "hand": {
    "zh": "手",
    "ipa": "hænd",
    "intro": "針對您提供的英文單字 **(O) hand**，這是一個單獨的詞，還不是完整的句子。文法上它是**可數名詞**（手），也可以是**動詞**（傳遞）。最該注意的是泛指雙手時要用複數 hands，以及它和 hung、handed 之間的變化差別。",
    "headline": "可數名詞，泛指用 hands",
    "structure": [
      {
        "role": "詞條（名詞）",
        "token": "hand",
        "pos": "可數名詞 (Countable Noun)",
        "func": "指「手」，可數、有單複數；泛指雙手時要寫 hands",
        "mark": "O"
      },
      {
        "role": "詞條（動詞）",
        "token": "hand",
        "pos": "動詞 (Verb) — 規則變化",
        "func": "作動詞表示「傳遞、遞給」，後面可接雙受詞：hand sb sth",
        "mark": "O"
      },
      {
        "role": "常用搭配",
        "token": "a hand / hands / one hand",
        "pos": "冠詞 + 單數 ／ 複數名詞 ／ 數量詞片語",
        "func": "說明使用場合：a one hand 泛指、the hand 指特定的那隻、hands 表示雙手",
        "mark": "O"
      },
      {
        "role": "動詞變化",
        "token": "hand → handed",
        "pos": "動詞 (Verb) — 過去式 / 過去分詞",
        "func": "hand 是規則動詞，加 -ed 即可，不是不規則變化",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "易混淆字辨識：hand 與 hung",
        "bad": "(X) She **hung** me the salt and sugar. ／ (X) Please **hang** me the book.",
        "ok": "(O) She **handed** me the salt and sugar. ／ (O) She **handed** me the book.",
        "why": "hand（手）和 hung（掛住）唸音幾乎一樣，差別只在最前面有沒有 /h/ 音和最後的 n。hung 是 hang 的過去式，意思是「懸掛」；hand 是「手」或「傳遞」。學生一聽到同樣的音就亂猜。判斷法：把單字**單獨唸出來**，hand 的音要完整出現 /hænd/；看到中文「掛」就用 hung，看到「手、遞給」就用 hand。",
        "exOkText": "(O) Please **hand** me the book on the table.",
        "exOkZh": "請把桌上的書拿給我。",
        "exBadText": "(X) Please **hang** me the book on the table.",
        "exBadNote": "錯誤：拿給我用 hand；hang 是「懸掛」，語意完全不符"
      },
      {
        "title": "可數名詞的單複數錯誤",
        "bad": "(X) I wash my **hand** every day.",
        "ok": "(O) I wash my **hands** every day.",
        "why": "hand 是**可數名詞**，要表達「我的雙手」這件事時，泛指要用**複數 hands**。中文的「洗手」沒有單複數變化，英文卻有。判斷法：想表達全身泛指時，如果這個部位可以一個一個數（手、腳、腿、眼睛），就要用複數；只講其中一隻時才用單數，而且要加 the 或 one。",
        "exOkText": "(O) He washed his **hands** before dinner.",
        "exOkZh": "他晚餐前洗了手。",
        "exBadText": "(X) He washed his **hand** before dinner.",
        "exBadNote": "錯誤：泛指「雙手」要用複數 hands，不能只用單數 hand"
      },
      {
        "title": "字母順序拼寫錯誤",
        "bad": "(X) She hurt her **hnad** last Sunday. ／ (X) He has big **hadn**.",
        "ok": "(O) She hurt her **hand** last Sunday. ／ (O) He has big **hands**.",
        "why": "hand 只有四個字母，卻同時用到 h、n、a、d 四種字，是國中拼字最常錯的單字之一。最常見的錯法是 **a 與 n 互換**（hnad、hnd），或 d 與 a 互換（hand 寫成 hadn）。判斷法：記成「ha（哈）+ nd（嗯）」兩個音節，唸完再落筆；寫完後把單字由右往左唸一次（d-n-a-h）確認沒有重複或遺漏。",
        "exOkText": "(O) He held the ball in one **hand**.",
        "exOkZh": "他用一隻手拿著球。",
        "exBadText": "(X) He held the ball in one **hnad**.",
        "exBadNote": "錯誤：hand 的字母順序寫反，hnad 應為 hand"
      },
      {
        "title": "動詞用法漏掉字尾變化",
        "bad": "(X) She **hand** me the salt and sugar yesterday.",
        "ok": "(O) She **handed** me the salt and sugar yesterday.",
        "why": "hand 也可以當動詞，意思是「傳遞、遞給」。它和 land、want 屬於同一類的**規則動詞**，過去式直接加 **-ed** → handed。學生常以為英文的過去式都不規則，於是把 hand 寫成原形。判斷法：規則動詞的過去式＝**原形 + ed**（hand → handed、work → worked）；不規則的另外背（go → went）。",
        "exOkText": "(O) She **handed** the tickets to me at the door.",
        "exOkZh": "她在門口把票遞給我。",
        "exBadText": "(X) She **hand** the tickets to me at the door.",
        "exBadNote": "錯誤：hand 在這裡是動詞，過去式要加 -ed 變成 handed"
      }
    ],
    "traps": [
      "**hand 與 hung 的發音陷阱**：兩者唸音幾乎相同（/hænd/ 與 /hʌŋ/），但意思完全相反。會考選擇題和聽力測驗都常拿來混淆。",
      "**可數名詞的單複數陷阱**：(O) hand 有複數 hands。凡是「洗手、拍手、握手」這類泛指動作，英文都要用複數。",
      "**冠詞陷阱**：講「一隻手」要寫 a hand 或 one hand；講特定的那隻要寫 the hand；泛指雙手寫 hands。少了冠詞在會考中就算錯。",
      "**handed 不是 hunged**：(O) hand 作動詞的過去式是 handed，直接加 -ed，不要亂加 g。"
    ],
    "strategy": [
      "把 hand 的四個字母唸 20 遍（h-a-n-d），一邊比手一邊寫，讓「手」的動作和拼字綁在一起。",
      "建立易混淆字對照表：hand（手／傳遞）、hung（掛住）、hang（懸掛）、hanged（吊死），一組四個一起背。",
      "寫句子時先問自己：這個 hand 是名詞還是動詞？是動詞就要看時態加 -ed。",
      "背一份「身體部位可數名詞」清單：hand、foot、eye、ear、leg、tooth，提醒自己泛指時要用複數（hands、feet、eyes、ears、legs、teeth）。",
      "錯字本分類：把拼錯的字按「字母互換」「漏字母」分類整理，比整頁抄寫有效得多。"
    ]
  },
  "one hand": {
    "zh": "一隻手",
    "ipa": "wʌn hænd",
    "intro": "針對您提供的英文片語 **(O) one hand**，這是「數量詞 + 名詞」構成的名詞片語，本身還不是完整的句子，要放在主詞或受詞的位置才能用。它表達的是「一隻手」這個精確數量。最該注意的是 one 是**基數詞**（後面接單數），以及不要和序數詞、複合形容詞混淆。",
    "headline": "one 後接單數，不能加 s",
    "structure": [
      {
        "role": "數量詞",
        "token": "one",
        "pos": "基數詞 (Cardinal Number)",
        "func": "表示確切的數量「一」；後面一定要接**單數**名詞",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "hand",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "one 的受詞；被數字修飾，所以用單數形式且前面不加冠詞",
        "mark": "O"
      },
      {
        "role": "整體",
        "token": "one hand",
        "pos": "數量名詞片語 (Noun Phrase)",
        "func": "相當於 a hand，可作主詞（One hand is enough.）也可作受詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "基數詞與序數詞混淆：one 誤用成 first",
        "bad": "(X) He can lift it with **first hand**. ／ (X) I can lift it with **the first** hand.",
        "ok": "(O) He can lift it with **one hand**.",
        "why": "one 是**基數詞**（回答 How many），後面接**單數**名詞；the first 是**序數詞**（回答 Which one），後面也接單數名詞但前面要有 the。學生常因中文「一隻手」而把 one 寫成 first。判斷法：先問這裡在回答什麼問題——**回答 How many 用 one、two；回答次序才用 first、second**。",
        "exOkText": "(O) He can carry the box with **one hand**.",
        "exOkZh": "他用一隻手就能搬那個箱子。",
        "exBadText": "(X) He can carry the box with **the first hand**.",
        "exBadNote": "錯誤：這裡問「用幾隻手」要用基數詞 one，不是序數詞 the first"
      },
      {
        "title": "one 後誤接不可數名詞",
        "bad": "(X) She only ate **one rice** for dinner.",
        "ok": "(O) She only ate **one bowl of rice** for dinner.",
        "why": "one 只能直接修飾**可數**名詞。rice、water、money 都是不可數名詞，數不出「一個」。要表達「一份」必須加**單位詞**，例如 a bowl of rice。學生常受中文「一碗飯」影響直接寫 one rice。判斷法：把 one 換成 two 唸一遍，**two rice 講不通、two hands 講得通**，後面的名詞就要換成可數的。",
        "exOkText": "(O) He drank **one glass of water** after running.",
        "exOkZh": "他跑步後喝了一杯水。",
        "exBadText": "(X) He drank **one water** after running.",
        "exBadNote": "錯誤：water 是不可數名詞，不能說 one water，要用 one glass of water"
      },
      {
        "title": "複合形容詞漏字尾 -ed",
        "bad": "(X) He is a **one hand** player.",
        "ok": "(O) He is a **one-handed** player.",
        "why": "當「一隻手的」要**修飾後面的名詞**時，中間不能空著，必須把兩個字用連字號接起來並加上 **-ed** → one-handed；字數更多時同樣用 hyphens（two-handed、ten-year-old）。學生看到 one hand 以為可以直接放名詞前面。判斷法：**前面是「數字 + 單位名詞」、後面又有名詞，就一定要加工具性 -ed 與連字號**。",
        "exOkText": "(O) The bag is **two-handed** and easy to carry.",
        "exOkZh": "那個提袋是雙手的，很容易提。",
        "exBadText": "(X) The bag is **two hand** and easy to carry.",
        "exBadNote": "錯誤：two hand 應寫成 two-handed，複合形容詞要加 -ed 與連字號"
      },
      {
        "title": "限定詞與名詞的搭配錯誤",
        "bad": "(X) He is **a one hand** man.",
        "ok": "(O) He is **a one-handed** man.",
        "why": "one hand 本身已經是「一隻手」，前面**不能再加冠詞 a**，否則變成「一個一隻手」的多重限定，句子不成立。這類「數量詞 + 名詞」前面直接接動詞、冠詞或介系詞，中間不夾冠詞。判斷法：one、two、this、that、my 這類**已經含有限定功能的詞**前面，不能再加 a、the、an。",
        "exOkText": "(O) **One hand** was hurt in the accident.",
        "exOkZh": "有一隻手在這場意外中受傷了。",
        "exBadText": "(X) **A one hand** was hurt in the accident.",
        "exBadNote": "錯誤：one hand 前面不能再加冠詞 a，否則限定詞重複"
      }
    ],
    "traps": [
      "**one 與 first 的陷阱**：(O) one 是「一（個）」回答 How many，(O) first 是「第一」回答 Which one。兩者後面都接單數，但意思完全不同。",
      "**one 後面只能接單數**：(O) one hand 對，(X) one hands 錯。而 two 之後要接複數（two hands）。選項中出現 one + 複數，直接排除。",
      "**不可數名詞不能被 one 直接修飾**：(X) one rice、(X) one water、(X) one money 全部錯誤，必須補單位詞（a bowl of／a glass of／a piece of）。",
      "**複合形容詞陷阱**：(O) one-handed、(O) two-handed、(O) ten-year-old，漏了 -ed 或連字號就算錯。"
    ],
    "strategy": [
      "記成公式：one + 單數可數名詞。寫完檢查後面的名詞有沒有不該出現的 s。",
      "分辨 How many 與 Which one：看到「幾個」用基數詞，看到「第幾個」才用序數詞，而且序數詞前面要有 the。",
      "背單位詞搭配：a cup of／a glass of／a bowl of／a piece of／a bag of，遇到不可數名詞就先找單位詞。",
      "複合形容詞練習：把「三層樓」寫成 three-story building、「十年老店」寫成 ten-year-old shop，多寫幾個就會自動反應。",
      "看到含 a 或 the 的選項先別急著選：檢查名詞前面是不是已經有 one、this、that、my 等限定詞，重複就是錯的。"
    ]
  },
  "only one hand": {
    "zh": "僅用一隻手",
    "ipa": "ˈoʊn.li wʌn hænd",
    "intro": "針對您提供的英文片語 **(O) only one hand**，這是在「數量詞」前面再加上限定副詞 only 的名詞片語，同樣不能單獨成句。only 在這裡修飾的是數量 one，所以整個片語的語意是「只有一隻手」。最該注意的是 only 的位置、not only 的用法，以及名詞仍然須用單數。",
    "headline": "only 只能放名詞前，不可後移",
    "structure": [
      {
        "role": "副詞（限定）",
        "token": "only",
        "pos": "限定副詞 (Adverb)",
        "func": "放在所修飾的詞**前面**強調「僅、只」；這裡只修飾 one 這個數量詞",
        "mark": "O"
      },
      {
        "role": "數量詞",
        "token": "one",
        "pos": "基數詞 (Cardinal Number)",
        "func": "被 only 修飾，強調數量是「一」而不是「不只一個」",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "hand",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "one 的受詞；被數字修飾所以用單數，前面不再加冠詞",
        "mark": "O"
      },
      {
        "role": "整體",
        "token": "only one hand",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "整個片語可作主詞（Only one hand can do it.）也可作受詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "only 的位置錯誤：放到名詞之後",
        "bad": "(X) He can lift it one **hand** only. ／ (X) She has one hand **only**.",
        "ok": "(O) He can lift it **only one hand**.",
        "why": "only 的位置決定它修飾誰，位置不同意思就不同。標準英文裡 only **一律放在它所修飾的詞前面**：only one hand、only two days、he only came。放在句尾會讓讀者以為 only 也在修飾後面的動詞，是非標準的用法。判斷法：寫 only 時立刻把它圈起來，用箭頭指向要修飾的那個詞，**箭頭只能往後、不能往左**。",
        "exOkText": "(O) She ate **only one** piece of cake.",
        "exOkZh": "她只吃了一塊蛋糕。",
        "exBadText": "(X) She ate one piece of cake **only**.",
        "exBadNote": "錯誤：only 要放在所修飾的詞前面，不能丟到句尾"
      },
      {
        "title": "not only 的部分否定誤用",
        "bad": "(X) **Not only one hand** can hold this bag.",
        "ok": "(O) **Only one hand** can hold this bag.",
        "why": "not only 是一個固定的**部分否定**片語，中文是「不只……而且」，後面一定要接 another、two 之類的詞，並搭配 and 才完整。原意是「只有一隻手」，不是「不只一隻手」，若寫成 not only one hand，語意就整個翻轉。判斷法：看到 **not only** 立刻檢查後面——**有沒有 another／more，句中有沒有 and**；沒有就表示用錯了。",
        "exOkText": "(O) **Only one student** passed the exam this time.",
        "exOkZh": "這次只有一位學生通過考試。",
        "exBadText": "(X) **Not only one student** passed the exam this time.",
        "exBadNote": "錯誤：not only 是「不只」，與原意「只有一位」相反"
      },
      {
        "title": "名詞單複數誤用",
        "bad": "(X) **Only one hands** can hold this heavy bag.",
        "ok": "(O) **Only one hand** can hold this heavy bag.",
        "why": "one 是基數詞，後面一定要接**單數**名詞。學生常因為前面多了 only 而覺得有「很多隻手」，於是把 hand 加上 s。判斷法：只要名詞前面出現 one，後面**永遠不會有 s**；出現 two、three、many、several 才加 s。兩種數字詞各配一種名詞單複數，不能混。",
        "exOkText": "(O) He has **only two hands** and they are both busy.",
        "exOkZh": "他只有兩隻手，而且兩隻都很忙。",
        "exBadText": "(X) He has **only two hand** and they are both busy.",
        "exBadNote": "錯誤：two 之後要用複數 hands，單數 hand 只能配 one"
      },
      {
        "title": "片語不能單獨作主詞",
        "bad": "(X) **Only one hand** in the accident.",
        "ok": "(O) **Only one hand was hurt** in the accident.",
        "why": "only one hand 是**名詞片語**，裡面沒有動詞，所以**不能自己當主詞**。要成句就必須補上 be 動詞或讓另一個名詞當主詞。中文可以說「只有一隻手受傷了」直接用名詞片語，英文卻一定要有動詞。判斷法：把片語單獨讀一遍，若找不到任何動詞，它就一定還缺東西。",
        "exOkText": "(O) **Only one hand was hurt** in the accident.",
        "exOkZh": "意外中只有一隻手受傷了。",
        "exBadText": "(X) **Only one hand** in the accident.",
        "exBadNote": "錯誤：片語不能單獨成句，缺主詞與 be 動詞 was"
      }
    ],
    "traps": [
      "**only 位置的陷阱**：only 只能前置。選項中若出現 one hand only、two days only 之類的後置寫法，雖然中文讀起來通順也要警惕，會考標準答案一律以 only + 名詞 為準。",
      "**not only 的陷阱**：(O) not only ＝ 不只（後面要接 and another…）。這句沒有 and，也沒有 another，所以不能加 not。",
      "**one + 單數的陷阱**：(X) only one hands 是會考常見的錯誤選項，one 之後絕對不加 s。",
      "**片語不能當主詞的陷阱**：only one hand 裡面沒有動詞，直接放在句首當主詞一定錯，前面要有主詞、句子裡要有動詞。"
    ],
    "strategy": [
      "畫箭頭法：寫 only 時在旁邊畫一個箭頭指向 one，確認它修飾的是「數量」而不是別的詞。",
      "做 not only 對照卡：左欄寫 not only … and another …，右欄寫 only …，兩種語意分開背。",
      "一三二口訣：one 與 only 配單數，two、three、many 配複數；看到數字先決定名詞形式。",
      "寫完句子做「找動詞」檢查：從左到右掃一遍，若一個動詞都沒有，就是漏寫了 be 動詞或實義動詞。",
      "背熟每個片語的中文對照：only one hand ＝ 只有一隻手，考試時看到中文提示就能立刻判斷。"
    ]
  },
  "with only one hand": {
    "zh": "僅憑一隻手",
    "ipa": "wɪð ˈoʊn.li wʌn hænd",
    "intro": "針對您提供的英文片語 **(O) with only one hand**，這是一個**介系詞片語**（憑一隻手），不能單獨成句，要接在動詞、動名詞或名詞後面作補充說明。它強調的是「只用一隻手」的方式。最該注意的是 with 的搭配、介系詞後不能直接接動詞原形，以及整個片段在句中放哪裡。",
    "headline": "with 後接名詞，不能接動詞原形",
    "structure": [
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "表示「帶著、憑著」；後面要接**名詞、動名詞或代詞**，不能接動詞原形",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "only",
        "pos": "限定副詞 (Adverb)",
        "func": "修飾後面的數量詞 one，強調「僅、只」",
        "mark": "O"
      },
      {
        "role": "數量詞",
        "token": "one",
        "pos": "基數詞 (Cardinal Number)",
        "func": "表示數量「一」，後面接單數名詞",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "hand",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "整個 with 片語的核心名詞，與前面的動詞搭配說明用什麼方式完成動作",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞誤用：with 改成 in / at",
        "bad": "(X) He opened the door **in** only one hand. ／ (X) She carried the box **at** one hand.",
        "ok": "(O) He opened the door **with** only one hand.",
        "why": "表示「用手、憑著手」要用 **with**（用身體的某部位做某事）。in 表示「在……裡面」，at 表示「在某個地點或朝某方向」，放這裡都接不起來。學生受中文「用手」影響，容易憑空造出 in hand。判斷法：**with + 身體部位 ＝ 用（部位）做**；對照 by hand ＝「手工地」，意思不同。",
        "exOkText": "(O) He carried the heavy box **with one hand**.",
        "exOkZh": "他用一隻手搬那個沉重的箱子。",
        "exBadText": "(X) He carried the heavy box **in one hand**.",
        "exBadNote": "錯誤：「用手」是 with one hand，不是 in one hand"
      },
      {
        "title": "介系詞後誤接動詞原形",
        "bad": "(X) He did it **with use** only one hand. ／ (X) She opened the door **with open** her hand.",
        "ok": "(O) He did it **with** only one hand.",
        "why": "with 是介系詞，後面**只能接名詞、動名詞或代詞**，絕對不能接動詞原形。學生常想表達「用手做」而直接寫 with use、with open。判斷法：寫完 with 之後問自己「下一個字是動詞嗎？」如果是，就必須改成**動名詞**（with using、with opening）或者換成一個名詞。",
        "exOkText": "(O) He did it **without using** both hands.",
        "exOkZh": "他沒有用雙手就做到了。",
        "exBadText": "(X) He did it **with use** both hands.",
        "exBadNote": "錯誤：with 後面不能接動詞原形 use，要改成動名詞 using"
      },
      {
        "title": "介系詞片語的位置錯誤：放句首當主詞",
        "bad": "(X) **With only one hand** wrote the whole letter.",
        "ok": "(O) **She wrote** the whole letter with only one hand.",
        "why": "with 開頭的片語是**方式狀語**，本身沒有動詞，不能當主詞用。中文「單手把整封信寫完」可以把「單手」放在最前面，英文卻必須補上真正的主詞與動詞。判斷法：任何介系詞（with、by、in、under、after）開頭的片語，**前面一定要先有主詞和動詞**，它只能放在後面補充說明。",
        "exOkText": "(O) **She wrote** the whole letter with only one hand.",
        "exOkZh": "她只用一隻手寫完了整封信。",
        "exBadText": "(X) With only one hand wrote the whole letter.",
        "exBadNote": "錯誤：with 片語不能當主詞，句子缺主詞與動詞"
      },
      {
        "title": "with 與 by 的語意差別",
        "bad": "(X) He moved the piano **by** only one hand. ／ (X) The chair was made **with** hand in Taiwan.",
        "ok": "(O) He moved the piano **with** only one hand. ／ (O) The chair was made **by hand** in Taiwan.",
        "why": "**with** 是用身體的某一部位**去完成**某個動作（with one hand）；**by** 加單數名詞表示**靠那個方法**（by hand ＝ 手工地）。兩者不能互換：把 with only one hand 改成 by only one hand，句子就不成立。判斷法：看 by 後面的名詞有沒有修飾語——**有修飾語用 with，裸名詞用 by**。",
        "exOkText": "(O) This wooden chair was made **by hand**.",
        "exOkZh": "這把木椅是手工做的。",
        "exBadText": "(X) He moved the piano **by only one hand**.",
        "exBadNote": "錯誤：靠一隻手完成動作要用 with；by hand 是「手工地」，語意不同"
      }
    ],
    "traps": [
      "**with 後不能接動詞原形**：(O) with + 動詞一定要變成動名詞（with using、without doing）。這是會考選擇題的固定陷阱。",
      "**with 與 by 的陷阱**：(O) by hand（手工地）、(O) by bus（搭公車）對照 (O) with my hand（用手）。判斷關鍵是有沒有冠詞或修飾語。",
      "**介系詞片語不能當主詞的陷阱**：with 開頭的片語前面一定要補主詞與動詞，這是中文最容易直接翻錯的地方。",
      "**only 的位置仍在 only 後面**：(O) with only one hand 中，only 修飾的是 one，不可寫成 with one only hand。"
    ],
    "strategy": [
      "介系詞後接東西的三步驟：先確定介系詞（with／by／in），再判斷後面詞性（名詞或動名詞），最後檢查語意通不通。",
      "背熟 by 的固定用法：by hand、by bus、by train、by bike 都是「交通或方式」，後面不加修飾語。",
      "中翻英時特別小心介系詞：把中文的「用」先標出來，再對照英文應該使用 with。",
      "把 (O) with only one hand 當成一個完整模組背誦，之後寫到「單手完成某事」就直接套進去。",
      "寫完檢查片語位置：把 with／by／in 開頭的部分括起來，確認它前面已經有主詞和動詞。"
    ]
  },
  "open": {
    "zh": "開",
    "ipa": "ˈoʊ.pən",
    "intro": "針對您提供的英文單字 **(O) open**，這是一個單獨的詞，還不是句子。文法上它可以是**動詞**（打開）、**形容詞**（開著的）、**名詞**（開放），詞性不同搭配就不同。最該注意的是冠詞要用 an，以及祈使句中同一個句意不要出現「to + 動詞」的重複結構。",
    "headline": "一詞三性：動詞、形容詞、名詞",
    "structure": [
      {
        "role": "詞條（動詞）",
        "token": "open",
        "pos": "動詞 (Verb) — 原形",
        "func": "作動詞表示「打開」，可作祈使句的主要動詞（Open the door.），第三人稱單數加 -s",
        "mark": "O"
      },
      {
        "role": "詞條（形容詞）",
        "token": "open",
        "pos": "形容詞 (Adjective)",
        "func": "作形容詞修飾名詞，表示「開著的」（an open window）；因以母音音素開頭，前面的冠詞用 an",
        "mark": "O"
      },
      {
        "role": "詞條（名詞）",
        "token": "open",
        "pos": "可數名詞 (Countable Noun)",
        "func": "作名詞表示「開放、公開場合」，有複數 opens",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼寫錯誤：字母順序顛倒",
        "bad": "(X) Please **opne** the window. ／ (X) She **oepn** the door quietly.",
        "ok": "(O) Please **open** the window.",
        "why": "open 的字母是 o-p-e-n，常見錯法是把最後兩字母 e 和 n 對調寫成 **opne**，或把中間 pe 對調寫成 **oepn**。英文拼字要靠字形記憶，不能靠語音。判斷法：把它拆成兩個音節 **o-pen** 照著唸一遍再落筆，寫完再由右往左唸（n-e-p-o）檢查有沒有重複或遺漏。",
        "exOkText": "(O) Could you **open** the window for me?",
        "exOkZh": "你能幫我打開窗戶嗎？",
        "exBadText": "(X) Could you **opne** the window for me?",
        "exBadNote": "錯誤：open 的字母順序顛倒，opne 應寫成 open"
      },
      {
        "title": "冠詞誤用：形容詞前用 a 還是 an",
        "bad": "(X) There is **a open** window in his room. ／ (X) She has **a opened** book on the desk.",
        "ok": "(O) There is **an open** window in his room.",
        "why": "open 是**以母音音素 /oʊ/ 開頭**，所以前面的冠詞必須用 **an** 而不是 a。學生常直接套用「a + 形容詞」的印象，寫成 a open book。判斷法：這裡的判斷標準是**讀音**不是字母——讀音以母音開頭就用 an（an open、an hour、an honest boy），讀音以子音開頭才用 a（a book、a university）。",
        "exOkText": "(O) There is **an open** window in his room.",
        "exOkZh": "他的房間裡有一扇開著的窗戶。",
        "exBadText": "(X) There is **a open** window in his room.",
        "exBadNote": "錯誤：open 以母音音素開頭，冠詞要用 an"
      },
      {
        "title": "發音辨識混淆：open 與 oven",
        "bad": "(X) Put the bread into the **open** for five minutes. ／ (X) The **open** was too hot to touch.",
        "ok": "(O) Put the bread into the **oven** for five minutes.",
        "why": "open（打開）與 oven（烤箱）唸音非常接近（/ˈoʊpən/ 與 /ˈʌvən/），只差一個音；連讀時學生常把兩者搞混。會考聽力測驗與字彙題都會利用這個相似音。判斷法：看到中文「打開、開放」用 open；看到中文「烤箱」用 oven，寫完把單字唸出來，再依語意決定。",
        "exOkText": "(O) She **opened** the oven and put the cake in.",
        "exOkZh": "她打開烤箱，把蛋糕放了進去。",
        "exBadText": "(X) She put the cake into the **open**.",
        "exBadNote": "錯誤：oven（烤箱）不是 open（打開），兩者唸音相近但字義不同"
      },
      {
        "title": "重複動詞錯誤：open 前面多加了 to",
        "bad": "(X) Please **to open** the door. ／ (X) Don't **to open** the window at night.",
        "ok": "(O) Please **open** the door.",
        "why": "祈使句的動詞要**用原形**直接放在句首，前面既不加 to，也不需要 can 這類助動詞（Can you open…? 才需要 can）。學生受 want to 的 to 影響，習慣性地在動詞前多加一個字。判斷法：看到句首是 Please、Don't、Let's 等祈使句標誌，後面**直接寫動詞原形**；只有 want、would like、need 這類詞後面才加 to。",
        "exOkText": "(O) **Don't open** the window; it's cold outside.",
        "exOkZh": "別開窗戶，外面很冷。",
        "exBadText": "(X) **Don't to open** the window; it's cold outside.",
        "exBadNote": "錯誤：否定祈使句的動詞用原形，不能加 to"
      }
    ],
    "traps": [
      "**an open 的陷阱**：(O) 以母音音素開頭的單字前面用 an（an open door、an hour），判斷依據是**讀音**不是字母。",
      "**祈使句不加 to 的陷阱**：(X) 句首是 Please／Don't／Let's 時，後面直接用動詞原形，這是會考最愛考的基本題。",
      "**open 與 oven 的同音陷阱**：兩者唸音接近，字義完全不同，聽力測驗常一起出現。",
      "**一詞三性混淆**：(O) open the door（動詞）、(O) an open door（形容詞）、(O) the shop is open（be 動詞後的形容詞），三種位置不能互換。"
    ],
    "strategy": [
      "一個單字整理三種用法：寫下「open 動詞／open 形容詞／open 名詞」三列，各配一個例句，考試前看三分鐘。",
      "背 20 個 an 的單字：an open、an hour、an honest boy、an old man，寫作時先判斷讀音再決定冠詞。",
      "祈使句練習：每天唸五句 (O) Please open…、(O) Don't forget…、(O) Let's go…，養成「動詞原形直接上」的反射。",
      "用對比法記同音字：(O) open（打開）對照 (O) oven（烤箱），配合動作畫面記憶，比只背中文有效。",
      "寫完後做詞性檢查：確認 open 前面是名詞（形容詞用法）還是主詞（動詞用法），位置對不對一眼就看出來。"
    ]
  },
  "door open": {
    "zh": "把門推開",
    "ipa": "dɔːr ˈoʊ.pən",
    "intro": "針對您提供的英文片語 **(O) door open**，這是「名詞 + 形容詞」構成的片段，還不是完整的句子——中文的「把門推開」是動詞片語，英文要成句還需要一個**動詞**（例如 push、get）。最該注意的是冠詞的加與不加，以及形容詞放在名詞後面時的特殊用法。",
    "headline": "名詞後接形容詞，前要有動詞",
    "structure": [
      {
        "role": "名詞（受詞）",
        "token": "door",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "動作的對象「門」；前面通常要加定冠詞 the，表示特定的那一扇",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "open",
        "pos": "形容詞 (Adjective) — 賓語補語",
        "func": "接在受詞後面，說明門被打開後的**結果狀態**",
        "mark": "O"
      },
      {
        "role": "整體",
        "token": "door open",
        "pos": "名詞 + 形容詞片語 (Object Complement)",
        "func": "本身不能成句，前面必須有動詞（Push the door open.）或不定詞（to open the door）",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "冠詞與單複數誤用",
        "bad": "(X) Please push **door** open. ／ (X) He closed **doors** open this morning.",
        "ok": "(O) Please push **the** door open.",
        "why": "名詞前面要加**定冠詞 the** 表示「特定的那一扇門」；可數名詞單數前面一定要有冠詞（a／the）。學生常受中文「開門」沒有「那個」的影響，把冠詞整個漏掉。判斷法：**可數名詞單數前面若沒有 a／an／the／this／that，就是錯的**；複數 doors 前面則不能再加 a。",
        "exOkText": "(O) Please **push the door** open.",
        "exOkZh": "請把那扇門推開。",
        "exBadText": "(X) Please push door open.",
        "exBadNote": "錯誤：可數名詞單數 door 前面漏了定冠詞 the"
      },
      {
        "title": "祈使句缺主要動詞",
        "bad": "(X) **The door** open for me, please. ／ (X) **Door** open! Someone is there!",
        "ok": "(O) **Open the** door for me, please.",
        "why": "中文「開門！」可以省略動詞，英文的祈使句**一定要有主要動詞**。door open 只是一個名詞加形容詞的片段，必須補上 open（打開）當動詞。判斷法：寫完英文先問「這句的動詞是什麼？」答不出來就表示漏寫了；祈使句的句首應該是**動詞原形**。",
        "exOkText": "(O) **Open the door** for me, please.",
        "exOkZh": "請幫我開門。",
        "exBadText": "(X) The door open for me, please.",
        "exBadNote": "錯誤：缺主要動詞，只寫了名詞和形容詞的片段"
      },
      {
        "title": "形容詞與名詞位置互換：語意顛倒",
        "bad": "(X) He **the open door** closed loudly. ／ (X) **The open door** was made of wood.",
        "ok": "(O) He **opened the door** loudly.",
        "why": "「the open door」是「**開著的**那扇門」，open 在名詞前當定語；「open the door」是「**把門打開**」，open 是動作動詞。兩者只差詞序，意思卻完全相反。學生把 open 拉到 door 前面，動作就變成狀態描述。判斷法：open 前若接 he、please 等主詞，它就是**動詞**；接 the、this 就是**形容詞**。",
        "exOkText": "(O) She **opened the window** and let the fresh air in.",
        "exOkZh": "她打開窗戶，讓新鮮的空氣進來。",
        "exBadText": "(X) She **the open window** and let the fresh air in.",
        "exBadNote": "錯誤：把動詞 opened 放到名詞後面，句中就沒有動詞了"
      },
      {
        "title": "動詞時態錯誤",
        "bad": "(X) He **open** the door quietly and came in.",
        "ok": "(O) He **opened** the door quietly and came in.",
        "why": "句子後半的 came in 是**過去式**，表示整句是敘述過去的事，open 也必須用過去式。open 是規則動詞，過去式直接加 **-ed** → opened。學生常只改了一半，把 came 改對卻忘了 open。判斷法：規則動詞的過去式＝**原形 + ed**（open → opened、work → worked）；不規則的另外背（go → went、run → ran）。",
        "exOkText": "(O) He **opened** the door quietly and came in.",
        "exOkZh": "他輕輕地開了門走進來。",
        "exBadText": "(X) He **open** the door quietly and came in.",
        "exBadNote": "錯誤：came in 是過去式，open 也必須改成過去式 opened"
      }
    ],
    "traps": [
      "**open the door 與 the open door 的陷阱**：(O) the former 是動作（把門打開），(O) the latter 是狀態（開著的門），只差詞序但意思相反。會考閱讀測驗很愛考。",
      "**可數名詞單數前的冠詞**：(O) door 前面一定要有 a／the／this／that，漏掉冠詞在克漏字中常就是答案。",
      "**祈使句要有動詞**：(X) Door open! 這種寫法在英文中不成立，句首必須是動詞原形。",
      "**過去式的連帶效應**：(O) 一句話有兩個動詞時，兩個都要跟著時態走（He opened the door and **came** in.），只改一個就是錯的。"
    ],
    "strategy": [
      "寫作時先找動詞：任何句子先確定主要動詞，再處理名詞與形容詞，順序反了就會出現 the open door 這類錯誤。",
      "背寫 10 個 open 開頭的句型：(O) Open the door、(O) Open your book、(O) Open the window，多寫自然形成反射。",
      "冠詞檢查法：寫完後用尺或手指掃過每個單數名詞，確認前面都有冠詞或限定詞。",
      "看到 yesterday、last night 就立刻檢查全句動詞，提醒自己一個都不能漏改。",
      "中英對照記憶：把「開門」「窗戶開著」「他開了門」三種中文分別配上 (O) open the door、(O) the door is open、(O) He opened the door，位置一清楚就不會混。"
    ]
  },
  "that door open": {
    "zh": "把那扇門推開",
    "ipa": "ðæt dɔːr ˈoʊ.pən",
    "intro": "針對您提供的英文片語 **(O) that door open**，這是在前一個片段前加上**指示形容詞 that**（那扇），指向說話者與聽者都看得到的那扇門。整體仍是「名詞片語 + 形容詞」的片段，還需要動詞才能成句。最該注意的是 that 的用法，以及冠詞 the 與指示詞 that 的差別。",
    "headline": "that 指遠處那扇，不能換成 the",
    "structure": [
      {
        "role": "指示形容詞",
        "token": "that",
        "pos": "指示形容詞 (Demonstrative Adjective)",
        "func": "修飾後面的名詞 door，指定「那扇（遠處的）門」；只能放在名詞**前面**",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "door",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "被 that 修飾，所以前面**不再加 the、a、this**",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "open",
        "pos": "形容詞 (Adjective) — 賓語補語",
        "func": "接在受詞後面，說明門被打開後的結果狀態",
        "mark": "O"
      },
      {
        "role": "整體",
        "token": "that door open",
        "pos": "名詞片語 + 形容詞",
        "func": "不能單獨成句，前面需要動詞（Push that door open.）或不定詞（to open that door）",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "指示形容詞與指示代詞混淆：that 誤用成 it",
        "bad": "(X) He pushed **it** door open. ／ (X) Could you open **it** window, please?",
        "ok": "(O) He pushed **that** door open.",
        "why": "**that** 放在名詞前面時是「指示**形容詞**」，後面必須接名詞（that door）；如果單獨使用、不帶名詞，就是「指示**代詞**」，本身已代替了名詞。學生常聽到 that 就想用「那個東西」的概念，把 it 塞進名詞中間。判斷法：**that 後面有沒有接名詞？**有 → 指示形容詞；沒有 → 指示代詞。絕不會出現 it door 或 that the door。",
        "exOkText": "(O) Could you **open that** window, please?",
        "exOkZh": "請你打開那扇窗戶好嗎？",
        "exBadText": "(X) Could you **open it** window, please?",
        "exBadNote": "錯誤：it 是代詞，後面不能接名詞，應改成指示形容詞 that"
      },
      {
        "title": "this 與 that 的遠近誤用",
        "bad": "(X) She pushed **this** door open and walked out. ／ (X) **This** one is mine; that one is yours.",
        "ok": "(O) She pushed **that** door open and walked out.",
        "why": "this 指**離說話者近**的東西，that 指**離說話者遠**的東西。中文的「那扇門」和「這扇門」有分別，但學生常隨手寫 this。判斷法：看到中文的「那、遠、對面的」用 **that**；看到「這、眼前的、這邊的」用 **this**。會考閱讀測驗若同時出現 this door 與 that door，就要靠這個遠近差別選出正確的那一個。",
        "exOkText": "(O) **This** book is mine; **that** one is yours.",
        "exOkZh": "這本書是我的；那本是你的。",
        "exBadText": "(X) **That** book is mine; this one is yours.",
        "exBadNote": "錯誤：近的用 this、遠的用 that，兩者不能互換"
      },
      {
        "title": "冠詞 the 與指示詞 that 誤用",
        "bad": "(X) He pushed **the** door open for me. ／ (X) Please close **the that** door behind you.",
        "ok": "(O) He pushed **that** door open for me.",
        "why": "指示詞 that **已經有「特指」的功能**，所以後面的名詞前不能再加 the，否則變成 the that door。冠詞 the 和指示詞 that、this、these、those 只能擇一使用。判斷法：寫完 that 或 this 後，**立刻檢查後面有沒有跟著 the 或 a**，跟了就刪掉。",
        "exOkText": "(O) Please close **that** door behind you.",
        "exOkZh": "請隨手把那扇門關上。",
        "exBadText": "(X) Please close **the that** door behind you.",
        "exBadNote": "錯誤：that 已經是特指，後面不能再加冠詞 the"
      },
      {
        "title": "名詞單複數誤用：that 後接複數",
        "bad": "(X) He pushed **that doors** open. ／ (X) Those students opened **that doors** for me.",
        "ok": "(O) He pushed **that door** open.",
        "why": "that 是**單數**的指示代詞／形容詞，後面必須接**單數**名詞 door；複數要用 those + 複數名詞（those doors）。學生常因為中文「那些門」而把 door 也加上 s。判斷法：**this／that → 單數；these／those → 複數**，兩邊的單複數必須一致。",
        "exOkText": "(O) **Those** students opened **that** door for me.",
        "exOkZh": "那些學生幫我打開了那扇門。",
        "exBadText": "(X) Those students opened **that doors** for me.",
        "exBadNote": "錯誤：that 是單數指示詞，後面的名詞要用單數 door"
      }
    ],
    "traps": [
      "**this 與 that 的遠近陷阱**：(O) this ＝ 近、(O) that ＝ 遠，這是中文沒有明說的規則。閱讀測驗若兩者同時出現，看不出遠近就容易選錯。",
      "**指示形容詞與指示代詞的陷阱**：(O) that + 名詞（that door）是形容詞；單獨的 that／those 是代詞。不能寫出 (X) it door 或 (X) that the door。",
      "**冠詞與指示詞不能疊用**：(X) the that door、(X) a this book 都錯。特指只用 the 或 that 擇一。",
      "**that 與 those 的單複數陷阱**：(O) that door、(O) those doors 正確；(X) that doors、(X) those door 錯誤。"
    ],
    "strategy": [
      "畫圈法：寫完 that 就立刻在旁邊畫一個圈，提醒自己「後面接單數名詞、前面不再加冠詞」。",
      "記 this／that 遠近對照表：this（近）— that（遠）、these（近複數）— those（遠複數），一次背成兩組。",
      "每天用 this 與 that 各寫三句描述教室裡的東西，兩週後就會變成反射動作。",
      "檢查冠詞是否重複：寫完名詞片語後回頭看限定詞，that／this／a／the 只能留一個。",
      "閱讀測驗遇到 this 與 that 混用時，先在文章裡找相對應的位置（靠近說話者的東西），再決定選哪一個。"
    ]
  },
  "push that door open": {
    "zh": "把那扇門推開",
    "ipa": "pʊʃ ðæt dɔːr ˈoʊ.pən",
    "intro": "針對您提供的英文句子 **(O) push that door open**，這是一個**祈使句**：省略主詞 you，直接用動詞原形開頭。整句是「動詞 + 指示形容詞片語 + 狀態補語」的三段結構。最該注意的是動詞的時態與變化、push 的介系詞搭配，以及形容詞不能隨便改成副詞。",
    "headline": "動詞原形開頭，形容詞放受詞後",
    "structure": [
      {
        "role": "動詞（祈使句）",
        "token": "push",
        "pos": "動詞原形 (Base Form of Verb)",
        "func": "祈使句的主要動詞，表示「推」；主詞 you 省略，必須用原形置於句首",
        "mark": "O"
      },
      {
        "role": "指示形容詞",
        "token": "that",
        "pos": "指示形容詞 (Demonstrative Adjective)",
        "func": "修飾受詞 door，指定遠處那扇門；後面接單數名詞，不再加 the",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "door",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "被推的對象；被 that 修飾所以不加冠詞",
        "mark": "O"
      },
      {
        "role": "賓語補語",
        "token": "open",
        "pos": "形容詞 (Adjective) — Object Complement",
        "func": "放在**受詞之後**說明推的結果狀態；不能移到受詞前面，也不能改成副詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "動詞時態錯誤：push 漏加 -ed",
        "bad": "(X) He **push** that door open and walked away.",
        "ok": "(O) He **pushed** that door open and walked away.",
        "why": "這句有主詞 He，動作已經發生，就必須用**過去式**。push 是規則動詞，過去式直接加 **-ed** → pushed。學生常只改 walked away 卻忘了 push，或以為祈使句的形式可以一直用。判斷法：一句話裡**所有**動詞的時態都要一致，看到 and、and then 就檢查前後兩個動詞。",
        "exOkText": "(O) She **pushed** that door open and ran out of the room.",
        "exOkZh": "她把那扇門推開，跑出了房間。",
        "exBadText": "(X) She **push** that door open and ran out of the room.",
        "exBadNote": "錯誤：ran 是過去式，push 也必須改成過去式 pushed"
      },
      {
        "title": "動詞與介系詞搭配錯誤：push 加 into / at",
        "bad": "(X) He **pushed into** that door and it opened. ／ (X) Don't **push at** the door, please.",
        "ok": "(O) He **pushed** that door open.",
        "why": "push 表示「推某物」時，後面**直接接受詞**，不加介系詞（push the door）。介系詞 into 是「進入裡面」、at 是「朝著目標撞」，都會改變動作的方式。學生受中文「推向那扇門」影響，容易多加介系詞。判斷法：**push + 物 ＝ 推那個物；push at／into ＝ 撞、衝進去**，動作不同。",
        "exOkText": "(O) He **pushed the heavy box** across the room.",
        "exOkZh": "他把沉重的箱子推過房間。",
        "exBadText": "(X) He **pushed at** the heavy box across the room.",
        "exBadNote": "錯誤：推箱子是 push the box，不是 push at the box"
      },
      {
        "title": "形容詞與副詞混淆：open 誤用成 openly",
        "bad": "(X) He pushed that door **openly** and everyone saw him.",
        "ok": "(O) He pushed that door **open** and everyone saw him.",
        "why": "這裡的 open 說明的是**門的狀態**，是賓語補語，必須用**形容詞**；openly 是副詞，意思是「公開地、坦率地」，修飾的是動詞 pushed，語意完全接不起來。學生常看到「-ly」就以為都要加。判斷法：**先問這個字在描述「東西的狀態」還是「動作的方式」**——描述狀態用形容詞（open、broken、dirty），描述方式用副詞（carefully、loudly）。",
        "exOkText": "(O) She pushed the door **open** and smiled at me.",
        "exOkZh": "她把門推開，朝我笑了笑。",
        "exBadText": "(X) She pushed the door **openly** and smiled at me.",
        "exBadNote": "錯誤：open 在這裡描述門的狀態，要用形容詞，不能用副詞 openly"
      },
      {
        "title": "雙受詞語序錯誤：人與物顛倒",
        "bad": "(X) He pushed **the book me** before class.",
        "ok": "(O) He pushed **me the book** before class.",
        "why": "push、hand、give、pass、send、show 這類動詞可以有兩個受詞：**人**放前面、**物**放後面（push me the book）。學生常照中文「給我一本書」的順序把物放前面。判斷法：**誰 → 什麼**：先寫接受的人（me、him、her、you），再寫東西（the book），而且兩個受詞之間**不加任何介系詞**。",
        "exOkText": "(O) Could you **hand me** that book on the desk?",
        "exOkZh": "你能把那本書拿給我嗎？",
        "exBadText": "(X) Could you **hand that book me** on the desk?",
        "exBadNote": "錯誤：雙受詞順序固定為「人 + 物」，不能把書放在前面"
      }
    ],
    "traps": [
      "**祈使句用原形的陷阱**：(O) 句首是動詞原形 push，表示省略主詞 you；如果加上了 He、She，就必須改成 pushed。",
      "**狀態補語位置的陷阱**：賓語補語一定要放**受詞後面**（push the door open），不能放受詞前面（push open the door 在標準英文中不成立）。",
      "**push 與介系詞的陷阱**：(O) push the door 與 (X) push at／into the door 意思不同，會考會用選項設計。",
      "**雙受詞順序的陷阱**：give／pass／hand／send／push 一律「先人後物」，且中間不加介系詞。"
    ],
    "strategy": [
      "背下 6 個雙受詞動詞：give、pass、hand、send、show、push，配合「人 + 物」口訣一起記。",
      "寫完立刻檢查動詞數與時態：用筆把動詞圈起來，確認每一個的時態都符合句子的時間線。",
      "狀態補語練習：寫出 (O) push the door open、(O) paint the wall red、(O) keep the room clean，體會「受詞 + 形容詞」的位置。",
      "中文對照提醒：中文「推開門」的「開」放在動詞後面，英文的 open 也一樣要放在受詞後面，位置邏輯相同。",
      "祈使句與陳述句切換練習：把 (O) Push that door open. 改成 (O) He pushed that door open.，觀察兩處變化（加主詞、動詞加 -ed）。"
    ]
  },
  "push that door open with only one hand": {
    "zh": "單手把那扇門推開",
    "ipa": "pʊʃ ðæt dɔːr ˈoʊ.pən wɪð ˈoʊn.li wʌn hænd",
    "intro": "針對您提供的英文句子 **(O) push that door open with only one hand**，這是一個以**祈使句**開頭的完整句子，把前面所有片段都串起來：動詞 + 指示形容詞受詞 + 狀態補語 + 方式狀語。最該注意的是 with 短語在句中的位置、狀態補語的擺放，以及 one 與 a 的限定詞差別。",
    "headline": "祈使句開頭，方式狀語放句尾",
    "structure": [
      {
        "role": "動詞（祈使句）",
        "token": "push",
        "pos": "動詞原形 (Base Form of Verb)",
        "func": "主要動詞，表示「推」；主詞 you 省略，必須用原形置於句首",
        "mark": "O"
      },
      {
        "role": "指示形容詞",
        "token": "that",
        "pos": "指示形容詞 (Demonstrative Adjective)",
        "func": "修飾受詞 door，指定遠處那扇門；後面不再加 the",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "door",
        "pos": "可數名詞 (Countable Noun) — 單數",
        "func": "動作的對象；被 that 修飾，故用單數且不加冠詞",
        "mark": "O"
      },
      {
        "role": "賓語補語",
        "token": "open",
        "pos": "形容詞 (Adjective)",
        "func": "接在受詞之後，說明門被推開後的結果狀態",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "with",
        "pos": "介系詞 (Preposition)",
        "func": "引出方式狀語，表示「用（身體部位）」；後面接名詞或動名詞",
        "mark": "O"
      },
      {
        "role": "方式狀語",
        "token": "with only one hand",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "說明「用什麼方式」完成前面那個動作；這類方式狀語通常放在**句尾**",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "祈使句缺主詞與動詞：片段湊不成句",
        "bad": "(X) **With only one hand** that door open.",
        "ok": "(O) **Push** that door open with only one hand.",
        "why": "這整句的核心是**祈使句**，必須以動詞原形 push 開頭。省略了它，只剩「with 介系詞片語 + 名詞 + 形容詞」三個碎片，完全沒有動詞也沒有主詞，句子不成立。中文「單手把門推開」可以把「單手」當主詞，英文不行。判斷法：寫完從左到右掃，**第一個字必須是動詞原形或主詞**；若第一個字是 with、that、Only 這類詞，就表示少了動詞。",
        "exOkText": "(O) **Open** that window with only one hand.",
        "exOkZh": "單手把那扇窗戶打開。",
        "exBadText": "(X) With only one hand that window.",
        "exBadNote": "錯誤：缺主要動詞，with 開頭的片語不能當主詞"
      },
      {
        "title": "方式狀語位置錯誤",
        "bad": "(X) He **with only one hand** pushed the heavy box. ／ (X) He pushed **with only one hand** that door open.",
        "ok": "(O) He pushed the heavy box **with only one hand**.",
        "why": "with 開頭的方式狀語是英文的**尾端修飾語**，正常位置在句尾；插到主詞與動詞之間或受詞與補語之間，會打斷「受詞 + 補語」的固定結構。學生受中文「單手把門推開」把方式放前面的語序影響，特別容易放錯。判斷法：**英文的時間與方式狀語一律往後放**，中文放前面的，英文要搬到句尾。",
        "exOkText": "(O) He **pushed the heavy box** with only one hand.",
        "exOkZh": "他用一隻手把那個沉重的箱子推了過去。",
        "exBadText": "(X) He **with only one hand** pushed the heavy box.",
        "exBadNote": "錯誤：方式狀語要放在句尾，不能插在主詞與動詞之間"
      },
      {
        "title": "狀態補語位置錯誤",
        "bad": "(X) He pushed **open** that door and everyone saw him.",
        "ok": "(O) He pushed that door **open** and everyone saw him.",
        "why": "這句的 open 是**賓語補語**，說明門被打開後的狀態，位置必須緊接在受詞 that door 的**後面**。如果把 open 提到受詞前面，它就變成動作動詞，整句的結構和時態都要重寫。判斷法：**push、paint、keep 這類動詞後面接形容詞時，一律「受詞 + 形容詞」**，形容詞不能插到受詞前面。",
        "exOkText": "(O) She pushed the gate **open** and ran through it.",
        "exOkZh": "她把鐵門推開，跑了過去。",
        "exBadText": "(X) She pushed **open** the gate and ran through it.",
        "exBadNote": "錯誤：open 是狀態補語，必須放在受詞 the gate 的後面"
      },
      {
        "title": "限定詞誤用：one 前面多加 a",
        "bad": "(X) He pushed that door open with **a one** hand. ／ (X) She carried it with **a just one** hand.",
        "ok": "(O) He pushed that door open with **only one** hand.",
        "why": "**one** 前面若接上 a，就變成「一個一隻手」——a 已經是冠詞，one 又是數量限定詞，限定詞重複，語意和文法都不成立。要強調「只有一隻」，只能用 only one 或 just one。判斷法：one、this、that、my 這類詞**前面不能再加冠詞**；要表達「只有一個」，在 one 前面加 only、just 這類副詞。",
        "exOkText": "(O) She carried the heavy box with **just one** hand.",
        "exOkZh": "她只用一隻手就搬了那個重箱子。",
        "exBadText": "(X) She carried the heavy box with **a just one** hand.",
        "exBadNote": "錯誤：冠詞 a 與數量詞 one 只能擇一，要用 just one"
      }
    ],
    "traps": [
      "**祈使句開頭的陷阱**：(O) 本句省略主詞 you，動詞用原形 push。若改成 He pushed…，整句的動詞就必須加 -ed。",
      "**方式狀語位置的陷阱**：(O) with only one hand 是方式狀語，放句尾；插到受詞前或句中會破壞「受詞 + 補語」結構。",
      "**one 前不能加冠詞的陷阱**：(X) a one hand 錯，要用 (O) only one 或 (O) just one。限定詞只能擇一。",
      "**狀態補語位置的陷阱**：(O) open 必須接在 that door 後面；若 open 前面接的是主詞或祈使句標誌，它就變成動詞，整句要重寫。"
    ],
    "strategy": [
      "整句背誦：把 (O) Push that door open with only one hand. 當作一個完整模範句背，之後任何「單手完成某動作」都可以套用。",
      "五段公式：動詞原形 + 指示形容詞 + 單數受詞 + 狀態補語 + 方式狀語，寫作時依序填，順序不要跳。",
      "寫完做「位置檢查」：確認（1）open 在 that door 後面（2）with 短語在句尾（3）only 在 one 前面（4）動詞在句首。",
      "用中文對照理解：中文「單手把門推開」的順序是「方式 + 動作」，英文則是「動作 + 方式」；記住這個倒過來的順序，寫作時就不會把 with 提前。",
      "把這 12 個片段串起來複習：(O) be bad for our health → can't be bad for our health → 完整句，再 hand → one hand → only one hand → with only one hand → 完整句，每天唸一次就會串起來。"
    ]
  },
  "cannot push that door open with only one hand": {
    "zh": "無法單手把那扇門推開",
    "ipa": "ˈkæn.ɑːt pʊʃ ðæt dɔːr ˈoʊ.pən wɪð ˈoʊn.li wʌn hænd",
    "intro": "針對您提供的英文句子 **cannot push that door open with only one hand**，這是一個省略主詞的否定祈使句，用中文說就是「（你）沒辦法單手把那扇門推開」。英文允許把主詞 you 省略，句子一樣完整。整句的難點在兩處：**push … open** 是複合動詞片語，open 要擺在受詞之後；**with only one hand** 是表示「手段」的介系詞片語。",
    "headline": "cannot 後接原形；push … open 別倒過來",
    "structure": [
      {
        "role": "否定情態動詞",
        "token": "cannot",
        "pos": "情態動詞 (Modal Verb) — can 的否定式，合寫為一字",
        "func": "放在句首直接否定整個動作，表示「無法、不能」；後面一律接動詞原形，不能加 to、-s 或 -ed",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "push",
        "pos": "動詞 (Verb) — 原形",
        "func": "句子的核心動作「推」；因為前面的 cannot 是情態動詞，push 必須用原形",
        "mark": "O"
      },
      {
        "role": "指示詞片語",
        "token": "that door",
        "pos": "指示詞 (Determiner) + 名詞 (Noun)",
        "func": "that 指向說話者心中特定的那扇門，表示「那扇門」，而不是泛指任何一扇門",
        "mark": "O"
      },
      {
        "role": "副詞（複合動詞後綴）",
        "token": "open",
        "pos": "副詞 (Adverb)",
        "func": "修飾動詞 push，表示「推開」的方向與結果；push the door open 不能寫成 push to open",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "with only one hand",
        "pos": "介系詞 (Preposition) + 限定詞 + 名詞片語",
        "func": "表示「憑著、只用某種手段」；with one hand 是固定搭配，不可用 by 取代",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "only",
        "pos": "限定詞 (Determiner)",
        "func": "修飾後面的 one hand，強調「只有」一隻手；only 必須緊接著它所修飾的名詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "否定情態動詞 cannot 必須合寫一個字",
        "bad": "(X) I **can not to** lift this heavy box. ／ (X) I **cannnot** lift this heavy box.",
        "ok": "(O) I **cannot** lift this heavy box.",
        "why": "cannot 是 can 的否定式，標準寫法是合成一個字；寫成 can not 雖然偶爾可見，但語意偏向「能不能做到」的討論，不等於本句的「做不到」。更常見的錯是後面多加一個 to，因為學生受中文「不能夠去做」影響。判斷法：can、could、may、might、must、cannot 這類情態動詞後面永遠接動詞原形，前面絕不出現 to。",
        "exOkText": "(O) I **cannot** carry both heavy bags at the same time.",
        "exOkZh": "我沒辦法同時提兩個沉重的袋子。",
        "exBadText": "(X) I **can not to** carry both heavy bags at the same time.",
        "exBadNote": "錯誤：cannot 不可拆寫，且情態動詞後面不能加不定詞 to"
      },
      {
        "title": "複合動詞片語 push … open 的字序錯誤",
        "bad": "(X) I **push open that heavy door** with both hands. ／ (X) I **push to open** that heavy door.",
        "ok": "(O) I **push that heavy door open** with both hands.",
        "why": "push … open 屬於「動詞＋小品詞」的複合動詞，中間可以插入受詞，正確順序是 push 受詞 open。學生常照中文「推開門」語序直譯成 push open the door，把受詞丟到最後；也有人把 open 當成另一個動作而加上 to。判斷法：open 在這裡是「推開」的結果副詞，後面不能再接動詞，所以不會出現 to。",
        "exOkText": "(O) He **pushed the window open** with one hand.",
        "exOkZh": "他用一隻手把窗戶推開了。",
        "exBadText": "(X) He **pushed open the window** with one hand.",
        "exBadNote": "錯誤：複合動詞中間應插受詞，應寫成 push the window open"
      },
      {
        "title": "表示手段的介系詞 with 誤用成 by",
        "bad": "(X) I **cannot push that door open by only one hand**.",
        "ok": "(O) I **cannot push that door open with only one hand**.",
        "why": "with 可以表示「用、憑著某個工具或身體部位」，例如 with one hand、with a pen。by 表示的是「透過某種方式或搭乘某交通工具」，例如 by bus、by hand（純手工製作）。學生最常犯的錯是受中文「用手」影響而寫成 by hand。判斷法：只要 with 後面接的是身體部位或工具名稱，就一律用 with。",
        "exOkText": "(O) She **cut the apple with a knife**.",
        "exOkZh": "她用一把刀切了蘋果。",
        "exBadText": "(X) She **cut the apple by a knife**.",
        "exBadNote": "錯誤：表示使用工具的介系詞是 with，不是 by"
      },
      {
        "title": "數詞 one 後面的名詞必須用單數",
        "bad": "(X) I **cannot push that door open with only one hands**.",
        "ok": "(O) I **cannot push that door open with only one hand**.",
        "why": "one 是數詞，數數時後面的名詞一定要用單數：one hand、two hands、three books。有幾個就用幾個，數詞不改變名詞的單複數。學生常因中文「一隻手」沒有單複數變化而誤加 s。判斷法：看到 one、two、three…就立刻檢查後面的名詞有沒有 s 變化，數詞自己已經表達了數量，名詞一定維持單數。",
        "exOkText": "(O) It took him **one hour** to finish the job.",
        "exOkZh": "他花了一個小時才完成那份工作。",
        "exBadText": "(X) It took him **one hours** to finish the job.",
        "exBadNote": "錯誤：one hour 是「一小時」，名詞 hour 不可加 s"
      }
    ],
    "traps": [
      "**cannot 的拼寫陷阱**：cannot 是 can 加 not 合寫的正式否定式，縮寫成 can't；書寫時不能漏字或寫成 can not 的分寫形式當標準答案。",
      "**複合動詞字序陷阱**：push / turn / put / take 這類「動詞＋小品詞」常考中間插受詞的題型，如 (O) push the door open ／ (X) push open the door。",
      "**with 與 by 的選擇陷阱**：with 對工具與身體部位，by 對交通工具與抽象方式，考卷常用 cut with a knife 對比 cut by a knife 來測驗。",
      "**數詞配單數陷阱**：one、a、an、each 後面一定接單數名詞，這是克漏字最常設的選項陷阱。"
    ],
    "strategy": [
      "先圈情態動詞：看到 can、cannot、must、should、may，後面一律填原形動詞，中間不碰 to 也不碰 -s。",
      "複合動詞用中文念一遍：把 push the door open 唸成「把門 推-開」，中段的受詞位置自然就記住了。",
      "介系詞看後面名詞判斷：後面接身體部位、工具、物品就用 with；接交通工具、方式就用 by。",
      "寫完句子倒回去數數：檢查 every one、one、two 後面的名詞是不是單數，這一分最容易被拿走。"
    ]
  },
  "you cannot push that door open with only one hand": {
    "zh": "你無法單手把那扇門推開",
    "ipa": "juː ˈkæn.ɑːt pʊʃ ðæt dɔːr ˈoʊ.pən wɪð ˈoʊn.li wʌn hænd",
    "intro": "針對您提供的英文句子 **you cannot push that door open with only one hand**，這是一個完整的否定陳述句，主詞 you 已經寫出來，語序為「主詞＋情態動詞＋動詞原形＋受詞＋介系詞片語」。加了主詞之後，最容易被扣分的地方是 **can't 後面誤加 to**、**動詞誤加 -s**，以及 **that 與 the 的差別**；句末的 with only one hand 則是固定搭配。",
    "headline": "主詞之後 can't＋原形；that 是那扇門不是一扇門",
    "structure": [
      {
        "role": "主詞",
        "token": "you",
        "pos": "代名詞 (Pronoun) — 人稱代詞主格",
        "func": "句子的主題，指說話對話的對方；you 是 you 沒有單複數之分，也不加 -s",
        "mark": "O"
      },
      {
        "role": "否定情態動詞",
        "token": "cannot",
        "pos": "情態動詞 (Modal Verb) — can 的否定式",
        "func": "緊接在主詞後面表示「無法」；後面直接接動詞原形，不加 to",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "push",
        "pos": "動詞 (Verb) — 原形",
        "func": "核心動作「推」；因主詞是 you 且後接情態動詞，必須用原形",
        "mark": "O"
      },
      {
        "role": "指示詞片語",
        "token": "that door",
        "pos": "指示詞 (Determiner) + 名詞 (Noun)",
        "func": "that 指向說話者已知的某扇特定門，語氣比 the 更明確；泛指時才用 the door",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "open",
        "pos": "副詞 (Adverb)",
        "func": "與 push 組成複合動詞，表示「推開」的結果，擺在受詞之後",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "with only one hand",
        "pos": "介系詞 (Preposition) + 名詞片語",
        "func": "表示完成此動作所憑藉的手段「只用一隻手」，with 後面接單數名詞 hand",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "縮寫 can't 後面誤加不定詞 to",
        "bad": "(X) You **can't to** push that door open. ／ (X) You **can not to** push that door open.",
        "ok": "(O) You **can't** push that door open.",
        "why": "can't 是 can not 的縮寫，本身已經是一個情態動詞，後面直接接動詞原形。台灣學生最典型的錯誤是受中文「不能夠去推」影響，在 can't 後面多加一個 to。判斷法：把 can't 換成 can 再念一次「You can push that door.」，can 後面本來就沒有 to，因此 can't 後面也不可以有 to。",
        "exOkText": "(O) You **can't** use both hands to open the box.",
        "exOkZh": "你不能用雙手一起打開那個箱子。",
        "exBadText": "(X) You **can't to** use both hands to open the box.",
        "exBadNote": "錯誤：can't 後面不可加不定詞 to，應直接接原形 use"
      },
      {
        "title": "動詞誤加第三人稱單數 -s",
        "bad": "(X) You **pushs** that door open. ／ (X) You **can't push** that door **es** open.",
        "ok": "(O) You **push** that door open.",
        "why": "第三人稱單數只有 he、she、it 以及單一名詞主詞才需要在一般現在時的動詞加 -s。主詞是 you，屬於第二人稱，不加 s；而且前面還有情態動詞 cannot，動詞一律用原形。判斷法：寫完動詞先看主詞是誰——he／she／it 加 s，you 與 I 不加，再看前面有沒有情態動詞，有情態動詞就永遠不加 s。",
        "exOkText": "(O) She **pushes** that heavy door open easily.",
        "exOkZh": "她很容易就把那扇沉重的門推開了。",
        "exBadText": "(X) She **push** that heavy door open easily.",
        "exBadNote": "錯誤：主詞 she 是第三人稱單數，一般現在時動詞要加 -es"
      },
      {
        "title": "指示詞 that 與定冠詞 the 混用",
        "bad": "(X) You cannot push **the** door open with only one hand.",
        "ok": "(O) You cannot push **that** door open with only one hand.",
        "why": "that 稱為「指示形容詞」，特指說話者心中某一個特定對象，等於中文的「那扇門」；the 是「定冠詞」，用來指出雙方都知道是哪一個，或前面提過的對象。兩者都只放單數可數名詞前，但語氣與使用情境不同。判斷法：中文翻譯若需要「那」字，就用 that；若只泛指對方已知的門，才用 the。",
        "exOkText": "(O) **That** job is too hard for me.",
        "exOkZh": "那份工作對我來說太難了。",
        "exBadText": "(X) **The** job is too hard for me.",
        "exBadNote": "錯誤：此處特指特定的那份工作，應用指示詞 that"
      },
      {
        "title": "陳述句基本語序（主詞不可置於動詞之後）",
        "bad": "(X) **Push that door** you cannot open. ／ (X) **Open that door** I cannot with one hand.",
        "ok": "(O) You cannot push that door open with only one hand.",
        "why": "英文陳述句的固定語序是「主詞＋動詞＋受詞」，中文可以說「這扇門你推不開」，但英文絕不能把 you 放到 push 後面，否則讀起來像「推這扇門，你（去）開」。學生常因中文語序而倒裝主詞。判斷法：寫完先圈出動詞，如果它的前面沒有主詞就直接接受詞，就要立刻回頭補上主詞 you。",
        "exOkText": "(O) You **have to use both hands** to move the box.",
        "exOkZh": "你必須用雙手才能搬動那個箱子。",
        "exBadText": "(X) **Have to use both hands** you to move the box.",
        "exBadNote": "錯誤：主詞 you 必須放在句首，不可置於動詞之後"
      }
    ],
    "traps": [
      "**主詞與動詞一致性陷阱**：主詞是 you、I、they 時，動詞不加 -s；只有 he／she／it 才加，這是最基本的出題點。",
      "**指示詞與冠詞陷阱**：that、this 強調「那一個／這一個」，the 強調已知的那一個，選擇錯誤在閱讀測驗中會導致理解偏差。",
      "**情態動詞不帶 to 陷阱**：can't、can、must、should、may 後面接原形，句子裡出現 to 就是錯的選項。",
      "**英文不倒裝陷阱**：中文「這扇門你推不開」不能翻成「Push that door you can't.」，陳述句主詞永遠在最前面。"
    ],
    "strategy": [
      "造句三步驟：先定主詞（you），再放情態動詞（can't），最後填原形動詞（push），順序錯了就整句崩。",
      "看到 can't 立刻畫一條禁止線：線的後面不能出現 to、-s、-ed。",
      "that 與 the 互換測試：把 that 換成 the 讀一遍，如果中文變成「這扇／那扇」以外的模糊感，就要用 that。",
      "寫完用螢光筆把主詞圈起來，檢查每個動詞的單複數是否與主詞相符。"
    ]
  },
  "heavy": {
    "zh": "沉重的",
    "ipa": "ˈhev.i",
    "intro": "針對您提供的英文單字 **heavy**，這是一個單字，本身不能單獨成句，必須放在名詞前（a heavy box）或放在 be 動詞後（It is heavy.）。它屬於「絕對形容詞」，表示客觀的物理重量，不帶任何感情色彩。這個字最容易出錯的地方有三個：拼寫裡的 ea 與字尾 y、字尾 -y 的發音、以及比較級 heavier 的變化。",
    "headline": "字尾 -y 讀 /i/；比較級是 heavier",
    "structure": [
      {
        "role": "詞性",
        "token": "heavy",
        "pos": "形容詞 (Adjective) — 絕對形容詞",
        "func": "表示某物的實際重量很大；可放在名詞前作定語（a heavy bag），也可放在 be 動詞後作表語（The bag is heavy.）",
        "mark": "O"
      },
      {
        "role": "發音重音",
        "token": "heavy",
        "pos": "單音節字 (One-syllable word)，重音在第一音節",
        "func": "讀作 /ˈhev.i/，重音符號放在 he 之前；字尾 -y 在這裡讀 /i/ 而不是 /aɪ/，這是與 happy 同類型的字尾變化",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤：ea 與字尾 y",
        "bad": "(X) This box is **hevy**. ／ (X) This box is **haevy**.",
        "ok": "(O) This box is **heavy**.",
        "why": "heavy 中間一定是 ea 這個字母組合，順序不可顛倒；後面是 e 再接 y。台灣學生常因中文「重」字筆畫少而漏字，寫成 hevy；也有人把 ae 誤植為 ha。判斷法：把 heavy 和 heaven（天堂）放在一起背，兩者前四個字母都是 heav 開頭，寫起來就有固定的肌肉記憶。",
        "exOkText": "(O) This **bag** is too **heavy** to carry.",
        "exOkZh": "這個袋子太重了，提不動。",
        "exBadText": "(X) This **bag** is too **hevy** to carry.",
        "exBadNote": "錯誤：拼字應為 heavy，ea 不可漏掉或顛倒成 ae"
      },
      {
        "title": "發音錯誤：字尾 -y 讀 /i/ 而非 /aɪ/",
        "bad": "(X) **heavy** 唸成 /ˈhev.aɪ/ ／ (X) **heavy** 唸成 /hev.j/",
        "ok": "(O) **heavy** 唸成 /ˈhev.i/",
        "why": "heavy 的字尾 y 前面是母音字母 e，所以要讀 /i/，跟 happy、easy、pretty 同一類；只有 no、my、by 這種前面是單純子音或短母音的字尾才讀 /aɪ/。學生常聽成 /ˈhev.aɪ/ 而在口試或朗讀時被扣分。判斷法：把字尾 -y 換成 -ee 試著唸，唸得通就是 /i/（heavy → hev-ee），唸不通才是 /aɪ/。",
        "exOkText": "(O) This **box** is really **heavy**.",
        "exOkZh": "這個箱子真的很重。",
        "exBadText": "(X) This **box** is really **hevy** and I can't lift it.",
        "exBadNote": "錯誤：拼字漏字會連帶唸成 /hevi/，正確應為 heavy /ˈhevi/"
      },
      {
        "title": "詞性錯誤：heavy 是形容詞，不能當副詞或動詞",
        "bad": "(X) He carried the bag **heavy**. ／ (X) She **heavied** the box upstairs.",
        "ok": "(O) He carried the bag **heavily**.",
        "why": "heavy 是形容詞，只能修飾名詞或放在 be 動詞後面，不能直接修飾動詞 carried；若要修飾動詞，必須改成副詞 heavily。heavy 也沒有動詞用法，heavied 不是合法單字。判斷法：看到空格先問「這裡要修飾的是名詞還是動詞？」修飾動詞就要換成 -ly 結尾的副詞。",
        "exOkText": "(O) He **heavily** depends on his new job.",
        "exOkZh": "他非常依賴他的新工作。",
        "exBadText": "(X) He **heavy** depends on his new job.",
        "exBadNote": "錯誤：heavy 是形容詞，修飾動詞 depends 必須用副詞 heavily"
      },
      {
        "title": "比較級與最高級變化錯誤",
        "bad": "(X) This box is **heavyer** than that one. ／ (X) It is the **heaviest** box in the room.",
        "ok": "(O) This box is **heavier** than that one.",
        "why": "重讀音節以「輔音字母＋y」結尾時，比較級與最高級要去 y 加 ie，即 heavy → heavier → the heaviest。這是國中會考指定必考變化之一。學生常寫成 heavyer。判斷法：把 happy、easy、pretty、heavy、angry 綁在一起背，規則完全一樣：y 變 i 再加 er / est。",
        "exOkText": "(O) His new job is **heavier** work than the old one.",
        "exOkZh": "他的新工作比舊的工作還要吃力。",
        "exBadText": "(X) His new job is **heavyer** work than the old one.",
        "exBadNote": "錯誤：重讀音節輔音＋y 結尾，y 要改成 i 再加 -er"
      }
    ],
    "traps": [
      "**拼字與讀音連帶陷阱**：會考聽力測驗會直接考 heavy 的 /i/ 音，若唸成 /aɪ/ 立刻判錯，別只背字形。",
      "**詞性陷阱**：考卷常給 (O) It is very heavy. ／ (X) It is very heavily.，選錯就是詞性錯。",
      "**變化陷阱**：heavyer 與 heavyly 都是最常見的錯誤拼法，選項裡出現時要立刻排除。",
      "**絕對形容詞陷阱**：heavy、small、beautiful 屬於絕對形容詞，通常不用 very 修飾，也不能有 more 比較級；要用更重就說 heavier 或 too heavy。"
    ],
    "strategy": [
      "把 -y 結尾單字綁成一個字庫：happy、easy、pretty、heavy、angry、hungry，一次背完比較級規則。",
      "背單字時同步標音標：heavy 的 /ˈhev.i/ 要能不看字面就寫出來。",
      "造句時先確定位置：放名詞前寫 a heavy bag，放 be 動詞後寫 It is heavy.，位置決定用法。",
      "看到選項有 heavyer、heavyly 這種形狀，馬上畫叉不必再想。"
    ]
  },
  "too heavy": {
    "zh": "太重了",
    "ipa": "tuː ˈhev.i",
    "intro": "針對您提供的英文片語 **too heavy**，這是一個「程度副詞 too＋形容詞」的片語，不能單獨成句，必須接在主詞與 be 動詞後面，或作為複合形容詞修飾後面的名詞。too 在這裡不是單純的「太」，而是超過了可接受的程度，帶有批評或抱怨的語氣。整個片語的用法重點在於 too 後面只能接形容詞原級，以及 too 與 very 的語意差別。",
    "headline": "too 後接形容詞原級；too 和 very 語意不同",
    "structure": [
      {
        "role": "程度副詞",
        "token": "too",
        "pos": "程度副詞 (Adverb)",
        "func": "修飾後面的形容詞 heavy，表示程度「超過標準」；後面只能接形容詞或副詞原級，不可再加 very",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "heavy",
        "pos": "形容詞 (Adjective)",
        "func": "片語的核心，提供被評量的性質「重」；若後面接名詞，整個 too heavy 就變成複合形容詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "too 後面不可再疊加 very",
        "bad": "(X) This box is **too very heavy**. ／ (X) It is **too much heavy**.",
        "ok": "(O) This box is **too heavy**.",
        "why": "too 本身已經是「太、超過標準」的程度副詞，本身不能再用 very 加強，否則語意重複。much 更不行，因為 much 只能用來修飾不可數名詞或比較級，不能直接修飾 heavy。判斷法：too 和 very 二選一，永遠不並存；看到 too 就把後面的 very 劃掉。",
        "exOkText": "(O) This bag is **too heavy** to carry.",
        "exOkZh": "這個袋子太重了，提不動。",
        "exBadText": "(X) This bag is **too very heavy** to carry.",
        "exBadNote": "錯誤：too 與 very 語意重複，不能疊加使用"
      },
      {
        "title": "too 與 very 的語意差別用錯",
        "bad": "(X) I am **very** late for my new job. ／ (X) It is **very** heavy to move.",
        "ok": "(O) I am **too** late for my new job.",
        "why": "very 只是客觀地加強程度，語氣中性；too 則表示「超過了可以接受的範圍」，暗含批評、不滿或違反期待。中文兩者都翻成「很」，所以學生很容易混用。判斷法：句子裡若有「結果不好、讓人擔心」的味道（來不及、太難、太多），用 too；單純強調事實程度，用 very。",
        "exOkText": "(O) The new job is **too** hard for me.",
        "exOkZh": "這份新工作對我來說太難了。",
        "exBadText": "(X) The new job is **very** hard for me.",
        "exBadNote": "錯誤：此處帶有「超過能力範圍」的語意，應用 too 而非 very"
      },
      {
        "title": "too + 形容詞 + 名詞的複合形容詞語序",
        "bad": "(X) He carried **a too heavy** bag. ／ (X) She has **too heavy a** job.",
        "ok": "(O) He carried **too heavy a bag**.",
        "why": "當 too heavy 要直接修飾後面的名詞時，它就是複合形容詞，名詞前面必須有冠詞 a／an，而且 too heavy 要整個放在冠詞之前，寫成 too heavy a bag。學生常把 too heavy 當形容詞塞在冠詞後面。判斷法：複合形容詞統一放名詞前面，冠詞放在最靠近名詞的位置。",
        "exOkText": "(O) He had to use both hands to move **too heavy a box**.",
        "exOkZh": "他必須用雙手才能搬動那個重得過分的箱子。",
        "exBadText": "(X) He had to use both hands to move **a too heavy box**.",
        "exBadNote": "錯誤：too heavy 應整個置於冠詞 a 之前，作 too heavy a box"
      },
      {
        "title": "not heavy 與 not too heavy 的語意相反",
        "bad": "(X) The box is **not too heavy**, so I can carry it. ／ (X) It is **not heavy**, but I still can't lift it.",
        "ok": "(O) The box is **not too heavy**, so I can carry it.",
        "why": "not heavy 否定的是客觀事實，表示「它一點也不重」；not too heavy 否定的是too 所帶的評價，意思是「其實還不算太重」，可能仍然很重。兩者語意幾乎相反，學生常以為加個 not 就一樣。判斷法：刪掉 not 重讀一次，若原句的批評意味是針對「太重」而非「重」，就用 not too heavy。",
        "exOkText": "(O) It isn't **too heavy** to move by yourself.",
        "exOkZh": "它還不至於重到你一個人搬不動。",
        "exBadText": "(X) It isn't **heavy** to move by yourself.",
        "exBadNote": "錯誤：not heavy 表示完全不重，語意與原意「不是太重」不同"
      }
    ],
    "traps": [
      "**too 與 very 的出題陷阱**：閱讀測驗常靠這兩字的語意差異區分答案，出題者最愛用 very 替換 too。",
      "**too 後面只接原級的陷阱**：too 後面不可出現比較級（too heavier）或最高級（too the heaviest）。",
      "**複合形容詞位置陷阱**：too heavy a bag 與 a too heavy bag 只差一個位置，會考一定會考。",
      "**否定語意陷阱**：not heavy 與 not too heavy 意思不同，選錯就整句意思翻轉。"
    ],
    "strategy": [
      "記住 too 的固定位置：too 永遠緊挨著它修飾的形容词，寫的時候不要在中間插入其他字。",
      "用翻譯校驗語意：too 翻成「太…」時通常要跟著負面結果，先問自己「有沒有後果？」有就用 too。",
      "看到 too 就反射檢查三件事：後面有沒有形容詞、有沒有疊 very、要不要加冠詞。",
      "把 too heavy、too small、too late 綁成一組背誦，擴充到 too easy、too hot。"
    ]
  },
  "it is too heavy": {
    "zh": "它太重了",
    "ipa": "ɪt ɪz tuː ˈhev.i",
    "intro": "針對您提供的英文句子 **it is too heavy**，這是一個簡單句，結構為「主詞＋be 動詞＋程度副詞＋形容詞」。這裡的 it 稱為「非人稱代詞」，用來指代前面提過的事物，而不是指某個人。整句的判斷重點是 be 動詞 is 絕對不能省略，以及 it's 與 its 這組縮寫與所有格的分界。",
    "headline": "be 動詞不可省；it's 不是所有格 its",
    "structure": [
      {
        "role": "主詞",
        "token": "it",
        "pos": "代名詞 (Pronoun) — 第三人稱單數非人稱代詞",
        "func": "代替前面提過的事物；指人時才用 he 或 she，指物或抽象概念時用 it",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "be 動詞 (Be Verb) — 第三人稱單數現在式",
        "func": "把主詞 it 與後面的表語 too heavy 連結起來；一般現在時不可省略 is",
        "mark": "O"
      },
      {
        "role": "表語（片語）",
        "token": "too heavy",
        "pos": "程度副詞 (Adverb) + 形容詞 (Adjective)",
        "func": "放在 be 動詞後面說明主詞的狀態，意思相當於中文的「太重了」，是這句的結論",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "be 動詞 is 漏寫",
        "bad": "(X) It **too heavy**. ／ (X) It **be** too heavy.",
        "ok": "(O) It **is** too heavy.",
        "why": "英文的 be 動詞絕對不能省略，中文的「它太重了」沒有「是」這個字，英文卻一定要有 is（我、你是 are，he／she／it 是 is）。學生常因中文省略而漏掉，或誤以為 be 動詞只能用 be 原形。判斷法：寫完句子立刻數動詞，如果整句找不到一個 is／are／am，就一定漏了。",
        "exOkText": "(O) **It is** too heavy to move alone.",
        "exOkZh": "它太重了，一個人搬不動。",
        "exBadText": "(X) **It too heavy** to move alone.",
        "exBadNote": "錯誤：be 動詞 is 不可省略，否則整句沒有動詞"
      },
      {
        "title": "it's（it is 縮寫）與 its（所有格）混淆",
        "bad": "(X) **Its** too heavy. ／ (X) **It's** color is too heavy.",
        "ok": "(O) **It's** too heavy.",
        "why": "it's 是 it is 的縮寫，後面接的通常是表語或補語；its 是所有格代詞，後面一定要接名詞，表示「它的」。台灣學生常把兩個字混用，寫成 Its is too heavy 或 It's bag。判斷法：its 後面如果出現名詞就是正確用法；its 後面出現形容詞或動詞，就必須改成 it's。",
        "exOkText": "(O) **It's** too heavy to carry.",
        "exOkZh": "它太重了，帶不動。",
        "exBadText": "(X) **Its** too heavy to carry.",
        "exBadNote": "錯誤：後面接形容詞 too heavy，必須用 it's（it is 的縮寫）"
      },
      {
        "title": "it 作主詞指代非人稱事物",
        "bad": "(X) **He** is too heavy to move. ／ (X) **She** is too heavy.",
        "ok": "(O) **It** is too heavy.",
        "why": "第三人稱單數代詞有兩個：it 用來指物品、動物、抽象概念或前面提過的事；he 用來指男性，she 用來指女性。本句談的是重量，泛指那個東西，所以用 it。判斷法：看名詞中心的詞義——能搬動、能稱重的是 it；會說話、有性別特徵的才是 he 或 she。",
        "exOkText": "(O) **It** is too heavy for me to lift.",
        "exOkZh": "它太重了，我舉不起來。",
        "exBadText": "(X) **He** is too heavy for me to lift.",
        "exBadNote": "錯誤：此處指物品，應用非人稱代詞 it 而非 he"
      },
      {
        "title": "形容詞前誤加不定冠詞",
        "bad": "(X) It is **a too heavy**. ／ (X) It is too heavy **a box**.",
        "ok": "(O) It is **too heavy**.",
        "why": "be 動詞後面如果只接形容詞作表語，形容詞前面不能加冠詞；只有當後面接的是名詞時才需要 a／an。而且這個名詞必須被移位到 too heavy 後面，寫成 too heavy a box。判斷法：be 動詞後面沒有看到名詞，就不要放冠詞。",
        "exOkText": "(O) The box is **too heavy** for me.",
        "exOkZh": "那個箱子對我來說太重了。",
        "exBadText": "(X) The box is **a too heavy** for me.",
        "exBadNote": "錯誤：be 動詞後只有形容詞作表語，不可加冠詞 a"
      }
    ],
    "traps": [
      "**be 動詞省略陷阱**：中文沒有「是」，英文卻一定要有，這是華語母語者最常犯的錯誤。",
      "**it's 與 its 陷阱**：這組字在考卷上幾乎年年出現，選擇題與克漏字都會設。",
      "**it / he / she 選擇陷阱**：會依上下文名詞的性質出題，看錯就選錯。",
      "**冠詞位置陷阱**：形容詞作表語時前面不加冠詞，是填字題常見的扣分點。"
    ],
    "strategy": [
      "寫完簡單句先掃描 be 動詞：有沒有 is／are／am／was／were，缺了就補。",
      "把 it's 與 its 抄在便利貼上貼在課本封面，每次寫到就唸一次全名。",
      "讀文章時對 it 保持警覺，確認前文提到的是東西還是人。",
      "作答時用「冠詞配名詞」檢查法：空格後面有名詞才考慮放 a／an。"
    ]
  },
  "use": {
    "zh": "使用",
    "ipa": "juːz",
    "intro": "針對您提供的英文單字 **use**，這是一個單字，屬於動詞，不能單獨成句，必須接受詞或出現在 have to、can 等結構裡。台灣課本常見的用法是 **use something to do something**（用某物去做某事）。這個字要特別留意三件事：拼寫不可漏掉 e、動詞時字尾 s 要讀成 /z/，以及千萬不要和名詞 user 混為一談。",
    "headline": "字尾讀 /z/；搭配是 use sth. to do",
    "structure": [
      {
        "role": "詞性",
        "token": "use",
        "pos": "動詞 (Verb) — 及物動詞",
        "func": "表示「使用某物」；後面必須接受詞，例如 use both hands、use a pen",
        "mark": "O"
      },
      {
        "role": "常見搭配",
        "token": "use",
        "pos": "動詞 (Verb) 搭配 use something to do something",
        "func": "use 之後的名詞是「工具」，to 之後的動詞是「要做的動作」；例如 use a knife to cut the apple",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字錯誤：use 不可漏掉 e 或多加 s",
        "bad": "(X) You must **us** both hands. ／ (X) You must **usees** both hands.",
        "ok": "(O) You must **use** both hands.",
        "why": "這個字的寫法是 u-s-e，結尾的 e 一定要寫出來；讀音雖然是 /juːz/，但拼字跟它無關。台灣學生常因中文拼音习惯寫成 us，或以為第三人稱單數要加 s 而寫成 uses 代替原形。判斷法：把它和關鍵的 user（使用者）、useful（有用的）一起背，u 開頭、se 結尾的形狀就會固定。",
        "exOkText": "(O) I **use** both hands to lift this heavy box.",
        "exOkZh": "我用雙手抬起這個沉重的箱子。",
        "exBadText": "(X) I **us** both hands to lift this heavy box.",
        "exBadNote": "錯誤：拼字應為 use，不可漏掉結尾的 e"
      },
      {
        "title": "發音錯誤：動詞 use 的字尾 s 讀 /z/",
        "bad": "(X) **use** 唸成 /juːs/ ／ (X) **use** 唸成 /juː/",
        "ok": "(O) **use** 唸成 /juːz/",
        "why": "字尾的 s 在清音後要讀 /s/，在濁音後要讀 /z/。use 的 u 是長音，屬於濁音，所以字尾要讀成 /z/，整個字是 /juːz/。這與 bus、class 的唸法相同，聽力測驗會直接考。判斷法：唸的時候若聽起來像 /juːs/，那幾乎變成另一個詞了，務必把舌尖的震動感做出來。",
        "exOkText": "(O) You should **use** your new job skills.",
        "exOkZh": "你應該運用你的新工作技能。",
        "exBadText": "(X) You should **us** your new job skills.",
        "exBadNote": "錯誤：拼字漏掉 e，唸出來也會變成 /juːs/，正確是 use /juːz/"
      },
      {
        "title": "詞性錯誤：use 是動詞，不可當名詞用",
        "bad": "(X) I need a **use** for this old box. ／ (X) This is very **use**.",
        "ok": "(O) This **box** is very **useful**.",
        "why": "use 在本課只作動詞；當名詞表示「使用」或「用途」時，現代英文會用 usage 或 the use of；表示「使用者」的名詞則是 user。學生常把動詞直接當名詞塞進句子里。判斷法：若後面還要接動詞、或前面沒有冠詞與名詞，就不能把 use 當名詞。",
        "exOkText": "(O) He knows how to **use** a computer.",
        "exOkZh": "他知道怎麼使用電腦。",
        "exBadText": "(X) He knows how to **uses** a computer.",
        "exBadNote": "錯誤：how to 之後接原形，use 不可加 -s 或當名詞"
      },
      {
        "title": "搭配錯誤：use something to do something",
        "bad": "(X) I **use** a pen **for writing** the job report. ／ (X) I use a pen **to writing** the report.",
        "ok": "(O) I **use a pen to write** the job report.",
        "why": "use 的標準三段式是「use 工具 to 動詞 原物」，to 之後一定要接動詞原形，不能接 -ing。學生常因中文「用筆來寫」而寫成 use a pen for writing；兩種都可以，但 to 之後絕對是原形。判斷法：看到 use 就要預留三個位置：工具、to、原形動詞。",
        "exOkText": "(O) I **use both hands** to move the heavy box.",
        "exOkZh": "我用雙手搬動那個沉重的箱子。",
        "exBadText": "(X) I **use both hands** for move the heavy box.",
        "exBadNote": "錯誤：for 之後若接動作，要用動名詞 moving，不可接原形 move"
      }
    ],
    "traps": [
      "**use / used / using 變化陷阱**：情態動詞後面只能用原形 use；過去式才是 used，進行式是 using。",
      "**user / useful 詞族陷阱**：名詞是 user，形容词是 useful，都不是 use。",
      "**發音陷阱**：聽力測驗中 /juːz/ 與 /juːs/ 只差一個清濁，務必練熟。",
      "**搭配陷阱**：use 的受詞是工具，工具後面接 to + 原形，這三段位置在填空題常被打散。"
    ],
    "strategy": [
      "把 use、useful、user、usually 寫成一列，順便複習 u 開頭的字族。",
      "句型背三段式：use A to do B，隨時能填出 A（工具）與 B（動作）。",
      "寫完檢查 to 後面的動詞有沒有 -s 或 -ing，多半就能抓到錯。",
      "朗讀時刻意做出口尾的 /z/ 震動，耳朶就會記住這個音。"
    ]
  },
  "have to use": {
    "zh": "必須使用",
    "ipa": "hæv tə juːz",
    "intro": "針對您提供的英文片語 **have to use**，這是一個「半助動詞片語」，本身不能單獨成句，必須加上主詞才能成為完整句子，例如 **You have to use both hands.**。have to 表示「不得不、必須」，是一種外部義務；它與 must 意思接近但用法不完全相同。這個片語最常見的錯誤是把 to 當成不定詞，或忘記第三人稱單數要改成 has to。",
    "headline": "have to 的 to 不是不定詞，後接原形",
    "structure": [
      {
        "role": "半助動詞",
        "token": "have to",
        "pos": "半助動詞片語 (Modal-like Phrase) — 相當於 must",
        "func": "放在主詞後面表示義務「必須」；會隨人稱與時態變化：I／you／they have to，he／she／it has to",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "use",
        "pos": "動詞 (Verb) — 原形",
        "func": "have to 後面一律接動詞原形；表示被使用的對象，後面再接受詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "have to 中的 to 不是不定詞 to",
        "bad": "(X) You have to **to use** both hands. ／ (X) He **haves to** use both hands.",
        "ok": "(O) You **have to** use both hands.",
        "why": "have to 是一個固定詞組，中間的 to 已經含在裡面，所以後面再接動詞時不可以再加一個 to。此外 have 本身不會變成 haves，變化只發生在 have→has。判斷法：把 have to 看成一塊不拆的單位，後面只接一個原形動詞，看到兩個 to 立刻判錯。",
        "exOkText": "(O) He **has to use** both hands to move it.",
        "exOkZh": "他必須用雙手才能搬動它。",
        "exBadText": "(X) He **has to to use** both hands to move it.",
        "exBadNote": "錯誤：have to 內含一個 to，後面不可再加 to"
      },
      {
        "title": "must 與 have to 的語意差別",
        "bad": "(X) You mustn't **have to** use both hands here. ／ (X) I **must** to use both hands here.",
        "ok": "(O) You **have to** use both hands here.",
        "why": "must 語氣較強，多半來自講話者的權威或自身的道德判斷；have to 語氣較中性，表示外部規定或客觀必要。因此描述規定時用 have to 較自然，直接禁止時才用 mustn't。must 後面也不能加 to。判斷法：題目若說「規定、規定要」，用 have to；若是老師命令「不准」，才用 mustn't。",
        "exOkText": "(O) Everyone **has to** wear a helmet when riding.",
        "exOkZh": "每個人騎乘時都必須戴安全帽。",
        "exBadText": "(X) Everyone **must to** wear a helmet when riding.",
        "exBadNote": "錯誤：must 是半助動詞，後面接原形，不可加 to"
      },
      {
        "title": "don't have to 與 mustn't 的差別",
        "bad": "(X) You **mustn't** use only one hand. ／ (X) You don't **must** use only one hand.",
        "ok": "(O) You **don't have to** use only one hand.",
        "why": "don't have to 是「不必」，表示免除義務，做與不做都可以；mustn't 是「禁止」，表示完全不允許。兩者語意完全相反，是會考最愛的對比題。判斷法：看到中文「不需要」就用 don't have to；看到「不可以／嚴禁」才用 mustn't。",
        "exOkText": "(O) You **don't have to** carry the heavy box by yourself.",
        "exOkZh": "你不必自己搬那個沉重的箱子。",
        "exBadText": "(X) You **don't must** carry the heavy box by yourself.",
        "exBadNote": "錯誤：否定 must 要用 mustn't，或直接用 don't have to"
      },
      {
        "title": "過去的義務要用 did have to",
        "bad": "(X) Last year I **have to** use both hands. ／ (X) Last year I **have to used** both hands.",
        "ok": "(O) Last year I **had to** use both hands.",
        "why": "have to 是一般現在時的說法，後面接原形 use；一旦句中有 last year、yesterday 等過去時間，就要把 have 改成 had to，後面仍然接原形。學生最常犯的錯是保留 have 卻把 use 改成過去式。判斷法：先看時間副詞，有過去時間就整組變 had to，後面的動詞維持原形不變。",
        "exOkText": "(O) Two years ago he **had to use** both hands.",
        "exOkZh": "兩年前他必須用雙手。",
        "exBadText": "(X) Two years ago he **have to used** both hands.",
        "exBadNote": "錯誤：過去時間要用 had to，後面維持原形 use"
      }
    ],
    "traps": [
      "**to 數量陷阱**：have to 後面再出現 to 就是錯的選項，會在克漏字中設成誘答。",
      "**have / has 變化陷阱**：主詞換成 he、she、it、單數名詞時，have to 要改成 has to。",
      "**mustn't 與 don't have to 陷阱**：兩者語意相反，閱讀測驗常靠這組對比出題。",
      "**時態陷阱**：過去時間出現時，只能是 had to + 原形，不會是 have to + 過去式。"
    ],
    "strategy": [
      "把 have to / has to / had to 做成三格變化表，直接對應主詞與時間。",
      "寫完就檢查 to 的數量：整句只能有一個 to（除非另有 to + 原形的不定詞結構）。",
      "遇到 must 立刻問：這是禁止還是不必要？禁止用 mustn't，不必要用 don't have to。",
      "做題時先圈時間副詞，再決定 have to 要不要變 had to。"
    ]
  },
  "both": {
    "zh": "兩者都",
    "ipa": "boʊθ",
    "intro": "針對您提供的英文單字 **both**，這是一個限定詞（也兼作代詞），單獨不能造句，必須接名詞或接 of 結構，例如 **both hands** 或 **both of my hands**。它專門用在「兩個」的情況，意思相當於中文的「兩者都」。這個字要特別留意：字尾 th 要讀齒音 /θ/，以及它不能單獨當主詞或受詞使用。",
    "headline": "th 讀齒音 /θ/；both 一定要接名詞或 of",
    "structure": [
      {
        "role": "詞性",
        "token": "both",
        "pos": "限定詞 (Determiner) / 代詞 (Pronoun)",
        "func": "表示「兩個都」；放在複數名詞前（both hands）或與 of 連用（both of my hands）",
        "mark": "O"
      },
      {
        "role": "使用限制",
        "token": "both",
        "pos": "限定詞 (Determiner)",
        "func": "只能形容恰好兩個對象；三個以上要用 all，兩個之中選一個用 either，兩個都不選用 neither",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼字與發音：字尾 th 讀齒音 /θ/",
        "bad": "(X) **both** 唸成 /boʊt/ ／ (X) **both** 唸成 /boʊd/",
        "ok": "(O) **both** 唸成 /ˈboʊθ/",
        "why": "both 結尾是 th，這個音標不發音，是舌尖輕輕放在上下齒之間吐氣的齒音 /θ/。學生常唸成 /t/ 或 /d/，聽起來分別像 boat 和 bode，完全是另一個字。判斷法：把舌尖頂在上下牙中間「哈氣」，這就是 /θ/；若舌頭頂住上齒那個位置就變成 /d/ 了。",
        "exOkText": "(O) You should use **both** hands to move it.",
        "exOkZh": "你應該用雙手來搬動它。",
        "exBadText": "(X) **Both** is heavy, so I need both hands.",
        "exBadNote": "錯誤：both 不能單獨作主詞，應寫成 Both hands are heavy"
      },
      {
        "title": "詞性錯誤：both 不能單獨作主詞或受詞",
        "bad": "(X) **Both** is heavy. ／ (X) I need **both**.",
        "ok": "(O) **Both** of the boxes are heavy.",
        "why": "both 是限定詞，必須後接複數名詞；當它要單獨使用時，前面要加上 of 才能變成代詞片語（both of them、both of the hands）。學生容易把 both 當成 everything 一樣的代詞直接使用。判斷法：寫完 both 就往後看，下一個字必須是複數名詞或 of，否則就是錯的。",
        "exOkText": "(O) **Both** of my hands are busy now.",
        "exOkZh": "我的兩隻手現在都很忙。",
        "exBadText": "(X) **Both** are busy now.",
        "exBadNote": "錯誤：both 不能單獨作主詞，須寫成 Both of my hands 或 Both hands"
      },
      {
        "title": "語意對比：both / all / either / neither 的選用",
        "bad": "(X) I need to use **all** of both hands. ／ (X) You can use **either** hand to lift it.",
        "ok": "(O) I need to use **both** hands to lift it.",
        "why": "both 指兩個都；all 指三個以上全部；either 指兩個之中任選一個；neither 指兩個都不。學生常因中文「都」而把 all 與 both 混用，或把 either 誤以為等於 both。判斷法：先數物件有幾個——兩個且全都要用 both；三個以上用 all；只挑一個用 either。",
        "exOkText": "(O) **Both** of the bags are too heavy.",
        "exOkZh": "兩個袋子都太重了。",
        "exBadText": "(X) **All** of the two bags are too heavy.",
        "exBadNote": "錯誤：只有兩個對象應用 both；all 用於三個以上"
      },
      {
        "title": "位置錯誤：both 必須放在名詞之前",
        "bad": "(X) You have to use the hands **both**. ／ (X) Use the **both** hands.",
        "ok": "(O) You have to use **both** the hands.",
        "why": "英文形容詞與限定詞的順序是「限定詞 → 形容詞 → 名詞」，所以 both 要放在 the、my、these 這類詞的後面，緊接著名詞；絕對不能放在名詞之後。判斷法：看到名詞出現在 both 前面，就代表順序倒過來了。",
        "exOkText": "(O) He needs **both** his hands to lift the box.",
        "exOkZh": "他需要用雙手才能舉起那個箱子。",
        "exBadText": "(X) He needs his hands **both** to lift the box.",
        "exBadNote": "錯誤：both 不可置於名詞之後，應寫成 both his hands"
      }
    ],
    "traps": [
      "**齒音陷阱**：both 唸成 /t/ 就變成 boat，聽力測驗一聽就露餡。",
      "**限定詞位置陷阱**：both 的位置是「限定詞後、名詞前」，選項常故意把它放到名詞後面。",
      "**數量對比陷阱**：both 限兩個、all 三個以上，數一數題幹的物件就能排除。",
      "**both of 陷阱**：both of 後面接 the 限定加複數名詞，或接 you／them／us 等複數代詞。"
    ],
    "strategy": [
      "每次寫 both 就畫一個「二」字，提醒自己是兩個對象。",
      "朗讀時刻意讓舌尖出現在上下齒之間，把 /θ/ 練成反射動作。",
      "複習時把 both／all／either／neither 四個詞做成對照表一起記。",
      "做完題檢查：both 後面第一個字是 of 或名詞嗎？不是就是錯的。"
    ]
  },
  "have to use both": {
    "zh": "必須兩隻手都用",
    "ipa": "hæv tə juːz boʊθ",
    "intro": "針對您提供的英文片語 **have to use both**，這是一個由「義務表達＋動詞＋限定詞」組成的片語，完整意思是「必須兩隻手都用」。它不能單獨成句，前面要補上主詞，例如 **We have to use both hands.**。這個片語同時含有 have to 與 both 兩組規則：have to 後接原形，both 後接複數名詞或接 of 結構，位置則在名詞之前。",
    "headline": "both 後接複數；have to 後接原形，順序別反",
    "structure": [
      {
        "role": "半助動詞",
        "token": "have to",
        "pos": "半助動詞片語 (Modal-like Phrase)",
        "func": "表示義務「必須」，要放在主詞之後；後面緊接動詞原形，不加 to",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "use",
        "pos": "動詞 (Verb) — 原形",
        "func": "表示使用的動作；受詞緊接在後面，由 both 這個限定詞先加以限定",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "both",
        "pos": "限定詞 (Determiner)",
        "func": "修飾後面的複數名詞，表示「兩隻都」；放在名詞之前，也可與 of 連用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "both 後面必須接複數名詞",
        "bad": "(X) You have to use **both hand**. ／ (X) You have to use **both of hand**.",
        "ok": "(O) You have to use **both hands**.",
        "why": "both 表示「兩個都」，後面的名詞一定要用複數，兩個手就是 both hands。學生常因中文「兩隻手」看不出單複數而漏掉 s；接 of 時，of 後面同樣要接複數。判斷法：看到 both 就檢查後面的名詞有沒有 s，沒有就是錯的。",
        "exOkText": "(O) You should use **both hands** to carry the box.",
        "exOkZh": "你應該用雙手來搬這個箱子。",
        "exBadText": "(X) You should use **both hand** to carry the box.",
        "exBadNote": "錯誤：both 表示兩者都，後面的名詞必須用複數 hands"
      },
      {
        "title": "both of 的正確結構",
        "bad": "(X) You have to use **both of the hands**. ／ (X) You have to use **both of hand** here.",
        "ok": "(O) You have to use **both hands**.",
        "why": "both 有兩種合法結構：直接接複數名詞（both hands）；或用 both of，後面接 the 加複數名詞（both of the hands），也可接 you／them 等複數代詞（both of them）。名詞前有 my、this 時，才改用 both of。判斷法：看到 both of，後面必定是 the 或複數代詞，不會是單數名詞。",
        "exOkText": "(O) You have to use **both of your hands** to lift it.",
        "exOkZh": "你必須用你的雙手才能舉起它。",
        "exBadText": "(X) You have to use **both of your hand** to lift it.",
        "exBadNote": "錯誤：both of 後面的名詞也要用複數，應為 your hands"
      },
      {
        "title": "have to 後面接動詞原形",
        "bad": "(X) You have to **uses** both hands. ／ (X) You have to **using** both hands.",
        "ok": "(O) You have to **use** both hands.",
        "why": "have to 是半助動詞，後面的動詞一律使用原形，既不加 -s 也不加 -ed、更不用 -ing。學生常因主詞是 you 而誤加 s，或把整個片語誤認為是一般動詞而加上進行式。判斷法：看到 have to 就把後面的動詞還原成字典裡的原形。",
        "exOkText": "(O) We have to **use** both hands when we carry it.",
        "exOkZh": "我們搬它時必須用雙手。",
        "exBadText": "(X) We have to **using** both hands when we carry it.",
        "exBadNote": "錯誤：have to 後面接原形 use，不可使用動名詞 using"
      },
      {
        "title": "片語不能單獨成句（缺少主詞）",
        "bad": "(X) **Have to use both hands.** ／ (X) **Use both hands** is necessary.",
        "ok": "(O) **You** have to use both hands.",
        "why": "have to 是半助動詞，必須依附在主詞後面才有完整意思；單獨出現時英文會覺得缺東西，就像中文的「必須使用」沒有說誰。同理，have to use both hands 是一個片語，不能自己當主詞。判斷法：寫完先把第一個字圈起來，確認它是代詞或名詞再往下寫。",
        "exOkText": "(O) **We** have to use both hands to move the heavy box.",
        "exOkZh": "我們必須用雙手才能搬動那個沉重的箱子。",
        "exBadText": "(X) **Have to use both hands** when you move the heavy box.",
        "exBadNote": "錯誤：缺少主詞，have to 前必須加上 We、You 或 He 等主詞"
      }
    ],
    "traps": [
      "**複數漏 s 陷阱**：both 與 two、three 一樣，後面的名詞一定要加 s。",
      "**半助動詞與動詞的分工陷阱**：have to 負責表義務，use 負責動作，兩者都不能變形。",
      "**both of 與 both 的選擇陷阱**：這組名詞前有 my、this 時，會考會要求用 both of。",
      "**缺主詞陷阱**：片語單獨成句是國中寫作最常見的扣分點。"
    ],
    "strategy": [
      "把片語擴充成句練習：You have to use both hands. 每天唸一次，自然就不會漏主詞。",
      "寫完檢查兩件事：have to 後面是不是原形，both 後面是不是複數。",
      "遇到 my、this 開頭的名詞群，自動把 both 升級成 both of。",
      "用「主詞 → 半助動詞 → 原形動詞 → 限定詞 → 名詞」五格填空來拆解任何長句。"
    ]
  },
  "you have to use both": {
    "zh": "你必須兩隻手都用",
    "ipa": "juː hæv tə juːz boʊθ",
    "intro": "針對您提供的英文句子 **you have to use both**，這是一個一般現在時的肯定句，主詞是 you。句子在語法上還不完整，因為 have to use both 後面缺少受詞，完整寫法應是 **You have to use both hands.**。本句要練習的核心是：主詞與助動詞的搭配、否定與疑問句的改寫，以及 have 與 have to 的語意差異。",
    "headline": "主詞換 he 要用 has to；否定疑問都要靠助動詞",
    "structure": [
      {
        "role": "主詞",
        "token": "you",
        "pos": "代名詞 (Pronoun) — 人稱代詞主格",
        "func": "句子的主題，指說話對話的對方；you 不分單複數，後面的動詞也不加 -s",
        "mark": "O"
      },
      {
        "role": "半助動詞",
        "token": "have to",
        "pos": "半助動詞片語 (Modal-like Phrase)",
        "func": "表示義務「必須」，緊跟在主詞後面；後面直接接動詞原形",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "use",
        "pos": "動詞 (Verb) — 原形",
        "func": "核心動作「使用」；因前面是 have to，必須用原形",
        "mark": "O"
      },
      {
        "role": "限定詞",
        "token": "both",
        "pos": "限定詞 (Determiner)",
        "func": "表示「兩隻都」，後面必須接複數名詞（both hands）或接 of 結構",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數要改用 has to",
        "bad": "(X) He **have to** use both hands. ／ (X) My brother **have to** use both hands.",
        "ok": "(O) He **has to** use both hands.",
        "why": "have to 會跟著主詞變化：I、you、we、they 用 have to；he、she、it 以及單數名詞用 has to。主詞是 he 的時候學生常忘了變化，直接照抄 you 的版本。判斷法：寫完半助動詞先看主詞，單數第三人稱就立刻把 have 改成 has。",
        "exOkText": "(O) He **has to** use both hands to carry it.",
        "exOkZh": "他必須用雙手才能搬動它。",
        "exBadText": "(X) He **have to** use both hands to carry it.",
        "exBadNote": "錯誤：主詞 he 是第三人稱單數，應使用 has to"
      },
      {
        "title": "否定句必須借助助動詞 don't",
        "bad": "(X) You **not have to** use both hands. ／ (X) You **don't have** to use both hands.",
        "ok": "(O) You **don't have to** use both hands.",
        "why": "have to 已經是半助動詞，前面不能直接加 not；而 have 也不能自己變成 don't have 的形式。英文的正確做法是在 have 前面加助動詞 don’t，寫成 don’t have to。判斷法：一般現在時的否定一律先加 don’t，再接原形 have。",
        "exOkText": "(O) You **don't have to** use both hands for this job.",
        "exOkZh": "做這份工作你不必用雙手。",
        "exBadText": "(X) You **not have to** use both hands for this job.",
        "exBadNote": "錯誤：have to 前面不可直接加 not，須用助動詞 don't"
      },
      {
        "title": "疑問句要把助動詞提到主詞前面",
        "bad": "(X) You have to use both hands? ／ (X) Do you **has to** use both hands?",
        "ok": "(O) **Do** you have to use both hands?",
        "why": "一般現在時的疑問句要把 do、does、did 放在句首，主詞緊跟其後，原來的動詞還原成原形。因為原句已有 have to 這種半助動詞，所以用 do 而不是 does。判斷法：寫疑問句的固定流程是「do ＋ 主詞 ＋ 原形動詞 ＋ 其他人」，缺一項就扣分。",
        "exOkText": "(O) **Do** you have to use both hands when you lift it?",
        "exOkZh": "你舉起它的時候必須用雙手嗎？",
        "exBadText": "(X) **Does** you have to use both hands when you lift it?",
        "exBadNote": "錯誤：主詞 you 對應的是 do，不是 does"
      },
      {
        "title": "have（持有）與 have to（必須）的語意差異",
        "bad": "(X) I **have** to finish this job by Friday. ／ (X) You **have to** two hands.",
        "ok": "(O) I **have to** finish this job by Friday.",
        "why": "have 單獨使用時意思是「有、持有」；後面接 to 時整組變成 have to，意思變成「必須」。學生常因中文「有」而以為 I have to finish 是「我有空完成」，其實是「我必須完成」。判斷法：看到 have 後面接 to，就把它讀成「必須」，絕對不是「有」。",
        "exOkText": "(O) I **have** two hands, so I can carry it easily.",
        "exOkZh": "我有兩隻手，所以可以輕易地搬動它。",
        "exBadText": "(X) I **have to** two hands, so I can carry it easily.",
        "exBadNote": "錯誤：這裡是「有兩隻手」的意思，應用 have 兩隻手"
      }
    ],
    "traps": [
      "**主詞與助動詞一致性陷阱**：主詞是 he／she／it 時，have to 要變 has to，do 要變 does。",
      "**否定與疑問的助動詞陷阱**：don't 與 Do 都不能省略，句子也不能只加 not。",
      "**half 助動詞無 to 陷阱**：have to 後面再出現 to 就是錯的，複數的 to 是最常見的誘答。",
      "**have 與 have to 語意陷阱**：閱讀測驗會利用這組差別出題，看錯就答錯。"
    ],
    "strategy": [
      "寫完一句立刻做三種改寫：肯定原句、否定加 don't、疑問加 Do，三種都對得起來才算會。",
      "背熟主詞對照表：I／you／we／they → have to、do；he／she／it → has to、does。",
      "看到 have 後面接 to，就把它圈起來提醒自己讀成「必須」。",
      "練習時刻意加入時間副詞（today、tomorrow），確認句子維持一般現在時。"
    ]
  },
  "job": {
    "zh": "工作",
    "ipa": "dʒɑːb",
    "intro": "針對您提供的英文單字 **job**，這是一個可數名詞，單獨不能成句，前面要有冠詞或限定詞，例如 **a new job**、**my job**。job 指的是「一份工作、一個職位」，是可被辭退、可以被找的那一份；相對的 work 指的是「工作這件事」這個抽象概念。這個字要特別留意拼寫的雙 b 結尾，以及與 work、career 的詞義差別。",
    "headline": "可數名詞前面要有冠詞；job 是職位，work 是這件事",
    "structure": [
      {
        "role": "詞性",
        "token": "job",
        "pos": "名詞 (Noun) — 可數名詞",
        "func": "指「一份工作、一個職位」；前面要加 a／an 或 my、his、your 等限定詞，複數為 jobs",
        "mark": "O"
      },
      {
        "role": "常見搭配",
        "token": "job",
        "pos": "名詞 (Noun) 搭配 do／find／lose／quit a job",
        "func": "job 前常搭配 do（做）、find（找到）、lose（失去）、quit（辭去）等動詞，形成固定片語",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼寫錯誤：不可寫成 jop 或 jobb",
        "bad": "(X) I got a new **jop**. ／ (X) She found a **jobb** last month.",
        "ok": "(O) I got a new **job**.",
        "why": "job 的拼法是 j-o-b，只有一個 b；結尾的 b 雖然不發音，但一定要寫出來。台灣學生常因中文「工作」兩字而寫成 jop，或以為 b 是雙唇音要寫成雙 b。判斷法：把它和 job 的近義詞 work、office 排在一起唸，j-o-b 一個音節三個字母，寫法就固定了。",
        "exOkText": "(O) My sister found a **job** in Taipei.",
        "exOkZh": "我姐姐在台北找到了一份工作。",
        "exBadText": "(X) My sister found a **jop** in Taipei.",
        "exBadNote": "錯誤：拼字應為 job，不可寫成 jop 或多加一個 b"
      },
      {
        "title": "發音：字尾 b 與母音的讀法",
        "bad": "(X) **job** 唸成 /dʒɒp/ ／ (X) **job** 唸成 /dʒɑːpiː/",
        "ok": "(O) **job** 唸成 /dʒɑːb/（英式 /dʒɒb/）",
        "why": "字尾的 b 雖然不帶 e，仍然要發出 /b/ 的音，不可省略成 /p/；母音部分美式讀 /ɑː/、英式讀 /ɒ/，指的是同一個字。學生常因中文沒有捲舌而唸成 /dʒo/。判斷法：唸出 job 後用手摸喉嚨，應該有明顯的震動感，那就是 /b/。",
        "exOkText": "(O) He **quit** his **job** last Friday.",
        "exOkZh": "他上週五辭掉了他的工作。",
        "exBadText": "(X) He **quit** his **jop** last Friday.",
        "exBadNote": "錯誤：拼字漏掉字尾 b，唸出來也會變成 /dʒɒp/，正確是 job /dʒɑːb/"
      },
      {
        "title": "詞義辨析：job、work 與 career",
        "bad": "(X) I did a lot of **job** today. ／ (X) She is looking for a **work** in Kaohsiung.",
        "ok": "(O) She is looking for a **job** in Kaohsiung.",
        "why": "job 是可數的「一份工作」，前面要有 a 或 my；work 不可數，泛指「工作這件事」，前面不能加 a。career 則指「職涯、生涯」這種長期的軌跡。學生最常犯的錯是加冠詞時不分可數不可數。判斷法：前面要放 a 時，先問這個字能不能數——能數用 job，不能數用 work。",
        "exOkText": "(O) She has a **career** in a new **job** now.",
        "exOkZh": "她現在在新工作中有自己的職涯。",
        "exBadText": "(X) She has a **work** in a new **job** now.",
        "exBadNote": "錯誤：work 是不可數名詞，前面不可加冠詞 a"
      },
      {
        "title": "搭配錯誤：job 前的固定動詞",
        "bad": "(X) I **make** a new job. ／ (X) He **ate** his job last month.",
        "ok": "(O) I **do** a new job.",
        "why": "job 前面常見的固定搭配是 do a job（做）、find a job（找到）、lose a job（失去）、quit a job（辭去），這幾個動詞要背下來。台灣學生常因中文「做工作」而寫成 make a job。判斷法：把這四組搭配當成一個字庫記，寫作時先挑動詞再放 job。",
        "exOkText": "(O) She **found** a new **job** in Tainan.",
        "exOkZh": "她在台南找到了一份新工作。",
        "exBadText": "(X) She **made** a new **job** in Tainan.",
        "exBadNote": "錯誤：表示「找到工作」應用 found a job，不是 made a job"
      }
    ],
    "traps": [
      "**可數與不可數陷阱**：job 可數、work 不可數，選項中出現 a work 這種寫法時要立刻判錯。",
      "**拼字與音節陷阱**：job 只有一個 b，若寫成 jobb 在會考中屬於拼字錯。",
      "**搭配陷阱**：do／find／lose／quit a job 是高頻固定搭配，克漏字常從這裡出題。",
      "**冠詞陷阱**：a job、my job、this job 前面都要有冠詞或限定詞，不可裸放。"
    ],
    "strategy": [
      "把 job、work、career、office 畫成對照表，標出可數不可數與中文差異。",
      "每次寫到名詞先問一句：它前面需要 a／an 嗎？需要的就是可數名詞。",
      "背四個固定搭配：do、find、lose、quit a job，做完就記。",
      "練習時把 job 放進完整句子裡唸，不要只背單字，才能記住前面的冠詞。"
    ]
  },
  "new job": {
    "zh": "新工作",
    "ipa": "nuː dʒɑːb",
    "intro": "針對您提供的英文片語 **new job**，這是一個「形容詞＋名詞」組成的名詞片語，本身不是完整句子，必須有主詞和 be 動詞才能成句，例如 **This is my new job.** 或 **I got a new job.**。new 放在名詞之前表示「新來的、剛得到的」。這個片語要留意的是形容詞的位置、new 不能加 -ly，以及複合形容詞修飾 job 時的連字符號規則。",
    "headline": "形容詞放名詞前；複合形容詞要加連字符號",
    "structure": [
      {
        "role": "形容詞",
        "token": "new",
        "pos": "形容詞 (Adjective)",
        "func": "修飾後面的名詞 job，表示「新得到的」；形容詞一律置於名詞之前，不加 -ly",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "job",
        "pos": "名詞 (Noun) — 可數名詞",
        "func": "片語的核心，指「一份工作、一個職位」；前面要補上 a／an 或 my、this 等限定詞與主詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "形容詞 new 必須置於名詞之前",
        "bad": "(X) I got a job **new** in Taipei. ／ (X) This is the **job new** I want.",
        "ok": "(O) I got a **new job** in Taipei.",
        "why": "英文的形容詞一律放在名詞前面，中文的「工作新」在英文裡絕對不能出現。學生有時受中文倒裝語序影響，把形容詞丟到名詞後面。判斷法：寫完後檢查形容詞與名詞的位置，只要形容詞出現在名詞後面就是錯的。另外要注意，若前面還有 my、this 等限定詞，正確順序是「限定詞 → new → 名詞」。",
        "exOkText": "(O) She is happy with her **new job**.",
        "exOkZh": "她對她的新工作很滿意。",
        "exBadText": "(X) She is happy with her job **new**.",
        "exBadNote": "錯誤：形容詞 new 必須放在名詞 job 之前"
      },
      {
        "title": "new 不可加 -ly（newly 誤用）",
        "bad": "(X) This is a **newly** job. ／ (X) He **newly** found a job in Taipei.",
        "ok": "(O) He **newly** found a job in Taipei.",
        "why": "形容詞要修飾名詞，用的就是 new 本身；加 -ly 之後的 newly 變成副詞，只能修飾動詞，不能修飾名詞，也不能放在冠詞與名詞之間。學生常因中文「新的、新近地」不分而混用。判斷法：看後面接的是名詞還是動詞——名詞用 new，動詞用 newly。",
        "exOkText": "(O) He **newly** found a job in Taipei last week.",
        "exOkZh": "他上週在台北新找到一份工作。",
        "exBadText": "(X) He **new** found a job in Taipei last week.",
        "exBadNote": "錯誤：修飾動詞 found 必須用副詞 newly，而不是形容詞 new"
      },
      {
        "title": "複合形容詞修飾 job 須用連字符號",
        "bad": "(X) She got a **full time** job. ／ (X) He is looking for a **parttime** job.",
        "ok": "(O) She got a **full-time** job.",
        "why": "當兩個以上的單字共同修飾同一個名詞時，就形成複合形容詞，必須用連字符號連起來：full-time job、part-time job、well-paid job。台灣學生常忘記加連字符號。判斷法：看名詞前面有兩個以上單字，就檢查它們之間是否已經用連字符號接起來。",
        "exOkText": "(O) He found a **well-paid** **full-time** job.",
        "exOkZh": "他找到一份薪水不錯的全職工作。",
        "exBadText": "(X) He found a **well paid full time** job.",
        "exBadNote": "錯誤：複合形容詞之間必須加連字符號，應為 well-paid full-time job"
      },
      {
        "title": "冠詞 a 與 the 的選擇",
        "bad": "(X) I got **new job** in Taipei. ／ (X) I got **a the** new job in Taipei.",
        "ok": "(O) I got **a new job** in Taipei.",
        "why": "job 是可數名詞，前面一定要有冠詞或限定詞。如果這份工作第一次被提到、對方還不知道是哪一份，要用不定的 a；如果是前面已經提過的那一份，要用 the。學生常直接省略冠詞，或同時放兩個冠詞。判斷法：名詞前沒有 my／this 之類的限定詞時，就必須補上 a 或 the。",
        "exOkText": "(O) I got **a new job** last month, and **the new job** pays well.",
        "exOkZh": "我上個月找到一份新工作，而那份新工作的薪水不錯。",
        "exBadText": "(X) I got **a the new job** last month.",
        "exBadNote": "錯誤：一個名詞前只能有一個冠詞，a 與 the 不可同時使用"
      }
    ],
    "traps": [
      "**冠詞省略陷阱**：可數名詞單獨出現時前面一定要有 a／an 或 the，漏掉就是錯。",
      "**形容詞位置陷阱**：選項常故意把形容詞放到名詞後面，讀起來中文通順但英文錯誤。",
      "**-ly 誤加陷阱**：newly 只能修飾動詞，看到它緊貼著名詞就要判錯。",
      "**連字符號陷阱**：full-time、part-time 這類複合形容詞少寫連字符號，在選擇題中很容易被忽略。"
    ],
    "strategy": [
      "把形容詞與名詞綁在一起背誦：new job、good job、new house、good friend，形狀永遠是「形容詞在左」。",
      "寫完名詞片語立刻檢查冠詞：前面有沒有 a／an、the、my？沒有就補上。",
      "遇到兩個字以上修飾名詞，馬上補上連字符號。",
      "朗讀時用「新的工作」的自然語序帶入，別在腦中翻譯成「工作新」。"
    ]
  },
  "his new job": {
    "zh": "他的新工作",
    "ipa": "hɪz nuː dʒɑːb",
    "intro": "針對您提供的英文片語 **his new job**，這是一個名詞片語，不能單獨成句，前面必須補上主詞或動詞才有完整意思（例如 His new job is interesting.）。它由「物主代名詞 his + 形容詞 new + 可數名詞 job」三個部分組成，是國中教育會考出現率最高的所有格結構。本句最該注意兩件事：his 後面一定要接名詞；job 是可數名詞，數量一變，單複數就要跟著改。",
    "headline": "his 後面要接名詞；job 是可數名詞",
    "structure": [
      {
        "role": "物主代名詞",
        "token": "his",
        "pos": "物主代名詞 (Possessive Pronoun) — 相當於「他的」",
        "func": "修飾後面的名詞，表示「屬於他的」；它本身不能單獨作主詞或受詞，後面一定要接名詞",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "new",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞 job，表示「新」；英文的形容詞必須放在名詞前面，和中文「新的工作」順序一樣",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "job",
        "pos": "可數名詞 (Countable Noun)",
        "func": "表示「工作、職位」；可數名詞有單複數，前面有 his 這種限定詞時表示「屬於他的那一個」，所以用單數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "物主代名詞與主格、賓格代名詞混淆",
        "bad": "(X) **He** new job is interesting. ／ (X) **Him** new job is interesting.",
        "ok": "(O) **His** new job is interesting.",
        "why": "he 是主格（他）、him 是賓格（他），兩者都不能直接修飾名詞；表示「他的」必須用所有格形式 his。學生常以為「他」只有 he 一個說法，遇到名詞片語就順手寫上 he。判斷法：看到「某人的 + 名詞」，一律反射寫 his / her / my / your / their，絕不寫 he / him / I / me。",
        "exOkText": "(O) **His** new job is interesting.",
        "exOkZh": "他的新工作很有趣。",
        "exBadText": "(X) **He** new job is interesting.",
        "exBadNote": "錯誤：He 是主格代名詞，不能當形容詞修飾名詞；要表示「他的」必須用所有格 his。"
      },
      {
        "title": "可數名詞單複數誤用（job → jobs）",
        "bad": "(X) He has **two new job**. ／ (X) He has **a new jobs**.",
        "ok": "(O) He has **two new jobs**.",
        "why": "job 是可數名詞，數量大於一就要加 -s 變成 jobs。學生常以為「job 後面已經有形容詞 new，就不用管單複數」，或看到 two 卻忘記名詞也要變化。判斷法：只要名詞前面出現 two、three、many、a lot of 這類數量詞，就立刻檢查名詞有沒有 -s。",
        "exOkText": "(O) She has **three new jobs**.",
        "exOkZh": "她有三份新工作。",
        "exBadText": "(X) She has **three new job**.",
        "exBadNote": "錯誤：three 已是複數數量，job 也要變成 jobs，可數名詞的單複數必須一致。"
      },
      {
        "title": "可數單數名詞前漏加冠詞",
        "bad": "(X) He likes **new job**. ／ (X) **New job** is not easy to find.",
        "ok": "(O) He likes **a new job**.",
        "why": "英文有冠詞：單數可數名詞單獨出現時，前面一定要有 a / an 或 his / my / this 這類限定詞，不能光一個名詞就當主詞或受詞。學生受中文影響，覺得「工作」兩個字就夠了。判斷法：把名詞圈起來往左看，左邊沒有任何限定詞或冠詞，就是漏寫了。",
        "exOkText": "(O) **A new job** is not easy to find.",
        "exOkZh": "一份新工作不好找。",
        "exBadText": "(X) **New job** is not easy to find.",
        "exBadNote": "錯誤：單數可數名詞前要加冠詞 a，不能讓 New job 直接當主詞；中文可以省略冠詞，英文不行。"
      },
      {
        "title": "拼字與尾音發音錯誤",
        "bad": "(X) **joob** ／ (X) **jobb**",
        "ok": "(O) **job**",
        "why": "job 只有一個 b 結尾，寫成 joob 或 jobb 都是多字。發音上 j 要讀 /dʒ/ 像中文「只」，不是 /j/；而句尾的 b 在非重讀時不發出聲音，所以不能讀成「job-b」。判斷法：寫完單字回頭掃一次 b 是不是只有一個，再大聲唸出來確認尾音有沒有被唸出來。",
        "exOkText": "(O) **His new job** is not easy to find.",
        "exOkZh": "他的新工作不好找。",
        "exBadText": "(X) **His new joob** is not easy to find.",
        "exBadNote": "錯誤：job 只有一個 b，而且尾音 /b/ 在這裡不發出聲音，不能拼成 joob。"
      }
    ],
    "traps": [
      "**所有格的陷阱**：his 後面一定要接名詞。如果整句已經有主詞（His new job is…），his 只是修飾詞；絕對不能寫成 He new job。",
      "**可數名詞的陷阱**：job 是可數名詞，泛指「一份工作」時前面要有 a / an 或 his / my；寫作單獨的 New job 是錯的。",
      "**單複數的陷阱**：這裡指「他的新工作」一件事，所以用單數 job；只有當數量變成兩份以上才寫 jobs。",
      "**發音的陷阱**：job 的 j 讀 /dʒ/，尾音 b 不發音，不能把 b 唸出來或拼成雙 b。"
    ],
    "strategy": [
      "看到「某人的」就反射寫 his / her / my / your，寫完立刻檢查後面有沒有名詞。",
      "名詞前先放限定詞：泛指單一事物寫 a new job，特指某人所有寫 his new job，兩種不能混。",
      "大聲唸 his new job，重音要落在 job，his 和 new 輕輕帶過，語感會自然很多。",
      "把 job–jobs 連同 two / three / many 一起背誦，看到數量詞就檢查名詞的 -s。"
    ]
  },
  "in his new job": {
    "zh": "在他的新工作上",
    "ipa": "ɪn hɪz dʒɑːb",
    "intro": "針對您提供的英文片語 **in his new job**，這是一個介詞片語（前置詞組），不能單獨成句，必須放在名詞或動詞後面，或放在句首作狀語才有完整意思。它由「介詞 in + 物主代名詞 his + 形容詞 new + 名詞 job」組成，用來說明動作發生的場所或範圍。本句最該注意：工作場所的介詞怎麼選，以及介詞後面為什麼一定要用所有格 his。",
    "headline": "介系詞要選對；介詞後用所有格 his",
    "structure": [
      {
        "role": "介系詞",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "和後面的名詞片語組成介詞片語，表示「在……裡面」或「在……範圍之內」，用來交代動作發生的場所",
        "mark": "O"
      },
      {
        "role": "物主代名詞",
        "token": "his",
        "pos": "物主代名詞 (Possessive Pronoun)",
        "func": "修飾後面的名詞 job；介詞後面要修飾名詞，只能用所有格 his，不能用 he 或 him",
        "mark": "O"
      },
      {
        "role": "形容詞",
        "token": "new",
        "pos": "形容詞 (Adjective)",
        "func": "修飾名詞 job，表示「新」，放在名詞前面",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "job",
        "pos": "可數名詞 (Countable Noun)",
        "func": "表示「工作」；被 his 限定成「他的那一個」，所以用單數，被整個介詞片語 in his new job 涵蓋",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞選擇錯誤（in / at / on）",
        "bad": "(X) Alan works **at** his new office building. ／ (X) She is **on** her new classroom.",
        "ok": "(O) Alan works **in** his new office building.",
        "why": "in 表示「在……物體內部」，at 表示「在某個地點、某機構」，on 表示「在……表面上」。當你指涉的是一棟建築或一個房間的內部時，用 in；只有指整個地點或機構名稱時才用 at。判斷法：中文說「在辦公大樓裡面」有「裡面」，就選 in。",
        "exOkText": "(O) Alan works **in** his new office building.",
        "exOkZh": "亞倫在他的新辦公大樓裡工作。",
        "exBadText": "(X) Alan works **at** his new office building.",
        "exBadNote": "錯誤：在建築物內部要用 in；at 是指「在某個地點」，不強調裡面，中文的語意也對不上。"
      },
      {
        "title": "介詞後的可數名詞誤加複數",
        "bad": "(X) He works hard **in his new jobs**. ／ (X) She is happy **in her new job**s.",
        "ok": "(O) He works hard **in his new job**.",
        "why": "job 前面已經被 his 限定成單數的一個，介詞片語裡的名詞也必須維持單數。學生常以為「工作」講久了就會變多份，於是習慣性加 -s。判斷法：看到 his / her / my 這類「一個」的限定詞，後面的可數名詞就鎖定單數；只有 many / several / 數字複數才加 -s。",
        "exOkText": "(O) She is happy **in her new job**.",
        "exOkZh": "她在新工作上很快樂。",
        "exBadText": "(X) She is happy **in her new jobs**.",
        "exBadNote": "錯誤：her 表示「她的那一個」，job 必須是單數；只要有 his / her 限定就不能加 -s。"
      },
      {
        "title": "介詞後誤用主格或賓格代名詞",
        "bad": "(X) He works hard **in him new job**. ／ (X) He works hard **in he new job**.",
        "ok": "(O) He works hard **in his new job**.",
        "why": "英文的介詞後面要接「名詞或名詞相當的詞」，所以要修飾名詞時只能用所有格 his / her / my / your；he 是主格、him 是賓格，都不能放在介詞後修飾名詞。判斷法：介詞後面出現 he、him、I、me、they、them，就一定是錯的，直接改成 his、her、my、ours。",
        "exOkText": "(O) My brother is busy **in his new job**.",
        "exOkZh": "我哥哥在他的新工作上很忙。",
        "exBadText": "(X) My brother is busy **in him new job**.",
        "exBadNote": "錯誤：介詞後要修飾名詞，只能用所有格 his；主格 he 與賓格 him 都不行。"
      },
      {
        "title": "前置片語不能單獨成句",
        "bad": "(X) **In his new job.** ／ (X) **In his new job** is very interesting.",
        "ok": "(O) **In his new job**, he works hard.",
        "why": "in his new job 裡面只有介詞和名詞，沒有主詞也沒有動詞，所以它只是一個「單位」，不能自己成句。放在句首時，後面一定要補上「主詞 + 動詞」才完整。判斷法：寫完問自己三個問題——誰？做什麼？什麼時候？三個都答不出來，就表示這只是片語。",
        "exOkText": "(O) **In his new job**, Alan works very hard.",
        "exOkZh": "在他的新工作上，亞倫非常努力。",
        "exBadText": "(X) **In his new job** is very interesting.",
        "exBadNote": "錯誤：in his new job 只是介詞片語，前面缺主詞與動詞，不能自己成句。"
      }
    ],
    "traps": [
      "**介詞的陷阱**：in 表示在物體內部，at 表示在某個地點，on 表示在表面上。會考常直接考「He works ___ his new office.」這種單選。",
      "**數量一致的陷阱**：介詞片語裡的名詞若被 his / a / this 限定，必須是單數；看到 his new 就要檢查 job 有沒有被誤加 -s。",
      "**片語不能獨站的陷阱**：介詞開頭放在句首時，後面一定要補主詞動詞，例如 In his new job, he works hard. 才成立。",
      "**in 與 at 的陷阱**：在教室裡面是 in a classroom，指整間學校這個地點是 at school，意思不同，選錯就扣分。"
    ],
    "strategy": [
      "先背三個代表句：in my bedroom、at school、on the wall，其他地點自然套用。",
      "把介詞片語用括號圈起來，檢查括號內名詞前面有沒有 his / a / this，單複數是否一致。",
      "介詞後面永遠不寫 he、him、I、me、they、them，看到就立刻換成所有格或名詞。",
      "寫完介詞片語就問「誰？做什麼？」，答不出來表示還缺主詞和動詞，要補齊。"
    ]
  },
  "works": {
    "zh": "工作",
    "ipa": "wɜːrks",
    "intro": "針對您提供的英文單字 **works**，這是一個動詞，不能單獨成句，前面必須補上主詞（例如 He works.）。它是 work（工作）的第三人稱單數現在式，用來描述一個人現在或平常做的動作。本句最該注意：主詞是第三人稱單數時，動詞一定要加 -s；另外 work 和 job 意思相近但詞性不同，不能互換。",
    "headline": "第三人稱單數要加 -s；分清 work 與 job",
    "structure": [
      {
        "role": "動詞",
        "token": "works",
        "pos": "動詞 (Verb) — work 的第三人稱單數現在式",
        "func": "句子動作的主幹，表示「工作、做事」；它是不及物動詞，本身不帶受詞，前面要有主詞",
        "mark": "O"
      },
      {
        "role": "字尾變化",
        "token": "-s",
        "pos": "動詞第三人稱單數字尾",
        "func": "附在 work 後面，表示主詞是 he / she / it 或單數名詞；如果主詞是 I / you / we / they 就用原形 work",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "第三人稱單數漏加 -s（work → works）",
        "bad": "(X) He **work** every day. ／ (X) She **work** hard.",
        "ok": "(O) He **works** every day.",
        "why": "一般現在式只要主詞是 he / she / it 或單數名詞，動詞就要加 -s 或 -es。學生最常忘記的就是第三人稱單數。判斷法：寫完句子先看主詞，是 he / she / it 或單數名詞就畫一個圈提醒自己加 -s；主詞是 I / you / we / they 或複數名詞則維持原形。",
        "exOkText": "(O) My father **works** in a bank.",
        "exOkZh": "我爸爸在銀行工作。",
        "exBadText": "(X) My father **work** in a bank.",
        "exBadNote": "錯誤：主詞 My father 是第三人稱單數，動詞要加 -s 變成 works。"
      },
      {
        "title": "詞義混淆：work 與 job 不可互換",
        "bad": "(X) He wants a **work** in Taipei. ／ (X) She found a new **work**.",
        "ok": "(O) He wants a **job** in Taipei.",
        "why": "work 是動詞「工作」，也可以是不可數名詞，表示「工作這件事」；job 才是可數名詞，表示「一份工作、職位」。中文裡兩者都譯成「工作」，學生很容易直接用 a 加上 work。判斷法：看到 a、an 或 many 這類數量詞，想表示「一份工作」時一定要用 job。",
        "exOkText": "(O) He wants a **job** in Taipei.",
        "exOkZh": "他想在台北找到一份工作。",
        "exBadText": "(X) He wants a **work** in Taipei.",
        "exBadNote": "錯誤：a 後面要接可數名詞單數，表示「一份工作」要用 job，不能用動詞 work。"
      },
      {
        "title": "主詞人稱與動詞不一致",
        "bad": "(X) They **works** in the same company. ／ (X) I **works** every day.",
        "ok": "(O) They **work** in the same company.",
        "why": "動詞的形式要跟主詞的人稱和數一致。they、we、you、I 都是複數或非第三人稱單數，動詞一律用原形 work，不加 -s。學生常偷懶，看到動詞就想加 -s。判斷法：加 -s 之前先問「主詞是不是 he / she / it？」只有這三種或其代名詞的單數名詞才加，其餘都維持原形。",
        "exOkText": "(O) My classmates **work** very hard.",
        "exOkZh": "我的同學們非常努力。",
        "exBadText": "(X) My classmates **works** very hard.",
        "exBadNote": "錯誤：主詞 classmates 是複數（they），動詞要用原形 work，不加 -s。"
      },
      {
        "title": "時態誤用（用過去式講現在的日常）",
        "bad": "(X) He **worked** every day. ／ (X) She **worked** in a hospital.",
        "ok": "(O) He **works** every day.",
        "why": "works 是一般現在式，描述習慣或現在正在做的事；worked 是過去式，描述已經發生過一次的事。學生常因為「工作很辛苦」而直接用過去式敘述。判斷法：句中出現 every day、usually、often、every morning 這類表示習慣的時間副詞，就一定要用一般現在式。",
        "exOkText": "(O) She **works** in a hospital.",
        "exOkZh": "她在醫院工作。",
        "exBadText": "(X) She **worked** in a hospital.",
        "exBadNote": "錯誤：這裡描述她平常的工作地點，屬於一般現在式，不能用過去式 worked。，這也是會考最常見的錯誤之一。"
      }
    ],
    "traps": [
      "**第三人稱單數的陷阱**：主詞是 he / she / it 或單數名詞時，一般現在式動詞一定要加 -s 或 -es（work → works，go → goes）。",
      "**複數主詞的陷阱**：主詞是 I / you / we / they 或複數名詞時，動詞用原形，不加 -s。",
      "**可數與不可數的陷阱**：work 表示「工作這件事」時是不可數名詞，不能說 a work；要用「一份工作」得用 job。",
      "**時態的陷阱**：works 描述現在的日常，表示昨天做過的事要改用 worked，兩者不能互換。"
    ],
    "strategy": [
      "寫完主詞立刻檢查一次：he / she / it / 單數名詞 → 加 -s；其他 → 原形。",
      "把 work–works、study–studies、go–goes、watch–watches 綁在一起背，不要只背 work。",
      "分清楚 work（動作、不可數）與 job（可數職位），看到 a、an、many 就聯想到 job。",
      "用時間副詞驗證時態：每週、每天 → 現在式；昨天、上個月 → 過去式（worked）。"
    ]
  },
  "works hard": {
    "zh": "努力工作",
    "ipa": "wɜːrks hɑːrd",
    "intro": "針對您提供的英文片語 **works hard**，這是一個「動詞 + 副詞」的動詞片語，不能單獨成句，前面要補主詞（例如 He works hard.）。它表示「努力工作」。本句最該注意：這裡的 hard 是副詞（修飾動詞），不是形容詞；而且 work hard 是動詞片語，hard work 是名詞片語，兩者詞序不能互換。",
    "headline": "hard 要當副詞；兩組詞序別搞混",
    "structure": [
      {
        "role": "動詞",
        "token": "works",
        "pos": "動詞 (Verb) — work 的第三人稱單數現在式",
        "func": "動作的主幹，表示「工作」；主詞是 he / she / it 或單數名詞時要加 -s",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "hard",
        "pos": "副詞 (Adverb) — 形容詞 hard 的副詞形式",
        "func": "放在動詞後面修飾 works，表示「努力地、認真地」；修飾動詞一定要用副詞，不能用形容詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "副詞位置錯誤（受中文語序影響）",
        "bad": "(X) **Hard** he works every day. ／ (X) He **hard** works every day.",
        "ok": "(O) He works **hard** every day.",
        "why": "英文的方式副詞修飾動詞時，通常放在「動詞 + 受詞」之後，稱為尾端副詞位置。中文的「他努力地工作」常讓學生把副詞塞在動詞前面。判斷法：把副詞移到受詞後面讀一次，如果句子通順、意思不變，那就是正確位置。",
        "exOkText": "(O) He works **hard** in his new job.",
        "exOkZh": "他在新工作上很努力。",
        "exBadText": "(X) He **hard** works in his new job.",
        "exBadNote": "錯誤：方式副詞 hard 要放在動詞與受詞之後，不能提到動詞前面當強調語。，這樣的語序讀起來才自然。"
      },
      {
        "title": "hard 與 hardly 混淆",
        "bad": "(X) He **hardly** works. ／ (X) She **hardly** studies every day.",
        "ok": "(O) He works **hard**.",
        "why": "hard 意思是否「努力地」；hardly 卻是「幾乎不」，等於 almost not，意思完全相反。學生常以為副詞都要加 -ly，所以把 hard 也變成 hardly。判斷法：中文翻譯時如果句子變成「他幾乎不工作」，就代表你用錯字了，應該改回 hard。",
        "exOkText": "(O) She works **hard** in the kitchen.",
        "exOkZh": "她在廚房裡努力工作。",
        "exBadText": "(X) She **hardly** works in the kitchen.",
        "exBadNote": "錯誤：hardly 是「幾乎不」，意思和「努力地」完全相反，應改回 hard。，兩者只差一個 ly。"
      },
      {
        "title": "動詞片語與名詞片語詞序顛倒",
        "bad": "(X) He does **works hard**. ／ (X) She likes **works hard**.",
        "ok": "(O) He works **hard**. ／ (O) She likes **hard work**.",
        "why": "work hard 是「動詞 + 副詞」，表示一個動作；hard work 是「形容詞 + 名詞」，表示「辛苦的工作」這件事。兩者詞序相反，意義完全不同。判斷法：看後面的字：後面接動詞原形就是 work hard；後面接名詞就是 hard work。",
        "exOkText": "(O) His **hard work** paid off.",
        "exOkZh": "他的努力有了回報。",
        "exBadText": "(X) His **works hard** paid off.",
        "exBadNote": "錯誤：這裡要用名詞片語 hard work；works hard 是動詞片語，不能當名詞用。"
      },
      {
        "title": "比較級誤用（hard 不能再加 more）",
        "bad": "(X) He works **more hard** than me. ／ (X) She works **most hard** in our class.",
        "ok": "(O) He works **harder** than me.",
        "why": "hard 本身已經是副詞，是「努力地」的程度副詞，比較級直接加 -er 變成 harder，不能再加 more；最高級同理用 the hardest。學生常套用「多音節形容詞加 more」的規則，結果多此一舉。判斷法：看到 hard、fast、late、early 這類短副詞，一律用 -er / -est。",
        "exOkText": "(O) My brother works **harder** than me.",
        "exOkZh": "我哥哥比我更努力。",
        "exBadText": "(X) My brother works **more hard** than me.",
        "exBadNote": "錯誤：hard 的比較級是 harder，不能再加 more 這個形容詞的用法。"
      }
    ],
    "traps": [
      "**副詞位置的陷阱**：方式副詞修飾動詞時，位置在「動詞 + 受詞」之後，例如 works hard in his new job。",
      "**hard 與 hardly 的陷阱**：hardly 是「幾乎不」，和 hard「努力地」意思相反，選錯會把句意整個翻轉。",
      "**詞序的陷阱**：work hard 是動詞（努力工作），hard work 是名詞（辛苦的工作），會考克漏字常拿這組交換出題。",
      "**比較級的陷阱**：hard、fast、late 這類短副詞用 -er / -est，不能加 more / most。"
    ],
    "strategy": [
      "寫完句子檢查副詞位置：能移到受詞後面且意思不變的，就是正確位置。",
      "把 hard 與 hardly 做成對照卡，唸出中文「努力地」和「幾乎不」確認自己分得清。",
      "看到 work 就要立刻問後面接的是動詞還有名詞，一句話決定用 work hard 還是 hard work。",
      "比較級只記三個：harder / hardest、fast / fastest、earlier / earliest。"
    ]
  },
  "works hard in his new job": {
    "zh": "在他的新工作上努力工作",
    "ipa": "wɜːrks hɑːrd ɪn hɪz dʒɑːb",
    "intro": "針對您提供的英文片語 **works hard in his new job**，這是一個「動詞片語 + 介詞片語」的組合單位，不能單獨成句，前面要補主詞。它表示「在他的新工作上努力工作」，裡面同時有動作、程度和地點三層意思。本句最該注意：工作地點的介詞怎麼選、方式副詞要放哪裡，以及 hard 只能修飾動詞不能修飾名詞。",
    "headline": "副詞放動詞後；hard 不能修飾 job",
    "structure": [
      {
        "role": "動詞",
        "token": "works",
        "pos": "動詞 (Verb) — work 的第三人稱單數現在式",
        "func": "整個片語的核心動作，表示「工作」；主詞是第三人稱單數時要加 -s",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "hard",
        "pos": "副詞 (Adverb)",
        "func": "緊接在動詞後面修飾 works，表示「努力地」；修飾動詞只能用副詞",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "和後面的名詞片語組成介詞片語，表示動作發生的場所或範圍",
        "mark": "O"
      },
      {
        "role": "名詞片語",
        "token": "his new job",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被 in 引導，作為整個介詞片語的中心，表示「他的那份新工作」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "工作場所介詞選擇錯誤（in / at / on）",
        "bad": "(X) He works hard **at** his new school. ／ (X) She works hard **on** her new school.",
        "ok": "(O) He works hard **in** his new school.",
        "why": "in 強調「在……裡面」，at 強調「在某個地點」，on 強調「在……表面上」，三者不能混用。這裡指他在建築物內做事，教材一律以 in 為準。判斷法：中文裡有「裡面、當中」就用 in；只說「在某某學校」且指整個地點時才用 at。",
        "exOkText": "(O) He works hard **in** his new school.",
        "exOkZh": "他在新學校裡努力工作。",
        "exBadText": "(X) He works hard **on** his new school.",
        "exBadNote": "錯誤：on 是「在……表面上」，學校是場所不是平面，工作場所的內部要用 in。，介詞不能隨意替換。"
      },
      {
        "title": "動詞字尾 -s 遺漏（work → works）",
        "bad": "(X) He **work** hard in his new job. ／ (X) She **work** hard every day.",
        "ok": "(O) He **works** hard in his new job.",
        "why": "片語變長不代表主詞改變了。只要主詞是 he / she / it 或單數名詞，動詞就要加 -s。學生常因為後面還有一大串 in his new job，就忘記先處理動詞。判斷法：先只寫「主詞 + 動詞」兩個字，確認形式正確之後再往後接其他部分。",
        "exOkText": "(O) Alan **works** hard in his new job.",
        "exOkZh": "亞倫在他的新工作上努力工作。",
        "exBadText": "(X) Alan **work** hard in his new job.",
        "exBadNote": "錯誤：主詞 Alan 是第三人稱單數，動詞要加 -s 變成 works，不能用原形 work。"
      },
      {
        "title": "副詞與介詞片語位置顛倒",
        "bad": "(X) He works **in his new job hard**. ／ (X) He works **hard in his new** job.",
        "ok": "(O) He works **hard in his new job**.",
        "why": "英文的標準語序是「主詞 + 動詞 + 方式副詞 + 地點介詞片語」。學生常受中文「在他的新工作上努力工作」影響，把地點提到前面。判斷法：口訣是「動詞後先方式、再地方」，也就是副詞一定排在介詞片語之前。",
        "exOkText": "(O) He works **hard in his new job**.",
        "exOkZh": "他在新工作上努力工作。",
        "exBadText": "(X) He works **in his new job hard**.",
        "exBadNote": "錯誤：方式副詞 hard 必須放在地點介詞片語之前，不能移到 in his new job 後面。"
      },
      {
        "title": "把副詞 hard 誤當形容詞修飾名詞",
        "bad": "(X) He works in **his new hard job**. ／ (X) She is happy in **a hard work**.",
        "ok": "(O) He works hard in **his new job**.",
        "why": "hard 修飾動詞 works 時是副詞，修飾名詞時才是形容詞。這個片語裡的 job 已經被 his new 限定，hard 若插到 job 前面就變成修飾名詞，語意變成「嚴苛的新工作」。判斷法：看到要修飾的是名詞就必須用形容詞，而這裡要修飾的是動詞，所以 hard 必須跟在 works 後面。",
        "exOkText": "(O) He works **hard** in **his new job**.",
        "exOkZh": "他在他的新工作上努力工作。",
        "exBadText": "(X) He works in **his new hard job**.",
        "exBadNote": "錯誤：hard 在這裡修飾動詞 works，不能放到名詞 job 前面當形容詞。"
      }
    ],
    "traps": [
      "**語序的陷阱**：「動詞 + 方式副詞 + 介詞片語」是固定順序，works hard in his new job 不能倒成 works in his new job hard。",
      "**介詞的陷阱**：in 表示在物體內部，at 表示在某個地點；工作場所的介詞是會考常見考點。",
      "**詞性的陷阱**：hard 修飾動詞用副詞、修飾名詞用形容詞，位置一換意義就變了。",
      "**片語完整性的陷阱**：這個單位沒有主詞，不能單獨成句，必須補上 he / she / Alan 才完整。"
    ],
    "strategy": [
      "寫作時用「主詞 → 動詞 → 副詞 → 介詞片語」四格清單逐格填，順序不能跳。",
      "先把「主詞 + 動詞」兩個字寫完並確認 -s，再補 hard，最後才寫 in his new job。",
      "遇到 hard 立刻問「它在修飾動詞還是名詞」，動詞就放後面，名詞才放前面。",
      "把這句和 He works hard in his old job 排在一起對照，兩個句子只差一個字，最容易看出結構。"
    ]
  },
  "Alan works hard in his new job": {
    "zh": "亞倫在他的新工作上努力工作",
    "ipa": "ˈæl.ən wɜːrks hɑːrd ɪn hɪz dʒɑːb",
    "intro": "針對您提供的英文句子 **Alan works hard in his new job**，這是一個文法完全正確的完整簡單句。它由「主詞 + 動詞 + 副詞 + 介詞片語」四個部分組成，正好是國中教育會考最典型的句型：先看主詞判斷動詞形式，再依中文語意確認介詞與副詞的位置。本句已經是完整句子，可以獨立成句。",
    "headline": "完整句：人名大寫，副詞先於介詞片語",
    "structure": [
      {
        "role": "主詞",
        "token": "Alan",
        "pos": "專有名詞 (Proper Noun) — 人名",
        "func": "句子的主角，負責執行動作；專有名詞的首字母一定要大寫，這也是判斷第三人稱單數的依據",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "works",
        "pos": "動詞 (Verb) — work 的第三人稱單數現在式",
        "func": "表示現在的動作「工作」；主詞 Alan 是單數，所以動詞加 -s",
        "mark": "O"
      },
      {
        "role": "副詞",
        "token": "hard",
        "pos": "副詞 (Adverb)",
        "func": "修飾動詞 works，表示「努力地」；方式副詞要放在動詞與受詞之後、介詞片語之前",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "和 his new job 組成介詞片語，說明動作發生的場所或範圍",
        "mark": "O"
      },
      {
        "role": "名詞片語",
        "token": "his new job",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被 in 引導，作為介詞片語的中心，表示「他的那份新工作」；his 限定單數，所以 job 用單數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "專有名詞首字母沒有大寫",
        "bad": "(X) **alan** works hard in his new job. ／ (X) He told **ALAN** about it.",
        "ok": "(O) **Alan** works hard in his new job.",
        "why": "人名 Alan 是專有名詞，第一個字母一定要大寫，這是英文的基本大小寫規則，會考單字題與閱讀測驗都會扣分。學生常以為「反正整個句子看得懂」就隨手打字小寫。判斷法：寫完句子把所有專有名詞圈起來，逐個確認首字母是否大寫。",
        "exOkText": "(O) **Alan** works hard in his new job.",
        "exOkZh": "亞倫在他的新工作上努力工作。",
        "exBadText": "(X) **alan** works hard in his new job.",
        "exBadNote": "錯誤：人名 Alan 屬於專有名詞，首字母必須大寫，這是英文最基本的規則之一。，寫成小寫就算錯。"
      },
      {
        "title": "雙動詞錯誤（多加 be 動詞）",
        "bad": "(X) Alan **is works** hard in his new job. ／ (X) Alan **is work** hard every day.",
        "ok": "(O) Alan **works** hard in his new job.",
        "why": "一個簡單句只能有一個主要動詞。works 本身已經是動詞的第三人稱單數形式，前面不能再加 is。學生常以為「第三人稱單數要用 be 動詞」，這是 be 動詞和一般動詞最大的混淆點。判斷法：一般動詞的時態由自己變化（work → works → worked），只有 be 動詞本人才會變成 am / is / are。",
        "exOkText": "(O) Alan **works** hard in his new job.",
        "exOkZh": "亞倫在他的新工作上努力工作。",
        "exBadText": "(X) Alan **is works** hard in his new job.",
        "exBadNote": "錯誤：works 已是完整動詞，前面不能再加 is，否則一句話出現兩個主要動詞。"
      },
      {
        "title": "名詞前漏加所有格限定詞",
        "bad": "(X) Alan works hard **in new job**. ／ (X) She studies hard **at new school**.",
        "ok": "(O) Alan works hard **in his new job**.",
        "why": "介詞後面要接名詞，但這個名詞前面一定要有 his / a / this 這類限定詞，否則語意就不完整，讀起來像漏字。學生常在句尾趕時間時省略。判斷法：介詞片語寫完後，把 in 括號起來讀一次，若裡面只有形容詞加名詞而沒有限定詞，就是漏寫。",
        "exOkText": "(O) Alan works hard **in his new job**.",
        "exOkZh": "亞倫在他的新工作上努力工作。",
        "exBadText": "(X) Alan works hard **in new job**.",
        "exBadNote": "錯誤：job 前缺少所有格限定詞 his，介詞片語沒有中心限定，句子會顯得殘缺。"
      },
      {
        "title": "整句語序錯誤（介詞片語提到最前面）",
        "bad": "(X) **In his new job**, Alan hard works. ／ (X) **In his new job works** hard Alan.",
        "ok": "(O) **In his new job**, Alan works hard.",
        "why": "主詞和動詞的相對位置不能顛倒，動詞一定要緊跟在主詞後面；而方式副詞要放在動詞之後，介詞片語可以放句首但不能插在主詞和動詞中間。判斷法：先找主詞 Alan，動詞 works 必須緊接在後面，剩下的副詞和介詞片語再依序往後排。",
        "exOkText": "(O) **In his new job**, Alan works very hard.",
        "exOkZh": "在他的新工作上，亞倫非常努力。",
        "exBadText": "(X) **In his new job**, Alan hard works.",
        "exBadNote": "錯誤：副詞 hard 應放在動詞 works 之後當修飾語，不能提到動詞前面擺動詞。"
      }
    ],
    "traps": [
      "**大小寫的陷阱**：專有名詞 Alan 首字母大寫，句首的副詞或介詞（若放句首）也要大寫，大小寫錯誤在會考單字題會直接算錯。",
      "**雙動詞的陷阱**：works 已經是動詞，不能再加 is / am / are；這是國中學生最常犯的結構性錯誤。",
      "**語序的陷阱**：主詞 + 動詞 + 方式副詞 + 介詞片語，介詞片語可以搬到句首，但主詞和動詞永遠不能拆開。",
      "**限定詞的陷阱**：his new job 裡 his 不能省，少了它句子就變成不完整的介詞片語。"
    ],
    "strategy": [
      "作答前先畫結構格：主詞格、動詞格、副詞格、介詞片語格，再一個一個填進去。",
      "寫完立刻檢查兩件事：專有名詞大寫、動詞有沒有被多加 be 動詞。",
      "唸出聲音確認語序：亞倫（主詞）工作在（動詞）努力地（副詞）新工作裡（介詞片語）。",
      "把這句改寫成 He works hard in his old job 作為對照句，確認自己只是替換名詞而已。"
    ]
  },
  "boss": {
    "zh": "老闆",
    "ipa": "bɑːs",
    "intro": "針對您提供的英文單字 **boss**，這是一個可數名詞，不能單獨成句，前面要有主詞或限定詞（例如 His boss is kind.）。它表示「老闆、上司」，也可以口語表示「很棒的人」。本句最該注意：這是一個可數單數名詞，泛指時前面要加 a，而 boss 開頭的音要用 a 不是 an。",
    "headline": "可數單數名詞，前面要有 a",
    "structure": [
      {
        "role": "名詞",
        "token": "boss",
        "pos": "可數名詞 (Countable Noun)",
        "func": "表示「老闆、上司」；可數名詞可以數數，泛指一位時前面要加 a / an 或 his / my 這類限定詞",
        "mark": "O"
      },
      {
        "role": "首音提示",
        "token": "b",
        "pos": "字母與發音提示",
        "func": "boss 的第一個音是 /b/，屬於發音部位在嘴裡的清音，所以搭配的是 a 而不是 an",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "拼寫錯誤",
        "bad": "(X) **bos** ／ (X) **buss**",
        "ok": "(O) **boss**",
        "why": "boss 的拼法是 b-o-s-s，兩個 s 各一邊一個，很多學生會少寫一個變成 bos，或把兩個 s 擠在一起變成 buss。判斷法：寫完後用手數字母，b 開頭、ss 結尾共四個字；唸的時候 /bɑːs/ 的 s 要清清楚。",
        "exOkText": "(O) His **boss** is very kind.",
        "exOkZh": "他的老闆很和藹。",
        "exBadText": "(X) His **buss** is very kind.",
        "exBadNote": "錯誤：拼字錯誤，應寫成 b-o-s-s 四個字母，不能把結尾兩個 s 擠在一起。"
      },
      {
        "title": "可數名詞複數要加 -es（boss → bosses）",
        "bad": "(X) He has a **boss**. ／ (X) They have two **boss**.",
        "ok": "(O) He has a **boss**.",
        "why": "boss 是可數名詞，數量大於一就要加 -es 變成 bosses（以 s 結尾，加 -es）。學生常忘記複數要加 -es 而只加 -s。判斷法：看到 two / three / many 這類數量詞，就檢查以 s 結尾的名詞是否已經變成 bosses。",
        "exOkText": "(O) Our company has **three bosses**.",
        "exOkZh": "我們公司有三個老闆。",
        "exBadText": "(X) Our company has **three boss**.",
        "exBadNote": "錯誤：boss 以 s 結尾，複數要加 -es 變成 bosses，不能只加 -s 變成 bosss。"
      },
      {
        "title": "冠詞 a / an 選擇錯誤",
        "bad": "(X) He is **an** boss. ／ (X) She has **a** apple.",
        "ok": "(O) He is **a** boss.",
        "why": "a 用在發音部位在嘴裡的清音（輔音）前面，an 用在元音或半元音開頭的音前面。boss 的首音是 /b/，屬於清音，所以用 a。判斷標準是「唸出來聽第一個音」，不是看字母，這耳朵比眼睛可靠；另外冠詞一個名詞前面只能有一個。",
        "exOkText": "(O) He is **a** boss who never shouts.",
        "exOkZh": "他是一個從不咆哮的老闆。",
        "exBadText": "(X) He is **an** boss who never shouts.",
        "exBadNote": "錯誤：boss 的首音是 /b/ 輔音，冠詞要用 a 而不是 an，也不能同時放兩個冠詞。"
      },
      {
        "title": "詞性誤用（名詞不能當動詞或形容詞）",
        "bad": "(X) He **boss** his classmate. ／ (X) She is very **boss** today.",
        "ok": "(O) He **is** the boss of the company.",
        "why": "boss 在標準教材中是名詞，必須放在 be 動詞後面或當作主詞受詞，不能直接加 s 當動詞，也不能加 -ing 當形容詞。學生容易自創用法。判斷法：想表示「他是老闆」寫 He is the boss；想表示「他很嚴厲」寫 He is very strict。",
        "exOkText": "(O) His **boss** is very strict.",
        "exOkZh": "他的老闆非常嚴厲。",
        "exBadText": "(X) She is very **boss** today.",
        "exBadNote": "錯誤：boss 是名詞，不能直接當形容詞修飾主詞，要改寫成 is the boss 的形式。"
      }
    ],
    "traps": [
      "**冠詞的陷阱**：boss 開頭是 /b/，要用 a 不是 an；判斷依據是唸出來的第一個音，不是字母。",
      "**複數的陷阱**：以 s 結尾的名詞複數要加 -es，boss 變成 bosses，不是 bosss。",
      "**可數名詞的陷阱**：boss 是可數名詞，泛指一位時前面要有 a 或 his，不能只有 boss 就當主詞。",
      "**拼字的陷阱**：boss 是 b-o-s-s 四个字，兩個 s 分開寫，不要寫成 bos 或 buss。"
    ],
    "strategy": [
      "背單字時把拼字一起背：b-o-s-s 邊寫邊唸 /bɑːs/，兩邊都記牢。",
      "看到 a / an 先唸出第一個音再決定，不要只看字母是不是母音。",
      "把 boss、manager、head 三個詞的意思分開記：boss 是老闆，manager 是經理，head 是主管。",
      "寫句子時把 boss 當名詞處理，前面加 the、his 或 a，後面接 is / are 之類的 be 動詞。"
    ]
  },
  "his boss": {
    "zh": "他的老闆",
    "ipa": "hɪz bɑːs",
    "intro": "針對您提供的英文片語 **his boss**，這是一個名詞片語，不能單獨成句，前面要補上主詞或動詞（例如 His boss is strict.）。它由「物主代名詞 his + 名詞 boss」兩個部分組成，是最基本的所有格結構。本句最該注意：所有格 his 本身已經是限定詞，後面不能再加冠詞，而且修飾詞要放在所有格後面。",
    "headline": "his 已是限定詞；修飾詞要放後面",
    "structure": [
      {
        "role": "物主代名詞",
        "token": "his",
        "pos": "物主代名詞 (Possessive Pronoun) — 所有格",
        "func": "修飾後面的名詞 boss，表示「屬於他的」；它已經是一個限定詞，所以後面不能再加 a 或 the",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "boss",
        "pos": "可數名詞 (Countable Noun)",
        "func": "表示「老闆」；被 his 限定為單數，泛指一位時前面不需再加冠詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "所有格後誤加冠詞",
        "bad": "(X) **His a boss** is kind. ／ (X) She talked to **his the boss**.",
        "ok": "(O) **His boss** is kind.",
        "why": "his 本身已經扮演了「限定詞」的角色，前面不能再加 a、an 或 the，否則同一個名詞會出現兩個限定詞。學生常受中文「他的那個老闆」影響，以為要加冠詞。判斷法：名詞前面如果已經有 his / my / this，就不能再加冠詞，兩個只能擇一。",
        "exOkText": "(O) **His boss** is kind to everyone.",
        "exOkZh": "他的老闆對每個人都很和藹。",
        "exBadText": "(X) **His a boss** is kind to everyone.",
        "exBadNote": "錯誤：his 已經是限定詞，後面不能再加冠詞 a，兩個限定詞只能擇一出現。，這是名詞片語最常見的陷阱。"
      },
      {
        "title": "所有格與 of 所有格混用",
        "bad": "(X) **boss of his** is kind. ／ (X) She met **boss of him** today.",
        "ok": "(O) **His boss** is kind.",
        "why": "人屬於人的關係，標準英文用「物主代名詞 + 名詞」，例如 his boss；boss of his 是把中文「他的老闆」逐字翻譯的結果，屬於中式英文。of 所有格多用於無生命事物（the door of the room）。判斷法：只要「的」前面是人，一律寫 his / her / my / their。",
        "exOkText": "(O) **His boss** gave him a day off.",
        "exOkZh": "他的老闆給他一天假。",
        "exBadText": "(X) **Boss of his** gave him a day off.",
        "exBadNote": "錯誤：表示「他的老闆」要用 his boss，不能寫成 boss of his。"
      },
      {
        "title": "修飾語語序錯誤",
        "bad": "(X) **new his boss** ／ (X) **kind his boss**",
        "ok": "(O) **his new boss**",
        "why": "英文名詞片語的順序是「所有格 + 形容詞 + 名詞」，也就是先說是誰的，再說是怎樣的，最後才是名詞。學生常受中文「新的他的老闆」影響，把形容詞插到所有格前面。判斷法：口訣是「先 his，再形容，最後名詞」，照順序排就不會錯。",
        "exOkText": "(O) **His new boss** is very friendly.",
        "exOkZh": "他的新老闆非常友善。",
        "exBadText": "(X) **New his boss** is very friendly.",
        "exBadNote": "錯誤：所有格 his 必須在形容詞 new 前面，不能寫成 New his boss 而把順序顛倒。"
      },
      {
        "title": "連續所有格誤用",
        "bad": "(X) **his boss boss** ／ (X) **his boss his boss**",
        "ok": "(O) **his boss's office**",
        "why": "一個名詞片語裡只會有一個所有格；當名詞本身又被另一個人擁有時，必須用 of 所有格 boss's office，表示「他老闆的辦公室」。學生常把 boss 重複寫兩次。判斷法：看到連續兩個 boss，先想其中一個應該變成 boss's（所有格）加後面的名詞。",
        "exOkText": "(O) He works in **his boss's office**.",
        "exOkZh": "他在他的老闆的辦公室工作。",
        "exBadText": "(X) He works in **his boss office**.",
        "exBadNote": "錯誤：第二個 boss 是屬於前一個 boss 的，必須加所有格 -'s 變成 boss's office。"
      }
    ],
    "traps": [
      "**限定詞唯一的陷阱**：名詞前面只能有一個限定詞，his 和 a / the 不能同時出現。",
      "**of 所有格的陷阱**：of 所有格主要用在無生命事物（the door of the room），人與人之間要用 his / her。",
      "**語序的陷阱**：名詞片語順序是「所有格 + 形容詞 + 名詞」，形容詞不能插到 his 前面。",
      "**連續所有格的陷阱**：要表示「他的老闆的……」時，後面的 boss 必須加 -'s，不能重複寫 boss。"
    ],
    "strategy": [
      "寫名詞片語時照順序填空：先放 his，再放形容詞，最後放名詞。",
      "看到 a / an / the 就要檢查前面是不是已經有 his / my，兩個限定詞一定去掉一個。",
      "把「人」的關係一律用物主代名詞處理，of 只留給無生命的東西。",
      "練習 his boss、his new boss、his boss's office 三個層級，確認自己的所有格層次清楚。"
    ]
  },
  "feels": {
    "zh": "感受",
    "ipa": "fiːlz",
    "intro": "針對您提供的英文單字 **feels**，這是一個感官動詞，不能單獨成句，前面要補主詞（例如 He feels tired.）。它是 feel（感覺）的第三人稱單數現在式，後面可以接形容詞描述感受，或接 like / about 引出說明。本句最該注意：感官動詞後面接形容詞不是副詞，以及主詞是第三人稱單數時要加 -s。",
    "headline": "後面接形容詞；第三人稱單數加 -s",
    "structure": [
      {
        "role": "動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示「感覺、感到」；主詞是 he / she / it 或單數名詞時要加 -s，後面接形容詞描述感受",
        "mark": "O"
      },
      {
        "role": "字尾變化",
        "token": "-s",
        "pos": "動詞第三人稱單數字尾",
        "func": "附在 feel 後面，標示主詞為第三人稱單數；主詞若是 they / we / you 則用原形 feel",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "感官動詞後誤用副詞",
        "bad": "(X) He feels **badly** today. ／ (X) She feels **happily** now.",
        "ok": "(O) He feels **bad** today.",
        "why": "feel 這種感官動詞後面要接「形容詞」，因為主詞自己感到的是一種狀態，而不是動作的方式。例如「他今天感覺不舒服」是描述他的狀態，所以用 bad。判斷法：句子若翻譯成「感覺如何」，就選形容詞；若翻譯成「如何地感覺」，才用副詞 badly。",
        "exOkText": "(O) He feels **tired** after the game.",
        "exOkZh": "比賽完後他感到疲倦。",
        "exBadText": "(X) He feels **tiredly** after the game.",
        "exBadNote": "錯誤：感官動詞後要接形容詞 tired；副詞 tiredly 不能用來描述一個人的感受。"
      },
      {
        "title": "過去式拼寫錯誤（felt / feeled）",
        "bad": "(X) He **feeled** tired last night. ／ (X) She **feeled** very happy yesterday.",
        "ok": "(O) He **felt** tired last night.",
        "why": "feel 的過去式是不規則變化 felt，本身就以 t 結尾，而且絕對不能加 -ed 變成 feeled。學生常因為看到 happy 這種規則變化就照樣加 -ed。判斷法：唸出來，felt 和 feel 只有最後那個 /t/ 有沒有被唸出來，唸不出 -ed 的音就是錯的。",
        "exOkText": "(O) She **felt** very happy at the party.",
        "exOkZh": "她在派對上感到非常開心。",
        "exBadText": "(X) She **feeled** very happy at the party.",
        "exBadNote": "錯誤：feel 的過去式是 felt，不能加 -ed 寫成 feeled，唸起來會多出一個音。"
      },
      {
        "title": "第三人稱單數漏加 -s（feel → feels）",
        "bad": "(X) He **feel** tired every day. ／ (X) My sister **feel** very nervous.",
        "ok": "(O) He **feels** tired every day.",
        "why": "主詞是 he / she / it 或單數名詞時，一般現在式的動詞要加 -s。學生常以為感覺類的動詞「比較不重要」而忘記。判斷法：不看後面接什麼，只看主詞——he / she / it / 單數名詞就加 -s，規則和其他動詞完全一樣。",
        "exOkText": "(O) My sister **feels** very nervous before a test.",
        "exOkZh": "我妹妹在考試前感到很緊張。",
        "exBadText": "(X) My sister **feel** very nervous before a test.",
        "exBadNote": "錯誤：主詞 My sister 是第三人稱單數，動詞要加 -s 變成 feels。"
      },
      {
        "title": "feel 後接動詞漏加 to",
        "bad": "(X) I feel **know** the answer. ／ (X) He feels **see** it.",
        "ok": "(O) I feel **to know** the answer.",
        "why": "feel 後面接「動作動詞」時，中間一定要有 to（feel to know、feel to see），不能直接接原形動詞。學生常因為「感覺到做某事」就直接把動詞貼上去。判斷法：feel 後面要接動作動詞時，先寫出 to 再寫動詞；沒有 to 就是漏字。",
        "exOkText": "(O) I feel **to understand** the problem now.",
        "exOkZh": "我現在覺得理解這個問題了。",
        "exBadText": "(X) I feel **understand** the problem now.",
        "exBadNote": "錯誤：feel 後接動作動詞要加 to，不能直接接原形 understand，這是固定用法。"
      }
    ],
    "traps": [
      "**感官動詞的陷阱**：feel 後面接形容詞（feel happy），不要接副詞（feel happily），這是會考常見的選項陷阱。",
      "**不規則過去式的陷阱**：feel 的過去式是 felt，絕對不能寫成 feeled。",
      "**第三人稱單數的陷阱**：主詞是 he / she / it 或單數名詞時，feels 的 -s 不能省。",
      "**動詞接 to 的陷阱**：feel to do 是固定用法，feel 後直接接原形動詞一定會錯。"
    ],
    "strategy": [
      "背感官動詞時連後面常用搭配一起背：feel happy、feel tired、feel sick、feel like。",
      "寫完 feels 就檢查後面接的是形容詞還是副詞，形容詞才對。",
      "把 feel–felt 跟 sleep–slept、buy–bought 放同一組背，不規則變化特別容易記混。",
      "遇到 feel 後面接動詞，就先寫 to，再填入正確的動詞原形。"
    ]
  },
  "boss feels": {
    "zh": "老闆感覺",
    "ipa": "bɑːs fiːlz",
    "intro": "針對您提供的英文片語 **boss feels**，這是一個「名詞 + 動詞」的主謂結構，離完整句子只差一個限定詞（The boss feels… 或 His boss feels…）。它表示老闆的某種感受。本句最該注意：單數可數名詞當主詞前面要有冠詞或所有格；而且 boss 是「老闆」，和 manager、head 的意思並不相同。",
    "headline": "主詞要有冠詞；boss 指老闆",
    "structure": [
      {
        "role": "主詞",
        "token": "boss",
        "pos": "可數名詞 (Countable Noun)",
        "func": "句子的主角，負責執行動作；單數可數名詞作主詞時，前面要有 a、the 或 his 這類限定詞",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示主詞的內心感受；因為主詞 boss 是單數，動詞要加 -s，後面接形容詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞與動詞語序顛倒",
        "bad": "(X) **feels his boss** ／ (X) **feels tired the boss**",
        "ok": "(O) **The boss feels** tired.",
        "why": "英文是主語在前、謂語在後，這和中文一樣，不能把動詞提到名詞前面。會考的選項常常故意把動詞搬到最前面，學生一看到眼熟的動詞就直接選了。判斷法：先找出執行動作的人（主詞），那個人一定站在句子的最前面，動詞緊跟在他後面，其他成分再往後排。",
        "exOkText": "(O) **The boss feels** tired today.",
        "exOkZh": "老闆今天感到疲倦。",
        "exBadText": "(X) **Feels the boss** tired today.",
        "exBadNote": "錯誤：動詞不能放在主詞前面，應該寫成 The boss feels tired today.。"
      },
      {
        "title": "詞義混淆：boss、manager、head 意思不同",
        "bad": "(X) He is our **head**. ／ (X) She is the **manager** of our boss.",
        "ok": "(O) He is our **boss**.",
        "why": "boss 指公司的老闆或上司；manager 是經理，負責管理日常業務；head 是部門主管。學生常把 boss 和 manager 混用，導致句意改變。判斷法：表達「老闆」就是 boss；表達「經理」才用 manager；表達「部門主管」用 head，三者不能互換。",
        "exOkText": "(O) **The boss** usually makes the final decision.",
        "exOkZh": "老闆通常做最後決定。",
        "exBadText": "(X) **The manager** is the owner of our company.",
        "exBadNote": "錯誤：manager 是經理，owner 才是老闆，這裡的「老闆」應該用 boss 來表示。"
      },
      {
        "title": "動詞被誤當名詞使用",
        "bad": "(X) He has **boss feelings**. ／ (X) I saw many **feel** in her eyes.",
        "ok": "(O) He has **a good feeling** about it.",
        "why": "feels 在這裡是動詞，不能當名詞用來指稱「感覺」這個東西；名詞要用 feeling（感受），而且是可數名詞。學生常把動詞的第三人稱形式直接當名詞。判斷法：句中若缺動詞，就檢查是不是該補動詞；若真的要當名詞用，必須改成 feeling。",
        "exOkText": "(O) **The boss feels** worried about the plan.",
        "exOkZh": "老闆對這個計畫感到擔心。",
        "exBadText": "(X) The **boss feel** worried about the plan.",
        "exBadNote": "錯誤：主詞是單數的 boss，動詞要用第三人稱單數 feels，不能用原形 feel。"
      },
      {
        "title": "固定搭配 feel like 後接錯誤的詞",
        "bad": "(X) The boss feels **like happy** today. ／ (X) She feels **like a teacher** is nice.",
        "ok": "(O) The boss feels **like a teacher** today.",
        "why": "feel like 這個片語裡，like 本身當介詞使用，後面要接名詞或名詞片語，不能再接形容詞，也不能自己當動詞。學生常以為 like 是動詞就直接接上。判斷法：feel like 裡的 like 是介詞，後面一定要有名詞；看到 like 後面直接跟形容詞或原形動詞就是錯的。",
        "exOkText": "(O) **The boss feels** like a tiger today.",
        "exOkZh": "老闆今天脾氣像老虎一樣。",
        "exBadText": "(X) **The boss feels** like angry today.",
        "exBadNote": "錯誤：feel like 後的 like 是介詞，後面要接名詞，不能接形容詞 angry。"
      }
    ],
    "traps": [
      "**主詞位置的陷阱**：動詞永遠在主詞後面，會考選項常故意把 feels 放到最前面。",
      "**冠詞的陷阱**：單數可數名詞當主詞時前面要有 a / the / his，不能只有 boss 就開頭。",
      "**詞義的陷阱**：boss 是老闆，manager 是經理，head 是主管，會考閱讀測驗常拿來換。",
      "**固定搭配的陷阱**：feel like 的 like 是介詞，後面接名詞，不是接形容詞或動詞。"
    ],
    "strategy": [
      "讀句子先找做動作的人，把那個名詞移到最前面，動詞放在它後面。",
      "把 boss、manager、head、owner 四個詞做成對照表，考前快速複習。",
      "遇到 feel、look、sound 這類感官動詞，一律先預留一個形容詞的位置。",
      "看到 feels 立刻檢查後面：形容詞（對）、副詞（錯）、像名詞（feel like 才對）。"
    ]
  },
  "his boss feels": {
    "zh": "他的老闆感覺",
    "ipa": "hɪz bɑːs fiːlz",
    "intro": "針對您提供的英文片語 **his boss feels**，這是一個「名詞片語 + 動詞」的主謂結構，已經接近完整句子，但後面還需要補上受詞或補語（例如 His boss feels tired.）才完整。本句最該注意：這是「他的老闆」，所有格 his 已經是限定詞所以不用再加冠詞；還有一個簡單句只能有一個主要動詞。",
    "headline": "已有完整主語；簡單句只能有一個動詞",
    "structure": [
      {
        "role": "物主代名詞",
        "token": "his",
        "pos": "物主代名詞 (Possessive Pronoun)",
        "func": "修飾名詞 boss，表示「屬於他的」；它本身就是限定詞，後面不能再加 a 或 the",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "boss",
        "pos": "可數名詞 (Countable Noun)",
        "func": "作為主語的中心，表示「老闆」；被 his 限定為單數",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示主詞的內心感受；主詞是單數名詞片語，所以動詞要加 -s",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "片語不能單獨成句（缺受詞或補語）",
        "bad": "(X) **His boss feels.** ／ (X) **His boss feels** very.",
        "ok": "(O) **His boss feels** tired today.",
        "why": "feel 是感官動詞，後面一定要有東西告訴我們「感覺什麼」，否則句子意思不完整，主詞和動詞都齊了也不代表句子完整。學生常以為有主詞和動詞就夠了。判斷法：寫完後問自己「感覺什麼？」答不出來就代表還缺形容詞，或像 like、about 這類介詞片語。",
        "exOkText": "(O) **His boss feels** very happy today.",
        "exOkZh": "他的老闆今天心情很好。",
        "exBadText": "(X) **His boss feels** happy",
        "exBadNote": "錯誤：只說「感覺開心」卻沒有其他訊息也沒有句尾，句子結構未完成、語意不成立。，這樣不算完整的句子。"
      },
      {
        "title": "雙動詞錯誤（一個句子只能有一個主要動詞）",
        "bad": "(X) His boss **feels is** tired. ／ (X) His boss **feels was** very kind.",
        "ok": "(O) His boss **feels** tired.",
        "why": "feels 本身已經是完整動詞，後面不能再接另一個 be 動詞或實質動詞。學生常以為「感覺很開心」要寫 feels is happy。判斷法：簡單句的動詞位置只有一個，寫完主詞後只能挑一個動詞，其他都要改成形容詞或副詞。",
        "exOkText": "(O) His boss **feels** very tired after the trip.",
        "exOkZh": "他的老闆在旅行後覺得很累。",
        "exBadText": "(X) His boss **feels is** very tired after the trip.",
        "exBadNote": "錯誤：feels 已是動詞，後面不能再加 is 這種 be 動詞，一句只能有一個主要動詞。"
      },
      {
        "title": "動詞與單數主詞不一致",
        "bad": "(X) His boss **feel** tired. ／ (X) His boss **feel** very strict.",
        "ok": "(O) His boss **feels** tired.",
        "why": "主詞是 his boss，這是一個單數名詞片語，所以謂語要用第三人稱單數 feels。學生有時會被 his 誤導，以為「他的」是複數或非第三人稱。判斷法：不管主詞有幾個字，只要它是單數，動詞一律加 -s；his boss 當然是單數。",
        "exOkText": "(O) His boss **feels** nervous about the test.",
        "exOkZh": "他的老闆對這場考試感到緊張。",
        "exBadText": "(X) His boss **feel** nervous about the test.",
        "exBadNote": "錯誤：主詞 his boss 是單數，動詞必須用第三人稱單數 feels，不能用原形 feel。"
      },
      {
        "title": "所有格 -'s 與第三人稱 -s 混淆",
        "bad": "(X) **His boss's feels** tired. ／ (X) **The boss's** very kind.",
        "ok": "(O) **His boss** feels tired.",
        "why": "這個句子裡的 -s 是動詞的第三人稱單數字尾，不是名詞的所有格。學生的困擾在於看到 boss 就想加 -'s。判斷法：先看 s 的位置——在名詞後面表示所有格（the boss's office），在動詞後面表示第三人稱單數（he feels）。",
        "exOkText": "(O) **His boss** feels tired today.",
        "exOkZh": "他的老闆今天很累。",
        "exBadText": "(X) **His boss's feels** tired today.",
        "exBadNote": "錯誤：這裡的 s 屬於動詞第三人稱單數，不是名詞所有格，不能加在 boss 上。"
      }
    ],
    "traps": [
      "**句子完整性的陷阱**：His boss feels. 缺少表示感受的內容，不能單獨成句。",
      "**雙動詞的陷阱**：feels 已是動詞，後面不能再加 is / was，簡單句只容許一個主要動詞。",
      "**單複數一致的陷阱**：主詞 his boss 是單數，動詞必須用 feels。",
      "**兩種 -s 的陷阱**：名詞後面的 -'s 是所有格，動詞後面的 -s 是第三人稱單數，位置不同意思完全不同。"
    ],
    "strategy": [
      "寫完主語後先選好一個動詞，之後只能再加形容詞或介詞片語。",
      "把 his boss 當成一個單數名詞處理，動詞就固定用 feels。",
      "分清兩種 -s：名詞後面加 -'s 變成 boss's，動詞後面加 -s 變成 feels。",
      "檢查句尾有沒有把感受講完，沒有形容詞或 like / about 片語就回去補。"
    ]
  },
  "boss feels about him": {
    "zh": "老闆對他的看法",
    "ipa": "bɑːs fiːlz əˈbaʊt hɪm",
    "intro": "針對您提供的英文片語 **boss feels about him**，這是一個「主詞 + 動詞 + 介詞片語」的結構，離完整句子還差一個引導詞或主詞（例如 How his boss feels about him.）。它表達「老闆對他的看法」。本句最該注意：feels about 這個搭配要放在名詞性子句裡，以及介詞 about 後面一定要用賓格 him。",
    "headline": "feels about 前要有引導詞，後面用 him",
    "structure": [
      {
        "role": "主詞",
        "token": "boss",
        "pos": "可數名詞 (Countable Noun)",
        "func": "表示這個感受的主人是誰；單數可數名詞作主詞時前面要有 the、his 等限定詞",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示「感覺、看法」；主詞是單數所以加 -s，後面接介詞 about 引出對象",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "about",
        "pos": "介系詞 (Preposition)",
        "func": "和後面的 him 組成介詞片語，表示「對某人」；後面只能接賓格 him",
        "mark": "O"
      },
      {
        "role": "代詞",
        "token": "him",
        "pos": "賓格代名詞 (Object Pronoun)",
        "func": "作介詞的受詞，表示「對他」；介詞後面一律用 he 的賓格形式 him",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "缺少引導詞，不能單獨成句",
        "bad": "(X) **boss feels about him** ／ (X) **Boss feels about him** is important.",
        "ok": "(O) **How his boss feels about him** is important.",
        "why": "feels about him 描述的是一個「看法」，本身還不完整，必須用 How 或 The way 引導成一個名詞性子句，才能當主語或受詞使用。判斷法：想問「他老闆怎麼看他」就用 How 開頭；想把它當名詞用就用 the way。",
        "exOkText": "(O) **How his boss feels about him** is very important.",
        "exOkZh": "他的老闆怎麼看他，這件事非常重要。",
        "exBadText": "(X) **Boss feels about him** is very important.",
        "exBadNote": "錯誤：前面缺 How 或 the way 等引導詞，也缺所有格 his，句子根本無法成立。"
      },
      {
        "title": "介詞後誤用主格代名詞",
        "bad": "(X) **boss feels about he**. ／ (X) He wonders what his boss thinks about **he**.",
        "ok": "(O) **His boss feels about him**.",
        "why": "英文的介詞後面一定接賓格，所以要用 him；he 是主格，只能當主語用。學生常因中文沒有格的變化而直接用 he。判斷法：看到 about、for、to、with 這些介詞，後面出現人稱代名詞時，一律換成賓格 me / him / her / us / them。",
        "exOkText": "(O) I don't know what his boss thinks **about him**.",
        "exOkZh": "我不知道他的老闆怎麼看他。",
        "exBadText": "(X) I don't know what his boss thinks **about he**.",
        "exBadNote": "錯誤：介詞 about 後面要用賓格 him，不能用主格 he，格的規則不受中文影響。"
      },
      {
        "title": "固定搭配誤用（feel about 應為 think of）",
        "bad": "(X) What his boss **feels about him** ／ (X) He **feels about** his new teacher.",
        "ok": "(O) What his boss **thinks of him**",
        "why": "表達「某人怎麼看某人」時，標準英文習慣用 think of（認為、看待）；feel about 比較接近「對……感到（感覺）」，而且常與 well、badly 搭配。學生常直接用中文的「看法」去對應 feel。判斷法：中文是「他怎麼看某人」就用 think of；中文是「對某人的感覺」才用 feel about。",
        "exOkText": "(O) What his boss **thinks of him** is not important.",
        "exOkZh": "他的老闆怎麼看他並不重要。",
        "exBadText": "(X) What his boss **feels about him** is not important.",
        "exBadNote": "錯誤：表達「怎麼看某人」應用 thinks of him，而不是 feels about him。"
      },
      {
        "title": "介詞混淆（feel about / feel for / feel like）",
        "bad": "(X) He **feels for** his boss about the plan. ／ (X) She **feels about** a tiger.",
        "ok": "(O) He **feels for** his boss. ／ (O) She **feels like** a tiger.",
        "why": "feel about 是「對某件事的感覺」，後面接事物；feel for 是「同情、關懷」，後面接人；feel like 是「感覺像」，後面接名詞。學生常把三個介詞互換。判斷法：後接人用 for（同情某人）、接事物用 about、接比喻對象用 like。",
        "exOkText": "(O) She **feels like** a tiger today.",
        "exOkZh": "她今天感覺像老虎一樣。",
        "exBadText": "(X) She **feels about** a tiger today.",
        "exBadNote": "錯誤：表示「感覺像」要用 feel like；feel about 後面接的是事物而非比喻對象。"
      }
    ],
    "traps": [
      "**引導詞的陷阱**：feels about him 前面需要 How 或 the way 引導，否則不能當主語或受詞使用。",
      "**格的陷阱**：介詞 about 後面一定用賓格 him，用 he 直接就是錯的。",
      "**搭配的陷阱**：中文「怎麼看某人」對應 think of him，不是 feel about him。",
      "**介詞選擇的陷阱**：feel for（同情人）、feel about（對某事）、feel like（像），三個介詞不能互換。"
    ],
    "strategy": [
      "看到中文「怎麼看某人」，反射寫 think of somebody，不要寫 feel about。",
      "介詞後面出現 he、she、they 立刻改為 him、her、them，這是最快的自我檢查。",
      "把 How his boss feels about him 和 What his boss thinks of him 兩句並排背，一次記住兩種說法。",
      "複習三個 feel 介詞：for 接人（同情）、about 接事、like 接比喻，寫作時照著套。"
    ]
  },
  "how his boss feels about him": {
    "zh": "他的老闆對他的看法如何",
    "ipa": "haʊ hɪz bɑːs fiːlz əˈbaʊt hɪm",
    "intro": "針對您提供的英文句子 **how his boss feels about him**，這是一個**名詞子句**，不是完整句子，單獨不能成句，前面一定要有 know、tell、ask、wonder 之類的動詞（例如 He doesn’t know how his boss feels about him.）。它問的是「（某人）對他的感想怎麼樣」，意思是指「（某人）對他的看法／感覺如何」。最該注意的方向有兩個：how 開頭的間接問句後面**不倒裝**，以及 feel about 後面接的是**受詞 him**。",
    "headline": "how 開頭不倒裝；feel about 後要接受詞 him",
    "structure": [
      {
        "role": "疑問副詞（子句引導詞）",
        "token": "how",
        "pos": "疑問副詞 (Interrogative Adverb)",
        "func": "引導一個間接問句的子句，問的是「怎麼樣／看法如何」；重點是後面必須用陳述語序，不能把 feels 倒裝到 his boss 前面",
        "mark": "O"
      },
      {
        "role": "所有格限定詞",
        "token": "his",
        "pos": "所有格限定詞 (Possessive Determiner)",
        "func": "放在名詞前表示「他的」，後面一定要接名詞，這裡接 boss；它不能單獨當主詞用，當主詞要用 he",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "boss",
        "pos": "名詞 (Noun)",
        "func": "「老闆」；被 his 修飾後，和 his 一起組成這個子句的主詞",
        "mark": "O"
      },
      {
        "role": "子句主詞（名詞片語）",
        "token": "his boss",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "這整個名詞片語在 how 引導的子句裡當主詞，由第三人稱單數的動詞 feels 承接",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "在這裡是「感覺、認為」的意思；主詞 his boss 是第三人稱單數，所以動詞要加 -s",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "about",
        "pos": "介系詞 (Preposition)",
        "func": "固定搭配 **feel about** 中最容易寫錯的部分，表示「對（某人）的感想」；後面一定要接名詞或受詞",
        "mark": "O"
      },
      {
        "role": "受詞（介系詞的對象）",
        "token": "him",
        "pos": "代詞受格 (Object Pronoun)",
        "func": "是 he 的受格，放在介系詞 about 後面當受詞，代表「對他（的看法）」；這裡不能用 he，因為 he 是主格",
        "mark": "O"
      },
      {
        "role": "子句整體",
        "token": "how his boss feels about him",
        "pos": "名詞子句 (Noun Clause)",
        "func": "整個結構是一個名詞子句，必須放在 know、tell、ask、wonder 等動詞後面當受詞，**單獨不能成句**",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "名詞子句單獨成句（缺少主詞與主要動詞）",
        "bad": "(X) **How his boss feels about him.** ／ (X) **How his boss feels about him about the project.**",
        "ok": "(O) **Tell me** how his boss feels about him.",
        "why": "how 引導的這一段是「名詞子句」，它自己沒有主詞也沒有主要動詞，必須靠前面的動詞（know、tell、ask、wonder）撐起來當受詞。學生常受中文「他的老闆對他怎麼樣？」影響，以為這是個問句就直接寫下來。判斷法：寫完一整句後檢查，前面若沒有 know / tell / ask / wonder 這類動詞，就是殘句，要補上。",
        "exOkText": "(O) Could you tell me **how his boss feels about** him?",
        "exOkZh": "你可以告訴我，他的老闆對他的感覺如何嗎？",
        "exBadText": "(X) **How his boss feels about him about the project.**",
        "exBadNote": "錯誤：how 引導的名詞子句不能獨立成句，句首缺主要動詞。"
      },
      {
        "title": "固定搭配錯誤（feel about 的介系詞）",
        "bad": "(X) how his boss feels **for** him ／ (X) how his boss feels **to** him",
        "ok": "(O) how his boss feels **about** him",
        "why": "表達「對某人的感想」在英文裡固定用 **feel about + 人**，介系詞不能換。feel for 是「同情」，feel to 是「對某人而言」，意思和原句完全不同。學生常受中文「對他怎麼樣」影響，直譯成 feels to him 或 feels for him。判斷法：這裡在描述對某人的看法嗎？是就要用 feel about。",
        "exOkText": "(O) He asked me **how his boss felt about** him.",
        "exOkZh": "他問我，他的老闆對他的感覺如何。",
        "exBadText": "(X) He asked me **how his boss felt for** him.",
        "exBadNote": "錯誤：feel for 是「同情他」，表達「對某人的看法」要用 feel about。"
      },
      {
        "title": "代詞格位錯誤（介系詞後須用受格 him）",
        "bad": "(X) how his boss feels about **he** ／ (X) how his boss feels about **his**",
        "ok": "(O) how his boss feels about **him**",
        "why": "介系詞 about 後面的名詞或代詞一律要用受格，只有 him / me / you / us / them 這類受格可以單獨放在介系詞後面。he 是主格，只能放在動詞前面當主詞；his 是所有格，後面還要接名詞。判斷法：寫完 about 之後的空白，先問「這裡要的是『人』，那就把 he 改成 him」。",
        "exOkText": "(O) The teacher asked **how I felt about** him.",
        "exOkZh": "老師問我對他的感覺如何。",
        "exBadText": "(X) The teacher asked **how I felt about he**.",
        "exBadNote": "錯誤：about 是介系詞，後面要用受格 him，不能用主格 he。"
      },
      {
        "title": "疑問詞選用錯誤（how 與 what 混淆）",
        "bad": "(X) **what** his boss feels about him ／ (X) **what** his boss feels **to** him",
        "ok": "(O) **how** his boss feels about him",
        "why": "how 問的是「怎麼樣」，用在看法、感受、方式上；what 問的是「什麼」，用在具體事物上。「他的老闆對他的看法如何」問的是「怎麼樣」，所以要用 how。學生常因中文說「什麼看法」就直譯成 what。判斷法：整句的答案是一種「感覺／評價」而不是「東西」時，開頭一定用 how。",
        "exOkText": "(O) I really want to know **how you feel about** my plan.",
        "exOkZh": "我真的想知道你對我的計畫感覺如何。",
        "exBadText": "(X) I really want to know **what you feel about** my plan.",
        "exBadNote": "錯誤：問「感覺如何」要用 how；what 是問「什麼」，不能用來問感受。"
      }
    ],
    "traps": [
      "**間接問句不倒裝的陷阱**：how / what / where / when / why 開頭的間接問句，後面要用陳述語序（how his boss **feels**），絕不能倒裝成 how **does** his boss feel。會考選擇題常把兩種語序放在同一題裡。",
      "**feel about 的陷阱**：表達「對某人的感想」固定用 **feel about + 人**；feel for 是「同情」，feel to 是「對某人而言」，意思完全不一樣。",
      "**代詞格位的陷阱**：介系詞（about / of / for / to）後面的代詞一律用受格 him / me / us / them；主格 he / I / we / they 只能放在動詞前面當主詞。",
      "**不能單獨成句的陷阱**：how 引導的名詞子句前面一定要有 know、tell、ask、wonder 等動詞，否則就是殘句，會考完形填空常在這裡挖空格。"
    ],
    "strategy": [
      "先找動詞：看到 how 開頭，立刻問「前面有沒有 know / tell / ask / wonder？」沒有的話就是缺字，先補動詞。",
      "括號法：把 **how ... about him** 用括號框起來當一整塊，括號外的部分才用陳述語序去排。",
      "三格口訣：當主詞用主格、動詞後用受格、介系詞後也用受格；名詞前才用所有格。",
      "逐格驗證代詞：寫完 his、him、he 逐一問自己「它在這裡是修飾名詞、當主詞，還是放在介系詞後面？」",
      "唸出整句：把 know how his boss feels about him 唸順了再去寫，能大幅降低倒裝與格位的錯誤率。"
    ]
  },
  "know how his boss feels about him": {
    "zh": "想知道他的老闆對他的看法如何",
    "ipa": "noʊ haʊ hɪz bɑːs fiːlz əˈbaʊt hɪm",
    "intro": "針對您提供的英文句子 **know how his boss feels about him**，這是一個**動詞片語**，句中沒有主詞，單獨不能成句，一定要接在主詞後面（He knows how his boss feels about him.）。它由「動詞 know + 間接問句 how ...」兩層組成，中文翻成「想知道⋯⋯」。最該注意的方向是：how 已經跟在 know 後面，就不再是問句，後面要用**陳述語序、不倒裝、也不加問號**。",
    "headline": "know 後接 how 子句：不倒裝、不加問號",
    "structure": [
      {
        "role": "動詞（片語主詞後的動詞）",
        "token": "know",
        "pos": "動詞 (Verb) — 原形",
        "func": "整個片語的主要動詞，表示「知道」；後面可以直接接間接問句的子句當受詞",
        "mark": "O"
      },
      {
        "role": "間接問句引導詞",
        "token": "how",
        "pos": "疑問副詞 (Interrogative Adverb)",
        "func": "接在 know 後面時，它不再是問句的開頭，而是引導一個名詞子句，問「怎麼樣」",
        "mark": "O"
      },
      {
        "role": "所有格限定詞",
        "token": "his",
        "pos": "所有格限定詞 (Possessive Determiner)",
        "func": "修飾後面的名詞 boss，表示「他的」；後面一定要接名詞，不能單獨當主詞",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "boss",
        "pos": "名詞 (Noun)",
        "func": "「老闆」；與 his 組成這個子句的主詞",
        "mark": "O"
      },
      {
        "role": "子句主詞（名詞片語）",
        "token": "his boss",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "在 how 引導的子句裡當主詞，是第三人稱單數，所以後面動詞要加 -s",
        "mark": "O"
      },
      {
        "role": "子句動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示「感覺、認為」；主詞 his boss 是單數第三人稱，所以用 feels",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "about",
        "pos": "介系詞 (Preposition)",
        "func": "和 feel 構成固定搭配 **feel about**，表示「對某人的感想」",
        "mark": "O"
      },
      {
        "role": "受詞（介系詞的對象）",
        "token": "him",
        "pos": "代詞受格 (Object Pronoun)",
        "func": "是 he 的受格，放在介系詞 about 後面，代表「對他（的看法）」，不能用主格 he",
        "mark": "O"
      },
      {
        "role": "子句整體",
        "token": "how his boss feels about him",
        "pos": "名詞子句 (Noun Clause)",
        "func": "整段當作 know 的受詞，說明「知道的是什麼內容」；本身不是完整句子，前面靠 know 撐起全句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "間接問句語序錯誤（後面誤倒裝）",
        "bad": "(X) know how **does his boss feel** about him ／ (X) know how **do his boss feels** about him",
        "ok": "(O) know how **his boss feels** about him",
        "why": "只要 how / what / when / where / why 的前面已經有 know、ask、tell、wonder 等動詞，它就不再是問句，而是一個陳述語序的名詞子句，**不能倒裝**，主詞也不必提到句尾。學生常把問句的語法整個搬過來。判斷法：how 後面出現 does / do / is / are，就是倒裝錯了，立刻刪掉。",
        "exOkText": "(O) I don’t know **how my teacher feels about** my project.",
        "exOkZh": "我不知道我的老師對我的專案感覺如何。",
        "exBadText": "(X) I don’t know **how does my teacher feel about** my project.",
        "exBadNote": "錯誤：know 後面接間接問句，後面要用陳述語序，不能倒裝成 how does…"
      },
      {
        "title": "know how 後誤用動詞原形（混淆 know how to + 原形）",
        "bad": "(X) know how **feel** about him ／ (X) know how **feel his boss** about him",
        "ok": "(O) know how **his boss feels** about him",
        "why": "**know how + 主詞 + 動詞** 是「知道⋯⋯怎麼樣」；**know how to + 動詞原形** 才是「知道怎麼做某事」。兩者差一個 to 和一個主詞。學生常把 know how to swim 的 to 拿掉，或把整個子句縮成 know how feel。判斷法：how 後面若沒有 to，就一定要有完整的主詞和動詞。",
        "exOkText": "(O) Do you know **how your sister feels about** him?",
        "exOkZh": "你知道你姐姐對他的感覺如何嗎？",
        "exBadText": "(X) She knows **how feel about** her boss.",
        "exBadNote": "錯誤：know how 後面要有「主詞 + 動詞」，不能只有動詞 feel。"
      },
      {
        "title": "間接問句誤加問號",
        "bad": "(X) know how his boss feels about him **?** ／ (X) **know how his boss feels about him ?** （當問句寫）",
        "ok": "(O) know how his boss feels about him **.**",
        "why": "當 how 已經跟在 know 後面時，整個句子不再是「問句」，而是「陳述句 + 名詞子句」，句尾要用句點，不能加問號。只有當 know 本身被變成疑問句（Do you know…?）時，問號才留得住。判斷法：句中只要出現 know、tell、ask，就把句尾的問號畫掉。",
        "exOkText": "(O) Nobody knows **how his boss feels about** him.",
        "exOkZh": "沒有人知道他的老闆對他的感覺如何。",
        "exBadText": "(X) Nobody knows **how his boss feels about him?**",
        "exBadNote": "錯誤：know 後面接子句，整句已是陳述句，句尾要用句點。"
      },
      {
        "title": "that 與 how 併用錯誤（know 後重複引導）",
        "bad": "(X) know **that how** his boss feels about him ／ (X) know **that what** his boss feels about him",
        "ok": "(O) know **how** his boss feels about him",
        "why": "間接問句本身已經用 how 當引導詞，前面不能再加 that；加了 that 就必須把 how 拿掉，變成 know that his boss feels about him，意思是「知道⋯⋯這件事」而不是「知道⋯⋯怎麼樣」。學生常因中文「想知道⋯⋯的事情」而把兩個引導詞疊在一起。判斷法：know 後面只能留一個引導詞。",
        "exOkText": "(O) Could you tell me **how your parents feel about** your plan?",
        "exOkZh": "你可以告訴我，你父母對你的計畫怎麼看嗎？",
        "exBadText": "(X) Could you tell me **that how your parents feel about** your plan?",
        "exBadNote": "錯誤：that 與 how 不能併用；用 how 就要刪掉 that。"
      }
    ],
    "traps": [
      "**how 不倒裝的陷阱**：會考完形填空若空格緊接在 how 後面，答案一定是「主詞 + 動詞」，不可能是 does + 動詞。看到 how 先在草稿旁邊寫「不倒裝」三個字。",
      "**know how 與 know how to 的陷阱**：how + 子句（how he feels）和 how to + 動詞原形（how to feel）意思不同，會考很常拿來當選擇題的兩個相似選項。",
      "**間接問句不加問號的陷阱**：只要 know 後面接 how 子句，問號就不留；只有把 know 本身變成疑問句（Do you know…?）才用問號。",
      "**主詞藏在子句裡的陷阱**：want to know how his boss feels 中，真正需要加 -s 的主詞是子句裡的 his boss，不是最外層的 he。"
    ],
    "strategy": [
      "括號法：寫 how 開頭的子句時，先用括號把 **how ... about him** 整段框起來，再單獨處理括號外的動詞。",
      "逐層唸主詞：從外往內唸一遍（He / knows / how / his boss / feels / about / him），每一層都檢查一次動詞的單複數。",
      "分清兩組句型：**want / would like / decide + to + 原形**；**know / wonder / ask + how / what / whether + 子句**。",
      "寫完立刻檢查問號：句中只要有 know、tell、ask，句尾就主動把問號刪掉。",
      "兩句並排背：He knows how his boss feels. ／ He wants to know how his boss feels. 對照記憶，比單背一句牢得多。"
    ]
  },
  "wants to know how his boss feels about him": {
    "zh": "想知道他的老闆對他的看法如何",
    "ipa": "wɑːnts tə noʊ haʊ hɪz bɑːs fiːlz əˈbaʊt hɪm",
    "intro": "針對您提供的英文句子 **wants to know how his boss feels about him**，這是一個**動詞片語**，句中沒有主詞，單獨不能成句，要接在主詞後面（He wants to know how his boss feels about him.）。它是「want to do + 間接問句」兩層結構疊在一起，中文一樣翻成「想知道⋯⋯」。最該注意的方向是：want 後面的 **to 是不定詞記號，後面一定要用動詞原形 know**，不能寫成 knows 或 knew，也不能用 wanting / knowing。",
    "headline": "want + to + 動詞原形；know 後再接 how 子句",
    "structure": [
      {
        "role": "動詞",
        "token": "wants",
        "pos": "動詞 (Verb) — want 的第三人稱單數現在式",
        "func": "主要動詞，表示「想要」；主詞通常是 he / she / it，所以要加 -s，後面接不定詞",
        "mark": "O"
      },
      {
        "role": "不定詞記號",
        "token": "to",
        "pos": "不定詞記號 (Infinitive Marker)",
        "func": "接在 want 後面，負責把後面的動詞變回原形，這是英文的固定機關：want **to know**",
        "mark": "O"
      },
      {
        "role": "動詞原形",
        "token": "know",
        "pos": "動詞原形 (Base Form of Verb)",
        "func": "表示「知道」；因為前面是不定詞 to，所以這裡必須用原形，不能加 -s 也不能用過去式",
        "mark": "O"
      },
      {
        "role": "間接問句引導詞",
        "token": "how",
        "pos": "疑問副詞 (Interrogative Adverb)",
        "func": "接在 know 後面引導名詞子句，問「怎麼樣」；後面用陳述語序，不倒裝",
        "mark": "O"
      },
      {
        "role": "所有格限定詞",
        "token": "his",
        "pos": "所有格限定詞 (Possessive Determiner)",
        "func": "修飾後面的名詞 boss，表示「他的」；後面一定要接名詞",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "boss",
        "pos": "名詞 (Noun)",
        "func": "「老闆」；與 his 組成這個子句的主詞",
        "mark": "O"
      },
      {
        "role": "子句主詞（名詞片語）",
        "token": "his boss",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "在 how 引導的子句裡當主詞，是第三人稱單數，所以後面動詞要加 -s",
        "mark": "O"
      },
      {
        "role": "子句動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示「感覺、認為」；主詞 his boss 是單數第三人稱，所以用 feels",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "about",
        "pos": "介系詞 (Preposition)",
        "func": "與 feel 構成固定搭配 **feel about**，表示「對某人的感想」",
        "mark": "O"
      },
      {
        "role": "受詞（介系詞的對象）",
        "token": "him",
        "pos": "代詞受格 (Object Pronoun)",
        "func": "是 he 的受格，放在介系詞 about 後面，代表「對他（的看法）」，不能用主格 he",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "want to do 的 to 後誤用非原形",
        "bad": "(X) wants to **knows** how his boss feels about him ／ (X) wants to **knew** how his boss feels about him",
        "ok": "(O) wants to **know** how his boss feels about him",
        "why": "want 後面的 to 是不定詞記號，負責把後面的動詞變成原形，這是英文的固定機關：want **to know**、want **to go**、want **to eat**。學生常受中文「想要去知道」的影響，把 to 當成「去」，於是把 know 加上 -s 或改成過去式。判斷法：看到 to 就檢查後面是不是原形，不是就立刻改回來。",
        "exOkText": "(O) She wants to **know how** her new teacher feels about her.",
        "exOkZh": "她想知道她的新老師對她的感覺如何。",
        "exBadText": "(X) She wants to **knows how** her new teacher feels about her.",
        "exBadNote": "錯誤：to 是不定詞記號，後面必須用動詞原形 know，不能加 -s。"
      },
      {
        "title": "want to do 與 want doing 混淆",
        "bad": "(X) wants **knowing** how his boss feels about him ／ (X) wants **know** how his boss feels about him",
        "ok": "(O) wants **to know** how his boss feels about him",
        "why": "有些動詞後面可以直接接 V-ing（如 enjoy swimming、finish reading），但 want 不行，只能接 **to + 動詞原形**。學生常把 enjoy、finish 的用法套到 want 上。判斷法：把 want / would like / decide / hope 背成一組，看到就先寫 to。",
        "exOkText": "(O) My brother wants to **learn how to cook**.",
        "exOkZh": "我哥哥想學怎麼煮飯。",
        "exBadText": "(X) My brother wants **learning** how to cook.",
        "exBadNote": "錯誤：want 後面接 to + 動詞原形，不能接 V-ing。"
      },
      {
        "title": "「want」與「want to know」誤用（want 後不能直接接子句）",
        "bad": "(X) wants how his boss feels about him ／ (X) wants what his boss thinks about him",
        "ok": "(O) wants **to know** how his boss feels about him",
        "why": "want 表達「想要」時，後面一定接 to + 動詞原形（want to go、want to eat）；表達「想知道」必須用固定片語 **want to know**，不能把 want 單獨拿去接 how 子句。學生常因中文「想知道」就直接寫成 wants how。判斷法：want 後面接 how / what 子句時，中間要補上 to know。",
        "exOkText": "(O) He **wants to know** what his mother thinks about his plan.",
        "exOkZh": "他想知道他媽怎麼看他的計畫。",
        "exBadText": "(X) He **wants** what his mother thinks about his plan.",
        "exBadNote": "錯誤：want 後不能直接接子句，表達「想知道」要說 wants to know。"
      },
      {
        "title": "動詞第三人稱單數漏 -s（want → wants）",
        "bad": "(X) **want** to know how his boss feels about him",
        "ok": "(O) **wants** to know how his boss feels about him",
        "why": "wants 這個動詞的主詞在片段外面，通常是 he / she / it 等第三人稱單數，所以要加 -s。主詞被拿掉、句子變成片段時，學生最容易忘記加 -s。判斷法：寫完 wants / knows / helps 這類 -s 動詞後，回頭找主詞；找不到就先假定是 He / She / It，照樣加 -s。",
        "exOkText": "(O) My sister **wants** to know how her teacher feels about her.",
        "exOkZh": "我姊姊想知道她老師對她的感覺如何。",
        "exBadText": "(X) My sister **want** to know how her teacher feels about her.",
        "exBadNote": "錯誤：主詞 My sister 是第三人稱單數，want 要加 -s 變成 wants。"
      }
    ],
    "traps": [
      "**to 後必須原形的陷阱**：to 在這裡是不定詞記號，不是介系詞，所以後面的動詞不能有任何變化。know 絕不能變成 knows / knew / known。",
      "**want 與 want doing 的陷阱**：enjoy、finish、keep 後面可以接 V-ing，但 want、would like、decide 後面只能接 to do，會考選項常故意混在一起。",
      "**「想知道」不能只說 want 的陷阱**：want 是「想要」，後面要接 to do；「想知道」的固定說法是 want to know，不能寫 wants how…",
      "**兩層主詞的陷阱**：wants 跟前面的 he 保持一致，feels 跟子句裡的 his boss 保持一致，兩個 -s 各管各的，不能只加一個。"
    ],
    "strategy": [
      "先切兩層：看到 wants 就先畫一條線，把 **to know** 和 **how ... about him** 分成兩塊處理，兩塊的規則不同。",
      "第一塊練熟：把 want / would like / decide / hope / plan + to + 原形 背成一個句型庫，看到 want 立刻反射寫 to。",
      "第二塊套括號法：把 how ... about him 框起來當一整塊，裡面照「主詞 + 動詞」排，絕不倒裝。",
      "-s 自我檢查：寫完後從外往內唸兩次主詞（he → his boss），確認 wants 和 feels 都有 -s。",
      "句尾不加問號：整句是「他想知道⋯⋯」，屬於陳述句，問號要刪掉。"
    ]
  },
  "and he wants to know how his boss feels about him": {
    "zh": "而且他想知道他的老闆對他的看法如何",
    "ipa": "ænd hiː wɑːnts tə noʊ haʊ hɪz bɑːs fiːlz əˈbaʊt hɪm",
    "intro": "針對您提供的英文句子 **and he wants to know how his boss feels about him**，這是一個以連接詞 and 開頭的**子句**，不是完整獨立的句子，前面要有句子承接（He works hard, and he wants to know…）。它把「主詞 he + 動詞片語 wants to know + 間接問句」三層全部放進同一句，難度最高。最該注意的方向是：and 後面的 he 是主詞，必須用**主格**，而且句首的 and **前面不加逗號**。",
    "headline": "and 後用主格 he；句首連接詞不加逗號",
    "structure": [
      {
        "role": "連接詞",
        "token": "and",
        "pos": "連接詞 (Conjunction)",
        "func": "承接上一個分句，表示「而且」；後面一定要接完整的「主詞 + 動詞」，而且句首不加逗號",
        "mark": "O"
      },
      {
        "role": "主詞（代詞）",
        "token": "he",
        "pos": "代詞主格 (Subject Pronoun)",
        "func": "單獨當主詞，後面接動詞 wants，所以必須用主格 he，不能用所有格 his 或受格 him",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "wants",
        "pos": "動詞 (Verb) — want 的第三人稱單數現在式",
        "func": "表示「想要」，與主詞 he 保持第三人稱單數一致，後面接不定詞",
        "mark": "O"
      },
      {
        "role": "不定詞記號",
        "token": "to",
        "pos": "不定詞記號 (Infinitive Marker)",
        "func": "把後面的動詞變回原形，是 want to do 的固定結構",
        "mark": "O"
      },
      {
        "role": "動詞原形",
        "token": "know",
        "pos": "動詞原形 (Base Form of Verb)",
        "func": "表示「知道」；前面是不定詞 to，所以必須用原形，不能加 -s",
        "mark": "O"
      },
      {
        "role": "間接問句引導詞",
        "token": "how",
        "pos": "疑問副詞 (Interrogative Adverb)",
        "func": "接在 know 後面引導名詞子句，問「怎麼樣」；後面用陳述語序，不倒裝",
        "mark": "O"
      },
      {
        "role": "子句主詞（名詞片語）",
        "token": "his boss",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "所有格 his + 名詞 boss，在子句裡當主詞；這個 his 指的是「他的老闆」，和前面的 he 是不同的人",
        "mark": "O"
      },
      {
        "role": "子句動詞",
        "token": "feels",
        "pos": "動詞 (Verb) — feel 的第三人稱單數現在式",
        "func": "表示「感覺、認為」；主詞 his boss 是第三人稱單數，所以加 -s",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "about",
        "pos": "介系詞 (Preposition)",
        "func": "與 feel 構成固定搭配 **feel about**，表示「對某人的感想」",
        "mark": "O"
      },
      {
        "role": "受詞（介系詞的對象）",
        "token": "him",
        "pos": "代詞受格 (Object Pronoun)",
        "func": "是 he 的受格，放在介系詞 about 後面，代表「對他（的看法）」，不能用主格 he",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "連接詞後的主詞須用主格代詞",
        "bad": "(X) and **his** wants to know how his boss feels about him ／ (X) and **him** wants to know how his boss feels about him",
        "ok": "(O) and **he** wants to know how his boss feels about him",
        "why": "he 在這裡的角色是「單獨當主詞」，後面直接接動詞 wants，所以必須用主格 he。所有格 his 只能放在名詞前（his boss），受格 him 只能放在動詞或介系詞後面。學生常因為句中後面已經出現過 his、him，就誤以為主詞要「換一個」，結果把 he 寫成 his 或 him。判斷法：看後面是不是接動詞，接動詞的就是主格。",
        "exOkText": "(O) He works very hard, **and he wants to know** how his boss feels about him.",
        "exOkZh": "他很努力，而且他想知道他的老闆對他的看法如何。",
        "exBadText": "(X) He works very hard, **and his wants to know** how his boss feels about him.",
        "exBadNote": "錯誤：作主詞要用主格 he；his 是所有格，後面還要接名詞。"
      },
      {
        "title": "句首連接詞 and 前誤加逗號",
        "bad": "(X) **, and** he wants to know how his boss feels about him ／ (X) **，and** he wants to know how his boss feels about him",
        "ok": "(O) **And he wants to know** how his boss feels about him.",
        "why": "中文習慣在「而且」前面加逗號，但英文句首的連接詞 and 前面**不加逗號**，句子要從 And 直接開始。只有當 and 放在句中、連接兩個完整句子時，中間才用逗號。會考閱讀裡常出現這種逗號位置的判斷題。判斷法：看到句首的 and／but／so／because，前面絕對不加逗號。",
        "exOkText": "(O) He is new here, **and he wants to know** how his boss feels about him.",
        "exOkZh": "他是新來的，而且他想知道他的老闆對他的看法如何。",
        "exBadText": "(X) **, And he wants to know** how his boss feels about him.",
        "exBadNote": "錯誤：句首的連接詞 and 前面不加逗號。"
      },
      {
        "title": "避免重複代詞而誤改指涉（his boss 誤寫 he boss）",
        "bad": "(X) and he wants to know how **he** boss feels about him ／ (X) and he wants to know how **he** boss feels about **he**",
        "ok": "(O) and he wants to know how **his** boss feels about him",
        "why": "這裡 his boss 的 his 指「他的老闆」，和前面的 he **指不同的人**，不能混用。中文母語者常因為不想讓 he、his 連著出現兩次，就把子句裡的 his 改成 he，但這會把「他的老闆」變成別的意思，在英文裡是不合法的寫法。判斷法：his 後面一定要接名詞，he 後面一定要接動詞。",
        "exOkText": "(O) Tom asked **how his father felt about** his boss.",
        "exOkZh": "湯姆問他爸爸對他老闆的感覺如何。",
        "exBadText": "(X) Tom asked **how he father felt about** his boss.",
        "exBadNote": "錯誤：he father 不成立；名詞前面一定要用所有格 his。"
      },
      {
        "title": "「想要」不是 be 動詞句（雙動詞錯誤）",
        "bad": "(X) and he **is wants** to know how his boss feels about him ／ (X) and he **is want** to know how his boss feels about him",
        "ok": "(O) and he **wants** to know how his boss feels about him",
        "why": "中文「他想要⋯⋯」聽起來像「他是很想要」，學生容易在前面多加一個 be 動詞（is / am / are）。但 want 是實義動詞，本身就可以直接當句子的動詞，前面不需要 be 動詞。判斷法：句子的動詞已經有了實義動詞（want、know、feel、like、help），前面就不要再加 be 動詞，否則就是雙動詞。",
        "exOkText": "(O) He **wants** to know how his boss feels about him.",
        "exOkZh": "他想知道他的老闆對他的看法如何。",
        "exBadText": "(X) He **is wants** to know how his boss feels about him.",
        "exBadNote": "錯誤：want 是實義動詞，前面不能再加 is（雙動詞）。"
      }
    ],
    "traps": [
      "**主格與所有格的陷阱**：和 want、know、feels 這類動詞相鄰的代詞一定是主格（he / she / it）；所有格 his / her / their 只能緊接在名詞前面。",
      "**句首連接詞不加逗號的陷阱**：中文的「，而且⋯⋯」直接翻成英文就會多一個逗號，會考選擇題常拿這一點下陷阱。",
      "**兩個 his 指的是不同的人**：句首的 he 是「他」，子句裡的 his boss 是「他的老闆」，千萬不要為了避免重複而改掉任何一個。",
      "**不要在 want 前加 be 動詞**：want / know / like / help 都是實義動詞，前面加 is 就變成雙動詞錯誤。"
    ],
    "strategy": [
      "從外往內拆層：and ／ he ／ wants ／ to ／ know ／ how ／ his boss ／ feels ／ about ／ him，一層一層唸，確認每一層的詞都對得起來。",
      "主格檢查法：看到代詞就先看它後面接什麼——接動詞就是主格，接名詞就是所有格，接介系詞就是受格。",
      "標點檢查法：整句以 and 開頭，前面一律不加逗號；把逗號畫掉再看一次。",
      "指涉檢查法：句子裡出現兩個 his 或 he 時，逐一確認它們指的是不是同一人，別為了求變化而改錯。",
      "完整寫成對照句：He works hard, and he wants to know how his boss feels about him. 唸熟整句，再回頭單看片段。"
    ]
  }
};
