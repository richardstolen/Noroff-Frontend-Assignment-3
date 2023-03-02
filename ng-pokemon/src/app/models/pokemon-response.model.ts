import { Pokemon } from "./pokemon.model";

// Models the Object that the API returns, which is not actually an array of Pokemon,
// but rather an object where the "results" property is such an array.
export interface PokemonResponse {
    count: number,
    next: string,
    previous: string,
    results: Pokemon[]
}