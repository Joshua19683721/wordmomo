// data/sentences.js — 共用句庫
//
// 格式：一行一句，用「=」或「＝」隔開三段
//   英文 = 中文 = 音標
// 例：This = 這 = /ðɪs/
//
// 怎麼用：
//   1. App 上「📥 句庫管理」→ 匯入 → 按「下載 sentences.js」拿到本檔案的新內容，
//      或直接複製貼回這個檔案。
//   2. 存檔後 git push，所有裝置開啟就會自動讀到這份句庫。
//
// 這個檔案留空（或整份刪掉）時，App 會改用 index.html 內建的預設句庫。

window.SENTENCE_BANK = `
This = 這 = /ðɪs/
This is = 這是 = /ðɪs ɪz/
not planned = 未預先計劃的 = /nɑːt plænd/
This is not planned = 這不是預先計劃好的 = /ðɪs ɪz nɑːt plænd/
Oh no, this is not planned = 噢不，這完全不在計劃中 = /əʊ nəʊ, ðɪs ɪz nɑːt plænd/
Mr. President = 總統先生 = /ˈmɪstər ˈprezɪdənt/
calling = 來電 = /ˈkɔːlɪŋ/
If it wasn't because of you calling = 如果不是因為您打電話來 = /ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ/
I am on stage = 我正在舞台上 = /aɪ æm ɑːn steɪdʒ/
If it wasn't because of you calling, I am on stage with the besties. = 如果不是因為您打電話來，我現在正跟好朋友在台上呢。 = /ɪf ɪt wɑːznˈt bɪˈkəz əv juː ˈkɔːlɪŋ, aɪ æm ɑːn steɪdʒ wɪð ðə ˈbestiːz/
kinds of animals = 各種動物 = /ˈkaɪndz əv ˈænɪ.məlz/
There are many kinds of animals in the zoo. = 動物園裡有許多種動物。 = /ðeər ɑː ˈmeni ˈkaɪndz əv ˈænɪ.məlz ɪn ðə zuː/
How many kinds of animals can you see in this picture? = 你在這張圖片裡看得到多少種動物？ = /haʊ ˈmeni ˈkaɪndz əv ˈænɪ.məlz kən juː siː ɪn ðɪs ˈpɪkʃə/
My brother is interested in animals. = 我弟弟對動物感興趣。 = /maɪ ˈbrʌðər ɪz ˈɪntrəstɪd ɪn ˈænɪ.məlz/
The elephant is bigger than the horse. = 大象比馬大。 = /ðiː ˈelɪfənt ɪz ˈbɪɡər ðæn ðə hɔːs/
She has three pets at home. = 她家裡有三隻寵物。 = /ʃiː hæz θriː pets ət həʊm/
These animals are endangered. = 這些動物是瀕危的。 = /ðiːz ˈænɪ.məlz ɑːr ɪnˈdaʒəd/
We should protect animals. = 我們應該保護動物。 = /wiː ʃʊd prəˈtekt ˈænɪ.məlz/
Do not feed the animals. = 不要餵食動物。 = /duː nəʊt fiːd ðiː ˈænɪ.məlz/
The zoo is closed every Monday. = 動物園每週一休館。 = /ðə zuː ɪz kləʊzd ˈevri ˈmʌndeɪ/
`;
