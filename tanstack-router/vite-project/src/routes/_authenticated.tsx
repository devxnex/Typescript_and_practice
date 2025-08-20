import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    const authenticated = context.authenticated;
    const isAuthenticated = authenticated?.isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});
