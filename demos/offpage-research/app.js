'use strict';
const M = OffpageModel;
const P = OffpagePresentation;
const outreach = P.statusStore(()=>window.localStorage,'portfolio-offpage-outreach-v1:'+location.pathname);
let snapshot = window.OFFPAGE_SNAPSHOT;
const mentionStorageKey='portfolio-offpage-mention-reviews-v1:'+location.pathname;
const mentionReviews=OffpageMentions.store(()=>window.localStorage,mentionStorageKey);
let data=OffpageMentions.apply(M.project(snapshot),mentionReviews.all());
const demo = true;
const tableSorts={};
const $ = id => document.getElementById(id);
const el = (tag, text, cls) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text ?? '—'; if (cls) n.className = cls; return n; };
const human = s => s ? s.replaceAll('_',' ') : 'Unknown';
const day = P.day;
function link(label, url) { const safe = M.safeUrl(url); if (!safe) return el('span', 'Unknown'); const a = el('a',label,'record-link'); a.href = safe; a.target = '_blank'; a.rel = 'noopener noreferrer'; if (demo) a.title = 'Fictional example URL'; return a; }
function record(kind, id, label) { const b = el('button',label,'record-button'); b.type='button'; b.addEventListener('click',()=>openRecord(kind,id)); return b; }
function pile(items) { const n = el('div',undefined,'cell-stack'); items.filter(x=>x!==null && x!==undefined).forEach(x => n.append(x instanceof Node ? x : el('span',x))); return n; }
function siteName(id) { return data.sites.find(s=>s.id===id)?.name || 'Unknown site'; }
function topicCell(topics){const box=el('div',undefined,'topic-tags');if(!topics?.length)return el('span','Not reviewed','muted');topics.forEach(t=>box.append(el('span',t,'topic-tag')));return box;}
function poiCell(row){return row.poi_refs?.length?pile(P.poiGroups(row.poi_refs).map(group=>{const box=el('div',undefined,'poi-place');box.append(el('div',group.location,'poi-location'),...group.names.map(name=>el('div',name,'poi-name')));return box;})):el('span','Not assigned','muted');}
function languages(value){const a=M.parse(value);return Array.isArray(a)&&a.length?a.map(P.language).join(' · '):'Unknown';}
function geographyCell(a){return pile([`Publisher: ${a.publisher_country||'Unknown'} · Page: ${a.language||'Unknown'}`,a.poi_refs?.length?poiCell(a):`Destination: ${[a.destination_city,a.destination_country].filter(Boolean).join(', ')||'Unknown'}`,a.poi&&!a.poi_refs?.length?`POI not resolved: ${a.poi}`:null]);}
function knownBadge(p) { return p.known_sites.length ? el('span','Site already in workspace','relationship-badge') : el('span','No earlier site record','muted'); }
function rowTitle(row){return row.title||row.display_name||row.name||row.hostname||row.id;}
function primaryCell(kind,row,label,url){
  const box=el('div',undefined,'primary-cell'),title=url?link(label,url):record(kind,row.id,label);
  title.classList.add('primary-title');title.title=label;
  const actions=el('div',undefined,'primary-actions');actions.append(record(kind,row.id,'Details'));
  if(kind==='article'&&row.brand_status==='present'){const badge=el('span','Brand mentioned','brand-mention');badge.title=row.legacy_links?.length?'Brand mention includes a legacy legacy.brand.example link':'Brand is already mentioned on this page';actions.append(badge);}
  if(kind==='article'&&row.brand_status==='unknown'){const badge=el('span','Brand check pending','brand-pending');badge.title='Brand presence or absence has not been fully verified. Open Details for the saved reason.';actions.append(badge);}
  if(kind==='article'||kind==='site'){const review=el('button','Review','record-button');review.type='button';review.setAttribute('aria-label','Review mentions for '+label);review.addEventListener('click',()=>openMentionReview(kind,row.id));actions.append(review);}
  box.append(title,actions);return box;
}
function openCell(column,row){
  $('detail-kind').textContent=demo?'Fictional example':column.label;
  $('detail-title').textContent=rowTitle(row);
  const content=el('section',undefined,'expanded-cell'),value=column.cell(row);
  content.append(el('h3',column.label),value instanceof Node?value:el('p',value));
  $('detail-body').replaceChildren(content);
  if(!$('detail').open)$('detail').showModal();else $('detail').scrollTop=0;
}
function measureCells(){
  document.querySelectorAll('.view:not([hidden]) .compact-cell').forEach(box=>{
    const preview=box.firstElementChild,more=box.lastElementChild;
    const childOverflow=[...preview.querySelectorAll('*')].some(item=>item.scrollWidth>item.clientWidth+1&&item.clientWidth>0);
    more.hidden=!childOverflow&&preview.scrollHeight<=preview.clientHeight+1&&preview.scrollWidth<=preview.clientWidth+1;
    const bounds=preview.getBoundingClientRect();
    preview.querySelectorAll('a,button').forEach(item=>{
      const rect=item.getBoundingClientRect();item.tabIndex=rect.bottom>bounds.bottom+1||rect.right>bounds.right+1?-1:0;
    });
  });
}
function statusCell(kind,row){
  const key=kind+':'+row.id,box=el('div',undefined,'status-cell'),select=el('select',undefined,'outreach-status');
  const current=demo?{status:'none'}:outreach.get(key);
  for(const [value,label] of P.statuses)select.add(new Option(label,value));
  select.value=current.status;select.dataset.status=current.status;select.dataset.record=key;
  select.setAttribute('aria-label','Outreach status for '+rowTitle(row));
  select.title=demo?'Fictional preview · status editing is disabled':`Manual status · saved in this browser${current.updated_at?' · Updated '+day(current.updated_at):''}`;
  select.disabled=demo;
  const error=el('span',demo?'':outreach.issue,'status-error');error.setAttribute('role','alert');
  select.addEventListener('change',()=>{
    try{
      const saved=outreach.set(key,select.value);
      document.querySelectorAll('.outreach-status').forEach(other=>{if(other.dataset.record===key){other.value=saved.status;other.dataset.status=saved.status;other.title='Manual status · saved in this browser · Updated '+day(saved.updated_at);}});
      error.textContent='';
      if(Object.values(tableSorts).some(sort=>sort.key==='status')){render();const scope=$('detail').open?$('detail'):document;[...scope.querySelectorAll('.outreach-status')].find(item=>item.dataset.record===key)?.focus({preventScroll:true});}
    }catch(e){select.value=select.dataset.status;error.textContent=e.message;}
  });
  box.append(select,error);return box;
}
function table(id, columns, rows, emptyText) {
  const host = $(id),scrollLeft=host.querySelector('.table-wrap')?.scrollLeft||0; host.replaceChildren();
  const selected=tableSorts[id],sortColumn=selected&&columns.find(c=>c.sortKey===selected.key);
  if(sortColumn)rows=P.sortRows(rows,sortColumn.sortValue,selected.direction);
  const labels = {'opportunities-table':'🎯 Opportunity queue','sites-table':'🌐 Websites','articles-table':'📰 Web pages','people-table':'👤 People directory','contacts-table':'📇 Contact directory','recent-table':'🕒 Article candidates','runs-table':'🗓️ Research runs','sources-table':'🗂️ Source files'};
  const top = el('div',undefined,'table-top'); top.append(el('h2',labels[id]||'Records'),el('span',`${rows.length} ${rows.length===1?'record':'records'}${demo?' · Fictional preview':''}`,'record-count')); top.setAttribute('role','status'); host.append(top);
  const wrap = el('div',undefined,'table-wrap'), t = el('table',undefined,'compact-table'), head=el('thead'), tr=el('tr');
  wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',(labels[id]||'Records')+' · scroll horizontally for more columns');
  const widths={'articles-table':[340,230,240,250,90,220,280,140,220,230,200,230],'sites-table':[300,250,230,210,90,280,150,320,340,200,160],'people-table':[280,280,280,260,380,220,140,200,230]};
  const sizes=widths[id]||columns.map(()=>240),cols=el('colgroup');sizes.forEach(width=>{const col=el('col');col.style.width=width+'px';cols.append(col);});t.style.width=sizes.reduce((a,b)=>a+b,0)+'px';t.append(cols);
  columns.forEach(c=>{
    const h=el('th');h.scope='col';
    if(c.sortKey){
      const active=selected?.key===c.sortKey,direction=active?selected.direction:null;
      h.setAttribute('aria-sort',direction==='asc'?'ascending':direction==='desc'?'descending':'none');
      const button=el('button',c.label+(direction==='asc'?' ↑':direction==='desc'?' ↓':' ↕'),'sort-button');button.type='button';button.dataset.sortKey=c.sortKey;
      button.title=c.sortHint||'Click to sort; click again to reverse';
      button.setAttribute('aria-label',`Sort by ${c.sortLabel||c.sortKey}${direction?' · '+(direction==='asc'?'ascending':'descending'):''}`);
      button.addEventListener('click',()=>{tableSorts[id]={key:c.sortKey,direction:active?(direction==='asc'?'desc':'asc'):(c.sortKey==='status'?'asc':'desc')};render();[...host.querySelectorAll('.sort-button')].find(b=>b.dataset.sortKey===c.sortKey)?.focus({preventScroll:true});});h.append(button);
    }else h.textContent=c.label;
    tr.append(h);
  });head.append(tr);t.append(head);
  const body=el('tbody'); rows.forEach(row=>{const tr=el('tr');columns.forEach((c,index)=>{
    const td=el('td'),value=c.cell(row),node=value instanceof Node?value:el('span',value??'—');
    if(index===0||c.compact===false)td.append(node);
    else{
      const box=el('div',undefined,'compact-cell'),preview=el('div',undefined,'cell-preview'),more=el('button','Details','cell-more');
      preview.append(node);more.type='button';more.hidden=true;more.setAttribute('aria-haspopup','dialog');more.setAttribute('aria-label','Show full '+c.label+' for '+rowTitle(row));more.addEventListener('click',()=>openCell(c,row));box.append(preview,more);td.append(box);
    }
    tr.append(td);
  });body.append(tr);});t.append(body);wrap.append(t);host.append(wrap);wrap.scrollLeft=scrollLeft;
  requestAnimationFrame(measureCells);
  if(!rows.length){const e=el('div',undefined,'empty');const icon=el('span','📭','empty-symbol');icon.setAttribute('aria-hidden','true');e.append(icon,el('h3',emptyText),el('p',data.sites.length?'No matching records in this snapshot.':'Add a record or load a saved research snapshot.'));host.append(e);}
}
function form(id){const f=Object.fromEntries(new FormData($(id)));for(const key of ['country','audience_country','destination_country','publisher_country','search_country'])if(f[key])f[key]=M.countryCode(f[key]).toUpperCase();for(const key of ['language','query_language'])if(f[key])f[key]=M.languageCode(f[key]);if(f.performance_market)f.performance_market=f.performance_market.toLowerCase()==='global'?'GLOBAL':M.countryCode(f.performance_market).toUpperCase();return f;}
function recentPlan(){const f=form('recent-filters'),months=document.querySelector('[name="lookback_months"]');return {...f,date_filter_enabled:months.value!==''||months.validity.badInput,date_basis:'modified_or_published',lookback_months:months.value===''?null:Number(months.value),performance_filter_enabled:f.performance_required==='on',min_traffic:f.min_traffic===''?NaN:Number(f.min_traffic),performance_market:f.performance_market.trim().toUpperCase(),performance_max_age_days:45};}
function manualStatusOrder(kind,row){const status=demo?'none':outreach.get(kind+':'+row.id).status;return P.statuses.findIndex(([value])=>value===status);}
function languageCell(r){const n=el('span',r.language?P.language(r.language):languages(r.languages_json),'language-label');n.title='Content language; flag is a language label, not verified audience geography';return n;}
function contactCell(routes){return routes?.length?pile(routes.map(c=>pile([record('contact',c.id,c.value),`${human(c.contact_kind)} · ${human(c.channel)}`,el('span',`Found ${day(c.first_found_at)} · ${human(c.publication_status)}`,'muted')]))):el('span','Contact not found','muted');}
function drCell(site){if(site?.dr===null||site?.dr===undefined)return el('span','—','muted');const n=el('span',String(site.dr),'dr-badge dr-'+P.drBand(site.dr));n.title=`Ahrefs DR · ${day(site.dr_proof?.observed_at)} · Domain: ${site.hostname}${site.dr_status==='stale'?' · Needs refresh':''}`;if(site.dr_status==='stale'){n.append(el('span',' ◷','dr-stale'));n.setAttribute('aria-label',`${site.dr} · Needs refresh`);}return n;}
function competitorCell(a){
  if(a.competitor_status==='no'){const n=el('span','No competitors');n.title='No competitor found within the completed check scope';return n;}
  if(a.competitor_status!=='yes'){const n=el('span','Not checked','muted');n.title='Competitor check not completed';return n;}
  const brands=[...(a.competitor_links||[])].sort((a,b)=>Number(P.isExampleGroup(b.name))-Number(P.isExampleGroup(a.name)));
  return brands.length?pile(brands.map(c=>{const n=c.url?link(c.name,c.url):el('span',c.name);if(!c.url)n.title='Mention found; link not verified';if(P.isExampleGroup(c.name)){n.classList.add('examplegroup-badge');n.title='ExampleGroup mention · part of the Brand group'+(!c.url?' · Link not verified':'');}return n;})):el('span','Name unavailable','muted');
}
function dateCell(a){return pile([`Published ${day(a.review.dates?.published?.value||a.published_at)}`,`Updated ${day(a.review.dates?.modified?.value||a.modified_at)}`]);}
function recordDatesColumn(){return {
  label:'🗓️ Added / updated',sortKey:'record_dates',sortLabel:'Added / updated',
  sortValue:r=>P.dateValue(r.updated_at)||P.dateValue(r.created_at),
  sortHint:'Last saved record update or manual mention review; first addition if no update is recorded. These are workspace dates, not article dates.',
  cell:r=>{const box=pile([`Added ${day(r.created_at)}`,`Updated ${day(r.updated_at)}`]);box.title='First added to this workspace / last record update or manual mention review. Manual reviews are saved in this browser. Outreach status edits are separate.';return box;}
};}
function render(){
  const plan=recentPlan();
  let rows=M.filterRows(M.brandVisibility(data.web_pages_all,plan.brand),plan,a=>[a.title,a.topic,...a.topics,siteName(a.site_id)].join(' ')).filter(a=>OffpagePageTypes.matches(a,plan.page_type,window.OFFPAGE_PAGE_TYPES)&&(!plan.site||a.site_id===plan.site)&&(!plan.competitor||a.competitor_status===plan.competitor)&&(!plan.status||a.working.some(o=>o.workflow_status===plan.status)||(!a.working.length&&plan.status==='needs_verification'))&&M.geographicMatch(a,plan,data.poi_catalog));
  if(plan.date_filter_enabled)rows=rows.filter(a=>P.inDateWindow(a,M.cutoff(plan.as_of,plan.lookback_months),plan.as_of));
  if(plan.performance_filter_enabled)rows=rows.filter(a=>M.qualify(a,{...plan,date_filter_enabled:false},data.sources).qualified);
  rows=P.examplegroupFirst(rows);
  const excluded=data.articles.filter(a=>a.brand_status==='present').length,unknown=rows.filter(a=>a.brand_status==='unknown').length;
  const summary=$('research-summary');
  summary.replaceChildren(document.createTextNode(plan.brand==='all'?'Including existing Brand coverage':plan.brand==='legacy'?'Legacy Brand links':plan.brand==='unknown'?'Showing pages needing a Brand check':excluded+' pages with Brand hidden'));
  if(unknown){
    const check=el('button',`${unknown} need a Brand check`,'brand-check-filter');check.type='button';
    check.title='Show pages needing a Brand check within the current filters';
    check.addEventListener('click',()=>{document.querySelector('#recent-filters [name="brand"]').value='unknown';$('advanced-filters').hidden=false;$('more-filters-toggle').setAttribute('aria-expanded','true');render();document.querySelector('#recent-filters [name="brand"]').focus({preventScroll:true});});
    summary.append(document.createTextNode(' · '),check);
  }
  summary.append(document.createTextNode(`${plan.date_filter_enabled?(M.cutoff(plan.as_of,plan.lookback_months)?` · Updated since ${day(M.cutoff(plan.as_of,plan.lookback_months))} · publication used if no update`:' · Enter a whole number of months from 1 to 120'):''}${plan.poi?' · POI: '+M.resolvePoi(plan.poi,data.poi_catalog,plan).status:''}`));
  if(mentionReviews.issue)summary.append(el('span',' · '+mentionReviews.issue,'mention-error'));
  table('articles-table',[
    {label:'📰 Page title',cell:a=>primaryCell('article',a,a.title||a.original_url,a.original_url)},
    {label:'🏷️ Page type',cell:a=>pile(OffpagePageTypes.labels(a,window.OFFPAGE_PAGE_TYPES))},
    {label:'📍 POI',cell:poiCell},
    {label:'🌐 Website',cell:a=>{const site=data.sites.find(s=>s.id===a.site_id);return link(site?.hostname||siteName(a.site_id),site?'https://'+site.hostname:null);}},
    {label:'DR',sortKey:'dr',sortLabel:'DR',sortValue:a=>data.sites.find(s=>s.id===a.site_id)?.dr,compact:false,cell:a=>drCell(data.sites.find(s=>s.id===a.site_id))},
    {label:'👤 Journalist',cell:a=>a.author_ids.length?pile(a.author_ids.map(id=>record('person',id,data.people.find(p=>p.id===id)?.display_name||id))):'Not identified'},
    {label:'📇 Contact',cell:a=>contactCell(a.contact_routes)},
    {label:'🗣️ Language',cell:languageCell},
    {label:'🗓️ Dates',sortKey:'dates',sortLabel:'Dates',sortValue:P.articleDate,sortHint:'Last modification; publication if no modification is recorded. Missing dates stay last.',cell:dateCell},
    {label:'🏷️ Competitor',cell:competitorCell},
    {label:'📋 Status',sortKey:'status',sortLabel:'Status',sortValue:a=>manualStatusOrder('article',a),sortHint:'No action → Contacted → No reply → Rejected → Accepted. Click again to reverse.',compact:false,cell:a=>statusCell('article',a)},
    recordDatesColumn()
  ],rows,'No web pages saved yet.');
  let f=form('sites-filters');rows=M.filterRows(M.brandVisibility(data.websites_all,f.brand),f,s=>[s.name,s.hostname,s.topic,s.profile.selection_reason].join(' ')).filter(s=>M.publicationMatch(s,f)&&(!f.destination_country||M.siteDestinationCountries(s,data.poi_catalog).some(c=>M.countryCode(c)===M.countryCode(f.destination_country)))&&(!f.country||M.countryCode(s.country)===M.countryCode(f.country))&&(!f.relationship||(f.relationship==='has_pages'?s.articles.length>0:s.articles.length===0)));
  table('sites-table',[
    {label:'🌐 Website',cell:s=>primaryCell('site',s,s.hostname,'https://'+s.hostname)},
    {label:'🗞️ Type / content',cell:s=>pile([M.publicationTypes[s.publication_type],s.content_formats.length?s.content_formats.map(x=>M.contentFormats[x]).join(' · '):'Content not classified'])},
    {label:'🌍 POI country',cell:s=>{const countries=M.siteDestinationCountries(s,data.poi_catalog);return countries.length?pile(countries.map(code=>M.countryOptions.find(c=>c.code===code).flagged_label)):'Not assigned';}},
    {label:'🏷️ Topics',cell:s=>topicCell(s.topics)},
    {label:'DR',sortKey:'dr',sortLabel:'DR',sortValue:s=>s.dr,compact:false,cell:drCell},
    {label:'📇 Editorial contact',cell:s=>contactCell(s.general_contacts)},
    {label:'🗣️ Language',cell:languageCell},
    {label:'💡 Why selected',cell:s=>pile([s.profile.selection_reason||s.standalone_opportunities.map(o=>o.why_contact).join('; ')||'Existing Brand coverage',s.legacy_links.length?el('span','Legacy link · review update','relationship-badge'):null])},
    {label:'🔗 Saved web pages',cell:s=>s.articles.length?pile(s.articles.map(a=>record('article',a.id,a.title))):'No saved web pages'},
    {label:'📋 Status',sortKey:'status',sortLabel:'Status',sortValue:s=>manualStatusOrder('site',s),sortHint:'No action → Contacted → No reply → Rejected → Accepted. Click again to reverse.',compact:false,cell:s=>statusCell('site',s)},
    {label:'🗓️ Updated',sortKey:'dates',sortLabel:'Updated',sortValue:s=>P.dateValue(s.updated_at||s.created_at),sortHint:'Last update to this saved record; added date if never updated.',cell:s=>day(s.updated_at||s.created_at)}
  ],rows,'No independently selected websites yet.');
  f=form('people-filters');rows=M.filterRows(data.people,f,p=>[p.display_name,p.role,JSON.stringify(p.beats),p.selection_reason,...p.associations.map(x=>x.site.name)].join(' ')).filter(p=>(!f.site||p.associations.some(x=>x.site.id===f.site))&&(!f.known||p.known_sites.length)&&(!f.affiliations||(f.affiliations==='one'?p.current_sites.length===1:p.current_sites.length>1)));
  table('people-table',[
    {label:'👤 Person',cell:p=>primaryCell('person',p,p.display_name)},
    {label:'📇 Contact',cell:p=>contactCell(data.contacts.filter(c=>c.people.some(x=>x.id===p.id)&&c.publication_status!=='removed'))},
    {label:'🌐 Writes for',cell:p=>pile([...p.associations.map(x=>record('site',x.site.id,x.site.name+(x.affiliation.valid_to?' · Former':''))),knownBadge(p)])},
    {label:'🏷️ Topics',cell:p=>Array.isArray(p.beats)&&p.beats.length?p.beats.join(', '):'Topics not verified'},
    {label:'💡 Why this person',cell:p=>pile([p.selection_reason||'Selection reason needs review',...p.selection_articles.map(a=>record('article',a.id,a.title))])},
    {label:'🗓️ Found / verified',sortKey:'dates',sortLabel:'Dates',sortValue:p=>P.dateValue(p.verified_at)||P.dateValue(p.first_found_at),sortHint:'Last verification; first observation if no verification is recorded.',cell:p=>pile([day(p.first_found_at),day(p.verified_at)])},
    {label:'🗣️ Language',cell:languageCell},
    {label:'📋 Status',sortKey:'status',sortLabel:'Status',sortValue:p=>manualStatusOrder('person',p),sortHint:'No action → Contacted → No reply → Rejected → Accepted. Click again to reverse.',compact:false,cell:p=>statusCell('person',p)},
    recordDatesColumn()
  ],rows,'No people saved yet.');
}
function performanceCell(a){const p=a.review.performance;return p?pile([Number.isFinite(p.value)?`${p.value.toLocaleString()} estimated visits/month`:'Unknown',`${p.provider||'Unknown provider'} · ${p.market||'Unknown market'}`,`Checked ${day(p.observed_at)}`]):'No page-level evidence';}
function addDetailSection(body,title,pairs){
  const meaningful=pairs.filter(([,value])=>{
    const text=value instanceof Node?value.textContent:String(value??'');
    return text.trim()&&!['unknown','—','not selected'].includes(text.trim().toLowerCase());
  });
  if(meaningful.length){const block=section(title,meaningful);block.classList.add('detail-supplement');body.append(block);}
}
function sourceLinks(entries){
  const grouped=new Map();
  for(const [label,url] of entries){const safe=M.safeUrl(url);if(!safe)continue;if(!grouped.has(safe))grouped.set(safe,new Set());grouped.get(safe).add(label);}
  return pile([...grouped].map(([url,labels])=>link([...labels].join(' · ')+' ↗',url)));
}
function discoveryNotes(body,row){
  const origins=row.discovery_origins||[];
  const notes=origins.map(o=>{
    const block=el('div',undefined,'discovery-origin');
    block.append(el('strong',o.label));
    if(o.channel)block.append(el('span',o.channel,'muted'));
    if(o.query)block.append(el('p',`Query: ${o.query}`));
    if(o.seed_url)block.append(link('Competitor / related-brand starting page ↗',o.seed_url));
    if(o.target_scope)block.append(el('span',`Target scope: ${o.target_scope}`,'muted'));
    if(o.notes)block.append(el('p',o.notes));
    const run=data.runs.find(r=>r.id===o.run_id);
    if(run)block.append(record('run',run.id,runLabel(run)));
    block.append(record('source',o.source_id,'Discovery evidence'));
    if(o.report_url)block.append(link('Open discovery report ↗',o.report_url));
    return block;
  });
  addDetailSection(body,'Discovery',[['Found via',origins.length?pile(notes):'Not recorded — the discovery method has not been established.']]);
}
function section(title, pairs){const icons={'Publication':'🌐','Articles & people':'📰','Shared working history':'🗓️','Person & evidence':'👤','Publications & contact routes':'📇','Professional route':'📇','Article & publication':'📰','Qualification & useful addition':'✅','Proof links':'🔗','Research criteria':'🔎','Working record':'🎯'};const s=el('section');s.append(el('h3',(icons[title]||'📋')+' '+title));const dl=el('dl');pairs.forEach(([key,value])=>{dl.append(el('dt',key));const dd=el('dd');dd.append(value instanceof Node?value:document.createTextNode(value??'Unknown'));dl.append(dd);});s.append(dl);return s;}
function runLabel(run){const p=M.parse(run.plan_json)||{};const cities=(p.destinations||[]).map(d=>d.city).filter(Boolean);return `${cities.join(', ')||'Saved search'} · ${day(run.started_at)}`;}
function sourceProvider(provider){return ({web_search:'Web search',public_web:'Articles & websites',web_extract:'Page extracts',local_history:'Local history',poi_catalog:'Places', 'British Museum via web search':'British Museum'})[provider]||provider||'Other sources';}
function mentionControls(body,kind,row){
 const controls=el('div',undefined,'mention-actions'),button=el('button',row.manual_review?'Edit mention review':'Review mentions','text-button');button.type='button';button.addEventListener('click',()=>openMentionReview(kind,row.id));controls.append(button);
 if(row.manual_review){const r=row.manual_review;controls.append(el('span',`Manual review · ${day(r.checked_on)}${r.reviewer?' · '+r.reviewer:''}`,'muted'));body.append(controls);
  addDetailSection(body,'Manual check',[
   ['Review status',row.manual_review_stale?'Newer research exists; manual override is paused until reconfirmed.':'Applied in this browser. Original research is preserved.'],
   ['Checked pages',pile(r.checked_urls.map(url=>link('Open checked page ↗',url)))],['Notes',r.notes]
  ]);
 }else body.append(controls);
}
function openRecord(kind,id){
  const body=$('detail-body');body.replaceChildren();$('detail-kind').textContent=demo?'Fictional record':human(kind)+' detail';let r;
  if(kind==='sources'){
    $('detail-kind').textContent='Research';
    $('detail-title').textContent='Research history';
    const runs=el('section',undefined,'research-history');runs.append(el('h3','Saved searches'));
    if(!data.runs.length)runs.append(el('p','No searches saved yet.','muted'));
    for(const run of [...data.runs].sort((a,b)=>(b.started_at||'').localeCompare(a.started_at||''))){
      const item=el('div',undefined,'research-entry');
      item.append(record('run',run.id,runLabel(run)),el('span',human(run.status),'muted'));runs.append(item);
    }
    body.append(runs);
    const sources=el('section',undefined,'research-history');sources.append(el('h3',`Sources · ${data.sources.length}`),el('p','Open a group to browse the saved evidence.','muted'));
    const groups=new Map();
    for(const source of data.sources){const label=sourceProvider(source.provider);if(!groups.has(label))groups.set(label,[]);groups.get(label).push(source);}
    for(const [label,items] of [...groups].sort((a,b)=>b[1].length-a[1].length)){
      const group=el('details',undefined,'source-group');group.append(el('summary',`${label} · ${items.length}`));
      for(const source of items){const item=el('div',undefined,'research-entry');item.append(record('source',source.id,source.report||label),el('span',day(source.extracted_at),'muted'));group.append(item);}
      sources.append(group);
    }
    body.append(sources);
    if(data.removed_records?.length){
      const removed=el('section',undefined,'research-history');removed.append(el('h3',`Removed records · ${data.removed_records.length}`));
      for(const item of data.removed_records){const entry=el('div',undefined,'research-entry'),restore=el('button','Restore row','text-button');restore.type='button';restore.setAttribute('aria-label','Restore '+rowTitle(item.row));const error=el('span',undefined,'mention-error');error.setAttribute('role','alert');restore.addEventListener('click',()=>{try{mentionReviews.save({kind:item.kind,id:item.id,action:'undelete'});loadSnapshot(snapshot);openRecord('sources',null);}catch(e){error.textContent=e.message;}});entry.append(el('strong',rowTitle(item.row)),el('span',`${human(item.kind)} · Removed ${day(item.saved_at)}`,'muted'),restore,error);removed.append(entry);}body.append(removed);
    }

  } else if(kind==='source'){
    r=data.sources.find(x=>x.id===id);if(!r)return;
    $('detail-kind').textContent='Source';$('detail-title').textContent=r.report||sourceProvider(r.provider);
    body.append(record('sources',null,'← Research history'));
    addDetailSection(body,'Source information',[
      ['Provider',sourceProvider(r.provider)],['Saved on',day(r.extracted_at)],
      [M.safeUrl(r.locator)?'Original source':'Saved file',M.safeUrl(r.locator)?link('Open source ↗',r.locator):r.locator],
      ['Coverage notes',r.limitations]
    ]);
  } else if(kind==='site'){
    r=data.sites.find(s=>s.id===id);if(!r)return;$('detail-title').textContent=r.name;
    mentionControls(body,'site',r);
    discoveryNotes(body,r);
    addDetailSection(body,'Editorial notes',[
      ['Contact considerations',r.profile.contact_limits],['Classification evidence',r.classification?.classification_reason]
    ]);
    addDetailSection(body,'Related records',[
      ['Saved articles',pile(r.articles.map(a=>record('article',a.id,a.title)))],
      ['People',pile(r.person_ids.map(id=>record('person',id,data.people.find(p=>p.id===id)?.display_name||id)))]
    ]);
    addDetailSection(body,'Recorded activity',r.history.map(a=>[day(a.occurred_at),pile([human(a.activity_type),a.note])]));
    addDetailSection(body,'Sources',[
      ['Evidence',sourceLinks([
        ['Publication research',r.profile.proof?.locator],['Publication classification',r.classification?.proof?.locator],['Ahrefs measurement',r.dr_proof?.locator],
        ...(r.profile.competitor_check?.checked_urls||[]).map(url=>['Inspected page',url])
      ])]
    ]);
  } else if(kind==='person'){
    r=data.people.find(p=>p.id===id);if(!r)return;$('detail-title').textContent=r.display_name;
    discoveryNotes(body,r);
    addDetailSection(body,'Professional background',[
      ['Role',r.role],['Profile',link('Open professional profile ↗',r.profile_url)]
    ]);
    const selected=new Set(r.selection_articles.map(a=>a.id));
    addDetailSection(body,'Further work',[
      ['Additional articles',pile(r.articles.filter(a=>!selected.has(a.id)).map(a=>record('article',a.id,a.title)))]
    ]);
  } else if(kind==='contact'){
    r=data.contacts.find(c=>c.id===id);if(!r)return;$('detail-title').textContent=r.value;
    addDetailSection(body,'Contact verification',[
      ['Source',link('Open published contact evidence ↗',r.source?.locator)],
      ['Last verified',day(r.verified_at)],['Check again by',day(r.valid_until)],
      ['Deliverability',human(r.deliverability_status)]
    ]);
    addDetailSection(body,'Associated records',[
      ['People',pile(r.people.map(p=>record('person',p.id,p.display_name)))],
      ['Publications',pile(r.sites.map(s=>record('site',s.id,s.name)))]
    ]);
  } else if(kind==='article'){
    r=data.articles.find(a=>a.id===id);if(!r)return;$('detail-title').textContent=r.title;
    mentionControls(body,'article',r);
    discoveryNotes(body,r);
    const specificTopics=P.editorialTopics(r,data.poi_catalog).filter(t=>!['luggage logistics','visitor planning'].includes(t.trim().toLowerCase())&&!OffpagePageTypes.options.some(([,label])=>label.toLowerCase()===t.trim().toLowerCase()));
    addDetailSection(body,'Content context',[['Classification rationale',OffpagePageTypes.info(r,window.OFFPAGE_PAGE_TYPES).reason],['Specific topics',specificTopics.length?topicCell(specificTopics):null]]);
    const ed=r.review.editorial||{};
    if(r.brand_status==='unknown')addDetailSection(body,'Brand verification',[
      ['Why pending',r.manual_review&&!r.manual_review_stale?(r.manual_review.notes||'The manual reviewer left this check incomplete.'):ed.limitations||'A complete check of the current article text and links has not been recorded.'],
      ['Last recorded attempt',day(r.manual_review&&!r.manual_review_stale?r.manual_review.checked_on:r.review.brand?.checked_at)],
      ['To resolve','Read the current page and inspect its text and outbound links for Brand, brand.example and legacy.brand.example. Save new evidence before marking presence or absence as verified.']
    ]);
    addDetailSection(body,'Editorial opportunity',[
      ['Reader need',ed.reader_need],['Why Brand helps',ed.why_brand],
      ['Suggested section',ed.insertion_section],['Proposed addition',ed.proposed_addition],
      ['Brand destination',link('Open proposed Brand page ↗',ed.target_url)]
    ]);
    if(r.brand_links.length)addDetailSection(body,'Existing Brand links',r.brand_links.map(b=>[
      b.domain,pile([
        link('Open linked destination ↗',b.target_url),
        b.domain==='legacy.brand.example'?'Legacy link: review an equivalent brand.example destination':null,
        b.replacement_verified?link('Open verified replacement ↗',b.replacement_url):null
      ])
    ]));
    if(Number.isFinite(r.review.performance?.value))addDetailSection(body,'Page performance',[
      ['Ahrefs estimate',performanceCell(r)]
    ]);
    addDetailSection(body,'Sources',[
      ['Evidence',sourceLinks([
        ['Inspected article',r.review.brand?.locator||r.original_url],
        ['Publication date',r.review.dates?.published?.locator],
        ['Update date',r.review.dates?.modified?.locator],
        ['Performance',r.review.performance?.locator],
        ['Editorial assessment',ed.locator]
      ])]
    ]);
  } else if(kind==='run'){
    r=data.runs.find(x=>x.id===id);if(!r)return;const p=M.parse(r.plan_json)||{};
    $('detail-kind').textContent='Saved search';$('detail-title').textContent=runLabel(r);
    body.append(record('sources',null,'← Research history'));
    const poiIds=p.poi_scope?.selected_poi_ids||[];
    const pois=poiIds.map(id=>data.poi_catalog.find(poi=>poi.id===id)).filter(Boolean);
    addDetailSection(body,'Search scope',[
      ['Status',human(r.status)],['Completed',r.completed_at?day(r.completed_at):null],
      ['Places',pois.length?poiCell({poi_refs:pois}):p.poi_scope?.query],
      ['Surrounding areas',p.poi_scope?.include_surrounding_area?p.poi_scope.area_definition:null],
      ['Focus',p.focus],['Search languages',p.query_languages?.length?p.query_languages.map(P.language).join(' · '):null],
      ['Publication dates',p.recent_articles?.enabled?'Date window applied':'All dates']
    ]);
    const labels={four_poi_destinations:'Brand pages',ahrefs_dr:'Domain ratings',legacy_redirects:'Legacy links',source_coverage:'Search coverage',local_dashboard:'Dashboard'};
    addDetailSection(body,'Checks completed',Object.entries(p.completed_checks||{}).map(([key,value])=>[labels[key]||human(key),value]));
    if(p.outstanding_evidence?.length)addDetailSection(body,'Still to verify',[['Missing evidence',pile(p.outstanding_evidence)]]);
    if(!p.completed_checks)addDetailSection(body,'Research notes',[['Summary',r.summary]]);
  } else {
    r=data.opportunities.find(o=>o.id===id);$('detail-title').textContent=r?.title||'Opportunity detail layout';
    body.append(section('Working record',[['Status',human(r?.workflow_status)],['Country / language / POI',r?geographyCell(r):'Not selected'],['Reader need',r?.reader_need],['Contribution',r?.contribution],['Why this contact',r?.why_contact],['Article',r?.primary_page_id?record('article',r.primary_page_id,'Open linked article'):'Not selected'],['Publication',r?record('site',r.site_id,siteName(r.site_id)):'Not selected'],['Target page',link('Open brand.example target ↗',data.pages.find(p=>p.id===r?.target_page_id)?.original_url)],['Local service',r?.service_reason],['History',human(r?.history_status)],['Priority / reason',r?`${human(r.priority)} · ${r.priority_reason}`:'Not scored'],['Owner / next action',r?`${r.owner||'Unassigned'} / ${r.next_action||'Not set'}`:'Not set']]));
  }
  if(!body.children.length)body.append(el('p','No additional details recorded.','muted'));
  if(!$('detail').open)$('detail').showModal();else $('detail').scrollTop=0;
}
// These two linked pickers use explicit suggestions so filtering is consistent across browsers.
const suggestionText=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
const poiCountryInput=document.querySelector('#recent-filters [name="destination_country"]');
const poiInput=document.querySelector('#recent-filters [name="poi"]');
function selectedPoiCountry(){return M.countryOptions.find(c=>M.countryCode(poiCountryInput.value)===c.code.toLowerCase())?.code||'';}
function searchPicker(input,id,choices){
  input.setAttribute('aria-label',input.parentElement.firstChild.textContent.trim());input.removeAttribute('list');input.autocomplete='off';input.setAttribute('role','combobox');input.setAttribute('aria-autocomplete','list');input.setAttribute('aria-controls',id);input.setAttribute('aria-expanded','false');
  const host=el('div',undefined,'suggestion-host'),menu=el('div',undefined,'suggestion-menu');menu.id=id;menu.setAttribute('role','listbox');menu.setAttribute('aria-label',input.parentElement.firstChild.textContent.trim()+' suggestions');menu.hidden=true;
  input.parentElement.append(host);host.append(input,menu);
  let active=-1,items=[];
  function close(){menu.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');active=-1;}
  function choose(item){input.value=item.value;close();input.dispatchEvent(new Event('input',{bubbles:true}));close();}
  function update(){
    items=choices();active=-1;menu.replaceChildren();input.removeAttribute('aria-activedescendant');
    items.forEach((item,index)=>{const option=el('button',item.label,'suggestion-option');option.type='button';option.id=id+'-'+index;option.tabIndex=-1;option.setAttribute('role','option');option.setAttribute('aria-selected','false');option.addEventListener('pointerdown',e=>e.preventDefault());option.addEventListener('click',()=>choose(item));menu.append(option);});
    if(!items.length)menu.append(el('div','No matches','suggestion-empty'));
    menu.hidden=false;input.setAttribute('aria-expanded','true');
  }
  input.addEventListener('focus',update);input.addEventListener('input',update);
  input.addEventListener('blur',close);
  input.addEventListener('keydown',e=>{
    if(e.key==='Escape'){close();e.preventDefault();return;}
    if(e.key==='Tab'){close();return;}
    if(e.key==='Enter'&&!menu.hidden){e.preventDefault();if(active>=0)choose(items[active]);return;}
    if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;
    e.preventDefault();if(menu.hidden)update();if(!items.length)return;
    active=(active+(e.key==='ArrowDown'?1:active<0?0:-1)+items.length)%items.length;
    [...menu.children].forEach((option,index)=>option.setAttribute('aria-selected',String(index===active)));
    input.setAttribute('aria-activedescendant',menu.children[active].id);menu.children[active].scrollIntoView({block:'nearest'});
  });
  document.addEventListener('pointerdown',e=>{if(!host.contains(e.target))close();});input.form.addEventListener('reset',close);
}
poiCountryInput.addEventListener('input',()=>{
  const country=selectedPoiCountry(),chosen=M.resolvePoi(poiInput.value,data.poi_catalog);
  if(country&&chosen.matches.length&&!chosen.matches.some(p=>M.countryCode(p.country)===country.toLowerCase()))poiInput.value='';
});
function countrySuggestions(input){
  const query=suggestionText(input.value);
  return M.countryOptions.filter(c=>[c.name,c.local_name,c.code,c.flagged_label,...(c.code==='GB'?['UK']:c.code==='US'?['USA']:[])].some(v=>suggestionText(v).includes(query))).map(c=>({value:c.flagged_label,label:c.flagged_label}));
}
searchPicker(poiCountryInput,'poi-country-suggestions',()=>countrySuggestions(poiCountryInput));
const siteCountryInput=document.querySelector('#sites-filters [name="destination_country"]');
searchPicker(siteCountryInput,'site-poi-country-suggestions',()=>countrySuggestions(siteCountryInput));
searchPicker(poiInput,'poi-place-suggestions',()=>{
  const country=selectedPoiCountry(),query=suggestionText(poiInput.value);
  return data.poi_catalog.filter(p=>(!country||M.countryCode(p.country)===country.toLowerCase())&&[p.name,p.city,M.poiLabel(p),...(p.aliases||[])].some(v=>suggestionText(v).includes(query))).map(p=>({value:M.poiLabel(p),label:M.poiLabel(p)}));
});
function loadSnapshot(next){snapshot=next;data=OffpageMentions.apply(M.project(snapshot),mentionReviews.all());
$('workspace-state').textContent=demo?'Fictional preview only':`Local snapshot · ${data.articles.length} saved pages`;
for(const [id,options] of [['country-options',M.countryOptions],['language-options',M.languageOptions]]){$(id).replaceChildren();for(const item of options){const o=new Option(item.local_name,item.flagged_label||item.label);$(id).append(o);}}
$('city-options').replaceChildren();[...new Set([...data.poi_catalog.map(p=>p.city),...data.articles.map(p=>p.destination_city)].filter(Boolean))].sort().forEach(city=>$('city-options').append(new Option(city,city)));
$('poi-options').replaceChildren();data.poi_catalog.forEach(p=>{const option=document.createElement('option');option.value=M.poiLabel(p);option.label=p.id;$('poi-options').append(option);});document.querySelectorAll('.site-select').forEach(s=>{s.replaceChildren(new Option('All sites',''));data.sites.forEach(site=>s.add(new Option(site.name,site.id)));});document.querySelectorAll('.source-select').forEach(s=>{s.replaceChildren(new Option('All sources',''));data.sources.forEach(source=>s.add(new Option(source.provider,source.id)));});render();}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-view]').forEach(tab=>{tab.classList.toggle('active',tab===button);if(tab===button)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');});
  document.querySelectorAll('.view').forEach(v=>v.hidden=v.id!==button.dataset.view+'-view');
  $('current-section').textContent=$(`${button.dataset.view}-view`).querySelector('h1').textContent;
  requestAnimationFrame(measureCells);
}));
window.addEventListener('resize',()=>requestAnimationFrame(measureCells));
document.fonts.ready.then(measureCells);
window.addEventListener('storage',event=>{if(event.key===null||event.key==='portfolio-offpage-outreach-v1:'+location.pathname||event.key===mentionStorageKey){loadSnapshot(snapshot);if($('detail').open)$('detail').close();}});
document.querySelectorAll('form.filters').forEach(f=>{f.addEventListener('input',render);f.addEventListener('change',render);f.addEventListener('submit',e=>e.preventDefault());f.addEventListener('reset',()=>{delete tableSorts[({'recent-filters':'articles-table','sites-filters':'sites-table','people-filters':'people-table'})[f.id]];setTimeout(render,0);});});
$('more-filters-toggle').addEventListener('click',()=>{const panel=$('advanced-filters');panel.hidden=!panel.hidden;$('more-filters-toggle').setAttribute('aria-expanded',String(!panel.hidden));});
$('recent-filters').addEventListener('reset',()=>{$('advanced-filters').hidden=true;$('more-filters-toggle').setAttribute('aria-expanded','false');});
$('sources-open').addEventListener('click',()=>openRecord('sources',null));
const asOf=document.querySelector('[name="as_of"]');asOf.value=new Date().toISOString().slice(0,10);asOf.defaultValue=asOf.value;
$('detail-close').addEventListener('click',()=>$('detail').close());
// Close only when the pointer starts and ends outside the panel; selecting text
// inside and releasing over the backdrop must not dismiss the record.
const detailDialog=$('detail');let detailPointerOutside=false;
function outsideDetails(event){const bounds=detailDialog.getBoundingClientRect();return event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom;}
detailDialog.addEventListener('pointerdown',event=>{detailPointerOutside=event.isPrimary&&event.button===0&&event.target===detailDialog&&outsideDetails(event);});
detailDialog.addEventListener('click',event=>{if(detailPointerOutside&&event.target===detailDialog&&outsideDetails(event))detailDialog.close();detailPointerOutside=false;});
detailDialog.addEventListener('pointercancel',()=>{detailPointerOutside=false;});
detailDialog.addEventListener('close',()=>{detailPointerOutside=false;});
$('save-brief').addEventListener('click',()=>{
  const p=recentPlan();const payload={schema_version:1,mode:'design',research_authorized:false,is_demo:demo,start_gate:{required:['city','poi'],status:!p.destination_city||!p.poi?'awaiting_city_or_poi':M.resolvePoi(p.poi,data.poi_catalog,p).status==='ambiguous'?'needs_poi_clarification':'inputs_provided_for_scope_review'},defaults:{languages:'worldwide_unrestricted',audience:'worldwide_unrestricted',focus:'generic_editorial',quantity:'quality_led'},gsc:{enabled:false,requires_explicit_request:true},selection_policy:{min_publisher_dr:M.MIN_PUBLISHER_DR,min_publisher_dr_by_pathway:{editorial:M.MIN_PUBLISHER_DR,competitor_backlinks:M.MIN_PUBLISHER_DR,competitor_referring_domains:M.MIN_PUBLISHER_DR}},domain_enrichment:{dr_required_field:true,automatic_after_discovery:true,additional_approval_required:false},search_country:p.search_country||null,query_language:p.query_language||null,publisher_countries:M.tokens(p.publisher_country).map(c=>M.countryCode(c).toUpperCase()),page_languages:M.tokens(p.language),audience_countries:M.tokens(p.audience_country).map(c=>M.countryCode(c).toUpperCase()),poi_scope:{input_mode:p.poi?'prompt':'none',query:p.poi||null,selected_poi_ids:M.resolvePoi(p.poi,data.poi_catalog,p).status==='resolved'?M.resolvePoi(p.poi,data.poi_catalog,p).matches.map(x=>x.id):[],resolution_status:M.resolvePoi(p.poi,data.poi_catalog,p).status,catalog_source_ids:[...new Set(data.poi_catalog.map(x=>x.source_id))]},destinations:p.destination_city||p.destination_country?[{country:p.destination_country||null,city:p.destination_city||null}]:[],topic_focus:p.search||null,page_type:p.page_type||null,research_tracks:p.page_type&&p.page_type!=='unclassified'?[(p.page_type==='activities'||p.page_type==='events')?'activities_events':p.page_type]:[],backlink_target_domains:['brand.example'],brand_visibility:p.brand||'hide',legacy_link_checks:true,recent_articles:{...p,enabled:p.date_filter_enabled,cutoff:p.date_filter_enabled?M.cutoff(p.as_of,p.lookback_months):null},missing_inputs:[...(!p.destination_city?['City is required before research']:[]),...(!p.poi?['POI or selected POI set is required before research']:[]),...(p.poi&&M.resolvePoi(p.poi,data.poi_catalog,p).status==='ambiguous'?['Disambiguate the supplied POI before research']:[])]};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='offpage-article-research-brief.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
loadSnapshot(snapshot);

$('sites-more-filters-toggle').addEventListener('click',()=>{const panel=$('sites-advanced-filters');panel.hidden=!panel.hidden;$('sites-more-filters-toggle').setAttribute('aria-expanded',String(!panel.hidden));});
$('sites-filters').addEventListener('reset',()=>{$('sites-advanced-filters').hidden=true;$('sites-more-filters-toggle').setAttribute('aria-expanded','false');});
