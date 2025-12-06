import { useEffect, useState } from 'react';

export function useMobile(maxWidth = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= maxWidth);
    check();

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [maxWidth]);

  return isMobile;
}
