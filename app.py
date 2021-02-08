import argparse
from flask import Flask, render_template, Markup, abort
from pathlib import Path
import markdown
import re

parser = argparse.ArgumentParser()
parser.add_argument('--port', dest='port', default=8080, help='port number')
args = parser.parse_args()

REPOSITORY_URL = 'https://github.com/algoua/algorithms'
SRC_DIR = Path('src')
TEMPLATES_DIR = Path('templates')
CODE_STYLE = 'monokai'

app = Flask(__name__, template_folder=str(TEMPLATES_DIR))
app.config['TEMPLATES_AUTO_RELOAD'] = True

md = markdown.Markdown(
    extensions=[
        'abbr',
        'attr_list',
        'codehilite',
        'fenced_code',
        'footnotes',
        'mdx_math',
        'sane_lists',
        'tables',
        'toc',
    ],
    extension_configs={
        'codehilite': {
            'pygments_style': CODE_STYLE,
            'noclasses': True
        },
        'mdx_math': {
            'enable_dollar_delimiter': True
        },
        'toc': {
            'permalink': True,
            'slugify': lambda val, sep : val,
            'title': 'Зміст',
            'toc_depth': "2-6",
        },
    }
)

def build_html_from_md(md_file: Path):
    if not md_file.is_file():
        return abort(404)
    txt = md_file.read_text(encoding='utf-8')
    html = Markup(md.convert(txt))
    title_match = re.match(r'^#\s*([^#][^\n]+)', txt)
    title = '' if title_match is None else title_match.group(1)
    return html, title

@app.route('/')
def index():
    content, title = build_html_from_md(SRC_DIR / 'index.md')
    return render_template('index.html', title=title, content=content)

@app.route('/<category>/<page_name>')
def page(category, page_name):
    content, title = build_html_from_md(SRC_DIR / category / f'{page_name}.md')
    return render_template('page.html', title=title, content=content)

app.run(host='localhost', port=args.port)
