import { Component, OnInit } from '@angular/core';
import { StorageKeys } from './enums/storage-keys.enum';
import { PokemonCatalogueService } from './services/pokemon-catalogue.service';
import { StorageUtil } from './utils/storage.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-pokemon';

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) {}

  ngOnInit(): void {
    // Loading pokemons from API if they are not already loaded
    if (!StorageUtil.storageRead(StorageKeys.Pokemons)) {
      this.pokemonCatalogueService.loadPokemons();
    }
  }
}
