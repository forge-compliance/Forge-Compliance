const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});}

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

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
