const layers = document.querySelectorAll("[data-speed]");
const reveals = document.querySelectorAll(".reveal");
const cards = document.getElementById("cards");
const destino = document.getElementById("destino");

let ticking = false;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      layers.forEach(layer => {
        const speed = Number(layer.dataset.speed);
        layer.style.transform = `translateY(${scrollY * speed}px)`;
      });

      ticking = false;
    });

    ticking = true;
  }
});

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.25
});

reveals.forEach(item => cardObserver.observe(item));

if (cards && destino) {
  const destinoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.classList.add("line-on");
        destino.classList.add("constellation-on");

        destinoObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.35
  });

  destinoObserver.observe(destino);
}