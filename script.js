const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.style.display === "flex";
    links.style.display = open ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.gap = "0.8rem";
    links.style.background = "rgba(11, 16, 29, 0.96)";
    links.style.position = "absolute";
    links.style.right = "1rem";
    links.style.top = "64px";
    links.style.padding = "1rem 1.4rem";
    links.style.borderRadius = "14px";
    links.style.border = "1px solid rgba(0, 242, 254, 0.3)";
    links.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(0,242,254,0.15)";
    links.style.backdropFilter = "blur(16px)";
    links.style.zIndex = "100";
  });
}

// Smooth scrolling with active state update
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
      
      // Update active nav link
      document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove("active"));
      a.classList.add("active");

      if (window.innerWidth < 680 && links && links.style.display === "flex") {
        links.style.display = "none";
      }
    }
  });
});

// ScrollSpy to highlight active navigation on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset + 120;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Form demo submission
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

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Skills Tabs Logic
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');

    const targetId = btn.getAttribute('data-target');
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  });
});

// Typewriter Animation for Hero Subtitle
function initTypewriter() {
  const element = document.getElementById("typewriter");
  if (!element) return;

  const words = [
    "Data Scientist",
    "Full-Stack Developer",
    "Machine Learning Engineer",
    "Problem Solver"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const holdTime = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, holdTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
      return;
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof WOW !== 'undefined') {
    new WOW().init();
  }
  initSliders();
  initSeeMore();
  initTypewriter();
});

// ── Image Sliders ──────────────────────────────────────────────
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const images = track ? track.querySelectorAll('img') : [];
    const dotsContainer = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');

    if (!images.length || !track) return;

    let current = 0;
    let autoTimer;

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      images.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('span').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = (index + images.length) % images.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }

    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
    }

    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });

    let touchStartX = 0;
    let touchDeltaX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
      clearInterval(autoTimer);
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      const SWIPE_THRESHOLD = 40;
      if (touchDeltaX > SWIPE_THRESHOLD) {
        goTo(current - 1);
      } else if (touchDeltaX < -SWIPE_THRESHOLD) {
        goTo(current + 1);
      }
      resetAuto();
    });

    slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
    slider.addEventListener('mouseleave', resetAuto);

    resetAuto();
  });
}

// ── See More / See Less (if buttons exist) ─────────────────────
function initSeeMore() {
  setupSeeMore(
    document.querySelector('.achievement-container'),
    document.getElementById('seeMoreBtn2'),
    document.getElementById('seeLessBtn2'),
    2
  );

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
