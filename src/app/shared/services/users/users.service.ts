import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserRequest, IUserResponse } from '../../interfaces/users';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = environment.BACKEND_URL;
  private api = { users: `${this.url}/users` };
  public userLogon=new Subject<boolean>();
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<IUserResponse[]> {
    return this.http.get<IUserResponse[]>(this.api.users);
  }

  create(user: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(this.api.users, user);
  }

  update(user: IUserRequest, id: number|string): Observable<IUserResponse> {
    return this.http.patch<IUserResponse>(`${this.api.users}/${id}`, user);
  }

}
