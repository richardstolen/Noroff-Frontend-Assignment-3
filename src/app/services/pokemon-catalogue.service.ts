import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokemonResponse } from '../models/pokemon-response.model';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemon: Pokemon[] = [];
  private _error: string = '';
  private _loading: boolean = false;

  get pokemon(): Pokemon[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  // Gets pokemon (plural) from the API.
  public findAllPokemon(): void {
    this._loading = true;
    this.http
      .get<PokemonResponse>(apiPokemon)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemon: PokemonResponse) => {
          this._pokemon = pokemon.results;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  // Gets all gen 1 pokemon.
  public loadPokemons(): void {
    this.http.get<PokemonResponse>(apiPokemon + '?limit=151').subscribe({
      next: (pokemon: PokemonResponse) => {
        StorageUtil.storageSave(StorageKeys.Pokemons, pokemon.results);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      },
    });
  }

  // Gets LOCALLY stored pokemon. After they're stored locally, we don't need to call on the API every time.
  public getPokemons(): void {
    const pokemons = StorageUtil.storageRead(StorageKeys.Pokemons) as Pokemon[];

    if (pokemons) {
      this._pokemon = pokemons;
    }
  }
}
