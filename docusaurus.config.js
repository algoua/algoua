const fs = require('fs');
const path = require('path');
const remarkAbbr = require('remark-abbr');
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');
const sidebars = require('./sidebars.js');

function extractTitleFromMarkdown(docPath) {
  const content = fs.readFileSync(path.join(__dirname, 'docs', docPath), { encoding: 'utf8' });
  const found = content.match(/title:\s*([^\r\n]+)/);
  if (found === null) {
    throw new Error(`Couldn't find title in ${docPath}`);
  }
  return found[1];
}

function process_category_items(items) {
  if (!items) {
    return [];
  }
  let result = [];
  for (const item of items) {
    if (typeof item === 'string' || item instanceof String) {
      result.push({
        type: 'doc',
        label: extractTitleFromMarkdown(item + '.md'),
        id: item,
      });
      continue;
    }
    switch (item.type) {
      case 'doc': {
        result.push({
          type: 'doc',
          label: extractTitleFromMarkdown(item.id + '.md'),
          id: item.id,
        });
        break;
      }
      case 'category': {
        result.push({
          type: 'category',
          label: item.label,
          items: process_category_items(item.items),
        });
        break;
      }
    }
  }
  return result;
}

const sitemap = {}
for (const [category, categoryItems] of Object.entries(sidebars)) {
  sitemap[category] = process_category_items(categoryItems);
}

module.exports = {
  title: 'Algoua',
  tagline: 'Алгоритмічні навчальні матеріали',
  url: 'https://algoua.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'algoua',
  projectName: 'algoua',
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      }
    },
    announcementBar: {
      id: 'announcementBar-1', // Increment on change
      content:
        '⭐️ If you like Algoua, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/algoua/algoua">GitHub</a>! ⭐',
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/palenight'),
    },
    navbar: {
      title: 'Algoua',
      logo: {
        alt: 'Algoua Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   to: 'books/',
        //   activeBasePath: 'books',
        //   label: 'Література',
        //   position: 'left',
        // },
        {
          href: 'https://github.com/algoua/algoua',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          items: [
            {
              label: 'Зв\'язатися',
              href: 'https://github.com/algoua/algoua/issues/new',
            },
            {
              label: 'Як запропонувати зміни чи додати нову статтю?',
              href: 'https://github.com/algoua/algoua#внесення-змін',
            },
          ],
        },
      ],
      copyright: `Logo is based on an icon made by <a href="https://www.flaticon.com/authors/becris" title="Becris" class="copyright-link">Becris</a><br/>
                  Copyright © ${new Date().getFullYear()} Algoua`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [remarkAbbr, remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: false,
          editUrl: 'https://github.com/algoua/algoua/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('docusaurus-lunr-search'),
      {
        languages: ['en', 'ru'],
      },
    ],
  ],
  customFields: {
    sitemap,
  },
};
