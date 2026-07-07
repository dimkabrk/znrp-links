// --- мерцающие окна на силуэте города ---
(function generateWindows(){
  const group = document.querySelector(".windows");
  if(!group) return;

  const buildings = [
    ...document.querySelectorAll(".buildings-front rect"),
  ];

  const frag = document.createDocumentFragment();

  buildings.forEach((b) => {
    const x = parseFloat(b.getAttribute("x"));
    const y = parseFloat(b.getAttribute("y"));
    const w = parseFloat(b.getAttribute("width"));
    const h = parseFloat(b.getAttribute("height"));

    const cols = Math.max(2, Math.floor(w / 16));
    const rows = Math.max(2, Math.floor(h / 18));
    const padX = (w - (cols - 1) * 16) / 2;
    const padY = 14;

    for(let r = 0; r < rows; r++){
      for(let c = 0; c < cols; c++){
        if(Math.random() > 0.62) continue; // не все окна светятся
        const wx = x + padX + c * 16;
        const wy = y + padY + r * 18;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", wx.toFixed(1));
        rect.setAttribute("y", wy.toFixed(1));
        rect.setAttribute("width", 5);
        rect.setAttribute("height", 7);
        rect.setAttribute("rx", 1);
        rect.setAttribute("fill", Math.random() > 0.5 ? "#ffb84d" : "#a78bfa");
        rect.style.opacity = "0";
        rect.style.animation = `window-flicker ${(4 + Math.random() * 5).toFixed(1)}s ease-in-out ${(Math.random() * 4).toFixed(1)}s infinite`;
        frag.appendChild(rect);
      }
    }
  });

  group.appendChild(frag);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes window-flicker{
      0%, 100% { opacity: 0.15; }
      45% { opacity: 0.85; }
      55% { opacity: 0.85; }
    }
  `;
  document.head.appendChild(style);
})();

// --- появление блоков при скролле ---
(function scrollReveal(){
  const items = document.querySelectorAll(".reveal-on-scroll");
  if(!items.length) return;

  if(!("IntersectionObserver" in window)){
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if(entry.isIntersecting){
          setTimeout(() => entry.target.classList.add("is-visible"), i * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
})();
