/* ===== Mobile hamburger menu (hidden on desktop by CSS) ===== */
document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      var expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
    });

    // Optional: close menu when a link is clicked (mobile)
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== Footer year ===== */
  var yearSpan = document.getElementById('yearNow');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ===== Contact form: validation + localStorage ===== */
  var form = document.getElementById('contactForm');
  var msgBox = document.getElementById('contactMsg');

  // Simple email test: beginner-friendly pattern
  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function showMsg(text, ok) {
    msgBox.textContent = text;
    msgBox.style.color = ok ? '#1aa037' : '#c0392b';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (document.getElementById('name').value || '').trim();
      var email = (document.getElementById('email').value || '').trim();
      var message = (document.getElementById('message').value || '').trim();

      if (!name || !email || !message) {
        showMsg('Please fill out all fields.', false);
        return;
      }
      if (!validEmail(email)) {
        showMsg('Please enter a valid email address.', false);
        return;
      }
      if (message.length < 5) {
        showMsg('Message is too short.', false);
        return;
      }

      // Save to localStorage
      var KEY = 'contactMessages';
      var list = [];
      try {
        list = JSON.parse(localStorage.getItem(KEY) || '[]');
      } catch (err) {
        list = [];
      }
      list.push({ name: name, email: email, message: message, at: new Date().toISOString() });
      localStorage.setItem(KEY, JSON.stringify(list));

      // Confirm + reset
      showMsg('Thanks! Your message has been sent.', true);
      form.reset();
    });
  }

  /* ===== FAQ accordion ===== */
  var qs = document.querySelectorAll('.faq-q');
  qs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      var answer = btn.nextElementSibling;
      if (answer) {
        if (answer.hasAttribute('hidden')) answer.removeAttribute('hidden');
        else answer.setAttribute('hidden', '');
      }
    });
  });
});
