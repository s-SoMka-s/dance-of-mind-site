'use client';

import { ViewportSize } from '@models';
import { useEffect, useState } from 'react';

export function useViewportSize(): ViewportSize {
  const [vp, setVp] = useState<ViewportSize>({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return vp;
}
