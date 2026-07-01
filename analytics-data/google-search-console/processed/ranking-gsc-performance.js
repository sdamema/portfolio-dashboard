window.portfolioPerformanceData = window.portfolioPerformanceData || {};
window.portfolioPerformanceData.ranking = {
  "id": "ranking-gsc-2026-06-30-percentage-only",
  "projectId": "ranking",
  "mode": "percentage-only-ranking-revamp",
  "title": "Supplier ranking relative Search Console trend",
  "source": {
    "platform": "Google Search Console",
    "searchType": "Web",
    "dateRange": "Feb 5, 2026-Jun 30, 2026",
    "pageFilter": "Supplier review ranking URL",
    "note": "Public dataset is sanitized: it contains percentage changes only, not raw clicks, impressions, CTR or average-position values."
  },
  "update": {
    "label": "June 4 supplier-ranking update",
    "chartLabel": "Ranking revamp",
    "legendLabel": "Ranking-page revamp",
    "date": "2026-06-04",
    "comparisonMethod": "Jun 4-30, 2026 daily averages compared with May 8-Jun 3, 2026, the same-length pre-update baseline. The chart uses 7-day trailing percentage movement against that baseline."
  },
  "periods": {
    "before": {
      "label": "Same-length pre-update baseline",
      "shortLabel": "Pre-update",
      "range": "May 8, 2026-Jun 3, 2026"
    },
    "after": {
      "label": "Post-update ranking period",
      "shortLabel": "Post-update",
      "range": "Jun 4, 2026-Jun 30, 2026"
    }
  },
  "chartBaseline": {
    "label": "May 8-Jun 3 = 0% pre-update baseline",
    "method": "Each chart point is a 7-day trailing average shown as percentage variation from the same-length pre-update baseline.",
    "tooltipNote": "Compared with the May 8-Jun 3 pre-update baseline"
  },
  "chartFootnote": "Hover or tap the chart to inspect each date. The lines show 7-day trailing percentage movement against the baseline. The daily-click-record card is a separate single-day comparison, not a line-height value.",
  "events": [
    {
      "type": "range",
      "kind": "google-core",
      "label": "March core",
      "start": "2026-03-27",
      "end": "2026-04-08"
    },
    {
      "type": "range",
      "kind": "google-core",
      "label": "May core",
      "start": "2026-05-21",
      "end": "2026-06-02"
    },
    {
      "type": "range",
      "kind": "baseline",
      "label": "Pre-update baseline",
      "start": "2026-05-08",
      "end": "2026-06-03",
      "lane": 1
    },
    {
      "type": "marker",
      "kind": "revamp",
      "label": "Ranking revamp",
      "date": "2026-06-04",
      "lane": 2
    }
  ],
  "narrative": {
    "summary": "Search Console data for the <strong>supplier review ranking page</strong>, from the first available February data through the end of June. The page was modified on <strong>June 4, 2026</strong>, so this public view compares the post-update period with the <strong>same-length pre-update baseline</strong> immediately before it.",
    "insights": [
      "The comparison uses <strong>daily averages</strong>, not total counts: <strong>Jun 4-30</strong> is compared with <strong>May 8-Jun 3</strong>, so both windows contain the same number of days.",
      "After the update, the <strong>click trend increased by 90%</strong>, while <strong>CTR more than doubled</strong>. This suggests the refreshed ranking page became more effective at turning existing visibility into visits.",
      "The same comparison shows impressions <strong>moved slightly down by 7%</strong>; the strongest signal is therefore not only volume, but better click efficiency and a stronger average position.",
      "The post-update window produced the page's <strong>historical daily click record</strong> on <strong>June 10, 2026</strong>, about <strong>+15%</strong> above the previous daily high in the export. This is a <strong>single-day record comparison</strong>, while the chart line remains a 7-day trend.",
      "The <strong>March core</strong> and <strong>May core</strong> updates are marked as context. They help read the trend, but the chart does not claim that algorithm updates alone caused the movement."
    ]
  },
  "deltas": {
    "clickTrend": {
      "direction": "improved",
      "percent": 0.9
    },
    "impressionTrend": {
      "direction": "declined",
      "percent": -0.0694
    },
    "ctrTrend": {
      "direction": "improved",
      "percent": 1.0418
    },
    "positionTrend": {
      "direction": "improved",
      "percent": 0.1706
    }
  },
  "metricCards": [
    {
      "label": "Click trend",
      "value": 0.9,
      "direction": "improved",
      "description": "Jun 4-30 daily average vs same-length pre-update baseline"
    },
    {
      "label": "Impression trend",
      "value": -0.0694,
      "direction": "declined",
      "description": "visibility movement vs same-length baseline"
    },
    {
      "label": "CTR trend",
      "value": 1.0418,
      "direction": "improved",
      "description": "relative click-efficiency movement"
    },
    {
      "label": "Position trend",
      "value": 0.1706,
      "direction": "improved",
      "description": "relative movement, lower position is better"
    },
    {
      "label": "Daily click record",
      "value": 0.1538,
      "direction": "improved",
      "description": "single-day record vs previous daily high; separate from the 7-day line"
    }
  ],
  "chart": [
    {
      "date": "2026-02-05",
      "phase": "before",
      "clickChange": -1,
      "impressionChange": -0.9182
    },
    {
      "date": "2026-02-06",
      "phase": "before",
      "clickChange": -1,
      "impressionChange": -0.8995
    },
    {
      "date": "2026-02-07",
      "phase": "before",
      "clickChange": -1,
      "impressionChange": -0.8917
    },
    {
      "date": "2026-02-08",
      "phase": "before",
      "clickChange": -0.9156,
      "impressionChange": -0.8836
    },
    {
      "date": "2026-02-09",
      "phase": "before",
      "clickChange": -0.9325,
      "impressionChange": -0.8443
    },
    {
      "date": "2026-02-10",
      "phase": "before",
      "clickChange": -0.8875,
      "impressionChange": -0.8329
    },
    {
      "date": "2026-02-11",
      "phase": "before",
      "clickChange": -0.9036,
      "impressionChange": -0.8353
    },
    {
      "date": "2026-02-12",
      "phase": "before",
      "clickChange": -0.9036,
      "impressionChange": -0.8162
    },
    {
      "date": "2026-02-13",
      "phase": "before",
      "clickChange": -0.8554,
      "impressionChange": -0.8085
    },
    {
      "date": "2026-02-14",
      "phase": "before",
      "clickChange": -0.8071,
      "impressionChange": -0.7853
    },
    {
      "date": "2026-02-15",
      "phase": "before",
      "clickChange": -0.8554,
      "impressionChange": -0.7736
    },
    {
      "date": "2026-02-16",
      "phase": "before",
      "clickChange": -0.7589,
      "impressionChange": -0.7427
    },
    {
      "date": "2026-02-17",
      "phase": "before",
      "clickChange": -0.5179,
      "impressionChange": -0.6945
    },
    {
      "date": "2026-02-18",
      "phase": "before",
      "clickChange": 0.0125,
      "impressionChange": -0.6185
    },
    {
      "date": "2026-02-19",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": -0.5713
    },
    {
      "date": "2026-02-20",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": -0.5448
    },
    {
      "date": "2026-02-21",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": -0.5513
    },
    {
      "date": "2026-02-22",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": -0.5537
    },
    {
      "date": "2026-02-23",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": -0.5797
    },
    {
      "date": "2026-02-24",
      "phase": "before",
      "clickChange": -0.1321,
      "impressionChange": -0.6117
    },
    {
      "date": "2026-02-25",
      "phase": "before",
      "clickChange": -0.5661,
      "impressionChange": -0.6715
    },
    {
      "date": "2026-02-26",
      "phase": "before",
      "clickChange": -0.6625,
      "impressionChange": -0.7139
    },
    {
      "date": "2026-02-27",
      "phase": "before",
      "clickChange": -0.6625,
      "impressionChange": -0.7191
    },
    {
      "date": "2026-02-28",
      "phase": "before",
      "clickChange": -0.7107,
      "impressionChange": -0.7102
    },
    {
      "date": "2026-03-01",
      "phase": "before",
      "clickChange": -0.7107,
      "impressionChange": -0.7029
    },
    {
      "date": "2026-03-02",
      "phase": "before",
      "clickChange": -0.7589,
      "impressionChange": -0.7055
    },
    {
      "date": "2026-03-03",
      "phase": "before",
      "clickChange": -0.7589,
      "impressionChange": -0.7029
    },
    {
      "date": "2026-03-04",
      "phase": "before",
      "clickChange": -0.7107,
      "impressionChange": -0.6787
    },
    {
      "date": "2026-03-05",
      "phase": "before",
      "clickChange": -0.5661,
      "impressionChange": -0.6306
    },
    {
      "date": "2026-03-06",
      "phase": "before",
      "clickChange": -0.5179,
      "impressionChange": -0.5417
    },
    {
      "date": "2026-03-07",
      "phase": "before",
      "clickChange": -0.4214,
      "impressionChange": -0.4839
    },
    {
      "date": "2026-03-08",
      "phase": "before",
      "clickChange": -0.1804,
      "impressionChange": -0.4047
    },
    {
      "date": "2026-03-09",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": -0.0904
    },
    {
      "date": "2026-03-10",
      "phase": "before",
      "clickChange": 0.5911,
      "impressionChange": 0.0743
    },
    {
      "date": "2026-03-11",
      "phase": "before",
      "clickChange": 0.9768,
      "impressionChange": 0.242
    },
    {
      "date": "2026-03-12",
      "phase": "before",
      "clickChange": 1.0732,
      "impressionChange": 0.3899
    },
    {
      "date": "2026-03-13",
      "phase": "before",
      "clickChange": 1.2661,
      "impressionChange": 0.448
    },
    {
      "date": "2026-03-14",
      "phase": "before",
      "clickChange": 1.3625,
      "impressionChange": 0.613
    },
    {
      "date": "2026-03-15",
      "phase": "before",
      "clickChange": 1.2661,
      "impressionChange": 0.5981
    },
    {
      "date": "2026-03-16",
      "phase": "before",
      "clickChange": 0.9768,
      "impressionChange": 0.3547
    },
    {
      "date": "2026-03-17",
      "phase": "before",
      "clickChange": 1.025,
      "impressionChange": 0.2933
    },
    {
      "date": "2026-03-18",
      "phase": "before",
      "clickChange": 1.1214,
      "impressionChange": 0.268
    },
    {
      "date": "2026-03-19",
      "phase": "before",
      "clickChange": 1.2179,
      "impressionChange": 0.2445
    },
    {
      "date": "2026-03-20",
      "phase": "before",
      "clickChange": 1.2661,
      "impressionChange": 0.2235
    },
    {
      "date": "2026-03-21",
      "phase": "before",
      "clickChange": 1.3143,
      "impressionChange": 0.097
    },
    {
      "date": "2026-03-22",
      "phase": "before",
      "clickChange": 1.4107,
      "impressionChange": 0.098
    },
    {
      "date": "2026-03-23",
      "phase": "before",
      "clickChange": 1.5554,
      "impressionChange": 0.1319
    },
    {
      "date": "2026-03-24",
      "phase": "before",
      "clickChange": 1.6036,
      "impressionChange": 0.1334
    },
    {
      "date": "2026-03-25",
      "phase": "before",
      "clickChange": 1.2179,
      "impressionChange": 0.0885
    },
    {
      "date": "2026-03-26",
      "phase": "before",
      "clickChange": 1.2179,
      "impressionChange": 0.1312
    },
    {
      "date": "2026-03-27",
      "phase": "before",
      "clickChange": 1.0732,
      "impressionChange": 0.1554
    },
    {
      "date": "2026-03-28",
      "phase": "before",
      "clickChange": 0.8804,
      "impressionChange": 0.1776
    },
    {
      "date": "2026-03-29",
      "phase": "before",
      "clickChange": 0.6875,
      "impressionChange": 0.1937
    },
    {
      "date": "2026-03-30",
      "phase": "before",
      "clickChange": 0.5911,
      "impressionChange": 0.2771
    },
    {
      "date": "2026-03-31",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": 0.3376
    },
    {
      "date": "2026-04-01",
      "phase": "before",
      "clickChange": 0.0607,
      "impressionChange": 0.3536
    },
    {
      "date": "2026-04-02",
      "phase": "before",
      "clickChange": -0.2286,
      "impressionChange": 0.2855
    },
    {
      "date": "2026-04-03",
      "phase": "before",
      "clickChange": -0.4214,
      "impressionChange": 0.2047
    },
    {
      "date": "2026-04-04",
      "phase": "before",
      "clickChange": -0.4696,
      "impressionChange": 0.1408
    },
    {
      "date": "2026-04-05",
      "phase": "before",
      "clickChange": -0.325,
      "impressionChange": 0.1045
    },
    {
      "date": "2026-04-06",
      "phase": "before",
      "clickChange": -0.5179,
      "impressionChange": -0.0591
    },
    {
      "date": "2026-04-07",
      "phase": "before",
      "clickChange": -0.5661,
      "impressionChange": -0.1195
    },
    {
      "date": "2026-04-08",
      "phase": "before",
      "clickChange": -0.5179,
      "impressionChange": -0.1043
    },
    {
      "date": "2026-04-09",
      "phase": "before",
      "clickChange": -0.3732,
      "impressionChange": -0.0982
    },
    {
      "date": "2026-04-10",
      "phase": "before",
      "clickChange": -0.2286,
      "impressionChange": -0.0763
    },
    {
      "date": "2026-04-11",
      "phase": "before",
      "clickChange": -0.1804,
      "impressionChange": -0.0526
    },
    {
      "date": "2026-04-12",
      "phase": "before",
      "clickChange": -0.0357,
      "impressionChange": -0.0107
    },
    {
      "date": "2026-04-13",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": 0.2152
    },
    {
      "date": "2026-04-14",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": 0.3641
    },
    {
      "date": "2026-04-15",
      "phase": "before",
      "clickChange": 0.4946,
      "impressionChange": 0.3648
    },
    {
      "date": "2026-04-16",
      "phase": "before",
      "clickChange": 0.4464,
      "impressionChange": 0.4487
    },
    {
      "date": "2026-04-17",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": 0.5742
    },
    {
      "date": "2026-04-18",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": 0.7023
    },
    {
      "date": "2026-04-19",
      "phase": "before",
      "clickChange": 0.1571,
      "impressionChange": 0.7612
    },
    {
      "date": "2026-04-20",
      "phase": "before",
      "clickChange": -0.1321,
      "impressionChange": 0.706
    },
    {
      "date": "2026-04-21",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": 0.6043
    },
    {
      "date": "2026-04-22",
      "phase": "before",
      "clickChange": 0.0607,
      "impressionChange": 0.6106
    },
    {
      "date": "2026-04-23",
      "phase": "before",
      "clickChange": 0.1571,
      "impressionChange": 0.5152
    },
    {
      "date": "2026-04-24",
      "phase": "before",
      "clickChange": 0.4946,
      "impressionChange": 0.465
    },
    {
      "date": "2026-04-25",
      "phase": "before",
      "clickChange": 0.4464,
      "impressionChange": 0.3534
    },
    {
      "date": "2026-04-26",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": 0.2792
    },
    {
      "date": "2026-04-27",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": 0.1858
    },
    {
      "date": "2026-04-28",
      "phase": "before",
      "clickChange": 0.3018,
      "impressionChange": 0.2089
    },
    {
      "date": "2026-04-29",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": 0.2106
    },
    {
      "date": "2026-04-30",
      "phase": "before",
      "clickChange": 0.2054,
      "impressionChange": 0.2056
    },
    {
      "date": "2026-05-01",
      "phase": "before",
      "clickChange": 0.0125,
      "impressionChange": 0.1331
    },
    {
      "date": "2026-05-02",
      "phase": "before",
      "clickChange": 0.0607,
      "impressionChange": 0.1339
    },
    {
      "date": "2026-05-03",
      "phase": "before",
      "clickChange": 0.1571,
      "impressionChange": 0.1772
    },
    {
      "date": "2026-05-04",
      "phase": "before",
      "clickChange": 0.1571,
      "impressionChange": 0.1937
    },
    {
      "date": "2026-05-05",
      "phase": "before",
      "clickChange": 0.0125,
      "impressionChange": 0.1262
    },
    {
      "date": "2026-05-06",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": 0.1363
    },
    {
      "date": "2026-05-07",
      "phase": "before",
      "clickChange": -0.2286,
      "impressionChange": 0.1289
    },
    {
      "date": "2026-05-08",
      "phase": "before",
      "clickChange": -0.2286,
      "impressionChange": 0.1683
    },
    {
      "date": "2026-05-09",
      "phase": "before",
      "clickChange": -0.2768,
      "impressionChange": 0.1583
    },
    {
      "date": "2026-05-10",
      "phase": "before",
      "clickChange": -0.2768,
      "impressionChange": 0.119
    },
    {
      "date": "2026-05-11",
      "phase": "before",
      "clickChange": -0.1804,
      "impressionChange": 0.1681
    },
    {
      "date": "2026-05-12",
      "phase": "before",
      "clickChange": -0.2286,
      "impressionChange": 0.247
    },
    {
      "date": "2026-05-13",
      "phase": "before",
      "clickChange": -0.2286,
      "impressionChange": 0.2463
    },
    {
      "date": "2026-05-14",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": 0.3172
    },
    {
      "date": "2026-05-15",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": 0.3311
    },
    {
      "date": "2026-05-16",
      "phase": "before",
      "clickChange": 0.0125,
      "impressionChange": 0.3682
    },
    {
      "date": "2026-05-17",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": 0.4167
    },
    {
      "date": "2026-05-18",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": 0.3935
    },
    {
      "date": "2026-05-19",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": 0.3253
    },
    {
      "date": "2026-05-20",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": 0.278
    },
    {
      "date": "2026-05-21",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": 0.2182
    },
    {
      "date": "2026-05-22",
      "phase": "before",
      "clickChange": 0.0125,
      "impressionChange": 0.1944
    },
    {
      "date": "2026-05-23",
      "phase": "before",
      "clickChange": -0.0357,
      "impressionChange": 0.1441
    },
    {
      "date": "2026-05-24",
      "phase": "before",
      "clickChange": 0.0607,
      "impressionChange": 0.0932
    },
    {
      "date": "2026-05-25",
      "phase": "before",
      "clickChange": 0.2536,
      "impressionChange": 0.0665
    },
    {
      "date": "2026-05-26",
      "phase": "before",
      "clickChange": 0.2054,
      "impressionChange": 0.0516
    },
    {
      "date": "2026-05-27",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": 0.0717
    },
    {
      "date": "2026-05-28",
      "phase": "before",
      "clickChange": 0.4946,
      "impressionChange": 0.0074
    },
    {
      "date": "2026-05-29",
      "phase": "before",
      "clickChange": 0.4946,
      "impressionChange": -0.0987
    },
    {
      "date": "2026-05-30",
      "phase": "before",
      "clickChange": 0.4946,
      "impressionChange": -0.1549
    },
    {
      "date": "2026-05-31",
      "phase": "before",
      "clickChange": 0.35,
      "impressionChange": -0.2133
    },
    {
      "date": "2026-06-01",
      "phase": "before",
      "clickChange": 0.1089,
      "impressionChange": -0.3223
    },
    {
      "date": "2026-06-02",
      "phase": "before",
      "clickChange": -0.0839,
      "impressionChange": -0.4305
    },
    {
      "date": "2026-06-03",
      "phase": "before",
      "clickChange": -0.4696,
      "impressionChange": -0.574
    },
    {
      "date": "2026-06-04",
      "phase": "after",
      "clickChange": -0.6143,
      "impressionChange": -0.608
    },
    {
      "date": "2026-06-05",
      "phase": "after",
      "clickChange": -0.4696,
      "impressionChange": -0.5704
    },
    {
      "date": "2026-06-06",
      "phase": "after",
      "clickChange": -0.4214,
      "impressionChange": -0.5513
    },
    {
      "date": "2026-06-07",
      "phase": "after",
      "clickChange": -0.2768,
      "impressionChange": -0.5236
    },
    {
      "date": "2026-06-08",
      "phase": "after",
      "clickChange": -0.1321,
      "impressionChange": -0.454
    },
    {
      "date": "2026-06-09",
      "phase": "after",
      "clickChange": -0.0357,
      "impressionChange": -0.3553
    },
    {
      "date": "2026-06-10",
      "phase": "after",
      "clickChange": 0.6875,
      "impressionChange": -0.2488
    },
    {
      "date": "2026-06-11",
      "phase": "after",
      "clickChange": 0.8804,
      "impressionChange": -0.147
    },
    {
      "date": "2026-06-12",
      "phase": "after",
      "clickChange": 1.025,
      "impressionChange": -0.1114
    },
    {
      "date": "2026-06-13",
      "phase": "after",
      "clickChange": 1.1696,
      "impressionChange": -0.0813
    },
    {
      "date": "2026-06-14",
      "phase": "after",
      "clickChange": 1.3143,
      "impressionChange": -0.0315
    },
    {
      "date": "2026-06-15",
      "phase": "after",
      "clickChange": 1.4107,
      "impressionChange": 0.0296
    },
    {
      "date": "2026-06-16",
      "phase": "after",
      "clickChange": 1.4107,
      "impressionChange": 0.0571
    },
    {
      "date": "2026-06-17",
      "phase": "after",
      "clickChange": 1.1696,
      "impressionChange": 0.1093
    },
    {
      "date": "2026-06-18",
      "phase": "after",
      "clickChange": 1.1696,
      "impressionChange": 0.0904
    },
    {
      "date": "2026-06-19",
      "phase": "after",
      "clickChange": 1.2179,
      "impressionChange": 0.1427
    },
    {
      "date": "2026-06-20",
      "phase": "after",
      "clickChange": 1.2179,
      "impressionChange": 0.1709
    },
    {
      "date": "2026-06-21",
      "phase": "after",
      "clickChange": 1.1696,
      "impressionChange": 0.1331
    },
    {
      "date": "2026-06-22",
      "phase": "after",
      "clickChange": 1.1696,
      "impressionChange": 0.088
    },
    {
      "date": "2026-06-23",
      "phase": "after",
      "clickChange": 1.6036,
      "impressionChange": 0.0732
    },
    {
      "date": "2026-06-24",
      "phase": "after",
      "clickChange": 1.5071,
      "impressionChange": 0.0198
    },
    {
      "date": "2026-06-25",
      "phase": "after",
      "clickChange": 1.4589,
      "impressionChange": 0.0007
    },
    {
      "date": "2026-06-26",
      "phase": "after",
      "clickChange": 1.3143,
      "impressionChange": -0.0638
    },
    {
      "date": "2026-06-27",
      "phase": "after",
      "clickChange": 1.2661,
      "impressionChange": -0.0976
    },
    {
      "date": "2026-06-28",
      "phase": "after",
      "clickChange": 1.0732,
      "impressionChange": -0.099
    },
    {
      "date": "2026-06-29",
      "phase": "after",
      "clickChange": 0.8321,
      "impressionChange": -0.1119
    },
    {
      "date": "2026-06-30",
      "phase": "after",
      "clickChange": 0.35,
      "impressionChange": -0.1475
    }
  ],
  "hideTopPagesPanel": true,
  "urlInventoryTitle": "Ranking URL",
  "urlInventoryNote": "Public URL included in the GSC ranking-page export. Performance numbers are intentionally excluded; the chart above shows only percentage movement. The live page should match the example shown here until <strong>August 8, 2026</strong>; after that, future edits are possible.",
  "urlInventory": [
    {
      "provider": "Supplier review ranking page",
      "url": "https://www.papernest.it/luce-gas/compara/classifica-recensioni-fornitori/"
    }
  ]
};
