(()=>{
  const grid=document.querySelector('#shop-grid');
  if(!grid || typeof products==='undefined') return;

  const enhance=()=>{
    grid.querySelectorAll('.product-card').forEach(card=>{
      const link=card.querySelector('.product-footer a');
      if(!link) return;
      const title=card.querySelector('h3')?.textContent?.trim();
      const p=products.find(x=>x.title===title);
      if(!p || p.directCheckout) return;
      const button=document.createElement('button');
      button.type='button';
      button.className=link.className;
      button.textContent='Add to basket';
      button.dataset.cartAdd='';
      button.dataset.slug=p.slug;
      button.dataset.title=p.title;
      button.dataset.category=p.category;
      button.dataset.amount=String(Number(p.price.replace(/[^0-9]/g,''))*100);
      link.replaceWith(button);
    });
  };

  enhance();
  new MutationObserver(enhance).observe(grid,{childList:true,subtree:true});
})();