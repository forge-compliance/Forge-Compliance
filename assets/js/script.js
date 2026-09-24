const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});}

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

const isHome=location.pathname==='/'||location.pathname.endsWith('/index.html');
if(isHome){
  if(!document.querySelector('link[href*="home-shop-banner.css"]')){
    const shopStyles=document.createElement('link');
    shopStyles.rel='stylesheet';
    shopStyles.href='assets/css/home-shop-banner.css?v=2';
    document.head.appendChild(shopStyles);
  }

  const header=document.querySelector('.site-header');
  if(header&&!document.querySelector('.home-shop-banner')){
    const banner=document.createElement('section');
    banner.className='home-shop-banner';
    banner.innerHTML=`
      <div class="container">
        <div class="home-shop-banner-inner">
          <div>
            <div class="home-shop-kicker">Forge document shop</div>
            <h2>Need a compliance document without starting from scratch?</h2>
            <p>Browse practical, editable templates for SOPs, RAMS, risk assessments, COSHH, inspection records and maintenance management.</p>
            <div class="home-shop-actions">
              <a class="btn shop-main-btn" href="documents.html">Browse the shop →</a>
              <a class="btn shop-search-btn" href="catalogue.html">Search all templates</a>
            </div>
            <span class="home-shop-price">Templates from £19 • Secure Stripe checkout • Editable files</span>
          </div>
          <div class="home-shop-quick" aria-label="Popular document types">
            <a href="catalogue.html?type=sop"><strong>SOPs</strong><span>Browse →</span></a>
            <a href="catalogue.html?type=rams"><strong>RAMS</strong><span>Browse →</span></a>
            <a href="catalogue.html?type=risk"><strong>Risk Assessments</strong><span>Browse →</span></a>
          </div>
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
