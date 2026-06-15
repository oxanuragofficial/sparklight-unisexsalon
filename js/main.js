// ===========================
// Spark Light Salon — Interactions
// ===========================

const WHATSAPP_NUMBER = "919662372507"; // +91 96623 72507

// --- Header scroll state ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Mobile nav ---
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');
const navOverlay = document.querySelector('.nav-overlay');

function openMobileNav() {
  mobileNav.classList.add('open');
  navOverlay.classList.add('open');
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('open');
}
menuToggle?.addEventListener('click', openMobileNav);
mobileClose?.addEventListener('click', closeMobileNav);
navOverlay?.addEventListener('click', closeMobileNav);
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// --- Ledger tabs (services filter) ---
const ledgerTabs = document.querySelectorAll('.ledger-tab');
const ledgerCards = document.querySelectorAll('.ledger-card');

ledgerTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    ledgerTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;

    ledgerCards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      card.style.display = match ? '' : 'none';
    });
  });
});

// --- Service "Book this" buttons -> prefill booking form ---
document.querySelectorAll('[data-book-service]').forEach(btn => {
  btn.addEventListener('click', () => {
    const serviceName = btn.dataset.bookService;
    const select = document.getElementById('service');
    if (select) {
      const opt = Array.from(select.options).find(o => o.value === serviceName);
      if (opt) select.value = serviceName;
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// --- Booking form -> WhatsApp message ---
const bookingForm = document.getElementById('booking-form');

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const service = document.getElementById('service').value;
  const datetime = document.getElementById('datetime').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!name || !phone) {
    alert('Please enter at least your name and phone number.');
    return;
  }

  let message = `Hi Spark Light Salon! I'd like to book an appointment.\n\n`;
  message += `*Name:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  if (address) message += `*Address:* ${address}\n`;
  message += `*Service:* ${service}\n`;
  if (datetime) message += `*Preferred date/time:* ${datetime}\n`;
  if (notes) message += `*Notes:* ${notes}\n`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});

// --- Year in footer ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
