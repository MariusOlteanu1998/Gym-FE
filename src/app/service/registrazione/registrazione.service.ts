import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {

  private baseUrl = 'http://localhost:8080/registrazione'; // Sostituisci con l'URL del tuo backend

  constructor(private http: HttpClient) { }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }
}
