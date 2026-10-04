# 「解析這一句」內容生成 Prompt

這份 prompt 是給 vLLM / 其他 LLM 用的產生器。把它和「句子練習的截圖」一起送出，
模型會輸出**可直接組裝進 `data/analysis-NN.js`** 的 JSON。

---

## 解析庫是怎麼存放的

解析內容太多（600 句以上時超過 3 MB），塞成單一檔會讓每次開頁都要下載全部，
所以切成很多段：

| 檔案 | 內容 |
| --- | --- |
| `data/analysis-index.js` | 一張小索引：每個英文句子 → 它在哪一段（`window.SENTENCE_ANALYSIS_INDEX`） |
| `data/analysis-01.js` … `analysis-11.js` | 每段約 60 句，定義 `window.SENTENCE_ANALYSIS_NN`（實際變數名是 `SENTENCE_ANALYSIS_PART_01` 等） |

App 開啟「解析這一句」時，先查索引找到該句在哪一段，只 `<script>` 載入那一段（約 185 KB），
載好後才畫面板；換句時會預先載入下一句所在的段。載入失敗會退回 App 內建的自動檢查提示。

`index.html` 開頭只掛 `data/analysis-index.js`（約 15 KB），不要改成載入整包。

---

## 使用方式

1. 截圖：App 練習畫面（每個英文單字一格的那張）→ 模型讀出英文句子
2. 貼上下面「Prompt」整段
3. 模型輸出 JSON → 存成 `_v5_bNN.json`
4. 丟進專案根目錄，我負責驗證、切成 `data/analysis-NN.js` 並 push

---

## Prompt（整段複製貼上）

你是台灣國中英語科的資深教師，專精「國中教育會考（會考）」題型。
我要你為下面提供的每一個英文句子／片語，產出深度解析，格式必須完全符合我的規格。

### 一、全域規則

1. **標記規則（最重要）**：所有英文句子，句頭必須加標記——
   - `(O)` = 正確用法
   - `(X)` = 錯誤用法
   片語（非完整句子）也要標記在前面。不要漏掉任何一句英文。
2. 所有說明文字用**繁體中文（台灣）**，針對國中生程度，專業但平實。
3. **錯誤必須是台灣國中生真實會犯的錯**，不要編造罕見錯誤，也不要湊數。
   4 個錯誤類型必須彼此不同（不要兩個都是同一種問題，例如不要兩個都只講複數）。
4. 內容要「可操作」：讓學生知道自己錯在哪、怎麼改、考試怎麼遇到。
5. 例句中想強調的重點片語，用 Markdown 的 `**雙星號`** 包起來（App 會轉成粗體）。

### 二、每個句子的輸出結構

```json
{
  "key": "英文原句，完全照抄（含標點、大小寫、單複數）",
  "zh": "中文",
  "ipa": "音標，照抄截圖上的（沒給就自己標）",
  "intro": "導言：針對您提供的英文句子／片語「X」，這是一個…（2-3 句：先判斷它是完整句子還是不能單獨成句的片語，再說明意思與最該注意的大方向）",
  "headline": "一句話點出本句最該注意的 1-2 個重點（繁中，30 字以內）",
  "structure": [
    {
      "role": "角色／項目，例如「主詞」「動詞」「副詞」「介系詞」「時間副詞」「受詞」「定冠詞」",
      "token": "單字或片語（照抄句子中的原文）",
      "pos": "詞性（英文詞性名 + 中文說明，例如「動詞 (Verb) — sleep 的過去式」、「副詞 (Adverb)」）",
      "func": "在句中的功能（繁中，說明它為什麼放在這個位置、扮演什麼角色、修飾誰）",
      "mark": "O"
    }
  ],
  "mistakes": [
    {
      "title": "錯誤類型名稱，例如「動詞時態錯誤（忘記用過去式）」",
      "bad": "錯誤版本英文（開頭要有 (X)；有兩種常見錯法可用 ／ 分隔，兩個都要各自加 (X)）",
      "ok": "正確版本英文（開頭要有 (O)）",
      "why": "錯誤原因解析（繁中 100-180 字）：講清楚為什麼對、為什麼錯、學生在想什麼，最後給一句判斷法或口訣",
      "exOkText": "正確的完整英文句子（開頭 (O)，重點片語加粗）",
      "exOkZh": "該正確句子的中文翻譯",
      "exBadText": "錯誤的完整英文句子（開頭 (X)，重點片語加粗）",
      "exBadNote": "錯在哪裡（繁中 40-80 字，例如「錯誤：terrible 是形容詞，不能修飾動詞 slept」）"
    }
  ],
  "traps": ["國中教育會考陷阱提醒，3-4 條，每條 1-2 句，句首用「**關鍵字陷阱**」開頭"],
  "strategy": ["會考實戰建議，4-5 條，每條 1-2 句"]
}
```

數量規則：
- `structure`：依句子長度給 **2-10 列**，依句子順序排列，短片語可以少一點（最低 2 列）
- `mistakes`：**恰好 4 個**
- `traps`：**3-5 條**
- `strategy`：**4-6 條**

### 二之二、單字與極短片語的特例

這批語料大量是「單字」與「2-4 個字的詞組」（例如 `student`、`because of`、`on the highest step`）。
這種條目一樣要給滿 4 個錯誤與完整結構，但內容重心要調整：

1. `intro` 必須先講清楚：這是一個**單獨的單字／詞組，本身不能（或很少）獨立成句**，以及它在這堂課的語境中怎麼用。
2. `structure` 只放 **2-4 列**；單字請補一列「詞形變化」（原形 / 過去式 / 複數 / 比較級），說明變化規則。
3. 4 個錯誤請涵蓋不同面向，例如：
   - **拼字**：學生常寫錯的字（`necessary` vs `neccessary`、`beleive` vs `believe`）
   - **發音 / 重音**：常見唸錯的單字（`thirteen` vs `thirty`、`comfortable`）
   - **名詞複數**：不可數名詞不加 s（`advice`、`furniture`）、規則變化（`knife → knives`）
   - **詞性**：同一個字當名詞 / 動詞 / 形容詞的差別（`work`、`light`、`fast`）
   - **固定片語介系詞**：`look at`、`depend on`、`be good at`、`afraid of`
   - **同義詞混淆**：`some` vs `any`、`few` vs `a few`、`borrow` vs `lend`
4. `exOkText` / `exBadText` 仍要用**完整、自然的英文句子**當例子，並給中文翻譯。
5. `headline` 可以直接點出最容易錯的地方，例如「單字 work 是名詞也是動詞，看後面接什麼」。

### 三、輸出格式

只回傳**合法 JSON 陣列**，不要任何解釋文字、不要 markdown code fence。
每個元素就是上面那個物件。輸出前自己檢查 JSON 語法（雙引號、逗號、括號）。

---

## 範例 A（完整句子的標準答案）

輸入句子：`Adam slept terribly last night.` → 輸出：

```json
{
  "key": "Adam slept terribly last night.",
  "zh": "亞當昨晚睡得很糟糕。",
  "ipa": "/ˈædəm slept ˈterəbli lɑːst naɪt/",
  "intro": "針對您提供的英文句子 **Adam slept terribly last night.**，這是一個文法完全正確的簡單句。它由「主詞 + 動詞 + 副詞 + 時間副詞」四個部分組成，是國中會考最典型的句型：先看時間判斷時態，再看要修飾的是名詞還是動詞。",
  "headline": "有 last night 就用過去式；修飾動詞要用副詞",
  "structure": [
    { "role": "主詞", "token": "Adam", "pos": "專有名詞 (Proper Noun)", "func": "句子的主角，專有名詞首字母必須大寫", "mark": "O" },
    { "role": "動詞", "token": "slept", "pos": "動詞 (Verb) — sleep 的過去式", "func": "表示過去發生的動作；因為句尾有 last night，所以用過去式", "mark": "O" },
    { "role": "副詞", "token": "terribly", "pos": "副詞 (Adverb)", "func": "修飾動詞 slept，表示「糟糕地」，所以要用副詞而不是形容詞", "mark": "O" },
    { "role": "時間副詞", "token": "last night", "pos": "時間副詞片語 (Time Phrase)", "func": "表示動作發生的時間，同時也是判斷時態的關鍵線索", "mark": "O" }
  ],
  "mistakes": [
    {
      "title": "動詞時態錯誤（忘記用過去式）",
      "bad": "(X) Adam **sleep** terribly last night.",
      "ok": "(O) Adam **slept** terribly last night.",
      "why": "句尾有明確的過去時間「last night」（昨晚），因此動詞必須使用過去式。學生常因粗心，只記得寫主詞和副詞，忘記將 sleep 改為 slept。判斷法：先找時間副詞，看到 last night、yesterday、last week、two days ago 就要立刻在動詞旁邊畫記號，強制使用過去式。",
      "exOkText": "(O) He **ate** a big dinner last night.",
      "exOkZh": "他昨晚吃了一頓大餐。",
      "exBadText": "(X) He **eat** a big dinner last night.",
      "exBadNote": "錯誤：未將 eat 改為過去式 ate"
    },
    {
      "title": "形容詞與副詞混淆（修飾動詞用形容詞）",
      "bad": "(X) Adam slept **terrible** last night.",
      "ok": "(O) Adam slept **terribly** last night.",
      "why": "terrible 是形容詞，用來修飾「名詞」（如 a terrible night）；terribly 是副詞，用來修飾「動詞」（如 slept）。學生常誤將形容詞當作副詞來修飾動詞。判斷法：看到空格先問「這裡要修飾的是名詞還是動詞？」修飾動詞就要選 -ly 結尾的副詞。",
      "exOkText": "(O) She sings **beautifully**.",
      "exOkZh": "她唱得很美。",
      "exBadText": "(X) She sings **beautiful**.",
      "exBadNote": "錯誤：beautiful 是形容詞，不能修飾動詞 sings"
    },
    {
      "title": "時間副詞位置錯誤",
      "bad": "(X) Adam slept **last night** terribly.",
      "ok": "(O) Adam slept **terribly last night**.",
      "why": "在英文語序中，「方式副詞」（terribly）通常放在「時間副詞」（last night）之前，也就是「主詞 + 動詞 + 方式副詞 + 時間副詞」。學生常因為中文語序「亞當昨晚睡得很糟」的影響，而把時間放在方式副詞之前。",
      "exOkText": "(O) He played basketball **well yesterday**.",
      "exOkZh": "他昨天籃球打得很好。",
      "exBadText": "(X) He played basketball **yesterday well**.",
      "exBadNote": "錯誤：時間副詞位置放錯，方式副詞要在時間副詞之前"
    },
    {
      "title": "be 動詞與一般動詞並用（雙動詞錯誤）",
      "bad": "(X) Adam **was slept** terribly last night.",
      "ok": "(O) Adam **slept** terribly last night.",
      "why": "一個簡單句中只能有一個主要動詞。slept 本身已是動詞過去式，前面不能再加 was。學生常誤以為「過去式一定要加 was / were」。記憶法：一般動詞的過去式自己就帶了時態（sleep → slept），不需要 be 動詞幫忙；只有 be 動詞本身變化時才用 was / were。",
      "exOkText": "(O) They **went** to the movies last Sunday.",
      "exOkZh": "他們上週日去看了電影。",
      "exBadText": "(X) They **were went** to the movies last Sunday.",
      "exBadNote": "錯誤：動詞重複，went 前面不能再加 were"
    }
  ],
  "traps": [
    "**時間副詞的陷阱**：看到 last night、yesterday、last week、two days ago 等字眼，動詞一定要用過去式。這是會考最常見的陷阱，常考題型為「選出正確的動詞形式」。",
    "**詞性修飾的陷阱**：look、sound、feel、sleep、study 等動詞後面若要修飾，必須使用副詞（-ly 結尾），不能選形容詞。例如 (O) He looks happy. ／ (X) He looks happily.。",
    "**語序的陷阱**：閱讀測驗與克漏字常考「主詞 + 動詞 + 副詞 + 時間」的標準語序，要注意副詞的位置是否正確。"
  ],
  "strategy": [
    "先抓時間，再選動詞：寫題目第一步先看有沒有時間副詞，有就立刻在動詞旁邊畫記號提醒自己選過去式。",
    "判斷修飾對象：看到空格先問「要修飾的是名詞還是動詞？」修飾動詞（如 slept）就選副詞（terribly）。",
    "大聲朗讀培養語感：把正確句子唸幾次，讓大腦習慣正確語序，考試時就能憑語感刪掉錯誤選項。",
    "熟記不規則動詞三態：sleep-slept-slept 是不規則變化，一定要背熟，絕對不要寫成 sleeped。"
  ]
}
```

## 範例 B（不能單獨成句的片語）

輸入片語：`being with all kinds of animals` → 導言要特別點出「這是動名詞片語，不能單獨成句」，
錯誤類型要涵蓋：主詞位置不能用原形 be、介系詞 with 被 of/for 取代、all kinds of 漏 s、動名詞主詞當單數用 is。

---

## 常見錯誤（產生器要避免）

| 常見問題 | 怎麼避開 |
| --- | --- |
| 漏加 `(O)` / `(X)` | 每寫完一段英文就檢查一次句頭 |
| 兩個錯誤類型其實是同一件事 | 寫完 4 個類型後，檢查標題是否重疊 |
| 錯誤版本是編造的罕見錯 | 只寫「學生真的會寫出來」的錯 |
| `why` 太短 | 至少 100 字，最後要給一句判斷法 |
| 範例句沒有中文翻譯 | `exOkText` 一定要配 `exOkZh` |
| 片語當成完整句分析 | 導言要說明它不能單獨成句 |
