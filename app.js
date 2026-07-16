// app.js

document.addEventListener("DOMContentLoaded", () => {
  // Buttons
  const registerBtn = document.querySelector('a[href="register.html"]');
  const verifyBtn = document.querySelector('a[href="verify.html"]');

  // Feature cards
  const cards = document.querySelectorAll(".feature");

  // Hero
  const hero = document.querySelector(".hero");

  // ==========================
  // Smooth Button Animation
  // ==========================

  [registerBtn, verifyBtn].forEach((btn) => {
    if (!btn) return;

    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  // ==========================
  // Fade-in Feature Cards
  // ==========================

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  cards.forEach((card) => {
    card.classList.add("hidden-card");

    observer.observe(card);
  });

  // ==========================
  // Hero Background Animation
  // ==========================

  let angle = 135;

  setInterval(() => {
    angle++;

    hero.style.background = `linear-gradient(${angle}deg,#1565c0,#42a5f5)`;
  }, 120);

  // ==========================
  // Footer Year
  // ==========================

  const footer = document.querySelector("footer p");

  if (footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} Registration Verification System`;
  }
});
