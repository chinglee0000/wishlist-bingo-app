export interface BingoGoal {
  id: string;
  text: string;
  category: string;
  subcategory?: string;
}

export interface BingoCategory {
  id: string;
  name: string;
  icon: string;
  className: string;
  gridSize: number;
  subcategories?: BingoSubcategory[];
}

export interface BingoSubcategory {
  id: string;
  name: string;
  gridSize: number;
  goals: BingoGoal[];
}

// 投資理財 5x5
const financeGoals: BingoGoal[] = [
  { id: "f1", text: "股票", category: "finance" },
  { id: "f2", text: "加密貨幣", category: "finance" },
  { id: "f3", text: "定期存款", category: "finance" },
  { id: "f4", text: "基金", category: "finance" },
  { id: "f5", text: "美股", category: "finance" },
  { id: "f6", text: "房地產", category: "finance" },
  { id: "f7", text: "ETF", category: "finance" },
  { id: "f8", text: "記帳", category: "finance" },
  { id: "f9", text: "期貨交易", category: "finance" },
  { id: "f10", text: "股票配息", category: "finance" },
  { id: "f11", text: "貸款", category: "finance" },
  { id: "f12", text: "儲蓄險", category: "finance" },
  { id: "f13", text: "理財App", category: "finance" },
  { id: "f14", text: "外幣", category: "finance" },
  { id: "f15", text: "信託", category: "finance" },
  { id: "f16", text: "退休基金", category: "finance" },
  { id: "f17", text: "資產配置", category: "finance" },
  { id: "f18", text: "黃金投資", category: "finance" },
  { id: "f19", text: "保險", category: "finance" },
  { id: "f20", text: "數位資產", category: "finance" },
  { id: "f21", text: "當沖", category: "finance" },
  { id: "f22", text: "緊急預備金", category: "finance" },
  { id: "f23", text: "P2P借貸", category: "finance" },
  { id: "f24", text: "債券", category: "finance" },
  { id: "f25", text: "定額定投", category: "finance" },
];

// 夢想旅遊 5x5
const travelGoals: BingoGoal[] = [
  { id: "t1", text: "京都賞櫻", category: "travel" },
  { id: "t2", text: "冰島極光", category: "travel" },
  { id: "t3", text: "巴黎夜景", category: "travel" },
  { id: "t4", text: "高空跳傘", category: "travel" },
  { id: "t5", text: "埃及金字塔", category: "travel" },
  { id: "t6", text: "馬爾地夫蜜月", category: "travel" },
  { id: "t7", text: "非洲動物之旅", category: "travel" },
  { id: "t8", text: "阿爾卑斯滑雪", category: "travel" },
  { id: "t9", text: "土耳其熱氣球", category: "travel" },
  { id: "t10", text: "撒哈拉沙漠", category: "travel" },
  { id: "t11", text: "台灣環島", category: "travel" },
  { id: "t12", text: "大堡礁浮潛", category: "travel" },
  { id: "t13", text: "喜馬拉雅攀登", category: "travel" },
  { id: "t14", text: "聖托里尼拍照", category: "travel" },
  { id: "t15", text: "紐約跨年", category: "travel" },
  { id: "t16", text: "挪威峽灣", category: "travel" },
  { id: "t17", text: "亞馬遜叢林", category: "travel" },
  { id: "t18", text: "加拿大極光", category: "travel" },
  { id: "t19", text: "巴西大瀑布", category: "travel" },
  { id: "t20", text: "紐西蘭湖泊", category: "travel" },
  { id: "t21", text: "羅馬古城", category: "travel" },
  { id: "t22", text: "倫敦眼", category: "travel" },
  { id: "t23", text: "巴塞隆納建築", category: "travel" },
  { id: "t24", text: "上海外灘", category: "travel" },
  { id: "t25", text: "雪梨歌劇院", category: "travel" },
];

// 生活享受子類別
const lifestyleConsumption: BingoGoal[] = [
  { id: "lc1", text: "夢寐奢侈品", category: "lifestyle", subcategory: "consumption" },
  { id: "lc2", text: "擁有自用車", category: "lifestyle", subcategory: "consumption" },
  { id: "lc3", text: "高級家具升級", category: "lifestyle", subcategory: "consumption" },
  { id: "lc4", text: "升級新手機", category: "lifestyle", subcategory: "consumption" },
  { id: "lc5", text: "高級手錶", category: "lifestyle", subcategory: "consumption" },
  { id: "lc6", text: "名牌包包", category: "lifestyle", subcategory: "consumption" },
  { id: "lc7", text: "換全新電腦", category: "lifestyle", subcategory: "consumption" },
  { id: "lc8", text: "高檔餐具", category: "lifestyle", subcategory: "consumption" },
  { id: "lc9", text: "頂級音響", category: "lifestyle", subcategory: "consumption" },
  { id: "lc10", text: "購買大電視", category: "lifestyle", subcategory: "consumption" },
  { id: "lc11", text: "家居裝潢改造", category: "lifestyle", subcategory: "consumption" },
  { id: "lc12", text: "換最新平板", category: "lifestyle", subcategory: "consumption" },
  { id: "lc13", text: "買舒適沙發", category: "lifestyle", subcategory: "consumption" },
  { id: "lc14", text: "擁有咖啡機", category: "lifestyle", subcategory: "consumption" },
  { id: "lc15", text: "升級廚房設備", category: "lifestyle", subcategory: "consumption" },
  { id: "lc16", text: "打造夢幻衣櫥", category: "lifestyle", subcategory: "consumption" },
];

const lifestyleEnjoyment: BingoGoal[] = [
  { id: "le1", text: "精緻餐廳晚餐", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le2", text: "國內小旅行", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le3", text: "季度演唱會", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le4", text: "每月好友聚餐", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le5", text: "年度豪華旅行", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le6", text: "泡溫泉放鬆", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le7", text: "電影首映觀賞", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le8", text: "購物逛街日", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le9", text: "夜市美食之旅", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le10", text: "城市夜景觀光", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le11", text: "探索新餐廳", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le12", text: "週末野餐", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le13", text: "家庭遊樂日", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le14", text: "季節賞花", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le15", text: "戶外健行", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le16", text: "參加音樂會", category: "lifestyle", subcategory: "enjoyment" },
];

const lifestyleHabits: BingoGoal[] = [
  { id: "lh1", text: "每日早起", category: "lifestyle", subcategory: "habits" },
  { id: "lh2", text: "晨間運動", category: "lifestyle", subcategory: "habits" },
  { id: "lh3", text: "每週三次健身", category: "lifestyle", subcategory: "habits" },
  { id: "lh4", text: "每日冥想", category: "lifestyle", subcategory: "habits" },
  { id: "lh5", text: "每週一本書", category: "lifestyle", subcategory: "habits" },
  { id: "lh6", text: "每日靜心五分鐘", category: "lifestyle", subcategory: "habits" },
  { id: "lh7", text: "改善飲食習慣", category: "lifestyle", subcategory: "habits" },
  { id: "lh8", text: "減少糖分攝取", category: "lifestyle", subcategory: "habits" },
  { id: "lh9", text: "增強蔬菜攝取", category: "lifestyle", subcategory: "habits" },
  { id: "lh10", text: "每天八小時睡眠", category: "lifestyle", subcategory: "habits" },
  { id: "lh11", text: "每週一個新食譜", category: "lifestyle", subcategory: "habits" },
  { id: "lh12", text: "每月學新技巧", category: "lifestyle", subcategory: "habits" },
  { id: "lh13", text: "規律運動", category: "lifestyle", subcategory: "habits" },
  { id: "lh14", text: "寫下感恩日記", category: "lifestyle", subcategory: "habits" },
  { id: "lh15", text: "戶外走走放鬆", category: "lifestyle", subcategory: "habits" },
  { id: "lh16", text: "建立作息規律", category: "lifestyle", subcategory: "habits" },
];

// 學習成長子類別
const learningKnowledge: BingoGoal[] = [
  { id: "lk1", text: "每月讀一本書", category: "learning", subcategory: "knowledge" },
  { id: "lk2", text: "學習新技能", category: "learning", subcategory: "knowledge" },
  { id: "lk3", text: "提升外語會話", category: "learning", subcategory: "knowledge" },
  { id: "lk4", text: "完成線上課程", category: "learning", subcategory: "knowledge" },
  { id: "lk5", text: "了解投資知識", category: "learning", subcategory: "knowledge" },
  { id: "lk6", text: "增強寫作能力", category: "learning", subcategory: "knowledge" },
  { id: "lk7", text: "學習時間管理", category: "learning", subcategory: "knowledge" },
  { id: "lk8", text: "研讀專業期刊", category: "learning", subcategory: "knowledge" },
  { id: "lk9", text: "學習基礎編程", category: "learning", subcategory: "knowledge" },
  { id: "lk10", text: "增進演講技巧", category: "learning", subcategory: "knowledge" },
  { id: "lk11", text: "學習心理學基礎", category: "learning", subcategory: "knowledge" },
  { id: "lk12", text: "提升分析能力", category: "learning", subcategory: "knowledge" },
  { id: "lk13", text: "學習烹飪技巧", category: "learning", subcategory: "knowledge" },
  { id: "lk14", text: "拓展科學知識", category: "learning", subcategory: "knowledge" },
  { id: "lk15", text: "參加讀書會", category: "learning", subcategory: "knowledge" },
  { id: "lk16", text: "建立學習計劃", category: "learning", subcategory: "knowledge" },
];

const learningHealth: BingoGoal[] = [
  { id: "lhc1", text: "完成半馬拉松", category: "learning", subcategory: "health" },
  { id: "lhc2", text: "每週兩次健身", category: "learning", subcategory: "health" },
  { id: "lhc3", text: "減少糖分攝取", category: "learning", subcategory: "health" },
  { id: "lhc4", text: "每天八小時睡眠", category: "learning", subcategory: "health" },
  { id: "lhc5", text: "每日喝足水量", category: "learning", subcategory: "health" },
  { id: "lhc6", text: "戒掉垃圾食品", category: "learning", subcategory: "health" },
  { id: "lhc7", text: "每天散步半小時", category: "learning", subcategory: "health" },
  { id: "lhc8", text: "挑戰無糖一週", category: "learning", subcategory: "health" },
  { id: "lhc9", text: "練習深呼吸放鬆", category: "learning", subcategory: "health" },
  { id: "lhc10", text: "增加蔬果攝取", category: "learning", subcategory: "health" },
  { id: "lhc11", text: "戒菸戒酒", category: "learning", subcategory: "health" },
  { id: "lhc12", text: "固定健檢", category: "learning", subcategory: "health" },
  { id: "lhc13", text: "減少屏幕時間", category: "learning", subcategory: "health" },
  { id: "lhc14", text: "每週瑜伽一次", category: "learning", subcategory: "health" },
  { id: "lhc15", text: "早睡早起作息", category: "learning", subcategory: "health" },
  { id: "lhc16", text: "減少咖啡因", category: "learning", subcategory: "health" },
];

const learningBreakthrough: BingoGoal[] = [
  { id: "lb1", text: "團體中發表演講", category: "learning", subcategory: "breakthrough" },
  { id: "lb2", text: "參加社交活動", category: "learning", subcategory: "breakthrough" },
  { id: "lb3", text: "挑戰一週戒糖", category: "learning", subcategory: "breakthrough" },
  { id: "lb4", text: "寫每日成長日記", category: "learning", subcategory: "breakthrough" },
  { id: "lb5", text: "設立年度目標", category: "learning", subcategory: "breakthrough" },
  { id: "lb6", text: "進行自我反思", category: "learning", subcategory: "breakthrough" },
  { id: "lb7", text: "嘗試新愛好", category: "learning", subcategory: "breakthrough" },
  { id: "lb8", text: "挑戰不抱怨一週", category: "learning", subcategory: "breakthrough" },
  { id: "lb9", text: "克服懼高症", category: "learning", subcategory: "breakthrough" },
  { id: "lb10", text: "嘗試冒險活動", category: "learning", subcategory: "breakthrough" },
  { id: "lb11", text: "主動認識新朋友", category: "learning", subcategory: "breakthrough" },
  { id: "lb12", text: "建立早晨儀式", category: "learning", subcategory: "breakthrough" },
  { id: "lb13", text: "規劃未來五年", category: "learning", subcategory: "breakthrough" },
  { id: "lb14", text: "挑戰自己社交圈", category: "learning", subcategory: "breakthrough" },
  { id: "lb15", text: "完成作品發表", category: "learning", subcategory: "breakthrough" },
  { id: "lb16", text: "建立正念習慣", category: "learning", subcategory: "breakthrough" },
];

// 人際關係 4x4
const relationshipGoals: BingoGoal[] = [
  { id: "r1", text: "定期家庭聚餐", category: "relationships" },
  { id: "r2", text: "陪伴父母旅行", category: "relationships" },
  { id: "r3", text: "與兄妹聯繫", category: "relationships" },
  { id: "r4", text: "參加家庭活動", category: "relationships" },
  { id: "r5", text: "舉辦好友聚會", category: "relationships" },
  { id: "r6", text: "每月與朋友約會", category: "relationships" },
  { id: "r7", text: "關心朋友", category: "relationships" },
  { id: "r8", text: "擴展交友圈", category: "relationships" },
  { id: "r9", text: "安排浪漫約會", category: "relationships" },
  { id: "r10", text: "計劃旅行", category: "relationships" },
  { id: "r11", text: "增進溝通", category: "relationships" },
  { id: "r12", text: "給予驚喜", category: "relationships" },
  { id: "r13", text: "與同事結交", category: "relationships" },
  { id: "r14", text: "感謝上司", category: "relationships" },
  { id: "r15", text: "幫助同事", category: "relationships" },
  { id: "r16", text: "參加團隊活動", category: "relationships" },
];

export const categories: BingoCategory[] = [
  {
    id: "finance",
    name: "投資理財",
    icon: "savings",
    className: "category-finance",
    gridSize: 5,
  },
  {
    id: "travel",
    name: "夢想旅遊",
    icon: "flight_takeoff",
    className: "category-travel",
    gridSize: 5,
  },
  {
    id: "lifestyle",
    name: "生活享受",
    icon: "restaurant",
    className: "category-lifestyle",
    gridSize: 4,
    subcategories: [
      {
        id: "consumption",
        name: "消費升級",
        gridSize: 4,
        goals: lifestyleConsumption,
      },
      {
        id: "enjoyment",
        name: "生活享受",
        gridSize: 4,
        goals: lifestyleEnjoyment,
      },
      {
        id: "habits",
        name: "生活習慣",
        gridSize: 4,
        goals: lifestyleHabits,
      },
    ],
  },
  {
    id: "learning",
    name: "學習成長",
    icon: "school",
    className: "category-learning",
    gridSize: 4,
    subcategories: [
      {
        id: "knowledge",
        name: "知識增長",
        gridSize: 4,
        goals: learningKnowledge,
      },
      {
        id: "health",
        name: "健康挑戰",
        gridSize: 4,
        goals: learningHealth,
      },
      {
        id: "breakthrough",
        name: "個人突破",
        gridSize: 4,
        goals: learningBreakthrough,
      },
    ],
  },
  {
    id: "relationships",
    name: "人際關係",
    icon: "group",
    className: "category-relationships",
    gridSize: 4,
  },
];

export const getAllGoals = (categoryId: string, subcategoryId?: string): BingoGoal[] => {
  switch (categoryId) {
    case "finance":
      return financeGoals;
    case "travel":
      return travelGoals;
    case "lifestyle":
      if (subcategoryId === "consumption") return lifestyleConsumption;
      if (subcategoryId === "enjoyment") return lifestyleEnjoyment;
      if (subcategoryId === "habits") return lifestyleHabits;
      return lifestyleConsumption;
    case "learning":
      if (subcategoryId === "knowledge") return learningKnowledge;
      if (subcategoryId === "health") return learningHealth;
      if (subcategoryId === "breakthrough") return learningBreakthrough;
      return learningKnowledge;
    case "relationships":
      return relationshipGoals;
    default:
      return financeGoals;
  }
};