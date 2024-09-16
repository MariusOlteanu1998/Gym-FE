import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scheda } from 'src/app/model/scheda/scheda';

@Injectable({
  providedIn: 'root'
})
export class SchedaService {

  private baseUrl = 'http://localhost:8080/scheda';

  constructor(private http: HttpClient) { }

  getAllScheda(): Observable<Scheda[]> {
    return this.http.get<Scheda[]>(`${this.baseUrl}`);
  }

  getSchedaById(id: number): Observable<Scheda> {
    return this.http.get<Scheda>(`${this.baseUrl}/${id}`);
  }

  updateSchedaById(id: number, scheda: Scheda): Observable<Scheda> {
    return this.http.put<Scheda>(`${this.baseUrl}/${id}`, scheda);
  }

  insertScheda(scheda: Scheda): Observable<Scheda> {
    return this.http.post<Scheda>(`${this.baseUrl}`, scheda);
  }

  deleteSchedaById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
