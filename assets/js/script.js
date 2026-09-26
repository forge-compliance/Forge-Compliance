const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});}

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

/* Brand refresh: load the new ivory/navy/sage theme and swap legacy orange logos. */
if(!document.querySelector('link[href*="brand-refresh.css"]')){
  const brandCss=document.createElement('link');
  brandCss.rel='stylesheet';
  brandCss.href='assets/css/brand-refresh.css?v=1';
  document.head.appendChild(brandCss);
}
if(!document.querySelector('link[href*="brand-refresh-fixes.css"]')){
  const brandFixes=document.createElement('link');
  brandFixes.rel='stylesheet';
  brandFixes.href='assets/css/brand-refresh-fixes.css?v=2';
  document.head.appendChild(brandFixes);
}
if(!document.querySelector('link[href*="brand-home-fixes.css"]')){
  const homeBrandFixes=document.createElement('link');
  homeBrandFixes.rel='stylesheet';
  homeBrandFixes.href='assets/css/brand-home-fixes.css?v=1';
  document.head.appendChild(homeBrandFixes);
}
document.querySelectorAll('img[src*="forge-logo.png"]').forEach(img=>{
  img.src='assets/images/forge-logo-shield.svg';
  img.alt='Forge Compliance';
});
const favicon=document.querySelector('link[rel="icon"]');
if(favicon)favicon.href='assets/images/favicon.svg?v=2';

if(nav&&!nav.querySelector('.header-custom-sop-link')){
  const custom=document.createElement('a');
  custom.className='header-custom-sop-link';
  custom.href='custom-document.html';
  custom.textContent='Custom SOP £69';
  const shop=nav.querySelector('a[href="documents.html"]');
  if(shop&&shop.nextSibling)nav.insertBefore(custom,shop.nextSibling);else nav.appendChild(custom);
}

if(nav&&!nav.querySelector('.header-basket-link')){
  const basket=document.createElement('a');
  basket.className='header-basket-link';
  basket.href='catalogue.html?basket=open';
  basket.innerHTML='🛒 Basket <span class="header-basket-count">0</span>';
  const quote=nav.querySelector('.btn');
  if(quote)nav.insertBefore(basket,quote);else nav.appendChild(basket);
  const refreshBasketCount=()=>{try{const items=JSON.parse(localStorage.getItem('forgeCartV1')||'[]')||[];basket.querySelector('.header-basket-count').textContent=String(items.length)}catch{basket.querySelector('.header-basket-count').textContent='0'}};
  refreshBasketCount();
  window.addEventListener('storage',refreshBasketCount);
  window.addEventListener('forge:cart-updated',refreshBasketCount);
}

if(!document.querySelector('link[href*="assets/css/cart.css"]')){
  const cartCss=document.createElement('link');cartCss.rel='stylesheet';cartCss.href='assets/css/cart.css?v=6';document.head.appendChild(cartCss);
}
if(!window.__forgeCartLoaded&&!document.querySelector('script[src*="assets/js/cart.js"]')){
  const cartScript=document.createElement('script');cartScript.src='assets/js/cart.js?v=6';cartScript.defer=true;document.body.appendChild(cartScript);
}

if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

const footerFixes=document.createElement('style');
footerFixes.textContent=`
html,body{max-width:100%;overflow-x:hidden}
.footer,.footer .container,.footer-grid,.footer-grid>*{min-width:0;max-width:100%}
.footer a,.footer p,.footer span{max-width:100%;overflow-wrap:anywhere;word-break:break-word}
.footer a[href^="mailto:"]{display:block;overflow-wrap:anywhere;word-break:break-all;white-space:normal}
.footer-grid{grid-template-columns:minmax(0,2fr) repeat(3,minmax(0,1fr))}
.header-custom-sop-link{display:inline-flex!important;align-items:center;padding:.5rem .7rem;border-radius:999px;background:#E8EEE7;color:#425E48!important;font-weight:900!important;white-space:nowrap}
.header-basket-link{display:inline-flex!important;align-items:center;gap:.4rem;font-weight:700}
.header-basket-count{display:inline-flex;align-items:center;justify-content:center;min-width:1.35rem;height:1.35rem;padding:0 .35rem;border-radius:999px;background:#0F2D46;color:#fff;font-size:.75rem;line-height:1}
@media(max-width:900px){
  .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .site-header .logo{width:260px;max-height:62px}
}
@media(max-width:560px){
  .site-header .header-inner{gap:1rem}
  .site-header .logo{width:235px;max-width:none;max-height:60px}
  .header-custom-sop-link{justify-content:center}
  .footer{padding:2.75rem 0 1.25rem}
  .footer-grid{grid-template-columns:minmax(0,1fr);gap:1.25rem}
  .footer-logo{width:min(220px,100%)}
  .footer h3{margin:.25rem 0 .4rem}
  .footer a{margin:.3rem 0}
  .footer-bottom{display:block}
  .footer-bottom span{display:block;margin:.35rem 0}
}
`;
document.head.appendChild(footerFixes);

const form=document.querySelector('#quote-form');
if(form){
  const details=form.querySelector('#details');
  const counter=form.querySelector('#character-count');
  const status=form.querySelector('#form-status');
  const button=form.querySelector('.submit-btn');
  const label=form.querySelector('.button-label');

  const updateCount=()=>{if(details&&counter)counter.textContent=details.value.length;};
  if(details){details.addEventListener('input',updateCount);updateCount();}

  form.addEventListener('submit',e=>{
    if(!form.checkValidity()){
      e.preventDefault();
      form.reportValidity();
      if(status)status.textContent='Please complete the required fields before sending.';
      return;
    }
    if(button)button.disabled=true;
    if(label)label.textContent='Sending enquiry…';
    if(status)status.textContent='Your request is being securely submitted.';
  });
}
