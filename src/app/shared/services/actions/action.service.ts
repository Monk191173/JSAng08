import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActionRequest,IActionResponse } from '../../interfaces/actions';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` };
  public curActionId:number=-1;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IActionResponse[]> {
    return this.http.get<IActionResponse[]>(this.api.actions);
  }

  create(action: IActionRequest): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(this.api.actions, action);
  }

  update(category: IActionRequest, id: number|string): Observable<IActionResponse> {
    return this.http.patch<IActionResponse>(`${this.api.actions}/${id}`, category);
  }

  delete(id: number|string): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }

  getOne(id: number): Observable<IActionResponse> {
    return this.http.get<IActionResponse>(`${this.api.actions}/${id}`);
  }
}
