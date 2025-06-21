import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useSelector } from '@/hooks/useSelector.ts';
import { authSelector } from '@/store/authStore.ts';

export const CheckAuth = () => {
  const { checkAuth } = useSelector(authSelector);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(() => router.invalidate());
  }, []);

  return null;
};
