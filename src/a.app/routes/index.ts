import { createFileRoute } from '@tanstack/react-router';

import { MainPage } from '@/b.pages/main/ui';

export const Route = createFileRoute('/')({
  component: MainPage,
});
