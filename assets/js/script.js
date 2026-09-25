const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});}

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

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

if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

/* Global mobile/layout guards. Keeps long footer content from widening the page and gives the header logo a little more presence on phones. */
const footerFixes=document.createElement('style');
footerFixes.textContent=`
html,body{max-width:100%;overflow-x:hidden}
.footer,.footer .container,.footer-grid,.footer-grid>*{min-width:0;max-width:100%}
.footer a,.footer p,.footer span{max-width:100%;overflow-wrap:anywhere;word-break:break-word}
.footer a[href^="mailto:"]{display:block;overflow-wrap:anywhere;word-break:break-all;white-space:normal}
.footer-grid{grid-template-columns:minmax(0,2fr) repeat(3,minmax(0,1fr))}
.header-basket-link{display:inline-flex!important;align-items:center;gap:.4rem;font-weight:700}
.header-basket-count{display:inline-flex;align-items:center;justify-content:center;min-width:1.35rem;height:1.35rem;padding:0 .35rem;border-radius:999px;background:#111827;color:#fff;font-size:.75rem;line-height:1}
@media(max-width:900px){
  .footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .site-header .logo{width:260px;max-height:62px}
}
@media(max-width:560px){
  .site-header .header-inner{gap:1rem}
  .site-header .logo{width:235px;max-width:none;max-height:60px}
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
