// 공통 DB — 장비/카드/펫 등 사이트 전체 공유 데이터
// 실제 항목은 운영자가 각 탭 작업 시 제공 예정 (현재 샘플 데이터)

export const DB = {

  // ── 장비 ──────────────────────────────────────────────────
  equipment: [
    { id: "equip_001", name: "견고한 투구",   image: "", description: "단단한 금속으로 제작된 투구.",   chaosSet: "혼돈의 세트A" },
    { id: "equip_002", name: "수호자의 망토", image: "", description: "빛나는 천으로 만든 망토.",       chaosSet: "혼돈의 세트A" },
    { id: "equip_003", name: "철갑 상의",     image: "", description: "튼튼한 갑옷 상의.",             chaosSet: "혼돈의 세트B" },
    { id: "equip_004", name: "용맹의 목걸이", image: "", description: "용의 뼈로 만든 목걸이.",         chaosSet: "혼돈의 세트B" },
    { id: "equip_005", name: "강철 반지",     image: "", description: "강철로 단조한 반지.",            chaosSet: "혼돈의 세트A" },
    { id: "equip_006", name: "질풍 신발",     image: "", description: "바람처럼 빠른 신발.",            chaosSet: "혼돈의 세트B" },
  ],
  statPool:   ["체력", "공격력", "치명타피해", "치명타율", "방어력", "스킬 피해"],
  optionPool: ["화염작열", "빙결파열", "번개강타", "대지진동"],

  // ── 직업무기 ──────────────────────────────────────────────
  classWeapons: [
    { id: "cw_001", weaponType: "sword",   class: "전사", name: "영웅의 검",     image: "", description: "전사 전용 검." },
    { id: "cw_002", weaponType: "bow",     class: "헌터", name: "정밀 활",       image: "", description: "헌터 전용 활." },
    { id: "cw_003", weaponType: "staff",   class: "법사", name: "마법 지팡이",   image: "", description: "법사 전용 지팡이." },
    { id: "cw_004", weaponType: "scepter", class: "사제", name: "성스러운 홀",   image: "", description: "사제 전용 홀." },
    { id: "cw_005", weaponType: "dagger",  class: "도적", name: "암살자의 단검", image: "", description: "도적 전용 단검." },
  ],

  // ── 한정무기 ──────────────────────────────────────────────
  limitedWeapons: [
    { id: "lw_001", name: "멸망의 검",     image: "", description: "세계를 멸망시키는 검." },
    { id: "lw_002", name: "창조의 지팡이", image: "", description: "세계를 창조하는 지팡이." },
  ],
  weaponStatPool: ["공격력", "치명타피해", "치명타율", "스킬 피해", "각성: 화염"],

  // ── 룬 ───────────────────────────────────────────────────
  runeCorePool:    ["코어: 화염", "코어: 빙결", "코어: 번개", "코어: 대지"],
  runeCrystalPool: ["결정: 공격", "결정: 방어", "결정: 속도"],

  // ── 카드 ─────────────────────────────────────────────────
  cards: {
    weapon: [
      { id: "card_w_001", name: "무기 카드A",   image: "", description: "무기 카드 설명A.", cost: 3 },
      { id: "card_w_002", name: "무기 카드B",   image: "", description: "무기 카드 설명B.", cost: 2 },
    ],
    armor: [
      { id: "card_a_001", name: "방어구 카드A", image: "", description: "방어구 카드 설명A.", cost: 2 },
      { id: "card_a_002", name: "방어구 카드B", image: "", description: "방어구 카드 설명B.", cost: 3 },
    ],
    accessory: [
      { id: "card_c_001", name: "장신구 카드A", image: "", description: "장신구 카드 설명A.", cost: 4 },
    ],
  },
  cardMainStatPool: ["주속성: 공격력", "주속성: 치명타"],
  cardSubStatPool:  ["보조속성: 스킬 피해", "보조속성: 방어 관통"],

  // ── 점성술 ───────────────────────────────────────────────
  astrology: [
    { id: "as_001", name: "화성의 축복", image: "", description: "화성의 힘으로 공격력 강화." },
    { id: "as_002", name: "금성의 가호", image: "", description: "금성의 가호로 생존력 강화." },
    { id: "as_003", name: "목성의 눈",   image: "", description: "목성의 눈으로 치명타 강화." },
  ],

  // ── 주문 ─────────────────────────────────────────────────
  spells: [
    { id: "sp_001", name: "화염 주문",   description: "화염 피해를 크게 증폭." },
    { id: "sp_002", name: "보호막 주문", description: "강력한 보호막 부여." },
    { id: "sp_003", name: "속도 주문",   description: "이동속도 대폭 증가." },
  ],

  // ── 펫 ───────────────────────────────────────────────────
  pets: {
    attack:  [{ id: "pa_001", name: "공격 펫A", image: "", description: "공격형 펫." }],
    special: [{ id: "ps_001", name: "오의 펫A", image: "", description: "오의형 펫." }],
    dash:    [{ id: "pd_001", name: "질주 펫A", image: "", description: "질주형 펫." }],
    potion:  [{ id: "pp_001", name: "포션 펫A", image: "", description: "포션형 펫." }],
  },

  // ── 보석 ─────────────────────────────────────────────────
  gemSubStatPool:  ["보조: 체력", "보조: 공격력", "보조: 치명타피해"],
  gemRareStatPool: ["희귀: 보스 피해", "희귀: 스킬 피해"],

  // ── 소울파워 ─────────────────────────────────────────────
  burstSkills: [
    { id: "bs_001", name: "폭풍 버스트", image: "", description: "폭풍을 일으키는 버스트 스킬." },
    { id: "bs_002", name: "화염 버스트", image: "", description: "화염을 일으키는 버스트 스킬." },
    { id: "bs_003", name: "빙결 버스트", image: "", description: "빙결을 일으키는 버스트 스킬." },
  ],
  soulStatPool: ["공격력", "보스 피해", "치명타율", "스킬 피해", "방어 관통"],

  // ── 구슬 ─────────────────────────────────────────────────
  marbles: [
    { id: "m_001", name: "구슬A", image: "", description: "구슬 설명A." },
    { id: "m_002", name: "구슬B", image: "", description: "구슬 설명B." },
    { id: "m_003", name: "구슬C", image: "", description: "구슬 설명C." },
    { id: "m_004", name: "구슬D", image: "", description: "구슬 설명D." },
    { id: "m_005", name: "구슬E", image: "", description: "구슬 설명E." },
    { id: "m_006", name: "구슬F", image: "", description: "구슬 설명F." },
    { id: "m_007", name: "구슬G", image: "", description: "구슬 설명G." },
    { id: "m_008", name: "구슬H", image: "", description: "구슬 설명H." },
    { id: "m_009", name: "구슬I", image: "", description: "구슬 설명I." },
  ],
};
