import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { AiAssistant } from '@/c.widgets/aiAssistant/ui/aiAssistant/AiAssistant.tsx';

export const Route = createFileRoute('/_private/ai-lesson')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AiAssistant />;
}
