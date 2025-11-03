// /logic/UrlLogic.js
import { useState, useEffect } from 'react';

// Custom hook for URL Shortener logic
export const useURLShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState(false);

  // Load URLs from localStorage on mount
  useEffect(() => {
    const savedUrls = localStorage.getItem('shortenedUrls');
    if (savedUrls) {
      try {
        setUrls(JSON.parse(savedUrls));
      } catch (error) {
        console.error('Error loading saved URLs:', error);
      }
    }
  }, []);

  // Save URLs to localStorage whenever they change
  useEffect(() => {
    if (urls.length > 0) {
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    }
  }, [urls]);

  // Initialize base URL from current location
  useEffect(() => {
    const currentBase = window.location.origin + window.location.pathname;
    setBaseUrl(currentBase);
  }, []);

  // Generate a random short code
  const generateShortCode = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  // Validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle URL shortening
  const handleShorten = () => {
    if (!longUrl.trim()) {
      alert('Please enter a URL');
      return;
    }

    if (!isValidUrl(longUrl)) {
      alert('Please enter a valid URL (including http:// or https://)');
      return;
    }

    if (!baseUrl.trim()) {
      alert('Please enter a base URL');
      return;
    }

    const shortCode = generateShortCode();
    // Remove trailing slash from baseUrl if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const shortUrl = `${cleanBaseUrl}/#/${shortCode}`;
    
    const newUrl = {
      id: Date.now(),
      longUrl,
      shortCode,
      shortUrl,
      createdAt: new Date().toLocaleString()
    };

    setUrls([newUrl, ...urls]);
    setLatestShortUrl(shortUrl);
    setLongUrl('');
  };

  // Handle copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Handle URL redirection
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const shortCode = hash.substring(2);
        const urlEntry = urls.find(u => u.shortCode === shortCode);
        
        if (urlEntry) {
          window.location.href = urlEntry.longUrl;
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [urls]);

  return {
    // State
    longUrl,
    setLongUrl,
    baseUrl,
    setBaseUrl,
    urls,
    copied,
    // Functions
    handleShorten,
    handleCopy
  };
};
