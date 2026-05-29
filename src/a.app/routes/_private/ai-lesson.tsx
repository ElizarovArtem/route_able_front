import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { AiAssistantPage } from '@/b.pages/aiAssistant';

export const Route = createFileRoute('/_private/ai-lesson')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AiAssistantPage />;
}
