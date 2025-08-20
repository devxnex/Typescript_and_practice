import { createFileRoute, redirect } from "@tanstack/react-router";
import { login } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    const authenticated = context.authenticated;
    const isAuthenticated = authenticated?.isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

function Login() {
  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="p-2">
      <h3>Login Page</h3>
      <form>
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}
