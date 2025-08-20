import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/firstFile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(hidden-folder)/firstFile"!</div>;
}
