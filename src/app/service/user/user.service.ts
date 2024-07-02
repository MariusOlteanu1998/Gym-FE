import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/model/user/user";

@Injectable({
  providedIn: 'root' // Assicura che il servizio sia disponibile a livello di root
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users'; // Sostituisci con l'URL del tuo backend

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addUser(selectedUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, selectedUser);
  }
}
