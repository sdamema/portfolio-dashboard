/* Human mention reviews are a reversible browser overlay, not research evidence. */
(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory(require('./model.js'));
 else root.OffpageMentions=factory(root.OffpageModel);
})(typeof globalThis!=='undefined'?globalThis:this,function(M){
 const brands=['ExampleGroup','Example Company C','Example Company D','Example Company E','Example Company F','Example Company G','Example Company H'];
 const states=['unknown','present','absent'];
 function normalize(input,now=new Date().toISOString()){
  if(!['article','site'].includes(input.kind)||typeof input.id!=='string'||!input.id)throw Error('Select a saved page or website.');
  if(['restore','remove','undelete'].includes(input.action))return {kind:input.kind,id:input.id,action:input.action,saved_at:now};
  if(!states.includes(input.brand)||!['unknown','yes','no'].includes(input.competitors))throw Error('Choose both check outcomes.');
  const checked=String(input.checked_on||'');
  const date=new Date(checked+'T00:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(checked)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==checked||checked>now.slice(0,10))throw Error('Enter a valid check date, not in the future.');
  const urls=[...new Set((input.checked_urls||[]).map(url=>{const safe=M.safeUrl(url);if(!safe)throw Error('Enter a complete URL for each checked page.');return safe;}))];
  if(!urls.length)throw Error('Record the page URLs you checked.');
  const names=[...new Set((input.names||[]).map(n=>String(n).trim()).filter(Boolean).map(n=>brands.find(b=>b.toLowerCase()===n.toLowerCase())||n))];
  if(names.some(n=>n.length>100))throw Error('Keep each brand name under 100 characters.');
  if(names.some(n=>/^(brand|brand\.com|usebrand(?:\.com)?)$/i.test(n)))throw Error('Use the separate Brand field for Brand and legacy.brand.example.');
  if(input.competitors==='yes'&&!names.length)throw Error('Select at least one mentioned brand.');
  if(input.competitors!=='yes'&&names.length)throw Error('Select Brands mentioned to save the selected names.');
  const brandUrl=input.brand_url?M.safeUrl(input.brand_url):null;
  if(input.brand_url&&(!brandUrl||!M.brandDomain(brandUrl)))throw Error('Brand link must point to brand.example or legacy.brand.example.');
  if(brandUrl&&input.brand!=='present')throw Error('A Brand link requires Brand mentioned.');
  const brandLinks=(input.links||[]).filter(x=>names.includes(x.name)&&x.url).map(x=>{const url=M.safeUrl(x.url);if(!url)throw Error('Enter complete brand link URLs or leave them blank.');return {name:x.name,url};});
  return {kind:input.kind,id:input.id,action:'review',brand:input.brand,competitors:input.competitors,names,links:brandLinks,brand_url:brandUrl,checked_on:checked,checked_urls:urls,notes:String(input.notes||'').trim(),reviewer:String(input.reviewer||'').trim(),saved_at:now};
 }
 function read(raw){
  if(raw===null)return {schema_version:1,revisions:[]};
  const d=JSON.parse(raw);if(d.schema_version!==1||!Array.isArray(d.revisions))throw Error('Unreadable saved reviews');
  for(const item of d.revisions){if(!item||!Number.isFinite(Date.parse(item.saved_at)))throw Error('Unreadable review date');normalize(item,item.saved_at);}
  return d;
 }
 function store(getStorage,key){
  let issue='';
  function all(){try{const d=read(getStorage().getItem(key));issue='';return d.revisions;}catch{issue='Saved mention reviews cannot be read. They have not been overwritten. Export reviews to recover the stored content.';return [];}}
  function save(input,now){const item=normalize(input,now);const d=read(getStorage().getItem(key));d.revisions.push(item);getStorage().setItem(key,JSON.stringify(d));issue='';return item;}
  function exportData(){const raw=getStorage().getItem(key);try{return {...read(raw),record_type:'manual_mention_reviews',exported_at:new Date().toISOString(),storage:'browser_overlay_not_database'};}catch{return {record_type:'manual_mention_reviews_recovery',raw};}}
  return {all,save,exportData,get issue(){return issue;}};
 }
 function apply(data,revisions){
  const latest=new Map(),removals=new Map();for(const review of revisions){const key=review.kind+':'+review.id;if(['remove','undelete'].includes(review.action))removals.set(key,review);else latest.set(key,review);}
  function overlay(row,kind){
   const r=latest.get(kind+':'+row.id);if(!r||r.action==='restore')return;
   // Never apply a review to a different page/domain after an identity change.
   const relevant=r.checked_urls.every(url=>{const u=new URL(url),target=new URL(kind==='article'?row.original_url:'https://'+row.hostname);return kind==='article'?u.origin===target.origin&&u.pathname===target.pathname&&u.search===target.search:u.hostname.replace(/^www\./,'')===target.hostname.replace(/^www\./,'');});
   if(!relevant)return;
   row.manual_review=r;row.manual_review_stale=!!row.updated_at&&(row.updated_at>r.saved_at||row.updated_at.slice(0,10)>r.checked_on);
   if(row.manual_review_stale)return;
   row.brand_status=r.brand;row.competitor_status=r.competitors;row.competitor_names=r.names;
   row.competitor_links=r.names.map(name=>({name,url:r.links.find(x=>x.name===name)?.url||null}));
   row.updated_at=r.saved_at;
   if(kind==='article'){
    row.brand_links=r.brand_url?[{target_url:r.brand_url,domain:M.brandDomain(r.brand_url),checked_at:r.checked_on,source_locator:r.checked_urls[0],replacement_verified:false}]:[];
    row.legacy_links=row.brand_links.filter(x=>x.domain==='legacy.brand.example');
    // A manual review changes display/triage, not automatic contact-readiness.
    row.review={...row.review,brand:{...row.review.brand,status:r.brand,page_read:false,alias_scope_complete:false}};
   }
  }
  data.pages.forEach(row=>overlay(row,'article'));
  data.sites.forEach(site=>{
   overlay(site,'site');
   const own=site.manual_review&&!site.manual_review_stale?site.manual_review.brand:site.profile.brand_check?.status||'unknown';
   site.brand_status=site.articles.some(a=>a.brand_status==='present')||own==='present'?'present':own;
   site.legacy_links=site.articles.flatMap(a=>a.legacy_links);
  });
  data.removed_records=[...removals.values()].filter(r=>r.action==='remove').map(r=>({...r,row:(r.kind==='article'?data.articles:data.sites).find(x=>x.id===r.id)})).filter(r=>r.row);
  const removedPage=id=>removals.get('article:'+id)?.action==='remove';
  const removedSite=id=>removals.get('site:'+id)?.action==='remove';
  data.pages=data.pages.filter(p=>!removedPage(p.id));data.articles=data.articles.filter(p=>!removedPage(p.id));data.web_pages_all=data.web_pages_all.filter(p=>!removedPage(p.id));
  data.sites.forEach(s=>{s.articles=s.articles.filter(p=>!removedPage(p.id));});
  data.people.forEach(p=>{p.articles=p.articles.filter(a=>!removedPage(a.id));p.selection_articles=p.selection_articles.filter(a=>!removedPage(a.id));});
  data.web_pages=data.web_pages_all.filter(p=>p.brand_status!=='present');
  data.websites_all=data.sites.filter(s=>!s.dr_excluded&&!removedSite(s.id)&&(s.standalone||s.brand_status==='present'));
  data.websites=data.sites.filter(s=>!s.dr_excluded&&!removedSite(s.id)&&s.standalone&&s.brand_status!=='present');
  return data;
 }
 return {brands,normalize,read,store,apply};
});
