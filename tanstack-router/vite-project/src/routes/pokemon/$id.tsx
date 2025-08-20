import { createFileRoute } from "@tanstack/react-router";
import { getPokemon } from "../../api/pokemon";

export const Route = createFileRoute("/pokemon/$id")({
  component: Pokemon,
  loader: async ({ params }) => await getPokemon(params.id),
});

function Pokemon() {
  const { id } = Route.useParams();
  const pokemonData = Route.useLoaderData();
  console.log(pokemonData);
  return (
    <>
      <div>Hello "/pokemon/$id"!</div>

      <h2>
        {id}----
        {pokemonData.name}
      </h2>

      <img src={pokemonData.sprites.front_default} alt="pokemon name" />

      <h2>
        height = {pokemonData.height}
        weight = {pokemonData.weight}
      </h2>
    </>
  );
}
