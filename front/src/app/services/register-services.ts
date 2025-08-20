import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterServices {
  private API_URL = 'http://107.21.171.118:3000/users';

  constructor(private httpClient: HttpClient){}

  createUser(name: string, email:string, password: string):Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(this.API_URL,{name, email, password});
  }

}
