// 小学四年级数学题库
const questionBank = [
    // 三位数加法
    { question: "325 + 478 = ?", answer: 803, distractors: [813, 793, 783] },
    { question: "567 + 289 = ?", answer: 856, distractors: [866, 846, 876] },
    { question: "456 + 367 = ?", answer: 823, distractors: [813, 833, 843] },
    { question: "789 + 156 = ?", answer: 945, distractors: [955, 935, 965] },
    { question: "234 + 678 = ?", answer: 912, distractors: [922, 902, 892] },
    
    // 三位数减法
    { question: "856 - 479 = ?", answer: 377, distractors: [387, 367, 397] },
    { question: "945 - 568 = ?", answer: 377, distractors: [387, 367, 357] },
    { question: "723 - 456 = ?", answer: 267, distractors: [277, 257, 247] },
    { question: "834 - 567 = ?", answer: 267, distractors: [277, 257, 287] },
    { question: "612 - 345 = ?", answer: 267, distractors: [277, 257, 247] },
    
    // 两位数乘法
    { question: "23 × 45 = ?", answer: 1035, distractors: [1025, 1045, 1015] },
    { question: "34 × 56 = ?", answer: 1904, distractors: [1914, 1894, 1884] },
    { question: "45 × 67 = ?", answer: 3015, distractors: [3025, 3005, 2995] },
    { question: "56 × 78 = ?", answer: 4368, distractors: [4378, 4358, 4348] },
    { question: "67 × 89 = ?", answer: 5963, distractors: [5973, 5953, 5943] },
    { question: "12 × 34 = ?", answer: 408, distractors: [418, 398, 428] },
    { question: "25 × 16 = ?", answer: 400, distractors: [410, 390, 420] },
    { question: "18 × 24 = ?", answer: 432, distractors: [442, 422, 412] },
    
    // 除法运算
    { question: "144 ÷ 12 = ?", answer: 12, distractors: [11, 13, 14] },
    { question: "168 ÷ 14 = ?", answer: 12, distractors: [11, 13, 10] },
    { question: "195 ÷ 15 = ?", answer: 13, distractors: [12, 14, 15] },
    { question: "216 ÷ 18 = ?", answer: 12, distractors: [11, 13, 14] },
    { question: "224 ÷ 16 = ?", answer: 14, distractors: [13, 15, 12] },
    { question: "252 ÷ 21 = ?", answer: 12, distractors: [11, 13, 14] },
    { question: "288 ÷ 24 = ?", answer: 12, distractors: [11, 13, 10] },
    
    // 混合运算
    { question: "25 × 4 + 50 = ?", answer: 150, distractors: [140, 160, 130] },
    { question: "200 - 36 ÷ 6 = ?", answer: 194, distractors: [184, 204, 174] },
    { question: "15 × 6 - 30 = ?", answer: 60, distractors: [70, 50, 80] },
    { question: "120 ÷ 4 + 45 = ?", answer: 75, distractors: [85, 65, 70] },
    { question: "48 ÷ 8 × 7 = ?", answer: 42, distractors: [52, 32, 48] },
    { question: "9 × 8 - 24 = ?", answer: 48, distractors: [58, 38, 52] },
    { question: "100 - 18 × 3 = ?", answer: 46, distractors: [56, 36, 54] },
    { question: "16 × 5 + 20 = ?", answer: 100, distractors: [110, 90, 120] },
    
    // 简单应用题型
    { question: "小明有45元，买了3支笔，每支笔12元，还剩多少元？", answer: 9, distractors: [12, 6, 15] },
    { question: "学校有男生320人，女生比男生少45人，女生有多少人？", answer: 275, distractors: [285, 265, 365] },
    { question: "一个长方形长15厘米，宽8厘米，周长是多少厘米？", answer: 46, distractors: [56, 36, 23] },
    { question: "小红每天看书25页，一周（7天）能看多少页？", answer: 175, distractors: [185, 165, 200] },
    { question: "果园有苹果树48棵，梨树比苹果树多12棵，梨树有多少棵？", answer: 60, distractors: [58, 62, 36] },
    { question: "商店有糖果360颗，平均分给12个小朋友，每人多少颗？", answer: 30, distractors: [28, 32, 25] },
    { question: "一辆汽车每小时行驶80千米，5小时能行驶多少千米？", answer: 400, distractors: [390, 410, 420] },
    { question: "学校买了18盒彩笔，每盒24支，一共多少支？", answer: 432, distractors: [422, 442, 412] },
    
    // 更多基础运算
    { question: "456 + 234 = ?", answer: 690, distractors: [680, 700, 670] },
    { question: "789 - 345 = ?", answer: 444, distractors: [454, 434, 464] },
    { question: "28 × 35 = ?", answer: 980, distractors: [970, 990, 1000] },
    { question: "168 ÷ 12 = ?", answer: 14, distractors: [12, 16, 13] },
    { question: "125 × 8 = ?", answer: 1000, distractors: [990, 1010, 980] },
    { question: "645 - 278 = ?", answer: 367, distractors: [377, 357, 347] },
    { question: "234 + 567 = ?", answer: 801, distractors: [811, 791, 781] },
    { question: "36 × 25 = ?", answer: 900, distractors: [890, 910, 920] },
    
    // 进阶混合运算
    { question: "(45 + 55) × 3 = ?", answer: 300, distractors: [310, 290, 320] },
    { question: "180 ÷ (12 - 3) = ?", answer: 20, distractors: [18, 22, 15] },
    { question: "8 × 9 + 6 × 7 = ?", answer: 114, distractors: [124, 104, 120] },
    { question: "150 - 45 ÷ 5 = ?", answer: 141, distractors: [131, 151, 21] },
    { question: "24 ÷ 6 + 5 × 8 = ?", answer: 44, distractors: [54, 34, 48] },
    { question: "13 × 7 - 21 = ?", answer: 70, distractors: [80, 60, 91] },
    { question: "96 ÷ 8 + 35 = ?", answer: 47, distractors: [57, 37, 42] },
    { question: "6 × (15 - 7) = ?", answer: 48, distractors: [58, 38, 52] },
];
