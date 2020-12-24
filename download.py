import requests
import html
import re
from pathlib import Path

def get_ids(index_url):
    r = requests.get(index_url)
    txt = html.unescape(r.content.decode('cp1251'))
    ids = re.findall(r'<a\s+href=\"([a-z_0-9]+)">', txt)
    return ids
    
def download_alg(alg_url):
    r = requests.get(alg_url)
    txt = html.unescape(r.content.decode('cp1251'))
    txt = extract(txt)
    return txt

def extract(txt):
    s = r'height:500px">'
    e = r'</textarea>'
    l = txt.find(s) + len(s)
    r = txt.find(e)
    return txt[l:r]

def save(txt, file_path):
    with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(txt)

for id in get_ids('http://e-maxx.ru/algo/'):
    alg_url = f'http://e-maxx.ru/algo/src_{id}'
    print(f'URL: {alg_url}')
    txt = download_alg(alg_url)
    Path("raw").mkdir(exist_ok=True)
    save(txt, f'raw/{id}.html')
