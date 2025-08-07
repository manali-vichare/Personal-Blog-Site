import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | My Personal Blog',
  defaultTitle: 'My Personal Blog',
  description: 'A simple blog built with Next.js and MDX',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'My Personal Blog',
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default config;