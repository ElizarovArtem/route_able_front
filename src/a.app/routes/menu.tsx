import { createFileRoute } from '@tanstack/react-router';

import { MenuPage } from '@/b.pages/main/ui';

export const Route = createFileRoute('/menu')({
  component: MenuPage,
});
