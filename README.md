# WordMomo 🍑

> 互動式英語單字學習網站 — 純 HTML / CSS / JavaScript，不需要安裝任何東西，開瀏覽器就能用。

🌐 **線上版**：<https://joshua19683721.github.io/wordmomo/>

把單字「看過」不難，難的是記住。WordMomo 用**單字卡 + 間隔重複 + 即時測驗**三個機制，
讓你在最適合的時間看到最適合的單字。

---

## ✨ 功能

| 功能 | 說明 |
|---|---|
| 🎴 **單字卡** | 3D 翻卡，點一下看中文、例句與翻譯 |
| 🔊 **真人發音** | 用瀏覽器內建語音引擎，可調語速、挑選音色 |
| 🧠 **間隔重複** | Leitner 盒系統：答對就拉長複習間隔，答錯就打回重練 |
| ✎ **四種測驗** | 英翻中、中翻英、聽力選擇、聽寫拼字 |
| 📊 **學習統計** | 14 天複習曲線、13 週日曆、各字庫掌握度 |
| 🔥 **連續天數** | 每天完成目標就累積，解鎖習慣 |
| 🌗 **深色模式** | 跟著系統或手動切換 |
| ⌨️ **鍵盤快捷鍵** | 空白翻面、方向鍵評分、數字鍵選答案 |
| 📱 **手機適配** | 底部導覽列，手機上一樣順手 |
| 💾 **離線可用** | 進度存在瀏覽器裡，不上傳任何資料 |
| 🗂 **進度匯出／匯入** | 換裝置或換瀏覽器也不怕 |

---

## 🚀 快速開始

### 線上使用

開啟 GitHub Pages 網址（見下方「部署」段落）即可。

### 本機執行

因為用了 `fetch` 以外的功能其實都能直接開，但建議用一個小伺服器，
語音與 localStorage 在 `file://` 底下偶爾會有限制：

```bash
# 選擇其中一種
npx serve .
python -m http.server 8000
```

然後打開 <http://localhost:8000>。

---

## 📁 檔案結構

```
wordmomo/
├── index.html              ← 頁面骨架（導覽列、四個頁面的容器、設定抽屜）
├── css/
│   └── style.css           ← 全部樣式，分成 6 個區塊，改外觀看這裡
├── js/
│   ├── data.js             ← ★ 單字資料庫（要加單字改這裡）
│   ├── core.js             ← 儲存、間隔重複、語音、統計（不畫畫面的邏輯）
│   └── app.js              ← 四個頁面的畫面與互動
├── assets/
│   └── favicon.svg         ← 網站圖示
├── .github/
│   └── workflows/
│       └── pages.yml       ← 自動部署到 GitHub Pages
├── LICENSE
└── .gitignore
```

**三分法**：`data.js` 是資料、`core.js` 是腦、`app.js` 是臉、`style.css` 是衣服。
想加單字只碰 `data.js`，想改邏輯碰 `core.js`，想改畫面碰 `app.js` 和 `style.css`。

---

## ✏️ 我要新增／修改單字

打開 `js/data.js`，照著現有的格式加一筆：

```js
{
  w: 'resilient',                          // 英文單字（小寫、單一英文單字）
  ipa: '/rɪˈzɪliənt/',                      // 音標
  pos: 'adj.',                             // 詞性：n. v. adj. adv. prep. conj. pron. num.
  zh: '有韌性的、彈性的',                   // 中文解釋
  en: 'A resilient team bounces back from setbacks.',   // 英文例句
  zhEn: '有韌性的團隊能從挫折中恢復過來。'               // 例句翻譯
}
```

放進某個字庫的 `words` 陣列裡就完成了，不需要改其他檔案。
新增的字會自動出現在單字卡、測驗與統計裡面。

---

## 🎨 我要改外觀

`css/style.css` 最上面有「設計變數」，改那幾行就能換掉整體感覺：

```css
:root {
  --brand-500: #6d5efc;   /* 主色：改這個 */
  --r-lg: 24px;           /* 圓角 */
  --topbar-h: 64px;       /* 頂部列高度 */
}
```

深色 / 淺色兩套配色分別在 `html[data-theme="dark"]` 和 `html[data-theme="light"]` 裡。

---

## ⌨️ 鍵盤快捷鍵

| 畫面 | 按鍵 | 功能 |
|---|---|---|
| 單字卡 | `空白` / `Enter` | 翻面 |
| 單字卡 | `→` | 標記「很簡單」 |
| 單字卡 | `←` | 標記「還不熟」 |
| 聽力測驗 | `空白` / `Enter` | 重播發音 |
| 測驗 | `1` `2` `3` `4` | 選第 N 個選項 |
| 測驗 | `Enter` | 下一題 |

---

## 🔗 深層連結

網址可以直接指到某個畫面，可以加進書籤或分享：

| 網址 | 會開到哪裡 |
|---|---|
| `#/` | 儀表板 |
| `#/study` | 單字卡（先選字庫） |
| `#/study/tech` | 直接進入「科技網路」字庫的單字卡 |
| `#/quiz` | 測驗設定畫面 |
| `#/quiz/listen` | 預選「聽力測驗」 |
| `#/quiz/listen/daily` | 直接用「日常生活」字庫開始聽力測驗 |
| `#/quiz/spell/all` | 直接用全部字庫開始聽寫 |

---

## 🚀 部署到 GitHub Pages

`.github/workflows/pages.yml` 已經設定好了，**每次 push 到 `main` 就會自動部署**，
大約 30 秒到 1 分鐘後線上版就會更新。

🌐 **線上網址：https://joshua19683721.github.io/wordmomo/**

Pages 的來源已經設為 **GitHub Actions** 並啟用完成，不需要再設定。
若日後要查看或修改：GitHub 倉庫 → **Settings** → 左側 **Pages**。

整個流程就是：

```bash
git add .
git commit -m "改了些什麼"
git push        # 推上去，線上版自動更新
```

---

## 🧱 技術說明

- **沒有框架、沒有建置步驟、沒有依賴套件** — 純粹的 HTML + CSS + 原生 JavaScript（ES5 語法）
- **語音**：Web Speech API（`speechSynthesis`），不需要 API 金鑰。Chrome / Edge 效果最好
- **儲存**：`localStorage`，單一鍵 `wordmomo.v1`，資料永遠留在使用者的裝置上
- **間隔重複**：Leitner 盒系統為基礎，加上難度微調（7 個盒子，最長 32 天後再複習）
- **無障礙**：語意化標籤、鍵盤可操作、focus 樣式、支援 `prefers-reduced-motion`

---

## 📄 授權

[MIT](LICENSE) © Joshua19683721
