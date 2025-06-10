'use client';

import { isTMA } from '@tma.js/sdk';
import { useEffect, useState } from 'react';

export const useIsTelegramMiniApp = () => {
  const [isTma, setIsTma] = useState(false);

  useEffect(() => {
    async function detectTMA() {
      const result = await isTMA(); // ini memang async di versi baru
      setIsTma(result);
    }
    detectTMA();
  }, []);

  return isTma;
};
