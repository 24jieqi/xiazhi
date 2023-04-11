const langMap = {
  zh: {
    zhName: '中文(简体)',
    enName: 'Chinese',
    pinyin: 'zhongwenjianti',
  },
  en: {
    zhName: '英语',
    enName: 'English',
    pinyin: 'yingyu',
  },
  vie: {
    zhName: '越南语',
    enName: 'Vietnamese',
    pinyin: 'yuenanyu',
  },
  th: {
    zhName: '泰语',
    enName: 'Thai',
    pinyin: 'taiyu',
  },
  jp: {
    zhName: '日语',
    enName: 'Japanese',
    pinyin: 'riyu',
  },
  spa: {
    zhName: '西班牙语',
    enName: 'Spanish',
    pinyin: 'xibanyayu',
  },
  ara: {
    zhName: '阿拉伯语',
    enName: 'Arabic',
    pinyin: 'alaboyu',
  },
  fra: {
    zhName: '法语',
    enName: 'French',
    pinyin: 'fayu',
  },
  kor: {
    zhName: '韩语',
    enName: 'Korean',
    pinyin: 'hanyu',
  },
  ru: {
    zhName: '俄语',
    enName: 'Russian',
    pinyin: 'eyu',
  },
  de: {
    zhName: '德语',
    enName: 'German',
    pinyin: 'deyu',
  },
  pt: {
    zhName: '葡萄牙语',
    enName: 'Portuguese',
    pinyin: 'putaoyayu',
  },
  it: {
    zhName: '意大利语',
    enName: 'Italian',
    pinyin: 'yidaliyu',
  },
  el: {
    zhName: '希腊语',
    enName: 'Greek',
    pinyin: 'xilayu',
  },
  nl: {
    zhName: '荷兰语',
    enName: 'Dutch',
    pinyin: 'helanyu',
  },
  pl: {
    zhName: '波兰语',
    enName: 'Polish',
    pinyin: 'bolanyu',
  },
  fin: {
    zhName: '芬兰语',
    enName: 'Finnish',
    pinyin: 'fenlanyu',
  },
  cs: {
    zhName: '捷克语',
    enName: 'Czech',
    pinyin: 'jiekeyu',
  },
  bul: {
    zhName: '保加利亚语',
    enName: 'Bulgarian',
    pinyin: 'baojialiyayu',
  },
  dan: {
    zhName: '丹麦语',
    enName: 'Danish',
    pinyin: 'danmaiyu',
  },
  est: {
    zhName: '爱沙尼亚语',
    enName: 'Estonian',
    pinyin: 'aishaniyayu',
  },
  hu: {
    zhName: '匈牙利语',
    enName: 'Hungarian',
    pinyin: 'xiongyaliyu',
  },
  rom: {
    zhName: '罗马尼亚语',
    enName: 'Romanian',
    pinyin: 'luomaniyayu',
  },
  slo: {
    zhName: '斯洛文尼亚语',
    enName: 'Slovenian',
    pinyin: 'siluowenniyayu',
  },
  swe: {
    zhName: '瑞典语',
    enName: 'Swedish',
    pinyin: 'ruidianyu',
  },
  yue: {
    zhName: '中文(粤语)',
    enName: 'Cantonese',
    pinyin: 'zhongwenyueyu',
  },
  cht: {
    zhName: '中文(繁体)',
    enName: 'Traditional Chinese',
    pinyin: 'zhongwenfanti',
  },
  wyw: {
    zhName: '中文(文言文)',
    enName: 'Classical Chinese',
    pinyin: 'zhongwenwenyanwen',
  },
  afr: {
    zhName: '南非荷兰语',
    enName: 'Afrikaans',
    pinyin: 'nanfeihelanyu',
  },
  alb: {
    zhName: '阿尔巴尼亚语',
    enName: 'Albanian',
    pinyin: 'aerbaniyayu',
  },
  amh: {
    zhName: '阿姆哈拉语',
    enName: 'Amharic',
    pinyin: 'amuhalayu',
  },
  arm: {
    zhName: '亚美尼亚语',
    enName: 'Armenian',
    pinyin: 'yameiniyayu',
  },
  asm: {
    zhName: '阿萨姆语',
    enName: 'Assamese',
    pinyin: 'asamuyu',
  },
  ast: {
    zhName: '阿斯图里亚斯语',
    enName: 'Asturian',
    pinyin: 'asituliyasiyu',
  },
  aze: {
    zhName: '阿塞拜疆语',
    enName: 'Azerbaijani',
    pinyin: 'asaibaijiangyu',
  },
  baq: {
    zhName: '巴斯克语',
    enName: 'Basque',
    pinyin: 'basikeyu',
  },
  bel: {
    zhName: '白俄罗斯语',
    enName: 'Belarusian',
    pinyin: 'baieluosiyu',
  },
  ben: {
    zhName: '孟加拉语',
    enName: 'Bengali',
    pinyin: 'mengjialayu',
  },
  bos: {
    zhName: '波斯尼亚语',
    enName: 'Bosnian',
    pinyin: 'bosiniyayu',
  },
  bur: {
    zhName: '缅甸语',
    enName: 'Burmese',
    pinyin: 'miandianyu',
  },
  cat: {
    zhName: '加泰罗尼亚语',
    enName: 'Catalan',
    pinyin: 'jiatailuoniyayu',
  },
  ceb: {
    zhName: '宿务语',
    enName: 'Cebuano',
    pinyin: 'suwuyu',
  },
  hrv: {
    zhName: '克罗地亚语',
    enName: 'Croatian',
    pinyin: 'keluodiyayu',
  },
  epo: {
    zhName: '世界语',
    enName: 'Esperanto',
    pinyin: 'shijieyu',
  },
  fao: {
    zhName: '法罗语',
    enName: 'Faroese',
    pinyin: 'faluoyu',
  },
  fil: {
    zhName: '菲律宾语',
    enName: 'Filipino',
    pinyin: 'feilvbinyu',
  },
  glg: {
    zhName: '加利西亚语',
    enName: 'Galician',
    pinyin: 'jialixiyayu',
  },
  geo: {
    zhName: '格鲁吉亚语',
    enName: 'Georgian',
    pinyin: 'gelujiyayu',
  },
  guj: {
    zhName: '古吉拉特语',
    enName: 'Gujarati',
    pinyin: 'gujilateyu',
  },
  hau: {
    zhName: '豪萨语',
    enName: 'Hausa',
    pinyin: 'haosayu',
  },
  heb: {
    zhName: '希伯来语',
    enName: 'Hebrew',
    pinyin: 'xibolaiyu',
  },
  hi: {
    zhName: '印地语',
    enName: 'Hindi',
    pinyin: 'yindiyu',
  },
  ice: {
    zhName: '冰岛语',
    enName: 'Icelandic',
    pinyin: 'bingdaoyu',
  },
  ibo: {
    zhName: '伊博语',
    enName: 'Igbo',
    pinyin: 'yiboyu',
  },
  id: {
    zhName: '印尼语',
    enName: 'Indonesian',
    pinyin: 'yinniyu',
  },
  gle: {
    zhName: '爱尔兰语',
    enName: 'Irish',
    pinyin: 'aierlanyu',
  },
  kan: {
    zhName: '卡纳达语',
    enName: 'Kannada',
    pinyin: 'kanadayu',
  },
  kli: {
    zhName: '克林贡语',
    enName: 'Klingon',
    pinyin: 'kelingongyu',
  },
  kur: {
    zhName: '库尔德语',
    enName: 'Kurdish',
    pinyin: 'kuerdeyu',
  },
  lao: {
    zhName: '老挝语',
    enName: 'Lao',
    pinyin: 'laozhuayu',
  },
  lat: {
    zhName: '拉丁语',
    enName: 'Latin',
    pinyin: 'ladingyu',
  },
  lav: {
    zhName: '拉脱维亚语',
    enName: 'Latvian',
    pinyin: 'latuoweiyayu',
  },
  lit: {
    zhName: '立陶宛语',
    enName: 'Lithuanian',
    pinyin: 'litaowanyu',
  },
  ltz: {
    zhName: '卢森堡语',
    enName: 'Luxembourgish',
    pinyin: 'lusenbaoyu',
  },
  mac: {
    zhName: '马其顿语',
    enName: 'Macedonian',
    pinyin: 'maqidunyu',
  },
  mg: {
    zhName: '马拉加斯语',
    enName: 'Malagasy',
    pinyin: 'malajiasiyu',
  },
  may: {
    zhName: '马来语',
    enName: 'Malay',
    pinyin: 'malaiyu',
  },
  mal: {
    zhName: '马拉雅拉姆语',
    enName: 'Malayalam',
    pinyin: 'malayalamuyu',
  },
  mlt: {
    zhName: '马耳他语',
    enName: 'Maltese',
    pinyin: 'maertayu',
  },
  mar: {
    zhName: '马拉地语',
    enName: 'Marathi',
    pinyin: 'maladiyu',
  },
  nep: {
    zhName: '尼泊尔语',
    enName: 'Nepali',
    pinyin: 'niboeryu',
  },
  nno: {
    zhName: '新挪威语',
    enName: 'Nynorsk',
    pinyin: 'xinnuoweiyu',
  },
  per: {
    zhName: '波斯语',
    enName: 'Persian',
    pinyin: 'bosiyu',
  },
  srd: {
    zhName: '萨丁尼亚语',
    enName: 'Sardinian',
    pinyin: 'sadingniyayu',
  },
  srp: {
    zhName: '塞尔维亚语(拉丁文)',
    enName: 'Serbian',
    pinyin: 'saierweiyayu',
  },
  sin: {
    zhName: '僧伽罗语 ',
    enName: 'Sinhala',
    pinyin: 'sengqieluoyu',
  },
  sk: {
    zhName: '斯洛伐克语',
    enName: 'Slovak',
    pinyin: 'siluofakeyu',
  },
  som: {
    zhName: '索马里语',
    enName: 'Somali',
    pinyin: 'suomaliyu',
  },
  swa: {
    zhName: '斯瓦希里语',
    enName: 'Swahili',
    pinyin: 'siwaxiliyu',
  },
  tgl: {
    zhName: '他加禄语',
    enName: 'Tagalog',
    pinyin: 'tajialuyu',
  },
  tgk: {
    zhName: '塔吉克语',
    enName: 'Tajik',
    pinyin: 'tajikeyu',
  },
  tam: {
    zhName: '泰米尔语',
    enName: 'Tamil',
    pinyin: 'taimieryu',
  },
  tat: {
    zhName: '鞑靼语',
    enName: 'Tatar',
    pinyin: 'dadayu',
  },
  tel: {
    zhName: '泰卢固语',
    enName: 'Telugu',
    pinyin: 'tailuguyu',
  },
  tr: {
    zhName: '土耳其语',
    enName: 'Turkish',
    pinyin: 'tuerqiyu',
  },
  tuk: {
    zhName: '土库曼语',
    enName: 'Turkmen',
    pinyin: 'tukumanyu',
  },
  ukr: {
    zhName: '乌克兰语',
    enName: 'Ukrainian',
    pinyin: 'wukelanyu',
  },
  urd: {
    zhName: '乌尔都语',
    enName: 'Urdu',
    pinyin: 'wuerduyu',
  },
  oci: {
    zhName: '奥克语',
    enName: 'Occitan',
    pinyin: 'aokeyu',
  },
  kir: {
    zhName: '吉尔吉斯语',
    enName: 'Kyrgyz',
    pinyin: 'jierjisiyu',
  },
  pus: {
    zhName: '普什图语',
    enName: 'Pashto',
    pinyin: 'pushituyu',
  },
  hkm: {
    zhName: '高棉语',
    enName: 'Khmer',
    pinyin: 'gaomianyu',
  },
  ht: {
    zhName: '海地语',
    enName: 'Haitian Creole',
    pinyin: 'haidiyu',
  },
  nob: {
    zhName: '书面挪威语',
    enName: 'Bokmål',
    pinyin: 'shumiannuoweiyu',
  },
  pan: {
    zhName: '旁遮普语',
    enName: 'Punjabi',
    pinyin: 'pangzhepuyu',
  },
  arq: {
    zhName: '阿尔及利亚阿拉伯语',
    enName: 'Algerian Arabic',
    pinyin: 'aerjiliyaalaboyu',
  },
  bis: {
    zhName: '比斯拉马语',
    enName: 'Bislama',
    pinyin: 'bisilamayu',
  },
  frn: {
    zhName: '加拿大法语',
    enName: 'Canadian French',
    pinyin: 'jianadafayu',
  },
  hak: {
    zhName: '哈卡钦语',
    enName: 'Hakha Chin',
    pinyin: 'hakaqinyu',
  },
  hup: {
    zhName: '胡帕语',
    enName: 'Hupa',
    pinyin: 'hupayu',
  },
  ing: {
    zhName: '印古什语',
    enName: 'Ingush',
    pinyin: 'yingushiyu',
  },
  lag: {
    zhName: '拉特加莱语',
    enName: 'Latgalian',
    pinyin: 'latejialaiyu',
  },
  mau: {
    zhName: '毛里求斯克里奥尔语',
    enName: 'Mauritian Creole',
    pinyin: 'maoliqiusikeliaoeryu',
  },
  mot: {
    zhName: '黑山语',
    enName: 'Montenegrin',
    pinyin: 'heishanyu',
  },
  pot: {
    zhName: '巴西葡萄牙语',
    enName: 'Brazilian Portuguese',
    pinyin: 'baxiputaoyayu',
  },
  ruy: {
    zhName: '卢森尼亚语',
    enName: 'Rusyn',
    pinyin: 'lusenniyayu',
  },
  sec: {
    zhName: '塞尔维亚-克罗地亚语',
    enName: 'Serbo-Croatian',
    pinyin: 'saierweiya-keluodiyayu',
  },
  sil: {
    zhName: '西里西亚语',
    enName: 'Silesian',
    pinyin: 'xilixiyayu',
  },
  tua: {
    zhName: '突尼斯阿拉伯语',
    enName: 'Tunisian Arabic',
    pinyin: 'tunisialaboyu',
  },
  ach: {
    zhName: '亚齐语',
    enName: 'Achinese',
    pinyin: 'yaqiyu',
  },
  aka: {
    zhName: '阿肯语',
    enName: 'Akan',
    pinyin: 'akenyu',
  },
  arg: {
    zhName: '阿拉贡语',
    enName: 'Aragonese',
    pinyin: 'alagongyu',
  },
  aym: {
    zhName: '艾马拉语',
    enName: 'Aymara',
    pinyin: 'aimalayu',
  },
  bal: {
    zhName: '俾路支语',
    enName: 'Baluchi',
    pinyin: 'biluzhiyu',
  },
  bak: {
    zhName: '巴什基尔语',
    enName: 'Bashkir',
    pinyin: 'bashijieryu',
  },
  bem: {
    zhName: '本巴语',
    enName: 'Bemba',
    pinyin: 'benbayu',
  },
  ber: {
    zhName: '柏柏尔语',
    enName: 'Berber languages',
    pinyin: 'baibaieryu',
  },
  bho: {
    zhName: '博杰普尔语',
    enName: 'Bhojpuri',
    pinyin: 'bojiepueryu',
  },
  bli: {
    zhName: '比林语',
    enName: 'Blin',
    pinyin: 'bilinyu',
  },
  bre: {
    zhName: '布列塔尼语',
    enName: 'Breton',
    pinyin: 'bulietaniyu',
  },
  chr: {
    zhName: '切罗基语',
    enName: 'Cherokee',
    pinyin: 'qieluojiyu',
  },
  nya: {
    zhName: '齐切瓦语',
    enName: 'Chichewa',
    pinyin: 'qiqiewayu',
  },
  chv: {
    zhName: '楚瓦什语',
    enName: 'Chuvash',
    pinyin: 'chuwashiyu',
  },
  cor: {
    zhName: '康瓦尔语',
    enName: 'Cornish',
    pinyin: 'kangwaeryu',
  },
  cos: {
    zhName: '科西嘉语',
    enName: 'Corsican',
    pinyin: 'kexijiayu',
  },
  cre: {
    zhName: '克里克语',
    enName: 'Creek',
    pinyin: 'kelikeyu',
  },
  cri: {
    zhName: '克里米亚鞑靼语',
    enName: 'Crimean Tatar',
    pinyin: 'kelimiyadadayu',
  },
  div: {
    zhName: '迪维希语',
    enName: 'Divehi',
    pinyin: 'diweixiyu',
  },
  eno: {
    zhName: '古英语',
    enName: 'Old English',
    pinyin: 'guyingyu',
  },
  frm: {
    zhName: '中古法语',
    enName: 'Middle French',
    pinyin: 'zhonggufayu',
  },
  fri: {
    zhName: '弗留利语',
    enName: 'Friulian',
    pinyin: 'fuliuliyu',
  },
  ful: {
    zhName: '富拉尼语',
    enName: 'Fulani',
    pinyin: 'fulaniyu',
  },
  gla: {
    zhName: '盖尔语',
    enName: 'Gaelic',
    pinyin: 'gaieryu',
  },
  lug: {
    zhName: '卢干达语',
    enName: 'Luganda',
    pinyin: 'lugandayu',
  },
  gra: {
    zhName: '古希腊语',
    enName: 'Ancient Greek',
    pinyin: 'guxilayu',
  },
  grn: {
    zhName: '瓜拉尼语',
    enName: 'Guarani',
    pinyin: 'gualaniyu',
  },
  haw: {
    zhName: '夏威夷语',
    enName: 'Hawaiian',
    pinyin: 'xiaweiyiyu',
  },
  hil: {
    zhName: '希利盖农语',
    enName: 'Hiligaynon',
    pinyin: 'xiligainongyu',
  },
  ido: {
    zhName: '伊多语',
    enName: 'Ido',
    pinyin: 'yiduoyu',
  },
  ina: {
    zhName: '因特语',
    enName: 'Interlingua ',
    pinyin: 'yinteyu',
  },
  iku: {
    zhName: '伊努克提图特语',
    enName: 'Inuktitut',
    pinyin: 'yinuketituteyu',
  },
  jav: {
    zhName: '爪哇语',
    enName: 'Javanese',
    pinyin: 'zhaowayu',
  },
  kab: {
    zhName: '卡拜尔语',
    enName: 'Kabyle',
    pinyin: 'kabaieryu',
  },
  kal: {
    zhName: '格陵兰语',
    enName: 'Kalaallisut',
    pinyin: 'gelinglanyu',
  },
  kau: {
    zhName: '卡努里语',
    enName: 'Kanuri',
    pinyin: 'kanuliyu',
  },
  kas: {
    zhName: '克什米尔语',
    enName: 'Kashmiri',
    pinyin: 'keshimieryu',
  },
  kah: {
    zhName: '卡舒比语',
    enName: 'Kashubian',
    pinyin: 'kashubiyu',
  },
  kin: {
    zhName: '卢旺达语',
    enName: 'Kinyarwanda',
    pinyin: 'luwangdayu',
  },
  kon: {
    zhName: '刚果语',
    enName: 'Kongo',
    pinyin: 'gangguoyu',
  },
  kok: {
    zhName: '孔卡尼语',
    enName: 'Konkani',
    pinyin: 'kongkaniyu',
  },
  lim: {
    zhName: '林堡语',
    enName: 'Limburgish',
    pinyin: 'linbaoyu',
  },
  lin: {
    zhName: '林加拉语',
    enName: 'Lingala',
    pinyin: 'linjialayu',
  },
  loj: {
    zhName: '逻辑语',
    enName: 'Lojban',
    pinyin: 'luojiyu',
  },
  log: {
    zhName: '低地德语',
    enName: 'Low German',
    pinyin: 'didideyu',
  },
  los: {
    zhName: '下索布语',
    enName: 'Lower Sorbian',
    pinyin: 'xiasuobuyu',
  },
  mai: {
    zhName: '迈蒂利语',
    enName: 'Maithili',
    pinyin: 'maidiliyu',
  },
  glv: {
    zhName: '曼克斯语',
    enName: 'Manx',
    pinyin: 'mankesiyu',
  },
  mao: {
    zhName: '毛利语',
    enName: 'Maori',
    pinyin: 'maoliyu',
  },
  mah: {
    zhName: '马绍尔语',
    enName: 'Marshallese',
    pinyin: 'mashaoeryu',
  },
  nbl: {
    zhName: '南恩德贝莱语',
    enName: 'Southern Ndebele',
    pinyin: 'nanendebeilaiyu',
  },
  nea: {
    zhName: '那不勒斯语',
    enName: 'Neapolitan',
    pinyin: 'nabulesiyu',
  },
  nqo: {
    zhName: '西非书面语',
    enName: "N'Ko",
    pinyin: 'xifeishumianyu',
  },
  sme: {
    zhName: '北方萨米语',
    enName: 'Northern Sami',
    pinyin: 'beifangsamiyu',
  },
  nor: {
    zhName: '挪威语',
    enName: 'Norwegian',
    pinyin: 'nuoweiyu',
  },
  oji: {
    zhName: '奥杰布瓦语',
    enName: 'Ojibwa',
    pinyin: 'aojiebuwayu',
  },
  ori: {
    zhName: '奥里亚语',
    enName: 'Oriya',
    pinyin: 'aoliyayu',
  },
  orm: {
    zhName: '奥罗莫语',
    enName: 'Oromo',
    pinyin: 'aoluomoyu',
  },
  oss: {
    zhName: '奥塞梯语',
    enName: 'Ossetian',
    pinyin: 'aosaitiyu',
  },
  pam: {
    zhName: '邦板牙语',
    enName: 'Pampanga',
    pinyin: 'bangbanyayu',
  },
  pap: {
    zhName: '帕皮阿门托语',
    enName: 'Papiamento',
    pinyin: 'papiamentuoyu',
  },
  ped: {
    zhName: '北索托语',
    enName: 'Northern Sotho',
    pinyin: 'beisuotuoyu',
  },
  que: {
    zhName: '克丘亚语',
    enName: 'Quechua',
    pinyin: 'keqiuyayu',
  },
  roh: {
    zhName: '罗曼什语',
    enName: 'Romansh',
    pinyin: 'luomanshiyu',
  },
  ro: {
    zhName: '罗姆语',
    enName: 'Romany',
    pinyin: 'luomuyu',
  },
  sm: {
    zhName: '萨摩亚语',
    enName: 'Samoan',
    pinyin: 'samoyayu',
  },
  san: {
    zhName: '梵语',
    enName: 'Sanskrit',
    pinyin: 'fanyu',
  },
  sco: {
    zhName: '苏格兰语',
    enName: 'Scots',
    pinyin: 'sugelanyu',
  },
  sha: {
    zhName: '掸语',
    enName: 'Shan',
    pinyin: 'shanyu',
  },
  sna: {
    zhName: '修纳语',
    enName: 'Shona',
    pinyin: 'xiunayu',
  },
  snd: {
    zhName: '信德语',
    enName: 'Sindhi',
    pinyin: 'xindeyu',
  },
  sol: {
    zhName: '桑海语',
    enName: 'Songhai languages',
    pinyin: 'sanghaiyu',
  },
  sot: {
    zhName: '南索托语',
    enName: 'Southern Sotho',
    pinyin: 'nansuotuoyu',
  },
  syr: {
    zhName: '叙利亚语',
    enName: 'Syriac',
    pinyin: 'xuliyayu',
  },
  tet: {
    zhName: '德顿语',
    enName: 'Tetum',
    pinyin: 'dedunyu',
  },
  tir: {
    zhName: '提格利尼亚语',
    enName: 'Tigrinya',
    pinyin: 'tigeliniyayu',
  },
  tso: {
    zhName: '聪加语',
    enName: 'Tsonga',
    pinyin: 'congjiayu',
  },
  twi: {
    zhName: '契维语',
    enName: 'Twi',
    pinyin: 'qiweiyu',
  },
  ups: {
    zhName: '高地索布语',
    enName: 'Upper Sorbian',
    pinyin: 'gaodisuobuyu',
  },
  ven: {
    zhName: '文达语',
    enName: 'Venda',
    pinyin: 'wendayu',
  },
  wln: {
    zhName: '瓦隆语',
    enName: 'Walloon',
    pinyin: 'walongyu',
  },
  wel: {
    zhName: '威尔士语',
    enName: 'Welsh',
    pinyin: 'weiershiyu',
  },
  fry: {
    zhName: '西弗里斯语',
    enName: 'Western Frisian',
    pinyin: 'xifulisiyu',
  },
  wol: {
    zhName: '沃洛夫语',
    enName: 'Wolof',
    pinyin: 'woluofuyu',
  },
  xho: {
    zhName: '科萨语',
    enName: 'Xhosa',
    pinyin: 'kesayu',
  },
  yid: {
    zhName: '意第绪语',
    enName: 'Yiddish',
    pinyin: 'yidixuyu',
  },
  yor: {
    zhName: '约鲁巴语',
    enName: 'Yoruba',
    pinyin: 'yuelubayu',
  },
  zaz: {
    zhName: '扎扎其语',
    enName: 'Zaza',
    pinyin: 'zhazhaqiyu',
  },
  zul: {
    zhName: '祖鲁语',
    enName: 'Zulu',
    pinyin: 'zuluyu',
  },
  sun: {
    zhName: '巽他语',
    enName: 'BasaSunda',
    pinyin: 'xuntayu',
  },
  hmn: {
    zhName: '苗语',
    enName: 'Hmong',
    pinyin: 'miaoyu',
  },
  src: {
    zhName: '塞尔维亚语(西里尔文)',
    enName: 'Serb(Cyrillic)',
    pinyin: 'saierweiyayu',
  },
}

export default langMap
