/* Forge Compliance document shop payment links.
   Each product gets its own Stripe Payment Link so the purchased document
   can be identified reliably for secure delivery. */
const paymentLinks = {
  'pool-backwash-sop': 'https://buy.stripe.com/6oU5kC9f9e6u3jNePAf3a00',
  'weekly-fire-alarm-sop': 'https://buy.stripe.com/7sYdR82QLgeC6vZ6j4f3a01',
  'working-height-ra': 'https://buy.stripe.com/6oUdR89f93rQ7A34aWf3a02',
  'lone-working-ra': 'https://buy.stripe.com/9B64gy1MH2nMdYr6j4f3a03',
  'pump-replacement-rams': 'https://buy.stripe.com/6oU8wO4YTe6u7A39vgf3a04',
  'ceiling-access-rams': 'https://buy.stripe.com/fZu4gy62X4vUg6z5f0f3a05',
  'cleaning-chemical-coshh': '',
  'pool-chemical-coshh': '',
  'plant-room-daily-log': '',
  'water-temperature-log': '',
  'maintenance-asset-register': '',
  'contractor-compliance-register': ''
};

const toast = document.querySelector('#shop-toast');
const showToast = message => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4500);
};

document.querySelectorAll('.buy-button').forEach(button => {
  const key = button.dataset.product;
  const url = paymentLinks[key];
  if (url) {
    button.href = url;
    button.target = '_blank';
    button.rel = 'noopener';
  } else {
    button.addEventListener('click', event => {
      event.preventDefault();
      showToast('Secure checkout for this template is being connected now. Please check back shortly or contact Forge Compliance.');
    });
  }
});

const filter = document.querySelector('#shop-filter');
if (filter) {
  filter.addEventListener('change', () => {
    const value = filter.value;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = value !== 'all' && card.dataset.category !== value;
    });
  });
}
