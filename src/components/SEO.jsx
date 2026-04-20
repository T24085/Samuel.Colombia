import { Helmet } from 'react-helmet-async'

export function SEO({ title, description, path = '/', image = '/og-image.svg', schema }) {
  const pageTitle = title ? `${title} | Samuel Studio` : 'Samuel Studio'
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Samuel Studio" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  )
}
