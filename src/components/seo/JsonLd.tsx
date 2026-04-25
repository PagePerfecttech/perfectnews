import React from 'react';

interface JsonLdProps {
  type: 'NewsArticle' | 'VideoObject' | 'Organization' | 'WebSite';
  data: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  // Add default publisher for NewsArticle
  if (type === 'NewsArticle') {
    schema.publisher = {
      "@type": "Organization",
      "name": "Perfect News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://perfectnews.com/logo.png"
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
