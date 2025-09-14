/* Smooth scroll for in-page links */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* Scroll reveal */
const reveal = new IntersectionObserver((entries)=>{
  for (const el of entries){
    if (el.isIntersecting) el.target.classList.add("appear");
  }
}, { threshold: 0.15 });

document.querySelectorAll(".fade-up").forEach(el=> reveal.observe(el));

/* Parallax on hero image */
const heroImg = document.querySelector(".hero-media img.parallax");
let lastY = 0;
window.addEventListener("scroll", ()=>{
  const y = window.scrollY;
  const delta = (y - lastY);
  lastY = y;
  const translate = Math.max(-40, Math.min(40, y * 0.08));
  if (heroImg) heroImg.style.transform = `translateY(${translate}px)`;
}, { passive: true });

/* Magnetic buttons */
const magnets = document.querySelectorAll(".magnet");
const strengthFrom = (el)=> parseFloat(el.dataset.strength || "16");
magnets.forEach(el=>{
  let r = el.getBoundingClientRect();
  const updateRect = ()=> r = el.getBoundingClientRect();
  window.addEventListener("resize", updateRect);

  el.addEventListener("mousemove", (e)=>{
    const s = strengthFrom(el);
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    el.style.transform = `translate(${x/s}px, ${y/s}px)`;
  });
  el.addEventListener("mouseleave", ()=>{
    el.style.transform = "translate(0,0)";
  });
});

/* Back to top in footer */
document.querySelector(".foot .link-arrow")?.addEventListener("click", (e)=>{
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
