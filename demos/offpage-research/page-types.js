(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.OffpagePageTypes=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const options=[['storage','Service pages'],['visits_itineraries','Visits & itineraries'],['activities','Activities & experiences'],['events','Events']];
 function info(row,annotations={}){
  const permitted=new Set(options.map(x=>x[0])),profile=row.profile||{};
  if(permitted.has(profile.page_type))return {types:[profile.page_type],reason:profile.page_type_reason||'Primary content type recorded in the page research profile.'};
  // Older unambiguous single-type assessments remain usable. Never select a
  // primary type arbitrarily from an old combined/multi-track assessment.
  const authored=profile.research_tracks;
  if(Array.isArray(authored)&&authored.length===1&&permitted.has(authored[0]))return {types:authored,reason:profile.research_track_reason||'Recorded in the page research profile.'};
  const saved=annotations[row.id];
  if(saved&&saved.url===row.original_url&&Array.isArray(saved.types)&&saved.types.length===1&&permitted.has(saved.types[0]))return saved;
  return {types:['unclassified'],reason:'No single primary page-type assessment has been saved yet.'};
 }
 function matches(row,type,annotations){return !type||info(row,annotations).types.includes(type);}
 function labels(row,annotations){return info(row,annotations).types.map(t=>options.find(x=>x[0]===t)?.[1]||'Unclassified');}
 return {options,info,matches,labels};
});
