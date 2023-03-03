import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent {
  @Input() pokemon?: Pokemon;
  @Input() index: number = -1;

  public currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }

  // Takes in the url attribute of a Pokemon and returns the URL for it's sprite.
  spriteUrl(url: string): string {
    const id: number = Number(url.replace(/\/$/, '').split('/').slice(-1)[0]);
    // Removes the trailing slash at the end of the URL with *replace()*, *splits* the URL string on each slash,
    // then uses *slice()* to keep only the last part (after the last non-trailing slash).
    // slash() returns an array, so access the only (last) item, on index [0].
    // Finally, use *Number()* to convert from string to number, and that's our id.
    // Initially wrote a similar implementation myself, but credit to https://stackoverflow.com/a/50515967 for a bug-free solution.

    return `${environment.apiPokemonSprites}/${id}.png`;
  }
}
