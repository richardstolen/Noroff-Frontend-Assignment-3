import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.css'],
})
export class CollectButtonComponent {
  @Input() pokemonName: string = ''; // TODO: id or name?
  @Input() pokemonUrl: string = ''; // TODO: id or name?
  @Input() trainerPage?: boolean; // TODO: id or name?
  @Input() index: number = -1; // TODO: id or name?

  private _user?: User;

  constructor(private readonly userService: UserService) {
    this._user = userService.user;
  }

  onCollectClick(): void {
    // Add the Pokemon to the Trainer's collection.
    this.userService
      .addPokemon(this.pokemonName, this.pokemonUrl)
      .subscribe((response) => {
        this.userService.user = response as User;
      });
    alert('You caught ' + this.pokemonName);
  }
  onRemoveClick(): void {
    // Remove the Pokemon from the Trainer's collection.
    this.userService.removePokemon(this.index).subscribe((response) => {
      this.userService.user = response as User;
    });
    alert('You removed ' + this.pokemonName);
    window.location.reload();
  }
}
