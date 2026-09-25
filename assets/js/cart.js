(()=>{
  const KEY='forgeCartV1';
  const money=p=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',minimumFractionDigits:0}).format(p/100);
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}};
  let cart=load();
  const save=()=>localStorage.setItem(KEY,JSON.stringify(cart));

  const backdrop=document.createElement('div');backdrop.className='forge-cart-backdrop';
  const drawer=document.createElement('aside');drawer.className='forge-cart-drawer';drawer.setAttribute('aria-label','Shopping basket');
  const toggle=document.createElement('button');toggle.className='forge-cart-toggle';toggle.type='button';toggle.innerHTML='<span class="cart-icon">🛒</span><span class="cart-label">Basket</span><span class="forge-cart-count">0</span>';
  const toast=document.createElement('div');toast.className='forge-cart-toast';toast.setAttribute('role','status');
  drawer.innerHTML='<div class="forge-cart-head"><h2>Your basket</h2><button class="forge-cart-close" type="button" aria-label="Close basket">×</button></div><div class="forge-cart-items"></div><div class="forge-cart-foot"><div class="forge-cart-total"><span>Total</span><strong>£0</strong></div><button class="forge-cart-checkout" type="button">Secure checkout</button><p class="forge-cart-note">One secure Stripe checkout for all selected documents.</p><p class="forge-cart-status" role="status"></p></div>';
  document.body.append(backdrop,drawer,toggle,toast);

  const countEl=toggle.querySelector('.forge-cart-count'),itemsEl=drawer.querySelector('.forge-cart-items'),totalEl=drawer.querySelector('.forge-cart-total strong'),checkoutBtn=drawer.querySelector('.forge-cart-checkout'),statusEl=drawer.querySelector('.forge-cart-status');
  const open=()=>{drawer.classList.add('open');backdrop.classList.add('open');};
  const close=()=>{drawer.classList.remove('open');backdrop.classList.remove('open');};
  toggle.addEventListener('click',open);backdrop.addEventListener('click',close);drawer.querySelector('.forge-cart-close').addEventListener('click',close);

  const flash=msg=>{toast.textContent=msg;toast.classList.add('show');clearTimeout(flash.t);flash.t=setTimeout(()=>toast.classList.remove('show'),1700)};
  const render=()=>{
    countEl.textContent=String(cart.length);
    totalEl.textContent=money(cart.reduce((s,x)=>s+x.amount,0));
    checkoutBtn.disabled=!cart.length;
    if(!cart.length){itemsEl.innerHTML='<div class="forge-cart-empty"><strong>Your basket is empty.</strong><br><small>Add any documents you want, then pay once.</small></div>';return;}
    itemsEl.innerHTML=cart.map(x=>`<div class="forge-cart-item"><div><h3>${x.title}</h3><small>${x.category||'Forge Compliance'}</small><strong>${money(x.amount)}</strong></div><button class="forge-cart-remove" type="button" data-remove="${x.slug}">Remove</button></div>`).join('');
  };
  itemsEl.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;cart=cart.filter(x=>x.slug!==b.dataset.remove);save();render();document.querySelectorAll(`[data-cart-add][data-slug="${b.dataset.remove}"]`).forEach(btn=>btn.classList.remove('added'));});

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-cart-add]');if(!b)return;
    e.preventDefault();
    const item={slug:b.dataset.slug,title:b.dataset.title,amount:Number(b.dataset.amount||0),category:b.dataset.category||''};
    if(!item.slug||!item.title||!Number.isFinite(item.amount)||item.amount<1)return;
    if(cart.some(x=>x.slug===item.slug)){open();flash('Already in your basket');return;}
    cart.push(item);save();render();b.classList.add('added');flash('Added to basket');
  });

  checkoutBtn.addEventListener('click',async()=>{
    if(!cart.length)return;
    checkoutBtn.disabled=true;checkoutBtn.textContent='Opening secure checkout…';statusEl.textContent='';
    try{
      const r=await fetch('https://sswedojvkqvoqmwhfmkj.supabase.co/functions/v1/forge-create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart.map(x=>({slug:x.slug}))})});
      const data=await r.json().catch(()=>({}));
      if(!r.ok||!data.url)throw new Error(data.error||'Checkout is temporarily unavailable.');
      location.href=data.url;
    }catch(err){statusEl.textContent=err.message||'Checkout is temporarily unavailable.';checkoutBtn.disabled=false;checkoutBtn.textContent='Secure checkout';}
  });

  render();
  cart.forEach(x=>document.querySelectorAll(`[data-cart-add][data-slug="${x.slug}"]`).forEach(btn=>btn.classList.add('added')));
})();