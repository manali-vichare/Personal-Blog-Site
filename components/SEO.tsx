'use client';

import { DefaultSeo, NextSeo } from 'next-seo';
import defaultConfig from '../next-seo.config';

export function DefaultSEO() {
  return <DefaultSeo {...defaultConfig} />;
}

export function PostSEO({
  title,
  description,
  url,
  date,
  tags,
}: {
  title: string;
  description?: string;
  url?: string;
  date?: string;
  tags?: string[];
}) {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        type: 'article',
        url,
        article: {
          publishedTime: date,
          tags,
        },
      }}
      twitter={{ cardType: 'summary_large_image' }}
    />
  );
}