import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { z } from "zod";

/** Category */
const CategorySchema = z.enum([
  "electronics",
  "jewel",
  "clothing",
  "books",
  "furniture",
]);
type Category = z.infer<typeof CategorySchema>;

/** Search schema */
export const SearchSchema = z
  .object({
    // keep truly optional; empty string -> undefined
    query: z.preprocess(
      (v) => (v == null || v === "" ? undefined : v),
      z.coerce.string().optional()
    ),
    hasDiscount: z.preprocess((v) => {
      if (v == null) return undefined;
      if (typeof v === "number") return v === 1;
      if (typeof v === "string") {
        const s = v.trim().toLowerCase();
        if (s === "1" || s === "true") return true;
        if (s === "0" || s === "false") return false;
      }
      return v; // boolean stays boolean
    }, z.boolean().optional()),
    categories: z.preprocess((val) => {
      if (val == null) return undefined;
      const arr =
        typeof val === "string"
          ? val.split(",")
          : Array.isArray(val)
            ? val
            : [val];
      return arr.map((s) => String(s).trim()).filter(Boolean);
    }, z.array(CategorySchema).optional()),
  })
  .strict();

type SearchParams = z.infer<typeof SearchSchema>; // { query?: string; hasDiscount?: boolean; categories?: Category[] }

type Itemfilters = {
  query?: string;
  hasDiscount?: boolean;
  categories?: string[];
};

export const Route = createFileRoute("/search")({
  beforeLoad: ({ context }) => {
    const authenticated = context.authenticated;
    const isAuthenticated = authenticated?.isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  validateSearch: (search): SearchParams => {
    return SearchSchema.parse(search);
  },
  component: Search,
});

function Search() {
  const { query, hasDiscount, categories } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  // ✅ make input controlled (string only)
  //   const [localQuery, setLocalQuery] = useState(query ?? "");
  const updateFilters = (name: keyof Itemfilters, value: unknown) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) });
  };
  console.log("Search params:", {
    query, // string | undefined
    hasDiscount, // boolean | undefined
    categories, // Category[] | undefined
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Search Results</h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="search-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search Query
          </label>
          <input
            id="search-input"
            value={query}
            onChange={(e) => updateFilters("query", e.target.value)}
            placeholder="Type to search…"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="discount-checkbox"
            checked={hasDiscount || false}
            onChange={(e) => updateFilters("hasDiscount", e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="discount-checkbox"
            className="text-sm font-medium text-gray-700"
          >
            Has Discount
          </label>
        </div>

        <div>
          <label
            htmlFor="categories-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Categories
          </label>
          <select
            id="categories-select"
            multiple
            onChange={(e) => {
              updateFilters(
                "categories",
                Array.from(e.target.selectedOptions, (option) => option.value)
              );
            }}
            value={categories}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {["electronics", "jewel", "clothing", "books", "furniture"].map(
              (category) => {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Current Search Parameters:
        </h4>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
          {JSON.stringify({ query, hasDiscount, categories }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
