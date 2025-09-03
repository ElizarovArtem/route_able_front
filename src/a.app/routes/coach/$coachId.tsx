import { createFileRoute } from '@tanstack/react-router';

import { CoachPage } from '@/b.pages/user/ui';

export const Route = createFileRoute('/coach/$coachId')({
  component: CoachPage,
});
