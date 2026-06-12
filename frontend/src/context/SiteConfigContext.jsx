import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

const SiteConfigContext = createContext(null);

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${API_URL}/site-config`);
      const data = await res.json();
      if (res.ok && data.success) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error('Failed to load site configurations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading, refreshConfig: fetchConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    return { config: null, loading: false, refreshConfig: () => {} };
  }
  return context;
};
