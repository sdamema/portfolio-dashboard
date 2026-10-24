/* Editor for reversible human mention checks. Uses the dashboard's local store. */
function openMentionReview(kind,id){
 const row=(kind==='article'?data.articles:data.sites).find(r=>r.id===id);if(!row)return;
 const saved=row.manual_review,body=$('detail-body');body.replaceChildren();
 $('detail-kind').textContent='Manual review';$('detail-title').textContent=rowTitle(row);
 const form=el('form',undefined,'mention-form');
 const intro=el('p','Saved in this browser. Reviews update the table and filters; the original research remains available. Export reviews to keep a file copy.','muted');form.append(intro);
 if(row.manual_review_stale)form.append(el('p','Newer research exists. This older manual review is not applied; recheck and save to confirm your current findings.','notice'));
 function field(label,node){node.setAttribute('aria-label',label);const l=el('label',label);l.append(node);form.append(l);return node;}
 function select(label,name,options,value){const n=el('select');n.name=name;options.forEach(([key,text])=>n.add(new Option(text,key)));n.value=value;return field(label,n);}
 function input(label,name,value,type='text'){const n=el('input');n.name=name;n.type=type;n.value=value||'';return field(label,n);}
 function area(label,name,value){const n=el('textarea');n.name=name;n.value=value||'';n.rows=3;return field(label,n);}
 const brand=select('Brand / legacy.brand.example','brand',[['unknown','Not fully checked'],['present','Brand mentioned'],['absent','No Brand found']],saved?.brand||row.brand_status||'unknown');
 const brandUrl=input('Brand link (optional; a mention alone is enough)','brand_url',saved?.brand_url||row.brand_links?.[0]?.target_url||'','url');
 const competitor=select('Other brands','competitors',[['unknown','Not fully checked'],['yes','Brands mentioned'],['no','No other brands found']],saved?.competitors||row.competitor_status||'unknown');
 const brandBox=el('fieldset',undefined,'mention-brands');brandBox.append(el('legend','Mentioned brands'));
 const names=saved?.names||row.competitor_names||[],allNames=[...new Set([...OffpageMentions.brands,...names])],controls=[];
 for(const name of allNames){
  const line=el('div',undefined,'mention-brand'),l=el('label',undefined,'checkbox-label'),check=el('input');check.type='checkbox';check.checked=names.includes(name);l.append(check,document.createTextNode(name==='ExampleGroup'?'ExampleGroup · Brand group':name));
  const url=el('input');url.type='url';url.placeholder='Verified link (optional)';url.setAttribute('aria-label','Verified link for '+name);url.value=(saved?.links||row.competitor_links||[]).find(x=>x.name===name)?.url||'';
  line.append(l,url);brandBox.append(line);controls.push({name,check,url});
 }
 form.append(brandBox);
 const custom=input('Additional brands (comma-separated)','additional','');
 const date=input('Date checked · dd/mm/yyyy','checked_on',day(saved?.checked_on||new Date().toISOString()));date.placeholder='dd/mm/yyyy';date.required=true;
 const urls=area(kind==='article'?'Checked article URL':'Checked pages on this website (one URL per line)','checked_urls',(saved?.checked_urls||[kind==='article'?row.original_url:'https://'+row.hostname]).join('\n'));urls.required=true;if(kind==='article')urls.readOnly=true;
 if(kind==='site')form.append(el('p','Website results apply to the listed pages. A saved article with Brand still keeps the website in existing coverage; review that article to correct it.','muted'));
 const reviewer=input('Checked by (optional)','reviewer',saved?.reviewer||'');
 const notes=area('Notes / remaining uncertainty','notes',saved?.notes||'');
 const confirm=el('input');confirm.type='checkbox';confirm.required=true;const label=el('label',undefined,'checkbox-label');label.append(confirm,document.createTextNode('I checked the listed page(s). Any absence result covers the current text and links; unchecked items remain Not fully checked.'));form.append(label);
 const error=el('p',undefined,'mention-error');error.setAttribute('role','alert');form.append(error);
 const actions=el('div',undefined,'mention-actions'),submit=el('button','Save review','primary');submit.type='submit';actions.append(submit);
 const cancel=el('button','Cancel','text-button');cancel.type='button';cancel.addEventListener('click',()=>openRecord(kind,id));actions.append(cancel);
 const exportButton=el('button','Export reviews','text-button');exportButton.type='button';exportButton.addEventListener('click',()=>{try{exportMentionReviews();}catch(e){error.textContent=e.message;}});actions.append(exportButton);
 if(saved){const reset=el('button','Use original research','text-button');reset.type='button';reset.addEventListener('click',()=>{try{mentionReviews.save({kind,id,action:'restore'});finish('Original research restored. The manual review remains in history.');}catch(e){error.textContent='Could not save: '+e.message;}});actions.append(reset);}
 const remove=el('button','Delete from dashboard','text-button danger-button');remove.type='button';remove.addEventListener('click',()=>confirmRecordRemoval(kind,row));actions.append(remove);
 form.append(actions);body.append(form);
 const history=mentionReviews.all().filter(r=>r.kind===kind&&r.id===id).reverse();
 if(history.length){const details=el('details',undefined,'mention-history');details.append(el('summary',`Review history · ${history.length}`));for(const item of history){const p=el('p',`${day(item.saved_at)} · ${item.action==='remove'?'Removed from dashboard':item.action==='undelete'?'Restored to dashboard':item.action==='restore'?'Original research restored':`Brand: ${human(item.brand)} · Other brands: ${item.names.join(', ')||human(item.competitors)}${item.reviewer?' · '+item.reviewer:''}`}`);details.append(p);if(item.notes)details.append(el('p',item.notes,'muted'));}body.append(details);}
 function sync(){brandBox.hidden=competitor.value!=='yes';custom.closest('label').hidden=competitor.value!=='yes';brandUrl.disabled=brand.value!=='present';}
 competitor.addEventListener('change',sync);brand.addEventListener('change',sync);sync();
 function finish(message){loadSnapshot(snapshot);const current=(kind==='article'?data.articles:data.sites).find(r=>r.id===id);if(current?.manual_review_stale)message='Review saved in history. Newer research exists than this check; the override is paused until you recheck and confirm it.';if(kind==='site'&&brand.value==='absent'&&data.sites.find(s=>s.id===id)?.brand_status==='present'&&!message.startsWith('Original'))message='Review saved for the checked pages. A saved article still mentions Brand, so this website remains in existing coverage.';openRecord(kind,id);const note=el('p',message,'notice');note.setAttribute('role','status');$('detail-body').prepend(note);}
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  try{
   const d=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date.value.trim());if(!d)throw Error('Use dd/mm/yyyy for the check date.');
   const chosen=competitor.value==='yes'?controls.filter(c=>c.check.checked):[];
   const extra=competitor.value==='yes'?custom.value.split(',').map(s=>s.trim()).filter(Boolean):[];
   const checkedUrls=urls.value.split('\n').map(s=>s.trim()).filter(Boolean);
   for(const value of checkedUrls){
    const safe=M.safeUrl(value);if(!safe)throw Error('Enter a complete checked URL.');
    const u=new URL(safe),target=new URL(kind==='article'?row.original_url:'https://'+row.hostname);
    if(kind==='article'?(u.origin!==target.origin||u.pathname!==target.pathname||u.search!==target.search):(u.hostname.replace(/^www\./,'')!==target.hostname.replace(/^www\./,'')))throw Error('Checked URLs must belong to this saved '+(kind==='article'?'article.':'website.'));
   }
   mentionReviews.save({kind,id,brand:brand.value,brand_url:brand.value==='present'?brandUrl.value.trim():null,competitors:competitor.value,names:[...chosen.map(c=>c.name),...extra],links:chosen.filter(c=>c.url.value.trim()).map(c=>({name:c.name,url:c.url.value.trim()})),checked_on:`${d[3]}-${d[2]}-${d[1]}`,checked_urls:urls.value.split('\n').map(s=>s.trim()).filter(Boolean),notes:notes.value,reviewer:reviewer.value});
   finish(brand.value==='present'?'Review saved. Brand coverage filters now include this record as existing coverage.':brand.value==='absent'?'Review saved. The record no longer needs a Brand check.':'Review saved. The Brand check remains pending.');
  }catch(e){error.textContent='Could not save: '+e.message;}
 });
 if(!$('detail').open)$('detail').showModal();else $('detail').scrollTop=0;
}
function exportMentionReviews(){
 const url=URL.createObjectURL(new Blob([JSON.stringify(mentionReviews.exportData(),null,2)+'\n'],{type:'application/json'}));const a=el('a');a.href=url;a.download='offpage-manual-mention-reviews.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function confirmRecordRemoval(kind,row){
 let dialog=$('remove-record-dialog');if(dialog)dialog.remove();
 dialog=el('dialog',undefined,'remove-record-dialog');dialog.id='remove-record-dialog';dialog.setAttribute('aria-labelledby','remove-record-title');
 const title=el('h2','Delete from dashboard?');title.id='remove-record-title';dialog.append(title,el('p',rowTitle(row),'remove-record-name'));
 dialog.append(el('p',kind==='article'?'Remove this page from the dashboard and linked article lists?':'Remove this website from the Websites list? Its articles and people stay saved.'));
 dialog.append(el('p','Saved in this browser; original files are kept. Restore via Research history → Removed records.','muted'));
 const error=el('p',undefined,'mention-error');error.setAttribute('role','alert');dialog.append(error);
 const actions=el('div',undefined,'mention-actions'),cancel=el('button','Cancel','text-button'),confirm=el('button','Confirm deletion','primary danger-primary');cancel.type=confirm.type='button';cancel.autofocus=true;
 cancel.addEventListener('click',()=>dialog.close());confirm.addEventListener('click',()=>{try{mentionReviews.save({kind,id:row.id,action:'remove'});dialog.close();$('detail').close();loadSnapshot(snapshot);}catch(e){error.textContent='Could not remove the record: '+e.message;}});
 actions.append(cancel,confirm);dialog.append(actions);document.body.append(dialog);dialog.showModal();
}
