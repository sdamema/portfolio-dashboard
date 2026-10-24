// Entirely fictional portfolio fixture. No private research data.
window.OFFPAGE_DEMO_ACTIVE = true;
window.OFFPAGE_SNAPSHOT = {
  "schema_version": 1,
  "as_of": "2026-10-24T12:00:00Z",
  "tables": {
    "sources": [
      {
        "id": "demo-editorial",
        "provider": "Fictional editorial evidence",
        "report": "Invented page checks",
        "locator": "https://gazette.example.invalid/contact",
        "extracted_at": "2026-10-20T12:00:00Z",
        "scope_json": "{\"demo\":true}",
        "is_partial": 1,
        "limitations": "Fictional example only"
      },
      {
        "id": "demo-metrics",
        "provider": "Fictional Ahrefs example",
        "report": "Invented URL metrics",
        "locator": "https://metrics.example.invalid/report",
        "extracted_at": "2026-10-20T12:00:00Z",
        "scope_json": "{\"market\":\"PT\",\"demo\":true}",
        "is_partial": 1,
        "limitations": "These metrics are not real"
      },
      {
        "id": "demo-pois",
        "provider": "poi_catalog",
        "report": "Fictional POI examples",
        "locator": "https://catalog.example.invalid/pois",
        "extracted_at": "2026-10-20T12:00:00Z",
        "scope_json": "{\"pois\": [{\"id\": \"demo-poi-1\", \"name\": \"Fictional North Airport\", \"city\": \"London\", \"country\": \"GB\", \"aliases\": [\"Fictional North Terminal\"], \"category\": \"airport\"}, {\"id\": \"demo-poi-2\", \"name\": \"Fictional Central Station\", \"city\": \"London\", \"country\": \"GB\", \"aliases\": [], \"category\": \"station\"}, {\"id\": \"demo-poi-3\", \"name\": \"Fictional North Airport\", \"city\": \"Paris\", \"country\": \"FR\", \"aliases\": [], \"category\": \"airport\"}], \"demo\": true}",
        "is_partial": 1,
        "limitations": "Invented places; not a real destination catalog"
      }
    ],
    "sites": [
      {
        "id": "demo-site-1",
        "name": "Fictional City Gazette",
        "hostname": "gazette.example.invalid",
        "category": "newspaper",
        "country": "IT",
        "languages_json": "[\"it\", \"en\"]",
        "created_at": "2026-07-10T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z"
      },
      {
        "id": "demo-site-2",
        "name": "Fictional Weekend Journal",
        "hostname": "weekend.example.invalid",
        "category": "online_publication",
        "country": "FR",
        "languages_json": "[\"fr\"]",
        "created_at": "2026-08-01T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z"
      },
      {
        "id": "demo-site-3",
        "name": "Fictional Culture Weekly",
        "hostname": "weekender.example.invalid",
        "category": "magazine",
        "country": "FR",
        "languages_json": "[\"fr\"]",
        "created_at": "2026-08-01T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z"
      },
      {
        "id": "demo-site-4",
        "name": "Fictional Museum Journal",
        "hostname": "museumjournal.example.invalid",
        "category": "newspaper",
        "country": "IT",
        "languages_json": "[\"it\", \"en\"]",
        "created_at": "2026-07-10T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z"
      },
      {
        "id": "demo-site-5",
        "name": "Fictional Route Notes",
        "hostname": "routes.example.invalid",
        "category": "newspaper",
        "country": "IT",
        "languages_json": "[\"it\", \"en\"]",
        "created_at": "2026-07-10T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z"
      }
    ],
    "people": [
      {
        "id": "demo-person-1",
        "display_name": "Fictional Editor A",
        "role": "Travel and culture editor",
        "beats_json": "[\"Travel\",\"Culture\",\"City guides\"]",
        "profile_url": "https://gazette.example.invalid/authors/editor-a",
        "created_at": "2026-08-10T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "languages_json": "[\"it\", \"en\"]"
      },
      {
        "id": "demo-person-2",
        "display_name": "Fictional Writer B",
        "role": "Freelance sport writer",
        "beats_json": "[\"Surfing\",\"Lifestyle\"]",
        "profile_url": "https://weekend.example.invalid/authors/writer-b",
        "created_at": "2026-09-01T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "languages_json": "[\"it\", \"en\"]"
      }
    ],
    "affiliations": [
      {
        "id": "demo-aff-1",
        "person_id": "demo-person-1",
        "site_id": "demo-site-1",
        "role": "Editor",
        "valid_to": null
      },
      {
        "id": "demo-aff-2",
        "person_id": "demo-person-2",
        "site_id": "demo-site-1",
        "role": "Contributor",
        "valid_to": null
      },
      {
        "id": "demo-aff-3",
        "person_id": "demo-person-2",
        "site_id": "demo-site-2",
        "role": "Contributor",
        "valid_to": null
      }
    ],
    "contacts": [
      {
        "id": "demo-contact-1",
        "channel": "contact_form",
        "value": "https://gazette.example.invalid/contact",
        "contact_kind": "newsroom",
        "publication_status": "published",
        "deliverability_status": "not_tested",
        "source_id": "demo-editorial",
        "created_at": "2026-09-07T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z"
      },
      {
        "id": "demo-contact-2",
        "channel": "email",
        "value": "editorial@weekender.example.invalid",
        "contact_kind": "newsroom",
        "publication_status": "published",
        "deliverability_status": "not_tested",
        "source_id": "demo-editorial",
        "created_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z"
      }
    ],
    "person_contacts": [
      {
        "person_id": "demo-person-1",
        "contact_id": "demo-contact-1"
      },
      {
        "person_id": "demo-person-2",
        "contact_id": "demo-contact-1"
      }
    ],
    "site_contacts": [
      {
        "site_id": "demo-site-1",
        "contact_id": "demo-contact-1"
      },
      {
        "site_id": "demo-site-3",
        "contact_id": "demo-contact-2"
      },
      {
        "site_id": "demo-site-2",
        "contact_id": "demo-contact-2"
      },
      {
        "site_id": "demo-site-4",
        "contact_id": "demo-contact-2"
      },
      {
        "site_id": "demo-site-5",
        "contact_id": "demo-contact-2"
      }
    ],
    "pages": [
      {
        "id": "demo-article-1",
        "site_id": "demo-site-1",
        "title": "Fictional guide: a day after checkout",
        "original_url": "https://gazette.example.invalid/guides/fictional-1",
        "normalized_url": "https://gazette.example.invalid/guides/fictional-1",
        "page_kind": "article",
        "language": "it",
        "destination_country": "GB",
        "destination_city": "London",
        "published_at": null,
        "modified_at": null
      },
      {
        "id": "demo-article-2",
        "site_id": "demo-site-1",
        "title": "Fictional surf guide: updated visitor logistics",
        "original_url": "https://gazette.example.invalid/guides/fictional-2",
        "normalized_url": "https://gazette.example.invalid/guides/fictional-2",
        "page_kind": "article",
        "language": "en-GB",
        "destination_country": "GB",
        "destination_city": "London",
        "published_at": null,
        "modified_at": null
      },
      {
        "id": "demo-article-3",
        "site_id": "demo-site-2",
        "title": "Fictional archive: metadata-only refresh",
        "original_url": "https://weekend.example.invalid/guides/fictional-3",
        "normalized_url": "https://weekend.example.invalid/guides/fictional-3",
        "page_kind": "article",
        "language": "fr",
        "destination_country": "GB",
        "destination_city": "London",
        "published_at": null,
        "modified_at": null
      },
      {
        "id": "demo-article-4",
        "site_id": "demo-site-4",
        "title": "Fictional guide: a museum afternoon",
        "original_url": "https://museumjournal.example.invalid/guides/fictional-4",
        "normalized_url": "https://museumjournal.example.invalid/guides/fictional-4",
        "page_kind": "article",
        "language": "it",
        "destination_country": "GB",
        "destination_city": "London",
        "published_at": null,
        "modified_at": null
      },
      {
        "id": "demo-article-5",
        "site_id": "demo-site-5",
        "title": "Fictional guide: an evening walking route",
        "original_url": "https://routes.example.invalid/guides/fictional-5",
        "normalized_url": "https://routes.example.invalid/guides/fictional-5",
        "page_kind": "article",
        "language": "it",
        "destination_country": "GB",
        "destination_city": "London",
        "published_at": null,
        "modified_at": null
      }
    ],
    "evidence": [
      {
        "id": "demo-review-1",
        "page_id": "demo-article-1",
        "kind": "article_relevance",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{\"review_type\": \"article_improvement\", \"dates\": {\"published\": {\"value\": \"2026-04-12\", \"status\": \"verified\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-1\"}, \"modified\": {\"value\": null, \"status\": \"unknown\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-1\"}}, \"performance\": {\"provider\": \"Ahrefs\", \"metric\": \"estimated_monthly_organic_visits\", \"value\": 640, \"unit\": \"visits_per_month\", \"scope\": \"exact_url\", \"market\": \"PT\", \"status\": \"source_checked\", \"observed_at\": \"2026-10-20T12:00:00Z\", \"source_id\": \"demo-metrics\", \"locator\": \"https://metrics.example.invalid/report\", \"url\": \"https://gazette.example.invalid/guides/fictional-1\"}, \"brand\": {\"status\": \"absent\", \"page_read\": true, \"alias_scope_complete\": true, \"aliases_checked\": [\"Brand\", \"brand.example\", \"legacy.brand.example\"], \"checked_at\": \"2026-10-20T12:00:00Z\", \"valid_until\": \"2026-12-31T12:00:00Z\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-1\"}, \"editorial\": {\"status\": \"relevant\", \"reader_need\": \"Readers need clear, practical information to plan their next step.\", \"insertion_section\": \"Visitor logistics\", \"proposed_addition\": \"A relevant service option, with verified details and a useful supporting link.\", \"why_brand\": \"Could add useful context for readers; the proposed information still needs review.\", \"target_url\": \"https://brand.example/area\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-1\"}}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-review-2",
        "page_id": "demo-article-2",
        "kind": "article_relevance",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{\"review_type\": \"article_improvement\", \"dates\": {\"published\": {\"value\": \"2023-06-11\", \"status\": \"verified\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-2\"}, \"modified\": {\"value\": \"2026-07-20\", \"status\": \"verified_substantive\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-2\"}}, \"performance\": {\"provider\": \"Ahrefs\", \"metric\": \"estimated_monthly_organic_visits\", \"value\": 360, \"unit\": \"visits_per_month\", \"scope\": \"exact_url\", \"market\": \"PT\", \"status\": \"source_checked\", \"observed_at\": \"2026-10-20T12:00:00Z\", \"source_id\": \"demo-metrics\", \"locator\": \"https://metrics.example.invalid/report\", \"url\": \"https://gazette.example.invalid/guides/fictional-2\"}, \"brand\": {\"status\": \"absent\", \"page_read\": true, \"alias_scope_complete\": true, \"aliases_checked\": [\"Brand\", \"brand.example\", \"legacy.brand.example\"], \"checked_at\": \"2026-10-20T12:00:00Z\", \"valid_until\": \"2026-12-31T12:00:00Z\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-2\"}, \"editorial\": {\"status\": \"relevant\", \"reader_need\": \"Readers need clear, practical information to plan their next step.\", \"insertion_section\": \"Visitor logistics\", \"proposed_addition\": \"A relevant service option, with verified details and a useful supporting link.\", \"why_brand\": \"Could add useful context for readers; the proposed information still needs review.\", \"target_url\": \"https://brand.example/area\", \"source_id\": \"demo-editorial\", \"locator\": \"https://gazette.example.invalid/guides/fictional-2\"}}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-review-3",
        "page_id": "demo-article-3",
        "kind": "article_relevance",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{\"review_type\": \"article_improvement\", \"dates\": {\"published\": {\"value\": \"2024-01-15\", \"status\": \"verified\", \"source_id\": \"demo-editorial\", \"locator\": \"https://weekend.example.invalid/guides/fictional-3\"}, \"modified\": {\"value\": \"2026-08-04\", \"status\": \"metadata_only\", \"source_id\": \"demo-editorial\", \"locator\": \"https://weekend.example.invalid/guides/fictional-3\"}}, \"performance\": {\"provider\": \"Ahrefs\", \"metric\": \"estimated_monthly_organic_visits\", \"value\": 0, \"unit\": \"visits_per_month\", \"scope\": \"exact_url\", \"market\": \"PT\", \"status\": \"source_checked\", \"observed_at\": \"2026-10-20T12:00:00Z\", \"source_id\": \"demo-metrics\", \"locator\": \"https://metrics.example.invalid/report\", \"url\": \"https://weekend.example.invalid/guides/fictional-3\"}, \"brand\": {\"status\": \"absent\", \"page_read\": true, \"alias_scope_complete\": true, \"aliases_checked\": [\"Brand\", \"brand.example\", \"legacy.brand.example\"], \"checked_at\": \"2026-10-20T12:00:00Z\", \"valid_until\": \"2026-12-31T12:00:00Z\", \"source_id\": \"demo-editorial\", \"locator\": \"https://weekend.example.invalid/guides/fictional-3\"}, \"editorial\": {\"status\": \"relevant\", \"reader_need\": \"Readers need clear, practical information to plan their next step.\", \"insertion_section\": \"Visitor logistics\", \"proposed_addition\": \"A relevant service option, with verified details and a useful supporting link.\", \"why_brand\": \"Could add useful context for readers; the proposed information still needs review.\", \"target_url\": \"https://brand.example/area\", \"source_id\": \"demo-editorial\", \"locator\": \"https://weekend.example.invalid/guides/fictional-3\"}}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-contact-proof",
        "contact_id": "demo-contact-1",
        "kind": "contact_publication",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-person-proof",
        "person_id": "demo-person-1",
        "kind": "identity",
        "observed_at": "2026-08-09T12:00:00Z",
        "detail_json": "{}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-poi-assignment-0",
        "page_id": "demo-article-1",
        "kind": "other",
        "source_id": "demo-editorial",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://gazette.example.invalid/guides/fictional-1",
        "detail_json": "{\"record_type\": \"poi_assignment\", \"poi_ids\": [\"demo-poi-1\", \"demo-poi-2\"]}"
      },
      {
        "id": "demo-poi-assignment-1",
        "page_id": "demo-article-2",
        "kind": "other",
        "source_id": "demo-editorial",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://gazette.example.invalid/guides/fictional-2",
        "detail_json": "{\"record_type\": \"poi_assignment\", \"poi_ids\": [\"demo-poi-1\"]}"
      },
      {
        "id": "demo-poi-assignment-2",
        "page_id": "demo-article-3",
        "kind": "other",
        "source_id": "demo-editorial",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://weekend.example.invalid/guides/fictional-3",
        "detail_json": "{\"record_type\": \"poi_assignment\", \"poi_ids\": [\"demo-poi-1\"]}"
      },
      {
        "id": "demo-page-profile-0",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-1",
        "person_id": null,
        "observed_status": "supported",
        "locator": "https://gazette.example.invalid/guides/fictional-1",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"page_profile\", \"topic\": \"A guide with a useful editorial addition\", \"audience_countries\": [\"IT\"], \"competitor_check\": {\"status\": \"yes\", \"names\": [\"Example Company B\"], \"scope_complete\": false, \"brands_checked\": [\"Example Company B\"], \"links\": [{\"name\": \"Example Company B\", \"url\": \"https://company-b.example.invalid/\", \"verified_at\": \"2026-10-20T12:00:00Z\"}]}, \"topics\": [\"City guides\", \"Stopovers\", \"Visitor logistics\"], \"page_type\": \"visits_itineraries\", \"page_type_reason\": \"Fictional guide classification for the portfolio.\"}"
      },
      {
        "id": "demo-page-profile-1",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-2",
        "person_id": null,
        "observed_status": "supported",
        "locator": "https://gazette.example.invalid/guides/fictional-2",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"page_profile\", \"topic\": \"Surfing and visitor logistics\", \"audience_countries\": [\"AU\"], \"competitor_check\": {\"status\": \"no\", \"names\": [], \"scope_complete\": true, \"brands_checked\": [\"Example Company B\"]}, \"topics\": [\"Surfing\", \"Sport\", \"Visitor logistics\"], \"page_type\": \"visits_itineraries\", \"page_type_reason\": \"Fictional guide classification for the portfolio.\"}"
      },
      {
        "id": "demo-page-profile-2",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-3",
        "person_id": null,
        "observed_status": "supported",
        "locator": "https://weekend.example.invalid/guides/fictional-3",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"page_profile\", \"topic\": \"An archived city itinerary\", \"audience_countries\": [\"FR\"], \"competitor_check\": {\"status\": \"unknown\", \"names\": [], \"scope_complete\": false, \"brands_checked\": [\"Example Company B\"]}, \"topics\": [\"Itineraries\", \"Culture\"], \"page_type\": \"visits_itineraries\", \"page_type_reason\": \"Fictional guide classification for the portfolio.\"}"
      },
      {
        "id": "demo-site-profile",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": null,
        "person_id": null,
        "observed_status": "supported",
        "locator": "https://weekender.example.invalid/about",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"site_profile\", \"site_id\": \"demo-site-3\", \"standalone_candidate\": true, \"topic\": \"Culture, exhibitions and weekend outings\", \"audience_countries\": [\"FR\"], \"selection_reason\": \"Its visitor-planning section could benefit from practical planning information; details still need verification.\", \"topics\": [\"Culture\", \"Exhibitions\", \"Weekend trips\"]}"
      },
      {
        "id": "demo-contact-proof-2",
        "contact_id": "demo-contact-2",
        "kind": "contact_publication",
        "source_id": "demo-editorial",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{}"
      },
      {
        "id": "demo-person-selection-1",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": null,
        "person_id": "demo-person-1",
        "observed_status": "supported",
        "locator": "https://weekender.example.invalid/about",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"person_selection\", \"reason\": \"The saved checkout guide shows a focus on practical visitor logistics; a verified practical addition may improve that advice.\", \"page_ids\": [\"demo-article-1\"]}"
      },
      {
        "id": "demo-person-selection-2",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": null,
        "person_id": "demo-person-2",
        "observed_status": "supported",
        "locator": "https://weekender.example.invalid/about",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"person_selection\", \"reason\": \"Covers sport and lifestyle for two publications. The surf guide gives a specific context for adding useful planning information.\", \"page_ids\": [\"demo-article-2\"]}"
      },
      {
        "id": "demo-review-1-copy-4",
        "page_id": "demo-article-4",
        "kind": "article_relevance",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{\"review_type\": \"article_improvement\", \"dates\": {\"published\": {\"value\": \"2026-04-12\", \"status\": \"verified\", \"source_id\": \"demo-editorial\", \"locator\": \"https://museumjournal.example.invalid/guides/fictional-4\"}, \"modified\": {\"value\": null, \"status\": \"unknown\", \"source_id\": \"demo-editorial\", \"locator\": \"https://museumjournal.example.invalid/guides/fictional-4\"}}, \"performance\": {\"provider\": \"Ahrefs\", \"metric\": \"estimated_monthly_organic_visits\", \"value\": 920, \"unit\": \"visits_per_month\", \"scope\": \"exact_url\", \"market\": \"PT\", \"status\": \"source_checked\", \"observed_at\": \"2026-10-20T12:00:00Z\", \"source_id\": \"demo-metrics\", \"locator\": \"https://metrics.example.invalid/report\", \"url\": \"https://museumjournal.example.invalid/guides/fictional-4\"}, \"brand\": {\"status\": \"absent\", \"page_read\": true, \"alias_scope_complete\": true, \"aliases_checked\": [\"Brand\", \"brand.example\", \"legacy.brand.example\"], \"checked_at\": \"2026-10-20T12:00:00Z\", \"valid_until\": \"2026-12-31T12:00:00Z\", \"source_id\": \"demo-editorial\", \"locator\": \"https://museumjournal.example.invalid/guides/fictional-4\"}, \"editorial\": {\"status\": \"relevant\", \"reader_need\": \"Readers need clear, practical information to plan their next step.\", \"insertion_section\": \"Visitor logistics\", \"proposed_addition\": \"A relevant service option, with verified details and a useful supporting link.\", \"why_brand\": \"Could add useful context for readers; the proposed information still needs review.\", \"target_url\": \"https://brand.example/area\", \"source_id\": \"demo-editorial\", \"locator\": \"https://museumjournal.example.invalid/guides/fictional-4\"}}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-poi-assignment-0-copy-4",
        "page_id": "demo-article-4",
        "kind": "other",
        "source_id": "demo-editorial",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://museumjournal.example.invalid/guides/fictional-4",
        "detail_json": "{\"record_type\": \"poi_assignment\", \"poi_ids\": [\"demo-poi-1\", \"demo-poi-2\"]}"
      },
      {
        "id": "demo-page-profile-0-copy-4",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-4",
        "person_id": null,
        "observed_status": "supported",
        "locator": "https://museumjournal.example.invalid/guides/fictional-4",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"page_profile\", \"topic\": \"A guide with a useful editorial addition\", \"audience_countries\": [\"IT\"], \"competitor_check\": {\"status\": \"yes\", \"names\": [\"Example Company B\"], \"scope_complete\": false, \"brands_checked\": [\"Example Company B\"], \"links\": [{\"name\": \"Example Company B\", \"url\": \"https://company-b.example.invalid/\", \"verified_at\": \"2026-10-20T12:00:00Z\"}]}, \"topics\": [\"City guides\", \"Stopovers\", \"Visitor logistics\"], \"page_type\": \"visits_itineraries\", \"page_type_reason\": \"Fictional guide classification for the portfolio.\"}"
      },
      {
        "id": "demo-review-1-copy-5",
        "page_id": "demo-article-5",
        "kind": "article_relevance",
        "observed_at": "2026-10-20T12:00:00Z",
        "detail_json": "{\"review_type\": \"article_improvement\", \"dates\": {\"published\": {\"value\": \"2026-04-12\", \"status\": \"verified\", \"source_id\": \"demo-editorial\", \"locator\": \"https://routes.example.invalid/guides/fictional-5\"}, \"modified\": {\"value\": null, \"status\": \"unknown\", \"source_id\": \"demo-editorial\", \"locator\": \"https://routes.example.invalid/guides/fictional-5\"}}, \"performance\": {\"provider\": \"Ahrefs\", \"metric\": \"estimated_monthly_organic_visits\", \"value\": 125, \"unit\": \"visits_per_month\", \"scope\": \"exact_url\", \"market\": \"PT\", \"status\": \"source_checked\", \"observed_at\": \"2026-10-20T12:00:00Z\", \"source_id\": \"demo-metrics\", \"locator\": \"https://metrics.example.invalid/report\", \"url\": \"https://routes.example.invalid/guides/fictional-5\"}, \"brand\": {\"status\": \"absent\", \"page_read\": true, \"alias_scope_complete\": true, \"aliases_checked\": [\"Brand\", \"brand.example\", \"legacy.brand.example\"], \"checked_at\": \"2026-10-20T12:00:00Z\", \"valid_until\": \"2026-12-31T12:00:00Z\", \"source_id\": \"demo-editorial\", \"locator\": \"https://routes.example.invalid/guides/fictional-5\"}, \"editorial\": {\"status\": \"relevant\", \"reader_need\": \"Readers need clear, practical information to plan their next step.\", \"insertion_section\": \"Visitor logistics\", \"proposed_addition\": \"A relevant service option, with verified details and a useful supporting link.\", \"why_brand\": \"Could add useful context for readers; the proposed information still needs review.\", \"target_url\": \"https://brand.example/area\", \"source_id\": \"demo-editorial\", \"locator\": \"https://routes.example.invalid/guides/fictional-5\"}}",
        "source_id": "demo-editorial"
      },
      {
        "id": "demo-poi-assignment-0-copy-5",
        "page_id": "demo-article-5",
        "kind": "other",
        "source_id": "demo-editorial",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://routes.example.invalid/guides/fictional-5",
        "detail_json": "{\"record_type\": \"poi_assignment\", \"poi_ids\": [\"demo-poi-1\", \"demo-poi-2\"]}"
      },
      {
        "id": "demo-page-profile-0-copy-5",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-5",
        "person_id": null,
        "observed_status": "supported",
        "locator": "https://routes.example.invalid/guides/fictional-5",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "detail_json": "{\"record_type\": \"page_profile\", \"topic\": \"A guide with a useful editorial addition\", \"audience_countries\": [\"IT\"], \"competitor_check\": {\"status\": \"yes\", \"names\": [\"Example Company B\"], \"scope_complete\": false, \"brands_checked\": [\"Example Company B\"], \"links\": [{\"name\": \"Example Company B\", \"url\": \"https://company-b.example.invalid/\", \"verified_at\": \"2026-10-20T12:00:00Z\"}]}, \"topics\": [\"City guides\", \"Stopovers\", \"Visitor logistics\"], \"page_type\": \"visits_itineraries\", \"page_type_reason\": \"Fictional guide classification for the portfolio.\"}"
      },
      {
        "id": "portfolio-dr-0",
        "kind": "data",
        "source_id": "demo-metrics",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://metrics.example.invalid/demo",
        "detail_json": "{\"record_type\": \"domain_metrics\", \"site_id\": \"demo-site-1\", \"provider\": \"Ahrefs\", \"metric\": \"domain_rating\", \"scope\": \"domain\", \"measured_domain\": \"gazette.example.invalid\", \"value\": 46}"
      },
      {
        "id": "portfolio-site-profile-0",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://gazette.example.invalid/about",
        "detail_json": "{\"record_type\": \"site_profile\", \"site_id\": \"demo-site-1\", \"standalone_candidate\": true, \"selection_reason\": \"Fictional publication covering city visits and practical travel planning.\", \"topics\": [\"City guides\", \"Visitor logistics\"], \"publication_type\": \"newspaper\", \"content_formats\": [\"guides\", \"features\"], \"brand_check\": {\"status\": \"absent\"}, \"poi_ids\": [\"demo-poi-1\"], \"competitor_check\": {\"status\": \"unknown\"}}"
      },
      {
        "id": "portfolio-dr-1",
        "kind": "data",
        "source_id": "demo-metrics",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://metrics.example.invalid/demo",
        "detail_json": "{\"record_type\": \"domain_metrics\", \"site_id\": \"demo-site-2\", \"provider\": \"Ahrefs\", \"metric\": \"domain_rating\", \"scope\": \"domain\", \"measured_domain\": \"weekend.example.invalid\", \"value\": 31}"
      },
      {
        "id": "portfolio-site-profile-1",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://weekend.example.invalid/about",
        "detail_json": "{\"record_type\": \"site_profile\", \"site_id\": \"demo-site-2\", \"standalone_candidate\": true, \"selection_reason\": \"Fictional publication covering city visits and practical travel planning.\", \"topics\": [\"City guides\", \"Visitor logistics\"], \"publication_type\": \"online_publication\", \"content_formats\": [\"guides\", \"features\"], \"brand_check\": {\"status\": \"absent\"}, \"poi_ids\": [\"demo-poi-1\"], \"competitor_check\": {\"status\": \"unknown\"}}"
      },
      {
        "id": "portfolio-dr-2",
        "kind": "data",
        "source_id": "demo-metrics",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://metrics.example.invalid/demo",
        "detail_json": "{\"record_type\": \"domain_metrics\", \"site_id\": \"demo-site-3\", \"provider\": \"Ahrefs\", \"metric\": \"domain_rating\", \"scope\": \"domain\", \"measured_domain\": \"weekender.example.invalid\", \"value\": 39}"
      },
      {
        "id": "portfolio-site-profile-2",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://weekender.example.invalid/about",
        "detail_json": "{\"record_type\": \"site_profile\", \"site_id\": \"demo-site-3\", \"standalone_candidate\": true, \"selection_reason\": \"Fictional publication covering city visits and practical travel planning.\", \"topics\": [\"City guides\", \"Visitor logistics\"], \"publication_type\": \"magazine\", \"content_formats\": [\"guides\", \"features\"], \"brand_check\": {\"status\": \"absent\"}, \"poi_ids\": [\"demo-poi-1\"], \"competitor_check\": {\"status\": \"unknown\"}}"
      },
      {
        "id": "portfolio-dr-3",
        "kind": "data",
        "source_id": "demo-metrics",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://metrics.example.invalid/demo",
        "detail_json": "{\"record_type\": \"domain_metrics\", \"site_id\": \"demo-site-4\", \"provider\": \"Ahrefs\", \"metric\": \"domain_rating\", \"scope\": \"domain\", \"measured_domain\": \"museumjournal.example.invalid\", \"value\": 42}"
      },
      {
        "id": "portfolio-site-profile-3",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://museumjournal.example.invalid/about",
        "detail_json": "{\"record_type\": \"site_profile\", \"site_id\": \"demo-site-4\", \"standalone_candidate\": true, \"selection_reason\": \"Fictional publication covering city visits and practical travel planning.\", \"topics\": [\"City guides\", \"Visitor logistics\"], \"publication_type\": \"blog\", \"content_formats\": [\"guides\", \"features\"], \"brand_check\": {\"status\": \"absent\"}, \"poi_ids\": [\"demo-poi-1\"], \"competitor_check\": {\"status\": \"unknown\"}}"
      },
      {
        "id": "portfolio-dr-4",
        "kind": "data",
        "source_id": "demo-metrics",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://metrics.example.invalid/demo",
        "detail_json": "{\"record_type\": \"domain_metrics\", \"site_id\": \"demo-site-5\", \"provider\": \"Ahrefs\", \"metric\": \"domain_rating\", \"scope\": \"domain\", \"measured_domain\": \"routes.example.invalid\", \"value\": 28}"
      },
      {
        "id": "portfolio-site-profile-4",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "valid_until": "2026-12-31T12:00:00Z",
        "locator": "https://routes.example.invalid/about",
        "detail_json": "{\"record_type\": \"site_profile\", \"site_id\": \"demo-site-5\", \"standalone_candidate\": true, \"selection_reason\": \"Fictional publication covering city visits and practical travel planning.\", \"topics\": [\"City guides\", \"Visitor logistics\"], \"publication_type\": \"blog\", \"content_formats\": [\"guides\", \"features\"], \"brand_check\": {\"status\": \"absent\"}, \"poi_ids\": [\"demo-poi-1\"], \"competitor_check\": {\"status\": \"unknown\"}}"
      },
      {
        "id": "portfolio-origin-0",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-1",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://gazette.example.invalid/guides/fictional-1",
        "detail_json": "{\"record_type\": \"discovery_origin\", \"subject_type\": \"page\", \"subject_id\": \"demo-article-1\", \"pathway\": \"editorial\", \"channel\": \"Fictional research example\", \"query\": \"Illustrative visitor guide query\", \"notes\": \"Invented example used only to demonstrate saved research provenance.\"}"
      },
      {
        "id": "portfolio-origin-1",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-2",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://gazette.example.invalid/guides/fictional-2",
        "detail_json": "{\"record_type\": \"discovery_origin\", \"subject_type\": \"page\", \"subject_id\": \"demo-article-2\", \"pathway\": \"competitor_backlinks\", \"channel\": \"Fictional research example\", \"query\": \"Illustrative visitor guide query\", \"notes\": \"Invented example used only to demonstrate saved research provenance.\"}"
      },
      {
        "id": "portfolio-origin-2",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-3",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://weekend.example.invalid/guides/fictional-3",
        "detail_json": "{\"record_type\": \"discovery_origin\", \"subject_type\": \"page\", \"subject_id\": \"demo-article-3\", \"pathway\": \"competitor_referring_domains\", \"channel\": \"Fictional research example\", \"query\": \"Illustrative visitor guide query\", \"notes\": \"Invented example used only to demonstrate saved research provenance.\"}"
      },
      {
        "id": "portfolio-origin-3",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-4",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://museumjournal.example.invalid/guides/fictional-4",
        "detail_json": "{\"record_type\": \"discovery_origin\", \"subject_type\": \"page\", \"subject_id\": \"demo-article-4\", \"pathway\": \"editorial\", \"channel\": \"Fictional research example\", \"query\": \"Illustrative visitor guide query\", \"notes\": \"Invented example used only to demonstrate saved research provenance.\"}"
      },
      {
        "id": "portfolio-origin-4",
        "kind": "other",
        "source_id": "demo-editorial",
        "run_id": "demo-run",
        "page_id": "demo-article-5",
        "observed_status": "supported",
        "observed_at": "2026-10-20T12:00:00Z",
        "verified_at": "2026-10-20T12:00:00Z",
        "locator": "https://routes.example.invalid/guides/fictional-5",
        "detail_json": "{\"record_type\": \"discovery_origin\", \"subject_type\": \"page\", \"subject_id\": \"demo-article-5\", \"pathway\": \"competitor_backlinks\", \"channel\": \"Fictional research example\", \"query\": \"Illustrative visitor guide query\", \"notes\": \"Invented example used only to demonstrate saved research provenance.\"}"
      }
    ],
    "authorships": [
      {
        "page_id": "demo-article-1",
        "person_id": "demo-person-1"
      },
      {
        "page_id": "demo-article-2",
        "person_id": "demo-person-2"
      },
      {
        "page_id": "demo-article-3",
        "person_id": "demo-person-2"
      },
      {
        "page_id": "demo-article-4",
        "person_id": "demo-person-1"
      },
      {
        "page_id": "demo-article-5",
        "person_id": "demo-person-1"
      }
    ],
    "opportunities": [
      {
        "id": "demo-opp-1",
        "title": "Fictional checkout logistics addition",
        "site_id": "demo-site-1",
        "primary_page_id": "demo-article-1",
        "target_page_id": null,
        "reader_need": "Readers need practical information before their visit.",
        "contribution": "Add useful planning information to the existing guide.",
        "why_contact": "Fictional editor has a relevant byline.",
        "service_reason": "Not checked; do not claim local availability.",
        "history_status": "unknown",
        "priority": "unscored",
        "priority_reason": "Service and team history require review.",
        "workflow_status": "needs_verification",
        "opportunity_type": "guide_itinerary",
        "owner": "Unassigned",
        "next_action": "Review service and site history",
        "search_country": "PT",
        "query_language": "en",
        "destination_city": "London",
        "destination_country": "GB"
      }
    ],
    "activities": [],
    "runs": [
      {
        "id": "demo-run",
        "mode": "design",
        "status": "complete",
        "started_at": "2026-10-20T12:00:00Z",
        "plan_json": "{\"search_country\": \"PT\", \"query_language\": \"en\", \"destinations\": [{\"country\": \"PT\", \"city\": \"Fictional Coast\"}], \"topic_families\": [\"guide_itinerary\", \"sport\"], \"sources_available\": [\"Synthetic examples\"], \"recent_articles\": {\"lookback_months\": 18, \"date_basis\": \"either\", \"performance_market\": \"PT\", \"min_traffic\": 100}, \"limits\": {\"paid_calls\": 0}}",
        "summary": "Fictional UI fixture only; no research performed."
      }
    ]
  }
};
