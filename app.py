import argparse
from flask import Flask, render_template, Markup, redirect, abort
from pathlib import Path
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

REPOSITORY_URL = 'https://github.com/algoua/algorithms'
TEMPLATES_DIR = Path('templates')
CODE_STYLE = 'monokai'

parser = argparse.ArgumentParser()
parser.add_argument('--port', dest='port', default=8080, help='port number')
args = parser.parse_args()

app = Flask(__name__, template_folder=str(TEMPLATES_DIR))
app.config['TEMPLATES_AUTO_RELOAD'] = True

lexer = get_lexer_by_name("cpp", stripall=True)
formatter = HtmlFormatter(noclasses=True, linenos=False, style=CODE_STYLE, linewrap=True)

def format_code(name):
    path = Path('code') / name
    if path.is_file():
        txt = path.read_text()
        code = highlight(txt, lexer, formatter)
        code = Markup(code)
        return code
    else:
        return Markup(f'<b><span style="color:red">Код відсутній.</span> Будь ласка повідомте про несправність або виправте самі на <a href="{REPOSITORY_URL}">GitHub</a>.</b>')

@app.route('/')
def index():
    return render_template('index.html', title='Алгоритми')

@app.route('/page/<page_name>')
def page(page_name):
    page_file = 'pages/' + page_name + '.html'
    if not (TEMPLATES_DIR / page_file).is_file():
        return abort(404)

    return render_template('page.html', title=page_name, page_file=page_file, format_code=format_code)

app.run(host='localhost', port=args.port)
