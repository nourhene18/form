import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/games';

  http: HttpClient=inject(HttpClient);

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }
}
