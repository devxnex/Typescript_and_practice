type PokemeonDetails ={
    name:string;
    id:number;
    height:number
    weight:number;
    sprites :{
        front_default:string;
    }
}


export async function getPokemon(id:string) :Promise <PokemeonDetails>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await response.json()
}

type Pokemon = {
    name:string;
    id:string;
}


export async function getPokemonList():Promise <Pokemon[]>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    const data =  (await response.json())as {
        results: {name:string; url:string}[]
    }

    return data.results.map((r)=>(
        {
            id:r.url.split("/").slice(-2, -1)[0],
            name:r.name
        }
    ))

}