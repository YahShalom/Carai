import React, { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import { CARAI_OG_IMAGE } from '../constants';
import { getOrganizationJsonLd, getWebsiteJsonLd, getLocalBusinessJsonLd } from '../lib/seoHelpers';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scrolling if navigated from another route with a target section
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear state to prevent scrolling on subsequent renders? 
      // In a real app we might want to clear history state, but for this simpler version it's okay.
    } else {
        window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <SEO 
        title="Carai Agency | Caribbean AI Agency" 
        description="Carai Agency builds AI-powered landing pages, web systems, and automations for small brands and creators."
        image={CARAI_OG_IMAGE}
        enableOG={true}
        url="https://carai.agency"
        type="website"
        breadcrumbs={[{ name: 'Home', url: 'https://carai.agency' }]}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            getOrganizationJsonLd(),
            getWebsiteJsonLd(),
            getLocalBusinessJsonLd(),
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://carai.agency'
                }
              ]
            }
          ]
        }}
      />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;