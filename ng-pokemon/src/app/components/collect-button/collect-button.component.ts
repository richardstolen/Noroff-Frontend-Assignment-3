import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.css'],
})
export class CollectButtonComponent {
  @Input() pokemonName: string = '';
  @Input() pokemonUrl: string = '';
  @Input() trainerPage?: boolean;
  @Input() index: number = -1;

  private _user?: User;

  get alreadyCaught(): boolean {
    return this.userService.pokemonInCollection(this.pokemonName);
  }

  constructor(private readonly userService: UserService) {
    this._user = userService.user;
  }

  onCollectClick(): void {
    // Add the pokemon to the Trainer's collection.
    // But first, make sure we only add it if it's NOT already in the collection. We don't want duplicates.
    if (this.userService.pokemonInCollection(this.pokemonName)) {
      alert("You've already caught this pokemon.");
      throw new Error(
        'Collect Pokemon (addtoCollection): Pokemon alredy collected.'
      );
    } else {
      // If the pokemon hadn't been caught yet, catch it (add it to the collection).
      this.userService
        .addPokemon(this.pokemonName, this.pokemonUrl)
        .subscribe((response) => {
          this.userService.user = response as User;
        });
      alert('You caught ' + this.pokemonName + '!');
    }
  }
  onRemoveClick(): void {
    // Remove the Pokemon from the Trainer's collection.
    this.userService.removePokemon(this.index).subscribe((response) => {
      this.userService.user = response as User;
    });
    alert('You removed ' + this.pokemonName);
  }
}
