import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/trainers')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /trainers!</div>;
}
