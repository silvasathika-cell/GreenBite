// ===================== HAMBURGER MENU =====================
document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.getElementById("menuBtn");
  var mainNav = document.getElementById("mainNav");

  if (menuBtn && mainNav) {
    // Toggle menu open/close
    menuBtn.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked
    mainNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ===================== AUTO-ROTATING QUOTES =====================
  var quotes = [
    "Healthy habits build a healthy life.",
    "Small changes make big differences.",
    "Eat better, feel better.",
    "Wellness is a journey, not a race."
  ];

  var quoteBox = document.getElementById("quoteBox");
  var quoteIndex = 0;

  if (quoteBox) {
    function showQuote() {
      quoteBox.textContent = quotes[quoteIndex];
      quoteIndex = (quoteIndex + 1) % quotes.length; // cycle back
    }

    // First quote immediately
    showQuote();

    // Change every 3 seconds
    setInterval(showQuote, 3000);
  }

  // ===================== NEWSLETTER WITH LOCALSTORAGE =====================
  var form = document.getElementById("newsletterForm");
  var emailInput = document.getElementById("newsletterEmail");
  var msg = document.getElementById("newsletterMsg");

  if (form && emailInput && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var email = emailInput.value.trim();

      if (email) {
        // Save to localStorage
        localStorage.setItem("newsletterEmail", email);

        msg.textContent = "✅ Thank you for subscribing!";
        msg.style.color = "lightgreen";
        emailInput.value = "";
      } else {
        msg.textContent = "❌ Please enter a valid email.";
        msg.style.color = "red";
      }
    });

    // Show saved email if already subscribed
    var savedEmail = localStorage.getItem("newsletterEmail");
    if (savedEmail) {
      msg.textContent = "📧 Already subscribed: " + savedEmail;
      msg.style.color = "lightgreen";
    }
  }
});
