import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.prod';
import { StorageUtil } from '../utils/storage.util';

const { apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!); // !: if undefined, don't execute this line. storageSave doesn't accept undefined.
    this._user = user;
  }

  constructor(private readonly http: HttpClient) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }

  addPokemon(pokemonName: string) {
    this._user?.pokemon?.push(pokemonName);

    const header = {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    };

    const body = {
      pokemon: this._user?.pokemon,
    };
    return this.http.patch(
      apiUsers + '/' + this._user?.id,
      JSON.stringify(body),
      { headers: header }
    );
  }
}
