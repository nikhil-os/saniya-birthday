/**
 * CELESTIAL SOLAR BIRTHDAY EXPERIENCE FOR SANIYA
 * Cosmic Canvas Engine, Ambient Audio Synthesizer,
 * Dual-Version Mode (👧 Girl Mode vs ⚠️ Danger Mode with 6-Digit Passcode Protection),
 * Playful Irritating Buttons, and Supernova Fireworks
 */

let currentVersion = 'sneha'; // Default landing: Safe / Normal Birthday Wishes (👧)
let vaultPasscode = '';
let isDangerUnlocked = false;

// ==========================================================
// 1. DATA REPOSITORY FOR DUAL VERSIONS (SNEHA & NIKHIL)
// Pure Solar / Universe Theme for both sides!
// ==========================================================
const VERSION_DATA = {
  sneha: {
    senderBadge: "SNEHA 🌸",
    heroBadgeSender: "BESTIES ACROSS THE GALAXY",
    heroSubBadge: "SOLAR RETURN CELEBRATION",
    switchPrompt: "Enter Danger Mode ⚠️",
    switchIcon: "🔒",
    heroQuote: `"To the brightest supernova in my universe! Happy Birthday Saniya — orbiting through life with you as my best friend is pure starlight & endless laughter!"`,
    sec1Title: "A Star Is Born 🌸 Sunshine of My Galaxy",
    sec1Text1: "On this very day, the universe sent its most radiant, caring, hilarious, and crazy soul into our world! Saniya, you brought starlight, uncontrollable laughs, and pure sunshine to everyone around you.",
    sec1Highlight: `"Happy Birthday to my dearest bestie! Another glorious trip around the sun, and another year of being completely blessed with your sisterhood, your chaos, and your unconditional warmth."`,
    stat1Num: "365",
    stat1Label: "Days of Pure Giggles & Chaos",
    stat2Num: "∞",
    stat2Label: "Gossip & Sisterhood Love",
    stat3Num: "1 in 8B",
    stat3Label: "My Soul Sister Forever",
    photo1Tag: "👯‍♀️ Constellation of Besties",
    photo1Caption: `"No matter which galaxy we are in, you and I will always be the most iconic, chaotic duo!"`,
    sec2Title: "Your Gravity 🌟",
    sec2Text1: "Scientists say gravity holds planets in place, but your positive vibe and beautiful heart hold our whole friendship together. Even on the stormiest days, your smile brings instant sunshine.",
    sec2Quote: `"True best friends are like constellations in the night sky — even in the deepest darkness, their light reminds you that you are never alone in this vast universe."`,
    sec4Title: "Our Cosmic Timeline 🚀 Friendship Across The Stars",
    sec4Subtitle: "A journey through spacetime & sisterhood",
    timeline: [
      {
        phase: "Chapter I",
        title: "When Our Stars Aligned",
        text: "Two crazy souls randomly collided in this big universe and clicked instantly like we'd been best friends for eons."
      },
      {
        phase: "Chapter II",
        title: "The Inseparable Cosmic Duo",
        text: "From casual greetings to becoming each other's 911 emergency call, gossip partner, and biggest personal cheerleader."
      },
      {
        phase: "Chapter III",
        title: "Today: Celebrating Saniya Day!",
        text: "Putting on the brightest birthday crown for the absolute queen! Today the whole universe celebrates YOU!"
      },
      {
        phase: "Chapter ∞",
        title: "Growing Old & Gossiping Together",
        text: "Here's to a hundred more trips around the sun, endless shopping sprees, rocking chairs, and gossiping as grandmas!"
      }
    ],
    quizTitle: "One Crucial Bestie Question...",
    quizQuestion: `"Do you love your bestie Sneha? 🌸👯‍♀️"`,
    quizHint: "Careful girl... your favorite gossip partner is watching very closely!",
    yesBtnText: "YES! Bestie Forever! 🌸",
    noBtnText: "NOPE 😜",
    noTeases: [
      "Haww! Bestie ko 'NO'?! Ye option toh completely illegal hai! 😂",
      "Catch me if you can! Sneha's friendship is non-negotiable! 💅",
      "Nice try! You're stuck with me across every galaxy! 🌸",
      "Friendzone error: Bestie love is locked at 1000%! 💕",
      "Cosmic law: Sneha & Saniya are besties forever! ✨"
    ],
    yesCaughtHint: "Haha caught me! Click YES to ignite bestie fireworks! ✨",
    yesSuccessHint: "YAY! Sneha & Saniya are besties forever across the cosmos! 🌸👯‍♀️",
    yesSuccessTease: "I KNEW IT! Soul sisters for life! 💕",
    letterStamp: "🌸 SNEHA & SANIYA SISTERHOOD",
    letterTitle: "To My Prettiest & Craziest Bestie, Saniya! 🌸",
    letterBody: `
      <p><strong>HAPPY BIRTHDAY TO MY ABSOLUTE FAVORITE HUMAN! 🎂🎉🥳</strong></p>
      <p>Saniya, words can't even begin to describe how grateful I am to have you as my best friend in this vast universe! You are the sweetest, most genuine, hilarious, and prettiest soul, inside and out.</p>
      <div class="letter-bestie-quote">
        <em>"A sweet friendship refreshes the soul — and with you, every single day feels like a celebration under the stars."</em>
      </div>
      <p>Thank you for all the late-night rants, the uncontrollable laughing fits that gave us stomach cramps, the honest outfit advice, and for standing by me through thick and thin.</p>
      <p>On your special solar return, I pray all your secret wishes, biggest dreams, and happiest desires come true. You deserve every ounce of starlight, success, and pure joy that exists!</p>
      <p>Keep shining bright, my personal sunshine. I'll always be your ride-or-die bestie!</p>
      <p class="letter-signature">
        With lots of love & cosmic hugs,<br>
        <span class="signature-name">Sneha 🌸</span>
      </p>
    `,
    footerNote: "Crafted with bestie love & cosmic starlight for <strong>Saniya</strong> • Forever & Always, Sneha 🌸"
  },
  nikhil: {
    senderBadge: "NIKHIL ❤️",
    heroBadgeSender: "ORBITING SINCE DAY ONE",
    heroSubBadge: "SOLAR RETURN",
    switchPrompt: "Switch to Normal Mode 👧",
    switchIcon: "✦",
    heroQuote: `"Arbon sitaron ki bheed mein bhi ye nigahein sirf tujhe dhoondhti hain...<br>Kyunki meri poori kainat ka markaz sirf tum ho, meri jaan."`,
    sec1Title: "A Star Is Born ✨ Kainat Ka Noor",
    sec1Text1: "Jab tum is duniya mein aayi thi, toh shayad aasmaan ke taare bhi tham gaye the. Tum sirf paida nahi hui, balki andhere aalam mein noor banke chamki ho.",
    sec1Highlight: `"Tere aane se mehki hai mere dil ki har ek gali,<br>Tu chaand hai mera, aur main teri kashish.<br>Sau janam bhi kam hain tere ishq ke safar ke liye,<br>Kainat ki har subah bas tujhse hi shuru ho yehi hai meri khwahish."`,
    stat1Num: "365",
    stat1Label: "Suraj Ka Har Din Tere Saath",
    stat2Num: "∞",
    stat2Label: "Beintehaa Roohani Mohabbat",
    stat3Num: "1 in 8B",
    stat3Label: "Meri Poori Kainat, Meri Saniya",
    photo1Tag: "🪐 Constellation of Our Love",
    photo1Caption: `"Haath thaam kar jab hum sitaron ko dekhte hain, lagta hai waqt wahin thehar gaya ho."`,
    sec2Title: "Your Gravity 🪐",
    sec2Text1: "Scientists kehte hain gravity planets ko baandh kar rakhti hai. Par mere liye gravity tumhari wo pyari muskaan hai, jo mere bechain dil ko hamesha sukoon ke orbit mein kheench leti hai.",
    sec2Quote: `"Chandni bhi feeki lagti hai tere noor ke aage,<br>Sitaron ne sajda kiya hai tere aane ke baad.<br>Ye jo dil dhadakta hai mera har ek pal,<br>Kainat ki kasam, ghumta hai sirf tere hi gird har raat."`,
    sec4Title: "Our Cosmic Timeline 🚀 Hamara Kahkashan Safar",
    sec4Subtitle: "A journey through spacetime",
    timeline: [
      {
        phase: "Chapter I",
        title: "The Cosmic Collision",
        text: "Kainat ne hamari manzilon ko aapas mein milaya, aur meri berang zindagi mein sitaron sa noor bhar gaya."
      },
      {
        phase: "Chapter II",
        title: "Entering Each Other's Orbit",
        text: "Ek anjaan shakhs se meri subah ki pehli aur raat ki aakhri soch ban gayi. Tumhara saath meri sabse badi taqat ban gaya."
      },
      {
        phase: "Chapter III",
        title: "Today: Your Solar Return",
        text: "Celebrating the queen of my heart. Aaj ka ye din, ye fizayein, aur ye sitare sab sirf tumhare naam hain."
      },
      {
        phase: "Chapter ∞",
        title: "To Infinity & Beyond",
        text: "Jab tak ye suraj, chaand aur aasmaan rahenge, mera har ek pal sirf tumhari mohabbat ke sahare chalega."
      }
    ],
    quizTitle: "One Crucial Cosmic Question...",
    quizQuestion: `"Do you love me, Saniya? 🪐💖"`,
    quizHint: "Soch samajh ke batana... poori kainat ki physics tumhare jawab pe tiki hai!",
    yesBtnText: "HAAN, BEINTEHAA!",
    noBtnText: "NAHI 😜",
    noTeases: [
      "Arey sach batao na! 'NO' ka option universe me exist hi nahi karta! 💖",
      "Pakad ke dikhao! Nikhil se door bhaagna impossible hai! 🏃‍♂️💨",
      "Kainat ki gravity tumhe wapas yahin kheench laayegi! 🥰",
      "Physics says: Saniya belongs to Nikhil's orbit! 🚀",
      "Nice try! Still 1000% in love! ✨"
    ],
    yesCaughtHint: "Alright, caught me! Click YES to ignite the cosmos! ✨",
    yesSuccessHint: "YES! The stars have aligned! Saniya loves Nikhil forever! 🪐✨",
    yesSuccessTease: "I KNEW IT! Forever & Always in your orbit! 💖",
    letterStamp: "🪐 GALAXY OF NIKHIL & SANIYA",
    letterTitle: "To My Dearest Saniya ✨ (Meri Jaan)",
    letterBody: `
      <p><strong>Happy Birthday, meri jaan! 🎂❤️</strong></p>
      <p>Aaj ka din mere liye saal ka sabse khoobsurat aur muqaddas din hai, kyunki aaj ke din meri poori duniya is zameen par aayi thi. Tum meri zindagi ka wo chamakta sitara ho jisne meri har andheri raat ko noor se bhar diya.</p>
      <div class="letter-shayari">
        <em>"Tere chehre ki muskaan se roshan hai jahan mera,<br>
        Tere bina adhura hai har ek aashiyana mera.<br>
        Tu jo paas ho toh har manzil aasaan lagti hai,<br>
        Tujhse hi shuru aur tujhpe khatam hai fasaana mera."</em>
      </div>
      <p>Shukriya meri har baat ko bina bole samajhne ke liye, meri sabse badi taqat banne ke liye, aur mere har lamhe ko itna haseen banane ke liye. Dua hai ki tumhara ye naya solar return tumhari jholi mein dher saari khushiyan, bepanah sukoon aur kamyabi lekar aaye.</p>
      <p>Main hamesha, har janam aur har galaxy mein, sirf tumhara hi rahunga.</p>
      <p class="letter-signature">
        Forever & Always Yours,<br>
        <span class="signature-name">Nikhil ❤️</span>
      </p>
    `,
    footerNote: "Crafted with endless love & starlight for <strong>Saniya</strong> • Forever & Always, Nikhil ❤️"
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  initBackgroundVideo();
  initCosmicCanvas();
  initAmbientAudio();

  // Homepage-specific logic
  if (document.getElementById('version-toggle')) {
    await loadVaultState();
    initPasscodeModal();
    initVersionSwitcher();
    initInteractiveLoveGame();
    initPhotoUploader();
    initScrollReveal();
    updateGalleryLink();
  }
});

function initBackgroundVideo() {
  const bgVideo = document.getElementById('bg-stars-video');
  if (!bgVideo) return;
  bgVideo.muted = true;
  bgVideo.loop = true;
  const playPromise = bgVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const handleUserGesture = () => {
        bgVideo.play();
        window.removeEventListener('click', handleUserGesture);
        window.removeEventListener('touchstart', handleUserGesture);
        window.removeEventListener('scroll', handleUserGesture);
      };
      window.addEventListener('click', handleUserGesture);
      window.addEventListener('touchstart', handleUserGesture);
      window.addEventListener('scroll', handleUserGesture);
    });
  }
}

/* ==========================================================
   2. VAULT STATE & PASSCODE PERSISTENCE
   Shared with Gallery Vault across all devices & Netlify
   ========================================================== */
function loadVaultFromURL() {
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
    }
  } catch (e) {
    console.warn('URL vault parse error:', e);
  }
}

async function loadVaultState() {
  loadVaultFromURL();
  const savedPass = localStorage.getItem('saniya_vault_passcode');
  if (savedPass) vaultPasscode = savedPass;

  try {
    const resp = await fetch('vault_config.json', { cache: 'no-store' });
    if (resp.ok) {
      const data = await resp.json();
      if (data.passcode) {
        vaultPasscode = data.passcode;
        localStorage.setItem('saniya_vault_passcode', vaultPasscode);
      } else if (data.passcode === '') {
        // If server explicitly has empty passcode, reset local to trigger setup
        vaultPasscode = '';
        localStorage.removeItem('saniya_vault_passcode');
      }
    }
  } catch (e) {}
}

async function saveVaultPasscode(newPin) {
  vaultPasscode = newPin;
  localStorage.setItem('saniya_vault_passcode', newPin);

  // Sync to server endpoint for permanent storage in vault_config.json
  try {
    const currentHidden = JSON.parse(localStorage.getItem('saniya_hidden_ids') || '[]');
    await fetch('/api/vault-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: newPin, hidden_ids: currentHidden })
    });
  } catch (e) {
    console.warn('Backend vault sync failed:', e);
  }

  // Sync into URL hash for static hosting (Netlify)
  try {
    const currentHidden = JSON.parse(localStorage.getItem('saniya_hidden_ids') || '[]');
    const stateObj = { passcode: newPin, hidden_ids: currentHidden };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(stateObj))));
    window.history.replaceState(null, '', '#vault=' + b64);
  } catch (e) {}

  updateGalleryLink();
}

function updateGalleryLink() {
  const galleryBtns = document.querySelectorAll('.gallery-link-btn');
  const currentHidden = JSON.parse(localStorage.getItem('saniya_hidden_ids') || '[]');
  let hashStr = '';
  if (vaultPasscode) {
    try {
      const stateObj = { passcode: vaultPasscode, hidden_ids: currentHidden };
      hashStr = '#vault=' + btoa(unescape(encodeURIComponent(JSON.stringify(stateObj))));
    } catch(e) {}
  }
  galleryBtns.forEach(btn => {
    btn.href = 'gallery.html' + hashStr;
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-popup');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================
   3. 6-DIGIT PASSCODE MODAL (SETUP & UNLOCK)
   ========================================================== */
let passcodeModalMode = 'setup'; // 'setup' | 'verify'

function openPasscodeModal(mode) {
  passcodeModalMode = mode;
  const modal = document.getElementById('passcode-modal');
  const stamp = document.getElementById('passcode-stamp');
  const title = document.getElementById('passcode-modal-title');
  const desc = document.getElementById('passcode-modal-desc');
  const submitBtn = document.getElementById('submit-pin-btn');
  const errorMsg = document.getElementById('pin-error-msg');
  const pinInputs = document.querySelectorAll('.pin-digit');

  if (!modal) return;

  pinInputs.forEach(input => input.value = '');
  if (errorMsg) errorMsg.textContent = '';

  if (mode === 'setup') {
    if (stamp) stamp.textContent = '⚠️ DANGER MODE & VAULT SETUP';
    if (title) title.textContent = 'Setup 6-Digit PIN';
    if (desc) desc.textContent = 'Create your secret 6-digit passcode. This will protect Danger Mode and your private media vault forever across all devices.';
    if (submitBtn) submitBtn.textContent = '🔒 Save PIN & Unlock Danger Mode ⚠️';
  } else {
    if (stamp) stamp.textContent = '🔒 PROTECTED DANGER MODE';
    if (title) title.textContent = 'Enter 6-Digit PIN';
    if (desc) desc.textContent = 'This section is locked. Enter your 6-digit passcode to proceed.';
    if (submitBtn) submitBtn.textContent = '✨ Unlock Danger Mode ⚠️ ✨';
  }

  modal.classList.add('open');
  setTimeout(() => {
    const first = document.querySelector('.pin-digit[data-index="0"]');
    if (first) first.focus();
  }, 100);
}

function closePasscodeModal() {
  const modal = document.getElementById('passcode-modal');
  if (modal) modal.classList.remove('open');
}

function initPasscodeModal() {
  const modal = document.getElementById('passcode-modal');
  const closeBtn = document.getElementById('close-passcode-btn');
  const submitBtn = document.getElementById('submit-pin-btn');
  const pinInputs = document.querySelectorAll('.pin-digit');
  const pinInputsRow = document.getElementById('pin-inputs-row');
  const errorMsg = document.getElementById('pin-error-msg');

  if (closeBtn) closeBtn.addEventListener('click', closePasscodeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePasscodeModal();
    });
  }

  pinInputs.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val ? val[val.length - 1] : '';
      if (errorMsg) errorMsg.textContent = '';

      if (e.target.value && idx < pinInputs.length - 1) {
        pinInputs[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        pinInputs[idx - 1].focus();
      } else if (e.key === 'Enter') {
        handlePinSubmit();
      }
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
      const digits = pasteData.replace(/[^0-9]/g, '').slice(0, 6);
      digits.split('').forEach((d, i) => {
        if (pinInputs[i]) pinInputs[i].value = d;
      });
      if (digits.length === 6) {
        handlePinSubmit();
      } else if (digits.length > 0) {
        const nextIdx = Math.min(digits.length, pinInputs.length - 1);
        pinInputs[nextIdx].focus();
      }
    });
  });

  if (submitBtn) submitBtn.addEventListener('click', handlePinSubmit);

  async function handlePinSubmit() {
    let pin = '';
    pinInputs.forEach(inp => pin += inp.value);

    if (pin.length !== 6) {
      showPinError('Please enter all 6 digits.');
      return;
    }

    if (passcodeModalMode === 'setup') {
      await saveVaultPasscode(pin);
      isDangerUnlocked = true;
      closePasscodeModal();
      showToast('🔐 6-digit PIN created! Danger mode unlocked ⚠️');
      switchVersion('nikhil');
    } else {
      if (pin === vaultPasscode) {
        isDangerUnlocked = true;
        closePasscodeModal();
        showToast('✨ Passcode verified! Danger mode unlocked ⚠️');
        switchVersion('nikhil');
      } else {
        showPinError('Incorrect 6-digit passcode. Access denied 🚫');
      }
    }
  }

  function showPinError(msg) {
    if (errorMsg) errorMsg.textContent = msg;
    if (pinInputsRow) {
      pinInputsRow.classList.remove('shake');
      void pinInputsRow.offsetWidth;
      pinInputsRow.classList.add('shake');
    }
    pinInputs.forEach(inp => inp.value = '');
    const first = document.querySelector('.pin-digit[data-index="0"]');
    if (first) first.focus();
  }
}

/* ==========================================================
   4. VERSION SWITCHER & DANGER MODE LOCK LOGIC
   ========================================================== */
function initVersionSwitcher() {
  const btnNikhil = document.getElementById('btn-toggle-nikhil');
  const btnSneha = document.getElementById('btn-toggle-sneha');
  const heroQuickBtn = document.getElementById('hero-quick-toggle-btn');

  // Default to Sneha mode (👧) unless URL explicitly requested nikhil and already unlocked
  currentVersion = 'sneha';

  // Apply initial Sneha mode
  applyVersion(currentVersion, false);

  if (btnSneha) {
    btnSneha.addEventListener('click', () => {
      switchVersion('sneha');
    });
  }

  if (btnNikhil) {
    btnNikhil.addEventListener('click', () => {
      handleDangerModeRequest();
    });
  }

  if (heroQuickBtn) {
    heroQuickBtn.addEventListener('click', () => {
      if (currentVersion === 'sneha') {
        handleDangerModeRequest();
      } else {
        switchVersion('sneha');
      }
    });
  }
}

function handleDangerModeRequest() {
  if (isDangerUnlocked) {
    switchVersion('nikhil');
    return;
  }

  if (!vaultPasscode || vaultPasscode.length !== 6) {
    // First time entering Danger Mode: Ask to setup 6-digit passcode
    openPasscodeModal('setup');
  } else {
    // Passcode exists: Ask to enter 6-digit passcode
    openPasscodeModal('verify');
  }
}

function switchVersion(newVersion) {
  if (newVersion === currentVersion) return;
  currentVersion = newVersion;
  applyVersion(newVersion, true);
}

function applyVersion(version, animate = true) {
  const mainContent = document.getElementById('main-content');
  const data = VERSION_DATA[version];
  if (!data) return;

  const btnNikhil = document.getElementById('btn-toggle-nikhil');
  const btnSneha = document.getElementById('btn-toggle-sneha');
  if (btnNikhil && btnSneha) {
    if (version === 'nikhil') {
      btnNikhil.classList.add('active');
      btnNikhil.setAttribute('aria-selected', 'true');
      btnSneha.classList.remove('active');
      btnSneha.setAttribute('aria-selected', 'false');
    } else {
      btnSneha.classList.add('active');
      btnSneha.setAttribute('aria-selected', 'true');
      btnNikhil.classList.remove('active');
      btnNikhil.setAttribute('aria-selected', 'false');
    }
  }

  if (animate && mainContent) {
    mainContent.classList.add('version-transitioning');
    setTimeout(() => {
      renderDOMContent(data, version);
      mainContent.classList.remove('version-transitioning');
    }, 220);
  } else {
    renderDOMContent(data, version);
  }

  updateGalleryLink();
}

function renderDOMContent(data, version) {
  // Top nav badge text
  const badgeSenderText = document.getElementById('badge-sender-text');
  if (badgeSenderText) badgeSenderText.textContent = data.heroBadgeSender;

  // Hero section elements
  const heroSubBadge = document.getElementById('hero-sub-badge');
  if (heroSubBadge) heroSubBadge.textContent = data.heroSubBadge;

  const senderName = document.getElementById('sender-name');
  if (senderName) senderName.textContent = data.senderBadge;

  const heroQuickLabel = document.getElementById('hero-quick-toggle-label');
  if (heroQuickLabel) heroQuickLabel.textContent = data.switchPrompt;

  const heroToggleIcon = document.getElementById('hero-toggle-icon');
  if (heroToggleIcon) heroToggleIcon.textContent = data.switchIcon;

  const heroQuote = document.getElementById('hero-quote');
  if (heroQuote) heroQuote.innerHTML = data.heroQuote;

  // Section 1
  const sec1Title = document.getElementById('sec1-title');
  if (sec1Title) sec1Title.textContent = data.sec1Title;

  const sec1Text1 = document.getElementById('sec1-text1');
  if (sec1Text1) sec1Text1.textContent = data.sec1Text1;

  const sec1Text2 = document.getElementById('sec1-text2');
  if (sec1Text2) sec1Text2.innerHTML = data.sec1Highlight;

  const stat1Num = document.getElementById('stat-1-num');
  const stat1Label = document.getElementById('stat-1-label');
  if (stat1Num) stat1Num.textContent = data.stat1Num;
  if (stat1Label) stat1Label.textContent = data.stat1Label;

  const stat2Num = document.getElementById('stat-2-num');
  const stat2Label = document.getElementById('stat-2-label');
  if (stat2Num) stat2Num.textContent = data.stat2Num;
  if (stat2Label) stat2Label.textContent = data.stat2Label;

  const stat3Num = document.getElementById('stat-3-num');
  const stat3Label = document.getElementById('stat-3-label');
  if (stat3Num) stat3Num.textContent = data.stat3Num;
  if (stat3Label) stat3Label.textContent = data.stat3Label;

  // Parallax Photo 1
  const photo1Tag = document.getElementById('photo-1-tag');
  const photo1Caption = document.getElementById('photo-1-caption');
  if (photo1Tag) photo1Tag.textContent = data.photo1Tag;
  if (photo1Caption) photo1Caption.textContent = data.photo1Caption;

  // Section 2
  const sec2Title = document.getElementById('sec2-title');
  const sec2Text1 = document.getElementById('sec2-text1');
  const sec2Quote = document.getElementById('sec2-quote');
  if (sec2Title) sec2Title.textContent = data.sec2Title;
  if (sec2Text1) sec2Text1.textContent = data.sec2Text1;
  if (sec2Quote) sec2Quote.innerHTML = data.sec2Quote;

  // Section 4: Timeline
  const sec4Title = document.getElementById('sec4-title');
  const sec4Subtitle = document.getElementById('sec4-subtitle');
  const timelineList = document.getElementById('timeline-list');
  if (sec4Title) sec4Title.textContent = data.sec4Title;
  if (sec4Subtitle) sec4Subtitle.textContent = data.sec4Subtitle;
  if (timelineList && data.timeline) {
    timelineList.innerHTML = data.timeline.map(t => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-phase">${t.phase}</span>
          <h3>${t.title}</h3>
          <p>${t.text}</p>
        </div>
      </div>
    `).join('');
  }

  // Section: Quiz
  const quizHeading = document.getElementById('quiz-heading');
  const quizQuestion = document.getElementById('quiz-question');
  const gameStatusHint = document.getElementById('game-status-hint');
  const yesBtnText = document.getElementById('yes-btn-text');
  const noBtnText = document.getElementById('no-btn-text');
  if (quizHeading) quizHeading.textContent = data.quizTitle;
  if (quizQuestion) quizQuestion.textContent = data.quizQuestion;
  if (gameStatusHint) gameStatusHint.textContent = data.quizHint;
  if (yesBtnText) yesBtnText.textContent = data.yesBtnText;
  if (noBtnText) noBtnText.textContent = data.noBtnText;

  // Reset interactive button positions
  const noBtn = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  const buttonsContainer = document.getElementById('buttons-container');
  const teaseBubble = document.getElementById('tease-bubble');
  if (noBtn) {
    if (buttonsContainer && noBtn.parentElement !== buttonsContainer) {
      buttonsContainer.appendChild(noBtn);
    }
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.margin = '';
    noBtn.style.transform = '';
  }
  if (yesBtn) {
    yesBtn.style.transform = '';
  }
  if (teaseBubble) {
    teaseBubble.classList.remove('active');
  }

  // Footer Note
  const footerNote = document.getElementById('footer-note');
  if (footerNote) footerNote.innerHTML = data.footerNote;

  // Modal Content
  const letterStampText = document.getElementById('letter-stamp-text');
  const letterTitle = document.getElementById('letter-title');
  const letterBody = document.getElementById('letter-body');
  if (letterStampText) letterStampText.textContent = data.letterStamp;
  if (letterTitle) letterTitle.textContent = data.letterTitle;
  if (letterBody) letterBody.innerHTML = data.letterBody;
}

/* ==========================================================
   5. PLAYFUL INTERACTIVE QUESTION GAME
   ========================================================== */
function initInteractiveLoveGame() {
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const playground = document.getElementById('playground');
  const teaseBubble = document.getElementById('tease-bubble');
  const statusHint = document.getElementById('game-status-hint');
  const letterModal = document.getElementById('letter-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const replayBtn = document.getElementById('replay-supernova-btn');

  if (!yesBtn || !noBtn || !playground) return;

  let yesHoverCount = 0;
  const maxYesDodges = 2;

  function showTease(msg) {
    if (!teaseBubble) return;
    teaseBubble.textContent = msg;
    teaseBubble.classList.add('active');
    setTimeout(() => {
      teaseBubble.classList.remove('active');
    }, 2400);
  }

  let lastNoX = null;
  let lastNoY = null;

  function dodgeButton(btn) {
    // If button is still inside flex row, promote it to direct child of playground
    // so absolute coordinates strictly match playground bounding box without offset distortion
    if (btn.parentElement !== playground) {
      playground.appendChild(btn);
    }

    const pRect = playground.getBoundingClientRect();
    const yRect = yesBtn.getBoundingClientRect();

    // YES button bounds relative to playground container
    const yesRel = {
      left: yRect.left - pRect.left,
      top: yRect.top - pRect.top,
      right: yRect.right - pRect.left,
      bottom: yRect.bottom - pRect.top,
      width: yRect.width,
      height: yRect.height
    };

    const btnW = btn.offsetWidth || 85;
    const btnH = btn.offsetHeight || 36;

    // Safety padding from playground boundary (prevent edge cutting on phone screen)
    const pad = 16;
    const minX = pad;
    const maxX = Math.max(pad, Math.floor(pRect.width - btnW - pad));
    const minY = pad;
    const maxY = Math.max(pad, Math.floor(pRect.height - btnH - pad));

    // STRICT FORBIDDEN ZONE AROUND YES BUTTON:
    // With 26px guaranteed clearance, NO BUTTON CAN NEVER TOUCH OR OVERLAY YES BUTTON!
    const clearance = 26;
    const forbidden = {
      left: yesRel.left - btnW - clearance,
      right: yesRel.right + clearance,
      top: yesRel.top - btnH - clearance,
      bottom: yesRel.bottom + clearance
    };

    function isSafe(x, y) {
      if (x < minX || x > maxX || y < minY || y > maxY) return false;
      const overlaps = (
        x < forbidden.right &&
        x + btnW > forbidden.left &&
        y < forbidden.bottom &&
        y + btnH > forbidden.top
      );
      return !overlaps;
    }

    let bestX = null;
    let bestY = null;

    // Try up to 80 random safe positions
    for (let attempt = 0; attempt < 80; attempt++) {
      const candX = Math.round(minX + Math.random() * (maxX - minX));
      const candY = Math.round(minY + Math.random() * (maxY - minY));

      if (isSafe(candX, candY)) {
        if (lastNoX !== null && lastNoY !== null) {
          const dist = Math.hypot(candX - lastNoX, candY - lastNoY);
          if (dist < 45) continue; // Ensure it hops noticeably
        }
        bestX = candX;
        bestY = candY;
        break;
      }
    }

    // Deterministic fallback zones (top, bottom, and quadrant corners)
    if (bestX === null || bestY === null) {
      const candidates = [
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: minX, y: maxY },
        { x: maxX, y: maxY },
        { x: Math.round((minX + maxX) / 2), y: minY },
        { x: Math.round((minX + maxX) / 2), y: maxY },
        { x: minX, y: Math.round((minY + maxY) / 2) },
        { x: maxX, y: Math.round((minY + maxY) / 2) }
      ];

      const safePool = candidates.filter(c => isSafe(c.x, c.y));
      const pool = safePool.length > 0 ? safePool : candidates;

      pool.sort((a, b) => {
        const distA = lastNoX !== null ? Math.hypot(a.x - lastNoX, a.y - lastNoY) : 0;
        const distB = lastNoX !== null ? Math.hypot(b.x - lastNoX, b.y - lastNoY) : 0;
        return distB - distA;
      });

      bestX = pool[0].x;
      bestY = pool[0].y;
    }

    lastNoX = bestX;
    lastNoY = bestY;

    // Apply clamped coordinates without edge cutting or collision
    btn.style.position = 'absolute';
    btn.style.margin = '0';
    btn.style.left = `${bestX}px`;
    btn.style.top = `${bestY}px`;
    btn.style.transform = `rotate(${(Math.random() - 0.5) * 6}deg)`;
    btn.style.zIndex = '30';
    btn.style.display = 'inline-flex';
    btn.style.opacity = '1';
    btn.style.visibility = 'visible';
  }

  let isDodging = false;
  function handleNoDodge(e) {
    if (e) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
    if (isDodging) return;
    isDodging = true;
    setTimeout(() => { isDodging = false; }, 90);

    dodgeButton(noBtn);
    const activeData = VERSION_DATA[currentVersion] || VERSION_DATA.sneha;
    const teases = activeData.noTeases;
    const randomTease = teases[Math.floor(Math.random() * teases.length)];
    showTease(randomTease);
    if (statusHint) {
      statusHint.textContent = currentVersion === 'nikhil' 
        ? "Nope! 'NO' button refused to cooperate with physics! 😜"
        : "Haha nope! Sneha's friendship button is untouchable! 😜";
    }
  }

  // Hover triggers for Desktop
  noBtn.addEventListener('mouseenter', handleNoDodge);
  noBtn.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') handleNoDodge(e);
  });

  // Mobile & Android Touch triggers: Immediate relocation on tap
  noBtn.addEventListener('touchstart', handleNoDodge, { passive: false });
  noBtn.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') handleNoDodge(e);
  }, { passive: false });
  noBtn.addEventListener('click', handleNoDodge);

  function handleYesHoverOrTouch() {
    const activeData = VERSION_DATA[currentVersion] || VERSION_DATA.sneha;
    if (yesHoverCount < maxYesDodges) {
      yesHoverCount++;
      const offsets = [
        { x: 35, y: -18 },
        { x: -35, y: 15 }
      ];
      const offset = offsets[yesHoverCount % offsets.length];
      yesBtn.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(1.05)`;
      
      const tease = yesHoverCount === 1 
        ? (currentVersion === 'nikhil' ? "Wait, are you 1000% sure?! 💫" : "Bestie verification check! 🌸") 
        : (currentVersion === 'nikhil' ? "Gotta catch me first! 🏃‍♂️💨" : "Almost caught me! 🏃‍♀️💨");
      showTease(tease);

      setTimeout(() => {
        if (yesHoverCount >= maxYesDodges) {
          yesBtn.style.transform = 'translate(0px, 0px) scale(1.12)';
          if (statusHint) statusHint.textContent = activeData.yesCaughtHint;
          showTease("Okay okay, click me! 🥰");
        }
      }, 500);
    }
  }

  yesBtn.addEventListener('mouseenter', handleYesHoverOrTouch);

  yesBtn.addEventListener('click', () => {
    const activeData = VERSION_DATA[currentVersion] || VERSION_DATA.sneha;

    // Unmute & play song on YES button click
    if (typeof window.unmuteAndPlayBgMusic === 'function') {
      window.unmuteAndPlayBgMusic();
    } else {
      const bgAudio = document.getElementById('bg-audio');
      if (bgAudio) {
        bgAudio.muted = false;
        bgAudio.play().catch(() => {});
      }
    }

    try {
      triggerCosmicSupernova();
    } catch (e) {
      console.warn('Supernova trigger notice:', e);
    }

    if (statusHint) statusHint.textContent = activeData.yesSuccessHint;
    showTease(activeData.yesSuccessTease);
    
    // Reliably open the letter modal after fireworks launch
    setTimeout(() => {
      openLetterModal();
    }, 1200);
  });

  function openLetterModal() {
    const overlay = document.getElementById('supernova-overlay');
    if (overlay) overlay.classList.remove('active');
    if (letterModal) {
      letterModal.classList.add('open');
      letterModal.style.display = 'flex';
    }
  }

  function closeLetterModal() {
    if (letterModal) {
      letterModal.classList.remove('open');
      letterModal.style.display = '';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeLetterModal);
  }

  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) closeLetterModal();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      closeLetterModal();
      triggerCosmicSupernova();
      setTimeout(openLetterModal, 1800);
    });
  }
}

/* ==========================================================
   6. SUPERNOVA FIREWORKS & EXPLOSION ENGINE
   ========================================================== */
function triggerCosmicSupernova() {
  const overlay = document.getElementById('supernova-overlay');
  const flash = document.getElementById('supernova-flash');
  const canvas = document.getElementById('fireworks-canvas');
  if (!overlay || !canvas || !flash) return;

  overlay.classList.add('active');

  flash.classList.remove('flash-now');
  void flash.offsetWidth;
  flash.classList.add('flash-now');

  playSupernovaSound();

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const emojis = ['💖', '✨', '🪐', '🎂', '⭐', '💫', '💜', '🌸'];

  class CosmicParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 16 + 4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.15;
      this.friction = 0.96;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.008;
      this.isEmoji = Math.random() < 0.35;
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      this.size = Math.random() * 18 + 14;
      this.color = ['#ffffff', '#ffd166', '#c77dff', '#ff70a6', '#e0aaff'][Math.floor(Math.random() * 5)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      if (this.isEmoji) {
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const origins = [
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    { x: window.innerWidth * 0.3, y: window.innerHeight * 0.4 },
    { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 }
  ];

  origins.forEach((orig, idx) => {
    setTimeout(() => {
      for (let i = 0; i < 65; i++) {
        particles.push(new CosmicParticle(orig.x, orig.y));
      }
    }, idx * 180);
  });

  let animFrameId = null;
  function renderFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
    }

    if (particles.length > 0) {
      animFrameId = requestAnimationFrame(renderFireworks);
    } else {
      cancelAnimationFrame(animFrameId);
      overlay.classList.remove('active');
    }
  }
  renderFireworks();
}

/* ==========================================================
   7. PHOTO UPLOADER
   ========================================================== */
function initPhotoUploader() {
  const uploaders = document.querySelectorAll('.photo-uploader');
  
  const savedPhoto1 = localStorage.getItem('saniya_photo_1');
  const savedPhoto2 = localStorage.getItem('saniya_photo_2');
  if (savedPhoto1) {
    const slot1 = document.getElementById('photo-slot-1');
    if (slot1) slot1.src = savedPhoto1;
  }
  if (savedPhoto2) {
    const slot2 = document.getElementById('photo-slot-2');
    if (slot2) slot2.src = savedPhoto2;
  }

  uploaders.forEach((input) => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const targetId = input.getAttribute('data-target');
      const targetImg = document.getElementById(targetId);

      if (file && targetImg) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          targetImg.src = dataUrl;
          if (targetId === 'photo-slot-1') {
            localStorage.setItem('saniya_photo_1', dataUrl);
          } else if (targetId === 'photo-slot-2') {
            localStorage.setItem('saniya_photo_2', dataUrl);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  });
}

/* ==========================================================
   8. SCROLL REVEAL
   ========================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================
   9. COSMIC CANVAS ENGINE
   ========================================================== */
function initCosmicCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  });

  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  const stars = [];
  const starCount = Math.min(Math.floor((width * height) / 3800), 280);

  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() < 0.15 ? Math.random() * 2.8 + 1.6 : Math.random() * 1.5 + 0.4;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.twinkleSpeed = Math.random() * 0.03 + 0.008;
      this.twinkleAngle = Math.random() * Math.PI * 2;
      this.hasSpike = this.size > 2.2;
      const colors = ['#ffffff', '#e0aaff', '#c77dff', '#fde047', '#93c5fd'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.depth = Math.random() * 0.6 + 0.4;
    }

    update() {
      this.twinkleAngle += this.twinkleSpeed;
      this.currentAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.twinkleAngle));
      this.y -= 0.15 * this.depth;
      if (this.y < 0) this.y = height;
    }

    draw() {
      const offsetX = (mouse.x - width / 2) * 0.015 * this.depth;
      const offsetY = (mouse.y - height / 2) * 0.015 * this.depth;
      const px = this.x + offsetX;
      const py = this.y + offsetY;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.currentAlpha));

      ctx.beginPath();
      ctx.arc(px, py, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size * 5;
      ctx.shadowColor = this.color;
      ctx.fill();

      if (this.hasSpike && this.currentAlpha > 0.45) {
        const spikeLength = this.size * 5.5;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.8;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fff';

        ctx.beginPath();
        ctx.moveTo(px - spikeLength, py);
        ctx.lineTo(px + spikeLength, py);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(px, py - spikeLength);
        ctx.lineTo(px, py + spikeLength);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  function createStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }
  createStars();

  const meteors = [];
  class Meteor {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width * 1.2;
      this.y = Math.random() * (height * 0.4);
      this.length = Math.random() * 120 + 80;
      this.speed = Math.random() * 8 + 6;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      this.thickness = Math.random() * 2 + 1;
      this.life = 1;
      this.decay = Math.random() * 0.018 + 0.012;
      this.active = false;
    }

    launch() {
      this.reset();
      this.active = true;
    }

    update() {
      if (!this.active) return;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.life -= this.decay;
      if (this.life <= 0 || this.x > width + 200 || this.y > height + 200) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.globalAlpha = this.life;
      
      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, 'rgba(199, 125, 255, 0)');
      grad.addColorStop(0.6, 'rgba(224, 170, 255, 0.5)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 1)');

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.thickness;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ffffff';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.thickness * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fff';
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < 4; i++) {
    meteors.push(new Meteor());
  }

  function scheduleMeteors() {
    const inactive = meteors.find(m => !m.active);
    if (inactive) inactive.launch();
    const nextInterval = Math.random() * 4000 + 2500;
    setTimeout(scheduleMeteors, nextInterval);
  }
  setTimeout(scheduleMeteors, 1500);

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    for (let i = 0; i < meteors.length; i++) {
      if (meteors[i].active) {
        meteors[i].update();
        meteors[i].draw();
      }
    }

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
}

/* ==========================================================
   10. BACKGROUND AUDIO ENGINE (SENORITA ON LOOP - MUTE/UNMUTE ONLY)
   ========================================================== */
let audioCtx = null;

function initAmbientAudio() {
  const bgAudio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  if (!bgAudio || !toggleBtn) return;

  bgAudio.loop = true;
  bgAudio.volume = 0.75;

  function updateAudioUI(isPlaying) {
    if (isPlaying) {
      document.body.classList.add('audio-playing');
      if (audioIcon) audioIcon.textContent = '🔊';
      toggleBtn.setAttribute('title', 'Mute background music');
      toggleBtn.setAttribute('aria-label', 'Mute background music');
    } else {
      document.body.classList.remove('audio-playing');
      if (audioIcon) audioIcon.textContent = '🔇';
      toggleBtn.setAttribute('title', 'Unmute background music');
      toggleBtn.setAttribute('aria-label', 'Unmute background music');
    }
  }

  // Global methods for unmuting / muting
  window.unmuteAndPlayBgMusic = function() {
    bgAudio.muted = false;
    bgAudio.play().then(() => {
      localStorage.setItem('saniya_music_muted', 'false');
      updateAudioUI(true);
    }).catch(err => {
      console.warn('Playback notice:', err);
    });
  };

  window.muteBgMusic = function() {
    bgAudio.muted = true;
    bgAudio.pause();
    localStorage.setItem('saniya_music_muted', 'true');
    updateAudioUI(false);
  };

  const isMutedPref = localStorage.getItem('saniya_music_muted') === 'true';

  // Attempt auto-play if user has not explicitly muted
  if (!isMutedPref) {
    bgAudio.muted = false;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateAudioUI(true);
      }).catch(() => {
        // Autoplay blocked by browser policy: play on first user interaction anywhere
        updateAudioUI(false);
        const startOnFirstGesture = () => {
          if (localStorage.getItem('saniya_music_muted') !== 'true') {
            window.unmuteAndPlayBgMusic();
          }
          window.removeEventListener('click', startOnFirstGesture);
          window.removeEventListener('touchstart', startOnFirstGesture);
          window.removeEventListener('scroll', startOnFirstGesture);
        };
        window.addEventListener('click', startOnFirstGesture, { once: true });
        window.addEventListener('touchstart', startOnFirstGesture, { once: true });
        window.addEventListener('scroll', startOnFirstGesture, { once: true });
      });
    }
  } else {
    bgAudio.muted = true;
    updateAudioUI(false);
  }

  // Pure Mute / Unmute Button Toggle (Only the sound symbol)
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgAudio.paused || bgAudio.muted) {
      window.unmuteAndPlayBgMusic();
    } else {
      window.muteBgMusic();
    }
  });
}

function playSupernovaSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          if (!audioCtx || audioCtx.state !== 'running') return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          const now = audioCtx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 2.6);
        } catch (e) {}
      }, idx * 120);
    });
  } catch (err) {
    console.warn('Supernova audio notice:', err);
  }
}
