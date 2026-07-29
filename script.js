const toggle=document.querySelector('.nav-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const quoteForm=document.querySelector('#quote-form');
if(quoteForm){quoteForm.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(quoteForm);
  const subject=encodeURIComponent(`Forge Compliance enquiry: ${d.get('document')||'Document request'}`);
  const body=encodeURIComponent(`Name: ${d.get('name')}\nCompany: ${d.get('company')}\nPhone: ${d.get('phone')}\nDocument required: ${d.get('document')}\nDeadline: ${d.get('deadline')}\n\nProject details:\n${d.get('details')}\n\nPlease attach any photos or existing documents when replying.`);
  window.location.href=`mailto:hello@forgecompliance.co.uk?subject=${subject}&body=${body}`;
});}
