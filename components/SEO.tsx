import React, { useEffect } from 'react';
import { SITE_TITLE, SITE_DESCRIPTION, PRIMARY_EMAIL, SOCIAL_LINKS } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object | null;
  breadcrumbs?: Array<{ name: string; url: string }> | null;
  enableOG?: boolean;
}

/**
 * SEO Component: Dynamically updates document head meta tags.
 * Use this component in page components to set page-specific SEO tags.
 * 
 * Example:
 * <SEO 
 *   title="Services | Carai Agency" 
 *   description="Explore our AI-powered web & automation services."
 *   image="/og-services.png"
 * />
 */
export const SEO: React.FC<SEOProps> = ({
  title = SITE_TITLE || 'Carai Agency | Caribbean AI Agency',
  description = SITE_DESCRIPTION || 'Carai Agency builds AI-powered landing pages, web systems, and automations for small brands and creators.',
  image,
  url = 'https://carai.agency', // RAPHAEL: replace with your production domain
  type = 'website',
  structuredData = null,
  breadcrumbs = null
  ,
  enableOG = false
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      let element = isProperty
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    // Only emit Open Graph and Twitter meta when explicitly enabled for the page
    if (enableOG || (image && image.length > 0)) {
      updateMeta('og:title', title, true);
      updateMeta('og:description', description, true);
      if (image) updateMeta('og:image', image, true);
      updateMeta('og:url', url, true);
      updateMeta('og:type', type, true);
      updateMeta('twitter:title', title);
      updateMeta('twitter:description', description);
      if (image) updateMeta('twitter:image', image);
      updateMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    }

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD structured data (Organization + WebSite). Allows overriding via `structuredData` prop.
    const ldId = 'jsonld-seo';
    let ldScript = document.getElementById(ldId) as HTMLScriptElement | null;
    const defaultOrganization: any = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${url}#organization`,
          "name": title || SITE_TITLE,
          "url": url,
          "logo": image,
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "email": PRIMARY_EMAIL,
              "contactType": "customer support"
            }
          ],
          "sameAs": (SOCIAL_LINKS || []).map(s => s.href)
        },
        {
          "@type": "WebSite",
          "@id": `${url}#website`,
          "url": url,
          "name": title || SITE_TITLE,
          "description": description
        }
      ]
    };

    // If breadcrumbs are provided, append a BreadcrumbList node
    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      const itemListElements = breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": b.url,
      }));

      defaultOrganization['@graph'].push({
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        "itemListElement": itemListElements,
      });
    }

    const payload = structuredData || defaultOrganization;

    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.id = ldId;
      document.head.appendChild(ldScript);
    }
    try {
      ldScript.textContent = JSON.stringify(payload);
    } catch (err) {
      // If serialization fails, avoid breaking the page
      // eslint-disable-next-line no-console
      console.warn('Failed to stringify structured data for SEO', err);
    }
  }, [title, description, image, url, type, structuredData]);

  return null;
};

export default SEO;
