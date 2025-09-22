document.addEventListener('DOMContentLoaded', function () {
  /* ===== NAVBAR TOGGLE (mobile only) ===== */
  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      var expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }

  /* ===== GUIDED BREATHING ===== */
  var breathCircle = document.getElementById('breathCircle');
  var breathPhase = document.getElementById('breathPhase');
  var btnStart = document.getElementById('breathStart');
  var btnStop = document.getElementById('breathStop');

  var breathingOn = false;
  var breathTimer;

  function breathingLoop() {
    if (!breathingOn) return;
    breathPhase.textContent = 'Inhale…';
    breathCircle.style.transform = 'scale(1.2)';
    breathTimer = setTimeout(function () {
      if (!breathingOn) return;
      breathPhase.textContent = 'Hold…';
      breathTimer = setTimeout(function () {
        if (!breathingOn) return;
        breathPhase.textContent = 'Exhale…';
        breathCircle.style.transform = 'scale(1.0)';
        breathTimer = setTimeout(breathingLoop, 4000);
      }, 4000);
    }, 4000);
  }

  btnStart.addEventListener('click', function () {
    if (breathingOn) return;
    breathingOn = true;
    breathingLoop();
  });

  btnStop.addEventListener('click', function () {
    breathingOn = false;
    clearTimeout(breathTimer);
    breathPhase.textContent = 'Ready?';
    breathCircle.style.transform = 'scale(1)';
  });

  /* ===== TIMER ===== */
  var minsInput = document.getElementById('mins');
  var secsInput = document.getElementById('secs');
  var timerDisplay = document.getElementById('timerDisplay');
  var btnTimerStart = document.getElementById('timerStart');
  var btnTimerPause = document.getElementById('timerPause');
  var btnTimerReset = document.getElementById('timerReset');
  var sessionCountEl = document.getElementById('sessionCount');
  var btnClear = document.getElementById('clearCount');

  var tick = null;
  var remaining = 0;

  function two(n) { return String(n).padStart(2, '0'); }
  function format(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return two(m) + ':' + two(s);
  }
  function setFromInputs() {
    var m = parseInt(minsInput.value || '0', 10);
    var s = parseInt(secsInput.value || '0', 10);
    remaining = m * 60 + s;
    timerDisplay.textContent = format(remaining);
  }

  // Initialize
  setFromInputs();
  minsInput.addEventListener('input', setFromInputs);
  secsInput.addEventListener('input', setFromInputs);

  // localStorage session count
  function loadCount() {
    var c = parseInt(localStorage.getItem('mind_sessions') || '0', 10);
    sessionCountEl.textContent = c;
  }
  function addSession() {
    var c = parseInt(localStorage.getItem('mind_sessions') || '0', 10) + 1;
    localStorage.setItem('mind_sessions', String(c));
    sessionCountEl.textContent = c;
  }
  loadCount();

  btnTimerStart.addEventListener('click', function () {
    if (tick) return;
    if (remaining <= 0) setFromInputs();
    btnTimerPause.disabled = false;
    tick = setInterval(function () {
      remaining--;
      timerDisplay.textContent = format(remaining);
      if (remaining <= 0) {
        clearInterval(tick);
        tick = null;
        btnTimerPause.disabled = true;
        addSession();
      }
    }, 1000);
  });

  btnTimerPause.addEventListener('click', function () {
    clearInterval(tick);
    tick = null;
    btnTimerPause.disabled = true;
  });

  btnTimerReset.addEventListener('click', function () {
    clearInterval(tick);
    tick = null;
    btnTimerPause.disabled = true;
    setFromInputs();
  });

  btnClear.addEventListener('click', function () {
    localStorage.removeItem('mind_sessions');
    loadCount();
  });
});
