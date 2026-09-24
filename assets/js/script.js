const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});}

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

const isHome=location.pathname==='/'||location.pathname.endsWith('/index.html');
if(isHome){
  const header=document.querySelector('.site-header');
  if(header&&!document.querySelector('.home-shop-banner')){
    const banner=document.createElement('section');
    banner.className='home-shop-banner';
    banner.innerHTML=`
      <style>
        .home-shop-banner{background:linear-gradient(100deg,#ff6a00 0%,#f37718 42%,#0d1b2a 42%,#0d1b2a 100%);color:#fff;border-bottom:1px solid rgba(255,255,255,.12)}
        .home-shop-banner-inner{width:min(1180px,calc(100% - 32px));margin:auto;display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:28px;padding:22px 0}
        .home-shop-banner-copy{display:flex;align-items:center;gap:16px}
        .home-shop-banner-badge{display:grid;place-items:center;width:56px;height:56px;border-radius:14px;background:rgba(255,255,255,.18);font-weight:950;font-size:.8rem;flex:0 0 auto}
        .home-shop-banner h2{margin:0 0 4px;font-size:clamp(1.25rem,2.2vw,1.8rem);line-height:1.05}.home-shop-banner p{margin:0;color:#fff;opacity:.9;font-size:.94rem}
        .home-shop-banner-links{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}.home-shop-banner-links a{display:inline-flex;align-items:center;justify-content:center;padding:.75rem 1rem;border-radius:9px;font-weight:900;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff}.home-shop-banner-links a:first-child{background:#fff;color:#0d1b2a;border-color:#fff}
        @media(max-width:760px){.home-shop-banner{background:linear-gradient(135deg,#ff6a00,#d95700)}.home-shop-banner-inner{grid-template-columns:1fr;padding:16px 0;gap:12px}.home-shop-banner-copy{align-items:flex-start}.home-shop-banner-badge{width:46px;height:46px}.home-shop-banner-links{justify-content:flex-start;display:grid;grid-template-columns:1fr 1fr}.home-shop-banner-links a:first-child{grid-column:1/-1}.home-shop-banner p{font-size:.86rem}}
      </style>
      <div class="home-shop-banner-inner">
        <div class="home-shop-banner-copy">
          <div class="home-shop-banner-badge">SHOP</div>
          <div><h2>The Forge Compliance shop is live.</h2><p>Editable SOPs, RAMS, risk assessments, COSHH templates, logs and maintenance tools.</p></div>
        </div>
        <div class="home-shop-banner-links">
          <a href="documents.html">Open the shop →</a>
          <a href="catalogue.html">Search templates</a>
          <a href="documents.html#document-types">Browse by type</a>
        </div>
      </div>`;
    header.insertAdjacentElement('afterend',banner);
  }
}

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
