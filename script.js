
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.style.display === "flex";
    links.style.display = open ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.gap = "0.5rem";
    links.style.background = "rgba(250,249,246,0.97)";
    links.style.position = "absolute";
    links.style.right = "1rem";
    links.style.top = "64px";
    links.style.padding = "0.6rem";
    links.style.borderRadius = "12px";
    links.style.border = "1px solid rgba(28,64,70,0.15)";
    links.style.backdropFilter = "blur(8px)";
    links.style.zIndex = "100";
  });
}

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

document.getElementById("year").textContent = new Date().getFullYear();

// Skills Tabs Logic
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    // Show target pane
    const targetId = btn.getAttribute('data-target');
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  });
});





// Ensure WOW.js is initialized for the animate__animated elements
document.addEventListener('DOMContentLoaded', () => {
  new WOW().init();
  initSliders();
  initSeeMore();
});

// ── Image Sliders ──────────────────────────────────────────────
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const images = track.querySelectorAll('img');
    const dotsContainer = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');

    if (!images.length) return;

    let current = 0;
    let autoTimer;

    // Build dots
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function updateDots() {
      dotsContainer.querySelectorAll('span').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = (index + images.length) % images.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }

    // Hide prev/next if only 1 image
    if (images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      dotsContainer.style.display = 'none';
    }

    resetAuto();
  });
}

// ── See More / See Less ────────────────────────────────────────
function initSeeMore() {
  // Achievements section
  setupSeeMore(
    document.querySelector('.achievement-container'),
    document.getElementById('seeMoreBtn2'),
    document.getElementById('seeLessBtn2'),
    2   // show first 2 boxes by default
  );

  // Volunteering section
  setupSeeMore(
    document.querySelector('.volunteering-container'),
    document.getElementById('seeMoreBtn3'),
    document.getElementById('seeLessBtn3'),
    2
  );
}

function setupSeeMore(container, moreBtn, lessBtn, defaultCount) {
  if (!container || !moreBtn || !lessBtn) return;

  const boxes = container.children;
  const total = boxes.length;

  // Hide boxes beyond defaultCount initially
  function applyVisibility(showAll) {
    Array.from(boxes).forEach((box, i) => {
      box.style.display = (showAll || i < defaultCount) ? '' : 'none';
    });
    moreBtn.style.display = (showAll || total <= defaultCount) ? 'none' : '';
    lessBtn.style.display = showAll ? '' : 'none';
  }

  applyVisibility(false);

  moreBtn.addEventListener('click', () => applyVisibility(true));
  lessBtn.addEventListener('click', () => {
    applyVisibility(false);
    container.closest('section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}