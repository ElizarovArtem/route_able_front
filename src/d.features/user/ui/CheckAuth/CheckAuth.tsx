import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { authSelector } from '@/d.features/user/model/user.auth-store.ts';
import { useSelector } from '@/f.shared/lib';

export const CheckAuth = () => {
  const { checkAuth } = useSelector(authSelector);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(() => router.invalidate());
  }, []);

  return null;
};
