import { DB } from '../data/db.js';

const TAB_KEYS   = ['equipment','weapon','rune','skill','card','doll','astrology','spell','pet','gem','soulPower','marble','galaxy'];
const TAB_LABELS = ['장비','무기','룬','스킬','카드','인형','점성술','주문','펫','보석','소울파워','구슬','은하장비'];

const params      = new URLSearchParams(location.search);
const cls         = params.get('class')  || '';
const weaponType  = params.get('weapon') || '';
const initBuildId = params.get('build');

let builds       = [];
let currentBuild = null;
let currentTab   = TAB_KEYS[0];

// ── Helpers ──────────────────────────────────────

const byId = (arr, id) => arr?.find(x => x.id === id) ?? null;

const thumb = src =>
  src ? `<img class="item-thumb" src="${src}" alt="" loading="lazy">`
      : `<div class="item-thumb-placeholder"></div>`;

const weaponImg = src =>
  src ? `<img class="weapon-card-img" src="${src}" alt="" loading="lazy">`
      : `<div class="weapon-card-img-placeholder"></div>`;

const tagStat = s  => `<span class="tag-stat">${s}</span>`;
const tagOpt    = (name, lv) =>
  `<span class="tag-opt">${name}${lv ? ` <span class="tag-opt-lv">lv${lv}↑</span>` : ''}</span>`;

const tagOptImg = (img, lv) =>
  `<span class="tag-opt-img">${
    img ? `<img src="${img}" alt="">` : `<span class="tag-opt-img-placeholder"></span>`
  }${lv ? `<span class="tag-opt-lv">lv${lv}↑</span>` : ''}</span>`;
const tagRare = s  => `<span class="tag-rare">${s}</span>`;

const priNum  = (n, rare = false) =>
  `<span class="priority-num${rare ? ' rare' : ''}">${n}</span>`;

const section = (title, html) =>
  `<div class="tab-section"><div class="tab-section-title">${title}</div>${html}</div>`;

const emptyMsg = () => `<p class="empty-msg">데이터 없음</p>`;

// ── Build discovery ──────────────────────────────

async function discoverBuilds() {
  const found = [];
  for (let i = 0; i < 30; i++) {
    let res;
    try { res = await fetch(`data/builds/${weaponType}_${cls}_${i}.json`); }
    catch { break; }
    if (!res.ok) break;
    const data = await res.json().catch(() => null);
    if (data?.status === 'approved') found.push(data);
  }
  return found;
}

// ── Tab renderers ────────────────────────────────

function renderEquipment(equip) {
  if (!equip?.length) return emptyMsg();
  return `<table class="item-tbl">${equip.map(slot => {
    const e = byId(DB.equipment, slot.equipId);
    const imgHtml = e?.image
      ? `<img class="equip-thumb" src="${e.image}" alt="" loading="lazy">`
      : `<div class="equip-thumb-placeholder"></div>`;
    const statsHtml = slot.requiredStats.map(s =>
      `<div class="equip-stat-row">${tagStat(s)}</div>`
    ).join('');
    const optsHtml = slot.requiredOptions.map(o => {
      const opt = byId(DB.optionPool, o.optionId);
      return opt?.image
        ? `<img class="equip-opt-thumb" src="${opt.image}" alt="" loading="lazy">`
        : `<div class="equip-opt-placeholder"></div>`;
    }).join('');
    return `<tr>
      <td class="equip-img-cell">${imgHtml}<span class="tbl-slot-lbl">${slot.slot}</span></td>
      <td class="equip-name-cell"><div class="tbl-item-name">${e?.name ?? '???'}</div></td>
      <td class="equip-stat-cell">${statsHtml}</td>
      <td class="equip-opt-cell"><div class="equip-opt-row">${optsHtml}</div></td>
    </tr>`;
  }).join('')}</table>`;
}

function renderWeapon(w) {
  const ww = byId(DB.witchWeapons, w.classWeapon.weaponId);

  const cwCard = `<div class="weapon-card">
    ${weaponImg(ww?.image)}
    <div class="weapon-card-body">
      <div class="weapon-card-name">${ww?.name ?? '마녀무기'}</div>
      <div class="priority-list">${w.classWeapon.statPriority.map((s, i) =>
        `<div class="priority-item">${priNum(i + 1)} ${s}</div>`
      ).join('')}</div>
    </div>
  </div>`;

  const lwCards = w.limitedWeapons.map(lw => {
    const d = byId(DB.limitedWeapons, lw.weaponId);
    return `<div class="weapon-card">
      ${weaponImg(d?.image)}
      <div class="weapon-card-body">
        <div class="weapon-card-name">${d?.name ?? '???'}</div>
        <div class="priority-list">${lw.statPriority.map((s, i) => {
          const isAscend = s.startsWith('각성');
          return `<div class="priority-item">${priNum(isAscend ? '각' : i + 1, isAscend)} ${s}</div>`;
        }).join('')}</div>
      </div>
    </div>`;
  }).join('');

  return section('마녀무기', cwCard) + section('한정무기 (추천 2종)', lwCards);
}

const RUNE_COLORS = {
  green: { main: '#23D160', stroke: 'rgba(35,209,96,0.28)',   dim: 'rgba(35,209,96,0.16)'   },
  red:   { main: '#FF4757', stroke: 'rgba(255,71,87,0.28)',   dim: 'rgba(255,71,87,0.16)'   },
  blue:  { main: '#339AF0', stroke: 'rgba(51,154,240,0.28)',  dim: 'rgba(51,154,240,0.16)'  },
};

function renderRune(rune, runeColor = 'green') {
  if (!rune?.length) return emptyMsg();

  const col = RUNE_COLORS[runeColor] ?? RUNE_COLORS.green;

  // flat-top hexagon: CX=250, CY=250, R=130
  // vertex order: right, upper-right, upper-left, left, lower-left, lower-right
  const VERTS = [
    [336, 226],
    [271, 113],
    [141, 113],
    [ 76, 226],
    [141, 339],
    [271, 339],
  ];

  const labels = VERTS.map(([lx, ly], i) => {
    const d = rune[i];
    const coreHtml    = (d?.corePriority    ?? []).map((s, j) => `<span class="rune-pri">${j + 1}. ${s}</span>`).join('');
    const crystalHtml = (d?.crystalPriority ?? []).map((s, j) => `<span class="rune-pri">${j + 1}. ${s}</span>`).join('');
    return `<div class="rune-vertex-label" style="left:${lx}px;top:${ly}px">
      <div class="rune-label-inner">
        <div data-mode-content="core">${coreHtml}</div>
        <div data-mode-content="crystal" hidden>${crystalHtml}</div>
      </div>
    </div>`;
  }).join('');

  return `<div class="rune-panel" style="--rc:${col.main};--rc-stroke:${col.stroke};--rc-dim:${col.dim}">
    <div class="rune-hex-container">
      <div class="rune-hex-group" id="rune-hex-group">
        <svg class="rune-hex-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <polygon class="rune-hex-shape"
            points="380,250 315,362.6 185,362.6 120,250 185,137.4 315,137.4"/>
        </svg>
        ${labels}
      </div>
    </div>
    <div class="rune-mode-toggle">
      <button class="rune-toggle-btn active" data-mode="core">코어</button>
      <button class="rune-toggle-btn" data-mode="crystal">크리스탈</button>
    </div>
  </div>`;
}

function renderSkill(skill) {
  const ids = skill?.ids ?? [];
  if (!ids.length) return `<div class="img-only-empty">스킬 이미지 없음</div>`;
  const imgs = ids.slice(0, 4).map(id => {
    const s = byId(DB.skills, id);
    return s?.image
      ? `<img class="skill-grid-img" src="${s.image}" alt="">`
      : `<div class="skill-grid-img skill-grid-empty"></div>`;
  }).join('');
  return `<div class="skill-grid-wrap"><div class="skill-grid">${imgs}</div></div>`;
}

function renderImageOnly(data, label) {
  if (!data?.image) return `<div class="img-only-empty">${label} 이미지 없음</div>`;
  return `<div class="img-only-panel"><img src="${data.image}" alt="${label}"></div>`;
}

function cardImg(image) {
  return image
    ? `<img class="card-px-img" src="${image}" alt="">`
    : `<div class="card-px-img card-px-empty"></div>`;
}

function cardStats(slot) {
  return `<div class="card-stat-block">
    ${slot.mainStatPriority.map(tagStat).join('')}
    ${slot.subStatPriority.map(s => `<span class="tag-opt">${s}</span>`).join('')}
  </div>`;
}

function renderCard(card) {
  // ── 무기: 가로 3분할, 이미지 위 + 속성 아래
  const weaponHtml = `<div class="card-weapon-row">
    ${(card.weapon || []).map(slot => {
      if (!slot.cardId) return `<div class="card-weapon-cell card-empty-cell"><div class="card-px-img card-px-empty"></div></div>`;
      const c = byId(DB.cards, slot.cardId);
      return `<div class="card-weapon-cell">
        ${cardImg(c?.image)}
        ${cardStats(slot)}
      </div>`;
    }).join('')}
  </div>`;

  // ── 방어구: 2×2 그리드, 이미지 왼쪽 + 속성 오른쪽
  const armorHtml = `<div class="card-armor-grid">
    ${(card.armor || []).map(slot => {
      if (!slot.cardId) return `<div class="card-side-cell card-empty-cell"><div class="card-px-img card-px-empty"></div></div>`;
      const c = byId(DB.cards, slot.cardId);
      return `<div class="card-side-cell">
        ${cardImg(c?.image)}
        ${cardStats(slot)}
      </div>`;
    }).join('')}
  </div>`;

  // ── 장신구: 가로 2분할, 이미지 왼쪽 + 속성 오른쪽
  const accessoryHtml = `<div class="card-accessory-row">
    ${(card.accessory || []).map(slot => {
      if (!slot.cardId) return `<div class="card-side-cell card-empty-cell"><div class="card-px-img card-px-empty"></div></div>`;
      const c = byId(DB.cards, slot.cardId);
      return `<div class="card-side-cell">
        ${cardImg(c?.image)}
        ${cardStats(slot)}
      </div>`;
    }).join('')}
  </div>`;

  return section('무기 카드', weaponHtml)
       + section('방어구 카드', armorHtml)
       + section('장신구 카드', accessoryHtml);
}

function renderAstrology(astrology) {
  if (!astrology?.length) return emptyMsg();
  const ROMAN = ['I', 'II', 'III'];
  return `<div class="astro-list">${astrology.map((id, i) => {
    const a = byId(DB.astrology, id);
    const icon = a?.image
      ? `<img class="astro-icon" src="${a.image}" alt="">`
      : `<div class="astro-icon astro-icon-empty"></div>`;
    return `<div class="astro-card">
      <div class="astro-card-label">${ROMAN[i] ?? i + 1}</div>
      <div class="astro-card-body">
        ${icon}
        <div class="astro-info">
          <div class="astro-name">${a?.name ?? '???'}</div>
          <div class="astro-desc">${a?.desc?.[i] ?? ''}</div>
        </div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function renderSpell(spell) {
  if (!spell?.length) return emptyMsg();
  return `<table class="item-tbl">${spell.map((id, i) => {
    const s = byId(DB.spells, id);
    return `<tr>
      <td class="tbl-img-cell"><div class="item-thumb-placeholder"></div><span class="tbl-slot-lbl">${i + 1}번</span></td>
      <td class="tbl-body-cell"><div class="tbl-item-name">${s?.name ?? '???'}</div></td>
    </tr>`;
  }).join('')}</table>`;
}

function renderPet(pet) {
  const ids = pet?.ids ?? [];
  if (!ids.length) return emptyMsg();
  const imgs = ids.map(id => {
    const p = byId(DB.pets, id);
    return `<div class="pet-cell">${
      p?.image
        ? `<img class="pet-img" src="${p.image}" alt="">`
        : `<div class="pet-img pet-img-empty"></div>`
    }</div>`;
  }).join('');
  return `<div class="pet-row-wrap"><div class="pet-row">${imgs}</div></div>`;
}

function renderGem(gem) {
  if (!gem) return emptyMsg();
  const sub  = gem.subStatPriority.map((s, i) =>
    `<div class="priority-item">${priNum(i + 1)} ${s}</div>`).join('');
  const rare = gem.rareStatPriority.map((s, i) =>
    `<div class="priority-item">${priNum(i + 1, true)} ${s}</div>`).join('');
  return section('보조속성 우선순위', `<div class="priority-list">${sub}</div>`)
       + section('희귀속성 우선순위', `<div class="priority-list">${rare}</div>`);
}

function renderSoulPower(soul) {
  if (!soul) return emptyMsg();
  const burstRows = soul.burstSkills.map(bs => {
    const sk = byId(DB.burstSkills, bs.skillId);
    return `<tr>
      <td class="tbl-img-cell">${thumb(sk?.image)}<span class="tbl-slot-lbl">${bs.priority}순위</span></td>
      <td class="tbl-body-cell"><div class="tbl-item-name">${sk?.name ?? '???'}</div></td>
    </tr>`;
  }).join('');
  const statRows = soul.stats.map((s, i) =>
    `<div class="priority-item">${priNum(i + 1)} <span class="priority-text">${s.name}</span>${s.note ? `<span class="soul-stat-note">${s.note}</span>` : ''}</div>`
  ).join('');
  return section('버스트 스킬 우선순위', `<table class="item-tbl">${burstRows}</table>`)
       + section('소울파워 속성', `<div class="priority-list">${statRows}</div>`);
}

function renderMarble(marble) {
  if (!marble) return emptyMsg();
  const SPECIAL = [
    { key: 'main',  label: '메인' },
    { key: 'class', label: '직업' },
    { key: 'soul',  label: '소울' },
  ];
  const specialHtml = `<div class="marble-special-row">${SPECIAL.map(s => {
    const m = byId(DB.marbles, marble[s.key]);
    const img = m?.image
      ? `<img class="marble-special-img" src="${m.image}" alt="">`
      : `<div class="marble-special-img-placeholder"></div>`;
    return `<div class="marble-special-card">
      <span class="marble-special-type">${s.label}</span>
      ${img}
      <span class="marble-special-name">${m?.name ?? '???'}</span>
    </div>`;
  }).join('')}</div>`;

  const normalHtml = `<div class="marble-normal-grid">${marble.normal.map(id => {
    const m = byId(DB.marbles, id);
    const img = m?.image
      ? `<img class="marble-normal-img" src="${m.image}" alt="">`
      : `<div class="marble-normal-img-placeholder"></div>`;
    return `<div class="marble-normal-item">${img}<span class="marble-normal-name">${m?.name ?? '???'}</span></div>`;
  }).join('')}</div>`;

  return section('특수 슬롯', specialHtml) + section('일반 슬롯', normalHtml);
}

// ── Panel router ─────────────────────────────────

function renderPanel(key, build) {
  switch (key) {
    case 'equipment': return renderEquipment(build.equipment);
    case 'weapon':    return renderWeapon(build.weapon);
    case 'rune':      return renderRune(build.rune, build.runeColor);
    case 'skill':     return renderSkill(build.skill);
    case 'card':      return renderCard(build.card);
    case 'doll':      return renderImageOnly(build.doll, '인형');
    case 'astrology': return renderAstrology(build.astrology);
    case 'spell':     return renderSpell(build.spell);
    case 'pet':       return renderPet(build.pet);
    case 'gem':       return renderGem(build.gem);
    case 'soulPower': return renderSoulPower(build.soulPower);
    case 'marble':    return renderMarble(build.marble);
    case 'galaxy':    return emptyMsg();
    default:          return '';
  }
}

// ── DOM updates ──────────────────────────────────

function updateCtxBar() {
  const ctxBar = document.getElementById('ctx-bar');
  ctxBar.dataset.class = cls;

  const w = DB.weapons.find(x => x.weaponType === weaponType);
  document.getElementById('ctx-class-label').textContent  = cls;
  document.getElementById('ctx-weapon-label').textContent = w?.name ?? weaponType;

  const sel = document.getElementById('ctx-build-select');
  sel.innerHTML = builds.map(b =>
    `<option value="${b.buildId}">${b.buildName}</option>`
  ).join('');
  sel.value    = currentBuild?.buildId ?? '';
  sel.disabled = builds.length <= 1;
  sel.onchange = () => switchBuild(sel.value);
}

function updateTabBar() {
  const bar = document.getElementById('tab-bar');
  bar.innerHTML = TAB_KEYS.map((key, i) =>
    `<button class="tab-chip${key === currentTab ? ' active' : ''}"
             data-tab="${key}"
             aria-label="${TAB_LABELS[i]}">
      <img class="tab-icon" src="img/tab/${TAB_LABELS[i]}.png" alt="${TAB_LABELS[i]}">
    </button>`
  ).join('');
  bar.querySelectorAll('.tab-chip:not(.disabled)').forEach(btn =>
    btn.addEventListener('click', () => switchTab(btn.dataset.tab))
  );
}

function updateContent() {
  const content = document.getElementById('guide-content');
  content.innerHTML = TAB_KEYS.map(key =>
    `<div class="tab-panel${key === currentTab ? ' active' : ''}" data-panel="${key}">
      ${renderPanel(key, currentBuild)}
    </div>`
  ).join('');
}

// ── Actions ──────────────────────────────────────

function switchTab(key) {
  currentTab = key;
  document.querySelectorAll('.tab-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.tab === key)
  );
  document.querySelectorAll('.tab-panel').forEach(p =>
    p.classList.toggle('active', p.dataset.panel === key)
  );
  document.querySelector(`.tab-chip[data-tab="${key}"]`)
    ?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}

function switchBuild(buildId) {
  currentBuild = builds.find(b => b.buildId === buildId) ?? currentBuild;
  history.pushState({}, '', `?class=${encodeURIComponent(cls)}&weapon=${encodeURIComponent(weaponType)}&build=${encodeURIComponent(buildId)}`);
  updateContent();
}

// ── Init ─────────────────────────────────────────

async function init() {
  if (!cls || !weaponType) {
    document.getElementById('guide-content').innerHTML =
      '<div class="coming-soon">직업과 무기를 선택해주세요</div>';
    return;
  }

  updateCtxBar();
  updateTabBar();

  builds = await discoverBuilds();

  if (!builds.length) {
    document.getElementById('guide-content').innerHTML =
      '<div class="coming-soon">공략 데이터가 없습니다</div>';
    return;
  }

  currentBuild = builds.find(b => b.buildId === initBuildId)
              ?? builds.find(b => b.isMain)
              ?? builds[0];

  updateCtxBar();
  updateContent();
}

init();

document.getElementById('guide-content').addEventListener('click', e => {
  const btn = e.target.closest('.rune-toggle-btn');
  if (!btn || btn.classList.contains('active')) return;
  const mode = btn.dataset.mode;
  btn.closest('.rune-mode-toggle').querySelectorAll('.rune-toggle-btn')
    .forEach(b => b.classList.toggle('active', b === btn));
  const group = document.getElementById('rune-hex-group');
  if (!group) return;
  group.classList.toggle('rotated', mode === 'crystal');
  group.querySelectorAll('[data-mode-content]').forEach(el => {
    el.hidden = el.dataset.modeContent !== mode;
  });
});
