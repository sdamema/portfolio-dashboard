/* Pure, offline projection and qualification. Also loaded by Node tests. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OffpageModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const MIN_PUBLISHER_DR=10;
  const drEligible=(site,minimum=MIN_PUBLISHER_DR)=>!Number.isFinite(site?.dr)||site.dr>=Math.max(MIN_PUBLISHER_DR,minimum);
  const publicationTypes={newspaper:'Newspaper',news_site:'News site',online_publication:'Online publication',magazine:'Magazine',blog:'Blog',tourism_organization:'Tourism organization',other:'Other',unclassified:'Unclassified'};
  const contentFormats={news:'News',guides:'Guides & itineraries',reviews:'Reviews',features:'Features & interviews',event_listings:'Event listings'};
  function publicationMatch(site,filter){return (!filter.publication_type||site.publication_type===filter.publication_type)&&(!filter.content_format||(filter.content_format==='unclassified'?!site.content_formats.length:site.content_formats.includes(filter.content_format)));}
  const list = (t, name) => t[name] || [];
  const parse = value => { try { return typeof value === 'string' ? JSON.parse(value) : value || {}; } catch { return {}; } };
  const safeUrl = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password ? u.href : null; } catch { return null; } };
  const date = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value)) return null;
    const time = Date.parse(value.length === 10 ? value + 'T00:00:00Z' : value);
    return Number.isFinite(time) && new Date(time).toISOString().slice(0,10) === value.slice(0,10) ? time : null;
  };
  const asOfTime = value => { const t = date(value); return t === null ? null : t + (value.length === 10 ? 86399999 : 0); };
  const samePage = (a,b) => { try { const x=new URL(a), y=new URL(b); x.hash=''; y.hash=''; return x.href===y.href; } catch { return false; } };
  function cutoff(asOf, months) {
    const time = date(asOf);
    if (time === null || !Number.isInteger(months) || months < 1 || months > 120) return null;
    const d = new Date(time), day = d.getUTCDate();
    d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - months);
    const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(day, last));
    return d.toISOString().slice(0,10);
  }
  function sourceProof(item, sources) {
    return item && sources.some(s => s.id === item.source_id) && !!safeUrl(item.locator);
  }
  function recency(review, plan, sources) {
    const start = cutoff(plan.as_of, plan.lookback_months), end = asOfTime(plan.as_of);
    if (!start || end === null) return {pass:false, reason:'Choose a valid date and month window'};
    const dates = review.dates || {}, candidates = [];
    for (const kind of ['published', 'modified']) {
      const d = dates[kind], value = date(d?.value);
      if (d?.value && (value === null || value > end)) return {pass:false, reason:'Conflicting or future article date'};
      if (d && value !== null && sourceProof(d, sources) && d.status === (kind === 'modified' ? 'verified_substantive' : 'verified')) candidates.push({kind, value:d.value, time:value});
    }
    const pub = dates.published?.value, mod = dates.modified?.value;
    if (date(pub) !== null && date(mod) !== null && date(mod) < date(pub)) return {pass:false, reason:'Update predates publication'};
    const matching = candidates.filter(d => plan.date_basis === 'either' || d.kind === plan.date_basis).filter(d => d.time >= date(start));
    matching.sort((a,b) => b.time - a.time);
    return matching.length ? {pass:true, reason:matching[0].kind === 'modified' ? 'Verified substantive update' : 'Verified publication', date:matching[0].value} : {pass:false, reason:'No verified date within the selected window'};
  }
  function qualify(article, plan, sources) {
    const review = article.review || {}, reasons = [], recent = plan.date_filter_enabled===false?{pass:true,reason:'No publication-date limit'}:recency(review, plan, sources);
    if (!recent.pass) reasons.push(recent.reason);
    const brand = review.brand || {}, now = asOfTime(plan.as_of);
    const checked = date(brand.checked_at), expiry = date(brand.valid_until);
    if (!(article.brand_status!=='present' && brand.status === 'absent' && brand.page_read === true && brand.alias_scope_complete === true &&
      Array.isArray(brand.aliases_checked) && ['Brand','brand.example','legacy.brand.example'].every(alias=>brand.aliases_checked.includes(alias)) && sourceProof(brand, sources) && samePage(brand.locator,article.original_url) &&
      checked !== null && now !== null && checked <= now && expiry !== null && expiry >= now)) reasons.push(brand.status === 'present' ? 'Brand already mentioned' : 'Brand absence needs a current page check');
    const p = review.performance || {}, checkedPerformance = date(p.observed_at);
    const maxAge = plan.performance_max_age_days ?? 45;
    if (!(Number.isFinite(p.value) && p.value >= 0 && p.metric === 'estimated_monthly_organic_visits' && p.unit === 'visits_per_month' &&
      p.scope === 'exact_url' && samePage(p.url,article.original_url) && p.status === 'source_checked' && p.provider === 'Ahrefs' && sourceProof(p, sources) &&
      checkedPerformance !== null && now !== null && checkedPerformance <= now && now - checkedPerformance <= maxAge * 86400000 &&
      /^(GLOBAL|[A-Z]{2})$/.test(String(plan.performance_market || '').trim().toUpperCase()) && String(p.market || '').trim().toUpperCase() === String(plan.performance_market || '').trim().toUpperCase() && Number.isFinite(plan.min_traffic) && plan.min_traffic >= 0)) reasons.push('Comparable page-level performance evidence needed');
    else if (p.value < plan.min_traffic) reasons.push('Below the selected traffic threshold');
    const fit = review.editorial || {};
    if (!(fit.status === 'relevant' && fit.reader_need && fit.proposed_addition && fit.insertion_section && fit.why_brand && sourceProof(fit, sources))) reasons.push('Specific reader benefit and article improvement needed');
    if (article.page_kind !== 'article') reasons.push('Not an article or guide');
    return {qualified:reasons.length === 0, reasons, recent, review};
  }
  const norm = value => String(value || '').trim().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const tokens = value => String(value || '').split(/[,;]/).map(x=>x.trim()).filter(Boolean);
  const regionCodes='AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
  const regionNames=new Intl.DisplayNames(['en'],{type:'region'}),italianRegions=new Intl.DisplayNames(['it'],{type:'region'});
  const countryOptions=regionCodes.map(code=>({code,name:regionNames.of(code),local_name:italianRegions.of(code),label:`${regionNames.of(code)} (${code})`})).sort((a,b)=>a.name.localeCompare(b.name));
  countryOptions.forEach(c=>{c.flag=String.fromCodePoint(...[...c.code].map(x=>x.charCodeAt(0)+127397));c.flagged_label=`${c.flag} ${c.label}`;});
  const countryAliases=new Map(countryOptions.flatMap(c=>[c.code,c.name,c.local_name,c.label,c.flagged_label].map(v=>[norm(v),c.code.toLowerCase()])));
  countryAliases.set('uk','gb');countryAliases.set('usa','us');
  const countryCode = value => countryAliases.get(norm(value))||norm(value);
  const languageNames=new Intl.DisplayNames(['en'],{type:'language'}),italianLanguages=new Intl.DisplayNames(['it'],{type:'language'});
  const languageOptions='en it fr es de pt nl ar zh ja ko ru uk pl tr hi id th vi sv no da fi el he cs ro hu bg hr sk sl ca ms fa bn ta ur'.split(' ').map(code=>({code,name:languageNames.of(code),local_name:italianLanguages.of(code),label:`${languageNames.of(code)} (${code})`})).sort((a,b)=>a.name.localeCompare(b.name));
  const languageAliases=new Map(languageOptions.flatMap(l=>[l.code,l.name,l.local_name,l.label].map(v=>[norm(v),l.code])));
  const languageCode=value=>languageAliases.get(norm(value))||norm(value);
  function competitorLinks(names, check, asOf){
    return (Array.isArray(names)?names:[]).map(name=>{
      const ref=(Array.isArray(check?.links)?check.links:[]).find(x=>x.name===name&&x.verified_at&&date(x.verified_at)!==null&&date(x.verified_at)<=asOfTime(asOf)&&safeUrl(x.url));
      return {name,url:ref?safeUrl(ref.url):null};
    });
  }

  const languageMatch = (actual, requested) => !requested || tokens(requested).some(want=>languageCode(actual)===languageCode(want) || (!languageCode(want).includes('-') && languageCode(actual).startsWith(languageCode(want)+'-')));
  function poiLabel(poi) { const country=String(poi.country||'').toUpperCase().replace(/^UK$/,'GB'),flag=/^[A-Z]{2}$/.test(country)?String.fromCodePoint(...[...country].map(c=>127397+c.charCodeAt(0))):'🌐';return flag+' '+poi.city+' · '+poi.name; }
  function resolvePoi(query, catalog, filters={}) {
    if (!String(query || '').trim()) return {status:'all', matches:[]};
    const matches = catalog.filter(p=>[p.id,p.name,poiLabel(p),p.name+' · '+p.city+', '+p.country,...(Array.isArray(p.aliases)?p.aliases:[])].some(x=>norm(x)===norm(query)))
      .filter(p=>(!filters.destination_country || countryCode(p.country)===countryCode(filters.destination_country)) && (!filters.destination_city || norm(p.city)===norm(filters.destination_city)));
    return {status:matches.length===1?'resolved':matches.length?'ambiguous':'not_found',matches};
  }
  function geographicMatch(article, filters={}, catalog=[]) {
    if (filters.publisher_country && !tokens(filters.publisher_country).some(c=>countryCode(c)===countryCode(article.publisher_country))) return false;
    if (!languageMatch(article.language,filters.language)) return false;
    const city=filters.destination_city||filters.city, country=filters.destination_country;
    const chosen=resolvePoi(filters.poi,catalog,{destination_city:city,destination_country:country});
    if (!['all','resolved'].includes(chosen.status)) return false;
    // Apply POI, city and destination country to the same linked place, never a Cartesian combination.
    const places=article.poi_refs?.length?article.poi_refs:[{id:null,city:article.destination_city,country:article.destination_country}];
    return places.some(p=>(!country || countryCode(p.country)===countryCode(country)) && (!city || norm(p.city)===norm(city)) && (chosen.status==='all'||p.id===chosen.matches[0].id));
  }
  function brandDomain(value){try{const host=new URL(safeUrl(value)).hostname;return ['brand.example','legacy.brand.example'].find(d=>host===d||host.endsWith('.'+d))||null;}catch{return null;}}
  function brandVisibility(rows,mode='hide'){return rows.filter(r=>mode==='all'||(mode==='unknown'?r.brand_status==='unknown':mode==='legacy'?r.legacy_links?.length>0:r.brand_status!=='present'));}
  function project(snapshot) {
    const t = snapshot.tables || {}, sources = list(t,'sources'), evidence = list(t,'evidence');
    const find = (name,id) => list(t,name).find(x => x.id === id);
    const source = id => find('sources',id);
    const discoveryOrigins = (subjectType,subjectId) => {
      const labels={editorial:'Editorial search',competitor_backlinks:'Ahrefs · Backlinks',competitor_referring_domains:'Ahrefs · Referring domains'};
      const origins=evidence.filter(e=>{
        const d=parse(e.detail_json);
        return d.record_type==='discovery_origin'&&d.subject_type===subjectType&&d.subject_id===subjectId&&labels[d.pathway]&&e.observed_status==='supported'&&source(e.source_id)&&find('runs',e.run_id)&&date(e.observed_at)!==null&&date(e.observed_at)<=asOfTime(snapshot.as_of)&&date(e.verified_at)!==null&&date(e.verified_at)<=asOfTime(snapshot.as_of);
      }).sort((a,b)=>(date(a.observed_at)||0)-(date(b.observed_at)||0)).map(e=>{
        const d=parse(e.detail_json);
        return {sampling_views:Array.isArray(d.sampling_views)?[...new Set(d.sampling_views.filter(v=>['traffic','first_seen','dr'].includes(v)))]:[],report_observation:d.report_observation&&typeof d.report_observation==='object'&&!Array.isArray(d.report_observation)?d.report_observation:null,pathway:d.pathway,label:labels[d.pathway],channel:d.channel||null,query:d.query||null,seed_url:safeUrl(d.seed_url),target_scope:d.target_scope||null,report_url:safeUrl(d.report_url),notes:d.notes||null,attribution_basis:d.attribution_basis||'record_level',source_id:e.source_id,source_label:source(e.source_id).report||null,run_id:e.run_id,recorded_at:e.observed_at,evidence_id:e.id};
      });
      // Preserve separate methods and observations; repeated imports of the same origin add no UI noise.
      return [...new Map(origins.map(o=>[JSON.stringify([o.pathway,o.channel,o.query,o.seed_url,o.target_scope,o.report_url,o.notes,o.source_id,o.run_id,o.sampling_views,o.report_observation]),o])).values()];
    };
    const firstFound = (key,id,kinds) => {
      const dates = evidence.filter(e => e[key] === id && kinds.includes(e.kind) && date(e.observed_at) !== null).map(e=>e.observed_at).sort();
      return dates[0] || null;
    };
    const activities = list(t,'activities');
    const catalogMap=new Map();
    sources.filter(s=>s.provider==='poi_catalog').sort((a,b)=>(date(a.extracted_at)||0)-(date(b.extracted_at)||0)).forEach(source=>{
      const pois=parse(source.scope_json).pois;
      if(Array.isArray(pois))pois.forEach(p=>{if(p.id&&p.name&&p.city&&p.country)catalogMap.set(p.id,{...p,source_id:source.id});});
    });
    const poi_catalog=[...catalogMap.values()];
    const pages = list(t,'pages').map(p => {
      const reviews = evidence.filter(e => e.page_id === p.id && e.kind === 'article_relevance' && parse(e.detail_json).review_type === 'article_improvement').sort((a,b) => (date(b.observed_at)||0)-(date(a.observed_at)||0));
      const assignments=evidence.filter(e=>e.page_id===p.id&&e.kind==='other'&&parse(e.detail_json).record_type==='poi_assignment').sort((a,b)=>(date(b.observed_at)||0)-(date(a.observed_at)||0));
      const assignment=assignments[0], assigned=parse(assignment?.detail_json);
      const assignmentCurrent=assignment&&date(assignment.verified_at)!==null&&date(assignment.verified_at)<=asOfTime(snapshot.as_of)&&date(assignment.observed_at)<=asOfTime(snapshot.as_of)&&(!assignment.valid_until||date(assignment.valid_until)>=asOfTime(snapshot.as_of))&&source(assignment.source_id)&&samePage(assignment.locator,p.original_url);
      const poi_refs=assignmentCurrent&&assignment.observed_status==='supported'&&Array.isArray(assigned.poi_ids)&&assigned.poi_ids.every(id=>catalogMap.has(id))?[...new Set(assigned.poi_ids)].map(id=>catalogMap.get(id)).filter(Boolean):[];
      return {...p, discovery_origins:discoveryOrigins('page',p.id), publisher_country:find('sites',p.site_id)?.country||null, poi_refs, poi_assignment:assignment||null, review:parse(reviews[0]?.detail_json), review_evidence:reviews[0], author_ids:list(t,'authorships').filter(a=>a.page_id === p.id).map(a=>a.person_id)};
    });
    const sites = list(t,'sites').map(s => ({...s,
      discovery_origins:discoveryOrigins('site',s.id),
      articles:pages.filter(p=>p.site_id === s.id && p.page_kind === 'article'),
      person_ids:[...new Set(list(t,'affiliations').filter(a=>a.site_id === s.id).map(a=>a.person_id))],
      opportunities:list(t,'opportunities').filter(o=>o.site_id === s.id),
      history:activities.filter(a=>a.site_id === s.id || list(t,'opportunities').some(o=>o.id === a.opportunity_id && o.site_id === s.id))
    }));
    const people = list(t,'people').map(p => {
      const aff = list(t,'affiliations').filter(a=>a.person_id === p.id);
      const associations = aff.map(a=>({affiliation:a,site:sites.find(s=>s.id===a.site_id)})).filter(x=>x.site);
      return {...p, discovery_origins:discoveryOrigins('person',p.id), beats:parse(p.beats_json), first_found_at:firstFound('person_id',p.id,['identity','article_relevance']),
        associations, articles:pages.filter(a=>a.author_ids.includes(p.id)),
        contacts:list(t,'person_contacts').filter(a=>a.person_id===p.id).map(a=>find('contacts',a.contact_id)).filter(Boolean),
        known_sites:associations.filter(x=>date(x.site.created_at)!==null && date(p.created_at)!==null && date(x.site.created_at)<date(p.created_at)),
        history:activities.filter(a=>a.person_id===p.id)};
    });
    const contacts = list(t,'contacts').map(c => {
      const persons = people.filter(p=>p.contacts.some(x=>x.id===c.id));
      const siteIds = [...new Set(list(t,'site_contacts').filter(x=>x.contact_id===c.id).map(x=>x.site_id))];
      return {...c, people:persons, sites:sites.filter(s=>siteIds.includes(s.id)), known_sites:sites.filter(s=>siteIds.includes(s.id) && date(s.created_at)!==null && date(c.created_at)!==null && date(s.created_at)<date(c.created_at)), first_found_at:firstFound('contact_id',c.id,['contact_publication']), source:source(c.source_id)};
    });
    const latestProfile=(type,key,id,predicate=()=>true)=>{
      const matches=evidence.filter(e=>e.kind==='other'&&parse(e.detail_json).record_type===type&&predicate(parse(e.detail_json))&&(e[key]||parse(e.detail_json)[key])===id).sort((a,b)=>(date(b.observed_at)||0)-(date(a.observed_at)||0));
      const e=matches[0];
      if(type==='page_profile'&&e&&!samePage(e.locator,find('pages',id)?.original_url))return {};
      if(!e||e.observed_status!=='supported'||!source(e.source_id)||!safeUrl(e.locator)||date(e.verified_at)===null||date(e.verified_at)>asOfTime(snapshot.as_of)||date(e.observed_at)>asOfTime(snapshot.as_of)||(e.valid_until&&date(e.valid_until)<asOfTime(snapshot.as_of)))return {};
      return {...parse(e.detail_json),proof:e};
    };
    const isUsable=c=>c.publication_status!=='removed';
    const routeSummary=c=>{const {people,sites,known_sites,...route}=c;return route;};
    const generalContacts=site=>contacts.filter(c=>c.sites.some(s=>s.id===site.id)&&['newsroom','shared'].includes(c.contact_kind)&&isUsable(c)).map(routeSummary);
    pages.forEach(page=>{
      const profile=latestProfile('page_profile','page_id',page.id);
      page.topic=profile.topic||null;page.topics=Array.isArray(profile.topics)?profile.topics.filter(x=>typeof x==='string'&&x.trim()):profile.topic?[profile.topic]:[];page.audience_countries=Array.isArray(profile.audience_countries)?profile.audience_countries:[];page.profile=profile;
      page.working=list(t,'opportunities').filter(o=>o.primary_page_id===page.id);
      page.contact_routes=[...new Map([...contacts.filter(c=>c.people.some(p=>page.author_ids.includes(p.id))&&isUsable(c)&&(c.contact_kind==='individual'||c.sites.some(site=>site.id===page.site_id))),...generalContacts({id:page.site_id})].map(c=>[c.id,routeSummary(c)])).values()];
      const observed=evidence.filter(e=>e.kind==='mention'&&e.page_id===page.id&&source(e.source_id)&&date(e.verified_at)!==null&&date(e.verified_at)<=asOfTime(snapshot.as_of)&&date(e.observed_at)<=asOfTime(snapshot.as_of)&&samePage(e.locator,page.original_url)).sort((a,b)=>(date(b.observed_at)||0)-(date(a.observed_at)||0));
      const latestBrands=[...new Map(observed.map(e=>e.brand_id).map(id=>[id,observed.find(e=>e.brand_id===id)])).values()];
      const competitorHits=latestBrands.filter(e=>find('brands',e.brand_id)?.relationship==='competitor'&&e.observed_status==='present');
      const brandHit=latestBrands.some(e=>['owned_target','owned_alias'].includes(find('brands',e.brand_id)?.relationship)&&e.observed_status==='present');
      const backlinks=evidence.filter(e=>e.kind==='backlink'&&e.page_id===page.id&&source(e.source_id)&&samePage(e.locator,page.original_url)&&date(e.observed_at)!==null&&date(e.observed_at)<=asOfTime(snapshot.as_of)&&date(e.verified_at)!==null&&date(e.verified_at)<=asOfTime(snapshot.as_of)).sort((a,b)=>(date(b.observed_at)||0)-(date(a.observed_at)||0));
      const latestLinks=new Map();backlinks.forEach(e=>{const d=parse(e.detail_json),target=safeUrl(d.target_url);if(target&&!latestLinks.has(target))latestLinks.set(target,e);});
      page.brand_links=[...latestLinks.values()].filter(e=>e.observed_status==='present'&&brandDomain(parse(e.detail_json).target_url)).map(e=>{const d=parse(e.detail_json);return {...d,evidence_id:e.id,checked_at:e.verified_at,source_locator:e.locator,domain:brandDomain(d.target_url),replacement_verified:!!d.replacement_reason&&sources.some(s=>s.id===d.replacement_source_id)&&brandDomain(d.replacement_url)==='brand.example'&&date(d.replacement_verified_at)!==null&&date(d.replacement_verified_at)<=asOfTime(snapshot.as_of)};});
      page.legacy_links=page.brand_links.filter(e=>e.domain==='legacy.brand.example');
      page.brand_status=brandHit||page.brand_links.length||page.review.brand?.status==='present'?'present':page.review.brand?.status||'unknown';
      const check=profile.competitor_check||{},fresh=profile.proof&&profile.proof.valid_until&&date(profile.proof.valid_until)>=asOfTime(snapshot.as_of);
      page.competitor_status=competitorHits.length||check.status==='yes'?'yes':fresh&&check.status==='no'&&check.scope_complete===true&&Array.isArray(check.brands_checked)&&check.brands_checked.length?'no':'unknown';
      page.competitor_names=competitorHits.length?competitorHits.map(e=>find('brands',e.brand_id).name):check.status==='yes'?(check.names||[]):[];
      page.competitor_links=competitorLinks(page.competitor_names,check,snapshot.as_of);
    });
    sites.forEach(site=>{
      const observations=evidence.filter(e=>e.kind==='data'&&parse(e.detail_json).record_type==='domain_metrics'&&parse(e.detail_json).site_id===site.id).sort((a,b)=>(date(b.observed_at)||0)-(date(a.observed_at)||0));
      const proof=observations[0],metric=parse(proof?.detail_json),now=asOfTime(snapshot.as_of);
      const supported=proof&&proof.observed_status==='supported'&&source(proof.source_id)&&safeUrl(proof.locator)&&date(proof.observed_at)!==null&&date(proof.observed_at)<=now&&date(proof.verified_at)!==null&&date(proof.verified_at)<=now&&metric.provider==='Ahrefs'&&metric.metric==='domain_rating'&&metric.scope==='domain'&&metric.measured_domain===site.hostname&&Number.isFinite(metric.value)&&metric.value>=0&&metric.value<=100;
      site.dr=supported?metric.value:null;site.dr_proof=supported?proof:null;site.dr_status=!supported?'missing':date(proof.valid_until)!==null&&date(proof.valid_until)>=now?'current':'stale';
    });
    sites.forEach(site=>{
      site.profile=latestProfile('site_profile','site_id',site.id);site.topic=site.profile.topic||null;site.topics=Array.isArray(site.profile.topics)?site.profile.topics.filter(x=>typeof x==='string'&&x.trim()):site.topic?[site.topic]:[];
      const classification=latestProfile('site_classification','site_id',site.id);
      const explicitProfile=latestProfile('site_profile','site_id',site.id,d=>Object.hasOwn(d,'publication_type'));
      const classified=explicitProfile.proof?explicitProfile:classification;
      site.classification=classified;
      site.publication_type=Object.hasOwn(publicationTypes,classified.publication_type)?classified.publication_type:'unclassified';
      site.content_formats=[...new Set((Array.isArray(classified.content_formats)?classified.content_formats:[]).filter(x=>Object.hasOwn(contentFormats,x)))];
      site.general_contacts=generalContacts(site);site.audience_countries=site.profile.audience_countries||[];
      site.standalone_opportunities=site.opportunities.filter(o=>!o.primary_page_id);
      site.brand_status=site.articles.some(a=>a.brand_status==='present')||site.profile.brand_check?.status==='present'?'present':site.profile.brand_check?.status||'unknown';
      site.legacy_links=site.articles.flatMap(a=>a.legacy_links);
      const check=site.profile.competitor_check||{};site.competitor_status=check.status==='yes'?'yes':check.status==='no'&&site.profile.proof?.valid_until&&date(site.profile.proof.valid_until)>=asOfTime(snapshot.as_of)&&check.scope_complete===true&&check.checked_urls?.length&&check.brands_checked?.length?'no':'unknown';site.competitor_names=check.names||[];site.competitor_links=competitorLinks(site.competitor_names,check,snapshot.as_of);
      site.standalone=Boolean((site.profile.standalone_candidate===true&&site.profile.selection_reason)||site.standalone_opportunities.length);
    });
    people.forEach(person=>{
      person.selection=latestProfile('person_selection','person_id',person.id);
      person.selection_reason=person.selection.reason||null;
      person.selection_articles=pages.filter(p=>(person.selection.page_ids||[]).includes(p.id));
      person.current_sites=[...new Map(person.associations.filter(a=>!a.affiliation.valid_to).map(a=>[a.site.id,a.site])).values()];
    });
    const opportunities=list(t,'opportunities').map(o=>{
      const article=pages.find(p=>p.id===o.primary_page_id);
      return {...o,destination_country:o.destination_country||article?.destination_country||null,destination_city:o.destination_city||article?.destination_city||null,publisher_country:find('sites',o.site_id)?.country||null,language:article?.language||null,poi_refs:article?.poi_refs||[]};
    });
    const minimumDr=Math.max(MIN_PUBLISHER_DR,Number(snapshot.selection_policy?.min_publisher_dr)||MIN_PUBLISHER_DR);
    sites.forEach(site=>{site.dr_excluded=!drEligible(site,minimumDr);});
    const eligiblePage=page=>!sites.find(site=>site.id===page.site_id)?.dr_excluded;
    const excluded_by_dr={minimum:minimumDr,pages:pages.filter(p=>p.page_kind==='article'&&!eligiblePage(p)),websites:sites.filter(s=>s.dr_excluded&&(s.standalone||s.brand_status==='present'))};
    // Keep the lossless input and source history; every prospect view and related article list uses the same threshold.
    const eligiblePages=pages.filter(p=>p.page_kind!=='article'||eligiblePage(p));
    sites.forEach(site=>{site.articles=site.articles.filter(eligiblePage);});
    people.forEach(person=>{person.articles=person.articles.filter(eligiblePage);person.selection_articles=person.selection_articles.filter(eligiblePage);});
    const articles=eligiblePages.filter(p=>p.page_kind==='article');
    return {minimum_publisher_dr:minimumDr,excluded_by_dr,web_pages_all:articles, websites_all:sites.filter(s=>!s.dr_excluded&&(s.standalone||s.brand_status==='present')), web_pages:articles.filter(p=>p.brand_status!=='present'), websites:sites.filter(s=>!s.dr_excluded&&s.standalone&&s.brand_status!=='present'), poi_catalog, sites, articles, pages:eligiblePages, people, contacts, sources, runs:list(t,'runs'), opportunities, activities};
  }
  function siteDestinationCountries(site,catalog=[]) {
    const poiIds=Array.isArray(site.profile?.poi_ids)?site.profile.poi_ids:[];
    const countries=[...catalog.filter(p=>poiIds.includes(p.id)).map(p=>p.country),
      ...(site.standalone_opportunities||[]).map(o=>o.destination_country),
      ...(site.articles||[]).flatMap(p=>p.poi_refs?.length?p.poi_refs.map(poi=>poi.country):[p.destination_country])];
    return [...new Set(countries.filter(Boolean).map(c=>countryCode(c).toUpperCase()))].filter(c=>countryOptions.some(option=>option.code===c)).sort();
  }
  function filterRows(rows, filter, textOf) {
    const needle = (filter.search || '').trim().toLocaleLowerCase();
    return rows.filter(row => !needle || textOf(row).toLocaleLowerCase().includes(needle));
  }
  function sortByDr(rows,siteOf){return [...rows].sort((a,b)=>{const x=siteOf(a),y=siteOf(b);const dx=x?.dr_status==='current'?x.dr:null,dy=y?.dr_status==='current'?y.dr:null;return dx===null?(dy===null?0:1):dy===null?-1:dy-dx;});}
  return {siteDestinationCountries,MIN_PUBLISHER_DR,drEligible,publicationTypes, contentFormats, publicationMatch, brandDomain, brandVisibility, sortByDr, parse, safeUrl, date, cutoff, recency, qualify, project, filterRows, tokens, countryCode, countryOptions, languageOptions, languageCode, competitorLinks, languageMatch, poiLabel, resolvePoi, geographicMatch};
});
