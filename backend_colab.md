# Backend SERP demo (Colab-ready)

This file contains backend-only code extracted from the project, translated to Python and split into Colab-style cells. Copy each fenced code block into separate Colab code cells (top-to-bottom) and run. Provide your `SERPAPI` key when prompted or set `SERPAPI_KEY` in the environment.

---

### Cell 1 — Install dependencies
```python
!pip install --upgrade serpapi
```

---

### Cell 2 — API key setup
```python
import os
API_KEY = os.environ.get('SERPAPI_KEY')
if not API_KEY:
    try:
        from getpass import getpass
        API_KEY = getpass('Enter your SERPAPI key (hidden): ')
    except Exception:
        API_KEY = input('Enter your SERPAPI key: ')
if not API_KEY:
    print('SERPAPI_KEY not provided. Set environment variable or enter key to continue.')
else:
    print('API key set (length:', len(API_KEY), 'characters)')
```

---

### Cell 3 — Region config & helper functions
```python
import re
from collections import Counter

REGIONS = {
    'India': {'gl': 'in', 'loc': 'Mumbai, Maharashtra, India', 'domain': 'google.co.in'},
    'USA': {'gl': 'us', 'loc': 'New York, New York, United States', 'domain': 'google.com'},
    'Australia': {'gl': 'au', 'loc': 'Sydney, New South Wales, Australia', 'domain': 'google.com.au'},
    'Japan': {'gl': 'jp', 'loc': 'Tokyo, Japan', 'domain': 'google.co.jp'},
    'Italy': {'gl': 'it', 'loc': 'Milan, Lombardy, Italy', 'domain': 'google.it'},
}

COMMERCIAL_RE = re.compile(r"(buy|price|booking|online|near me|best|offer|finance)", re.I)
STOP_WORDS = set(['the','and','for','with','from','how','best','top','your','this','that','is','are','was','were','in','on','at','to','of','a','an'])

def is_commercial_intent(query: str) -> bool:
    return bool(COMMERCIAL_RE.search(query))

def build_query(base_topic: str, region_index: int) -> str:
    commercial = is_commercial_intent(base_topic)
    if commercial:
        commercial_boost = [" price"," near me"," best deals"," offers"," financing"]
        return base_topic + commercial_boost[region_index % len(commercial_boost)]
    else:
        informational_boost = ["", " news", " latest updates", " trends", " analysis"]
        return base_topic + informational_boost[region_index % len(informational_boost)]

def extract_secondary_keywords(organic_results: list, main_topic: str, top_n: int = 10) -> list:
    if not organic_results:
        return []
    text = ' '.join([f"{r.get('title','')} {r.get('snippet','')}" for r in organic_results]).lower()
    topic_words = set(main_topic.lower().split())
    words = re.findall(r"\w{4,}", text)
    filtered = [w for w in words if w not in STOP_WORDS and w not in topic_words]
    counts = Counter(filtered)
    return [w for w, _ in counts.most_common(top_n)]

print('Helpers ready')
```

---

### Cell 4 — SERP fetch functions (uses serpapi)
```python
import json
from serpapi import GoogleSearch

def fetch_region(topic: str, region_index: int, api_key: str) -> dict:
    config = list(REGIONS.values())[region_index]
    country = list(REGIONS.keys())[region_index]
    query = build_query(topic, region_index)
    params = {
        'engine': 'google',
        'q': query,
        'google_domain': config['domain'],
        'gl': config['gl'],
        'location': config['loc'],
        'hl': 'en',
        'num': 15,
        'api_key': api_key,
    }
    search = GoogleSearch(params)
    data = search.get_dict()

    primary_keywords = [r.get('query') for r in data.get('related_searches', [])] if data.get('related_searches') else []
    secondary_keywords = extract_secondary_keywords(data.get('organic_results', []), topic)
    paa_questions = [q.get('question') for q in data.get('related_questions', [])] if data.get('related_questions') else []
    competitors = []
    if data.get('organic_results'):
        for res in data.get('organic_results')[:8]:
            competitors.append({'title': res.get('title'), 'link': res.get('link'), 'snippet': res.get('snippet'), 'source': res.get('source', 'Website')})
    news = []
    if data.get('top_stories'):
        for n in data.get('top_stories'):
            news.append({'title': n.get('title'), 'link': n.get('link'), 'date': n.get('date'), 'thumbnail': n.get('thumbnail'), 'source': n.get('source')})
    ads = []
    if data.get('ads'):
        for ad in data.get('ads'):
            ads.append({'title': ad.get('title'), 'link': ad.get('link'), 'description': ad.get('description'), 'displayed_link': ad.get('displayed_link'), 'position': ad.get('position')})

    return {
        'country': country,
        'query_used': query,
        'primary_keywords': primary_keywords,
        'secondary_keywords': secondary_keywords,
        'paa_questions': paa_questions,
        'competitors': competitors,
        'news': news,
        'ads': ads,
        'trend_score': data.get('search_information', {}).get('total_results', 0),
        'ad_count': len(ads),
        'news_count': len(news),
    }

def fetch_all(topic: str, api_key: str) -> dict:
    results = []
    for idx in range(len(REGIONS)):
        try:
            res = fetch_region(topic, idx, api_key)
            results.append(res)
        except Exception as e:
            results.append({'country': list(REGIONS.keys())[idx], 'error': str(e)})
    return {'topic': topic, 'timestamp': __import__('datetime').datetime.utcnow().isoformat() + 'Z', 'total_credits_used': len(results), 'results': results}

print('SERP functions ready')
```

---

### Cell 5 — Demo run & print outputs per region
```python
if not API_KEY:
    raise SystemExit('Provide SERPAPI key in the earlier cell to run demo')

from pprint import pprint

topic = 'best wireless headphones'  # <-- change this to demo different topics
print('Running demo for topic:', topic)
res = fetch_all(topic, API_KEY)

print('\n=== SUMMARY ===')
print('Topic:', res['topic'])
print('Timestamp:', res['timestamp'])
print('Total credits used (regions):', res['total_credits_used'])

for r in res['results']:
    print('\n-----')
    print('Country:', r.get('country'))
    if 'error' in r:
        print('Error:', r['error'])
        continue
    print('\nPrimary Keywords:')
    pprint(r.get('primary_keywords'))
    print('\nSecondary Keywords:')
    pprint(r.get('secondary_keywords'))
    print('\nPeople Also Ask (PAA):')
    pprint(r.get('paa_questions'))
    print('\nCompetitors (top 8):')
    pprint(r.get('competitors'))
    print('\nNews (top stories):')
    pprint(r.get('news'))
    print('\nAds:')
    pprint(r.get('ads'))
    print('\nTrend score:', r.get('trend_score'))
    print('Ad count:', r.get('ad_count'), 'News count:', r.get('news_count'))
```

---

### Notes & tips
- To run: open a new Colab notebook and copy each code block into its own code cell (or upload this file and copy cells). Run top-to-bottom.
- Set `SERPAPI_KEY` as an environment variable or paste it when prompted. Each region query counts against your SerpAPI quota.
