// 공통 DB — 장비/카드/펫 등 사이트 전체 공유 데이터
// 실제 항목은 운영자가 각 탭 작업 시 제공 예정 (현재 샘플 데이터)

export const DB = {

  // ── 직업 ──────────────────────────────────────────────────
  classes: [
    { id: "cls_001", name: "전사", image: "img/class/전사.png" },
    { id: "cls_002", name: "헌터", image: "img/class/헌터.png" },
    { id: "cls_003", name: "법사", image: "img/class/법사.png" },
    { id: "cls_004", name: "사제", image: "img/class/사제.png" },
    { id: "cls_005", name: "도적", image: "img/class/도적.png" },
  ],

  // ── 장비 ──────────────────────────────────────────────────
  equipment: [
    { id: "equip_001", name: "불타는사령관",   image: "img/equipment/1551840.png", chaosSet: "불태우기" },
    { id: "equip_002", name: "진홍갑옷", image: "img/equipment/1451540.png", chaosSet: "재앙의진조" },
    { id: "equip_003", name: "깃털목걸이",     image: "img/equipment/1851540.png", chaosSet: "재앙의진조" },
    { id: "equip_004", name: "연쇄모닥불", image: "img/equipment/1651840.png", chaosSet: "불태우기" },
    { id: "equip_005", name: "산불",     image: "img/equipment/1751840.png", chaosSet: "불태우기" },
    { id: "equip_006", name: "푸른창고장화",     image: "img/equipment/1951540.png", chaosSet: "재앙의진조" },
  ],
  statPool:   ["공격", "생명", "방어", "치명타확률", "회복", "치명타피해", "원소공격", "방어관통", "전속성공격"],
  optionPool: [
    { id: "opt_001", image: "img/optionPool/150031.png" },
  ],

  // ── 직업무기 ──────────────────────────────────────────────
  // 전 직업 공통 무기 4종
  weapons: [
    { id: "w_001", weaponType: "자간",     name: "자간",     image: "img/weapon/자간.png" },
    { id: "w_002", weaponType: "데카라비아", name: "데카라비아", image: "img/weapon/데카라비아.png" },
    { id: "w_003", weaponType: "강동이교",  name: "강동이교",  image: "img/weapon/강동이교.png" },
    { id: "w_004", weaponType: "보니",     name: "보니",     image: "img/weapon/보니.png" },
  ],

  // ── 마녀무기 (빌드 무기 탭 전용) ─────────────────────────
  witchWeapons: [
    { id: "ww_001", name: "법사_데카라비아", image: "img/wweapon/법사_데카라비아.png" },
  ],

  // ── 한정무기 ──────────────────────────────────────────────
  limitedWeapons: [
    { id: "lw_001", name: "사이버불", image: "img/lweapon/사이버불.png" },
    { id: "lw_002", name: "사이버풀", image: "img/lweapon/사이버풀.png" },
  ],
  weaponStatPool: ["공격", "방어", "생명", "회복", "치명타확률", "치명타피해", "원소공격", "방어관통", "보스피해"],

  // ── 룬 ───────────────────────────────────────────────────
  runeCorePool:    ["공격", "방어", "치명타피해", "치명타확률", "원소공격", "실드", "원소에너지", "방어관통", "보스피해"],
  runeCrystalPool: ["공격", "방어", "실드", "원소공격", "원소저항", "방어관통", "실드피해", "치명타피해", "치명타확률"],

  // ── 카드 ─────────────────────────────────────────────────
  cards: {
    weapon: [
      { id: "card_w_001", name: "무기 카드A",   image: "", cost: 3 },
      { id: "card_w_002", name: "무기 카드B",   image: "", cost: 2 },
    ],
    armor: [
      { id: "card_a_001", name: "방어구 카드A", image: "", cost: 2 },
      { id: "card_a_002", name: "방어구 카드B", image: "", cost: 3 },
    ],
    accessory: [
      { id: "card_c_001", name: "장신구 카드A", image: "", cost: 4 },
    ],
  },
  cardMainStatPool: ["공격", "방어", "생명", "치명타확률", "치명타피해", "쿨타임", "공격%", "방어%", "생명%", "공격속도", "원소관통"],
  cardSubStatPool:  ["공격", "방어", "생명", "원소공격", "공격속도", "에너지상한", "쿨타임", "치명타피해", "방어관통", "원소저항"],

  // ── 점성술 ───────────────────────────────────────────────
  astrology: [
    { id: "as_001", name: "화성의 축복", image: "" },
    { id: "as_002", name: "금성의 가호", image: "" },
    { id: "as_003", name: "목성의 눈",   image: "" },
  ],

  // ── 주문 ─────────────────────────────────────────────────
  spells: [
    { id: "sp_001", name: "화염 주문" },
    { id: "sp_002", name: "보호막 주문" },
    { id: "sp_003", name: "속도 주문" },
  ],

  // ── 펫 ───────────────────────────────────────────────────
  pets: {
    attack:  [{ id: "pa_001", name: "공격 펫A", image: "" }],
    special: [{ id: "ps_001", name: "오의 펫A", image: "" }],
    dash:    [{ id: "pd_001", name: "질주 펫A", image: "" }],
    potion:  [{ id: "pp_001", name: "포션 펫A", image: "" }],
  },

  // ── 보석 ─────────────────────────────────────────────────
  gemSubStatPool:  ["공격", "원소공격", "치명타피해", "방어관통", "원소관통"],
  gemRareStatPool: ["공격", "치명타피해", "원소공격", "실드피해", "피해증폭", "스킬레벨", "원소제압", "억제증폭"],

  // ── 소울파워 ─────────────────────────────────────────────
  burstSkills: [
    { id: "bs_001", name: "폭풍 버스트", image: "" },
    { id: "bs_002", name: "화염 버스트", image: "" },
    { id: "bs_003", name: "빙결 버스트", image: "" },
  ],
  soulStatPool: ["공격", "방어", "실드", "보스피해", "원소공격", "방어관통"],

  // ── 구슬 ─────────────────────────────────────────────────
  marbles: [
    { id: "m_001", name: "구슬A", image: "" },
    { id: "m_002", name: "구슬B", image: "" },
    { id: "m_003", name: "구슬C", image: "" },
    { id: "m_004", name: "구슬D", image: "" },
    { id: "m_005", name: "구슬E", image: "" },
    { id: "m_006", name: "구슬F", image: "" },
    { id: "m_007", name: "구슬G", image: "" },
    { id: "m_008", name: "구슬H", image: "" },
    { id: "m_009", name: "구슬I", image: "" },
  ],
};
