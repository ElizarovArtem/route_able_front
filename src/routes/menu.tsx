import { createFileRoute } from '@tanstack/react-router';

import { MenuPage } from '@/pages/MenuPage/MenuPage.tsx';

export const Route = createFileRoute('/menu')({
  component: MenuPage,
});
