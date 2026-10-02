/* ============================================================
   WordMomo — 內建字庫資料（漸進式）
   ------------------------------------------------------------
   每一條「漸進鏈」(chain) 是一組由簡到難的練習步驟：
     單字 → 詞組 → 句子 → 完整段落

   每個步驟 (step) 的欄位：
     en   英文內容（單字／詞組／句子／段落）
     zh   中文對應
     ipa  音標，可留空字串（整句通常不標音標）

   ⚠ 想新增或修改內容，建議直接在網頁上用「字庫」頁編輯，
     再從那裡匯出成 JS 片段貼回這個檔案，就會跟著 GitHub 一起更新。
   ============================================================ */
window.WORDMOMO_DATA = {
  version: 2,
  packs: [
    {
      id: 'daily',
      name: '日常生活',
      icon: '☕',
      level: 'A1',
      desc: '每天都在用的核心單字',
      chains: [
        {
          id: 'daily-001',
          steps: [
            { en: 'grocery', zh: '雜貨、食品雜貨', ipa: '/ˈɡroʊsəri/' },
            { en: 'I need to pick up some groceries before dinner tonight.', zh: '我今晚做飯前得先去買點雜貨。', ipa: '' }
          ]
        },
        {
          id: 'daily-002',
          steps: [
            { en: 'laundry', zh: '待洗衣物、洗衣房', ipa: '/ˈlɔndri/' },
            { en: 'I still have to do the laundry before it gets too late.', zh: '還沒洗的衣服，得趁早處理掉。', ipa: '' }
          ]
        },
        {
          id: 'daily-003',
          steps: [
            { en: 'errand', zh: '差事、跑腿小事', ipa: '/ˈerənd/' },
            { en: 'Mom asked me to run a few errands after work.', zh: '媽媽叫我下班後順便辦幾件事。', ipa: '' }
          ]
        },
        {
          id: 'daily-004',
          steps: [
            { en: 'chore', zh: '家務、雜務', ipa: '/tʃɔr/' },
            { en: 'Taking out the trash is my least favorite chore.', zh: '倒垃圾是我最不喜歡的家務。', ipa: '' }
          ]
        },
        {
          id: 'daily-005',
          steps: [
            { en: 'fridge', zh: '冰箱', ipa: '/frɪdʒ/' },
            { en: 'There is nothing left in the fridge for breakfast.', zh: '冰箱裡已經沒東西可以當早餐了。', ipa: '' }
          ]
        },
        {
          id: 'daily-006',
          steps: [
            { en: 'closet', zh: '衣櫃、壁櫥', ipa: '/ˈklɑzət/' },
            { en: 'My winter coats are buried at the back of the closet.', zh: '我的冬天外套都擠在衣櫃最裡面。', ipa: '' }
          ]
        },
        {
          id: 'daily-007',
          steps: [
            { en: 'drawer', zh: '抽屜', ipa: '/drɔr/' },
            { en: 'I cannot find my keys in any of these drawers.', zh: '這些抽屜裡我哪一個都找不到鑰匙。', ipa: '' }
          ]
        },
        {
          id: 'daily-008',
          steps: [
            { en: 'blanket', zh: '毯子、毛毯', ipa: '/ˈblæŋkɪt/' },
            { en: 'She pulled a warm blanket over her shoulders.', zh: '她把一條暖毯披在肩上。', ipa: '' }
          ]
        },
        {
          id: 'daily-009',
          steps: [
            { en: 'broom', zh: '掃把', ipa: '/bruːm/' },
            { en: 'He swept the floor with a straw broom.', zh: '他用竹掃把掃了地板。', ipa: '' }
          ]
        },
        {
          id: 'daily-010',
          steps: [
            { en: 'trash', zh: '垃圾、廢物', ipa: '/træʃ/' },
            { en: 'Please take the trash out before the garbage truck comes.', zh: '垃圾車來之前請把垃圾拿出去。', ipa: '' }
          ]
        },
        {
          id: 'daily-011',
          steps: [
            { en: 'recycle', zh: '回收、再利用', ipa: '/ˌriːˈsaɪkl/' },
            { en: 'In Taiwan we recycle bottles and cans separately.', zh: '在台灣我們會把瓶罐另外做資源回收。', ipa: '' }
          ]
        },
        {
          id: 'daily-012',
          steps: [
            { en: 'sink', zh: '水槽、瀉水槽', ipa: '/sɪŋk/' },
            { en: 'The kitchen sink is leaking again this week.', zh: '廚房水槽這個星期又漏水了。', ipa: '' }
          ]
        },
        {
          id: 'daily-013',
          steps: [
            { en: 'stove', zh: '爐子、瓦斯爐', ipa: '/stoʊv/' },
            { en: 'She is boiling water on the gas stove.', zh: '她正在瓦斯爐上煮開水。', ipa: '' }
          ]
        },
        {
          id: 'daily-014',
          steps: [
            { en: 'oven', zh: '烤箱', ipa: '/ˈʌvən/' },
            { en: 'Roast the chicken in the oven for forty minutes.', zh: '把雞放進烤箱烤四十分鐘。', ipa: '' }
          ]
        },
        {
          id: 'daily-015',
          steps: [
            { en: 'pantry', zh: '食材儲藏室、食品櫃', ipa: '/ˈpæntri/' },
            { en: 'Our pantry is stocked with rice and instant noodles.', zh: '我們的儲藏室擺滿了米和泡麵。', ipa: '' }
          ]
        },
        {
          id: 'daily-016',
          steps: [
            { en: 'recipe', zh: '食譜、做法', ipa: '/ˈresəpi/' },
            { en: 'This recipe only needs four ingredients and thirty minutes.', zh: '這道做法只需要四種材料、三十分鐘。', ipa: '' }
          ]
        },
        {
          id: 'daily-017',
          steps: [
            { en: 'ingredient', zh: '食材、材料、成分', ipa: '/ɪnˈɡriːdiənt/' },
            { en: 'Fresh ginger is the key ingredient in this soup.', zh: '新鮮的薑是這道湯的關鍵材料。', ipa: '' }
          ]
        },
        {
          id: 'daily-018',
          steps: [
            { en: 'appetite', zh: '食慾、胃口', ipa: '/ˈæpɪtaɪt/' },
            { en: 'A long walk always kills my appetite.', zh: '走太久的路之後我總是完全吃不下。', ipa: '' }
          ]
        },
        {
          id: 'daily-019',
          steps: [
            { en: 'leftover', zh: '剩下的食物、殘菜', ipa: '/ˈleftoʊvər/' },
            { en: 'I packed the leftover rice into my lunch box.', zh: '我把剩下的飯裝進了便當盒。', ipa: '' }
          ]
        },
        {
          id: 'daily-020',
          steps: [
            { en: 'seasoning', zh: '調味料、調味品', ipa: '/ˈsiːzənɪŋ/' },
            { en: 'Add a little more seasoning if you like it spicy.', zh: '如果你喜歡辣，可以再多加一點調味。', ipa: '' }
          ]
        },
        {
          id: 'daily-021',
          steps: [
            { en: 'portion', zh: '一份、份量', ipa: '/ˈpɔːrʃən/' },
            { en: 'The portions here are huge, so order carefully.', zh: '這裡的份量很大，點餐要留心。', ipa: '' }
          ]
        },
        {
          id: 'daily-022',
          steps: [
            { en: 'dessert', zh: '甜點、餐後甜食', ipa: '/dɪˈzɜːrt/' },
            { en: 'The strawberry cake is my favorite dessert here.', zh: '草莓蛋糕是我在這裡最愛的甜點。', ipa: '' }
          ]
        },
        {
          id: 'daily-023',
          steps: [
            { en: 'snack', zh: '點心、小吃', ipa: '/snæk/' },
            { en: 'Keep a healthy snack in your desk drawer.', zh: '在你桌子的抽屜裡放個健康小點心。', ipa: '' }
          ]
        },
        {
          id: 'daily-024',
          steps: [
            { en: 'rent', zh: '租（房子）、出租', ipa: '/rɛnt/' },
            { en: 'We rent a small apartment near the train station.', zh: '我們在火車站附近租了一間小公寓。', ipa: '' }
          ]
        },
        {
          id: 'daily-025',
          steps: [
            { en: 'utility', zh: '水電費、公共事業', ipa: '/juːˈtɪləti/' },
            { en: 'My utility bills are much higher during summer.', zh: '我夏天的水電費高出不少。', ipa: '' }
          ]
        },
        {
          id: 'daily-026',
          steps: [
            { en: 'neighbor', zh: '鄰居、鄰座', ipa: '/ˈneɪbər/' },
            { en: 'My neighbor waters our plants when we travel.', zh: '我們出門旅行時，鄰居會幫我們澆花。', ipa: '' }
          ]
        },
        {
          id: 'daily-027',
          steps: [
            { en: 'landlord', zh: '房東、業主', ipa: '/ˈlændlɔːrd/' },
            { en: 'Our landlord raised the rent again this year.', zh: '我們的房東今年又調漲房租了。', ipa: '' }
          ]
        },
        {
          id: 'daily-028',
          steps: [
            { en: 'deposit', zh: '押金、訂金', ipa: '/dɪˈpɑzɪt/' },
            { en: 'The landlord wants a two-month deposit upfront.', zh: '房東希望先預收兩個月的押金。', ipa: '' }
          ]
        },
        {
          id: 'daily-029',
          steps: [
            { en: 'commute', zh: '通勤、上下班往返', ipa: '/kəˈmjuːt/' },
            { en: 'Her commute takes about forty minutes each way.', zh: '她每天通勤來回各約四十分鐘。', ipa: '' }
          ]
        },
        {
          id: 'daily-030',
          steps: [
            { en: 'traffic', zh: '交通、車流', ipa: '/ˈtræfɪk/' },
            { en: 'The traffic on the highway is terrible every morning.', zh: '每天早上高速公路的車流都很糟。', ipa: '' }
          ]
        },
        {
          id: 'daily-031',
          steps: [
            { en: 'humid', zh: '潮濕的、濕熱的', ipa: '/ˈhjuːmɪd/' },
            { en: 'Taipei gets quite humid in the middle of summer.', zh: '台北在盛夏時分相當潮濕。', ipa: '' }
          ]
        },
        {
          id: 'daily-032',
          steps: [
            { en: 'sunny', zh: '晴朗的、有陽光的', ipa: '/ˈsʌni/' },
            { en: 'It feels warmer on sunny winter afternoons.', zh: '冬天的晴朗午後感覺比較暖和。', ipa: '' }
          ]
        },
        {
          id: 'daily-033',
          steps: [
            { en: 'balcony', zh: '陽台、露台', ipa: '/ˈbælksəni/' },
            { en: 'We dry the laundry on the small balcony.', zh: '我們在小小的陽台上晾衣服。', ipa: '' }
          ]
        },
        {
          id: 'daily-034',
          steps: [
            { en: 'mailbox', zh: '信箱', ipa: '/ˈmeɪkbɔːks/' },
            { en: 'There is a package waiting in your mailbox.', zh: '你的信箱裡有一個包裹在等你。', ipa: '' }
          ]
        },
        {
          id: 'daily-035',
          steps: [
            { en: 'furniture', zh: '家具', ipa: '/ˈfɜːrnɪtʃər/' },
            { en: 'The old wooden furniture takes up half the room.', zh: '那些舊木製家具占掉半個房間。', ipa: '' }
          ]
        },
        {
          id: 'daily-036',
          steps: [
            { en: 'tidy', zh: '整潔的、乾淨的', ipa: '/ˈtaɪdi/' },
            { en: 'He keeps his bedroom surprisingly tidy for a teenager.', zh: '一個青少年居然能讓臥室這麼整潔。', ipa: '' }
          ]
        },
        {
          id: 'daily-037',
          steps: [
            { en: 'messy', zh: '凌亂的、髒亂的', ipa: '/ˈmesi/' },
            { en: 'My desk gets messy whenever I rush a project.', zh: '我趕專案的時候，書桌總是亂得不像話。', ipa: '' }
          ]
        },
        {
          id: 'daily-038',
          steps: [
            { en: 'fix', zh: '修理、修正', ipa: '/fɪks/' },
            { en: 'Can you fix this leaky kitchen tap tonight?', zh: '你今晚能把這個漏水的廚房龍頭修好嗎？', ipa: '' }
          ]
        },
        {
          id: 'daily-039',
          steps: [
            { en: 'borrow', zh: '借入、借用', ipa: '/ˈbɑroʊ/' },
            { en: 'Could I borrow your charger for an hour?', zh: '我可以借用你的充電器一小時嗎？', ipa: '' }
          ]
        },
        {
          id: 'daily-040',
          steps: [
            { en: 'lend', zh: '借出、貸給', ipa: '/lɛnd/' },
            { en: 'My neighbor lends me her umbrella every rainy day.', zh: '鄰居每逢下雨天都會把傘借給我。', ipa: '' }
          ]
        }
      ]
    },
    {
      id: 'business',
      name: '商務職場',
      icon: '💼',
      level: 'B1',
      desc: '面試、會議、Email 常用詞',
      chains: [
        {
          id: 'business-001',
          steps: [
            { en: 'resume', zh: '履歷、Résumé', ipa: '/ˈrezəmeɪ/' },
            { en: 'I updated my resume before sending it to recruiters.', zh: '寄給招募人員之前，我先更新了我的履歷。', ipa: '' }
          ]
        },
        {
          id: 'business-002',
          steps: [
            { en: 'interview', zh: '面試、訪談', ipa: '/ˈɪntərvjuː/' },
            { en: 'Her interview went better than she expected.', zh: '她的面試表現比預期的好。', ipa: '' }
          ]
        },
        {
          id: 'business-003',
          steps: [
            { en: 'salary', zh: '薪資、薪水', ipa: '/ˈsæləri/' },
            { en: 'The starting salary is competitive for fresh graduates.', zh: '對新鮮人來說，起薪算是有競爭力。', ipa: '' }
          ]
        },
        {
          id: 'business-004',
          steps: [
            { en: 'payroll', zh: '薪資發放、薪資名冊', ipa: '/ˈpeɪroʊl/' },
            { en: 'Payroll usually processes at the end of each month.', zh: '薪水通常在月底核發。', ipa: '' }
          ]
        },
        {
          id: 'business-005',
          steps: [
            { en: 'promotion', zh: '升遷、晉升', ipa: '/prəˈmoʊʃən/' },
            { en: 'He got a promotion after only eight months.', zh: '他才做八個月就獲得升遷。', ipa: '' }
          ]
        },
        {
          id: 'business-006',
          steps: [
            { en: 'colleague', zh: '同事、同仁', ipa: '/ˈkɑːliːɡ/' },
            { en: 'A former colleague recommended me for this role.', zh: '一位前同事推薦我來應徵這個職缺。', ipa: '' }
          ]
        },
        {
          id: 'business-007',
          steps: [
            { en: 'supervisor', zh: '主管、督導', ipa: '/ˈsuːpərvaɪzər/' },
            { en: 'My supervisor always gives clear feedback on drafts.', zh: '我的主管總會對草稿給明確的回饋。', ipa: '' }
          ]
        },
        {
          id: 'business-008',
          steps: [
            { en: 'deadline', zh: '截止期限、最後期限', ipa: '/ˈdedlaɪn/' },
            { en: 'We moved the deadline because of the heavy rain.', zh: '因為大雨，我們把截止日期往後延了。', ipa: '' }
          ]
        },
        {
          id: 'business-009',
          steps: [
            { en: 'schedule', zh: '行程表、時間表', ipa: '/ˈskedʒuːl/' },
            { en: 'Let me check my schedule and confirm by tomorrow.', zh: '讓我確認一下行程，明天回覆你。', ipa: '' }
          ]
        },
        {
          id: 'business-010',
          steps: [
            { en: 'agenda', zh: '議程', ipa: '/əˈdʒendə/' },
            { en: 'Could you send the agenda before the meeting starts?', zh: '你可以在會議開始前把議程傳給我嗎？', ipa: '' }
          ]
        },
        {
          id: 'business-011',
          steps: [
            { en: 'minutes', zh: '會議紀錄', ipa: '/ˈmɪnɪts/' },
            { en: 'Who is responsible for writing the minutes each week?', zh: '每週負責撰寫會議紀錄的是誰呢？', ipa: '' }
          ]
        },
        {
          id: 'business-012',
          steps: [
            { en: 'invoice', zh: '發票、請款單', ipa: '/ˈɪnvɔɪs/' },
            { en: 'Please send the invoice to our accounting department.', zh: '請把發票寄給我們的會計部門。', ipa: '' }
          ]
        },
        {
          id: 'business-013',
          steps: [
            { en: 'budget', zh: '預算', ipa: '/ˈbʌdʒɪt/' },
            { en: 'The marketing budget was cut by half this quarter.', zh: '這個季度的行銷預算被砍掉一半。', ipa: '' }
          ]
        },
        {
          id: 'business-014',
          steps: [
            { en: 'expense', zh: '開支、費用', ipa: '/ɪkˈspens/' },
            { en: 'Please attach the receipt to every expense report.', zh: '每份報帳單請附上收據。', ipa: '' }
          ]
        },
        {
          id: 'business-015',
          steps: [
            { en: 'revenue', zh: '營收、收入', ipa: '/ˈrevənuː/' },
            { en: 'Our revenue grew even during the slow season.', zh: '即使在淡季，我們的營收還是成長。', ipa: '' }
          ]
        },
        {
          id: 'business-016',
          steps: [
            { en: 'profit', zh: '利潤、盈餘', ipa: '/ˈprɑːfɪt/' },
            { en: 'The company turned a small profit this quarter.', zh: '公司這一季賺到一點點盈餘。', ipa: '' }
          ]
        },
        {
          id: 'business-017',
          steps: [
            { en: 'stakeholder', zh: '利害關係人、攸關者', ipa: '/ˈsteɪkhoʊldər/' },
            { en: 'Every stakeholder wants a different deadline.', zh: '每位利害關係人都想要不同的截止日期。', ipa: '' }
          ]
        },
        {
          id: 'business-018',
          steps: [
            { en: 'recruit', zh: '招募、招聘', ipa: '/rɪˈkruːt/' },
            { en: 'We plan to recruit three interns this summer.', zh: '我們計畫今年暑假招三名實習生。', ipa: '' }
          ]
        },
        {
          id: 'business-019',
          steps: [
            { en: 'onboard', zh: '使熟悉環境、帶新人上手', ipa: '/ˈɑːnbɔːrd/' },
            { en: 'We onboard new hires with a two-day orientation.', zh: '我們用兩天的訓練讓新進人員熟悉環境。', ipa: '' }
          ]
        },
        {
          id: 'business-020',
          steps: [
            { en: 'negotiate', zh: '協商、談判', ipa: '/nɪˈɡoʊʃieɪt/' },
            { en: 'Good managers learn to negotiate without sounding rude.', zh: '好的主管懂得協商又不會聽起來無禮。', ipa: '' }
          ]
        },
        {
          id: 'business-021',
          steps: [
            { en: 'contract', zh: '合約、契約', ipa: '/ˈkɑːntrækt/' },
            { en: 'Please read the contract carefully before you sign.', zh: '簽約前請仔細閱讀合約。', ipa: '' }
          ]
        },
        {
          id: 'business-022',
          steps: [
            { en: 'client', zh: '客戶、委託人', ipa: '/ˈklaɪənt/' },
            { en: 'Our biggest client asked for a longer timeline.', zh: '我們最大的客戶要求更長的交付時間。', ipa: '' }
          ]
        },
        {
          id: 'business-023',
          steps: [
            { en: 'investor', zh: '投資人', ipa: '/ɪnˈvestər/' },
            { en: 'Investors want to see steady growth every quarter.', zh: '投資人想看到每一季穩定的成長。', ipa: '' }
          ]
        },
        {
          id: 'business-024',
          steps: [
            { en: 'quarterly', zh: '每季的、季度', ipa: '/ˈkwɔrtərli/' },
            { en: 'We hold a quarterly review with the whole team.', zh: '我們每季度和整個團隊做一次檢討。', ipa: '' }
          ]
        },
        {
          id: 'business-025',
          steps: [
            { en: 'annual', zh: '每年的、年度的', ipa: '/ˈænjuəl/' },
            { en: 'The annual sales conference happens in Taipei.', zh: '年度業務會議在台北舉行。', ipa: '' }
          ]
        },
        {
          id: 'business-026',
          steps: [
            { en: 'bonus', zh: '獎金、紅利', ipa: '/ˈboʊnəs/' },
            { en: 'Everyone got a bonus after the record quarter.', zh: '創紀錄的那一季結束後大家都拿到了獎金。', ipa: '' }
          ]
        },
        {
          id: 'business-027',
          steps: [
            { en: 'resign', zh: '辭職、辭去', ipa: '/rɪˈzaɪn/' },
            { en: 'It is hard to resign without another offer lined up.', zh: '還沒接下新工作時要提出辭職很困難。', ipa: '' }
          ]
        },
        {
          id: 'business-028',
          steps: [
            { en: 'delegate', zh: '授權、委派', ipa: '/ˈdelɪɡət/' },
            { en: 'A good leader delegates instead of doing everything.', zh: '好的主管會授權，而不是什麼都自己來。', ipa: '' }
          ]
        },
        {
          id: 'business-029',
          steps: [
            { en: 'feedback', zh: '回饋意見、回應', ipa: '/ˈfiːdbæk/' },
            { en: 'Thanks for the honest feedback on my presentation.', zh: '謝謝你對我的簡報給予誠實的建議。', ipa: '' }
          ]
        },
        {
          id: 'business-030',
          steps: [
            { en: 'workshop', zh: '工作坊、研習營', ipa: '/ˈwɜːrkʃɑːp/' },
            { en: 'The workshop filled up within an hour.', zh: '那場工作坊在一小時內就額滿了。', ipa: '' }
          ]
        },
        {
          id: 'business-031',
          steps: [
            { en: 'intern', zh: '實習生、Intern', ipa: '/ˈɪntɜːrn/' },
            { en: 'Our intern built a small dashboard for the team.', zh: '我們的實習生幫團隊做了一個小儀表板。', ipa: '' }
          ]
        },
        {
          id: 'business-032',
          steps: [
            { en: 'forecast', zh: '預測、預估', ipa: '/ˈfɔːrkæst/' },
            { en: 'Sales managers lowered their forecast for next month.', zh: '業務經理下修了下個月的預估。', ipa: '' }
          ]
        },
        {
          id: 'business-033',
          steps: [
            { en: 'merger', zh: '併購、合併', ipa: '/ˈmɜːrdʒər/' },
            { en: 'The merger created one of the largest teams here.', zh: '這樁併購打造了這裡數一數二的大團隊。', ipa: '' }
          ]
        },
        {
          id: 'business-034',
          steps: [
            { en: 'launch', zh: '推出、發表', ipa: '/lɔːntʃ/' },
            { en: 'We are launching the new service in October.', zh: '我們將在十月推出這項新服務。', ipa: '' }
          ]
        },
        {
          id: 'business-035',
          steps: [
            { en: 'pitch', zh: '提案、簡報說服', ipa: '/pɪtʃ/' },
            { en: 'She nailed the pitch in front of the judges.', zh: '她在評審面前把提案說得非常好。', ipa: '' }
          ]
        },
        {
          id: 'business-036',
          steps: [
            { en: 'target', zh: '目標、靶點', ipa: '/ˈtɑːrɡɪt/' },
            { en: 'We hit our sales target three months early.', zh: '我們提前三個月達到銷售目標。', ipa: '' }
          ]
        },
        {
          id: 'business-037',
          steps: [
            { en: 'overtime', zh: '加班、加班時數', ipa: '/ˈoʊvərtaɪm/' },
            { en: 'He worked overtime all week to finish the report.', zh: '他整週加班才把那份報告完成。', ipa: '' }
          ]
        },
        {
          id: 'business-038',
          steps: [
            { en: 'probation', zh: '試用期、觀察期', ipa: '/proʊˈbeɪʃən/' },
            { en: 'The probation period lasts three months.', zh: '試用期為期三個月。', ipa: '' }
          ]
        },
        {
          id: 'business-039',
          steps: [
            { en: 'outsource', zh: '外包', ipa: '/ˈaʊtsɔːrs/' },
            { en: 'Many companies outsource their customer service now.', zh: '現在許多公司把客服工作外包出去。', ipa: '' }
          ]
        },
        {
          id: 'business-040',
          steps: [
            { en: 'applicant', zh: '申請人、應徵者', ipa: '/ˈæplɪkənt/' },
            { en: 'Each applicant gets a short phone interview.', zh: '每位申請人都會有一次簡短的電話面試。', ipa: '' }
          ]
        }
      ]
    },
    {
      id: 'travel',
      name: '旅遊出發',
      icon: '✈️',
      level: 'A2',
      desc: '機場、飯店、點餐、問路',
      chains: [
        {
          id: 'travel-001',
          steps: [
            { en: 'airport', zh: '機場、空港', ipa: '/ˈerpɔːrt/' },
            { en: 'We reached the airport two hours before takeoff.', zh: '我們在起飛前兩小時就到了機場。', ipa: '' }
          ]
        },
        {
          id: 'travel-002',
          steps: [
            { en: 'terminal', zh: '航廈、航站樓', ipa: '/ˈtɜːrmɪnl/' },
            { en: 'Her flight departs from the second terminal.', zh: '她的航班從第二航廈起飛。', ipa: '' }
          ]
        },
        {
          id: 'travel-003',
          steps: [
            { en: 'boarding', zh: '登機的、登板的', ipa: '/ˈbɔːrdɪŋ/' },
            { en: 'Boarding starts thirty minutes before the gate closes.', zh: '登機在登機門關閉前三十分鐘開始。', ipa: '' }
          ]
        },
        {
          id: 'travel-004',
          steps: [
            { en: 'luggage', zh: '行李', ipa: '/ˈlʌɡɪdʒ/' },
            { en: 'My luggage did not arrive with the flight.', zh: '我的行李沒有隨那班航班一起到。', ipa: '' }
          ]
        },
        {
          id: 'travel-005',
          steps: [
            { en: 'suitcase', zh: '行李箱、手提箱', ipa: '/ˈsuːteɪs/' },
            { en: 'Pack a light suitcase for just four days.', zh: '只去四天，帶個小行李箱就好。', ipa: '' }
          ]
        },
        {
          id: 'travel-006',
          steps: [
            { en: 'passport', zh: '護照', ipa: '/ˈpæspɔːrt/' },
            { en: 'Keep your passport in your front pocket.', zh: '把護照放在前面的口袋裡。', ipa: '' }
          ]
        },
        {
          id: 'travel-007',
          steps: [
            { en: 'reservation', zh: '預約、訂位', ipa: '/ˌrezərˈveɪʃn/' },
            { en: 'I made a reservation under the name Chen.', zh: '我用陳這個姓訂了房間。', ipa: '' }
          ]
        },
        {
          id: 'travel-008',
          steps: [
            { en: 'hotel', zh: '飯店、旅館', ipa: '/hoʊˈtel/' },
            { en: 'Our hotel sits right beside the train station.', zh: '我們的飯店就在火車站旁邊。', ipa: '' }
          ]
        },
        {
          id: 'travel-009',
          steps: [
            { en: 'vacancy', zh: '空房、空缺', ipa: '/ˈveɪkənsi/' },
            { en: 'The front desk said there were no vacancies tonight.', zh: '櫃檯說今晚沒有空房了。', ipa: '' }
          ]
        },
        {
          id: 'travel-010',
          steps: [
            { en: 'reception', zh: '接待處、櫃檯', ipa: '/rɪˈsepʃən/' },
            { en: 'Leave your key at reception when you leave.', zh: '外出時請把房間鑰匙留在櫃檯。', ipa: '' }
          ]
        },
        {
          id: 'travel-011',
          steps: [
            { en: 'itinerary', zh: '行程表、路線', ipa: '/aɪˈtɪnəreri/' },
            { en: 'Send me your itinerary so I can pick you up.', zh: '把你的行程傳給我，我才能去接你。', ipa: '' }
          ]
        },
        {
          id: 'travel-012',
          steps: [
            { en: 'departure', zh: '出發、離開、起飛', ipa: '/dɪˈpɑːrtʃər/' },
            { en: 'The departure gate moved from B3 to B7.', zh: '起飛門從 B3 改到 B7。', ipa: '' }
          ]
        },
        {
          id: 'travel-013',
          steps: [
            { en: 'arrival', zh: '抵達、到達', ipa: '/əˈraɪvl/' },
            { en: 'Our arrival time slipped by ninety minutes.', zh: '我們的抵達時間延後了九十分鐘。', ipa: '' }
          ]
        },
        {
          id: 'travel-014',
          steps: [
            { en: 'delay', zh: '延誤、耽擱', ipa: '/dɪˈleɪ/' },
            { en: 'The storm caused a six-hour delay.', zh: '那場暴風雨造成了六小時的延誤。', ipa: '' }
          ]
        },
        {
          id: 'travel-015',
          steps: [
            { en: 'gate', zh: '登機門、閘門', ipa: '/ɡeɪt/' },
            { en: 'Which gate does the plane depart from?', zh: '這班飛機是從哪一個登機門起飛的？', ipa: '' }
          ]
        },
        {
          id: 'travel-016',
          steps: [
            { en: 'shuttle', zh: '接駁車、穿梭服務', ipa: '/ˈʃʌtl/' },
            { en: 'The hotel shuttle runs every thirty minutes.', zh: '飯店的接駁車每三十分鐘一班。', ipa: '' }
          ]
        },
        {
          id: 'travel-017',
          steps: [
            { en: 'souvenir', zh: '紀念品', ipa: '/ˌsuːvəˈnɪr/' },
            { en: 'I bought a small ceramic souvenir for my mum.', zh: '我給媽媽買了一個小陶製紀念品。', ipa: '' }
          ]
        },
        {
          id: 'travel-018',
          steps: [
            { en: 'currency', zh: '貨幣、幣別', ipa: '/ˈkɜːrənsi/' },
            { en: 'You can change currency at the airport.', zh: '你可以在機場把外幣換掉。', ipa: '' }
          ]
        },
        {
          id: 'travel-019',
          steps: [
            { en: 'exchange', zh: '兌換、交換', ipa: '/ɪksˈtʃeɪndʒ/' },
            { en: 'I need to exchange some cash before leaving.', zh: '離開前我得換一些現金。', ipa: '' }
          ]
        },
        {
          id: 'travel-020',
          steps: [
            { en: 'customs', zh: '海關、關務', ipa: '/ˈkʌstəmz/' },
            { en: 'Customs asked for the receipt of my phone.', zh: '海關要求我出示手機的購買收據。', ipa: '' }
          ]
        },
        {
          id: 'travel-021',
          steps: [
            { en: 'visa', zh: '簽證', ipa: '/ˈviːzə/' },
            { en: 'My visa allows two stays in six months.', zh: '我的簽證允許六個月內入境兩次。', ipa: '' }
          ]
        },
        {
          id: 'travel-022',
          steps: [
            { en: 'transit', zh: '轉乘、中轉', ipa: '/ˈtrænzɪt/' },
            { en: 'This train is a direct transit to the airport.', zh: '這班火車是直達機場的。', ipa: '' }
          ]
        },
        {
          id: 'travel-023',
          steps: [
            { en: 'brochure', zh: '宣傳冊、旅遊手冊', ipa: '/ˈbroʊʃər/' },
            { en: 'Grab a free brochure at the information desk.', zh: '在服務台拿一本免費的宣傳冊。', ipa: '' }
          ]
        },
        {
          id: 'travel-024',
          steps: [
            { en: 'landmark', zh: '地標、標誌性建築', ipa: '/ˈlændmɑːrk/' },
            { en: 'The oldest landmark is easy to spot from here.', zh: '最古老的地標從這裡很容易看見。', ipa: '' }
          ]
        },
        {
          id: 'travel-025',
          steps: [
            { en: 'crowded', zh: '擁擠的、人多的', ipa: '/ˈkraʊdɪd/' },
            { en: 'The old street gets crowded after sunset.', zh: '那條老街在日落之後就會很擁擠。', ipa: '' }
          ]
        },
        {
          id: 'travel-026',
          steps: [
            { en: 'downtown', zh: '市中心、鬧區', ipa: '/ˈdaʊntaʊn/' },
            { en: 'A famous noodle shop sits just downtown.', zh: '一間有名的麵店就在市區。', ipa: '' }
          ]
        },
        {
          id: 'travel-027',
          steps: [
            { en: 'pharmacy', zh: '藥局、藥房', ipa: '/ˈfɑːrməsi/' },
            { en: 'Is there a pharmacy open late near the station?', zh: '車站附近有營業到很晚的藥局嗎？', ipa: '' }
          ]
        },
        {
          id: 'travel-028',
          steps: [
            { en: 'menu', zh: '菜單、選單', ipa: '/ˈmenjuː/' },
            { en: 'Could we see the menu before ordering?', zh: '我們可以先看菜單再點嗎？', ipa: '' }
          ]
        },
        {
          id: 'travel-029',
          steps: [
            { en: 'appetizer', zh: '前菜、開胃菜', ipa: '/ˈæpɪtaɪzər/' },
            { en: 'Start with one appetizer and share it.', zh: '先點一道前菜一起分享吧。', ipa: '' }
          ]
        },
        {
          id: 'travel-030',
          steps: [
            { en: 'bill', zh: '帳單、發票', ipa: '/bɪl/' },
            { en: 'Could we have the bill whenever you have time?', zh: '你方便的時候可以幫我們結帳嗎？', ipa: '' }
          ]
        },
        {
          id: 'travel-031',
          steps: [
            { en: 'tip', zh: '小費', ipa: '/tɪp/' },
            { en: 'In some countries people leave a small tip.', zh: '在某些國家人們會留一點小費。', ipa: '' }
          ]
        },
        {
          id: 'travel-032',
          steps: [
            { en: 'refund', zh: '退款', ipa: '/ˈriːfʌnd/' },
            { en: 'They gave me a full refund after one hour.', zh: '一小時後他們就全額退款給我。', ipa: '' }
          ]
        },
        {
          id: 'travel-033',
          steps: [
            { en: 'subway', zh: '地鐵、捷運', ipa: '/ˈsʌbweɪ/' },
            { en: 'Take the subway instead of driving downtown.', zh: '搭捷運就好，不要自己開車進市區。', ipa: '' }
          ]
        },
        {
          id: 'travel-034',
          steps: [
            { en: 'platform', zh: '月台、站台', ipa: '/ˈplætfɔːrm/' },
            { en: 'The last train leaves from platform three.', zh: '末班車從三號月台發車。', ipa: '' }
          ]
        },
        {
          id: 'travel-035',
          steps: [
            { en: 'connection', zh: '轉乘、銜接', ipa: '/kəˈnekʃən/' },
            { en: 'I missed the connection to the airport train.', zh: '我錯過了接駁機場的那班車。', ipa: '' }
          ]
        },
        {
          id: 'travel-036',
          steps: [
            { en: 'backpack', zh: '背包', ipa: '/ˈbækpæk/' },
            { en: 'A small backpack is enough for a day trip.', zh: '一天的行程背個小背包就夠了。', ipa: '' }
          ]
        },
        {
          id: 'travel-037',
          steps: [
            { en: 'roaming', zh: '漫遊', ipa: '/ˈroʊmɪŋ/' },
            { en: 'Roaming charges can get very expensive abroad.', zh: '在國外使用漫界的費用可能非常貴。', ipa: '' }
          ]
        },
        {
          id: 'travel-038',
          steps: [
            { en: 'vaccine', zh: '疫苗', ipa: '/vækˈsiːn/' },
            { en: 'Some countries still ask for a vaccine certificate.', zh: '有些國家仍然要求出示疫苗證明。', ipa: '' }
          ]
        },
        {
          id: 'travel-039',
          steps: [
            { en: 'flight', zh: '航班、班機', ipa: '/flaɪt/' },
            { en: 'My connecting flight leaves only ninety minutes later.', zh: '我接續的航班只有九十分鐘後才起飛。', ipa: '' }
          ]
        },
        {
          id: 'travel-040',
          steps: [
            { en: 'abroad', zh: '在國外、到國外', ipa: '/əˈbrɔːd/' },
            { en: 'She studied abroad for two years in Canada.', zh: '她在加拿大待了兩年念書。', ipa: '' }
          ]
        }
      ]
    },
    {
      id: 'academic',
      name: '學術研究',
      icon: '📚',
      level: 'B2',
      desc: '論文、報告、課堂討論用詞',
      chains: [
        {
          id: 'academic-001',
          steps: [
            { en: 'hypothesis', zh: '假設、假說', ipa: '/haɪˈpɑːθəsɪs/' },
            { en: 'Our hypothesis failed after only three experiments.', zh: '我們的假設只做了三次實驗就被推翻了。', ipa: '' }
          ]
        },
        {
          id: 'academic-002',
          steps: [
            { en: 'methodology', zh: '方法論、研究方法', ipa: '/ˌmeθəˈdɑːlədʒi/' },
            { en: 'The reviewers questioned the methodology behind this study.', zh: '審查者質疑了這項研究背後使用的方法。', ipa: '' }
          ]
        },
        {
          id: 'academic-003',
          steps: [
            { en: 'variable', zh: '可變的、變項的', ipa: '/ˈveriəbl/' },
            { en: 'Temperature is the only variable we failed to control.', zh: '溫度是我們唯一沒控制住的變項。', ipa: '' }
          ]
        },
        {
          id: 'academic-004',
          steps: [
            { en: 'correlation', zh: '相關性、關聯', ipa: '/ˌkɔːrəˈleɪʃən/' },
            { en: 'A correlation is not the same as causation.', zh: '有相關並不等於有因果關係。', ipa: '' }
          ]
        },
        {
          id: 'academic-005',
          steps: [
            { en: 'significant', zh: '顯著的、重要的', ipa: '/sɪɡˈnɪfɪkənt/' },
            { en: 'The difference was significant at the five percent level.', zh: '這個差異在百分之五的水準上是顯著的。', ipa: '' }
          ]
        },
        {
          id: 'academic-006',
          steps: [
            { en: 'sample', zh: '樣本、範例', ipa: '/ˈsæmpl/' },
            { en: 'A sample of fifty students took part.', zh: '有五十名學生的樣本參與其中。', ipa: '' }
          ]
        },
        {
          id: 'academic-007',
          steps: [
            { en: 'bias', zh: '偏見、偏差', ipa: '/ˈbaɪəs/' },
            { en: 'The interviewer admitted a bias toward younger candidates.', zh: '訪談者承認自己對較年輕的候選人有偏見。', ipa: '' }
          ]
        },
        {
          id: 'academic-008',
          steps: [
            { en: 'peer', zh: '同儕、同輩', ipa: '/pɪr/' },
            { en: 'Every paper is judged by two anonymous peers.', zh: '每篇論文都由兩位匿名同儕評審。', ipa: '' }
          ]
        },
        {
          id: 'academic-009',
          steps: [
            { en: 'cite', zh: '引用、註明出處', ipa: '/saɪt/' },
            { en: 'You must cite the source on the last page.', zh: '你必須在最後一頁標註來源。', ipa: '' }
          ]
        },
        {
          id: 'academic-010',
          steps: [
            { en: 'plagiarism', zh: '抄襲、剽竊', ipa: '/ˈpleɪdʒərɪzəm/' },
            { en: 'The committee found serious plagiarism in her paper.', zh: '委員會在她的論文裡發現嚴重的抄襲。', ipa: '' }
          ]
        },
        {
          id: 'academic-011',
          steps: [
            { en: 'dissertation', zh: '學位論文、專題論著', ipa: '/ˌdɪsərˈteɪʃn/' },
            { en: 'She defended her doctoral dissertation last June.', zh: '她去年六月完成了博士論文口試。', ipa: '' }
          ]
        },
        {
          id: 'academic-012',
          steps: [
            { en: 'abstract', zh: '摘要、摘要報告', ipa: '/ˈæbstrækt/' },
            { en: 'Read the abstract before downloading the full paper.', zh: '下載全文之前先讀摘要。', ipa: '' }
          ]
        },
        {
          id: 'academic-013',
          steps: [
            { en: 'framework', zh: '架構、框架', ipa: '/ˈfreɪmwɜːrk/' },
            { en: 'Our framework explains how the two models interact.', zh: '我們的架構說明了這兩個模型如何互動。', ipa: '' }
          ]
        },
        {
          id: 'academic-014',
          steps: [
            { en: 'empirical', zh: '實證的、經驗的', ipa: '/ɪmˈpɪrɪkl/' },
            { en: 'The claim lacks solid empirical evidence.', zh: '這個主張缺乏扎實的實證依據。', ipa: '' }
          ]
        },
        {
          id: 'academic-015',
          steps: [
            { en: 'qualitative', zh: '質的、質化的', ipa: '/ˈkwɑːlɪteɪtɪv/' },
            { en: 'Qualitative interviews revealed a very different story.', zh: '質化訪談呈現出非常不同的故事。', ipa: '' }
          ]
        },
        {
          id: 'academic-016',
          steps: [
            { en: 'quantitative', zh: '量的、量化的', ipa: '/ˈkwɑːntɪteɪtɪv/' },
            { en: 'The quantitative results confirmed what we expected.', zh: '量化的結果證實了我們原本的預期。', ipa: '' }
          ]
        },
        {
          id: 'academic-017',
          steps: [
            { en: 'dataset', zh: '資料集', ipa: '/ˈdeɪtəset/' },
            { en: 'This dataset covers ten years of hospital visits.', zh: '這份資料集涵蓋了十年的就診紀錄。', ipa: '' }
          ]
        },
        {
          id: 'academic-018',
          steps: [
            { en: 'survey', zh: '問卷、調查', ipa: '/ˈsɜːrveɪ/' },
            { en: 'Our survey reached more than a thousand adults.', zh: '我們的問卷回收超過一千位成年人。', ipa: '' }
          ]
        },
        {
          id: 'academic-019',
          steps: [
            { en: 'participant', zh: '參與者、受訪者', ipa: '/pɑːrˈtɪsɪpənt/' },
            { en: 'Every participant signed a consent form first.', zh: '每位參與者都先簽了同意書。', ipa: '' }
          ]
        },
        {
          id: 'academic-020',
          steps: [
            { en: 'funding', zh: '經費、資金', ipa: '/ˈfʌndɪŋ/' },
            { en: 'The lab depends on short-term funding every year.', zh: '這個實驗室每年都仰賴短期經費。', ipa: '' }
          ]
        },
        {
          id: 'academic-021',
          steps: [
            { en: 'grant', zh: '補助、計畫經費', ipa: '/ɡrænt/' },
            { en: 'They won a national grant for three years.', zh: '他們拿到一項為期三年的國家補助。', ipa: '' }
          ]
        },
        {
          id: 'academic-022',
          steps: [
            { en: 'conference', zh: '會議、學術會議', ipa: '/ˈkɑːnfərəns/' },
            { en: 'Our paper was accepted by an international conference.', zh: '我們的論文被一個國際會議錄用。', ipa: '' }
          ]
        },
        {
          id: 'academic-023',
          steps: [
            { en: 'proceedings', zh: '論文集、會議紀錄', ipa: '/prəˈsiːdɪŋz/' },
            { en: 'The full paper appears in the published proceedings.', zh: '完整論文收錄在已出版的那一輯裡。', ipa: '' }
          ]
        },
        {
          id: 'academic-024',
          steps: [
            { en: 'literature', zh: '文獻、學術著作', ipa: '/ˈlɪtərətʃər/' },
            { en: 'This literature review covers twenty years of research.', zh: '這篇文獻回顧涵蓋了二十年的研究。', ipa: '' }
          ]
        },
        {
          id: 'academic-025',
          steps: [
            { en: 'coherent', zh: '連貫的、條理分明的', ipa: '/koʊˈhɪrənt/' },
            { en: 'His argument is clear but not fully coherent.', zh: '他的論點清楚，但不完全連貫。', ipa: '' }
          ]
        },
        {
          id: 'academic-026',
          steps: [
            { en: 'rigorous', zh: '嚴謹的、嚴格的', ipa: '/ˈrɪɡərəs/' },
            { en: 'We need a more rigorous method to confirm this.', zh: '我們需要更嚴謹的做法來確認這件事。', ipa: '' }
          ]
        },
        {
          id: 'academic-027',
          steps: [
            { en: 'plausible', zh: '合理的、貌似可信的', ipa: '/ˈplɔːzəbl/' },
            { en: 'That explanation sounds plausible, but nobody has tested it.', zh: '那個解釋聽起來合理，但沒有人測試過。', ipa: '' }
          ]
        },
        {
          id: 'academic-028',
          steps: [
            { en: 'inference', zh: '推論、推斷', ipa: '/ˈɪnfərəns/' },
            { en: 'That inference rests on very thin evidence.', zh: '那個推論建立在非常薄弱的證據上。', ipa: '' }
          ]
        },
        {
          id: 'academic-029',
          steps: [
            { en: 'replicate', zh: '重複（實驗）、複製', ipa: '/ˈreplɪkeɪt/' },
            { en: 'Other labs could not replicate the original result.', zh: '其他實驗室無法重現那個原始結果。', ipa: '' }
          ]
        },
        {
          id: 'academic-030',
          steps: [
            { en: 'anomaly', zh: '異常值、反常現象', ipa: '/əˈnɑːməli/' },
            { en: 'We found one anomaly in the middle of the data.', zh: '我們在資料中間發現了一個異常值。', ipa: '' }
          ]
        },
        {
          id: 'academic-031',
          steps: [
            { en: 'threshold', zh: '門檻、閾值', ipa: '/ˈθreʃhoʊld/' },
            { en: 'Set the threshold before you look at the results.', zh: '在看結果之前先設定好門檻。', ipa: '' }
          ]
        },
        {
          id: 'academic-032',
          steps: [
            { en: 'criterion', zh: '標準、判準', ipa: '/kraɪˈtɪriən/' },
            { en: 'Our criterion was clear: fewer errors overall.', zh: '我們的標準很清楚：整體錯誤更少。', ipa: '' }
          ]
        },
        {
          id: 'academic-033',
          steps: [
            { en: 'synthesis', zh: '綜合、整合', ipa: '/ˈsɪnθəsɪs/' },
            { en: 'The final chapter offers a synthesis of both models.', zh: '最後一章把這兩個模型整合在一起。', ipa: '' }
          ]
        },
        {
          id: 'academic-034',
          steps: [
            { en: 'faculty', zh: '學院、系（美式）', ipa: '/ˈfækəlti/' },
            { en: 'This university has two language faculties on the street.', zh: '這所大學在這條街上設了兩個語言學院。', ipa: '' }
          ]
        },
        {
          id: 'academic-035',
          steps: [
            { en: 'seminar', zh: '研討會、專題討論', ipa: '/ˈsemɪnɑːr/' },
            { en: 'In tomorrow seminar we will debate the ethics.', zh: '明天的研討會我們會討論倫理問題。', ipa: '' }
          ]
        },
        {
          id: 'academic-036',
          steps: [
            { en: 'advisor', zh: '指導教授、顧問', ipa: '/ədˈvaɪzər/' },
            { en: 'My advisor reads every draft within two days.', zh: '我的指導教授兩天內會看完每一份草稿。', ipa: '' }
          ]
        },
        {
          id: 'academic-037',
          steps: [
            { en: 'reiterate', zh: '重申、再次說明', ipa: '/riˈɪtəreɪt/' },
            { en: 'The editor reiterated that the deadline stays the same.', zh: '主編重申截止日期維持不變。', ipa: '' }
          ]
        },
        {
          id: 'academic-038',
          steps: [
            { en: 'manuscript', zh: '手稿、原稿', ipa: '/ˈmænjuskrɪpt/' },
            { en: 'The manuscript was returned with thirty comments.', zh: '那份手稿被退回來，上面有三十則批註。', ipa: '' }
          ]
        },
        {
          id: 'academic-039',
          steps: [
            { en: 'validity', zh: '效度、有效性', ipa: '/vəˈlɪdəti/' },
            { en: 'Critics questioned the validity of the whole design.', zh: '批評者質疑了整個研究設計的有效性。', ipa: '' }
          ]
        },
        {
          id: 'academic-040',
          steps: [
            { en: 'concept', zh: '概念、觀念', ipa: '/ˈkɑːnsept/' },
            { en: 'The concept came to me while taking a shower.', zh: '這個點子是我洗澡時想到的。', ipa: '' }
          ]
        }
      ]
    },
    {
      id: 'tech',
      name: '科技網路',
      icon: '💻',
      level: 'B1',
      desc: '程式、工作流程與 AI 世代用語',
      chains: [
        {
          id: 'tech-001',
          steps: [
            { en: 'software', zh: '軟體、應用程式', ipa: '/ˈsɔːftwer/' },
            { en: 'Our software runs on almost every phone.', zh: '我們的軟體幾乎在任何手機上都能執行。', ipa: '' }
          ]
        },
        {
          id: 'tech-002',
          steps: [
            { en: 'hardware', zh: '硬體、硬體設備', ipa: '/ˈhɑːrdwer/' },
            { en: 'New hardware ships in three weeks.', zh: '新的硬體三週後出貨。', ipa: '' }
          ]
        },
        {
          id: 'tech-003',
          steps: [
            { en: 'bandwidth', zh: '頻寬、帶寬', ipa: '/ˈbændwɪdθ/' },
            { en: 'Video calls eat up a lot of bandwidth.', zh: '視訊通話會吃掉很多頻寬。', ipa: '' }
          ]
        },
        {
          id: 'tech-004',
          steps: [
            { en: 'firewall', zh: '防火牆', ipa: '/ˈfaɪərwɔːl/' },
            { en: 'The firewall blocked three suspicious requests.', zh: '防火牆擋下了三個可疑的連線要求。', ipa: '' }
          ]
        },
        {
          id: 'tech-005',
          steps: [
            { en: 'bug', zh: '程式錯誤、瑕疵', ipa: '/bʌɡ/' },
            { en: 'They fixed the bug before the launch.', zh: '他們在正式上線前把那個錯誤修好了。', ipa: '' }
          ]
        },
        {
          id: 'tech-006',
          steps: [
            { en: 'code', zh: '程式碼、程式', ipa: '/koʊd/' },
            { en: 'Anyone can review the code on GitHub.', zh: '任何人都可以在 GitHub 上檢視這段程式碼。', ipa: '' }
          ]
        },
        {
          id: 'tech-007',
          steps: [
            { en: 'deploy', zh: '部署、上線', ipa: '/dɪˈplɔɪ/' },
            { en: 'We deploy new updates every Friday.', zh: '我們每週五部署新的更新。', ipa: '' }
          ]
        },
        {
          id: 'tech-008',
          steps: [
            { en: 'server', zh: '伺服器、主機', ipa: '/ˈsɜːrvər/' },
            { en: 'The server crashed at midnight again.', zh: '伺服器又在半夜掛掉了。', ipa: '' }
          ]
        },
        {
          id: 'tech-009',
          steps: [
            { en: 'browser', zh: '瀏覽器', ipa: '/ˈbraʊzər/' },
            { en: 'Open the link in any modern browser.', zh: '用任何一款現代瀏覽器開啟這個連結。', ipa: '' }
          ]
        },
        {
          id: 'tech-010',
          steps: [
            { en: 'upload', zh: '上傳', ipa: '/ˌʌpˈloʊd/' },
            { en: 'Upload the finished video before six tonight.', zh: '請在今晚六點前把完成的影片傳上去。', ipa: '' }
          ]
        },
        {
          id: 'tech-011',
          steps: [
            { en: 'download', zh: '下載', ipa: '/ˌdaʊnˈloʊd/' },
            { en: 'You can download the slides for later.', zh: '你可以把簡報下載下來留著之後用。', ipa: '' }
          ]
        },
        {
          id: 'tech-012',
          steps: [
            { en: 'network', zh: '網路、網絡', ipa: '/ˈnetwɜːrk/' },
            { en: 'The office network drops every afternoon.', zh: '辦公室的網路每天下午都會斷。', ipa: '' }
          ]
        },
        {
          id: 'tech-013',
          steps: [
            { en: 'database', zh: '資料庫、數據庫', ipa: '/ˈdeɪtəbeɪs/' },
            { en: 'Back up your database before the upgrade.', zh: '升級前先把你資料庫備份起來。', ipa: '' }
          ]
        },
        {
          id: 'tech-014',
          steps: [
            { en: 'algorithm', zh: '演算法、運算法則', ipa: '/ˈælɡərɪðəm/' },
            { en: 'The algorithm recommends songs based on listening history.', zh: '這個演算法會根據聆聽紀錄推薦歌曲。', ipa: '' }
          ]
        },
        {
          id: 'tech-015',
          steps: [
            { en: 'encrypt', zh: '加密、加密處理', ipa: '/ɪnˈkrɪpt/' },
            { en: 'We encrypt every message before it leaves the phone.', zh: '訊息離開手機之前我們就會先加密。', ipa: '' }
          ]
        },
        {
          id: 'tech-016',
          steps: [
            { en: 'password', zh: '密碼、通關密碼', ipa: '/ˈpæspwɜːrd/' },
            { en: 'Change your password once every six months.', zh: '請每六個月更換一次密碼。', ipa: '' }
          ]
        },
        {
          id: 'tech-017',
          steps: [
            { en: 'username', zh: '使用者名稱、帳號', ipa: '/ˈjuːzərneɪm/' },
            { en: 'Your username must contain at least eight characters.', zh: '你的帳號至少要有八個字元。', ipa: '' }
          ]
        },
        {
          id: 'tech-018',
          steps: [
            { en: 'dashboard', zh: '儀表板、數據面板', ipa: '/ˈdæʃbɔːrd/' },
            { en: 'The dashboard shows sales from every branch.', zh: '這個儀表板顯示各分店的銷售狀況。', ipa: '' }
          ]
        },
        {
          id: 'tech-019',
          steps: [
            { en: 'workflow', zh: '工作流程、流程', ipa: '/ˈwɜːrkfloʊ/' },
            { en: 'We simplified the approval workflow last month.', zh: '我們上個月簡化了審核流程。', ipa: '' }
          ]
        },
        {
          id: 'tech-020',
          steps: [
            { en: 'update', zh: '更新、更新版本', ipa: '/ˌʌpˈdeɪt/' },
            { en: 'Please update the app before Friday.', zh: '請在週五前更新這個應用程式。', ipa: '' }
          ]
        },
        {
          id: 'tech-021',
          steps: [
            { en: 'device', zh: '裝置、設備', ipa: '/dɪˈvaɪs/' },
            { en: 'This device supports two screens at once.', zh: '這台裝置可同時支援兩個螢幕。', ipa: '' }
          ]
        },
        {
          id: 'tech-022',
          steps: [
            { en: 'mobile', zh: '行動的、可攜的', ipa: '/ˈmoʊbl/' },
            { en: 'Most of our users are on mobile now.', zh: '我們大多數使用者現在都在用行動裝置。', ipa: '' }
          ]
        },
        {
          id: 'tech-023',
          steps: [
            { en: 'latency', zh: '延遲、遲滯', ipa: '/ˈleɪtənsi/' },
            { en: 'Players complain about latency during busy nights.', zh: '玩家抱怨尖峰時段的延遲問題。', ipa: '' }
          ]
        },
        {
          id: 'tech-024',
          steps: [
            { en: 'backup', zh: '備份、備份資料', ipa: '/ˈbækʌp/' },
            { en: 'Without a backup, one crash could erase everything.', zh: '沒有備份的話，一次當機可能讓一切消失。', ipa: '' }
          ]
        },
        {
          id: 'tech-025',
          steps: [
            { en: 'crash', zh: '當機、崩潰', ipa: '/kræʃ/' },
            { en: 'The game crashes only on older phones.', zh: '這個遊戲只有在舊手機上會當掉。', ipa: '' }
          ]
        },
        {
          id: 'tech-026',
          steps: [
            { en: 'pixel', zh: '像素、畫素', ipa: '/ˈpɪksəl/' },
            { en: 'The picture looks blurry because every pixel is huge.', zh: '畫面看起來模糊，因為像素太大。', ipa: '' }
          ]
        },
        {
          id: 'tech-027',
          steps: [
            { en: 'laptop', zh: '筆記型電腦', ipa: '/ˈlæptɑːp/' },
            { en: 'My laptop will not survive another airport trip.', zh: '我的筆電再帶去機場一次大概就完了。', ipa: '' }
          ]
        },
        {
          id: 'tech-028',
          steps: [
            { en: 'charger', zh: '充電器、充電線', ipa: '/ˈtʃɑːrdʒər/' },
            { en: 'I bought a second charger for my travel bag.', zh: '我又買了一個充電器放在旅遊包裡。', ipa: '' }
          ]
        },
        {
          id: 'tech-029',
          steps: [
            { en: 'wireless', zh: '無線的、無纜線的', ipa: '/ˈwaɪərləs/' },
            { en: 'The wireless signal is terrible inside this building.', zh: '這棟大樓裡的無線訊號很差。', ipa: '' }
          ]
        },
        {
          id: 'tech-030',
          steps: [
            { en: 'router', zh: '路由器、網路路由設備', ipa: '/ˈruːtər/' },
            { en: 'Restart the router before calling support.', zh: '聯絡客服之前先重啟一下路由器。', ipa: '' }
          ]
        },
        {
          id: 'tech-031',
          steps: [
            { en: 'cache', zh: '快取、暫存', ipa: '/kæʃ/' },
            { en: 'Clear the cache and the page loads faster.', zh: '清掉快取之後頁面載入會更快。', ipa: '' }
          ]
        },
        {
          id: 'tech-032',
          steps: [
            { en: 'repository', zh: '程式碼倉庫、儲存庫', ipa: '/rɪˈpɑzɪtɔːri/' },
            { en: 'Push your branch to the shared repository first.', zh: '先把你那個分支推到共用的程式碼倉庫。', ipa: '' }
          ]
        },
        {
          id: 'tech-033',
          steps: [
            { en: 'prompt', zh: '提示詞、指令', ipa: '/prɑːmpt/' },
            { en: 'Write a clear prompt and the model behaves better.', zh: '提示詞寫清楚，模型表現就會更好。', ipa: '' }
          ]
        },
        {
          id: 'tech-034',
          steps: [
            { en: 'chatbot', zh: '聊天機器人', ipa: '/ˈtʃætbɑːt/' },
            { en: 'The chatbot answers most tickets automatically.', zh: '這個聊天機器人會自動處理大部分的問題單。', ipa: '' }
          ]
        },
        {
          id: 'tech-035',
          steps: [
            { en: 'neural', zh: '神經的、神經網路的', ipa: '/ˈnʊrəl/' },
            { en: 'Neural networks learn from raw data.', zh: '神經網路是從原始資料裡學習的。', ipa: '' }
          ]
        },
        {
          id: 'tech-036',
          steps: [
            { en: 'automate', zh: '自動化、使自動', ipa: '/ˈɔːtəmeɪt/' },
            { en: 'We automate the boring parts of the job.', zh: '我們把工作裡無聊的部分自動化。', ipa: '' }
          ]
        },
        {
          id: 'tech-037',
          steps: [
            { en: 'cluster', zh: '叢集、群集', ipa: '/ˈklʌstər/' },
            { en: 'The cluster stretches across four buildings.', zh: '這個叢集橫跨了四棟大樓。', ipa: '' }
          ]
        },
        {
          id: 'tech-038',
          steps: [
            { en: 'interface', zh: '介面、使用介面', ipa: '/ˈɪntərfeɪs/' },
            { en: 'The new interface feels faster and cleaner.', zh: '新的介面感覺更快也更乾淨。', ipa: '' }
          ]
        },
        {
          id: 'tech-039',
          steps: [
            { en: 'prototype', zh: '原型、測試版本', ipa: '/ˈproʊtətaɪp/' },
            { en: 'We built a rough prototype in two days.', zh: '我們兩天內做出一個粗略的原型。', ipa: '' }
          ]
        },
        {
          id: 'tech-040',
          steps: [
            { en: 'hallucination', zh: '幻覺、憑空捏造', ipa: '/həˌluːsɪˈneɪʃən/' },
            { en: 'Models can invent facts, so check every source.', zh: '模型可能會憑空捏造內容，所以每個來源都要查證。', ipa: '' }
          ]
        }
      ]
    }
  ]
};
