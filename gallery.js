/**
 * COSMIC GALLERY ENGINE - SANIYA & NIKHIL
 * Features:
 * 1. Hardcoded Cloudinary 'ih2kwaro' (Never prompts)
 * 2. MagicBento Animation System (GSAP, Spotlight, Border Glow, Particles, Click Ripple)
 * 3. Media Popup Window (PC & Mobile for both Image & Video with Left/Right Arrows, Click-Outside-to-Close)
 * 4. Mobile Touch & Hold Video Peek (Instagram-style)
 * 5. Selection Mode & 3-Dot Dropdown
 * 6. 6-Digit Passcode Setup & Secret Hidden Vault ("View More")
 * 7. Cross-Device Persistence & Netlify Deployment Ready
 */

const CLOUD_NAME = 'ih2kwaro';

// MagicBento Configuration Options
const MAGIC_BENTO_CONFIG = {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: false,
  enableMagnetism: false,
  clickEffect: true,
  spotlightRadius: 400,
  particleCount: 12,
  glowColor: '132, 0, 255',
  disableAnimations: false
};

// Global Gallery State
let allMedia = [];
let hiddenIds = new Set();
let vaultPasscode = '';
let isVaultUnlocked = false;
let currentFilter = 'all';
let isSelectMode = false;
let selectedIds = new Set();
let currentLightboxIndex = -1;
let activeLightboxList = [];

// Touch & Hold Variables (Mobile)
let holdTimer = null;
let isHoldingPeek = false;

document.addEventListener('DOMContentLoaded', () => {
  initGalleryApp();
});

async function initGalleryApp() {
  loadVaultStateFromURL();
  await loadVaultState();
  initTopNav();
  initSelectionBar();
  initDropdownMenu();
  initPasscodeModal();
  initLightbox();
  initPeekPopup();
  await loadMedia();
}

/* ==========================================================
   1. VAULT STATE & CROSS-DEVICE PERSISTENCE
   ========================================================== */
function loadVaultStateFromURL() {
  try {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#vault=')) {
      const b64 = hash.replace('#vault=', '');
      const jsonStr = decodeURIComponent(escape(atob(b64)));
      const data = JSON.parse(jsonStr);
      if (data.passcode) {
        vaultPasscode = data.passcode;
        localStorage.setItem('saniya_vault_passcode', vaultPasscode);
      }
      if (Array.isArray(data.hidden_ids)) {
        hiddenIds = new Set(data.hidden_ids);
        localStorage.setItem('saniya_hidden_ids', JSON.stringify(data.hidden_ids));
      }
    }
  } catch (e) {
    console.warn('URL vault parse error:', e);
  }
}

async function loadVaultState() {
  const savedPass = localStorage.getItem('saniya_vault_passcode');
  if (savedPass) vaultPasscode = savedPass;

  const savedHidden = localStorage.getItem('saniya_hidden_ids');
  if (savedHidden) {
    try {
      const arr = JSON.parse(savedHidden);
      if (Array.isArray(arr)) hiddenIds = new Set(arr);
    } catch (e) {}
  }

  try {
    const resp = await fetch('vault_config.json', { cache: 'no-store' });
    if (resp.ok) {
      const data = await resp.json();
      if (data.passcode) {
        vaultPasscode = data.passcode;
        localStorage.setItem('saniya_vault_passcode', vaultPasscode);
      } else if (data.passcode === '') {
        vaultPasscode = '';
        localStorage.removeItem('saniya_vault_passcode');
      }
      if (Array.isArray(data.hidden_ids)) {
        data.hidden_ids.forEach(id => hiddenIds.add(id));
        localStorage.setItem('saniya_hidden_ids', JSON.stringify(Array.from(hiddenIds)));
      }
    }
  } catch (e) {}
}

async function saveVaultState() {
  const hiddenArr = Array.from(hiddenIds);
  localStorage.setItem('saniya_vault_passcode', vaultPasscode);
  localStorage.setItem('saniya_hidden_ids', JSON.stringify(hiddenArr));

  try {
    await fetch('/api/vault-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: vaultPasscode, hidden_ids: hiddenArr })
    });
  } catch (e) {}

  try {
    const payload = JSON.stringify({ passcode: vaultPasscode, hidden_ids: hiddenArr });
    const b64 = btoa(unescape(encodeURIComponent(payload)));
    history.replaceState(null, '', `#vault=${b64}`);
  } catch (e) {}
}

/* ==========================================================
   2. MEDIA RETRIEVAL (INSTANT CACHE + CLOUDINARY API)
   ========================================================== */
async function loadMedia() {
  showSkeletons();

  // Try static media_data.json first (super-fast, works 100% on Netlify)
  try {
    const resp = await fetch('media_data.json', { cache: 'no-cache' });
    if (resp.ok) {
      const data = await resp.json();
      allMedia = data.resources || [];
      if (allMedia.length > 0) {
        renderGrid();
        return;
      }
    }
  } catch (e) {}

  // Fallback to local server or Netlify function
  try {
    const endpoints = [
      `/api/cloudinary-media?cloud_name=${CLOUD_NAME}`,
      `/.netlify/functions/cloudinary-media?cloud_name=${CLOUD_NAME}`
    ];

    for (const ep of endpoints) {
      try {
        const resp = await fetch(ep);
        if (resp.ok) {
          const data = await resp.json();
          allMedia = data.resources || [];
          if (allMedia.length > 0) {
            renderGrid();
            return;
          }
        }
      } catch (err) {}
    }
  } catch (err) {
    console.error('All media endpoints failed:', err);
  }

  showEmptyState('Could Not Load Media', 'Please check your connection and refresh.');
}

/* ==========================================================
   3. CLEAN CARD INTERACTIONS
   ========================================================== */
function attachMagicCardEffects(card) {
  // Keep clean card styling without heavy hover particle animations
  card.classList.add('grid-card');
}

/* ==========================================================
   4. TOP BAR & SELECTION ACTIONS
   ========================================================== */
function initTopNav() {
  const toggleSelectBtn = document.getElementById('toggle-select-btn');

  if (toggleSelectBtn) {
    toggleSelectBtn.addEventListener('click', () => {
      isSelectMode = !isSelectMode;
      selectedIds.clear();
      updateSelectionUI();
    });
  }

  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderGrid();
    });
  });

  const bannerExitBtn = document.getElementById('banner-exit-vault-btn');
  if (bannerExitBtn) {
    bannerExitBtn.addEventListener('click', exitVaultMode);
  }
}

function initSelectionBar() {
  const barHideBtn = document.getElementById('bar-hide-btn');
  const barCancelBtn = document.getElementById('bar-cancel-btn');

  if (barHideBtn) {
    barHideBtn.addEventListener('click', handleHideOrUnhideSelected);
  }

  if (barCancelBtn) {
    barCancelBtn.addEventListener('click', () => {
      isSelectMode = false;
      selectedIds.clear();
      updateSelectionUI();
    });
  }
}

function updateSelectionUI() {
  const toggleSelectBtn = document.getElementById('toggle-select-btn');
  const selectBtnText = document.getElementById('select-btn-text');
  const selectionBar = document.getElementById('selection-bar');
  const countText = document.getElementById('selection-count-text');
  const barActionText = document.getElementById('bar-action-text');
  const barActionIcon = document.getElementById('bar-action-icon');

  if (isSelectMode) {
    document.body.classList.add('selection-mode-active');
    toggleSelectBtn.classList.add('active-state');
    selectBtnText.textContent = 'Cancel';
  } else {
    document.body.classList.remove('selection-mode-active');
    toggleSelectBtn.classList.remove('active-state');
    selectBtnText.textContent = 'Select';
  }

  if (isSelectMode && selectedIds.size > 0) {
    selectionBar.classList.add('visible');
    countText.textContent = `${selectedIds.size} selected`;

    if (isVaultUnlocked) {
      barActionIcon.textContent = '🔓';
      barActionText.textContent = 'Unhide';
    } else {
      barActionIcon.textContent = '🔒';
      barActionText.textContent = 'Hide';
    }
  } else {
    selectionBar.classList.remove('visible');
  }

  const cards = document.querySelectorAll('.grid-card');
  cards.forEach(card => {
    const id = card.getAttribute('data-id');
    if (selectedIds.has(id)) {
      card.classList.add('is-selected');
    } else {
      card.classList.remove('is-selected');
    }
  });

  const menuHideBtn = document.getElementById('menu-hide-selected-btn');
  const menuUnhideBtn = document.getElementById('menu-unhide-selected-btn');
  if (menuHideBtn) menuHideBtn.style.display = (isSelectMode && !isVaultUnlocked) ? 'flex' : 'none';
  if (menuUnhideBtn) menuUnhideBtn.style.display = (isSelectMode && isVaultUnlocked) ? 'flex' : 'none';
}

/* ==========================================================
   5. DROPDOWN MENU (3-DOTS)
   ========================================================== */
function initDropdownMenu() {
  const threeDotsBtn = document.getElementById('three-dots-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const viewMoreBtn = document.getElementById('menu-view-more-btn');
  const hideSelectedBtn = document.getElementById('menu-hide-selected-btn');
  const unhideSelectedBtn = document.getElementById('menu-unhide-selected-btn');
  const selectAllBtn = document.getElementById('menu-select-all-btn');
  const shareBtn = document.getElementById('menu-share-btn');
  const refreshBtn = document.getElementById('menu-refresh-btn');
  const exitVaultBtn = document.getElementById('menu-exit-vault-btn');

  threeDotsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
  });

  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  viewMoreBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    handleViewMoreClick();
  });

  hideSelectedBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    handleHideOrUnhideSelected();
  });

  unhideSelectedBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    handleHideOrUnhideSelected();
  });

  selectAllBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    isSelectMode = true;
    const currentList = getVisibleMediaList();
    currentList.forEach(m => selectedIds.add(m.public_id));
    updateSelectionUI();
  });

  shareBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    saveVaultState();
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('🔗 Cross-device link copied! Open on any phone or laptop.');
    }).catch(() => {
      prompt('Copy this link to open on any device with exact same hidden media:', shareUrl);
    });
  });

  refreshBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    loadMedia();
    showToast('🔄 Refreshing media from Cloudinary...');
  });

  exitVaultBtn.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    exitVaultMode();
  });
}

/* ==========================================================
   6. PASSCODE SETUP & SECRET VAULT LOGIC ("VIEW MORE")
   ========================================================== */
let pendingActionAfterPIN = null;

function handleHideOrUnhideSelected() {
  if (selectedIds.size === 0) {
    showToast('⚠️ Please select at least one item first!');
    return;
  }

  if (isVaultUnlocked) {
    selectedIds.forEach(id => hiddenIds.delete(id));
    saveVaultState();
    showToast(`🔓 ${selectedIds.size} item(s) restored to public gallery!`);
    selectedIds.clear();
    isSelectMode = false;
    updateSelectionUI();
    renderGrid();
    return;
  }

  if (!vaultPasscode) {
    pendingActionAfterPIN = 'setup_passcode';
    openPasscodeModal(
      'Set Up 6-Digit PIN',
      'Create a 6-digit secret passcode to protect your hidden photos & videos.'
    );
  } else {
    selectedIds.forEach(id => hiddenIds.add(id));
    saveVaultState();
    showToast(`🔒 ${selectedIds.size} item(s) moved to Secret Vault!`);
    selectedIds.clear();
    isSelectMode = false;
    updateSelectionUI();
    renderGrid();
  }
}

function handleViewMoreClick() {
  if (isVaultUnlocked) {
    showToast('You are already inside the Secret Vault 🔐');
    return;
  }

  if (!vaultPasscode && hiddenIds.size === 0) {
    showToast('💡 No hidden media yet! Click "Select" and "Hide" to store secret items.');
    return;
  }

  pendingActionAfterPIN = 'unlock_vault';
  openPasscodeModal(
    'Enter 6-Digit PIN',
    'Enter your secret 6-digit passcode to unlock the hidden media gallery.'
  );
}

function initPasscodeModal() {
  const modal = document.getElementById('passcode-modal');
  const closeBtn = document.getElementById('close-passcode-btn');
  const submitBtn = document.getElementById('submit-pin-btn');
  const pinInputs = document.querySelectorAll('.pin-digit');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  pinInputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
      const val = input.value.replace(/[^0-9]/g, '');
      input.value = val ? val[val.length - 1] : '';

      if (val && idx < pinInputs.length - 1) {
        pinInputs[idx + 1].focus();
      }

      const enteredPIN = getEnteredPIN();
      if (enteredPIN.length === 6) {
        processEnteredPIN(enteredPIN);
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        pinInputs[idx - 1].focus();
      } else if (e.key === 'Enter') {
        const enteredPIN = getEnteredPIN();
        if (enteredPIN.length === 6) processEnteredPIN(enteredPIN);
      }
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const enteredPIN = getEnteredPIN();
      if (enteredPIN.length < 6) {
        showPINError('Please enter all 6 digits.');
      } else {
        processEnteredPIN(enteredPIN);
      }
    });
  }
}

function getEnteredPIN() {
  const inputs = document.querySelectorAll('.pin-digit');
  return Array.from(inputs).map(i => i.value).join('');
}

function openPasscodeModal(title, desc) {
  const modal = document.getElementById('passcode-modal');
  const titleEl = document.getElementById('passcode-modal-title');
  const descEl = document.getElementById('passcode-modal-desc');
  const errorEl = document.getElementById('pin-error-msg');
  const inputs = document.querySelectorAll('.pin-digit');

  titleEl.textContent = title;
  descEl.textContent = desc;
  errorEl.textContent = '';
  inputs.forEach(i => (i.value = ''));

  modal.classList.add('open');
  setTimeout(() => inputs[0].focus(), 250);
}

function showPINError(msg) {
  const errorEl = document.getElementById('pin-error-msg');
  errorEl.textContent = msg;
  const row = document.getElementById('pin-inputs-row');
  row.style.animation = 'shakeError 0.4s ease';
  setTimeout(() => (row.style.animation = ''), 400);
}

function processEnteredPIN(pin) {
  const modal = document.getElementById('passcode-modal');

  if (pendingActionAfterPIN === 'setup_passcode') {
    vaultPasscode = pin;
    selectedIds.forEach(id => hiddenIds.add(id));
    saveVaultState();

    modal.classList.remove('open');
    showToast(`🔐 6-digit PIN created & ${selectedIds.size} items moved to Secret Vault!`);
    selectedIds.clear();
    isSelectMode = false;
    updateSelectionUI();
    renderGrid();
    pendingActionAfterPIN = null;
  } else if (pendingActionAfterPIN === 'unlock_vault') {
    if (pin === vaultPasscode) {
      modal.classList.remove('open');
      enterVaultMode();
      pendingActionAfterPIN = null;
    } else {
      showPINError('Incorrect 6-digit PIN. Please try again.');
    }
  }
}

function enterVaultMode() {
  isVaultUnlocked = true;
  selectedIds.clear();
  isSelectMode = false;

  document.getElementById('vault-mode-pill').style.display = 'inline-flex';
  document.getElementById('banner-exit-vault-btn').style.display = 'inline-block';
  document.getElementById('menu-exit-vault-btn').style.display = 'flex';
  document.getElementById('gallery-badge').style.borderColor = '#ff70a6';
  document.getElementById('badge-label-text').textContent = 'SECRET VAULT UNLOCKED';
  document.getElementById('gallery-main-title').textContent = 'Secret Constellations 🔐';
  document.getElementById('gallery-subtitle-text').textContent =
    'Private memories locked behind your 6-digit passcode.';

  updateSelectionUI();
  renderGrid();
  showToast('✨ Secret Vault Unlocked! Welcome to your private memories.');
}

function exitVaultMode() {
  isVaultUnlocked = false;
  selectedIds.clear();
  isSelectMode = false;

  document.getElementById('vault-mode-pill').style.display = 'none';
  document.getElementById('banner-exit-vault-btn').style.display = 'none';
  document.getElementById('menu-exit-vault-btn').style.display = 'none';
  document.getElementById('gallery-badge').style.borderColor = '';
  document.getElementById('badge-label-text').textContent = 'ORBIT OF MEMORIES';
  document.getElementById('gallery-main-title').textContent = 'Constellations of Us';
  document.getElementById('gallery-subtitle-text').textContent =
    '"Every photograph is a frozen star, reminding us how beautiful our universe is together."';

  updateSelectionUI();
  renderGrid();
  showToast('Exited Secret Vault. Returned to public gallery.');
}

/* ==========================================================
   7. GRID RENDERING & MEDIA TILES
   ========================================================== */
function getVisibleMediaList() {
  if (isVaultUnlocked) {
    return allMedia.filter(item => hiddenIds.has(item.public_id));
  } else {
    return allMedia.filter(item => !hiddenIds.has(item.public_id));
  }
}

function renderGrid() {
  const grid = document.getElementById('media-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  grid.innerHTML = '';

  const visibleList = getVisibleMediaList();

  const filtered = visibleList.filter(item => {
    if (currentFilter === 'all') return true;
    return item.media_type === currentFilter;
  });

  const countAll = document.getElementById('count-all');
  const countPhotos = document.getElementById('count-photos');
  const countVideos = document.getElementById('count-videos');
  if (countAll) countAll.textContent = visibleList.length;
  if (countPhotos) countPhotos.textContent = visibleList.filter(m => m.media_type === 'image').length;
  if (countVideos) countVideos.textContent = visibleList.filter(m => m.media_type === 'video').length;

  if (filtered.length === 0) {
    if (isVaultUnlocked) {
      showEmptyState(
        'Secret Vault is Empty',
        'No hidden photos or videos yet. Return to the main gallery, click Select, and click Hide to protect items.'
      );
    } else {
      showEmptyState('No Media Found', 'No photos or videos to show in this view.');
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  filtered.forEach((item, index) => {
    const isVideo = item.media_type === 'video';
    const mediaUrl = item.secure_url || item.url;
    const publicId = item.public_id;

    let thumbUrl = mediaUrl;
    if (item.format) {
      if (!isVideo) {
        thumbUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,ar_1:1,w_450,q_auto,f_auto/${publicId}.${item.format}`;
      } else {
        thumbUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/c_fill,ar_1:1,w_450,so_0,q_auto,f_jpg/${publicId}.jpg`;
      }
    }

    const card = document.createElement('div');
    card.className = 'grid-card';
    card.setAttribute('data-id', publicId);
    card.setAttribute('tabindex', '0');

    if (selectedIds.has(publicId)) {
      card.classList.add('is-selected');
    }

    card.innerHTML = `
      <img src="${thumbUrl}" alt="Memory" class="grid-card-media" loading="lazy" onerror="this.src='${mediaUrl}'">
      ${isVideo ? '<div class="video-play-badge">▶</div>' : ''}
      <div class="card-checkbox">✓</div>
    `;

    // Apply MagicBento animations (GSAP Border Glow, Particle Stars, Click Ripple)
    attachMagicCardEffects(card);

    // Click handler for card:
    // - If in selection mode: toggles selection
    // - If not in selection mode: opens in Popup Window with left/right arrows!
    card.addEventListener('click', () => {
      if (isHoldingPeek) return;

      if (isSelectMode) {
        if (selectedIds.has(publicId)) {
          selectedIds.delete(publicId);
        } else {
          selectedIds.add(publicId);
        }
        updateSelectionUI();
      } else {
        // Task 1 & 2: Opens in popup window with Left/Right navigation for both PC & Mobile
        const indexInFiltered = filtered.indexOf(item);
        openLightbox(filtered, indexInFiltered);
      }
    });

    // Mobile touch & hold peek for videos
    if (isVideo) {
      attachVideoPeekListeners(card, mediaUrl);
    }

    grid.appendChild(card);
  });
}

function showSkeletons() {
  const grid = document.getElementById('media-grid');
  const emptyState = document.getElementById('empty-state');
  if (emptyState) emptyState.style.display = 'none';
  if (!grid) return;

  grid.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const skel = document.createElement('div');
    skel.className = 'skeleton-card';
    grid.appendChild(skel);
  }
}

function showEmptyState(title, desc) {
  const grid = document.getElementById('media-grid');
  const emptyState = document.getElementById('empty-state');
  const emptyTitle = document.getElementById('empty-title');
  const emptyDesc = document.getElementById('empty-desc');

  if (grid) grid.innerHTML = '';
  if (emptyTitle) emptyTitle.textContent = title;
  if (emptyDesc) emptyDesc.textContent = desc;
  if (emptyState) emptyState.style.display = 'block';
}

/* ==========================================================
   8. MOBILE TOUCH & HOLD VIDEO PEEK (Instagram Style)
   ========================================================== */
function attachVideoPeekListeners(card, videoUrl) {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  const startHold = () => {
    if (isSelectMode) return;

    holdTimer = setTimeout(() => {
      isHoldingPeek = true;
      triggerVideoPeek(videoUrl);
      if (navigator.vibrate) navigator.vibrate(35);
    }, 280);
  };

  const cancelHold = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    if (isHoldingPeek) {
      closeVideoPeek();
      setTimeout(() => {
        isHoldingPeek = false;
      }, 150);
    }
  };

  // Only enable touch peek on touch devices (so PC clicks open full popup window)
  if (isTouchDevice) {
    card.addEventListener('touchstart', startHold, { passive: true });
    card.addEventListener('touchend', cancelHold);
    card.addEventListener('touchcancel', cancelHold);
  }
}

function initPeekPopup() {
  const soundToggle = document.getElementById('peek-sound-toggle');
  const player = document.getElementById('peek-video-player');

  if (soundToggle && player) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      player.muted = !player.muted;
      soundToggle.textContent = player.muted ? '🔇 Muted' : '🔊 Sound On';
    });
  }
}

function triggerVideoPeek(videoUrl) {
  const overlay = document.getElementById('peek-overlay');
  const player = document.getElementById('peek-video-player');
  const soundToggle = document.getElementById('peek-sound-toggle');

  if (!overlay || !player) return;

  player.src = videoUrl;
  player.muted = false;
  if (soundToggle) soundToggle.textContent = '🔊 Sound On';

  overlay.classList.add('active');

  const playPromise = player.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      player.muted = true;
      if (soundToggle) soundToggle.textContent = '🔇 Muted (Tap to hear)';
      player.play();
    });
  }
}

function closeVideoPeek() {
  const overlay = document.getElementById('peek-overlay');
  const player = document.getElementById('peek-video-player');

  if (overlay) overlay.classList.remove('active');
  if (player) {
    player.pause();
    player.removeAttribute('src');
    player.load();
  }
}

/* ==========================================================
   9. POPUP WINDOW (PC & MOBILE WITH ARROWS AND BACKDROP CLICK CLOSE)
   Tasks 1 & 2:
   - When video is clicked (PC/mobile): played in popup window.
   - When clicked outside window: returns to normal gallery.
   - When image is clicked: opens in popup window with Left/Right arrows
     to move to next image or video.
   ========================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const card = document.getElementById('lightbox-window-card');

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  // TASK 1: When clicked outside the window, returns to normal gallery!
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeLightbox();
      }
    });
  }

  // Prevent clicks inside the window card from closing the modal
  if (card) {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Keyboard navigation: Escape closes, Left/Right arrows navigate
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Mobile Touch Swipe Navigation
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateLightbox(-1); // Swipe Right -> Previous
      } else {
        navigateLightbox(1);  // Swipe Left -> Next
      }
    }
  }, { passive: true });
}

function openLightbox(list, index) {
  activeLightboxList = list;
  currentLightboxIndex = index;
  renderLightboxMedia();
  document.getElementById('lightbox-modal').classList.add('open');
}

function renderLightboxMedia() {
  const content = document.getElementById('lightbox-content');
  const caption = document.getElementById('lightbox-caption');
  const item = activeLightboxList[currentLightboxIndex];
  if (!item || !content) return;

  // Clean up any previously playing video
  const prevVid = content.querySelector('video');
  if (prevVid) {
    prevVid.pause();
    prevVid.removeAttribute('src');
    prevVid.load();
  }

  content.innerHTML = '';
  const isVideo = item.media_type === 'video';
  const mediaUrl = item.secure_url || item.url;
  const title = item.public_id ? item.public_id.split('/').pop().replace(/[_-]/g, ' ') : 'Memory';

  if (isVideo) {
    // TASK 1: Video is played in the popup window
    const vid = document.createElement('video');
    vid.src = mediaUrl;
    vid.controls = true;
    vid.autoplay = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    content.appendChild(vid);

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for autoplay policy
        vid.muted = true;
        vid.play();
      });
    }
  } else {
    // TASK 2: Image is opened in the popup window
    const img = document.createElement('img');
    img.src = mediaUrl;
    img.alt = title;
    content.appendChild(img);
  }

  if (caption) {
    caption.textContent = `${title} • (${currentLightboxIndex + 1} of ${activeLightboxList.length})`;
  }
}

function navigateLightbox(dir) {
  if (activeLightboxList.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + dir + activeLightboxList.length) % activeLightboxList.length;
  renderLightboxMedia();
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const content = document.getElementById('lightbox-content');

  if (modal) modal.classList.remove('open');

  if (content) {
    const vid = content.querySelector('video');
    if (vid) {
      vid.pause();
      vid.removeAttribute('src');
      vid.load();
    }
    content.innerHTML = '';
  }
}

/* ==========================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast-popup');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
