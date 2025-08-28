// Init WOW.js animations
new WOW().init();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.style.display === "flex";
    links.style.display = open ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.gap = "0.5rem";
    links.style.background = "rgba(0,0,0,0.35)";
    links.style.position = "absolute";
    links.style.right = "1rem";
    links.style.top = "64px";
    links.style.padding = "0.6rem";
    links.style.borderRadius = "12px";
    links.style.border = "1px solid rgba(255,255,255,0.12)";
    links.style.backdropFilter = "blur(8px)";
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
      if (window.innerWidth < 700 && links && links.style.display === "flex") {
        links.style.display = "none";
      }
    }
  });
});

// Contact form demo handler
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }
  alert("Thanks, " + name + "! Your message has been captured locally (demo).");
  e.target.reset();
  return false;
}

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
