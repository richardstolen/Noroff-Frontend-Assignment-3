import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon; // No parenthesis, getters are created as properties, not methods.
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
    // This variable is private, meaning the template can't see it.
    // Therefore, we need to forward these values somehow.
  }

}
