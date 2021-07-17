import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

export const CategoryContents = ({ category }) => {
  const sitemap = useDocusaurusContext().siteConfig.customFields.sitemap;
  return (
    <>
      {
        sitemap[category].filter((item) => item.type === 'category').map((item, idx) => {
          return (
            <div key={idx}>
              <h3>{item.label}</h3>
              <ul>
                {
                  item.items.map((subItem, idx) => {
                    return (
                      <li key={idx}>
                        <Link to={useBaseUrl(`/${subItem.id}`)}>{subItem.label}</Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        })
      }
    </>
  );
};
