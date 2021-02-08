import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Безкоштовно',
    imageUrl: 'img/feature_free.svg',
  },
  {
    title: 'Доступно',
    imageUrl: 'img/feature_open.svg',
  },
];

function Feature({imageUrl, title}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--6', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <div className="text--center">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

function CategoryButton({url, name}) {
  return (
    <Link
      className={clsx(
        'button button--secondary button--lg',
        styles.button,
      )}
      to={useBaseUrl(url)}>
      {name}
    </Link>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Алгоритмічні навчальні матеріали <head />">
      <header className={clsx('hero hero--secondary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            {siteConfig.themeConfig.navbar.items.filter((props) => props.position === 'left').map((props) => (
              <CategoryButton name={props.label} url={props.to} />
            ))}
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
