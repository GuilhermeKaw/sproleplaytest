// Troca de Abas & Controle do Menu Mobile
function switchTab(event, tabId) {
  if (event) event.preventDefault();

  // Fecha a barra lateral se estiver aberta no celular
  closeMobileMenu();

  // 1. Oculta todas as abas
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // 2. Remove estado ativo dos botões
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // 3. Ativa a aba selecionada
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // 4. Ativa o botão correspondente
  if (event && event.currentTarget && event.currentTarget.classList.contains('tab-btn')) {
    event.currentTarget.classList.add('active');
  } else {
    const btn = document.querySelector(`.tab-btn[onclick*="'${tabId}'"]`);
    if (btn) btn.classList.add('active');
  }

  // Reseta a pesquisa e oculta a mensagem de erro ao trocar de aba
  const searchInput = document.getElementById('hierarchySearchInput');
  if (searchInput) searchInput.value = '';

  const noResultsMsg = document.getElementById('noResultsMessage');
  if (noResultsMsg) noResultsMsg.style.display = 'none';

  // Restaura a visibilidade dos elementos da hierarquia
  document.querySelectorAll('#hierarquia .role-card, #hierarquia .hierarchy-card-group').forEach(el => {
    el.style.display = '';
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const navBar = document.getElementById('navTabsBar');
  const overlay = document.getElementById('mobileOverlay');
  if (navBar && overlay) {
    navBar.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

function closeMobileMenu() {
  const navBar = document.getElementById('navTabsBar');
  const overlay = document.getElementById('mobileOverlay');
  if (navBar && overlay) {
    navBar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// Filtro e Pesquisa de Hierarquia
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

// Eventos de Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close-announcement');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const banner = document.querySelector('.top-announcement');
      if (banner) banner.style.display = 'none';
    });
  }
});