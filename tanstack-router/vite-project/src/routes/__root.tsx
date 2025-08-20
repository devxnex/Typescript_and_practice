import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthContext } from "../hooks/useAuth";
import { signOut } from "../hooks/useAuth";

type RouterContext = {
  authenticated: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { authenticated } = Route.useRouteContext();
  const isAuthenticated = authenticated?.isAuthenticated;

  return (
    <>
      <div className="p-4 flex gap-5 items-center">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/pokemon" className="[&.active]:font-bold">
          Pokemons List
        </Link>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/settings">Settings</Link>
        <Link to="/firstFile">First File</Link>
        {/* //do not need to write dynamic segments here */}

        {/* //do not need to write dynamic segments here   */}
        <li>
          <Link to="/search" className="[&.active]:font-bold">
            Search
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <Link to="/page" className="[&.active]:font-bold">
              Page
            </Link>
            <button
              onClick={signOut}
              className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : null}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
