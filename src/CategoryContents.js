import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

const SubCategoryContents = ({ subcategory, CategoryTag, idx }) => {
  return (
    <div key={idx}>
      <CategoryTag>{subcategory.label}</CategoryTag>
      <ul>
        {
          subcategory.items.map((subItem, idx) => {
            if (subItem.type === 'doc') {
              return (
                <li key={idx}>
                  <Link to={useBaseUrl(`/${subItem.id}`)}>{subItem.label}</Link>
                </li>
              );
            } else if (subItem.type === 'category') {
              return (
                <li key={idx}>
                  <SubCategoryContents idx={idx} CategoryTag={`em`} subcategory={subItem} />
                </li>
              );
            } else {
              return (null);
            }
          })
        }
      </ul>
    </div>
  );
};

export const CategoryContents = ({ category }) => {
  const sitemap = useDocusaurusContext().siteConfig.customFields.sitemap;
  return (
    <>
      {
        sitemap[category].filter((item) => item.type === 'category').map((item, idx) => {
          return (
            <div key={idx}>
              <SubCategoryContents idx={idx} CategoryTag={`h3`} subcategory={item} />
            </div>
          );
        })
      }
    </>
  );
};
