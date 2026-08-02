/*
  Add your Stripe Payment Link URLs below.
  Example: 'https://buy.stripe.com/your-payment-link'
*/
const paymentLinks = {
  'pool-backwash-sop': '',
  'pool-backwash-rams': '',
  'working-height-ra': '',
  'hypochlorite-coshh': '',
  'prv-valve-rams': '',
  'hotel-ppm-pack': ''
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
      showToast('Secure checkout is being connected. Please use the bespoke quote form for this document today.');
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
