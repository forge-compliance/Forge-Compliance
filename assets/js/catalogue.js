const products = [
  {slug:'pool-backwash-sop',type:'sop',typeLabel:'SOP',sector:['hospitality','leisure'],category:'Pool plant',title:'Commercial Pool Filter Backwash SOP',desc:'Step-by-step operating procedure for safely backwashing a commercial pool filtration system.',features:['Pre-start checks and operating sequence','Stop-work and emergency conditions','Clear purchaser-edit fields'],price:'£19',link:'https://buy.stripe.com/6oU5kC9f9e6u3jNePAf3a00'},
  {slug:'weekly-fire-alarm-sop',type:'sop',typeLabel:'SOP',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'Fire safety',title:'Weekly Fire Alarm Test SOP',desc:'Practical weekly fire-alarm test procedure with monitoring, reset, defect and log requirements.',features:['Weekly test sequence','Monitoring notification checks','Defect escalation guidance'],price:'£19',link:'https://buy.stripe.com/7sYdR82QLgeC6vZ6j4f3a01'},
  {slug:'working-height-ra',type:'risk',typeLabel:'RA',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'General maintenance',title:'Working at Height Risk Assessment',desc:'Structured assessment for ladders, stepladders and common short-duration maintenance tasks.',features:['5 × 5 risk matrix','Initial and residual scoring','Control measures and actions'],price:'£19',link:'https://buy.stripe.com/6oUdR89f93rQ7A34aWf3a02'},
  {slug:'lone-working-ra',type:'risk',typeLabel:'RA',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'General maintenance',title:'Lone Working Risk Assessment',desc:'Framework for maintenance and inspection work undertaken without immediate colleague support.',features:['5 × 5 risk scoring','High-risk task exclusions','Check-in and escalation controls'],price:'£19',link:'https://buy.stripe.com/9B64gy1MH2nMdYr6j4f3a03'},
  {slug:'pump-replacement-rams',type:'rams',typeLabel:'RAMS',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'Mechanical services',title:'Circulation Pump Replacement RAMS',desc:'Detailed RAMS for isolation, removal, replacement and recommissioning of a building-services circulation pump.',features:['Risk assessment and method statement','Electrical and pressure isolation','Commissioning and leak checks'],price:'£19',link:'https://buy.stripe.com/6oU8wO4YTe6u7A39vgf3a04'},
  {slug:'ceiling-access-rams',type:'rams',typeLabel:'RAMS',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'Building maintenance',title:'Ceiling Access & Above-Ceiling Maintenance RAMS',desc:'RAMS framework for safe ceiling access and minor maintenance to services above suspended ceilings.',features:['Working-at-height controls','Hidden-services precautions','Asbestos stop-work trigger'],price:'£19',link:'https://buy.stripe.com/fZu4gy62X4vUg6z5f0f3a05'},
  {slug:'cleaning-chemical-coshh',type:'coshh',typeLabel:'COSHH',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'Cleaning chemicals',title:'General Cleaning Chemical COSHH Assessment',desc:'Editable COSHH framework designed to be completed from the current SDS for the exact product used.',features:['Substance identification','Exposure assessment','Control, PPE and emergency fields'],price:'£19',link:'https://buy.stripe.com/aFa6oGgHB6E24nR8rcf3a06'},
  {slug:'pool-chemical-coshh',type:'coshh',typeLabel:'COSHH',sector:['hospitality','leisure'],category:'Pool chemicals',title:'Pool Water Treatment Chemical COSHH Assessment',desc:'COSHH structure for commercial pool-treatment chemicals using the purchaser’s exact product and SDS.',features:['Dosing and storage controls','Incompatibility checks','PPE and emergency provision'],price:'£19',link:'https://buy.stripe.com/fZu3cu2QLgeC5rV5f0f3a07'},
  {slug:'plant-room-daily-log',type:'records',typeLabel:'LOG',sector:['hospitality','care','education','commercial','leisure','residential'],category:'Plant rooms',title:'Plant Room Daily Inspection Log',desc:'Simple daily inspection sheet covering routine checks expected in a well-managed plant room.',features:['Leaks, noise and housekeeping','Pressure and temperature readings','Defect and job-reference fields'],price:'£19',link:'https://buy.stripe.com/8x29ASdvp9Qe1bFePAf3a08'},
  {slug:'water-temperature-log',type:'records',typeLabel:'LOG',sector:['hospitality','care','education','leisure','residential'],category:'Water hygiene',title:'Water Temperature Monitoring Log',desc:'Editable hot and cold water temperature monitoring record for use with the site’s own water-safety plan.',features:['Outlet and asset fields','Start and stable temperatures','Corrective-action record'],price:'£19',link:'https://buy.stripe.com/9B68wO4YT4vUcUnbDof3a09'},
  {slug:'maintenance-asset-register',type:'management',typeLabel:'REG',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'Asset management',title:'Maintenance Asset Register Template',desc:'Practical asset-register structure for building-services equipment and planned maintenance control.',features:['Unique asset identification','Make, model and serial fields','Criticality and PPM frequency'],price:'£19',link:'https://buy.stripe.com/00w6oG4YT4vU3jNcHsf3a0a'},
  {slug:'contractor-compliance-register',type:'management',typeLabel:'REG',sector:['hospitality','care','education','commercial','retail','leisure','residential'],category:'Contractor management',title:'Contractor Compliance Register Template',desc:'Clear contractor register for competence, insurance, induction, permits and approval status.',features:['Insurance and competence evidence','RAMS and induction fields','Approval and review status'],price:'£19',link:'https://buy.stripe.com/eVq7sK8b57I67A39vgf3a0b'}
];

const grid = document.querySelector('#shop-grid');
const search = document.querySelector('#shop-search');
const type = document.querySelector('#shop-filter');
const sector = document.querySelector('#sector-filter');
const count = document.querySelector('#shop-result-count');
const params = new URLSearchParams(location.search);
if (params.get('sector')) sector.value = params.get('sector');
if (params.get('type')) type.value = params.get('type');
if (params.get('q')) search.value = params.get('q');

const card = p => `<article class="product-card"><div class="product-icon">${p.typeLabel}</div><div class="product-copy"><p class="product-category">${p.category}</p><h3>${p.title}</h3><p>${p.desc}</p><ul>${p.features.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="product-footer"><div><span class="price">${p.price}</span><small>One-off purchase</small></div><a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener">Buy now</a></div></article>`;

function render(){
  const q=(search.value||'').toLowerCase().trim();
  const t=type.value;
  const s=sector.value;
  const filtered=products.filter(p=>{
    const hay=[p.title,p.category,p.desc,p.features.join(' '),p.sector.join(' ')].join(' ').toLowerCase();
    return (!q||hay.includes(q)) && (t==='all'||p.type===t) && (s==='all'||p.sector.includes(s));
  });
  grid.innerHTML=filtered.map(card).join('') || '<div class="catalogue-empty"><h3>No matching templates yet</h3><p>Try another search or sector. The library is expanding regularly.</p></div>';
  count.textContent=`${filtered.length} ${filtered.length===1?'document':'documents'} found`;
}
[search,type,sector].forEach(el=>el.addEventListener(el===search?'input':'change',render));
render();