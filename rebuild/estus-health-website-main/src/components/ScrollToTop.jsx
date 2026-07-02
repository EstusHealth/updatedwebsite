// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top-left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the URL path changes

  return null;
}
