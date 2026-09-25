(()=>{
  const grid=document.querySelector('#shop-grid');
  if(!grid || typeof products==='undefined') return;

  const enhance=()=>{
    grid.querySelectorAll('.product-footer a[href^="https://buy.stripe.com"]').forEach(link=>{
      const p=products.find(x=>x.link===link.href);
      if(!p) return;
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