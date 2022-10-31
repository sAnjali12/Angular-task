import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceUrl = 'https://reqres.in/api/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.serviceUrl}users`)
  }

  // updateUser(user: User): Observable<any> {
  //   return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
  // }

  addUser(user: any): Observable<any> {
    let users =  {
      "id":7,
      "email": "anjali@reqres.in",
      "first_name": "anjali",
      "last_name": "sen",
      "avatar": "https://reqres.in/img/faces/2-image.jpg"
  }
    return this.http.post(`${this.serviceUrl}users`, users);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(`${this.serviceUrl}users${id}`);
  }
}
