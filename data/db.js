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
    { id: "equip_001", name: "견고한 투구",   image: "", chaosSet: "혼돈의 세트A" },
    { id: "equip_002", name: "수호자의 망토", image: "", chaosSet: "혼돈의 세트A" },
    { id: "equip_003", name: "철갑 상의",     image: "", chaosSet: "혼돈의 세트B" },
    { id: "equip_004", name: "용맹의 목걸이", image: "", chaosSet: "혼돈의 세트B" },
    { id: "equip_005", name: "강철 반지",     image: "", chaosSet: "혼돈의 세트A" },
    { id: "equip_006", name: "질풍 신발",     image: "", chaosSet: "혼돈의 세트B" },
  ],
  statPool:   ["체력", "공격력", "치명타피해", "치명타율", "방어력", "스킬 피해"],
  optionPool: ["화염작열", "빙결파열", "번개강타", "대지진동"],

  // ── 직업무기 ──────────────────────────────────────────────
  // 전사: a b c d  /  헌터: e f g h  /  법사: i j k  /  사제: l m n  /  도적: o p
  classWeapons: [
    { id: "cw_001", weaponType: "a", class: "전사", name: "임시무기-a", image: "img/weapon/a.png" },
    { id: "cw_002", weaponType: "b", class: "전사", name: "임시무기-b", image: "img/weapon/b.png" },
    { id: "cw_003", weaponType: "c", class: "전사", name: "임시무기-c", image: "img/weapon/c.png" },
    { id: "cw_004", weaponType: "d", class: "전사", name: "임시무기-d", image: "img/weapon/d.png" },
    { id: "cw_005", weaponType: "e", class: "헌터", name: "임시무기-e", image: "img/weapon/e.png" },
    { id: "cw_006", weaponType: "f", class: "헌터", name: "임시무기-f", image: "img/weapon/f.png" },
    { id: "cw_007", weaponType: "g", class: "헌터", name: "임시무기-g", image: "img/weapon/g.png" },
    { id: "cw_008", weaponType: "h", class: "헌터", name: "임시무기-h", image: "img/weapon/h.png" },
    { id: "cw_009", weaponType: "i", class: "법사", name: "임시무기-i", image: "img/weapon/i.png" },
    { id: "cw_010", weaponType: "j", class: "법사", name: "임시무기-j", image: "img/weapon/j.png" },
    { id: "cw_011", weaponType: "k", class: "법사", name: "임시무기-k", image: "img/weapon/k.png" },
    { id: "cw_012", weaponType: "l", class: "사제", name: "임시무기-l", image: "img/weapon/l.png" },
    { id: "cw_013", weaponType: "m", class: "사제", name: "임시무기-m", image: "img/weapon/m.png" },
    { id: "cw_014", weaponType: "n", class: "사제", name: "임시무기-n", image: "img/weapon/n.png" },
    { id: "cw_015", weaponType: "o", class: "도적", name: "임시무기-o", image: "img/weapon/o.png" },
    { id: "cw_016", weaponType: "p", class: "도적", name: "임시무기-p", image: "img/weapon/p.png" },
  ],

  // ── 한정무기 ──────────────────────────────────────────────
  limitedWeapons: [
    { id: "lw_001", name: "멸망의 검",     image: "" },
    { id: "lw_002", name: "창조의 지팡이", image: "" },
  ],
  weaponStatPool: ["공격력", "치명타피해", "치명타율", "스킬 피해", "각성: 화염"],

  // ── 룬 ───────────────────────────────────────────────────
  runeCorePool:    ["코어: 화염", "코어: 빙결", "코어: 번개", "코어: 대지"],
  runeCrystalPool: ["결정: 공격", "결정: 방어", "결정: 속도"],

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
  cardMainStatPool: ["주속성: 공격력", "주속성: 치명타"],
  cardSubStatPool:  ["보조속성: 스킬 피해", "보조속성: 방어 관통"],

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
  gemSubStatPool:  ["보조: 체력", "보조: 공격력", "보조: 치명타피해"],
  gemRareStatPool: ["희귀: 보스 피해", "희귀: 스킬 피해"],

  // ── 소울파워 ─────────────────────────────────────────────
  burstSkills: [
    { id: "bs_001", name: "폭풍 버스트", image: "" },
    { id: "bs_002", name: "화염 버스트", image: "" },
    { id: "bs_003", name: "빙결 버스트", image: "" },
  ],
  soulStatPool: ["공격력", "보스 피해", "치명타율", "스킬 피해", "방어 관통"],

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
