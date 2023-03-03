import { Pokemon } from './pokemon.model';

export interface User {
  id: number;
  username: string;
  pokemon: Pokemon[];
}
