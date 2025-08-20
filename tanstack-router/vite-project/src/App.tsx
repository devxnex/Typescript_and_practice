import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authenticated: undefined! },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authenticated = useAuth();
  console.log("Authenticated context:", authenticated);
  return <RouterProvider router={router} context={{ authenticated }} />;
}

export default App;
