import { useEffect } from 'react';

const useSEO = ({ title, description, ogTitle, ogDescription, ogImage, noindex }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | Shoot @ Sight`;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update robots meta tag
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.name = 'robots';
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute('content', 'noindex, nofollow');
    } else if (robotsTag) {
      robotsTag.setAttribute('content', 'index, follow');
    }

    // Helper to update Open Graph tags
    const updateOGTag = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', ogTitle || title);
    updateOGTag('og:description', ogDescription || description);
    if (ogImage) {
      updateOGTag('og:image', ogImage);
    }
  }, [title, description, ogTitle, ogDescription, ogImage, noindex]);
};

export default useSEO;
