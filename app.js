// --- AUDIO SYNTHESIZER (WEB AUDIO API) ---
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById('sound-btn').innerText = soundEnabled ? '🔊' : '🔇';
}

function playBubbleSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const freq = 380 + Math.random() * 400;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch(e) {}
}

function playDripSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const freq = 1300 + Math.random() * 500;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.45, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch(e) {}
}

function playClinkSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1700, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);
  } catch(e) {}
}

function playClickSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.025);
  } catch(e) {}
}

// --- 28 WORLD DRINKS DATABASE ---
const RECIPES = [
  // 1. GRAIN & MALT SPIRITS
  {
    id: 'whiskey',
    cat: 'whiskey',
    icon: '🥃',
    name: 'Односолодовый Шотландский Виски (Single Malt)',
    base: 'barley_malt',
    baseName: 'Ячменный солод Pale Ale + торф',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'american_oak',
    aging: '3-12 лет',
    defaultAbv: 43,
    brandDefault: 'Highland Legend Craft',
    desc: 'Шотландская классика. Медленное затирание при 64°C, двойная дистилляция в медном аламбике и годы созревания в дубе.'
  },
  {
    id: 'bourbon',
    cat: 'whiskey',
    icon: '🌽',
    name: 'Кентуккийский Бурбон (Kentucky Bourbon)',
    base: 'corn',
    baseName: 'Кукурузная дробленка (70%) + Рожь',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'charred_bourbon',
    aging: '2-4 года',
    defaultAbv: 45,
    brandDefault: 'Kentucky Gold Bourbon',
    desc: 'Насыщенный карамельно-ванильный профиль благодаря кукурузному затору и выдержке в новых сильно обугленных бочках.'
  },
  {
    id: 'irish_whiskey',
    cat: 'whiskey',
    icon: '☘️',
    name: 'Ирландский Виски (Irish Triple Distilled)',
    base: 'barley_malt',
    baseName: 'Соложеное и несоложеное зерно',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'american_oak',
    aging: '3 года',
    defaultAbv: 40,
    brandDefault: 'Dublin Castle Reserve',
    desc: 'Легкий, шелковистый вкус без торфяного дыма благодаря знаменитой тройной дистилляции в медных кубах pot still.'
  },
  {
    id: 'rye_whiskey',
    cat: 'whiskey',
    icon: '🌾',
    name: 'Американский Ржаной Виски (Rye Whiskey)',
    base: 'rye',
    baseName: 'Ржаной солод (не менее 51%)',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'charred_bourbon',
    aging: '3 года',
    defaultAbv: 45,
    brandDefault: 'Old Rye Frontier',
    desc: 'Сухой, перечно-пряный характер с тонами гвоздики, мускатного ореха и дубовой коры.'
  },
  {
    id: 'vodka',
    cat: 'whiskey',
    icon: '🧊',
    name: 'Русская Пшеничная Водка',
    base: 'wheat',
    baseName: 'Пшеничный затор',
    yeast: 'turbo_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Без выдержки',
    defaultAbv: 40,
    brandDefault: 'Северная Пшеничная',
    desc: 'Ректификация до 96% с идеальным отсечением альдегидов и сивухи, холодная фильтрация через березовый уголь.'
  },
  {
    id: 'moonshine',
    cat: 'whiskey',
    icon: '🍶',
    name: 'Хлебный Полугар / Традиционный Самогон',
    base: 'rye',
    baseName: 'Дробленый ржаной солод',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Отдых 1 месяц',
    defaultAbv: 38.5,
    brandDefault: 'Хлебное Вино Дворянское',
    desc: 'Истинный предок водки до изобретения ректификационных колонн. Яркий аромат свежеиспеченного ржаного хлеба.'
  },

  // 2. BRANDY, WINE & FRUIT SPIRITS
  {
    id: 'cognac',
    cat: 'brandy',
    icon: '🍇',
    name: 'Французский Коньяк XO (Fine Cognac)',
    base: 'grapes_white',
    baseName: 'Белый виноград Уни Блан',
    yeast: 'wine_yeast',
    distill: true,
    barrel: 'cognac_limousin',
    aging: '6-10 лет',
    defaultAbv: 40,
    brandDefault: 'Château Alchimie XO',
    desc: 'Шарантский аламбик, двойной перегон вина и долгие годы в бочках из векового лимузенского дуба.'
  },
  {
    id: 'calvados',
    cat: 'brandy',
    icon: '🍏',
    name: 'Нормандский Кальвадос (Calvados)',
    base: 'apples',
    baseName: 'Яблоки кислых и горько-сладких сортов',
    yeast: 'wild_yeast',
    distill: true,
    barrel: 'french_sherry',
    aging: '2-5 лет',
    defaultAbv: 40,
    brandDefault: 'Normandie Pomme Vieux',
    desc: 'Длительное сбраживание натурального яблочного сидра и дистилляция в медном кубе с тонами печеного яблока и корицы.'
  },
  {
    id: 'grappa',
    cat: 'brandy',
    icon: '🍇',
    name: 'Итальянская Граппа / Чача',
    base: 'grapes_red',
    baseName: 'Виноградный жмых (мезга) + сок',
    yeast: 'wine_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Отдых 6 месяцев',
    defaultAbv: 42,
    brandDefault: 'Grappa Di Barolo',
    desc: 'Перегонка паром виноградных выжимок. Мощный фруктово-мускатный аромат с миндальным финишем.'
  },
  {
    id: 'kirsch',
    cat: 'brandy',
    icon: '🍒',
    name: 'Вишневый Киршвассер (Kirschwasser)',
    base: 'cherries',
    baseName: 'Чёрная дикая черешня с косточкой',
    yeast: 'wild_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Отдых в стекле',
    defaultAbv: 42,
    brandDefault: 'Schwarzwald Kirsch',
    desc: 'Кристально чистый о-де-ви из Шварцвальда. Тончайший аромат спелой вишни с оттенком горького миндаля из косточки.'
  },
  {
    id: 'slivovitz',
    cat: 'brandy',
    icon: '🍑',
    name: 'Балканская Сливовица / Палинка',
    base: 'plums',
    baseName: 'Спелые сливы Венгерка',
    yeast: 'wild_yeast',
    distill: true,
    barrel: 'american_oak',
    aging: '1-3 года',
    defaultAbv: 45,
    brandDefault: 'Zlatna Slivovitz',
    desc: 'Гордость Сербии и Венгрии. Сливовое сусло бродит без сахара, перегоняется дважды и зреет в дубе.'
  },
  {
    id: 'pisco',
    cat: 'brandy',
    icon: '🇵🇪',
    name: 'Перуанский Писко (Pisco Puro)',
    base: 'grapes_white',
    baseName: 'Ароматный виноград Мускатель',
    yeast: 'wine_yeast',
    distill: true,
    barrel: 'none',
    aging: 'В глиняных амфорах',
    defaultAbv: 42,
    brandDefault: 'Pisco Quebranta',
    desc: 'Строгий регламент Перу: перегоняется ровно один раз прямо до крепости розлива, выдержка в дубе строго запрещена!'
  },
  {
    id: 'wine_red',
    cat: 'brandy',
    icon: '🍷',
    name: 'Сухое Красное Вино (Cabernet Sauvignon)',
    base: 'grapes_red',
    baseName: 'Виноград Каберне Совиньон',
    yeast: 'wine_yeast',
    distill: false,
    barrel: 'french_sherry',
    aging: '1-2 года',
    defaultAbv: 13.5,
    brandDefault: 'Grand Cru Reserve',
    desc: 'Брожение на мезге, яблочно-молочная ферментация, созревание в дубовой бочке. Танины, черная смородина и кедр.'
  },
  {
    id: 'wine_white',
    cat: 'brandy',
    icon: '🥂',
    name: 'Белое Вино Шардоне (Chardonnay)',
    base: 'grapes_white',
    baseName: 'Виноград Шардоне холодного отжима',
    yeast: 'wine_yeast',
    distill: false,
    barrel: 'american_oak',
    aging: '6-12 месяцев',
    defaultAbv: 12.5,
    brandDefault: 'Chablis Blanc',
    desc: 'Холодное брожение чистого сока при 15°C, батонаж на осадке. Ноты зеленого яблока, цитрусов и сливочного масла.'
  },
  {
    id: 'champagne',
    cat: 'brandy',
    icon: '🍾',
    name: 'Игристое Шампанское (Méthode Traditionnelle)',
    base: 'grapes_white',
    baseName: 'Купаж Шардоне и Пино Нуар',
    yeast: 'wine_yeast',
    distill: false,
    barrel: 'none',
    aging: '18 месяцев на осадке',
    defaultAbv: 12.0,
    brandDefault: 'Cuvée Royale Brut',
    desc: 'Вторичное брожение прямо в бутылке, ремюаж, дегоржаж и тончайший перляж миллиардов искрящихся пузырьков.'
  },
  {
    id: 'port_wine',
    cat: 'brandy',
    icon: '🍷',
    name: 'Португальский Портвейн (Tawny Port)',
    base: 'grapes_red',
    baseName: 'Виноград долины Дору',
    yeast: 'wine_yeast',
    distill: false,
    barrel: 'port_cask',
    aging: '7-10 лет',
    defaultAbv: 19.5,
    brandDefault: 'Porto Colheita',
    desc: 'Крепление молодого бродящего вина виноградным спиртом (агуарденте), за счет чего сохраняется натуральная сладость.'
  },

  // 3. CANE, AGAVE & ASIAN SPIRITS
  {
    id: 'rum',
    cat: 'agave_asia',
    icon: '🏴‍☠️',
    name: 'Тёмный Ямайский Ром (Navy Rum)',
    base: 'molasses',
    baseName: 'Тростниковая черная патока (Меласса)',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'charred_bourbon',
    aging: '3 года',
    defaultAbv: 45,
    brandDefault: 'Captain Black Sail Rum',
    desc: 'Дистилляция в медном пот-стилле. Взрыв эфиров: карамель, бананы фламбе, патока и табак.'
  },
  {
    id: 'cachaca',
    cat: 'agave_asia',
    icon: '🇧🇷',
    name: 'Бразильская Кашаса (Cachaça)',
    base: 'cane_juice',
    baseName: 'Свежевыжатый сок сахарного тростника',
    yeast: 'wild_yeast',
    distill: true,
    barrel: 'american_oak',
    aging: '1 год',
    defaultAbv: 40,
    brandDefault: 'Samba Ouro Cachaça',
    desc: 'Сердце коктейля Кайпиринья. В отличие от рома, делается не из патоки, а из свежего тростникового сока.'
  },
  {
    id: 'tequila',
    cat: 'agave_asia',
    icon: '🌵',
    name: 'Текила Репосадо (100% Blue Agave)',
    base: 'agave',
    baseName: 'Сердцевины голубой агавы Weber',
    yeast: 'wine_yeast',
    distill: true,
    barrel: 'american_oak',
    aging: '6 месяцев',
    defaultAbv: 38,
    brandDefault: 'Jalisco Oro 100% Agave',
    desc: 'Запекание пиньяс агавы в печах, отжим нектара, брожение и двойной перегон в медном кубе.'
  },
  {
    id: 'mezcal',
    cat: 'agave_asia',
    icon: '💨',
    name: 'Дымный Оахакский Мескаль (Mezcal)',
    base: 'agave',
    baseName: 'Дикая агава Эспадин',
    yeast: 'wild_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Отдых в стекле',
    defaultAbv: 45,
    brandDefault: 'Oaxaca Ancestral Mezcal',
    desc: 'Агава томится несколько суток в земляных ямах-конусах на раскаленных камнях под дубовыми углями. Мощный дымный вкус.'
  },
  {
    id: 'sake',
    cat: 'agave_asia',
    icon: '🍶',
    name: 'Японское Саке (Junmai Daiginjo)',
    base: 'rice_koji',
    baseName: 'Шлифованный до 50% рис + грибок Кодзи',
    yeast: 'sake_yeast',
    distill: false,
    barrel: 'none',
    aging: 'Холодное созревание',
    defaultAbv: 15.5,
    brandDefault: 'Kyoto Imperial Junmai',
    desc: 'Вершина японского мастерства. Параллельное двойное брожение: плесень кодзи осахаривает крахмал, пока дрожжи делают алкоголь.'
  },
  {
    id: 'soju',
    cat: 'agave_asia',
    icon: '🇰🇷',
    name: 'Корейское Традиционное Соджу (Soju)',
    base: 'rice_koji',
    baseName: 'Рис + батат + закваска Нурук',
    yeast: 'sake_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Без выдержки',
    defaultAbv: 20.0,
    brandDefault: 'Andong Heritage Soju',
    desc: 'Шелковистый национальный напиток Кореи. Очень мягкий вкус, идеальный баланс с легкой рисовой сладостью.'
  },
  {
    id: 'baijiu',
    cat: 'agave_asia',
    icon: '🇨🇳',
    name: 'Китайский Байцзю (Крепость 53% Маотай)',
    base: 'sorghum',
    baseName: 'Красное сорго + закваска Цзюцюй',
    yeast: 'wild_yeast',
    distill: true,
    barrel: 'none',
    aging: '3-5 лет в глиняных сосудах',
    defaultAbv: 53.0,
    brandDefault: 'Guizhou Phoenix Baijiu',
    desc: 'Твердофазная ферментация в глиняных ямах глубиной 3 метра, многократная паровая дистилляция. Неповторимый умами-соевый соусный аромат.'
  },

  // 4. BOTANICALS, GIN & BITTERS
  {
    id: 'gin',
    cat: 'botanicals',
    icon: '🍸',
    name: 'Лондонский Сухой Джин (London Dry Gin)',
    base: 'wheat',
    baseName: 'Зерновой спирт + можжевельник + корзинка',
    yeast: 'whiskey_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Отдых 14 дней',
    defaultAbv: 43.0,
    brandDefault: 'London Dry 1792',
    desc: 'Дистилляция через джин-корзину: пары спирта насыщаются можжевельником, кориандром, корнем дягиля и цедрой цитрусовых.'
  },
  {
    id: 'absinthe',
    cat: 'botanicals',
    icon: '🧚',
    name: 'Изумрудный Абсент «Зелёная Фея» (Verte)',
    base: 'wormwood',
    baseName: 'Горькая полынь + зеленый анис + фенхель',
    yeast: 'turbo_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Окрашивание иссопом',
    defaultAbv: 68.0,
    brandDefault: 'Fée Verte Absinthe',
    desc: 'Мацерация «святой троицы» трав, бережная перегонка и вторичное окрашивание хлорофиллом. Опалесцирует при добавлении ледяной воды.'
  },
  {
    id: 'ouzo',
    cat: 'botanicals',
    icon: '🇬🇷',
    name: 'Греческий Анисовый Узо / Пастис',
    base: 'grapes_white',
    baseName: 'Виноградный дистиллят + анис + мастика',
    yeast: 'wine_yeast',
    distill: true,
    barrel: 'none',
    aging: 'Отдых в стали',
    defaultAbv: 40.0,
    brandDefault: 'Ouzo De Lesbos',
    desc: 'Средиземноморский дистиллят с анисовым маслом. При добавлении кубика льда мгновенно белеет («эффект узо»).'
  },
  {
    id: 'krauterlikor',
    cat: 'botanicals',
    icon: '🦌',
    name: 'Травяной Бальзам «Мастер Трав» (56 трав)',
    base: 'herbs56',
    baseName: 'Корень имбиря, анис, шафран, можжевельник',
    yeast: 'turbo_yeast',
    distill: true,
    barrel: 'american_oak',
    aging: '12 месяцев в дубе',
    defaultAbv: 35.0,
    brandDefault: 'Jagdmeister Herbal Liqueur',
    desc: 'Холодная мацерация 56 трав в течение месяцев, бережный купаж со спиртом и созревание в огромных дубовых бочках.'
  },
  {
    id: 'limoncello',
    cat: 'botanicals',
    icon: '🍋',
    name: 'Итальянский Лимончелло (Limoncello)',
    base: 'wheat',
    baseName: 'Цедра лимонов Сорренто + чистый спирт',
    yeast: 'turbo_yeast',
    distill: false,
    barrel: 'none',
    aging: 'Настаивание 30 дней',
    defaultAbv: 30.0,
    brandDefault: 'Limoncello Di Capri',
    desc: 'Настаивание свежайшей лимонной цедры на 96% спирте, эмульгация с сахарным сиропом. Пьется ледяным прямо из морозилки.'
  },

  // 5. BEER, CIDER & MEAD
  {
    id: 'beer_ipa',
    cat: 'beer',
    icon: '🍺',
    name: 'Крафтовый IPA (Double Dry Hopped)',
    base: 'barley_malt',
    baseName: 'Светлый ячменный солод + Хмель Citra/Mosaic',
    yeast: 'ale_yeast',
    distill: false,
    barrel: 'none',
    aging: '2 недели',
    defaultAbv: 6.8,
    brandDefault: 'Citra Sunrise IPA',
    desc: 'Плотный солодовый профиль, сухое охмеление на этапе брожения и взрывная тропическо-цитрусовая горечь (IBU 65).'
  },
  {
    id: 'beer_stout',
    cat: 'beer',
    icon: '☕',
    name: 'Русский Имперский Стаут (Imperial Stout)',
    base: 'barley_malt',
    baseName: 'Жженый ячмень + шоколадный солод',
    yeast: 'ale_yeast',
    distill: false,
    barrel: 'charred_bourbon',
    aging: '6 месяцев',
    defaultAbv: 10.5,
    brandDefault: 'Midnight Czar Imperial Stout',
    desc: 'Густой, смолисто-чёрный эль с кремовой кофейной пенкой. Во вкусе горький шоколад, эспрессо и чернослив.'
  },
  {
    id: 'beer_weizen',
    cat: 'beer',
    icon: '🌾',
    name: 'Баварский Пшеничный Вайсбир (Hefeweizen)',
    base: 'wheat',
    baseName: 'Пшеничный солод (60%) + светлый ячмень',
    yeast: 'weizen_yeast',
    distill: false,
    barrel: 'none',
    aging: '3 недели',
    defaultAbv: 5.4,
    brandDefault: 'Bavaria Weissbier',
    desc: 'Нефильтрованное туманное пиво. Баварский штамм дрожжей рождает яркий эфирный аромат спелых бананов и пряной гвоздики.'
  },
  {
    id: 'beer_pilsner',
    cat: 'beer',
    icon: '🍺',
    name: 'Чешский Светлый Лагер (Bohemian Pilsner)',
    base: 'barley_malt',
    baseName: 'Солод Pilsner + жатецкий хмель Saaz',
    yeast: 'lager_yeast',
    distill: false,
    barrel: 'none',
    aging: '60 дней лагерирования',
    defaultAbv: 4.8,
    brandDefault: 'Plzeň Golden Lager',
    desc: 'Золотой стандарт мирового пивоварения. Отварочное затирание, благородный хмель и долгое созревание при 1°C.'
  },
  {
    id: 'cider',
    cat: 'beer',
    icon: '🍏',
    name: 'Традиционный Сухой Сидр (Hard Cider)',
    base: 'apples',
    baseName: 'Сок горько-сладких яблок прямого отжима',
    yeast: 'wild_yeast',
    distill: false,
    barrel: 'none',
    aging: '1 месяц',
    defaultAbv: 6.0,
    brandDefault: 'Brittany Apple Cider',
    desc: 'Искрящийся, освежающий яблочный сидр естественного сбраживания без грамма добавленного сахара.'
  },
  {
    id: 'mead',
    cat: 'beer',
    icon: '🍯',
    name: 'Древнеславянская Ставленая Медовуха',
    base: 'honey',
    baseName: 'Липовый мёд + родниковая вода + перга',
    yeast: 'wine_yeast',
    distill: false,
    barrel: 'american_oak',
    aging: '6 месяцев',
    defaultAbv: 12.0,
    brandDefault: 'Мёд Княжеский Ставленый',
    desc: 'Холодное смешивание меда без кипячения. Сохраняет всю пользу ферментов и волшебный цветочный аромат.'
  }
];

// --- GAME STATE ---
const state = {
  balance: 1450,
  activeFilter: 'all',
  currentRecipeId: 'whiskey',
  batch: {
    stillActive: false,
    heaterWatts: 1800,
    stillTemp: 20.0,
    boilerVolume: 20.0,
    currentCut: 'heads',
    headsVolumeMl: 0,
    heartsVolumeMl: 0,
    tailsVolumeMl: 0,
    purityScore: 98,
    agingYears: 3,
    targetAbv: 40,
    brandName: 'Highland Legend Craft'
  }
};

// --- INITIAL LOAD ---
window.addEventListener('DOMContentLoaded', () => {
  renderPresetsGrid();
  renderRecipesList(RECIPES);
  renderCellarBarrels();
  renderStoreItems();
  selectRecipe('whiskey');
});

// --- FILTER PRESETS BY CATEGORY ---
function filterPresets(cat) {
  playClickSound();
  state.activeFilter = cat;
  
  document.querySelectorAll('.cat-chip').forEach(btn => {
    btn.className = 'cat-chip px-2.5 py-1 rounded-full bg-[#261f1b] border border-[#403129] text-zinc-300 hover:text-white whitespace-nowrap';
  });
  const activeBtn = document.getElementById(`cat-${cat}`);
  if (activeBtn) {
    activeBtn.className = 'cat-chip px-2.5 py-1 rounded-full bg-copper-600 text-white font-bold whitespace-nowrap';
  }

  renderPresetsGrid();
}

function renderPresetsGrid() {
  const grid = document.getElementById('presets-grid');
  const filtered = state.activeFilter === 'all' 
    ? RECIPES 
    : RECIPES.filter(r => r.cat === state.activeFilter);

  grid.innerHTML = filtered.map(r => `
    <button onclick="selectRecipe('${r.id}')" class="preset-card p-2 rounded-xl border ${r.id === state.currentRecipeId ? 'border-copper-500 bg-[#2d1f18]' : 'border-zinc-800 bg-[#201915] hover:bg-[#281f1a]'} text-left transition flex items-center space-x-2">
      <span class="text-xl">${r.icon}</span>
      <div class="overflow-hidden">
        <div class="text-[11px] font-bold truncate ${r.id === state.currentRecipeId ? 'text-copper-300' : 'text-zinc-200'}">${r.name.split('(')[0].trim()}</div>
        <div class="text-[9px] text-zinc-400 font-mono">${r.defaultAbv}% • ${r.distill ? 'Куб' : 'Без куба'}</div>
      </div>
    </button>
  `).join('');
}

function selectRecipe(id) {
  playClickSound();
  state.currentRecipeId = id;
  const recipe = RECIPES.find(r => r.id === id);
  if (!recipe) return;

  // Update banner
  document.getElementById('active-icon').innerText = recipe.icon;
  document.getElementById('active-name').innerText = recipe.name;
  document.getElementById('active-details').innerText = `${recipe.baseName} • ${recipe.distill ? 'Дистилляция в кубе' : 'Прямое брожение'} • ${recipe.aging}`;
  document.getElementById('active-abv-badge').innerText = `${recipe.defaultAbv}%`;

  // Select dropdowns
  const baseSelect = document.getElementById('mash-base');
  const yeastSelect = document.getElementById('mash-yeast');
  const barrelSelect = document.getElementById('barrel-type-select');
  const brandInput = document.getElementById('brand-name-input');
  const dilutionSlider = document.getElementById('dilution-slider');

  baseSelect.value = recipe.base;
  yeastSelect.value = recipe.yeast;
  barrelSelect.value = recipe.barrel;
  brandInput.value = recipe.brandDefault;
  dilutionSlider.value = recipe.defaultAbv;
  state.batch.targetAbv = recipe.defaultAbv;

  updateMashEstimates();
  renderPresetsGrid();
}

function updateMashEstimates() {
  const recipe = RECIPES.find(r => r.id === state.currentRecipeId);
  const base = document.getElementById('mash-base').value;
  
  let og = '1.065 SG';
  let estAbv = '~8.5%';
  let type = recipe && recipe.distill ? 'Дистиллят' : 'Сброженный напиток';

  if (base.includes('corn') || base.includes('grain')) {
    og = '1.072 SG'; estAbv = '~9.2%';
  } else if (base.includes('molasses') || base.includes('honey')) {
    og = '1.082 SG'; estAbv = '~11.0%';
  } else if (base.includes('grapes') || base.includes('plums')) {
    og = '1.088 SG'; estAbv = '~12.5%';
  } else if (base.includes('apples')) {
    og = '1.050 SG'; estAbv = '~6.2%';
  }

  document.getElementById('est-og').innerText = og;
  document.getElementById('est-abv').innerText = estAbv;
  document.getElementById('est-type').innerText = type;
}

// --- MASHING PROCESS LOOP ---
let mashTimer = null;
function startMashingProcess() {
  playClickSound();
  const btn = document.getElementById('start-mash-btn');
  btn.disabled = true;
  btn.classList.add('opacity-50', 'cursor-not-allowed');

  let progress = 0;
  const statusEl = document.getElementById('mash-status-text');
  const timerEl = document.getElementById('mash-timer-text');
  const pauseEl = document.getElementById('mash-current-pause');
  const progBar = document.getElementById('mash-progress');
  const recipe = RECIPES.find(r => r.id === state.currentRecipeId);

  mashTimer = setInterval(() => {
    progress += 2;
    progBar.style.width = `${progress}%`;
    timerEl.innerText = `${progress}%`;

    if (!recipe.distill && recipe.cat === 'beer') {
      // Beer pause cycle
      if (progress < 25) {
        pauseEl.innerText = 'Белковая пауза (52°C)';
        statusEl.innerText = 'Расщепление белка для красивой стойкой пены...';
      } else if (progress < 60) {
        pauseEl.innerText = 'Мальтозная пауза (63°C)';
        statusEl.innerText = 'Осахаривание крахмала в сбраживаемый сахар...';
        if (Math.random() < 0.25) playBubbleSound();
      } else if (progress < 85) {
        pauseEl.innerText = 'Охмеление сусла при 100°C';
        statusEl.innerText = 'Варка с хмелем для горечи и цитрусового аромата...';
      } else {
        pauseEl.innerText = 'Охлаждение чиллером (18°C)';
        statusEl.innerText = 'Быстрое охлаждение и аэрация перед внесением дрожжей!';
      }
    } else {
      // Spirits / Wines cycle
      if (progress < 30) {
        pauseEl.innerText = 'Подготовка и смешивание сырья';
        statusEl.innerText = 'Замачивание, ферментация и гидролиз сырья...';
      } else if (progress < 70) {
        pauseEl.innerText = 'Температурная ферментация (64°C)';
        statusEl.innerText = 'Превращение сахаров и насыщение сусла ароматом...';
        if (Math.random() < 0.25) playBubbleSound();
      } else {
        pauseEl.innerText = 'Готовность сусла к брожению';
        statusEl.innerText = 'Сусло проверено, ареометр показывает идеальную плотность!';
      }
    }

    if (progress >= 100) {
      clearInterval(mashTimer);
      playClinkSound();
      btn.innerHTML = '✅ Затор готов! Перекачка в бродильный чан...';
      setTimeout(() => {
        document.getElementById('stage-mashing').classList.add('hidden');
        document.getElementById('stage-fermentation').classList.remove('hidden');
        document.getElementById('step-dot-1').classList.remove('text-copper-400', 'font-bold');
        document.getElementById('step-dot-1').classList.add('text-zinc-500');
        document.getElementById('step-dot-2').classList.remove('text-zinc-500');
        document.getElementById('step-dot-2').classList.add('text-amber-400', 'font-bold');
        startFermentationLoop();
      }, 900);
    }
  }, 90);
}

// --- FERMENTATION STAGE ---
let fermDays = 1;
let fermInterval = null;

function startFermentationLoop() {
  fermDays = 1;
  fermInterval = setInterval(() => {
    playBubbleSound();
  }, 2200);
}

function accelerateFermentation() {
  playBubbleSound();
  fermDays++;
  if (fermDays > 7) fermDays = 7;
  
  const percent = Math.min(100, Math.round((fermDays / 7) * 100));
  document.getElementById('ferm-days').innerText = fermDays;
  document.getElementById('ferm-percent').innerText = `${percent}%`;
  document.getElementById('ferm-progress-bar').style.width = `${percent}%`;

  const currentSg = (1.065 - (fermDays * 0.006)).toFixed(3);
  const currentAbv = (2.0 + (fermDays * 1.05)).toFixed(1);
  document.getElementById('ferm-sg').innerText = currentSg;
  document.getElementById('ferm-abv').innerText = `${currentAbv}%`;

  if (fermDays >= 7) {
    clearInterval(fermInterval);
    document.getElementById('finish-ferm-btn').disabled = false;
    document.getElementById('finish-ferm-btn').classList.remove('bg-zinc-700', 'text-zinc-400', 'cursor-not-allowed');
    document.getElementById('finish-ferm-btn').classList.add('bg-gradient-to-r', 'from-emerald-600', 'to-teal-600', 'text-white', 'hover:from-emerald-500', 'hover:to-teal-500', 'cursor-pointer');
    document.getElementById('co2-rate').innerText = '0 пузырьков (Брожение затухло)';
    document.getElementById('airlock-icon').innerText = '🍺';
  }
}

function finishFermentation() {
  playClickSound();
  document.getElementById('stage-fermentation').classList.add('hidden');
  const recipe = RECIPES.find(r => r.id === state.currentRecipeId);
  
  if (!recipe.distill) {
    // No distillation for Beer, Wine, Cider, Mead, Sake
    document.getElementById('step-3-name').innerText = 'Карбонизация / Отдых';
    document.getElementById('stage-bottling').classList.remove('hidden');
    document.getElementById('step-dot-2').classList.add('text-zinc-500');
    document.getElementById('step-dot-4').classList.add('text-copper-400', 'font-bold');
    
    document.getElementById('raw-spirit-volume').innerText = 'Напиток: 22.0 л';
    document.getElementById('raw-spirit-abv').innerText = `${recipe.defaultAbv}% ABV`;
    document.getElementById('raw-spirit-purity').innerText = '100% Чистое брожение';
    document.getElementById('target-abv-label').innerText = `Градус: ${recipe.defaultAbv}%`;
    document.getElementById('dilution-slider').value = recipe.defaultAbv;
    document.getElementById('dilution-slider').disabled = true;
    document.getElementById('water-needed-val').innerText = '0 л (Без разбавления)';
    document.getElementById('bottles-count-val').innerText = '44 бут. (0.5л)';
  } else {
    // Distillation Still
    document.getElementById('stage-distillation').classList.remove('hidden');
    document.getElementById('step-dot-2').classList.add('text-zinc-500');
    document.getElementById('step-dot-3').classList.add('text-copper-400', 'font-bold');
    document.getElementById('dilution-slider').disabled = false;
  }
}

// --- DISTILLATION SIMULATION ---
let stillTimer = null;

function toggleStillPower() {
  playClickSound();
  state.batch.stillActive = !state.batch.stillActive;
  const btn = document.getElementById('still-power-btn');
  const badge = document.getElementById('still-badge');

  if (state.batch.stillActive) {
    btn.innerHTML = '⏸️ Приостановить нагрев';
    btn.className = 'flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-700 font-bold rounded-xl text-white text-xs shadow-lg transition';
    badge.innerText = 'ТЭН ВКЛЮЧЕН';
    badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-950 text-amber-400 border border-amber-700 animate-pulse';
    startStillPhysicsLoop();
  } else {
    btn.innerHTML = '▶️ Включить нагрев';
    btn.className = 'flex-1 py-3 bg-gradient-to-r from-copper-600 to-amber-600 hover:from-copper-500 hover:to-amber-500 font-bold rounded-xl text-white text-xs shadow-lg transition';
    badge.innerText = 'Нагрев на паузе';
    badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-zinc-800 text-zinc-400 border border-zinc-700';
    clearInterval(stillTimer);
  }
}

function adjustHeaterPower(val) {
  state.batch.heaterWatts = parseInt(val);
  document.getElementById('heater-power-val').innerText = `${val} Вт`;
}

function switchFractionCut(cut) {
  playClickSound();
  state.batch.currentCut = cut;
  ['heads', 'hearts', 'tails'].forEach(c => {
    const btn = document.getElementById(`cut-${c}-btn`);
    if (c === cut) {
      btn.classList.add('border-2', 'border-amber-400', 'bg-amber-950/60');
      btn.classList.remove('border-zinc-700', 'bg-[#261f1b]');
    } else {
      btn.classList.remove('border-2', 'border-amber-400', 'bg-amber-950/60');
      btn.classList.add('border-zinc-700', 'bg-[#261f1b]');
    }
  });
}

function startStillPhysicsLoop() {
  clearInterval(stillTimer);
  stillTimer = setInterval(() => {
    const watts = state.batch.heaterWatts;
    if (watts > 0) {
      state.batch.stillTemp += (watts / 2500) * 0.42;
    } else {
      state.batch.stillTemp = Math.max(20, state.batch.stillTemp - 0.2);
    }

    const t = state.batch.stillTemp;
    document.getElementById('still-temp-display').innerText = t.toFixed(1);

    const angle = -110 + ((t - 20) / 80) * 220;
    document.getElementById('gauge-needle').style.transform = `rotate(${angle}deg)`;

    const fracName = document.getElementById('current-fraction-name');
    const flowText = document.getElementById('flow-rate-text');
    const flowStr = document.getElementById('flow-strength-text');
    const advice = document.getElementById('distill-advice');
    const hint = document.getElementById('temp-zone-hint');

    if (t < 68.0) {
      fracName.innerText = 'ПРОГРЕВ КУБА';
      fracName.className = 'text-xs font-bold font-mono text-zinc-500 mt-0.5';
      flowText.innerText = '0 мл/мин';
      flowStr.innerText = 'Крепость: 0%';
      hint.innerText = 'Закипание браги';
    } else if (t >= 68.0 && t < 78.1) {
      fracName.innerText = '⚠️ ГОЛОВЫ (ЯДОВИТО)';
      fracName.className = 'text-xs font-bold font-mono text-rose-400 mt-0.5';
      flowText.innerText = '18 мл/мин (капли)';
      flowStr.innerText = 'Крепость: 85% (Ацетон)';
      hint.innerText = 'Ядовитые легкокипящие эфиры';
      advice.innerText = 'Снизь мощность до 1200 Вт и отбирай головы в банку ГОЛОВЫ!';
      playDripSound();

      if (state.batch.currentCut === 'heads') {
        state.batch.headsVolumeMl += 5;
      } else if (state.batch.currentCut === 'hearts') {
        state.batch.heartsVolumeMl += 5;
        state.batch.purityScore = Math.max(25, state.batch.purityScore - 1.2);
      }
    } else if (t >= 78.1 && t <= 84.8) {
      fracName.innerText = '⭐ ТЕЛО (ЭТАНОЛ)';
      fracName.className = 'text-xs font-bold font-mono text-amber-300 mt-0.5';
      flowText.innerText = '48 мл/мин (ровная струя)';
      const heartStr = (82 - (t - 78.1) * 2.3).toFixed(1);
      flowStr.innerText = `Крепость: ${heartStr}%`;
      hint.innerText = 'Золотое чистое тело';
      advice.innerText = 'Идеальная температура! Включай «ТЕЛО (СЕРДЦЕ)» и собирай питьевой спирт.';
      playDripSound();

      if (state.batch.currentCut === 'hearts') {
        state.batch.heartsVolumeMl += 10;
      } else if (state.batch.currentCut === 'heads') {
        state.batch.headsVolumeMl += 10;
      } else {
        state.batch.tailsVolumeMl += 10;
      }
    } else if (t > 84.8 && t < 98.0) {
      fracName.innerText = '🛑 ХВОСТЫ (СИВУХА)';
      fracName.className = 'text-xs font-bold font-mono text-yellow-600 mt-0.5';
      flowText.innerText = '25 мл/мин';
      flowStr.innerText = 'Крепость: 30% (Масла)';
      hint.innerText = 'Сивушные масла и тяжелые спирты';
      advice.innerText = 'Пошла сивуха! Жми кнопку ХВОСТЫ или завершай перегон!';
      playDripSound();

      if (state.batch.currentCut === 'tails') {
        state.batch.tailsVolumeMl += 8;
      } else if (state.batch.currentCut === 'hearts') {
        state.batch.heartsVolumeMl += 8;
        state.batch.purityScore = Math.max(20, state.batch.purityScore - 1.5);
      }
    } else {
      toggleStillPower();
      alert('В кубе осталась только барда. Перегонка завершена!');
    }

    document.getElementById('heads-vol').innerText = `${state.batch.headsVolumeMl} мл`;
    document.getElementById('hearts-vol').innerText = `${state.batch.heartsVolumeMl} мл`;
    document.getElementById('tails-vol').innerText = `${state.batch.tailsVolumeMl} мл`;
    
    const totalDrained = (state.batch.headsVolumeMl + state.batch.heartsVolumeMl + state.batch.tailsVolumeMl) / 1000;
    document.getElementById('boiler-volume-left').innerText = `${Math.max(0, 20.0 - totalDrained).toFixed(1)} л`;
  }, 280);
}

function finishDistillation() {
  playClickSound();
  clearInterval(stillTimer);
  state.batch.stillActive = false;

  if (state.batch.heartsVolumeMl < 400) {
    if (!confirm('Собрано мало тела. Завершить перегон?')) return;
  }

  document.getElementById('stage-distillation').classList.add('hidden');
  document.getElementById('stage-bottling').classList.remove('hidden');
  document.getElementById('step-dot-3').classList.add('text-zinc-500');
  document.getElementById('step-dot-4').classList.add('text-copper-400', 'font-bold');

  const liters = (state.batch.heartsVolumeMl / 1000).toFixed(2);
  document.getElementById('raw-spirit-volume').innerText = `Тело: ${liters} л`;
  document.getElementById('raw-spirit-abv').innerText = '76.5% ABV';
  document.getElementById('raw-spirit-purity').innerText = `${state.batch.purityScore}% (${state.batch.purityScore > 85 ? 'Высокая' : 'Сивушная'})`;

  updateProofingStats();
}

// --- PROOFING & BOTTLING ---
function updateAgingSlider(val) {
  document.getElementById('aging-years-label').innerText = `${val} ${val === '1' ? 'год' : val < 5 ? 'года' : 'лет'}`;
  state.batch.agingYears = parseInt(val);
}

function updateDilutionSlider(val) {
  document.getElementById('target-abv-label').innerText = `Целевой градус: ${val}%`;
  state.batch.targetAbv = parseInt(val);
  updateProofingStats();
}

function updateProofingStats() {
  const barrelSelect = document.getElementById('barrel-type-select').value;
  const agingPanel = document.getElementById('aging-duration-panel');

  if (barrelSelect === 'none') {
    agingPanel.classList.add('hidden');
  } else {
    agingPanel.classList.remove('hidden');
  }

  const recipe = RECIPES.find(r => r.id === state.currentRecipeId);
  if (!recipe.distill) return;

  const vSpirit = Math.max(1.0, state.batch.heartsVolumeMl / 1000);
  const targetAbv = state.batch.targetAbv;
  const vWater = (vSpirit * (76.5 / targetAbv - 1)).toFixed(2);
  const totalVolume = parseFloat(vSpirit) + parseFloat(vWater);
  const bottles = Math.round((totalVolume / 0.5));

  document.getElementById('water-needed-val').innerText = `${vWater} л`;
  document.getElementById('bottles-count-val').innerText = `${bottles} шт.`;
}

// --- SOMMELIER RATING & SALE ---
function finishBottlingAndEvaluate() {
  playClinkSound();
  document.getElementById('stage-bottling').classList.add('hidden');
  document.getElementById('stage-evaluation').classList.remove('hidden');

  const brand = document.getElementById('brand-name-input').value || 'Artisan Reserve';
  document.getElementById('eval-brand').innerText = `«${brand}»`;

  let score = state.batch.purityScore;
  const barrel = document.getElementById('barrel-type-select').value;
  const years = state.batch.agingYears;
  const recipe = RECIPES.find(r => r.id === state.currentRecipeId);

  if (barrel !== 'none') {
    score = Math.min(99, score + (years * 1.5));
  }

  document.getElementById('eval-score').innerText = Math.round(score);
  document.getElementById('eval-abv').innerText = `${state.batch.targetAbv}%`;
  document.getElementById('eval-aging').innerText = barrel === 'none' ? 'Без бочки' : `${years} г. дуб`;
  document.getElementById('eval-purity').innerText = `${state.batch.purityScore}%`;

  const notes = generateSommelierNotes(recipe, barrel, years, score);
  document.getElementById('eval-tasting-notes').innerText = `«${notes}»`;

  const bottlesCount = parseInt(document.getElementById('bottles-count-val').innerText) || 9;
  const pricePerBottle = Math.round(400 + (score * 6.0) + (years * 110));
  const totalRev = bottlesCount * pricePerBottle;

  document.getElementById('eval-bottles-num').innerText = bottlesCount;
  document.getElementById('eval-price-per-bottle').innerText = pricePerBottle;
  document.getElementById('eval-total-revenue').innerText = `+${totalRev.toLocaleString()} ₽`;

  state.batch.lastRevenue = totalRev;
}

function generateSommelierNotes(recipe, barrel, years, score) {
  if (score < 60) {
    return 'Ужасающий сивушный привкус с нотами растворителя, мокрой картошки и ацетона. Головы или хвосты попали в тело. Пить опасно для здоровья!';
  }

  const profiles = {
    whiskey: 'Богатый ячменный солод, вересковый мед, легкий торфяной дым и согревающее солодовое послевкусие.',
    bourbon: 'Сладкая жареная кукуруза, стручковая ваниль, кленовый сироп и поджаренный дубовый тост.',
    irish_whiskey: 'Невероятно мягкий сливочный вкус с нюансами зеленого яблока, груши и белого персика.',
    rye_whiskey: 'Дерзкий, пряный, перечный характер с оттенками гвоздики, мяты и сухой дубовой коры.',
    vodka: 'Идеальная кристальная чистота, абсолютная мягкость и тонкий оттенок пшеничной корочки.',
    moonshine: 'Душевный, хлебный аромат домашнего полугара с мягким теплом в груди и нотами ржаного зерна.',
    cognac: 'Благородный рансьо, инжир, сушеный абрикос, мускатный орех и тончайшие лимузенские танины.',
    calvados: 'Спелое запеченное яблоко, корица, свежий сидровый тон и карамелизированная груша.',
    grappa: 'Пышный мускатный букет, цветочный виноградный тон и деликатное миндальное послевкусие.',
    kirsch: 'Аромат дикой черешни, марципана и косточковых масел. Необычайно свежий сухой финиш.',
    slivovitz: 'Аутентичный балканский профиль: чернослив, сушеная слива и легкая дубовая сладость.',
    pisco: 'Яркие тропические цветы, свежий мускат, лайм и кристальная фруктовая минеральность.',
    wine_red: 'Шелковистые танины, черная смородина, ежевика, темный шоколад и кедровая шкатулка.',
    wine_white: 'Хрустящая свежесть, хрустящее зеленое яблоко, сливочное масло и цитрусовая цедра.',
    champagne: 'Миллиарды тонких пузырьков, поджаренная бриошь, фундук, белый мел и спелое яблоко.',
    port_wine: 'Густой рубиновый нектар, вяленый инжир, грецкий орех, чернослив и бархатная сладость.',
    rum: 'Тропическая бомба: патока, карамель, темный шоколад, банан фламбе и пряный табак.',
    cachaca: 'Свежескошенный сахарный тростник, сок лайма, травы и яркая бразильская экспрессия.',
    tequila: 'Сладкая печеная агава, белый перец, легкий цитрус и мягкая ваниль из дубовой бочки.',
    mezcal: 'Глубокий земляной дым, запеченная агава, копченая паприка и минеральная соль.',
    sake: 'Тончайший аромат дыни, цветущей сакуры, рисового пудинга и чистого родника.',
    soju: 'Нежнейший, гладкий рисовый вкус с деликатной сладостью батата, пьется как родниковая вода.',
    baijiu: 'Колоссальная глубина умами: соевый соус, ферментированное зерно, ананас и анис.',
    gin: 'Взрыв северного можжевельника, кориандр, цедра горького апельсина и хвойный морозный бриз.',
    absinthe: 'Изумрудная полынная горечь, сладковатый зеленый анис, фенхель и мистический долгий финиш.',
    ouzo: 'Пряный греческий анис, бадьян, мастика и освежающий средиземноморский бриз.',
    krauterlikor: 'Комплексный горько-сладкий травяной аккорд из 56 трав, имбиря, шафрана и корней.',
    limoncello: 'Солнечный удар амальфитанских лимонов, густая цитрусовая сладость и морозный финиш.',
    beer_ipa: 'Взрывная волна хмеля Citra: маракуйя, манго, грейпфрут и благородная хвойная смола.',
    beer_stout: 'Чёрный как ночь имперский стаут: эспрессо, бельгийский горький шоколад и дым.',
    beer_weizen: 'Пышная сливочная шапка, спелый банан, пряная гвоздика и свежий пшеничный мякиш.',
    beer_pilsner: 'Золотой цвет, хрустящая солодовая сладость и сухая благородная травянистая горечь Saaz.',
    cider: 'Освежающий хрустящий яблочный сок, тонкая яблочная танинность и сухой звонкий финиш.',
    mead: 'Божественный липовый мёд, полевые травы, цветочный воск и легкое хмельное тепло.'
  };

  let note = profiles[recipe.id] || 'Превосходный сбалансированный крафтовый напиток.';
  if (barrel !== 'none' && years > 0) {
    note += ` Дополнительные ${years} года в бочке добавили плотность, танины и округлый дубовый шлейф.`;
  }
  return note;
}

function sellBatchAndNewGame() {
  playClinkSound();
  state.balance += state.batch.lastRevenue || 3800;
  document.getElementById('player-balance').innerText = state.balance.toLocaleString();

  document.getElementById('stage-evaluation').classList.add('hidden');
  document.getElementById('stage-mashing').classList.remove('hidden');

  ['1', '2', '3', '4'].forEach(id => {
    document.getElementById(`step-dot-${id}`).className = 'step-badge flex items-center space-x-1 text-zinc-500';
  });
  document.getElementById('step-dot-1').className = 'step-badge flex items-center space-x-1 text-copper-400 font-bold';

  state.batch.stillTemp = 20.0;
  state.batch.headsVolumeMl = 0;
  state.batch.heartsVolumeMl = 0;
  state.batch.tailsVolumeMl = 0;
  state.batch.purityScore = 98;
  document.getElementById('start-mash-btn').disabled = false;
  document.getElementById('start-mash-btn').classList.remove('opacity-50', 'cursor-not-allowed');
  document.getElementById('start-mash-btn').innerHTML = '<span>🔥</span><span>Затереть солод и нагреть</span>';
  document.getElementById('mash-progress').style.width = '0%';
  document.getElementById('mash-timer-text').innerText = '0%';
}

// --- RECIPES ENCYCLOPEDIA RENDER ---
function renderRecipesList(list) {
  const container = document.getElementById('recipes-list');
  container.innerHTML = list.map(r => `
    <div class="bg-[#171311] p-3 rounded-xl border border-[#332822] space-y-1.5">
      <div class="flex justify-between items-start">
        <h3 class="text-xs font-bold text-copper-300 flex items-center space-x-1">
          <span>${r.icon}</span><span>${r.name}</span>
        </h3>
        <span class="text-[9px] bg-zinc-800 text-amber-300 font-mono px-2 py-0.5 rounded-full">${r.defaultAbv}% ABV</span>
      </div>
      <p class="text-[11px] text-zinc-300 leading-relaxed">${r.desc}</p>
      <div class="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 font-mono pt-1 border-t border-[#2a201a]">
        <div>🌾 Сырьё: <span class="text-zinc-200">${r.baseName}</span></div>
        <div>🪵 Выдержка: <span class="text-amber-400">${r.aging}</span></div>
      </div>
      <button onclick="applyRecipeAndCook('${r.id}')" class="w-full mt-1 py-1.5 bg-[#261f1b] hover:bg-copper-700/40 border border-[#403129] rounded-lg text-xs text-copper-300 font-bold transition">
        Сварить по этой техкарте ➔
      </button>
    </div>
  `).join('');
}

function searchRecipes(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderRecipesList(RECIPES);
    return;
  }
  const filtered = RECIPES.filter(r => 
    r.name.toLowerCase().includes(q) || 
    r.desc.toLowerCase().includes(q) || 
    r.baseName.toLowerCase().includes(q)
  );
  renderRecipesList(filtered);
}

function applyRecipeAndCook(id) {
  selectRecipe(id);
  switchTab('lab');
}

// --- CELLAR & BARRELS ---
function renderCellarBarrels() {
  const list = [
    { name: 'Highlands Single Malt Scotch', barrel: 'Американский белый дуб', time: '4 года 2 мес.', abv: '61.4%', icon: '🛢️' },
    { name: 'Kentucky Rye Bourbon 1888', barrel: 'Обожженный дуб Alligator', time: '2 года 7 мес.', abv: '58.5%', icon: '🛢️' },
    { name: 'Château Fine Cognac XO', barrel: 'Лимузенский французский дуб', time: '8 лет', abv: '42.0%', icon: '🛢️' },
    { name: 'Jalisco Blue Agave Reposado', barrel: 'Бочка из-под бурбона', time: '9 месяцев', abv: '40.0%', icon: '🛢️' }
  ];

  const container = document.getElementById('cellar-barrels-list');
  container.innerHTML = list.map(b => `
    <div class="bg-[#171311] p-3 rounded-xl border border-[#332822] flex items-center justify-between">
      <div class="flex items-center space-x-2.5">
        <span class="text-2xl">${b.icon}</span>
        <div>
          <div class="text-xs font-bold text-copper-300">${b.name}</div>
          <div class="text-[10px] text-zinc-400">${b.barrel}</div>
          <div class="text-[10px] text-amber-400 font-mono">Выдержка: ${b.time} (${b.abv})</div>
        </div>
      </div>
      <button onclick="alert('Бочка созревает и набирает танины!')" class="px-2.5 py-1.5 bg-[#261f1b] border border-[#403129] rounded-lg text-xs text-zinc-300 hover:text-white">
        Проба
      </button>
    </div>
  `).join('');
}

// --- STORE ITEMS ---
function renderStoreItems() {
  const items = [
    { name: 'Торфяной солод Peated Malt (25 кг)', desc: 'Шотландский ячмень с дымком для островного виски', price: 1400 },
    { name: 'Нектар Голубой Агавы Weber (10 кг)', desc: 'Мексиканское сырье для настоящей 100% Tequila', price: 2200 },
    { name: 'Хмель Citra & Mosaic T-90 (500 г)', desc: 'Взрыв цитрусов и манго для крафтового IPA', price: 850 },
    { name: 'Французская бочка из-под Хереса (50 л)', desc: 'Испанский дуб, насыщенный вином Oloroso Sherry', price: 4500 },
    { name: 'Набор ботаникалов для Абсента (полынь, анис, фенхель)', desc: 'Альпийские травы высшей категории', price: 950 },
    { name: 'Грибок Кодзи для Саке и Соджу (1 кг)', desc: 'Ферменты для холодного осахаривания риса', price: 1200 }
  ];

  const container = document.getElementById('store-items-list');
  container.innerHTML = items.map(item => `
    <div class="bg-[#171311] p-2.5 rounded-xl border border-[#332822] flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-zinc-200">${item.name}</div>
        <div class="text-[10px] text-zinc-400">${item.desc}</div>
      </div>
      <button onclick="buyIngredient('${item.name}', ${item.price})" class="px-3 py-1.5 bg-copper-600 hover:bg-copper-500 rounded-lg text-xs font-bold text-white font-mono whitespace-nowrap ml-2">
        ${item.price.toLocaleString()} ₽
      </button>
    </div>
  `).join('');
}

function buyIngredient(name, price) {
  playClickSound();
  if (state.balance < price) {
    alert('Недостаточно монет! Свари и продай партию напитка.');
    return;
  }
  state.balance -= price;
  document.getElementById('player-balance').innerText = state.balance.toLocaleString();
  alert(`Куплено: ${name}! Добавлено на склад винокурни.`);
}

// --- TAB SWITCHING ---
function switchTab(tabId) {
  playClickSound();
  document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-copper-500', 'text-copper-400', 'font-bold');
    btn.classList.add('border-transparent', 'text-zinc-400');
  });

  document.getElementById(`view-${tabId}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`tab-${tabId}`);
  activeBtn.classList.add('border-copper-500', 'text-copper-400', 'font-bold');
  activeBtn.classList.remove('border-transparent', 'text-zinc-400');
}
