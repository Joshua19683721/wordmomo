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
    "zh": "這（這個）／這個東西",
    "ipa": "/ðɪs/",
    "intro": "針對您提供的英文單詞 **(O) This**，這是一個**不能單獨成句的詞語**，它只有主詞，後面必須接 be 動詞（is / am / are）或名詞（this book、this pen）才會變成完整句子。單獨的 This 可以作主詞使用（作主詞時後面要補動詞），也可以放在名詞前面當定冠詞（this book＝這本書）。最容易出錯的地方是大寫、單複數（this 對應單數、these 對應複數），以及把單獨的 This 誤當成一句完整的話。",
    "headline": "單獨的 This 沒有動詞，要靠後面的 be 動詞才成句",
    "structure": [
      {
        "role": "指示代詞",
        "token": "This",
        "pos": "指示代詞 (Demonstrative Pronoun) — 單數",
        "func": "指「這、這個」，用來指眼前的東西或上文提到的事物；單獨使用時它是句子的主詞",
        "mark": "O"
      },
      {
        "role": "單獨使用時的成分提示",
        "token": "This",
        "pos": "代詞 (Pronoun) — 可單獨作主詞",
        "func": "單獨的 This 只完成了主詞的部分，後面還需要 be 動詞（is / am / are）或一個名詞，否則只是片段，寫作時不能停在這裡",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "大小寫錯誤（句首未大寫）",
        "bad": "(X) **this** is my new pen.",
        "ok": "(O) **This** is my new pen.",
        "why": "英文的 this / that / these / those 本身是小寫的指示代詞，但當它們被放在句子的最前面時，第一個字母一定要改成大寫，變成 This / That / These / Those。學生常常照中文習慣把「這」直接對應成 this 而忘記大寫，尤其在題目要求填入句首空格的時候最容易失分。判斷法：寫完英文先看第一個字，只要不是專有名詞，也不是單獨的 I，就一定要大寫。",
        "exOkText": "(O) **This** is my new pen.",
        "exOkZh": "這是我的新筆。",
        "exBadText": "(X) **this** is my new pen.",
        "exBadNote": "錯誤：句首的 this 忘記大寫。指示代詞放在句首時第一個字母一定要寫成大寫的 This。"
      },
      {
        "title": "指示代詞單複數混淆（this ↔ these）",
        "bad": "(X) **These** is my new pen. ／ (X) **This** are my pens.",
        "ok": "(O) **This** is my new pen.",
        "why": "this / that 是**單數**的指示代詞，these / those 才是**複數**。中文的「這」不分單複數，所以學生很容易把 these 誤用在單數名詞上，或把 this 配上複數名詞。判斷法：先看後面的名詞是單數（a pen、my book）還是複數（two pens、my books），單數配 this / that，複數配 these / those；尤其當名詞前已經有 my、these 等詞修飾時，複數一定要用 these。",
        "exOkText": "(O) **These** are my new pens.",
        "exOkZh": "這些是我的新筆。",
        "exBadText": "(X) **This** are my new pens.",
        "exBadNote": "錯誤：後面的名詞 my new pens 是複數，指示代詞要用 these，不能用 this。"
      },
      {
        "title": "this 與 that 的近指、遠指混淆",
        "bad": "(X) **This** is my uncle's house over there. ／ (X) **That** is the book I am reading now.",
        "ok": "(O) **That** is my uncle's house over there.",
        "why": "this 指的是「離說話者**近**的、伸手就能拿到」那個；that 指的是「離說話者**遠**的、在那邊的」那個。另外中文的「這」有時帶有對立、貶抑的語氣（這個人真討厭），英文必須改用 that 才對得上。學生常受中文影響，把兩個都翻成「這」。判斷法：想像自己伸手去指——指得到的是 this，指不到、在遠處的是 that；句中出現 over there、there 時，幾乎都用 that。",
        "exOkText": "(O) **That** is my uncle's house over there.",
        "exOkZh": "那邊那棟房子是我叔叔的家。",
        "exBadText": "(X) **This** is my uncle's house over there.",
        "exBadNote": "錯誤：房子在「那邊 over there」，離說話者較遠，指示代詞要用 that，而不是 this。"
      },
      {
        "title": "片段不能單獨成句（缺少 be 動詞或名詞）",
        "bad": "(X) **This** good. ／ (X) **This** my book.",
        "ok": "(O) **This** is good. ／ (O) **This** is my book.",
        "why": "英文句子至少要有「主詞 + 動詞」兩個部分，be 動詞（am / is / are）本身就算動詞。單獨一個 This 只有主詞，後面一定要補上 is，或直接接一個名詞（this book、this pen）。學生常以為「這」就是一個完整的答案，於是寫出 This good. 或 This my book. 這種殘缺的片段。判斷法：寫完主詞立刻檢查「動詞跑到哪裡去了？」，兩邊都確認過才算完成一句話。",
        "exOkText": "(O) **This** is a very good idea.",
        "exOkZh": "這是一個非常好的主意。",
        "exBadText": "(X) **This** a very good idea.",
        "exBadNote": "錯誤：句中有主詞 This，卻缺少 be 動詞 is，句子不完整，應寫成 This is a very good idea。"
      }
    ],
    "traps": [
      "**指示代詞單複數的陷阱**：本句用 this，當後面接的是複數名詞（these books、those pens）時，選項裡的 this、that 都要立刻排除；會考常在「指示代詞 + 複數名詞」的搭配上出題。",
      "**大寫規則的陷阱**：單獨的 This 是代詞，等於中文的「這（個）」，而不是「這個東西是……」。看到 What is this? 要反應出 This 後面還要接 be 動詞或名詞。",
      "**this 作定冠詞的陷阱**：this book 的 this 放在名詞**前面**；單獨使用的 this 是代詞，兩者不能混用，不能寫成 this the book。",
      "**句子成分的陷阱**：單獨的 This 一定是主詞，句子裡至少要有兩部分（主詞 + 動詞或名詞），只寫 This 一個字一定會被判錯。"
    ],
    "strategy": [
      "先判斷句子成分：看到單獨的 This，就先在旁邊寫下「主詞」，再問自己「動詞呢？」，逼自己補上 is / am / are 或名詞。",
      "背熟四個指示代詞：this（這，單）、that（那，單）、these（這些）、those（那些），每個都配一個單複數範例詞一起記。",
      "大小寫養成習慣：每寫完一個英文句子，先看第一個字母有沒有大寫，這是最容易得分的檢查點。",
      "口說練習：把 This is…、That is… 各唸五句並配上眼前的實物（這支筆、那本書），讓大腦把 this 和 that 的遠近感記牢。",
      "檢查時針對中文的盲點：中文沒有大小寫、也沒有單複數，所以這兩項要特別多看兩眼。"
    ]
  },
  "This is": {
    "zh": "這是",
    "ipa": "/ðɪs ɪz/",
    "intro": "針對您提供的英文 **(O) This is**，這是**可以單獨成句的完整句子**（雖然非常短），由「指示代詞主詞 + be 動詞 is」兩個部分構成，用來指認某個東西或介紹某件事。最需要注意的大方向是：is 一定要搭配單數的 This，絕對不能寫成 are；另外中文的「這是」常讓學生把 be 動詞整個漏掉，或在問句中忘記把 is 提前。",
    "headline": "This 是單數，be 動詞必須用 is 而非 are",
    "structure": [
      {
        "role": "主詞",
        "token": "This",
        "pos": "指示代詞 (Demonstrative Pronoun) — 單數",
        "func": "指「這、這個」，放在句首用來介紹接下來要說的東西；它也是決定 be 動詞形式的依據",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "is",
        "pos": "be 動詞 (Be Verb) — 原形",
        "func": "意思是「是、就是」，本身就算動詞；因為主詞 This 是單數，所以搭配 is 而不是 are",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "be 動詞與主詞不一致（This are）",
        "bad": "(X) This **are** good. ／ (X) This is not **are**.",
        "ok": "(O) This **is** good.",
        "why": "be 動詞必須跟主詞的「數」一致：單數主詞（I、he、she、it、this、that）配 is，複數主詞（we、they、these、those）配 are。中文的「這是」不分單複數，學生常常憑中文感覺一律寫 are，選項只差一個字母卻完全相反。判斷法：先圈出主詞，看它是單數還是複數——單數一律用 is，複數才用 are。",
        "exOkText": "(O) This **is** my sister's bike.",
        "exOkZh": "這是我姐姐的腳踏車。",
        "exBadText": "(X) This **are** my sister's bike.",
        "exBadNote": "錯誤：主詞 This 是單數，be 動詞要用 is；are 只能搭配 we、they、these 等複數主詞。"
      },
      {
        "title": "指示代詞重複使用（This is this book）",
        "bad": "(X) **This is this** book. ／ (X) This is **that** my pen.",
        "ok": "(O) This is **my** book.",
        "why": "this / that 本身就是「指示代詞」，單獨用時可以作主詞或受詞；後面接名詞時中文會說「這本書」，英文只寫 this book 一個指示代詞就夠了，不能重複。學生常受中文「這是這本書」的語序影響而多寫一個 this。判斷法：this 後面如果已經接了名詞，前面就不要再加「這、那」；真的要用兩個指示代詞，中間一定要有 and，例如 This is that book.",
        "exOkText": "(O) This **is my** school bag.",
        "exOkZh": "這是我的書包。",
        "exBadText": "(X) This is this my school bag.",
        "exBadNote": "錯誤：指示代詞 this 重複出現，這本書只能寫成 this school bag，不能寫成 this my school bag。"
      },
      {
        "title": "this 與 it 的交替使用混淆",
        "bad": "(X) I lost my key. **This** is under the bed. ／ (X) What's that? — **This** is a bird.",
        "ok": "(O) I lost my key. **It** is under the bed.",
        "why": "this / that 是「**特指**」，用來指特定的、說話者心中有目標的那一個（這本書）；it 是「**泛指**」，用來指前面提過的、已知的那個東西（我剛才提到的那把鑰匙）。中文的「這」有時兩種都能用，英文就必須區分。判斷法：第一次提到、指眼前這一個 → this；已經提過一次、再次提到 → it。特別注意，It is my book. 常常是在**回答** What is this?。",
        "exOkText": "(O) I lost my key. **It** is under the bed.",
        "exOkZh": "我的鑰匙不見了，就掉在床底下。",
        "exBadText": "(X) I lost my key. **This** is under the bed.",
        "exBadNote": "錯誤：這裡指的是「我剛才提到的那把鑰匙」，已知的事實要用 it，不能用 this。"
      },
      {
        "title": "疑問句語序錯誤（be 動詞沒有提前）",
        "bad": "(X) **This is** your new pen? ／ (X) This is **is** your new pen?",
        "ok": "(O) **Is this** your new pen?",
        "why": "陳述句的語序是 This is…，但疑問句沒有 do / does 幫忙，必須把 be 動詞提到**主詞前面**變成 Is this…?。學生常常在句子後面加個問號就以為自己是問句，be 動詞還留在原位。判斷法：看到句尾是問號，就檢查 be 動詞（am / is / are）有沒有跑到主詞前面；一般動詞的問句則要借助 do / does 提前。",
        "exOkText": "(O) **Is this** your new pen?",
        "exOkZh": "這是你的新筆嗎？",
        "exBadText": "(X) **This is** your new pen?",
        "exBadNote": "錯誤：這是問句，be 動詞 is 必須提到主詞前面，寫成 Is this your new pen?。"
      }
    ],
    "traps": [
      "**be 動詞一致的陷阱**：本句主詞 This 是單數，選項中只要出現 are、were 就一定是錯的；會考常在 This is 與 This are 之間設一個只差一個字母的陷阱選項。",
      "**單獨成句的陷阱**：This is 本身已經是完整句子，後面可以接任何東西（a pen、interesting、not mine），不需要再加動詞，不要寫成 This is is a pen.",
      "**語序的陷阱**：本句若改成問句，be 動詞要提前成 Is this…?，不能寫成 This is your pen?。",
      "**this 與 it 的陷阱**：會考在對話中用 It is… 回答 What is this?，因為東西已經被問過一次，此時用 it 才是自然的交替。"
    ],
    "strategy": [
      "背 be 動詞對照表：I am／you are／he-she-it-this-is／we-you-they-these-are，遇題先圈主詞再對表。",
      "寫完句子做兩次檢查：第一次檢查 be 動詞有沒有漏、單複數對不對；第二次檢查這是不是問句（問號等於 be 動詞要提前）。",
      "用中文對照練習：把「這是…」譯成英文時，務必在中文的「是」下面畫一條線，提醒自己一定要寫出 is。",
      "口說造句五句：拿眼前的東西說 This is a pen.／This is my bag.／This is important.，唸到不假思索。",
      "遇到不熟的代詞先避開：考卷上 this / that / it 意思不同，看不出差別時用 the 這隻手（the book）通常最安全。"
    ]
  },
  "not planned": {
    "zh": "未預先計劃的",
    "ipa": "/nɑːt plænd/",
    "intro": "針對您提供的英文片語 **(O) not planned**，這是一個**不能單獨成句的片語**，它只是「否定副詞 + 過去分詞」構成的形容詞片語，自己沒有主詞也沒有動詞，一定要放在 be 動詞後面（This trip is not planned.）才成句子。它表示「（事先）沒有被計劃好的」，重點有兩個：not 必須在 planned 的前面，planned 必須保留過去分詞的 -ed。",
    "headline": "not 放前面，planned 別忘記 -ed",
    "structure": [
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定副詞 (Negative Adverb)",
        "func": "放在 be 動詞或過去分詞的前面表示「不、沒有」，本片語中它緊接在 planned 之前",
        "mark": "O"
      },
      {
        "role": "過去分詞（形容詞）",
        "token": "planned",
        "pos": "過去分詞 (Past Participle) — plan 的過去分詞",
        "func": "由動詞 plan 變來，帶 -ed 字尾；放在 be 動詞後面時當「被計劃好的」用，是本片語的意義核心",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "not planned",
        "pos": "否定形容詞片語 (Negative Adjective Phrase)",
        "func": "兩者合起來仍只是一個修飾語，前面必須有主詞和 be 動詞，不能自己獨立成句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "過去分詞字尾 -ed 遺漏（plan → plan）",
        "bad": "(X) This trip is **not plan**. ／ (X) The party was **not plan**.",
        "ok": "(O) This trip is **not planned**.",
        "why": "planned 是動詞 plan 的**過去分詞**，當形容詞用時一定要保留 -ed 字尾，就像 interesting 一定要保留 -ing 一樣。中文的「沒有計劃的」沒有任何字尾變化，學生很容易直接寫成 plan。判斷法：只要這個詞是放在 be 動詞後面、當「…的」來修飾名詞，就要檢查有沒有 -ed；動詞原形 plan 只能拿來當「計劃（動作）」用。",
        "exOkText": "(O) The party was **not planned** carefully.",
        "exOkZh": "那場派對並沒有經過仔細規劃。",
        "exBadText": "(X) The party was **not plan** carefully.",
        "exBadNote": "錯誤：be 動詞後面的 planned 是過去分詞，要保留 -ed 字尾，不能只寫動詞原形 plan。"
      },
      {
        "title": "planned 與 planning 混淆（語意不同）",
        "bad": "(X) I am **not planned** to go to the concert.",
        "ok": "(O) I am **not planning** to go to the concert.",
        "why": "planned 是「（某件事）**被**安排好」的**過去分詞**，通常放在 be 動詞後面當形容詞（The trip is planned.）；planning 是「主體**主動**規劃」的現在分詞。中文「我沒有計劃要去聽演唱會」的重點在「我主動的打算」，所以英文要用 planning。判斷法：看句子主詞是不是那個「正在做計劃的人」？是 → 用 planning；主詞是被安排的事情 → 用 planned。",
        "exOkText": "(O) I am **not planning** to study abroad this year.",
        "exOkZh": "我今年不打算出國留學。",
        "exBadText": "(X) I am **not planned** to study abroad this year.",
        "exBadNote": "錯誤：「我主動規劃」要用現在分詞 planning；planned 是「被計劃好的」，語意完全不同。"
      },
      {
        "title": "完成式 have / has 遺漏（漏掉「到目前為止」）",
        "bad": "(X) I **not plan** the trip before. ／ (X) She **not planned** it ever.",
        "ok": "(O) I **have not planned** the trip before.",
        "why": "中文「我（到現在為止）從來沒有計劃過這趟旅行」強調「到目前為止都沒有」，英文要用**完成式** have / has + 過去分詞，再用 not 否定。只寫 not planned 會變成單純的過去某個時刻，聽起來像「（過去那個時候）我沒有安排」。判斷法：中文出現「還沒有、從來沒有、到目前為止」這類字眼，先想到 have / has not + 過去分詞。",
        "exOkText": "(O) I **have not planned** anything for the weekend yet.",
        "exOkZh": "我到目前為止還沒有安排週末的任何行程。",
        "exBadText": "(X) I **not planned** anything for the weekend yet.",
        "exBadNote": "錯誤：要用完成式 have not planned 才有「到目前為止還沒」的意思，不能漏掉 have。"
      },
      {
        "title": "語序錯誤（把片語搬到句首）",
        "bad": "(X) **Not planned** is this trip. ／ (X) Not planned, we went there anyway.",
        "ok": "(O) This trip is **not planned**.",
        "why": "not planned 是形容詞片語，要放在 be 動詞（is / was / are / were）的**後面**；一旦搬到句首，它就變成「否定副詞開頭」的省略說法，句意會完全不一樣。學生受中文「沒有計劃好的行程」影響，習慣把這團字放在名詞前面，忘了英文的形容詞要跟在 be 動詞後面。判斷法：先寫出 be 動詞 is / was，再把 not planned 貼在它後面，最後補上名詞。",
        "exOkText": "(O) The road we took was **not planned**.",
        "exOkZh": "我們走的那條路不是預先規劃好的。",
        "exBadText": "(X) **Not planned** was the road we took.",
        "exBadNote": "錯誤：形容詞片語 not planned 要放在 be 動詞後面修飾名詞，不能整團搬到句首當開頭，否則整句語意就變了。"
      }
    ],
    "traps": [
      "**-ed 字尾的陷阱**：會考常在 planned、plan、plans 三個選項之間設陷阱；判斷原則是「放在 be 動詞後面當『…的』用」就選 planned。",
      "**be 動詞位置的陷阱**：本片語前面一定有主詞和 be 動詞（Something is not planned.），因為片語自己不能成句；選項中若出現單獨的 Not planned.，一定是錯的。",
      "**planned / planning 的陷阱**：中文的「計劃」兩種形式都對得上，但英文 planned 是被動、已完成，planning 是主動、正在做，語意不同，常拿來混淆。",
      "**完成式的陷阱**：中文「還沒計劃過」要對應 have not planned，漏掉 have 就變成單純的過去式，意思會偏掉。"
    ],
    "strategy": [
      "分清楚三個角色：plan（動詞原形）、planned（過去分詞／形容詞）、planning（現在分詞），做成三欄對照表貼在錯題本上。",
      "寫完 be 動詞就反射檢查後面：只要後面接的是「修飾名詞的形容詞」，立刻確認 -ed 有沒有寫出來。",
      "看到中文「還沒有、從來沒有、到目前為止」，先寫下 have / has not，再去寫後面的過去分詞。",
      "翻譯時先標詞性：把「（某人）計劃」標成主動、「（某事）被計劃」標成被動，再決定用 planning 還是 planned。",
      "把片語放回句子裡背：不要只背 not planned，要連著整句一起背（The trip is not planned.），才不會誤以為它能單獨成句。"
    ]
  },
  "This is not planned": {
    "zh": "這不是預先計劃好的",
    "ipa": "/ðɪs ɪz nɑːt plænd/",
    "intro": "針對您提供的英文句子 **(O) This is not planned**，這是一個**完整的否定句**，結構為「主詞 This + be 動詞 is + 否定詞 not + 過去分詞 planned」。not 必須放在 is 的後面、planned 的前面，順序不能互換。整句是「這件事沒有被事先安排好」的意思，帶有被動語氣；最容易出錯的是否定詞的位置與標點。",
    "headline": "not 必須夾在 is 和 planned 之間",
    "structure": [
      {
        "role": "主詞",
        "token": "This",
        "pos": "指示代詞 (Demonstrative Pronoun) — 單數",
        "func": "指「這、這件事」，是句子的主角，也決定 be 動詞要用 is",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "is",
        "pos": "be 動詞 (Be Verb) — 原形",
        "func": "和單數主詞 This 搭配，本身就是動詞，表示「是／處於某種狀態」",
        "mark": "O"
      },
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定副詞 (Negative Adverb)",
        "func": "緊跟在 be 動詞 is 的後面、planned 的前面，把整句變成否定",
        "mark": "O"
      },
      {
        "role": "過去分詞（表語）",
        "token": "planned",
        "pos": "過去分詞 (Past Participle) — plan 的過去分詞",
        "func": "帶 -ed 的表語，表示「被計劃好的」，是本句真正的動作重點",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "否定詞位置錯誤（not 不在正確位置）",
        "bad": "(X) This is **planned not**. ／ (X) **This not is** planned.",
        "ok": "(O) This is **not** planned.",
        "why": "be 動詞句的否定公式是「主詞 + be 動詞 + **not** + 其他」，not 一定要緊跟在 be 動詞 is 的後面，不能跑到句尾，也不能插進主詞與 be 動詞中間。學生常受中文「這不是計劃好的」語序影響，把中文的「不是」直譯成 is…not。判斷法：把 not 圈起來，它的位置一定在 is 的正後方；一般動詞的否定則是「主詞 + don't / doesn't / didn't + 動詞原形」，兩套公式不要混。",
        "exOkText": "(O) The answer was **not** checked carefully.",
        "exOkZh": "答案並沒有被仔細核對。",
        "exBadText": "(X) The answer was checked **not** carefully.",
        "exBadNote": "錯誤：否定詞 not 必須緊接在 be 動詞 was 後面，不能搬到句尾或受詞之後。"
      },
      {
        "title": "否定詞選擇錯誤（not 與 no 混用）",
        "bad": "(X) This is **no** planned. ／ (X) This is **without** planned.",
        "ok": "(O) This is **not** planned.",
        "why": "not 是一般的否定副詞，專門用來否定**動詞、be 動詞或形容詞**（He is not here.／It is not planned.）；no 是「沒有」，後面只能接**名詞**（There is no plan.）。中文的「這沒有計劃」很容易讓學生用 no，但 no planned 是不成立的。判斷法：看後面接的是動詞（is、planned、go）就用 not；後面接的是名詞（a plan、time、money）才用 no / any。",
        "exOkText": "(O) The bus **is not** on time today.",
        "exOkZh": "公車今天沒有準時。",
        "exBadText": "(X) The bus **is no** on time today.",
        "exBadNote": "錯誤：no 後面只能接名詞，不能用來否定動詞；否定 be 動詞 is 一定要用 not。"
      },
      {
        "title": "否定句誤加問號（語氣轉換錯誤）",
        "bad": "(X) This is not planned**?** ／ (X) This is not planned, right**?**",
        "ok": "(O) This is not planned**.**",
        "why": "這是一個**陳述句**，在告知一件已知的事實，應該用句號（或驚嘆號）結尾。學生常因為中文「這不是計劃好的？」帶有疑問語氣，就照樣在英文後面加問號。判斷法：英文標點要跟著**語氣**走，不是跟著中文標點走——陳述「沒有被計劃過」用句號；真的想問「有沒有被計劃過？」才改寫成 Has this been planned**?**，而且 planned 仍是過去分詞。",
        "exOkText": "(O) The wedding was not planned in advance.",
        "exOkZh": "婚禮並沒有事先規劃好。",
        "exBadText": "(X) The wedding was not planned in advance**?**",
        "exBadNote": "錯誤：這是陳述句，應該用句號結尾；要用問號得改成疑問句 Has the wedding been planned?。"
      },
      {
        "title": "雙重否定（not 加上否定前綴 un-）",
        "bad": "(X) This is not **unplanned**. ／ (X) The trip is not **un**-planned yet.",
        "ok": "(O) This is **not planned**.",
        "why": "前綴 un- 本身就已經帶有「否定」的意思（unplanned = 沒有被計劃的），再加一個 not 就變成「不是沒有被計劃的」，等於說「這是被計劃好的」，語意完全相反。學生常常看到中文的「未…」就習慣在前面再補一個 not。判斷法：看到 unplanned、untidy、unhappy 這類帶 un- 的詞，**不能再加 not**；要否定整句時只保留其中一個。",
        "exOkText": "(O) The dinner tonight is **not planned** in advance.",
        "exOkZh": "今晚的晚餐不是事先安排好的。",
        "exBadText": "(X) The whole trip is **not unplanned**.",
        "exBadNote": "錯誤：unplanned 已含「未規劃」的意思，再加 not 就變成「不是未規劃的」，語意正好相反。"
      }
    ],
    "traps": [
      "**否定詞位置的陷阱**：本句的公式是「主詞 + be 動詞 + **not** + 過去分詞」，not 在 is 的後面、planned 的前面；選項若把 not 搬到句尾或主詞中間，讀起來會很奇怪，立刻排除。",
      "**not / no 的陷阱**：no 後面只能接名詞（no plan），否定動詞或 be 動詞一律用 not；題目很喜歡把 is no 與 is not 拿來對調。",
      "**否定前綴的陷阱**：看到 un-、in-、im- 開頭的字，本身就含否定，不能再加 not，否則會變成雙重否定、語意相反。",
      "**標點與語氣的陷阱**：本句是陳述句，用句號結尾；若語氣改成提問，才寫成 Has this been planned**?**，並把 planned 放回過去分詞的位置。"
    ],
    "strategy": [
      "背兩套否定公式：be 動詞 → 主詞 + am / is / are + **not** + 其他；一般動詞 → 主詞 + don't / doesn't / didn't + 動詞原形。寫作時先判斷是哪一類。",
      "寫完否定句做一次位置檢查：用手指指著 not，確認它緊跟在 be 動詞後面，沒有跑到句尾。",
      "把 be 動詞後面的詞分類：動詞原形 / 過去分詞 / 形容詞，看到 planned 立刻檢查 -ed 是否完整。",
      "中文標點不要照抄：先決定英文這句是陳述還是疑問，再決定用句號或問號，寫完唸一次確認語氣順。",
      "多練習雙重否定的判斷：把 not 加上 un- 開頭的字圈起來，提醒自己語意會相反，寫作時寧可刪掉其中一個。"
    ]
  },
  "Oh no, this is not planned": {
    "zh": "噢不，這完全不在計劃中",
    "ipa": "/əʊ nəʊ, ðɪs ɪz nɑːt plænd/",
    "intro": "針對您提供的英文句子 **(O) Oh no, this is not planned**，這是一個**完整的感嘆式否定句**：前面是感嘆語 **Oh no**（噢不、糟了），後面接一個完整的否定句子，用來表達突然發現事情不對勁時的失望。寫這句最需要留心的是**標點與大寫**：感嘆語後面加逗號、逗號後面的 this 不用再大寫，而且整句是陳述語氣，結尾用句號而不是問號。",
    "headline": "感嘆語後加逗號，逗號後不用大寫",
    "structure": [
      {
        "role": "感嘆語",
        "token": "Oh no",
        "pos": "感嘆詞 (Interjection) — Oh + no",
        "func": "放在句首的感嘆語，「噢不、糟了」，用來表達突然發現事情不對勻時的情緒，本身沒有主詞與動詞",
        "mark": "O"
      },
      {
        "role": "標點",
        "token": ",",
        "pos": "逗號 (Comma)",
        "func": "把感嘆語 Oh no 和後面的句子隔開；感嘆語之後通常要加一個逗號，Oh 與 no 中間不加",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "this",
        "pos": "指示代詞 (Demonstrative Pronoun) — 單數、小寫",
        "func": "指「這、這件事」，是後半句的主詞；因為前面已有逗號且屬於同一個句子，這裡用小寫",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "is",
        "pos": "be 動詞 (Be Verb) — 原形",
        "func": "和單數主詞 this 搭配，本身就是動詞，表示「是／處於某種狀態」",
        "mark": "O"
      },
      {
        "role": "否定詞",
        "token": "not",
        "pos": "否定副詞 (Negative Adverb)",
        "func": "緊跟在 be 動詞 is 的後面、planned 的前面，把後半句變成否定",
        "mark": "O"
      },
      {
        "role": "過去分詞（表語）",
        "token": "planned",
        "pos": "過去分詞 (Past Participle) — plan 的過去分詞",
        "func": "帶 -ed 的表語，表示「被計劃好的」，是整句訊息的重點",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "感嘆語內部的逗號位置錯誤（Oh, no, 誤用）",
        "bad": "(X) **Oh, no,** this is not planned. ／ (X) **Oh, no,** I lost my ticket.",
        "ok": "(O) **Oh no,** this is not planned.",
        "why": "Oh 是單獨的感嘆詞，no 是它的搭檔，兩者之間**不加逗號**，整個「Oh no」算一個單位；逗號要放在感嘆語**之後**、句子之前。學生常受中文「噢，不，」的標點影響，把逗號塞進 Oh 和 no 之間。判斷法：先默唸一次「Oh no」確認它是一個整體，再在它後面補上逗號；兩個詞中間若加了逗號，語意就變成被打斷了。",
        "exOkText": "(O) **Oh no,** I think I left my wallet at home.",
        "exOkZh": "糟糕，我想我把皮夾落在家裡了。",
        "exBadText": "(X) **Oh, no,** I think I left my wallet at home.",
        "exBadNote": "錯誤：感嘆語 Oh 和 no 之間不能加逗號，應寫成 Oh no,，逗號放在整個感嘆語後面。"
      },
      {
        "title": "逗號後誤以為要再大寫（, This is）",
        "bad": "(X) Oh no, **This** is not planned. ／ (X) Oh no, **This** is my fault.",
        "ok": "(O) Oh no, **this** is not planned.",
        "why": "英文**只有在句子的最開頭才需要大寫**。這裡 Oh no 已經占了句子的第一個字，後面的 this 只是被逗號隔開的後半句，屬於同一個句子，必須維持小寫。學生受中文「，這是……」的影響，以為逗號就像句號一樣代表新句子。判斷法：數一數句號有幾個——只有一個句號、一個逗號，就是同一個句子，中間的單字不要大寫。",
        "exOkText": "(O) Oh no, **this** is going to be a problem.",
        "exOkZh": "糟糕，這下麻煩了。",
        "exBadText": "(X) Oh no, **This** is going to be a problem.",
        "exBadNote": "錯誤：逗號不會開啟新句子，這裡和 Oh no 屬於同一句，this 前面不要大寫。"
      },
      {
        "title": "驚嘆號語氣誤用（位置與必要性）",
        "bad": "(X) **Oh no!** This is not planned. ／ (X) Oh no, this is not planned**!**",
        "ok": "(O) Oh no, this is not planned.",
        "why": "驚嘆號用來表示**強烈的情緒**（驚訝、興奮、害怕）；本句的語氣是「陳述一件令人失望的事實」，屬於說明而不是大叫，用句號最自然。另外驚嘆號如果要加，必須加在**整句的最後**，不能只加在感嘆語後面，否則句子會在那裡硬生生斷開、後面接不上。判斷法：寫完唸一次，如果語氣是「告知」就用句號，是「大叫」才用驚嘆號。",
        "exOkText": "(O) Oh no, we took the wrong bus!",
        "exOkZh": "糟糕，我們坐錯公車了！",
        "exBadText": "(X) **Oh no! This** is not planned.",
        "exBadNote": "錯誤：驚嘆號加在 Oh no 後面，句子會在那裡硬生生斷開；這裡只是陳述一件令人失望的事實，整句用句號即可。"
      },
      {
        "title": "no 與 not 混淆（感嘆語中的 no 不是否定詞）",
        "bad": "(X) **Oh not,** this is not planned. ／ (X) This is **no** planned.",
        "ok": "(O) **Oh no,** this is not planned.",
        "why": "感嘆語 **Oh no** 裡的 no 是單獨的**感嘆詞**，後面不能再接動詞；not 是用來否定**動詞或 be 動詞**的。兩個字用法完全不同，學生常因為只學過 not 就把 Oh no 寫成 Oh not。判斷法：想表達「噢不」這種情緒就寫 no，而且它前面是感嘆詞；要否定一個動詞（is not planned、do not go）才寫 not，前面一定有 be 動詞或 don't。",
        "exOkText": "(O) **Oh no,** I am not ready for the test.",
        "exOkZh": "糟糕，我還沒準備好考試。",
        "exBadText": "(X) **Oh not,** I am not ready for the test.",
        "exBadNote": "錯誤：感嘆語固定寫成 Oh no，not 是用來否定 be 動詞的，不能代替感嘆語裡的 no。"
      }
    ],
    "traps": [
      "**感嘆語固定寫法的陷阱**：Oh no 是一個整體，中間沒有逗號；寫成 Oh, no, 會被視為標點錯誤。",
      "**大寫規則的陷阱**：只有句子的第一個字母要大寫。Oh no 後面的 this 是同一個句子的後半段，絕對不能寫成 , This is。",
      "**no / not 的陷阱**：會考在對話中用 Oh no 開頭表示挫折，學生若寫成 Oh not 就算錯；判斷原則是「情緒用 no，否定用 not」。",
      "**標點與語氣的陷阱**：本句是陳述語氣，結尾用句號；只有語氣是驚呼時才用驚嘆號，而且驚嘆號必須加在整句的最後。"
    ],
    "strategy": [
      "把 Oh no 當成一個單字背：寫的時候一次寫完，不要在 Oh 和 no 之間停頓，自然就不會多加逗號。",
      "寫完含逗號的句子先數句號：整句只有一個句號，就表示只有一個句子，中間的 this、that 保持小寫。",
      "標點三步驟：先定語氣（陳述／疑問／驚呼）→ 再選句號、問號或驚嘆號 → 最後檢查逗號後面有沒有冒險大寫。",
      "情緒詞與功能詞分開記：no（感嘆）、not（否定）、fine（形容詞）分三欄整理，避免在對話題中互相替代。",
      "多練習這類感嘆式短句（Oh no, + 完整句子），口頭唸出語氣，寫作時自然就會帶對標點。",
      "交卷前用檢查清單掃一遍：① Oh no 中間沒逗號 ② 逗號後小寫 ③ is 後面有 not ④ planned 保留 -ed ⑤ 句尾用句號。"
    ]
  },
  "Mr. President": {
    "zh": "總統先生",
    "ipa": "/ˈmɪstər ˈprezɪdənt/",
    "intro": "針對您提供的英文片語 **Mr. President**，這是一個**不能單獨成句的稱呼語**，它沒有自己的主詞和動詞，只是用來直接對某個人說話，必須放在前後有完整主詞與動詞的句子前後，或放在問候語裡，語意才完整。最該注意的方向是：稱呼語前面不要加冠詞、專有頭銜的大小寫，以及縮寫的寫法。",
    "headline": "稱呼語不能單獨成句；President 要大寫",
    "structure": [
      {
        "role": "稱謂縮寫",
        "token": "Mr.",
        "pos": "名詞 (Noun) — Mister 的縮寫形式",
        "func": "表示對方的稱謂（先生），後面一定要加句點。單獨的 Mr. 只表示「先生」，後面還要有名字或頭銜才完整",
        "mark": "O"
      },
      {
        "role": "職稱",
        "token": "President",
        "pos": "專有名詞 (Proper Noun) — 總統的職稱",
        "func": "直接稱呼對方時，總統這個職稱的首字母必須大寫；它前面不加 the，因為這裡是在稱呼對方而不是描述對方",
        "mark": "O"
      },
      {
        "role": "稱呼語",
        "token": "Mr. President",
        "pos": "名詞片語 (Noun Phrase) — 稱呼語 (Vocative)",
        "func": "整個片語是「稱呼語」，只能放在句首或句末當插入語，兩邊用逗號隔開；它自己不能當主詞，也不能單獨成一句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "稱呼語前誤加定冠詞 the",
        "bad": "(X) **The** Mr. President, could you help me?",
        "ok": "(O) **Mr. President**, could you help me?",
        "why": "Mr. President 是**直接對對方說話**的稱呼語，前面不加 the；只有在一般敘述、像提到「這位總統」而不是在對總統說話時，才會用 the president 這類說法。學生常因中文「總統先生」聽起來是完整的名詞片語，就直覺地補上冠詞。判斷法：看前後有沒有逗號把它隔開——有逗號就是稱呼語，不加 the。",
        "exOkText": "(O) **Mr. President**, thank you for your time today.",
        "exOkZh": "總統先生，感謝您今天撥冗。",
        "exBadText": "(X) **The** Mr. President, thank you for your time today.",
        "exBadNote": "錯誤：直接稱呼對方時是稱呼語，前面不能加 the；只有在敘述中提到他本人時才用 the president。"
      },
      {
        "title": "專有頭銜大小寫錯誤（president 誤用小寫）",
        "bad": "(X) Mr. **president**",
        "ok": "(O) **Mr. President**",
        "why": "在被直接稱呼的時候，President 是**專有頭銜**，首字母必須大寫；小寫的 president 只是「總統這個職位」的普通名詞。學生常以為英文只在句首才需要大寫，忘了專有名詞不論出現在哪裡都要大寫。判斷法：凡是 Mr. / Mrs. / Ms. 後面接的職稱（President、Governor、Doctor、Coach），一律大寫第一個字母。",
        "exOkText": "(O) Good evening, **Mr. President**.",
        "exOkZh": "總統先生，晚上好。",
        "exBadText": "(X) Good evening, Mr. **president**.",
        "exBadNote": "錯誤：直接稱呼時 President 是專有頭銜，首字母必須大寫，寫成小寫的 president 會被視為一般職稱。"
      },
      {
        "title": "專有稱謂誤加複數 -s",
        "bad": "(X) Good evening, **Mr. Presidents**.",
        "ok": "(O) Good evening, **Mr. President**.",
        "why": "Mr. President 是在對**特定的一位**對象說話，屬於單數，永遠不會變成 Mr. Presidents。學生常看到 President 是可數名詞就下意識加 -s。判斷法：凡是帶有 Mr. / Ms. / Dr. 的稱謂，前面已經指定了唯一的人，後面絕對不加 s；只有在 Mr. and Mrs. 這種並列的複數情況才會看到兩個稱謂。",
        "exOkText": "(O) Welcome, **Mr. President**.",
        "exOkZh": "歡迎您，總統先生。",
        "exBadText": "(X) Welcome, **Mr. Presidents**.",
        "exBadNote": "錯誤：Mr. President 是在對特定的一位對象說話，不能加複數 -s，加了變成在同時問候多位總統。"
      },
      {
        "title": "稱謂縮寫形式錯誤（誤用全寫 Mister）",
        "bad": "(X) **Mister** President, welcome.",
        "ok": "(O) **Mr.** President, welcome.",
        "why": "正式稱謂的標準縮寫是「Mr. 加句點」，全寫 Mister 只出現在極少見的正式書面場合，日常口語與國中會考一律用 Mr.。學生因為中文「先生」沒有縮寫的概念，看到 M 開頭就直接把整個字寫出來。判斷法：稱謂縮寫一律帶句點（Mr.／Mrs.／Ms.），寫成 Mister 或漏掉句點都算錯。",
        "exOkText": "(O) **Mr.** President, it's an honor to meet you.",
        "exOkZh": "總統先生，能見到您非常榮幸。",
        "exBadText": "(X) **Mister** President, it's an honor to meet you.",
        "exBadNote": "錯誤：正式稱謂的標準縮寫是 Mr.（後面一定要有句點），不能寫成 Mister，否則格式與語氣都不合格。"
      }
    ],
    "traps": [
      "**稱呼語不是主詞的陷阱**：Mr. President 只是用來稱呼對方，本身不能當句子的主詞。前面若還有真正的主詞，才會出現 I want to thank Mr. President. 這種句子。",
      "**冠詞的陷阱**：直接稱呼（用逗號隔開的稱呼語）不加 the；一般敘述中提到「總統先生」時才會用 the president 這類說法。",
      "**大小寫的陷阱**：Mr. 後面接的專有頭銜（President、Governor、Doctor）首字母一律要大寫，寫成 Mr. president 會直接被判錯。",
      "**複數的陷阱**：Mr. President 指的是特定的一個人，永遠是單數，不會出現 Mr. Presidents。"
    ],
    "strategy": [
      "記住稱呼語的位置：Mr. President 只能放句首或句末當插入語，中間一定要用逗號隔開，後面接完整的句子。",
      "把「稱呼三件套」背成一個模組：稱謂縮寫（Mr.）＋ 大寫頭銜（President）＋ 逗號，三個部分一個都不能少。",
      "看到稱呼語先畫括號括起來：把 Mr. President 括住，剩下的部分才應該是完整句子；如果括完剩下空的，代表句子還缺主詞或動詞。",
      "換名詞練習同一個模組：Ms. Doctor、Mr. Coach、Mrs. Lee，模組會了，換誰都套得上去。"
    ]
  },
  "calling": {
    "zh": "來電",
    "ipa": "/ˈkɔːlɪŋ/",
    "intro": "針對您提供的英文單詞 **calling**，這是一個**不能單獨成句的片語**，更精確地說它是動名詞 calling，表達的是「打電話」這件事或「來電」這種現象。單獨出現時它只是在交代一個詞語的意思，必須接上 be 動詞（am calling）、介系詞（for calling）或當作主語（Calling you is…）才構成完整句子。最該注意的方向是：-ing 動名詞的詞形變化、單複數，以及它和動詞原形 call 的差別。",
    "headline": "動名詞不是動詞原形；介系詞後要接 -ing",
    "structure": [
      {
        "role": "動名詞",
        "token": "calling",
        "pos": "動名詞 (Gerund) — call 加 -ing 的名詞性用法",
        "func": "表示「打電話」這件事；單獨出現時具有名詞性質，必須放在 be 動詞後、介系詞後或當主語，不能自己當動詞用",
        "mark": "O"
      },
      {
        "role": "詞形變化",
        "token": "calling",
        "pos": "詞形變化 (Word Formation) — call + ing",
        "func": "call 結尾是子音 l，加 -ing 時要把最後一個子音重複一次，所以是 c-a-l-l-i-n-g；寫成 caling 或 callng 都不正確",
        "mark": "O"
      },
      {
        "role": "重音音節",
        "token": "calling",
        "pos": "發音 (Pronunciation) — 單音節詞＋弱讀 -ing",
        "func": "重音落在第一音節 -cal-，讀成 /ˈkɔː/；後面的 -ing 是弱讀音，讀 /ɪŋ/ 而不讀 /ɪŋɡ/，所以整詞是 /ˈkɔːlɪŋ/",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞後誤用動詞原形（忘記加 -ing）",
        "bad": "(X) Thank you **for call** me yesterday.",
        "ok": "(O) Thank you **for calling** me yesterday.",
        "why": "for 是介系詞，介系詞後面絕對不能接動詞原形，必須接**動名詞**（-ing 形式）或其他名詞。學生常受中文「謝謝你打電話給我」影響，直接寫成 for call。判斷法：看到 for、of、in、on、about、without 這些介系詞，後面若放的是動詞就立刻加 -ing；不確定就先寫下一個名詞（a call）檢查語意是否通順。",
        "exOkText": "(O) Thank you **for calling** me so early.",
        "exOkZh": "謝謝你這麼早就打電話給我。",
        "exBadText": "(X) Thank you **for call** me so early.",
        "exBadNote": "錯誤：介系詞 for 後面必須接動名詞 calling，不能用動詞原形 call，原形要放在主詞後面。"
      },
      {
        "title": "動名詞作主語時誤加複數 -s",
        "bad": "(X) **Making calls** **are** my part-time job.",
        "ok": "(O) **Making calls** **is** my part-time job.",
        "why": "動名詞 making calls 放在句首當主語時，整個片語被視為**一件事**，所以後面的 be 動詞要用單數 is。學生常因為片語中間的 call 是可數名詞，就下意識地配上 are。判斷法：句首是 V-ing 開頭的，整句就當成「一件事」，一律用 is／was，不要去數裡面的名詞。",
        "exOkText": "(O) **Calling** my friends **is** the best part of my day.",
        "exOkZh": "打電話給朋友是我一天中最棒的部分。",
        "exBadText": "(X) **Calling** my friends **are** the best part of my day.",
        "exBadNote": "錯誤：動名詞片語作主語時視為單一的一件事，be 動詞要用 is，不能因中間有 call 就用 are。"
      },
      {
        "title": "名詞 call 與動名詞 calling 混淆",
        "bad": "(X) I got a **calling** from Tom last night.",
        "ok": "(O) I got a **call** from Tom last night.",
        "why": "**call** 作名詞時指「一通電話／來電」，是可數名詞（a call、two calls）；**calling** 指「打電話」這件事或「來電」這種現象，通常不加冠詞、也不加 -s。學生常把兩個詞混用，寫出 a calling 或 the calling。判斷法：前面有 a／the 這類冠詞時，幾乎都要用 call。",
        "exOkText": "(O) I got a **call** from Tom last night.",
        "exOkZh": "昨晚我接到湯姆打來的電話。",
        "exBadText": "(X) I got a **calling** from Tom last night.",
        "exBadNote": "錯誤：可數的一通來電要用 a call；calling 是「打電話」這件事或現象，前面不能加冠詞 a。"
      },
      {
        "title": "拼字錯誤：call 加 -ing 要重複字母 l",
        "bad": "(X) I am **caling** you right now.",
        "ok": "(O) I am **calling** you right now.",
        "why": "call 的結尾是「子音 l」，依拼字規則，重讀音節以「短母音＋單一子音」結尾時，加 -ing 要把最後一個子音重複一次，所以是 c-a-l-l-i-n-g。學生常少寫一個 l，或忘記 l 直接加 ing。判斷法：拼 -ing 前先看原字的尾巴，尾巴是 -all、-et、-at、-ig 這類型態，就要把子音寫兩次。",
        "exOkText": "(O) I am **calling** you back in ten minutes.",
        "exOkZh": "我十分鐘後回電給你。",
        "exBadText": "(X) I am **caling** you back in ten minutes.",
        "exBadNote": "錯誤：拼 -ing 時要重複子音 l，call + ing = calling，少寫一個 l 就是拼字錯誤。"
      }
    ],
    "traps": [
      "**介系詞加 -ing 的陷阱**：for、of、about、without、instead of 後面一定是動名詞。會考最常見的選項就是 for call / for calling 這組，選錯直接扣分。",
      "**單複數的陷阱**：calls 是「一通通電話」（可數），calling 是「打電話這件事」（不加 s）。看到 I got a __ 要填 call，看到 Making __ is fun 也填 call。",
      "**call / calling / called / to call 的陷阱**：call 是動詞與名詞共用，called 是過去式或過去分詞，to call 是不定式，calling 是現在分詞與動名詞。決定用哪一個，要先看前面是 be 動詞、to 還是介系詞。",
      "**拼字的陷阱**：-ing 前面的 l、t、d 要重複（call → calling、sit → sitting、wait → waiting），這是會考選擇題常拿來設陷阱的地方。"
    ],
    "strategy": [
      "看到介系詞就畫星號：寫完 for、of、in、on 這類字之後，先不要急著填動詞，先決定要填名詞還是動名詞。",
      "用「造句三段式」練 calling：I'm calling（be 動詞 + -ing）、I called yesterday（過去式）、Thank you for calling（介系詞後），三種位置各寫一次就會記牢。",
      "唸出聲音再拼字：/ˈkɔːlɪŋ/ 的重音在 -cal-，聽到 l 就把兩個 l 寫出來，拼字自然就對了。",
      "分清楚「一通電話」和「打電話」：可數的一通通電話是 call，打電話這件事是 calling，需要時用 a call 或 the call 就對了。"
    ]
  },
  "If it wasn't because of you calling": {
    "zh": "如果不是因為您打電話來",
    "ipa": "/ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ/",
    "intro": "針對您提供的英文句子 **If it wasn't because of you calling**，這是一個**不能單獨成句的從屬子句**（副詞子句），開頭的 If 已經註明它必須接一個主句，單獨使用就會變成「片段句」。它的意思是「如果不是因為你打電話這件事」，用來說明後面主句成立的前提。最該注意的方向是：虛主語 it 不能漏、because 與 because of 的差別，以及 If 與 When 的區分。",
    "headline": "If 從句不能單獨成句；because 接片語要加 of",
    "structure": [
      {
        "role": "連接詞",
        "token": "If",
        "pos": "連接詞 (Conjunction) — 引導條件狀語從句",
        "func": "中文「如果」，用來引導一個條件狀語從句，說明後面主句成立的前提；它開頭的子句一定要接主句",
        "mark": "O"
      },
      {
        "role": "虛主語",
        "token": "it",
        "pos": "代詞 (Pronoun) — 虛主語 (Dummy subject)",
        "func": "這裡的 it 沒有「它」的意思，只是替 It was… 這個結構撐起主語的位置；真正說明原因是什麼的是後面的 because of 片語",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "wasn't",
        "pos": "be 動詞 (Linking Verb) — was not 的縮寫",
        "func": "表示「不是」；這裡談的是「假設沒有打電話」的情況，所以用 be 動詞的過去式否定",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "because of",
        "pos": "介系詞片語 (Preposition Phrase) — because + of",
        "func": "表示「原因」；because of 後面接名詞、代詞或動名詞，because 和 of 必須一起出現",
        "mark": "O"
      },
      {
        "role": "代詞 + 動名詞",
        "token": "you calling",
        "pos": "代詞 (Pronoun) + 動名詞 (Gerund)",
        "func": "整個片語是 because of 的受詞，表示「你打電話」這件事；calling 在這裡當名詞用，所以前面不加 be 動詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "because 後漏加介詞 of（because 與 because of 混用）",
        "bad": "(X) If it wasn't **because** you calling, I would still be at home.",
        "ok": "(O) If it wasn't **because of** you calling, I would still be at home.",
        "why": "**because** 後面要接**完整的句子**，**because of** 後面要接**名詞、代詞或動名詞**。這裡 you calling 是名詞片語不是句子，所以前面必須用 because of。學生常憑中文「因為」直接翻成 because。判斷法：看後面有沒有動詞，有就是句子用 because，沒有就用 because of。",
        "exOkText": "(O) If it wasn't **because of** your help, I would have failed.",
        "exOkZh": "「如果不是因為你的幫忙，我就會失敗了。」",
        "exBadText": "(X) If it wasn't **because** your help, I would have failed.",
        "exBadNote": "錯誤：後面接的是名詞片組 your help，必須用 because of；because 後面要接完整的句子才對。"
      },
      {
        "title": "虛主語 it 漏寫",
        "bad": "(X) If **wasn't** because of you calling, I would still be at home.",
        "ok": "(O) If **it** wasn't because of you calling, I would still be at home.",
        "why": "這裡的 **it** 沒有「它」的意思，是英文裡常見的「虛主語」，用來替 It was… 這種結構撐起主語的位置；真正說明原因是什麼的是後面的 because of you calling。學生常覺得「沒有它」怪怪的而把它刪掉。判斷法：看到 be 動詞前面沒有主詞，先補一個 it 試看看通不通；It is… that…、If it is… 都是同一個模組。",
        "exOkText": "(O) If **it** wasn't for your phone call, I would miss the train.",
        "exOkZh": "「如果不是因為你那通電話，我就會錯過火車了。」",
        "exBadText": "(X) If **wasn't** for your phone call, I would miss the train.",
        "exBadNote": "錯誤：wasn't 前面缺了虛主語 it，這裡的 it 雖不是「它」但不能省，否則從句沒有主詞。"
      },
      {
        "title": "片段句：if 從屬子句不能單獨成句",
        "bad": "(X) **If it wasn't because of you calling.**",
        "ok": "(O) **If it wasn't because of you calling, I would still be at home.**",
        "why": "由 If、Because、When 開頭的是**從屬子句**，本身只交代條件或原因，必須搭配一個有主詞和動詞的完整主句，意思才完整。學生在翻譯題或造句時，常把中文的「如果不是因為您打電話來…」單獨寫成一句，變成沒有主句的片段句。判斷法：寫完先找有沒有真正表示動作的動詞，這裡只有 was，只有 be 動詞就是缺主句。",
        "exOkText": "(O) **If it wasn't because of you calling**, I would be doing my homework now.",
        "exOkZh": "「如果不是因為您打電話來，我現在就會在做作業了。」",
        "exBadText": "(X) **If it wasn't because of you calling.**",
        "exBadNote": "錯誤：if 從屬子句後面缺少主句，整句只剩「如果……」的片段，句子不完整，不能單獨成句。"
      },
      {
        "title": "if 與 when 混淆（如果／當…的時候）",
        "bad": "(X) **When** it wasn't because of you calling, I would still be at home.",
        "ok": "(O) **If** it wasn't because of you calling, I would still be at home.",
        "why": "**if** 表示「如果」——假設一個不一定會發生的情況；**when** 表示「當…的時候」——一定會發生的時間點。中文「如果不是因為…」帶有假設語氣，必須翻成 if；學生常因為「…的時候」這個念頭而選 when。判斷法：看到「如果、假如」就選 if，看到「當…的時候、一…就…」才選 when，並用 if + would 這個固定配對回頭檢查。",
        "exOkText": "(O) **If** I weren't afraid of flying, I would travel more often.",
        "exOkZh": "「如果我不怕搭飛機，我就會更常去旅行。」",
        "exBadText": "(X) **When** I am afraid of flying, I would travel more often.",
        "exBadNote": "錯誤：中文的「如果」表示假設，必須翻成 if；when 只表示「當…的時候」，語意完全不同。"
      }
    ],
    "traps": [
      "**because 與 because of 的陷阱**：because 後接句子（Because you called, I was glad.），because of 後接名詞或動名詞（because of you calling、because of the rain）。會考常用 It was because ___ 這一句，of 的選擇就是考點。",
      "**虛主語的陷阱**：It is… that…、If it is…、It was not until… 裡的 it 都不是「它」，不能刪也不能換成 this / that。看到 was／is 前面空空的，先補一個 it。",
      "**片段句的陷阱**：會考翻譯或連接句子時，If／Because 開頭的半句一定要配上有動詞的主句；缺主句是整句錯，不是小瑕疵。",
      "**if 與 when 的陷阱**：if = 如果（假設），when = 當…的時候（一定發生）。另外 if 條件句常與 would 搭配，看到 would 就回頭檢查前面的連接詞是不是 if。"
    ],
    "strategy": [
      "先拆再組：看到這句先切成 If / it wasn't / because of / you calling 四塊，確認每一塊的詞性，再檢查有沒有主句。",
      "背一組 because 的對照句：Because you called me, I was happy.（接句子）與 It was because of you that I was happy.（接片語），兩句一起記就不容易混。",
      "寫作時自我檢查三件事：because of 後面有沒有動名詞？wasn't 前面有沒有 it？If 從句後面有沒有主句？",
      "遇到 if 題目先問自己「這是假設還是時間？」假設用 if，時間才用 when，一問就能分辨。"
    ]
  },
  "I am on stage": {
    "zh": "我正在舞台上",
    "ipa": "/aɪ æm ɑːn steɪdʒ/",
    "intro": "針對您提供的英文句子 **I am on stage**，這是一個**可以單獨成句的完整簡單句**，由「主詞 + be 動詞 + 狀態副詞片語」三部分組成，表示說話者此刻的位置與狀態。中文說「在舞台上」有兩種語意——站在舞台上，或正在舞台上演出；英文 on stage 指的是後者，也就是「正在台上演出」。最該注意的方向是：on stage 這個固定搭配前面不加 the，以及 be 動詞與主詞的配合。",
    "headline": "on stage 前面不加 the；be 動詞要配對",
    "structure": [
      {
        "role": "主詞",
        "token": "I",
        "pos": "代詞 (Pronoun) — 第一人稱單數",
        "func": "句子的主角，說話的人自己；後面的 be 動詞必須配合 I 使用 am",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "am",
        "pos": "be 動詞 (Linking Verb) — I 後面專用的 be 動詞",
        "func": "把主詞和後面的狀況連起來，表示此刻的狀態或所在；它和主詞 I 是固定配對，不能改用 is 或 are",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "on",
        "pos": "介系詞 (Preposition) — 表示「在…之上」",
        "func": "和後面的 stage 搭配成 on stage，表示「在舞台這個表面上」；不能用 in 或 at 取代",
        "mark": "O"
      },
      {
        "role": "狀態副詞片語",
        "token": "on stage",
        "pos": "副詞片語 (Adverbial Phrase) — 介系詞 on + 名詞",
        "func": "放在 be 動詞後說明「在哪裡、什麼狀態」；on stage 是固定搭配，前面不加 the，語意是「在舞台上演出中」",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "介系詞選用錯誤（in stage / at stage 誤用）",
        "bad": "(X) I am **in stage** right now.",
        "ok": "(O) I am **on stage** right now.",
        "why": "stage 是「舞台」這個平面，要表示「在舞台上」要用介系詞 **on**（在某個表面上）。學生常受中文「在舞台（裡）」影響而選 in，或選 at。判斷法：先看名詞是哪一類——平面、桌子、舞台用 on；空間裡面用 in；某一點旁邊用 at。記成口訣：在…上面 on，在…裡面 in。",
        "exOkText": "(O) The singer is **on stage** right now.",
        "exOkZh": "那位歌手此刻正在台上演出。",
        "exBadText": "(X) The singer is **in stage** right now.",
        "exBadNote": "錯誤：舞台是一個平面，要表示「在舞台上」必須用介系詞 on，不能用 in（在…裡面）或 at（在…點）。"
      },
      {
        "title": "on stage 前誤加定冠詞 the",
        "bad": "(X) I am **on the stage** right now.",
        "ok": "(O) I am **on stage** right now.",
        "why": "**on stage** 是一個固定的說法，表示「在舞台上演出中」，前面**不加 the**。只有在特指「舞台上的某一個位置或某個物體」時才會出現 on the stage。學生常受中文「在舞台**上**」的「上」字影響，以為英文也一定要有冠詞。判斷法：把 on stage 當成不可拆的一個單位，看到介系詞 on 就直接接 stage，中間不夾 the。",
        "exOkText": "(O) She is **on stage** every Friday night.",
        "exOkZh": "她每週五晚上都在台上演出。",
        "exBadText": "(X) She is **on the stage** every Friday night.",
        "exBadNote": "錯誤：on stage 是固定搭配，前面不加 the；只有特指舞台上的某個位置時才會出現 the。"
      },
      {
        "title": "be 動詞後誤用動詞原形（應改成 -ing）",
        "bad": "(X) I am **stand on stage** now.",
        "ok": "(O) I am **standing on stage** now.",
        "why": "英文裡 be 動詞（am / is / are）後面如果還要接一個**動作動詞**，那個動詞一定要變成現在分詞（-ing 形式），這就是進行式。學生常把中文的「我正在站」直譯成 am stand。判斷法：看到 be 動詞就往後看還有沒有動詞；有動詞就檢查它有沒有加 -ing，沒加就是錯的。",
        "exOkText": "(O) She is **standing on stage** and waving to us.",
        "exOkZh": "她正站在台上向我們揮手。",
        "exBadText": "(X) She is **stand on stage** and waving to us.",
        "exBadNote": "錯誤：be 動詞後的動作動詞要變成現在分詞，stand 要改成 standing，不能直接用原形 stand。"
      },
      {
        "title": "狀態副詞片語前缺 be 動詞（主謂不完整）",
        "bad": "(X) **I on stage** now.",
        "ok": "(O) **I am on stage** now.",
        "why": "**on stage** 只是一個副詞片語，本身沒有動作意義，不能當動詞用；前面一定要有 be 動詞（am / is / are）把它和主詞 I 連起來，句子才有主詞和動詞。學生常因中文省略「在」就以為英文也能省掉。判斷法：寫完先找主詞和動詞，on stage 這種片語不算動詞，整句找不到動詞就是少了 be。",
        "exOkText": "(O) My friends are **on stage** now.",
        "exOkZh": "我的朋友們現在正在台上。",
        "exBadText": "(X) My friends **on stage** now.",
        "exBadNote": "錯誤：整句只有主詞和副詞片語 on stage，缺 be 動詞，主謂結構不完整，句子不成立。"
      }
    ],
    "traps": [
      "**固定搭配的陷阱**：on stage、on air、on duty 這類片語前面都不加 the；考「選出正確的片語」時，the on stage 一定是錯選項。",
      "**be 動詞與進行式的陷阱**：be 動詞後面再接動詞，動詞一定要變成 -ing（am standing、is running、are playing），只寫 be + 原形一律算錯。",
      "**主詞與 be 動詞搭配的陷阱**：I 後面只能用 am，he / she / it 後面用 is，you / we / they 後面用 are。寫完 be 動詞要回頭檢查主詞是誰。",
      "**語意陷阱**：on stage 是「在台上演出中」，on the stage 是「在舞台這個位置上」；問「他正在做什麼」用前者，問東西「放在哪」才可能用後者。"
    ],
    "strategy": [
      "把 on stage 當成一個單字記：不要拆成 on + the + stage，看到介系詞 on 就直接接 stage。",
      "寫 be 動詞句用兩步驟：先寫「主詞 + am / is / are」，再決定後面接狀態副詞（on stage）還是接 -ing 動詞（standing）。",
      "唸出 /ɑːn steɪdʒ/ 練重音：介系詞 on 輕讀，stage 重讀，聽起來才像「在舞台上」。",
      "複習三個舞台相關片語：get on stage（上台）、be on stage（在台上演出）、go off stage（下台），一次記住就不會混。"
    ]
  },
  "If it wasn't because of you calling, I am on stage with the besties.": {
    "zh": "如果不是因為您打電話來，我現在正跟好朋友在台上呢。",
    "ipa": "/ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ, aɪ æm ɑːn steɪdʒ wɪð ðə ˈbestiːz/",
    "intro": "針對您提供的英文句子 **If it wasn't because of you calling, I am on stage with the besties.**，這是一個**可以單獨成句的完整複合句**：前半段 If it wasn't because of you calling 是條件狀語從句，後半段 I am on stage with the besties 是主句，兩者之間用逗號隔開。整句語氣輕鬆，帶有「要不是您來電，我現在還在台上跟好友一起呢」的玩笑感。最該注意的方向是：從屬子句與主句之間的逗號、because of 的片語結構，以及正式寫作時的用詞。",
    "headline": "If 從句後要加逗號；口語字要換正式寫法",
    "structure": [
      {
        "role": "連接詞",
        "token": "If",
        "pos": "連接詞 (Conjunction) — 引導條件狀語從句",
        "func": "中文「如果」，用來引導從屬子句，說明後面主句成立的前提；從句結束後要用逗號再接主句",
        "mark": "O"
      },
      {
        "role": "虛主語",
        "token": "it",
        "pos": "代詞 (Pronoun) — 虛主語 (Dummy subject)",
        "func": "這裡的 it 沒有「它」的意思，只是替 It wasn't… 撐起主語的位置；真正的原因是後面的 because of you calling",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "wasn't",
        "pos": "be 動詞 (Linking Verb) — was not 的縮寫",
        "func": "表示「不是」；這裡假設「沒有打電話」的情況，所以用過去式的否定",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "because of",
        "pos": "介系詞片語 (Preposition Phrase) — because + of",
        "func": "表示「原因」；because of 後面接名詞、代詞或動名詞，這裡接的是 you calling 這個名詞片語",
        "mark": "O"
      },
      {
        "role": "代詞 + 動名詞",
        "token": "you calling",
        "pos": "代詞 (Pronoun) + 動名詞 (Gerund)",
        "func": "because of 的受詞，表示「您打電話」這件事；這是整個從句用 because of 而不是 because 的原因",
        "mark": "O"
      },
      {
        "role": "標點",
        "token": ",",
        "pos": "標點 (Punctuation) — 逗號",
        "func": "把 If 引導的從屬子句和後面的主句隔開，讓讀者一眼看出主句從 I 開始；漏了逗號在改錯題中會直接算錯",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "I",
        "pos": "代詞 (Pronoun) — 第一人稱單數",
        "func": "真正的主句主詞；前面 it 只是虛主語，兩者不要混淆，後面的 be 動詞要跟著 I 走",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "am",
        "pos": "be 動詞 (Linking Verb) — I 後面專用的 be 動詞",
        "func": "搭配主詞 I，表示此刻的狀態；不能寫成 are，也不能沿用從句裡的 was",
        "mark": "O"
      },
      {
        "role": "狀態副詞片語",
        "token": "on stage",
        "pos": "副詞片語 (Adverbial Phrase) — 介系詞 on + 名詞",
        "func": "說明「在哪裡、什麼狀態」；on stage 是固定搭配，前面不加 the，語意是「在台上演出中」",
        "mark": "O"
      },
      {
        "role": "介系詞片語",
        "token": "with the besties",
        "pos": "介系詞 (Preposition) + 定冠詞 (Article) + 名詞 (Noun) 複數",
        "func": "說明「跟誰一起」；with 後面接特定的一群熟人，所以用 the best friends，正式寫作不用口語字 besties",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "if 從屬子句後漏加逗號",
        "bad": "(X) If it wasn't because of you calling **I am on stage** with my best friends.",
        "ok": "(O) If it wasn't because of you calling**,** I am on stage with my best friends.",
        "why": "當句子前面有一段**從屬子句**（If / Because / When 開頭）時，從屬子句和主句之間要用**逗號**隔開，讓讀者知道哪裡結束、哪裡開始。學生常因中文標點習慣而忘記加。判斷法：寫完 If 開頭的半句，先問自己「主句從哪個字開始？」然後在那個字前面補上逗號，全句結構就清楚了。",
        "exOkText": "(O) If it wasn't for you**,** I would be sleeping now.",
        "exOkZh": "「如果不是因為你，我現在就正在睡覺了。」",
        "exBadText": "(X) If it wasn't for you I would be sleeping now.",
        "exBadNote": "錯誤：if 引導的從屬子句與主句之間要加逗號，漏掉逗號會讓從句和主句黏在一起、界線不清。"
      },
      {
        "title": "口語字 besties 誤用於正式書寫",
        "bad": "(X) I am on stage with my **besties**.",
        "ok": "(O) I am on stage with my **best friends**.",
        "why": "**besties** 是好朋友之間的**口語／網路用語**，語氣很輕鬆，寫在正式文章、會考作答或英文書信中會被判為不正式。標準表達是 **best friends**（最好的朋友）。學生常因為口語或影片中聽到 besties 就直接寫出來。判斷法：凡是會出現在作業、考卷、書信裡的句子，一律用正式寫法；看到口語字先在旁邊畫圈提醒自己換掉。",
        "exOkText": "(O) I am on stage with my **best friends** right now.",
        "exOkZh": "我此刻正跟最好的朋友們在台上。",
        "exBadText": "(X) I am on stage with my **besties** right now.",
        "exBadNote": "錯誤：besties 是好朋友之間的口語用字，會考作答與正式文章要改用 best friends。"
      },
      {
        "title": "「不是因為」誤寫成 If it is not（否定與時態）",
        "bad": "(X) **If it is not** because of you calling, I am on stage with my best friends.",
        "ok": "(O) **If it wasn't** because of you calling, I am on stage with my best friends.",
        "why": "中文「如果不是因為您打電話來」是在假設一個**沒有發生**的情況，英文要用 be 動詞的**過去式否定** wasn't（was not）來表示；is not 是「現在不是」。學生常把「不是」直接翻成 is not，忘記前面還有「如果」在做假設。判斷法：看到中文「如果 + 不是」，先寫下 If it wasn't 這個模組，它在會考中出現的頻率非常高。",
        "exOkText": "(O) **If it wasn't** for the rain, we would still be walking.",
        "exOkZh": "「如果不是因為下雨，我們就還在散步。」",
        "exBadText": "(X) **If it is not** for the rain, we would still be walking.",
        "exBadNote": "錯誤：「如果 + 不是」表示假設，要用過去式否定 wasn't，不能用現在式否定 is not。"
      },
      {
        "title": "be 動詞與主詞不一致（I 後面不能用 are）",
        "bad": "(X) If it wasn't because of you calling, **I are** on stage with my best friends.",
        "ok": "(O) If it wasn't because of you calling, **I am** on stage with my best friends.",
        "why": "be 動詞要配合主詞：I 後面只能搭配 **am**，are 是搭配 you / we / they 的。學生常因為前面出現過 If it was 而誤以為整句都用同一個 be 動詞。判斷法：寫完 be 動詞立刻回頭看它前面最近的主詞是誰——這裡主句的主詞是 I（不是前面從句的 it），所以用 am；從句的 it 配 was，兩邊各配各的。",
        "exOkText": "(O) If it wasn't for you, **I am** still standing here.",
        "exOkZh": "「要不是因為你，我現在還站在這裡。」",
        "exBadText": "(X) If it wasn't for you, **I are** still standing here.",
        "exBadNote": "錯誤：主句的主詞是 I，be 動詞只能搭配 am；are 是給 you / we / they 這類主詞用的。"
      }
    ],
    "traps": [
      "**逗號的陷阱**：If / Because / When 開頭的從屬子句後面一定要加逗號再接主句，漏了逗號在會考的改錯題中會直接算錯。",
      "**兩個主語的陷阱**：這句有兩個「主語位置」——從句的 it（虛主語）和主句的 I（真主詞）。it 不指任何東西，be 動詞要跟著 I 走，用 am。",
      "**because of 的陷阱**：because of 後面是 you calling（動名詞），不能寫成 because you calling，也不能在 you 後面加 be 動詞變成 because of you are calling。",
      "**口語與正式寫法的陷阱**：besties、guys、cool 這類口語字，在會考作答與正式文章中要換成 best friends、friends、nice。"
    ],
    "strategy": [
      "複合句寫完做「逗號體檢」：確認 If 從屬子句和主句之間有一個逗號、全句大小寫正確、句末有句點，三項都過才算完成。",
      "把這句拆成兩塊分開背：前半塊 If it wasn't because of you calling（原因從句）、後半塊 I am on stage with my best friends（主句），分開練熟再合起來。",
      "建一份口語字小清單：看到 besties、guys、stuff 就先停頓一秒，問自己「這是作業嗎？」是就立刻換成正式說法。",
      "be 動詞寫完立刻檢查主詞：這句主句主詞是 I 所以用 am，從句主詞是 it 所以用 was，兩邊分清楚就不會互相干擾。"
    ]
  },
  "kinds of animals": {
    "zh": "各種動物",
    "ipa": "/ˈkaɪndz əv ˈænɪ.məlz/",
    "intro": "針對您提供的英文片語 **kinds of animals**，這是一個**名詞片語**，不是完整的句子，**不能單獨成句**——它只有名詞，沒有動詞，必須放進某個句型裡（例如加上 There are…，或當作 like、see、have 的受詞）才有意義。整個片語的重點在兩處：**of** 這個介系詞不能隨意更換，以及 kinds、animals 兩個可數名詞都必須用複數。學會這個片語之後，第 2 句的 There be 句與第 3 句的 How many 問句就會非常好理解。",
    "headline": "片語無動詞不能單獨成句；kinds 與 animals 都要複數",
    "structure": [
      {
        "role": "中心名詞",
        "token": "kinds",
        "pos": "名詞 (Noun) — kind 的複數形",
        "func": "片語的核心，表示「種類、類別」。因為 of 後面接的是 animals（複數），前面的 kinds 也要用複數，語意是「多種」",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "連接 kinds 與 animals，表示「……的」，是 kinds of… 固定搭配的一部分，不能隨意改成 for 或 with",
        "mark": "O"
      },
      {
        "role": "受修飾的名詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數形",
        "func": "of 所指向的對象，表示「動物」。在 kinds of 之後要用 animals 這個複數形",
        "mark": "O"
      },
      {
        "role": "整體片語",
        "token": "kinds of animals",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "三個詞合起來構成一個完整的名詞片語，可以當主詞、受詞或介詞的受詞。單獨使用時缺少動詞，所以不能自成一句",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "名詞片語不能單獨成句（整句漏掉動詞）",
        "bad": "(X) **Kinds of animals** very interesting. ／ (X) **Kinds of animals** in the zoo.",
        "ok": "(O) **kinds of animals** (這個片語必須放進句子裡，例如 **There are many kinds of animals**.)",
        "why": "kinds of animals 只有名詞，沒有動詞，所以它只能算一個名詞片語，不能自己成為一個句子。學生看到中文「各種動物」就直接照翻，再加上「很有趣」就直接寫出沒有動詞的句子。判斷法：把寫好的英文唸一遍，如果找不到「誰做了什麼」或「什麼是什麼」，就代表漏了 be 動詞或一般動詞，必須補上或改寫成完整句子。",
        "exOkText": "(O) There are **many kinds of animals** in the zoo.",
        "exOkZh": "動物園裡有許多種動物。",
        "exBadText": "(X) **Kinds of animals** very interesting.",
        "exBadNote": "錯誤：整句只有名詞片語，漏掉 be 動詞 are，不能成句"
      },
      {
        "title": "可數名詞複數漏 -s（kind → kinds）",
        "bad": "(X) **kind** of animals. ／ (X) **kinds** of **animal**.",
        "ok": "(O) **kinds** of **animals**.",
        "why": "kind 是可數名詞，單數是「一種」，複數 kinds 才表示「多種」。本片語的意思是「各種動物」，強調種類很多，所以 kind 必須變成複數 kinds；同理 kinds of 後面的 animal 也要變複數 animals。學生常受中文「各種」的影響，以為 kind 本身就含有「各種」的意思。口訣：「kinds of 後面是複數，前面 kind 也要複數。」",
        "exOkText": "(O) This book is about **kinds of animals**.",
        "exOkZh": "這本書是在介紹各種動物。",
        "exBadText": "(X) This book is about **kinds of animal**.",
        "exBadNote": "錯誤：kinds of 後面要用可數複數 animals，不能用單數 animal"
      },
      {
        "title": "介系詞 of 誤用（of 被換成 for / with）",
        "bad": "(X) **kinds for** animals. ／ (X) **kinds with** animals.",
        "ok": "(O) **kinds of** animals.",
        "why": "of 在這裡表示所屬或範圍，kinds of animals 就是「動物的各種」。for 表示目的或對象，with 表示伴隨或擁有，都接不上這個意思。學生常受中文「各種動物」中「各種」的連帶語感影響，或把 of 和 for 弄混。口訣：「kind(s) of + 名詞」是一個固定的三明治，裡面的 of 不能替換。",
        "exOkText": "(O) This book is about **kinds of animals**.",
        "exOkZh": "這本書是在介紹各種動物。",
        "exBadText": "(X) This book is about **kinds for animals**.",
        "exBadNote": "錯誤：kinds of 是固定搭配，介系詞只能用 of，不能改成 for"
      },
      {
        "title": "所有格 's 與複數 -s 混淆（kind's ≠ kinds）",
        "bad": "(X) **kind's** of animals. ／ (X) **animal's** kinds.",
        "ok": "(O) **kinds** of **animals**.",
        "why": "英文名詞的兩種 s 用法完全不同：複數用 -s（kind → kinds），所有格用 's 表示「屬於某人的」（the kind's name）。學生常看到中文「動物的各種」就把兩個 s 混在一起，寫成 kind's of animals。口訣：「表示『東西的』用 's，表示『數目的』用 -s。」",
        "exOkText": "(O) This zoo has **kinds of animals**.",
        "exOkZh": "這個動物園有各種動物。",
        "exBadText": "(X) This zoo has **kind's of animals**.",
        "exBadNote": "錯誤：'s 是所有格（屬於某種動物的），複數只要 -s，應為 kinds of animals"
      }
    ],
    "traps": [
      "**片語不等於句子**：kinds of animals 沒有動詞，在題目中若單獨成行出現，一定要立刻警覺——它必然是被放進某個句型裡的。",
      "**of 後面必須用複數**：kinds of animals 不能寫成 kinds of animal，這是會考最常見的單複數出題點。",
      "**of 不能替換**：kinds of 是固定三明治，選項若出現 kinds for、kinds with，都可以放心刪掉。",
      "**中文「各種」是複數概念**：中文用「各種」就涵蓋多種，英文必須真的寫出複數 kinds，只寫 kind 語意就變了。"
    ],
    "strategy": [
      "先問「這是片語還是句子」：沒有動詞就是片語，練習時務必把它接上 be 動詞，或放在 like、see、have 等動詞後面。",
      "把 kinds of animals 當成一個整塊來背：不要逐字拆開亂改，記成一個名詞片語單位最不容易出錯。",
      "複數 -s 與所有格 's 分開背：books（很多本書）vs. the book's cover（那本書的封面），兩種用法整理成一組對照。",
      "看到 of 就檢查後面：of 後面接的是單數或不可數名詞，這正是判斷複數有沒有加對的線索。",
      "每學一個片語就自己擴寫成一個完整句子（例如 There are many kinds of animals.），比只背片語有用得多。"
    ]
  },
  "There are many kinds of animals in the zoo.": {
    "zh": "動物園裡有許多種動物。",
    "ipa": "/ðeər ɑː ˈmeni ˈkaɪndz əv ˈænɪ.məlz ɪn ðə zuː/",
    "intro": "針對您提供的英文句子 **There are many kinds of animals in the zoo.**，這是一個文法完全正確的存在句（There be 句型），用來表示「某處有某物」。本句有兩個重點：一是 be 動詞的單複數要跟後面的真正主語（many kinds of animals，複數）一致，所以用 are 而不是 is；二是 many 後面一定要接可數複數名詞。句尾 in the zoo 是地點修飾語，告訴我們這些動物在哪裡。",
    "headline": "There be 的 be 跟後面主語一致；many 後接可數複數",
    "structure": [
      {
        "role": "引導詞",
        "token": "There",
        "pos": "虛擬詞 (Existential There) — 沒有「那裡」的意思",
        "func": "表示「有」的存在句開頭，本身不負責單複數，單複數完全由後面的 be 動詞決定",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "are",
        "pos": "動詞 (Verb) — be 的複數形",
        "func": "與後方真正主語 many kinds of animals 的複數一致，所以用 are 而不是 is",
        "mark": "O"
      },
      {
        "role": "數量形容詞",
        "token": "many",
        "pos": "限定詞／數量詞 (Determiner)",
        "func": "修飾後面的複數名詞，表示「許多」；many 之後只能接可數名詞的複數形",
        "mark": "O"
      },
      {
        "role": "真正主語（名詞片語）",
        "token": "kinds of animals",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "There are 後面真正「存在」的東西。kinds 與 animals 都是複數，是判斷 be 動詞用 are 的依據",
        "mark": "O"
      },
      {
        "role": "地點介系詞片語",
        "token": "in the zoo",
        "pos": "介系詞片語 (Prepositional Phrase)",
        "func": "放在句尾修飾整句，回答「在哪裡」。in 後接地點名詞，並用定冠詞 the 指特定的那座動物園",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "There be 的單複數一致（用 is 代替 are）",
        "bad": "(X) There **is** many kinds of animals in the zoo.",
        "ok": "(O) There **are** many kinds of animals in the zoo.",
        "why": "There be 句型裡 be 動詞的單複數不看 There，而要看 be 後面「真正主語」的數。本句真正主語是 kinds of animals，kinds 與 animals 都是複數，所以 be 動詞必須用 are。學生常因為中文「有許多」聽起來沒有複數感，或只會背 There is…，就直接套上 is。口訣：「There be 看後面的名詞，單數 is、複數 are。」",
        "exOkText": "(O) There **are** many **kinds** of animals in the zoo.",
        "exOkZh": "動物園裡有許多種動物。",
        "exBadText": "(X) There **is** many **kinds** of animals in the zoo.",
        "exBadNote": "錯誤：真正主語 kinds of animals 是複數，be 動詞要用 are"
      },
      {
        "title": "many 後必須接可數複數名詞",
        "bad": "(X) There are many **kind** of animals in the zoo. ／ (X) There are many **kinds** of **animal** in the zoo.",
        "ok": "(O) There are many **kinds** of **animals** in the zoo.",
        "why": "many 是「許多」的意思，只能修飾可數名詞的複數形。很多學生以為 animals 已經表示「動物」就不必加 s，但英文可數名詞只要能一個一個數，就一定要用複數。判斷法：看到 many、a lot of、few、several，立刻檢查後面的名詞有沒有 -s，沒有就直接改。",
        "exOkText": "(O) There are many **kinds of animals** in the forest.",
        "exOkZh": "森林裡有許多種動物。",
        "exBadText": "(X) There are many **kinds of animal** in the forest.",
        "exBadNote": "錯誤：many 後面要用可數複數 animals，不能用單數 animal"
      },
      {
        "title": "地點介系詞 in 與 on 的選擇",
        "bad": "(X) There are many kinds of animals **on** the zoo. ／ (X) There are many kinds of animals **on** the zoo wall.",
        "ok": "(O) There are many kinds of animals **in** the zoo.",
        "why": "in 表示「在……裡面」，用於有空間範圍的地方；on 表示「在……表面上」，用於平面的接觸。動物是生活在動物園的範圍之內，所以要用 in the zoo；如果說的是貼在牆上的圖片，那才用 on。學生常受中文「在」字的影響一律用 on。口訣：「在裡面 in，在上面 on，在某點 at。」",
        "exOkText": "(O) There are many **kinds of animals** **in the zoo**.",
        "exOkZh": "動物園裡有許多種動物。",
        "exBadText": "(X) There are many kinds of animals **on the zoo**.",
        "exBadNote": "錯誤：動物在動物園「裡面」要用 in the zoo，on 是用在表面或接觸的地方"
      },
      {
        "title": "存在句誤用 It is（不能用 It is 表示「某處有某物」）",
        "bad": "(X) **It is** many kinds of animals in the zoo.",
        "ok": "(O) **There are** many kinds of animals in the zoo.",
        "why": "英文要表示「某處有某物」，一定要用 There is / There are；It is 後面接的是「真正的新資訊」，例如天氣、時間、距離（It is cold today.）。學生受中文「這裡有……」的直譯影響，或看到中文的「有」就直接套 it，導致整句語意不成立。口訣：「某處有東西用 There be；它就是／天氣時間才用 It be。」",
        "exOkText": "(O) **There are** many **kinds of animals** in the zoo.",
        "exOkZh": "動物園裡有許多種動物。",
        "exBadText": "(X) **It is** many **kinds of animals** in the zoo.",
        "exBadNote": "錯誤：It is 後面要接真正的新資訊，不能用來表示「某處有某物」，要改成 There are"
      }
    ],
    "traps": [
      "**There be 看後不看前**：判斷 is / are 時千萬不要看 There（它沒有單複數），一定要看 be 後面的名詞。",
      "**many + 複數**：會考常在 many 後面的名詞單複數出題，看到 many、many a 就先檢查名詞有沒有 -s。",
      "**存在句不能省 be**：不能寫成 There many kinds of animals in the zoo.，be 動詞一定要出現。",
      "**地點介系詞**：in the zoo（裡面）、at the zoo（在 zoo 這個地點）、on the farm（在農場上），位置不同用字也不同。"
    ],
    "strategy": [
      "寫完 There be 句立刻回頭檢查 be 後面的名詞：單數改 is、複數改 are，養成這個檢查動作。",
      "把 many 當提示燈：句中只要出現 many、a lot of、few，就立刻確認後面接的是可數複數名詞。",
      "地點介系詞三件套一起記：介系詞（in / at / on）＋ the ＋ 地點名詞，三個綁在一起寫，不會漏掉。",
      "把 There be 和 It be 分開整理成兩欄對照：「某處有」給 There be，「它就是／天氣時間」給 It be，考試時不會互換。",
      "練習時刻意把句子拉長：從 There are animals. 加到 There are many kinds of animals in the zoo.，熟悉 be 動詞的一致變化。"
    ]
  },
  "How many kinds of animals can you see in this picture?": {
    "zh": "你在這張圖片裡看得到多少種動物？",
    "ipa": "/haʊ ˈmeni ˈkaɪndz əv ˈænɪ.məlz kən juː siː ɪn ðɪs ˈpɪkʃə/",
    "intro": "針對您提供的英文句子 **How many kinds of animals can you see in this picture?**，這是一個用 How many 開頭的一般疑問句，問的是「有多少（可數的東西）」。本句有三個重點：many 後面必須接可數複數；疑問句要把情態動詞 can 提到主詞 you 的前面；can 是情態動詞，後面一律接動詞原形 see。句尾 in this picture 是地點介系詞片語，用 this 指示「這張圖片」，this 後面不能再加冠詞。",
    "headline": "How many 只接複數；can 提前，後面用原形 see",
    "structure": [
      {
        "role": "疑問詞",
        "token": "How many",
        "pos": "疑問詞 (Interrogative) — 修飾複數可數名詞",
        "func": "問「有多少」，後面必須接可數名詞的複數形，這裡接 kinds of animals",
        "mark": "O"
      },
      {
        "role": "中心名詞",
        "token": "kinds",
        "pos": "名詞 (Noun) — kind 的複數形",
        "func": "被 How many 修飾的名詞，表示「種類」；呼應前一句的 kinds of animals",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "of",
        "pos": "介系詞 (Preposition)",
        "func": "把 kinds 與 animals 連起來，表示「動物的」，是 kinds of 的固定用法",
        "mark": "O"
      },
      {
        "role": "名詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數形",
        "func": "of 後面所指向的名詞，要用複數形 animals",
        "mark": "O"
      },
      {
        "role": "情態動詞",
        "token": "can",
        "pos": "情態動詞 (Modal Verb)",
        "func": "表示「能不能」的能力。疑問句中必須移到主詞 you 的前面，且後面接動詞原形",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "you",
        "pos": "代名詞 (Pronoun) — 人稱代名詞",
        "func": "動作的執行者，負責看這張圖。因為句中已有 can 這個情態動詞，疑問句不必再加 do / does",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "see",
        "pos": "動詞 (Verb) — 原形",
        "func": "表示「看見」。因為前面是情態動詞 can，後面一定要用原形，不能加 -s 或 -ed",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "表示「在……裡面」，用在圖片這種有範圍的平面物件上，指看的位置",
        "mark": "O"
      },
      {
        "role": "指示形容詞＋名詞",
        "token": "this picture",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "this 放在名詞前當指示形容詞，修飾 picture，指定是「這張圖片」；this 後面不能再加冠詞",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "How many 與 How much 混用（many 只接可數複數）",
        "bad": "(X) **How much** kinds of animals can you see in this picture?",
        "ok": "(O) **How many** kinds of animals can you see in this picture?",
        "why": "many 專門接可數名詞的複數，much 專門接不可數名詞（例如 water、money、time）。kinds of animals 是可以一個一個點出來的，所以一定要用 How many。判斷法：問自己「答案能不能一個一個數出來？」能 → many；不能 → much。口訣：「many 能不能一個一個點？答案是 yes 就用 many。」",
        "exOkText": "(O) **How many** books do you have?",
        "exOkZh": "你有幾本書？",
        "exBadText": "(X) **How much** books do you have?",
        "exBadNote": "錯誤：books 是可數名詞複數，要用 How many，不能用 How much"
      },
      {
        "title": "一般疑問句語序（情態動詞沒有提前）",
        "bad": "(X) How many kinds of animals **you can** see in this picture? ／ (X) How many kinds of animals **do you can** see in this picture?",
        "ok": "(O) How many kinds of animals **can you** see in this picture?",
        "why": "只要句中有 can、will、may 這類情態動詞，疑問句就要把情態動詞搬到主詞前面，變成 Can you…？學生常受中文語序影響，把 can 留在動詞前面寫成 you can see…，那樣就變成陳述句而不是問句。口訣：「情態動詞前面站，主詞 you 往後移。」",
        "exOkText": "(O) **Can you** see the birds in the tree?",
        "exOkZh": "你看得到樹上的鳥嗎？",
        "exBadText": "(X) **You can** see the birds in the tree?",
        "exBadNote": "錯誤：疑問句要把 can 提到主詞 you 前面，變成 Can you…"
      },
      {
        "title": "情態動詞後面接動詞原形",
        "bad": "(X) How many kinds of animals can you **sees** in this picture? ／ (X) How many kinds of animals can you **to see** in this picture?",
        "ok": "(O) How many kinds of animals can you **see** in this picture?",
        "why": "can、must、should、will 這類情態動詞後面一律接動詞原形：不加 -s、不加 -ed、也不加 to，因為情態動詞本身就帶有時態。學生常把一般動詞的三態變化套在 can 後面，或以為 can 之後要接 to do。口訣：「can 就像一個人，後面直接牽一隻原形的狗，不加尾巴也不加 to。」",
        "exOkText": "(O) The elephant **can run** very fast.",
        "exOkZh": "大象跑得很快。",
        "exBadText": "(X) The elephant **can runs** very fast.",
        "exBadNote": "錯誤：can 後面的動詞要用原形 run，不能加 -s 變成 runs"
      },
      {
        "title": "指示詞 this 後不能再加冠詞",
        "bad": "(X) How many kinds of animals can you see in **this the** picture? ／ (X) How many kinds of animals can you see in **a this** picture?",
        "ok": "(O) How many kinds of animals can you see in **this** picture?",
        "why": "this、that 本身就是指示詞，已經帶有「特定的那一個」的意思，後面不能再接 a、an 或 the，否則就是重複指定。冠詞與指示詞疊在一起，是中文「這張圖片」直譯時最常見的錯誤。口訣：「this、that 自帶身分證，不用再拿 the 證明一次。」",
        "exOkText": "(O) How many elephants are in **this** photo?",
        "exOkZh": "這張照片裡有幾隻大象？",
        "exBadText": "(X) How many elephants are in **this the** photo?",
        "exBadNote": "錯誤：this 已經是指示詞，後面不能再加冠詞 the"
      }
    ],
    "traps": [
      "**How many 後面看複數**：How many 後面的名詞只要沒有 -s，這個選項就可以直接刪掉，因為 many 一定接可數複數。",
      "**can 前面不能再加 do／does**：有情態動詞的問句已經是疑問句語序，再加 do 就多了一個助動詞。",
      "**this 與 the 不能並存**：看到 this the、that a、the this 之類的組合，立刻判定為錯誤。",
      "**疑問句的問號**：句尾的 ? 不能漏掉，會考的檢查題也會看這個細節。"
    ],
    "strategy": [
      "看到 How many 就先圈起來，寫句子時強迫自己在後面接一個帶 -s 的複數名詞。",
      "寫問句用兩步驟：先寫陳述句（You can see many animals in this picture.），再把 can 提到最前面變成問句，語序就不會錯。",
      "背熟情態動詞表：can / could / may / might / must / should / will 後面一律接原形，看到就直接套。",
      "寫完快速掃一遍名詞區：of 前後都要複數、this 後面不要冠詞，這兩點檢查完，句子就穩了。",
      "問句配答句一起背：How many kinds of animals can you see? — I can see six kinds of animals.，問答成對記憶比較不容易搞混。"
    ]
  },
  "My brother is interested in animals.": {
    "zh": "我弟弟對動物感興趣。",
    "ipa": "/maɪ ˈbrʌðər ɪz ˈɪntrəstɪd ɪn ˈænɪ.məlz/",
    "intro": "針對您提供的英文句子 **My brother is interested in animals.**，這是一個簡單的肯定句，結構是「主詞 + be 動詞 + 形容詞 + 介系詞片語」。本句最該注意的是 be interested in 這個固定片語：interested 描述的是「人」的心態，所以主詞必須是人，中間的介系詞固定用 in，不能換成 on 或 to。句尾 in animals 是介系詞片語，animals 要用複數，表示廣義的動物而不是某一隻。",
    "headline": "be interested in 是固定片語，in 不可改；interested 修飾人",
    "structure": [
      {
        "role": "限定詞",
        "token": "My",
        "pos": "所有格代詞／限定詞 (Possessive Determiner)",
        "func": "表示「我的」，放在名詞前。後面的 brother 已經被 my 限定，所以不能再加 -s 變成複數",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "brother",
        "pos": "名詞 (Noun) — 可數名詞",
        "func": "句子的主角，指「（我的）弟弟」。名詞前已有 my 就不再加 -s；若泛指所有的兄弟才寫 brothers",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 的第三人稱單數形",
        "func": "與單數主詞 My brother 一致，所以用 is；後面接形容詞 interested 構成主系補語",
        "mark": "O"
      },
      {
        "role": "表語／形容詞",
        "token": "interested",
        "pos": "形容詞 (Adjective) — interest 的 -ed 形式",
        "func": "描述主詞 brother 的心理狀態，意思是「感興趣的」。它修飾的是「人」，所以主詞必須換成人",
        "mark": "O"
      },
      {
        "role": "介系詞",
        "token": "in",
        "pos": "介系詞 (Preposition)",
        "func": "be interested in 是固定搭配，介系詞只能用 in，表示「對……感興趣」，不能替換",
        "mark": "O"
      },
      {
        "role": "介系詞的受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — animal 的複數形",
        "func": "in 後面接感興趣的對象。泛指動物這一整類時用複數 animals，不是單數 animal",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "固定片語 be interested in 的介系詞誤用",
        "bad": "(X) My brother is interested **on** animals. ／ (X) My brother is interested **to** animals.",
        "ok": "(O) My brother is interested **in** animals.",
        "why": "be interested in 是國中必背的固定片語，中間的介系詞只能用 in，意思相當於中文的「對……感興趣」。學生常因中文說「對動物有興趣」，聽起來像是「在動物上」，就直覺地選 on；也有人以為興趣要用 to。口訣：「be interested 一定配 in，換成別的就不對。」",
        "exOkText": "(O) My sister is **interested in** science.",
        "exOkZh": "我姐姐對科學感興趣。",
        "exBadText": "(X) My sister is **interested on** science.",
        "exBadNote": "錯誤：be interested 後的介系詞固定用 in，不能改成 on"
      },
      {
        "title": "interested 與 interesting 混淆（-ed 修飾人、-ing 修飾物）",
        "bad": "(X) My brother is **interesting** in animals. ／ (X) My brother is **interest** in animals.",
        "ok": "(O) My brother is **interested** in animals.",
        "why": "interested 是「感到興趣的」，用來描述人的心情，所以主詞必須是人；interesting 是「有趣的」，用來描述讓人感興趣的東西，主詞應該是物或活動。學生常因中文「有趣」跟「有興趣」很像而混用。口訣：「人會被東西 -ed 掉，所以形容人用 -ed，形容東西用 -ing。」",
        "exOkText": "(O) The **elephant is interesting** to children.",
        "exOkZh": "大象對孩子們來說很有趣。",
        "exBadText": "(X) My **brother is interesting**.",
        "exBadNote": "錯誤：brother 是人，要用 interested；interesting 是用來描述讓人感興趣的東西"
      },
      {
        "title": "介系詞後接動詞要用動名詞 -ing",
        "bad": "(X) My brother is interested in **to read** books. ／ (X) My brother is interested in **read** books.",
        "ok": "(O) My brother is interested in **reading** books.",
        "why": "介系詞（in、at、on、of、for、about）後面如果接動詞，動詞一定要變成動名詞，也就是加 -ing 的形式，這是英文的固定規則。學生常忽略這一步，直接寫原形或 to do。口訣：「介系詞一出現，後面的動詞就加 -ing。」",
        "exOkText": "(O) He is interested in **learning** about animals.",
        "exOkZh": "他有興趣了解動物。",
        "exBadText": "(X) He is interested in **learn** about animals.",
        "exBadNote": "錯誤：介系詞 in 後面的動詞要用動名詞 learning，不能用原形或 to learn"
      },
      {
        "title": "主詞前已有 my，就不能再加 -s",
        "bad": "(X) My **brothers is** interested in animals. ／ (X) My **brother are** interested in animals.",
        "ok": "(O) My **brother is** interested in animals.",
        "why": "英文名詞前面若已經有 this、that、my、your、his、her 這類限定詞，就不能再加 -s。不加 -s 是指「我（的）這個弟弟」，加了 -s 變成 brothers 就變成「我所有的弟弟們」，語意完全不同，be 動詞也要跟著改成 are。學生常受中文「我的弟弟們」影響而多加了 s。口訣：「前面有 my、his、her，名詞就乖乖不加 s。」",
        "exOkText": "(O) My **sister is** interested in animals.",
        "exOkZh": "我妹妹對動物感興趣。",
        "exBadText": "(X) My **sisters is** interested in animals.",
        "exBadNote": "錯誤：brother 前面已有 my，不能再加 -s，且 be 動詞要用 is"
      }
    ],
    "traps": [
      "**be interested in 是必背片語**：介系詞寫錯，背得再熟也會被扣分，會考選擇題常常直接考 in 對不對。",
      "**-ed 對人、-ing 對物**：看到主詞是人就選 interested，看到主詞是動物、書本、活動就選 interesting。",
      "**my 開頭不加 -s**：會考單選常常利用「前面已有 my，就不能變複數」這個規則出題。",
      "**be 動詞跟主語走**：My brother 是單數用 is；只有 My brothers（兄弟們）才用 are。"
    ],
    "strategy": [
      "把 be interested in 當成一個單字來背，中間的 in 不可省略、不可替換，比拆開記更不容易錯。",
      "看到 -ed / -ing 結尾的形容詞，先問「主詞是人還是東西？」再決定用哪一個。",
      "寫完 be interested in … 之後檢查後面接的是名詞還是動詞：動詞一律加 -ing 變成動名詞。",
      "interested / interesting 用一組對照句加深印象：People are interested. → The show is interesting.，兩句一起記。",
      "複數規則只背一條就夠：一般名詞前面有 my / your / his / her / this / that 時不加 -s。"
    ]
  },
  "The elephant is bigger than the horse.": {
    "zh": "大象比馬大。",
    "ipa": "/ðiː ˈelɪfənt ɪz ˈbɪɡər ðæn ðə hɔːs/",
    "intro": "針對您提供的英文句子 **The elephant is bigger than the horse.**，這是一個比較句，用 be 動詞把 the elephant 與 the horse 兩個對象放在一起比較。比較級的規則是：單音節與部分雙音節形容詞直接加 -er（big → bigger），三音節以上才用 more + 原級。另外要記住比較級後面一定要接 than，而且比較級前面不能再加 very。這兩點是會考比較句最常設的陷阱。",
    "headline": "bigger 用 -er；比較級後接 than，前面不加 very",
    "structure": [
      {
        "role": "定冠詞",
        "token": "The",
        "pos": "限定詞 (Determiner) — 定冠詞",
        "func": "放在名詞前，表示「那一隻／那一匹」，特指被比較的特定對象；後面的名詞因有 the 而不加 -s",
        "mark": "O"
      },
      {
        "role": "主詞",
        "token": "elephant",
        "pos": "名詞 (Noun) — 可數名詞",
        "func": "比較的主體，是被比較的兩者之一；前面有 the，所以不加 -s",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 的第三人稱單數形",
        "func": "與單數主詞 elephant 一致，後面接比較級 bigger，構成「主詞 + be + 比較級 + than」的比較句",
        "mark": "O"
      },
      {
        "role": "比較級",
        "token": "bigger",
        "pos": "形容詞 (Adjective) — big 的比較級",
        "func": "big 只有一個音節，是短形容詞，比較級直接加 -er 變成 bigger。句中不能再加 more，也不能加 very",
        "mark": "O"
      },
      {
        "role": "連詞",
        "token": "than",
        "pos": "連詞 (Conjunction)",
        "func": "放在比較級與被比較的對象之間，表示「比」。少了 than，句子就不是比較句了",
        "mark": "O"
      },
      {
        "role": "比較對象",
        "token": "the horse",
        "pos": "名詞片語 (Noun Phrase)",
        "func": "被比較的另一方。前面同樣用 the，兩邊的冠詞用法必須一致，這樣比較才對等",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "比較級 -er 與 more 混用",
        "bad": "(X) The elephant is **more bigger** than the horse.",
        "ok": "(O) The elephant is **bigger** than the horse.",
        "why": "big 只有一個音節，是短形容詞，比較級直接加 -er 變成 bigger；只有三音節以上的長形容詞（如 beautiful、interesting）才用 more + 原級。學生常以為「比較級一定要用 more 開頭」，於是寫出 more bigger 這種重複的錯誤。口訣：「短的就自己加 -er，長的才請 more 幫忙。」",
        "exOkText": "(O) The lion is **stronger** than the horse.",
        "exOkZh": "獅子比馬壯。",
        "exBadText": "(X) The lion is **more stronger** than the horse.",
        "exBadNote": "錯誤：strong 是單音節，比較級直接加 -er，不能再加 more"
      },
      {
        "title": "than 與最高級混淆（比較級後不能用 -est）",
        "bad": "(X) The elephant is **the biggest than** the horse. ／ (X) The elephant is bigger **the horse**.",
        "ok": "(O) The elephant is **bigger than** the horse.",
        "why": "than 是「比」，專門接在比較級後面；而最高級 the biggest 後面要接 in 或 of，表示「在……之中最……」。兩者位置不同、詞尾也不同（-er 對 -est），絕對不能互換。口訣：「看到 -er 就想到 than，看到 -est 就想到 in 或 of。」",
        "exOkText": "(O) The elephant is **the biggest animal in** the zoo.",
        "exOkZh": "大象是動物園裡最大的動物。",
        "exBadText": "(X) The elephant is **the biggest than** the horse.",
        "exBadNote": "錯誤：最高級 the biggest 後面要接 in／of，不能用 than；than 只能接比較級"
      },
      {
        "title": "比較級前不能加 very",
        "bad": "(X) The elephant is **very bigger** than the horse. ／ (X) The elephant is **very big bigger** than the horse.",
        "ok": "(O) The elephant is **bigger** than the horse.",
        "why": "形容詞的比較級本身就已經表示「更……」，程度已經加深了，前面不能再用 very 修飾。學生常把「很」和「更」疊在一起，寫成 very bigger。口訣：「比較級已經很『更』了，前面不用再加 very。」",
        "exOkText": "(O) My brother is **taller than** me.",
        "exOkZh": "我弟弟比我高。",
        "exBadText": "(X) My brother is **very taller than** me.",
        "exBadNote": "錯誤：比較級 taller 前面不能加 very"
      },
      {
        "title": "比較句兩邊的冠詞要一致（漏掉 the）",
        "bad": "(X) The elephant is bigger than **horse**. ／ (X) The elephant is **the bigger** than the horse.",
        "ok": "(O) The elephant is bigger than **the horse**.",
        "why": "比較句裡兩邊的對象要「對等」，前面既然寫了 the elephant，後面就要寫 the horse，不能漏掉冠詞；反過來，冠詞是綁在名詞上的，不是綁在比較級上，所以比較級 bigger 前面不用再加 the。學生常因中文省略冠詞而不自覺漏寫。口訣：「比較句兩邊的冠詞要成對出現。」",
        "exOkText": "(O) The **cat is smaller than** the dog.",
        "exOkZh": "貓比狗小。",
        "exBadText": "(X) The **cat is smaller than** dog.",
        "exBadNote": "錯誤：比較對象 dog 前面漏了冠詞 the，兩邊要成對出現"
      }
    ],
    "traps": [
      "**-er 與 more 只選一個**：bigger 已經是比較級，不能寫成 more bigger，這個錯誤在會考選項裡非常常見。",
      "**than 專屬比較級**：看到 -est 卻跟 than，或看到 than 前面沒有 -er，都是典型錯項。",
      "**兩邊冠詞要對稱**：the elephant … than the horse，漏掉一個 the 整句就不成立。",
      "**be 動詞不能省**：比較句裡的 is 不能省略，也不能寫成 The elephant bigger than the horse.。"
    ],
    "strategy": [
      "把形容詞按音節分成兩類背：短形容詞（big、tall、small）背成 big–bigger–biggest；長形容詞（beautiful、interesting）記成 more + 原級、most + 原級。",
      "寫完比較級立刻做兩項檢查：後面有沒有 than？前面有沒有亂加 very 或 more？",
      "多用「A is -er than B」這個句型造句，把 than 的位置練成肌肉記憶。",
      "看到 the biggest 立刻聯想到 in / of，看到 bigger 立刻聯想到 than，兩組詞分開記、不混用。",
      "寫比較句時兩邊冠詞一起寫，養成 the… than the… 的固定節奏，就不會漏掉其中一邊。"
    ]
  },
  "She has three pets at home.": {
    "zh": "她家裡有三隻寵物。",
    "ipa": "/ʃiː hæz θriː pets ət həʊm/",
    "intro": "針對您提供的英文句子 **She has three pets at home.**，這是一個文法完全正確的簡單句，結構為「主詞 + 動詞 + 數詞 + 名詞 + 場所副詞片語」，單複數與一致關係都對得上。整句在講「她家裡有幾隻寵物」這件事，閱讀時最該注意的方向有兩個：一是第三人稱單數的 has，二是數詞 three 後面的名詞一定要用複數。另外 **at home** 是固定片語，介系詞與冠詞都不能隨意加。",
    "headline": "She 用 has；three 後面名詞要複數；at home 不加冠詞",
    "structure": [
      {
        "role": "主詞",
        "token": "She",
        "pos": "代名詞 (Pronoun) — 第三人稱單數",
        "func": "句子的主角。She 是單數第三人稱，後面的動詞必須配合成 has",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "has",
        "pos": "動詞 (Verb) — have 的第三人稱單數形",
        "func": "表示「有、擁有」。因為主詞是 She，所以要把 have 加上 -s 變成 has",
        "mark": "O"
      },
      {
        "role": "數詞",
        "token": "three",
        "pos": "數詞 (Numeral) — 基數詞",
        "func": "表示數量「三」，後面接可數名詞的複數形 pets，兩者要一致",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "pets",
        "pos": "名詞 (Noun) — 複數",
        "func": "has 的受詞，表示被擁有的對象。因為有三隻，所以用複數 pets",
        "mark": "O"
      },
      {
        "role": "場所副詞片語",
        "token": "at home",
        "pos": "片語 (Phrase) — 固定片語",
        "func": "表示動作發生的地點「在家」。home 在這裡當副詞用，前面不加 the，也不能改成 in",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "主詞動詞不一致（第三人稱單數誤用 have）",
        "bad": "(X) She **have** three pets at home.",
        "ok": "(O) She **has** three pets at home.",
        "why": "主詞 She 是第三人稱單數，一般動詞 have 必須變成 has。台灣學生常有一個誤解，以為「加 s」是給複數主詞用的，所以看到 She 反而寫 have。判斷法：主詞如果是 he、she、it 或單數名詞，動詞一律加 -s 或 -es；I / you / we / they 後面的動詞則永遠不加。",
        "exOkText": "(O) He **has** a dog at home.",
        "exOkZh": "他家裡有一隻狗。",
        "exBadText": "(X) He **have** a dog at home.",
        "exBadNote": "錯誤：主詞 He 是第三人稱單數，have 必須改成 has"
      },
      {
        "title": "數詞後面的可數名詞忘了用複數",
        "bad": "(X) She has three **pet** at home.",
        "ok": "(O) She has three **pets** at home.",
        "why": "數詞 three 本身已經表示「三個」，後面的可數名詞一定要用複數 pets，兩者必須同時出現、互相搭配。學生常只記得寫數詞就把名詞忘記加 s，句子看起來像「三隻（一個）」。判斷法：看到 two、three、four、many、several、a few，後面跟的可數名詞一律用複數。",
        "exOkText": "(O) She has **four cats** at home.",
        "exOkZh": "她家裡有四隻貓。",
        "exBadText": "(X) She has **four cat** at home.",
        "exBadNote": "錯誤：數詞 four 後面的可數名詞要用複數 cats"
      },
      {
        "title": "at home 固定片語誤加冠詞或改用其他介系詞",
        "bad": "(X) She has three pets **at the home**. ／ (X) She has three pets **in the home**.",
        "ok": "(O) She has three pets **at home**.",
        "why": "at home 是固定片語，意思就是「在家」，home 在這裡當副詞使用，前面不加 the，也不能改用 in。中文說「在家裡」會讓學生自然地想出 at the home。判斷法：把 at home 整個當成一個單位背起來；只有在比較兩個地點（at my home vs. at your home）時才會出現 the home。",
        "exOkText": "(O) My parents stay **at home** on Sunday.",
        "exOkZh": "我父母星期日待在家裡。",
        "exBadText": "(X) My parents stay **in the home** on Sunday.",
        "exBadNote": "錯誤：at home 是固定片語，不能加 the，也不能換成 in"
      },
      {
        "title": "be 動詞與一般動詞疊用（雙動詞錯誤）",
        "bad": "(X) She **is has** three pets at home.",
        "ok": "(O) She **has** three pets at home.",
        "why": "這是一個「有」字句，只有一個主要動詞 has，前面不能再加 be 動詞 is。學生常誤以為英文句子一定要「有一個 be 動詞」，於是把 is 和 has 疊在一起。判斷法：句中出現 is / am / are 後面要接形容詞或 -ing；如果句子裡已經有 has、have、eat、play 這類實義動詞，就不要再加 be 動詞。",
        "exOkText": "(O) My sister **has** two cats at home.",
        "exOkZh": "我姐姐家裡有兩隻貓。",
        "exBadText": "(X) My sister **is have** two cats at home.",
        "exBadNote": "錯誤：have 前面不能再加 is，一個簡單句只能有一個主要動詞"
      }
    ],
    "traps": [
      "**三單陷阱**：會考克漏字與選擇題最常考 have / has 的選擇。判斷順序是「先圈主詞 → 看單複數 → 再選 have 或 has」，主詞 she 一定是 has。",
      "**數詞搭配陷阱**：英文沒有像中文「三隻」那樣把量詞放在名詞前，數詞一定放名詞前面，而且名詞要變複數（three pets），不能寫成 three pet。",
      "**冠詞陷阱**：at home、at school、at work 這類固定片語前面都不能加 the，中文「在家裡」的「裡」在英文裡是空的。",
      "**數量核對陷阱**：如果句子同時出現數詞與名詞，檢查兩者單複數是否一致，是會考送分題，也是最容易粗心的地方。"
    ],
    "strategy": [
      "寫題時養成「圈主詞」的第一個動作：把主詞圈起來，單複數立刻標在旁邊，動詞的形式就不會選錯。",
      "看到數詞就自動在後面名詞上加 -s，形成肌肉記憶，可以避免 three pet 這種半途漏寫。",
      "把 at home、at school、at work、in bed、in class 這五個固定片語整組背誦，不要逐字翻譯中文。",
      "寫完後倒回去檢查 be 動詞：句子裡出現兩個動詞（is has、are play）一定就是錯的。",
      "朗讀整句感受語意：她家裡有三隻寵物，聽起來自然就對，唸起來彆扭的地方通常就是錯的地方。"
    ]
  },
  "These animals are endangered.": {
    "zh": "這些動物是瀕危的。",
    "ipa": "/ðiːz ˈænɪ.məlz ɑːr ɪnˈdaʒəd/",
    "intro": "針對您提供的英文句子 **These animals are endangered.**，這是一個 be 動詞 + 形容詞的完整簡單句，主詞是指示代名詞 These，後面接複數名詞，再用 are 搭配。整句在說「這些動物正瀕臨滅絕」，閱讀時最該注意的方向有三個：These 只能配複數名詞與 are、be 動詞不能漏寫、還有 endangered 與 dangerous 意思完全不同，絕不能互換。",
    "headline": "These 配 are 與複數名詞；endangered 是形容詞",
    "structure": [
      {
        "role": "指示代名詞",
        "token": "These",
        "pos": "代名詞 (Pronoun) — 指示代名詞，複數",
        "func": "主詞，用來指「這些（東西）」。These 是複數，所以後面的名詞與 be 動詞都要用複數",
        "mark": "O"
      },
      {
        "role": "主詞（名詞）",
        "token": "animals",
        "pos": "名詞 (Noun) — 複數",
        "func": "這些動物的名稱。配合 These 用複數，泛指動物這一類",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "are",
        "pos": "動詞 (Verb) — be 動詞的複數形",
        "func": "連接主詞與後面的形容詞。因為主詞是 These animals（複數），所以用 are",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "endangered",
        "pos": "形容詞 (Adjective) — 過去分詞轉形容詞",
        "func": "描述主詞的狀態「瀕危的」。它是形容詞，所以前面一定要有 are，不能自己當動詞用",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "指示代名詞與 be 動詞不一致（This/These × is/are）",
        "bad": "(X) **This** animals **is** endangered. ／ (X) **These** animals **is** endangered.",
        "ok": "(O) **These** animals **are** endangered.",
        "why": "This 是單數指示代名詞，要配單數名詞與 is；These 是複數，必須配複數名詞與 are，兩邊要同時對換。台灣學生常以為「這裡是單數場景，所以用 This」，卻忽略後面 animals 明明是複數。判斷法：先看後面名詞的單複數——單數配 This + is，複數配 These + are。",
        "exOkText": "(O) **These** birds **are** endangered.",
        "exOkZh": "這些鳥是瀕危的。",
        "exBadText": "(X) **This** birds **is** endangered.",
        "exBadNote": "錯誤：This 是單數，後面要用複數名詞 birds 和 be 動詞 are"
      },
      {
        "title": "字義混淆：把 endangered 誤用成 dangerous",
        "bad": "(X) These animals are **dangerous**.",
        "ok": "(O) These animals are **endangered**.",
        "why": "endangered 是「瀕危的」，指某個物種因為數量急遽減少、面臨滅絕，是生態保育的專用詞；dangerous 是「危險的」，指會造成傷害或具有危險性，兩者完全不同。學生常以為「很危險」就等於「瀕危」，但一隻會咬人的老虎並不 endangered。判斷法：中文出現「瀕臨滅絕、快要消失」就固定寫 endangered。",
        "exOkText": "(O) Pandas are **endangered** animals.",
        "exOkZh": "熊貓是瀕危動物。",
        "exBadText": "(X) Pandas are **dangerous** animals.",
        "exBadNote": "錯誤：「危險」不等於「瀕危」，瀕危必須用 endangered"
      },
      {
        "title": "be 動詞漏寫（句尾形容詞被誤當成動詞）",
        "bad": "(X) These animals **endangered**.",
        "ok": "(O) These animals **are endangered**.",
        "why": "本句是「be 動詞 + 形容詞」的句子，必須有 are 在中間帶動。endangered 是形容詞，不能自己獨立當句子的主要動詞。學生常因為「動物很可憐」的心態，或受中文「這些動物瀕危」省略動詞的影響，把 are 整個漏掉。判斷法：看到句尾是 -ed / -ing 形式的詞，前面一定要找 be 動詞；找不到就是漏寫了。",
        "exOkText": "(O) Many turtles **are endangered**.",
        "exOkZh": "很多海龜都瀕臨滅絕。",
        "exBadText": "(X) Many turtles **endangered**.",
        "exBadNote": "錯誤：漏掉 be 動詞 are，endangered 是形容詞不能單獨成句"
      },
      {
        "title": "複數主詞漏加 -s（animal 誤寫成 animals 的單數）",
        "bad": "(X) These **animal** are endangered.",
        "ok": "(O) These **animals** are endangered.",
        "why": "These 是複數指示代名詞，後面的可數名詞也必須用複數 animals。代詞與名詞之間的一致關係是會考的固定考點，只要其中一個變成單數，整個句子就錯了。判斷法：單數代詞配單數名詞，複數代詞配複數名詞，兩個都要一起檢查。",
        "exOkText": "(O) These **turtles** are endangered.",
        "exOkZh": "這些海龜是瀕危的。",
        "exBadText": "(X) These **turtle** are endangered.",
        "exBadNote": "錯誤：These 是複數，後面的可數名詞要用複數 turtles"
      }
    ],
    "traps": [
      "**一致關係陷阱**：會考選擇題常把 These / This、are / is 交叉排列出題，看起來四個選項都通順。判斷時永遠從後面的名詞單複數反推代詞與 be 動詞。",
      "**字義陷阱**：endangered（瀕危）、dangerous（危險）、extinct（已滅絕）三個常被交換出題。extinct 是「已滅絕」，指已經完全消失，不能用 endangered 代替。",
      "**be 動詞陷阱**：be 動詞後面只能接「形容詞」或「-ing」，不能接原形動詞。are endangered 正確，are endanger 就是錯的。",
      "**形容詞位置陷阱**：形容詞不能放在 be 動詞之前（are the endangered ✗），這是選項常設的陷阱位置。"
    ],
    "strategy": [
      "讀 be 動詞句時養成「三件套」檢查：主詞是誰 → be 動詞對不對 → 後面接的是不是形容詞。",
      "把 endangered、extinct、dangerous、rare 三個字整理成一張對照表，寫中文再寫例句，測驗前只複習這張表。",
      "練習時先寫中文再寫英文，遇到「瀕危、滅絕、危險」這類詞先回想固定搭配，再動筆。",
      "遇到不確定的 be 動詞，用「主詞 I / you / we / they → am / are；he / she / it / 單數名詞 → is / am」兩行口訣快速決定。",
      "完形填空與克漏字特別常考單複數一致，做題時把代詞與名詞一起圈起來對照，避免只改一半。"
    ]
  },
  "We should protect animals.": {
    "zh": "我們應該保護動物。",
    "ipa": "/wiː ʃʊd prəˈtekt ˈænɪ.məlz/",
    "intro": "針對您提供的英文句子 **We should protect animals.**，這是一個含有情態動詞 should 的完整簡單句，結構為「主詞 + 情態動詞 + 動詞原形 + 受詞」。整句是提出建議、呼籲保護動物，閱讀時最該注意的方向是 should 後面必須接「動詞原形」：不能加 -er、不能加 -s，前面也不能再加 be 動詞，最後的 animals 要用複數。",
    "headline": "should 後面接動詞原形；前面不能再加 be 動詞",
    "structure": [
      {
        "role": "主詞",
        "token": "We",
        "pos": "代名詞 (Pronoun) — 人稱代名詞，複數",
        "func": "句子的主角「我們」。因為是複數，所以後面的動詞也不加 -s",
        "mark": "O"
      },
      {
        "role": "情態動詞",
        "token": "should",
        "pos": "情態動詞 (Modal Verb)",
        "func": "表示建議「應該」。情態動詞本身已帶有「應該」的意思，後面只能接動詞原形",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "protect",
        "pos": "動詞 (Verb) — 原形",
        "func": "表示要做的動作「保護」。因為前面是 should，所以用原形，不加任何字尾",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — 複數",
        "func": "protect 的受詞，表示被保護的對象。泛指動物這一整類，所以用複數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "should 後面誤加 -er（把動詞當成「人物名詞」）",
        "bad": "(X) We should **protector** animals.",
        "ok": "(O) We should **protect** animals.",
        "why": "protect 是動詞，should 後面一定要接「動詞原形」。學生看到 protect 就聯想到 protector（保護者），把它當名詞用，但這裡需要的是動作。判斷法：情態動詞（should、can、must、will、may）後面一律用原形，不加 -er、-ing、-ed、-s 任何字尾。",
        "exOkText": "(O) We should **help** each other.",
        "exOkZh": "我們應該互相幫忙。",
        "exBadText": "(X) We should **helper** each other.",
        "exBadNote": "錯誤：should 後面接動詞原形 help，不能加 -er"
      },
      {
        "title": "should 後面誤用第三人稱單數 -s",
        "bad": "(X) We should **protects** animals.",
        "ok": "(O) We should **protect** animals.",
        "why": "should 這類情態動詞後面的動詞，不看主詞單複數，一律使用原形。雖然主詞 We 本來就不需要加 s，但學生常把「動詞要配合主詞」的規則反射性地套上來，寫成 protects。判斷法：情態動詞已經把「人稱與時態」處理好了，後面的動詞只要安靜站著，不要加尾巴。",
        "exOkText": "(O) He should **study** harder.",
        "exOkZh": "他應該更用功一點。",
        "exBadText": "(X) He should **studies** harder.",
        "exBadNote": "錯誤：should 後面的動詞一律用原形 study，不加 -s"
      },
      {
        "title": "情態動詞前誤加 be 動詞",
        "bad": "(X) We **are** should protect animals.",
        "ok": "(O) We should protect animals.",
        "why": "should 是情態動詞，本身就能獨立表示「應該」，後面直接接動詞原形，前面不需要也不能再加 am / is / are。學生常受中文「我們是應該」或「這句缺 be 動詞」的心態影響，把 are 加進去。判斷法：句中一旦出現 should、can、must、will，這句就已經有動詞了，絕不可能再需要 be 動詞。",
        "exOkText": "(O) We **must** protect wild animals.",
        "exOkZh": "我們必須保護野生動物。",
        "exBadText": "(X) We **are must** protect wild animals.",
        "exBadNote": "錯誤：must 是情態動詞，前面不能再加 are"
      },
      {
        "title": "受詞複數漏加 -s",
        "bad": "(X) We should protect **animal**.",
        "ok": "(O) We should **protect animals**.",
        "why": "這裡的 animals 是泛指「動物」這一整類，英文要表達「一類事物」時必須用複數；寫成 animal 就變成「保護一隻動物」，意思完全不同。學生常覺得中文「動物」沒有單複數之分，就直接照抄。判斷法：中文「動物、書、課本、水果」這類總稱，英文一律加 -s。",
        "exOkText": "(O) We should protect **forests**.",
        "exOkZh": "我們應該保護森林。",
        "exBadText": "(X) We should protect **forest**.",
        "exBadNote": "錯誤：泛指整類事物時要用複數 forests"
      }
    ],
    "traps": [
      "**情態動詞陷阱**：should / can / must / may / might 後面的動詞一定是原形。會考常在同一題放上 protects、protecting、to protect 讓你選。",
      "**雙動詞陷阱**：選項中若出現 are should、is can、do protect 之類寫法，一律直接刪掉，因為一個句子不能有兩個主要動詞結構。",
      "**字尾陷阱**：-er 屬於名詞（protector）、-ing 屬於進行式、-ed 屬於過去式，三者都不能接在 should 後面。",
      "**受詞單複數陷阱**：protect 後面的名詞若漏了 -s，句意會從「保護動物（通稱）」變成「保護一隻動物」，語意完全走樣。"
    ],
    "strategy": [
      "背熟五個高頻情態動詞：can、must、should、will、may，綁定「後接動詞原形」這個規則，看到就能立刻反應。",
      "寫完句子做一次「原形掃描」：檢查情態動詞後面的動詞有沒有多餘的 -s、-ed、-er、-ing。",
      "練習時把 should 的句子全部改寫成中文建議句，讓「原形」跟「應該」在腦中綁定，比背規則有效。",
      "遇到 be 動詞與情態動詞同時出現的選項，不用猶豫直接判定為錯，這類題在會考出現率很高。",
      "泛指名詞（animals、forests、children）特別容易漏 -s，做題時把句尾的名詞圈起來做最後一次檢查。"
    ]
  },
  "Do not feed the animals.": {
    "zh": "不要餵食動物。",
    "ipa": "/duː nəʊt fiːd ðiː ˈænɪ.məlz/",
    "intro": "針對您提供的英文句子 **Do not feed the animals.**，這是一個以 Do not 開頭的否定祈使句，主詞 you 省略，後面直接接動詞原形。整句是公眾場所常見的告示，用來提醒大家不要餵食動物。閱讀時最該注意的方向是：Do not 後面只能接原形動詞（不能加 -ing、不能加 -s），而且 feed 是動詞、food 是名詞，兩者唸音相同但用法完全不同。",
    "headline": "否定祈使句：Do not 後接動詞原形，別寫成 feeding",
    "structure": [
      {
        "role": "否定助動詞片語",
        "token": "Do not",
        "pos": "片語 (Phrase) — 助動詞 + not",
        "func": "表示否定「不要」。這裡的主詞 you 被省略，Do not 後面必須接動詞原形",
        "mark": "O"
      },
      {
        "role": "動詞",
        "token": "feed",
        "pos": "動詞 (Verb) — 原形",
        "func": "表示動作「餵食」。因為前面是 Do not 這個祈使句結構，所以用原形，不加 -s 也不加 -ing",
        "mark": "O"
      },
      {
        "role": "定冠詞",
        "token": "the",
        "pos": "冠詞 (Article) — 定冠詞",
        "func": "放在名詞前，表示特定的那一群動物，暗示聽話者知道指的是哪些動物",
        "mark": "O"
      },
      {
        "role": "受詞",
        "token": "animals",
        "pos": "名詞 (Noun) — 複數",
        "func": "feed 的受詞，表示被餵食的對象。此處泛指動物，所以用複數",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "否定祈使句誤用 -ing 形式",
        "bad": "(X) Do not **feeding** the animals.",
        "ok": "(O) Do not **feed** the animals.",
        "why": "Do not + 動詞原形 是祈使句的否定結構，後面一定用原形。學生常受中文「不要餵食動物」裡「餵食」帶動詞感、加上英文 -ing 等於「正在做」的印象，錯誤地加上 -ing。判斷法：Don't / Do not 後面永遠接動詞原形，不會出現 -ing、-ed、-s。",
        "exOkText": "(O) **Don't touch** the butterflies.",
        "exOkZh": "不要碰那些蝴蝶。",
        "exBadText": "(X) **Don't touching** the butterflies.",
        "exBadNote": "錯誤：Don't 後面要接動詞原形 touch，不能加 -ing"
      },
      {
        "title": "動詞誤加 -s（祈使句誤用三單形式）",
        "bad": "(X) Do not **feeds** the animals.",
        "ok": "(O) Do not **feed** the animals.",
        "why": "這是省略主詞 you 的祈使句，動詞一律使用原形，不加 -s。學生因為本句前面有 Do，誤以為存在一個第三人稱單數的主詞需要配合。判斷法：Do not / Don't 開頭的句子裡沒有 he、she、it，所以後面的動詞就是原形；看到 -s 先刪掉再看有沒有主詞。",
        "exOkText": "(O) **Don't run** in the hallway.",
        "exOkZh": "不要在走廊上跑。",
        "exBadText": "(X) **Don't runs** in the hallway.",
        "exBadNote": "錯誤：祈使句的動詞用原形 run，不加 -s"
      },
      {
        "title": "feed 與 food 混淆（動詞與名詞不分）",
        "bad": "(X) Do not **food** the animals.",
        "ok": "(O) Do not **feed** the animals.",
        "why": "feed 是動詞「餵食」，food 是名詞「食物」。Do not 後面必須接動詞，所以只能用 feed。台灣學生常把兩個字都讀成 /fiːd/，聽起來一樣就以為可以通用，寫出 food the animals 這種句子。判斷法：先看空格前是「一個動詞的位置」還是「一個名詞的位置」：動詞位置寫 feed，名詞位置才寫 food。",
        "exOkText": "(O) Please **feed** the dogs.",
        "exOkZh": "請餵狗。",
        "exBadText": "(X) Please **food** the dogs.",
        "exBadNote": "錯誤：food 是名詞「食物」，這裡要用動詞 feed"
      },
      {
        "title": "受詞複數漏加 -s（the animal）",
        "bad": "(X) Do not feed the **animal**.",
        "ok": "(O) Do not feed the **animals**.",
        "why": "這裡泛指動物這一類，應使用複數 animals。寫成 the animal 就變成「不要餵食那隻動物」，範圍縮小到一隻，語意完全不同。學生常以為 the 已經表示「這些」，就省略名詞的 -s。判斷法：the + 單數名詞只指一隻（看得見的那一隻），the + 複數名詞才指一群。",
        "exOkText": "(O) Do not **feed the birds** in the park.",
        "exOkZh": "不要在公園裡餵鳥。",
        "exBadText": "(X) Do not **feed the bird** in the park.",
        "exBadNote": "錯誤：泛指一群動物要用複數 birds"
      }
    ],
    "traps": [
      "**否定祈使句陷阱**：Do not / Don't 後面一定接原形。會考選項常放 feeding、feeds、to feed 三個干擾項，全部要排除。",
      "**同音字陷阱**：feed（餵食，動詞）與 food（食物，名詞）唸音相同，是會考愛考的配對題，看前後位置就能決定用哪個。",
      "**省略主詞陷阱**：祈使句的主詞 you 不寫出來，所以千萬不要以為「沒有主詞就可以亂加 -s」，動詞仍然是原形。",
      "**告示文陷阱**：公共場所的 No smoking、Don't litter、Do not feed 都是祈使句否定結構，題目換一個場景學生就容易判錯句型。"
    ],
    "strategy": [
      "把否定祈使句單獨整理成一頁：Don't + 動詞原形，對照肯定句祈使句「動詞原形」，兩種句型一起記。",
      "遇到聽不出詞性的字，先問「這裡需要一個動作嗎？」需要動作就是 feed，需要東西才是 food。",
      "看到 -ing、-s、-ed 這三種字尾先暫停，確認前面是不是 Do not / Don't，是的話直接刪掉字尾。",
      "把常見的禁止標語（Don't litter、No parking、Do not touch）一起背，之後在公園、動物園的題目就能秒判句型。",
      "寫完後檢查兩處：動詞有沒有原形、句尾名詞有沒有複數，這兩點是本句的失分重點。"
    ]
  },
  "The zoo is closed every Monday.": {
    "zh": "動物園每週一休館。",
    "ipa": "/ðə zuː ɪz kləʊzd ˈevri ˈmʌndeɪ/",
    "intro": "針對您提供的英文句子 **The zoo is closed every Monday.**，這是一個「be 動詞 + 過去分詞」的被動句，用來描述場所的固定狀態。整句在說動物園每週一都休館，閱讀時最該注意的方向有四個：closed 是狀態而不是正在發生的動作、every 後面一定接單數名詞、星期名首字母要大寫，以及 be 動詞不能漏寫。",
    "headline": "休館用 be closed；every 後接單數；星期要大寫",
    "structure": [
      {
        "role": "定冠詞＋名詞",
        "token": "The zoo",
        "pos": "名詞 (Noun) — zoo 加上定冠詞 the",
        "func": "主詞。the 表示特定的那一個動物園，zoo 是可數名詞單數，後面的 be 動詞用 is",
        "mark": "O"
      },
      {
        "role": "be 動詞",
        "token": "is",
        "pos": "動詞 (Verb) — be 動詞第三人稱單數形",
        "func": "連接主詞與後面的過去分詞，表示狀態。單數主詞配 is，不能漏寫",
        "mark": "O"
      },
      {
        "role": "表語",
        "token": "closed",
        "pos": "形容詞 (Adjective) — close 的過去分詞",
        "func": "描述主詞的狀態「已關門的、休館的」。用 be + 過去分詞構成被動語態",
        "mark": "O"
      },
      {
        "role": "時間副詞片語",
        "token": "every Monday",
        "pos": "片語 (Phrase) — every + 單數名詞",
        "func": "表示動作發生的時間「每週一」。every 後面的名詞一定要用單數，且首字母要大寫",
        "mark": "O"
      }
    ],
    "mistakes": [
      {
        "title": "狀態與動作進行式混淆（is closed 誤用成 is closing）",
        "bad": "(X) The zoo **is closing** every Monday.",
        "ok": "(O) The zoo **is closed** every Monday.",
        "why": "closed 是「已關門」的狀態，用 be + 過去分詞（被動）；closing 是「正在關門」的進行式動作。休館是每週固定的狀態，不是此刻正在進行的事。學生常把中文「休館」對應到 closing 的「關門中」語感而誤選。判斷法：中文若譯成「（每週一）不開放、休息」，英文固定用 be closed；只有譯成「正在關門」才用 is closing。",
        "exOkText": "(O) The library **is closed** on Sundays.",
        "exOkZh": "圖書館星期日休館。",
        "exBadText": "(X) The library **is closing** on Sundays.",
        "exBadNote": "錯誤：休館是狀態，應用 be closed，不是 is closing"
      },
      {
        "title": "every 後面的單數名詞誤加 -s",
        "bad": "(X) The zoo is closed every **Mondays**.",
        "ok": "(O) The zoo is closed every **Monday**.",
        "why": "every 意思是「每一個」，後面一律接單數名詞，這是 every 的固定特色。同樣地，each、any、some 這類詞後面也只跟單數。學生常照直覺把「每週一們」翻成複數。判斷法：every / each / any / some / one of 這五個詞，後面看到 -s 就先刪掉再檢查。",
        "exOkText": "(O) The zoo is closed every **day**.",
        "exOkZh": "動物園每天休館。",
        "exBadText": "(X) The zoo is closed every **days**.",
        "exBadNote": "錯誤：every 後面的名詞要用單數 day，不加 -s"
      },
      {
        "title": "星期名未大寫（專有名詞的首字母）",
        "bad": "(X) The zoo is closed every **monday**.",
        "ok": "(O) The zoo is closed every **Monday**.",
        "why": "星期名屬於專有名詞，第一個字母一定要大寫，這和月份、國名、人物姓名的規則相同。台灣學生的英文課本常以小寫列出星期表，形成「monday 就是小寫」的錯印象。判斷法：只要句中出現星期，一律先寫大寫 M 再繼續；Monday、Friday、Tuesday 最常被出題。",
        "exOkText": "(O) The museum is closed every **Sunday**.",
        "exOkZh": "博物館每週日休館。",
        "exBadText": "(X) The museum is closed every **sunday**.",
        "exBadNote": "錯誤：星期名是專有名詞，Sunday 首字母必須大寫"
      },
      {
        "title": "be 動詞漏寫（被動語態少了 is）",
        "bad": "(X) The zoo **closed** every Monday.",
        "ok": "(O) The zoo **is closed** every Monday.",
        "why": "closed 在這裡是過去分詞，構成被動語態「被關門」，前面一定要有 be 動詞 is。學生常看到 -ed 就當作動詞直接使用，把 be 動詞省掉。判斷法：句尾的 -ed 詞如果前面沒有 be 動詞，多半是漏寫；反過來說，看到 -ed 結尾就先找 be 動詞。",
        "exOkText": "(O) The gate **is locked** at night.",
        "exOkZh": "大門晚上是鎖著的。",
        "exBadText": "(X) The gate **locked** at night.",
        "exBadNote": "錯誤：漏掉 be 動詞 is，locked 是過去分詞需要搭配 be"
      }
    ],
    "traps": [
      "**every 陷阱**：every 後面接單數名詞，考題常把 Monday 變成 Mondays、day 變成 days 當錯誤選項，記住 every 永遠配單數。",
      "**大小寫陷阱**：選項中 monday、mondays 這種寫法常常只差一個字母，會考比對時大小寫也算對錯。",
      "**進行式陷阱**：be closed（狀態）與 be closing（動作）只差 -ing，閱讀測驗常在兩個句子中交換，用來考你分不分得出「狀態」與「正在做」。",
      "**be 動詞陷阱**：is closed 是固定被動結構，選項常給 closed、is close、are closed 來混淆，動詞與 be 動詞要一起看。"
    ],
    "strategy": [
      "把 be + 過去分詞的被動句型獨立成一個句型家族：is closed、is locked、is banned、is forbidden，一起背效率最高。",
      "背一張星期與月份對照表並全部以大寫書寫，測驗前複習一次，專有名詞大小寫就不再是失分點。",
      "記住 every、each、any、some 這一組「單數專用詞」，看到它們就先在後面名詞旁邊畫一個不寫 -s 的提醒符號。",
      "翻譯練習時特別注意中文的「休館、休息」對應 be closed，而不是 be closing，這是本句最關鍵的語意區別。",
      "寫完題目從右往左檢查一次：句尾名詞的單複數、大小寫、be 動詞有沒有漏，三個點各花三秒就能避免大部分失分。"
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
  }
};
