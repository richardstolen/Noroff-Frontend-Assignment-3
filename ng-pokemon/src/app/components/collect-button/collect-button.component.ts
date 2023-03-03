import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.css']
})
export class CollectButtonComponent {

  @Input() pokemonName: string = ""; // TODO: id or name?

  constructor() { }

  onCollectClick(): void {
    // Add the Pokemon to the Trainer's collection.
    alert("You caught " + this.pokemonName + "!\nBut it quickly escaped (implement Pokémon collection feature).")
  }

}
