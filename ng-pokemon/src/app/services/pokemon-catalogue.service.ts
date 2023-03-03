import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod'; // TODO: .prod???
import { PokemonResponse } from '../models/pokemon-response.model';
import { Pokemon } from '../models/pokemon.model';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: Pokemon[] = [];
  private _error: string = "";
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

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {
    this._loading = true;
    this.http.get<PokemonResponse>(apiPokemon)
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
        }
      })
  }

}
