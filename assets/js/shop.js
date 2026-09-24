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
  'cleaning-chemical-coshh': 'https://buy.stripe.com/aFa6oGgHB6E24nR8rcf3a06',
  'pool-chemical-coshh': 'https://buy.stripe.com/fZu3cu2QLgeC5rV5f0f3a07',
  'plant-room-daily-log': 'https://buy.stripe.com/8x29ASdvp9Qe1bFePAf3a08',
  'water-temperature-log': 'https://buy.stripe.com/9B68wO4YT4vUcUnbDof3a09',
  'maintenance-asset-register': 'https://buy.stripe.com/00w6oG4YT4vU3jNcHsf3a0a',
  'contractor-compliance-register': 'https://buy.stripe.com/eVq7sK8b57I67A39vgf3a0b'
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

const typeFilter = document.querySelector('#shop-filter');
const sectorFilter = document.querySelector('#sector-filter');
const searchInput = document.querySelector('#shop-search');
const resultCount = document.querySelector('#shop-result-count');
const productCards = Array.from(document.querySelectorAll('.product-card'));

const normalise = value => (value || '').toLowerCase().trim();

const applyShopFilters = () => {
  const typeValue = typeFilter?.value || 'all';
  const sectorValue = sectorFilter?.value || 'all';
  const searchValue = normalise(searchInput?.value);
  let visible = 0;

  productCards.forEach(card => {
    const matchesType = typeValue === 'all' || card.dataset.category === typeValue;
    const sectors = normalise(card.dataset.sector).split(/\s+/).filter(Boolean);
    const matchesSector = sectorValue === 'all' || sectors.includes(sectorValue);
    const searchableText = normalise(card.textContent);
    const matchesSearch = !searchValue || searchableText.includes(searchValue);
    const show = matchesType && matchesSector && matchesSearch;

    card.hidden = !show;
    if (show) visible += 1;
  });

  if (resultCount) {
    resultCount.textContent = `${visible} ${visible === 1 ? 'document' : 'documents'} found`;
  }
};

[typeFilter, sectorFilter].forEach(control => {
  control?.addEventListener('change', applyShopFilters);
});
searchInput?.addEventListener('input', applyShopFilters);

applyShopFilters();
