const cards = document.querySelectorAll(
  ".info-card, .about-text, .skills-card, .reflection-box, .case-card, .comparison-panel, .insight-strip div, .artifact-two-hero"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(25px)";
  card.style.transition = "all 0.7s ease";
  observer.observe(card);
});

const style = document.createElement("style");
style.innerHTML = `
  .show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
