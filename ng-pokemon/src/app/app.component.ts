import { Component } from '@angular/core';
import { PokemonCatalogueService } from './services/pokemon-catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-pokemon';

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) {}

  ngOnInit(): void {
    this.pokemonCatalogueService.loadPokemons();
  }
}
