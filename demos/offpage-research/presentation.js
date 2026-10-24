/* Presentation and manually entered outreach state; research evidence stays separate. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.OffpagePresentation=factory();
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const statuses=[['none','⚪ No action'],['contacted','📨 Contacted'],['no_reply','⏳ No reply'],['rejected','❌ Rejected'],['accepted','✅ Accepted']];
  function day(value){
    const match=/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(String(value||''));
    if(!match)return 'Unknown';
    const [,year,month,date]=match,parsed=new Date(`${year}-${month}-${date}T00:00:00Z`);
    return Number.isFinite(parsed.getTime())&&parsed.toISOString().slice(0,10)===`${year}-${month}-${date}`?`${date}/${month}/${year}`:'Unknown';
  }
  function language(value){
    const code=String(value||'').trim().toLowerCase().replaceAll('_','-');
    if(!code)return 'Unknown';
    const flags={en:'🇬🇧',pt:'🇵🇹',it:'🇮🇹',fr:'🇫🇷',de:'🇩🇪',es:'🇪🇸',nl:'🇳🇱',ja:'🇯🇵',ko:'🇰🇷',zh:'🇨🇳',ar:'🇸🇦',ru:'🇷🇺',pl:'🇵🇱',tr:'🇹🇷',sv:'🇸🇪',da:'🇩🇰',no:'🇳🇴',fi:'🇫🇮',el:'🇬🇷',hi:'🇮🇳',id:'🇮🇩',th:'🇹🇭',vi:'🇻🇳'};
    const regional={'en-us':'🇺🇸','en-au':'🇦🇺','en-ca':'🇨🇦','pt-br':'🇧🇷','zh-tw':'🇹🇼'};
    return `${regional[code]||flags[code.split('-')[0]]||'🌐'} ${code}`;
  }
  function countryFlag(value){const code=String(value||'').trim().toUpperCase().replace(/^UK$/,'GB');return /^[A-Z]{2}$/.test(code)?String.fromCodePoint(...[...code].map(c=>127397+c.charCodeAt(0))):'🌐';}
  function poiGroups(pois){
    const groups=new Map();
    for(const poi of pois||[]){const city=poi.city||'City unknown',country=String(poi.country||'').toUpperCase().replace(/^UK$/,'GB'),key=country+'|'+city;
      if(!groups.has(key))groups.set(key,{location:countryFlag(country)+' '+city,names:[]});
      if(poi.name&&!groups.get(key).names.includes(poi.name))groups.get(key).names.push(poi.name);
    }
    return [...groups.values()];
  }
  function drBand(value){return value>=70?'high':value>=40?'medium':value>=30?'thirties':value>=20?'twenties':value>=10?'teens':'low';}
  const isExampleGroup=name=>String(name||'').trim().toLowerCase()==='examplegroup';
  function hasExampleGroup(row){return row.competitor_status==='yes'&&row.competitor_links?.some(c=>isExampleGroup(c.name))||false;}
  function examplegroupFirst(rows){return [...rows.filter(hasExampleGroup),...rows.filter(row=>!hasExampleGroup(row))];}
  function editorialTopics(row,catalog){
    const poiNames=new Set(catalog.flatMap(p=>[p.name,...(Array.isArray(p.aliases)?p.aliases:[])]).filter(Boolean).map(name=>name.trim().toLowerCase()));
    return (row.topics||[]).filter(topic=>!poiNames.has(topic.trim().toLowerCase()));
  }
  function dateValue(value){return day(value)==='Unknown'?null:String(value).slice(0,10);}
  function articleDate(row){return dateValue(row.review?.dates?.modified?.value)||dateValue(row.modified_at)||dateValue(row.review?.dates?.published?.value)||dateValue(row.published_at);}
  function sortRows(rows,value,direction='desc'){
    return rows.map(row=>({row,value:value(row)})).sort((a,b)=>{
      const missingA=a.value===null||a.value===undefined,missingB=b.value===null||b.value===undefined;
      if(missingA||missingB)return Number(missingA)-Number(missingB);
      const order=a.value<b.value?-1:a.value>b.value?1:0;
      return direction==='asc'?order:-order;
    }).map(item=>item.row);
  }
  function inDateWindow(row,start,end){const value=articleDate(row);return !!(value&&start&&end&&value>=start&&value<=end);}
  function statusStore(getStorage,key){
    let issue='';
    function read(){
      const raw=getStorage().getItem(key);
      if(raw===null)return {};
      const parsed=JSON.parse(raw);
      if(parsed.schema_version!==1||!parsed.items||typeof parsed.items!=='object'||Array.isArray(parsed.items))throw Error('Invalid status storage');
      for(const [id,item] of Object.entries(parsed.items)){
        if(!/^(article|site|person):.+/.test(id)||!item||!statuses.some(([s])=>s===item.status)||!Number.isFinite(Date.parse(item.updated_at)))throw Error('Invalid status entry');
      }
      return parsed.items;
    }
    function get(id){try{const items=read();issue='';return items[id]||{status:'none'};}catch{issue='Saved statuses are unavailable. Existing storage has been preserved.';return {status:'none'};}}
    function set(id,status,now=new Date().toISOString()){
      if(!/^(article|site|person):.+/.test(id)||!statuses.some(([s])=>s===status))throw Error('Invalid outreach status');
      try{
        const items=read();items[id]={status,updated_at:now};
        getStorage().setItem(key,JSON.stringify({schema_version:1,record_type:'manual_outreach_status',items}));issue='';return items[id];
      }catch{issue='Status could not be saved in this browser. Existing storage has been preserved.';throw Error(issue);}
    }
    return {get,set,get issue(){return issue;}};
  }
  return {countryFlag,poiGroups,statuses,day,language,drBand,statusStore,isExampleGroup,hasExampleGroup,examplegroupFirst,editorialTopics,dateValue,articleDate,sortRows,inDateWindow};
});
