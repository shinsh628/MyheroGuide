import { DB } from '../data/db.js';

// ── State ────────────────────────────────────────
let selectedClass = null;

// ── Elements ─────────────────────────────────────
const screenWrap = document.getElementById('screen-wrap');
const classList  = document.getElementById('class-list');
const weaponList = document.getElementById('weapon-list');
const backBtn    = document.getElementById('back-btn');
const backLabel  = document.getElementById('back-label');

// ── Render: Class List ───────────────────────────
function renderClassList() {
  classList.innerHTML = DB.classes.map(cls => `
    <li class="card" data-class="${cls.name}" role="button" tabindex="0"
        aria-label="${cls.name} 선택">
      <div class="card-img-wrap">
        <img src="${cls.image}" alt="" aria-hidden="true">
      </div>
      <div class="card-body">
        <span class="card-name">${cls.name}</span>
      </div>
      <span class="card-chevron" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </li>
  `).join('');

  classList.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', () => selectClass(el.dataset.class));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') selectClass(el.dataset.class);
    });
  });
}

// ── Render: Weapon List ──────────────────────────
function renderWeaponList(className) {
  const weapons = DB.weapons;

  weaponList.innerHTML = weapons.map(w => `
    <li class="card" data-weapon="${w.weaponType}" role="button" tabindex="0"
        aria-label="${w.name} 선택">
      <div class="card-img-wrap">
        <img src="${w.image}" alt="" aria-hidden="true">
      </div>
      <div class="card-body">
        <span class="card-name">${w.name}</span>
      </div>
      <span class="card-chevron" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </li>
  `).join('');

  weaponList.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', () => selectWeapon(el.dataset.weapon));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') selectWeapon(el.dataset.weapon);
    });
  });

  // Scroll back to top when re-rendering
  weaponList.scrollTop = 0;
}

// ── Actions ──────────────────────────────────────
function selectClass(className) {
  selectedClass = className;
  backLabel.textContent = className;
  renderWeaponList(className);
  screenWrap.classList.add('slide-left');
}

function goBack() {
  screenWrap.classList.remove('slide-left');
  selectedClass = null;
}

function selectWeapon(weaponType) {
  const params = new URLSearchParams({
    class:  selectedClass,
    weapon: weaponType,
  });
  window.location.href = `guide?${params}`;
}

// ── Init ─────────────────────────────────────────
backBtn.addEventListener('click', goBack);
renderClassList();
