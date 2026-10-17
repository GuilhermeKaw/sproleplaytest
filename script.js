//#region Alternância de Abas e Controle do Menu Mobile
function switchTab(event, tabId) {
  if (event) event.preventDefault();

  closeMobileMenu();

  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  if (activeTab) activeTab.classList.add('active');

  if (event && event.currentTarget && event.currentTarget.classList.contains('tab-btn')) {
    event.currentTarget.classList.add('active');
  } else {
    const btn = document.querySelector(`.tab-btn[onclick*="'${tabId}'"]`);
    if (btn) btn.classList.add('active');
  }

  const searchInput = document.getElementById('hierarchySearchInput');
  if (searchInput) searchInput.value = '';

  const noResultsMsg = document.getElementById('noResultsMessage');
  if (noResultsMsg) noResultsMsg.style.display = 'none';

  document.querySelectorAll('#hierarquia .role-card, #hierarquia .hierarchy-card-group').forEach(el => el.style.display = '');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const navBar = document.getElementById('navTabsBar');
  const overlay = document.getElementById('mobileOverlay');
  if (navBar && overlay) {
    const isOpen = navBar.classList.toggle('open');
    overlay.classList.toggle('active');
    // Bloqueia a rolagem no fundo enquanto o menu estiver aberto
    document.body.classList.toggle('menu-open', isOpen);
  }
}

function closeMobileMenu() {
  const navBar = document.getElementById('navTabsBar');
  const overlay = document.getElementById('mobileOverlay');
  if (navBar && overlay) {
    navBar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
}
//#endregion

//#region Pesquisa e Filtros da Hierarquia
let activeSector = 'all';

function filterHierarchy() {
  const inputEl = document.getElementById('hierarchySearchInput');
  if (!inputEl) return;

  const input = inputEl.value.toLowerCase().trim();
  const groups = document.querySelectorAll('#hierarquia .hierarchy-card-group');
  const noResultsMsg = document.getElementById('noResultsMessage');
  let totalVisibleCards = 0;

  groups.forEach(group => {
    const sector = group.getAttribute('data-sector');
    const matchesSector = (activeSector === 'all' || sector === activeSector);

    if (!matchesSector) {
      group.style.display = 'none';
      return;
    }

    let hasVisibleCardInGroup = false;
    group.querySelectorAll('.role-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      if (input === '' || text.includes(input)) {
        card.style.display = 'flex';
        hasVisibleCardInGroup = true;
        totalVisibleCards++;
      } else {
        card.style.display = 'none';
      }
    });

    group.style.display = hasVisibleCardInGroup ? 'block' : 'none';
  });

  if (noResultsMsg) {
    noResultsMsg.style.display = ((input.length > 0 || activeSector !== 'all') && totalVisibleCards === 0) ? 'block' : 'none';
  }
}

function filterSectorSelect(val) {
  activeSector = val;
  filterHierarchy();
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close-announcement');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const banner = document.querySelector('.top-announcement');
      if (banner) banner.style.display = 'none';
    });
  }
});
//#endregion