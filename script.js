/* =============================================
   NAVBAR — scroll effect & active link
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // sticky navbar style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // back-to-top button
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);

  // active nav link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

/* =============================================
   HAMBURGER MENU
   ============================================= */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* =============================================
   TYPEWRITER EFFECT
   ============================================= */
const phrases = [
  'Cloud Technology Enthusiast',
  'Information Security Student',
  'AWS & Linux Practitioner',
  'Backend Developer',
  'Docker & DevOps Learner'
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIdx];
  el.textContent = deleting
    ? current.slice(0, --charIdx)
    : current.slice(0, ++charIdx);

  let delay = deleting ? 60 : 90;

  if (!deleting && charIdx === current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

/* =============================================
   SKILL BARS — animate on scroll (IntersectionObserver)
   ============================================= */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    card.classList.add('visible');

    const fill = card.querySelector('.skill-fill');
    if (fill) fill.style.width = fill.dataset.width;

    skillObserver.unobserve(card);
  });
}, { threshold: 0.2 });

skillCards.forEach(card => skillObserver.observe(card));

/* =============================================
   GENERAL SCROLL REVEAL (about, project, cert cards)
   ============================================= */
const revealEls = document.querySelectorAll(
  '.about-card, .project-card, .cert-card, .contact-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // staggered delay
    setTimeout(() => {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }, i * 80);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

/* =============================================
   CONTACT FORM
   ============================================= */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const status = document.getElementById('formStatus');
  const btn    = this.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulate async send (replace with real API call)
  setTimeout(() => {
    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    this.reset();

    setTimeout(() => { status.textContent = ''; }, 5000);
  }, 1500);
});

/* =============================================
   SMOOTH SCROLL for hash links (extra safety)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
