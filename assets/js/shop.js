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

/* Shop-specific responsive polish. Kept here so the shop can evolve independently
   without disturbing the rest of the Forge site. */
const shopStyles = document.createElement('style');
shopStyles.textContent = `
  .shop-toolbar > div:last-child{
    background:#fff;
    border:1px solid #dbe1e7;
    border-radius:16px;
    padding:16px;
    box-shadow:0 10px 28px rgba(15,27,39,.06);
  }
  .shop-filter{font-size:.82rem;letter-spacing:.01em;color:#33404d}
  .shop-filter input,.shop-filter select{
    min-height:48px;
    border-radius:12px!important;
    margin-bottom:0!important;
    box-shadow:none;
  }
  #shop-result-count{
    display:inline-flex;
    align-items:center;
    min-height:32px;
    padding:5px 11px;
    border-radius:999px;
    background:#e8edf2;
    color:#44515e!important;
    font-size:.84rem;
  }
  .product-card{overflow:hidden}
  .product-card .btn{white-space:nowrap}

  @media(max-width:700px){
    .shop-hero{padding:34px 0 30px!important}
    .shop-hero .eyebrow{font-size:.7rem}
    .shop-hero h1{
      font-size:clamp(2.05rem,10vw,2.7rem)!important;
      line-height:.98!important;
      letter-spacing:-.035em;
      margin:.45rem 0 .9rem!important;
    }
    .shop-hero .prose{
      font-size:.98rem;
      line-height:1.5;
      margin-bottom:0;
    }
    .shop-trust{
      display:grid!important;
      grid-template-columns:1fr 1fr;
      gap:8px 12px!important;
      margin-top:20px!important;
      font-size:.82rem;
      line-height:1.3;
    }
    .shop-section.section{padding:28px 0 48px!important}
    .shop-toolbar{
      display:block!important;
      margin-bottom:10px!important;
    }
    .shop-toolbar > div:first-child{
      margin-bottom:16px;
      min-width:0!important;
    }
    .shop-toolbar h2{
      margin:0 0 6px!important;
      font-size:1.65rem;
    }
    .shop-toolbar p{
      font-size:.92rem;
      line-height:1.45;
    }
    .shop-toolbar > div:last-child{
      display:grid!important;
      grid-template-columns:1fr 1fr!important;
      gap:10px!important;
      width:100%!important;
      min-width:0!important;
      padding:12px!important;
      border-radius:14px;
    }
    .shop-toolbar > div:last-child .shop-filter:first-child{
      grid-column:1 / -1;
    }
    .shop-filter{
      display:block!important;
      min-width:0!important;
      font-size:.75rem!important;
    }
    .shop-filter input,.shop-filter select{
      min-width:0!important;
      width:100%!important;
      min-height:44px;
      padding:10px 11px!important;
      margin:5px 0 0!important;
      font-size:.9rem!important;
    }
    #shop-result-count{
      margin:4px 0 14px!important;
      padding:4px 10px;
      min-height:28px;
      font-size:.78rem;
    }
    .shop-grid{
      grid-template-columns:1fr!important;
      gap:14px!important;
    }
    .product-card{
      padding:18px!important;
      border-radius:16px!important;
      box-shadow:0 8px 22px rgba(15,27,39,.08)!important;
    }
    .product-badge{
      top:14px!important;
      right:14px!important;
      font-size:.62rem!important;
      padding:5px 8px!important;
    }
    .product-icon{
      width:52px!important;
      height:52px!important;
      border-radius:12px!important;
      margin-bottom:13px!important;
      font-size:.78rem!important;
    }
    .product-category{
      font-size:.68rem!important;
      margin-bottom:4px!important;
    }
    .product-copy h3{
      font-size:1.13rem!important;
      line-height:1.18;
      margin-bottom:8px!important;
    }
    .product-copy>p:not(.product-category){
      font-size:.9rem!important;
      line-height:1.45;
      margin-bottom:13px!important;
    }
    .product-copy ul{
      display:grid!important;
      grid-template-columns:1fr 1fr;
      column-gap:12px;
      row-gap:3px;
      margin-bottom:15px!important;
    }
    .product-copy li{
      font-size:.78rem!important;
      line-height:1.35;
      padding-left:17px!important;
      margin:3px 0!important;
    }
    .product-footer{
      padding-top:13px!important;
      gap:12px!important;
    }
    .product-footer .price{
      font-size:1.35rem!important;
      margin:0!important;
    }
    .product-footer small{
      font-size:.72rem!important;
    }
    .product-footer .btn{
      padding:.72rem 1rem!important;
      min-width:116px;
      font-size:.88rem!important;
    }
    .shop-note{
      display:block!important;
      margin-top:24px!important;
      padding:22px!important;
      border-radius:16px!important;
    }
    .shop-note h2{font-size:1.45rem!important;line-height:1.1}
    .shop-note p{font-size:.9rem;line-height:1.45}
    .shop-note .btn{margin-top:16px;width:100%}
  }

  @media(max-width:390px){
    .shop-trust{grid-template-columns:1fr}
    .product-copy ul{grid-template-columns:1fr}
  }
`;
document.head.appendChild(shopStyles);

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
