import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

// Import from environment file. De-structures the 'apiUrl' value from it.
const { apiUrl: apiUrl, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Dependency injection - injected the HttpClient into the LoginService.
  // The HttpClientMODULE is the file that exposes the features, and one of them is the HttpClient.
  // We mark it as 'readonly' because we will never re-instantiate it, and 'private' because we don't want the Component to have direct access to it.
  constructor(private readonly http: HttpClient) { }


  // Models, HttpClient, Observables, and RxJS operators.
  // > Model: file that describes the data that we're working with.

  // Self-explanatory: logs user in.
  public login(username: string): Observable<User> { // The login function returns an Observable, of type User (as described by the model).
    return this.checkUsername(username)
      .pipe(
        switchMap((user: User | undefined) => { // Switches to createUser
          if (user === undefined) { // If user doesn't exist...
            return this.createUser(username); // Creates and returns user.
          }
          return of(user); // Simply forwards the existing user.
        })
      )
  }

  // Check if user exists
  private checkUsername(username: string): Observable<User | undefined> { // We need to convert from array to either User or undefined (if user doesn't exist).
    return this.http.get<User[]>(`${apiUrl}?username=${username}`) // Always gets an array
      .pipe(
        // RxJS operators
        map((response: User[]) => response.pop()) // Return the last item in the array (should be the only item if IDs are unique) into the map. Undefined if the array is empty.
      )
  }

  // Create user (if one with the given username doesn't exist). Called upon by the login function.
  private createUser(username: string): Observable<User> {
    // Create user. ID is generated for us on the server.
    const user = {
      username
    }

    // Headers: we need a key to access the API
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    // POST request to create items on the server.
    return this.http.post<User>(apiUrl, user, { headers }) // URL, user object, (headers) configuration.
  }

  // Whether a user already exists OR one was just created (above), store the user.

}
