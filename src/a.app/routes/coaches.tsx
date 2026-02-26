import { createFileRoute } from '@tanstack/react-router';

import { CoachesPage } from '@/b.pages/user';

export const Route = createFileRoute('/coaches')({
  component: CoachesPage,
});
