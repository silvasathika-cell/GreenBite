// ===== Mobile hamburger toggle (only runs if IDs exist) =====
document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      var expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
    });

    // Close the menu when a link is tapped
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// ===== Calorie Calculator (BMR + TDEE + Macros) =====
document.addEventListener('DOMContentLoaded', function () {
  var form     = document.getElementById('calcForm');
  var bmrOut   = document.getElementById('bmrOut');
  var tdeeOut  = document.getElementById('tdeeOut');
  var resultBox= document.getElementById('result');

  var carbOut  = document.getElementById('carbOut');
  var protOut  = document.getElementById('protOut');
  var fatOut   = document.getElementById('fatOut');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var age      = parseFloat(document.getElementById('age').value);
    var height   = parseFloat(document.getElementById('height').value); // cm
    var weight   = parseFloat(document.getElementById('weight').value); // kg
    var activity = parseFloat(document.getElementById('activity').value);
    var genderEl = document.querySelector('input[name="gender"]:checked');

    if (!age || !height || !weight || !activity || !genderEl) {
      alert('Please fill all fields.');
      return;
    }

    // Mifflin–St Jeor
    var bmr;
    if (genderEl.value === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    var tdee = bmr * activity;

    // Macros from TDEE (50% / 20% / 30%)
    // 1g carb = 4 kcal, 1g protein = 4 kcal, 1g fat = 9 kcal
    var carbsG = (tdee * 0.50) / 4;
    var protG  = (tdee * 0.20) / 4;
    var fatG   = (tdee * 0.30) / 9;

    // Show results
    bmrOut.textContent  = Math.round(bmr)  + ' kcal/day';
    tdeeOut.textContent = Math.round(tdee) + ' kcal/day';

    carbOut.textContent = Math.round(carbsG) + ' g';
    protOut.textContent = Math.round(protG)  + ' g';
    fatOut.textContent  = Math.round(fatG)   + ' g';

    resultBox.hidden = false;
  });

  // Clear results on reset
  var clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', function () {
    resultBox.hidden = true;
  });

  // Footer year
  var yearNow = document.getElementById('yearNow');
  if (yearNow) yearNow.textContent = new Date().getFullYear();
});
