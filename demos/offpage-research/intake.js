/* Manual draft inbox. No network, sending or writes to the normalized database. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./model.js'));
  else {root.OffpageIntake=factory(root.OffpageModel);root.OffpageIntake.mount();}
})(typeof globalThis!=='undefined'?globalThis:this,function(M){
  const split=v=>String(v||'').split(/[,;\n]/).map(s=>s.trim()).filter(Boolean);
  function url(value,required=false){
    if(!value&&!required)return null;
    const safe=M.safeUrl(value);if(!safe)throw Error('Enter a complete http:// or https:// URL.');
    const u=new URL(safe);u.hash='';return u.href;
  }
  function makeDraft(kind,fields,existing,items,id,now){
    if(!['page','site','person'].includes(kind))throw Error('Choose a record type.');
    const title=String(fields.title||'').trim();if(!title)throw Error(kind==='person'?'Enter a name.':'Enter a title or website name.');
    const target=url(fields.url,kind!=='person');
    const hostname=target?new URL(target).hostname:null;
    const identity=kind==='site'?hostname:target;
    if(identity&&items.some(i=>i.kind===kind&&(kind==='site'?i.hostname:i.url)===identity))throw Error('This record is already in manual additions.');
    if(kind==='page'&&[...(existing.articles||[]),...(existing.excluded_by_dr?.pages||[])].some(a=>url(a.original_url)===target))throw Error('This page is already saved. Open its details instead.');
    if(kind==='site'&&[...(existing.websites_all||existing.websites||[]),...(existing.excluded_by_dr?.websites||[])].some(s=>s.hostname===hostname))throw Error('This website is already selected. Open its details instead.');
    if(kind==='person'&&target&&existing.people?.some(p=>p.profile_url&&url(p.profile_url)===target))throw Error('This profile is already saved.');
    const contact=String(fields.contact||'').trim();
    if(contact&&!M.safeUrl(contact)&&!/^\S+@[^\s@]+\.[^\s@]+$/.test(contact))throw Error('Contact must be an email address or complete URL.');
    const countries=fields.audience_country?[M.countryCode(fields.audience_country).toUpperCase()]:[];
    if(countries.some(c=>!M.countryOptions.some(x=>x.code===c)))throw Error('Choose an audience country from the suggestions.');
    const linkedSite=existing.sites?.find(s=>s.hostname===hostname);
    const sameName=kind==='person'&&[...(existing.people||[]).map(p=>p.display_name),...items.filter(i=>i.kind==='person').map(i=>i.title)].some(n=>n.toLowerCase()===title.toLowerCase());
    const publications=split(fields.publications).map(v=>url(v,true));
    return {id,kind,title,url:target,hostname,topics:split(fields.topics),journalists:split(fields.journalists),contact:contact||null,contact_source_url:url(fields.contact_source_url),audience_countries:countries,publications,reason:String(fields.reason||'').trim()||null,poi_query:String(fields.poi||'').trim()||null,existing_site_id:linkedSite?.id||null,possible_name_match:sameName,created_at:now,verification_status:'unverified',workflow_status:'needs_verification'};
  }
  function readDrafts(raw){
    if(!raw)return [];
    const stored=JSON.parse(raw);
    if(stored.schema_version!==1||!Array.isArray(stored.items))throw Error('Invalid draft format');
    const ids=new Set();
    for(const item of stored.items){
      if(!item||typeof item.id!=='string'||ids.has(item.id)||!['page','site','person'].includes(item.kind)||typeof item.title!=='string'||!item.title.trim())throw Error('Invalid draft record');
      ids.add(item.id);
      for(const key of ['topics','journalists','audience_countries','publications'])if(item[key]!==undefined&&(!Array.isArray(item[key])||item[key].some(v=>typeof v!=='string')))throw Error('Invalid draft list');
      if(item.url&&!M.safeUrl(item.url))throw Error('Invalid draft URL');
    }
    return stored.items;
  }
  function mount(){
    const $=id=>document.getElementById(id),el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
    const storageKey='portfolio-offpage-manual-additions-v1:'+location.pathname;
    let items=[],persistent=true,kind='page',recoveryRaw=null;
    try{recoveryRaw=localStorage.getItem(storageKey);items=readDrafts(recoveryRaw);recoveryRaw=null;}catch{persistent=false;}
    function persist(){if(persistent)try{localStorage.setItem(storageKey,JSON.stringify({schema_version:1,items}));}catch{persistent=false;}}
    function exportItems(){
      const payload={schema_version:1,record_type:'manual_additions',exported_at:new Date().toISOString(),research_performed:false,verification_status:'unverified',items,...(recoveryRaw?{unreadable_saved_drafts:recoveryRaw}: {})};
      const blob=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)+'\n'],{type:'application/json'}));const a=el('a');a.href=blob;a.download='offpage-manual-additions.json';a.click();setTimeout(()=>URL.revokeObjectURL(blob),1000);
    }
    function render(){
      document.querySelectorAll('[data-add]').forEach(b=>{b.disabled=!!window.OFFPAGE_DEMO_ACTIVE;b.title=b.disabled?'Return to local snapshot to add records':'';});
      for(const type of ['page','site','person']){
        const host=$(type+'-additions'),subset=items.filter(i=>i.kind===type);host.hidden=(!subset.length&&!recoveryRaw)||!!window.OFFPAGE_DEMO_ACTIVE;host.replaceChildren();if(!subset.length&&!recoveryRaw)continue;
        if(recoveryRaw)host.append(el('p','Saved drafts could not be read. They have not been overwritten; export additions to recover the original content.'));
        host.append(el('h2','＋ Manual additions'),el('p',persistent?'Local drafts · awaiting verification':'Session drafts · export to keep your additions'));
        const button=el('button','📥 Export additions');button.type='button';button.className='text-button';button.addEventListener('click',exportItems);host.append(button);
        for(const item of subset){
          const card=el('article');card.className='draft-card';card.append(el('strong',item.title));
          if(M.safeUrl(item.url)){const a=el('a',item.url);a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.className='record-link';card.append(a);}
          for(const [label,value] of [['Topics',item.topics?.join(', ')],['Journalists',item.journalists?.join(', ')],['Contact',item.contact],['Audience (unverified)',item.audience_countries?.join(', ')],['Writes for',item.publications?.join(', ')],['Why selected',item.reason],['POI to review',item.poi_query]])if(value)card.append(el('p',label+': '+value));
          if(item.existing_site_id)card.append(el('p','🌐 Site already in workspace · review shared history'));
          if(item.possible_name_match)card.append(el('p','👤 Similar name already present · identity not merged'));
          const controls=el('div');controls.className='draft-actions';const status=el('span','Needs verification');status.className='badge';controls.append(status);
          const remove=el('button','Remove draft');remove.type='button';remove.className='text-button';remove.addEventListener('click',()=>{items=items.filter(i=>i.id!==item.id);persist();render();});controls.append(remove);card.append(controls);host.append(card);
        }
      }
    }
    function open(type){
      kind=type;$('add-form').reset();$('add-fields').replaceChildren();$('add-error').textContent='';$('add-title').textContent={page:'Add web page',site:'Add website',person:'Add person'}[kind];
      const fields=[['title',kind==='page'?'Page title':kind==='site'?'Website name':'Person name',true],['url',kind==='page'?'Page URL':kind==='site'?'Website URL':'Author / professional profile URL',kind!=='person'],['topics','Topics · separate with commas',false]];
      if(kind==='page')fields.push(['journalists','Journalist names · if known',false],['poi','Point of interest · optional',false]);
      if(kind==='person')fields.push(['publications','Writes for · website URLs, separated by commas',false]);
      fields.push(['contact',kind==='site'?'Newsroom email or contact URL':'Email or professional contact URL',false],['contact_source_url','Where is this contact published? · URL',false]);
      if(kind!=='person')fields.push(['audience_country','Audience country · if known',false]);
      fields.push(['reason','Why include this result?',false]);
      for(const [name,label,required] of fields){const l=el('label',label),input=el(name==='reason'?'textarea':'input');input.name=name;input.required=required;if(name==='url'||name==='contact_source_url')input.type='url';if(name==='audience_country')input.setAttribute('list','country-options');if(name==='poi')input.setAttribute('list','poi-options');l.append(input);$('add-fields').append(l);}
      $('add-dialog').showModal();$('add-fields').querySelector('input').focus();
    }
    document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.add)));
    $('add-close').addEventListener('click',()=>$('add-dialog').close());
    $('add-form').addEventListener('submit',e=>{e.preventDefault();try{
      const existing=M.project(window.OFFPAGE_SNAPSHOT);const draft=makeDraft(kind,Object.fromEntries(new FormData($('add-form'))),existing,items,crypto.randomUUID(),new Date().toISOString());
      items.push(draft);persist();render();$('add-dialog').close();$(kind+'-additions').scrollIntoView({block:'nearest'});
    }catch(error){$('add-error').textContent=error.message;}});
    window.addEventListener('offpage-mode-change',render);
    render();
  }
  return {makeDraft,readDrafts,mount};
});
