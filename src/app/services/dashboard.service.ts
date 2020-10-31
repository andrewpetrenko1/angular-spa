import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  private url = environment.apiUrl;

  get(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.url);
  }

  add(msg): Observable<Message> {
    return this.httpClient.post<Message>(this.url, msg);
  }

  edit(msg): Observable<Message> {
    return this.httpClient.put<Message>(this.url + msg.id, msg);
  }

  delete(id) {
    return this.httpClient.delete<number>(this.url + id);
  }

}
