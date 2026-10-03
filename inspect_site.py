import urllib.request
import re
import json

url = "https://rewarisweetmart.pk/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    print("Fetched length:", len(html))
    
    # Extract Title
    title = re.search(r'<title>(.*?)</title>', html, re.I)
    print("Title:", title.group(1) if title else "None")
    
    # Extract Meta description
    meta_desc = re.search(r'<meta name="description" content="(.*?)">', html, re.I)
    print("Description:", meta_desc.group(1) if meta_desc else "None")

    # Extract navigation links
    nav_links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.I | re.S)
    print(f"Total links: {len(nav_links)}")
    
    # Extract collections
    collections = set(re.findall(r'/collections/([a-zA-Z0-9_-]+)', html))
    print("Collections found:", sorted(list(collections)))

    # Extract products
    products = set(re.findall(r'/products/([a-zA-Z0-9_-]+)', html))
    print("Products found on home:", sorted(list(products)))
except Exception as e:
    print("Error:", e)
